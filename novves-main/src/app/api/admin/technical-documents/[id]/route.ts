import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/admin/rbac-server";
import { technicalDocumentSchema } from "@/lib/admin/schemas/technical-document";

export const dynamic = "force-dynamic";

async function parseId(params: Promise<{ id: string }>): Promise<number | null> {
  const { id } = await params;
  const n = Number(id);
  return Number.isNaN(n) ? null : n;
}

// ── Tekil getir (düzenleme formu) ─────────────────────────────────────────────
export async function GET(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const auth = requirePermission(request, "technical", "read");
  if (auth instanceof NextResponse) return auth;

  const id = await parseId(ctx.params);
  if (id === null) return NextResponse.json({ error: "Geçersiz id" }, { status: 400 });

  const doc = await prisma.technicalDocument.findUnique({
    where: { id },
    include: {
      translations: true,
      file: { select: { id: true, path: true, fileName: true, size: true } },
      cover: { select: { id: true, path: true } },
    },
  });
  if (!doc) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });

  return NextResponse.json({ doc });
}

// ── Güncelle ──────────────────────────────────────────────────────────────────
export async function PUT(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const auth = requirePermission(request, "technical", "write");
  if (auth instanceof NextResponse) return auth;
  const { user } = auth;

  const id = await parseId(ctx.params);
  if (id === null) return NextResponse.json({ error: "Geçersiz id" }, { status: 400 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz JSON" }, { status: 400 });
  }

  const parsed = technicalDocumentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Doğrulama hatası", issues: parsed.error.flatten() }, { status: 422 });
  }
  const data = parsed.data;

  const exists = await prisma.technicalDocument.findUnique({ where: { id }, select: { id: true } });
  if (!exists) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });

  await prisma.$transaction([
    prisma.technicalDocument.update({
      where: { id },
      data: {
        categoryId: data.categoryId,
        fileId: data.fileId,
        coverId: data.coverId ?? null,
        version: data.version ?? null,
        publishDate: data.publishDate ? new Date(data.publishDate) : null,
        productSlug: data.productSlug ?? null,
        status: data.status,
        order: data.order,
      },
    }),
    prisma.technicalDocumentTranslation.deleteMany({ where: { documentId: id } }),
    prisma.technicalDocumentTranslation.createMany({
      data: data.translations.map((t) => ({
        documentId: id,
        locale: t.locale,
        title: t.title,
        description: t.description ?? null,
      })),
    }),
  ]);

  await prisma.auditLog.create({
    data: { username: user.username, action: "update", entity: "TechnicalDocument", entityId: String(id) },
  });

  return NextResponse.json({ success: true });
}

// ── Sil ───────────────────────────────────────────────────────────────────────
export async function DELETE(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const auth = requirePermission(request, "technical", "delete");
  if (auth instanceof NextResponse) return auth;
  const { user } = auth;

  const id = await parseId(ctx.params);
  if (id === null) return NextResponse.json({ error: "Geçersiz id" }, { status: 400 });

  const exists = await prisma.technicalDocument.findUnique({ where: { id }, select: { id: true } });
  if (!exists) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });

  await prisma.technicalDocument.delete({ where: { id } }); // çeviriler cascade
  await prisma.auditLog.create({
    data: { username: user.username, action: "delete", entity: "TechnicalDocument", entityId: String(id) },
  });

  return NextResponse.json({ success: true });
}
