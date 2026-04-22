import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const _secret = process.env.JWT_SECRET;
const isProd = process.env.NODE_ENV === "production";

if (isProd && (!_secret || _secret.length < 32)) {
  throw new Error(
    "JWT_SECRET environment variable must be defined and at least 32 characters long"
  );
}

// Dev fallback to avoid auth API crash in local setup.
const JWT_SECRET: string =
  _secret && _secret.length >= 32
    ? _secret
    : "dev-only-jwt-secret-change-me-32chars";
const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY = "7d";

export const COOKIE_ACCESS_TOKEN = "admin_access_token";
export const COOKIE_REFRESH_TOKEN = "admin_refresh_token";
export const COOKIE_CSRF_TOKEN = "admin_csrf_token";

interface TokenPayload {
  username: string;
  role: string;
  type: "access" | "refresh";
}

// --- JWT helpers ---

export function createAccessToken(username: string, role: string = "admin"): string {
  return jwt.sign(
    { username, role, type: "access" } satisfies TokenPayload,
    JWT_SECRET,
    { algorithm: "HS256", expiresIn: ACCESS_TOKEN_EXPIRY }
  );
}

export function createRefreshToken(username: string, role: string = "admin"): string {
  return jwt.sign(
    { username, role, type: "refresh" } satisfies TokenPayload,
    JWT_SECRET,
    { algorithm: "HS256", expiresIn: REFRESH_TOKEN_EXPIRY }
  );
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      algorithms: ["HS256"],
    }) as TokenPayload;
    return decoded;
  } catch {
    return null;
  }
}

// --- Password helpers ---

export async function verifyPassword(
  plaintext: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(plaintext, hash);
}

export async function hashPassword(plaintext: string): Promise<string> {
  return bcrypt.hash(plaintext, 12);
}

// --- Cookie helpers ---

function cookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge,
  };
}

export function setAuthCookies(
  response: Response,
  accessToken: string,
  refreshToken: string
): void {
  const headers = response.headers;
  const accessCookie = serializeCookie(
    COOKIE_ACCESS_TOKEN,
    accessToken,
    cookieOptions(15 * 60)
  );
  const refreshCookie = serializeCookie(
    COOKIE_REFRESH_TOKEN,
    refreshToken,
    cookieOptions(7 * 24 * 60 * 60)
  );
  headers.append("Set-Cookie", accessCookie);
  headers.append("Set-Cookie", refreshCookie);
}

export function clearAuthCookies(response: Response): void {
  const headers = response.headers;
  const clearOptions = cookieOptions(0);
  headers.append(
    "Set-Cookie",
    serializeCookie(COOKIE_ACCESS_TOKEN, "", clearOptions)
  );
  headers.append(
    "Set-Cookie",
    serializeCookie(COOKIE_REFRESH_TOKEN, "", clearOptions)
  );
  headers.append(
    "Set-Cookie",
    serializeCookie(COOKIE_CSRF_TOKEN, "", clearOptions)
  );
}

function serializeCookie(
  name: string,
  value: string,
  options: {
    httpOnly: boolean;
    secure: boolean;
    sameSite: "strict" | "lax" | "none";
    path: string;
    maxAge: number;
  }
): string {
  const parts = [`${name}=${encodeURIComponent(value)}`];
  parts.push(`Path=${options.path}`);
  parts.push(`Max-Age=${options.maxAge}`);
  parts.push(`SameSite=${options.sameSite.charAt(0).toUpperCase() + options.sameSite.slice(1)}`);
  if (options.httpOnly) parts.push("HttpOnly");
  if (options.secure) parts.push("Secure");
  return parts.join("; ");
}

// --- CSRF helpers ---

export function generateCsrfToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function verifyCsrfToken(
  requestToken: string,
  cookieToken: string
): boolean {
  if (!requestToken || !cookieToken) return false;
  return crypto.timingSafeEqual(
    Buffer.from(requestToken),
    Buffer.from(cookieToken)
  );
}

// --- Helper to read cookie from request ---

export function getCookieValue(
  request: Request,
  name: string
): string | undefined {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const match = cookieHeader.match(
    new RegExp(`(?:^|;\\s*)${name}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : undefined;
}
