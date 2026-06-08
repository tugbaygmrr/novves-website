export type DocumentLibraryStatus =
  | "active"
  | "passive"
  | "critical"
  | "current"
  | "approved"
  | "video";

export type DocumentLibraryTreeIcon =
  | "library"
  | "catalog"
  | "datasheet"
  | "brochure"
  | "manual"
  | "certificate"
  | "cad"
  | "training"
  | "troubleshooting"
  | "performance"
  | "efficiency";

export type DocumentLibraryItem = {
  id: string;
  /** Primary document language. */
  language: string;
  /** Available language versions (e.g. reference catalog TR + EN). */
  languages?: string[];
  /** Per-language download paths when `languages` has multiple entries. */
  downloadByLanguage?: Record<string, string>;
  category: string;
  code: string;
  title: string;
  status: DocumentLibraryStatus;
  highlight?: boolean;
  criticalTitle?: boolean;
  fileFormat?: string;
  downloadHref?: string;
  revision?: string;
  lastModified?: string;
  previewImage?: string;
  revisionLogs?: { label: string; when: string }[];
  /** Sidebar tree node id for category filtering */
  treeCategory?: string;
};

export type DocumentLibraryTreeNode = {
  id: string;
  label: string;
  icon?: DocumentLibraryTreeIcon;
  variant?: "default" | "troubleshooting";
  defaultExpanded?: boolean;
  filterCategory?: string;
  children?: DocumentLibraryTreeNode[];
};

export type DocumentLibraryUi = {
  brandTitle: string;
  brandSubtitle: string;
  nav: {
    dashboard: string;
    inventory: string;
    compliance: string;
    audit: string;
  };
  sidebar: {
    libraryName: string;
    libraryTag: string;
    uploadAsset: string;
    hierarchy: string;
    collapseSidebar: string;
    expandSidebar: string;
    tree: {
      documentLibrary: string;
      catalogs: string;
      dataSheets: string;
      brochures: string;
      usageManuals: string;
      certifications: string;
      cadBim: string;
      training: string;
      troubleshooting: string;
      testPerformance: string;
      energyEfficiency: string;
    };
  };
  searchPlaceholder: string;
  searchAllLanguages: string;
  table: {
    category: string;
    documentNo: string;
    documentName: string;
    language: string;
    status: string;
    statusActive: string;
    statusPassive: string;
    statusCritical: string;
    statusCurrent: string;
    statusApproved: string;
    statusVideo: string;
  };
  widgets: {
    emergencyTitle: string;
    emergencyText: string;
    emergencyCta: string;
    complianceLabel: string;
    complianceValue: string;
    efficiencyLabel: string;
    efficiencyValue: string;
  };
  inspector: {
    title: string;
    previewTag: string;
    docSummary: string;
    fileFormat: string;
    revision: string;
    lastModified: string;
    revisionLogs: string;
    shareDocument: string;
    shareLink: string;
    shareWhatsapp: string;
    shareEmail: string;
    secureDownload: string;
    secureDownloadNote: string;
    downloadDocument: string;
    close: string;
  };
  footer: {
    copyright: string;
    privacy: string;
    terms: string;
    security: string;
  };
  revisionLogs: {
    minorAdjustments: string;
    minorWhen: string;
    initialUpload: string;
    initialWhen: string;
  };
  emptyResults: string;
};

export type DocumentLibraryPageProps = {
  locale: string;
  ui: DocumentLibraryUi;
  documents: DocumentLibraryItem[];
  tree: DocumentLibraryTreeNode[];
  defaultPreviewImage: string;
};
