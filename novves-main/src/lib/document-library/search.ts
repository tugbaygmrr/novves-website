import type { DocumentLibraryItem } from "@/lib/document-library/types";

export function normalizeDocSearch(q: string): string {
  return q.trim().toLowerCase();
}

export function filterDocuments(
  items: DocumentLibraryItem[],
  query: string,
  categoryFilter?: string | null,
  languageFilter?: string | null,
): DocumentLibraryItem[] {
  let result = items;
  if (categoryFilter) {
    result = result.filter(
      (d) =>
        d.treeCategory === categoryFilter ||
        d.category === categoryFilter,
    );
  }
  if (languageFilter) {
    result = result.filter(
      (d) =>
        d.language === languageFilter ||
        d.languages?.includes(languageFilter),
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

export function collectDocumentLanguages(
  items: DocumentLibraryItem[],
  preferredLocale?: string,
): string[] {
  const langs = new Set<string>();
  for (const doc of items) {
    if (doc.languages?.length) {
      for (const lang of doc.languages) langs.add(lang);
    } else {
      langs.add(doc.language);
    }
  }
  const sorted = [...langs];
  sorted.sort((a, b) => {
    if (preferredLocale) {
      if (a === preferredLocale) return -1;
      if (b === preferredLocale) return 1;
    }
    if (a === "tr") return -1;
    if (b === "tr") return 1;
    return a.localeCompare(b);
  });
  return sorted;
}

export function getDocumentLanguages(doc: DocumentLibraryItem): string[] {
  return doc.languages?.length ? [...doc.languages] : [doc.language];
}

export function getDocumentDownloadHref(
  doc: DocumentLibraryItem,
  language?: string | null,
): string | undefined {
  if (language && doc.downloadByLanguage?.[language]) {
    return doc.downloadByLanguage[language];
  }
  return doc.downloadHref;
}
