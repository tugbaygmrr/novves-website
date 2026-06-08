import { getSiteUrl } from "@/lib/seo/metadata";
import {
  NOVVES_HEAD_OFFICE_POSTAL,
  NOVVES_PRIMARY_LINKEDIN,
} from "@/lib/company/addresses";

export const ORGANIZATION_ID_SUFFIX = "/#organization";
export const WEBSITE_ID_SUFFIX = "/#website";

export const NOVVES_ORG = {
  name: "NOVVES",
  email: "info@novves.com",
  phone: "+90-216-467-47-52",
  logoPath: "/images/novves-footer-logo.svg",
  sameAs: [
    NOVVES_PRIMARY_LINKEDIN,
    "https://www.instagram.com/novves.turkiye/",
    "https://www.instagram.com/novves.global/",
  ],
  headOffice: NOVVES_HEAD_OFFICE_POSTAL,
} as const;

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export function absoluteSiteUrl(pathname: string): string {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${getSiteUrl()}${path}`;
}

export function organizationRef(siteUrl: string) {
  return { "@id": `${siteUrl}${ORGANIZATION_ID_SUFFIX}` };
}

export function buildOrganizationSchema(siteUrl: string) {
  return {
    "@type": "Organization",
    "@id": `${siteUrl}${ORGANIZATION_ID_SUFFIX}`,
    name: NOVVES_ORG.name,
    url: siteUrl,
    logo: absoluteSiteUrl(NOVVES_ORG.logoPath),
    email: NOVVES_ORG.email,
    telephone: NOVVES_ORG.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: NOVVES_ORG.headOffice.streetAddress,
      addressLocality: NOVVES_ORG.headOffice.addressLocality,
      addressRegion: NOVVES_ORG.headOffice.addressRegion,
      postalCode: NOVVES_ORG.headOffice.postalCode,
      addressCountry: NOVVES_ORG.headOffice.addressCountry,
    },
    sameAs: NOVVES_ORG.sameAs,
  };
}

export function buildWebSiteSchema(siteUrl: string, locale: string) {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}${WEBSITE_ID_SUFFIX}`,
    url: siteUrl,
    name: NOVVES_ORG.name,
    publisher: organizationRef(siteUrl),
    inLanguage: locale,
  };
}

export function buildBreadcrumbListSchema(items: BreadcrumbItem[]) {
  if (items.length === 0) return null;

  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteSiteUrl(item.path),
    })),
  };
}

export function buildFaqPageSchema(items: FaqItem[]) {
  const valid = items.filter((item) => item.question.trim() && item.answer.trim());
  if (valid.length === 0) return null;

  return {
    "@type": "FAQPage",
    mainEntity: valid.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export type ProductJsonLdInput = {
  name: string;
  description: string;
  url: string;
  image?: string;
  sku?: string;
  additionalProperties?: Array<{ name: string; value: string }>;
};

export function buildProductSchema(siteUrl: string, input: ProductJsonLdInput) {
  const description = input.description.trim().slice(0, 5000);
  if (!input.name.trim() || !description) return null;

  const schema: Record<string, unknown> = {
    "@type": "Product",
    name: input.name,
    description,
    url: input.url,
    brand: {
      "@type": "Brand",
      name: NOVVES_ORG.name,
    },
    manufacturer: organizationRef(siteUrl),
  };

  if (input.image) {
    schema.image = input.image.startsWith("http")
      ? input.image
      : absoluteSiteUrl(input.image);
  }

  if (input.sku) {
    schema.sku = input.sku;
  }

  if (input.additionalProperties?.length) {
    schema.additionalProperty = input.additionalProperties.map((prop) => ({
      "@type": "PropertyValue",
      name: prop.name,
      value: prop.value,
    }));
  }

  return schema;
}

export function humanizeSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export type NavSegmentLabels = {
  home: string;
  products: string;
  solutions: string;
  services: string;
  corporate: string;
  technicalCenter: string;
  contact: string;
  sustainability: string;
};

const STATIC_SEGMENT_LABELS: Record<string, (nav: NavSegmentLabels) => string> = {
  urunler: (nav) => nav.products,
  cozumler: (nav) => nav.solutions,
  hizmetler: (nav) => nav.services,
  kurumsal: (nav) => nav.corporate,
  "teknik-merkez": (nav) => nav.technicalCenter,
  iletisim: (nav) => nav.contact,
  surdurulebilirlik: (nav) => nav.sustainability,
  kvkk: () => "KVKK",
  legal: () => "Legal",
  privacy: () => "Privacy",
  terms: () => "Terms",
  cookies: () => "Cookies",
};

/** Build breadcrumb trail from pathname and localized hub labels. */
export function breadcrumbItemsFromPathname(
  pathname: string,
  labels: NavSegmentLabels,
): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length <= 1) return [];

  const locale = segments[0];
  const rest = segments.slice(1);
  const items: BreadcrumbItem[] = [{ name: labels.home, path: `/${locale}` }];

  let accumulated = `/${locale}`;
  for (let i = 0; i < rest.length; i++) {
    const segment = rest[i];
    accumulated += `/${segment}`;
    const resolver = STATIC_SEGMENT_LABELS[segment];
    const name =
      i === rest.length - 1 && !resolver
        ? humanizeSlug(segment)
        : resolver
          ? resolver(labels)
          : humanizeSlug(segment);
    items.push({ name, path: accumulated });
  }

  return items;
}

export function jsonLdGraph(...nodes: Array<Record<string, unknown> | null>) {
  const filtered = nodes.filter(Boolean) as Record<string, unknown>[];
  if (filtered.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@graph": filtered,
  };
}
