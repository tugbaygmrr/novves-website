/** Shared CMS section registry for admin API + dashboard. */

import { PRODUCT_SECTION_LABELS } from "./field-labels";

export type AdminSection = { key: string; label: string };

/** Bölüm listesinde tam genişlik ayraç (kart değil) olarak render edilen özel anahtar. */
export const SECTION_DIVIDER_KEY = "__divider__";

export type AdminPageGroup = {
  file: string;
  label: string;
  icon: string;
  sections: AdminSection[];
};

/** All JSON keys per dictionary file (API + advanced mode). */
export const FILE_SECTIONS: Record<string, readonly string[]> = {
  common: ["navbar", "footer", "shared", "solutionDetail"],
  contact: ["main", "partnerlerimiz", "sosyalMedya", "iletisimHub", "sosyalMedyaHub"],
  corporate: [
    "bizKimiz",
    "ceoMesaji",
    "ekibimiz",
    "referanslar",
    "sertifikalar",
    "politikamiz",
    "basinOdasi",
    "haberler",
  ],
  home: [
    "hero",
    "animation2",
    "solutionCarouselByHref",
    "productCategories",
    "productCategoryBlurbs",
    "productCategoryFeatures",
    "catalogPreview",
    "referencePreview",
    "certificatePreview",
    "engineeringPillarsSection",
    "pillars",
    "engineeringShowcase",
    "faq",
    "finalCta",
    "companyProfileSection",
    "pageChrome",
    "midCta",
    "homeBands",
    "companyProfileCards",
    "video",
  ],
  kvkk: [
    "breadcrumbHome",
    "breadcrumbKvkk",
    "badge",
    "title",
    "titleHighlight",
    "desc",
    "sectionLabel",
    "sectionTitle",
    "viewDetails",
    "links",
  ],
  products: [
    "shared",
    "havaHareketi",
    "iklimlendirme",
    "sogutmaVeIsitma",
    "havaYonetimi",
    "havaDagitimi",
    "havaFiltrasyonu",
    "aksesuarlar",
    "otomasyonMalzemeleri",
    "titresimVeSesIzolasyon",
    "banyoFanlari",
    "catiFanlari",
    "damperler",
    "dumanIsiTahliyeFanlari",
    "duvarTipiFanlar",
    "ecFanlar",
    "endustriyelFanlar",
    "exproofFanlar",
    "havuzNemAlmaSantrali",
    "hucreliFanlar",
    "isiGeriKazanimCihazlari",
    "kanalFanlari",
    "klimaSantralleri",
    "kovanTipiAksiyalFanlar",
    "mutfakFanlari",
    "siginakFanlari",
    "tavukcuFanlari",
    "tozToplamaUniteleri",
    "menfezPanjurlar",
    "filtreler",
    "titresimIzolatorleri",
    "otomasyonPanolari",
    "plcOtomasyon",
    "sensorler",
    "kontrolKartlari",
    "zamanlamaKontrol",
    "gucElektronigi",
    "disUniteler",
    "elektrikliIsitici",
    "suluIsitici",
    "orcaHx",
    "remoraAksesuarlari",
  ],
  services: [
    "genelBakis",
    "cfdAnalizi",
    "devreAlma",
    "dumanKontrol",
    "teknikServis",
    "yerindeKesif",
    "fanSecimi",
    "bakimPerformans",
    "egitimDanismanlik",
  ],
  solutions: [
    "dumanIsiTahliye",
    "konforIklimlendirme",
    "hijyenikFiltrasyon",
    "endustriyelHavaYonetimi",
    "hayvancilikTesisleri",
    "trafoEnerjiOdalari",
    "seraTarimsal",
    "atexPatlamaKoruma",
    "akilliOtomasyon",
    "konutHavalandirma",
    "marinOffshore",
    "projeBazliOzelImalat",
    "cfdDanismanlik",
  ],
  sustainability: ["main", "co2", "geriDonusum"],
  technical: ["blog", "dokumanKutuphanesi", "fanSecici", "patentlerimiz"],
} as const;

export const VALID_DICT_FILES = Object.keys(FILE_SECTIONS);

