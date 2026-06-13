/** Referanslar sidebar — güncel proje hiyerarşisi (7 ana kategori + alt başlıklar) */

export type ReferanslarCategoryId =
  | "infrastructure-transport"
  | "industrial"
  | "healthcare"
  | "tourism-hospitality"
  | "residential-urban"
  | "public-government"
  | "energy-infrastructure";

export type ReferanslarSubcategoryId = string;

/** `all` | ana kategori | `category:subcategory` */
export type ReferanslarFilterId = "all" | ReferanslarCategoryId | `${ReferanslarCategoryId}:${string}`;

export type ReferanslarCategoryNode = {
  id: ReferanslarCategoryId;
  icon: string;
  subcategories: { id: ReferanslarSubcategoryId; classKeys: string[] }[];
  /** Alt kategori dışında doğrudan ana kategoriye bağlı sınıflar */
  extraClassKeys?: string[];
};

export const REFERANSLAR_CATEGORY_TREE: ReferanslarCategoryNode[] = [
  {
    id: "infrastructure-transport",
    icon: "flight_takeoff",
    subcategories: [
      {
        id: "passenger-terminals-airport",
        classKeys: ["havalimanı", "havalimani", "havaalani"],
      },
      { id: "parking", classKeys: ["otopark"] },
      {
        id: "public-building-market",
        classKeys: ["karma-kullanim", "kamu-binasi"],
      },
    ],
    extraClassKeys: ["karayolu-tuneli", "demir-yolu-tuneli", "metro", "tunel"],
  },
  {
    id: "industrial",
    icon: "factory",
    subcategories: [
      { id: "manufacturing", classKeys: ["endustriyel-tesis", "fabrika", "showroom"] },
      { id: "logistics-warehouses", classKeys: ["depo"] },
      { id: "heavy-industry", classKeys: ["tersane"] },
    ],
  },
  {
    id: "healthcare",
    icon: "local_hospital",
    subcategories: [
      { id: "city-hospitals", classKeys: ["hastane"] },
      { id: "state-private-hospitals", classKeys: ["hastane"] },
      { id: "healthcare-campuses", classKeys: ["hastane"] },
    ],
  },
  {
    id: "tourism-hospitality",
    icon: "hotel",
    subcategories: [
      { id: "hotels", classKeys: ["otel"] },
      { id: "shopping-malls", classKeys: ["avm", "avm-ve-konut"] },
      { id: "office-buildings", classKeys: ["karma-kullanim"] },
    ],
  },
  {
    id: "residential-urban",
    icon: "apartment",
    subcategories: [
      { id: "mass-housing", classKeys: ["konut"] },
      { id: "urban-renewal", classKeys: ["konut"] },
      { id: "residential-complexes", classKeys: ["villa", "avm-ve-konut"] },
    ],
  },
  {
    id: "public-government",
    icon: "account_balance",
    subcategories: [{ id: "educational", classKeys: ["okul"] }],
    extraClassKeys: ["ibadethane", "stadyum"],
  },
  {
    id: "energy-infrastructure",
    icon: "bolt",
    subcategories: [
      { id: "power-plants", classKeys: ["enerji-santrali"] },
      { id: "infrastructure-facilities", classKeys: ["altyapi"] },
      {
        id: "utility-service",
        classKeys: ["veri-merkezi", "karayolu-tuneli", "demir-yolu-tuneli"],
      },
    ],
  },
];

const CLASS_TO_FILTERS = new Map<string, ReferanslarFilterId[]>();

function registerFilter(classKey: string, filter: ReferanslarFilterId) {
  const list = CLASS_TO_FILTERS.get(classKey) ?? [];
  if (!list.includes(filter)) list.push(filter);
  CLASS_TO_FILTERS.set(classKey, list);
}

for (const node of REFERANSLAR_CATEGORY_TREE) {
  for (const sub of node.subcategories) {
    for (const classKey of sub.classKeys) {
      registerFilter(classKey, `${node.id}:${sub.id}`);
      registerFilter(classKey, node.id);
    }
  }
  for (const classKey of node.extraClassKeys ?? []) {
    registerFilter(classKey, node.id);
  }
}

export function parseReferanslarFilterId(value: ReferanslarFilterId): {
  category: ReferanslarCategoryId | "all";
  subcategory: ReferanslarSubcategoryId | null;
} {
  if (value === "all") return { category: "all", subcategory: null };
  const [category, subcategory] = value.split(":") as [ReferanslarCategoryId, string | undefined];
  return { category, subcategory: subcategory ?? null };
}

