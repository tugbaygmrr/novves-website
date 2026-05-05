"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import { jumpNavHomeLabel } from "@/i18n/jump-nav-labels";

type AppArea = {
  title: string;
  description: string;
  products: { name: string; type: string; image: string }[];
};

const PRODUCT_NAME_TO_SLUG: Record<string, string> = {
  DRAGONFLY: "duman-isi-tahliye-fanlari",
  HOUND: "damperler",
  MARLIN: "kovan-tipi-aksiyal-fanlar",
  BEAR: "exproof-fanlar",
  NAUTILUS: "endustriyel-fanlar",
  HUMMINGBIRD: "ec-fanlar",
  HERON: "cati-fanlari",
  OWL: "duvar-tipi-fanlar",
  SEAHORSE: "banyo-fanlari",
  KOI: "kanal-fanlari",
  TURTLE: "hucreli-fanlar",
  TIGER: "klima-santralleri",
  DOLPHIN: "havuz-nem-alma-santrali",
  BUTTERFLY: "mutfak-fanlari",
  FOX: "siginak-fanlari",
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export function SolutionDetailClient({
  dict,
  locale,
  commonDict,
  slug,
  heroImage,
}: {
  dict: any;
  locale: string;
  commonDict: any;
  slug: string;
  heroImage?: string;
}) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedAreaIndex, setSelectedAreaIndex] = useState(0);

  if (dict == null || typeof dict !== "object") notFound();

  const areasProductTag =
    typeof commonDict?.solutionDetail?.areasProductTag === "string"
      ? commonDict.solutionDetail.areasProductTag
      : locale === "tr"
        ? "Uygun konfigürasyon"
        : "Suitable configuration";

  const areasProductsRibbon =
    typeof commonDict?.navbar?.products === "string" ? commonDict.navbar.products : locale === "tr" ? "Ürünler" : "Products";

  const areas: AppArea[] = Array.isArray(dict.areas) ? dict.areas : [];

  useEffect(() => {
    setSelectedAreaIndex(0);
  }, [slug]);

  useEffect(() => {
    setSelectedAreaIndex((i) => {
      if (areas.length === 0) return 0;
      return Math.min(i, areas.length - 1);
    });
  }, [areas.length]);

  const systemComponents: { title: string; desc: string }[] = Array.isArray(dict.systemComponents)
    ? dict.systemComponents
    : [];
  const advantages: { title: string; desc: string }[] = Array.isArray(dict.advantages) ? dict.advantages : [];
  const faqItems: { q: string; a: string }[] = Array.isArray(dict.faqItems) ? dict.faqItems : [];
  const trustStrip: { value: string; label: string }[] = Array.isArray(dict.trustStrip) ? dict.trustStrip : [];
  const steps: { label: string; desc: string }[] = Array.isArray(dict.steps) ? dict.steps : [];

  return (
    <main>
      {/* 1. HERO */}
      <section className="relative flex min-h-[580px] items-end overflow-hidden">
        <Image src={heroImage ?? "/images/page-hero/cozumler-main.jpg"} alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-[#4e525c]/28" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#72767d]/62 via-[#4a4f58]/78 to-[#31353e]/95" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_12%,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0)_52%),radial-gradient(ellipse_at_88%_95%,rgba(17,22,33,0.45)_0%,rgba(17,22,33,0)_55%)]" />
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.08]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-0 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36">
          <nav className="mb-8 flex items-center gap-2 text-xs text-white/45">
            <Link href={`/${locale}`} className="transition-colors hover:text-white/70">
              {jumpNavHomeLabel(locale as Locale)}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/cozumler/${slug}`} className="transition-colors hover:text-white/70">
              {commonDict?.navbar?.solutions ?? ""}
            </Link>
            <span>/</span>
            <span className="text-white/60">{dict.breadcrumbCurrent}</span>
          </nav>

          <div className="max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_28px_70px_-40px_rgba(10,12,16,0.75)] backdrop-blur-[2px] sm:p-8 lg:p-10">
            <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-primary/30 bg-primary/15 px-4 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_0_3px_rgba(255,107,53,0.18)]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{dict.badge}</span>
            </div>
            <h1 className="text-4xl font-bold leading-[1.04] tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.8rem]">
              {dict.titleLine1} <span className="text-primary">{dict.titleHighlight}</span>
            </h1>
            <p className="mt-6 max-w-[52ch] text-[18px] leading-[1.6] text-white/72">
              {dict.subtitle}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={`/${locale}/iletisim`} className="btn-3d btn-3d-primary group inline-flex items-center gap-2.5 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-white shadow-[0_18px_40px_-22px_rgba(255,107,53,0.62)] transition-all duration-300 hover:bg-[#e55a28] hover:shadow-[0_22px_44px_-20px_rgba(255,107,53,0.72)]">
                {dict.ctaPrimary}
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
              <Link href={`/${locale}${dict.ctaSecondaryHref}`} className="btn-3d btn-3d-glass inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.02] px-6 py-3.5 text-sm font-semibold text-white/85 transition-all duration-300 hover:border-white/35 hover:bg-white/[0.06] hover:text-white">
                {dict.ctaSecondary}
              </Link>
            </div>
          </div>

          {/* Trust strip */}
          <div className="mt-10 overflow-hidden rounded-t-2xl border border-white/10 bg-[#2f3340]/58 shadow-[0_24px_55px_-36px_rgba(7,10,18,0.75)] backdrop-blur-md">
            <div className="grid grid-cols-2 divide-x divide-white/10 sm:grid-cols-4">
            {trustStrip.map((s: any) => (
              <div key={s.label} className="py-5 text-center sm:py-6">
                <p className="text-lg font-bold text-primary sm:text-[1.35rem]">{s.value}</p>
                <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white/42">{s.label}</p>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. COZUM ACIKLAMASI */}
      <section className="relative overflow-hidden bg-[#f4f3ef] py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.16]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
            <div className="rounded-3xl border border-ink/10 bg-white/80 p-7 shadow-[0_22px_54px_-34px_rgba(15,20,30,0.22)] backdrop-blur-[3px] sm:p-9 lg:col-span-7 lg:h-full">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">{dict.whyImportantLabel}</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-dark sm:text-3xl">
                {dict.whyImportantTitle}
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-7 text-secondary/70">
                <p>{dict.whyImportantP1}</p>
                <p>{dict.whyImportantP2}</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 lg:col-span-5 lg:h-full">
              {steps.map((item: any, i: number) => (
                <div
                  key={i}
                  className="group flex items-start gap-4 rounded-2xl border border-ink/10 bg-white/90 p-5 shadow-[0_12px_34px_-30px_rgba(15,20,30,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_-28px_rgba(15,20,30,0.28)] lg:flex-1"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1a2842] text-[11px] font-bold text-white ring-1 ring-primary/20 transition-colors duration-300 group-hover:bg-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-dark">{item.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-secondary/60">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. SISTEM BILESENLERI */}
      <section className="relative overflow-hidden bg-[#eeede8] py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.18]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end gap-6 sm:mb-12">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">{dict.systemLabel}</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-dark sm:text-3xl">{dict.systemTitle}</h2>
            </div>
            <div className="hidden h-px flex-1 bg-ink/10 sm:block" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {systemComponents.map((item, i) => (
              <div
                key={i}
                className="group relative flex min-h-[250px] flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white/95 p-6 shadow-[0_14px_36px_-28px_rgba(15,20,30,0.28)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_-28px_rgba(15,20,30,0.35)]"
              >
                <div className="absolute left-0 top-0 h-full w-[3px] bg-primary/35 transition-colors duration-300 group-hover:bg-primary" />
                <span className="mb-3 block text-2xl font-black leading-none text-primary/90">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-[16px] font-bold text-dark">{item.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-secondary/62">{item.desc}</p>
                <div className="mt-auto pt-5">
                  <div className="flex items-center justify-center border-t border-ink/10 pt-3">
                    <Image
                      src="/images/novves-logo.svg"
                      alt="Novves"
                      width={96}
                      height={28}
                      className="h-6 w-auto opacity-[0.8] transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Mid-page CTA */}
      <section className="bg-dark py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
          <div>
            <h3 className="text-lg font-bold text-white">{dict.midCtaTitle}</h3>
            <p className="mt-1 text-sm text-white/40">{dict.midCtaDesc}</p>
          </div>
          <Link href={`/${locale}/iletisim`} className="group shrink-0 inline-flex items-center gap-2.5 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-[#e55a28] hover:shadow-xl hover:shadow-primary/30">
            {dict.midCtaButton}
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </Link>
        </div>
      </section>

      {/* 5. AVANTAJLAR */}
      <section className="relative overflow-hidden bg-[#f1f0eb] py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.14]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end gap-6 sm:mb-12">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">{dict.advantagesLabel}</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-dark sm:text-3xl">{dict.advantagesTitle}</h2>
            </div>
            <div className="hidden h-px flex-1 bg-ink/10 sm:block" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((adv, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-ink/10 bg-white/92 p-6 shadow-[0_14px_36px_-30px_rgba(15,20,30,0.24)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-30px_rgba(15,20,30,0.34)]"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-primary/80 via-primary/35 to-primary/10" />
                <div className="mb-3 inline-flex h-8 min-w-8 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 px-2 text-[11px] font-bold text-primary">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-[15px] font-bold text-dark">{adv.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-secondary/60">{adv.desc}</p>
                <div className="mt-5 flex items-center gap-2 border-t border-ink/10 pt-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-ink/45">NOVVES Standard</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. UYGULAMA ALANLARI — sol başlıklar, sağda seçilen alanın ürünleri */}
      <section className="relative overflow-hidden bg-[#ecebe6] py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.14]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 rounded-3xl border border-ink/[0.06] bg-gradient-to-br from-white via-white to-[#f6f5f2] p-7 shadow-[0_28px_80px_-48px_rgba(15,23,42,0.3)] ring-1 ring-white/90 sm:p-9">
            <span className="inline-flex rounded-full bg-primary/[0.12] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              {dict.areasLabel}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-[-0.02em] text-[#1a2842] sm:text-[2.35rem] sm:leading-[1.08]">
              {dict.areasTitle}
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-secondary/68 sm:mt-6 sm:text-[17px]">
              {dict.areasDesc}
            </p>
          </div>

          {areas.length > 0 ? (
            <div className="overflow-hidden rounded-3xl border border-ink/[0.07] bg-white/90 shadow-[0_32px_90px_-52px_rgba(15,23,42,0.38)] ring-1 ring-ink/[0.03] backdrop-blur-sm">
              <div className="flex flex-col lg:grid lg:min-h-[320px] lg:grid-cols-[minmax(272px,34%)_1fr] lg:items-stretch">
                <div
                  className="flex flex-col gap-1.5 border-b border-ink/[0.06] bg-gradient-to-b from-[#f5f4f0]/95 to-[#e9e6df]/90 p-3 sm:p-4 lg:border-b-0 lg:border-e lg:border-ink/[0.06]"
                  role="tablist"
                  aria-label={dict.areasLabel}
                >
                  {areas.map((area, i) => {
                    const selected = i === selectedAreaIndex;
                    return (
                      <button
                        key={area.title}
                        type="button"
                        role="tab"
                        id={`area-tab-${i}`}
                        aria-selected={selected}
                        aria-controls={`area-panel-${i}`}
                        onClick={() => setSelectedAreaIndex(i)}
                        className={`flex w-full items-start gap-3 rounded-2xl px-3 py-3.5 text-start transition-all duration-200 sm:gap-3.5 sm:px-4 sm:py-4 ${
                          selected
                            ? "bg-white shadow-[0_10px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-black/[0.05]"
                            : "hover:bg-white/55"
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[12px] font-bold tabular-nums transition-all duration-200 ${
                            selected
                              ? "bg-primary text-white shadow-md shadow-primary/30"
                              : "bg-[#1a2842]/88 text-white"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[15px] font-bold leading-snug tracking-tight text-[#1a2842] sm:text-base">
                            {area.title}
                          </span>
                          <span className="mt-1 line-clamp-2 text-[12px] leading-snug text-secondary/60 sm:text-[13px]">
                            {area.description}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div
                  id={`area-panel-${selectedAreaIndex}`}
                  role="tabpanel"
                  aria-labelledby={`area-tab-${selectedAreaIndex}`}
                  className="flex min-h-0 min-w-0 flex-col bg-gradient-to-b from-[#f2f1ec] via-[#f4f3ef] to-[#eeede7]"
                >
                  {(() => {
                    const area = areas[selectedAreaIndex];
                    if (!area) return null;
                    return (
                      <>
                        <div className="border-b border-white/60 bg-white/[0.72] px-5 py-6 backdrop-blur-md sm:px-8 sm:py-7">
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/90">{areasProductsRibbon}</p>
                          <p className="mt-2 max-w-3xl text-[15px] font-medium leading-relaxed text-secondary/78 sm:text-base">
                            {area.description}
                          </p>
                        </div>
                        <div className="p-5 sm:p-6 lg:p-8">
                          <ul className="grid list-none grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                            {area.products.map((p, j) => {
                              const src = typeof p.image === "string" ? p.image : "";
                              const jpgWhiteStudio = /\.jpe?g$/i.test(src);
                              const productSlug = PRODUCT_NAME_TO_SLUG[p.name?.trim().toUpperCase()];
                              const productHref = productSlug ? `/${locale}/urunler/${productSlug}` : "";
                              return (
                                <li
                                  key={`${area.title}-${p.name}-${j}`}
                                  className="min-w-0"
                                >
                                  {productHref ? (
                                    <Link
                                      href={productHref}
                                      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[1.35rem] border border-white/80 bg-white/75 shadow-[0_14px_44px_-32px_rgba(15,23,42,0.14)] ring-1 ring-ink/[0.04] transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:bg-white/95 hover:shadow-[0_22px_50px_-28px_rgba(15,23,42,0.22)]"
                                    >
                                      <div
                                        className={`relative aspect-[5/4] w-full overflow-hidden bg-gradient-to-b from-[#f8f7f3] to-[#e8e6df] ${jpgWhiteStudio ? "isolate" : ""}`}
                                      >
                                        <Image
                                          src={p.image}
                                          alt={p.name}
                                          fill
                                          className={`object-contain p-4 transition-transform duration-500 group-hover:scale-[1.04] ${jpgWhiteStudio ? "mix-blend-multiply" : ""}`}
                                          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                                        />
                                      </div>
                                      <div className="flex flex-1 flex-col gap-2.5 px-4 pb-5 pt-4 sm:px-5 sm:pb-6 sm:pt-5">
                                        <p className="text-[15px] font-bold leading-snug tracking-tight text-[#1a2842] sm:text-[16px]">
                                          {p.name}
                                        </p>
                                        <p className="text-[13px] leading-snug text-secondary/70 sm:text-sm">{p.type}</p>
                                        <div className="mt-auto inline-flex w-fit max-w-full items-center gap-2 rounded-full bg-ink/[0.06] px-3 py-1.5">
                                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/48">
                                            {areasProductTag}
                                          </span>
                                        </div>
                                      </div>
                                    </Link>
                                  ) : (
                                    <div className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[1.35rem] border border-white/80 bg-white/75 shadow-[0_14px_44px_-32px_rgba(15,23,42,0.14)] ring-1 ring-ink/[0.04]">
                                      <div
                                        className={`relative aspect-[5/4] w-full overflow-hidden bg-gradient-to-b from-[#f8f7f3] to-[#e8e6df] ${jpgWhiteStudio ? "isolate" : ""}`}
                                      >
                                        <Image
                                          src={p.image}
                                          alt={p.name}
                                          fill
                                          className={`object-contain p-4 ${jpgWhiteStudio ? "mix-blend-multiply" : ""}`}
                                          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                                        />
                                      </div>
                                      <div className="flex flex-1 flex-col gap-2.5 px-4 pb-5 pt-4 sm:px-5 sm:pb-6 sm:pt-5">
                                        <p className="text-[15px] font-bold leading-snug tracking-tight text-[#1a2842] sm:text-[16px]">
                                          {p.name}
                                        </p>
                                        <p className="text-[13px] leading-snug text-secondary/70 sm:text-sm">{p.type}</p>
                                        <div className="mt-auto inline-flex w-fit max-w-full items-center gap-2 rounded-full bg-ink/[0.06] px-3 py-1.5">
                                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/48">
                                            {areasProductTag}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="relative bg-[#ecebe6] py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.14]" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-1 hidden items-stretch gap-0 py-2 lg:flex">
          {[44, 36, 30].map((size, colIdx) => (
            <div
              key={`left-icon-col-${size}`}
              className={`flex flex-col justify-between ${colIdx === 1 ? "pt-1 -ml-4" : colIdx === 2 ? "pt-3 -ml-5" : ""}`}
            >
              {Array.from({ length: 14 }).map((_, iconIdx) => (
                <Image
                  key={`left-icon-${colIdx}-${iconIdx}`}
                  src="/images/novves-icon.svg"
                  alt=""
                  width={size}
                  height={size}
                  className={`origin-center ${iconIdx % 2 === 0 ? "opacity-38" : "opacity-24"} ${
                    iconIdx % 4 === 0
                      ? "translate-x-2 rotate-[18deg] scale-105"
                      : iconIdx % 4 === 1
                        ? "-translate-x-2 -rotate-[14deg] scale-95"
                        : iconIdx % 4 === 2
                          ? "translate-x-1 rotate-[8deg]"
                          : "-translate-x-1 -rotate-[8deg]"
                  }`}
                />
              ))}
            </div>
          ))}
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-1 hidden items-stretch gap-0 py-2 lg:flex">
          {[34, 28, 24].map((size, colIdx) => (
            <div
              key={`right-icon-col-${size}`}
              className={`flex flex-col justify-between ${colIdx === 1 ? "pt-2 -mr-4" : colIdx === 2 ? "pt-4 -mr-5" : ""}`}
            >
              {Array.from({ length: 14 }).map((_, iconIdx) => (
                <Image
                  key={`right-icon-${colIdx}-${iconIdx}`}
                  src="/images/novves-icon.svg"
                  alt=""
                  width={size}
                  height={size}
                  className={`origin-center ${iconIdx % 2 === 0 ? "opacity-28" : "opacity-16"} ${
                    iconIdx % 4 === 0
                      ? "-translate-x-2 -rotate-[16deg] scale-105"
                      : iconIdx % 4 === 1
                        ? "translate-x-2 rotate-[12deg] scale-95"
                        : iconIdx % 4 === 2
                          ? "-translate-x-1 -rotate-[7deg]"
                          : "translate-x-1 rotate-[7deg]"
                  }`}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">{dict.faqLabel}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-dark sm:text-4xl">{dict.faqTitle}</h2>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-[#1a2842]/14 bg-white/75 p-2.5 shadow-[0_22px_55px_-38px_rgba(13,17,23,0.22)] backdrop-blur-[6px] sm:p-3">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
              aria-hidden
            />
            <div className="relative space-y-2.5">
            {faqItems.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className={`overflow-hidden rounded-2xl border transition-[border-color,box-shadow] duration-300 ${
                    isOpen
                      ? "border-[#1a2842] shadow-[0_18px_44px_-26px_rgba(13,17,23,0.35)] ring-1 ring-primary/22"
                      : "border-[#1a2842]/10 bg-white/95 shadow-[0_10px_36px_-30px_rgba(26,40,66,0.16)] hover:border-primary/30 hover:shadow-[0_16px_44px_-28px_rgba(26,40,66,0.2)]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className={`group flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors duration-300 sm:px-6 ${
                      isOpen ? "bg-[#1a2842] text-white" : "bg-white/90 hover:bg-[#f7f6f2]"
                    }`}
                  >
                    <span
                      className={`text-[17px] font-semibold leading-[1.4] sm:text-[19px] ${
                        isOpen ? "text-white" : "text-ink transition-colors duration-300 group-hover:text-[#1a2842]"
                      }`}
                    >
                      {item.q}
                    </span>
                    <span
                      className={`shrink-0 text-[20px] leading-none transition-all duration-300 ${
                        isOpen ? "rotate-45 text-primary" : "text-ink/45 group-hover:text-primary"
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-[#1a2842]/15 bg-[#ebe8e0] px-6 py-5 sm:px-7 sm:py-6">
                        <p className="border-l-2 border-primary/80 pl-4 text-[15px] leading-[1.72] text-ink/78">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="relative overflow-hidden bg-dark py-24">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, #FF6B35, transparent 70%)" }} />
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">{dict.finalCtaLabel}</p>
          <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
            {dict.finalCtaTitle}
          </h3>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/45">
            {dict.finalCtaDesc}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="tel:+902164674752" className="group inline-flex items-center gap-3 rounded-xl bg-white/[0.05] px-6 py-3.5 text-sm font-medium text-white ring-1 ring-white/10 transition-all duration-300 hover:bg-primary/20 hover:ring-primary/30">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/[0.06] ring-1 ring-white/[0.1] transition-colors duration-300 group-hover:bg-primary/20 group-hover:ring-primary/30">
                <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
              </span>
              {dict.finalCtaPhone}
            </a>
            <Link href={`/${locale}/iletisim`} className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-[#e55a28] hover:shadow-xl hover:shadow-primary/30">
              {dict.finalCtaButton}
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
