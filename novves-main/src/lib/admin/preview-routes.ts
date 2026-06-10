/** Map admin file+section to public site preview URL (locale prefix added by caller). */

const FILE_ROUTES: Record<string, string> = {
  home: "",
  common: "",
  products: "/urunler",
  solutions: "/cozumler",
  services: "/hizmetler",
  corporate: "/kurumsal/biz-kimiz",
  contact: "/iletisim",
  sustainability: "/surdurulebilirlik",
  technical: "/teknik-merkez/dokuman-kutuphanesi",
  kvkk: "/kvkk",
  "partner-records": "/iletisim/partnerlerimiz",
};

const SECTION_ROUTES: Record<string, Record<string, string>> = {
  home: {
    hero: "#hero-main",
    animation2: "#hero-main",
    solutionCarouselByHref: "#solution-categories",
    productCategories: "#product-categories",
    catalogPreview: "#catalogs",
    referencePreview: "#references",
    certificatePreview: "#certificates",
    engineeringPillarsSection: "#pillars-journey",
    pillars: "#pillars-journey",
    engineeringShowcase: "#engineering",
    faq: "#faq",
    finalCta: "#final-cta",
    companyProfileSection: "#company-profile",
    pageChrome: "",
  },
  common: {
    navbar: "",
    footer: "",
  },
  contact: {
    main: "/iletisim",
    partnerlerimiz: "/iletisim/partnerlerimiz",
    sosyalMedya: "/iletisim/sosyal-medya",
  },
  corporate: {
    bizKimiz: "/kurumsal/biz-kimiz",
    ceoMesaji: "/kurumsal/ceo-mesaji",
    ekibimiz: "/kurumsal/ekibimiz",
    referanslar: "/kurumsal/referanslar",
    sertifikalar: "/teknik-merkez/dokuman-kutuphanesi",
    politikamiz: "/kurumsal/politikamiz",
    basinOdasi: "/kurumsal/basin-odasi",
    haberler: "/kurumsal/haberler",
  },
  services: {
    cfdAnalizi: "/hizmetler/cfd-analizi",
    teknikServis: "/hizmetler/teknik-servis",
    genelBakis: "/hizmetler",
  },
  solutions: {
    dumanIsiTahliye: "/cozumler/duman-isi-tahliye-sistemleri",
  },
  products: {
    shared: "/urunler",
    havaHareketi: "/urunler/hava-hareketi",
    dumanIsiTahliyeFanlari: "/urunler/duman-isi-tahliye-fanlari",
  },
  technical: {
    blog: "/teknik-merkez/blog",
    dokumanKutuphanesi: "/teknik-merkez/dokuman-kutuphanesi",
    fanSecici: "/teknik-merkez/fan-secici",
    patentlerimiz: "/teknik-merkez/patentlerimiz",
  },
  sustainability: {
    main: "/surdurulebilirlik",
    co2: "/surdurulebilirlik/co2",
    geriDonusum: "/surdurulebilirlik/geri-donusum",
  },
  kvkk: {
    links: "/kvkk",
  },
};

export function getPreviewUrl(
  locale: string,
  file: string,
  section: string
): string {
  const sectionPath = SECTION_ROUTES[file]?.[section];
  const filePath = sectionPath ?? FILE_ROUTES[file] ?? "";
  const base = `/${locale}${filePath}`;
  return base || `/${locale}`;
}
