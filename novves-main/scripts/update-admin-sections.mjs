#!/usr/bin/env node
/**
 * Align admin panel sections with current site structure (UTF-8 safe).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function w(rel, content) {
  const file = path.join(ROOT, rel);
  fs.writeFileSync(file, content, "utf8");
  new TextDecoder("utf-8", { fatal: true }).decode(fs.readFileSync(file));
  console.log("OK", rel);
}

// --- content-sections.ts ---
w(
  "src/lib/admin/content-sections.ts",
  `/** Shared CMS section registry for admin API + dashboard. */

import { PRODUCT_SECTION_LABELS } from "./field-labels";

export type AdminSection = { key: string; label: string };

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

/** Ana sayfa \u2014 kolay modda g\u00f6sterilen b\u00f6l\u00fcmler (sayfa ak\u0131\u015f\u0131 s\u0131ras\u0131). */
export const HOME_SIMPLE_SECTIONS: AdminSection[] = [
  { key: "hero", label: "\u00dcst Video ve Ba\u015fl\u0131k" },
  { key: "animation2", label: "Video Sonu \u00dcr\u00fcn Kart\u0131" },
  { key: "solutionCarouselByHref", label: "\u00c7\u00f6z\u00fcm Kartlar\u0131 \u015eeridi" },
  { key: "productCategories", label: "\u00dcr\u00fcn Kategorileri \u015eeridi" },
  { key: "productCategoryBlurbs", label: "\u00dcr\u00fcn Kart A\u00e7\u0131klamalar\u0131" },
  { key: "productCategoryFeatures", label: "\u00dcr\u00fcn Kart \u00d6zellikleri" },
  { key: "catalogPreview", label: "Katalog \u00d6nizleme Kartlar\u0131" },
  { key: "referencePreview", label: "Referans Proje Kartlar\u0131" },
  { key: "certificatePreview", label: "Sertifika Kartlar\u0131" },
  { key: "engineeringPillarsSection", label: "M\u00fchendislik S\u00fcreci Ba\u015fl\u0131\u011f\u0131" },
  { key: "pillars", label: "3 M\u00fchendislik Ad\u0131m\u0131" },
  { key: "engineeringShowcase", label: "CFD Tan\u0131t\u0131m Paneli" },
  { key: "faq", label: "S\u0131k Sorulan Sorular" },
  { key: "finalCta", label: "Alt Teklif \u00c7a\u011fr\u0131s\u0131" },
  { key: "companyProfileSection", label: "\u015eirket Profili & Zaman \u00c7izelgesi" },
  { key: "pageChrome", label: "Buton ve Ortak Etiketler" },
];

