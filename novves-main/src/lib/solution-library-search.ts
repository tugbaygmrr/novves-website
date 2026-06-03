import type { SolutionLibraryDocument, SolutionLibraryPageData, SolutionLibraryProduct } from "@/lib/solution-library";

/** Arama için Türkçe/İngilizce metni normalize eder */
export function normalizeSearchQuery(raw: string): string {
  return raw
    .trim()
    .toLocaleLowerCase("tr")
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/ı/g, "i")
    .replace(/İ/g, "i");
}

function matchesQuery(haystack: string, query: string): boolean {
  if (!query) return true;
  return normalizeSearchQuery(haystack).includes(query);
}

export type SolutionSearchHit = {
  slug: string;
  label: string;
  current: boolean;
  href: string;
};

export type SolutionLibrarySearchResults = {
  query: string;
  hasQuery: boolean;
  isEmpty: boolean;
  solutions: SolutionSearchHit[];
  products: SolutionLibraryProduct[];
  documents: SolutionLibraryDocument[];
};

export function buildSolutionLibrarySearchResults(
  data: SolutionLibraryPageData,
  locale: string,
  rawQuery: string,
): SolutionLibrarySearchResults {
  const query = normalizeSearchQuery(rawQuery);
  const hasQuery = query.length > 0;

  if (!hasQuery) {
    return {
      query: "",
      hasQuery: false,
      isEmpty: false,
      solutions: [],
      products: data.products,
      documents: data.documents,
    };
  }

  const solutions: SolutionSearchHit[] = [];
  const seenHrefs = new Set<string>();
  const pushSolution = (hit: SolutionSearchHit) => {
    if (seenHrefs.has(hit.href)) return;
    seenHrefs.add(hit.href);
    solutions.push(hit);
  };

  for (const item of data.sidebar) {
    const labelMatch = matchesQuery(item.label, query);
    const matchingChildren =
      item.slug === data.slug ? item.children.filter((c) => matchesQuery(c.label, query)) : [];

    if (labelMatch) {
      pushSolution({
        slug: item.slug,
        label: item.label,
        current: item.slug === data.slug,
        href: `/${locale}/cozumler/${item.slug}`,
      });
    }

    for (const child of matchingChildren) {
      pushSolution({
        slug: item.slug,
        label: child.label,
        current: true,
        href: `/${locale}/cozumler/${item.slug}${child.href}`,
      });
    }
  }

  const products = data.products.filter(
    (p) => matchesQuery(p.name, query) || matchesQuery(p.description, query),
  );

  const documents = data.documents.filter(
    (d) => matchesQuery(d.title, query) || matchesQuery(d.meta, query),
  );

  const isEmpty = solutions.length === 0 && products.length === 0 && documents.length === 0;

  return {
    query,
    hasQuery,
    isEmpty,
    solutions,
    products,
    documents,
  };
}
