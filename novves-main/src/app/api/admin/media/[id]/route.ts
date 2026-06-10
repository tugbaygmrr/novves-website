import { NextRequest, NextResponse } from "next/server";
import { unlink } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/admin/rbac-server";

export const dynamic = "force-dynamic";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = requirePermission(request, "mediaLibrary", "delete");
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  const mediaId = Number(id);
  if (Number.isNaN(mediaId)) {
    return NextResponse.json({ error: "Geçersiz id" }, { status: 400 });
  }

  const media = await prisma.media.findUnique({ where: { id: mediaId } });
  if (!media) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });

  // Diskten sil (yoksa sessiz geç)
  try {
    await unlink(path.join(process.cwd(), "public", media.path.replace(/^\//, "")));
  } catch {
    // dosya zaten yok
  }

  await prisma.media.delete({ where: { id: mediaId } });
  return NextResponse.json({ success: true });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = requirePermission(request, "mediaLibrary", "write");
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  const mediaId = Number(id);
  if (Number.isNaN(mediaId)) {
    return NextResponse.json({ error: "Geçersiz id" }, { status: 400 });
  }

  let body: { alt?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz gövde" }, { status: 400 });
  }

  const media = await prisma.media.update({
    where: { id: mediaId },
    data: { alt: typeof body.alt === "string" ? body.alt.slice(0, 300) : undefined },
  });
  return NextResponse.json({ success: true, media });
}
