"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FanAssemblyAnimation } from "@/components/fan-assembly-animation";
import { ScrollVideoSection } from "@/components/scroll-video-section";

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
  }[];
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
  social: { tag: string; title: string };
  finalCta: {
    tag: string;
    title: string;
    desc: string;
    requestQuote: string;
  };
};

const pillarImages = [
  "/images/products/dragonfly-c.png",
  "/images/products/marlin.png",
  "/images/hero/endustriyel-mutfaklar.png",
];

/** Pillars hero row — public/images/home. `v` değiştir: dosya aynı adda kalınca `/_next/image` eski PNG’yi gösterebiliyor. */
const ENGINEERING_COLLAGE_ASSET_V = "20260418-4";
const engineeringCollage = {
  primary: `/images/home/engineering-collage-1.png?v=${ENGINEERING_COLLAGE_ASSET_V}`,
  secondary: `/images/home/engineering-collage-2.png?v=${ENGINEERING_COLLAGE_ASSET_V}`,
} as const;

/** Pillar card “Detayları İncele” targets — engineering / products / services */
const pillarLinks = ["/cozumler", "/urunler", "/hizmetler"] as const;

const productCategoryMeta = [
  { href: "/urunler/hava-hareketi", image: "/images/products/dragonfly-c.png" },
  { href: "/urunler/iklimlendirme", image: "/images/products/tiger-pre.png" },
  { href: "/urunler/sogutma-ve-isitma", image: "/images/products/dolphin-pre.png" },
  { href: "/urunler/hava-yonetimi", image: "/images/products/hound-al.png" },
  { href: "/urunler/hava-dagitimi", image: "/images/hero/endustriyel-mutfaklar.png" },
  { href: "/urunler/hava-filtrasyonu", image: "/images/products/marlin.png" },
  { href: "/urunler/aksesuarlar", image: "/images/products/ae-fjf.png" },
  { href: "/urunler/otomasyon-malzemeleri", image: "/images/products/basinclandirma-kontrol-panosu.png" },
  { href: "/urunler/titresim-ve-ses-izolasyon", image: "/images/products/yayli-titresim-izolatoru.png" },
];

const productFallbackImages = [
  "/images/products/dragonfly-c.png",
  "/images/products/tiger-pre.png",
  "/images/products/dolphin-pre.png",
  "/images/products/hound-al.png",
  "/images/hero/endustriyel-mutfaklar.png",
  "/images/products/marlin.png",
  "/images/products/ae-fjf.png",
];

const catalogItems = [
  { title: "Ürün Kataloğu", href: "/teknik-merkez/dokuman-kutuphanesi", image: "/images/catalogs/katalog-mockup-kapak-website-icin.png" },
  { title: "Teknik Föyler", href: "/teknik-merkez/dokuman-kutuphanesi", image: "/images/catalogs/dumantahliye-mockup.png" },
  { title: "Datasheet Arşivi", href: "/teknik-merkez/dokuman-kutuphanesi", image: "/images/catalogs/sirketprofili-mockup.png" },
] as const;

const referenceItems = [
  { title: "2M Lojistik Gebze Depo", href: "/kurumsal/referanslar", image: "/images/references/2m.jpg" },
  { title: "3S Kale Topaz Zeytinburnu", href: "/kurumsal/referanslar", image: "/images/references/3skale.jpg" },
  { title: "Adana Yüreğir 100 Yataklı Hastane", href: "/kurumsal/referanslar", image: "/images/references/adana-yuregir.jpg" },
] as const;

const certificateItems = [
  { title: "EN Sertifikaları", href: "/kurumsal/sertifikalar", image: "/images/certificates/kalite-uygunluk-mockup.png" },
  { title: "ISO Belgeleri", href: "/kurumsal/sertifikalar", image: "/images/certificates/iso-sertifika-mockup.png" },
  { title: "Kalite ve Uygunluk", href: "/kurumsal/sertifikalar", image: "/images/certificates/kalite-uygunluk-mockup.png" },
] as const;

