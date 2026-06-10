import "server-only";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  verifyToken,
  verifyCsrfToken,
  getCookieValue,
  COOKIE_ACCESS_TOKEN,
  COOKIE_CSRF_TOKEN,
} from "@/lib/admin/auth";
import { can, normalizeRole, type AdminModule, type Action, type AuthedUser } from "@/lib/admin/rbac";

export type { AuthedUser };

/** Route handler içinden (NextRequest) oturum kullanıcısı. */
export function getAuthedUser(request: NextRequest): AuthedUser | null {
  const token = getCookieValue(request, COOKIE_ACCESS_TOKEN);
  if (!token) return null;
  const payload = verifyToken(token);
  if (!payload || payload.type !== "access") return null;
  return { username: payload.username, role: normalizeRole(payload.role) };
}

/** Sunucu bileşenleri / layout'lar için: çerezden oturum kullanıcısı. */
export async function getServerUser(): Promise<AuthedUser | null> {
  const token = (await cookies()).get(COOKIE_ACCESS_TOKEN)?.value;
  if (!token) return null;
  const payload = verifyToken(token);
  if (!payload || payload.type !== "access") return null;
  return { username: payload.username, role: normalizeRole(payload.role) };
}

/**
 * Route handler koruması: kimlik + rol izni (+ yazma eylemlerinde CSRF).
 * Başarılıysa { user }; aksi halde hazır 401/403 NextResponse döner.
 *
 *   const auth = requirePermission(req, "technical", "write");
 *   if (auth instanceof NextResponse) return auth;
 *   const { user } = auth;
 */
export function requirePermission(
  request: NextRequest,
  mod: AdminModule,
  action: Action,
): { user: AuthedUser } | NextResponse {
  const user = getAuthedUser(request);
  if (!user) return NextResponse.json({ error: "Oturum gerekli" }, { status: 401 });

  if (!can(user.role, mod, action)) {
    return NextResponse.json({ error: "Bu işlem için yetkiniz yok" }, { status: 403 });
  }

  if (action !== "read") {
    const header = request.headers.get("x-csrf-token") ?? "";
    const cookie = getCookieValue(request, COOKIE_CSRF_TOKEN) ?? "";
    if (!verifyCsrfToken(header, cookie)) {
      return NextResponse.json({ error: "Geçersiz CSRF token" }, { status: 403 });
    }
  }

  return { user };
}