/** Leaf ürün bölümü → ürün adı (panelde kart başlığı; sayfa = bu ürünün detayı). */
export const PRODUCT_LEAF_PAGE_LABELS: Record<string, string> = {
  dumanIsiTahliyeFanlari: "DRAGONFLY",
  kovanTipiAksiyalFanlar: "MARLIN",
  exproofFanlar: "BEAR",
  endustriyelFanlar: "NAUTILUS",
  ecFanlar: "HUMMINGBIRD",
  catiFanlari: "HERON",
  duvarTipiFanlar: "OWL",
  banyoFanlari: "SEAHORSE",
  kanalFanlari: "KOI",
  hucreliFanlar: "TURTLE",
  mutfakFanlari: "BUTTERFLY",
  siginakFanlari: "FOX",
  tavukcuFanlari: "CHICKEN",
  tozToplamaUniteleri: "ELEPHANT",
  klimaSantralleri: "TIGER",
  havuzNemAlmaSantrali: "DOLPHIN",
  isiGeriKazanimCihazlari: "CARACAL",
  damperler: "HOUND",
  menfezPanjurlar: "ALPACA",
  filtreler: "SCALLOP",
  titresimIzolatorleri: "ROO",
  otomasyonPanolari: "HAWK",
  plcOtomasyon: "PLC",
  sensorler: "SENSÖR",
  kontrolKartlari: "KONTROL KARTLARI",
  zamanlamaKontrol: "ZAMANLAMA",
  gucElektronigi: "LION",
  disUniteler: "POLAR BEAR",
  elektrikliIsitici: "ORCA HEATER",
  suluIsitici: "ORCA COIL",
  orcaHx: "ORCA HX",
  remoraAksesuarlari: "REMORA",
};

/** Ürünler sekmesinde gösterilen kategori bölümleri (leaf ürünler ve "shared" hariç). */
export const PRODUCT_PANEL_CATEGORY_KEYS = [
  "havaHareketi",
  "iklimlendirme",
  "sogutmaVeIsitma",
  "havaYonetimi",
  "havaDagitimi",
  "havaFiltrasyonu",
  "aksesuarlar",
  "otomasyonMalzemeleri",
  "titresimVeSesIzolasyon",
] as const;

/** Ana sayfa — kolay modda gösterilen bölümler (sayfa akışı sırası). */
export const HOME_SIMPLE_SECTIONS: AdminSection[] = [
  { key: "hero", label: "Üst Video ve Başlık" },
  { key: "animation2", label: "Video Sonu Ürün Kartı" },
  { key: "solutionCarouselByHref", label: "Çözüm Kartları Şeridi" },
  { key: "productCategories", label: "Ürün Kategorileri Şeridi" },
  { key: "catalogPreview", label: "Katalog Önizleme Kartları" },
  { key: "referencePreview", label: "Referans Proje Kartları" },
  { key: "certificatePreview", label: "Sertifika Kartları" },
  { key: "engineeringPillarsSection", label: "Mühendislikten Sahaya" },
  { key: "engineeringShowcase", label: "CFD Tanıtım Paneli" },
  { key: "faq", label: "Sık Sorulan Sorular" },
  { key: "finalCta", label: "Alt Teklif Çağrısı" },
  { key: "companyProfileSection", label: "Şirket Profili & Zaman Çizelgesi" },
];

/** Eski şablon — yalnızca gelişmiş modda. */
export const HOME_LEGACY_SECTIONS: AdminSection[] = [
  { key: "midCta", label: "Orta CTA (eski)" },
  { key: "homeBands", label: "Ana Sayfa Bantları (eski)" },
  { key: "companyProfileCards", label: "Profil Kartları (eski)" },
  { key: "video", label: "Kurumsal Video (eski)" },
];

const HOME_ICON =
  "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25";

export function buildHomePageGroup(mode: "simple" | "advanced"): AdminPageGroup {
  const sections =
    mode === "advanced"
      ? [...HOME_SIMPLE_SECTIONS, ...HOME_LEGACY_SECTIONS]
      : HOME_SIMPLE_SECTIONS;
  return { file: "home", label: "Ana Sayfa", icon: HOME_ICON, sections };
}