/** Eski \u015fablon \u2014 yaln\u0131zca geli\u015fmi\u015f modda. */
export const HOME_LEGACY_SECTIONS: AdminSection[] = [
  { key: "midCta", label: "Orta CTA (eski)" },
  { key: "homeBands", label: "Ana Sayfa Bantlar\u0131 (eski)" },
  { key: "companyProfileCards", label: "Profil Kartlar\u0131 (eski)" },
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
    label: "Genel (Navbar/Footer)",
    icon: "M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75",
    sections: [
      { key: "navbar", label: "Navbar" },
      { key: "footer", label: "Footer" },
      { key: "shared", label: "Ortak Metinler" },
      { key: "solutionDetail", label: "\u00c7\u00f6z\u00fcm Detay Ortak" },
    ],
  },
  {
    file: "products",
    label: "\u00dcr\u00fcnler",
    icon: "M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9",
    sections: FILE_SECTIONS.products.map((key) => ({
      key,
      label: PRODUCT_SECTION_LABELS[key] ?? key,
    })),
  },
  {
    file: "solutions",
    label: "\u00c7\u00f6z\u00fcmler",
    icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
    sections: [
      { key: "dumanIsiTahliye", label: "Duman ve Is\u0131 Tahliye" },
      { key: "konforIklimlendirme", label: "Konfor \u0130klimlendirme" },
      { key: "hijyenikFiltrasyon", label: "Hijyenik Filtrasyon" },
      { key: "endustriyelHavaYonetimi", label: "End\u00fcstriyel Hava" },
      { key: "hayvancilikTesisleri", label: "Hayvanc\u0131l\u0131k Tesisleri" },
      { key: "trafoEnerjiOdalari", label: "Trafo/Enerji Odalar\u0131" },
      { key: "seraTarimsal", label: "Sera ve Tar\u0131msal" },
      { key: "atexPatlamaKoruma", label: "ATEX Patlama Koruma" },
      { key: "akilliOtomasyon", label: "Ak\u0131ll\u0131 Otomasyon" },
      { key: "konutHavalandirma", label: "Konut Havaland\u0131rma" },
      { key: "marinOffshore", label: "Marin ve Offshore" },
      { key: "projeBazliOzelImalat", label: "Proje Bazl\u0131 \u0130malat" },
      { key: "cfdDanismanlik", label: "CFD Dan\u0131\u015fmanl\u0131k" },
    ],
  },
  {
    file: "services",
    label: "Hizmetler",
    icon: "M11.42 15.17l-3.95-4.66a.75.75 0 010-.98l3.95-4.66a.75.75 0 011.16.98L9.27 9.75h10.98a.75.75 0 010 1.5H9.27l3.31 3.9a.75.75 0 01-1.16.98zM7.5 3.75a.75.75 0 00-1.5 0v16.5a.75.75 0 001.5 0V3.75z",
    sections: [
      { key: "genelBakis", label: "Genel Bak\u0131\u015f" },
      { key: "cfdAnalizi", label: "CFD Analizi" },
      { key: "devreAlma", label: "Devreye Alma" },
      { key: "dumanKontrol", label: "Duman Kontrol" },
      { key: "teknikServis", label: "Teknik Servis" },
      { key: "yerindeKesif", label: "Yerinde Ke\u015fif" },
      { key: "fanSecimi", label: "Fan Se\u00e7imi" },
      { key: "bakimPerformans", label: "Bak\u0131m ve Performans" },
      { key: "egitimDanismanlik", label: "E\u011fitim ve Dan\u0131\u015fmanl\u0131k" },
    ],
  },
  {
    file: "corporate",
    label: "Kurumsal",
    icon: "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21",
    sections: [
      { key: "bizKimiz", label: "Biz Kimiz" },
      { key: "ceoMesaji", label: "CEO Mesaj\u0131" },
      { key: "ekibimiz", label: "Ekibimiz" },
      { key: "referanslar", label: "Referanslar (metin)" },
      { key: "sertifikalar", label: "Sertifikalar" },
      { key: "politikamiz", label: "Politikam\u0131z" },
      { key: "basinOdasi", label: "Bas\u0131n Odas\u0131" },
      { key: "haberler", label: "Haberler" },
    ],
  },
  {
    file: "contact",
    label: "\u0130leti\u015fim",
    icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75",
    sections: [
      { key: "main", label: "\u0130leti\u015fim Sayfas\u0131" },
      { key: "iletisimHub", label: "\u0130leti\u015fim Hub" },
      { key: "partnerlerimiz", label: "Partnerlerimiz (metin)" },
      { key: "sosyalMedya", label: "Sosyal Medya" },
      { key: "sosyalMedyaHub", label: "Sosyal Medya Hub" },
    ],
  },
  {
    file: "sustainability",
    label: "S\u00fcrd\u00fcr\u00fclebilirlik",
    icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418",
    sections: [
      { key: "main", label: "Ana Sayfa" },
      { key: "co2", label: "CO2" },
      { key: "geriDonusum", label: "Geri D\u00f6n\u00fc\u015f\u00fcm" },
    ],
  },
  {
    file: "technical",
    label: "Teknik Merkez",
    icon: "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5",
    sections: [
      { key: "blog", label: "Blog" },
      { key: "dokumanKutuphanesi", label: "Dok\u00fcman K\u00fct\u00fcphanesi" },
      { key: "fanSecici", label: "Fan Se\u00e7ici" },
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
      { key: "title", label: "Ba\u015fl\u0131k" },
      { key: "titleHighlight", label: "Ba\u015fl\u0131k Vurgu" },
      { key: "desc", label: "A\u00e7\u0131klama" },
      { key: "sectionLabel", label: "B\u00f6l\u00fcm Etiketi" },
      { key: "sectionTitle", label: "B\u00f6l\u00fcm Ba\u015fl\u0131\u011f\u0131" },
      { key: "viewDetails", label: "Detay Butonu" },
      { key: "links", label: "Linkler" },
    ],
  },
];

