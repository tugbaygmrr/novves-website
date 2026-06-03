import type { DocumentLibraryItem } from "@/lib/document-library/types";

export function normalizeDocSearch(q: string): string {
  return q.trim().toLowerCase();
}

export function filterDocuments(
  items: DocumentLibraryItem[],
  query: string,
  categoryFilter?: string | null,
): DocumentLibraryItem[] {
  let result = items;
  if (categoryFilter) {
    result = result.filter(
      (d) =>
        d.treeCategory === categoryFilter ||
        d.category === categoryFilter,
    );
  }
  const q = normalizeDocSearch(query);
  if (!q) return result;
  return result.filter(
    (d) =>
      d.title.toLowerCase().includes(q) ||
      d.code.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q),
  );
}
