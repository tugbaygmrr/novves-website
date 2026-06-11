/**
 * Sözlükte duran ama sitede artık render EDİLMEYEN (ölü) section alanları —
 * section editöründe gizlenir. Veri silinmez, yalnızca formda gösterilmez.
 *
 * Değerler kök anahtar ("badge") veya nokta-ayraçlı nested yol ("library.sidebar")
 * olabilir; FieldRenderer her alanın tam yolunu bu kümeye göre kontrol eder.
 */

/**
 * Çözüm detay sayfaları eski şablondan "Çözüm Kütüphanesi" şablonuna geçti
 * (SolutionLibraryPage). Yeni sayfa solutions.json'dan yalnızca şunları okur:
 *   breadcrumbCategory/Current, titleLine1, titleHighlight,
 *   ctaPrimary/Secondary/SecondaryHref, systemComponents, faqItems (SEO),
 *   library.{bannerDescription, heroBadge, sidebar, products, documents}.
 * Aşağıdaki alanlar eski şablona aitti ve hiçbir yerde render edilmiyor — ölü.
 */
const SOLUTION_DEAD_FIELDS = [
  "badge",
  "subtitle",
  "trustStrip",
  "whyImportantLabel",
  "whyImportantTitle",
  "whyImportantP1",
  "whyImportantP2",
  "steps",
  "systemLabel",
  "systemTitle",
  "midCtaTitle",
  "midCtaDesc",
  "midCtaButton",
  "advantagesLabel",
  "advantagesTitle",
  "advantages",
  "areasLabel",
  "areasTitle",
  "areasDesc",
  "areas",
  "faqLabel",
  "faqTitle",
  "finalCtaLabel",
  "finalCtaTitle",
  "finalCtaDesc",
  "finalCtaPhone",
  "finalCtaButton",
];

/** Tüm çözüm bölümleri aynı eski şablonu paylaşır → aynı ölü alanlar gizlenir. */
const SOLUTION_SECTION_KEYS = [
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
];

/**
 * Tüm çözümlerde ek olarak gizlenen alanlar (dumanIsiTahliye mantığı her çözüme uygulanır):
 *  - systemComponents: ürünler library.products'tan geldiği için panelde gerekmez
 *    (verisi sitede filtre etiketi olarak kalabilir ama panelden düzenlenmez).
 *  - faqItems: sayfada görünmez, yalnızca SEO JSON-LD — panelde gizlenir.
 *  - library.sidebar: iç gezinme/filtre verisi (components + related) — panelde gizlenir.
 */
const SOLUTION_EXTRA_HIDDEN = ["systemComponents", "faqItems", "library.sidebar"];
const SOLUTION_ALL_HIDDEN = [...SOLUTION_DEAD_FIELDS, ...SOLUTION_EXTRA_HIDDEN];

/**
 * Ürün KATEGORİ bölümleri "Ürün Kataloğu" şablonuna (buildProductCatalogPage)
 * geçti. Katalog sayfası bloktan yalnızca şunları okur:
 *   title, heroDesc, heroDescSuffix, products[], accessories[], entity anahtarları.
 * Aşağıdaki alanlar eski şablondan kalma ve hiçbir yerde render edilmiyor — ölü.
 * (Leaf ürün bölümlerinde — banyoFanlari, klimaSantralleri vb. — ölü alan yok.)
 */
const PRODUCT_CATEGORY_DEAD_BASE = ["titleFirst", "titleHighlight", "otherCategories"];
const PRODUCT_CATEGORY_HIDDEN: Record<string, string[]> = {
  havaHareketi: [...PRODUCT_CATEGORY_DEAD_BASE, "stats", "ctaDesc"],
  iklimlendirme: [...PRODUCT_CATEGORY_DEAD_BASE, "pills", "ctaDesc"],
  sogutmaVeIsitma: [...PRODUCT_CATEGORY_DEAD_BASE, "comingSoonNotice", "comingSoonLink"],
  havaYonetimi: [...PRODUCT_CATEGORY_DEAD_BASE],
  havaDagitimi: [...PRODUCT_CATEGORY_DEAD_BASE],
  havaFiltrasyonu: [...PRODUCT_CATEGORY_DEAD_BASE],
  aksesuarlar: [...PRODUCT_CATEGORY_DEAD_BASE, "productCount", "ctaTitle"],
  otomasyonMalzemeleri: [...PRODUCT_CATEGORY_DEAD_BASE],
  titresimVeSesIzolasyon: [...PRODUCT_CATEGORY_DEAD_BASE],
};

export const HIDDEN_SECTION_FIELDS: Record<string, Record<string, string[]>> = {
  solutions: Object.fromEntries(SOLUTION_SECTION_KEYS.map((key) => [key, SOLUTION_ALL_HIDDEN])),
  products: PRODUCT_CATEGORY_HIDDEN,
  home: {
    // Hero scroll video'nun bitiş kartı sitede animation2.endCard'dan çizilir
    // (home-client.tsx: endCard={dict.animation2.endCard}). hero.endCard ölü veri.
    // heroLabel hiçbir bileşende render edilmiyor (sadece tip tanımı) — ölü.
    hero: ["endCard", "heroLabel"],
    // Video bölümünün başlangıç kartı hero'dan çizilir (startCard={dict.hero});
    // animation2.startCard ölü veri. Bu bölüm yalnızca endCard'ı (DRAGONFLY) düzenler.
    animation2: ["startCard"],
    // Şirket profili alt banner'ı sitede yalnızca bannerTitle + bannerLine1 çizer
    // (home-client.tsx). bannerLine2 hiç render edilmiyor — ölü; tek açıklama kalır.
    companyProfileSection: ["bannerLine2"],
  },
};

export function getHiddenFields(file: string, section: string): string[] {
  return HIDDEN_SECTION_FIELDS[file]?.[section] ?? [];
}
