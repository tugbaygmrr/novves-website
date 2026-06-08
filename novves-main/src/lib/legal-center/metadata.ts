import type { Metadata } from "next";
import type { LegalDocId } from "@/lib/legal-center/types";
import { getLegalCenterUi, getLegalDocument } from "@/lib/legal-center";
import { withPageSeo } from "@/lib/seo/page-metadata";

export function legalCenterMetadata(
  locale: string,
  docId: LegalDocId,
): Metadata {
  const ui = getLegalCenterUi(locale);
  const doc = getLegalDocument(locale, docId);
  const title = `${ui.nav[docId]} | Novves`;
  const description = doc.intro[0]?.slice(0, 160) ?? ui.hubSubtitle;

  return withPageSeo({
    locale,
    pathAfterLocale: doc.path,
    title,
    description,
  });
}
