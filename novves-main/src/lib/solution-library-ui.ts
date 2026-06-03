import type { Locale } from "@/i18n/config";

export type SolutionLibraryUi = {
  categoriesTitle: string;
  sidebarSupportTitle: string;
  sidebarSupportDesc: string;
  sidebarSupportCta: string;
  libraryTitle: string;
  libraryVersion: string;
  searchPlaceholder: string;
  searchClear: string;
  searchNoResults: string;
  searchGroupSolutions: string;
  searchGroupComponents: string;
  searchGroupDocuments: string;
  searchResultsHint: string;
  searchMore: string;
  searchMinChars: string;
  filter: string;
  filterTitle: string;
  filterContent: string;
  filterContentAll: string;
  filterContentProducts: string;
  filterContentDocuments: string;
  filterComponents: string;
  filterDocTypes: string;
  filterReset: string;
  filterActive: string;
  filterNoResults: string;
  filterDocPdf: string;
  filterDocDoc: string;
  filterDocBim: string;
  filterDocCert: string;
  topBarContact: string;
  topBarSettings: string;
  footerBrand: string;
  footerPrivacy: string;
  footerStandards: string;
  footerContact: string;
  solutions: string;
  expertQuote: string;
  emptyProducts: string;
  emptyDocs: string;
  docsComingSoon: string;
  coreComponents: string;
  viewCatalog: string;
  moreDetail: string;
  addToQuote: string;
  added: string;
  documentation: string;
  selections: string;
  projectInquiry: string;
  clear: string;
  quote: string;
  openMenu: string;
  closeMenu: string;
  sidebarHelp: string;
  sidebarTechnicalCenter: string;
  sidebarFireDetection: string;
  sidebarGasDetection: string;
  sidebarArchive: string;
  docCatalog: string;
  docGuidelines: string;
  docBim: string;
  docCert: string;
};

