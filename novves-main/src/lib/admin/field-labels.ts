/** Turkish labels for JSON keys when no handcrafted schema exists. */

const GLOBAL_LABELS: Record<string, string> = {
  title: "Baslik",
  desc: "Aciklama",
  description: "Aciklama",
  subtitle: "Alt baslik",
  tag: "Etiket",
  headline: "Ana baslik",
  badge: "Rozet",
  cta: "Buton yazisi",
  label: "Etiket",
  value: "Deger",
  name: "Ad",
  image: "Gorsel",
  intro: "Giris metni",
  eyebrow: "Ust satir",
  q: "Soru",
  a: "Cevap",
  email: "E-posta",
  phone: "Telefon",
  country: "Ulke",
  series: "Seri",
  scroll: "Kaydirma",
  href: "Link adresi",
  linkHref: "Link adresi",
  linkLabel: "Link yazisi",
  linkAriaLabel: "Erisilebilirlik metni",
  ariaLabel: "Erisilebilirlik metni",
  heroTitle: "Baslik",
  heroDesc: "Aciklama",
  formTitle: "Form basligi",
  formDesc: "Form aciklamasi",
  send: "Gonder butonu",
  copyright: "Telif hakki",
  breadcrumbHome: "Ana sayfa (breadcrumb)",
  breadcrumbContact: "Iletisim (breadcrumb)",
  viewAll: "Tumunu gor",
  featured: "One cikan",
  openMenu: "Menu ac",
  requestQuote: "Teklif butonu",
  callBack: "Geri arama butonu",
  logoSrc: "Logo gorseli",
  websiteUrl: "Web sitesi",
  websiteLabel: "Web sitesi yazisi",
};

/** Keys hidden in simple-mode fallback unless "show all" is on */
export const ADVANCED_KEY_PATTERNS = [
  /href$/i,
  /arialabel/i,
  /classname/i,
  /^id$/,
  /iframe/i,
  /scroll$/i,
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
  iklimlendirme: "Iklimlendirme",
  sogutmaVeIsitma: "Sogutma ve Isitma",
  havaYonetimi: "Hava Yonetimi",
  havaDagitimi: "Hava Dagitimi",
  havaFiltrasyonu: "Hava Filtrasyonu",
  aksesuarlar: "Aksesuarlar",
  otomasyonMalzemeleri: "Otomasyon Malzemeleri",
  titresimVeSesIzolasyon: "Titresim ve Ses Izolasyon",
  banyoFanlari: "Banyo Fanlari",
  catiFanlari: "Cati Fanlari",
  damperler: "Damperler",
  dumanIsiTahliyeFanlari: "Duman Isi Tahliye Fanlari",
  duvarTipiFanlar: "Duvar Tipi Fanlar",
  ecFanlar: "EC Fanlar",
  endustriyelFanlar: "Endustriyel Fanlar",
  exproofFanlar: "Exproof Fanlar",
  havuzNemAlmaSantrali: "Havuz Nem Alma Santrali",
  hucreliFanlar: "Hucreli Fanlar",
  isiGeriKazanimCihazlari: "Isi Geri Kazanim Cihazlari",
  kanalFanlari: "Kanal Fanlari",
  klimaSantralleri: "Klima Santralleri",
  kovanTipiAksiyalFanlar: "Kovan Tipi Aksiyal Fanlar",
  mutfakFanlari: "Mutfak Fanlari",
  siginakFanlari: "Siginak Fanlari",
};
