import "./globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { fontRootClassName } from "./fonts";
import {
  defaultLocale,
  htmlLangOverride,
  hasLocale,
  type Locale,
} from "@/i18n/config";
import { getSiteUrl } from "@/lib/seo/metadata";
import { buildOgImageMetadata, buildTwitterImageMetadata } from "@/lib/seo/og-image";
import { AnalyticsScripts } from "@/components/analytics-scripts";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  openGraph: {
    type: "website",
    siteName: "Novves",
    title: "NOVVES",
    images: [buildOgImageMetadata("NOVVES")],
  },
  twitter: {
    ...buildTwitterImageMetadata("NOVVES"),
  },
};

const RTL_LOCALES = new Set<Locale>(["ar", "ur"]);

function resolveRootHtmlAttrs(pathname: string | null): { lang: string; dir: "ltr" | "rtl" } {
  const segment = (pathname ?? "").split("/").filter(Boolean)[0] ?? "";
  const locale = hasLocale(segment) ? segment : defaultLocale;
  return {
    lang: htmlLangOverride[locale] ?? locale,
    dir: RTL_LOCALES.has(locale) ? "rtl" : "ltr",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = (await headers()).get("x-pathname");
  const { lang, dir } = resolveRootHtmlAttrs(pathname);

  return (
    <html
      lang={lang}
      dir={dir}
      className={`h-full antialiased light ${fontRootClassName}`}
      data-theme="light"
      suppressHydrationWarning
    >
      <body className="min-h-full min-h-[100dvh] flex flex-col font-sans">
        <AnalyticsScripts />
        {children}
      </body>
    </html>
  );
}
