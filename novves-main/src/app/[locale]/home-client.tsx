"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SectionStripLabel } from "@/components/carousel-strip-label";
import { ScrollVideoSection } from "@/components/scroll-video-section";
import { getHomeVideoStrings } from "@/components/home-video-i18n";
import {
  COOKIE_CONSENT_EVENT,
  isConsentRestrictedMinimal,
  parseStoredConsentJson,
  readCookieConsentRaw,
} from "@/lib/cookie-consent-storage";
import { PRODUCT_CATEGORY_NAV } from "@/lib/hub-nav-config";
import { productStripCategoryMedia } from "@/lib/product-strip-media";
import { solutionStripPageProductMedia } from "@/lib/solution-strip-media";

type CompanyProfileMilestoneIcon = "flag" | "chart" | "certificate" | "star" | "people";

type CompanyProfileMilestone = {
  year: string;
  title: string;
  body: string;
  image: string;
  icon?: CompanyProfileMilestoneIcon;
  /** Alternatif: tek image yerine 2-4 küçük logo grid'i (örn 2025: Microsoft, Autodesk, Vault) */
  logos?: string[];
};

type CompanyProfileGoalPillar = {
  title: string;
  body: string;
};

type CompanyProfileSection = {
  timelineIntro: string;
  timelineHeadlinePart1: string;
  timelineHeadlineEm1: string;
  timelineHeadlinePart2: string;
  timelineHeadlineEm2: string;
  timelineHeadlinePart3: string;
  milestones: CompanyProfileMilestone[];
  goalsTitle: string;
  goalsIntro: string;
  goalsPillars: CompanyProfileGoalPillar[];
  goalsAsideImage?: string;
  goalsAsideImageAlt?: string;
  bannerTitle: string;
  bannerLine1: string;
  bannerLine2: string;
  bannerLogoAlt: string;
};

type HomeDict = {
  hero: {
    badge: string;
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    titleLine3: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    heroImageAlt: string;
    heroLabel: string;
    stats: { value: string; label: string }[];
    endCard: {
      series: string;
      title: string;
      desc: string;
      spec1Value: string;
      spec1Label: string;
      spec2Value: string;
      spec2Label: string;
      spec3Value: string;
      spec3Label: string;
      cta: string;
      scroll: string;
    };
  };
  pillars: {
    tag: string;
    title: string;
    intro: string;
    items: { label: string; desc: string }[];
    /** Varsayılan `pageChrome.pillarCta` yerine bu satırın düğmesi */
    cta?: string;
    /** `/${locale}` ön eki ile birleştirilir; yoksa `pillarLinks` sırası */
    href?: string;
  }[];
  /** Mühendislik vitrininin üst metin bloğu (CFD) — yalnızca tanımlı dillerde gösterilir */
  engineeringShowcase?: {
    title: string;
    subtitle: string;
    body: string;
    cta: string;
  };
  /** Üç mühendislik adımı şeridi — başlık (yoksa `pageChrome.pillarsFallbackTitle`) */
  engineeringPillarsSection?: {
    title: string;
    subtitle: string;
    /** Başlığın altında tam genişlikte giriş paragrafı */
    lead?: string;
  };
  animation2: {
    startCard: {
      badge: string;
      titleLine1: string;
      titleLine2: string;
      titleLine3: string;
      subtitle: string;
    };
    endCard: {
      series: string;
      title: string;
      desc: string;
      spec1Value: string;
      spec1Label: string;
      spec2Value: string;
      spec2Label: string;
      spec3Value: string;
      spec3Label: string;
      cta: string;
    };
  };
  midCta: { title: string; desc: string; button: string };
  productCategories: {
    tag: string;
    title: string;
    desc: string;
    imagePlaceholder: string;
    items: { label: string }[];
  };
  video: {
    tag: string;
    title: string;
    desc: string;
    aboutUs: string;
    references: string;
    iframeTitle: string;
  };
  faq: {
    tag: string;
    title?: string;
    headline?: string;
    desc?: string;
    footerLinkHref?: string;
    footerLinkLabel?: string;
    footerLinkAriaLabel?: string;
    items: {
      q: string;
      a: string;
      linkHref?: string;
      linkLabel?: string;
      linkAriaLabel?: string;
    }[];
  };
  finalCta: {
    tag: string;
    title: string;
    desc: string;
    requestQuote: string;
    callBack?: string;
    stat1Label?: string;
    stat1Value?: string;
    stat2Label?: string;
    stat2Value?: string;
    image?: string;
  };
  /** Yerelleştirilmiş ana sayfa etiketleri — tüm dillerde home.json içinde olmalı */
  pageChrome?: Record<string, string>;
  solutionCarouselByHref?: Record<string, { title: string; description: string }>;
  productCategoryBlurbs?: string[];
  productCategoryFeatures?: string[][];
  catalogPreview?: { title: string; href: string; image: string; desc?: string }[];
  referencePreview?: {
    title: string;
    href: string;
    image: string;
    /** Sektör başlığı (renkli blokta kalın) — yoksa `title` kullanılır */
    sector?: string;
    /** Örnek proje adı */
    example?: string;
    /** Sayısal özet (örn. "3"); `referenceProjectWord` ile birleştirilir */
    projectCount?: string;
    theme?: "orange" | "sky" | "emerald" | "zinc";
  }[];
  certificatePreview?: { title: string; href: string; image: string; desc?: string }[];
  /** Yeni şirket profili düzeni (zaman çizelgesi + hedefler + banner); yoksa `companyProfileCards` kullanılır */
  companyProfileSection?: CompanyProfileSection;
  companyProfileCards?: { title: string; href: string; image: string }[];
  /** Anasayfa çözüm/ürün şerit kartları — her kartta 3 özellik (başlık + kısa açıklama). */
  homeBands?: {
    solutionStripFeatureRows?: { label: string; desc: string }[][];
    productStripFeatureRows?: { label: string; desc: string }[][];
  };
};

/** Navbar + paylaşılan metinler (ana sayfa dikey şeritler için) */
type HomeCommonNav = {
  navbar: {
    solutions: string;
    products: string;
    corporate: string;
    viewAll: string;
    links: {
      documentLibrary: string;
      references: string;
      certificates: string;
    };
  };
};

/** Eksik alanlar boş — başka dilden metin doldurulmaz; metinler ilgili locale home.json içinde olmalı */
const EMPTY_COMMON_NAV: HomeCommonNav = {
  navbar: {
    solutions: "",
    products: "",
    corporate: "",
    viewAll: "",
    links: {
      documentLibrary: "",
      references: "",
      certificates: "",
    },
  },
};

function mergeHomeCommon(raw?: HomeCommonNav | null): HomeCommonNav {
  if (!raw?.navbar) return EMPTY_COMMON_NAV;
  const nb = raw.navbar;
  const lk = nb.links ?? {
    documentLibrary: "",
    references: "",
    certificates: "",
  };
  return {
    navbar: {
      solutions: nb.solutions ?? "",
      products: nb.products ?? "",
      corporate: nb.corporate ?? "",
      viewAll: nb.viewAll ?? "",
      links: {
        documentLibrary: lk.documentLibrary ?? "",
        references: lk.references ?? "",
        certificates: lk.certificates ?? "",
      },
    },
  };
}

/** Ana sayfa chrome — yalnızca seçilen dilin home.json → pageChrome */
type PageChrome = {
  catalogsVertical: string;
  previousSolutions: string;
  nextSolutions: string;
  previousProducts: string;
  nextProducts: string;
  defaultSolutionDesc: string;
  productFallbackDesc: string;
  catalogKindLabel: string;
  catalogCardDesc: string;
  referenceEyebrow: string;
  referenceCardDesc: string;
  /** @deprecated Yeni düzen: `referenceBySectorKicker` + `referenceBySectorHeadline` — yoksa yedek */
  referenceBySectorTitle: string;
  /** Sol dikey başlık (lacivert) — boşsa navbar “Referanslar” metni */
  referenceStripVertical: string;
  /** Ana blok üst satır — küçük, normal ağırlık */
  referenceBySectorKicker: string;
  /** Ana blok alt satır — büyük, kalın */
  referenceBySectorHeadline: string;
  referenceProjectWord: string;
  referenceExploreCta: string;
  certificateEyebrow: string;
  certificateCardDesc: string;
  companyEyebrow: string;
  companyCardDesc: string;
  companyProfileVertical: string;
  pillarExpandAria: string;
  pillarCollapseAria: string;
  pillarCta: string;
  /** Katalog kartı turuncu CTA (örn. İncele) */
  catalogCardCta: string;
  productCardCta: string;
  solutionCardCta: string;
  videoStatMeta: string;
  scrollVideoSideLabel: string;
  engineeringAlt1: string;
  engineeringAlt2: string;
  pillarsFallbackTitle: string;
};

function pageChromeFromDict(dict: HomeDict): PageChrome {
  const o = dict.pageChrome ?? {};
  const g = (k: keyof PageChrome) => String((o as Partial<Record<string, string>>)[k as string] ?? "");
  return {
    catalogsVertical: g("catalogsVertical"),
    previousSolutions: g("previousSolutions"),
    nextSolutions: g("nextSolutions"),
    previousProducts: g("previousProducts"),
    nextProducts: g("nextProducts"),
    defaultSolutionDesc: g("defaultSolutionDesc"),
    productFallbackDesc: g("productFallbackDesc"),
    catalogKindLabel: g("catalogKindLabel"),
    catalogCardDesc: g("catalogCardDesc"),
    referenceEyebrow: g("referenceEyebrow"),
    referenceCardDesc: g("referenceCardDesc"),
    referenceBySectorTitle: g("referenceBySectorTitle"),
    referenceStripVertical: g("referenceStripVertical"),
    referenceBySectorKicker: g("referenceBySectorKicker"),
    referenceBySectorHeadline: g("referenceBySectorHeadline"),
    referenceProjectWord: g("referenceProjectWord"),
    referenceExploreCta: g("referenceExploreCta"),
    certificateEyebrow: g("certificateEyebrow"),
    certificateCardDesc: g("certificateCardDesc"),
    companyEyebrow: g("companyEyebrow"),
    companyCardDesc: g("companyCardDesc"),
    companyProfileVertical: g("companyProfileVertical"),
    pillarExpandAria: g("pillarExpandAria"),
    pillarCollapseAria: g("pillarCollapseAria"),
    pillarCta: g("pillarCta"),
    catalogCardCta: g("catalogCardCta"),
    productCardCta: g("productCardCta"),
    solutionCardCta: g("solutionCardCta"),
    videoStatMeta: g("videoStatMeta"),
    scrollVideoSideLabel: g("scrollVideoSideLabel"),
    engineeringAlt1: g("engineeringAlt1"),
    engineeringAlt2: g("engineeringAlt2"),
    pillarsFallbackTitle: g("pillarsFallbackTitle"),
  };
}

function referenceSectorHeadings(pc: PageChrome, navReferences: string) {
  const vertical = pc.referenceStripVertical.trim() || navReferences.trim();
  const kicker = pc.referenceBySectorKicker.trim();
  let headline = pc.referenceBySectorHeadline.trim();
  if (!headline) {
    headline = (pc.referenceBySectorTitle || navReferences).trim();
  }
  return { vertical, kicker, headline };
}

const pillarImages = [
  "/images/pillars/pillar-01-muhendislik-tasarim.png?v=20260512-2",
  "/images/pillars/pillar-02-uretim-saha.png?v=20260512-1",
  "/images/pillars/pillar-03-saha-uygulama.png?v=20260512-1",
];

/** Pillar göründüğünde Image yerine player olarak render edilecek videolar. */
const pillarVideos: Record<number, { src: string; poster: string } | undefined> = {
  0: {
    src: "/video/engineering-pillar-01.mp4",
    poster: "/video/engineering-pillar-01-poster.jpg",
  },
  1: {
    src: "/video/engineering-pillar-02.mp4",
    poster: "/video/engineering-pillar-02-poster.jpg",
  },
  2: {
    src: "/video/engineering-pillar-03.mp4",
    poster: "/video/engineering-pillar-03-poster.jpg",
  },
};

/** Pillars sol vitrin — `v` değiştir: CDN/tarayıcı önbelleği kırılır */
const ENGINEERING_COLLAGE_ASSET_V = "20260511-1";
const engineeringCollage = {
  primaryVideo: `/video/novves-product-lineup.mp4?v=${ENGINEERING_COLLAGE_ASSET_V}`,
} as const;

/** Pillar card “Detayları İncele” targets — engineering / products / services */
const pillarLinks = ["/cozumler", "/urunler", "/hizmetler"] as const;

const productCategoryMeta = [
  {
    href: "/urunler/hava-hareketi",
    image: "/images/products/dragonfly-c.png",
    thumbs: ["/images/products/dragonfly-c.png", "/images/products/marlin.png", "/images/products/hound-al.png"],
  },
  {
    href: "/urunler/iklimlendirme",
    image: "/images/products/tiger-pre.png",
    thumbs: ["/images/products/tiger-pre.png", "/images/products/hound-al.png", "/images/products/marlin.png"],
  },
  {
    href: "/urunler/sogutma-ve-isitma",
    image: "/images/products/marlin.png",
    thumbs: ["/images/products/marlin.png", "/images/products/tiger-pre.png", "/images/products/dragonfly-c.png"],
  },
  {
    href: "/urunler/hava-yonetimi",
    image: "/images/products/hound-al.png",
    thumbs: ["/images/products/hound-al.png", "/images/products/dragonfly-c.png", "/images/products/tiger-pre.png"],
  },
  {
    href: "/urunler/hava-dagitimi",
    image: "/images/products/hound-al.png",
    thumbs: ["/images/products/hound-al.png", "/images/products/marlin.png", "/images/products/tiger-pre.png"],
  },
  {
    href: "/urunler/hava-filtrasyonu",
    image: "/images/products/marlin.png",
    thumbs: ["/images/products/marlin.png", "/images/products/dragonfly-c.png", "/images/products/hound-al.png"],
  },
  {
    href: "/urunler/aksesuarlar",
    image: "/images/products/hound-al.png",
    thumbs: ["/images/products/hound-al.png", "/images/products/basinclandirma-kontrol-panosu.png", "/images/products/dragonfly-c.png"],
  },
  {
    href: "/urunler/otomasyon-malzemeleri",
    image: "/images/products/basinclandirma-kontrol-panosu.png",
    thumbs: ["/images/products/basinclandirma-kontrol-panosu.png", "/images/products/marlin.png", "/images/products/hound-al.png"],
  },
  {
    href: "/urunler/titresim-ve-ses-izolasyon",
    image: "/images/products/yayli-titresim-izolatoru.png",
    thumbs: ["/images/products/yayli-titresim-izolatoru.png", "/images/products/basinclandirma-kontrol-panosu.png", "/images/products/hound-al.png"],
  },
] as const;

/** `home.json` eksik kalsa bile şeritte tüm hub kategorileri görünsün */
function productSlugToFallbackLabel(slug: string): string {
  return slug
    .split("-")
    .map((part) => (part ? part.charAt(0).toUpperCase() + part.slice(1) : ""))
    .join(" ");
}

