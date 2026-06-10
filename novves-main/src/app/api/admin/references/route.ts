import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/admin/rbac-server";
import { referenceSchema } from "@/lib/admin/schemas/reference";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 25;

export async function GET(request: NextRequest) {
  const auth = requirePermission(request, "references", "read");
  if (auth instanceof NextResponse) return auth;

  const sp = request.nextUrl.searchParams;
  const status = sp.get("status");
  const q = sp.get("q")?.trim();
  const page = Math.max(1, Number(sp.get("page")) || 1);

  const where: Prisma.ReferenceWhereInput = {};
  if (status === "DRAFT" || status === "PUBLISHED") where.status = status;
  if (q) {
    where.OR = [
      { firmName: { contains: q, mode: "insensitive" } },
      { sector: { contains: q, mode: "insensitive" } },
      { translations: { some: { projectName: { contains: q, mode: "insensitive" } } } },
    ];
  }

  const [rows, total] = await Promise.all([
    prisma.reference.findMany({
      where,
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
      include: {
        logo: { select: { path: true } },
        translations: { where: { locale: "tr" } },
      },
    }),
    prisma.reference.count({ where }),
  ]);

  const items = rows.map((r) => ({
    id: r.id,
    firmName: r.firmName,
    sector: r.sector,
    location: r.location,
    featured: r.featured,
    status: r.status,
    order: r.order,
    logo: r.logo?.path ?? null,
    projectName: r.translations[0]?.projectName ?? null,
  }));

  return NextResponse.json({ items, total, page, pageSize: PAGE_SIZE });
}

export async function POST(request: NextRequest) {
  const auth = requirePermission(request, "references", "write");
  if (auth instanceof NextResponse) return auth;
  const { user } = auth;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz JSON" }, { status: 400 });
  }

  const parsed = referenceSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Doğrulama hatası", issues: parsed.error.flatten() }, { status: 422 });
  }
  const data = parsed.data;

  const created = await prisma.reference.create({
    data: {
      firmName: data.firmName,
      logoId: data.logoId ?? null,
      sector: data.sector ?? null,
      location: data.location ?? null,
      completionDate: data.completionDate ? new Date(data.completionDate) : null,
      featured: data.featured,
      status: data.status,
      order: data.order,
      gallery: data.gallery,
      translations: {
        create: data.translations
          .filter((t) => (t.projectName ?? "") !== "" || (t.description ?? "") !== "")
          .map((t) => ({ locale: t.locale, projectName: t.projectName ?? null, description: t.description ?? null })),
      },
    },
  });

  await prisma.auditLog.create({
    data: { username: user.username, action: "create", entity: "Reference", entityId: String(created.id) },
  });

  return NextResponse.json({ success: true, id: created.id });
}
