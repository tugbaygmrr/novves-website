import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/admin/rbac-server";
import { menuItemSchema } from "@/lib/admin/schemas/menu";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const auth = requirePermission(request, "menu", "read");
  if (auth instanceof NextResponse) return auth;

  const sp = request.nextUrl.searchParams;
  const location = sp.get("location")?.trim();

  const where: Prisma.MenuItemWhereInput = {};
  if (location) where.location = location;

  const rows = await prisma.menuItem.findMany({
    where,
    orderBy: [{ location: "asc" }, { order: "asc" }, { id: "asc" }],
    include: { translations: { where: { locale: "tr" } } },
  });

  const items = rows.map((m) => ({
    id: m.id,
    location: m.location,
    parentId: m.parentId,
    href: m.href,
    icon: m.icon,
    order: m.order,
    visible: m.visible,
    external: m.external,
    label: m.translations[0]?.label ?? "—",
  }));

  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const auth = requirePermission(request, "menu", "write");
  if (auth instanceof NextResponse) return auth;
  const { user } = auth;

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

  const created = await prisma.menuItem.create({
    data: {
      location: data.location,
      parentId: data.parentId ?? null,
      href: data.href,
      icon: data.icon ?? null,
      order: data.order,
      visible: data.visible,
      external: data.external,
      translations: {
        create: data.translations.map((t) => ({ locale: t.locale, label: t.label })),
      },
    },
  });

  await prisma.auditLog.create({
    data: { username: user.username, action: "create", entity: "MenuItem", entityId: String(created.id) },
  });

  return NextResponse.json({ success: true, id: created.id });
}
