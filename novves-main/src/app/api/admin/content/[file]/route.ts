import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";
import {
  verifyToken,
  verifyCsrfToken,
  getCookieValue,
  COOKIE_ACCESS_TOKEN,
  COOKIE_CSRF_TOKEN,
} from "@/lib/admin/auth";
import pool from "@/lib/admin/db";

export const dynamic = "force-dynamic";

// ---------------------------------------------------------------------------
// Valid locales
// ---------------------------------------------------------------------------
const VALID_LOCALES = ["tr", "en", "ru"] as const;
type Locale = (typeof VALID_LOCALES)[number];

// ---------------------------------------------------------------------------
// Valid dictionary files and their sections
// ---------------------------------------------------------------------------
const FILE_SECTIONS: Record<string, readonly string[]> = {
  common: ["navbar", "footer", "shared"],
  contact: ["main", "partnerlerimiz", "sosyalMedya"],
  corporate: [
    "bizKimiz",
    "ceoMesaji",
    "ekibimiz",
    "referanslar",
    "sertifikalar",
    "politikamiz",
    "basinOdasi",
    "haberler",
  ],
  home: [
    "hero",
    "pillars",
    "animation2",
    "midCta",
    "productCategories",
    "video",
    "faq",
    "finalCta",
  ],
  kvkk: [
    "breadcrumbHome",
    "breadcrumbKvkk",
    "badge",
    "title",
    "titleHighlight",
    "desc",
    "sectionLabel",
    "sectionTitle",
    "viewDetails",
    "links",
  ],
  products: [
    "shared",
    "havaHareketi",
    "iklimlendirme",
    "sogutmaVeIsitma",
    "havaYonetimi",
    "havaDagitimi",
    "havaFiltrasyonu",
    "aksesuarlar",
    "otomasyonMalzemeleri",
    "titresimVeSesIzolasyon",
    "banyoFanlari",
    "catiFanlari",
    "damperler",
    "dumanIsiTahliyeFanlari",
    "duvarTipiFanlar",
    "ecFanlar",
    "endustriyelFanlar",
    "exproofFanlar",
    "havuzNemAlmaSantrali",
    "hucreliFanlar",
    "isiGeriKazanimCihazlari",
    "kanalFanlari",
    "klimaSantralleri",
    "kovanTipiAksiyalFanlar",
    "mutfakFanlari",
    "siginakFanlari",
  ],
  services: [
    "cfdAnalizi",
    "devreAlma",
    "dumanKontrol",
    "teknikServis",
    "yerindeKesif",
  ],
  solutions: [
    "dumanIsiTahliye",
    "konforIklimlendirme",
    "hijyenikFiltrasyon",
    "endustriyelHavaYonetimi",
    "hayvancilikTesisleri",
    "trafoEnerjiOdalari",
    "seraTarimsal",
    "atexPatlamaKoruma",
    "akilliOtomasyon",
    "konutHavalandirma",
    "marinOffshore",
    "projeBazliOzelImalat",
    "cfdDanismanlik",
  ],
  sustainability: ["main", "co2", "geriDonusum"],
  technical: ["blog", "dokumanKutuphanesi", "fanSecici", "patentlerimiz"],
} as const;

const VALID_FILES = Object.keys(FILE_SECTIONS);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isValidLocale(v: unknown): v is Locale {
  return typeof v === "string" && VALID_LOCALES.includes(v as Locale);
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

function getDictionaryPath(locale: Locale, file: string): string {
  return path.join(
    process.cwd(),
    "src",
    "app",
    "[locale]",
    "dictionaries",
    locale,
    `${file}.json`
  );
}

function loadContentFromJsonFile(file: string, locale: Locale): Record<string, unknown> {
  const filePath = getDictionaryPath(locale, file);
  if (!fs.existsSync(filePath)) return {};
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Record<string, unknown>;
}

function authenticate(request: NextRequest): string | null {
  const token = getCookieValue(request, COOKIE_ACCESS_TOKEN);
  if (!token) return null;
  const payload = verifyToken(token);
  if (!payload || payload.type !== "access") return null;
  return payload.username;
}

/** DB'den oku, JSON dosyasına yaz (sayfa render için) */
async function syncDbToFile(file: string, locale: Locale) {
  const result = await pool.query(
    "SELECT section, data FROM page_content WHERE file = $1 AND locale = $2",
    [file, locale]
  );

  if (result.rows.length === 0) return;

  const content: Record<string, unknown> = {};
  for (const row of result.rows) {
    content[row.section] = row.data;
  }

  const filePath = getDictionaryPath(locale, file);
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2), "utf-8");
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
      { error: "Invalid locale. Must be one of: tr, en, ru" },
      { status: 400 }
    );
  }

  try {
    // Veritabanından oku
    const result = await pool.query(
      "SELECT section, data FROM page_content WHERE file = $1 AND locale = $2 ORDER BY section",
      [file, locale]
    );

    const data: Record<string, unknown> = {};
    for (const row of result.rows) {
      data[row.section] = row.data;
    }

    return NextResponse.json({
      file,
      locale,
      sections: FILE_SECTIONS[file],
      data,
    });
  } catch (err) {
    console.error(`Failed to read ${file} for locale ${locale} from DB, falling back to JSON:`, err);
    try {
      const data = loadContentFromJsonFile(file, locale);
      return NextResponse.json({
        file,
        locale,
        sections: FILE_SECTIONS[file],
        data,
        fallback: "json-file",
      });
    } catch (fallbackErr) {
      console.error(`Fallback read failed for ${file} / ${locale}:`, fallbackErr);
      return NextResponse.json(
        { error: "Failed to read content" },
        { status: 500 }
      );
    }
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
      { error: "Invalid locale. Must be one of: tr, en, ru" },
      { status: 400 }
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
