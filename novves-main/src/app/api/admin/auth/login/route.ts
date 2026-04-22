import { NextRequest, NextResponse } from "next/server";
import {
  verifyPassword,
  createAccessToken,
  createRefreshToken,
  setAuthCookies,
  generateCsrfToken,
  COOKIE_CSRF_TOKEN,
} from "@/lib/admin/auth";
import pool from "@/lib/admin/db";

export const dynamic = "force-dynamic";

// --- In-memory rate limiting (per IP) ---
const rateLimitMap = new Map<string, { count: number; firstAttempt: number }>();
const RATE_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;


function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.firstAttempt > RATE_WINDOW_MS) {
    return { allowed: true };
  }
  if (entry.count >= MAX_ATTEMPTS) {
    const retryAfter = Math.ceil((entry.firstAttempt + RATE_WINDOW_MS - now) / 1000);
    return { allowed: false, retryAfter };
  }
  return { allowed: true };
}

function recordAttempt(ip: string, success: boolean) {
  if (success) {
    rateLimitMap.delete(ip);
    return;
  }
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.firstAttempt > RATE_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, firstAttempt: now });
  } else {
    entry.count++;
  }
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  );
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const userAgent = request.headers.get("user-agent") ?? "";

  // Rate limit
  const rl = checkRateLimit(ip);
  if (!rl.allowed) {
    console.log(`[${new Date().toISOString()}] Login rate-limited | IP: ${ip}`);
    return NextResponse.json(
      { error: "Çok fazla deneme. Lütfen daha sonra tekrar deneyin." },
      { status: 429, headers: rl.retryAfter ? { "Retry-After": String(rl.retryAfter) } : undefined }
    );
  }

  // Parse body
  let body: { username?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  }

  const { username, password } = body;
  if (!username || !password || typeof username !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "Kullanıcı adı ve şifre gerekli" }, { status: 400 });
  }

  try {
    // Query user from database
    const result = await pool.query(
      "SELECT id, username, password_hash, role, is_active, failed_attempts, locked_until FROM admin_users WHERE username = $1",
      [username]
    );

    const user = result.rows[0];

    // Always run bcrypt compare to prevent timing attacks
    const dummyHash = "$2b$12$000000000000000000000uGnB7GCz1YqiAEMWJTuGiHfQ7Kjk3Nm";
    const hashToCheck = user?.password_hash ?? dummyHash;
    const passwordMatch = await verifyPassword(password, hashToCheck);

    // Check if user exists and is active
    if (!user || !user.is_active) {
      recordAttempt(ip, false);
      await logLogin(username, ip, false, userAgent);
      console.log(`[${new Date().toISOString()}] Failed login | IP: ${ip} | User: ${username}`);
      return NextResponse.json({ error: "Geçersiz kullanıcı adı veya şifre" }, { status: 401 });
    }

    // Check account lockout (DB-level)
    if (user.locked_until && new Date(user.locked_until) > new Date()) {
      const remainingMin = Math.ceil((new Date(user.locked_until).getTime() - Date.now()) / 60000);
      await logLogin(username, ip, false, userAgent);
      return NextResponse.json(
        { error: `Hesap kilitli. ${remainingMin} dakika sonra tekrar deneyin.` },
        { status: 429 }
      );
    }

    if (!passwordMatch) {
      // Increment failed attempts
      const newFailed = (user.failed_attempts || 0) + 1;
      const lockUntil = newFailed >= 10 ? new Date(Date.now() + 30 * 60 * 1000) : null;

      await pool.query(
        "UPDATE admin_users SET failed_attempts = $1, locked_until = $2, updated_at = NOW() WHERE id = $3",
        [newFailed, lockUntil, user.id]
      );

      recordAttempt(ip, false);
      await logLogin(username, ip, false, userAgent);
      console.log(`[${new Date().toISOString()}] Failed login | IP: ${ip} | User: ${username} | Attempts: ${newFailed}`);
      return NextResponse.json({ error: "Geçersiz kullanıcı adı veya şifre" }, { status: 401 });
    }

    // Success — reset failed attempts, update last login
    await pool.query(
      "UPDATE admin_users SET failed_attempts = 0, locked_until = NULL, last_login = NOW(), updated_at = NOW() WHERE id = $1",
      [user.id]
    );

    recordAttempt(ip, true);
    await logLogin(username, ip, true, userAgent);
    console.log(`[${new Date().toISOString()}] Successful login | IP: ${ip} | User: ${username}`);

    const accessToken = createAccessToken(user.username, user.role);
    const refreshToken = createRefreshToken(user.username, user.role);
    const csrfToken = generateCsrfToken();

    const response = NextResponse.json({ success: true, csrfToken }, { status: 200 });
    setAuthCookies(response, accessToken, refreshToken);

    const secure = process.env.NODE_ENV === "production";
    response.headers.append(
      "Set-Cookie",
      `${COOKIE_CSRF_TOKEN}=${csrfToken}; Path=/; Max-Age=${15 * 60}; SameSite=Strict${secure ? "; Secure" : ""}`
    );

    return response;
  } catch (err) {
    console.error(`[${new Date().toISOString()}] Login error:`, err);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

async function logLogin(username: string, ip: string, success: boolean, userAgent: string) {
  try {
    await pool.query(
      "INSERT INTO login_logs (username, ip_address, success, user_agent) VALUES ($1, $2, $3, $4)",
      [username, ip, success, userAgent]
    );
  } catch (err) {
    console.error("Failed to log login attempt:", err);
  }
}