/** Panel groups filtered by mode (home includes legacy sections in advanced). */
export function getAdminPageGroups(mode: "simple" | "advanced"): AdminPageGroup[] {
  return ADMIN_PAGE_GROUPS.map((g) =>
    g.file === "home" ? buildHomePageGroup(mode) : g
  );
}

/** Partner structural records (locale-independent JSON). */
export const PARTNER_RECORDS_SECTION = "records";
`,
);

// --- field-labels.ts ---
w(
  "src/lib/admin/field-labels.ts",
  `/** Turkish labels for JSON keys when no handcrafted schema exists. */

const GLOBAL_LABELS: Record<string, string> = {
  title: "Ba\u015fl\u0131k",
  desc: "A\u00e7\u0131klama",
  description: "A\u00e7\u0131klama",
  subtitle: "Alt ba\u015fl\u0131k",
  tag: "Etiket",
  headline: "Ana ba\u015fl\u0131k",
  badge: "Rozet",
  cta: "Buton yaz\u0131s\u0131",
  label: "Etiket",
  value: "De\u011fer",
  name: "Ad",
  image: "G\u00f6rsel",
  intro: "Giri\u015f metni",
  eyebrow: "\u00dcst sat\u0131r",
  q: "Soru",
  a: "Cevap",
  email: "E-posta",
  phone: "Telefon",
  country: "\u00dclke",
  series: "Seri",
  scroll: "Kayd\u0131rma",
  href: "Link adresi",
  linkHref: "Link adresi",
  linkLabel: "Link yaz\u0131s\u0131",
  linkAriaLabel: "Eri\u015filebilirlik metni",
  ariaLabel: "Eri\u015filebilirlik metni",
  heroTitle: "Ba\u015fl\u0131k",
  heroDesc: "A\u00e7\u0131klama",
  formTitle: "Form ba\u015fl\u0131\u011f\u0131",
  formDesc: "Form a\u00e7\u0131klamas\u0131",
  send: "G\u00f6nder butonu",
  copyright: "Telif hakk\u0131",
  breadcrumbHome: "Ana sayfa (breadcrumb)",
  breadcrumbContact: "\u0130leti\u015fim (breadcrumb)",
  viewAll: "T\u00fcm\u00fcn\u00fc g\u00f6r",
  featured: "\u00d6ne \u00e7\u0131kan",
  openMenu: "Men\u00fc a\u00e7",
  requestQuote: "Teklif butonu",
  callBack: "Geri arama butonu",
  logoSrc: "Logo g\u00f6rseli",
  websiteUrl: "Web sitesi",
  websiteLabel: "Web sitesi yaz\u0131s\u0131",
  sector: "Sekt\u00f6r",
  example: "\u00d6rnek proje",
  projectCount: "Proje say\u0131s\u0131",
  theme: "Renk temas\u0131",
  lead: "Giri\u015f paragraf\u0131",
  mainCta: "Ana buton",
  cardCta: "Kart butonu",
  sidebarCardTitle: "Yan kart ba\u015fl\u0131\u011f\u0131",
  sidebarCardDesc: "Yan kart a\u00e7\u0131klamas\u0131",
  catalogsVertical: "Kataloglar ba\u015fl\u0131\u011f\u0131",
  pillarCta: "S\u00fctun butonu",
  catalogCardCta: "Katalog butonu",
  productCardCta: "ùrùn butonu",
  companyProfileVertical: "\u015eirket profili etiketi",
  icon: "\u0130kon",
  iconImage: "\u00d6zel ikon g\u00f6rseli",
};

/** Keys hidden in simple-mode fallback unless "show all" is on */
export const ADVANCED_KEY_PATTERNS = [
  /href$/i,
  /arialabel/i,
  /classname/i,
  /^id$/,
  /iframe/i,
  /scroll$/i,
  /^theme$/,
];

export function getFieldLabel(key: string, parentPath = ""): string {
  if (GLOBAL_LABELS[key]) return GLOBAL_LABELS[key];
  return humanizeKey(key);
}

