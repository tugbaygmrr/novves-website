import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { getDictionary, hasLocale } from "@/app/[locale]/dictionaries";
import { PRODUCT_CATEGORY_NAV, SOLUTION_NAV } from "@/lib/hub-nav-config";
import { withPageSeo } from "@/lib/seo/page-metadata";
import {
  CORPORATE_PATHS,
  KVKK_PATHS,
  NAVBAR_HUB_PATHS,
  PRODUCT_LEAF_PATHS,
  SERVICE_PATHS,
  SUSTAINABILITY_PATHS,
  TECHNICAL_PATHS,
  type NavbarHubKey,
} from "@/lib/seo/metadata-paths";

export type { NavbarHubKey } from "@/lib/seo/metadata-paths";

const BRAND = "Novves";

function pathFor(map: Record<string, string>, key: string): string | undefined {
  return map[key];
}

/** Urunler / Hizmetler / Cozumler / Kurumsal / Teknik Merkez liste sayfalari */
export async function navbarHubMetadata(
  locale: string,
  hub: NavbarHubKey,
): Promise<Metadata> {
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale as Locale);
  const nav = dict.common.navbar;
  const titleMap = {
    products: nav.products,
    services: nav.services,
    solutions: nav.solutions,
    corporate: nav.corporate,
    technicalCenter: nav.technicalCenter,
  };
  const descMap = {
    products: nav.productsDesc,
    services: nav.servicesDesc,
    solutions: nav.solutionsDesc,
    corporate: nav.corporateDesc,
    technicalCenter: nav.technicalCenterDesc,
  };
  return withPageSeo({
    locale,
    pathAfterLocale: NAVBAR_HUB_PATHS[hub],
    title: `${titleMap[hub]} | ${BRAND}`,
    description: descMap[hub],
  });
}

function categoryDescription(obj: Record<string, unknown>): string {
  const parts = [obj.heroDesc, obj.heroDescSuffix].filter(
    (x): x is string => typeof x === "string" && x.length > 0,
  );
  const joined = parts.join(" ").trim();
  if (joined) return joined;
  if (typeof obj.ctaDesc === "string" && obj.ctaDesc) return obj.ctaDesc;
  const tiger = obj.tiger as { desc?: string } | undefined;
  if (tiger?.desc) return tiger.desc;
  if (typeof obj.title === "string") return obj.title;
  return "";
}

/** Urun kategori sayfalari (hava-hareketi, iklimlendirme, …) */
export async function productCategoryMetadata(
  locale: string,
  categoryKey: string,
): Promise<Metadata> {
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale as Locale);
  const raw = dict.products[categoryKey as keyof typeof dict.products];
  if (!raw || typeof raw !== "object" || raw === null) return {};
  const obj = raw as Record<string, unknown>;
  const title = typeof obj.title === "string" ? obj.title : "";
  const description = categoryDescription(obj) || title;
  const slug = PRODUCT_CATEGORY_NAV.find((c) => c.key === categoryKey)?.slug;
  if (!slug) return { title: `${title} | ${BRAND}`, description };
  return withPageSeo({
    locale,
    pathAfterLocale: `urunler/${slug}`,
    title: `${title} | ${BRAND}`,
    description,
  });
}

/** Tek urun ailesi sayfalari (banyo fanlari, cati fanlari, …) */
export async function productLeafMetadata(
  locale: string,
  leafKey: string,
): Promise<Metadata> {
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale as Locale);
  const raw = dict.products[leafKey as keyof typeof dict.products];
  if (!raw || typeof raw !== "object" || raw === null) return {};
  const obj = raw as Record<string, unknown>;
  const title = typeof obj.title === "string" ? obj.title : "";
  const subtitle = typeof obj.subtitle === "string" ? obj.subtitle : "";
  const intro = typeof obj.intro === "string" ? obj.intro : "";
  const pageTitle = subtitle ? `${subtitle} — ${title}` : title;
  const description = (intro || subtitle || title).slice(0, 320);
  const pathAfterLocale = pathFor(PRODUCT_LEAF_PATHS, leafKey);
  if (!pathAfterLocale) {
    return { title: `${pageTitle} | ${BRAND}`, description };
  }
  return withPageSeo({
    locale,
    pathAfterLocale,
    title: `${pageTitle} | ${BRAND}`,
    description,
  });
}

/** Hizmet detay (services.json icindeki meta.title / meta.description) */
export async function serviceDetailMetadata(
  locale: string,
  serviceKey: string,
): Promise<Metadata> {
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale as Locale);
  const svc = dict.services[serviceKey as keyof typeof dict.services] as
    | { meta?: { title: string; description: string } }
    | undefined;
  if (!svc?.meta) return {};
  const pathAfterLocale = pathFor(SERVICE_PATHS, serviceKey);
  if (!pathAfterLocale) {
    return { title: svc.meta.title, description: svc.meta.description };
  }
  return withPageSeo({
    locale,
    pathAfterLocale,
    title: svc.meta.title,
    description: svc.meta.description,
  });
}

