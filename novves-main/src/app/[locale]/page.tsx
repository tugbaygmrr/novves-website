import { getLocaleShellDictionary, hasLocale } from "./dictionaries";
import { getHomeReferencePreviewCounts } from "@/lib/home-reference-preview-counts";
import { homeMetadata } from "@/lib/i18n-metadata";
import { notFound } from "next/navigation";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import HomeClient from "./home-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return homeMetadata(locale);
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(locale)) notFound();

  const dict = await getLocaleShellDictionary(locale);

  const referencePreviewProjectCounts = getHomeReferencePreviewCounts();
  const faqItems = dict.home.faq.items.map((item: { q: string; a: string }) => ({
    question: item.q,
    answer: item.a,
  }));

  return (
    <>
      <FaqJsonLd items={faqItems} />
      <HomeClient
      dict={dict.home}
      common={dict.common}
      locale={locale}
      productCategoryLabels={dict.productCategoryLabels}
      referencePreviewProjectCounts={referencePreviewProjectCounts}
    />
    </>
  );
}
