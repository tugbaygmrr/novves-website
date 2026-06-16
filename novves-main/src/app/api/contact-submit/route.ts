import { NextRequest, NextResponse } from "next/server";
import { persistContactSubmission } from "@/lib/contact-submission-persist";
import { contactSubmissionSchema } from "@/lib/admin/schemas/contact-submission";

export const dynamic = "force-dynamic";

// Basit IP-bazlı hız sınırı (bellek içi): 10 dk'da en fazla 5 başvuru.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (arr.length >= MAX_PER_WINDOW) {
    hits.set(ip, arr);
    return true;
  }
  arr.push(now);
  hits.set(ip, arr);
  return false;
}

function clientIp(request: NextRequest): string {
  const xff = request.headers.get("x-forwarded-for");
  return (xff?.split(",")[0] ?? request.headers.get("x-real-ip") ?? "unknown").trim();
}

export async function POST(request: NextRequest) {
  const ip = clientIp(request);
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Çok fazla deneme. Lütfen biraz sonra tekrar deneyin." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  }

  const parsed = contactSubmissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Doğrulama hatası" },
      { status: 422 },
    );
  }
  const data = parsed.data;

  // Bal küpü doluysa botu sessizce başarılı kabul et (kayıt oluşturma).
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ success: true });
  }

  const result = await persistContactSubmission({
    ...data,
    ip,
    userAgent: request.headers.get("user-agent")?.slice(0, 400) ?? null,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    fallback: result.fallback === true,
  });
}
