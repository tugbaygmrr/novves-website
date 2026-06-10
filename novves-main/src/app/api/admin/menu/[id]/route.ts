import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/admin/rbac-server";
import { menuItemSchema } from "@/lib/admin/schemas/menu";

export const dynamic = "force-dynamic";

async function parseId(params: Promise<{ id: string }>): Promise<number | null> {
  const { id } = await params;
  const n = Number(id);
  return Number.isNaN(n) ? null : n;
}

export async function GET(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const auth = requirePermission(request, "menu", "read");
  if (auth instanceof NextResponse) return auth;
  const id = await parseId(ctx.params);
  if (id === null) return NextResponse.json({ error: "Geçersiz id" }, { status: 400 });

  const item = await prisma.menuItem.findUnique({
    where: { id },
    include: { translations: true },
  });
  if (!item) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
  return NextResponse.json({ item });
}

export async function PUT(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const auth = requirePermission(request, "menu", "write");
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
  const parsed = menuItemSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Doğrulama hatası", issues: parsed.error.flatten() }, { status: 422 });
  }
  const data = parsed.data;

  const exists = await prisma.menuItem.findUnique({ where: { id }, select: { id: true } });
  if (!exists) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });

  // Kendi alt öğesi olamaz (döngü engeli).
  const parentId = data.parentId && data.parentId !== id ? data.parentId : null;

  await prisma.$transaction([
    prisma.menuItem.update({
      where: { id },
      data: {
        location: data.location,
        parentId,
        href: data.href,
        icon: data.icon ?? null,
        order: data.order,
        visible: data.visible,
        external: data.external,
      },
    }),
    prisma.menuItemTranslation.deleteMany({ where: { itemId: id } }),
    prisma.menuItemTranslation.createMany({
      data: data.translations.map((t) => ({ itemId: id, locale: t.locale, label: t.label })),
    }),
  ]);

  await prisma.auditLog.create({
    data: { username: user.username, action: "update", entity: "MenuItem", entityId: String(id) },
  });
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const auth = requirePermission(request, "menu", "delete");
  if (auth instanceof NextResponse) return auth;
  const { user } = auth;
  const id = await parseId(ctx.params);
  if (id === null) return NextResponse.json({ error: "Geçersiz id" }, { status: 400 });

  const exists = await prisma.menuItem.findUnique({ where: { id }, select: { id: true } });
  if (!exists) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });

  await prisma.menuItem.delete({ where: { id } });
  await prisma.auditLog.create({
    data: { username: user.username, action: "delete", entity: "MenuItem", entityId: String(id) },
  });
  return NextResponse.json({ success: true });
}
