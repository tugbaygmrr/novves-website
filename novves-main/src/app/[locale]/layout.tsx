import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { buildAlternates } from "@/lib/seo/metadata";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ConsentRestrictedCookieSync } from "@/components/consent-restricted-sync";
import { CookieConsentLoader } from "@/components/cookie-consent-loader";
import { SetHtmlLang } from "@/components/set-html-lang";
import { GlobalJumpNav } from "@/components/global-jump-nav";
import { locales, type Locale } from "@/i18n/config";
import { buildJumpNavLabels } from "@/i18n/jump-nav-labels";
import { hasLocale, getLocaleShellDictionary } from "./dictionaries";
import { SiteJsonLd } from "@/components/seo/site-json-ld";
import { RouteBreadcrumbJsonLd } from "@/components/seo/route-breadcrumb-json-ld";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#eaeadf",
  colorScheme: "light",
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/** Sayfa metadata'sinda alternates yoksa runtime'da hreflang tamamlanir. */
export async function generateMetadata(): Promise<Metadata> {
  const pathname = (await headers()).get("x-pathname");
  if (!pathname) return {};
  return { alternates: buildAlternates(pathname) };
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

  const dict = await getLocaleShellDictionary(locale);
  const jumpLabels = buildJumpNavLabels(locale as Locale, dict);
  const nav = dict.common.navbar;
  const navLinks = nav.links as Record<string, string> | undefined;

  return (
    <>
      <SiteJsonLd locale={locale} />
      <RouteBreadcrumbJsonLd
        locale={locale}
        navbar={nav}
        sustainabilityLabel={navLinks?.sustainability ?? "Sustainability"}
      />
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
