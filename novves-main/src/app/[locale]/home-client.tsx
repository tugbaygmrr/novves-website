"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ScrollVideoSection } from "@/components/scroll-video-section";
import { COOKIE_CONSENT_EVENT, readCookieConsentRaw } from "@/lib/cookie-consent-storage";

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

const solutionCategoryMeta = [
  {
    href: "/cozumler/duman-isi-tahliye-sistemleri",
    image: "/images/products/dragonfly-c.png",
    tr: "Duman & Isı Tahliye Sistemleri",
    en: "Smoke & Heat Extraction Systems",
    ru: "Системы дымоудаления и теплоотвода",
  },
  {
    href: "/cozumler/konfor-iklimlendirme-sistemleri",
    image: "/images/products/tiger-main.jpg",
    tr: "Konfor İklimlendirme Sistemleri",
    en: "Comfort HVAC Systems",
    ru: "Системы комфортного кондиционирования",
  },
  {
    href: "/cozumler/hijyenik-filtrasyonlu-havalandirma",
    image: "/images/products/koi-cb.jpg",
    tr: "Hijyenik Filtrasyonlu Havalandırma",
    en: "Hygienic Filtration Ventilation",
    ru: "Гигиеническая фильтрационная вентиляция",
  },
  {
    href: "/cozumler/endustriyel-hava-yonetimi",
    image: "/images/products/nautilus-cif-cidarli.jpg",
    tr: "Endüstriyel Hava Yönetimi",
    en: "Industrial Air Management",
    ru: "Промышленное управление воздухом",
  },
  {
    href: "/cozumler/atex-patlama-koruma-cozumleri",
    image: "/images/products/bear-bp.jpg",
    tr: "ATEX Patlama Koruma Çözümleri",
    en: "ATEX Explosion Protection",
    ru: "Взрывозащита ATEX",
  },
  {
    href: "/cozumler/hayvancilik-tesisleri-icin-havalandirma-sistemleri",
    image: "/images/products/owl-cer.jpg",
    tr: "Hayvancılık Tesisleri Havalandırma",
    en: "Livestock Facility Ventilation",
    ru: "Вентиляция животноводческих объектов",
  },
  {
    href: "/cozumler/trafo-enerji-odalari-fanlari",
    image: "/images/products/heron-ah.jpg",
    tr: "Trafo & Enerji Odaları Fanları",
    en: "Transformer & Energy Room Fans",
    ru: "Вентиляторы для трансформаторных помещений",
  },
  {
    href: "/cozumler/sera-tarimsal-havalandirma-sistemleri",
    image: "/images/products/marlin.png",
    tr: "Sera & Tarımsal Havalandırma",
    en: "Greenhouse & Agricultural Ventilation",
    ru: "Тепличная и сельскохозяйственная вентиляция",
  },
  {
    href: "/cozumler/akilli-otomasyon-ve-kontrol-sistemleri",
    image: "/images/products/turtle-a.jpg",
    tr: "Akıllı Otomasyon ve Kontrol",
    en: "Smart Automation and Control",
    ru: "Интеллектуальная автоматика и управление",
  },
  {
    href: "/cozumler/konut-tipi-havalandirma-sistemleri",
    image: "/images/products/banyo-fan-1.jpg",
    tr: "Konut Tipi Havalandırma",
    en: "Residential Ventilation",
    ru: "Вентиляция жилых помещений",
  },
  {
    href: "/cozumler/marin-offshore-havalandirma-sistemleri",
    image: "/images/products/koi-cb.jpg",
    tr: "Marin & Offshore Havalandırma",
    en: "Marine & Offshore Ventilation",
    ru: "Морская и оффшорная вентиляция",
  },
  {
    href: "/cozumler/proje-bazli-ozel-imalatlar",
    image: "/images/products/bear-bp.jpg",
    tr: "Proje Bazlı Özel İmalatlar",
    en: "Project-Based Custom Manufacturing",
    ru: "Проектное индивидуальное производство",
  },
  {
    href: "/cozumler/cfd-muhendislik-danismanligi",
    image: "/images/products/hummingbird-drb-ec.jpg",
    tr: "CFD Mühendislik Danışmanlığı",
    en: "CFD Engineering Consultancy",
    ru: "Инженерный CFD-консалтинг",
  },
];

const solutionCategoryDescriptions: Record<string, { tr: string; en: string; ru: string }> = {
  "/cozumler/duman-isi-tahliye-sistemleri": {
    tr: "Yangın için güvenli duman ve ısı tahliyesi.",
    en: "Safe smoke and heat extraction for fire scenarios.",
    ru: "Безопасное дымо- и теплоудаление при пожаре.",
  },
  "/cozumler/konfor-iklimlendirme-sistemleri": {
    tr: "Konfor ve verim için iklimlendirme çözümleri.",
    en: "HVAC solutions for comfort and efficiency.",
    ru: "Климатические решения для комфорта и эффективности.",
  },
  "/cozumler/hijyenik-filtrasyonlu-havalandirma": {
    tr: "Kritik alanlar için hijyenik filtrasyon.",
    en: "Hygienic filtration for critical spaces.",
    ru: "Гигиеническая фильтрация для критических зон.",
  },
  "/cozumler/endustriyel-hava-yonetimi": {
    tr: "Endüstriyel alanlarda güçlü hava yönetimi.",
    en: "Robust air management for industrial facilities.",
    ru: "Надёжное управление воздухом для промышленности.",
  },
  "/cozumler/atex-patlama-koruma-cozumleri": {
    tr: "ATEX uyumlu güvenli havalandırma çözümleri.",
    en: "ATEX-compliant safe ventilation solutions.",
    ru: "Безопасные вентиляционные решения с соответствием ATEX.",
  },
};

