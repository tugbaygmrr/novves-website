import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductTableDetailPage } from "@/components/product-table-detail-page";
import { getDictionary, hasLocale } from "../../dictionaries";
import { productLeafMetadata } from "@/lib/i18n-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return productLeafMetadata(locale, "havuzNemAlmaSantrali");
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.products.havuzNemAlmaSantrali;

  return (
    <ProductTableDetailPage
      title={t.title}
      subtitle={t.subtitle}
      intro={t.intro}
      tableHeaders={t.tableHeaders}
      models={t.models}
      productLines={t.productLines}
      heroImage="/images/products/dolphin-main.jpg"
      locale={locale}
      dict={dict.products}
    />
  );
}
