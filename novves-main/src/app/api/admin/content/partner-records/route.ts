import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  verifyToken,
  verifyCsrfToken,
  getCookieValue,
  COOKIE_ACCESS_TOKEN,
  COOKIE_CSRF_TOKEN,
} from "@/lib/admin/auth";
import {
  backupFile,
  getPartnerRecordsPath,
  loadJsonArray,
  writeJsonFile,
} from "@/lib/admin/dictionary-io";

export const dynamic = "force-dynamic";

function authenticate(request: NextRequest): string | null {
  const token = getCookieValue(request, COOKIE_ACCESS_TOKEN);
  if (!token) return null;
  const payload = verifyToken(token);
  if (!payload || payload.type !== "access") return null;
  return payload.username;
}

function stripHtml(value: unknown): unknown {
  if (typeof value === "string") {
    return value
      .replace(/<[^>]*>/g, "")
      .replace(/javascript\s*:/gi, "")
      .replace(/\bon\w+\s*=/gi, "");
  }
  if (Array.isArray(value)) return value.map(stripHtml);
  if (value !== null && typeof value === "object") {
    const result: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      result[k] = stripHtml(v);
    }
    return result;
  }
  return value;
}

export async function GET(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const records = loadJsonArray(getPartnerRecordsPath());
  return NextResponse.json({ records });
}

export async function PUT(request: NextRequest) {
  const username = authenticate(request);
  if (!username) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const csrfHeader = request.headers.get("x-csrf-token") ?? "";
  const csrfCookie = getCookieValue(request, COOKIE_CSRF_TOKEN) ?? "";
  if (!verifyCsrfToken(csrfHeader, csrfCookie)) {
    return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
  }

  let body: { records?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!Array.isArray(body.records)) {
    return NextResponse.json({ error: "records must be an array" }, { status: 400 });
  }

  const sanitized = stripHtml(body.records);
  const filePath = getPartnerRecordsPath();

  try {
    backupFile(filePath);
    writeJsonFile(filePath, sanitized);
    revalidatePath("/", "layout");
    return NextResponse.json({
      success: true,
      message: "Partner kayitlari kaydedildi",
      updatedBy: username,
    });
  } catch (err) {
    console.error("Failed to update partner-records.json:", err);
    return NextResponse.json({ error: "Failed to update partner records" }, { status: 500 });
  }
}
