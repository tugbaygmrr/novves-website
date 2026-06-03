import type { LegalDocument } from "@/lib/legal-center/types";
import { privacyDocumentTr } from "@/lib/legal-center/content/privacy-tr";
import { termsDocumentTr } from "@/lib/legal-center/content/terms-tr";
import { visitorDocumentTr } from "@/lib/legal-center/content/visitor-tr";
import { cookiesDocumentTr } from "@/lib/legal-center/content/cookies-tr";
import { customerDocumentTr } from "@/lib/legal-center/content/customer-tr";
import { productSafetyDocumentTr } from "@/lib/legal-center/content/product-safety-tr";

export const legalDocumentsTr: Record<
  import("@/lib/legal-center/types").LegalDocId,
  LegalDocument
> = {
  privacy: privacyDocumentTr,
  terms: termsDocumentTr,
  visitor: visitorDocumentTr,
  cookies: cookiesDocumentTr,
  customer: customerDocumentTr,
  "product-safety": productSafetyDocumentTr,
};
