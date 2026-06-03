import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IletisimPage } from "@/components/iletisim/iletisim-page";
import { resolveIletisimPageCopy } from "@/lib/iletisim/copy";
import { getDictionary, hasLocale } from "../dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale);
  const title = dict.common?.contact ?? (locale === "tr" ? "İletişim" : "Contact");
  return {
    title: `${title} | NOVVES`,
    description: dict.contact?.main?.heroDesc,
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const copy = resolveIletisimPageCopy(dict.contact?.iletisimHub, locale);
  const socialMediaLabel =
    dict.contact?.sosyalMedyaHub?.breadcrumbSocialMedia ??
    dict.contact?.sosyalMedya?.breadcrumbSocialMedia ??
    (locale === "tr" ? "Sosyal Medya" : "Social Media");
  return <IletisimPage locale={locale} copy={copy} socialMediaLabel={socialMediaLabel} />;
}