/** Ürün kartı numarası — belirgin turuncu gradient */
const PRODUCT_CARD_NUM_GRADIENT =
  "linear-gradient(180deg, #ffb884 0%, #f07838 42%, #ef5f17 72%, #d94e10 100%)";
/** Ürün kartı CTA — mockup şeftali/turuncu */
const PRODUCT_CARD_CTA_COLOR = "#e8956f";
/** Çözüm / ürün şeridi: lg+ ok beş kartlık sayfa */
const SOLUTION_STRIP_PAGE_CARD_COUNT = 5;
const PRODUCT_STRIP_PAGE_CARD_COUNT = 5;

function stripActiveCardIndex(container: HTMLElement, cards: readonly HTMLElement[]) {
  const edge = container.getBoundingClientRect().left;
  let bestIdx = 0;
  let bestDist = Infinity;
  for (let i = 0; i < cards.length; i++) {
    const dist = Math.abs(cards[i]!.getBoundingClientRect().left - edge);
    if (dist < bestDist) {
      bestDist = dist;
      bestIdx = i;
    }
  }
  return bestIdx;
}

function scrollHorizontalStrip(
  container: HTMLElement | null,
  cardSelector: string,
  direction: "prev" | "next",
  desktopPageCardCount: number,
) {
  if (!container) return;
  const cards = Array.from(container.querySelectorAll(cardSelector)).filter(
    (el): el is HTMLElement => el instanceof HTMLElement && el.parentElement === container,
  );
  if (!cards.length) return;

  const isDesktop =
    typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;
  const stepCount = isDesktop ? desktopPageCardCount : 1;
  const currentIdx = stripActiveCardIndex(container, cards);

  const targetIdx =
    direction === "next"
      ? Math.min(cards.length - 1, currentIdx + stepCount)
      : Math.max(0, currentIdx - stepCount);

  if (targetIdx === currentIdx) return;

  const target = cards[targetIdx]!;
  const delta = target.getBoundingClientRect().left - container.getBoundingClientRect().left;

  if (Math.abs(delta) > 1) {
    container.scrollBy({ left: delta, behavior: "smooth" });
    return;
  }

  target.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
}

/** Çözüm carousel — metinler locale home.json içindeki solutionCarouselByHref */
type SolutionBandSlide = {
  href: string;
  image: string;
  heroImage?: string;
  thumbnails?: readonly [string, string, string];
};

/** Şerit sırası: 01–13 numaralandırma — kullanıcı tarafından belirlenen düzen */
const SOLUTION_STRIP_HREFS = [
  "/cozumler/duman-isi-tahliye-sistemleri",
  "/cozumler/konfor-iklimlendirme-sistemleri",
  "/cozumler/hijyenik-filtrasyonlu-havalandirma",
  "/cozumler/endustriyel-hava-yonetimi",
  "/cozumler/hayvancilik-tesisleri-icin-havalandirma-sistemleri",
  "/cozumler/trafo-enerji-odalari-fanlari",
  "/cozumler/sera-tarimsal-havalandirma-sistemleri",
  "/cozumler/atex-patlama-koruma-cozumleri",
  "/cozumler/akilli-otomasyon-ve-kontrol-sistemleri",
  "/cozumler/marin-offshore-havalandirma-sistemleri",
  "/cozumler/konut-tipi-havalandirma-sistemleri",
  "/cozumler/proje-bazli-ozel-imalatlar",
  "/cozumler/cfd-muhendislik-danismanligi",
] as const;

const solutionCategorySlides: SolutionBandSlide[] = SOLUTION_STRIP_HREFS.map((href) => {
  const m = solutionStripPageProductMedia[href];
  if (!m) {
    throw new Error(`solutionStripPageProductMedia eksik: ${href}`);
  }
  return {
    href,
    image: m.thumbnails[0],
    heroImage: m.hero,
    thumbnails: [m.thumbnails[0], m.thumbnails[1], m.thumbnails[2]] as const,
  };
});

const homeSolutionBandSlides = solutionCategorySlides;

function HomeMarketStripBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-sand-100" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_-5%,rgba(0,56,107,0.06),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_100%_100%,rgba(239,95,23,0.05),transparent_52%)]" />
    </div>
  );
}

type SolutionLeadIconKind =
  | "duman"
  | "konfor"
  | "hijyen"
  | "endustri"
  | "atex"
  | "hayvancilik"
  | "trafo"
  | "sera"
  | "otomasyon"
  | "konut"
  | "marin"
  | "ozel"
  | "cfd"
  | "default";

function solutionLeadIconFromHref(href: string): SolutionLeadIconKind {
  if (href.includes("duman-isi")) return "duman";
  if (href.includes("konfor-iklim")) return "konfor";
  if (href.includes("hijyenik")) return "hijyen";
  if (href.includes("endustriyel-hava")) return "endustri";
  if (href.includes("atex")) return "atex";
  if (href.includes("hayvancilik")) return "hayvancilik";
  if (href.includes("trafo-enerji")) return "trafo";
  if (href.includes("sera-tarimsal")) return "sera";
  if (href.includes("akilli-otomasyon")) return "otomasyon";
  if (href.includes("konut-tipi")) return "konut";
  if (href.includes("marin-offshore")) return "marin";
  if (href.includes("proje-bazli")) return "ozel";
  if (href.includes("cfd-muhendislik")) return "cfd";
  return "default";
}

function SolutionShowcaseLeadIconByKind({ kind, inverted }: { kind: SolutionLeadIconKind; inverted?: boolean }) {
  const cls = inverted ? "h-6 w-6 shrink-0 text-white" : "h-6 w-6 shrink-0 text-primary";
  const sw = 1.65;
  switch (kind) {
    case "duman":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 2.5c-1.8 3.2-5.5 5.2-5.5 10.5a5.5 5.5 0 1011 0c0-5.3-3.7-7.3-5.5-10.5z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v4M10.5 17h3" />
        </svg>
      );
    case "konfor":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} aria-hidden>
          <circle cx="12" cy="12" r="3.5" />
          <path strokeLinecap="round" d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4" />
        </svg>
      );
    case "hijyen":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
        </svg>
      );
    case "endustri":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11z"
          />
          <path
            strokeLinecap="round"
            d="M12 2v2.5M12 19.5V22M4.5 12H2M22 12h-2.5M5.6 5.6L4 4M20 20l-1.6-1.6M5.6 18.4L4 20M20 4l-1.6 1.6"
          />
        </svg>
      );
    case "atex":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8.66 15H3.34L12 3z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4M12 17h.01" />
        </svg>
      );
    case "hayvancilik":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 14c2-3 5-4 8-4s6 1 8 4M6 14v3M18 14v3" />
          <path strokeLinecap="round" d="M8 10h2M14 10h2" />
        </svg>
      );
    case "trafo":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      );
    case "sera":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19c-3 0-6-2-6-5s3-5 6-5 6 2 6 5-3 5-6 5z" />
          <path strokeLinecap="round" d="M12 9V5M9 7l3-3 3 3" />
        </svg>
      );
    case "otomasyon":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} aria-hidden>
          <rect x="4" y="4" width="6" height="6" rx="1" />
          <rect x="14" y="4" width="6" height="6" rx="1" />
          <rect x="4" y="14" width="6" height="6" rx="1" />
          <rect x="14" y="14" width="6" height="6" rx="1" />
        </svg>
      );
    case "konut":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 10l8-6 8 6v10a1 1 0 01-1 1H5a1 1 0 01-1-1V10z" />
          <path strokeLinecap="round" d="M9 21v-6h6v6" />
        </svg>
      );
    case "marin":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 22V12" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12H2a10 10 0 0020 0h-3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 12V9a3 3 0 116 0v3" />
        </svg>
      );
    case "ozel":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
        </svg>
      );
    case "cfd":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 19V5M4 19h16M8 15l3-4 3 2 4-6" />
        </svg>
      );
    default:
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h6v6H4V7zM14 5h6v8h-6V5zM4 17h16v2H4v-2z" />
        </svg>
      );
  }
}

const COMPANY_PROFILE_NAVY = "#1e3a5f";

function CompanyProfileGoalPillarIcon({ index }: { index: number }) {
  const cls = "h-6 w-6 shrink-0";
  const sw = 1.65;
  const stroke = COMPANY_PROFILE_NAVY;
  const i = index % 4;
  if (i === 0) {
    // Fan / smoke evacuation: turbine blades
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth={sw} />
        <path
          d="M12 12c0-3 1-6 4-7-1 4-2 6-4 7zM12 12c3 0 6 1 7 4-4-1-6-2-7-4zM12 12c0 3-1 6-4 7 1-4 2-6 4-7zM12 12c-3 0-6-1-7-4 4 1 6 2 7 4z"
          stroke={stroke}
          strokeWidth={sw}
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="1.4" fill={stroke} />
      </svg>
    );
  }
  if (i === 1) {
    // AHU / air handling: box with airflow lines
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="7" width="13" height="10" rx="1.5" stroke={stroke} strokeWidth={sw} />
        <path
          d="M6 10c1.5-1 3 0 4.5-1M6 14c1.5 1 3 0 4.5 1"
          stroke={stroke}
          strokeWidth={sw}
          strokeLinecap="round"
        />
        <path d="M18 9.5h3M18 12h3M18 14.5h3" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      </svg>
    );
  }
  if (i === 2) {
    // High-tech motor: motor cylinder with cooling fins and shaft
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="4" y="8" width="12" height="8" rx="1" stroke={stroke} strokeWidth={sw} />
        <path
          d="M6 8V6M9 8V6M12 8V6M14 8V6M6 18v-2M9 18v-2M12 18v-2M14 18v-2"
          stroke={stroke}
          strokeWidth={sw}
          strokeLinecap="round"
        />
        <path d="M16 12h4" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <circle cx="21" cy="12" r="1.4" stroke={stroke} strokeWidth={sw} />
      </svg>
    );
  }
  // R&D, test & digital: monitor with CFD/chart curve
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="4" width="18" height="13" rx="1.5" stroke={stroke} strokeWidth={sw} />
      <path
        d="M6 14c2-1 3-4 5-4s3 3 5 1 2-4 2-4"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 21h6M12 17v4" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
    </svg>
  );
}

function HomeCompanyProfileGoalsTargetIcon() {
  const stroke = COMPANY_PROFILE_NAVY;
  return (
    <svg className="h-7 w-7 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth={1.75} />
      <circle cx="12" cy="12" r="4" stroke={stroke} strokeWidth={1.75} />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2" stroke={stroke} strokeWidth={1.75} strokeLinecap="round" />
    </svg>
  );
}

