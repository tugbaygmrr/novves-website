import "server-only";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { cache } from "react";
import { defaultLocale, hasLocale, type Locale } from "@/i18n/config";
import { readJsonFile } from "@/lib/read-json-file";
import type { LegalCenterUi, LegalDocId, LegalDocument } from "@/lib/legal-center/types";
import { legalDocumentsTr } from "@/lib/legal-center/content/tr";

function resolveLocalesDir(): string {
  const fromCwd = path.join(process.cwd(), "data", "legal-locales");
  if (fs.existsSync(path.join(fromCwd, "tr.json"))) return fromCwd;

  const fromModule = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "..",
    "..",
    "..",
    "..",
    "data",
    "legal-locales",
  );
  return fromModule;
}

/** Dev çökmemesi için büyük JSON dosyaları src dışında (Next dosya izleyici). */
const LOCALES_DIR = resolveLocalesDir();

export type LegalLocaleBundle = {
  ui: LegalCenterUi;
  documents: Record<LegalDocId, LegalDocument>;
};

const FALLBACK_CHAIN: Locale[] = ["en", "tr"];

function mergeLegalUi(partial: LegalCenterUi, base: LegalCenterUi): LegalCenterUi {
  return {
    ...base,
    ...partial,
    openMenu: partial.openMenu?.trim() || base.openMenu,
    closeMenu: partial.closeMenu?.trim() || base.closeMenu,
    primaryLanguageLabel: partial.primaryLanguageLabel?.trim() || base.primaryLanguageLabel,
    revisionCurrentLabel: partial.revisionCurrentLabel?.trim() || base.revisionCurrentLabel,
    revisionPreviousLabel: partial.revisionPreviousLabel?.trim() || base.revisionPreviousLabel,
    revisionPreviousNote: partial.revisionPreviousNote?.trim() || base.revisionPreviousNote,
    compliancePassLabel: partial.compliancePassLabel?.trim() || base.compliancePassLabel,
    nav: { ...base.nav, ...partial.nav },
  };
}

function localeJsonPath(locale: string): string {
  return path.join(LOCALES_DIR, `${locale}.json`);
}

function loadBundleFromDisk(locale: string): LegalLocaleBundle | null {
  const filePath = localeJsonPath(locale);
  if (!fs.existsSync(filePath)) return null;
  try {
    return readJsonFile<LegalLocaleBundle>(filePath);
  } catch {
    return null;
  }
}

function trFallbackBundle(): LegalLocaleBundle {
  const trJson = loadBundleFromDisk("tr");
  if (trJson) return trJson;
  return {
    ui: {
      hubTitle: "Gizlilik ve Uyum",
      hubSubtitle: "Gizlilik ve Yasal Uyum Merkezi",
      treeTitle: "Doküman Ağacı",
      breadcrumbHome: "Ana Sayfa",
      breadcrumbHub: "Gizlilik ve Uyum",
      print: "Yazdır",
      downloadPdf: "PDF İndir",
      docSummary: "Belge Özeti",
      classification: "Sınıflandırma",
      language: "Dil",
      storageCode: "Arşiv Kodu",
      complianceAudit: "Uyum Denetimi",
      complianceVerified: "Hukuk departmanı tarafından doğrulandı",
      verification: "Doğrulama",
      revisionLogs: "Revizyon Kayıtları",
      legalQuestion: "Hukuki sorunuz mu var?",
      legalQuestionDesc:
        "Uyum ve gizlilik konularında doğrudan bizimle iletişime geçebilirsiniz.",
      openMenu: "Menüyü aç",
      closeMenu: "Menüyü kapat",
      primaryLanguageLabel: "Türkçe (birincil hukuki metin)",
      revisionCurrentLabel: "Revizyon 2.4",
      revisionPreviousLabel: "Revizyon 2.3",
      revisionPreviousNote: "Genel güncellemeler",
      compliancePassLabel: "%94 GEÇTİ",
      nav: {
        privacy: "Kişisel Verilerin Korunması ve Gizlilik Politikası",
        terms: "Kullanım Koşulları",
        visitor: "Web Sitesi Ziyaretçi Aydınlatma Metni",
        cookies: "Çerez Politikası",
        customer: "Müşteri Aydınlatma Metni",
        "product-safety": "Ürün Güvenliği Temas Noktası",
      },
    },
    documents: legalDocumentsTr,
  };
}

function resolveBundle(locale: string): LegalLocaleBundle {
  const candidates: string[] = [];
  if (hasLocale(locale)) candidates.push(locale);
  for (const fb of FALLBACK_CHAIN) {
    if (!candidates.includes(fb)) candidates.push(fb);
  }
  if (!candidates.includes(defaultLocale)) candidates.push(defaultLocale);

  const trUi = loadBundleFromDisk("tr")?.ui ?? trFallbackBundle().ui;
  const enUi = loadBundleFromDisk("en")?.ui ?? trUi;

  for (const loc of candidates) {
    const bundle = loadBundleFromDisk(loc);
    if (bundle?.documents) {
      const uiFallback = loc === "tr" ? trUi : enUi;
      return {
        ...bundle,
        ui: mergeLegalUi(bundle.ui, uiFallback),
      };
    }
  }

  return trFallbackBundle();
}

export const getLegalLocaleBundle = cache((locale: string): LegalLocaleBundle => {
  return resolveBundle(locale);
});

export function getLegalDocumentsForLocale(
  locale: string,
): Record<LegalDocId, LegalDocument> {
  return getLegalLocaleBundle(locale).documents;
}

export function getLegalUiForLocale(locale: string): LegalCenterUi {
  return getLegalLocaleBundle(locale).ui;
}
