import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/admin/rbac-server";
import { updateUserSchema } from "@/lib/admin/schemas/user";

export const dynamic = "force-dynamic";

async function parseId(params: Promise<{ id: string }>): Promise<number | null> {
  const { id } = await params;
  const n = Number(id);
  return Number.isNaN(n) ? null : n;
}

export async function PATCH(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const auth = requirePermission(request, "users", "write");
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
  const parsed = updateUserSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Doğrulama hatası" }, { status: 422 });
  }
  const data = parsed.data;

  const target = await prisma.admin_users.findUnique({ where: { id } });
  if (!target) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });

  // Kendini pasifleştirme / rol düşürme engeli
  if (target.username === user.username && (data.isActive === false || (data.role && data.role !== "SUPER_ADMIN"))) {
    return NextResponse.json({ error: "Kendi rolünüzü/erişiminizi kısıtlayamazsınız" }, { status: 400 });
  }

  const update: Prisma.admin_usersUpdateInput = {};
  if (data.role) update.role = data.role;
  if (typeof data.isActive === "boolean") update.is_active = data.isActive;
  if (data.password) update.password_hash = await bcrypt.hash(data.password, 12);

  await prisma.admin_users.update({ where: { id }, data: update });
  await prisma.auditLog.create({
    data: { username: user.username, action: "update", entity: "AdminUser", entityId: String(id) },
  });
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const auth = requirePermission(request, "users", "delete");
  if (auth instanceof NextResponse) return auth;
  const { user } = auth;

  const id = await parseId(ctx.params);
  if (id === null) return NextResponse.json({ error: "Geçersiz id" }, { status: 400 });

  const target = await prisma.admin_users.findUnique({ where: { id } });
  if (!target) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
  if (target.username === user.username) {
    return NextResponse.json({ error: "Kendi hesabınızı silemezsiniz" }, { status: 400 });
  }

  await prisma.admin_users.delete({ where: { id } });
  await prisma.auditLog.create({
    data: { username: user.username, action: "delete", entity: "AdminUser", entityId: String(id) },
  });
  return NextResponse.json({ success: true });
}
