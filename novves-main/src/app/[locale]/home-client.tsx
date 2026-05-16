"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SectionStripLabel } from "@/components/carousel-strip-label";
import { ScrollVideoSection } from "@/components/scroll-video-section";
import {
  COOKIE_CONSENT_EVENT,
  isConsentRestrictedMinimal,
  parseStoredConsentJson,
  readCookieConsentRaw,
} from "@/lib/cookie-consent-storage";
import { PRODUCT_CATEGORY_NAV } from "@/lib/hub-nav-config";
import { solutionStripPageProductMedia } from "@/lib/solution-strip-media";

/** Sertifika şeridi — `globals.css` --sand-200 ile aynı (ürün görseli arka plan tonu) */
const HOME_CERTIFICATE_STRIP_BG = "#eaeadf";

type CompanyProfileMilestoneIcon = "flag" | "chart" | "certificate" | "star" | "people";

type CompanyProfileMilestone = {
  year: string;
  title: string;
  body: string;
  image: string;
  icon?: CompanyProfileMilestoneIcon;
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
    title: string;
    items: { q: string; a: string }[];
  };
  finalCta: {
    tag: string;
    title: string;
    desc: string;
    requestQuote: string;
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
  certificatePreview?: { title: string; href: string; image: string }[];
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
    image: "/images/products/tiger-pre.png",
    thumbs: ["/images/products/tiger-pre.png", "/images/products/dragonfly-c.png", "/images/products/marlin.png"],
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

/** Ürün şeridi: lg+ ok beş kartlık sayfa; daha dar ekranda tek kart adımı */
const PRODUCT_STRIP_PAGE_CARD_COUNT = 5;
/** Çözüm şeridi: lg+ ok beş kartlık sayfa (ürün şeridi ile aynı) */
const SOLUTION_STRIP_PAGE_CARD_COUNT = 5;

function scrollHorizontalStrip(
  container: HTMLElement | null,
  cardSelector: string,
  direction: "prev" | "next",
  desktopPageCardCount: number,
) {
  if (!container) return;
  const cards = Array.from(container.querySelectorAll(cardSelector)) as HTMLElement[];
  if (cards.length < 2) return;
  const cardStep = cards[1]!.offsetLeft - cards[0]!.offsetLeft;
  if (cardStep <= 0) return;

  const isDesktop =
    typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;
  let delta: number;
  if (isDesktop) {
    const pageEndIdx = Math.min(desktopPageCardCount, cards.length - 1);
    delta = cards[pageEndIdx]!.offsetLeft - cards[0]!.offsetLeft;
  } else {
    delta = cardStep;
  }
  if (direction === "prev") delta = -delta;
  const maxScroll = Math.max(0, container.scrollWidth - container.clientWidth);
  const target = Math.max(0, Math.min(maxScroll, container.scrollLeft + delta));
  container.scrollTo({ left: target, behavior: "smooth" });
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
    thumbnails: m.thumbnails,
  };
});

const homeSolutionBandSlides = solutionCategorySlides;

function HomeMarketStripBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-sand-100" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_-5%,rgba(0,56,107,0.06),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_100%_100%,rgba(239,95,23,0.05),transparent_52%)]" />
      <div
        className="absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(216,216,205,0.55) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
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

function CompanyProfileTimelineIcon({ kind }: { kind: CompanyProfileMilestoneIcon }) {
  const cls = "h-5 w-5";
  const sw = 1.75;
  const stroke = COMPANY_PROFILE_NAVY;
  switch (kind) {
    case "flag":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 3v18" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
          <path
            d="M5 4h11l-2 4 2 4H5"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      );
    case "chart":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 19h16" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
          <path d="M7 15v-4M12 15V8M17 15v-7" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      );
    case "certificate":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="5" y="4" width="14" height="12" rx="1" stroke={stroke} strokeWidth={sw} />
          <path d="M9 10h6M9 13h4" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
          <path d="M12 16v4l2-1 2 1v-4" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
        </svg>
      );
    case "star":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 3l2.2 5.5L20 10l-4.5 3.3L17 20l-5-3-5 3 1.5-6.7L4 10l5.8-1.5L12 3z"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      );
    case "people":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="9" cy="8" r="3" stroke={stroke} strokeWidth={sw} />
          <circle cx="16" cy="9" r="2.5" stroke={stroke} strokeWidth={sw} />
          <path
            d="M4 20c0-3 2.5-5 5-5s5 2 5 5M13 20c0-2.2 1.8-4 4-4"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

