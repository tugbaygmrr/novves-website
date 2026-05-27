"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { jumpNavHomeLabel } from "@/i18n/jump-nav-labels";
import type { Locale } from "@/i18n/config";

export type SidebarItem = { slug: string; label: string };
export type PillarProduct = {
  code: string;
  name: string;
  image: string;
  href?: string;
  icon?: "fan" | "damper" | "panel" | "document";
};
export type PillarPdf = { title: string; size: string; thumb?: string; href?: string };
export type PillarStat = { label: string; icon: "shield" | "eye" | "thermometer" };

function ProductCardIcon({ kind = "document", className = "" }: { kind?: PillarProduct["icon"]; className?: string }) {
  if (kind === "fan") {
    // Aksiyal duman tahliye fanı — dairesel kabin + 4 kanatlı pervane + merkez göbek
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9.5" />
        <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
        <path d="M12 10.4c-1.2-2.4-4-3.6-6.8-2.4 0.4 2.6 3 4.4 5.6 4" fill="currentColor" fillOpacity="0.25" />
        <path d="M13.6 12c2.4-1.2 3.6-4 2.4-6.8 -2.6 0.4 -4.4 3 -4 5.6" fill="currentColor" fillOpacity="0.25" />
        <path d="M12 13.6c1.2 2.4 4 3.6 6.8 2.4 -0.4-2.6 -3-4.4 -5.6-4" fill="currentColor" fillOpacity="0.25" />
        <path d="M10.4 12c-2.4 1.2 -3.6 4 -2.4 6.8 2.6-0.4 4.4-3 4-5.6" fill="currentColor" fillOpacity="0.25" />
      </svg>
    );
  }
  if (kind === "damper") {
    // Motorlu damper — flanşlı kasa + eğik (açık konumda) 4 louver kanat + sağda actuator motor
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Kasa */}
        <rect x="2.5" y="4.5" width="15" height="15" rx="0.6" />
        {/* Köşe flanş cıvataları */}
        <circle cx="4" cy="6" r="0.4" fill="currentColor" />
        <circle cx="16" cy="6" r="0.4" fill="currentColor" />
        <circle cx="4" cy="18" r="0.4" fill="currentColor" />
        <circle cx="16" cy="18" r="0.4" fill="currentColor" />
        {/* Eğik louver kanatları (kısmen açık damper) */}
        <line x1="4" y1="7.5" x2="16" y2="9" strokeWidth="1.7" />
        <line x1="4" y1="11.5" x2="16" y2="13" strokeWidth="1.7" />
        <line x1="4" y1="15.5" x2="16" y2="17" strokeWidth="1.7" />
        {/* Sağda actuator motor + mil */}
        <line x1="17.5" y1="12" x2="19" y2="12" />
        <rect x="19" y="9.5" width="3.5" height="5" rx="0.4" fill="currentColor" fillOpacity="0.2" />
      </svg>
    );
  }
  if (kind === "panel") {
    // Endüstriyel kontrol panosu — askı menteşeli kabin + ekran + 2 buton + 3 LED
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Kabin gövde */}
        <rect x="3" y="3" width="18" height="18" rx="1.4" />
        {/* Üst menteşe çizgisi */}
        <line x1="3" y1="6" x2="21" y2="6" strokeWidth="0.9" opacity="0.7" />
        {/* Dijital LCD ekran */}
        <rect x="5.5" y="7.5" width="9" height="4.5" rx="0.4" fill="currentColor" fillOpacity="0.3" />
        <line x1="6.5" y1="9.3" x2="11" y2="9.3" strokeWidth="0.9" />
        <line x1="6.5" y1="10.7" x2="13" y2="10.7" strokeWidth="0.9" />
        {/* Sağ üstte güç butonu */}
        <circle cx="17" cy="9.8" r="1.4" />
        <line x1="17" y1="8.6" x2="17" y2="10" strokeWidth="1.1" />
        {/* Alt sırada 3 LED */}
        <circle cx="6.5" cy="15.5" r="0.95" fill="currentColor" />
        <circle cx="10" cy="15.5" r="0.95" fill="currentColor" fillOpacity="0.5" />
        <circle cx="13.5" cy="15.5" r="0.95" fill="currentColor" fillOpacity="0.5" />
        {/* Alt selector switch */}
        <line x1="16.5" y1="15.5" x2="18.5" y2="15.5" strokeWidth="1.8" strokeLinecap="round" />
        {/* Alt etiket çizgisi */}
        <line x1="6" y1="18.5" x2="18" y2="18.5" strokeWidth="0.7" opacity="0.6" />
      </svg>
    );
  }
  // document (varsayılan) — teknik föy / katalog
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h9l4 4v14H6V3z" />
      <path d="M14 3v5h5" />
      <line x1="9" y1="13" x2="16" y2="13" />
      <line x1="9" y1="16" x2="16" y2="16" />
      <line x1="9" y1="19" x2="14" y2="19" />
    </svg>
  );
}