export function classKeysForFilter(filter: ReferanslarFilterId): Set<string> | null {
  if (filter === "all") return null;
  const { category, subcategory } = parseReferanslarFilterId(filter);
  const node = REFERANSLAR_CATEGORY_TREE.find((n) => n.id === category);
  if (!node) return new Set();

  if (subcategory) {
    const sub = node.subcategories.find((s) => s.id === subcategory);
    return new Set(sub?.classKeys ?? []);
  }

  const keys = new Set<string>();
  for (const sub of node.subcategories) {
    for (const k of sub.classKeys) keys.add(k);
  }
  for (const k of node.extraClassKeys ?? []) keys.add(k);
  return keys;
}

export function matchesReferanslarFilter(classKey: string, filter: ReferanslarFilterId): boolean {
  const keys = classKeysForFilter(filter);
  if (keys === null) return true;
  return keys.has(classKey);
}

/** @deprecated Eski 4'lü kategori API'si — yeni filtre sistemine yönlendirir */
export type LegacyReferanslarCategoryId = "all" | "industrial" | "residential" | "special";

export function matchesReferanslarCategory(
  classKey: string,
  category: LegacyReferanslarCategoryId | ReferanslarFilterId,
): boolean {
  if (
    category === "industrial" ||
    category === "residential" ||
    category === "special" ||
    category === "all"
  ) {
    const legacyMap: Record<LegacyReferanslarCategoryId, ReferanslarFilterId | ReferanslarFilterId[]> = {
      all: "all",
      industrial: "industrial",
      residential: "residential-urban",
      special: [
        "infrastructure-transport",
        "healthcare",
        "tourism-hospitality",
        "public-government",
        "energy-infrastructure",
      ],
    };
    const mapped = legacyMap[category as LegacyReferanslarCategoryId];
    if (mapped === "all") return true;
    if (Array.isArray(mapped)) return mapped.some((f) => matchesReferanslarFilter(classKey, f));
    return matchesReferanslarFilter(classKey, mapped);
  }
  return matchesReferanslarFilter(classKey, category);
}

export type ReferanslarCategoryLabels = {
  all: string;
  tree: {
    id: ReferanslarCategoryId;
    label: string;
    subcategories: { id: string; label: string }[];
  }[];
};

export const DEFAULT_REFERANSLAR_CATEGORY_LABELS_EN: ReferanslarCategoryLabels = {
  all: "All Projects",
  tree: [
    {
      id: "infrastructure-transport",
      label: "Infrastructure and Transportation",
      subcategories: [
        { id: "passenger-terminals-airport", label: "Passenger Terminals — Airport" },
        { id: "parking", label: "Parking & Apron Facilities" },
        { id: "public-building-market", label: "Public Building — Multi-Purpose Market" },
      ],
    },
    {
      id: "industrial",
      label: "Industrial Plants & Factories",
      subcategories: [
        { id: "manufacturing", label: "Manufacturing Plants" },
        { id: "logistics-warehouses", label: "Logistics & Warehouses" },
        { id: "heavy-industry", label: "Heavy Industry Facilities" },
      ],
    },
    {
      id: "healthcare",
      label: "Healthcare Facilities",
      subcategories: [
        { id: "city-hospitals", label: "City Hospitals" },
        { id: "state-private-hospitals", label: "State & Private Hospitals" },
        { id: "healthcare-campuses", label: "Healthcare Campuses" },
      ],
    },
    {
      id: "tourism-hospitality",
      label: "Tourism and Hospitality",
      subcategories: [
        { id: "hotels", label: "Hotels" },
        { id: "shopping-malls", label: "Shopping Malls" },
        { id: "office-buildings", label: "Office Buildings" },
      ],
    },
    {
      id: "residential-urban",
      label: "Residential & Urban Regeneration Projects",
      subcategories: [
        { id: "mass-housing", label: "Mass Housing Projects" },
        { id: "urban-renewal", label: "Urban Renewal Areas" },
        { id: "residential-complexes", label: "Residential Complexes" },
      ],
    },
    {
      id: "public-government",
      label: "Public Buildings & Government Projects",
      subcategories: [{ id: "educational", label: "Educational Buildings" }],
    },
    {
      id: "energy-infrastructure",
      label: "Energy & Infrastructure Projects",
      subcategories: [
        { id: "power-plants", label: "Power Plants" },
        { id: "infrastructure-facilities", label: "Infrastructure Facilities" },
        { id: "utility-service", label: "Utility & Service Buildings" },
      ],
    },
  ],
};

