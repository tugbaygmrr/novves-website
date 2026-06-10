import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/admin/rbac-server";
import { createUserSchema } from "@/lib/admin/schemas/user";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const auth = requirePermission(request, "users", "read");
  if (auth instanceof NextResponse) return auth;

  const rows = await prisma.admin_users.findMany({
    orderBy: { created_at: "asc" },
    select: {
      id: true,
      username: true,
      role: true,
      is_active: true,
      last_login: true,
      created_at: true,
    },
  });

  const items = rows.map((u) => ({
    id: u.id,
    username: u.username,
    role: u.role,
    isActive: u.is_active,
    lastLogin: u.last_login,
    createdAt: u.created_at,
  }));

  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const auth = requirePermission(request, "users", "write");
  if (auth instanceof NextResponse) return auth;
  const { user } = auth;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz JSON" }, { status: 400 });
  }
  const parsed = createUserSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Doğrulama hatası" }, { status: 422 });
  }
  const data = parsed.data;

  const existing = await prisma.admin_users.findUnique({ where: { username: data.username } });
  if (existing) return NextResponse.json({ error: "Bu kullanıcı adı zaten var" }, { status: 409 });

  const passwordHash = await bcrypt.hash(data.password, 12);
  const created = await prisma.admin_users.create({
    data: {
      username: data.username,
      password_hash: passwordHash,
      role: data.role,
      is_active: data.isActive,
    },
    select: { id: true },
  });

  await prisma.auditLog.create({
    data: { username: user.username, action: "create", entity: "AdminUser", entityId: String(created.id) },
  });

  return NextResponse.json({ success: true, id: created.id });
}
