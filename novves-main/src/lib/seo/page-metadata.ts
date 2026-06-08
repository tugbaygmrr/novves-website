import type { Metadata } from "next";
import { htmlLangOverride, type Locale } from "@/i18n/config";
import { buildAlternates, buildLocalePath, getSiteUrl } from "@/lib/seo/metadata";
import { buildOgImageMetadata, buildTwitterImageMetadata, ogTitleFromPageTitle } from "@/lib/seo/og-image";

type PageSeoInput = {
  locale: string;
  /** Path after `[locale]`, e.g. cozumler/duman-isi-tahliye-sistemleri or empty for home. */
  pathAfterLocale?: string;
  title: string;
  description?: string;
};

/** Per-page title, description, canonical, hreflang, og and twitter metadata. */
export function withPageSeo({
  locale,
  pathAfterLocale = "",
  title,
  description = "",
}: PageSeoInput): Metadata {
  const pathname = buildLocalePath(locale, pathAfterLocale);
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${pathname}`;
  const lang = htmlLangOverride[locale as Locale] ?? locale;
  const ogImage = buildOgImageMetadata(title);
  const shareTitle = ogTitleFromPageTitle(title);

  return {
    title,
    description,
    alternates: buildAlternates(pathname),
    openGraph: {
      type: "website",
      locale: lang,
      url: pageUrl,
      siteName: "Novves",
      title: shareTitle,
      description,
      images: [ogImage],
    },
    twitter: {
      ...buildTwitterImageMetadata(title),
      description,
    },
  };
}
