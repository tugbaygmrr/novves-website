import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/admin/rbac-server";

export const dynamic = "force-dynamic";

const STATUSES = ["NEW", "READ", "ARCHIVED"] as const;

async function parseId(params: Promise<{ id: string }>): Promise<number | null> {
  const { id } = await params;
  const n = Number(id);
  return Number.isNaN(n) ? null : n;
}

export async function PATCH(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const auth = requirePermission(request, "contact", "write");
  if (auth instanceof NextResponse) return auth;
  const id = await parseId(ctx.params);
  if (id === null) return NextResponse.json({ error: "Geçersiz id" }, { status: 400 });

  let body: { status?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz gövde" }, { status: 400 });
  }
  if (!body.status || !(STATUSES as readonly string[]).includes(body.status)) {
    return NextResponse.json({ error: "Geçersiz durum" }, { status: 422 });
  }

  const updated = await prisma.contactSubmission.update({
    where: { id },
    data: { status: body.status as (typeof STATUSES)[number] },
  });
  return NextResponse.json({ success: true, submission: updated });
}

export async function DELETE(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const auth = requirePermission(request, "contact", "delete");
  if (auth instanceof NextResponse) return auth;
  const id = await parseId(ctx.params);
  if (id === null) return NextResponse.json({ error: "Geçersiz id" }, { status: 400 });

  await prisma.contactSubmission.delete({ where: { id } }).catch(() => null);
  return NextResponse.json({ success: true });
}
