/**
 * TR yasal belgelerini (TS) → data/legal-locales/tr.json
 *
 *   npx tsx scripts/legal-export-json.ts
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { legalDocumentsTr } from "../src/lib/legal-center/content/tr";
import type { LegalCenterUi } from "../src/lib/legal-center/types";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "data/legal-locales");

const trUi: LegalCenterUi = {
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
};

const bundle = {
  ui: trUi,
  documents: legalDocumentsTr,
};

fs.mkdirSync(OUT_DIR, { recursive: true });
const outPath = path.join(OUT_DIR, "tr.json");
fs.writeFileSync(outPath, `${JSON.stringify(bundle, null, 2)}\n`, "utf8");
console.log(`Wrote ${outPath} (${(fs.statSync(outPath).size / 1024).toFixed(1)} KB)`);
