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
  if (rowImage !== undefined) {
    return rowImage.trim();
  }
  if (meta?.image !== undefined) {
    return meta.image.trim();
  }
  const key = name.trim().toUpperCase();
  if (key === "ORCA" || key === "POLAR BEAR" || isChillerCatalogName(name) || isCoolingOutdoorUnitName(name)) {
    return CHILLER_CATALOG_IMAGE;
  }
  if (key === "ORCA HEATER" || isElectricHeaterCatalogName(name)) {
    return ELECTRIC_HEATER_CATALOG_IMAGE;
  }
  if (isWaterCoilHeaterCatalogName(name)) {
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
  ALPACA: { image: "/images/products/alpaca-am.png", leafSlug: "menfez-panjurlar" },
  SCALLOP: { image: "/images/products/cyclone.png", leafSlug: "filtreler" },
  ROO: { image: "/images/products/yayli-titresim-izolatoru.png", leafSlug: "titresim-izolatorleri" },
  REMORA: { image: "/images/products/remora.png", leafSlug: "remora" },
  ORCA: { image: CHILLER_CATALOG_IMAGE },
  "POLAR BEAR": { image: CHILLER_CATALOG_IMAGE, leafSlug: "dis-uniteler" },
  "ORCA HEATER": { image: ELECTRIC_HEATER_CATALOG_IMAGE, leafSlug: "elektrikli-isitici" },
  "ORCA COIL": { image: "", leafSlug: "sulu-isitici" },
  "ORCA HX": { image: "", leafSlug: "orca-hx" },
  "CHILLER (POLAR BEAR)": { image: CHILLER_CATALOG_IMAGE },
  CHILLER: { image: CHILLER_CATALOG_IMAGE, leafSlug: "dis-uniteler" },
  "DIŞ ÜNİTELER": { image: CHILLER_CATALOG_IMAGE, leafSlug: "dis-uniteler" },
  "OUTDOOR UNITS": { image: CHILLER_CATALOG_IMAGE },
  "JEDNOSTKI ZEWNĘTRZNE": { image: CHILLER_CATALOG_IMAGE },
  "UNIDADES EXTERIORES": { image: CHILLER_CATALOG_IMAGE },
  "LAUKO ĮRENGINIAI": { image: CHILLER_CATALOG_IMAGE },
  "СЫРТҚЫ БӨЛІМДЕР": { image: CHILLER_CATALOG_IMAGE },
  "ВОДИҲОИ БЕРУНӢ": { image: CHILLER_CATALOG_IMAGE },
  "室外机": { image: CHILLER_CATALOG_IMAGE },
  "ELEKTRİKLİ ISITICI": { image: ELECTRIC_HEATER_CATALOG_IMAGE, leafSlug: "elektrikli-isitici" },
  "ELEKTRİKLİ ISITICILAR": { image: ELECTRIC_HEATER_CATALOG_IMAGE },
  "ELECTRIC HEATERS": { image: ELECTRIC_HEATER_CATALOG_IMAGE },
  "GRZEJNIKI ELEKTRYCZNE": { image: ELECTRIC_HEATER_CATALOG_IMAGE },
  "CALENTADORES ELÉCTRICOS": { image: ELECTRIC_HEATER_CATALOG_IMAGE },
  "SULU BATARYA": { image: "/images/products/nautilus-lfp.png" },
  "SULU ISITICI": { image: ELECTRIC_HEATER_CATALOG_IMAGE, leafSlug: "sulu-isitici" },
  "WATER COIL": { image: ELECTRIC_HEATER_CATALOG_IMAGE },
  "WĘŻOWNICA WODNA": { image: ELECTRIC_HEATER_CATALOG_IMAGE },
  "BOBINA DE AGUA": { image: ELECTRIC_HEATER_CATALOG_IMAGE },
  HAWK: { image: "/images/products/otomasyon-pano.png", leafSlug: "otomasyon-panolari" },
  PANO: { image: "/images/products/otomasyon-pano.png", leafSlug: "otomasyon-panolari" },
  PANEL: { image: "/images/products/otomasyon-pano.png", leafSlug: "otomasyon-panolari" },
  PLC: { image: "/images/products/otomasyon-plc.png", leafSlug: "plc-otomasyon" },
  SENSÖR: { image: "/images/products/otomasyon-sensor.png", leafSlug: "sensorler" },
  SENSOR: { image: "/images/products/otomasyon-sensor.png", leafSlug: "sensorler" },
  "KONTROL KARTLARI - ANAHTARLAR": {
    image: "/images/products/otomasyon-kontrol-kartlari.png",
    leafSlug: "kontrol-kartlari",
  },
  NEXUS: {
    image: "/images/products/otomasyon-kontrol-kartlari.png",
    leafSlug: "kontrol-kartlari",
  },
  "ZAMANLAMA ve KONTROL CİHAZLARI": {
    image: "/images/products/otomasyon-kontrol-kartlari.png",
    leafSlug: "zamanlama-kontrol",
  },
  LION: { image: "/images/products/frekans-inventoru.png", leafSlug: "guc-elektronigi" },
  "GÜÇ ELEKTRONİĞİ": { image: "/images/products/frekans-inventoru.png", leafSlug: "guc-elektronigi" },
  "CONTROL BOARDS - SWITCHES": { image: "/images/products/otomasyon-kontrol-kartlari.png" },
  "ZAMANLAMA VE KONTROL CİHAZLARI": {
    image: "/images/products/otomasyon-kontrol-kartlari.png",
    leafSlug: "zamanlama-kontrol",
  },
};

/** Katalog kart adı → meta (büyük/küçük harf ve `ve`/`VE` farkına toleranslı) */
export function catalogMetaForName(name: string): CatalogFamilyMeta | undefined {
  const trimmed = name.trim();
  if (!trimmed) return undefined;

  const direct =
    CATALOG_FAMILY_META[trimmed] ??
    CATALOG_FAMILY_META[trimmed.toUpperCase()] ??
    CATALOG_FAMILY_META[trimmed.toLocaleUpperCase("tr-TR")];
  if (direct) return direct;

  const upper = trimmed.toLocaleUpperCase("tr-TR");
  const entry = Object.entries(CATALOG_FAMILY_META).find(
    ([key]) => key.toLocaleUpperCase("tr-TR") === upper,
  );
  return entry?.[1];
}

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
