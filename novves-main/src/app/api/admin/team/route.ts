import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/admin/rbac-server";
import { teamMemberSchema } from "@/lib/admin/schemas/team-member";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 50;

export async function GET(request: NextRequest) {
  const auth = requirePermission(request, "team", "read");
  if (auth instanceof NextResponse) return auth;

  const sp = request.nextUrl.searchParams;
  const q = sp.get("q")?.trim();
  const page = Math.max(1, Number(sp.get("page")) || 1);

  const where: Prisma.TeamMemberWhereInput = {};
  if (q) {
    where.OR = [
      { department: { contains: q, mode: "insensitive" } },
      { translations: { some: { name: { contains: q, mode: "insensitive" } } } },
    ];
  }

  const [rows, total] = await Promise.all([
    prisma.teamMember.findMany({
      where,
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
      include: { photo: { select: { path: true } }, translations: { where: { locale: "tr" } } },
    }),
    prisma.teamMember.count({ where }),
  ]);

  const items = rows.map((m) => ({
    id: m.id,
    name: m.translations[0]?.name ?? "—",
    title: m.translations[0]?.title ?? null,
    department: m.department,
    status: m.status,
    photo: m.photo?.path ?? null,
  }));

  return NextResponse.json({ items, total, page, pageSize: PAGE_SIZE });
}

export async function POST(request: NextRequest) {
  const auth = requirePermission(request, "team", "write");
  if (auth instanceof NextResponse) return auth;
  const { user } = auth;

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

  const created = await prisma.teamMember.create({
    data: {
      photoId: data.photoId ?? null,
      email: data.email ?? null,
      phone: data.phone ?? null,
      linkedin: data.linkedin ?? null,
      department: data.department ?? null,
      status: data.status,
      order: data.order,
      translations: {
        create: data.translations.map((t) => ({
          locale: t.locale,
          name: t.name,
          title: t.title ?? null,
          bio: t.bio ?? null,
        })),
      },
    },
  });

  await prisma.auditLog.create({
    data: { username: user.username, action: "create", entity: "TeamMember", entityId: String(created.id) },
  });

  return NextResponse.json({ success: true, id: created.id });
}
