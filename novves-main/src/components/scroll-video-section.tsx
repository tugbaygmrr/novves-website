"use client";

import { useRef, useEffect, useState, useCallback, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

type StartCard = {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  titleLine3: string;
  subtitle: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  stats?: { value: string; label: string }[];
};

type EndCard = {
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

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpRgb(from: readonly [number, number, number], to: readonly [number, number, number], t: number) {
  const u = Math.min(Math.max(t, 0), 1);
  return `rgb(${Math.round(lerp(from[0], to[0], u))},${Math.round(lerp(from[1], to[1], u))},${Math.round(lerp(from[2], to[2], u))})`;
}

/** Referans — zemin #4a4a4d → #EBE8E0; kutu zeminiyle aynı; vurgu #f45b2b → #FF7043 */
const SCROLL_SHELL_DARK: readonly [number, number, number] = [74, 74, 77]; // #4a4a4d
const SCROLL_SHELL_LIGHT: readonly [number, number, number] = [235, 232, 224]; // #EBE8E0
const SCROLL_PANEL_DARK: readonly [number, number, number] = [86, 86, 90];
const SCROLL_PANEL_LIGHT: readonly [number, number, number] = [238, 235, 228];
const SCROLL_INK: readonly [number, number, number] = [13, 17, 23]; // #0D1117
const SCROLL_ACCENT_DARK: readonly [number, number, number] = [244, 91, 43]; // #f45b2b
const SCROLL_ACCENT_LIGHT: readonly [number, number, number] = [255, 112, 67]; // #FF7043
const SCROLL_SUB_DARK: readonly [number, number, number] = [209, 209, 209]; // #d1d1d1
const SCROLL_SUB_LIGHT: readonly [number, number, number] = [58, 62, 74];
const SCROLL_DIVIDER_LIGHT = "rgb(209, 206, 199)"; // #D1CEC7

export function ScrollVideoSection({
  framesPath,
  totalFrames,
  id,
  startCard,
  endCard,
  locale,
  productHref,
  sideLabel,
}: {
  framesPath: string;
  totalFrames: number;
  id: string;
  startCard?: StartCard;
  endCard?: EndCard;
  locale?: string;
  productHref?: string;
  sideLabel?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyShellRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWashRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const startCardRef = useRef<HTMLDivElement>(null);
  const startCardSurfaceRef = useRef<HTMLDivElement>(null);
  const endCardSurfaceRef = useRef<HTMLDivElement>(null);
  const endCardSpecsRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const sideLabelRef = useRef<HTMLSpanElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const endCardRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const preloadImages = useCallback(() => {
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= totalFrames; i++) {
      const img = new window.Image();
      const num = String(i).padStart(4, "0");
      img.src = `${framesPath}/frame-${num}.jpg`;
      images.push(img);
    }
    imagesRef.current = images;
    return images;
  }, [framesPath, totalFrames]);

  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = imagesRef.current[index];
    if (!img || !img.complete) return;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const images = preloadImages();
    const first = images[0];
    if (first.complete) renderFrame(0);
    else first.onload = () => renderFrame(0);

    function onScroll() {
      rafRef.current = requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const viewH = window.innerHeight;
        const scrolled = -rect.top;
        const scrollRange = container.offsetHeight - viewH;
        const progress = Math.min(Math.max(scrolled / scrollRange, 0), 1);
        /** 0 = grimsi; 1 = açık. Başta daha uzun gri: geç başlar, geç biter. */
        const open = Math.min(Math.max((progress - 0.1) / 0.78, 0), 1);
        const shellBg = lerpRgb(SCROLL_SHELL_DARK, SCROLL_SHELL_LIGHT, open);
        const sr = Math.round(lerp(SCROLL_SHELL_DARK[0], SCROLL_SHELL_LIGHT[0], open));
        const sg = Math.round(lerp(SCROLL_SHELL_DARK[1], SCROLL_SHELL_LIGHT[1], open));
        const sb = Math.round(lerp(SCROLL_SHELL_DARK[2], SCROLL_SHELL_LIGHT[2], open));
        /** Kutu = bölüm zemini (sağdaki ana ton) ile aynı; ayrı koyu blok yok. */
        const boxFill = shellBg;
        const textBlend = Math.min(Math.max((open - 0.32) / 0.64, 0), 1);
        const titleCol = lerpRgb([255, 255, 255], SCROLL_INK, textBlend);
        const subCol = lerpRgb(SCROLL_SUB_DARK, SCROLL_SUB_LIGHT, textBlend);
        const accentCol = lerpRgb(SCROLL_ACCENT_DARK, SCROLL_ACCENT_LIGHT, textBlend);
        const specValCol = lerpRgb([255, 255, 255], SCROLL_INK, textBlend);
        const cornerTint = lerpRgb([230, 230, 230], [90, 88, 82], textBlend);
        const boxEdge = textBlend < 0.38 ? "rgba(255,255,255,0.11)" : SCROLL_DIVIDER_LIGHT;

        const pr = Math.round(lerp(SCROLL_PANEL_DARK[0], SCROLL_PANEL_LIGHT[0], open));
        const pg = Math.round(lerp(SCROLL_PANEL_DARK[1], SCROLL_PANEL_LIGHT[1], open));
        const pb = Math.round(lerp(SCROLL_PANEL_DARK[2], SCROLL_PANEL_LIGHT[2], open));

        if (stickyShellRef.current) {
          stickyShellRef.current.style.backgroundColor = shellBg;
        }
        if (canvasWashRef.current) {
          canvasWashRef.current.style.opacity = String((1 - open) * 0.42);
        }
        if (panelRef.current) {
          panelRef.current.style.background = [
            `radial-gradient(ellipse 95% 125% at 0% 48%, rgba(${pr},${pg},${pb},0.62) 0%, rgba(${pr},${pg},${pb},0.22) 42%, transparent 62%)`,
            `linear-gradient(90deg, rgba(${pr},${pg},${pb},0.78) 0%, rgba(${pr},${pg},${pb},0.28) 38%, rgba(${pr},${pg},${pb},0.08) 54%, rgba(${pr},${pg},${pb},0) 72%)`,
          ].join(",");
        }

        if (containerRef.current) {
          containerRef.current.style.backgroundColor = shellBg;
        }
        if (sideLabelRef.current) {
          sideLabelRef.current.style.color = lerpRgb([210, 208, 200], [118, 114, 108], open);
        }

        for (const el of [startCardSurfaceRef.current, endCardSurfaceRef.current]) {
          if (!el) continue;
          el.style.backgroundColor = boxFill;
          el.style.borderColor = boxEdge;
          el.style.color = cornerTint;
          el.style.setProperty("--c-title", titleCol);
          el.style.setProperty("--c-sub", subCol);
          el.style.setProperty("--c-accent", accentCol);
          el.style.setProperty("--c-spec-v", specValCol);
        }

        if (endCardSpecsRef.current) {
          const d = textBlend < 0.38 ? "rgba(255,255,255,0.14)" : SCROLL_DIVIDER_LIGHT;
          const grid = endCardSpecsRef.current;
          grid.style.borderTopColor = d;
          grid.style.borderBottomColor = d;
          const cells = grid.querySelectorAll(":scope > div");
          cells.forEach((node, i) => {
            const cell = node as HTMLElement;
            cell.style.borderRight = i < cells.length - 1 ? `1px solid ${d}` : "none";
          });
        }

        if (endCardSurfaceRef.current) {
          const ecs = endCardSurfaceRef.current;
          if (textBlend > 0.48) {
            ecs.style.setProperty("--cta-bg", `rgb(${SCROLL_INK[0]},${SCROLL_INK[1]},${SCROLL_INK[2]})`);
            ecs.style.setProperty("--cta-border", `rgb(${SCROLL_INK[0]},${SCROLL_INK[1]},${SCROLL_INK[2]})`);
          } else {
            ecs.style.setProperty("--cta-bg", "rgba(255,255,255,0.08)");
            ecs.style.setProperty("--cta-border", "rgba(255,255,255,0.22)");
          }
          ecs.style.setProperty("--cta-fg", "#ffffff");
        }

        const frameIndex = Math.round(progress * (totalFrames - 1));
        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          renderFrame(frameIndex);
        }

        if (startCardRef.current) {
          const fade = Math.max(1 - progress * 2.4, 0);
          startCardRef.current.style.opacity = String(fade);
          startCardRef.current.style.transform = `translateY(-${progress * 30}px)`;
        }

        if (panelRef.current) {
          // Left ink panel slides fully off-screen left by progress 0.85
          const slideOut = Math.min(Math.max((progress - 0.55) / 0.3, 0), 1);
          panelRef.current.style.transform = `translateX(-${slideOut * 105}%)`;
        }

        if (canvasRef.current) {
          // Fan: starts visible RIGHT (70%), ends visible LEFT (15%) — mirror of hero
          const shift = Math.min(Math.max((progress - 0.55) * 2.2, 0), 1);
          const xPct = 70 - shift * 55;
          canvasRef.current.style.objectPosition = `${xPct}% center`;
        }

        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleY(${progress})`;
          progressBarRef.current.style.backgroundColor = accentCol;
        }

        if (endCardRef.current) {
          const fade = Math.max((progress - 0.72) * 4, 0);
          const shift = Math.max(40 - fade * 40, 0);
          endCardRef.current.style.opacity = String(Math.min(fade, 1));
          endCardRef.current.style.transform = `translateX(${shift}px)`;
        }

        if (statsRef.current) {
          const fade = Math.max(1 - progress * 3.2, 0);
          statsRef.current.style.opacity = String(fade);
        }
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [mounted, preloadImages, renderFrame, totalFrames]);

  return (
    <>
      {/* ── Mobile version ── */}
      <MobileScrollSection
        framesPath={framesPath}
        totalFrames={totalFrames}
        startCard={startCard}
        endCard={endCard}
        locale={locale}
        productHref={productHref}
        sideLabel={sideLabel}
      />

      {/* ── Desktop version (lg+) ── */}
      <div
        ref={containerRef}
        id={id}
        className="relative hidden lg:block"
        style={{ height: "260vh", backgroundColor: "#4a4a4d" }}
      >
      <div
        ref={stickyShellRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ backgroundColor: "#4a4a4d" }}
      >
        {/* Canvas — fan visible on right side */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "70% center" }}
        />
        <div
          ref={canvasWashRef}
          className="pointer-events-none absolute inset-0 bg-[#1a1a1e]"
          style={{ opacity: 0.42 }}
          aria-hidden
        />

        {/* Sol okuma alanı — dikey çizgi yok; geniş radial + linear yumuşak geçiş */}
        <div
          ref={panelRef}
          className="pointer-events-none absolute inset-0 z-10 will-change-transform"
          style={{
            background: [
              "radial-gradient(ellipse 95% 125% at 0% 48%, rgba(86,86,90,0.62) 0%, rgba(86,86,90,0.22) 42%, transparent 62%)",
              "linear-gradient(90deg, rgba(86,86,90,0.78) 0%, rgba(86,86,90,0.28) 38%, rgba(86,86,90,0.08) 54%, rgba(86,86,90,0) 72%)",
            ].join(","),
          }}
        >
          <div className="absolute inset-0 blueprint-grid-light opacity-[0.06]" aria-hidden />
        </div>

        {/* Right-side progress rail */}
        {sideLabel && (
          <div className="absolute right-5 top-[18%] bottom-[18%] z-15 flex items-center pointer-events-none xl:right-8">
            <span
              ref={sideLabelRef}
              className="absolute -left-14 top-1/2 font-mono-eng text-[10px] uppercase tracking-[0.3em]"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg) translateX(50%)",
                color: "rgb(210, 208, 200)",
              }}
            >
              {sideLabel}
            </span>
            <div className="relative h-full" style={{ width: "1px" }}>
              <div className="h-full w-full bg-ink/20" />
              <div
                ref={progressBarRef}
                className="absolute inset-0 origin-top"
                style={{ transform: "scaleY(0)", backgroundColor: "rgb(244, 91, 43)" }}
              />
            </div>
          </div>
        )}

        {/* START CARD — arka plan ile aynı koyu ton, dar kutu; köşe işaretleri */}
        {startCard && (
          <div
            ref={startCardRef}
            className="absolute top-[130px] bottom-[40px] left-0 z-20 flex w-full max-w-[min(580px,min(54vw,calc(100vw-2.5rem)))] items-center pl-5 pr-4 sm:pl-8 sm:pr-5 xl:pl-14 xl:pr-8"
          >
            <div
              ref={startCardSurfaceRef}
              className="relative w-full overflow-hidden rounded-3xl border px-8 py-7 shadow-[0_18px_48px_-28px_rgba(0,0,0,0.55)] backdrop-blur-[5px] sm:px-9 sm:py-8"
              style={
                {
                  backgroundColor: "rgb(74, 74, 77)",
                  borderColor: "rgba(255,255,255,0.11)",
                  color: "rgb(230, 230, 230)",
                  ["--c-title" as string]: "rgb(255, 255, 255)",
                  ["--c-sub" as string]: "rgb(209, 209, 209)",
                  ["--c-accent" as string]: "rgb(244, 91, 43)",
                  ["--c-spec-v" as string]: "rgb(255, 255, 255)",
                } as CSSProperties
              }
            >
              <div className="pointer-events-none absolute inset-0 opacity-[0.12] blueprint-grid-light" aria-hidden />

              <p className="relative font-mono-eng text-[11px] uppercase tracking-[0.3em]" style={{ color: "var(--c-accent)" }}>
                ● {startCard.badge}
              </p>

              <h2 className="relative mt-7 text-balance">
                <span
                  className="block font-semibold"
                  style={{
                    fontSize: "clamp(1.85rem, 2.2vw, 2.45rem)",
                    lineHeight: 1.08,
                    letterSpacing: "-0.02em",
                    color: "var(--c-title)",
                  }}
                >
                  {startCard.titleLine1}
                </span>
                <span
                  className="mt-1 block hyphens-none whitespace-nowrap font-semibold"
                  style={{
                    fontSize: "clamp(1.85rem, 2.2vw, 2.45rem)",
                    lineHeight: 1.08,
                    letterSpacing: "-0.02em",
                    color: "var(--c-title)",
                    opacity: 0.92,
                  }}
                >
                  {startCard.titleLine2}
                </span>
                <span
                  className="mt-1 block font-semibold"
                  style={{
                    fontSize: "clamp(1.85rem, 2.2vw, 2.45rem)",
                    lineHeight: 1.08,
                    letterSpacing: "-0.02em",
                    color: "var(--c-title)",
                  }}
                >
                  {startCard.titleLine3}
                </span>
              </h2>

              <p className="relative mt-7 max-w-[42ch] text-[14.5px] leading-[1.72]" style={{ color: "var(--c-sub)" }}>
                {startCard.subtitle}
              </p>

              {locale && (startCard.ctaPrimary || startCard.ctaSecondary) && (
                <div className="relative mt-8 flex w-full flex-nowrap items-center gap-4">
                  {startCard.ctaPrimary && (
                    <Link
                      href={`/${locale}/iletisim`}
                      className="btn-3d btn-3d-dark group inline-flex items-center gap-2.5 whitespace-nowrap rounded-2xl border border-white/20 bg-[#1e1e22]/90 px-5 py-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-[1px] hover:border-primary hover:bg-primary hover:shadow-[0_10px_24px_-10px_rgba(255,107,53,0.55)]"
                    >
                      {startCard.ctaPrimary}
                      <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  )}

                  {startCard.ctaSecondary && (
                    <Link
                      href={`/${locale}/urunler`}
                      className="group ml-auto inline-flex items-center gap-2.5 whitespace-nowrap border-b border-white/45 pb-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white/88 transition-colors duration-300 hover:border-primary hover:text-primary"
                    >
                      {startCard.ctaSecondary}
                      <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {startCard?.stats && startCard.stats.length > 0 && (
          <div ref={statsRef} className="absolute bottom-0 left-0 right-0 z-25 bg-sand-100 border-t border-ink/15">
            <div className="grid grid-cols-4 divide-x divide-ink/10">
              {startCard.stats.map((s) => (
                <div key={s.label} className="px-6 py-5 xl:px-10">
                  <p className="font-bold text-[2.2rem] leading-none text-ink">{s.value}</p>
                  <p className="mt-2 font-mono-eng text-[9.5px] uppercase tracking-[0.22em] text-ink/55">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* END CARD — right, sand on ink, editorial */}
        {endCard && (
          <div
            ref={endCardRef}
            className="pointer-events-none absolute inset-y-0 right-0 z-20 flex items-center pt-[130px]"
            style={{ opacity: 0 }}
          >
            <div className="pointer-events-auto mr-6 w-[min(580px,42vw)] xl:mr-14">
              <div
                ref={endCardSurfaceRef}
                className="relative overflow-hidden rounded-3xl border p-9 shadow-[0_18px_48px_-28px_rgba(0,0,0,0.55)] backdrop-blur-[5px]"
                style={
                  {
                    backgroundColor: "rgb(74, 74, 77)",
                    borderColor: "rgba(255,255,255,0.11)",
                    color: "rgb(230, 230, 230)",
                    ["--c-title" as string]: "rgb(255, 255, 255)",
                    ["--c-sub" as string]: "rgb(209, 209, 209)",
                    ["--c-accent" as string]: "rgb(244, 91, 43)",
                    ["--c-spec-v" as string]: "rgb(255, 255, 255)",
                    ["--cta-bg" as string]: "rgba(255,255,255,0.08)",
                    ["--cta-border" as string]: "rgba(255,255,255,0.22)",
                    ["--cta-fg" as string]: "#ffffff",
                  } as CSSProperties
                }
              >
                <div className="pointer-events-none absolute inset-0 opacity-[0.12] blueprint-grid-light" aria-hidden />

                <div className="relative">
                  <p className="font-mono-eng text-[10px] uppercase tracking-[0.24em]" style={{ color: "var(--c-accent)" }}>
                    ◆ {endCard.series}
                  </p>

                  <h3
                    className="mt-6 font-bold"
                    style={{
                      fontSize: "clamp(2.4rem, 3.2vw, 3.6rem)",
                      lineHeight: 0.95,
                      letterSpacing: "-0.02em",
                      color: "var(--c-title)",
                    }}
                  >
                    {endCard.title}
                  </h3>

                  <p className="mt-5 max-w-[42ch] text-[13.5px] leading-[1.7]" style={{ color: "var(--c-sub)" }}>
                    {endCard.desc}
                  </p>

                  <div ref={endCardSpecsRef} className="mt-7 grid grid-cols-3 border-y border-y-[1px]">
                    {[
                      { v: endCard.spec1Value, l: endCard.spec1Label },
                      { v: endCard.spec2Value, l: endCard.spec2Label },
                      { v: endCard.spec3Value, l: endCard.spec3Label },
                    ].map((s) => (
                      <div key={s.l} className="py-4 pl-4 first:pl-0">
                        <p className="text-[1.8rem] font-bold leading-none" style={{ color: "var(--c-spec-v)" }}>
                          {s.v}
                        </p>
                        <p
                          className="mt-1.5 font-mono-eng text-[9px] uppercase tracking-[0.2em]"
                          style={{ color: "var(--c-accent)" }}
                        >
                          {s.l}
                        </p>
                      </div>
                    ))}
                  </div>

                  {locale && productHref && (
                    <Link
                      href={`/${locale}${productHref}`}
                      className="group mt-7 inline-flex items-center gap-3 rounded-2xl border border-[color:var(--cta-border)] bg-[var(--cta-bg)] px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--cta-fg)] transition-colors duration-300 hover:border-primary hover:!bg-primary"
                    >
                      {endCard.cta}
                      <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   Mobile — autoplay animation + stacked content
   ═══════════════════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════════════════
   Mobile — Editorial product card, no animation
   ═══════════════════════════════════════════════════════════ */

function MobileScrollSection({
  framesPath,
  totalFrames,
  startCard,
  endCard,
  locale,
  productHref,
  sideLabel,
}: {
  framesPath: string;
  totalFrames: number;
  startCard?: StartCard;
  endCard?: EndCard;
  locale?: string;
  productHref?: string;
  sideLabel?: string;
}) {
  // Use the last available frame as static hero image
  const finalFrameSrc = `${framesPath}/frame-${String(totalFrames).padStart(4, "0")}.jpg`;

  return (
    <section className="relative bg-sand-200 lg:hidden">
      {/* Start copy */}
      {startCard && (
        <div className="px-5 pb-9 pt-9">
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-primary" />
            <span className="font-mono-eng text-[10px] uppercase tracking-[0.28em] text-primary">
              {startCard.badge}
            </span>
          </div>

          <h2 className="mt-6">
            <span className="block text-[17px] font-medium text-ink/55">{startCard.titleLine1}</span>
            <span
              className="mt-2 block font-bold text-ink break-words"
              style={{ fontSize: "clamp(2.2rem, 10vw, 3.8rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
            >
              {startCard.titleLine2}
            </span>
            <span className="mt-2 block text-[19px] font-normal text-ink/75">{startCard.titleLine3}</span>
          </h2>

          <p className="mt-6 text-[14.5px] leading-[1.65] text-ink/70">{startCard.subtitle}</p>
        </div>
      )}

      {/* Featured product card */}
      {endCard && (
        <div className="px-5 pb-2">
          {locale && productHref ? (
            <Link href={`/${locale}${productHref}`} className="group block">
              <ProductCard endCard={endCard} imageSrc={finalFrameSrc} />
            </Link>
          ) : (
            <div className="block">
              <ProductCard endCard={endCard} imageSrc={finalFrameSrc} />
            </div>
          )}
        </div>
      )}

      {/* Inline CTA */}
      {endCard && locale && productHref && (
        <div className="mt-6 px-5 pb-12">
          <Link
            href={`/${locale}${productHref}`}
            className="group inline-flex w-full items-center justify-between rounded-2xl bg-ink px-6 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-sand-100 transition-all duration-300 hover:bg-primary"
          >
            <span>{endCard.cta}</span>
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      )}
    </section>
  );
}

function ProductCard({ endCard, imageSrc }: { endCard: EndCard; imageSrc: string }) {
  return (
    <article className="relative overflow-hidden rounded-3xl border border-ink/12 bg-white">
      <div className="relative aspect-[5/4] w-full bg-sand-200">
        {/* Series badge */}
        <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 bg-ink/85 px-2.5 py-1 font-mono-eng text-[9px] uppercase tracking-[0.22em] text-sand-100 backdrop-blur-sm">
          <span className="text-primary">◆</span> {endCard.series}
        </div>
        <div className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 border border-ink/15 bg-white/90 px-2.5 py-1 font-mono-eng text-[9px] uppercase tracking-[0.22em] text-ink/65 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {endCard.spec3Value}
        </div>

        <Image
          src={imageSrc}
          alt={endCard.title}
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          style={{ objectPosition: "center center", filter: "contrast(1.05) saturate(1.08)" }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white/95 via-white/60 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="font-mono-eng text-[10px] uppercase tracking-[0.22em] text-ink/55">
            Featured Product
          </p>
          <h3 className="mt-1 font-bold text-ink" style={{ fontSize: "1.5rem", lineHeight: 1.1, letterSpacing: "-0.015em" }}>
            {endCard.title}
          </h3>
        </div>
      </div>

      {/* Description */}
      <div className="border-t border-ink/10 px-5 py-4">
        <p className="text-[13px] leading-[1.65] text-ink/70">{endCard.desc}</p>
      </div>

      {/* Specs */}
      <div className="grid grid-cols-3 divide-x divide-ink/10 border-t border-ink/10">
        {[
          { v: endCard.spec1Value, l: endCard.spec1Label },
          { v: endCard.spec2Value, l: endCard.spec2Label },
          { v: endCard.spec3Value, l: endCard.spec3Label },
        ].map((s) => (
          <div key={s.l} className="px-3 py-3.5 text-center">
            <p className="font-bold text-[1.05rem] leading-none text-ink">{s.v}</p>
            <p className="mt-1.5 font-mono-eng text-[8.5px] uppercase tracking-[0.18em] text-ink/55 truncate">{s.l}</p>
          </div>
        ))}
      </div>

      {/* CTA bar */}
      <div className="flex items-center justify-between border-t border-ink/10 bg-sand-100 px-4 py-3.5">
        <span className="font-mono-eng text-[10px] uppercase tracking-[0.22em] text-ink/65">
          {endCard.cta}
        </span>
        <svg className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </article>
  );
}