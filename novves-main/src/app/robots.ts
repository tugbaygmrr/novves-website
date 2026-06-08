import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { getSiteUrl, PRODUCTION_SITE_URL } from "@/lib/seo/metadata";

export default function robots(): MetadataRoute.Robots {
  const siteUrl =
    process.env.NODE_ENV === "production" && getSiteUrl().includes("localhost")
      ? PRODUCTION_SITE_URL
      : getSiteUrl();
  const base = siteUrl.replace(/\/$/, "");
  // Next 16 generateSitemaps serves per-locale chunks at /sitemap/<id>.xml and
  // does NOT emit a /sitemap.xml index ? list every chunk so crawlers find them all.
  const sitemap = locales.map((locale) => `${base}/sitemap/${locale}.xml`);

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/novves-panel/", "/api/"],
    },
    sitemap,
  };
}
