import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/admin/rbac-server";

export const dynamic = "force-dynamic";

const seoMetaSchema = z.object({
  path: z.string().trim().min(1).max(300),
  locale: z.string().trim().min(2).max(10),
  title: z.string().trim().max(200).nullish(),
  description: z.string().trim().max(400).nullish(),
  canonical: z.string().trim().max(500).nullish(),
  ogImage: z.string().trim().max(500).nullish(),
  keywords: z.array(z.string().trim().max(60)).max(30).default([]),
  noindex: z.boolean().default(false),
});

export async function GET(request: NextRequest) {
  const auth = requirePermission(request, "seo", "read");
  if (auth instanceof NextResponse) return auth;
  const items = await prisma.seoMeta.findMany({ orderBy: [{ path: "asc" }, { locale: "asc" }] });
  return NextResponse.json({ items });
}

export async function PUT(request: NextRequest) {
  const auth = requirePermission(request, "seo", "write");
  if (auth instanceof NextResponse) return auth;
  const { user } = auth;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz JSON" }, { status: 400 });
  }
  const parsed = seoMetaSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Doğrulama hatası" }, { status: 422 });
  }
  const d = parsed.data;
  // path normalize: locale öneki kaldır, baştaki / koru
  const path = d.path.startsWith("/") ? d.path : `/${d.path}`;

  await prisma.seoMeta.upsert({
    where: { path_locale: { path, locale: d.locale } },
    update: {
      title: d.title ?? null,
      description: d.description ?? null,
      canonical: d.canonical ?? null,
      ogImage: d.ogImage ?? null,
      keywords: d.keywords,
      noindex: d.noindex,
      updatedBy: user.username,
    },
    create: {
      path,
      locale: d.locale,
      title: d.title ?? null,
      description: d.description ?? null,
      canonical: d.canonical ?? null,
      ogImage: d.ogImage ?? null,
      keywords: d.keywords,
      noindex: d.noindex,
      updatedBy: user.username,
    },
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const auth = requirePermission(request, "seo", "delete");
  if (auth instanceof NextResponse) return auth;
  const id = Number(request.nextUrl.searchParams.get("id"));
  if (Number.isNaN(id)) return NextResponse.json({ error: "Geçersiz id" }, { status: 400 });
  await prisma.seoMeta.delete({ where: { id } }).catch(() => null);
  return NextResponse.json({ success: true });
}
