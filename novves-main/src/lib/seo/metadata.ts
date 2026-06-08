import { defaultLocale, htmlLangOverride, locales, type Locale } from "@/i18n/config";

/** Production site root when env is not set. */
export const PRODUCTION_SITE_URL = "https://www.novves.com";

function readEnvUrl(): string | undefined {
  const raw =
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.NEXT_PUBLIC_SITE_URL;
  const trimmed = raw?.trim().replace(/\/$/, "");
  if (!trimmed || /localhost|127\.0\.0\.1/i.test(trimmed)) return undefined;
  return trimmed;
}

/**
 * Site root for metadataBase, canonical and og:url.
 * Never returns localhost in production (misconfigured env is ignored).
 */
export function getSiteUrl(): string {
  const fromEnv = readEnvUrl();
  if (fromEnv) return fromEnv;

  if (process.env.VERCEL_URL) {
    const vercel = process.env.VERCEL_URL.replace(/\/$/, "");
    if (process.env.NODE_ENV === "production" && /localhost|127\.0\.0\.1/i.test(vercel)) {
      return PRODUCTION_SITE_URL;
    }
    return `https://${vercel}`;
  }

  if (process.env.NODE_ENV === "production") {
    return PRODUCTION_SITE_URL;
  }

  return "http://localhost:3000";
}

export function parseLocalePath(pathname: string): {
  locale: string;
  pathWithoutLocale: string;
} {
  const segments = pathname.split("/").filter(Boolean);
  const locale = segments[0] ?? defaultLocale;
  const pathWithoutLocale = segments.slice(1).join("/");
  return { locale, pathWithoutLocale };
}

export function buildLocalePath(locale: string, pathWithoutLocale: string): string {
  return pathWithoutLocale ? `/${locale}/${pathWithoutLocale}` : `/${locale}`;
}

function hreflangCode(locale: string): string {
  return htmlLangOverride[locale as Locale] ?? locale;
}

/** x-default hreflang target for international SEO (export-focused site). */
export const HREFLANG_X_DEFAULT_LOCALE: Locale = "en";

function absoluteUrl(pathname: string): string {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${getSiteUrl()}${path}`;
}

/** All hreflang URLs for a path segment after `[locale]`. */
export function buildSitemapLanguageAlternates(
  pathAfterLocale: string,
): Record<string, string> {
  const toAbs = (locale: string) =>
    absoluteUrl(buildLocalePath(locale, pathAfterLocale));

  const languages = Object.fromEntries(
    locales.map((l) => [hreflangCode(l), toAbs(l)]),
  ) as Record<string, string>;
  languages["x-default"] = toAbs(HREFLANG_X_DEFAULT_LOCALE);
  return languages;
}

/** Current page path plus 15 hreflang alternates and x-default. */
export function buildAlternates(pathname: string) {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const { pathWithoutLocale } = parseLocalePath(normalized);
  const toAbs = (locale: string) =>
    absoluteUrl(buildLocalePath(locale, pathWithoutLocale));

  const languages = Object.fromEntries(
    locales.map((l) => [hreflangCode(l), toAbs(l)]),
  ) as Record<string, string>;
  languages["x-default"] = toAbs(HREFLANG_X_DEFAULT_LOCALE);

  return {
    canonical: absoluteUrl(normalized),
    languages,
  };
}
