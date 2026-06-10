import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/admin/rbac-server";
import { productSchema } from "@/lib/admin/schemas/product";

export const dynamic = "force-dynamic";

async function parseId(params: Promise<{ id: string }>): Promise<number | null> {
  const { id } = await params;
  const n = Number(id);
  return Number.isNaN(n) ? null : n;
}

export async function GET(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const auth = requirePermission(request, "products", "read");
  if (auth instanceof NextResponse) return auth;
  const id = await parseId(ctx.params);
  if (id === null) return NextResponse.json({ error: "Geçersiz id" }, { status: 400 });

  const product = await prisma.product.findUnique({ where: { id }, include: { translations: true } });
  if (!product) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
  return NextResponse.json({ product });
}

export async function PUT(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const auth = requirePermission(request, "products", "write");
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
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Doğrulama hatası", issues: parsed.error.flatten() }, { status: 422 });
  }
  const data = parsed.data;

  const exists = await prisma.product.findUnique({ where: { id }, select: { id: true } });
  if (!exists) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });

  await prisma.$transaction([
    prisma.product.update({
      where: { id },
      data: {
        categoryId: data.categoryId,
        coverPath: data.coverPath ?? null,
        gallery: data.gallery,
        specs: data.specs,
        files: data.files,
        relatedSlugs: data.relatedSlugs,
        featured: data.featured,
        status: data.status,
        order: data.order,
      },
    }),
    prisma.productTranslation.deleteMany({ where: { productId: id } }),
    prisma.productTranslation.createMany({
      data: data.translations.map((t) => ({
        productId: id,
        locale: t.locale,
        name: t.name,
        shortDesc: t.shortDesc ?? null,
        longDesc: t.longDesc ?? null,
      })),
    }),
  ]);

  await prisma.auditLog.create({
    data: { username: user.username, action: "update", entity: "Product", entityId: String(id) },
  });
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const auth = requirePermission(request, "products", "delete");
  if (auth instanceof NextResponse) return auth;
  const { user } = auth;
  const id = await parseId(ctx.params);
  if (id === null) return NextResponse.json({ error: "Geçersiz id" }, { status: 400 });

  const exists = await prisma.product.findUnique({ where: { id }, select: { id: true } });
  if (!exists) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });

  await prisma.product.delete({ where: { id } });
  await prisma.auditLog.create({
    data: { username: user.username, action: "delete", entity: "Product", entityId: String(id) },
  });
  return NextResponse.json({ success: true });
}
