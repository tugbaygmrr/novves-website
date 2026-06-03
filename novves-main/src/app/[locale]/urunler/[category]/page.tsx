import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCategoryCatalogRoute } from "@/components/product-catalog/product-category-catalog-route";
import { getDictionary, hasLocale } from "../../dictionaries";
import { productCategoryMetadata } from "@/lib/i18n-metadata";
import { getProductCategoryBySlug } from "@/lib/product-catalog-builder";
import { locales } from "@/i18n/config";

type PageProps = { params: Promise<{ locale: string; category: string }> };

export async function generateStaticParams() {
  const { PRODUCT_CATEGORY_NAV } = await import("@/lib/hub-nav-config");
  return locales.flatMap((locale) =>
    PRODUCT_CATEGORY_NAV.map((item) => ({ locale, category: item.slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, category } = await params;
  const entry = getProductCategoryBySlug(category);
  if (!entry || !hasLocale(locale)) return {};
  return productCategoryMetadata(locale, entry.key);
}

export default async function ProductCategoryPage({ params }: PageProps) {
  const { locale, category } = await params;
  if (!hasLocale(locale)) notFound();

  const entry = getProductCategoryBySlug(category);
  if (!entry) notFound();

  return (
    <ProductCategoryCatalogRoute
      locale={locale}
      categoryKey={entry.key}
      categorySlug={entry.slug}
    />
  );
}
