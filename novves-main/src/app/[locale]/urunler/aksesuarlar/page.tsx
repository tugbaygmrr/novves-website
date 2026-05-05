import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";
import { productCategoryMetadata } from "@/lib/i18n-metadata";
import AksesuarlarClient from "./client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return productCategoryMetadata(locale, "aksesuarlar");
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.products.aksesuarlar;
  const s = dict.products.shared;
  if (!t?.accessories || !t.otherCategories || !s) notFound();

  return (
    <AksesuarlarClient
      locale={locale}
      accessories={t.accessories}
      otherCategories={t.otherCategories}
      shared={{
        home: s.home,
        products: s.products,
        productsLabel: s.productsLabel,
        explore: s.explore,
        otherCategories: s.otherCategories,
        technicalSupport: s.technicalSupport,
        technicalSupportRequest: s.technicalSupportRequest,
        searchProducts: s.searchProducts,
        clear: s.clear,
        results: s.results,
        noResults: s.noResults,
        readMore: s.readMore,
        readLess: s.readLess,
        getQuote: s.getQuote,
      }}
      titleFirst={t.titleFirst}
      titleHighlight={t.titleHighlight}
      productCount={t.productCount}
      ctaTitle={t.ctaTitle}
    />
  );
}
