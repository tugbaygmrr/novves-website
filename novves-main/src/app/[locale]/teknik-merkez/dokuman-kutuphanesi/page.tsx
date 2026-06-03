import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocumentLibraryPage } from "@/components/document-library/document-library-page";
import { buildDocumentLibraryPageData } from "@/lib/document-library/build-page-data";
import { resolveDocumentLibraryUi } from "@/lib/document-library/resolve-ui";
import type { DocumentLibraryUi } from "@/lib/document-library/types";
import { getDictionary, hasLocale, type Locale } from "../../dictionaries";
import { technicalDetailMetadata } from "@/lib/i18n-metadata";

type LibraryDict = DocumentLibraryUi & {
  documents: {
    id: string;
    category: string;
    code: string;
    title: string;
    status: "active" | "passive" | "critical" | "current" | "approved" | "video";
    highlight?: boolean;
    criticalTitle?: boolean;
    treeCategory?: string;
  }[];
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return technicalDetailMetadata(locale, "dokumanKutuphanesi");
}

async function loadLibraryDict(locale: Locale): Promise<LibraryDict> {
  const dict = await getDictionary(locale);
  const block = dict.technical.dokumanKutuphanesi.library as LibraryDict | undefined;
  if (block?.documents?.length) return block;

  if (locale !== "en") {
    const en = await getDictionary("en");
    const enBlock = en.technical.dokumanKutuphanesi.library as LibraryDict | undefined;
    if (enBlock?.documents?.length) return enBlock;
  }

  throw new Error("document library dictionary missing");
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const enDict = locale === "en" ? null : await getDictionary("en");
  const enLibrary = enDict?.technical.dokumanKutuphanesi.library as DocumentLibraryUi | undefined;
  const libraryDict = await loadLibraryDict(locale);
  const { documents: _docs, ...uiFromLocale } = libraryDict;
  const ui = resolveDocumentLibraryUi(uiFromLocale, enLibrary ?? uiFromLocale);
  const { documents, tree, defaultPreviewImage } = buildDocumentLibraryPageData(ui, libraryDict);

  return (
    <DocumentLibraryPage
      locale={locale}
      ui={ui}
      documents={documents}
      tree={tree}
      defaultPreviewImage={defaultPreviewImage}
    />
  );
}
