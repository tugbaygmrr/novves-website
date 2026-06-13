#!/usr/bin/env node
/** Write reference-catalog-download.ts (ASCII-only). */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const FILE = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "src/lib/references/reference-catalog-download.ts",
);

const content = `import { hasLocale } from "@/i18n/config";

/** Reference catalog PDFs � same paths as document library */
export const REFERENCE_CATALOG = {
  languages: ["tr", "en"] as const,
  downloadByLanguage: {
    tr: "/documents/novves-referans-katalogu.pdf",
    en: "/documents/novves-referans-katalogu.pdf",
  },
  pdfMeta: "Updated: 05.2026",
} as const;

export type ReferenceCatalogLanguage = (typeof REFERENCE_CATALOG.languages)[number];

const LANG_DISPLAY: Record<ReferenceCatalogLanguage, { tr: string; en: string }> = {
  tr: { tr: "T\\u00fcrk\\u00e7e", en: "Turkish" },
  en: { tr: "\\u0130ngilizce", en: "English" },
};

export function getReferenceCatalogDownloadHref(
  language: ReferenceCatalogLanguage | string,
): string {
  const key = language as ReferenceCatalogLanguage;
  return REFERENCE_CATALOG.downloadByLanguage[key] ?? REFERENCE_CATALOG.downloadByLanguage.tr;
}

/** Page locale: tr -> TR PDF, others -> EN PDF */
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
`;

fs.writeFileSync(FILE, content, "utf8");
new TextDecoder("utf-8", { fatal: true }).decode(fs.readFileSync(FILE));
console.log("OK reference-catalog-download.ts");
