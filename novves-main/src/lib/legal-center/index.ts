import type { LegalDocId, LegalDocument } from "@/lib/legal-center/types";
import {
  getLegalDocumentsForLocale,
  getLegalUiForLocale,
} from "@/lib/legal-center/content/locale-loader";
import { LEGAL_DOC_ORDER } from "@/lib/legal-center/config";

export { LEGAL_DOC_ORDER, legalDocPath, legalDocIdFromPath } from "@/lib/legal-center/config";
export { getLegalCenterUi } from "@/lib/legal-center/i18n";
export type { LegalDocId, LegalDocument, LegalCenterUi } from "@/lib/legal-center/types";

export function getLegalDocument(
  locale: string,
  id: LegalDocId,
): LegalDocument {
  const docs = getLegalDocumentsForLocale(locale);
  return docs[id];
}

export function getAllLegalDocuments(locale: string): LegalDocument[] {
  const docs = getLegalDocumentsForLocale(locale);
  return LEGAL_DOC_ORDER.map((id) => docs[id]);
}

export function getLegalNavItems(locale: string) {
  const ui = getLegalUiForLocale(locale);
  const docs = getLegalDocumentsForLocale(locale);
  return LEGAL_DOC_ORDER.map((id) => ({
    id,
    path: docs[id].path,
    label: ui.nav[id],
  }));
}
