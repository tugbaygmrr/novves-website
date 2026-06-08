import type { MetadataRoute } from "next";
import { locales, type Locale } from "@/i18n/config";
import {
  buildLocalePath,
  buildSitemapLanguageAlternates,
  getSiteUrl,
} from "@/lib/seo/metadata";
import { collectPublicPathSegments } from "@/lib/seo/sitemap-routes";

function entryPriority(pathAfterLocale: string): number {
  if (pathAfterLocale === "") return 1;
  if (!pathAfterLocale.includes("/")) return 0.8;
  return 0.7;
}

function entryChangeFrequency(pathAfterLocale: string): MetadataRoute.Sitemap[0]["changeFrequency"] {
  return pathAfterLocale === "" ? "weekly" : "monthly";
}

/** Locale-chunked sitemap index: /sitemap.xml -> /sitemap/tr.xml, /sitemap/en.xml, ... */
export async function generateSitemaps() {
  return locales.map((locale) => ({ id: locale }));
}

export default async function sitemap({
  id,
}: {
  id: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  const locale = (await id) as Locale;
  const siteUrl = getSiteUrl();
  const paths = collectPublicPathSegments();

  return paths.map((pathAfterLocale) => ({
    url: `${siteUrl}${buildLocalePath(locale, pathAfterLocale)}`,
    lastModified: new Date(),
    changeFrequency: entryChangeFrequency(pathAfterLocale),
    priority: entryPriority(pathAfterLocale),
    alternates: {
      languages: buildSitemapLanguageAlternates(pathAfterLocale),
    },
  }));
}