const UI: Record<"tr" | "en", SolutionLibraryUi> = {
  tr: {
    categoriesTitle: "Çözüm Kategorileri",
    sidebarSupportTitle: "Teknik destek",
    sidebarSupportDesc: "Seçim, montaj ve proje danışmanlığı için mühendislik ekibimizle iletişime geçin.",
    sidebarSupportCta: "Destek talebi",
    libraryTitle: "Teknik Kütüphane",
    libraryVersion: "V2.4 KURUMSAL",
    searchPlaceholder: "Çözüm, ürün veya doküman ara…",
    searchClear: "Aramayı temizle",
    searchNoResults: "“{query}” için sonuç bulunamadı.",
    searchGroupSolutions: "Çözümler",
    searchGroupComponents: "Bileşenler",
    searchGroupDocuments: "Dokümanlar",
    searchResultsHint: "{count} sonuç",
    searchMore: "+{count} sonuç daha — sol menüde",
    searchMinChars: "En az 2 karakter yazın",
    filter: "Filtre",
    filterTitle: "Filtrele",
    filterContent: "İçerik",
    filterContentAll: "Tümü",
    filterContentProducts: "Bileşenler",
    filterContentDocuments: "Dokümanlar",
    filterComponents: "Bileşen grupları",
    filterDocTypes: "Doküman tipi",
    filterReset: "Sıfırla",
    filterActive: "{count} filtre aktif",
    filterNoResults: "Seçili filtrelere uygun sonuç yok.",
    filterDocPdf: "PDF / Katalog",
    filterDocDoc: "Kılavuz",
    filterDocBim: "BIM",
    filterDocCert: "Sertifika",
    topBarContact: "İletişim",
    topBarSettings: "Teknik merkez",
    footerBrand: "Novves Çözümler",
    footerPrivacy: "Gizlilik",
    footerStandards: "Standartlar",
    footerContact: "İletişim",
    solutions: "Çözümler",
    expertQuote: "Teklif Alın",
    emptyProducts: "Bu çözüm için bileşen listesi henüz eklenmedi.",
    emptyDocs: "Yüklenebilir doküman bulunmuyor.",
    docsComingSoon: "Teknik dokümanlar yakında teknik merkezde yayınlanacak.",
    coreComponents: "Temel Bileşenler",
    viewCatalog: "Tüm Kataloğu Gör",
    moreDetail: "Detay",
    addToQuote: "Teklife Ekle",
    added: "Eklendi",
    documentation: "Dokümantasyon",
    selections: "Seçim",
    projectInquiry: "Proje Talebi",
    clear: "Temizle",
    quote: "Teklif",
    openMenu: "Menüyü aç",
    closeMenu: "Menüyü kapat",
    sidebarHelp: "Yardım Merkezi",
    sidebarTechnicalCenter: "Teknik Merkez",
    sidebarFireDetection: "Yangın Algılama",
    sidebarGasDetection: "Gaz Algılama",
    sidebarArchive: "Arşiv Kayıtları",
    docCatalog: "Teknik Katalog 2024",
    docGuidelines: "Tasarım Kılavuzu",
    docBim: "BIM / Revit Ailesi",
    docCert: "Sertifikalar ve Uygunluk",
  },
  en: {
    categoriesTitle: "Solution Categories",
    sidebarSupportTitle: "Technical support",
    sidebarSupportDesc: "Contact our engineering team for selection, installation and project consulting.",
    sidebarSupportCta: "Request support",
    libraryTitle: "Technical Library",
    libraryVersion: "V2.4 ENTERPRISE",
    searchPlaceholder: "Search solutions, products, or documents…",
    searchClear: "Clear search",
    searchNoResults: "No results for “{query}”.",
    searchGroupSolutions: "Solutions",
    searchGroupComponents: "Components",
    searchGroupDocuments: "Documents",
    searchResultsHint: "{count} results",
    searchMore: "+{count} more — see sidebar",
    searchMinChars: "Type at least 2 characters",
    filter: "Filter",
    filterTitle: "Filter",
    filterContent: "Content",
    filterContentAll: "All",
    filterContentProducts: "Components",
    filterContentDocuments: "Documents",
    filterComponents: "Component groups",
    filterDocTypes: "Document type",
    filterReset: "Reset",
    filterActive: "{count} filters active",
    filterNoResults: "No results match the selected filters.",
    filterDocPdf: "PDF / Catalog",
    filterDocDoc: "Guidelines",
    filterDocBim: "BIM",
    filterDocCert: "Certificates",
    topBarContact: "Contact",
    topBarSettings: "Technical center",
    footerBrand: "Novves Solutions",
    footerPrivacy: "Privacy",
    footerStandards: "Standards",
    footerContact: "Contact",
    solutions: "Solutions",
    expertQuote: "Get a Quote",
    emptyProducts: "Component list for this solution is not available yet.",
    emptyDocs: "No downloadable documents available.",
    docsComingSoon: "Technical documents will be published in the technical center soon.",
    coreComponents: "Core Components",
    viewCatalog: "View Entire Catalog",
    moreDetail: "More Detail",
    addToQuote: "Add to Quote",
    added: "Added",
    documentation: "Documentation",
    selections: "Selection(s)",
    projectInquiry: "Project Inquiry",
    clear: "Clear",
    quote: "Quote",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    sidebarHelp: "Help Center",
    sidebarTechnicalCenter: "Technical Center",
    sidebarFireDetection: "Fire Detection",
    sidebarGasDetection: "Gas Detection",
    sidebarArchive: "Archive Records",
    docCatalog: "Technical Catalog 2024",
    docGuidelines: "Design Guidelines",
    docBim: "BIM / Revit Family",
    docCert: "Certificates & Compliance",
  },
};

export function solutionLibraryUi(locale: string): SolutionLibraryUi {
  if (locale === "tr") return UI.tr;
  return UI.en;
}
