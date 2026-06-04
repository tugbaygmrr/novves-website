import {
  AIR_MOVEMENT_PRODUCT_HREFS,
  AIR_MOVEMENT_PRODUCT_IMAGES,
} from "@/lib/product-catalog-air-movement";

export type CatalogFamilyMeta = {
  image: string;
  leafSlug?: string;
};

export const CHILLER_CATALOG_IMAGE = "/images/products/chiller.png";
export const ELECTRIC_HEATER_CATALOG_IMAGE = "/images/products/elektrikli-isitici.png";

/** Soğutma — dış ünite satırı chiller ile aynı katalog görseli */
const COOLING_OUTDOOR_UNIT_NAMES = new Set([
  "DIŞ ÜNİTELER",
  "OUTDOOR UNITS",
  "JEDNOSTKI ZEWNĘTRZNE",
  "UNIDADES EXTERIORES",
  "LAUKO ĮRENGINIAI",
  "СЫРТҚЫ БӨЛІМДЕР",
  "ВОДИҲОИ БЕРУНӢ",
  "室外机",
]);

export function isChillerCatalogName(name: string): boolean {
  return name.trim().toUpperCase().startsWith("CHILLER");
}

export function isCoolingOutdoorUnitName(name: string): boolean {
  return COOLING_OUTDOOR_UNIT_NAMES.has(name.trim().toUpperCase());
}

const ELECTRIC_HEATER_CATALOG_NAMES = new Set([
  "ELEKTRİKLİ ISITICI",
  "ELEKTRİKLİ ISITICILAR",
  "ELECTRIC HEATERS",
  "GRZEJNIKI ELEKTRYCZNE",
  "CALENTADORES ELÉCTRICOS",
]);

export function isElectricHeaterCatalogName(name: string): boolean {
  const key = name.trim().toUpperCase();
  if (ELECTRIC_HEATER_CATALOG_NAMES.has(key)) return true;
  return key.includes("ELEKTRİKLİ ISITICI") || key.includes("ELECTRIC HEATER");
}

const WATER_COIL_HEATER_CATALOG_NAMES = new Set([
  "SULU ISITICI",
  "WATER COIL",
  "WĘŻOWNICA WODNA",
  "BOBINA DE AGUA",
]);

export function isWaterCoilHeaterCatalogName(name: string): boolean {
  const key = name.trim().toUpperCase();
  if (WATER_COIL_HEATER_CATALOG_NAMES.has(key)) return true;
  return key.includes("SULU ISITICI") || key.includes("WATER COIL");
}

export function resolveCoolingCatalogImage(
  name: string,
  meta?: CatalogFamilyMeta,
  rowImage?: string,
): string {
  const explicit = rowImage?.trim();
  if (explicit) return explicit;
  if (meta?.image) return meta.image;
  if (isChillerCatalogName(name) || isCoolingOutdoorUnitName(name)) return CHILLER_CATALOG_IMAGE;
  if (isElectricHeaterCatalogName(name) || isWaterCoilHeaterCatalogName(name)) {
    return ELECTRIC_HEATER_CATALOG_IMAGE;
  }
  return "/images/products/marlin.png";
}

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
  REMORA: { image: "/images/products/remora.png" },
  "CHILLER (POLAR BEAR)": { image: CHILLER_CATALOG_IMAGE },
  CHILLER: { image: CHILLER_CATALOG_IMAGE },
  "DIŞ ÜNİTELER": { image: CHILLER_CATALOG_IMAGE },
  "OUTDOOR UNITS": { image: CHILLER_CATALOG_IMAGE },
  "JEDNOSTKI ZEWNĘTRZNE": { image: CHILLER_CATALOG_IMAGE },
  "UNIDADES EXTERIORES": { image: CHILLER_CATALOG_IMAGE },
  "LAUKO ĮRENGINIAI": { image: CHILLER_CATALOG_IMAGE },
  "СЫРТҚЫ БӨЛІМДЕР": { image: CHILLER_CATALOG_IMAGE },
  "ВОДИҲОИ БЕРУНӢ": { image: CHILLER_CATALOG_IMAGE },
  "室外机": { image: CHILLER_CATALOG_IMAGE },
  "ELEKTRİKLİ ISITICI": { image: ELECTRIC_HEATER_CATALOG_IMAGE },
  "ELEKTRİKLİ ISITICILAR": { image: ELECTRIC_HEATER_CATALOG_IMAGE },
  "ELECTRIC HEATERS": { image: ELECTRIC_HEATER_CATALOG_IMAGE },
  "GRZEJNIKI ELEKTRYCZNE": { image: ELECTRIC_HEATER_CATALOG_IMAGE },
  "CALENTADORES ELÉCTRICOS": { image: ELECTRIC_HEATER_CATALOG_IMAGE },
  "SULU BATARYA": { image: "/images/products/nautilus-lfp.png" },
  "SULU ISITICI": { image: ELECTRIC_HEATER_CATALOG_IMAGE },
  "WATER COIL": { image: ELECTRIC_HEATER_CATALOG_IMAGE },
  "WĘŻOWNICA WODNA": { image: ELECTRIC_HEATER_CATALOG_IMAGE },
  "BOBINA DE AGUA": { image: ELECTRIC_HEATER_CATALOG_IMAGE },
  HAWK: { image: "/images/products/otomasyon-pano.png" },
  PANO: { image: "/images/products/otomasyon-pano.png" },
  PANEL: { image: "/images/products/otomasyon-pano.png" },
  PLC: { image: "/images/products/otomasyon-plc.png" },
  SENSÖR: { image: "/images/products/otomasyon-sensor.png" },
  SENSOR: { image: "/images/products/otomasyon-sensor.png" },
  "KONTROL KARTLARI - ANAHTARLAR": { image: "/images/products/otomasyon-kontrol-kartlari.png" },
  LION: { image: "/images/products/frekans-inventoru.png" },
  "GÜÇ ELEKTRONİĞİ": { image: "/images/products/frekans-inventoru.png" },
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
