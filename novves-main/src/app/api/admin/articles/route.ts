import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/admin/rbac-server";
import { articleSchema } from "@/lib/admin/schemas/article";
import { slugify } from "@/lib/admin/slugify";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 25;

export async function GET(request: NextRequest) {
  const auth = requirePermission(request, "blog", "read");
  if (auth instanceof NextResponse) return auth;

  const sp = request.nextUrl.searchParams;
  const status = sp.get("status");
  const category = sp.get("category")?.trim();
  const q = sp.get("q")?.trim();
  const page = Math.max(1, Number(sp.get("page")) || 1);

  const where: Prisma.ArticleWhereInput = {};
  if (status === "DRAFT" || status === "PUBLISHED") where.status = status;
  if (category) where.category = category;
  if (q) where.translations = { some: { title: { contains: q, mode: "insensitive" } } };

  const [rows, total] = await Promise.all([
    prisma.article.findMany({
      where,
      orderBy: [{ publishAt: "desc" }, { createdAt: "desc" }],
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
      include: { cover: { select: { path: true } }, translations: { where: { locale: "tr" } } },
    }),
    prisma.article.count({ where }),
  ]);

  const items = rows.map((a) => ({
    id: a.id,
    slug: a.slug,
    title: a.translations[0]?.title ?? a.slug,
    category: a.category,
    status: a.status,
    publishAt: a.publishAt,
    cover: a.cover?.path ?? null,
  }));

  return NextResponse.json({ items, total, page, pageSize: PAGE_SIZE });
}

async function uniqueSlug(base: string): Promise<string> {
  let slug = base;
  let i = 2;
  while (await prisma.article.findUnique({ where: { slug } })) slug = `${base}-${i++}`;
  return slug;
}

export async function POST(request: NextRequest) {
  const auth = requirePermission(request, "blog", "write");
  if (auth instanceof NextResponse) return auth;
  const { user } = auth;

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
  const trTitle = data.translations.find((t) => t.locale === "tr")?.title ?? data.translations[0].title;
  const slug = await uniqueSlug(data.slug ? slugify(data.slug) : slugify(trTitle, "yazi"));

  const created = await prisma.article.create({
    data: {
      slug,
      coverId: data.coverId ?? null,
      category: data.category ?? null,
      tags: data.tags,
      author: data.author ?? null,
      status: data.status,
      publishAt: data.publishAt ? new Date(data.publishAt) : null,
      order: data.order,
      translations: {
        create: data.translations.map((t) => ({
          locale: t.locale,
          title: t.title,
          excerpt: t.excerpt ?? null,
          body: t.body ?? null,
        })),
      },
    },
  });

  await prisma.auditLog.create({
    data: { username: user.username, action: "create", entity: "Article", entityId: String(created.id) },
  });

  return NextResponse.json({ success: true, id: created.id, slug });
}
