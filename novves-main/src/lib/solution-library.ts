import { SOLUTION_NAV } from "@/lib/hub-nav-config";
import { solutionStripPageProductMedia } from "@/lib/solution-strip-media";
import { solutionLibraryUi, type SolutionLibraryUi } from "@/lib/solution-library-ui";

export type SolutionLibrarySidebarChild = { label: string; href: string };
export type SolutionLibrarySidebarIcon = "fire" | "gas" | "archive";
export type SolutionLibrarySidebarRelated = {
  label: string;
  href: string;
  icon: SolutionLibrarySidebarIcon;
};
export type SolutionLibrarySidebarItem = {
  slug: string;
  label: string;
  children: SolutionLibrarySidebarChild[];
};

export type SolutionLibraryProduct = {
  id: string;
  name: string;
  description: string;
  image: string;
  href?: string;
  badge?: string;
};

export type SolutionLibraryDocument = {
  id: string;
  title: string;
  meta: string;
  href?: string;
  icon: "pdf" | "doc" | "bim" | "cert";
};

export type SolutionLibraryPageData = {
  slug: string;
  dictKey: string;
  ui: SolutionLibraryUi;
  heroImage: string;
  heroBadge: string | null;
  titleLine1: string;
  titleHighlight: string;
  subtitle: string;
  ctaPrimary: string;
  ctaPrimaryHref: string;
  ctaSecondary: string;
  ctaSecondaryHref: string;
  breadcrumbCurrent: string;
  breadcrumbCategory: string | null;
  sidebar: SolutionLibrarySidebarItem[];
  sidebarRelated: SolutionLibrarySidebarRelated[];
  products: SolutionLibraryProduct[];
  documents: SolutionLibraryDocument[];
  catalogHref: string;
  showDocumentation: boolean;
};

type RawLibraryProduct = {
  name: string;
  description?: string;
  desc?: string;
  image: string;
  href?: string;
  badge?: string;
};

type RawLibraryDocument = {
  title: string;
  meta: string;
  href?: string;
  icon?: SolutionLibraryDocument["icon"];
};

type RawLibrarySidebarComponent = {
  title?: string;
  label?: string;
  href?: string;
  anchor?: number;
};

type RawLibrarySidebarRelated = {
  label: string;
  href: string;
  icon?: SolutionLibrarySidebarIcon;
};

type RawLibrarySidebar = {
  components?: RawLibrarySidebarComponent[];
  related?: RawLibrarySidebarRelated[];
};

type RawSolution = {
  breadcrumbCurrent?: string;
  breadcrumbCategory?: string;
  badge?: string;
  titleLine1?: string;
  titleHighlight?: string;
  subtitle?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  ctaSecondaryHref?: string;
  systemComponents?: { title: string; desc: string }[];
  library?: {
    /** Mavi hero banner altındaki açıklama — `solutions.json` içinde siz doldurursunuz */
    bannerDescription?: string;
    heroBadge?: string | null;
    products?: RawLibraryProduct[];
    documents?: RawLibraryDocument[];
    sidebar?: RawLibrarySidebar;
  };
};

const DUMAN_SLUG = "duman-isi-tahliye-sistemleri";