export function humanizeKey(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/([0-9]+)/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

export function shouldHideInSimpleMode(key: string): boolean {
  return ADVANCED_KEY_PATTERNS.some((p) => p.test(key));
}

/** Product section key to Turkish label */
export const PRODUCT_SECTION_LABELS: Record<string, string> = {
  shared: "Ortak Metinler",
  havaHareketi: "Hava Hareketi",
  iklimlendirme: "\u0130klimlendirme",
  sogutmaVeIsitma: "So\u011futma ve Is\u0131tma",
  havaYonetimi: "Hava Y\u00f6netimi",
  havaDagitimi: "Hava Da\u011f\u0131t\u0131m\u0131",
  havaFiltrasyonu: "Hava Filtrasyonu",
  aksesuarlar: "Aksesuarlar",
  otomasyonMalzemeleri: "Otomasyon Malzemeleri",
  titresimVeSesIzolasyon: "Titre\u015fim ve Ses \u0130zolasyon",
  banyoFanlari: "Banyo Fanlar\u0131",
  catiFanlari: "\u00c7at\u0131 Fanlar\u0131",
  damperler: "Damperler",
  dumanIsiTahliyeFanlari: "Duman Is\u0131 Tahliye Fanlar\u0131",
  duvarTipiFanlar: "Duvar Tipi Fanlar",
  ecFanlar: "EC Fanlar",
  endustriyelFanlar: "End\u00fcstriyel Fanlar",
  exproofFanlar: "Exproof Fanlar",
  havuzNemAlmaSantrali: "Havuz Nem Alma Santrali",
  hucreliFanlar: "H\u00fccreli Fanlar",
  isiGeriKazanimCihazlari: "Is\u0131 Geri Kazan\u0131m Cihazlar\u0131",
  kanalFanlari: "Kanal Fanlar\u0131",
  klimaSantralleri: "Klima Santralleri",
  kovanTipiAksiyalFanlar: "Kovan Tipi Aksiyal Fanlar",
  mutfakFanlari: "Mutfak Fanlar\u0131",
  siginakFanlari: "S\u0131\u011f\u0131nak Fanlar\u0131",
};
`,
);

// Fix typo in field-labels - productCardCta has wrong char
let fl = fs.readFileSync(path.join(ROOT, "src/lib/admin/field-labels.ts"), "utf8");
fl = fl.replace('productCardCta: "ùrùn butonu"', 'productCardCta: "\\u00dcr\\u00fcn butonu"');
fs.writeFileSync(path.join(ROOT, "src/lib/admin/field-labels.ts"), fl, "utf8");

// --- page-group-meta.ts home description ---
w(
  "src/lib/admin/page-group-meta.ts",
  `/** Human descriptions for simple-mode page cards. */

export const PAGE_GROUP_DESCRIPTIONS: Record<string, string> = {
  home: "Ana sayfadaki b\u00f6l\u00fcmleri sayfa ak\u0131\u015f\u0131 s\u0131ras\u0131yla d\u00fczenleyin",
  common: "\u00dcst men\u00fc ve alt bilgi (footer) yaz\u0131lar\u0131n\u0131 de\u011fi\u015ftirin",
  products: "\u00dcr\u00fcn sayfalar\u0131ndaki a\u00e7\u0131klama ve ba\u015fl\u0131klar\u0131 d\u00fczenleyin",
  solutions: "\u00c7\u00f6z\u00fcm sayfalar\u0131ndaki metinleri g\u00fcncelleyin",
  services: "Hizmet sayfalar\u0131ndaki i\u00e7erikleri d\u00fczenleyin",
  corporate: "Kurumsal sayfa metinlerini g\u00fcncelleyin",
  contact: "\u0130leti\u015fim sayfas\u0131 ve form yaz\u0131lar\u0131n\u0131 d\u00fczenleyin",
  sustainability: "S\u00fcrd\u00fcr\u00fclebilirlik sayfas\u0131 metinlerini de\u011fi\u015ftirin",
  technical: "Teknik merkez ve blog metinlerini d\u00fczenleyin",
  kvkk: "Gizlilik ve KVKK sayfas\u0131 metinlerini g\u00fcncelleyin",
  "partner-records": "Partner listesini ekleyin veya d\u00fczenleyin",
};
`,
);

console.log("Admin sections + field labels updated");
