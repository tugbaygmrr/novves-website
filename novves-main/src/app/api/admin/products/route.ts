import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/admin/rbac-server";
import { productSchema } from "@/lib/admin/schemas/product";
import { slugify } from "@/lib/admin/slugify";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 25;

export async function GET(request: NextRequest) {
  const auth = requirePermission(request, "products", "read");
  if (auth instanceof NextResponse) return auth;

  const sp = request.nextUrl.searchParams;
  const categoryId = Number(sp.get("categoryId")) || undefined;
  const status = sp.get("status");
  const q = sp.get("q")?.trim();
  const page = Math.max(1, Number(sp.get("page")) || 1);

  const where: Prisma.ProductWhereInput = {};
  if (categoryId) where.categoryId = categoryId;
  if (status === "DRAFT" || status === "PUBLISHED") where.status = status;
  if (q) where.translations = { some: { name: { contains: q, mode: "insensitive" } } };

  const [rows, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
      include: {
        category: { include: { translations: { where: { locale: "tr" } } } },
        translations: { where: { locale: "tr" } },
      },
    }),
    prisma.product.count({ where }),
  ]);

  const items = rows.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.translations[0]?.name ?? p.slug,
    categoryName: p.category.translations[0]?.name ?? p.category.slug,
    status: p.status,
    featured: p.featured,
    coverPath: p.coverPath,
  }));

  return NextResponse.json({ items, total, page, pageSize: PAGE_SIZE });
}

async function uniqueSlug(base: string): Promise<string> {
  let slug = base;
  let i = 2;
  while (await prisma.product.findUnique({ where: { slug } })) slug = `${base}-${i++}`;
  return slug;
}

export async function POST(request: NextRequest) {
  const auth = requirePermission(request, "products", "write");
  if (auth instanceof NextResponse) return auth;
  const { user } = auth;

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
  const trName = data.translations.find((t) => t.locale === "tr")?.name ?? data.translations[0].name;
  const slug = await uniqueSlug(data.slug ? slugify(data.slug) : slugify(trName, "urun"));

  const created = await prisma.product.create({
    data: {
      slug,
      categoryId: data.categoryId,
      coverPath: data.coverPath ?? null,
      gallery: data.gallery,
      specs: data.specs,
      files: data.files,
      relatedSlugs: data.relatedSlugs,
      featured: data.featured,
      status: data.status,
      order: data.order,
      translations: {
        create: data.translations.map((t) => ({
          locale: t.locale,
          name: t.name,
          shortDesc: t.shortDesc ?? null,
          longDesc: t.longDesc ?? null,
        })),
      },
    },
  });

  await prisma.auditLog.create({
    data: { username: user.username, action: "create", entity: "Product", entityId: String(created.id) },
  });

  return NextResponse.json({ success: true, id: created.id, slug });
}
