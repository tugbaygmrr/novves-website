import { PRODUCT_CATEGORY_NAV, SOLUTION_NAV } from "@/lib/hub-nav-config";

/** Paths that only redirect - excluded from sitemap (canonical targets are listed instead). */
const REDIRECT_ONLY_PATHS = new Set([
  "cozumler",
  "urunler",
  "teknik-merkez",
  "teknik-merkez/fan-secici",
  "legal",
  "kvkk",
]);

/** Path segments after `[locale]` for sitemap generation. */
export function collectPublicPathSegments(): string[] {
  const staticPaths = [
    "",
    "hizmetler",
    "hizmetler/cfd-analizi",
    "hizmetler/devreye-alma",
    "hizmetler/duman-kontrol-sistemi-tasarimi",
    "hizmetler/egitim-ve-teknik-danismanlik",
    "hizmetler/fan-secimi-ve-teknik-projelendirme",
    "hizmetler/bakim-ve-performans-kontrolu",
    "hizmetler/teknik-servis",
    "hizmetler/yerinde-kesif",
    "kurumsal",
    "kurumsal/biz-kimiz",
    "kurumsal/ceo-mesaji",
    "kurumsal/ekibimiz",
    "kurumsal/referanslar",
    "kurumsal/sertifikalar",
    "kurumsal/politikamiz",
    "kurumsal/basin-odasi",
    "kurumsal/haberler",
    "kurumsal/medya-merkezi",
    "kurumsal/patentlerimiz",
    "iletisim",
    "iletisim/partnerlerimiz",
    "iletisim/sosyal-medya",
    "kariyer",
    "surdurulebilirlik",
    "surdurulebilirlik/co2",
    "surdurulebilirlik/geri-donusum",
    "teknik-merkez/blog",
    "teknik-merkez/dokuman-kutuphanesi",
    "teknik-merkez/patentlerimiz",
    "kvkk/kisisel-verilerin-korunmasi",
    "kvkk/kvkk-ve-islenmesi-beyani",
    "kvkk/guvenlik-ve-gizlilik-politikasi",
    "privacy",
    "terms",
    "cookies",
    "visitor",
    "customer",
    "product-safety",
    "urunler/banyo-fanlari",
    "urunler/cati-fanlari",
    "urunler/damperler",
    "urunler/duman-isi-tahliye-fanlari",
    "urunler/duvar-tipi-fanlar",
    "urunler/ec-fanlar",
    "urunler/endustriyel-fanlar",
    "urunler/exproof-fanlar",
    "urunler/havuz-nem-alma-santrali",
    "urunler/hucreli-fanlar",
    "urunler/isi-geri-kazanim-cihazlari",
    "urunler/kanal-fanlari",
    "urunler/klima-santralleri",
    "urunler/kovan-tipi-aksiyal-fanlar",
    "urunler/mutfak-fanlari",
    "urunler/siginak-fanlari",
  ];

  const solutionPaths = SOLUTION_NAV.map((s) => `cozumler/${s.slug}`);
  const categoryPaths = PRODUCT_CATEGORY_NAV.map((c) => `urunler/${c.slug}`);

  return [...new Set([...staticPaths, ...solutionPaths, ...categoryPaths])].filter(
    (path) => !REDIRECT_ONLY_PATHS.has(path),
  );
}
