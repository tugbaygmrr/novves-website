import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SosyalMedyaPage } from "@/components/sosyal-medya/sosyal-medya-page";
import { resolveSosyalMedyaCopy, type SosyalMedyaHubJson } from "@/lib/sosyal-medya/copy";
import { getDictionary, hasLocale } from "../../dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale);
  const copy = resolveSosyalMedyaCopy(dict.contact?.sosyalMedyaHub as SosyalMedyaHubJson | undefined, locale);

  return {
    title: `${copy.heroTitle1} ${copy.heroTitle2} | Novves`,
    description: copy.heroDesc,
  };
}

export default async function SosyalMedya({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const hub = dict.contact?.sosyalMedyaHub as SosyalMedyaHubJson | undefined;
  const copy = resolveSosyalMedyaCopy(hub, locale);

  return <SosyalMedyaPage locale={locale} copy={copy} hub={hub} />;
}