const socialPlatforms = [
  {
    label: "LinkedIn",
    href: "https://tr.linkedin.com/company/novvesturkiye",
    icon: (
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCan0PUXw7Pr0GI0HTegN1yQ",
    icon: (
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/novves.turkiye/",
    icon: (
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/novves.turkiye/",
    icon: (
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    ),
  },
];

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
}: {
  num?: string;
  title: string;
  subtitle?: string;
  meta?: string;
  tone?: "light" | "dark";
  variant?: "default" | "showcase";
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
          <div className="border-l-[3px] border-primary pl-5 lg:col-span-7">
            <h2
              className="font-bold text-ink"
              style={{ fontSize: "clamp(2.2rem, 4.2vw, 4.75rem)", lineHeight: 0.98, letterSpacing: "-0.02em" }}
            >
              {title}
            </h2>
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

export default function HomeClient({ dict, locale }: { dict: HomeDict; locale: string }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [expandedPillars, setExpandedPillars] = useState<Record<number, boolean>>({});
  const [activeJumpSection, setActiveJumpSection] = useState("hero-main");
  const [showMobileJumpNav, setShowMobileJumpNav] = useState(true);
  const productCarouselRef = useRef<HTMLDivElement | null>(null);
  const pillarIntro = dict.pillars[0]?.intro ?? "";
  const pillarIntroParts = pillarIntro.split(".");
  const pillarIntroLead = (pillarIntroParts[0] ?? "").trim();
  const pillarIntroRest = pillarIntroParts.slice(1).join(".").trim();

  const scrollProductCarousel = (direction: "prev" | "next") => {
    const container = productCarouselRef.current;
    if (!container) return;

    const card = container.querySelector("[data-product-card]") as HTMLElement | null;
    if (!card) return;

    const cardWidth = card.getBoundingClientRect().width;
    const gap = 16;
    const scrollAmount = (cardWidth + gap) * (direction === "next" ? 1 : -1);

    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const jumpLinks = [
    { id: "hero-main", label: locale === "tr" ? "Anasayfa" : locale === "ru" ? "Главная" : "Home" },
    { id: "product-categories", label: locale === "tr" ? "Ürünler" : locale === "ru" ? "Продукты" : "Products" },
    { id: "references", label: locale === "tr" ? "Referanslar" : locale === "ru" ? "Референсы" : "References" },
    { id: "certificates", label: locale === "tr" ? "Sertifikalar" : locale === "ru" ? "Сертификаты" : "Certificates" },
    { id: "faq", label: locale === "tr" ? "SSS" : locale === "ru" ? "FAQ" : "FAQ" },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    setActiveJumpSection(id);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const getJumpIcon = (id: string) => {
    if (id === "hero-main") return <path strokeLinecap="round" strokeLinejoin="round" d="M3 11.25L12 4l9 7.25M5.25 9.5V20h13.5V9.5" />;
    if (id === "product-categories") return <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />;
    if (id === "references") return <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 12h9m-9 0l3-3m-3 3l3 3M3.75 12a8.25 8.25 0 1116.5 0 8.25 8.25 0 01-16.5 0z" />;
    if (id === "certificates") return <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l2.25 2.25L15 9.75M12 3.75l6.75 3v5.25c0 4.25-2.85 8.04-6.75 9.25-3.9-1.21-6.75-5-6.75-9.25V6.75L12 3.75z" />;
    return <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9.75h7.5M8.25 13.5h5.25M6 4.5h12A1.5 1.5 0 0119.5 6v12A1.5 1.5 0 0118 19.5H6A1.5 1.5 0 014.5 18V6A1.5 1.5 0 016 4.5z" />;
  };

  useEffect(() => {
    const sectionIds = jumpLinks.map((x) => x.id);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveJumpSection(visible.target.id);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.2, 0.45, 0.7] },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, [locale]);

  useEffect(() => {
    const hero = document.getElementById("hero-main");
    if (!hero) return;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries[0];
        setShowMobileJumpNav(!!hit?.isIntersecting);
      },
      { threshold: [0.22] },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, [locale]);

  return (
    <main className="bg-sand-200 text-ink">
      <nav className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 lg:flex">
        <div className="rounded-xl border border-[#2b4065]/18 bg-[#1a2842]/90 px-2 py-2 shadow-[0_16px_30px_-24px_rgba(8,15,28,0.58)] backdrop-blur-sm">
          <ul className="space-y-1.5">
            {jumpLinks.map((item) => {
              const active = activeJumpSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    title={item.label}
                    aria-label={item.label}
                    className={`group flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
                      active ? "bg-white/[0.08]" : "hover:bg-white/[0.05]"
                    }`}
                  >
                    <svg
                      className={`${active ? "text-primary" : "text-white/68 group-hover:text-white/88"} h-4 w-4 transition-colors`}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.7}
                      stroke="currentColor"
                    >
                      {getJumpIcon(item.id)}
                    </svg>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <nav
        className={`fixed bottom-4 inset-x-3 z-40 transition-all duration-300 lg:hidden ${
          showMobileJumpNav ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 pointer-events-none"
        }`}
      >
        <div className="relative rounded-3xl border border-[#2b4065]/20 bg-[#1a2842]/92 px-4 py-3.5 shadow-[0_18px_32px_-24px_rgba(8,15,28,0.62)] backdrop-blur-sm">
          <div className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#121d31] shadow-[0_10px_22px_-14px_rgba(6,10,20,0.75)]">
              <Image src="/images/novves-icon.svg" alt="Novves" width={22} height={22} className="h-[22px] w-[22px]" />
            </div>
          </div>
          <ul className="flex items-center justify-between">
            {jumpLinks.map((item) => {
              const active = activeJumpSection === item.id;
              return (
                <li key={`m-${item.id}`}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    title={item.label}
                    aria-label={item.label}
                    className={`group flex h-11 w-11 items-center justify-center rounded-lg transition-colors ${
                      active ? "bg-white/[0.10]" : "hover:bg-white/[0.05]"
                    }`}
                  >
                    <svg
                      className={`${active ? "text-primary" : "text-white/70 group-hover:text-white/90"} h-[22px] w-[22px] transition-colors`}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.7}
                      stroke="currentColor"
                    >
                      {getJumpIcon(item.id)}
                    </svg>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* 01 — SCROLL VIDEO: KOVAN TIPI */}
      <div id="hero-main">
      <ScrollVideoSection
        framesPath="/animation/frames-2"
        totalFrames={240}
        id="animation-2"
        startCard={dict.hero}
        endCard={dict.animation2.endCard}
        locale={locale}
        productHref="/urunler/kovan-tipi-aksiyal-fanlar"
        sideLabel="Otopark Havalandırma"
      />
      </div>

      {/* 02 — PRODUCT CATEGORIES */}
      <section id="product-categories" className="relative overflow-hidden bg-sand-200 pb-8 pt-16 text-ink sm:pb-10 sm:pt-20">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-35" />

        <div className="relative mx-auto max-w-[1600px] px-2 sm:px-10 lg:px-16">
          <SectionHead variant="showcase" title={dict.productCategories.title} subtitle={dict.productCategories.desc} />

          <div className="mt-6 flex items-center gap-1 lg:mt-8 lg:gap-3">
            <button
              type="button"
              onClick={() => scrollProductCarousel("prev")}
              aria-label={locale === "tr" ? "Önceki ürünler" : locale === "ru" ? "Предыдущие товары" : "Previous products"}
              className="btn-3d btn-3d-glass inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-ink/15 bg-white/95 text-ink/75 shadow-[0_8px_24px_-16px_rgba(15,20,30,0.5)] transition-colors hover:border-primary hover:text-primary"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div
              ref={productCarouselRef}
              className="flex min-w-0 flex-1 snap-x snap-mandatory gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {dict.productCategories.items.map((cat, index) => {
              const meta = productCategoryMeta[index];
              const href = meta?.href ?? "/urunler";
              const resolvedImage = meta?.image || productFallbackImages[index % productFallbackImages.length];
              return (
                <Link
                  key={cat.label}
                  href={`/${locale}${href}`}
                  data-product-card
                  className="group flex h-[360px] w-full shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_12px_34px_-24px_rgba(15,20,30,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_-24px_rgba(15,20,30,0.28)] sm:h-auto sm:aspect-square sm:w-[calc(50%-0.375rem)] lg:w-[calc((100%-2.25rem)/4)]"
                >
                  <div className="relative flex-[0_0_50%] border-b border-ink/10 bg-[#eef1f4]">
                    <Image
                      src={resolvedImage}
                      alt={cat.label}
                      fill
                      className="object-contain p-5"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col px-4 py-2">
                    <p className="font-mono-eng text-[9px] uppercase tracking-[0.2em] text-ink/45">{dict.productCategories.tag}</p>
                    <h3 className="mt-1.5 line-clamp-2 text-[1.15rem] font-semibold leading-[1.15] text-ink transition-colors group-hover:text-primary">
                      {cat.label}
                    </h3>
                    <div className="mt-auto pt-2.5 font-mono-eng text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
                      Detayları İncele
                    </div>
                  </div>
                  <div className="mt-auto flex shrink-0 justify-center border-t border-ink/10 bg-[#f7f5f0] px-4 py-1.5">
                    <Image
                      src="/images/novves-logo.svg"
                      alt="Novves"
                      width={92}
                      height={26}
                      className="h-6 w-auto opacity-[0.82] transition-opacity group-hover:opacity-100"
                    />
                  </div>
                </Link>
              );
              })}
            </div>

            <button
              type="button"
              onClick={() => scrollProductCarousel("next")}
              aria-label={locale === "tr" ? "Sonraki ürünler" : locale === "ru" ? "Следующие товары" : "Next products"}
              className="btn-3d btn-3d-glass inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-ink/15 bg-white/95 text-ink/75 shadow-[0_8px_24px_-16px_rgba(15,20,30,0.5)] transition-colors hover:border-primary hover:text-primary"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* 02 — PILLARS / ENGINEERING ANLAYIŞI */}
      <section className="relative bg-sand-100 pb-16 pt-10 sm:pb-20 sm:pt-12">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-60" />

        <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
          <div className="border-b border-ink/10 pb-16">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-0 lg:overflow-hidden lg:rounded-2xl lg:border lg:border-ink/[0.08] lg:bg-white/40 lg:shadow-[0_18px_48px_-32px_rgba(15,22,36,0.08)]">
              {/* Sol — yalnızca görsel sütun (tam yükseklik, sağa yuvarlatılmış panel) */}
              <div className="flex w-full shrink-0 justify-center lg:flex-[0_0_42%] lg:max-w-[min(480px,44%)] lg:py-4 xl:flex-[0_0_40%]">
                {/* Tek çerçeve: görseller bitişik, arada ince dikiş (kopuk kutu hissi yok) */}
                <div className="mx-auto w-full max-w-[min(92vw,440px)] overflow-hidden rounded-2xl shadow-[0_20px_48px_-28px_rgba(15,22,36,0.18)] ring-1 ring-[#243044]/12 sm:max-w-[480px] lg:mx-0 lg:max-w-none">
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={engineeringCollage.primary}
                      alt="NOVVES CNC lazer kesim ile metal sac üzerinde hassas imalat"
                      fill
                      priority
                      quality={92}
                      className="object-cover object-[50%_40%]"
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 50vw, min(640px, 44vw)"
                    />
                  </div>
                  <div className="relative aspect-[16/10] w-full border-t border-black/[0.12]">
                    <Image
                      src={engineeringCollage.secondary}
                      alt="NOVVES sahada montaj ve teknik müdahale"
                      fill
                      priority
                      quality={92}
                      className="object-cover object-[36%_48%]"
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 50vw, min(640px, 44vw)"
                    />
                  </div>
                </div>
              </div>

              {/* Sağ — tek editoryal panel: daha dolu, profesyonel hiyerarşi */}
              <div className="flex min-w-0 flex-1 flex-col justify-center px-0 py-2 lg:px-10 lg:py-10 xl:px-12">
                <div className="rounded-xl border border-ink/[0.08] bg-gradient-to-br from-white via-white to-[#f6f4f0] p-6 shadow-[0_12px_40px_-28px_rgba(15,22,36,0.08)] sm:p-8 lg:p-8 lg:pl-10">
                  {dict.pillars[0]?.tag ? (
                    <div className="mb-6">
                      <p className="font-mono-eng text-[10px] font-medium uppercase tracking-[0.28em] text-primary">
                        ● {dict.pillars[0].tag}
                      </p>
                      <div className="mt-4 h-px w-14 bg-primary/55" />
                    </div>
                  ) : null}
                  <div className="border-l-[3px] border-primary pl-5">
                    <h2
                      className="font-bold text-ink"
                      style={{
                        fontSize: "clamp(2.5rem, 4.4vw, 5rem)",
                        lineHeight: 0.98,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {dict.pillars[0]?.title ?? "Mühendislik Anlayışımız"}
                    </h2>
                  </div>
                  <div className="mt-8 border-t border-ink/[0.09] pt-8">
                    <p className={`max-w-[52ch] ${homeLeadInk}`}>
                      <span className="font-semibold text-ink/[0.92]">{pillarIntroLead}.</span> {pillarIntroRest}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mid-CTA — contained card, denser layout (copy unchanged) */}
          <div className="relative mt-10 lg:mt-12">
            <div className="relative overflow-hidden rounded-lg border border-ink/[0.09] bg-[#e4e2dc] shadow-[0_22px_50px_-30px_rgba(12,14,18,0.16)] ring-1 ring-black/[0.03]">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/0 via-primary/35 to-primary/0" />
              <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.2]" />

              <div className="relative z-[1] px-6 py-9 sm:px-9 sm:py-10 lg:grid lg:grid-cols-12 lg:items-stretch lg:gap-x-10 lg:px-10 lg:py-11">
                <div className="lg:col-span-8 lg:border-r lg:border-ink/[0.08] lg:pr-10">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-primary">◆ {dict.midCta.title}</p>
                  <div className="mt-4 h-px w-16 bg-primary/65" />
                  <p className={`mt-6 max-w-[58ch] ${homeLeadInk}`}>
                    {dict.midCta.desc}
                  </p>
                  <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    <span className="btn-3d btn-3d-glass inline-flex items-center gap-2.5 rounded-md border border-ink/[0.07] bg-white/55 px-3 py-2.5 text-[10px] font-medium uppercase tracking-[0.2em] text-ink/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      48 Saatte Ön Değerlendirme
                    </span>
                    <span className="btn-3d btn-3d-glass inline-flex items-center gap-2.5 rounded-md border border-ink/[0.07] bg-white/55 px-3 py-2.5 text-[10px] font-medium uppercase tracking-[0.2em] text-ink/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      Uygulamaya Dönük Çözüm
                    </span>
                    <span className="btn-3d btn-3d-glass inline-flex items-center gap-2.5 rounded-md border border-ink/[0.07] bg-white/55 px-3 py-2.5 text-[10px] font-medium uppercase tracking-[0.2em] text-ink/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      Saha + CFD Entegrasyonu
                    </span>
                  </div>
                </div>

                <div className="mt-8 flex flex-col justify-center border-t border-ink/[0.08] pt-8 lg:col-span-4 lg:mt-0 lg:border-t-0 lg:pt-0 lg:pl-2">
                  <Link
                    href={`/${locale}/iletisim`}
                    className="btn-3d btn-3d-dark group inline-flex w-full items-center justify-center gap-3 border border-ink/15 bg-ink px-7 py-4 text-[11px] font-medium uppercase tracking-[0.24em] text-sand-100 transition-all duration-300 hover:border-primary hover:bg-primary sm:w-auto lg:w-full"
                  >
                    {dict.midCta.button}
                    <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Pillars — white service cards, soft lift + primary CTA (inspired by clean card UI) */}
          <div className="mt-16 grid grid-cols-1 items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {dict.pillars.map((pillar, index) => {
              const isExpanded = !!expandedPillars[index];
              return (
                <Link
                  key={pillar.tag}
                  href={`/${locale}${pillarLinks[index] ?? "/kurumsal"}`}
                  className="group flex h-full min-h-0 flex-col overflow-hidden rounded-xl bg-white shadow-[0_16px_48px_-28px_rgba(15,20,30,0.14)] ring-1 ring-black/[0.04] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_-28px_rgba(15,20,30,0.22)]"
                >
                <article className="flex h-full min-h-0 flex-col">
                  <div className="relative aspect-[3/2] shrink-0 bg-[#f0f1f3]">
                    <Image
                      src={pillarImages[index] ?? pillarImages[0]}
                      alt={pillar.title}
                      fill
                      className="object-contain p-8 drop-shadow-[0_14px_36px_rgba(0,0,0,0.16)] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                  <p className="flex items-center justify-center gap-2 px-6 pt-4 text-center font-mono-eng uppercase tracking-[0.22em]">
                    <span className="text-[12px] font-semibold leading-none text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] text-ink/55">{pillar.tag}</span>
                  </p>
                  <div className="flex flex-1 flex-col items-center px-6 pb-10 pt-2 text-center">
                    <h3
                      className="font-bold text-ink"
                      style={{ fontSize: "clamp(1.35rem, 2.1vw, 1.75rem)", lineHeight: 1.15, letterSpacing: "-0.02em" }}
                    >
                      {pillar.title}
                    </h3>
                    <p className={`mt-4 max-w-[36ch] ${homeBodySecondary} ${isExpanded ? "" : "line-clamp-3"}`}>{pillar.intro}</p>
                    {isExpanded && (
                      <ul className="mt-8 w-full max-w-[19rem] space-y-4 border-t border-ink/10 pt-8 text-left">
                        {pillar.items.map((item) => (
                          <li key={item.label} className="flex gap-3">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            <div>
                              <p className="text-[13px] font-semibold text-ink">{item.label}</p>
                              <p className="mt-1 text-[13px] leading-[1.65] text-secondary/68">{item.desc}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                    <span
                      role="button"
                      tabIndex={0}
                      className="mt-4 inline-flex cursor-pointer select-none items-center text-[18px] font-bold leading-none text-primary"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        setExpandedPillars((prev) => ({ ...prev, [index]: !prev[index] }));
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          event.stopPropagation();
                          setExpandedPillars((prev) => ({ ...prev, [index]: !prev[index] }));
                        }
                      }}
                      aria-label={isExpanded
                        ? (locale === "tr" ? "Metni daralt" : locale === "ru" ? "Свернуть" : "Collapse")
                        : (locale === "tr" ? "Devamını göster" : locale === "ru" ? "Показать полностью" : "Show more")}
                    >
                      ...
                    </span>
                    <div className="mt-auto flex w-full justify-center pt-8">
                      <span className="btn-3d btn-3d-primary inline-flex items-center justify-center bg-primary px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors group-hover:bg-[#e55a28]">
                        Detayları İncele
                      </span>
                    </div>
                  </div>
                </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 03 — HERO */}
      <FanAssemblyAnimation dict={dict.hero} locale={locale} />

      {/* 04 — CATALOGS */}
      <section className="relative overflow-hidden bg-sand-200 py-14 text-ink sm:py-16">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-30" />
        <div className="relative mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16">
          <SectionHead
            variant="showcase"
            title={locale === "tr" ? "Kataloglarımız" : locale === "ru" ? "Наши каталоги" : "Our Catalogs"}
            subtitle={
              locale === "tr"
                ? "Ürün katalogları, teknik föyler ve datasheet arşivine hızlıca ulaşın."
                : locale === "ru"
                  ? "Быстрый доступ к каталогам, техническим листам и архиву datasheet."
                  : "Quick access to product catalogs, technical fiches, and datasheet archive."
            }
          />

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:mt-12">
            {catalogItems.map((item) => (
              <Link
                key={item.title}
                href={`/${locale}${item.href}`}
                className="group flex aspect-square flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_12px_34px_-24px_rgba(15,20,30,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_-24px_rgba(15,20,30,0.28)]"
              >
                <div className="relative flex-[0_0_50%] border-b border-ink/10 bg-[#f7f5f0]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    quality={100}
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="flex flex-1 flex-col px-4 py-3">
                  <p className="font-mono-eng text-[9px] uppercase tracking-[0.2em] text-ink/45">
                    {locale === "tr" ? "Katalog" : locale === "ru" ? "Каталог" : "Catalog"}
                  </p>
                  <h3 className="mt-2 line-clamp-2 text-[1.15rem] font-semibold leading-[1.15] text-ink transition-colors group-hover:text-primary">
                    {item.title}
                  </h3>
                  <div className="mt-auto pt-4 font-mono-eng text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
                    {locale === "tr" ? "Detayları İncele" : locale === "ru" ? "Подробнее" : "View Details"}
                  </div>
                </div>
                <div className="mt-auto flex shrink-0 justify-center border-t border-ink/10 bg-[#f7f5f0] px-4 py-2.5">
                  <Image
                    src="/images/novves-logo.svg"
                    alt="Novves"
                    width={92}
                    height={26}
                    className="h-6 w-auto opacity-[0.82] transition-opacity group-hover:opacity-100"
                  />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href={`/${locale}/teknik-merkez/dokuman-kutuphanesi`}
              className="btn-3d btn-3d-dark group inline-flex items-center gap-3 rounded-2xl border border-ink/15 bg-ink px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.24em] text-sand-100 transition-all duration-300 hover:border-primary hover:bg-primary"
            >
              <span>{locale === "tr" ? "Tümünü Gör" : locale === "ru" ? "Смотреть все" : "View All"}</span>
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 05 — REFERENCES */}
      <section id="references" className="relative overflow-hidden bg-sand-200 pb-20 text-ink sm:pb-24">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-30" />
        <div className="relative mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16">
          <SectionHead
            variant="showcase"
            title={locale === "tr" ? "Referanslarımız" : locale === "ru" ? "Наши референсы" : "Our References"}
            subtitle={
              locale === "tr"
                ? "Farklı sektörlerde tamamladığımız projeleri keşfedin."
                : locale === "ru"
                  ? "Изучите реализованные нами проекты в различных отраслях."
                  : "Explore selected projects we have completed across sectors."
            }
          />

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:mt-12">
            {referenceItems.map((item) => (
              <Link
                key={item.title}
                href={`/${locale}${item.href}`}
                className="group flex aspect-square flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_12px_34px_-24px_rgba(15,20,30,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_-24px_rgba(15,20,30,0.28)]"
              >
                <div className="relative flex-[0_0_50%] border-b border-ink/10 bg-[#eef1f4]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="flex flex-1 flex-col px-4 py-3">
                  <p className="font-mono-eng text-[9px] uppercase tracking-[0.2em] text-ink/45">
                    {locale === "tr" ? "Referans" : locale === "ru" ? "Референс" : "Reference"}
                  </p>
                  <h3 className="mt-2 line-clamp-2 text-[1.15rem] font-semibold leading-[1.15] text-ink transition-colors group-hover:text-primary">
                    {item.title}
                  </h3>
                  <div className="mt-auto pt-4 font-mono-eng text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
                    {locale === "tr" ? "Detayları İncele" : locale === "ru" ? "Подробнее" : "View Details"}
                  </div>
                </div>
                <div className="mt-auto flex shrink-0 justify-center border-t border-ink/10 bg-[#f7f5f0] px-4 py-2.5">
                  <Image
                    src="/images/novves-logo.svg"
                    alt="Novves"
                    width={92}
                    height={26}
                    className="h-6 w-auto opacity-[0.82] transition-opacity group-hover:opacity-100"
                  />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href={`/${locale}/kurumsal/referanslar`}
              className="btn-3d btn-3d-dark group inline-flex items-center gap-3 rounded-2xl border border-ink/15 bg-ink px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.24em] text-sand-100 transition-all duration-300 hover:border-primary hover:bg-primary"
            >
              <span>{locale === "tr" ? "Tümünü Gör" : locale === "ru" ? "Смотреть все" : "View All"}</span>
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 06 — CERTIFICATES */}
      <section id="certificates" className="relative overflow-hidden bg-sand-200 pb-20 text-ink sm:pb-24">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-30" />
        <div className="relative mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16">
          <SectionHead
            variant="showcase"
            title={locale === "tr" ? "Sertifikalarımız" : locale === "ru" ? "Наши сертификаты" : "Our Certificates"}
            subtitle={
              locale === "tr"
                ? "Uluslararası kalite, güvenlik ve uygunluk belgelerimizi inceleyin."
                : locale === "ru"
                  ? "Ознакомьтесь с нашими международными сертификатами качества и соответствия."
                  : "Review our international quality, safety and compliance certificates."
            }
          />

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:mt-12">
            {certificateItems.map((item) => (
              <Link
                key={item.title}
                href={`/${locale}${item.href}`}
                className="group flex aspect-square flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_12px_34px_-24px_rgba(15,20,30,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_-24px_rgba(15,20,30,0.28)]"
              >
                <div className="relative flex-[0_0_50%] border-b border-ink/10 bg-[#eef1f4]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="flex flex-1 flex-col px-4 py-3">
                  <p className="font-mono-eng text-[9px] uppercase tracking-[0.2em] text-ink/45">
                    {locale === "tr" ? "Sertifika" : locale === "ru" ? "Сертификат" : "Certificate"}
                  </p>
                  <h3 className="mt-2 line-clamp-2 text-[1.15rem] font-semibold leading-[1.15] text-ink transition-colors group-hover:text-primary">
                    {item.title}
                  </h3>
                  <div className="mt-auto pt-4 font-mono-eng text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
                    {locale === "tr" ? "Detayları İncele" : locale === "ru" ? "Подробнее" : "View Details"}
                  </div>
                </div>
                <div className="mt-auto flex shrink-0 justify-center border-t border-ink/10 bg-[#f7f5f0] px-4 py-2.5">
                  <Image
                    src="/images/novves-logo.svg"
                    alt="Novves"
                    width={92}
                    height={26}
                    className="h-6 w-auto opacity-[0.82] transition-opacity group-hover:opacity-100"
                  />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href={`/${locale}/kurumsal/sertifikalar`}
              className="btn-3d btn-3d-dark group inline-flex items-center gap-3 rounded-2xl border border-ink/15 bg-ink px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.24em] text-sand-100 transition-all duration-300 hover:border-primary hover:bg-primary"
            >
              <span>{locale === "tr" ? "Tümünü Gör" : locale === "ru" ? "Смотреть все" : "View All"}</span>
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 07 — VIDEO / STUDIO (lacivertimsi kurumsal blok) */}
      <section className="relative overflow-hidden bg-[#141c2a] py-16 text-white sm:py-20">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.14]" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 12% -10%, rgba(74, 112, 168, 0.18) 0%, transparent 52%), radial-gradient(circle at 88% 100%, rgba(15, 23, 38, 0.85) 0%, transparent 45%), linear-gradient(180deg, #1a2536 0%, #121a28 100%)",
          }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
          <SectionHead
            num="05"
            title={dict.video.title}
            subtitle={dict.video.desc}
            meta="30+ Ülke · 500+ Proje"
            tone="dark"
          />

          <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Video */}
            <div className="lg:col-span-8">
              <div className="relative shadow-[0_28px_70px_-36px_rgba(0,0,0,0.55)] ring-1 ring-white/[0.07]">
                <div className="relative aspect-video overflow-hidden border border-white/[0.09] bg-[#0b1018] text-white/35">
                  <iframe
                    src="https://www.youtube.com/embed/jhiens-xiOw"
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
      <section id="faq" className="relative bg-sand-200 py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-60" />

        <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
          <SectionHead num="06" title={dict.faq.title} meta="Sıkça Sorulanlar" />

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
                        className={`overflow-hidden rounded-2xl border transition-[border-color,box-shadow] duration-300 ${isOpen ? "" : "lg:flex-1"} ${
                          isOpen
                            ? "border-[#1a2842] shadow-[0_18px_44px_-26px_rgba(13,17,23,0.35)] ring-1 ring-primary/22"
                            : "border-[#1a2842]/10 bg-white/95 shadow-[0_10px_36px_-30px_rgba(26,40,66,0.16)] hover:border-primary/30 hover:shadow-[0_16px_44px_-28px_rgba(26,40,66,0.2)]"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? null : index)}
                          className={`group flex w-full items-start justify-between gap-4 px-4 py-4 text-left transition-colors duration-300 sm:px-5 sm:py-4 ${isOpen ? "" : "lg:h-full"} ${
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

            {/* Contact / social side */}
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
                      className="btn-3d btn-3d-primary group flex items-center justify-between rounded-2xl bg-primary px-5 py-3.5 text-[11px] font-medium uppercase tracking-[0.24em] text-white transition-colors duration-300 hover:bg-[#e55a28]"
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

      {/* Social Media */}
      <section className="relative overflow-hidden bg-sand-200 pb-10 text-ink sm:pb-12">
        <div className="relative mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16">
          <p className="font-mono-eng text-[10px] uppercase tracking-[0.24em] text-primary">
            ◆ {dict.social.tag}
          </p>
          <h3 className="mt-4 font-semibold text-ink" style={{ fontSize: "clamp(1.8rem, 2.2vw, 2.3rem)", lineHeight: 1.02, letterSpacing: "-0.02em" }}>
            {dict.social.title}
          </h3>
          <div className="mt-4 flex flex-wrap gap-0 overflow-hidden rounded-2xl border border-ink/15">
            {socialPlatforms.map((p, i) => (
              <a
                key={p.label}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={p.label}
                className={`flex h-12 flex-1 items-center justify-center text-ink/50 transition-colors duration-300 hover:bg-[#1a2842] hover:text-primary ${i > 0 ? "border-l border-ink/15" : ""}`}
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">{p.icon}</svg>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}