/** Teknik merkez alt sayfalari (technical.json meta) */
export async function technicalDetailMetadata(
  locale: string,
  technicalKey: string,
): Promise<Metadata> {
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale as Locale);
  const page = dict.technical[technicalKey as keyof typeof dict.technical] as
    | { meta?: { title: string; description: string } }
    | undefined;
  if (!page?.meta) return {};
  const pathAfterLocale = pathFor(TECHNICAL_PATHS, technicalKey);
  if (!pathAfterLocale) {
    return { title: page.meta.title, description: page.meta.description };
  }
  return withPageSeo({
    locale,
    pathAfterLocale,
    title: page.meta.title,
    description: page.meta.description,
  });
}

/** Kurumsal alt sayfalari (metaTitle / metaDescription) */
export async function corporateDetailMetadata(
  locale: string,
  corporateKey: string,
): Promise<Metadata> {
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale as Locale);
  const page = dict.corporate[corporateKey as keyof typeof dict.corporate] as
    | { metaTitle?: string; metaDescription?: string }
    | undefined;
  if (!page?.metaTitle) return {};
  const pathAfterLocale = pathFor(CORPORATE_PATHS, corporateKey);
  if (!pathAfterLocale) {
    return {
      title: page.metaTitle,
      description: page.metaDescription ?? "",
    };
  }
  return withPageSeo({
    locale,
    pathAfterLocale,
    title: page.metaTitle,
    description: page.metaDescription ?? "",
  });
}

/** Cozum detay sayfalari */
export async function solutionDetailMetadata(
  locale: string,
  solutionKey: string,
): Promise<Metadata> {
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale as Locale);
  const rec = dict.solutions as Record<string, Record<string, unknown>>;
  const s = rec[solutionKey];
  if (!s) return {};
  const titleLine1 = String(s.titleLine1 ?? "");
  const titleHighlight = String(s.titleHighlight ?? "");
  const title = [titleLine1, titleHighlight].filter(Boolean).join(" ").trim();
  const breadcrumbCurrent = String(s.breadcrumbCurrent ?? "");
  const pageTitle = title ? `${title} | ${BRAND}` : `${breadcrumbCurrent} | ${BRAND}`;
  const description = String(s.subtitle ?? "");
  const slug = SOLUTION_NAV.find((item) => item.key === solutionKey)?.slug;
  if (!slug) {
    return { title: pageTitle, description };
  }
  return withPageSeo({
    locale,
    pathAfterLocale: `cozumler/${slug}`,
    title: pageTitle,
    description,
  });
}

/** Surdurulebilirlik sayfalari */
export async function sustainabilityMetadata(
  locale: string,
  pageKey: keyof typeof SUSTAINABILITY_PATHS,
): Promise<Metadata> {
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale as Locale);
  const sectionKey =
    pageKey === "main" ? "main" : pageKey === "geriDonusum" ? "geriDonusum" : "co2";
  const page = dict.sustainability[sectionKey as keyof typeof dict.sustainability] as
    | { title?: string; quote?: string; introText?: string }
    | undefined;
  const title = page?.title ?? "";
  const description =
    (page && "quote" in page && page.quote) ||
    (page && "introText" in page && page.introText) ||
    title;
  const pathAfterLocale = SUSTAINABILITY_PATHS[pageKey];
  return withPageSeo({
    locale,
    pathAfterLocale,
    title: `${title} | ${BRAND}`,
    description: String(description).slice(0, 320),
  });
}

/** KVKK alt sayfalari */
export async function kvkkPageMetadata(
  locale: string,
  pageKey: keyof typeof KVKK_PATHS,
): Promise<Metadata> {
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale as Locale);
  const linkIndex =
    pageKey === "kisiselVerilerinKorunmasi"
      ? 0
      : pageKey === "guvenlikVeGizlilik"
        ? 2
        : 3;
  const link = dict.kvkk.links[linkIndex];
  const pathAfterLocale = KVKK_PATHS[pageKey];
  return withPageSeo({
    locale,
    pathAfterLocale,
    title: `${link?.title ?? dict.kvkk.title} | ${BRAND}`,
    description: link?.description ?? dict.kvkk.desc,
  });
}

/** Anasayfa */
export async function homeMetadata(locale: string): Promise<Metadata> {
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale as Locale);
  const hero = dict.home.hero;
  const pageTitle = [hero.titleLine1, hero.titleLine2].filter(Boolean).join(", ");
  return withPageSeo({
    locale,
    pathAfterLocale: "",
    title: `${pageTitle} | ${BRAND}`,
    description: hero.subtitle,
  });
}
