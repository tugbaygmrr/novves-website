import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductSpecDetailPage } from "@/components/product-spec-detail-page";
import { getDictionary, hasLocale } from "../../dictionaries";
import { productLeafMetadata } from "@/lib/i18n-metadata";

const TIGER_GALLERY = [
  "/images/products/tiger1.jpg",
  "/images/products/tiger2.jpg",
  "/images/products/tiger3.jpg",
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return productLeafMetadata(locale, "klimaSantralleri");
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.products.klimaSantralleri;

  return (
    <ProductSpecDetailPage
      title={t.title}
      subtitle={t.subtitle}
      intro={t.intro}
      specs={t.specs}
      productLines={t.productLines}
      heroImage="/images/products/tiger-main.jpg"
      galleryImages={[...TIGER_GALLERY]}
      locale={locale}
      dict={dict.products}
    />
  );
}
