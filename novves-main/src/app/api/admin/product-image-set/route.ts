import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { z } from "zod";
import { requirePermission } from "@/lib/admin/rbac-server";

export const dynamic = "force-dynamic";

const DATA_PATH = path.join(process.cwd(), "src", "data", "product-image-set.json");

const bodySchema = z.object({
  images: z.array(z.string().trim().max(500)).max(500),
});

export async function GET(request: NextRequest) {
  const auth = requirePermission(request, "mediaLibrary", "read");
  if (auth instanceof NextResponse) return auth;
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    return NextResponse.json(JSON.parse(raw));
  } catch {
    return NextResponse.json({ images: [] });
  }
}

export async function PUT(request: NextRequest) {
  const auth = requirePermission(request, "mediaLibrary", "write");
  if (auth instanceof NextResponse) return auth;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz JSON" }, { status: 400 });
  }
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Doğrulama hatası" }, { status: 422 });
  }
  // Tekrarsız, sırayı koru
  const images = [...new Set(parsed.data.images)];
  fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
  fs.writeFileSync(DATA_PATH, JSON.stringify({ images }, null, 2) + "\n", "utf-8");

  return NextResponse.json({ success: true, images });
}
