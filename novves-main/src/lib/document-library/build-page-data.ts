import type {
  DocumentLibraryItem,
  DocumentLibraryTreeNode,
  DocumentLibraryUi,
} from "@/lib/document-library/types";

type RawDoc = {
  id: string;
  language: string;
  languages?: string[];
  downloadByLanguage?: Record<string, string>;
  category: string;
  code: string;
  title: string;
  status: DocumentLibraryItem["status"];
  highlight?: boolean;
  criticalTitle?: boolean;
  treeCategory?: string;
  fileFormat?: string;
  downloadHref?: string;
  revision?: string;
  lastModified?: string;
};

const DEFAULT_PREVIEW = "/images/products/marlin.png";

const PREVIEW_BY_DOC_ID: Record<string, string> = {
  "cat-nv-2024-01": "/images/products/marlin.png",
  "ts-fan-003": "/images/products/dragonfly-c.png",
  "bim-axl-315": "/images/products/hound-al.png",
  "eff-ec-2024": "/images/products/turtle-a.jpg",
  "ce-12101-3-2024": "/images/products/heron-ah.jpg",
  "web-24-05": "/images/products/nautilus-cif-cidarli.jpg",
  "ql-pro10": "/images/products/marlin.png",
  "el-2024": "/images/products/dragonfly-c.png",
  "novves-company-profile": "/images/corporate/novves-logo-sloganli.png",
  "novves-biyomimetik-catalog": "/images/catalogs/katalog-mockup-kapak-website-icin.png",
  "novves-duman-tahliye-catalog": "/images/catalogs/dumantahliye-mockup.png",
  "novves-certificates-catalog": "/images/certificates/bsi9001.png",
  "novves-references-catalog": "/images/corporate/novves-buyume-bina.png",
};

export function buildDocumentLibraryTree(ui: DocumentLibraryUi): DocumentLibraryTreeNode[] {
  const t = ui.sidebar.tree;
  return [
    {
      id: "document-library",
      label: t.documentLibrary,
      icon: "library",
      defaultExpanded: true,
      children: [
        { id: "catalogs", label: t.catalogs, icon: "catalog", filterCategory: t.catalogs },
        { id: "data-sheets", label: t.dataSheets, icon: "datasheet", filterCategory: t.dataSheets },
        { id: "brochures", label: t.brochures, icon: "brochure", filterCategory: t.brochures },
      ],
    },
    { id: "usage-manuals", label: t.usageManuals, icon: "manual", filterCategory: t.usageManuals },
    {
      id: "certifications",
      label: t.certifications,
      icon: "certificate",
      filterCategory: t.certifications,
    },
    { id: "cad-bim", label: t.cadBim, icon: "cad", filterCategory: t.cadBim },
    { id: "training", label: t.training, icon: "training", filterCategory: t.training },
    {
      id: "troubleshooting",
      label: t.troubleshooting,
      icon: "troubleshooting",
      variant: "troubleshooting",
      filterCategory: t.troubleshooting,
    },
    {
      id: "test-performance",
      label: t.testPerformance,
      icon: "performance",
      filterCategory: t.testPerformance,
    },
    {
      id: "energy-efficiency",
      label: t.energyEfficiency,
      icon: "efficiency",
      filterCategory: t.energyEfficiency,
    },
  ];
}

