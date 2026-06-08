import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
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

function entryChangeFrequency(
  pathAfterLocale: string,
): MetadataRoute.Sitemap[0]["changeFrequency"] {
  return pathAfterLocale === "" ? "weekly" : "monthly";
}

/** Single sitemap at /sitemap.xml (all locales, hreflang alternates per URL). */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const paths = collectPublicPathSegments();

  return locales.flatMap((locale) =>
    paths.map((pathAfterLocale) => ({
      url: `${siteUrl}${buildLocalePath(locale, pathAfterLocale)}`,
      lastModified: new Date(),
      changeFrequency: entryChangeFrequency(pathAfterLocale),
      priority: entryPriority(pathAfterLocale),
      alternates: {
        languages: buildSitemapLanguageAlternates(pathAfterLocale),
      },
    })),
  );
}
