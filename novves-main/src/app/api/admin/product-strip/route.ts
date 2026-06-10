import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";
import { z } from "zod";
import { requirePermission } from "@/lib/admin/rbac-server";

export const dynamic = "force-dynamic";

const DATA_PATH = path.join(process.cwd(), "src", "data", "product-strip.json");

const cardSchema = z.object({
  slug: z.string().trim().max(120),
  href: z.string().trim().min(1).max(300),
  icon: z.string().trim().max(40).default(""),
  image: z.string().trim().max(500).default(""),
  title: z.record(z.string(), z.string().max(300)).default({}),
  description: z.record(z.string(), z.string().max(2000)).default({}),
  features: z.record(z.string(), z.array(z.string().max(300)).max(40)).default({}),
});
const bodySchema = z.object({ cards: z.array(cardSchema).max(50) });

export async function GET(request: NextRequest) {
  const auth = requirePermission(request, "home", "read");
  if (auth instanceof NextResponse) return auth;
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    return NextResponse.json(JSON.parse(raw));
  } catch {
    return NextResponse.json({ cards: [] });
  }
}

export async function PUT(request: NextRequest) {
  const auth = requirePermission(request, "home", "write");
  if (auth instanceof NextResponse) return auth;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz JSON" }, { status: 400 });
  }
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Doğrulama hatası", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
  fs.writeFileSync(DATA_PATH, JSON.stringify(parsed.data, null, 2) + "\n", "utf-8");
  revalidatePath("/", "layout");

  return NextResponse.json({ success: true });
}
