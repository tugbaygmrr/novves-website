/**
 * Ana sayfa ürün kategorileri şeridi — kart üst görseli (çözüm şeridiyle aynı mantık).
 */
export type ProductStripCategoryMedia = {
  readonly hero: string;
};

const PRODUCT_CATEGORY_CARD_HERO_V = "1";

export const productStripCategoryMedia: Record<string, ProductStripCategoryMedia> = {
  "/urunler/hava-hareketi": {
    hero: `/images/products/categories/hava-hareketi-card-hero.png?v=${PRODUCT_CATEGORY_CARD_HERO_V}`,
  },
  "/urunler/iklimlendirme": {
    hero: `/images/products/categories/iklimlendirme-card-hero.png?v=${PRODUCT_CATEGORY_CARD_HERO_V}`,
  },
  "/urunler/sogutma-ve-isitma": {
    hero: `/images/products/categories/sogutma-ve-isitma-card-hero.png?v=${PRODUCT_CATEGORY_CARD_HERO_V}`,
  },
  "/urunler/hava-yonetimi": {
    hero: `/images/products/categories/hava-yonetimi-card-hero.png?v=${PRODUCT_CATEGORY_CARD_HERO_V}`,
  },
  "/urunler/hava-dagitimi": {
    hero: `/images/products/categories/hava-dagitimi-card-hero.png?v=${PRODUCT_CATEGORY_CARD_HERO_V}`,
  },
  "/urunler/hava-filtrasyonu": {
    hero: `/images/products/categories/hava-filtrasyonu-card-hero.png?v=${PRODUCT_CATEGORY_CARD_HERO_V}`,
  },
  "/urunler/aksesuarlar": {
    hero: `/images/products/categories/aksesuarlar-card-hero.png?v=${PRODUCT_CATEGORY_CARD_HERO_V}`,
  },
  "/urunler/otomasyon-malzemeleri": {
    hero: `/images/products/categories/otomasyon-malzemeleri-card-hero.png?v=${PRODUCT_CATEGORY_CARD_HERO_V}`,
  },
  "/urunler/titresim-ve-ses-izolasyon": {
    hero: `/images/products/categories/titresim-ve-ses-izolasyon-card-hero.png?v=${PRODUCT_CATEGORY_CARD_HERO_V}`,
  },
};
