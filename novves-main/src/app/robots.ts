import type { MetadataRoute } from "next";
import { getSiteUrl, PRODUCTION_SITE_URL } from "@/lib/seo/metadata";

export default function robots(): MetadataRoute.Robots {
  const siteUrl =
    process.env.NODE_ENV === "production" && getSiteUrl().includes("localhost")
      ? PRODUCTION_SITE_URL
      : getSiteUrl();
  const sitemapUrl = `${siteUrl.replace(/\/$/, "")}/sitemap.xml`;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/novves-panel/", "/api/"],
    },
    sitemap: sitemapUrl,
  };
}