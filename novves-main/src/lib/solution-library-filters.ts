import type {
  SolutionLibraryDocument,
  SolutionLibraryPageData,
  SolutionLibraryProduct,
} from "@/lib/solution-library";
import type { SolutionLibrarySearchResults } from "@/lib/solution-library-search";
import { normalizeSearchQuery } from "@/lib/solution-library-search";

export type ContentScope = "all" | "products" | "documents";

export type SolutionLibraryFilterState = {
  contentScope: ContentScope;
  componentHrefs: string[];
  documentTypes: SolutionLibraryDocument["icon"][];
};

export const EMPTY_SOLUTION_LIBRARY_FILTERS: SolutionLibraryFilterState = {
  contentScope: "all",
  componentHrefs: [],
  documentTypes: [],
};

export type SolutionLibraryFilteredView = {
  products: SolutionLibraryProduct[];
  documents: SolutionLibraryDocument[];
  showProductsSection: boolean;
  showDocsSection: boolean;
  hasActiveFilters: boolean;
};

function componentLabelWords(label: string): string[] {
  return normalizeSearchQuery(label)
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

function productMatchesComponent(
  product: SolutionLibraryProduct,
  productIndex: number,
  componentHref: string,
  componentLabel: string,
): boolean {
  const idxMatch = componentHref.match(/#bilesen-(\d+)/);
  if (idxMatch && Number(idxMatch[1]) === productIndex) return true;

  const words = componentLabelWords(componentLabel);
  if (words.length === 0) return false;

  const text = normalizeSearchQuery(`${product.name} ${product.description}`);
  return words.some((w) => text.includes(w));
}

function filterProductsByComponents(
  products: SolutionLibraryProduct[],
  allProducts: SolutionLibraryProduct[],
  componentHrefs: string[],
  children: { href: string; label: string }[],
): SolutionLibraryProduct[] {
  if (componentHrefs.length === 0) return products;

  const selected = children.filter((c) => componentHrefs.includes(c.href));
  if (selected.length === 0) return products;

  return products.filter((product) => {
    const index = allProducts.findIndex((p) => p.id === product.id);
    return selected.some((child) => productMatchesComponent(product, index, child.href, child.label));
  });
}

export function countActiveFilters(filters: SolutionLibraryFilterState): number {
  let n = 0;
  if (filters.contentScope !== "all") n += 1;
  if (filters.componentHrefs.length > 0) n += 1;
  if (filters.documentTypes.length > 0) n += 1;
  return n;
}

export function applySolutionLibraryFilters(
  searchResults: SolutionLibrarySearchResults,
  filters: SolutionLibraryFilterState,
  data: SolutionLibraryPageData,
): SolutionLibraryFilteredView {
  const active = countActiveFilters(filters) > 0;
  const currentChildren = data.sidebar.find((s) => s.slug === data.slug)?.children ?? [];

  let products = searchResults.products;
  let documents = searchResults.documents;

  products = filterProductsByComponents(products, data.products, filters.componentHrefs, currentChildren);

  if (filters.documentTypes.length > 0) {
    const types = new Set(filters.documentTypes);
    documents = documents.filter((d) => types.has(d.icon));
  }

  const showProductsSection = filters.contentScope !== "documents";
  const showDocsSection = data.showDocumentation && filters.contentScope !== "products";

  return {
    products: showProductsSection ? products : [],
    documents: showDocsSection ? documents : [],
    showProductsSection,
    showDocsSection,
    hasActiveFilters: active,
  };
}
