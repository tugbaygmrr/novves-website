import { NextRequest, NextResponse } from "next/server";
import {
  locales,
  defaultLocale,
  pickLocaleFromAcceptLanguage,
  type Locale,
} from "@/i18n/config";
import {
  resolveLegacyHostRedirect,
  resolveLegacyRedirect,
} from "@/lib/seo/legacy-redirects";
import { getSiteUrl, PRODUCTION_SITE_URL } from "@/lib/seo/metadata";

/** cookie-consent-storage ile aynı anahtar — Edge paketinde tarayıcı API’si olmadan kullanılmalı */
const CONSENT_RESTRICTED_COOKIE_NAME = "NOVVES_consent_restricted";

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

/** Kök `app/layout.tsx` içinde `<html lang>` için — URL'deki `[locale]` segmenti */
const LOCALE_HEADER = "x-novves-locale";
/** generateMetadata — dinamik canonical / hreflang için tam sayfa yolu */
const PATHNAME_HEADER = "x-pathname";

function requestHeadersWithLocale(request: NextRequest, pathname: string): Headers {
  const requestHeaders = new Headers(request.headers);
  const seg = pathname.split("/").filter(Boolean)[0];
  const loc =
    seg && locales.includes(seg as Locale) ? seg : defaultLocale;
  requestHeaders.set(LOCALE_HEADER, loc);
  requestHeaders.set(PATHNAME_HEADER, pathname);
  return requestHeaders;
}

function canonicalSiteOrigin(): string {
  try {
    return new URL(getSiteUrl()).origin;
  } catch {
    return PRODUCTION_SITE_URL;
  }
}

/** 301 — production'da kanonik domaine, dev'de ayni host'ta. */
function permanentRedirect(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone();
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (process.env.NODE_ENV === "production") {
    url.href = `${canonicalSiteOrigin()}${path}`;
  } else {
    url.pathname = path;
  }
  return NextResponse.redirect(url, 301);
}

function legacyHostRedirect(request: NextRequest, host: string, pathname: string) {
  const target = resolveLegacyHostRedirect(host, pathname);
  if (target) return permanentRedirect(request, target);
  return null;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const lowerPathname = pathname.toLowerCase();
  const isDev = process.env.NODE_ENV !== "production";

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

  // --- Eski site / alt domain migrasyonu (301) ---
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase() ?? "";
  const hostRedirect = legacyHostRedirect(request, host, pathname);
  if (hostRedirect) return hostRedirect;

  const legacyPath = resolveLegacyRedirect(pathname, "tr");
  if (legacyPath) return permanentRedirect(request, legacyPath);

  // --- API & Next internals — never locale-prefix (/_next/data RSC vb. yoksa 404) ---
  if (pathname.startsWith("/api") || pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  // Canonicalize admin path casing to avoid 404 on uppercase URLs.
  if (pathname.startsWith("/NOVVES-panel")) {
    const normalizedUrl = request.nextUrl.clone();
    normalizedUrl.pathname = `/novves-panel${pathname.slice("/NOVVES-panel".length)}`;
    return NextResponse.redirect(normalizedUrl);
  }

  // --- Admin panel protection ---
  if (lowerPathname.startsWith("/novves-panel")) {
    // Dashboard and sub-paths require authentication
    if (lowerPathname.startsWith("/novves-panel/dashboard")) {
      const accessToken = getCookieFromRequest(request, "admin_access_token");
      const refreshToken = getCookieFromRequest(request, "admin_refresh_token");

      if (!hasAuthCookie(accessToken) && !hasAuthCookie(refreshToken)) {
        const loginUrl = request.nextUrl.clone();
        loginUrl.pathname = "/novves-panel";
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

    const response = NextResponse.next({
      request: { headers: requestHeadersWithLocale(request, pathname) },
    });
    // Dev/local: browser extensions (mobile simulator vb.) script inject eder.
    // Sıkı CSP bu enjeksiyonu bloke ettiği için sadece production'da CSP uygula.
    if (!isDev) {
      response.headers.set("Content-Security-Policy", cspHeader);
    }
    return response;
  }

  // --- public/ kökündeki dosyalar — asla /{locale}/images/... yapma (404) ---
  if (
    pathname.startsWith("/images") ||
    pathname.startsWith("/certificate") ||
    pathname.startsWith("/animation") ||
    pathname.startsWith("/models") ||
    pathname.startsWith("/audio") ||
    pathname.startsWith("/textures") ||
    pathname === "/icon.svg" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    /\.(?:ico|png|jpg|jpeg|gif|webp|svg|txt|xml|mp4|pdf|woff2?|glb|gltf|mp3|m4a|ogg|wav)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  // --- Locale Routing ---
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    const locale = pickLocaleFromAcceptLanguage(request.headers.get("accept-language"));
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  /** Teknik Merkez — yalnızca çerezleri reddeden kullanıcılar (tarayıcı çerezi senkronu). */
  if (getCookieFromRequest(request, CONSENT_RESTRICTED_COOKIE_NAME) === "1") {
    const segments = pathname.split("/").filter(Boolean);
    if (
      segments.length >= 2 &&
      segments[1] === "teknik-merkez" &&
      locales.includes(segments[0] as Locale)
    ) {
      const url = request.nextUrl.clone();
      url.pathname = `/${segments[0]}`;
      return NextResponse.redirect(url);
    }
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

  const response = NextResponse.next({
    request: { headers: requestHeadersWithLocale(request, pathname) },
  });
  // Dev/local: eklenti uyumluluğu için CSP header'ını kaldır.
  if (!isDev) {
    response.headers.set("Content-Security-Policy", cspHeader);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