const productFallbackImages = [
  "/images/products/dragonfly-c.png",
  "/images/products/tiger-pre.png",
  "/images/products/dolphin-pre.png",
  "/images/products/hound-al.png",
  "/images/hero/endustriyel-mutfaklar.png",
  "/images/products/marlin.png",
  "/images/products/ae-fjf.png",
];

const productCategoryDescriptions: Record<string, string> = {
  "Hava Hareketi": "Güvenilir fanlarla etkili hava sirkulasyonu.",
  İklimlendirme: "Konfor odaklı dengeli iklim kontrolü.",
  "Soğutma ve Isıtma": "Enerji verimli mevsimsel iklimlendirme.",
  "Hava Yönetimi": "Debiyi doğru yönetir, verimi artırır.",
  "Hava Dağıtımı": "Alan içinde dengeli ve homojen dağılım.",
  "Hava Filtrasyonu": "Daha temiz hava için etkili filtrasyon.",
  Aksesuarlar: "Kurulumu tamamlayan yardımcı ekipmanlar.",
  "Otomasyon Malzemeleri": "Akıllı ve pratik kontrol çözümleri.",
  "Titreşim ve Ses İzolasyon": "Daha sessiz ve stabil çalışma.",
};

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

const companyProfileItems = [
  {
    href: "/kurumsal/biz-kimiz",
    image: "/images/biz-kimiz-sag.png",
    tr: "Biz Kimiz",
    en: "Who We Are",
    ru: "О компании",
  },
  {
    href: "/kurumsal/ceo-mesaji",
    image: "/images/page-hero/ceo.jpg",
    tr: "CEO Mesajı",
    en: "CEO Message",
    ru: "Послание CEO",
  },
  {
    href: "/kurumsal/ekibimiz",
    image: "/images/page-hero/ekibimiz.jpg",
    tr: "Ekibimiz",
    en: "Our Team",
    ru: "Команда",
  },
] as const;

const certificateLogoBarItems = [
  { src: "/images/certificates/EN.png", alt: "EN" },
  { src: "/images/certificates/ISO14001.png", alt: "ISO 14001" },
  { src: "/images/certificates/CE.png", alt: "CE" },
  { src: "/images/certificates/ISO9001.png", alt: "ISO 9001" },
  { src: "/images/certificates/Efectis.png", alt: "Efectis" },
  { src: "/images/certificates/bsi.png", alt: "BSI" },
] as const;

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
                <span className={`h-4 w-4 rounded-[5px] border border-primary/45 shadow-[0_8px_20px_-10px_rgba(231,106,57,0.75)] ${accentClass}`} />
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

