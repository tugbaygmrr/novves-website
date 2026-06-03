export type LegalDocId =
  | "privacy"
  | "terms"
  | "visitor"
  | "cookies"
  | "customer"
  | "product-safety";

export type LegalDefinitionItem = {
  abbr: string;
  title: string;
  description: string;
};

export type LegalContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "ordered"; items: string[] }
  | { type: "definitions"; items: LegalDefinitionItem[] }
  | {
      type: "banner";
      title: string;
      description: string;
      image?: string;
    };

export type LegalSection = {
  number?: string;
  title: string;
  blocks: LegalContentBlock[];
};

export type LegalDocument = {
  id: LegalDocId;
  /** URL segment under /{locale}/ */
  path: string;
  title: string;
  titleHighlight?: string;
  badge: string;
  lastUpdated: string;
  storageCode: string;
  classification: string;
  intro: string[];
  sections: LegalSection[];
  contactEmail?: string;
};

export type LegalCenterUi = {
  hubTitle: string;
  hubSubtitle: string;
  treeTitle: string;
  breadcrumbHome: string;
  breadcrumbHub: string;
  print: string;
  downloadPdf: string;
  docSummary: string;
  classification: string;
  language: string;
  storageCode: string;
  complianceAudit: string;
  complianceVerified: string;
  verification: string;
  revisionLogs: string;
  legalQuestion: string;
  legalQuestionDesc: string;
  openMenu: string;
  closeMenu: string;
  /** Belge özeti — dil satırı değeri */
  primaryLanguageLabel: string;
  revisionCurrentLabel: string;
  revisionPreviousLabel: string;
  revisionPreviousNote: string;
  compliancePassLabel: string;
  nav: Record<LegalDocId, string>;
};
