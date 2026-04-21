import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CookieConsent } from "@/components/cookie-consent";
import { hasLocale, getDictionary } from "./dictionaries";

export const metadata: Metadata = {
  title: "Novves | Profesyonel Havalandırma Çözümleri",
  description:
    "Endüstriyel ve konfor havalandırması alanında yenilikçi jet fan ve duman tahliye çözümleri.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  ),
};

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return [{ locale: "tr" }, { locale: "en" }, { locale: "ru" }];
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

  return (
    <html lang={locale} className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <Navbar locale={locale} dict={dict.common} />
        <div className="flex-1">{children}</div>
        <Footer locale={locale} dict={dict.common} />
        <CookieConsent locale={locale} />
      </body>
    </html>
  );
}