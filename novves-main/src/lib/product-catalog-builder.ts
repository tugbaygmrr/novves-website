import { PRODUCT_CATEGORY_NAV } from "@/lib/hub-nav-config";
import {
  buildProductCatalogCategories,
  type ProductCatalogItem,
  type ProductCatalogPageData,
} from "@/lib/product-catalog";
import {
  CATEGORY_ENTITY_BRAND,
  CATEGORY_ENTITY_KEYS,
  CATALOG_FAMILY_META,
  catalogMetaForName,
  resolveCoolingCatalogImage,
} from "@/lib/product-catalog-family-meta";
import { getProductFamilyPageBlurb } from "@/lib/solution-product-blurb";
import { resolvePublicImage } from "@/lib/resolve-public-image";
import { getProductCatalogUi } from "@/lib/product-catalog-ui";
import type { Locale } from "@/i18n/config";

const BLOCK_SKIP_KEYS = new Set([
  "title",
  "titleFirst",
  "titleHighlight",
  "heroDesc",
  "heroDescSuffix",
  "otherCategories",
  "pills",
  "ctaDesc",
  "ctaTitle",
  "comingSoonNotice",
  "comingSoonLink",
  "productCount",
  "tableHeaders",
  "accessories",
  "products",
  "catalogs",
  "guides",
]);

type RawProductRow = {
  name: string;
  type?: string;
  image?: string;
  description?: string;
  subModels?: string[];
  /** Kart spec hücreleri — panelden düzenlenir (eski subModels türevinin yerine). */
  specFlow?: string;
  specPressure?: string;
  comingSoon?: boolean;
};

type AccessoryRow = {
  name: string;
  image?: string;
  description?: string;
};

type EntityRow = {
  label?: string;
  desc?: string;
  subModels?: string[];
  specs?: { label: string; value: string }[];
  /** Panelden düzenlenir; boşsa eski specs/meta'dan türetilir. */
  image?: string;
  specFlow?: string;
  specPressure?: string;
};

