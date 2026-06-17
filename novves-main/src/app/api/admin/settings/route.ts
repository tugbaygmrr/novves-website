import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/admin/rbac-server";

export const dynamic = "force-dynamic";

// İzinli ayar anahtarları (keyfi anahtar yazılamaz).
const ALLOWED_KEYS = new Set([
  "ga_id",
  "gtm_id",
  "search_console",
  "social_linkedin",
  "social_instagram",
  "social_youtube",
  "instagram_access_token",
  "instagram_user_id",
  "contact_email",
  "contact_phone",
  "contact_address",
]);

export async function GET(request: NextRequest) {
  const auth = requirePermission(request, "seo", "read");
  if (auth instanceof NextResponse) return auth;

  const rows = await prisma.siteSetting.findMany();
  const settings: Record<string, unknown> = {};
  for (const r of rows) settings[r.key] = r.value;
  return NextResponse.json({ settings });
}

export async function PUT(request: NextRequest) {
  const auth = requirePermission(request, "seo", "write");
  if (auth instanceof NextResponse) return auth;
  const { user } = auth;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz JSON" }, { status: 400 });
  }

  const entries = Object.entries(body).filter(([k]) => ALLOWED_KEYS.has(k));
  for (const [key, raw] of entries) {
    const value = typeof raw === "string" ? raw.slice(0, 2000) : raw;
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value: value as never },
      create: { key, value: value as never },
    });
  }

  await prisma.auditLog.create({
    data: { username: user.username, action: "update", entity: "SiteSetting", entityId: entries.map(([k]) => k).join(",") },
  });

  return NextResponse.json({ success: true });
}