/** Bileşen kartları — `library.products` yoksa slug bazlı görsel eşlemesi */
const SOLUTION_LIBRARY_COMPONENT_IMAGES: Record<string, readonly string[]> = {
  "konfor-iklimlendirme-sistemleri": [
    "/images/products/tiger-pre.png",
    "/images/products/caracal.png",
    "/images/products/dolphin-pre.png",
    "/images/products/koi-cb.png",
    "/images/products/alpaca-am.png",
    "/images/products/basinclandirma-kontrol-panosu.png",
  ],
  "hijyenik-filtrasyonlu-havalandirma": [
    "/images/products/tiger-pre.png",
    "/images/products/turtle-a.png",
    "/images/products/marlin.png",
    "/images/products/hound-crd.png",
    "/images/products/cyclone.png",
    "/images/products/diferansiyel-basinc-sensoru.png",
  ],
  "endustriyel-hava-yonetimi": [
    "/images/products/nautilus-cif-cidarli.png",
    "/images/products/marlin.png",
    "/images/products/heron-rv.png",
    "/images/products/owl-rer.jpg",
    "/images/products/koi-cb.png",
    "/images/products/basinclandirma-kontrol-panosu.png",
  ],
  "hayvancilik-tesisleri-icin-havalandirma-sistemleri": [
    "/images/products/chicken.png",
    "/images/products/owl-rer.jpg",
    "/images/products/heron-rv.png",
    "/images/products/marlin.png",
    "/images/products/alpaca-am.png",
    "/images/products/basinclandirma-kontrol-panosu.png",
  ],
  "trafo-enerji-odalari-fanlari": [
    "/images/products/owl-rer.jpg",
    "/images/products/heron-rv.png",
    "/images/products/koi-cb.png",
    "/images/products/alpaca-am.png",
    "/images/products/basinclandirma-kontrol-panosu.png",
    "/images/products/hound-al.png",
  ],
  "sera-tarimsal-havalandirma-sistemleri": [
    "/images/products/owl-rer.jpg",
    "/images/products/marlin.png",
    "/images/products/heron-rv.png",
    "/images/products/turtle-a.png",
    "/images/products/alpaca-am.png",
    "/images/products/basinclandirma-kontrol-panosu.png",
  ],
  "atex-patlama-koruma-cozumleri": [
    "/images/products/bear-lpf.png",
    "/images/products/bear-t.png",
    "/images/products/bear-reb.png",
    "/images/products/basinclandirma-kontrol-panosu.png",
    "/images/products/koi-cb.png",
    "/images/products/kanal-tipi-duman-sensoru.png",
  ],
  "akilli-otomasyon-ve-kontrol-sistemleri": [
    "/images/products/basinclandirma-kontrol-panosu.png",
    "/images/products/koi-cb.png",
    "/images/products/hound-crd.png",
    "/images/products/diferansiyel-basinc-sensoru.png",
    "/images/products/kanal-tipi-duman-sensoru.png",
    "/images/products/hound-al.png",
  ],
  "konut-tipi-havalandirma-sistemleri": [
    "/images/products/tiger-pre.png",
    "/images/products/banyo-fan-1.png",
    "/images/products/koi-cb.png",
    "/images/products/turtle-a.png",
    "/images/products/alpaca-am.png",
    "/images/products/basinclandirma-kontrol-panosu.png",
  ],
  "marin-offshore-havalandirma-sistemleri": [
    "/images/products/marlin.png",
    "/images/products/nautilus-cif-cidarli.png",
    "/images/products/hound-al.png",
    "/images/products/alpaca-am.png",
    "/images/products/bear-reb.png",
    "/images/products/basinclandirma-kontrol-panosu.png",
  ],
  "proje-bazli-ozel-imalatlar": [
    "/images/products/marlin.png",
    "/images/products/nautilus-cif-cidarli.png",
    "/images/products/dragonfly-c.png",
    "/images/products/bear-lpf.png",
    "/images/products/hound-al.png",
    "/images/products/yayli-titresim-izolatoru.png",
  ],
  "cfd-muhendislik-danismanligi": [
    "/images/products/dragonfly-c.png",
    "/images/products/dragonfly-jr.png",
    "/images/products/tiger-pre.png",
    "/images/products/nautilus-cif-cidarli.png",
    "/images/products/cyclone.png",
    "/images/products/marlin.png",
  ],
};

function buildSidebarChildren(
  activeSlug: string,
  slug: string,
  components: { title: string }[],
  libSidebar?: RawLibrarySidebar,
): SolutionLibrarySidebarChild[] {
  if (slug !== activeSlug) return [];
  const custom = libSidebar?.components;
  if (Array.isArray(custom) && custom.length > 0) {
    return custom.map((c, i) => ({
      label: (c.title ?? c.label ?? "").trim(),
      href: typeof c.href === "string" && c.href.length > 0 ? c.href : `#bilesen-${c.anchor ?? i}`,
    }));
  }
  return components.map((c, i) => ({
    label: c.title,
    href: `#bilesen-${i}`,
  }));
}

