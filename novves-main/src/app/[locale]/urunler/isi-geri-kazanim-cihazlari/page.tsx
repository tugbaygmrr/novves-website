import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/components/product-detail-page";
import { getDictionary, hasLocale } from "../../dictionaries";
import { productLeafMetadata } from "@/lib/i18n-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return productLeafMetadata(locale, "isiGeriKazanimCihazlari");
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.products.isiGeriKazanimCihazlari;

  return (
    <ProductDetailPage
      title={t.title}
      subtitle={t.subtitle}
      intro={t.intro}
      models={t.models}
      locale={locale}
      dict={dict.products}
      chrome={t.chrome}
      productsHubHref={`/${locale}/urunler/iklimlendirme`}
      solutionsHref={`/${locale}/cozumler/konfor-iklimlendirme-sistemleri`}
      categoryCtaHref={`/${locale}/urunler/iklimlendirme`}
      categoryCtaLabel={dict.products.shared.allIklimlendirmeProducts}
    />
  );
}
