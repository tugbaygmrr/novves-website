import type { Locale } from "@/i18n/config";

export type ProductCatalogUi = {
  catalogTitle: string;
  categoriesTitle: string;
  searchPlaceholder: string;
  filterSeries: string;
  filterDescription: string;
  filterAllSeries: string;
  filterAllSeriesModels: string;
  filterModelRange: string;
  filterProductType: string;
  filterAny: string;
  filterMin: string;
  filterMax: string;
  searchPlaceholderShort: string;
  filterApply: string;
  filterReset: string;
  inStock: string;
  comingSoon: string;
  technicalDetails: string;
  perfectusBadge: string;
  perfectusCta: string;
  techLibrary: string;
  viewAll: string;
  catalogsTitle: string;
  guidesTitle: string;
  sidebarSupportTitle: string;
  sidebarSupportDesc: string;
  sidebarSupportCta: string;
  topBarContact: string;
  topBarSettings: string;
  openMenu: string;
  closeMenu: string;
  noResults: string;
  specFlow: string;
  specPressure: string;
  productNo: string;
  home: string;
  products: string;
};

const UI: Record<"tr" | "en", ProductCatalogUi> = {
  tr: {
    catalogTitle: "Ürün Kataloğu",
    categoriesTitle: "Ürün Kategorileri",
    searchPlaceholder: "Ürün veya model ara…",
    filterSeries: "Ürün Serisi",
    filterDescription: "Ürün Açıklaması",
    filterAllSeries: "Tüm seriler",
    filterAllSeriesModels: "Tüm seri modelleri",
    filterModelRange: "Ürün Serisi",
    filterProductType: "Ürün Serisi",
    filterAny: "Herhangi",
    filterMin: "Min",
    filterMax: "Max",
    searchPlaceholderShort: "Arama yapın…",
    filterApply: "Filtrele",
    filterReset: "Sıfırla",
    inStock: "Stokta",
    comingSoon: "Yakında",
    technicalDetails: "Teknik detayları incele",
    perfectusBadge: "Online tool",
    perfectusCta: "PerfectusAir seçim aracı",
    techLibrary: "Teknik kütüphane",
    viewAll: "Tümünü görüntüle",
    catalogsTitle: "Ürün katalogları",
    guidesTitle: "Kılavuzlar & sertifikalar",
    sidebarSupportTitle: "Teknik destek",
    sidebarSupportDesc: "Seçim, montaj ve proje danışmanlığı için mühendislik ekibimizle iletişime geçin.",
    sidebarSupportCta: "Destek talebi",
    topBarContact: "İletişim",
    topBarSettings: "Teknik merkez",
    openMenu: "Kategorileri aç",
    closeMenu: "Kapat",
    noResults: "Filtrelere uygun ürün bulunamadı.",
    specFlow: "Max debi",
    specPressure: "Basınç",
    productNo: "Ürün No.",
    home: "Ana sayfa",
    products: "Ürünler",
  },
  en: {
    catalogTitle: "Product Catalog",
    categoriesTitle: "Product Categories",
    searchPlaceholder: "Search products or models…",
    filterSeries: "Product series",
    filterDescription: "Description",
    filterAllSeries: "All series",
    filterAllSeriesModels: "All series models",
    filterModelRange: "Product series",
    filterProductType: "Product series",
    filterAny: "Any",
    filterMin: "Min",
    filterMax: "Max",
    searchPlaceholderShort: "Search…",
    filterApply: "Filter",
    filterReset: "Reset",
    inStock: "In stock",
    comingSoon: "Coming soon",
    technicalDetails: "View technical details",
    perfectusBadge: "Online tool",
    perfectusCta: "PerfectusAir selection tool",
    techLibrary: "Technical library",
    viewAll: "View all",
    catalogsTitle: "Product catalogs",
    guidesTitle: "Manuals & certificates",
    sidebarSupportTitle: "Technical support",
    sidebarSupportDesc: "Contact our engineering team for selection, installation and project consulting.",
    sidebarSupportCta: "Request support",
    topBarContact: "Contact",
    topBarSettings: "Technical center",
    openMenu: "Open categories",
    closeMenu: "Close",
    noResults: "No products match your filters.",
    specFlow: "Max flow",
    specPressure: "Pressure",
    productNo: "Product No.",
    home: "Home",
    products: "Products",
  },
};

export function getProductCatalogUi(locale: Locale): ProductCatalogUi {
  return locale === "tr" ? UI.tr : UI.en;
}
