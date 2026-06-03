import {
  AIR_MOVEMENT_PRODUCT_HREFS,
  AIR_MOVEMENT_PRODUCT_IMAGES,
} from "@/lib/product-catalog-air-movement";

export type CatalogFamilyMeta = {
  image: string;
  leafSlug?: string;
};

/** Ürün kartı görseli ve detay sayfası slug’ı — aile adı (UPPERCASE) anahtarı */
export const CATALOG_FAMILY_META: Record<string, CatalogFamilyMeta> = {
  ...Object.fromEntries(
    Object.keys(AIR_MOVEMENT_PRODUCT_IMAGES).map((name) => [
      name,
      {
        image: AIR_MOVEMENT_PRODUCT_IMAGES[name]!,
        leafSlug: AIR_MOVEMENT_PRODUCT_HREFS[name],
      },
    ]),
  ),
  TIGER: { image: "/images/products/tiger-pre.png", leafSlug: "klima-santralleri" },
  DOLPHIN: { image: "/images/products/dolphin-pre.png", leafSlug: "havuz-nem-alma-santrali" },
  CARACAL: { image: "/images/products/caracal.png", leafSlug: "isi-geri-kazanim-cihazlari" },
  HOUND: { image: "/images/products/hound-al.png", leafSlug: "damperler" },
  ALPACA: { image: "/images/products/alpaca-am.png" },
  SCALLOP: { image: "/images/products/cyclone.png" },
  ROO: { image: "/images/products/yayli-titresim-izolatoru.png" },
  "CHILLER (POLAR BEAR)": { image: "/images/products/tiger-pre.png" },
  "DIŞ ÜNİTELER": { image: "/images/products/tiger-pre.png" },
  "İÇ ÜNİTELER": { image: "/images/products/dolphin-pre.png" },
  "ELEKTRİKLİ ISITICILAR": { image: "/images/products/caracal.png" },
  "SULU BATARYA": { image: "/images/products/nautilus-lfp.png" },
  PANO: { image: "/images/products/otomasyon-pano.png" },
  PANEL: { image: "/images/products/otomasyon-pano.png" },
  PLC: { image: "/images/products/otomasyon-plc.png" },
  SENSÖR: { image: "/images/products/otomasyon-sensor.png" },
  SENSOR: { image: "/images/products/otomasyon-sensor.png" },
  "KONTROL KARTLARI - ANAHTARLAR": { image: "/images/products/otomasyon-kontrol-kartlari.png" },
  "CONTROL BOARDS - SWITCHES": { image: "/images/products/otomasyon-kontrol-kartlari.png" },
};

/** Kategori → JSON içindeki varlık blok anahtarları (tiger, hound, …) */
export const CATEGORY_ENTITY_KEYS: Record<string, string[]> = {
  iklimlendirme: ["tiger", "dolphin", "caracal"],
  havaYonetimi: ["hound"],
  havaDagitimi: ["alpaca"],
  havaFiltrasyonu: ["scallop"],
  titresimVeSesIzolasyon: ["roo"],
};

export const CATEGORY_ENTITY_BRAND: Record<string, Record<string, string>> = {
  iklimlendirme: { tiger: "TIGER", dolphin: "DOLPHIN", caracal: "CARACAL" },
  havaYonetimi: { hound: "HOUND" },
  havaDagitimi: { alpaca: "ALPACA" },
  havaFiltrasyonu: { scallop: "SCALLOP" },
  titresimVeSesIzolasyon: { roo: "ROO" },
};
