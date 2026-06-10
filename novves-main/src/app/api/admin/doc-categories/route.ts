import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/admin/rbac-server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const auth = requirePermission(request, "technical", "read");
  if (auth instanceof NextResponse) return auth;

  const categories = await prisma.docCategory.findMany({
    orderBy: { order: "asc" },
    include: { translations: true, _count: { select: { documents: true } } },
  });

  const items = categories.map((c) => ({
    id: c.id,
    slug: c.slug,
    order: c.order,
    name: c.translations.find((t) => t.locale === "tr")?.name ?? c.slug,
    translations: c.translations,
    docCount: c._count.documents,
  }));

  return NextResponse.json({ items });
}