function buildSidebarRelated(
  locale: string,
  slug: string,
  ui: SolutionLibraryUi,
  libSidebar?: RawLibrarySidebar,
): SolutionLibrarySidebarRelated[] {
  const fromJson = libSidebar?.related;
  if (Array.isArray(fromJson) && fromJson.length > 0) {
    return fromJson.map((r) => ({
      label: r.label,
      href: r.href.startsWith("#") ? r.href : normalizeHref(locale, r.href),
      icon: r.icon ?? "archive",
    }));
  }
  if (slug !== DUMAN_SLUG) return [];
  return [
    { label: ui.sidebarFireDetection, href: "#bilesen-2", icon: "fire" },
    { label: ui.sidebarGasDetection, href: "#bolum-urunler", icon: "gas" },
    { label: ui.sidebarArchive, href: "#bolum-dokumantasyon", icon: "archive" },
  ];
}

export function getSolutionEntryBySlug(slug: string) {
  return SOLUTION_NAV.find((e) => e.slug === slug);
}

function mapLibraryProducts(
  slug: string,
  items: RawLibraryProduct[],
  locale: string,
): SolutionLibraryProduct[] {
  return items.map((p, i) => ({
    id: `${slug}-product-${i}`,
    name: p.name,
    description: p.description ?? p.desc ?? "",
    image: p.image,
    href: p.href ? normalizeHref(locale, p.href) : undefined,
    badge: p.badge,
  }));
}

function normalizeHref(locale: string, href: string): string {
  if (href.startsWith("http")) return href;
  const path = href.startsWith(`/${locale}/`) ? href : href.startsWith("/") ? `/${locale}${href}` : `/${locale}/${href}`;
  return path.replace(`/${locale}/${locale}/`, `/${locale}/`);
}

function mapComponentsToProducts(
  slug: string,
  components: { title: string; desc: string }[],
  thumbs: readonly string[],
  locale: string,
): SolutionLibraryProduct[] {
  const slugImages = SOLUTION_LIBRARY_COMPONENT_IMAGES[slug];
  return components.map((c, i) => ({
    id: `${slug}-product-${i}`,
    name: c.title,
    description: c.desc,
    image: slugImages?.[i] ?? thumbs[i % thumbs.length] ?? thumbs[0]!,
    href: undefined,
  }));
}

