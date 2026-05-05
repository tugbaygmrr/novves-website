"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export type AirMovementFamily = {
  name: string;
  type: string;
  subModels?: string[];
  comingSoon?: boolean;
};

export function AirMovementFamiliesPanel({
  products,
  locale,
  productImages,
  productHrefs,
  eyebrow,
  title,
  modelsLabel,
  comingSoonLabel,
  familyBlurbs,
}: {
  products: AirMovementFamily[];
  locale: string;
  productImages: Record<string, string>;
  productHrefs: Record<string, string>;
  eyebrow: string;
  title: string;
  modelsLabel: string;
  comingSoonLabel: string;
  /** Ürün detay sayfası (products.json) intro / model açıklaması — aile adı → metin */
  familyBlurbs?: Record<string, string>;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [leftColHeight, setLeftColHeight] = useState<number | null>(null);

  useEffect(() => {
    setSelectedIndex((i) => {
      if (products.length === 0) return 0;
      return Math.min(i, products.length - 1);
    });
  }, [products.length]);

  if (products.length === 0) return null;

  const product = products[selectedIndex];
  if (!product) return null;

  const img = productImages[product.name] ?? "";
  const hrefBase = `/${locale}/urunler`;
  const slug = productHrefs[product.name] ?? "";
  const panelBlurb = familyBlurbs?.[product.name]?.trim();

  useEffect(() => {
    const rightPanel = document.getElementById(`family-panel-${selectedIndex}`);
    if (!rightPanel) return;

    const updateHeight = () => {
      if (window.innerWidth < 1024) {
        setLeftColHeight(null);
        return;
      }
      setLeftColHeight(Math.ceil(rightPanel.getBoundingClientRect().height));
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(rightPanel);
    window.addEventListener("resize", updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, [selectedIndex, panelBlurb, product.subModels]);

  return (
    <div className="overflow-hidden rounded-3xl border border-ink/[0.07] bg-[#f0efe9]/[0.97] shadow-[0_32px_90px_-52px_rgba(15,23,42,0.38)] ring-1 ring-ink/[0.03] backdrop-blur-sm">
      <div className="flex flex-col lg:grid lg:grid-cols-[minmax(272px,34%)_1fr] lg:items-start">
        <div
          className="flex min-h-0 flex-col border-b border-ink/[0.06] bg-gradient-to-b from-[#f5f4f0]/95 to-[#e9e6df]/90 lg:border-b-0 lg:border-e lg:border-ink/[0.06]"
          style={leftColHeight ? { height: `${leftColHeight}px` } : undefined}
        >
          <div
            className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto overscroll-contain p-3 sm:p-4 lg:pr-1"
            role="tablist"
            aria-label={title}
          >
            {products.map((p, i) => {
              const selected = i === selectedIndex;
              return (
                <button
                  key={p.name}
                  type="button"
                  role="tab"
                  id={`family-tab-${i}`}
                  aria-selected={selected}
                  aria-controls={`family-panel-${i}`}
                  onClick={() => setSelectedIndex(i)}
                  className={`flex w-full items-start gap-3 rounded-2xl px-3 py-3.5 text-start transition-all duration-200 sm:gap-3.5 sm:px-4 sm:py-4 ${
                    p.comingSoon ? "opacity-80" : ""
                  } ${selected ? "bg-white shadow-[0_10px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-black/[0.05]" : "hover:bg-white/55"}`}
                >
                  <span
                    className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[12px] font-bold tabular-nums transition-all duration-200 ${
                      selected ? "bg-primary text-white shadow-md shadow-primary/30" : "bg-[#1a2842]/88 text-white"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-bold leading-snug tracking-tight text-[#1a2842] sm:text-base">
                      {p.name}
                      {p.comingSoon ? (
                        <span className="ms-2 rounded-md bg-ink/[0.06] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-ink/45">
                          {comingSoonLabel}
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-1 line-clamp-2 text-[12px] leading-snug text-secondary/60 sm:text-[13px]">{p.type}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <div className="shrink-0 border-t border-ink/[0.08] bg-white px-4 py-6 sm:px-5 sm:py-7">
            <div className="flex justify-center">
              <Image
                src="/images/novves-logo.svg"
                alt="Novves"
                width={132}
                height={36}
                className="h-7 w-auto opacity-[0.42] sm:h-8 sm:opacity-[0.48]"
              />
            </div>
          </div>
        </div>

        <div
          id={`family-panel-${selectedIndex}`}
          role="tabpanel"
          aria-labelledby={`family-tab-${selectedIndex}`}
          className="flex min-h-0 min-w-0 flex-col bg-gradient-to-b from-[#f2f1ec] via-[#f4f3ef] to-[#eeede7] lg:self-start"
        >
          <div className="shrink-0 border-b border-white/60 bg-white/[0.72] px-5 py-6 backdrop-blur-md sm:px-8 sm:py-7">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/90">{eyebrow}</p>
            <p className="mt-3 text-2xl font-bold tracking-[-0.02em] text-[#1a2842] sm:text-3xl">{product.name}</p>
            <p className="mt-2 text-[15px] font-medium leading-relaxed text-primary/95 sm:text-base">{product.type}</p>
          </div>

          <div className="flex min-h-0 flex-col p-5 sm:p-6 lg:p-8">
            {product.comingSoon ? (
              <div className="shrink-0 overflow-hidden rounded-[1.35rem] border border-dashed border-ink/15 bg-white/70 p-6 ring-1 ring-ink/[0.04]">
                <div className="flex min-h-[240px] items-center justify-center rounded-2xl bg-gradient-to-b from-[#faf9f6] to-[#eceae4]">
                  <span className="rounded-full bg-ink/[0.06] px-4 py-2 text-sm font-medium text-secondary/50">{comingSoonLabel}</span>
                </div>
              </div>
            ) : (
              <div className="flex min-h-0 flex-col gap-4">
                <Link
                  href={`${hrefBase}/${slug}`}
                  className="group relative isolate h-[13.5rem] w-full shrink-0 overflow-hidden rounded-[1.35rem] border border-white/80 bg-gradient-to-b from-[#f8f7f3] to-[#e5e3dc] shadow-[0_18px_50px_-34px_rgba(15,23,42,0.18)] ring-1 ring-ink/[0.04] transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_28px_60px_-32px_rgba(15,23,42,0.26)] sm:h-60 lg:h-[14.5rem] lg:min-h-0 lg:flex-none"
                >
                  <div className="absolute inset-x-0 top-0 z-[1] h-1 bg-gradient-to-r from-[#1d2f4d]/90 via-primary/75 to-[#8fa4bc]/85" />
                  <Image
                    src={img}
                    alt={product.name}
                    fill
                    className="object-contain p-4 mix-blend-multiply transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width:1024px) 100vw, 66vw"
                  />
                  <div className="absolute right-4 top-4 rounded-full border border-white/20 bg-[#1b2c48]/85 px-3 py-1.5 text-[10px] font-bold text-white shadow-lg backdrop-blur-md">
                    {(product.subModels || []).length} {modelsLabel}
                  </div>
                </Link>

                <div className="shrink-0 overflow-hidden rounded-[1.35rem] border border-white/80 bg-white/72 p-6 shadow-[0_18px_44px_-34px_rgba(15,23,42,0.2)] ring-1 ring-ink/[0.04] backdrop-blur-sm sm:p-7">
                  {panelBlurb ? (
                    <p className="text-pretty text-[13px] leading-[1.65] text-secondary/68 sm:text-[14px]">{panelBlurb}</p>
                  ) : null}
                  <div className={`flex items-start justify-between gap-4 ${panelBlurb ? "mt-5 border-t border-ink/[0.06] pt-5" : ""}`}>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/40">{modelsLabel}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {(product.subModels || []).slice(0, 8).map((model) => (
                          <span
                            key={model}
                            className="rounded-full border border-ink/[0.08] bg-white/70 px-2.5 py-1 text-[11px] font-medium text-secondary/65 shadow-sm"
                          >
                            {model}
                          </span>
                        ))}
                        {(product.subModels || []).length > 8 && (
                          <span className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary">
                            +{(product.subModels || []).length - 8}
                          </span>
                        )}
                      </div>
                    </div>
                    <Link
                      href={`${hrefBase}/${slug}`}
                      className="group/cta flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/[0.08] text-primary transition-all duration-300 hover:scale-105 hover:border-primary/40 hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/25"
                      aria-label={product.name}
                    >
                      <svg className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
