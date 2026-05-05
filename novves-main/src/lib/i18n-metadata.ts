import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { getDictionary, hasLocale } from "@/app/[locale]/dictionaries";

const BRAND = "Novves";

export type NavbarHubKey =
  | "products"
  | "services"
  | "solutions"
  | "corporate"
  | "technicalCenter";

/** Ürünler / Hizmetler / Çözümler / Kurumsal / Teknik Merkez liste sayfaları */
export async function navbarHubMetadata(
  locale: string,
  hub: NavbarHubKey
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
  return {
    title: `${titleMap[hub]} | ${BRAND}`,
    description: descMap[hub],
  };
}

function categoryDescription(obj: Record<string, unknown>): string {
  const parts = [obj.heroDesc, obj.heroDescSuffix].filter(
    (x): x is string => typeof x === "string" && x.length > 0
  );
  const joined = parts.join(" ").trim();
  if (joined) return joined;
  if (typeof obj.ctaDesc === "string" && obj.ctaDesc) return obj.ctaDesc;
  const tiger = obj.tiger as { desc?: string } | undefined;
  if (tiger?.desc) return tiger.desc;
  if (typeof obj.title === "string") return obj.title;
  return "";
}

/** Ürün kategori sayfaları (hava-hareketi, iklimlendirme, …) */
export async function productCategoryMetadata(
  locale: string,
  categoryKey: string
): Promise<Metadata> {
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale as Locale);
  const raw = dict.products[categoryKey as keyof typeof dict.products];
  if (!raw || typeof raw !== "object" || raw === null) return {};
  const obj = raw as Record<string, unknown>;
  const title = typeof obj.title === "string" ? obj.title : "";
  const description = categoryDescription(obj) || title;
  return { title: `${title} | ${BRAND}`, description };
}

/** Tek ürün ailesi sayfaları (banyo fanları, çatı fanları, …) */
export async function productLeafMetadata(
  locale: string,
  leafKey: string
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
  return { title: `${pageTitle} | ${BRAND}`, description };
}

/** Hizmet detay (services.json içindeki meta.title / meta.description) */
export async function serviceDetailMetadata(
  locale: string,
  serviceKey: string
): Promise<Metadata> {
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale as Locale);
  const svc = dict.services[serviceKey as keyof typeof dict.services] as
    | { meta?: { title: string; description: string } }
    | undefined;
  if (!svc?.meta) return {};
  return { title: svc.meta.title, description: svc.meta.description };
}

/** Teknik merkez alt sayfaları (technical.json meta) */
export async function technicalDetailMetadata(
  locale: string,
  technicalKey: string
): Promise<Metadata> {
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale as Locale);
  const page = dict.technical[technicalKey as keyof typeof dict.technical] as
    | { meta?: { title: string; description: string } }
    | undefined;
  if (!page?.meta) return {};
  return { title: page.meta.title, description: page.meta.description };
}

/** Kurumsal alt sayfaları (metaTitle / metaDescription) */
export async function corporateDetailMetadata(
  locale: string,
  corporateKey: string
): Promise<Metadata> {
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale as Locale);
  const page = dict.corporate[corporateKey as keyof typeof dict.corporate] as
    | { metaTitle?: string; metaDescription?: string }
    | undefined;
  if (!page?.metaTitle) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription ?? "",
  };
}

/** Çözüm detay sayfaları */
export async function solutionDetailMetadata(
  locale: string,
  solutionKey: string
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
  return { title: pageTitle, description };
}
