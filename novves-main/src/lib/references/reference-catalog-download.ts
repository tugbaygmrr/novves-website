import { hasLocale } from "@/i18n/config";

/** Bilingual TR+EN catalog - single PDF for both language download links */
export const REFERENCE_CATALOG = {
  languages: ["tr", "en"] as const,
  downloadByLanguage: {
    tr: "/documents/novves-referans-katalogu.pdf",
    en: "/documents/novves-referans-katalogu.pdf",
  },
  pdfMeta: "CAT-RP-01 · V0R0",
} as const;

export type ReferenceCatalogLanguage = (typeof REFERENCE_CATALOG.languages)[number];

const LANG_DISPLAY: Record<ReferenceCatalogLanguage, { tr: string; en: string }> = {
  tr: { tr: "T\u00fcrk\u00e7e", en: "Turkish" },
  en: { tr: "\u0130ngilizce", en: "English" },
};

export function getReferenceCatalogDownloadHref(
  language: ReferenceCatalogLanguage | string,
): string {
  const key = language as ReferenceCatalogLanguage;
  return REFERENCE_CATALOG.downloadByLanguage[key] ?? REFERENCE_CATALOG.downloadByLanguage.tr;
}

/** Page locale: tr -> TR label, others -> EN label (same bilingual PDF) */
export function getReferenceCatalogDownloadForLocale(locale: string): string {
  if (locale === "tr") return getReferenceCatalogDownloadHref("tr");
  return getReferenceCatalogDownloadHref("en");
}

export function getReferenceCatalogLanguageLabel(lang: ReferenceCatalogLanguage): string {
  return lang.toUpperCase();
}

export function getReferenceCatalogLanguageDisplayName(
  lang: ReferenceCatalogLanguage,
  locale: string,
): string {
  const names = LANG_DISPLAY[lang];
  if (locale === "tr") return names.tr;
  return names.en;
}

export function referenceCatalogLanguageForLocale(locale: string): ReferenceCatalogLanguage {
  if (hasLocale(locale) && locale === "tr") return "tr";
  return "en";
}
