import type { DocumentLibraryUi } from "@/lib/document-library/types";

/** Eksik `library` bloğu olan diller için EN yedek */
export function resolveDocumentLibraryUi(
  fromDict: DocumentLibraryUi | undefined,
  fallback: DocumentLibraryUi,
): DocumentLibraryUi {
  if (!fromDict) return fallback;
  return {
    ...fallback,
    ...fromDict,
    nav: { ...fallback.nav, ...fromDict.nav },
    sidebar: {
      ...fallback.sidebar,
      ...fromDict.sidebar,
      tree: { ...fallback.sidebar.tree, ...fromDict.sidebar?.tree },
    },
    table: { ...fallback.table, ...fromDict.table },
    widgets: { ...fallback.widgets, ...fromDict.widgets },
    emptyResults: fromDict.emptyResults ?? fallback.emptyResults,
    searchAllLanguages: fromDict.searchAllLanguages ?? fallback.searchAllLanguages,
    inspector: { ...fallback.inspector, ...fromDict.inspector },
    footer: { ...fallback.footer, ...fromDict.footer },
    revisionLogs: { ...fallback.revisionLogs, ...fromDict.revisionLogs },
  };
}
