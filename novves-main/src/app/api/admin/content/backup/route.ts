import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import {
  verifyToken,
  getCookieValue,
  COOKIE_ACCESS_TOKEN,
} from "@/lib/admin/auth";

export const dynamic = "force-dynamic";

const VALID_LOCALES = ["tr", "en", "ru"] as const;
type Locale = (typeof VALID_LOCALES)[number];

const VALID_FILES = [
  "common",
  "contact",
  "corporate",
  "home",
  "kvkk",
  "products",
  "services",
  "solutions",
  "sustainability",
  "technical",
] as const;
type DictFile = (typeof VALID_FILES)[number];

function isValidLocale(v: unknown): v is Locale {
  return typeof v === "string" && VALID_LOCALES.includes(v as Locale);
}

function isValidFile(v: unknown): v is DictFile {
  return typeof v === "string" && VALID_FILES.includes(v as DictFile);
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

function authenticate(request: NextRequest): boolean {
  const token = getCookieValue(request, COOKIE_ACCESS_TOKEN);
  if (!token) return false;
  const payload = verifyToken(token);
  return payload !== null && payload.type === "access";
}

// ---------------------------------------------------------------------------
// POST /api/admin/content/backup
// Creates a backup of ALL dictionary files for all locales
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results: {
    locale: string;
    file: string;
    success: boolean;
    error?: string;
  }[] = [];

  for (const locale of VALID_LOCALES) {
    for (const file of VALID_FILES) {
      const filePath = getDictionaryPath(locale, file);
      const backupPath = filePath + ".backup";
      try {
        if (!fs.existsSync(filePath)) {
          results.push({
            locale,
            file,
            success: false,
            error: "Source file not found",
          });
          continue;
        }
        fs.copyFileSync(filePath, backupPath);
        results.push({ locale, file, success: true });
      } catch (err) {
        console.error(`Failed to backup ${locale}/${file}.json:`, err);
        results.push({
          locale,
          file,
          success: false,
          error: "Failed to create backup",
        });
      }
    }
  }

  const allSuccess = results.every((r) => r.success);
  return NextResponse.json(
    {
      success: allSuccess,
      message: allSuccess
        ? "All backups created successfully"
        : "Some backups failed",
      results,
    },
    { status: allSuccess ? 200 : 500 }
  );
}

// ---------------------------------------------------------------------------
// GET /api/admin/content/backup?locale=tr&file=home
// Restores a specific dictionary file from its .backup
// ---------------------------------------------------------------------------
export async function GET(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const locale = request.nextUrl.searchParams.get("locale");
  if (!isValidLocale(locale)) {
    return NextResponse.json(
      { error: "Invalid locale. Must be one of: tr, en, ru" },
      { status: 400 }
    );
  }

  const file = request.nextUrl.searchParams.get("file");
  if (!isValidFile(file)) {
    return NextResponse.json(
      {
        error: `Invalid file. Must be one of: ${VALID_FILES.join(", ")}`,
      },
      { status: 400 }
    );
  }

  const filePath = getDictionaryPath(locale, file);
  const backupPath = filePath + ".backup";

  try {
    if (!fs.existsSync(backupPath)) {
      return NextResponse.json(
        {
          error: `No backup found for "${file}.json" locale "${locale}"`,
        },
        { status: 404 }
      );
    }

    fs.copyFileSync(backupPath, filePath);

    return NextResponse.json({
      success: true,
      message: `Restored "${file}.json" for locale "${locale}" from backup`,
    });
  } catch (err) {
    console.error(`Failed to restore ${locale}/${file}.json:`, err);
    return NextResponse.json(
      { error: "Failed to restore from backup" },
      { status: 500 }
    );
  }
}