const PILLAR_LABELS: Record<string, {
  allSolutions: string;
  supportButton: string;
  pillar01Eyebrow: string;
  pillar02Title: string;
  pillar03Title: string;
  pdfBadge: string;
  cardCta: string;
}> = {
  tr: {
    allSolutions: "TÜM ÇÖZÜMLER",
    supportButton: "Uzman desteği için bize ulaşın",
    pillar01Eyebrow: "Yangında hayat kurtaran sistemler",
    pillar02Title: "İLGİLİ\nÜRÜNLER",
    pillar03Title: "PDF\nDOKÜMANLAR",
    pdfBadge: "PDF",
    cardCta: "İncele",
  },
  en: {
    allSolutions: "ALL SOLUTIONS",
    supportButton: "Contact us for expert support",
    pillar01Eyebrow: "Life-saving systems in fire emergencies",
    pillar02Title: "RELATED\nPRODUCTS",
    pillar03Title: "PDF\nDOCUMENTS",
    pdfBadge: "PDF",
    cardCta: "View",
  },
  ru: {
    allSolutions: "ВСЕ РЕШЕНИЯ",
    supportButton: "Свяжитесь с нашими экспертами",
    pillar01Eyebrow: "Системы, спасающие жизни при пожаре",
    pillar02Title: "СОПУТСТВУЮЩИЕ\nПРОДУКТЫ",
    pillar03Title: "PDF\nДОКУМЕНТЫ",
    pdfBadge: "PDF",
    cardCta: "Открыть",
  },
};

function getPillarLabels(locale: string) {
  return PILLAR_LABELS[locale] ?? PILLAR_LABELS.en;
}

