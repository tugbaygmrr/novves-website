import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  verifyToken,
  verifyCsrfToken,
  getCookieValue,
  COOKIE_ACCESS_TOKEN,
  COOKIE_CSRF_TOKEN,
} from "@/lib/admin/auth";
import pool from "@/lib/admin/db";
import { locales, type Locale } from "@/i18n/config";
import { FILE_SECTIONS, VALID_DICT_FILES } from "@/lib/admin/content-sections";
import {
  backupFile,
  getDictionaryPath,
  loadJsonFile,
  writeJsonFile,
} from "@/lib/admin/dictionary-io";

export const dynamic = "force-dynamic";

const VALID_FILES = VALID_DICT_FILES;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isValidLocale(v: unknown): v is Locale {
  return typeof v === "string" && (locales as readonly string[]).includes(v);
}

function isValidFile(v: unknown): v is string {
  return typeof v === "string" && VALID_FILES.includes(v);
}

function isValidSection(file: string, section: unknown): section is string {
  if (typeof section !== "string") return false;
  const sections = FILE_SECTIONS[file];
  return sections !== undefined && sections.includes(section);
}

/** Decode common HTML entities so encoded tags can be caught on re-strip. */
function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)))
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

/** Recursively strip HTML tags, encoded entities, JS URLs, and event handlers. */
function stripHtml(value: unknown): unknown {
  if (typeof value === "string") {
    // Strip HTML tags
    let clean = value.replace(/<[^>]*>/g, "");
    // Decode HTML entities and strip again (handles &#x3c;script&#x3e; etc.)
    clean = decodeHtmlEntities(clean).replace(/<[^>]*>/g, "");
    // Remove javascript: URLs (case-insensitive, allows whitespace/entities in between)
    clean = clean.replace(/javascript\s*:/gi, "");
    // Remove on* event handler patterns (e.g. onclick=, onerror=)
    clean = clean.replace(/\bon\w+\s*=/gi, "");
    return clean;
  }
  if (Array.isArray(value)) {
    return value.map(stripHtml);
  }
  if (value !== null && typeof value === "object") {
    const result: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      result[k] = stripHtml(v);
    }
    return result;
  }
  return value;
}

function loadContentFromJsonFile(file: string, locale: Locale): Record<string, unknown> {
  return loadJsonFile(getDictionaryPath(locale, file));
}

function localeListLabel(): string {
  return locales.join(", ");
}

function authenticate(request: NextRequest): string | null {
  const token = getCookieValue(request, COOKIE_ACCESS_TOKEN);
  if (!token) return null;
  const payload = verifyToken(token);
  if (!payload || payload.type !== "access") return null;
  return payload.username;
}

/** Merge DB overrides onto JSON file (JSON is live-site source of truth). */
async function syncDbToFile(file: string, locale: Locale) {
  const result = await pool.query(
    "SELECT section, data FROM page_content WHERE file = $1 AND locale = $2",
    [file, locale],
  );

  if (result.rows.length === 0) return;

  const filePath = getDictionaryPath(locale, file);
  const content: Record<string, unknown> = { ...loadContentFromJsonFile(file, locale) };
  for (const row of result.rows) {
    content[row.section] = row.data;
  }

  backupFile(filePath);
  writeJsonFile(filePath, content);
}

// ---------------------------------------------------------------------------
// GET /api/admin/content/[file]?locale=tr
// Veritabanından okur
// ---------------------------------------------------------------------------
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ file: string }> }
) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { file } = await params;

  if (!isValidFile(file)) {
    return NextResponse.json(
      { error: `Invalid file. Must be one of: ${VALID_FILES.join(", ")}` },
      { status: 400 }
    );
  }

  const locale = request.nextUrl.searchParams.get("locale");
  if (!isValidLocale(locale)) {
    return NextResponse.json(
      { error: `Invalid locale. Must be one of: ${localeListLabel()}` },
      { status: 400 },
    );
  }

  try {
    const jsonData = loadContentFromJsonFile(file, locale);
    const data: Record<string, unknown> = { ...jsonData };
    let source: "json-file" | "db+json" = "json-file";

    try {
      const result = await pool.query(
        "SELECT section, data FROM page_content WHERE file = $1 AND locale = $2 ORDER BY section",
        [file, locale],
      );
      for (const row of result.rows) {
        data[row.section] = row.data;
      }
      if (result.rows.length > 0) source = "db+json";
    } catch (dbErr) {
      console.error(`DB read failed for ${file}/${locale}, using JSON only:`, dbErr);
    }

    return NextResponse.json({
      file,
      locale,
      sections: FILE_SECTIONS[file],
      data,
      source,
    });
  } catch (err) {
    console.error(`Failed to read ${file} for locale ${locale}:`, err);
    return NextResponse.json({ error: "Failed to read content" }, { status: 500 });
  }
}

// ---------------------------------------------------------------------------
// PUT /api/admin/content/[file]
// Body: { locale: string, section: string, data: any }
// Veritabanına yazar + JSON dosyasını günceller + sayfaları revalidate eder
// ---------------------------------------------------------------------------
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ file: string }> }
) {
  const username = authenticate(request);
  if (!username) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // CSRF verification
  const csrfHeader = request.headers.get("x-csrf-token") ?? "";
  const csrfCookie = getCookieValue(request, COOKIE_CSRF_TOKEN) ?? "";
  if (!verifyCsrfToken(csrfHeader, csrfCookie)) {
    return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
  }

  const { file } = await params;

  if (!isValidFile(file)) {
    return NextResponse.json(
      { error: `Invalid file. Must be one of: ${VALID_FILES.join(", ")}` },
      { status: 400 }
    );
  }

  let body: { locale?: unknown; section?: unknown; data?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { locale, section, data } = body;

  if (!isValidLocale(locale)) {
    return NextResponse.json(
      { error: `Invalid locale. Must be one of: ${localeListLabel()}` },
      { status: 400 },
    );
  }

  if (!isValidSection(file, section)) {
    return NextResponse.json(
      { error: `Invalid section for "${file}". Must be one of: ${FILE_SECTIONS[file].join(", ")}` },
      { status: 400 }
    );
  }

  if (data === undefined || data === null) {
    return NextResponse.json({ error: "Missing data field" }, { status: 400 });
  }

  const sanitizedData = stripHtml(data);

  try {
    // 1. Veritabanına kaydet (upsert)
    await pool.query(
      `INSERT INTO page_content (file, locale, section, data, updated_by, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       ON CONFLICT (file, locale, section)
       DO UPDATE SET data = $4, updated_by = $5, updated_at = NOW()`,
      [file, locale, section, JSON.stringify(sanitizedData), username]
    );

    // 2. JSON dosyasını güncelle (sayfa render için)
    await syncDbToFile(file, locale);

    // 3. Sayfaları anında yenile
    revalidatePath("/", "layout");

    return NextResponse.json({
      success: true,
      message: `"${section}" kaydedildi`,
    });
  } catch (err) {
    console.error(`Failed to update ${file}/${section} for ${locale}:`, err);
    return NextResponse.json(
      { error: "Failed to update content" },
      { status: 500 }
    );
  }
}
