import "./globals.css";
import { fontRootClassName } from "./fonts";
import { headers } from "next/headers";
import {
  defaultLocale,
  hasLocale,
  htmlLangOverride,
  type Locale,
} from "@/i18n/config";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const h = await headers();
  const raw = h.get("x-novves-locale");
  const locale =
    raw && hasLocale(raw) ? (raw as Locale) : defaultLocale;
  const lang = htmlLangOverride[locale] ?? locale;
  const dir = locale === "ar" || locale === "ur" ? "rtl" : "ltr";

  return (
    <html
      lang={lang}
      dir={dir}
      className={`h-full antialiased light ${fontRootClassName}`}
      data-theme="light"
      suppressHydrationWarning
    >
      <body className="min-h-full min-h-[100dvh] flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
