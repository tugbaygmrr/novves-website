import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/admin/rbac-server";
import { teamMemberSchema } from "@/lib/admin/schemas/team-member";

export const dynamic = "force-dynamic";

async function parseId(params: Promise<{ id: string }>): Promise<number | null> {
  const { id } = await params;
  const n = Number(id);
  return Number.isNaN(n) ? null : n;
}

export async function GET(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const auth = requirePermission(request, "team", "read");
  if (auth instanceof NextResponse) return auth;
  const id = await parseId(ctx.params);
  if (id === null) return NextResponse.json({ error: "Geçersiz id" }, { status: 400 });

  const member = await prisma.teamMember.findUnique({
    where: { id },
    include: { photo: { select: { id: true, path: true } }, translations: true },
  });
  if (!member) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
  return NextResponse.json({ member });
}

export async function PUT(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const auth = requirePermission(request, "team", "write");
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
  const parsed = teamMemberSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Doğrulama hatası", issues: parsed.error.flatten() }, { status: 422 });
  }
  const data = parsed.data;

  const exists = await prisma.teamMember.findUnique({ where: { id }, select: { id: true } });
  if (!exists) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });

  await prisma.$transaction([
    prisma.teamMember.update({
      where: { id },
      data: {
        photoId: data.photoId ?? null,
        email: data.email ?? null,
        phone: data.phone ?? null,
        linkedin: data.linkedin ?? null,
        department: data.department ?? null,
        status: data.status,
        order: data.order,
      },
    }),
    prisma.teamMemberTranslation.deleteMany({ where: { memberId: id } }),
    prisma.teamMemberTranslation.createMany({
      data: data.translations.map((t) => ({
        memberId: id,
        locale: t.locale,
        name: t.name,
        title: t.title ?? null,
        bio: t.bio ?? null,
      })),
    }),
  ]);

  await prisma.auditLog.create({
    data: { username: user.username, action: "update", entity: "TeamMember", entityId: String(id) },
  });
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const auth = requirePermission(request, "team", "delete");
  if (auth instanceof NextResponse) return auth;
  const { user } = auth;
  const id = await parseId(ctx.params);
  if (id === null) return NextResponse.json({ error: "Geçersiz id" }, { status: 400 });

  const exists = await prisma.teamMember.findUnique({ where: { id }, select: { id: true } });
  if (!exists) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });

  await prisma.teamMember.delete({ where: { id } });
  await prisma.auditLog.create({
    data: { username: user.username, action: "delete", entity: "TeamMember", entityId: String(id) },
  });
  return NextResponse.json({ success: true });
}
