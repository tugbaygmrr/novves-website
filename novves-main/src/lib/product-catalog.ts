import { PRODUCT_CATEGORY_NAV } from "@/lib/hub-nav-config";

export type ProductCatalogCategoryNav = {
  key: string;
  slug: string;
  label: string;
  href: string;
  active: boolean;
};

export type ProductCatalogItem = {
  id: string;
  /** Kategori içi sıra no — "01", "02", … */
  number: string;
  name: string;
  type: string;
  image: string;
  href?: string;
  description: string;
  subModels: string[];
  comingSoon: boolean;
  specFlow: string;
  specPressure: string;
};

export type ProductCatalogDoc = {
  id: string;
  title: string;
  meta: string;
  href: string;
  kind: "catalog" | "guide";
};

export type ProductCatalogPageData = {
  categoryKey: string;
  categorySlug: string;
  breadcrumbCategory: string;
  pageTitle: string;
  pageSubtitle: string;
  categories: ProductCatalogCategoryNav[];
  products: ProductCatalogItem[];
  catalogs: ProductCatalogDoc[];
  guides: ProductCatalogDoc[];
  technicalCenterHref: string;
  perfectusHref: string;
};

export function buildProductCatalogCategories(
  locale: string,
  categoryLabels: Record<string, string>,
  activeSlug: string,
): ProductCatalogCategoryNav[] {
  return PRODUCT_CATEGORY_NAV.map((item) => ({
    key: item.key,
    slug: item.slug,
    label: categoryLabels[item.key] ?? item.key,
    href: `/${locale}/urunler/${item.slug}`,
    active: item.slug === activeSlug,
  }));
}