function HomeCompanyProfileSectionBlock({
  locale,
  verticalLabel,
  section,
  viewAllCorporate,
}: {
  locale: string;
  verticalLabel: string;
  section: CompanyProfileSection;
  viewAllCorporate: string;
}) {
  const navy = "text-[#1e3a5f]";
  const goalsAsideRaw = (section.goalsAsideImage ?? "").trim();
  const goalsAsidePath = goalsAsideRaw.split("?")[0] || goalsAsideRaw;

  return (
    <div id="company-profile" className="relative mt-14 scroll-mt-24 sm:mt-16 md:scroll-mt-[5.5rem] lg:mt-[4.5rem]">
      <div className="rounded-[1.35rem] border border-[#1e3a5f]/[0.08] bg-sand-100 px-4 py-10 shadow-[0_20px_56px_-40px_rgba(15,22,36,0.18)] ring-1 ring-black/[0.03] sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[auto_minmax(0,1fr)] lg:items-start lg:gap-x-10 lg:gap-y-0">
            <div className="flex w-full justify-center self-start lg:sticky lg:top-28 lg:justify-start lg:pt-1">
              <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 lg:items-stretch lg:justify-start lg:gap-5">
                <div
                  className="h-0.5 w-11 shrink-0 rounded-full bg-primary sm:w-12 lg:h-auto lg:w-0.5 lg:self-stretch"
                  aria-hidden
                />
                <span
                  className={`max-lg:text-left text-[13px] font-bold uppercase leading-snug tracking-[0.2em] antialiased sm:text-[15px] lg:text-center lg:text-[18px] lg:leading-none lg:tracking-[0.22em] xl:text-metric-sm lg:[text-orientation:mixed] lg:[writing-mode:vertical-rl] lg:rotate-180 ${navy}`}
                >
                  {verticalLabel}
                </span>
              </div>
            </div>

            <div className="min-w-0 space-y-12 sm:space-y-14 lg:space-y-16">
              {/* Zaman çizelgesi */}
              <section aria-labelledby="company-profile-timeline-heading">
                <p className={`max-w-[52ch] text-meta leading-relaxed text-ink/75 sm:text-[15px] ${navy}`}>
                  {section.timelineIntro}
                </p>
                <h2
                  id="company-profile-timeline-heading"
                  className={`mt-4 max-w-[40ch] text-balance font-display text-card-sm font-bold leading-snug tracking-[-0.02em] lg:leading-[1.2] ${navy}`}
                >
                  {section.timelineHeadlinePart1}
                  <span className="font-extrabold">{section.timelineHeadlineEm1}</span>
                  {section.timelineHeadlinePart2}
                  <span className="font-extrabold">{section.timelineHeadlineEm2}</span>
                  {section.timelineHeadlinePart3}
                </h2>

                <div className="relative mt-10 lg:mt-12">
                  <div
                    className="pointer-events-none absolute left-[6%] right-[4%] top-[22px] z-0 hidden h-[2px] bg-[#1e3a5f] lg:block"
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute right-[3%] top-[17px] z-0 hidden h-0 w-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-[#1e3a5f] lg:block"
                    aria-hidden
                  />

                  <ul className="grid gap-10 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-7 lg:gap-3">
                    {section.milestones.map((m, index) => {
                      return (
                        <li key={`${m.year}-${m.title}`} className="relative z-[1] flex flex-col items-center text-center">
                          <div className="mb-3 flex h-11 items-center justify-center rounded-full border-2 border-[#1e3a5f] bg-sand-100 px-3 shadow-sm">
                            <span className={`font-mono-eng text-fine font-bold tracking-[0.08em] ${navy}`}>{m.year}</span>
                          </div>
                          <div className="relative mb-3 w-full overflow-hidden rounded-lg border border-[#1e3a5f]/10 bg-white shadow-sm">
                            <div className="relative aspect-[4/3] w-full">
                              {m.logos && m.logos.length > 0 ? (
                                <div className={`absolute inset-0 grid gap-1.5 p-2 bg-[#f4f4ea] ${m.logos.length <= 2 ? "grid-cols-2" : "grid-cols-2 grid-rows-2"}`}>
                                  {m.logos.map((logo, i) => (
                                    <div
                                      key={i}
                                      className={`relative flex items-center justify-center rounded-md border border-[#1e3a5f]/10 bg-white p-2 shadow-[0_2px_6px_-3px_rgba(15,22,36,0.18)] ${
                                        m.logos!.length === 3 && i === 2 ? "col-span-2" : ""
                                      }`}
                                    >
                                      <Image
                                        src={logo}
                                        alt=""
                                        fill
                                        className="object-contain p-2"
                                        sizes="(max-width: 640px) 44vw, (max-width: 1024px) 20vw, 9vw"
                                      />
                                    </div>
                                  ))}
                                </div>
                              ) : (() => {
                                const isLogo = m.image.includes("logo");
                                const fit = isLogo ? "object-contain" : "object-cover";
                                const pos = isLogo ? "object-center" : index === 4 ? "object-left" : "object-center";
                                return (
                                  <Image
                                    src={m.image}
                                    alt=""
                                    fill
                                    className={`${fit} ${pos} ${isLogo ? "p-3" : ""}`}
                                    sizes="(max-width: 640px) 88vw, (max-width: 1024px) 40vw, 18vw"
                                  />
                                );
                              })()}
                            </div>
                          </div>
                          <p className={`text-[15px] font-bold leading-snug ${navy}`}>{m.title}</p>
                          <p className="mt-1.5 max-w-[28ch] text-[13px] leading-relaxed text-ink/68 sm:text-meta">
                            {m.body}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </section>

              {/* Gelecek hedefleri */}
              <section
                className="overflow-hidden rounded-2xl border border-[#1e3a5f]/10 bg-white/70 p-6 shadow-[0_16px_48px_-36px_rgba(15,22,36,0.2)] sm:p-8 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)] lg:items-center lg:gap-10"
                aria-labelledby="company-profile-goals-heading"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <HomeCompanyProfileGoalsTargetIcon />
                    <h3 id="company-profile-goals-heading" className={`text-2xl font-bold uppercase tracking-[0.12em] sm:text-3xl ${navy}`}>
                      {section.goalsTitle}
                    </h3>
                  </div>
                  <p className={`mt-4 text-body leading-relaxed text-ink/72 sm:text-[18px] ${navy}`}>
                    {section.goalsIntro}
                  </p>
                  <ul className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-8">
                    {section.goalsPillars.map((p, i) => (
                      <li key={p.title} className="flex gap-3 text-left sm:gap-4">
                        <div className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#1e3a5f]/12 bg-sand-100">
                          <CompanyProfileGoalPillarIcon index={i} />
                        </div>
                        <div>
                          <p className={`text-[18px] font-bold leading-snug ${navy}`}>{p.title}</p>
                          <p className="mt-1 text-[15px] leading-relaxed text-ink/68 sm:text-body">{p.body}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                {goalsAsidePath ? (
                  <div className="relative mx-auto mt-8 aspect-[7/10] w-full max-w-[340px] overflow-hidden rounded-xl border border-[#1e3a5f]/8 lg:mx-0 lg:mt-0 lg:max-w-none lg:self-center">
                    <Image
                      key={goalsAsideRaw || goalsAsidePath}
                      src={goalsAsidePath}
                      alt={section.goalsAsideImageAlt ?? ""}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 92vw, 340px"
                    />
                  </div>
                ) : null}
              </section>

              {/* Alt banner — vizyon */}
              <section
                aria-labelledby="company-profile-banner-heading"
                className="relative overflow-hidden rounded-2xl border border-[#1e3a5f]/10 bg-[#faf6ec] shadow-[0_16px_48px_-36px_rgba(15,22,36,0.2)]"
              >
                <Image
                  src="/images/corporate/novves-banner-bg.jpg"
                  alt=""
                  width={1536}
                  height={604}
                  className="block h-auto w-full"
                  sizes="(max-width: 1024px) 92vw, 1100px"
                  aria-hidden
                />

                <div className="absolute inset-0 grid grid-cols-[38%_1fr] items-center gap-2 px-3 sm:grid-cols-[44%_1fr_auto_minmax(0,18%)] sm:gap-2 sm:px-6 lg:gap-3 lg:px-10">
                  <div aria-hidden />
                  <div className="min-w-0 pr-1 sm:pr-0">
                    <h3
                      id="company-profile-banner-heading"
                      className="text-[clamp(0.85rem,3.2vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#2a2a2a]"
                    >
                      {section.bannerTitle}
                    </h3>
                    {section.bannerLine1 ? (
                      <p className="mt-3 hidden text-[clamp(0.85rem,1.15vw,1.2rem)] leading-relaxed text-[#555555] sm:block">
                        {section.bannerLine1}
                      </p>
                    ) : null}
                  </div>
                  <div className="hidden h-[60%] w-px shrink-0 bg-[#ef5f17]/35 sm:block" aria-hidden />
                  <div aria-hidden />
                </div>

                {/* Sloganlı NOVVES logosu — sadece sm+ ekranlarda; mobilde gizli */}
                <div className="pointer-events-none absolute right-[-4%] top-[55%] hidden w-[24%] -translate-y-1/2 sm:block lg:right-[-3%] lg:top-[56%] lg:w-[26%]">
                  <Image
                    src="/images/corporate/novves-logo-sloganli.png"
                    alt={section.bannerLogoAlt}
                    width={1536}
                    height={1024}
                    sizes="(max-width: 1024px) 290px, 380px"
                    className="block h-auto w-full"
                  />
                </div>
              </section>

              <div className="flex w-full justify-center pt-2">
                <Link
                  href={`/${locale}/kurumsal`}
                  className="group inline-flex items-center justify-center gap-2.5 rounded-lg bg-primary px-6 py-3.5 text-[13px] font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-deep hover:shadow-xl hover:shadow-primary/30"
                >
                  <span>{viewAllCorporate}</span>
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type ReferenceSectorTheme = "orange" | "sky" | "emerald" | "zinc";

const REFERENCE_SECTOR_THEME_CYCLE: ReferenceSectorTheme[] = ["orange", "sky", "emerald", "zinc"];

function resolveReferenceSectorTheme(index: number, raw?: string): ReferenceSectorTheme {
  if (raw === "orange" || raw === "sky" || raw === "emerald" || raw === "zinc") return raw;
  return REFERENCE_SECTOR_THEME_CYCLE[index % 4]!;
}

/** Sektör kartları — lacivert tonları, koyu gri, turuncu vurgu */
const REFERENCE_SECTOR_THEME_STYLES: Record<
  ReferenceSectorTheme,
  { footer: string; iconCircle: string; imageTint: string; tone: "onDark" | "onLight" }
> = {
  orange: {
    footer: "bg-[#152a45]",
    tone: "onDark",
    iconCircle:
      "bg-primary ring-2 ring-white/55 shadow-[0_12px_28px_-12px_rgba(15,22,36,0.38)]",
    imageTint: "from-[#152a45]/50 from-0% via-[#152a45]/14 via-[38%] to-transparent to-[78%]",
  },
  sky: {
    footer: "bg-[#2c3544]",
    tone: "onDark",
    iconCircle:
      "bg-primary ring-2 ring-white/55 shadow-[0_12px_28px_-12px_rgba(15,22,36,0.38)]",
    imageTint: "from-[#2c3544]/46 from-0% via-[#2c3544]/12 via-[38%] to-transparent to-[78%]",
  },
  emerald: {
    footer: "bg-[#3a4049]",
    tone: "onDark",
    iconCircle:
      "bg-primary ring-2 ring-white/55 shadow-[0_12px_28px_-12px_rgba(15,22,36,0.38)]",
    imageTint: "from-[#2f343c]/46 from-0% via-[#2f343c]/12 via-[38%] to-transparent to-[78%]",
  },
  zinc: {
    footer: "bg-[#334d6b]",
    tone: "onDark",
    iconCircle:
      "bg-primary ring-2 ring-white/55 shadow-[0_12px_28px_-12px_rgba(15,22,36,0.38)]",
    imageTint: "from-[#334d6b]/48 from-0% via-[#334d6b]/14 via-[38%] to-transparent to-[78%]",
  },
};

function HomeReferenceSectorIcon({ theme }: { theme: ReferenceSectorTheme }) {
  const cls = "h-7 w-7 text-white";
  const sw = 1.65;
  switch (theme) {
    case "orange":
      return (
        <svg className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      );
    case "sky":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 10h16v8H4v-8z" />
          <path strokeLinecap="round" d="M8 10V7a4 4 0 018 0v3M6 18h12" />
        </svg>
      );
    case "emerald":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 21h12M6 21V8l6-4 6 4v13" />
          <path strokeLinecap="round" d="M9 13h2M13 13h2M9 17h6" />
        </svg>
      );
    default:
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 21h16M4 21V10l4-2 2 2V8l4-2 4 2v13" />
          <path strokeLinecap="round" d="M10 8V5h4v3M14 5v3" />
        </svg>
      );
  }
}

function HomeCatalogDocIcon({ variant }: { variant: number }) {
  const cls = "h-5 w-5";
  const sw = 1.75;
  switch (variant % 3) {
    case 0:
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 3h7l3 3v15a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" />
          <path strokeLinecap="round" d="M14 3v4h4M9 12h6M9 16h6" />
        </svg>
      );
    case 1:
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h10M4 18h14" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 10l2 2-2 2" />
        </svg>
      );
    default:
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 4h9l3 3v13a1 1 0 01-1 1H6a1 1 0 01-1-1V5a1 1 0 011-1z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 4v4h4M8 14h8M8 18h6" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 21h12" opacity={0.45} />
        </svg>
      );
  }
}

function HomeSolutionShowcaseCard({
  locale,
  href,
  title,
  subtitle,
  heroSrc,
  productThumbs,
  index,
  heroPriority = false,
}: {
  locale: string;
  href: string;
  title: string;
  subtitle: string;
  heroSrc: string;
  productThumbs: readonly [string, string, string];
  /** Kart sıra numarası (0 tabanlı). 01, 02… olarak gösterilir. */
  index: number;
  /** İlk kart LCP: daha erken decode */
  heroPriority?: boolean;
}) {
  return (
    <Link
      href={`/${locale}${href}`}
      className="group flex h-[19.5rem] min-h-0 w-full flex-col overflow-hidden rounded-xl border border-sand-300 bg-white shadow-[0_14px_40px_-28px_rgba(0,56,107,0.14)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-primary/45 hover:shadow-[0_22px_52px_-28px_rgba(239,95,23,0.22)] sm:h-[22rem]"
    >
      {/* Görsel — alt %50'si turuncuya çözünür, alttaki banda dikişsiz akar */}
      <div className="relative h-[150px] w-full shrink-0 overflow-hidden bg-sand-100 sm:h-[168px]">
        <Image
          src={heroSrc}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 360px"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          priority={heroPriority}
          quality={80}
        />
        {/* Görsel ↔ turuncu organik geçiş — alt kenar tam #ef5f17 ile biter */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%]"
          style={{
            background:
              "linear-gradient(180deg, rgba(239,95,23,0) 0%, rgba(239,95,23,0.18) 24%, rgba(239,95,23,0.5) 58%, rgba(239,95,23,0.85) 86%, #ef5f17 100%)",
          }}
          aria-hidden
        />
      </div>

      {/* Turuncu bant — başlık + thumb'lar; sabit kart yüksekliğini doldurur */}
      <div
        className="flex flex-1 flex-col justify-between gap-2 px-2.5 pb-2.5 pt-2 sm:gap-2.5 sm:px-3 sm:pb-3 sm:pt-2.5"
        style={{
          background:
            "linear-gradient(180deg, #ef5f17 0%, #d45414 55%, #a63d0f 100%)",
        }}
      >
        <div className="flex shrink-0 gap-2 sm:gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/35 bg-white/12 font-bold leading-none text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] sm:h-10 sm:w-10">
            <span className="text-[15px] tabular-nums sm:text-body">{String(index + 1).padStart(2, "0")}</span>
          </div>
          <div className="flex min-h-0 w-0 min-w-0 flex-1 flex-col overflow-hidden pt-0.5">
            <h3 className="line-clamp-2 min-h-[2.75em] text-meta font-bold leading-snug text-white sm:text-[15px]">{title}</h3>
            <p className="mt-0.5 line-clamp-2 min-h-[3.25em] text-[11px] leading-relaxed text-white/88 sm:mt-1 sm:text-fine">{subtitle}</p>
          </div>
        </div>
        <div className="grid shrink-0 grid-cols-3 items-end gap-0.5 sm:gap-1">
          {productThumbs.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="relative h-[3.5rem] w-full transition-transform duration-500 ease-out group-hover:scale-[1.05] sm:h-[4rem]"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 768px) 28vw, 110px"
                className="object-contain object-bottom drop-shadow-[0_6px_22px_rgba(0,0,0,0.85)]"
                loading={heroPriority && i < 3 ? "eager" : "lazy"}
                quality={82}
              />
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}

/**
 * Her PNG ürün canvas'ını farklı oranda dolduruyor (örn. yayli-izolator etrafında bol boşluk var).
 * Bu çarpanlar `object-contain` boyutunu görsel olarak eşitler — kart içinde tüm ürünler benzer büyüklükte hissedilir.
 */
/**
 * Veri + görsel kütle: bbox ölçüldü, ek olarak ürünün "solidlik" hissine göre ayar.
 * ae-fjf hollow ring (bbox 85% ama görsel mass düşük), yayli kompakt küçük parça.
 * Solid 3D bloklar (fan/AHU/panel) doğal olarak yer doldurur.
 */
/**
 * Area-based scaling: her ürünün bbox area'sı eşit hedefe (~7500%²) çekildi.
 * Görsel "mass" perception aynı: 90.7×82.7 ≈ 82.1×91.3 ≈ 86.2×87.0 ...
 * Height/width oranları korunur ama toplam görsel ağırlık dengeli.
 */
const THUMB_VISUAL_SCALE: Record<string, number> = {
  "/images/products/dragonfly-c.png": 1.12,
  "/images/products/marlin.png": 1.09,
  "/images/products/hound-al.png": 1.25,
  "/images/products/tiger-pre.png": 1.12,
  "/images/products/basinclandirma-kontrol-panosu.png": 1.39,
  "/images/products/yayli-titresim-izolatoru.png": 1.26,
};

const PRODUCT_CATEGORY_ICON_BY_SLUG: Record<string, string> = {
  "hava-hareketi": "wind",
  "iklimlendirme": "snowflake",
  "sogutma-ve-isitma": "thermo",
  "hava-yonetimi": "waves",
  "hava-dagitimi": "diffuser",
  "hava-filtrasyonu": "filter",
  "aksesuarlar": "wrench",
  "otomasyon-malzemeleri": "chip",
  "titresim-ve-ses-izolasyon": "equalizer",
};

function ProductCategoryIcon({ name, className }: { name: string; className?: string }) {
  const common = {
    fill: "none" as const,
    stroke: "currentColor" as const,
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
    className,
  };
  switch (name) {
    case "wind":
      return (
        <svg {...common} aria-hidden>
          <path d="M3 8h11a3 3 0 1 0-3-3" />
          <path d="M3 12h16a3 3 0 1 1-3 3" />
          <path d="M3 16h9" />
        </svg>
      );
    case "snowflake":
      return (
        <svg {...common} aria-hidden>
          <path d="M12 3v18" />
          <path d="M3 12h18" />
          <path d="M5.5 5.5l13 13" />
          <path d="M18.5 5.5l-13 13" />
          <path d="M9 5l3 -2 3 2" />
          <path d="M9 19l3 2 3-2" />
        </svg>
      );
    case "thermo":
      return (
        <svg {...common} aria-hidden>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3" />
          <path d="M12 19v3" />
          <path d="M4.2 4.2l2.1 2.1" />
          <path d="M17.7 17.7l2.1 2.1" />
          <path d="M2 12h3" />
          <path d="M19 12h3" />
          <path d="M4.2 19.8l2.1-2.1" />
          <path d="M17.7 6.3l2.1-2.1" />
        </svg>
      );
    case "waves":
      return (
        <svg {...common} aria-hidden>
          <path d="M3 7c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 2-2" />
          <path d="M3 12c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 2-2" />
          <path d="M3 17c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 2-2" />
        </svg>
      );
    case "diffuser":
      return (
        <svg {...common} fill="currentColor" stroke="none" aria-hidden>
          {[5, 12, 19].flatMap((y) =>
            [5, 12, 19].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.3" />),
          )}
        </svg>
      );
    case "filter":
      return (
        <svg {...common} aria-hidden>
          <path d="M3 5h18l-7 9v6l-4-2v-4z" />
        </svg>
      );
    case "wrench":
      return (
        <svg {...common} aria-hidden>
          <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6 2.6 2.6 6-6a4 4 0 0 0 5.4-5.4l-2.3 2.3-2.6-2.6 2.3-2.3z" />
        </svg>
      );
    case "chip":
      return (
        <svg {...common} aria-hidden>
          <rect x="6" y="6" width="12" height="12" rx="1.5" />
          <rect x="9" y="9" width="6" height="6" rx="0.6" />
          <path d="M9 3v3M12 3v3M15 3v3M9 18v3M12 18v3M15 18v3M3 9h3M3 12h3M3 15h3M18 9h3M18 12h3M18 15h3" />
        </svg>
      );
    case "equalizer":
      return (
        <svg {...common} aria-hidden>
          <path d="M6 20V8" />
          <path d="M12 20V4" />
          <path d="M18 20v-8" />
          <circle cx="6" cy="6" r="1.3" />
          <circle cx="12" cy="2.5" r="1.3" />
          <circle cx="18" cy="10" r="1.3" />
        </svg>
      );
    default:
      return null;
  }
}

function HomeProductCategoryCard({
  locale,
  href,
  title,
  description,
  families,
  image,
  index,
  cta,
  imagePriority = false,
}: {
  locale: string;
  href: string;
  title: string;
  description: string;
  families?: readonly string[];
  image: string;
  index: number;
  cta: string;
  imagePriority?: boolean;
}) {
  const num = String(index + 1).padStart(2, "0");
  const slug = href.split("/").filter(Boolean).pop() ?? "";
  const iconName = PRODUCT_CATEGORY_ICON_BY_SLUG[slug] ?? "wind";
  const all = families ?? [];
  const hasFamilies = all.length > 0;
  const familiesText = all.join(" • ");
  const [detailSlide, setDetailSlide] = useState(0);
  // Otomatik geçiş kapalı — sadece kullanıcı dot'a tıklayınca değişir.
  useEffect(() => {
    if (!hasFamilies) setDetailSlide(0);
  }, [hasFamilies]);

  return (
    <Link
      href={`/${locale}${href}`}
      className="group relative flex h-[23rem] min-h-0 w-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_14px_42px_-22px_rgba(15,22,36,0.16)] transition-[transform,box-shadow] duration-300 [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:shadow-[0_22px_52px_-22px_rgba(15,22,36,0.22)] sm:h-[26rem]"
    >
      {/* Üst görsel + numara tag */}
      <div className="relative h-[7.25rem] w-full shrink-0 overflow-hidden bg-[#f8f5ed] sm:h-[8rem]">
        <Image
          src={image}
          alt={title}
          fill
          priority={imagePriority}
          quality={82}
          className="object-cover object-center transition duration-500 [@media(hover:hover)]:group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 360px"
        />
        <div className="absolute left-0 top-0 z-10 grid h-[44px] w-[44px] place-items-center rounded-br-xl bg-primary shadow-[0_6px_14px_-6px_rgba(239,95,23,0.6)] sm:h-[48px] sm:w-[48px]">
          <span className="font-mono-eng text-meta font-bold leading-none tabular-nums text-white sm:text-[15px]">
            {num}
          </span>
        </div>
      </div>

      {/* İkon dairesi — görselin alt kenarına bindirir */}
      <div className="relative z-10 h-0">
        <div className="absolute -top-6 left-4 grid h-12 w-12 place-items-center rounded-full bg-white text-primary shadow-[0_4px_12px_rgba(15,22,36,0.12),0_1px_2px_rgba(15,22,36,0.08)] sm:-top-7 sm:h-[3.25rem] sm:w-[3.25rem]">
          <ProductCategoryIcon name={iconName} className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>
      </div>

      {/* Gövde */}
      <div className="flex min-h-0 flex-1 flex-col px-4 pb-3 pt-7 sm:px-5 sm:pb-4 sm:pt-9">
        <h3 className="truncate shrink-0 text-[15px] font-bold leading-snug tracking-[-0.02em] text-ink sm:text-body">
          {title}
        </h3>

        {/* Slayt alanı — açıklama ↔ ürün aileleri */}
        <div className="mt-2 min-h-0 flex-1 overflow-hidden sm:mt-2.5" aria-live="polite">
          {!hasFamilies || detailSlide === 0 ? (
            <p
              key="desc"
              className="product-card-clamp-desc m-0 text-fine leading-[1.5] text-secondary/80 motion-safe:animate-[hubCardFade_450ms_ease-out] sm:text-[13px]"
            >
              {description}
            </p>
          ) : (
            <p
              key="fam"
              className="product-card-clamp-families m-0 text-[10px] leading-[1.45] text-secondary/65 motion-safe:animate-[hubCardFade_450ms_ease-out] sm:text-[11px]"
            >
              {familiesText}
            </p>
          )}
        </div>

        {/* Dots — alt, horizontal */}
        {hasFamilies ? (
          <div
            className="mt-2 flex shrink-0 items-center justify-center gap-1.5"
            role="tablist"
            aria-label="Kart içeriği"
          >
            {([0, 1] as const).map((slideIndex) => (
              <button
                key={slideIndex}
                type="button"
                role="tab"
                aria-selected={detailSlide === slideIndex}
                aria-label={slideIndex === 0 ? "Açıklama" : "Ürün aileleri"}
                onPointerDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDetailSlide(slideIndex);
                }}
                className={`shrink-0 rounded-full transition-[width,background-color,opacity] duration-300 motion-reduce:transition-none ${
                  detailSlide === slideIndex
                    ? "h-1.5 w-5 bg-primary opacity-100"
                    : "h-1.5 w-1.5 bg-primary/35 hover:bg-primary/55"
                }`}
              />
            ))}
          </div>
        ) : null}

        <span
          className="inline-flex shrink-0 items-center gap-2 pt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-primary transition-colors duration-300 sm:pt-2.5 sm:text-[11px] [@media(hover:hover)]:group-hover:text-primary-deep"
        >
          <span className="uppercase">{cta}</span>
          <span
            aria-hidden
            className="text-[1.15em] font-normal leading-none transition-transform duration-300 [@media(hover:hover)]:group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

function HomeMarketStripCard({
  locale,
  href,
  title,
  subtitle,
  thumbs,
  features,
  imagePriority = false,
}: {
  locale: string;
  href: string;
  title: string;
  subtitle: string;
  thumbs: readonly [string, string, string];
  features?: readonly string[];
  imagePriority?: boolean;
}) {
  return (
    <Link
      href={`/${locale}${href}`}
      className="group relative block h-[19.5rem] w-full overflow-hidden rounded-xl border border-white/[0.08] shadow-[0_20px_52px_-28px_rgba(0,0,0,0.6)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#4a7fc1]/45 hover:shadow-[0_26px_60px_-22px_rgba(239,95,23,0.14),0_18px_48px_-26px_rgba(0,0,0,0.65)] sm:h-[22rem]"
    >
      {/* Zemin */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(155deg, #07111e 0%, #0b1c36 28%, #0d2450 62%, #0c2058 100%)" }} aria-hidden />

      {/* Sağ taraf mavi radyal glow */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 75% 90% at 78% 45%, rgba(25,100,230,0.55), transparent 55%), radial-gradient(ellipse 45% 60% at 95% 20%, rgba(40,120,240,0.30), transparent 50%)",
        }}
        aria-hidden
      />
      {/* Streak çizgileri — soldan sağ-üste süpürme */}
      <svg
        className="pointer-events-none absolute inset-0 z-[2] h-full w-full"
        viewBox="0 0 400 240"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <filter id="streak-blur" x="-5%" y="-400%" width="110%" height="900%">
            <feGaussianBlur stdDeviation="0.3 3.5" />
          </filter>
        </defs>
        {([
          { dy: -55, o: 0.06, w: 0.5 },
          { dy: -46, o: 0.10, w: 0.6 },
          { dy: -38, o: 0.17, w: 0.8 },
          { dy: -30, o: 0.28, w: 1.0 },
          { dy: -22, o: 0.44, w: 1.2 },
          { dy: -14, o: 0.62, w: 1.5 },
          { dy:  -7, o: 0.78, w: 1.7 },
          { dy:  -2, o: 0.88, w: 1.9 },
          { dy:   2, o: 0.88, w: 1.9 },
          { dy:   7, o: 0.78, w: 1.7 },
          { dy:  14, o: 0.60, w: 1.5 },
          { dy:  22, o: 0.42, w: 1.2 },
          { dy:  31, o: 0.26, w: 0.9 },
          { dy:  40, o: 0.15, w: 0.7 },
          { dy:  50, o: 0.08, w: 0.55 },
          { dy:  60, o: 0.04, w: 0.45 },
        ] as const).map(({ dy, o, w }, i) => (
          <path
            key={i}
            d={`M -40,${130 + dy} Q 210,${75 + dy * 0.45} 460,${38 + dy * 0.25}`}
            stroke={`rgba(160,215,255,${o})`}
            strokeWidth={w}
            fill="none"
            filter="url(#streak-blur)"
          />
        ))}
      </svg>

      {/* Metin — sol üst; başlık & altyazı 2 satırlık alanı her kartta aynı yükseklikte rezerve eder */}
      <div className="absolute left-0 right-0 top-0 z-[10] p-4 sm:p-5">
        <h3 className="line-clamp-2 min-h-[2.75em] text-meta font-bold leading-snug text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] sm:text-[15px]">
          {title}
        </h3>
        <p className="mt-1 line-clamp-2 min-h-[3.25em] max-w-[13rem] text-[11px] leading-relaxed text-white/65 sm:text-fine">
          {subtitle}
        </p>
        {features && features.length > 0 ? (
          <ul className="mt-3.5 space-y-1.5 max-w-[13rem] text-fine font-semibold leading-snug text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.75)] sm:mt-4 sm:space-y-2 sm:text-fine">
            {features.slice(0, 3).map((feat, idx) => (
              <li key={`${feat}-${idx}`} className="flex items-start gap-2">
                <span className="mt-[1px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md border border-[#7dd3fc]/45 bg-[#0a2552] shadow-[0_0_8px_rgba(94,163,245,0.5)]">
                  <svg className="h-3 w-3 text-[#7dd3fc]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l4 4L19 7" />
                  </svg>
                </span>
                <span className="line-clamp-1">{feat}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {/* 3 ürün görseli — alta hizalı, ortadaki büyük */}
      <div className="absolute inset-x-0 bottom-0 z-[5] grid grid-cols-3 items-end gap-0.5 px-2 pb-10 sm:gap-1 sm:px-3 sm:pb-12">
        {thumbs.map((thumbSrc, i) => {
          const scale = THUMB_VISUAL_SCALE[thumbSrc] ?? 1;
          const isCenter = i === 1;
          return (
            <div
              key={`${thumbSrc}-${i}`}
              className={`relative w-full transition-transform duration-500 ease-out group-hover:scale-[1.05] ${isCenter ? "h-[10rem] sm:h-[11.5rem]" : "h-[6.5rem] sm:h-[7.5rem]"}`}
              style={{ transform: `scale(${scale})` }}
            >
              <Image
                src={thumbSrc}
                alt=""
                fill
                sizes="(max-width: 768px) 28vw, 110px"
                className="object-contain object-bottom drop-shadow-[0_6px_22px_rgba(0,0,0,0.85)]"
                priority={imagePriority && i === 0}
                quality={82}
              />
            </div>
          );
        })}
      </div>
    </Link>
  );
}

const productFallbackImages = [
  "/images/products/dragonfly-c.png",
  "/images/products/tiger-pre.png",
  "/images/products/dolphin-pre.png",
  "/images/products/hound-al.png",
  "/images/hero/endustriyel-mutfaklar.png",
  "/images/products/marlin.png",
  "/images/products/ae-fjf.png",
];

/**
 * Ürün kategorileri için 3'er madde özet — kart orta boşluğunu doldurur.
 * `PRODUCT_CATEGORY_NAV` sırasıyla eşleşir; başlıklar `products.json` → `shared.categories`
 * varsa onlar kullanılır, yoksa bu TR fallback gösterilir.
 */
const HOME_PRODUCT_BAND_FEATURE_FALLBACKS: readonly (readonly string[])[] = [
  [
    "Kovanlı Aksiyal Fan Ailesi",
    "Patlamaya Dayanıklı Fan (Ex-proof) Ailesi",
    "Endüstriyel Salyangoz Fan Ailesi",
    "EC Motorlu Fan Sistemleri Ailesi",
    "Çatı Tipi Fan Ailesi",
    "Duvar Tipi Fan Ailesi",
    "Banyo Fanı Ailesi",
    "Kanal Tipi Fan Ailesi",
    "Hücre Tipi Fan Ailesi",
    "Mutfak Havalandırma Sistemleri Ailesi",
    "Sığınak Fanı Ailesi",
    "Tavuk Çiftliği Havalandırma Sistemi Ailesi",
    "Toz Toplama Sistemleri Ailesi",
  ],
  [
    "Klima Santrali Ailesi",
    "Nem Alma Santrali Ailesi",
    "Isı Geri Kazanım Ünitesi Ailesi",
    "Patlamaya Dayanıklı Klima Santrali (Ex-proof AHU)",
  ],
  [
    "Kompakt, Paket, Endüstriyel Soğutma Ailesi",
    "Isı Pompası Dış Ünite Ailesi",
    "İç Ünite Ailesi",
    "Isıtma / Soğutma Bataryaları (Coil) Ailesi",
    "Elektrikli Isıtıcı Ailesi",
    "Isı Eşanjörü Ailesi",
    "Hassas Kontrollü Klima Ailesi",
  ],
  ["Damper Sistemleri Ailesi"],
  ["Menfez ve Difüzör Sistemleri Ailesi"],
  ["Filtre ve Filtrasyon Elemanları Ailesi"],
  ["Fan ve HVAC Aksesuarları Ailesi"],
  [
    "Otomasyon Pano Sistemleri Ailesi",
    "PLC ve Programlanabilir Kontrol Sistemleri Ailesi",
    "Sensör ve Algılama Sistemleri Ailesi",
    "Kontrol Kartları ve Operatör Panelleri Ailesi",
    "Zamanlama ve Kontrol Cihazları Ailesi",
    "Güç Elektroniği Sistemleri Ailesi",
    "Pano Güç ve Anahtarlama Elemanları Ailesi",
  ],
  ["Titreşim İzolatörleri Ailesi"],
];

/** Ana sayfa tipografi: display ↔ mono arası lead (17–18px), gövde (15px); dikey ritim 8px tabanı */
const homeLeadInk =
  "text-body font-normal leading-[1.68] tracking-[-0.011em] text-ink/[0.76] sm:text-[18px] sm:leading-[1.66]";
const homeLeadSecondary =
  "text-body font-normal leading-[1.68] tracking-[-0.011em] text-secondary/80 sm:text-[18px] sm:leading-[1.66]";
const homeLeadWhite =
  "text-body font-normal leading-[1.68] tracking-[-0.011em] text-white/78 sm:text-[18px] sm:leading-[1.66]";
const homeBodySecondary = "text-[15px] leading-[1.75] text-secondary/72";

/* ── Section header primitive — used by every section for consistent framing */

function SectionHead({
  num,
  title,
  subtitle,
  meta,
  tone = "light",
  variant = "default",
  accentClass = "bg-primary/90",
}: {
  num?: string;
  title: string;
  subtitle?: string;
  meta?: string;
  tone?: "light" | "dark";
  variant?: "default" | "showcase";
  accentClass?: string;
}) {
  if (variant === "showcase" && tone === "light") {
    void num;
    void meta;
    return (
      <div className="relative overflow-hidden rounded-2xl border border-[#243044]/10 bg-gradient-to-br from-white via-[#faf9f6] to-[#ebe8e0] px-6 py-9 shadow-[0_18px_48px_-30px_rgba(36,48,68,0.12)] sm:px-9 sm:py-10">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent"
          aria-hidden
        />
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-12">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="flex shrink-0 items-center gap-2.5">
                <span className={`h-4 w-4 rounded-[5px] border border-primary/45 shadow-[0_8px_20px_-10px_rgba(239, 95, 23,0.75)] ${accentClass}`} />
                <span className="h-2.5 w-2.5 rounded-[3px] border border-[#243044]/20 bg-white shadow-[0_4px_10px_-8px_rgba(36,48,68,0.45)]" />
                <span className="h-3 w-3 rounded-[4px] border border-[#243044]/24 bg-[#e9ebef]" />
              </div>
              <h2
                className="font-display text-section font-bold text-ink"
                style={{ lineHeight: 1.02, letterSpacing: "-0.02em" }}
              >
                {title}
              </h2>
            </div>
          </div>
          {subtitle ? (
            <p className={`max-w-[48ch] lg:col-span-5 lg:border-l lg:border-ink/10 lg:pl-8 ${homeLeadSecondary}`}>
              {subtitle}
            </p>
          ) : null}
        </div>
        <div
          className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-ink/12 to-transparent sm:inset-x-10"
          aria-hidden
        />
      </div>
    );
  }

  void num;
  void meta;
  const textTitle = tone === "dark" ? "text-white" : "text-ink";
  const border = tone === "dark" ? "border-white/10" : "border-ink/10";
  const subtitleLead = tone === "dark" ? homeLeadWhite : homeLeadInk;

  return (
    <div className={`border-b ${border} pb-16`}>
      <div className="grid gap-8 lg:grid-cols-12">
        <h2 className={`font-display text-section font-bold ${textTitle} lg:col-span-8`} style={{ lineHeight: 0.98, letterSpacing: "-0.02em" }}>
          {title}
        </h2>
        {subtitle && (
          <p className={`max-w-[48ch] lg:col-span-4 ${subtitleLead}`}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

/** "01 — Analiz & Mühendislik" → "Analiz & Mühendislik" (büyük numara ayrı gösterilir) */
function pillarStepLabel(tag: string): string {
  const stripped = tag.replace(/^\s*0?\d+\s*[—–\-]\s*/u, "").trim();
  return stripped || tag;
}

/** Referans — büyük adım numaraları yumuşak şeftali (mockup tonu) */
const PILLAR_STEP_NUM_COLOR = "#f5b483";

const pillarNumberPositions = [
  "lg:-left-[8%] lg:top-0",
  "lg:-right-[8%] lg:top-0",
  "lg:-left-[8%] lg:top-0",
] as const;

/**
 * Pillar video player — paralelogram clip içine sığan custom kontroller.
 * Native HTML5 controls clipPath ile kesilir, bunun yerine merkezi play/pause overlay.
 */
function PillarVideoPlayer({
  src,
  poster,
  label,
  playButtonClassName,
  playButtonSize = "h-20 w-20",
  playIconSize = "h-8 w-8",
}: {
  src: string;
  poster: string;
  label: string;
  /** Play butonunu özel konuma yerleştirmek için (örn. clip-path'li container'da polygon merkezi) */
  playButtonClassName?: string;
  playButtonSize?: string;
  playIconSize?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  const buttonPos = playButtonClassName ?? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2";

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        loop
        preload="metadata"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* Click-to-pause genel kapak — video çalarken */}
      {playing && (
        <button
          type="button"
          onClick={toggle}
          aria-label="Duraklat"
          className="absolute inset-0 z-10 cursor-pointer bg-transparent"
        />
      )}
      {/* Büyük merkez play butonu — duraklı iken görünür */}
      {!playing && (
        <button
          type="button"
          onClick={toggle}
          aria-label={`${label} — oynat`}
          className={`group/play absolute z-20 flex ${playButtonSize} items-center justify-center rounded-full bg-white/95 text-primary shadow-[0_18px_40px_-12px_rgba(0,0,0,0.5)] backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white ${buttonPos}`}
        >
          <svg className={`ml-1 ${playIconSize}`} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      )}
    </>
  );
}

function HomeEngineeringPillarsJourneyStrip({
  pillars,
  locale,
  strip,
  fallbackTitle,
}: {
  pillars: HomeDict["pillars"];
  locale: string;
  strip?: {
    title: string;
    subtitle: string;
    lead?: string;
    eyebrow?: string;
    sidebarCardTitle?: string;
    sidebarCardDesc?: string;
    mainCta?: string;
    cardCta?: string;
    stats?: string[];
  } | null | undefined;
  fallbackTitle: string;
  pc: PageChrome;
}) {
  const title = (strip?.title ?? "").trim() || fallbackTitle.trim();
  const subtitle = (strip?.subtitle ?? "").trim();
  const lead = (strip?.lead ?? "").trim();
  const eyebrow = (strip?.eyebrow ?? "").trim();
  const sidebarCardTitle = (strip?.sidebarCardTitle ?? subtitle ?? "").trim();
  const sidebarCardDesc = (strip?.sidebarCardDesc ?? "").trim();
  const mainCta = (strip?.mainCta ?? "").trim();
  const cardCta = (strip?.cardCta ?? "").trim();
  const statsList = strip?.stats && strip.stats.length === 4 ? strip.stats : null;

  /** Tag'ten "01 — " prefix'ini soyut → "ANALİZ & MÜHENDİSLİK" (Türkçe locale ile doğru İ/I) */
  const shortLabel = (tag: string) => {
    const parts = tag.split(/\s*[—-]\s*/);
    const text = parts.length > 1 ? parts.slice(1).join(" — ") : tag;
    return text.toLocaleUpperCase("tr-TR");
  };

  /** Intro'nun ilk cümlesini kısalt (~140 char) */
  const shortDesc = (intro: string) => {
    const firstSentence = intro.split(/(?<=[.!?])\s/)[0] ?? intro;
    return firstSentence.length > 160 ? firstSentence.slice(0, 157).trimEnd() + "…" : firstSentence;
  };

  const statsIcons = [
    (
      <svg key="shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    (
      <svg key="badge" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M12 15a4 4 0 100-8 4 4 0 000 8z" />
        <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
      </svg>
    ),
    (
      <svg key="team" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    (
      <svg key="headset" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M3 18v-6a9 9 0 0118 0v6" />
        <path d="M21 19a2 2 0 01-2 2h-1v-7h3v5zM3 19a2 2 0 002 2h1v-7H3v5z" />
      </svg>
    ),
  ];

  const stats = (statsList ?? [
    "30+ ÜLKEDE\n500+ PROJE",
    "YÜKSEK KALİTE\nSERTİFİKALI ÜRETİM",
    "UZMAN\nMÜHENDİS EKİP",
    "7/24 TEKNİK\nDESTEK",
  ]).map((label, i) => ({ label, icon: statsIcons[i] }));

  return (
    <div id="pillars-journey" className="mt-12 scroll-mt-24 md:scroll-mt-[5.5rem]">
      <div className="relative py-10 sm:py-14 lg:py-[4.5rem]">
        {/* Header satırı: sol başlık bloğu + sağ A'DAN Z'YE kartı */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:items-start lg:gap-10">
          <header>
            <p className="font-mono-eng text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
              {eyebrow || "PROJE YÖNETİM SÜRECİMİZ"}
            </p>
            <h2
              className="mt-4 font-display text-section font-bold uppercase text-ink"
              style={{ lineHeight: 0.98, letterSpacing: "-0.025em" }}
            >
              {title}
            </h2>
            {lead ? (
              <p className="mt-5 max-w-md text-meta leading-relaxed text-secondary">
                {lead}
              </p>
            ) : null}
          </header>

          {/* Sağ kart konteyneri — kart dışında blueprint sketch */}
          <div className="relative">
            {/* Endüstriyel axial fan/motor blueprint — kartın tam arkasında */}
            <svg
              className="pointer-events-none absolute left-1/2 top-[30%] z-0 h-[280%] w-[420px] -translate-x-1/2 -translate-y-1/2 opacity-35"
              viewBox="0 0 360 280"
              fill="none"
              stroke="#7a6b58"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              {/* Arka plan ikinci fan (perspektif, daha küçük) */}
              <g opacity="0.55">
                <rect x="200" y="20" width="120" height="120" rx="3" />
                <circle cx="260" cy="80" r="48" />
                <circle cx="260" cy="80" r="42" />
                <circle cx="260" cy="80" r="8" />
                <circle cx="260" cy="80" r="2.5" fill="currentColor" />
                {/* 6 fan blade */}
                {Array.from({ length: 6 }).map((_, i) => {
                  const r = (n: number) => n.toFixed(2);
                  const a = (i * 60) * Math.PI / 180;
                  const r1 = 8, r2 = 40;
                  const x1 = r(260 + Math.cos(a) * r1);
                  const y1 = r(80 + Math.sin(a) * r1);
                  const x2 = r(260 + Math.cos(a + 0.35) * r2);
                  const y2 = r(80 + Math.sin(a + 0.35) * r2);
                  const cx = r(260 + Math.cos(a + 0.15) * 24);
                  const cy = r(80 + Math.sin(a + 0.15) * 24);
                  return <path key={`b1-${i}`} d={`M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}`} />;
                })}
                {/* Bolts on flange corners */}
                <circle cx="210" cy="30" r="3" />
                <circle cx="310" cy="30" r="3" />
                <circle cx="210" cy="130" r="3" />
                <circle cx="310" cy="130" r="3" />
                <circle cx="210" cy="30" r="1.5" fill="currentColor" />
                <circle cx="310" cy="30" r="1.5" fill="currentColor" />
                <circle cx="210" cy="130" r="1.5" fill="currentColor" />
                <circle cx="310" cy="130" r="1.5" fill="currentColor" />
              </g>

              {/* Ana büyük fan (önde, detaylı) */}
              <g>
                {/* Square mounting frame */}
                <rect x="40" y="120" width="180" height="180" rx="4" />
                <rect x="50" y="130" width="160" height="160" rx="2" opacity="0.6" />
                {/* Outer cylindrical housing */}
                <circle cx="130" cy="210" r="78" />
                <circle cx="130" cy="210" r="72" />
                <circle cx="130" cy="210" r="65" />
                {/* Inner hub */}
                <circle cx="130" cy="210" r="14" />
                <circle cx="130" cy="210" r="9" />
                <circle cx="130" cy="210" r="3" fill="currentColor" />
                {/* 8 fan blades — curved aerodynamic */}
                {Array.from({ length: 8 }).map((_, i) => {
                  const r = (n: number) => n.toFixed(2);
                  const a = (i * 45) * Math.PI / 180;
                  const r1 = 14, r2 = 64;
                  const x1 = r(130 + Math.cos(a) * r1);
                  const y1 = r(210 + Math.sin(a) * r1);
                  const x2 = r(130 + Math.cos(a + 0.42) * r2);
                  const y2 = r(210 + Math.sin(a + 0.42) * r2);
                  const cx = r(130 + Math.cos(a + 0.18) * 38);
                  const cy = r(210 + Math.sin(a + 0.18) * 38);
                  return <path key={`b2-${i}`} d={`M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}`} />;
                })}
                {/* Corner bolts */}
                <circle cx="52" cy="132" r="4" />
                <circle cx="52" cy="132" r="2" fill="currentColor" />
                <circle cx="208" cy="132" r="4" />
                <circle cx="208" cy="132" r="2" fill="currentColor" />
                <circle cx="52" cy="288" r="4" />
                <circle cx="52" cy="288" r="2" fill="currentColor" />
                <circle cx="208" cy="288" r="4" />
                <circle cx="208" cy="288" r="2" fill="currentColor" />
                {/* Cooling vents on frame edges */}
                <line x1="60" y1="148" x2="80" y2="148" />
                <line x1="60" y1="154" x2="80" y2="154" />
                <line x1="60" y1="160" x2="80" y2="160" />
                <line x1="180" y1="148" x2="200" y2="148" />
                <line x1="180" y1="154" x2="200" y2="154" />
                <line x1="180" y1="160" x2="200" y2="160" />
                <line x1="60" y1="260" x2="80" y2="260" />
                <line x1="60" y1="266" x2="80" y2="266" />
                <line x1="60" y1="272" x2="80" y2="272" />
                <line x1="180" y1="260" x2="200" y2="260" />
                <line x1="180" y1="266" x2="200" y2="266" />
                <line x1="180" y1="272" x2="200" y2="272" />
              </g>

              {/* Teknik dimension chizgileri */}
              <line x1="40" y1="320" x2="220" y2="320" strokeDasharray="2 3" opacity="0.5" />
              <line x1="40" y1="316" x2="40" y2="324" opacity="0.5" />
              <line x1="220" y1="316" x2="220" y2="324" opacity="0.5" />
            </svg>

            {/* A'DAN Z'YE kartı — şeffaf, sola çekilmiş, sketch sağda görünür */}
            <div className="relative z-10 w-full max-w-[260px] overflow-hidden rounded-2xl border border-ink/20 bg-white/40 p-5 shadow-[0_8px_28px_-14px_rgba(15,22,36,0.1)] backdrop-blur-[2px]">
              <div className="flex items-start gap-3.5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                  </svg>
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-meta font-bold uppercase tracking-[0.15em] text-ink">
                    {sidebarCardTitle || "A'DAN Z'YE"}
                  </h3>
                  <p className="mt-1.5 text-fine leading-snug text-secondary">
                    {sidebarCardDesc || "Proje hayat döngüsünün tamamında yanınızdayız."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 numaralı kart — sertifikalar formatıyla aynı düzen, dikey hizalı */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-7 lg:mt-14 lg:grid-cols-3 lg:gap-8">
          {pillars.slice(0, 3).map((pillar, index) => {
            const num = String(index + 1).padStart(2, "0");
            const img = pillarImages[index] ?? pillarImages[0]!;
            const rawPath = (pillar.href ?? pillarLinks[index] ?? "/kurumsal").trim() || "/kurumsal";
            const path = rawPath.startsWith("/") ? rawPath : `/${rawPath}`;
            const pillarHref = `/${locale}${path}`;
            const label = shortLabel(pillar.tag);
            const desc = shortDesc(pillar.intro);

            /** Kart ortası floating icon — pillar başına alakalı */
            const cardIcon = [
              // 01: CFD / monitor + akış grafiği — analiz & mühendislik
              (
                <svg key="01" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <rect x="2" y="3" width="20" height="14" rx="1.5" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                  <polyline points="5 13 9 9 12 12 19 6" />
                  <circle cx="19" cy="6" r="0.6" fill="currentColor" />
                </svg>
              ),
              // 02: fabrika / üretim — üretim & kalite
              (
                <svg key="02" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <path d="M2 20h20" />
                  <path d="M3 20V9l5 3V9l5 3V9l8 4v7" />
                  <line x1="8" y1="15" x2="8" y2="17" />
                  <line x1="13" y1="15" x2="13" y2="17" />
                  <line x1="18" y1="16" x2="18" y2="18" />
                </svg>
              ),
              // 03: baret / sahada mühendis — saha & destek
              (
                <svg key="03" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <path d="M3 18h18v-2a3 3 0 00-3-3h-1V9a5 5 0 00-10 0v4H6a3 3 0 00-3 3v2z" />
                  <line x1="12" y1="4" x2="12" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              ),
            ][index];

            const hasVideo = !!pillarVideos[index];

            return (
              <Link
                key={`${index}-${pillar.tag}`}
                href={pillarHref}
                className="group flex flex-col pt-3 transition-[transform] duration-300 [@media(hover:hover)]:hover:-translate-y-1"
                aria-label={pillar.title}
              >
                {/* Üstte image/video — sertifika formatı: aspect-[16/11], rounded-xl, soft bg + shadow + ring */}
                <div className="relative z-[2] mx-auto w-[min(100%,22rem)] px-1 sm:w-[min(100%,24rem)] sm:px-0">
                  <div className="relative aspect-[16/11] overflow-hidden rounded-xl border border-white/90 bg-[#e4e7ec] shadow-[0_22px_48px_-28px_rgba(15,22,36,0.42)] ring-1 ring-black/[0.06] transition-[box-shadow] duration-300 [@media(hover:hover)]:group-hover:shadow-[0_28px_56px_-28px_rgba(15,22,36,0.48)]">
                    {hasVideo ? (
                      <PillarVideoPlayer
                        src={pillarVideos[index]!.src}
                        poster={pillarVideos[index]!.poster}
                        label={pillar.title}
                        playButtonClassName="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                        playButtonSize="h-14 w-14"
                        playIconSize="h-6 w-6"
                      />
                    ) : (
                      <Image
                        src={img}
                        alt={pillar.title}
                        fill
                        quality={92}
                        className="object-cover"
                        sizes="(max-width: 640px) min(92vw,22rem), (max-width: 1024px) 42vw, min(24rem, 33vw)"
                      />
                    )}
                  </div>
                </div>

                {/* Alt content kartı — sertifika formatı, image üstüne -mt-8 overlap */}
                <div className="relative z-[1] -mt-8 flex flex-1 flex-col rounded-2xl border border-ink/10 bg-white px-5 pb-6 pt-11 shadow-[0_16px_44px_-30px_rgba(15,22,36,0.28)] ring-1 ring-black/[0.03] transition-[box-shadow] duration-300 [@media(hover:hover)]:group-hover:shadow-[0_22px_50px_-30px_rgba(15,22,36,0.34)] sm:px-6 sm:pb-7 sm:pt-12">
                  {/* Üst — sadece numara, ikon yok */}
                  <div className="mb-3">
                    <span
                      className="font-product-card-num text-[1.75rem] leading-none text-primary"
                      style={{ fontWeight: 300, letterSpacing: "-0.02em" }}
                    >
                      {num}
                    </span>
                  </div>

                  <h3 className="text-balance text-[1.15rem] font-bold leading-snug tracking-[-0.02em] text-ink sm:text-[1.28rem]">
                    {label}
                  </h3>
                  <p className="product-card-clamp-4 mt-2 text-meta leading-relaxed text-ink/65 sm:text-[15px]">
                    {desc}
                  </p>

                  <div className="mt-auto pt-6">
                    <span className="inline-flex w-fit items-center justify-center gap-2.5 rounded-lg bg-primary px-6 py-3.5 text-[13px] font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 [@media(hover:hover)]:group-hover:bg-primary-deep [@media(hover:hover)]:group-hover:shadow-xl [@media(hover:hover)]:group-hover:shadow-primary/30">
                      {cardCta || "Detayları İncele"}
                      <svg className="h-4 w-4 transition-transform duration-300 [@media(hover:hover)]:group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default function HomeClient({
  dict,
  common,
  locale,
  productCategoryLabels = {},
  referencePreviewProjectCounts,
}: {
  dict: HomeDict;
  common?: HomeCommonNav | null;
  locale: string;
  /** `products.json` → `shared.categories` — ürünler hub ile aynı başlıklar */
  productCategoryLabels?: Record<string, string>;
  /** `@/data/references` üzerinden; referanslar sayfası ile aynı veri — `referencePreview` sırasıyla */
  referencePreviewProjectCounts?: number[];
}) {
  const n = mergeHomeCommon(common).navbar;
  const pc = pageChromeFromDict(dict);
  const solutionByHref = dict.solutionCarouselByHref ?? {};
  const catalogPreview = dict.catalogPreview ?? [];
  const referencePreview = dict.referencePreview ?? [];
  const certificatePreview = dict.certificatePreview ?? [];
  const companyProfileSection = dict.companyProfileSection;
  const companyProfileCards = dict.companyProfileCards ?? [];
  const productBlurbs = dict.productCategoryBlurbs ?? [];
  const productFeatures = dict.productCategoryFeatures ?? [];

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [hoveredCompanyProfileIndex, setHoveredCompanyProfileIndex] = useState<number | null>(null);
  const [allowRestrictedSections, setAllowRestrictedSections] = useState<boolean | null>(null);
  const solutionStripCarouselRef = useRef<HTMLDivElement | null>(null);
  const productStripCarouselRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const applyConsent = (raw: string | null) => {
      if (!raw) {
        setAllowRestrictedSections(null);
        return;
      }

      const parsed = parseStoredConsentJson(raw);
      if (!parsed) {
        setAllowRestrictedSections(null);
        return;
      }
      setAllowRestrictedSections(!isConsentRestrictedMinimal(parsed));
    };

    try {
      applyConsent(readCookieConsentRaw());
    } catch {
      setAllowRestrictedSections(null);
    }

    const onConsentUpdated = (event: Event) => {
      const custom = event as CustomEvent<{ analytics?: boolean; marketing?: boolean } | null>;
      const detail = custom.detail;
      if (detail == null) {
        setAllowRestrictedSections(null);
        return;
      }
      const parsed =
        typeof detail.analytics === "boolean" && typeof detail.marketing === "boolean"
          ? { analytics: detail.analytics, marketing: detail.marketing }
          : null;
      setAllowRestrictedSections(parsed ? !isConsentRestrictedMinimal(parsed) : null);
    };

    window.addEventListener(COOKIE_CONSENT_EVENT, onConsentUpdated as EventListener);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onConsentUpdated as EventListener);
  }, []);

  const homeItems = dict.productCategories.items;
  const homeProductBandRows = PRODUCT_CATEGORY_NAV.map((nav, i) => {
    const meta = productCategoryMeta[i];
    const href = meta?.href ?? `/urunler/${nav.slug}`;
    const labelFromProducts = productCategoryLabels[nav.key]?.trim();
    const labelFromHome = homeItems[i]?.label?.trim();
    const label =
      labelFromProducts || labelFromHome || productSlugToFallbackLabel(nav.slug);
    const fallbackImg = productFallbackImages[i % productFallbackImages.length]!;
    const categoryHero = productStripCategoryMedia[href]?.hero;
    const thumbs: readonly [string, string, string] = meta?.thumbs
      ? [meta.thumbs[0], meta.thumbs[1], meta.thumbs[2]]
      : [meta?.image ?? fallbackImg, fallbackImg, fallbackImg];
    const featuresFromDict = productFeatures[i];
    const features =
      Array.isArray(featuresFromDict) && featuresFromDict.length > 0
        ? featuresFromDict
        : HOME_PRODUCT_BAND_FEATURE_FALLBACKS[i] ?? [];
    return {
      label,
      href,
      image: categoryHero ?? meta?.image ?? fallbackImg,
      thumbs,
      blurb: productBlurbs[i] ?? pc.productFallbackDesc,
      features,
    };
  });
  const scrollSolutionStrip = (direction: "prev" | "next") => {
    scrollHorizontalStrip(solutionStripCarouselRef.current, "[data-solution-strip-card]", direction, SOLUTION_STRIP_PAGE_CARD_COUNT);
  };

  const scrollProductStrip = (direction: "prev" | "next") => {
    scrollHorizontalStrip(productStripCarouselRef.current, "[data-product-strip-card]", direction, PRODUCT_STRIP_PAGE_CARD_COUNT);
  };

  const canUseFineHover = () =>
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  return (
    <main className="bg-sand-200 text-ink">
      {/* 01 — SCROLL VIDEO: KOVAN TIPI */}
      <div id="hero-main" className="scroll-mt-24 md:scroll-mt-[5.5rem]">
        <ScrollVideoSection
          videoSrc="/video/hero-scroll-sand.mp4"
          mobileVideoReplacementAlt={dict.hero.heroImageAlt}
          scrollVh={260}
          id="animation-2"
          startCard={dict.hero}
          endCard={dict.animation2.endCard}
          locale={locale}
          productHref="/urunler/duman-isi-tahliye-fanlari"
        />
      </div>

      {/* 02 — Çözümler (soft yüzey + palet) */}
      <section id="solution-categories" className="relative scroll-mt-24 md:scroll-mt-[5.5rem]">
        <div className="relative border-t border-sand-300 bg-sand-100 text-ink">
          <HomeMarketStripBackdrop />
          <div className="relative z-[1] mx-auto max-w-[1720px] px-4 sm:px-10 lg:px-16">
            <div className="py-8 sm:py-10 sm:pt-10 sm:pb-12 lg:py-12">
              <div className="mb-10 flex flex-wrap items-end gap-3 sm:gap-4">
                <h2 className="font-display text-lg font-bold uppercase tracking-[0.2em] text-ink sm:text-xl">{n.solutions}</h2>
                <div className="mb-0.5 h-px min-w-[4rem] flex-1 max-w-[14rem] bg-primary" aria-hidden />
              </div>
              <div className="-mx-1 flex items-stretch gap-2 px-1 sm:-mx-0 sm:gap-3 sm:px-0">
                <button
                  type="button"
                  onClick={() => scrollSolutionStrip("prev")}
                  aria-label={pc.previousSolutions}
                  className="relative z-10 mt-1 flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center self-center rounded-xl border border-sand-300 bg-white text-dark shadow-[0_8px_22px_-12px_rgba(0,56,107,0.12)] transition-all duration-300 hover:border-primary/50 hover:bg-sand-100 hover:text-primary hover:shadow-[0_12px_28px_-14px_rgba(239,95,23,0.22)] sm:h-11 sm:w-11 lg:h-12 lg:w-12"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="min-w-0 flex-1">
                  <div
                    ref={solutionStripCarouselRef}
                    className="flex items-stretch gap-2 overflow-x-auto overscroll-x-contain py-2 [-webkit-overflow-scrolling:touch] scroll-smooth snap-x snap-mandatory sm:gap-3 sm:py-2.5 [&::-webkit-scrollbar]:hidden"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  >
                    {homeSolutionBandSlides.map((item, i) => {
                      const entry = solutionByHref[item.href];
                      const title = entry?.title ?? item.href;
                      const desc = entry?.description ?? pc.defaultSolutionDesc;
                      const heroSrc = item.heroImage ?? item.image;
                      const productThumbs: readonly [string, string, string] =
                        item.thumbnails ?? ([item.image, item.image, item.image] as const);
                      return (
                        <div
                          key={item.href}
                          data-solution-strip-card
                          className="box-border flex h-full min-h-0 w-full max-w-full shrink-0 snap-start flex-col self-stretch min-w-full md:min-w-[calc((100%-1.5rem)/3)] md:max-w-none md:flex-[0_0_calc((100%-1.5rem)/3)] lg:min-w-[calc((100%-3rem)/5)] lg:flex-[0_0_calc((100%-3rem)/5)]"
                        >
                          <HomeSolutionShowcaseCard
                            locale={locale}
                            href={item.href}
                            title={title}
                            subtitle={desc}
                            heroSrc={heroSrc}
                            productThumbs={productThumbs}
                            index={i}
                            heroPriority={i === 0}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => scrollSolutionStrip("next")}
                  aria-label={pc.nextSolutions}
                  className="relative z-10 mt-1 flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center self-center rounded-xl border border-sand-300 bg-white text-dark shadow-[0_8px_22px_-12px_rgba(0,56,107,0.12)] transition-all duration-300 hover:border-primary/50 hover:bg-sand-100 hover:text-primary hover:shadow-[0_12px_28px_-14px_rgba(239,95,23,0.22)] sm:h-11 sm:w-11 lg:h-12 lg:w-12"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div
                id="product-categories"
                className="scroll-mt-24 border-t border-sand-300 pt-8 sm:pt-10 md:scroll-mt-[5.5rem] lg:pt-12"
              >
                <div className="mb-10 flex flex-wrap items-end gap-3 sm:gap-4">
                  <h2 className="font-display text-lg font-bold uppercase tracking-[0.2em] text-ink sm:text-xl">{n.products}</h2>
                  <div className="mb-0.5 h-px min-w-[4rem] flex-1 max-w-[14rem] bg-primary" aria-hidden />
                </div>

                <div className="-mx-1 flex items-stretch gap-2 px-1 sm:-mx-0 sm:gap-3 sm:px-0">
            <button
              type="button"
              onClick={() => scrollProductStrip("prev")}
              aria-label={pc.previousProducts}
              className="relative z-10 flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center self-center rounded-xl border border-sand-300 bg-white text-dark shadow-[0_8px_22px_-12px_rgba(0,56,107,0.12)] transition-all duration-300 hover:border-primary/50 hover:bg-sand-100 hover:text-primary hover:shadow-[0_12px_28px_-14px_rgba(239,95,23,0.22)] sm:h-11 sm:w-11 lg:h-12 lg:w-12"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="min-w-0 flex-1">
              <div
                ref={productStripCarouselRef}
                className="flex items-stretch gap-2 overflow-x-auto overscroll-x-contain py-2 [-webkit-overflow-scrolling:touch] scroll-smooth snap-x snap-mandatory sm:gap-3 sm:py-2.5 [&::-webkit-scrollbar]:hidden lg:gap-3"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {homeProductBandRows.map((row, i) => (
                  <div
                    key={row.href}
                    data-product-strip-card
                    className="box-border flex h-full min-h-0 w-full max-w-full shrink-0 snap-start flex-col self-stretch min-w-full md:min-w-[calc((100%-1.5rem)/3)] md:max-w-none md:flex-[0_0_calc((100%-1.5rem)/3)] lg:min-w-[calc((100%-3rem)/5)] lg:flex-[0_0_calc((100%-3rem)/5)]"
                  >
                    <HomeProductCategoryCard
                      locale={locale}
                      href={row.href}
                      title={row.label}
                      description={row.blurb}
                      families={row.features}
                      image={row.image}
                      index={i}
                      cta={pc.productCardCta}
                      imagePriority={i === 0}
                    />
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => scrollProductStrip("next")}
              aria-label={pc.nextProducts}
              className="relative z-10 flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center self-center rounded-xl border border-sand-300 bg-white text-dark shadow-[0_8px_22px_-12px_rgba(0,56,107,0.12)] transition-all duration-300 hover:border-primary/50 hover:bg-sand-100 hover:text-primary hover:shadow-[0_12px_28px_-14px_rgba(239,95,23,0.22)] sm:h-11 sm:w-11 lg:h-12 lg:w-12"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — PILLARS / ENGINEERING ANLAYIŞI */}
      <section id="engineering" className="relative bg-sand-100 pb-12 pt-8 sm:pb-16 sm:pt-10">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.38]" />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_60%_at_0%_35%,rgba(239, 95, 23,0.055),transparent_52%),radial-gradient(ellipse_70%_45%_at_100%_80%,rgba(36,48,68,0.04),transparent_50%)]"
          aria-hidden
        />

        <div className="relative mx-auto max-w-[1600px] px-3 sm:px-10 lg:px-16">
          {/* Kataloglar — Mühendislik özetinin altında, mühendislik desteği CTA’sının üstünde */}
          {allowRestrictedSections === true && (
            <>
          <div id="catalogs" className="relative mt-12 scroll-mt-24 sm:mt-14 md:scroll-mt-[5.5rem]">
            <div className="mb-8 flex flex-wrap items-end gap-3 sm:mb-10 sm:gap-4">
              <h2 className="font-display text-lg font-bold uppercase tracking-[0.2em] text-ink sm:text-xl">{pc.catalogsVertical}</h2>
              <div className="mb-0.5 h-px min-w-[4rem] flex-1 max-w-[14rem] bg-primary" aria-hidden />
              <Link
                href={`/${locale}/teknik-merkez/dokuman-kutuphanesi`}
                className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary transition-colors hover:text-primary-deep"
              >
                <span>{n.viewAll}</span>
                <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
              {catalogPreview.map((item, index) => {
                const cardDesc = (item.desc ?? "").trim() || pc.catalogCardDesc;
                const ctaLabel = (pc.catalogCardCta || pc.pillarCta).trim();
                return (
                  <Link
                    key={`${item.href}-${item.title}`}
                    href={`/${locale}${item.href}`}
                    data-catalog-card
                    className="group flex flex-col pt-3 transition-[transform] duration-300 [@media(hover:hover)]:hover:-translate-y-1"
                  >
                    <div className="relative z-[2] mx-auto w-[min(100%,22rem)] px-1 sm:w-[min(100%,24rem)] sm:px-0">
                      <div className="relative aspect-[16/11] overflow-hidden rounded-xl border border-white/90 bg-[#e4e7ec] shadow-[0_22px_48px_-28px_rgba(15,22,36,0.42)] ring-1 ring-black/[0.06] transition-[transform,box-shadow] duration-300 [@media(hover:hover)]:group-hover:shadow-[0_28px_56px_-28px_rgba(15,22,36,0.48)]">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          quality={92}
                          className="object-cover"
                          sizes="(max-width: 640px) min(92vw,22rem), (max-width: 1024px) 42vw, min(24rem, 33vw)"
                        />
                      </div>
                    </div>
                    <div className="relative z-[1] -mt-8 flex flex-1 flex-col rounded-2xl border border-ink/10 bg-white px-5 pb-6 pt-11 shadow-[0_16px_44px_-30px_rgba(15,22,36,0.28)] ring-1 ring-black/[0.03] transition-[box-shadow] duration-300 [@media(hover:hover)]:group-hover:shadow-[0_22px_50px_-30px_rgba(15,22,36,0.34)] sm:px-6 sm:pb-7 sm:pt-12">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-primary/22 bg-primary/[0.09] text-primary">
                        <HomeCatalogDocIcon variant={index} />
                      </div>
                      <h3 className="text-balance text-[1.15rem] font-bold leading-snug tracking-[-0.02em] text-ink sm:text-[1.28rem]">
                        {item.title}
                      </h3>
                      <p className="product-card-clamp-4 mt-2 text-meta leading-relaxed text-ink/65 sm:text-[15px]">{cardDesc}</p>
                      <span className="mt-6 inline-flex w-fit items-center justify-center gap-2.5 rounded-lg bg-primary px-6 py-3.5 text-[13px] font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 [@media(hover:hover)]:group-hover:bg-primary-deep [@media(hover:hover)]:group-hover:shadow-xl [@media(hover:hover)]:group-hover:shadow-primary/30">
                        {ctaLabel}
                        <svg className="h-4 w-4 transition-transform duration-300 [@media(hover:hover)]:group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

          </div>

          {/* Referanslar — sektör kartları (lacivert / koyu gri / açık gri + turuncu vurgu) */}
          <div id="references" className="relative mt-12 scroll-mt-24 sm:mt-14 md:scroll-mt-[5.5rem] lg:mt-16">
            {(() => {
              const refHead = referenceSectorHeadings(pc, n.links.references);
              return (
                <div className="flex flex-col gap-6 lg:gap-y-10">
                  <div className="min-w-0">
                    <div className="mb-8 sm:mb-10">
                      <div className="mb-3 h-0.5 w-12 shrink-0 bg-primary sm:mb-4 sm:w-14" aria-hidden />
                      <div className="flex flex-wrap items-end justify-between gap-3 sm:gap-4">
                        <div className="min-w-0 flex-1">
                          {refHead.kicker ? (
                            <p className="text-[11px] font-normal uppercase leading-snug tracking-[0.14em] text-[#1e3a5f] sm:text-xs sm:tracking-[0.12em]">
                              {refHead.kicker}
                            </p>
                          ) : null}
                          <h2
                            className={`text-balance font-display font-bold uppercase tracking-[0.06em] text-[#1e3a5f] sm:tracking-[0.05em] ${refHead.kicker ? "mt-1.5 text-card-sm leading-tight lg:leading-[1.1]" : "text-lg leading-snug tracking-[0.14em] sm:text-xl lg:text-2xl"}`}
                          >
                            {refHead.headline}
                          </h2>
                        </div>
                        <Link
                          href={`/${locale}/kurumsal/referanslar`}
                          className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary transition-colors hover:text-primary-deep"
                        >
                          <span>{n.viewAll}</span>
                          <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-4">
                  {referencePreview.map((item, index) => {
                    const theme = resolveReferenceSectorTheme(index, item.theme);
                    const styles = REFERENCE_SECTOR_THEME_STYLES[theme];
                    const onLight = styles.tone === "onLight";
                    const sector = (item.sector ?? item.title).trim();
                    const example = (item.example ?? "").trim();
                    const serverCount = referencePreviewProjectCounts?.[index];
                    const count =
                      typeof serverCount === "number"
                        ? String(serverCount)
                        : (item.projectCount ?? "").trim();
                    const projectWord = (pc.referenceProjectWord || "Proje").trim();
                    const explore = (pc.referenceExploreCta || pc.catalogCardCta || pc.pillarCta).trim();
                    const aria = example ? `${sector}: ${example}` : sector;
                    return (
                      <Link
                        key={`${item.href}-${sector}-${index}`}
                        href={`/${locale}${item.href}`}
                        data-reference-card
                        aria-label={aria}
                        className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-sand-200 shadow-[0_14px_40px_-28px_rgba(15,22,36,0.35)] ring-1 ring-black/[0.04] transition-[transform,box-shadow] duration-300 [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:shadow-[0_22px_48px_-28px_rgba(15,22,36,0.4)]"
                      >
                        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
                          <Image
                            src={item.image}
                            alt=""
                            fill
                            className="object-cover object-center transition-transform duration-500 [@media(hover:hover)]:group-hover:scale-[1.03]"
                            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 22vw"
                          />
                          <div
                            className={`pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b ${styles.imageTint}`}
                            aria-hidden
                          />
                          <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] flex justify-center pt-6 sm:pt-7">
                            <div
                              className={`flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center rounded-full shadow-[0_12px_28px_-6px_rgba(15,22,36,0.45)] ring-2 ring-white/85 ${styles.iconCircle}`}
                            >
                              <HomeReferenceSectorIcon theme={theme} />
                            </div>
                          </div>
                        </div>
                        <div
                          className={`flex flex-1 flex-col px-5 pb-6 pt-5 sm:px-6 sm:pb-7 ${styles.footer} ${onLight ? "text-[#1a2433]" : "text-white"}`}
                        >
                          <p className="text-[1.05rem] font-bold leading-snug tracking-[-0.02em] sm:text-[1.12rem]">
                            {sector}
                          </p>
                          {example ? (
                            <p
                              className={`mt-1.5 text-[13px] leading-snug sm:text-meta ${onLight ? "text-[#3d4a5c]" : "text-white/90"}`}
                            >
                              {example}
                            </p>
                          ) : (
                            <p
                              className={`product-card-clamp-3 mt-1.5 text-[13px] leading-snug sm:text-meta ${onLight ? "text-[#4a5568]" : "text-white/88"}`}
                            >
                              {pc.referenceCardDesc}
                            </p>
                          )}
                          <div
                            className={`my-4 h-px w-full ${onLight ? "bg-[#1a2842]/12" : "bg-white/35"}`}
                            aria-hidden
                          />
                          {count ? (
                            <p className="text-[2.1rem] font-bold leading-none tracking-tight text-current sm:text-[2.35rem]">
                              {count}
                              <span
                                className={`ml-2 text-base font-semibold tracking-normal sm:text-lg ${onLight ? "text-[#3d4a5c]" : "text-white/90"}`}
                              >
                                {projectWord}
                              </span>
                            </p>
                          ) : null}
                          <span className="mt-5 inline-flex w-fit items-center justify-center gap-2.5 rounded-lg bg-primary px-6 py-3.5 text-[13px] font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 [@media(hover:hover)]:group-hover:bg-primary-deep [@media(hover:hover)]:group-hover:shadow-xl [@media(hover:hover)]:group-hover:shadow-primary/30">
                            {explore}
                            <svg className="h-4 w-4 transition-transform duration-300 [@media(hover:hover)]:group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                  </div>
                </div>
              );
            })()}
          </div>
            </>
          )}

          {/* Sertifikalar — kataloglar bölümü ile aynı kart düzeni */}
          <div id="certificates" className="relative mt-12 scroll-mt-24 sm:mt-14 md:scroll-mt-[5.5rem]">
            <div className="mb-8 flex flex-wrap items-end gap-3 sm:mb-10 sm:gap-4">
              <h2 className="font-display text-lg font-bold uppercase tracking-[0.2em] text-ink sm:text-xl">{n.links.certificates}</h2>
              <div className="mb-0.5 h-px min-w-[4rem] flex-1 max-w-[14rem] bg-primary" aria-hidden />
              <Link
                href={`/${locale}/kurumsal/sertifikalar`}
                className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary transition-colors hover:text-primary-deep"
              >
                <span>{n.viewAll}</span>
                <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
              {certificatePreview.map((item, index) => {
                const ctaLabel = (pc.catalogCardCta || pc.pillarCta).trim();
                return (
                  <Link
                    key={`${item.href}-${item.title}`}
                    href={`/${locale}${item.href}`}
                    data-certificate-card
                    className="group flex flex-col pt-3 transition-[transform] duration-300 [@media(hover:hover)]:hover:-translate-y-1"
                  >
                    <div className="relative z-[2] mx-auto w-[min(100%,22rem)] px-1 sm:w-[min(100%,24rem)] sm:px-0">
                      <div className="relative aspect-[16/11] overflow-hidden rounded-xl border border-white/90 bg-[#e4e7ec] shadow-[0_22px_48px_-28px_rgba(15,22,36,0.42)] ring-1 ring-black/[0.06] transition-[transform,box-shadow] duration-300 [@media(hover:hover)]:group-hover:shadow-[0_28px_56px_-28px_rgba(15,22,36,0.48)]">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          quality={92}
                          className="object-cover"
                          sizes="(max-width: 640px) min(92vw,22rem), (max-width: 1024px) 42vw, min(24rem, 33vw)"
                        />
                      </div>
                    </div>
                    <div className="relative z-[1] -mt-8 flex flex-1 flex-col rounded-2xl border border-ink/10 bg-white px-5 pb-6 pt-11 shadow-[0_16px_44px_-30px_rgba(15,22,36,0.28)] ring-1 ring-black/[0.03] transition-[box-shadow] duration-300 [@media(hover:hover)]:group-hover:shadow-[0_22px_50px_-30px_rgba(15,22,36,0.34)] sm:px-6 sm:pb-7 sm:pt-12">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-primary/22 bg-primary/[0.09] text-primary">
                        <HomeCatalogDocIcon variant={index} />
                      </div>
                      <h3 className="text-balance text-[1.15rem] font-bold leading-snug tracking-[-0.02em] text-ink sm:text-[1.28rem]">
                        {item.title}
                      </h3>
                      <p className="product-card-clamp-4 mt-2 text-meta leading-relaxed text-ink/65 sm:text-[15px]">{item.desc ?? pc.certificateCardDesc}</p>
                      <span className="mt-6 inline-flex w-fit items-center justify-center gap-2.5 rounded-lg bg-primary px-6 py-3.5 text-[13px] font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 [@media(hover:hover)]:group-hover:bg-primary-deep [@media(hover:hover)]:group-hover:shadow-xl [@media(hover:hover)]:group-hover:shadow-primary/30">
                        {ctaLabel}
                        <svg className="h-4 w-4 transition-transform duration-300 [@media(hover:hover)]:group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

          </div>

          {/* Mühendislik adımları — büyük adım numarası, paralelkenar görsel, alternatif satır düzeni */}
          <HomeEngineeringPillarsJourneyStrip
            pillars={dict.pillars}
            locale={locale}
            strip={dict.engineeringPillarsSection}
            fallbackTitle={pc.pillarsFallbackTitle}
            pc={pc}
          />

          {/* CFD — Mühendislik adımlarının altında, video + cam panel açıklama */}
          <div className="border-b border-ink/10 pb-16">
            <div
              className={`grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-stretch lg:gap-x-12 lg:gap-y-0 xl:gap-x-16 ${
                dict.engineeringShowcase ? "lg:grid-rows-[auto_minmax(0,1fr)]" : ""
              }`}
            >
              {/* Üst sol — CFD şeridi (kart aynı hizada videonun satırında başlar) */}
              {dict.engineeringShowcase ? (
                <div className="relative z-[2] mx-auto mb-6 flex w-full max-w-[min(92vw,480px)] flex-wrap items-end gap-3 md:max-w-[min(94vw,44rem)] sm:mb-7 sm:gap-4 lg:col-start-1 lg:row-start-1 lg:mx-0 lg:mb-8 lg:max-w-none">
                  <h2 className="font-display text-lg font-bold uppercase tracking-[0.2em] text-ink sm:text-xl">CFD</h2>
                  <div className="mb-0.5 h-px min-w-[4rem] flex-1 max-w-[14rem] bg-primary" aria-hidden />
                </div>
              ) : null}

              {/* Alt sol — video */}
              <div
                className={`relative mx-auto flex w-full max-w-[min(92vw,480px)] min-w-0 flex-col md:max-w-[min(94vw,44rem)] lg:mx-0 lg:max-w-none lg:min-h-0 ${
                  dict.engineeringShowcase ? "lg:row-start-2" : "lg:row-start-1"
                } lg:h-full`}
              >
                <div className="relative flex min-h-0 w-full flex-1 flex-col lg:min-h-0 lg:flex-row lg:max-w-none">
                  <div className="group relative min-h-0 flex-1 overflow-hidden rounded-[1.75rem] shadow-[0_28px_72px_-40px_rgba(15,22,36,0.32)] ring-1 ring-[#243044]/[0.08] transition-[transform,box-shadow] duration-700 ease-out will-change-transform hover:scale-[1.012] hover:shadow-[0_36px_88px_-44px_rgba(15,22,36,0.36)] motion-reduce:transition-none motion-reduce:hover:scale-100 lg:flex lg:min-h-0">
                    <div className="relative aspect-[16/10] w-full min-h-0 lg:aspect-auto lg:h-full lg:min-h-[12rem]">
                      <video
                        src={engineeringCollage.primaryVideo}
                        className="absolute inset-0 h-full w-full object-cover object-center transition-[filter] duration-700 group-hover:brightness-[1.03] motion-reduce:transition-none"
                        aria-label={pc.engineeringAlt1}
                        controls
                        playsInline
                        loop
                        preload="auto"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sağ — cam panel + editoryal tipografi (masaüstünde videoyla üstten hizalı) */}
              <div
                className={`relative flex min-h-0 min-w-0 flex-col lg:col-start-2 lg:h-full ${
                  dict.engineeringShowcase ? "lg:row-start-2" : "lg:row-start-1"
                }`}
              >
                <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.75rem] border border-white/55 bg-white/55 p-8 shadow-[0_28px_80px_-48px_rgba(15,22,36,0.3)] backdrop-blur-xl sm:p-10 lg:p-11 ring-1 ring-black/[0.04]">
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/[0.07] blur-3xl"
                    aria-hidden
                  />

                  {dict.engineeringShowcase ? (
                    <div className="relative max-w-[52ch]">
                      <p className="font-mono-eng text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                        {dict.engineeringShowcase.title}
                      </p>
                      <h2
                        className="mt-3 text-balance font-display text-card font-bold tracking-[-0.03em] text-ink"
                        style={{ lineHeight: 1.14 }}
                      >
                        {dict.engineeringShowcase.subtitle}
                      </h2>
                      <p className={`mt-4 sm:mt-5 ${homeBodySecondary}`}>{dict.engineeringShowcase.body}</p>
                      <Link
                        href={`/${locale}/cozumler/cfd-muhendislik-danismanligi`}
                        className="group mt-5 inline-flex w-fit items-center justify-center gap-2.5 rounded-lg bg-primary px-6 py-3.5 text-[13px] font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-deep hover:shadow-xl hover:shadow-primary/30 sm:mt-6"
                      >
                        {dict.engineeringShowcase.cta}
                        <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </Link>
                    </div>
                  ) : null}

                  {!dict.engineeringShowcase ? (
                    <>
                      {dict.pillars[0]?.tag ? (
                        <div className="relative">
                          <span className="inline-flex items-center gap-2 rounded-full border border-primary/18 bg-primary/[0.08] px-3.5 py-1.5 font-mono-eng text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                            <span className="h-1 w-1 shrink-0 rounded-full bg-primary shadow-[0_0_0_4px_rgba(239, 95, 23,0.18)]" />
                            {dict.pillars[0].tag}
                          </span>
                        </div>
                      ) : null}
                      <p
                        className={`relative mt-8 max-w-[52ch] border-t border-ink/[0.07] pt-8 text-body leading-[1.72] tracking-[-0.011em] text-ink/[0.78] sm:text-[18px] sm:leading-[1.66]`}
                      >
                        {dict.pillars[0]?.intro ?? ""}
                      </p>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* 06 — FAQ (mockup) & final CTA */}
      <section id="faq" className="relative scroll-mt-24 bg-sand-200 py-10 sm:py-14 md:scroll-mt-[5.5rem]">
        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-10 lg:px-16">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-12">
            <div className="flex flex-col lg:col-span-4 lg:pt-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-[11px] sm:tracking-[0.22em]">
                {dict.faq.tag}
              </p>
              <h2
                className="mt-3 text-balance font-display text-card font-bold tracking-[-0.03em] text-ink"
                style={{ lineHeight: 1.15 }}
              >
                {dict.faq.headline ?? dict.faq.title ?? dict.faq.tag}
              </h2>
              {dict.faq.desc ? (
                <p className="mt-3 max-w-[34ch] text-[13px] leading-[1.6] text-ink/70 sm:text-meta">{dict.faq.desc}</p>
              ) : null}
              {/* Sol görsel — sadece lg+ ekranlarda görünür (tablet/mobilde gizli, layout bozulmasın) */}
              <div className="mt-6 hidden flex-1 lg:block">
                <div className="relative h-full min-h-[320px] w-full overflow-hidden rounded-2xl bg-[#0f1d33] ring-1 ring-ink/[0.08] shadow-[0_22px_46px_-28px_rgba(15,22,36,0.32)]">
                  <Image
                    src="/images/faq-visual.jpg?v=4"
                    alt={dict.faq.tag}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover object-center"
                    unoptimized
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="border-t border-ink/[0.08]">
                {dict.faq.items.map((item, index) => {
                  const isOpen = openFaq === index;
                  const num = String(index + 1).padStart(2, "0");
                  return (
                    <div key={item.q} className="border-b border-ink/[0.08]">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="group grid w-full grid-cols-[auto_1fr_auto] items-start gap-x-3 py-3.5 text-left sm:gap-x-5 sm:py-4"
                      >
                        <span
                          className="font-product-card-num select-none pt-0.5 text-[clamp(1.5rem,2.6vw,2rem)] font-bold leading-none tabular-nums text-primary/28 transition-colors duration-300 group-hover:text-primary/40"
                          aria-hidden
                        >
                          {num}
                        </span>
                        <span className="min-w-0 pt-1 text-meta font-semibold leading-[1.35] text-ink sm:text-[15px] sm:leading-[1.4]">
                          {item.q}
                        </span>
                        <span
                          className="pt-1 font-mono-eng text-[18px] font-light leading-none text-ink/35 transition-colors duration-300 group-hover:text-primary/70 sm:text-metric-sm"
                          aria-hidden
                        >
                          {isOpen ? "×" : "+"}
                        </span>
                      </button>
                      <div
                        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
                          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                        aria-hidden={!isOpen}
                      >
                        <div className="min-h-0">
                          <div
                            className={`grid grid-cols-[auto_1fr_auto] gap-x-3 pb-4 sm:gap-x-5 sm:pb-5 ${
                              isOpen ? "" : "pointer-events-none"
                            }`}
                          >
                            <span aria-hidden className="invisible text-[clamp(1.5rem,2.6vw,2rem)] leading-none">
                              {num}
                            </span>
                            <div className="min-w-0">
                              <p className="text-fine leading-[1.6] text-[#6b7280] sm:text-meta sm:leading-[1.65]">
                                {item.a}
                              </p>
                              {item.linkHref && item.linkLabel ? (
                                <Link
                                  href={`/${locale}${item.linkHref}`}
                                  title={item.linkAriaLabel}
                                  aria-label={item.linkAriaLabel ?? item.linkLabel}
                                  className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-primary transition-colors duration-300 hover:text-primary-deep sm:text-meta"
                                >
                                  {item.linkLabel}
                                </Link>
                              ) : null}
                            </div>
                            <span aria-hidden className="w-[22px] sm:w-6" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {dict.faq.footerLinkHref && dict.faq.footerLinkLabel ? (
                <div className="mt-5 border-t border-ink/[0.08] pt-5 sm:mt-6 sm:pt-6">
                  <Link
                    href={`/${locale}${dict.faq.footerLinkHref}`}
                    title={dict.faq.footerLinkAriaLabel}
                    aria-label={dict.faq.footerLinkAriaLabel ?? dict.faq.footerLinkLabel}
                    className="inline-flex items-center gap-1 text-fine font-semibold text-primary/90 transition-colors duration-300 hover:text-primary sm:text-[13px]"
                  >
                    {dict.faq.footerLinkLabel}
                  </Link>
                </div>
              ) : null}
            </div>
          </div>

          <aside className="mt-14 sm:mt-16 lg:mt-20">
            <div className="overflow-hidden rounded-[1.35rem] bg-[#eeedea] shadow-[0_22px_55px_-38px_rgba(15,22,36,0.14)] ring-1 ring-ink/[0.06] sm:rounded-[1.75rem]">
              <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
                <div className="flex flex-col justify-between px-6 py-8 sm:px-9 sm:py-10 lg:px-11 lg:py-11">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary sm:text-fine">
                      {dict.finalCta.tag}
                    </p>
                    <h3
                      className="mt-3 max-w-[22ch] text-balance font-bold tracking-[-0.03em] text-ink"
                      style={{ fontSize: "clamp(1.65rem, 2.8vw, 2.35rem)", lineHeight: 1.1 }}
                    >
                      {dict.finalCta.title}
                    </h3>
                    <p className={`mt-4 max-w-[52ch] ${homeLeadInk}`}>{dict.finalCta.desc}</p>

                    <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                      <Link
                        href={`/${locale}/iletisim`}
                        className="group inline-flex items-center justify-center gap-2.5 rounded-lg bg-primary px-6 py-3.5 text-[13px] font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-deep hover:shadow-xl hover:shadow-primary/30"
                      >
                        {dict.finalCta.requestQuote}
                        <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </Link>
                      {dict.finalCta.callBack ? (
                        <Link
                          href={`/${locale}/iletisim`}
                          className="group inline-flex items-center justify-center gap-2.5 rounded-lg bg-primary px-6 py-3.5 text-[13px] font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-deep hover:shadow-xl hover:shadow-primary/30"
                        >
                          {dict.finalCta.callBack}
                          <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </Link>
                      ) : null}
                    </div>
                  </div>

                  {dict.finalCta.stat1Label && dict.finalCta.stat1Value ? (
                    <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-ink/[0.08] pt-6 sm:gap-x-14">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-secondary/55">
                          {dict.finalCta.stat1Label}
                        </p>
                        <p className="mt-1 text-[15px] font-bold tracking-[-0.02em] text-ink sm:text-body">
                          {dict.finalCta.stat1Value}
                        </p>
                      </div>
                      {dict.finalCta.stat2Label && dict.finalCta.stat2Value ? (
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-secondary/55">
                            {dict.finalCta.stat2Label}
                          </p>
                          <p className="mt-1 text-[15px] font-bold tracking-[-0.02em] text-ink sm:text-body">
                            {dict.finalCta.stat2Value}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>

                <div className="relative hidden min-h-[22rem] lg:block">
                  <Image
                    src="/images/finalcta.png"
                    alt={dict.finalCta.title}
                    fill
                    className="object-cover object-center"
                    sizes="45vw"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#eeedea] via-[#eeedea]/72 to-transparent"
                    aria-hidden
                  />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Şirket profili — FAQ'in altında */}
      <section className="relative bg-sand-200 py-12 sm:py-16">
        <div className="relative mx-auto max-w-[1600px] px-3 sm:px-10 lg:px-16">
          {companyProfileSection ? (
            <HomeCompanyProfileSectionBlock
              locale={locale}
              verticalLabel={pc.companyProfileVertical}
              section={companyProfileSection}
              viewAllCorporate={n.viewAll}
            />
          ) : (
            <div id="company-profile" className="relative scroll-mt-24 md:scroll-mt-[5.5rem]">
              <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-x-3 lg:gap-y-8">
                <div className="flex w-full justify-center self-start lg:col-start-1 lg:row-start-1 lg:w-auto lg:justify-start lg:self-center">
                  <SectionStripLabel
                    tone="ink"
                    label={pc.companyProfileVertical}
                    dimmed={hoveredCompanyProfileIndex !== null}
                  />
                </div>

                <div className="flex min-h-0 min-w-0 w-full flex-col gap-4 lg:col-start-2 lg:row-start-1 lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-visible">
                  {companyProfileCards.map((item, index) => {
                    const title = item.title;
                    return (
                      <Link
                        key={item.href}
                        href={`/${locale}${item.href}`}
                        data-company-profile-card
                        onMouseEnter={() => {
                          if (canUseFineHover()) setHoveredCompanyProfileIndex(index);
                        }}
                        onMouseLeave={() => setHoveredCompanyProfileIndex(null)}
                        className={`group flex w-full shrink-0 flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_12px_34px_-24px_rgba(15,20,30,0.22)] transition-all duration-300 active:scale-[0.99] max-lg:aspect-[4/5] max-lg:max-h-[min(92vh,560px)] max-lg:min-h-0 lg:aspect-square lg:min-h-[400px] lg:max-h-none ${
                          hoveredCompanyProfileIndex === null
                            ? "[@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:shadow-[0_18px_42px_-24px_rgba(15,20,30,0.28)]"
                            : hoveredCompanyProfileIndex === index
                              ? "z-10 scale-[1.07] border-[#243044]/40 shadow-[0_24px_56px_-24px_rgba(15,20,30,0.34)] lg:scale-[1.07]"
                              : "[@media(hover:hover)]:scale-[0.9] [@media(hover:hover)]:opacity-75"
                        }`}
                      >
                        <div className="relative flex-[0_0_56%] overflow-hidden border-b border-ink/10 bg-[#eef1f4] sm:flex-[0_0_54%]">
                          <Image
                            src={item.image}
                            alt={title}
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 42vw, min(480px, 33vw)"
                          />
                        </div>
                        <div className="flex flex-1 flex-col px-5 py-3 sm:px-5 sm:py-3.5">
                          <p className="font-mono-eng text-[10px] uppercase tracking-[0.2em] text-ink/45">
                            {pc.companyEyebrow}
                          </p>
                          <h3 className="product-card-clamp-2 mt-2 text-[1.2rem] font-semibold leading-[1.15] text-ink transition-colors group-hover:text-[#243044] sm:text-[1.28rem]">
                            {title}
                          </h3>
                          <p className="product-card-clamp-3 mt-2 text-[13px] leading-[1.55] text-ink/62 sm:text-meta">
                            {pc.companyCardDesc}
                          </p>
                          <div className="mt-auto pt-2.5 font-mono-eng text-[9px] font-medium tracking-[0.12em] text-[#243044] sm:text-[10px]">
                            {pc.pillarCta}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                <div className="flex w-full justify-center lg:col-start-2 lg:row-start-2">
                  <Link
                    href={`/${locale}/kurumsal`}
                    className="group inline-flex items-center justify-center gap-2.5 rounded-lg bg-primary px-6 py-3.5 text-[13px] font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-deep hover:shadow-xl hover:shadow-primary/30"
                  >
                    <span>{n.viewAll}</span>
                    <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>


    </main>
  );
}