function StatIcon({ kind, className = "" }: { kind: PillarStat["icon"]; className?: string }) {
  const stroke = "currentColor";
  const props = { fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.6, stroke } as const;
  if (kind === "shield") {
    return (
      <svg {...props} className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 3v5c0 5-3.6 9.2-8 10-4.4-.8-8-5-8-10V6l8-3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
      </svg>
    );
  }
  if (kind === "eye") {
    return (
      <svg {...props} className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-7 9.75-7 9.75 7 9.75 7-3.75 7-9.75 7S2.25 12 2.25 12z" />
        <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg {...props} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 14.76V5a2 2 0 10-4 0v9.76a4 4 0 104 0z" />
    </svg>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function SolutionDetailPillarClient({
  dict,
  locale,
  commonDict,
  slug,
  sidebar,
  heroImage,
  products,
  pdfs,
  stats,
}: {
  dict: any;
  locale: string;
  commonDict: any;
  slug: string;
  sidebar: SidebarItem[];
  heroImage: string;
  pillar01Image?: string;
  products: PillarProduct[];
  pdfs: PillarPdf[];
  stats: PillarStat[];
}) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Mobil chip strip için mouse drag-to-scroll
  const stripRef = useRef<HTMLDivElement | null>(null);
  const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0, moved: false });

  const onStripPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return; // touch native scroll'a bırak
    if (!stripRef.current) return;
    dragState.current.isDown = true;
    dragState.current.moved = false;
    dragState.current.startX = e.pageX - stripRef.current.offsetLeft;
    dragState.current.scrollLeft = stripRef.current.scrollLeft;
    stripRef.current.setPointerCapture(e.pointerId);
  };

  const onStripPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.isDown || !stripRef.current) return;
    const x = e.pageX - stripRef.current.offsetLeft;
    const walk = x - dragState.current.startX;
    if (Math.abs(walk) > 5) dragState.current.moved = true;
    stripRef.current.scrollLeft = dragState.current.scrollLeft - walk;
  };

  const onStripPointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    dragState.current.isDown = false;
    if (stripRef.current?.hasPointerCapture(e.pointerId)) {
      stripRef.current.releasePointerCapture(e.pointerId);
    }
  };

  const onStripClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragState.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      dragState.current.moved = false;
    }
  };
  const L = getPillarLabels(locale);
  const faqItems: { q: string; a: string }[] = Array.isArray(dict?.faqItems) ? dict.faqItems : [];
  const navLabel = typeof commonDict?.navbar?.solutions === "string" ? commonDict.navbar.solutions : "Solutions";

  return (
    <main className="bg-[#f4f3ef]">
      {/* CANVAS — sidebar + content panel, flush against fixed navbar */}
      <section className="relative">
        <div className="w-full px-0">
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-[260px_minmax(0,1fr)]">
            {/* SIDEBAR — sadece lg+ ekranlarda göster */}
            <aside className="hidden lg:sticky lg:top-0 lg:block lg:self-start">
              <div className="flex h-full min-h-screen flex-col overflow-hidden bg-[#0e1117] shadow-[0_24px_60px_-32px_rgba(15,20,30,0.45)] lg:rounded-br-2xl">
                <div className="border-b border-white/10 px-5 pb-5 pt-[110px] sm:pt-[118px] lg:pt-[130px]">
                  <Image
                    src="/images/novves-logo.svg"
                    alt="Novves"
                    width={92}
                    height={26}
                    className="h-6 w-auto"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                  <p className="mt-2 text-[12px] font-medium uppercase tracking-[0.22em] text-primary/85">ÇÖZÜM</p>
                </div>

                <nav className="flex-1 overflow-y-auto px-2 py-3">
                  <Link
                    href={`/${locale}/cozumler`}
                    className="mb-1 flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[14px] font-medium uppercase tracking-[0.14em] text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white"
                  >
                    <span className="grid h-4 w-4 grid-cols-2 gap-[2px]">
                      <span className="rounded-[1px] bg-current" />
                      <span className="rounded-[1px] bg-current" />
                      <span className="rounded-[1px] bg-current" />
                      <span className="rounded-[1px] bg-current" />
                    </span>
                    {L.allSolutions}
                  </Link>

                  <ul className="space-y-0.5">
                    {sidebar.map((item) => {
                      const active = item.slug === slug;
                      return (
                        <li key={item.slug}>
                          <Link
                            href={`/${locale}/cozumler/${item.slug}`}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium leading-tight transition-colors ${
                              active
                                ? "bg-primary text-white shadow-[0_8px_20px_-10px_rgba(239,95,23,0.7)]"
                                : "text-white/65 hover:bg-white/[0.06] hover:text-white"
                            }`}
                          >
                            <Image
                              src={`/images/solution-icons/${item.slug}.svg`}
                              alt=""
                              width={22}
                              height={22}
                              className={`h-[22px] w-[22px] shrink-0 transition-opacity ${active ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`}
                            />
                            <span className="line-clamp-2">{item.label}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                <div className="border-t border-white/10 p-3">
                  <Link
                    href={`/${locale}/iletisim`}
                    className="group flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-[14px] font-medium text-white/85 transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-white"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary ring-1 ring-primary/30 transition-colors group-hover:bg-primary group-hover:text-white">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </span>
                    <span className="leading-tight">{L.supportButton}</span>
                  </Link>
                </div>
              </div>
            </aside>

            {/* CONTENT */}
            <div className="space-y-0">
              {/* MOBIL/TABLET — yatay scroll çözüm chip strip (lg altında) */}
              <div className="bg-[#0e1117] pt-[80px] sm:pt-[92px] lg:hidden">
                <div
                  ref={stripRef}
                  onPointerDown={onStripPointerDown}
                  onPointerMove={onStripPointerMove}
                  onPointerUp={onStripPointerEnd}
                  onPointerCancel={onStripPointerEnd}
                  onPointerLeave={onStripPointerEnd}
                  onClickCapture={onStripClickCapture}
                  className="flex cursor-grab select-none items-center gap-2 overflow-x-auto px-4 py-3 active:cursor-grabbing sm:px-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                >
                  <Link
                    href={`/${locale}/cozumler`}
                    className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-[12px] font-medium uppercase tracking-[0.1em] text-white/85 transition-colors hover:border-primary/40 hover:text-white"
                  >
                    <span className="grid h-3 w-3 grid-cols-2 gap-[1.5px]">
                      <span className="rounded-[0.5px] bg-current" />
                      <span className="rounded-[0.5px] bg-current" />
                      <span className="rounded-[0.5px] bg-current" />
                      <span className="rounded-[0.5px] bg-current" />
                    </span>
                    {L.allSolutions}
                  </Link>
                  {sidebar.map((item) => {
                    const active = item.slug === slug;
                    return (
                      <Link
                        key={item.slug}
                        href={`/${locale}/cozumler/${item.slug}`}
                        className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors ${
                          active
                            ? "bg-primary text-white shadow-[0_6px_16px_-8px_rgba(239,95,23,0.7)]"
                            : "border border-white/10 bg-white/[0.03] text-white/70 hover:border-primary/30 hover:text-white"
                        }`}
                      >
                        <Image
                          src={`/images/solution-icons/${item.slug}.svg`}
                          alt=""
                          width={14}
                          height={14}
                          draggable={false}
                          className="h-3.5 w-3.5 shrink-0"
                        />
                        <span className="whitespace-nowrap">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* HERO */}
              <div className="relative overflow-hidden bg-[#0e1117] shadow-[0_24px_60px_-32px_rgba(15,20,30,0.4)]">
                <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[16/7]">
                  <Image
                    src={heroImage}
                    alt={dict.breadcrumbCurrent ?? ""}
                    fill
                    priority
                    sizes="(max-width:1024px) 100vw, 1100px"
                    className="object-cover object-[46%_50%]"
                    style={{ filter: "brightness(1.12) saturate(1.08)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                  {/* Top dark strip so the breadcrumb stays readable over the bright fire image */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-[170px] bg-gradient-to-b from-black/75 via-black/40 to-transparent" />

                  <nav
                    className="absolute left-0 right-0 top-0 flex items-center gap-2 px-4 pt-4 text-[12px] font-medium text-white/90 sm:px-6 sm:pt-5 sm:text-[13px] lg:px-14 lg:pt-[130px] lg:text-[14px]"
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.7)" }}
                  >
                    <Link href={`/${locale}`} className="transition-colors hover:text-primary">
                      {jumpNavHomeLabel(locale as Locale)}
                    </Link>
                    <span className="text-white/55">/</span>
                    <Link href={`/${locale}/cozumler`} className="transition-colors hover:text-primary">
                      {navLabel}
                    </Link>
                    <span className="text-white/55">/</span>
                    <span className="text-white">{dict.breadcrumbCurrent}</span>
                  </nav>

                  <div className="absolute inset-0 flex flex-col justify-end px-4 pb-6 sm:px-6 sm:pb-10 lg:px-14 lg:pb-16">
                    <h1
                      className="max-w-full font-eurostile text-[clamp(1.5rem,7vw,2.625rem)] font-bold uppercase leading-[1.05] tracking-[0.01em] text-white sm:max-w-[78%] lg:max-w-[62%]"
                      style={{
                        textShadow: "0 2px 12px rgba(0,0,0,0.7), 0 6px 24px rgba(0,0,0,0.45)",
                        fontStretch: "expanded",
                      }}
                    >
                      {dict.titleLine1}
                      {dict.titleHighlight ? (
                        <>
                          <br />
                          {dict.titleHighlight}
                        </>
                      ) : null}
                    </h1>
                    <div className="mt-3 flex max-w-full items-center gap-2.5 sm:mt-5 sm:max-w-[78%] sm:gap-3 lg:max-w-[62%]">
                      <span className="h-[2px] w-6 bg-primary sm:w-10" />
                      <p className="text-[12px] font-normal text-white/90 sm:text-[14px] lg:text-[16px]">
                        {L.pillar01Eyebrow}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 01 — Description + stats */}
              <div className="relative overflow-hidden bg-[#13161c] px-6 py-8 shadow-[0_24px_60px_-32px_rgba(15,20,30,0.4)] sm:px-10 sm:py-10 lg:px-14 lg:py-11">
                {/* Subtle radial highlight üst-sol köşeden */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 60% 80% at 12% 0%, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 60%)",
                  }}
                />
                {/* Turuncu accent glow sağ-alt köşeden */}
                <div
                  className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full opacity-[0.08]"
                  style={{ background: "radial-gradient(circle, #ef5f17, transparent 70%)" }}
                />
                {/* İnce blueprint grid dokusu */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.035]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
                    backgroundSize: "44px 44px",
                  }}
                />
                {/* Sağ kenardan uçuşan duman ve kıvılcımlar — saf SVG (md ve üstü) */}
                <svg
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[48%] md:block lg:w-[42%]"
                  viewBox="0 0 400 400"
                  preserveAspectRatio="xMidYMid slice"
                  style={{
                    WebkitMaskImage:
                      "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 35%, rgba(0,0,0,0.45) 72%, rgba(0,0,0,0) 100%)",
                    maskImage:
                      "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 35%, rgba(0,0,0,0.45) 72%, rgba(0,0,0,0) 100%)",
                  }}
                >
                  <defs>
                    <radialGradient id="ember-core" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#fff3c4" stopOpacity="1" />
                      <stop offset="30%" stopColor="#ffb04a" stopOpacity="0.95" />
                      <stop offset="70%" stopColor="#ff5a17" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#ff5a17" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="ember-small" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffd27a" stopOpacity="1" />
                      <stop offset="60%" stopColor="#ff7a2a" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#ff7a2a" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="smoke-puff" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#5a4538" stopOpacity="0.55" />
                      <stop offset="60%" stopColor="#3a2e26" stopOpacity="0.28" />
                      <stop offset="100%" stopColor="#1f1814" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="warm-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ff7a2a" stopOpacity="0.35" />
                      <stop offset="60%" stopColor="#c54414" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#7a2a0a" stopOpacity="0" />
                    </radialGradient>
                    <filter id="ember-blur" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="1.2" />
                    </filter>
                    <filter id="smoke-blur" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="14" />
                    </filter>
                  </defs>

                  {/* Sıcak arkaplan parıltısı */}
                  <ellipse cx="320" cy="220" rx="220" ry="180" fill="url(#warm-glow)" />

                  {/* Duman bulutları (yumuşak gri-kahverengi) */}
                  <g filter="url(#smoke-blur)">
                    <ellipse cx="290" cy="80" rx="90" ry="60" fill="url(#smoke-puff)" />
                    <ellipse cx="340" cy="140" rx="110" ry="70" fill="url(#smoke-puff)" />
                    <ellipse cx="260" cy="180" rx="80" ry="55" fill="url(#smoke-puff)" />
                    <ellipse cx="320" cy="280" rx="100" ry="65" fill="url(#smoke-puff)" />
                    <ellipse cx="240" cy="330" rx="85" ry="50" fill="url(#smoke-puff)" />
                  </g>

                  {/* Büyük kıvılcımlar — glow halkalı */}
                  <g filter="url(#ember-blur)">
                    <circle cx="330" cy="100" r="6" fill="url(#ember-core)" />
                    <circle cx="280" cy="160" r="8" fill="url(#ember-core)" />
                    <circle cx="350" cy="210" r="5" fill="url(#ember-core)" />
                    <circle cx="310" cy="260" r="7" fill="url(#ember-core)" />
                    <circle cx="270" cy="310" r="6" fill="url(#ember-core)" />
                    <circle cx="360" cy="340" r="4" fill="url(#ember-core)" />
                  </g>

                  {/* Küçük noktasal kıvılcımlar — saçık */}
                  <g>
                    <circle cx="220" cy="60" r="1.8" fill="#ffd27a" opacity="0.9" />
                    <circle cx="200" cy="120" r="1.2" fill="#ffb04a" opacity="0.85" />
                    <circle cx="380" cy="60" r="2" fill="#fff3c4" opacity="1" />
                    <circle cx="240" cy="200" r="1.5" fill="#ff9a4a" opacity="0.9" />
                    <circle cx="180" cy="250" r="1.1" fill="#ffd27a" opacity="0.8" />
                    <circle cx="370" cy="280" r="1.7" fill="#ffb04a" opacity="0.9" />
                    <circle cx="210" cy="320" r="1.3" fill="#ff9a4a" opacity="0.85" />
                    <circle cx="290" cy="40" r="1.6" fill="#fff3c4" opacity="0.95" />
                    <circle cx="160" cy="180" r="1" fill="#ffb04a" opacity="0.75" />
                    <circle cx="390" cy="170" r="2.2" fill="#fff3c4" opacity="1" />
                    <circle cx="250" cy="380" r="1.4" fill="#ff9a4a" opacity="0.85" />
                    <circle cx="330" cy="60" r="1" fill="#ffd27a" opacity="0.7" />
                    <circle cx="170" cy="90" r="0.9" fill="#ff9a4a" opacity="0.7" />
                    <circle cx="340" cy="370" r="1.2" fill="#ffd27a" opacity="0.85" />
                  </g>

                  {/* Uçan parıltı çizgileri (yukarı doğru "spark trail") */}
                  <g opacity="0.55" stroke="#ffb04a" strokeLinecap="round" fill="none">
                    <path d="M 300 220 Q 305 195 308 170" strokeWidth="0.9" opacity="0.7" />
                    <path d="M 260 270 Q 268 240 272 215" strokeWidth="0.8" opacity="0.6" />
                    <path d="M 340 300 Q 348 270 354 245" strokeWidth="0.7" opacity="0.55" />
                    <path d="M 220 200 Q 226 175 232 150" strokeWidth="0.7" opacity="0.5" />
                  </g>
                </svg>
                <div className="relative grid items-start gap-5 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-8">
                  <div className="-ml-1 select-none">
                    <span
                      aria-hidden
                      className="block font-eurostile font-black leading-[0.78] tracking-[-0.04em] text-[clamp(4.5rem,14vw,15.5rem)]"
                      style={{
                        color: "#7d8089",
                        marginTop: "0.05em",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      01
                    </span>
                  </div>
                  <div>
                    <h2 className="font-eurostile text-[22px] font-bold leading-[1.25] tracking-tight text-white sm:text-[26px] lg:text-[28px]">
                      {dict.whyImportantTitle}
                    </h2>
                    <div className="mt-4 space-y-3 text-[15px] leading-[1.65] font-normal text-white/72 sm:text-[16px]">
                      <p>{dict.whyImportantP1}</p>
                      {dict.whyImportantP2 ? <p>{dict.whyImportantP2}</p> : null}
                    </div>

                    {stats.length > 0 ? (
                      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 sm:mt-6 sm:gap-x-0">
                        {stats.map((s, i) => (
                          <div key={`${s.label}-${i}`} className="flex items-center">
                            {/* Divider sadece sm+ ekranlarda */}
                            {i > 0 ? (
                              <span aria-hidden className="mx-5 hidden h-7 w-px bg-white/20 sm:block sm:mx-6" />
                            ) : null}
                            <div className="flex items-center gap-2.5">
                              <span className="flex h-8 w-8 items-center justify-center rounded-full border-[1.5px] border-primary text-primary">
                                <StatIcon kind={s.icon} className="h-[16px] w-[16px]" />
                              </span>
                              <span className="text-[13px] font-medium tracking-tight text-primary sm:text-[14px]">
                                {s.label}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* 02 — Related products */}
              <div className="relative overflow-hidden bg-white px-6 py-8 shadow-[0_24px_60px_-32px_rgba(15,20,30,0.18)] ring-1 ring-ink/[0.05] sm:px-10 sm:py-10 lg:px-14 lg:py-11">
                <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-8">
                  <div className="-ml-1 select-none">
                    <span
                      aria-hidden
                      className="block font-eurostile font-black leading-[0.78] tracking-[-0.04em] text-[clamp(4.5rem,14vw,15.5rem)]"
                      style={{
                        color: "#7d8089",
                        marginTop: "0.05em",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      02
                    </span>
                    <h2 className="mt-2 whitespace-pre-line font-eurostile text-[20px] font-bold leading-tight tracking-[0.02em] text-ink sm:text-[22px]">
                      {L.pillar02Title}
                    </h2>
                    <span className="mt-3 block h-[2px] w-9 bg-primary" />
                  </div>

                  <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((p) => {
                      const card = (
                        <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-ink/[0.08] bg-[#f6f5f1] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_22px_44px_-26px_rgba(15,20,30,0.25)]">
                          <div className="relative aspect-[5/4] w-full overflow-hidden bg-gradient-to-b from-[#fbfaf6] to-[#e9e7df]">
                            <Image
                              src={p.image}
                              alt={p.name}
                              fill
                              sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 320px"
                              className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.05]"
                            />
                          </div>
                          <div className="flex flex-1 flex-col px-4 py-3.5">
                            <p className="font-eurostile text-[20px] font-bold leading-tight text-ink">{p.code}</p>
                            <p className="mt-1 text-[14px] font-normal leading-snug text-ink/65 sm:text-[16px]">{p.name}</p>
                            <div className="mt-3 flex items-center justify-between">
                              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white">
                                <ProductCardIcon kind={p.icon} className="h-4 w-4" />
                              </span>
                              <svg className="h-3.5 w-3.5 text-ink/40 transition-colors group-hover:text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      );
                      return (
                        <li key={p.code}>
                          {p.href ? (
                            <Link href={p.href} className="block h-full">
                              {card}
                            </Link>
                          ) : (
                            card
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* 03 — PDF documents */}
              {pdfs.length > 0 ? (
                <div className="relative overflow-hidden bg-white px-6 py-8 shadow-[0_24px_60px_-32px_rgba(15,20,30,0.18)] ring-1 ring-ink/[0.05] sm:px-10 sm:py-10 lg:px-14 lg:py-11">
                  <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-8">
                    <div className="-ml-1 select-none">
                      <span
                        aria-hidden
                        className="block font-eurostile font-black leading-[0.78] tracking-[-0.04em] text-[clamp(4.5rem,14vw,15.5rem)]"
                        style={{
                          color: "#7d8089",
                          marginTop: "0.05em",
                        }}
                      >
                        03
                      </span>
                      <h2 className="mt-2 whitespace-pre-line font-eurostile text-[20px] font-bold leading-tight tracking-[0.02em] text-ink sm:text-[22px]">
                        {L.pillar03Title}
                      </h2>
                      <span className="mt-3 block h-[2px] w-9 bg-primary" />
                    </div>

                    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {pdfs.map((doc, i) => {
                        const card = (
                          <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-ink/[0.08] bg-[#f6f5f1] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_22px_44px_-26px_rgba(15,20,30,0.25)]">
                            <div className="relative aspect-[5/4] w-full overflow-hidden bg-gradient-to-b from-[#1a2030] to-[#0e1117]">
                              {doc.thumb ? (
                                <Image
                                  src={doc.thumb}
                                  alt={doc.title}
                                  fill
                                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 320px"
                                  className="object-cover opacity-95 transition-transform duration-500 group-hover:scale-[1.04]"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                  <Image
                                    src="/images/novves-logo.svg"
                                    alt="Novves"
                                    width={120}
                                    height={34}
                                    className="h-8 w-auto opacity-80"
                                    style={{ filter: "brightness(0) invert(1)" }}
                                  />
                                </div>
                              )}
                              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                            </div>
                            <div className="flex flex-1 flex-col px-4 py-3.5">
                              <p className="font-eurostile text-[20px] font-bold leading-tight text-ink">{doc.title}</p>
                              <p className="mt-1 text-[14px] font-medium text-ink/55">{L.pdfBadge} · {doc.size}</p>
                              <div className="mt-3 flex items-center justify-between">
                                <span className="flex h-7 w-9 items-center justify-center rounded-md bg-[#d8362a] text-[12px] font-bold text-white tracking-wider">
                                  PDF
                                </span>
                                <svg className="h-4 w-4 text-ink/40 transition-colors group-hover:text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        );
                        return (
                          <li key={`${doc.title}-${i}`}>
                            {doc.href ? (
                              <a href={doc.href} target="_blank" rel="noopener noreferrer" className="block h-full">
                                {card}
                              </a>
                            ) : (
                              card
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ + Final CTA aside — anasayfanın tam sectionı */}
      {faqItems.length > 0 ? (
        <section id="faq" className="relative scroll-mt-24 bg-sand-200 py-10 sm:py-14 md:scroll-mt-[5.5rem]">
          <div className="relative mx-auto max-w-[1400px] px-4 sm:px-10 lg:px-16">
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-12">
              <div className="flex flex-col lg:col-span-4 lg:pt-2">
                <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-primary sm:text-[14px] sm:tracking-[0.22em]">
                  {dict.faqLabel}
                </p>
                <h2
                  className="mt-3 text-balance font-eurostile text-[22px] font-bold tracking-[0.01em] text-ink sm:text-[26px] lg:text-[28px]"
                  style={{ lineHeight: 1.15 }}
                >
                  {dict.faqTitle}
                </h2>
              </div>

              <div className="lg:col-span-8">
                <div className="border-t border-ink/[0.08]">
                  {faqItems.map((item, index) => {
                    const isOpen = openFaq === index;
                    const num = String(index + 1).padStart(2, "0");
                    return (
                      <div key={index} className="border-b border-ink/[0.08]">
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          onClick={() => setOpenFaq(isOpen ? null : index)}
                          className="group grid w-full grid-cols-[auto_1fr_auto] items-start gap-x-3 py-3.5 text-left sm:gap-x-5 sm:py-4"
                        >
                          <span
                            className="select-none pt-0.5 font-eurostile text-[clamp(1.5rem,2.6vw,2rem)] font-bold leading-none tabular-nums text-primary/28 transition-colors duration-300 group-hover:text-primary/40"
                            aria-hidden
                          >
                            {num}
                          </span>
                          <span className="min-w-0 pt-1 text-[15px] font-medium leading-[1.4] text-ink sm:text-[16px] sm:leading-[1.45]">
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
                                <p className="text-[15px] font-normal leading-[1.65] text-[#6b7280] sm:text-[16px] sm:leading-[1.7]">
                                  {item.a}
                                </p>
                              </div>
                              <span aria-hidden className="w-[22px] sm:w-6" />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <aside className="mt-14 sm:mt-16 lg:mt-20">
              <div className="overflow-hidden rounded-[1.35rem] bg-[#eeedea] shadow-[0_22px_55px_-38px_rgba(15,22,36,0.14)] ring-1 ring-ink/[0.06] sm:rounded-[1.75rem]">
                <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
                  <div className="flex flex-col justify-between px-6 py-8 sm:px-9 sm:py-10 lg:px-11 lg:py-11">
                    <div>
                      <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-primary sm:text-[14px]">
                        {dict.finalCtaLabel}
                      </p>
                      <h3
                        className="mt-3 max-w-[22ch] text-balance font-eurostile font-bold tracking-[0.01em] text-ink"
                        style={{ fontSize: "clamp(1.375rem, 2.4vw, 1.75rem)", lineHeight: 1.2 }}
                      >
                        {dict.finalCtaTitle}
                      </h3>
                      <p className="mt-4 max-w-[52ch] text-[15px] font-normal leading-[1.65] text-ink/75 sm:text-[16px] sm:leading-[1.7]">
                        {dict.finalCtaDesc}
                      </p>

                      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                        <Link
                          href={`/${locale}/iletisim`}
                          className="group inline-flex items-center justify-center gap-2.5 rounded-lg bg-primary px-6 py-3.5 text-[14px] font-medium text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-deep hover:shadow-xl hover:shadow-primary/30"
                        >
                          {dict.finalCtaButton}
                          <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </Link>
                        {dict.finalCtaPhone ? (
                          <a
                            href={`tel:${dict.finalCtaPhone.replace(/\s+/g, "")}`}
                            className="group inline-flex items-center justify-center gap-2.5 rounded-lg border border-ink/15 bg-white px-6 py-3.5 text-[14px] font-medium text-ink transition-all duration-300 hover:border-primary/40 hover:text-primary"
                          >
                            <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                            </svg>
                            {dict.finalCtaPhone}
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="relative hidden min-h-[22rem] lg:block">
                    <Image
                      src="/images/finalcta.png"
                      alt={dict.finalCtaTitle ?? ""}
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
      ) : null}
    </main>
  );
}
