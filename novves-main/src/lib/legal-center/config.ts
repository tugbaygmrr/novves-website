import type { LegalDocId } from "@/lib/legal-center/types";

/** Public URL segment → document id */
export const LEGAL_PATH_TO_DOC: Record<string, LegalDocId> = {
  legal: "privacy",
  privacy: "privacy",
  terms: "terms",
  visitor: "visitor",
  cookies: "cookies",
  customer: "customer",
  "product-safety": "product-safety",
};

export const LEGAL_DOC_ORDER: LegalDocId[] = [
  "privacy",
  "terms",
  "visitor",
  "cookies",
  "customer",
  "product-safety",
];

export function legalDocPath(id: LegalDocId): string {
  const paths: Record<LegalDocId, string> = {
    privacy: "privacy",
    terms: "terms",
    visitor: "visitor",
    cookies: "cookies",
    customer: "customer",
    "product-safety": "product-safety",
  };
  return paths[id];
}

export function legalDocIdFromPath(segment: string): LegalDocId | null {
  return LEGAL_PATH_TO_DOC[segment] ?? null;
}

export function isLegalCenterPath(segment: string): boolean {
  return segment in LEGAL_PATH_TO_DOC;
}