export const ADMIN_PAGE_GROUPS: AdminPageGroup[] = [
  buildHomePageGroup("simple"),
  {
    file: "common",
    label: "Genel",
    icon: "M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75",
    sections: [
      { key: "footer", label: "Footer" },
    ],
  },
  {
    file: "products",
    label: "Ürünler",
    icon: "M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9",
    // Üstte ürün kategorileri, bir ayraç, altında ürün (leaf) sayfaları.
    // "shared" (UI metinleri) gösterilmez.
    sections: [
      ...PRODUCT_PANEL_CATEGORY_KEYS.map((key) => ({
        key,
        label: PRODUCT_SECTION_LABELS[key] ?? key,
      })),
      { key: SECTION_DIVIDER_KEY, label: "Ürün Sayfaları" },
      ...FILE_SECTIONS.products
        .filter(
          (key) =>
            key !== "shared" &&
            !(PRODUCT_PANEL_CATEGORY_KEYS as readonly string[]).includes(key),
        )
        .map((key) => ({
          key,
          label: PRODUCT_LEAF_PAGE_LABELS[key] ?? PRODUCT_SECTION_LABELS[key] ?? key,
        })),
    ],
  },
  {
    file: "solutions",
    label: "Çözümler",
    icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
    sections: [
      { key: "dumanIsiTahliye", label: "Duman ve Isı Tahliye" },
      { key: "konforIklimlendirme", label: "Konfor İklimlendirme" },
      { key: "hijyenikFiltrasyon", label: "Hijyenik Filtrasyon" },
      { key: "endustriyelHavaYonetimi", label: "Endüstriyel Hava" },
      { key: "hayvancilikTesisleri", label: "Hayvancılık Tesisleri" },
      { key: "trafoEnerjiOdalari", label: "Trafo/Enerji Odaları" },
      { key: "seraTarimsal", label: "Sera ve Tarımsal" },
      { key: "atexPatlamaKoruma", label: "ATEX Patlama Koruma" },
      { key: "akilliOtomasyon", label: "Akıllı Otomasyon" },
      { key: "konutHavalandirma", label: "Konut Havalandırma" },
      { key: "marinOffshore", label: "Marin ve Offshore" },
      { key: "projeBazliOzelImalat", label: "Proje Bazlı İmalat" },
      { key: "cfdDanismanlik", label: "CFD Danışmanlık" },
    ],
  },
  {
    file: "services",
    label: "Hizmetler",
    icon: "M11.42 15.17l-3.95-4.66a.75.75 0 010-.98l3.95-4.66a.75.75 0 011.16.98L9.27 9.75h10.98a.75.75 0 010 1.5H9.27l3.31 3.9a.75.75 0 01-1.16.98zM7.5 3.75a.75.75 0 00-1.5 0v16.5a.75.75 0 001.5 0V3.75z",
    sections: [
      { key: "genelBakis", label: "Genel Bakış" },
      { key: "cfdAnalizi", label: "CFD Analizi" },
      { key: "devreAlma", label: "Devreye Alma" },
      { key: "dumanKontrol", label: "Duman Kontrol" },
      { key: "teknikServis", label: "Teknik Servis" },
      { key: "yerindeKesif", label: "Yerinde Keşif" },
      { key: "fanSecimi", label: "Fan Seçimi" },
      { key: "bakimPerformans", label: "Bakım ve Performans" },
      { key: "egitimDanismanlik", label: "Eğitim ve Danışmanlık" },
    ],
  },
  {
    file: "corporate",
    label: "Kurumsal",
    icon: "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21",
    sections: [
      { key: "bizKimiz", label: "Biz Kimiz" },
      { key: "ceoMesaji", label: "CEO Mesajı" },
      { key: "ekibimiz", label: "Ekibimiz" },
      { key: "referanslar", label: "Referanslar (metin)" },
      { key: "sertifikalar", label: "Sertifikalar" },
      { key: "politikamiz", label: "Politikamız" },
      { key: "basinOdasi", label: "Basın Odası" },
      { key: "haberler", label: "Haberler" },
    ],
  },
  {
    file: "contact",
    label: "İletişim",
    icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75",
    sections: [
      { key: "main", label: "İletişim Sayfası" },
      { key: "iletisimHub", label: "İletişim Hub" },
      { key: "partnerlerimiz", label: "Partnerlerimiz (metin)" },
      { key: "sosyalMedya", label: "Sosyal Medya" },
      { key: "sosyalMedyaHub", label: "Sosyal Medya Hub" },
    ],
  },
  {
    file: "sustainability",
    label: "Sürdürülebilirlik",
    icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418",
    sections: [
      { key: "main", label: "Ana Sayfa" },
      { key: "co2", label: "CO2" },
      { key: "geriDonusum", label: "Geri Dönüşüm" },
    ],
  },
  {
    file: "technical",
    label: "Teknik Merkez",
    icon: "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5",
    sections: [
      { key: "blog", label: "Blog" },
      { key: "dokumanKutuphanesi", label: "Doküman Kütüphanesi" },
      { key: "fanSecici", label: "Fan Seçici" },
      { key: "patentlerimiz", label: "Patentlerimiz" },
    ],
  },
  {
    file: "kvkk",
    label: "KVKK",
    icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
    sections: [
      { key: "breadcrumbHome", label: "Breadcrumb Home" },
      { key: "breadcrumbKvkk", label: "Breadcrumb KVKK" },
      { key: "badge", label: "Badge" },
      { key: "title", label: "Başlık" },
      { key: "titleHighlight", label: "Başlık Vurgu" },
      { key: "desc", label: "Açıklama" },
      { key: "sectionLabel", label: "Bölüm Etiketi" },
      { key: "sectionTitle", label: "Bölüm Başlığı" },
      { key: "viewDetails", label: "Detay Butonu" },
      { key: "links", label: "Linkler" },
    ],
  },
];

/** Panel groups for the simple editor (single mode). */
export function getAdminPageGroups(): AdminPageGroup[] {
  return ADMIN_PAGE_GROUPS;
}

/** Partner structural records (locale-independent JSON). */
export const PARTNER_RECORDS_SECTION = "records";
