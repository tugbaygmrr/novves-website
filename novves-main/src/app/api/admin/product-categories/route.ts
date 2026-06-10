import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/admin/rbac-server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const auth = requirePermission(request, "products", "read");
  if (auth instanceof NextResponse) return auth;

  const cats = await prisma.productCategory.findMany({
    orderBy: { order: "asc" },
    include: { translations: { where: { locale: "tr" } }, _count: { select: { products: true } } },
  });

  const items = cats.map((c) => ({
    id: c.id,
    slug: c.slug,
    name: c.translations[0]?.name ?? c.slug,
    iconSlug: c.iconSlug,
    order: c.order,
    productCount: c._count.products,
  }));

  return NextResponse.json({ items });
}