export function buildDocumentLibraryPageData(ui: DocumentLibraryUi) {
  const sharedDocuments: RawDoc[] = [
    {
      id: "novves-biyomimetik-catalog",
      language: "tr",
      languages: ["tr", "en"],
      downloadByLanguage: {
        tr: "/documents/novves-biyomimetik-katalog.pdf",
        en: "/documents/novves-biyomimetik-katalog.pdf",
      },
      category: ui.sidebar.tree.catalogs,
      code: "CAT-NV-BIO-2026",
      title: "NOVVES Biyomimetik Ürün Kataloğu",
      status: "active",
      highlight: true,
      treeCategory: ui.sidebar.tree.catalogs,
      fileFormat: "PDF Katalog",
      revision: "B / 2026",
      lastModified: "25 May 2026",
      downloadHref: "/documents/novves-biyomimetik-katalog.pdf",
    },
    {
      id: "novves-duman-tahliye-catalog",
      language: "tr",
      languages: ["tr", "en"],
      downloadByLanguage: {
        tr: "/documents/novves-duman-tahliye-katalog.pdf",
        en: "/documents/novves-duman-tahliye-katalog-en.pdf",
      },
      category: ui.sidebar.tree.catalogs,
      code: "CAT-SH-01",
      title: "NOVVES Duman ve Isı Tahliye Kataloğu",
      status: "active",
      highlight: true,
      treeCategory: ui.sidebar.tree.catalogs,
      fileFormat: "PDF Katalog",
      revision: "V0R0",
      lastModified: "2026",
      downloadHref: "/documents/novves-duman-tahliye-katalog.pdf",
    },
    {
      id: "novves-company-profile",
      language: "tr",
      languages: ["tr", "en"],
      downloadByLanguage: {
        tr: "/documents/novves-sirket-profili.pdf",
        en: "/documents/novves-sirket-profili-en.pdf",
      },
      category: ui.sidebar.tree.catalogs,
      code: "CAT-CP-01",
      title: "NOVVES Şirket Profili Kataloğu",
      status: "active",
      highlight: true,
      treeCategory: ui.sidebar.tree.catalogs,
      fileFormat: "PDF Katalog",
      revision: "V0R0",
      lastModified: "2026",
      downloadHref: "/documents/novves-sirket-profili.pdf",
    },
    {
      id: "novves-references-catalog",
      language: "tr",
      languages: ["tr", "en"],
      downloadByLanguage: {
        tr: "/documents/novves-referans-katalogu.pdf",
        en: "/documents/novves-referans-katalogu.pdf",
      },
      category: ui.sidebar.tree.catalogs,
      code: "CAT-RP-01",
      title: "NOVVES Referans Kataloğu",
      status: "active",
      highlight: true,
      treeCategory: ui.sidebar.tree.catalogs,
      fileFormat: "PDF Katalog",
      revision: "V0R0",
      lastModified: "2026",
      downloadHref: "/documents/novves-referans-katalogu.pdf",
    },
    {
      id: "novves-certificates-catalog",
      language: "tr",
      languages: ["tr", "en"],
      downloadByLanguage: {
        tr: "/documents/novves-sertifikalar-katalogu.pdf",
        en: "/documents/novves-sertifikalar-katalogu.pdf",
      },
      category: ui.sidebar.tree.certifications,
      code: "CAT-CS-01",
      title: "NOVVES Sertifikalar Kataloğu",
      status: "approved",
      highlight: true,
      treeCategory: ui.sidebar.tree.certifications,
      fileFormat: "PDF Katalog",
      revision: "V0R0",
      lastModified: "2026",
      downloadHref: "/documents/novves-sertifikalar-katalogu.pdf",
    },
  ];

  const documents: DocumentLibraryItem[] = sharedDocuments.map((d) => ({
    ...d,
    fileFormat: d.fileFormat ?? "PDF / CAD",
    revision: d.revision ?? "v2.4.1",
    lastModified: d.lastModified ?? "14 Eki 2024 · J. Doe",
    previewImage: PREVIEW_BY_DOC_ID[d.id] ?? DEFAULT_PREVIEW,
    revisionLogs: [
      { label: ui.revisionLogs.minorAdjustments, when: ui.revisionLogs.minorWhen },
      { label: ui.revisionLogs.initialUpload, when: ui.revisionLogs.initialWhen },
    ],
  }));

  const tree = buildDocumentLibraryTree(ui);

  return {
    documents,
    tree,
    defaultPreviewImage: DEFAULT_PREVIEW,
  };
}