export default function HomeClient({ dict, locale }: { dict: HomeDict; locale: string }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [expandedPillars, setExpandedPillars] = useState<Record<number, boolean>>({});
  const [hoveredProductIndex, setHoveredProductIndex] = useState<number | null>(null);
  const [hoveredSolutionIndex, setHoveredSolutionIndex] = useState<number | null>(null);
  const [hoveredCatalogIndex, setHoveredCatalogIndex] = useState<number | null>(null);
  const [hoveredReferenceIndex, setHoveredReferenceIndex] = useState<number | null>(null);
  const [hoveredCertificateIndex, setHoveredCertificateIndex] = useState<number | null>(null);
  const [hoveredCompanyProfileIndex, setHoveredCompanyProfileIndex] = useState<number | null>(null);
  const [allowRestrictedSections, setAllowRestrictedSections] = useState<boolean | null>(null);
  const solutionCarouselRef = useRef<HTMLDivElement | null>(null);
  const productCarouselRef = useRef<HTMLDivElement | null>(null);
  const pillarIntro = dict.pillars[0]?.intro ?? "";
  const pillarIntroParts = pillarIntro.split(".");
  const pillarIntroLead = (pillarIntroParts[0] ?? "").trim();
  const pillarIntroRest = pillarIntroParts.slice(1).join(".").trim();

  useEffect(() => {
    const applyConsent = (raw: string | null) => {
      if (!raw) {
        setAllowRestrictedSections(null);
        return;
      }

      try {
        const parsed = JSON.parse(raw) as { analytics?: boolean; marketing?: boolean };
        const isRejected = parsed.analytics === false && parsed.marketing === false;
        setAllowRestrictedSections(!isRejected);
      } catch {
        setAllowRestrictedSections(null);
      }
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
      const isRejected = detail.analytics === false && detail.marketing === false;
      setAllowRestrictedSections(!isRejected);
    };

    window.addEventListener(COOKIE_CONSENT_EVENT, onConsentUpdated as EventListener);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onConsentUpdated as EventListener);
  }, []);

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

  const scrollSolutionCarousel = (direction: "prev" | "next") => {
    const container = solutionCarouselRef.current;
    if (!container) return;

    const card = container.querySelector("[data-solution-card]") as HTMLElement | null;
    if (!card) return;

    const cardWidth = card.getBoundingClientRect().width;
    const gap = 16;
    const scrollAmount = (cardWidth + gap) * (direction === "next" ? 1 : -1);

    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
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

      <section className="border-b border-ink/10 bg-[#e8e7e3] py-10 sm:py-12">
        <div className="mx-auto max-w-[1600px] px-2 sm:px-10 lg:px-16">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-10 lg:flex-nowrap lg:justify-between">
            {certificateLogoBarItems.map((cert) => (
              <a
                key={cert.alt}
                href={`/${locale}/kurumsal/sertifikalar`}
                className="flex min-w-[110px] flex-1 items-center justify-center px-2 lg:min-w-0"
              >
                <Image
                  src={cert.src}
                  alt={cert.alt}
                  width={180}
                  height={72}
                  className="h-10 w-auto max-w-full object-contain grayscale brightness-[0.82] contrast-[1.08] opacity-[0.96] transition-[filter,opacity,transform] duration-300 hover:scale-[1.03] hover:opacity-100 hover:grayscale-0 hover:brightness-100 hover:contrast-100 sm:h-12"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — SOLUTION CATEGORIES */}
      <section id="solution-categories" className="relative overflow-hidden bg-sand-200 pb-2 pt-12 text-ink sm:pb-2 sm:pt-16">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-35" />
        <div className="relative mx-auto max-w-[1600px] px-3 sm:px-10 lg:px-16">
          <div className="mt-6 flex flex-row items-center gap-2 lg:mt-8 lg:gap-3">
            <div className="shrink-0 self-center">
              <div
                className={`relative overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_20px_46px_-24px_rgba(15,20,30,0.32)] transition-all duration-300 ${
                  hoveredSolutionIndex !== null ? "scale-[0.86] opacity-80" : "scale-100 opacity-100"
                }`}
              >
                <div className="absolute inset-y-0 left-0 w-4.5 bg-[#1f4fa8]" />
                <div className="py-4 pl-4 pr-3 sm:px-4 sm:py-7">
                  <span className="font-mono-eng text-[15px] font-bold uppercase tracking-[0.24em] text-ink antialiased [writing-mode:vertical-rl] [text-orientation:mixed] max-sm:[text-shadow:0_1px_0_rgba(255,255,255,1)] sm:text-[18px] sm:font-semibold sm:tracking-[0.3em]">
                    {locale === "tr" ? "Çözümler" : locale === "ru" ? "Решения" : "Solutions"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex min-h-0 min-w-0 flex-1 items-center gap-2">
            <button
              type="button"
              onClick={() => scrollSolutionCarousel("prev")}
              aria-label={locale === "tr" ? "Önceki çözümler" : locale === "ru" ? "Предыдущие решения" : "Previous solutions"}
              className="btn-3d btn-3d-glass inline-flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-lg border border-ink/15 bg-white/95 text-ink/75 shadow-[0_8px_24px_-16px_rgba(15,20,30,0.5)] transition-colors hover:border-[#1f4fa8] hover:text-[#1f4fa8] sm:h-8 sm:w-8"
            >
              <svg className="h-5 w-5 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div
              ref={solutionCarouselRef}
              className="flex min-w-0 flex-1 touch-pan-x snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain pb-1 [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {solutionCategoryMeta.map((item, index) => {
                const title = locale === "tr" ? item.tr : locale === "ru" ? item.ru : item.en;
                const descBundle = solutionCategoryDescriptions[item.href];
                const desc = descBundle
                  ? (locale === "tr" ? descBundle.tr : locale === "ru" ? descBundle.ru : descBundle.en)
                  : (locale === "tr"
                    ? "Projeye özel mühendislik çözümünü keşfedin."
                    : locale === "ru"
                      ? "Откройте инженерное решение для вашего проекта."
                      : "Explore the right engineering solution for your project.");
                return (
                  <Link
                    key={item.href}
                    href={`/${locale}${item.href}`}
                    data-solution-card
                    onMouseEnter={() => {
                      if (canUseFineHover()) setHoveredSolutionIndex(index);
                    }}
                    onMouseLeave={() => setHoveredSolutionIndex(null)}
                    className={`group flex h-[clamp(260px,62svh,380px)] w-full shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_12px_34px_-24px_rgba(15,20,30,0.22)] transition-all duration-300 active:scale-[0.99] sm:h-auto sm:w-[calc(50%-0.5rem)] sm:snap-start sm:aspect-square lg:w-[calc((100%-2rem)/5)] ${
                      hoveredSolutionIndex === null
                        ? "[@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:shadow-[0_18px_42px_-24px_rgba(15,20,30,0.28)]"
                        : hoveredSolutionIndex === index
                          ? "z-10 scale-[1.07] border-[#1f4fa8]/35 shadow-[0_24px_56px_-24px_rgba(15,20,30,0.34)] lg:scale-[1.07]"
                          : "[@media(hover:hover)]:scale-[0.9] [@media(hover:hover)]:opacity-75"
                    }`}
                  >
                    <div className="relative flex-[0_0_46%] border-b border-ink/10 bg-[#eef1f4]">
                      <Image
                        src={item.image}
                        alt={title}
                        fill
                        className="object-contain p-5 mix-blend-multiply"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    <div className="flex flex-1 flex-col px-4 py-2">
                      <h3 className="mt-1.5 line-clamp-2 text-[1.15rem] font-semibold leading-[1.15] text-ink transition-colors group-hover:text-[#1f4fa8]">
                        {title}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-[12px] leading-[1.5] text-ink/62">{desc}</p>
                      <div className="mt-auto pt-2.5 font-mono-eng text-[9px] font-medium tracking-[0.12em] text-[#1f4fa8] sm:text-[10px]">
                        {locale === "tr" ? "Detayları İncele" : locale === "ru" ? "Подробнее" : "View Details"}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => scrollSolutionCarousel("next")}
              aria-label={locale === "tr" ? "Sonraki çözümler" : locale === "ru" ? "Следующие решения" : "Next solutions"}
              className="btn-3d btn-3d-glass inline-flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-lg border border-ink/15 bg-white/95 text-ink/75 shadow-[0_8px_24px_-16px_rgba(15,20,30,0.5)] transition-colors hover:border-[#1f4fa8] hover:text-[#1f4fa8] sm:h-8 sm:w-8"
            >
              <svg className="h-5 w-5 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — PRODUCT CATEGORIES */}
      <section
        id="product-categories"
        className="relative scroll-mt-24 overflow-hidden bg-sand-200 pb-8 pt-4 text-ink sm:pb-10 sm:pt-6 md:scroll-mt-[5.5rem]"
      >
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-35" />

        <div className="relative mx-auto max-w-[1600px] px-3 sm:px-10 lg:px-16">
          <div className="mt-6 flex flex-row items-center gap-2 lg:mt-8 lg:gap-3">
            <div className="shrink-0 self-center">
              <div
                className={`relative overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_20px_46px_-24px_rgba(15,20,30,0.32)] transition-all duration-300 ${
                  hoveredProductIndex !== null ? "scale-[0.86] opacity-80" : "scale-100 opacity-100"
                }`}
              >
                <div className="absolute inset-y-0 left-0 w-4.5 bg-primary/90" />
                <div className="py-4 pl-4 pr-3 sm:px-4 sm:py-7">
                  <span className="font-mono-eng text-[15px] font-bold uppercase tracking-[0.24em] text-ink antialiased [writing-mode:vertical-rl] [text-orientation:mixed] max-sm:[text-shadow:0_1px_0_rgba(255,255,255,1)] sm:text-[18px] sm:font-semibold sm:tracking-[0.3em]">
                    {locale === "tr" ? "Ürünler" : locale === "ru" ? "Продукты" : "Products"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex min-h-0 min-w-0 flex-1 items-center gap-2">
            <button
              type="button"
              onClick={() => scrollProductCarousel("prev")}
              aria-label={locale === "tr" ? "Önceki ürünler" : locale === "ru" ? "Предыдущие товары" : "Previous products"}
              className="btn-3d btn-3d-glass inline-flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-lg border border-ink/15 bg-white/95 text-ink/75 shadow-[0_8px_24px_-16px_rgba(15,20,30,0.5)] transition-colors hover:border-primary hover:text-primary sm:h-8 sm:w-8"
            >
              <svg className="h-5 w-5 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div
              ref={productCarouselRef}
              className="flex min-w-0 flex-1 touch-pan-x snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain pb-1 [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
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
                  onMouseEnter={() => {
                    if (canUseFineHover()) setHoveredProductIndex(index);
                  }}
                  onMouseLeave={() => setHoveredProductIndex(null)}
                  className={`group flex h-[clamp(260px,62svh,380px)] w-full shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_12px_34px_-24px_rgba(15,20,30,0.22)] transition-all duration-300 active:scale-[0.99] sm:h-auto sm:w-[calc(50%-0.5rem)] sm:snap-start sm:aspect-square lg:w-[calc((100%-2rem)/5)] ${
                    hoveredProductIndex === null
                      ? "[@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:shadow-[0_18px_42px_-24px_rgba(15,20,30,0.28)]"
                      : hoveredProductIndex === index
                        ? "z-10 scale-[1.07] border-primary/35 shadow-[0_24px_56px_-24px_rgba(15,20,30,0.34)] lg:scale-[1.07]"
                        : "[@media(hover:hover)]:scale-[0.9] [@media(hover:hover)]:opacity-75"
                  }`}
                >
                  <div className="relative flex-[0_0_46%] border-b border-ink/10 bg-[#eef1f4]">
                    <Image
                      src={resolvedImage}
                      alt={cat.label}
                      fill
                      className="object-contain p-5"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col px-4 py-2">
                    <h3 className="mt-1.5 line-clamp-2 text-[1.15rem] font-semibold leading-[1.15] text-ink transition-colors group-hover:text-primary">
                      {cat.label}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-[12px] leading-[1.5] text-ink/62">
                      {productCategoryDescriptions[cat.label] ??
                        (locale === "tr"
                          ? "Projeye uygun, güvenilir ve verimli ürün çözümlerini keşfedin."
                          : locale === "ru"
                            ? "Откройте надежные и эффективные решения, подходящие для вашего проекта."
                            : "Discover reliable and efficient solutions tailored to your project.")}
                    </p>
                    <div className="mt-auto pt-2.5 font-mono-eng text-[9px] font-medium tracking-[0.12em] text-primary sm:text-[10px]">
                      Detayları İncele
                    </div>
                  </div>
                </Link>
              );
              })}
            </div>

            <button
              type="button"
              onClick={() => scrollProductCarousel("next")}
              aria-label={locale === "tr" ? "Sonraki ürünler" : locale === "ru" ? "Следующие товары" : "Next products"}
              className="btn-3d btn-3d-glass inline-flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-lg border border-ink/15 bg-white/95 text-ink/75 shadow-[0_8px_24px_-16px_rgba(15,20,30,0.5)] transition-colors hover:border-primary hover:text-primary sm:h-8 sm:w-8"
            >
              <svg className="h-5 w-5 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — PILLARS / ENGINEERING ANLAYIŞI */}
      <section id="engineering" className="relative bg-sand-100 pb-16 pt-10 sm:pb-20 sm:pt-12">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.38]" />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_60%_at_0%_35%,rgba(231,106,57,0.055),transparent_52%),radial-gradient(ellipse_70%_45%_at_100%_80%,rgba(36,48,68,0.04),transparent_50%)]"
          aria-hidden
        />

        <div className="relative mx-auto max-w-[1600px] px-3 sm:px-10 lg:px-16">
          <div className="border-b border-ink/10 pb-16">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-stretch lg:gap-12 xl:gap-16">
              {/* Sol — görsel yığını */}
              <div className="relative mx-auto w-full max-w-[min(92vw,480px)] lg:mx-0 lg:flex lg:max-w-none">
                <div
                  className="pointer-events-none absolute -left-px top-1/2 z-10 hidden h-[min(42%,220px)] w-[3px] -translate-y-1/2 rounded-full bg-gradient-to-b from-primary from-25% via-primary/45 to-transparent lg:block"
                  aria-hidden
                />
                <div className="group relative overflow-hidden rounded-[1.75rem] shadow-[0_28px_72px_-40px_rgba(15,22,36,0.32)] ring-1 ring-[#243044]/[0.08] transition-[transform,box-shadow] duration-700 ease-out will-change-transform hover:scale-[1.012] hover:shadow-[0_36px_88px_-44px_rgba(15,22,36,0.36)] motion-reduce:transition-none motion-reduce:hover:scale-100 lg:flex-1 lg:self-stretch">
                  <div className="relative aspect-[16/10] w-full lg:h-1/2 lg:aspect-auto">
                    <Image
                      src={engineeringCollage.primary}
                      alt="NOVVES CNC lazer kesim ile metal sac üzerinde hassas imalat"
                      fill
                      priority
                      quality={92}
                      className="object-cover object-[50%_40%] transition-[filter] duration-700 group-hover:brightness-[1.03] motion-reduce:transition-none"
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 50vw, min(640px, 44vw)"
                    />
                  </div>
                  <div className="relative aspect-[16/10] w-full border-t border-[#243044]/10 lg:h-1/2 lg:aspect-auto">
                    <Image
                      src={engineeringCollage.secondary}
                      alt="NOVVES sahada montaj ve teknik müdahale"
                      fill
                      priority
                      quality={92}
                      className="object-cover object-[30%_84%] transition-[filter] duration-700 group-hover:brightness-[1.03] motion-reduce:transition-none"
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 50vw, min(640px, 44vw)"
                    />
                  </div>
                </div>
              </div>

              {/* Sağ — cam panel + editoryal tipografi */}
              <div className="relative min-w-0">
                <div className="relative overflow-hidden rounded-[1.75rem] border border-white/55 bg-white/55 p-8 shadow-[0_28px_80px_-48px_rgba(15,22,36,0.3)] backdrop-blur-xl sm:p-10 lg:p-11 ring-1 ring-black/[0.04]">
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/[0.07] blur-3xl"
                    aria-hidden
                  />

                  {dict.pillars[0]?.tag ? (
                    <div className="relative flex flex-wrap items-center gap-3">
                      <span className="font-mono-eng text-[11px] font-medium tabular-nums tracking-[0.12em] text-ink/32">
                        01
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full border border-primary/18 bg-primary/[0.08] px-3.5 py-1.5 font-mono-eng text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                        <span className="h-1 w-1 shrink-0 rounded-full bg-primary shadow-[0_0_0_4px_rgba(231,106,57,0.18)]" />
                        {dict.pillars[0].tag}
                      </span>
                    </div>
                  ) : null}

                  <div className="relative mt-8 flex items-start gap-4 sm:mt-9 sm:gap-5">
                    <div className="mt-1.5 flex shrink-0 items-center gap-2 sm:gap-2.5">
                      <span className="h-3.5 w-3.5 rounded-md border border-primary/40 bg-primary/90 shadow-[0_8px_22px_-10px_rgba(231,106,57,0.75)]" />
                      <span className="h-2 w-2 rounded-[3px] border border-[#243044]/18 bg-white shadow-[0_4px_12px_-8px_rgba(36,48,68,0.35)]" />
                      <span className="h-2.5 w-2.5 rounded-[4px] border border-[#243044]/22 bg-[#e9ebef]" />
                    </div>
                    <h2
                      className="min-w-0 flex-1 text-balance font-bold tracking-[-0.028em] text-ink"
                      style={{
                        fontSize: "clamp(2.05rem, 4vw, 3.65rem)",
                        lineHeight: 1.06,
                      }}
                    >
                      {dict.pillars[0]?.title ?? "Mühendislik Anlayışımız"}
                    </h2>
                  </div>

                  <p
                    className={`relative mt-8 max-w-[52ch] border-t border-ink/[0.07] pt-8 text-[17px] leading-[1.72] tracking-[-0.011em] text-ink/[0.78] sm:text-[18px] sm:leading-[1.66]`}
                  >
                    <span className="font-semibold text-ink/[0.92]">{pillarIntroLead}.</span> {pillarIntroRest}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Kataloglar — Mühendislik özetinin altında, mühendislik desteği CTA’sının üstünde */}
          {allowRestrictedSections === true && (
            <>
          <div id="catalogs" className="relative mt-10 scroll-mt-24 md:scroll-mt-[5.5rem]">
            <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-x-3 lg:gap-y-8">
              <div className="flex w-full justify-center self-center lg:col-start-1 lg:row-start-1 lg:w-auto lg:justify-start">
                <div
                  className={`relative overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_20px_46px_-24px_rgba(15,20,30,0.32)] transition-all duration-300 ${
                    hoveredCatalogIndex !== null ? "scale-[0.86] opacity-80" : "scale-100 opacity-100"
                  }`}
                >
                  <div className="absolute inset-y-0 left-0 w-4.5 bg-primary/90" />
                  <div className="flex items-center justify-center px-4 py-3.5 lg:block lg:py-7 lg:pl-4 lg:pr-3">
                    <span className="font-mono-eng text-[15px] font-bold uppercase tracking-[0.24em] text-ink antialiased max-lg:[writing-mode:horizontal-tb] max-lg:text-center lg:[writing-mode:vertical-rl] lg:[text-orientation:mixed] max-sm:[text-shadow:0_1px_0_rgba(255,255,255,1)] sm:text-[18px] sm:font-semibold sm:tracking-[0.3em]">
                      {locale === "tr" ? "Kataloglar" : locale === "ru" ? "Каталоги" : "Catalogs"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex min-h-0 min-w-0 w-full flex-col gap-4 lg:col-start-2 lg:row-start-1 lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-visible">
                {catalogItems.map((item, index) => (
                  <Link
                    key={item.title}
                    href={`/${locale}${item.href}`}
                    data-catalog-card
                    onMouseEnter={() => {
                      if (canUseFineHover()) setHoveredCatalogIndex(index);
                    }}
                    onMouseLeave={() => setHoveredCatalogIndex(null)}
                    className={`group flex w-full shrink-0 flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_12px_34px_-24px_rgba(15,20,30,0.22)] transition-all duration-300 active:scale-[0.99] max-lg:aspect-[4/5] max-lg:max-h-[min(92vh,560px)] max-lg:min-h-0 lg:aspect-square lg:min-h-[400px] lg:max-h-none ${
                      hoveredCatalogIndex === null
                        ? "[@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:shadow-[0_18px_42px_-24px_rgba(15,20,30,0.28)]"
                        : hoveredCatalogIndex === index
                          ? "z-10 scale-[1.07] border-primary/35 shadow-[0_24px_56px_-24px_rgba(15,20,30,0.34)] lg:scale-[1.07]"
                          : "[@media(hover:hover)]:scale-[0.9] [@media(hover:hover)]:opacity-75"
                    }`}
                  >
                    <div className="relative flex-[0_0_52%] border-b border-ink/10 bg-[#eef1f4] sm:flex-[0_0_50%]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        quality={100}
                        className="object-cover"
                        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 42vw, min(480px, 33vw)"
                      />
                    </div>
                    <div className="flex flex-1 flex-col px-5 py-3 sm:px-5 sm:py-3.5">
                      <p className="font-mono-eng text-[10px] uppercase tracking-[0.2em] text-ink/45">
                        {locale === "tr" ? "Katalog" : locale === "ru" ? "Каталог" : "Catalog"}
                      </p>
                      <h3 className="mt-2 line-clamp-2 text-[1.2rem] font-semibold leading-[1.15] text-ink transition-colors group-hover:text-primary sm:text-[1.28rem]">
                        {item.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-[13px] leading-[1.55] text-ink/62 sm:text-[14px]">
                        {locale === "tr"
                          ? "Teknik merkezde PDF ve dokümanlara erişin."
                          : locale === "ru"
                            ? "Доступ к PDF и документам в техническом центре."
                            : "Access PDFs and documents in the technical center."}
                      </p>
                      <div className="mt-auto pt-2.5 font-mono-eng text-[9px] font-medium tracking-[0.12em] text-primary sm:text-[10px]">
                        {locale === "tr" ? "Detayları İncele" : locale === "ru" ? "Подробнее" : "View Details"}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="flex w-full justify-center lg:col-start-2 lg:row-start-2">
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
          </div>

          {/* Referanslar — kataloglarla aynı düzen */}
          <div id="references" className="relative mt-10 scroll-mt-24 md:scroll-mt-[5.5rem] lg:mt-12">
            <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-x-3 lg:gap-y-8">
              <div className="flex w-full justify-center self-center lg:col-start-1 lg:row-start-1 lg:w-auto lg:justify-start">
                <div
                  className={`relative overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_20px_46px_-24px_rgba(15,20,30,0.32)] transition-all duration-300 ${
                    hoveredReferenceIndex !== null ? "scale-[0.86] opacity-80" : "scale-100 opacity-100"
                  }`}
                >
                  <div className="absolute inset-y-0 left-0 w-4.5 bg-[#6b7380]" />
                  <div className="flex items-center justify-center px-4 py-3.5 lg:block lg:py-7 lg:pl-4 lg:pr-3">
                    <span className="font-mono-eng text-[15px] font-bold uppercase tracking-[0.24em] text-ink antialiased max-lg:[writing-mode:horizontal-tb] max-lg:text-center lg:[writing-mode:vertical-rl] lg:[text-orientation:mixed] max-sm:[text-shadow:0_1px_0_rgba(255,255,255,1)] sm:text-[18px] sm:font-semibold sm:tracking-[0.3em]">
                      {locale === "tr" ? "Referanslar" : locale === "ru" ? "Референсы" : "References"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex min-h-0 min-w-0 w-full flex-col gap-4 lg:col-start-2 lg:row-start-1 lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-visible">
                {referenceItems.map((item, index) => (
                  <Link
                    key={item.title}
                    href={`/${locale}${item.href}`}
                    data-reference-card
                    onMouseEnter={() => {
                      if (canUseFineHover()) setHoveredReferenceIndex(index);
                    }}
                    onMouseLeave={() => setHoveredReferenceIndex(null)}
                    className={`group flex w-full shrink-0 flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_12px_34px_-24px_rgba(15,20,30,0.22)] transition-all duration-300 active:scale-[0.99] max-lg:aspect-[4/5] max-lg:max-h-[min(92vh,560px)] max-lg:min-h-0 lg:aspect-square lg:min-h-[400px] lg:max-h-none ${
                      hoveredReferenceIndex === null
                        ? "[@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:shadow-[0_18px_42px_-24px_rgba(15,20,30,0.28)]"
                        : hoveredReferenceIndex === index
                          ? "z-10 scale-[1.07] border-[#6b7380]/40 shadow-[0_24px_56px_-24px_rgba(15,20,30,0.34)] lg:scale-[1.07]"
                          : "[@media(hover:hover)]:scale-[0.9] [@media(hover:hover)]:opacity-75"
                    }`}
                  >
                    <div className="relative flex-[0_0_52%] border-b border-ink/10 bg-[#eef1f4] sm:flex-[0_0_50%]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 42vw, min(480px, 33vw)"
                      />
                    </div>
                    <div className="flex flex-1 flex-col px-5 py-3 sm:px-5 sm:py-3.5">
                      <p className="font-mono-eng text-[10px] uppercase tracking-[0.2em] text-ink/45">
                        {locale === "tr" ? "Referans" : locale === "ru" ? "Референс" : "Reference"}
                      </p>
                      <h3 className="mt-2 line-clamp-2 text-[1.2rem] font-semibold leading-[1.15] text-ink transition-colors group-hover:text-[#5c6370] sm:text-[1.28rem]">
                        {item.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-[13px] leading-[1.55] text-ink/62 sm:text-[14px]">
                        {locale === "tr"
                          ? "Tamamlanan projelerden öne çıkan örnekleri inceleyin."
                          : locale === "ru"
                            ? "Ознакомьтесь с избранными реализованными проектами."
                            : "Explore highlights from projects we have delivered."}
                      </p>
                      <div className="mt-auto pt-2.5 font-mono-eng text-[9px] font-medium tracking-[0.12em] text-[#5c6370] sm:text-[10px]">
                        {locale === "tr" ? "Detayları İncele" : locale === "ru" ? "Подробнее" : "View Details"}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="flex w-full justify-center lg:col-start-2 lg:row-start-2">
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
          </div>

          {/* Sertifikalar — referanslarla aynı düzen, lacivert vurgu */}
          <div id="certificates" className="relative mt-10 scroll-mt-24 md:scroll-mt-[5.5rem] lg:mt-12">
            <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-x-3 lg:gap-y-8">
              <div className="flex w-full justify-center self-center lg:col-start-1 lg:row-start-1 lg:w-auto lg:justify-start">
                <div
                  className={`relative overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_20px_46px_-24px_rgba(15,20,30,0.32)] transition-all duration-300 ${
                    hoveredCertificateIndex !== null ? "scale-[0.86] opacity-80" : "scale-100 opacity-100"
                  }`}
                >
                  <div className="absolute inset-y-0 left-0 w-4.5 bg-[#1f4fa8]" />
                  <div className="flex items-center justify-center px-4 py-3.5 lg:block lg:py-7 lg:pl-4 lg:pr-3">
                    <span className="font-mono-eng text-[15px] font-bold uppercase tracking-[0.24em] text-ink antialiased max-lg:[writing-mode:horizontal-tb] max-lg:text-center lg:[writing-mode:vertical-rl] lg:[text-orientation:mixed] max-sm:[text-shadow:0_1px_0_rgba(255,255,255,1)] sm:text-[18px] sm:font-semibold sm:tracking-[0.3em]">
                      {locale === "tr" ? "Sertifikalar" : locale === "ru" ? "Сертификаты" : "Certificates"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex min-h-0 min-w-0 w-full flex-col gap-4 lg:col-start-2 lg:row-start-1 lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-visible">
                {certificateItems.map((item, index) => (
                  <Link
                    key={item.title}
                    href={`/${locale}${item.href}`}
                    data-certificate-card
                    onMouseEnter={() => {
                      if (canUseFineHover()) setHoveredCertificateIndex(index);
                    }}
                    onMouseLeave={() => setHoveredCertificateIndex(null)}
                    className={`group flex w-full shrink-0 flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_12px_34px_-24px_rgba(15,20,30,0.22)] transition-all duration-300 active:scale-[0.99] max-lg:aspect-[4/5] max-lg:max-h-[min(92vh,560px)] max-lg:min-h-0 lg:aspect-square lg:min-h-[400px] lg:max-h-none ${
                      hoveredCertificateIndex === null
                        ? "[@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:shadow-[0_18px_42px_-24px_rgba(15,20,30,0.28)]"
                        : hoveredCertificateIndex === index
                          ? "z-10 scale-[1.07] border-[#1f4fa8]/35 shadow-[0_24px_56px_-24px_rgba(15,20,30,0.34)] lg:scale-[1.07]"
                          : "[@media(hover:hover)]:scale-[0.9] [@media(hover:hover)]:opacity-75"
                    }`}
                  >
                    <div className="relative flex-[0_0_52%] border-b border-ink/10 bg-[#eef1f4] sm:flex-[0_0_50%]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 42vw, min(480px, 33vw)"
                      />
                    </div>
                    <div className="flex flex-1 flex-col px-5 py-3 sm:px-5 sm:py-3.5">
                      <p className="font-mono-eng text-[10px] uppercase tracking-[0.2em] text-ink/45">
                        {locale === "tr" ? "Sertifika" : locale === "ru" ? "Сертификат" : "Certificate"}
                      </p>
                      <h3 className="mt-2 line-clamp-2 text-[1.2rem] font-semibold leading-[1.15] text-ink transition-colors group-hover:text-[#1f4fa8] sm:text-[1.28rem]">
                        {item.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-[13px] leading-[1.55] text-ink/62 sm:text-[14px]">
                        {locale === "tr"
                          ? "Uluslararası kalite, güvenlik ve uygunluk belgelerimizi inceleyin."
                          : locale === "ru"
                            ? "Ознакомьтесь с международными сертификатами качества и соответствия."
                            : "Review our international quality, safety and compliance certificates."}
                      </p>
                      <div className="mt-auto pt-2.5 font-mono-eng text-[9px] font-medium tracking-[0.12em] text-[#1f4fa8] sm:text-[10px]">
                        {locale === "tr" ? "Detayları İncele" : locale === "ru" ? "Подробнее" : "View Details"}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="flex w-full justify-center lg:col-start-2 lg:row-start-2">
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
          </div>
            </>
          )}

          {/* Şirket profili — sertifikaların altında */}
          <div id="company-profile" className="relative mt-10 scroll-mt-24 md:scroll-mt-[5.5rem] lg:mt-12">
            <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-x-3 lg:gap-y-8">
              <div className="flex w-full justify-center self-center lg:col-start-1 lg:row-start-1 lg:w-auto lg:justify-start">
                <div
                  className={`relative overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_20px_46px_-24px_rgba(15,20,30,0.32)] transition-all duration-300 ${
                    hoveredCompanyProfileIndex !== null ? "scale-[0.86] opacity-80" : "scale-100 opacity-100"
                  }`}
                >
                  <div className="absolute inset-y-0 left-0 w-4.5 bg-[#243044]" />
                  <div className="flex items-center justify-center px-4 py-3.5 lg:block lg:py-7 lg:pl-4 lg:pr-3">
                    <span className="font-mono-eng text-[15px] font-bold uppercase tracking-[0.24em] text-ink antialiased max-lg:[writing-mode:horizontal-tb] max-lg:text-center lg:[writing-mode:vertical-rl] lg:[text-orientation:mixed] max-sm:[text-shadow:0_1px_0_rgba(255,255,255,1)] sm:text-[18px] sm:font-semibold sm:tracking-[0.3em]">
                      {locale === "tr" ? "Şirket Profili" : locale === "ru" ? "Профиль компании" : "Company Profile"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex min-h-0 min-w-0 w-full flex-col gap-4 lg:col-start-2 lg:row-start-1 lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-visible">
                {companyProfileItems.map((item, index) => {
                  const title = locale === "tr" ? item.tr : locale === "ru" ? item.ru : item.en;
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
                      <div
                        className={`relative border-b border-ink/10 ${
                          item.href === "/kurumsal/ceo-mesaji"
                            ? "flex-[0_0_58%] min-h-[200px] overflow-hidden bg-[#e8eaee] sm:min-h-[240px] sm:flex-[0_0_56%]"
                            : "flex-[0_0_52%] bg-[#eef1f4] sm:flex-[0_0_50%]"
                        }`}
                      >
                        <Image
                          src={item.image}
                          alt={title}
                          fill
                          className={
                            item.href === "/kurumsal/ceo-mesaji"
                              ? "object-cover object-[88%_24%]"
                              : "object-cover object-center"
                          }
                          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 42vw, min(480px, 33vw)"
                        />
                      </div>
                      <div className="flex flex-1 flex-col px-5 py-3 sm:px-5 sm:py-3.5">
                        <p className="font-mono-eng text-[10px] uppercase tracking-[0.2em] text-ink/45">
                          {locale === "tr" ? "Kurumsal" : locale === "ru" ? "Компания" : "Corporate"}
                        </p>
                        <h3 className="mt-2 line-clamp-2 text-[1.2rem] font-semibold leading-[1.15] text-ink transition-colors group-hover:text-[#243044] sm:text-[1.28rem]">
                          {title}
                        </h3>
                        <p className="mt-2 line-clamp-3 text-[13px] leading-[1.55] text-ink/62 sm:text-[14px]">
                          {locale === "tr"
                            ? "NOVVES’in hikayesi, yönetim ve ekip yapısını keşfedin."
                            : locale === "ru"
                              ? "История NOVVES, руководство и структура команды."
                              : "Discover NOVVES’ story, leadership and team structure."}
                        </p>
                        <div className="mt-auto pt-2.5 font-mono-eng text-[9px] font-medium tracking-[0.12em] text-[#243044] sm:text-[10px]">
                          {locale === "tr" ? "Detayları İncele" : locale === "ru" ? "Подробнее" : "View Details"}
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
                  <span>{locale === "tr" ? "Tümünü Gör" : locale === "ru" ? "Смотреть все" : "View All"}</span>
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
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

        <div className="relative mx-auto max-w-[1600px] px-2 sm:px-10 lg:px-16">
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
      <section id="faq" className="relative scroll-mt-24 bg-sand-200 py-16 sm:py-20 md:scroll-mt-[5.5rem]">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-60" />

        <div className="relative mx-auto max-w-[1600px] px-2 sm:px-10 lg:px-16">
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
    </main>
  );
}