import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/admin/rbac-server";
import { articleSchema } from "@/lib/admin/schemas/article";

export const dynamic = "force-dynamic";

async function parseId(params: Promise<{ id: string }>): Promise<number | null> {
  const { id } = await params;
  const n = Number(id);
  return Number.isNaN(n) ? null : n;
}

export async function GET(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const auth = requirePermission(request, "blog", "read");
  if (auth instanceof NextResponse) return auth;
  const id = await parseId(ctx.params);
  if (id === null) return NextResponse.json({ error: "Geçersiz id" }, { status: 400 });

  const article = await prisma.article.findUnique({
    where: { id },
    include: { cover: { select: { id: true, path: true } }, translations: true },
  });
  if (!article) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
  return NextResponse.json({ article });
}

export async function PUT(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const auth = requirePermission(request, "blog", "write");
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
  const parsed = articleSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Doğrulama hatası", issues: parsed.error.flatten() }, { status: 422 });
  }
  const data = parsed.data;

  const exists = await prisma.article.findUnique({ where: { id }, select: { id: true } });
  if (!exists) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });

  await prisma.$transaction([
    prisma.article.update({
      where: { id },
      data: {
        coverId: data.coverId ?? null,
        category: data.category ?? null,
        tags: data.tags,
        author: data.author ?? null,
        status: data.status,
        publishAt: data.publishAt ? new Date(data.publishAt) : null,
        order: data.order,
      },
    }),
    prisma.articleTranslation.deleteMany({ where: { articleId: id } }),
    prisma.articleTranslation.createMany({
      data: data.translations.map((t) => ({
        articleId: id,
        locale: t.locale,
        title: t.title,
        excerpt: t.excerpt ?? null,
        body: t.body ?? null,
      })),
    }),
  ]);

  await prisma.auditLog.create({
    data: { username: user.username, action: "update", entity: "Article", entityId: String(id) },
  });
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const auth = requirePermission(request, "blog", "delete");
  if (auth instanceof NextResponse) return auth;
  const { user } = auth;
  const id = await parseId(ctx.params);
  if (id === null) return NextResponse.json({ error: "Geçersiz id" }, { status: 400 });

  const exists = await prisma.article.findUnique({ where: { id }, select: { id: true } });
  if (!exists) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });

  await prisma.article.delete({ where: { id } });
  await prisma.auditLog.create({
    data: { username: user.username, action: "delete", entity: "Article", entityId: String(id) },
  });
  return NextResponse.json({ success: true });
}
