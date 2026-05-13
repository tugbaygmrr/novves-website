import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ConsentRestrictedCookieSync } from "@/components/consent-restricted-sync";
import { CookieConsentLoader } from "@/components/cookie-consent-loader";
import { SetHtmlLang } from "@/components/set-html-lang";
import { GlobalJumpNav } from "@/components/global-jump-nav";
import { locales, htmlLangOverride, type Locale } from "@/i18n/config";
import { buildJumpNavLabels } from "@/i18n/jump-nav-labels";
import { hasLocale, getDictionary } from "./dictionaries";

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) {
    return { title: "Novves" };
  }
  const dict = await getDictionary(locale as Locale);
  const hero = dict.home.hero;
  const title = `${hero.titleLine1} ${hero.titleLine2} | Novves`;
  const description = hero.subtitle;
  const base = new URL(appUrl);
  const lang = htmlLangOverride[locale as Locale] ?? locale;
  const languages = Object.fromEntries(locales.map((l) => [l, `${appUrl}/${l}`]));

  return {
    metadataBase: base,
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages,
    },
    openGraph: {
      type: "website",
      locale: lang,
      url: `${appUrl}/${locale}`,
      siteName: "Novves",
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#eaeadf",
  colorScheme: "light",
};

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const jumpLabels = buildJumpNavLabels(locale as Locale, dict);

  return (
    <>
      <SetHtmlLang locale={locale} />
      <ConsentRestrictedCookieSync />
      <Navbar locale={locale} dict={dict.common} />
      <div className="min-w-0 flex-1">{children}</div>
      <Footer locale={locale} dict={dict.common} />
      <CookieConsentLoader locale={locale} />
      <GlobalJumpNav locale={locale} labels={jumpLabels} />
    </>
  );
}