/** Ana sayfa çözüm şeridi (`home.solutionCarouselByHref`) → slug → kısa açıklama */
export function solutionCarouselDescriptionsBySlug(
  carousel: Record<string, { description?: string }> | undefined,
): Record<string, string> {
  if (!carousel) return {};
  const out: Record<string, string> = {};
  for (const [href, entry] of Object.entries(carousel)) {
    const slug = href.replace(/^\/cozumler\//, "").trim();
    const desc = typeof entry?.description === "string" ? entry.description.trim() : "";
    if (slug && desc) out[slug] = desc;
  }
  return out;
}

export function buildSolutionLibraryPageData(
  locale: string,
  slug: string,
  solutionsDict: Record<string, unknown>,
  sidebarDescriptionsBySlug?: Record<string, string>,
): SolutionLibraryPageData | null {
  const entry = getSolutionEntryBySlug(slug);
  if (!entry) return null;

  const solution = solutionsDict[entry.key] as RawSolution | undefined;
  if (!solution) return null;

  const ui = solutionLibraryUi(locale);
  const heroPath = `/cozumler/${slug}`;
  const media = solutionStripPageProductMedia[heroPath];
  const heroImage = media?.hero ?? "/images/page-hero/cozumler-main.jpg";
  const thumbs = media?.thumbnails ?? [
    "/images/products/dragonfly-c.png",
    "/images/products/hound-al.png",
    "/images/products/marlin.png",
  ];

  const components = Array.isArray(solution.systemComponents) ? solution.systemComponents : [];
  const lib = solution.library;

  const products: SolutionLibraryProduct[] =
    Array.isArray(lib?.products) && lib.products.length > 0
      ? mapLibraryProducts(slug, lib.products, locale)
      : mapComponentsToProducts(slug, components, thumbs, locale);

  const mappedDocs: SolutionLibraryDocument[] = Array.isArray(lib?.documents)
    ? lib.documents.map((d, i) => ({
        id: `${slug}-doc-${i}`,
        title: d.title,
        meta: d.meta,
        href: d.href ? normalizeHref(locale, d.href) : undefined,
        icon: d.icon ?? "pdf",
      }))
    : [];

  const documents: SolutionLibraryDocument[] =
    mappedDocs.length > 0
      ? mappedDocs
      : [
          {
            id: `${slug}-doc-catalog`,
            title: ui.docCatalog,
            meta: locale === "tr" ? "PDF • 14,2 MB" : "PDF • 14.2 MB",
            icon: "pdf" as const,
          },
          {
            id: `${slug}-doc-guidelines`,
            title: ui.docGuidelines,
            meta: locale === "tr" ? "PDF • 8,5 MB" : "PDF • 8.5 MB",
            icon: "doc" as const,
          },
          {
            id: `${slug}-doc-bim`,
            title: ui.docBim,
            meta: locale === "tr" ? "RFA • 22,1 MB" : "RFA • 22.1 MB",
            icon: "bim" as const,
          },
          {
            id: `${slug}-doc-cert`,
            title: ui.docCert,
            meta: locale === "tr" ? "PDF • 2,1 MB" : "PDF • 2.1 MB",
            icon: "cert" as const,
          },
        ];

  const showDocumentation = true;

  const name = solution.breadcrumbCurrent ?? entry.key;
  const heroBadge =
    typeof lib?.heroBadge === "string" && lib.heroBadge.trim().length > 0 ? lib.heroBadge.trim() : null;

  const activeSolution = solutionsDict[entry.key] as RawSolution | undefined;
  const activeComponents = Array.isArray(activeSolution?.systemComponents)
    ? activeSolution.systemComponents
    : [];
  const libSidebar = lib?.sidebar;

  const sidebar: SolutionLibrarySidebarItem[] = SOLUTION_NAV.map((e) => {
    const item = solutionsDict[e.key] as RawSolution | undefined;
    const label =
      typeof item?.breadcrumbCurrent === "string" && item.breadcrumbCurrent.length > 0
        ? item.breadcrumbCurrent
        : e.key;
    const itemLib = e.slug === slug ? libSidebar : item?.library?.sidebar;
    const components =
      e.slug === slug ? activeComponents : Array.isArray(item?.systemComponents) ? item.systemComponents : [];
    const children = buildSidebarChildren(slug, e.slug, components, itemLib);
    return { slug: e.slug, label, children };
  });

  const sidebarRelated = buildSidebarRelated(locale, slug, ui, libSidebar);

  const ctaSecondaryHref = solution.ctaSecondaryHref
    ? normalizeHref(locale, solution.ctaSecondaryHref)
    : `/${locale}/teknik-merkez/dokuman-kutuphanesi`;

  return {
    slug,
    dictKey: entry.key,
    ui,
    heroImage,
    heroBadge: heroBadge && heroBadge.trim().length > 0 ? heroBadge : null,
    titleLine1: solution.titleLine1 ?? name,
    titleHighlight: solution.titleHighlight ?? "",
    subtitle:
      typeof lib?.bannerDescription === "string" && lib.bannerDescription.trim().length > 0
        ? lib.bannerDescription.trim()
        : "",
    ctaPrimary: solution.ctaPrimary ?? ui.expertQuote,
    ctaPrimaryHref: `/${locale}/iletisim`,
    ctaSecondary: solution.ctaSecondary ?? ui.expertQuote,
    ctaSecondaryHref,
    breadcrumbCurrent: name,
    breadcrumbCategory:
      typeof solution.breadcrumbCategory === "string" && solution.breadcrumbCategory.trim().length > 0
        ? solution.breadcrumbCategory.trim()
        : null,
    sidebar,
    sidebarRelated,
    products,
    documents,
    showDocumentation,
    catalogHref: `/${locale}/urunler/hava-hareketi`,
  };
}

export function allSolutionSlugs(): string[] {
  return SOLUTION_NAV.map((e) => e.slug);
}
