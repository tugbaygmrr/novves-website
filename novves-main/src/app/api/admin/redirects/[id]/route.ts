import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/admin/rbac-server";

export const dynamic = "force-dynamic";

export async function DELETE(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const auth = requirePermission(request, "seo", "delete");
  if (auth instanceof NextResponse) return auth;
  const { id } = await ctx.params;
  const rid = Number(id);
  if (Number.isNaN(rid)) return NextResponse.json({ error: "Geçersiz id" }, { status: 400 });
  await prisma.redirect.delete({ where: { id: rid } }).catch(() => null);
  return NextResponse.json({ success: true });
}