export const DEFAULT_REFERANSLAR_CATEGORY_LABELS_TR: ReferanslarCategoryLabels = {
  all: "Tüm Projeler",
  tree: [
    {
      id: "infrastructure-transport",
      label: "Altyapı Ulaşım",
      subcategories: [
        { id: "passenger-terminals-airport", label: "Yolcu Terminalleri - Havalimanı" },
        { id: "parking", label: "Otopark" },
        { id: "public-building-market", label: "Kamu binası - Pazaryeri" },
      ],
    },
    {
      id: "industrial",
      label: "Endüstriyel Tesisler & Fabrikalar",
      subcategories: [
        { id: "manufacturing", label: "Üretim Tesisleri" },
        { id: "logistics-warehouses", label: "Lojistik & Depolama Alanları" },
        { id: "heavy-industry", label: "Ağır Sanayi Tesisleri" },
      ],
    },
    {
      id: "healthcare",
      label: "Sağlık Yapıları",
      subcategories: [
        { id: "city-hospitals", label: "Şehir Hastaneleri" },
        { id: "state-private-hospitals", label: "Devlet & Özel Hastaneler" },
        { id: "healthcare-campuses", label: "Sağlık Kampüsleri" },
      ],
    },
    {
      id: "tourism-hospitality",
      label: "Turizm Konaklama",
      subcategories: [
        { id: "hotels", label: "Oteller" },
        { id: "shopping-malls", label: "Alışveriş Merkezleri" },
        { id: "office-buildings", label: "Ofis Binaları" },
      ],
    },
    {
      id: "residential-urban",
      label: "Konut & Kentsel Dönüşüm Projeleri",
      subcategories: [
        { id: "mass-housing", label: "Toplu Konut Projeleri" },
        { id: "urban-renewal", label: "Kentsel Dönüşüm Alanları" },
        { id: "residential-complexes", label: "Konut Siteleri" },
      ],
    },
    {
      id: "public-government",
      label: "Kamu Binaları & Resmi Projeler",
      subcategories: [{ id: "educational", label: "Eğitim Yapıları" }],
    },
    {
      id: "energy-infrastructure",
      label: "Enerji & Altyapı Projeleri",
      subcategories: [
        { id: "power-plants", label: "Enerji Santralleri" },
        { id: "infrastructure-facilities", label: "Altyapı Tesisleri" },
        { id: "utility-service", label: "Teknik & Servis Yapıları" },
      ],
    },
  ],
};

export function resolveReferanslarCategoryLabels(
  locale: string,
  dict?: Partial<ReferanslarCategoryLabels> & {
    categories?: Record<string, string>;
    categoryTree?: ReferanslarCategoryLabels["tree"];
  },
): ReferanslarCategoryLabels {
  if (dict?.categoryTree?.length) {
    return {
      all: dict.all ?? dict.categories?.all ?? DEFAULT_REFERANSLAR_CATEGORY_LABELS_EN.all,
      tree: dict.categoryTree,
    };
  }
  if (dict?.tree?.length) {
    return {
      all: dict.all ?? dict.categories?.all ?? DEFAULT_REFERANSLAR_CATEGORY_LABELS_EN.all,
      tree: dict.tree,
    };
  }
  if (locale.startsWith("tr")) return DEFAULT_REFERANSLAR_CATEGORY_LABELS_TR;
  return DEFAULT_REFERANSLAR_CATEGORY_LABELS_EN;
}

function normalizeReferansClassKey(classKey: string): string {
  return classKey
    .toLocaleLowerCase("tr-TR")
    .replaceAll("ı", "i")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-+|-+$/g, "");
}

export function resolveReferenceCategoryMeta(classKey: string): {
  categoryId: ReferanslarCategoryId;
  subcategoryId: string | null;
} | null {
  const key = normalizeReferansClassKey(classKey);
  for (const node of REFERANSLAR_CATEGORY_TREE) {
    for (const sub of node.subcategories) {
      if (sub.classKeys.some((k) => normalizeReferansClassKey(k) === key)) {
        return { categoryId: node.id, subcategoryId: sub.id };
      }
    }
    if (node.extraClassKeys?.some((k) => normalizeReferansClassKey(k) === key)) {
      return { categoryId: node.id, subcategoryId: null };
    }
  }
  return null;
}

export function resolveReferenceSectorLabel(
  classKey: string,
  labels: ReferanslarCategoryLabels,
): string {
  const meta = resolveReferenceCategoryMeta(classKey);
  if (!meta) return "";
  return labels.tree.find((node) => node.id === meta.categoryId)?.label ?? "";
}

export function formatReferenceBuildingTypeLabel(className: string): string {
  const cleaned = className.trim();
  if (!cleaned) return "";
  if (/[a-z\u00e7\u011f\u0131\u00f6\u015f\u00fc]/.test(cleaned) && cleaned !== cleaned.toLocaleUpperCase("tr-TR")) {
    return cleaned;
  }
  const titlePart = (part: string) =>
    part.charAt(0).toLocaleUpperCase("tr-TR") + part.slice(1).toLocaleLowerCase("tr-TR");
  return cleaned
    .toLocaleLowerCase("tr-TR")
    .split(/\s+/)
    .map((word) => word.split("-").map(titlePart).join("-"))
    .join(" ");
}
