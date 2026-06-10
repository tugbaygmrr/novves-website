import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/admin/rbac-server";
import { technicalDocumentSchema } from "@/lib/admin/schemas/technical-document";
import { slugify } from "@/lib/admin/slugify";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 25;

// ── Liste ─────────────────────────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  const auth = requirePermission(request, "technical", "read");
  if (auth instanceof NextResponse) return auth;

  const sp = request.nextUrl.searchParams;
  const categoryId = Number(sp.get("categoryId")) || undefined;
  const status = sp.get("status");
  const q = sp.get("q")?.trim();
  const page = Math.max(1, Number(sp.get("page")) || 1);

  const where: Prisma.TechnicalDocumentWhereInput = {};
  if (categoryId) where.categoryId = categoryId;
  if (status === "DRAFT" || status === "PUBLISHED") where.status = status;
  if (q) where.translations = { some: { title: { contains: q, mode: "insensitive" } } };

  const [docs, total] = await Promise.all([
    prisma.technicalDocument.findMany({
      where,
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
      include: {
        category: { include: { translations: { where: { locale: "tr" } } } },
        translations: { where: { locale: "tr" } },
        file: { select: { id: true, path: true, fileName: true, size: true } },
        cover: { select: { id: true, path: true } },
      },
    }),
    prisma.technicalDocument.count({ where }),
  ]);

  const items = docs.map((d) => ({
    id: d.id,
    slug: d.slug,
    title: d.translations[0]?.title ?? d.slug,
    categoryName: d.category.translations[0]?.name ?? d.category.slug,
    categoryId: d.categoryId,
    version: d.version,
    status: d.status,
    publishDate: d.publishDate,
    file: d.file,
    cover: d.cover,
    updatedAt: d.updatedAt,
  }));

  return NextResponse.json({ items, total, page, pageSize: PAGE_SIZE });
}

// ── Oluştur ───────────────────────────────────────────────────────────────────
async function uniqueSlug(base: string): Promise<string> {
  let slug = base;
  let i = 2;
  while (await prisma.technicalDocument.findUnique({ where: { slug } })) {
    slug = `${base}-${i++}`;
  }
  return slug;
}

export async function POST(request: NextRequest) {
  const auth = requirePermission(request, "technical", "write");
  if (auth instanceof NextResponse) return auth;
  const { user } = auth;

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

  const trTitle = data.translations.find((t) => t.locale === "tr")?.title ?? data.translations[0].title;
  const slug = await uniqueSlug(data.slug ? slugify(data.slug) : slugify(trTitle, "dokuman"));

  const created = await prisma.technicalDocument.create({
    data: {
      slug,
      categoryId: data.categoryId,
      fileId: data.fileId,
      coverId: data.coverId ?? null,
      version: data.version ?? null,
      publishDate: data.publishDate ? new Date(data.publishDate) : null,
      productSlug: data.productSlug ?? null,
      status: data.status,
      order: data.order,
      createdBy: user.username,
      translations: {
        create: data.translations.map((t) => ({
          locale: t.locale,
          title: t.title,
          description: t.description ?? null,
        })),
      },
    },
  });

  await prisma.auditLog.create({
    data: { username: user.username, action: "create", entity: "TechnicalDocument", entityId: String(created.id) },
  });

  return NextResponse.json({ success: true, id: created.id, slug });
}
