/** Turkish labels for JSON keys when no handcrafted schema exists. */

const GLOBAL_LABELS: Record<string, string> = {
  title: "Başlık",
  desc: "Açıklama",
  description: "Açıklama",
  subtitle: "Alt başlık",
  tag: "Etiket",
  headline: "Ana başlık",
  badge: "Rozet",
  cta: "Buton yazısı",
  label: "Etiket",
  value: "Değer",
  name: "Ad",
  image: "Görsel",
  intro: "Giriş metni",
  eyebrow: "Üst satır",
  q: "Soru",
  a: "Cevap",
  email: "E-posta",
  phone: "Telefon",
  country: "Ülke",
  series: "Seri",
  scroll: "Kaydırma",
  href: "Link adresi",
  linkHref: "Link adresi",
  linkLabel: "Link yazısı",
  linkAriaLabel: "Erişilebilirlik metni",
  ariaLabel: "Erişilebilirlik metni",
  heroTitle: "Başlık",
  heroDesc: "Açıklama",
  formTitle: "Form başlığı",
  formDesc: "Form açıklaması",
  send: "Gönder butonu",
  copyright: "Telif hakkı",
  breadcrumbHome: "Ana sayfa (breadcrumb)",
  breadcrumbContact: "İletişim (breadcrumb)",
  viewAll: "Tümünü gör",
  featured: "Öne çıkan",
  openMenu: "Menü aç",
  requestQuote: "Teklif butonu",
  callBack: "Geri arama butonu",
  logoSrc: "Logo görseli",
  websiteUrl: "Web sitesi",
  websiteLabel: "Web sitesi yazısı",
  sector: "Sektör",
  example: "Örnek proje",
  projectCount: "Proje sayısı",
  theme: "Renk teması",
  lead: "Giriş paragrafı",
  mainCta: "Ana buton",
  cardCta: "Kart butonu",
  sidebarCardTitle: "Yan kart başlığı",
  sidebarCardDesc: "Yan kart açıklaması",
  catalogsVertical: "Kataloglar başlığı",
  pillarCta: "Sütun butonu",
  catalogCardCta: "Katalog butonu",
  productCardCta: "\u00dcr\u00fcn butonu",
  companyProfileVertical: "Şirket profili etiketi",
  icon: "İkon",
  iconImage: "Özel ikon görseli",
  bannerTitle: "Banner başlığı",
  bannerLine1: "Banner açıklaması",
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
  iklimlendirme: "İklimlendirme",
  sogutmaVeIsitma: "Soğutma ve Isıtma",
  havaYonetimi: "Hava Yönetimi",
  havaDagitimi: "Hava Dağıtımı",
  havaFiltrasyonu: "Hava Filtrasyonu",
  aksesuarlar: "Aksesuarlar",
  otomasyonMalzemeleri: "Otomasyon Malzemeleri",
  titresimVeSesIzolasyon: "Titreşim ve Ses İzolasyon",
  banyoFanlari: "Banyo Fanları",
  catiFanlari: "Çatı Fanları",
  damperler: "Damperler",
  dumanIsiTahliyeFanlari: "Duman Isı Tahliye Fanları",
  duvarTipiFanlar: "Duvar Tipi Fanlar",
  ecFanlar: "EC Fanlar",
  endustriyelFanlar: "Endüstriyel Fanlar",
  exproofFanlar: "Exproof Fanlar",
  havuzNemAlmaSantrali: "Havuz Nem Alma Santrali",
  hucreliFanlar: "Hücreli Fanlar",
  isiGeriKazanimCihazlari: "Isı Geri Kazanım Cihazları",
  kanalFanlari: "Kanal Fanları",
  klimaSantralleri: "Klima Santralleri",
  kovanTipiAksiyalFanlar: "Kovan Tipi Aksiyal Fanlar",
  mutfakFanlari: "Mutfak Fanları",
  siginakFanlari: "Sığınak Fanları",
};
