import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/admin/rbac-server";
import { referenceSchema } from "@/lib/admin/schemas/reference";

export const dynamic = "force-dynamic";

async function parseId(params: Promise<{ id: string }>): Promise<number | null> {
  const { id } = await params;
  const n = Number(id);
  return Number.isNaN(n) ? null : n;
}

export async function GET(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const auth = requirePermission(request, "references", "read");
  if (auth instanceof NextResponse) return auth;
  const id = await parseId(ctx.params);
  if (id === null) return NextResponse.json({ error: "Geçersiz id" }, { status: 400 });

  const ref = await prisma.reference.findUnique({
    where: { id },
    include: { logo: { select: { id: true, path: true } }, translations: true },
  });
  if (!ref) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
  return NextResponse.json({ reference: ref });
}

export async function PUT(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const auth = requirePermission(request, "references", "write");
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
  const parsed = referenceSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Doğrulama hatası", issues: parsed.error.flatten() }, { status: 422 });
  }
  const data = parsed.data;

  const exists = await prisma.reference.findUnique({ where: { id }, select: { id: true } });
  if (!exists) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });

  await prisma.$transaction([
    prisma.reference.update({
      where: { id },
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
      },
    }),
    prisma.referenceTranslation.deleteMany({ where: { referenceId: id } }),
    prisma.referenceTranslation.createMany({
      data: data.translations
        .filter((t) => (t.projectName ?? "") !== "" || (t.description ?? "") !== "")
        .map((t) => ({ referenceId: id, locale: t.locale, projectName: t.projectName ?? null, description: t.description ?? null })),
    }),
  ]);

  await prisma.auditLog.create({
    data: { username: user.username, action: "update", entity: "Reference", entityId: String(id) },
  });
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const auth = requirePermission(request, "references", "delete");
  if (auth instanceof NextResponse) return auth;
  const { user } = auth;
  const id = await parseId(ctx.params);
  if (id === null) return NextResponse.json({ error: "Geçersiz id" }, { status: 400 });

  const exists = await prisma.reference.findUnique({ where: { id }, select: { id: true } });
  if (!exists) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });

  await prisma.reference.delete({ where: { id } });
  await prisma.auditLog.create({
    data: { username: user.username, action: "delete", entity: "Reference", entityId: String(id) },
  });
  return NextResponse.json({ success: true });
}
