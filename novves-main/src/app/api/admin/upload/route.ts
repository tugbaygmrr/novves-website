import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import {
  verifyToken,
  verifyCsrfToken,
  getCookieValue,
  COOKIE_ACCESS_TOKEN,
  COOKIE_CSRF_TOKEN,
} from "@/lib/admin/auth";

export const dynamic = "force-dynamic";

// Proje kuralı: görseller PNG (veya modern WebP/AVIF) olmalı; JPG/SVG kabul edilmez.
const ALLOWED = new Map<string, string>([
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/avif", "avif"],
]);

// Dokümanlar: uzantı ile (DWG/DXF MIME'ı octet-stream gelebilir, güvenilmez).
const DOC_EXT = new Set(["pdf", "dwg", "dxf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "zip", "rar"]);

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB (görsel)
const MAX_DOC_BYTES = 40 * 1024 * 1024; // 40 MB (doküman)
const UPLOAD_DIR = path.join(process.cwd(), "public", "images", "uploads");
const DOC_UPLOAD_DIR = path.join(process.cwd(), "public", "documents", "uploads");

function authenticate(request: NextRequest): string | null {
  const token = getCookieValue(request, COOKIE_ACCESS_TOKEN);
  if (!token) return null;
  const payload = verifyToken(token);
  if (!payload || payload.type !== "access") return null;
  return payload.username;
}

/** Dosya adını güvenli bir slug'a indir (yol gezinmesi / özel karakter yok). */
function slugifyBase(name: string): string {
  const base = name.replace(/\.[^.]+$/, "");
  const slug = base
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return slug || "gorsel";
}

export async function POST(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // CSRF — içerik kaydetme ile aynı koruma
  const csrfHeader = request.headers.get("x-csrf-token") ?? "";
  const csrfCookie = getCookieValue(request, COOKIE_CSRF_TOKEN) ?? "";
  if (!verifyCsrfToken(csrfHeader, csrfCookie)) {
    return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Geçersiz form verisi" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Dosya bulunamadı" }, { status: 400 });
  }

  const imgExt = ALLOWED.get(file.type);
  const nameExt = file.name.split(".").pop()?.toLowerCase() ?? "";
  const isDoc = !imgExt && DOC_EXT.has(nameExt);

  if (!imgExt && !isDoc) {
    return NextResponse.json(
      { error: "Görsel (PNG/WebP/AVIF) veya doküman (PDF/DWG/DXF/DOCX/XLSX/PPTX/ZIP/RAR) yükleyin." },
      { status: 415 },
    );
  }

  if (file.size === 0) {
    return NextResponse.json({ error: "Boş dosya" }, { status: 400 });
  }
  const limit = isDoc ? MAX_DOC_BYTES : MAX_BYTES;
  if (file.size > limit) {
    return NextResponse.json(
      { error: `Dosya çok büyük (en fazla ${limit / (1024 * 1024)} MB).` },
      { status: 413 },
    );
  }

  const ext = isDoc ? nameExt : imgExt!;
  const dir = isDoc ? DOC_UPLOAD_DIR : UPLOAD_DIR;
  const publicBase = isDoc ? "/documents/uploads" : "/images/uploads";
  const fileName = `${slugifyBase(file.name)}-${randomUUID().slice(0, 8)}.${ext}`;

  try {
    await mkdir(dir, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(dir, fileName), buffer);
  } catch (err) {
    console.error("Yükleme başarısız:", err);
    return NextResponse.json({ error: "Dosya kaydedilemedi" }, { status: 500 });
  }

  return NextResponse.json({ success: true, path: `${publicBase}/${fileName}` });
}
