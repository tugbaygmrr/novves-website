import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/admin/rbac-server";

export const dynamic = "force-dynamic";

const redirectSchema = z.object({
  source: z.string().trim().min(1).max(500).regex(/^\//, "/ ile başlamalı"),
  target: z.string().trim().min(1).max(500),
  permanent: z.boolean().default(true),
});

export async function GET(request: NextRequest) {
  const auth = requirePermission(request, "seo", "read");
  if (auth instanceof NextResponse) return auth;
  const items = await prisma.redirect.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const auth = requirePermission(request, "seo", "write");
  if (auth instanceof NextResponse) return auth;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz JSON" }, { status: 400 });
  }
  const parsed = redirectSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Doğrulama hatası" }, { status: 422 });
  }
  const exists = await prisma.redirect.findUnique({ where: { source: parsed.data.source } });
  if (exists) return NextResponse.json({ error: "Bu kaynak yol zaten var" }, { status: 409 });

  const created = await prisma.redirect.create({ data: parsed.data });
  return NextResponse.json({ success: true, id: created.id });
}
