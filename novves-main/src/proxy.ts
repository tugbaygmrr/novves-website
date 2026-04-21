import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/i18n/config";

// Simple in-memory rate limiter (use Redis in production)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 500; // max requests per window

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.lastReset > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const lang = acceptLanguage.toLowerCase();
  if (lang.startsWith("en")) return "en";
  if (lang.startsWith("ru")) return "ru";
  return defaultLocale;
}

function getCookieFromRequest(request: NextRequest, name: string): string | undefined {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

/**
 * Check if an auth cookie exists and is non-empty.
 * Real JWT signature verification happens in the API route handlers
 * via the full jsonwebtoken library. The proxy only gates direct URL
 * access to the client-side dashboard page.
 */
function hasAuthCookie(cookieValue: string | undefined): boolean {
  return typeof cookieValue === "string" && cookieValue.length > 0;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- Rate Limiting ---
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429 }
    );
  }

  // --- Admin API paths: skip locale redirect, just pass through ---
  if (pathname.startsWith("/api/admin")) {
    return NextResponse.next();
  }

  // --- Admin panel protection ---
  if (pathname.startsWith("/NOVVES-panel")) {
    // Dashboard and sub-paths require authentication
    if (pathname.startsWith("/NOVVES-panel/dashboard")) {
      const accessToken = getCookieFromRequest(request, "admin_access_token");
      const refreshToken = getCookieFromRequest(request, "admin_refresh_token");

      if (!hasAuthCookie(accessToken) && !hasAuthCookie(refreshToken)) {
        const loginUrl = request.nextUrl.clone();
        loginUrl.pathname = "/NOVVES-panel";
        return NextResponse.redirect(loginUrl);
      }
    }

    // Do NOT apply locale redirect to admin panel paths
    // Still apply CSP headers
    const scriptSrc =
      process.env.NODE_ENV === "production"
        ? `script-src 'self' 'unsafe-inline'`
        : `script-src 'self' 'unsafe-inline' 'unsafe-eval'`;
    const cspHeader = [
      `default-src 'self'`,
      scriptSrc,
      `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com`,
      `img-src 'self' blob: data: https://i.ytimg.com`,
      `font-src 'self' https://fonts.gstatic.com`,
      `object-src 'none'`,
      `base-uri 'self'`,
      `form-action 'self'`,
      `frame-src https://www.youtube.com https://www.youtube-nocookie.com https://www.google.com`,
      `frame-ancestors 'self'`,
      `upgrade-insecure-requests`,
    ].join("; ");

    const response = NextResponse.next();
    response.headers.set("Content-Security-Policy", cspHeader);
    return response;
  }

  // --- Locale Routing ---
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  const publicScriptSrc =
    process.env.NODE_ENV === "production"
      ? `script-src 'self' 'unsafe-inline'`
      : `script-src 'self' 'unsafe-inline' 'unsafe-eval'`;
  const cspHeader = [
    `default-src 'self'`,
    publicScriptSrc,
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
    `img-src 'self' blob: data: https://i.ytimg.com`,
    `font-src 'self' https://fonts.gstatic.com`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-src https://www.youtube.com https://www.youtube-nocookie.com https://www.google.com`,
    `frame-ancestors 'self'`,
    `upgrade-insecure-requests`,
  ].join("; ");

  const response = NextResponse.next();
  response.headers.set("Content-Security-Policy", cspHeader);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - public folder assets (images, certificates, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|sitemap.xml|robots.txt|images/|certificate/|kvkk/|animation|.*\\.mp4$).*)",
  ],
};

