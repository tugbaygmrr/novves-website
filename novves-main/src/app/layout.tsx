import "./globals.css";
import Script from "next/script";
import type { Metadata } from "next";
import { fontRootClassName } from "./fonts";
import {
  defaultLocale,
  htmlLangOverride,
  locales,
} from "@/i18n/config";
import { getSiteUrl } from "@/lib/seo/metadata";
import { buildOgImageMetadata, buildTwitterImageMetadata } from "@/lib/seo/og-image";

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

const HTML_LANG_SYNC_SCRIPT = `(function(){var L=${JSON.stringify(locales)};var H=${JSON.stringify(htmlLangOverride)};var D=${JSON.stringify(defaultLocale)};var s=location.pathname.split("/").filter(Boolean)[0]||"";var loc=L.indexOf(s)>=0?s:D;document.documentElement.lang=H[loc]||loc;document.documentElement.dir=loc==="ar"||loc==="ur"?"rtl":"ltr";})();`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = htmlLangOverride[defaultLocale] ?? defaultLocale;

  return (
    <html
      lang={lang}
      dir="ltr"
      className={`h-full antialiased light ${fontRootClassName}`}
      data-theme="light"
      suppressHydrationWarning
    >
      <body className="min-h-full min-h-[100dvh] flex flex-col font-sans">
        <Script id="novves-html-lang-sync" strategy="beforeInteractive">
          {HTML_LANG_SYNC_SCRIPT}
        </Script>
        {children}
      </body>
    </html>
  );
}