function CompanyProfileGoalPillarIcon({ index }: { index: number }) {
  const cls = "h-6 w-6 shrink-0";
  const sw = 1.65;
  const stroke = COMPANY_PROFILE_NAVY;
  const i = index % 4;
  if (i === 0) {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 3c-4 4-7 7-7 11a7 7 0 0014 0c0-4-3-7-7-11z"
          stroke={stroke}
          strokeWidth={sw}
          strokeLinejoin="round"
        />
        <path d="M12 11v6M9 14h6" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      </svg>
    );
  }
  if (i === 1) {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="3" stroke={stroke} strokeWidth={sw} />
        <path
          d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
          stroke={stroke}
          strokeWidth={sw}
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (i === 2) {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <circle cx="9" cy="7" r="4" stroke={stroke} strokeWidth={sw} />
        <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10c3-2 6-3 8-3s5 1 8 3v10H4V10z"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <path d="M8 14h8M8 17h5" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
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
  const milestoneIconCycle: CompanyProfileMilestoneIcon[] = ["flag", "chart", "certificate", "star", "people"];
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
                  className={`max-lg:text-left text-[13px] font-bold uppercase leading-snug tracking-[0.2em] antialiased sm:text-[15px] lg:text-center lg:text-[18px] lg:leading-none lg:tracking-[0.22em] xl:text-[20px] lg:[text-orientation:mixed] lg:[writing-mode:vertical-rl] lg:rotate-180 ${navy}`}
                >
                  {verticalLabel}
                </span>
              </div>
            </div>

            <div className="min-w-0 space-y-12 sm:space-y-14 lg:space-y-16">
              {/* Zaman çizelgesi */}
              <section aria-labelledby="company-profile-timeline-heading">
                <p className={`max-w-[52ch] text-[14px] leading-relaxed text-ink/75 sm:text-[15px] ${navy}`}>
                  {section.timelineIntro}
                </p>
                <h2
                  id="company-profile-timeline-heading"
                  className={`mt-4 max-w-[40ch] text-balance text-xl font-bold leading-snug tracking-[-0.02em] sm:text-2xl lg:text-[1.65rem] lg:leading-[1.2] ${navy}`}
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

                  <ul className="grid gap-10 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-5 lg:gap-4">
                    {section.milestones.map((m, index) => {
                      const iconKind = m.icon ?? milestoneIconCycle[index % milestoneIconCycle.length]!;
                      return (
                        <li key={`${m.year}-${m.title}`} className="relative z-[1] flex flex-col items-center text-center">
                          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#1e3a5f] bg-sand-100 shadow-sm">
                            <CompanyProfileTimelineIcon kind={iconKind} />
                          </div>
                          <div className="relative mb-3 w-full overflow-hidden rounded-lg border border-[#1e3a5f]/10 bg-white shadow-sm">
                            <div className="relative aspect-[4/3] w-full">
                              <Image
                                src={m.image}
                                alt=""
                                fill
                                className="object-cover object-center"
                                sizes="(max-width: 640px) 88vw, (max-width: 1024px) 40vw, 18vw"
                              />
                            </div>
                          </div>
                          <p className={`font-mono-eng text-[11px] font-bold tracking-[0.14em] ${navy}`}>{m.year}</p>
                          <p className={`mt-1 text-[15px] font-bold leading-snug ${navy}`}>{m.title}</p>
                          <p className="mt-1.5 max-w-[28ch] text-[13px] leading-relaxed text-ink/68 sm:text-[14px]">
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
                className="overflow-hidden rounded-2xl border border-[#1e3a5f]/10 bg-white/70 p-6 shadow-[0_16px_48px_-36px_rgba(15,22,36,0.2)] sm:p-8 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] lg:items-stretch lg:gap-10"
                aria-labelledby="company-profile-goals-heading"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <HomeCompanyProfileGoalsTargetIcon />
                    <h3 id="company-profile-goals-heading" className={`text-lg font-bold uppercase tracking-[0.12em] sm:text-xl ${navy}`}>
                      {section.goalsTitle}
                    </h3>
                  </div>
                  <p className={`mt-4 max-w-[56ch] text-[14px] leading-relaxed text-ink/72 sm:text-[15px] ${navy}`}>
                    {section.goalsIntro}
                  </p>
                  <ul className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-8">
                    {section.goalsPillars.map((p, i) => (
                      <li key={p.title} className="flex gap-3 text-left sm:gap-4">
                        <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#1e3a5f]/12 bg-sand-100">
                          <CompanyProfileGoalPillarIcon index={i} />
                        </div>
                        <div>
                          <p className={`text-[15px] font-bold leading-snug ${navy}`}>{p.title}</p>
                          <p className="mt-1 text-[13px] leading-relaxed text-ink/68 sm:text-[14px]">{p.body}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                {goalsAsidePath ? (
                  <div className="relative mt-8 min-h-[220px] w-full overflow-hidden rounded-xl border border-[#1e3a5f]/8 bg-[#1a2842] sm:min-h-[260px] lg:mt-0 lg:h-full lg:min-h-[min(100%,400px)] lg:self-stretch">
                    <Image
                      key={goalsAsideRaw || goalsAsidePath}
                      src={goalsAsidePath}
                      alt={section.goalsAsideImageAlt ?? ""}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 92vw, 400px"
                    />
                  </div>
                ) : null}
              </section>

              {/* Alt banner */}
              <div className="flex flex-col items-stretch gap-6 rounded-2xl border border-[#1e3a5f]/10 bg-gradient-to-br from-[#ebe9e4] via-[#f2f0eb] to-[#e6e4df] px-6 py-7 shadow-[0_14px_40px_-28px_rgba(15,22,36,0.22)] sm:flex-row sm:items-center sm:gap-8 sm:px-8 sm:py-8">
                <div
                  className="mx-auto flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#1e3a5f] text-white shadow-md sm:mx-0"
                  aria-hidden
                >
                  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1 text-center sm:text-left">
                  <p className={`text-[1.05rem] font-bold leading-snug sm:text-[1.15rem] ${navy}`}>{section.bannerTitle}</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink/70 sm:text-[14px]">{section.bannerLine1}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink/70 sm:text-[14px]">{section.bannerLine2}</p>
                </div>
                <div className="flex shrink-0 justify-center sm:justify-end">
                  <Image
                    src="/images/novves-logo.svg"
                    alt={section.bannerLogoAlt}
                    width={160}
                    height={44}
                    className="h-9 w-auto opacity-[0.92] sm:h-10"
                  />
                </div>
              </div>

              <div className="flex w-full justify-center pt-2">
                <Link
                  href={`/${locale}/kurumsal`}
                  className="btn-3d btn-3d-dark group inline-flex items-center gap-3 rounded-2xl border border-ink/15 bg-ink px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.24em] text-sand-100 transition-all duration-300 hover:border-primary hover:bg-primary"
                >
                  <span>{viewAllCorporate}</span>
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
            <span className="text-[15px] tabular-nums sm:text-[16px]">{String(index + 1).padStart(2, "0")}</span>
          </div>
          <div className="flex min-h-0 w-0 min-w-0 flex-1 flex-col overflow-hidden pt-0.5">
            <h3 className="line-clamp-2 min-h-[2.75em] text-[14px] font-bold leading-snug text-white sm:text-[15px]">{title}</h3>
            <p className="mt-0.5 line-clamp-2 min-h-[3.25em] text-[11px] leading-relaxed text-white/88 sm:mt-1 sm:text-[12px]">{subtitle}</p>
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
        <h3 className="line-clamp-2 min-h-[2.75em] text-[13.5px] font-bold leading-snug text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] sm:text-[15px]">
          {title}
        </h3>
        <p className="mt-1 line-clamp-2 min-h-[3.25em] max-w-[13rem] text-[11px] leading-relaxed text-white/65 sm:text-[12px]">
          {subtitle}
        </p>
        {features && features.length > 0 ? (
          <ul className="mt-3.5 space-y-1.5 max-w-[13rem] text-[12px] font-semibold leading-snug text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.75)] sm:mt-4 sm:space-y-2 sm:text-[12.5px]">
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
 * `PRODUCT_CATEGORY_NAV.slice(0,9)` sırasıyla eşleşir; dict’te `productCategoryFeatures`
 * varsa onlar kullanılır, yoksa bu TR fallback gösterilir.
 */
const HOME_PRODUCT_BAND_FEATURE_FALLBACKS: readonly (readonly string[])[] = [
  ["Yüksek debi performansı", "Düşük gürültü seviyesi", "EC motor seçeneği"],
  ["Konfor ve verim dengesi", "Mevsimsel iklim kontrolü", "Isı geri kazanım"],
  ["Enerji verimli operasyon", "Yıl boyu kullanım", "Akıllı kontrol"],
  ["Hassas debi kontrolü", "Bölgesel optimizasyon", "Modüler tasarım"],
  ["Homojen alan dağılımı", "Düşük basınç kaybı", "Geniş çap yelpazesi"],
  ["HEPA & karbon filtre", "Uzun ömürlü kartuş", "Hijyenik alan uyumu"],
  ["Geniş bağlantı yelpazesi", "Kolay montaj", "Standart ölçüler"],
  ["BMS entegrasyonu", "Uzaktan izleme", "Akıllı kontrol panosu"],
  ["Yaylı izolatörler", "Düşük frekans damping", "Endüstriyel uyum"],
];

/**
 * Hero altı şerit — standart grupları peş peşe: ISO (9001+14001) → BSI → AB (CE+EN) → TSE → test (Efectis)
 * Renkli PNG’ler invert edilmez (`keepColorPng` ile).
 */
const certificateLogoBarItems = [
  { src: "/images/certificates/ISO9001.png?v=7", alt: "ISO 9001" },
  { src: "/images/certificates/ISO14001.png?v=1", alt: "ISO 14001" },
  { src: "/images/certificates/bsi.png?v=2", alt: "BSI" },
  { src: "/images/certificates/CE.png?v=10", alt: "CE" },
  { src: "/images/certificates/ENEC.png?v=1", alt: "EN" },
  { src: "/images/certificates/TSE.png?v=1", alt: "TSE" },
  { src: "/images/certificates/Efectis.svg", alt: "Efectis" },
] as const;
const certificateLogoMarqueeItems = [...certificateLogoBarItems, ...certificateLogoBarItems] as const;

/** Ana sayfa tipografi: display ↔ mono arası lead (17–18px), gövde (15px); dikey ritim 8px tabanı */
const homeLeadInk =
  "text-[17px] font-normal leading-[1.68] tracking-[-0.011em] text-ink/[0.76] sm:text-[18px] sm:leading-[1.66]";
const homeLeadSecondary =
  "text-[17px] font-normal leading-[1.68] tracking-[-0.011em] text-secondary/80 sm:text-[18px] sm:leading-[1.66]";
const homeLeadWhite =
  "text-[17px] font-normal leading-[1.68] tracking-[-0.011em] text-white/78 sm:text-[18px] sm:leading-[1.66]";
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
                className="font-bold text-ink"
                style={{ fontSize: "clamp(1.8rem, 3.1vw, 3.1rem)", lineHeight: 1.02, letterSpacing: "-0.02em" }}
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
        <h2 className={`font-bold ${textTitle} lg:col-span-8`} style={{ fontSize: "clamp(2.5rem, 4.4vw, 5rem)", lineHeight: 0.98, letterSpacing: "-0.02em" }}>
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

/** Referans — yumuşak şeftali tonu büyük adım numaraları için */
const PILLAR_STEP_NUM_COLOR = "#e8c5b0";

const pillarNumberPositions = [
  "lg:left-0 lg:top-0",
  "lg:right-0 lg:top-0",
  "lg:left-0 lg:bottom-0",
] as const;

function HomeEngineeringPillarsJourneyStrip({
  pillars,
  locale,
  strip,
  fallbackTitle,
  pc,
}: {
  pillars: HomeDict["pillars"];
  locale: string;
  strip?: { title: string; subtitle: string; lead?: string } | null | undefined;
  fallbackTitle: string;
  pc: PageChrome;
}) {
  const title = (strip?.title ?? "").trim() || fallbackTitle.trim();
  const subtitle = (strip?.subtitle ?? "").trim();

  return (
    <div id="pillars-journey" className="mt-12 scroll-mt-24 md:scroll-mt-[5.5rem]">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-sand-100 px-5 py-10 shadow-[0_30px_80px_-44px_rgba(15,22,36,0.22)] ring-1 ring-ink/[0.06] sm:rounded-[2.25rem] sm:px-9 sm:py-14 lg:px-14 lg:py-[4.5rem]">
        <header className="mb-14 sm:mb-16 lg:mb-20">
          <h2
            className="font-black uppercase text-ink"
            style={{ fontSize: "clamp(1.9rem, 4.8vw, 3.75rem)", lineHeight: 0.95, letterSpacing: "-0.03em" }}
          >
            {title}
          </h2>
          {subtitle ? (
            <p
              className="mt-2.5 font-bold uppercase text-primary"
              style={{ fontSize: "clamp(1.25rem, 2.8vw, 2.2rem)", lineHeight: 1.05, letterSpacing: "-0.015em" }}
            >
              {subtitle}
            </p>
          ) : null}
        </header>

        <div className="flex flex-col gap-14 sm:gap-16 lg:gap-20">
          {pillars.map((pillar, index) => {
            const isOdd = index % 2 === 1;
            const rawPath = (pillar.href ?? pillarLinks[index] ?? "/kurumsal").trim() || "/kurumsal";
            const path = rawPath.startsWith("/") ? rawPath : `/${rawPath}`;
            const pillarHref = `/${locale}${path}`;
            const pillarCta = (pillar.cta ?? pc.pillarCta).trim() || pc.pillarCta;
            const img = pillarImages[index] ?? pillarImages[0]!;
            const num = String(index + 1).padStart(2, "0");
            const stepLabel = pillarStepLabel(pillar.tag);

            const numberPos = pillarNumberPositions[index % pillarNumberPositions.length] ?? pillarNumberPositions[0]!;

            /* ── Desktop: büyük blend sayı ── */
            const numberBlock = (
              <span
                key="num"
                aria-hidden
                className={`pointer-events-none absolute hidden select-none font-home-display font-bold lg:block lg:opacity-[0.82] ${numberPos}`}
                style={{
                  fontSize: "clamp(8rem, 22vw, 22rem)",
                  lineHeight: 0.82,
                  color: PILLAR_STEP_NUM_COLOR,
                  letterSpacing: "-0.05em",
                  mixBlendMode: "multiply",
                  zIndex: 0,
                  WebkitFontSmoothing: "antialiased",
                  textRendering: "geometricPrecision",
                  WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 40%, rgba(0,0,0,0.35) 75%, rgba(0,0,0,0.15) 100%)",
                  maskImage: "linear-gradient(to bottom, black 0%, black 40%, rgba(0,0,0,0.35) 75%, rgba(0,0,0,0.15) 100%)",
                }}
              >
                {num}
              </span>
            );

            /* ── Desktop: görsel ── */
            const imageBlock = (
              <Link
                key="img"
                href={pillarHref}
                className="group relative z-10 hidden w-full lg:col-start-2 lg:col-end-3 lg:block"
              >
                <div
                  className="relative h-[20rem] w-full overflow-hidden shadow-[0_24px_56px_-22px_rgba(15,22,36,0.28)]"
                  style={{ clipPath: "polygon(10% 0, 100% 0, 90% 100%, 0 100%)" }}
                >
                  <Image
                    src={img}
                    alt={pillar.title}
                    fill
                    sizes="48vw"
                    className="object-cover object-center transition-transform duration-700 ease-out [transform:scale(1.02)] group-hover:[transform:scale(1.05)]"
                  />
                </div>
              </Link>
            );

            /* ── Desktop: metin ── */
            const contentBlock = (
              <div
                key="content"
                className={`relative z-10 hidden w-full max-w-[26rem] lg:block ${
                  isOdd ? "lg:col-start-1 lg:col-end-2" : "lg:col-start-3 lg:col-end-4"
                }`}
              >
                <p className="flex items-center gap-2.5 text-[15px] text-secondary/85">
                  <span aria-hidden className="text-[1.15em] leading-none text-primary">✦</span>
                  <span>{stepLabel}</span>
                </p>
                <h3
                  className="mt-3 font-black uppercase text-ink"
                  style={{ fontSize: "clamp(1.25rem, 2vw, 2rem)", lineHeight: 1.08, letterSpacing: "-0.015em" }}
                >
                  {pillar.title}
                </h3>
                <p className="mt-5 text-[15px] leading-[1.7] text-secondary/75">{pillar.intro}</p>
                <Link
                  href={pillarHref}
                  className="mt-7 inline-flex items-center gap-3 bg-primary px-7 py-4 text-[13px] font-semibold tracking-wide text-white transition-colors duration-300 hover:bg-ink"
                >
                  {pillarCta}
                  <span aria-hidden className="text-base leading-none">→</span>
                </Link>
              </div>
            );

            /* ── Mobil kart ── */
            const mobileCard = (
              <div key="mobile" className="block lg:hidden">
                <div className="flex items-start gap-4">
                  {/* Turuncu sayı */}
                  <span
                    aria-hidden
                    className="shrink-0 font-home-display font-black leading-none text-primary"
                    style={{ fontSize: "clamp(3rem, 13vw, 3.75rem)", letterSpacing: "-0.04em" }}
                  >
                    {num}
                  </span>
                  {/* İçerik */}
                  <div className="flex-1 pt-1">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-secondary/60">
                      {stepLabel}
                    </p>
                    <h3
                      className="mt-1 font-black uppercase text-ink"
                      style={{ fontSize: "clamp(1rem, 4.5vw, 1.2rem)", lineHeight: 1.1, letterSpacing: "-0.015em" }}
                    >
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-[1.65] text-secondary/70">{pillar.intro}</p>
                    <Link
                      href={pillarHref}
                      className="mt-4 inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-[12px] font-semibold tracking-wide text-white transition-colors hover:bg-ink"
                    >
                      {pillarCta}
                      <span aria-hidden className="text-sm leading-none">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            );

            return (
              <article
                key={`${index}-${pillar.tag}`}
                className={`relative grid items-center gap-8 sm:gap-10 ${
                  isOdd
                    ? "lg:grid-cols-[32%_minmax(0,1fr)_26%]"
                    : "lg:grid-cols-[26%_minmax(0,1fr)_32%]"
                }`}
              >
                {mobileCard}
                {isOdd
                  ? [contentBlock, imageBlock, numberBlock]
                  : [numberBlock, imageBlock, contentBlock]}
              </article>
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
  referencePreviewProjectCounts,
}: {
  dict: HomeDict;
  common?: HomeCommonNav | null;
  locale: string;
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

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [hoveredCompanyProfileIndex, setHoveredCompanyProfileIndex] = useState<number | null>(null);
  const [allowRestrictedSections, setAllowRestrictedSections] = useState<boolean | null>(null);
  const solutionStripCarouselRef = useRef<HTMLDivElement | null>(null);
  const productStripCarouselRef = useRef<HTMLDivElement | null>(null);
  const certificateMarqueeRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = certificateMarqueeRef.current;
    if (!el) return;
    let offset = 0;
    let lastY = window.scrollY;
    const SCROLL_TO_MARQUEE_RATIO = 0.6;
    const applyTransform = () => {
      const half = el.scrollWidth / 2;
      if (half > 0) {
        offset = ((offset % half) + half) % half;
      }
      el.style.transform = `translate3d(${-offset}px, 0, 0)`;
    };
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      offset += delta * SCROLL_TO_MARQUEE_RATIO;
      applyTransform();
    };
    applyTransform();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
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
  const homeProductBandRows = PRODUCT_CATEGORY_NAV.slice(0, 9).map((nav, i) => {
    const meta = productCategoryMeta[i];
    const labelFromHome = homeItems[i]?.label?.trim();
    const fallbackImg = productFallbackImages[i % productFallbackImages.length]!;
    const thumbs: readonly [string, string, string] = meta?.thumbs
      ? [meta.thumbs[0], meta.thumbs[1], meta.thumbs[2]]
      : [meta?.image ?? fallbackImg, fallbackImg, fallbackImg];
    const featuresFromDict = productFeatures[i];
    const features =
      Array.isArray(featuresFromDict) && featuresFromDict.length > 0
        ? featuresFromDict
        : HOME_PRODUCT_BAND_FEATURE_FALLBACKS[i] ?? [];
    return {
      label: labelFromHome || productSlugToFallbackLabel(nav.slug),
      href: meta?.href ?? `/urunler/${nav.slug}`,
      image: meta?.image ?? fallbackImg,
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
        videoSrc="/video/hero-scroll.mp4"
        mobileVideoReplacementAlt={dict.hero.heroImageAlt}
        scrollVh={260}
        id="animation-2"
        startCard={dict.hero}
        endCard={dict.animation2.endCard}
        locale={locale}
        productHref="/urunler/duman-isi-tahliye-fanlari"
      />
      </div>

      {/* 02 — Sertifika; ardından çözümler (soft yüzey + palet) */}
      <section id="solution-categories" className="relative scroll-mt-24 md:scroll-mt-[5.5rem]">
        <div className="relative bg-sand-200">
          <div className="relative mx-auto max-w-[1600px] px-4 sm:px-10 lg:px-16">
            <div className="border-b border-ink/[0.08] py-5 sm:py-7">
              <div className="relative overflow-hidden">
                <div
                  className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-5 sm:w-12"
                  style={{ backgroundImage: `linear-gradient(to right, ${HOME_CERTIFICATE_STRIP_BG}, transparent)` }}
                />
                <div
                  className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-5 sm:w-12"
                  style={{ backgroundImage: `linear-gradient(to left, ${HOME_CERTIFICATE_STRIP_BG}, transparent)` }}
                />

                <div ref={certificateMarqueeRef} className="certificate-marquee-track flex w-max items-center gap-5 sm:gap-10">
                  {certificateLogoMarqueeItems.map((cert, index) => {
                    const isEfectisSvg = cert.src.endsWith(".svg") && cert.src.includes("Efectis");
                    const isEnecPng = cert.src.includes("ENEC.png");
                    const isCePng = cert.src.includes("CE.png");
                    const isIso9001Png = cert.src.includes("ISO9001.png");
                    const isIso14001Png = cert.src.includes("ISO14001.png");
                    const isBsiPng = cert.src.includes("bsi.png");
                    const isTsePng = cert.src.includes("TSE.png");
                    const keepColorPng =
                      isEnecPng || isCePng || isIso9001Png || isIso14001Png || isBsiPng || isTsePng;
                    const lightOnDark = !keepColorPng && !isEfectisSvg;
                    return (
                      <a
                        key={`${cert.alt}-${index}`}
                        href={`/${locale}/kurumsal/sertifikalar`}
                        className={`flex items-center justify-center px-1.5 sm:px-2 ${
                          isCePng
                            ? "min-w-[3.6rem] sm:min-w-[4.5rem]"
                            : "min-w-[70px] sm:min-w-[90px]"
                        }`}
                      >
                        <img
                          src={cert.src}
                          alt={cert.alt}
                          className={`w-auto max-w-full object-contain transition-[opacity,transform,filter] duration-300 hover:scale-[1.04] hover:opacity-100 ${
                            isEfectisSvg
                              ? "h-7 opacity-95 mix-blend-multiply sm:h-10"
                              : isEnecPng
                                ? "h-7 opacity-100 drop-shadow-[0_2px_12px_rgba(36,48,68,0.1)] drop-shadow-[0_0_14px_rgba(59,130,246,0.22)] sm:h-9"
                                : isCePng
                                  ? "h-9 opacity-100 drop-shadow-[0_2px_14px_rgba(36,48,68,0.12)] drop-shadow-[0_0_18px_rgba(255,215,160,0.45)] sm:h-12"
                                  : isIso9001Png
                                    ? "h-8 opacity-100 drop-shadow-[0_2px_12px_rgba(36,48,68,0.1)] drop-shadow-[0_0_14px_rgba(34,211,238,0.28)] sm:h-11"
                                    : isIso14001Png
                                      ? "h-8 opacity-100 drop-shadow-[0_2px_12px_rgba(36,48,68,0.1)] drop-shadow-[0_0_16px_rgba(34,197,94,0.32)] sm:h-11"
                                      : isTsePng
                                        ? "h-7 opacity-100 drop-shadow-[0_2px_10px_rgba(36,48,68,0.1)] drop-shadow-[0_0_12px_rgba(255,255,255,0.35)] sm:h-9"
                                        : isBsiPng
                                          ? "h-7 opacity-100 drop-shadow-[0_2px_10px_rgba(36,48,68,0.12)] drop-shadow-[0_0_8px_rgba(36,48,68,0.08)] sm:h-9"
                                          : `h-7 opacity-95 sm:h-10 ${
                                              lightOnDark ? "brightness-0 hover:opacity-100" : ""
                                            }`
                          }`}
                          loading="lazy"
                          decoding="async"
                        />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative border-t border-sand-300 bg-sand-100 text-ink">
          <HomeMarketStripBackdrop />
          <div className="relative z-[1] mx-auto max-w-[1720px] px-4 sm:px-10 lg:px-16">
            <div className="py-8 sm:py-10 sm:pt-10 sm:pb-12 lg:py-12">
              <div className="mb-10 flex flex-wrap items-end gap-3 sm:gap-4">
                <h2 className="text-lg font-bold uppercase tracking-[0.2em] text-ink sm:text-xl">{n.solutions}</h2>
                <div className="mb-0.5 h-px min-w-[4rem] flex-1 max-w-[14rem] bg-primary" aria-hidden />
              </div>
              <div className="-mx-1 flex items-stretch gap-2 px-1 sm:-mx-0 sm:gap-3 sm:px-0">
                <button
                  type="button"
                  onClick={() => scrollSolutionStrip("prev")}
                  aria-label={pc.previousSolutions}
                  className="mt-1 flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center self-center rounded-xl border border-sand-300 bg-white text-dark shadow-[0_8px_22px_-12px_rgba(0,56,107,0.12)] transition-all duration-300 hover:border-primary/50 hover:bg-sand-100 hover:text-primary hover:shadow-[0_12px_28px_-14px_rgba(239,95,23,0.22)] sm:h-11 sm:w-11 lg:h-12 lg:w-12"
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
                  className="mt-1 flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center self-center rounded-xl border border-sand-300 bg-white text-dark shadow-[0_8px_22px_-12px_rgba(0,56,107,0.12)] transition-all duration-300 hover:border-primary/50 hover:bg-sand-100 hover:text-primary hover:shadow-[0_12px_28px_-14px_rgba(239,95,23,0.22)] sm:h-11 sm:w-11 lg:h-12 lg:w-12"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — ÜRÜNLER (aynı referans düzeni; arka plan çözümler şeridi ile aynı sand) */}
      <section id="product-categories" className="relative scroll-mt-24 border-t border-sand-300 bg-sand-100 text-ink md:scroll-mt-[5.5rem]">
        <HomeMarketStripBackdrop />
        <div className="relative z-[1] mx-auto max-w-[1720px] px-4 py-10 sm:px-10 sm:py-12 lg:px-16 lg:py-14">
          <div className="mb-10 flex flex-wrap items-end gap-3 sm:gap-4">
            <h2 className="text-lg font-bold uppercase tracking-[0.2em] text-ink sm:text-xl">{n.products}</h2>
            <div className="mb-0.5 h-px min-w-[4rem] flex-1 max-w-[14rem] bg-primary" aria-hidden />
          </div>
              <div className="-mx-1 flex items-stretch gap-2 px-1 sm:-mx-0 sm:gap-3 sm:px-0">
            <button
              type="button"
              onClick={() => scrollProductStrip("prev")}
              aria-label={pc.previousProducts}
              className="mt-1 flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center self-center rounded-xl border border-sand-300 bg-white text-dark shadow-[0_8px_22px_-12px_rgba(0,56,107,0.12)] transition-all duration-300 hover:border-[#4a6fa3] hover:bg-[#1a2842] hover:text-white hover:shadow-[0_12px_30px_-14px_rgba(26,40,66,0.5)] sm:h-11 sm:w-11 lg:h-12 lg:w-12"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="min-w-0 flex-1">
              <div
                    ref={productStripCarouselRef}
                    className="flex items-stretch gap-2 overflow-x-auto overscroll-x-contain py-2 [-webkit-overflow-scrolling:touch] scroll-smooth snap-x snap-mandatory sm:gap-3 sm:py-2.5 [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {homeProductBandRows.map((row, i) => {
                  return (
                    <div
                      key={row.href}
                      data-product-strip-card
                      className="box-border flex h-full min-h-0 w-full max-w-full shrink-0 snap-start flex-col self-stretch min-w-full md:min-w-[calc((100%-1.5rem)/3)] md:max-w-none md:flex-[0_0_calc((100%-1.5rem)/3)] lg:min-w-[calc((100%-3rem)/5)] lg:flex-[0_0_calc((100%-3rem)/5)]"
                    >
                      <HomeMarketStripCard
                        locale={locale}
                        href={row.href}
                        title={row.label}
                        subtitle={row.blurb}
                        thumbs={row.thumbs}
                        features={row.features}
                        imagePriority={i === 0}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <button
              type="button"
              onClick={() => scrollProductStrip("next")}
              aria-label={pc.nextProducts}
              className="mt-1 flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center self-center rounded-xl border border-sand-300 bg-white text-dark shadow-[0_8px_22px_-12px_rgba(0,56,107,0.12)] transition-all duration-300 hover:border-[#4a6fa3] hover:bg-[#1a2842] hover:text-white hover:shadow-[0_12px_30px_-14px_rgba(26,40,66,0.5)] sm:h-11 sm:w-11 lg:h-12 lg:w-12"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
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
          <div className="border-b border-ink/10 pb-16">
            <div
              className={`grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-stretch lg:gap-x-12 lg:gap-y-0 xl:gap-x-16 ${
                dict.engineeringShowcase ? "lg:grid-rows-[auto_minmax(0,1fr)]" : ""
              }`}
            >
              {/* Üst sol — CFD şeridi (kart aynı hizada videonun satırında başlar) */}
              {dict.engineeringShowcase ? (
                <div className="relative z-[2] mx-auto mb-6 flex w-full max-w-[min(92vw,480px)] flex-wrap items-end gap-3 md:max-w-[min(94vw,44rem)] sm:mb-7 sm:gap-4 lg:col-start-1 lg:row-start-1 lg:mx-0 lg:mb-8 lg:max-w-none">
                  <h2 className="text-lg font-bold uppercase tracking-[0.2em] text-ink sm:text-xl">CFD</h2>
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
                  <div
                    className="pointer-events-none absolute -left-px top-1/2 z-10 hidden h-[min(42%,220px)] w-[3px] -translate-y-1/2 rounded-full bg-gradient-to-b from-primary from-25% via-primary/45 to-transparent lg:block"
                    aria-hidden
                  />
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
                        className="mt-3 text-balance font-bold tracking-[-0.03em] text-ink"
                        style={{ fontSize: "clamp(1.35rem, 2.4vw, 2.05rem)", lineHeight: 1.14 }}
                      >
                        {dict.engineeringShowcase.subtitle}
                      </h2>
                      <p className={`mt-4 sm:mt-5 ${homeBodySecondary}`}>{dict.engineeringShowcase.body}</p>
                      <Link
                        href={`/${locale}/cozumler/cfd-muhendislik-danismanligi`}
                        className="mt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-primary underline decoration-primary/35 underline-offset-[5px] transition-colors hover:text-primary/85 hover:decoration-primary/55 sm:mt-6"
                      >
                        {dict.engineeringShowcase.cta}
                        <svg
                          className="h-4 w-4 shrink-0"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          aria-hidden
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
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
                        className={`relative mt-8 max-w-[52ch] border-t border-ink/[0.07] pt-8 text-[17px] leading-[1.72] tracking-[-0.011em] text-ink/[0.78] sm:text-[18px] sm:leading-[1.66]`}
                      >
                        {dict.pillars[0]?.intro ?? ""}
                      </p>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {/* Kataloglar — Mühendislik özetinin altında, mühendislik desteği CTA’sının üstünde */}
          {allowRestrictedSections === true && (
            <>
          <div id="catalogs" className="relative mt-12 scroll-mt-24 sm:mt-14 md:scroll-mt-[5.5rem]">
            <div className="mb-8 flex flex-wrap items-end gap-3 sm:mb-10 sm:gap-4">
              <h2 className="text-lg font-bold uppercase tracking-[0.2em] text-ink sm:text-xl">{pc.catalogsVertical}</h2>
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
                      <p className="mt-2 line-clamp-4 text-[14px] leading-relaxed text-ink/65 sm:text-[15px]">{cardDesc}</p>
                      <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_10px_24px_-14px_rgba(239, 95, 23,0.75)] transition-colors duration-300 [@media(hover:hover)]:group-hover:bg-primary-deep">
                        {ctaLabel}
                        <span aria-hidden className="text-[0.85em] font-normal">
                          →
                        </span>
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
                            className={`text-balance font-bold uppercase tracking-[0.06em] text-[#1e3a5f] sm:tracking-[0.05em] ${refHead.kicker ? "mt-1.5 text-xl leading-tight sm:text-2xl lg:text-[1.75rem] lg:leading-[1.1]" : "text-lg leading-snug tracking-[0.14em] sm:text-xl lg:text-2xl"}`}
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
                              className={`mt-1.5 text-[13px] leading-snug sm:text-[14px] ${onLight ? "text-[#3d4a5c]" : "text-white/90"}`}
                            >
                              {example}
                            </p>
                          ) : (
                            <p
                              className={`mt-1.5 line-clamp-3 text-[13px] leading-snug sm:text-[14px] ${onLight ? "text-[#4a5568]" : "text-white/88"}`}
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
                          <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_10px_22px_-12px_rgba(0,0,0,0.35)] transition-colors duration-300 [@media(hover:hover)]:group-hover:bg-primary-deep">
                            {explore}
                            <span aria-hidden className="text-[0.9em] font-normal">
                              →
                            </span>
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
              <h2 className="text-lg font-bold uppercase tracking-[0.2em] text-ink sm:text-xl">{n.links.certificates}</h2>
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
                      <p className="mt-2 line-clamp-4 text-[14px] leading-relaxed text-ink/65 sm:text-[15px]">{pc.certificateCardDesc}</p>
                      <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_10px_24px_-14px_rgba(239, 95, 23,0.75)] transition-colors duration-300 [@media(hover:hover)]:group-hover:bg-primary-deep">
                        {ctaLabel}
                        <span aria-hidden className="text-[0.85em] font-normal">
                          →
                        </span>
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

          {/* Şirket profili — tanım videosundan önce (mühendislik hizmet kartlarının altında) */}
          {companyProfileSection ? (
            <HomeCompanyProfileSectionBlock
              locale={locale}
              verticalLabel={pc.companyProfileVertical}
              section={companyProfileSection}
              viewAllCorporate={n.viewAll}
            />
          ) : (
            <div id="company-profile" className="relative mt-14 scroll-mt-24 sm:mt-16 md:scroll-mt-[5.5rem] lg:mt-[4.5rem]">
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
                          <h3 className="mt-2 line-clamp-2 text-[1.2rem] font-semibold leading-[1.15] text-ink transition-colors group-hover:text-[#243044] sm:text-[1.28rem]">
                            {title}
                          </h3>
                          <p className="mt-2 line-clamp-3 text-[13px] leading-[1.55] text-ink/62 sm:text-[14px]">
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
                    className="btn-3d btn-3d-dark group inline-flex items-center gap-3 rounded-2xl border border-ink/15 bg-ink px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.24em] text-sand-100 transition-all duration-300 hover:border-primary hover:bg-primary"
                  >
                    <span>{n.viewAll}</span>
                    <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 07 — VIDEO / STUDIO (lacivertimsi kurumsal blok) */}
      <section className="relative overflow-hidden bg-[#141c2a] py-12 text-white sm:py-16">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.14]" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 12% -10%, rgba(74, 112, 168, 0.18) 0%, transparent 52%), radial-gradient(circle at 88% 100%, rgba(15, 23, 38, 0.85) 0%, transparent 45%), linear-gradient(180deg, #1a2536 0%, #121a28 100%)",
          }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-[1600px] px-2 sm:px-10 lg:px-16">
          <SectionHead
            num="05"
            title={dict.video.title}
            subtitle={dict.video.desc}
            meta={pc.videoStatMeta}
            tone="dark"
          />

          <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Video */}
            <div className="lg:col-span-8">
              <div className="relative shadow-[0_28px_70px_-36px_rgba(0,0,0,0.55)] ring-1 ring-white/[0.07]">
                <div className="relative aspect-video overflow-hidden border border-white/[0.09] bg-[#0b1018] text-white/35">
                  <iframe
                    src="https://www.youtube.com/embed/6pXFGhKW6Lw"
                    title={dict.video.iframeTitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-white/[0.1] pt-3.5 font-mono-eng text-[10px] font-medium uppercase tracking-[0.24em] text-white/55">
                <span className="text-white/70">{dict.video.iframeTitle}</span>
                <span>1080p · HD</span>
              </div>
            </div>

            {/* Side column */}
            <div className="flex flex-col justify-between gap-8 lg:col-span-4">
              <div className="space-y-3">
                <Link
                  href={`/${locale}/kurumsal/biz-kimiz`}
                  className="btn-3d btn-3d-glass group flex items-center justify-between border border-white/[0.1] bg-white/[0.04] px-5 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-white/88 backdrop-blur-[6px] transition-all duration-300 hover:border-primary/55 hover:bg-white/[0.08] hover:text-white"
                >
                  {dict.video.aboutUs}
                  <svg className="h-3.5 w-3.5 text-white/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href={`/${locale}/kurumsal/referanslar`}
                  className="btn-3d btn-3d-glass group flex items-center justify-between border border-white/[0.1] bg-white/[0.04] px-5 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-white/88 backdrop-blur-[6px] transition-all duration-300 hover:border-primary/55 hover:bg-white/[0.08] hover:text-white"
                >
                  {dict.video.references}
                  <svg className="h-3.5 w-3.5 text-white/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 06 — FAQ & 07 — FINAL CTA combined into a two-column block */}
      <section id="faq" className="relative scroll-mt-24 bg-sand-200 py-12 sm:py-16 md:scroll-mt-[5.5rem]">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-60" />

        <div className="relative mx-auto max-w-[1600px] px-2 sm:px-10 lg:px-16">
          <SectionHead num="06" title={dict.faq.title} meta={dict.faq.tag} />

          <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:items-stretch">
            {/* FAQ list — kurumsal palet: lacivert şerit + bej gövde, turuncu vurgu */}
            <div className="lg:col-span-7 lg:h-full">
              <div className="relative overflow-hidden rounded-3xl border border-[#1a2842]/14 bg-white/75 p-2.5 shadow-[0_22px_55px_-38px_rgba(13,17,23,0.22)] backdrop-blur-[6px] sm:p-3 lg:h-full">
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
                  aria-hidden
                />
                <div className="relative space-y-2.5 lg:flex lg:h-full lg:flex-col lg:gap-2.5 lg:space-y-0">
                  {dict.faq.items.map((item, index) => {
                    const isOpen = openFaq === index;
                    return (
                      <div
                        key={item.q}
                        className={`overflow-hidden rounded-2xl border transition-[border-color,box-shadow] duration-300 ${
                          isOpen
                            ? "border-[#1a2842] shadow-[0_18px_44px_-26px_rgba(13,17,23,0.35)] ring-1 ring-primary/22"
                            : "border-[#1a2842]/10 bg-white/95 shadow-[0_10px_36px_-30px_rgba(26,40,66,0.16)] hover:border-primary/30 hover:shadow-[0_16px_44px_-28px_rgba(26,40,66,0.2)]"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? null : index)}
                          className={`group flex w-full items-start justify-between gap-4 px-4 py-4 text-left transition-colors duration-300 sm:px-5 sm:py-4 ${
                            isOpen
                              ? "bg-[#1a2842] text-white"
                              : "bg-white/90 hover:bg-[#f7f6f2]"
                          }`}
                        >
                          <div className="flex min-w-0 flex-1 items-start gap-4">
                            <span className="font-mono-eng shrink-0 pt-1 min-w-[2.5ch] text-[10px] uppercase tracking-[0.22em] text-primary">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span
                              className={`text-[18px] font-semibold leading-[1.4] sm:text-[20px] ${
                                isOpen
                                  ? "text-white"
                                  : "text-ink transition-colors duration-300 group-hover:text-[#1a2842]"
                              }`}
                            >
                              {item.q}
                            </span>
                          </div>
                          <span
                            className={`font-mono-eng shrink-0 text-[20px] leading-none transition-all duration-300 ${
                              isOpen
                                ? "rotate-45 text-primary"
                                : "text-ink/45 group-hover:text-primary"
                            }`}
                          >
                            +
                          </span>
                        </button>
                        {isOpen && (
                          <div className="border-t border-[#1a2842]/15 bg-[#ebe8e0] px-5 py-5 sm:px-6 sm:py-6">
                            <p className={`border-l-2 border-primary/80 pl-4 ${homeLeadInk}`}>
                              {item.a}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Final CTA aside */}
            <aside className="flex flex-col gap-4 lg:col-span-5 lg:h-full">
              {/* Final CTA — ink block with hairlines */}
              <div className="relative overflow-hidden rounded-3xl border border-[#2b4065] bg-[#1a2842] p-6 text-white lg:flex-1">
                <div className="pointer-events-none absolute inset-0 blueprint-grid-dark opacity-22" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(83,122,184,0.16)_0%,rgba(26,40,66,0)_56%),linear-gradient(180deg,rgba(9,18,33,0.07)_0%,rgba(9,18,33,0.20)_100%)]" />

                <div className="relative lg:flex lg:h-full lg:flex-col">
                  <p className="font-mono-eng text-[10px] uppercase tracking-[0.28em] text-primary">
                    ● {dict.finalCta.tag}
                  </p>
                  <h3 className="mt-4 font-semibold text-white" style={{ fontSize: "clamp(1.7rem, 2.3vw, 2.35rem)", lineHeight: 1.02, letterSpacing: "-0.02em" }}>
                    {dict.finalCta.title}
                  </h3>
                  <p className={`mt-4 max-w-[48ch] ${homeLeadWhite}`}>
                    {dict.finalCta.desc}
                  </p>

                  <div className="mt-6 space-y-3 lg:mt-auto">
                    <a
                      href="tel:+902164674752"
                      className="btn-3d btn-3d-glass group flex items-center justify-between rounded-2xl border border-white/15 px-5 py-3.5 text-[12px] font-medium text-white/80 transition-all duration-300 hover:border-primary hover:text-white"
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-mono-eng text-[10px] uppercase tracking-[0.22em] text-primary">Tel</span>
                        <span>+90 216 467 47 52</span>
                      </span>
                      <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </a>

                    <Link
                      href={`/${locale}/iletisim`}
                      className="btn-3d btn-3d-primary group flex items-center justify-between rounded-2xl bg-primary px-5 py-3.5 text-[11px] font-medium uppercase tracking-[0.24em] text-white transition-colors duration-300 hover:bg-primary-deep"
                    >
                      {dict.finalCta.requestQuote}
                      <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <style jsx>{`
        .certificate-marquee-track {
          will-change: transform;
        }
      `}</style>
    </main>
  );
}