function trim(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function withProductNumbers(items: ProductCatalogItem[]): ProductCatalogItem[] {
  const digits = Math.max(2, String(items.length).length);
  return items.map((item, index) => ({
    ...item,
    number: String(index + 1).padStart(digits, "0"),
  }));
}

function slugifyId(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function specValue(specs: EntityRow["specs"], matchers: RegExp[]): string | undefined {
  if (!specs?.length) return undefined;
  for (const spec of specs) {
    const label = spec.label.toLowerCase();
    if (matchers.some((m) => m.test(label))) return spec.value;
  }
  return undefined;
}

function buildItem(
  locale: string,
  productsDict: Record<string, unknown>,
  input: {
    id: string;
    name: string;
    type: string;
    image: string;
    leafSlug?: string;
    description?: string;
    subModels?: string[];
    comingSoon?: boolean;
    specFlow?: string;
    specPressure?: string;
  },
): ProductCatalogItem {
  const subModels = input.subModels ?? [];
  const comingSoon = Boolean(input.comingSoon);
  const defaultImage = "/images/products/marlin.png";
  const rawImage = input.image || defaultImage;
  const image =
    rawImage.startsWith("/images/products/") && !rawImage.endsWith("marlin.png")
      ? rawImage
      : resolvePublicImage(rawImage, {
          fallback: defaultImage,
          label: input.name,
        });
  const blurb =
    input.description?.trim() ||
    getProductFamilyPageBlurb(productsDict, input.name, image) ||
    "";

  const modelsLabel = getProductCatalogUi(locale as Locale).modelsLabel;

  return {
    id: input.id,
    name: input.name,
    type: input.type,
    number: "01",
    image,
    href:
      comingSoon || !input.leafSlug
        ? undefined
        : `/${locale}/urunler/${input.leafSlug}`,
    description: blurb,
    subModels,
    comingSoon,
    specFlow:
      input.specFlow ??
      (subModels.length > 0 ? `${subModels.length}+ ${modelsLabel}` : "—"),
    specPressure: input.specPressure ?? (comingSoon ? "—" : "—"),
  };
}

function fromProductsArray(
  locale: string,
  productsDict: Record<string, unknown>,
  rows: RawProductRow[],
): ProductCatalogItem[] {
  return rows.map((p) => {
    const name = trim(p.name);
    const meta = catalogMetaForName(name);
    return buildItem(locale, productsDict, {
      id: name,
      name,
      type: trim(p.type) || name,
      image: resolveCoolingCatalogImage(name, meta, trim(p.image)),
      description: trim(p.description),
      leafSlug: meta?.leafSlug,
      subModels: p.subModels,
      comingSoon: p.comingSoon,
      specFlow: trim(p.specFlow) || undefined,
      specPressure:
        trim(p.specPressure) ||
        (name === "DRAGONFLY" || meta?.leafSlug === "duman-isi-tahliye-fanlari" ? "EN 12101-3" : undefined),
    });
  });
}

function fromAccessories(
  locale: string,
  productsDict: Record<string, unknown>,
  rows: AccessoryRow[],
): ProductCatalogItem[] {
  const accessoryFallback = "/images/products/categories/aksesuarlar-card-hero.png";

  return rows.map((a) => {
    const name = trim(a.name);
    const meta = catalogMetaForName(name);
    const image = resolvePublicImage(trim(a.image), {
      fallback: accessoryFallback,
      label: name,
    });
    return buildItem(locale, productsDict, {
      id: slugifyId(name),
      name,
      type: getProductCatalogUi(locale as Locale).accessoryType,
      image: meta?.image ?? image,
      description: trim(a.description),
      leafSlug: meta?.leafSlug,
      subModels: [],
      comingSoon: false,
      specFlow: "",
      specPressure: "",
    });
  });
}

function fromEntities(
  locale: string,
  categoryKey: string,
  productsDict: Record<string, unknown>,
  block: Record<string, unknown>,
): ProductCatalogItem[] {
  const keys = CATEGORY_ENTITY_KEYS[categoryKey] ?? [];
  const brands = CATEGORY_ENTITY_BRAND[categoryKey] ?? {};
  const items: ProductCatalogItem[] = [];

  for (const key of keys) {
    const raw = block[key];
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) continue;
    const entity = raw as EntityRow;
    const brandName = brands[key] ?? key.toUpperCase();
    const meta = CATALOG_FAMILY_META[brandName];
    const subModels = Array.isArray(entity.subModels) ? entity.subModels : [];
    const flow = specValue(entity.specs, [/deb/i, /kapasite/i, /hava/i, /flow/i]);
    const pressure = specValue(entity.specs, [/basın/i, /pressure/i, /pa/i]);

    items.push(
      buildItem(locale, productsDict, {
        id: brandName,
        name: brandName,
        type: trim(entity.label) || brandName,
        image: trim(entity.image) || meta?.image || "/images/products/marlin.png",
        leafSlug: meta?.leafSlug,
        description: trim(entity.desc),
        subModels,
        comingSoon: false,
        specFlow: trim(entity.specFlow) || flow,
        specPressure: trim(entity.specPressure) || pressure,
      }),
    );
  }

  return items;
}

function extractProducts(
  locale: string,
  categoryKey: string,
  block: Record<string, unknown>,
  productsDict: Record<string, unknown>,
): ProductCatalogItem[] {
  const products = block.products;
  if (Array.isArray(products) && products.length > 0) {
    return fromProductsArray(locale, productsDict, products as RawProductRow[]);
  }

  const accessories = block.accessories;
  if (Array.isArray(accessories) && accessories.length > 0) {
    return fromAccessories(locale, productsDict, accessories as AccessoryRow[]);
  }

  if (CATEGORY_ENTITY_KEYS[categoryKey]?.length) {
    return fromEntities(locale, categoryKey, productsDict, block);
  }

  // Fallback: tüm label içeren nesneler
  const fallback: ProductCatalogItem[] = [];
  for (const [key, val] of Object.entries(block)) {
    if (BLOCK_SKIP_KEYS.has(key)) continue;
    if (!val || typeof val !== "object" || Array.isArray(val)) continue;
    const entity = val as EntityRow;
    if (!trim(entity.label)) continue;
    const brandName = key.toUpperCase();
    const meta = CATALOG_FAMILY_META[brandName];
    fallback.push(
      buildItem(locale, productsDict, {
        id: brandName,
        name: meta ? brandName : trim(entity.label),
        type: trim(entity.label),
        image: meta?.image ?? "/images/products/marlin.png",
        leafSlug: meta?.leafSlug,
        description: trim(entity.desc),
        subModels: Array.isArray(entity.subModels) ? entity.subModels : [],
      }),
    );
  }
  return fallback;
}

function categorySubtitle(
  locale: string,
  block: Record<string, unknown>,
  title: string,
): string {
  const hero = [trim(block.heroDesc), trim(block.heroDescSuffix)].filter(Boolean).join(" ");
  if (hero) return hero;
  if (locale === "tr") {
    return `${title} ürün aileleri, modeller ve teknik dokümanlar.`;
  }
  return `${title} product families, models and technical documents.`;
}

function defaultDocs(locale: string, title: string): Pick<ProductCatalogPageData, "catalogs" | "guides"> {
  const tc = `/${locale}/teknik-merkez/dokuman-kutuphanesi`;
  const ui = getProductCatalogUi(locale as Locale);
  return {
    catalogs: [
      {
        id: "cat-cat",
        title: ui.docCatalogTitle.replace("{name}", title),
        meta: "PDF",
        href: tc,
        kind: "catalog",
      },
      {
        id: "cat-gen",
        title: ui.docGeneralCatalog,
        meta: "PDF",
        href: tc,
        kind: "catalog",
      },
    ],
    guides: [
      {
        id: "g1",
        title: ui.docInstallManual,
        meta: "Rev. 2024.2",
        href: tc,
        kind: "guide",
      },
      {
        id: "g2",
        title: ui.docDatasheets,
        meta: "PDF",
        href: tc,
        kind: "guide",
      },
    ],
  };
}

/** Panelden düzenlenen catalogs/guides dizisini okur; yoksa null (varsayılana düşülür). */
function readBlockDocs(
  raw: unknown,
  kind: "catalog" | "guide",
  fallbackHref: string,
): ProductCatalogPageData["catalogs"] | null {
  if (!Array.isArray(raw) || raw.length === 0) return null;
  const docs = raw
    .map((d, i) => {
      const o = (d ?? {}) as { title?: string; meta?: string; href?: string };
      const title = trim(o.title);
      if (!title) return null;
      return {
        id: `${kind}-${i}`,
        title,
        meta: trim(o.meta),
        href: trim(o.href) || fallbackHref,
        kind,
      };
    })
    .filter((d): d is NonNullable<typeof d> => d !== null);
  return docs.length > 0 ? docs : null;
}

export function getProductCategoryBySlug(slug: string) {
  return PRODUCT_CATEGORY_NAV.find((n) => n.slug === slug);
}

export function buildProductCatalogPage(
  locale: string,
  categoryKey: string,
  categorySlug: string,
  productsDict: Record<string, unknown>,
  categoryLabels: Record<string, string>,
): ProductCatalogPageData | null {
  const block = productsDict[categoryKey];
  if (!block || typeof block !== "object") return null;
  const obj = block as Record<string, unknown>;
  const title = trim(obj.title) || categoryLabels[categoryKey] || categoryKey;
  const products = withProductNumbers(extractProducts(locale, categoryKey, obj, productsDict));
  const docs = defaultDocs(locale, title);
  const tc = `/${locale}/teknik-merkez/dokuman-kutuphanesi`;
  const catalogs = readBlockDocs(obj.catalogs, "catalog", tc) ?? docs.catalogs;
  const guides = readBlockDocs(obj.guides, "guide", tc) ?? docs.guides;

  return {
    categoryKey,
    categorySlug,
    breadcrumbCategory: categoryLabels[categoryKey] ?? title,
    pageTitle: `${title.toLocaleUpperCase(locale === "tr" ? "tr-TR" : "en-US")} ${
      getProductCatalogUi(locale as Locale).pageProductsSuffix
    }`,
    pageSubtitle: categorySubtitle(locale, obj, title),
    categories: buildProductCatalogCategories(locale, categoryLabels, categorySlug),
    products,
    catalogs,
    guides,
    technicalCenterHref: tc,
    perfectusHref: "https://perfectusair.com/",
  };
}

/** @deprecated — `buildProductCatalogPage` kullanın */
export function buildAirMovementCatalog(
  locale: string,
  productsDict: Record<string, unknown>,
  categoryLabels: Record<string, string>,
  _raw: { title: string; products: RawProductRow[] },
): ProductCatalogPageData {
  const data = buildProductCatalogPage(
    locale,
    "havaHareketi",
    "hava-hareketi",
    productsDict,
    categoryLabels,
  );
  if (!data) {
    throw new Error("havaHareketi catalog missing");
  }
  return data;
}
