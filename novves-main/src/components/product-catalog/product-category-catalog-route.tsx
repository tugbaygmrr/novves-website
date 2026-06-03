import { notFound } from "next/navigation";
import { ProductCatalogPage } from "@/components/product-catalog/product-catalog-page";
import { getDictionary, hasLocale } from "@/app/[locale]/dictionaries";
import { buildProductCatalogPage } from "@/lib/product-catalog-builder";
import { getProductCatalogUi } from "@/lib/product-catalog-ui";

export async function ProductCategoryCatalogRoute({
  locale,
  categoryKey,
  categorySlug,
}: {
  locale: string;
  categoryKey: string;
  categorySlug: string;
}) {
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const s = dict.products.shared;
  const ui = getProductCatalogUi(locale);

  const data = buildProductCatalogPage(
    locale,
    categoryKey,
    categorySlug,
    dict.products as unknown as Record<string, unknown>,
    s.categories as unknown as Record<string, string>,
  );
  if (!data) notFound();

  return <ProductCatalogPage locale={locale} data={data} ui={ui} />;
}
