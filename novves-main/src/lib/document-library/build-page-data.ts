import type {
  DocumentLibraryItem,
  DocumentLibraryTreeNode,
  DocumentLibraryUi,
} from "@/lib/document-library/types";

type RawDoc = {
  id: string;
  category: string;
  code: string;
  title: string;
  status: DocumentLibraryItem["status"];
  highlight?: boolean;
  criticalTitle?: boolean;
  treeCategory?: string;
  fileFormat?: string;
  revision?: string;
  lastModified?: string;
};

type LibraryDict = DocumentLibraryUi & {
  documents: RawDoc[];
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

export function buildDocumentLibraryPageData(ui: DocumentLibraryUi, dict: LibraryDict) {
  const documents: DocumentLibraryItem[] = dict.documents.map((d) => ({
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
