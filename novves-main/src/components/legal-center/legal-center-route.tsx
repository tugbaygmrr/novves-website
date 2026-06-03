import { notFound } from "next/navigation";
import type { LegalDocId } from "@/lib/legal-center/types";
import {
  getLegalCenterUi,
  getLegalDocument,
  getLegalNavItems,
} from "@/lib/legal-center";
import { LegalCenterPage } from "@/components/legal-center/legal-center-page";
import { hasLocale } from "@/app/[locale]/dictionaries";

type Props = {
  docId: LegalDocId;
  params: Promise<{ locale: string }>;
};

export async function LegalCenterRoute({ docId, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const ui = getLegalCenterUi(locale);
  const doc = getLegalDocument(locale, docId);
  const navItems = getLegalNavItems(locale);

  return (
    <LegalCenterPage
      locale={locale}
      activeId={docId}
      ui={ui}
      doc={doc}
      navItems={navItems}
    />
  );
}
