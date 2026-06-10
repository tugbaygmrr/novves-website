import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import sharp from "sharp";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/admin/rbac-server";

export const dynamic = "force-dynamic";

// Görseller: MIME ile (tarayıcı güvenilir). SVG kabul edilmez (XSS).
const IMAGE_MIME: Record<string, string> = {
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/jpeg": "jpg",
  "image/gif": "gif",
};
// Dokümanlar: uzantı ile (DWG/DXF MIME'ı octet-stream gelir, güvenilmez).
const DOC_EXT = new Set(["pdf", "dwg", "dxf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "zip", "rar"]);

const MAX_BYTES = 40 * 1024 * 1024; // 40 MB
const MAX_IMAGE_WIDTH = 2400;

function slugifyBase(name: string): string {
  const base = name.replace(/\.[^.]+$/, "");
  const slug = base
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return slug || "dosya";
}

export async function POST(request: NextRequest) {
  const auth = requirePermission(request, "mediaLibrary", "write");
  if (auth instanceof NextResponse) return auth;
  const { user } = auth;

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
  if (file.size === 0) return NextResponse.json({ error: "Boş dosya" }, { status: 400 });
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: `Dosya çok büyük (en fazla ${MAX_BYTES / 1024 / 1024} MB)` }, { status: 413 });
  }

  const folderIdRaw = form.get("folderId");
  const folderId = folderIdRaw ? Number(folderIdRaw) : null;
  const alt = (form.get("alt") as string | null)?.slice(0, 300) ?? null;

  const nameExt = file.name.split(".").pop()?.toLowerCase() ?? "";
  const imgExt = IMAGE_MIME[file.type];

  let kind: "IMAGE" | "DOCUMENT";
  let finalExt: string;
  let subdir: string;
  if (imgExt) {
    kind = "IMAGE";
    finalExt = imgExt;
    subdir = path.join("public", "images", "uploads");
  } else if (DOC_EXT.has(nameExt)) {
    kind = "DOCUMENT";
    finalExt = nameExt;
    subdir = path.join("public", "documents", "uploads");
  } else {
    return NextResponse.json(
      { error: "Desteklenmeyen dosya türü. Görsel (PNG/WebP/AVIF/JPG/GIF) veya doküman (PDF/DWG/DXF/DOCX/XLSX/ZIP/RAR) yükleyin." },
      { status: 415 },
    );
  }

  let buffer = Buffer.from(await file.arrayBuffer());
  let width: number | null = null;
  let height: number | null = null;

  if (kind === "IMAGE") {
    try {
      const img = sharp(buffer, { failOn: "none" }).rotate(); // EXIF yönünü uygula
      const meta = await img.metadata();
      if (meta.width && meta.width > MAX_IMAGE_WIDTH) {
        buffer = Buffer.from(await img.resize({ width: MAX_IMAGE_WIDTH, withoutEnlargement: true }).toBuffer());
        const m2 = await sharp(buffer).metadata();
        width = m2.width ?? null;
        height = m2.height ?? null;
      } else {
        width = meta.width ?? null;
        height = meta.height ?? null;
      }
    } catch {
      // sharp işleyemezse orijinali olduğu gibi sakla
    }
  }

  const fileName = `${slugifyBase(file.name)}-${randomUUID().slice(0, 8)}.${finalExt}`;
  const publicPath =
    kind === "IMAGE" ? `/images/uploads/${fileName}` : `/documents/uploads/${fileName}`;

  try {
    const dir = path.join(process.cwd(), subdir);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, fileName), buffer);
  } catch (err) {
    console.error("Medya yazma hatası:", err);
    return NextResponse.json({ error: "Dosya kaydedilemedi" }, { status: 500 });
  }

  const media = await prisma.media.create({
    data: {
      kind,
      fileName: file.name,
      path: publicPath,
      mimeType: file.type || `application/${finalExt}`,
      size: buffer.length,
      width,
      height,
      alt,
      folderId: folderId && !Number.isNaN(folderId) ? folderId : null,
      uploadedBy: user.username,
    },
  });

  return NextResponse.json({ success: true, media });
}
