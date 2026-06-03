import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HizmetlerOverviewPage } from "@/components/hizmetler/hizmetler-overview-page";
import { buildHizmetlerNavLabels } from "@/lib/hizmetler-nav";
import { serviceDetailMetadata } from "@/lib/i18n-metadata";
import { getDictionary, hasLocale } from "../dictionaries";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return serviceDetailMetadata(locale, "genelBakis");
}

export default async function HizmetlerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const t = dict.services.genelBakis;
  if (!t) notFound();

  const navLabels = buildHizmetlerNavLabels(locale, dict.common.navbar.links as Record<string, string>);

  return <HizmetlerOverviewPage locale={locale} content={t} navLabels={navLabels} />;
}
