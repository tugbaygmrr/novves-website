"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const TOTAL_FRAMES = 211;
const START_VISIBLE_FRAME = 36;

function getFrameSrc(index: number): string {
  const num = String(Math.min(Math.max(index, 1), TOTAL_FRAMES)).padStart(4, "0");
  return `/animation/frames/frame-${num}.jpg`;
}

type HeroDict = {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  titleLine3: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  heroLabel?: string;
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

/* ═══════════════════════════════════════════════════════════
   Mobile Hero — editorial, serif + mono, sand palette
   ═══════════════════════════════════════════════════════════ */

function MobileHero({ dict, locale }: { dict: HeroDict; locale: string }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [mobileFrame, setMobileFrame] = useState(START_VISIBLE_FRAME);
  const [mobileProgress, setMobileProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || window.innerWidth >= 1024) return;

    const startFrame = START_VISIBLE_FRAME;
    const endFrame = TOTAL_FRAMES - 1;
    let rafId = 0;

    const updateFrame = () => {
      const stage = stageRef.current;
      if (!stage) return;

      const viewport = window.innerHeight;
      const rect = stage.getBoundingClientRect();
      const stageScroll = viewport * 0.86 - rect.top;
      const scrollRange = Math.max(stage.offsetHeight - viewport * 0.24, 1);
      const progress = Math.min(Math.max(stageScroll / scrollRange, 0), 1);

      const frame = Math.round(startFrame + progress * (endFrame - startFrame));
      setMobileFrame(frame);
      setMobileProgress(progress);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateFrame);
    };

    updateFrame();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const mobileFrameSrc = getFrameSrc(mobileFrame);
  const transition = Math.min(Math.max((mobileProgress - 0.08) / 0.76, 0), 1);
  const fanX = 24 + transition * 36;
  const fanScale = 1.2 - transition * 0.18;
  const overlayOpacity = Math.max(0.62 - transition * 0.62, 0);
  const panelOpacity = Math.max(1 - transition * 1.2, 0);
  const panelLift = transition * 110;
  const endCardOpacity = Math.min(Math.max((transition - 0.66) / 0.24, 0), 1);
  const bgR = Math.round(58 + transition * 171);
  const bgG = Math.round(62 + transition * 166);
  const bgB = Math.round(69 + transition * 153);

  return (
    <section ref={sectionRef} className="relative bg-sand-200 pt-[80px] lg:hidden">
      <div ref={stageRef} className="relative h-[245svh]">
        <section className="sticky top-[92px]">
          <div className="relative min-h-[min(76svh,560px)] overflow-hidden" style={{ backgroundColor: `rgb(${bgR}, ${bgG}, ${bgB})` }}>
            <Image
              src={mobileFrameSrc}
              alt={dict.endCard.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{
                objectPosition: `${fanX}% center`,
                transform: `scale(${fanScale})`,
                filter: "contrast(1.1) saturate(1.04) brightness(1.04)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_48%,rgba(212,218,228,0.18)_0%,rgba(58,63,74,0.30)_40%,rgba(31,35,43,0.68)_100%)]"
              style={{ opacity: overlayOpacity }}
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(36,39,46,0.58)_0%,rgba(36,39,46,0.22)_32%,rgba(36,39,46,0.12)_52%,rgba(36,39,46,0.40)_78%,rgba(36,39,46,0.66)_100%)]"
              style={{ opacity: overlayOpacity }}
            />

            <div
              className="absolute inset-x-5 bottom-5 overflow-hidden rounded-2xl border border-white/14 bg-[#343840]/84 p-5 shadow-[0_16px_42px_-26px_rgba(0,0,0,0.55)] backdrop-blur-[2px]"
              style={{ opacity: panelOpacity, transform: `translateY(-${panelLift}px)` }}
            >
              <p className="font-mono-eng text-[9.5px] uppercase tracking-[0.24em] text-primary/90">• {dict.badge}</p>
              <h1 className="mt-3 text-white">
                <span className="block text-[2rem] font-semibold leading-[1.02] tracking-[-0.02em]">{dict.titleLine1}</span>
                <span className="mt-0.5 block text-[2rem] font-semibold leading-[1.02] tracking-[-0.02em]">{dict.titleLine2}</span>
                <span className="mt-0.5 block text-[2rem] font-semibold leading-[1.02] tracking-[-0.02em]">{dict.titleLine3}</span>
              </h1>
              <p className="mt-3 text-[14px] leading-[1.58] text-white/84">{dict.subtitle}</p>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <Link
                  href={`/${locale}/iletisim`}
                  className="btn-3d btn-3d-glass inline-flex items-center gap-2.5 rounded-xl border border-white/18 bg-[#1f2128]/94 px-4 py-2.5 font-mono-eng text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:border-primary hover:bg-primary"
                >
                  {dict.ctaPrimary}
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href={`/${locale}/urunler/hava-hareketi`}
                  className="inline-flex items-center gap-2 border-b border-white/45 pb-1 font-mono-eng text-[10px] uppercase tracking-[0.2em] text-white/88 transition-colors hover:border-primary hover:text-primary"
                >
                  {dict.ctaSecondary}
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>

            <div
              className="pointer-events-none absolute inset-x-5 bottom-3 rounded-2xl border border-ink/10 bg-white/86 p-3.5 shadow-[0_14px_34px_-22px_rgba(20,24,32,0.35)] backdrop-blur-md"
              style={{ opacity: endCardOpacity }}
            >
              <div className="flex items-center justify-between font-mono-eng text-[8.5px] uppercase tracking-[0.2em] text-ink/62">
                <span>◆ {dict.endCard.series}</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {dict.endCard.spec3Value}
                </span>
              </div>
              <h3 className="mt-1.5 text-[1.82rem] font-bold leading-[1.04] tracking-[-0.02em] text-ink">{dict.endCard.title}</h3>
              <p className="mt-2 max-w-[36ch] text-[12px] leading-[1.5] text-ink/68">{dict.endCard.desc}</p>
              <div className="mt-3 grid grid-cols-3 divide-x divide-ink/10 border-t border-ink/10 pt-2.5">
                {[
                  { v: dict.endCard.spec1Value, l: dict.endCard.spec1Label },
                  { v: dict.endCard.spec2Value, l: dict.endCard.spec2Label },
                  { v: dict.endCard.spec3Value, l: dict.endCard.spec3Label },
                ].map((s) => (
                  <div key={s.l} className="px-2 text-center first:pl-0 last:pr-0">
                    <p className="font-bold text-[0.98rem] leading-none text-ink">{s.v}</p>
                    <p className="mt-1 font-mono-eng text-[7px] uppercase tracking-[0.14em] text-ink/52 truncate">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Stats grid */}
      <div className="mt-10 border-y border-ink/12 bg-sand-100">
        <div className="grid grid-cols-2 divide-x divide-ink/10">
          {dict.stats.map((s, i) => (
            <div key={s.label} className={`px-5 py-6 ${i >= 2 ? "border-t border-ink/10" : ""}`}>
              <p className="font-bold text-[2rem] leading-none text-ink">{s.value}</p>
              <p className="mt-2 font-mono-eng text-[9px] uppercase tracking-[0.22em] text-ink/55">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Desktop Hero — sticky scroll-driven fan assembly
   ═══════════════════════════════════════════════════════════ */

export function FanAssemblyAnimation({ dict, locale }: { dict: HeroDict; locale: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const stickyShellRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const hazeRef = useRef<HTMLDivElement>(null);
  const toneBlendRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const airRingOuterRef = useRef<HTMLDivElement>(null);
  const airRingInnerRef = useRef<HTMLDivElement>(null);
  const airFlowRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const endCardRef = useRef<HTMLDivElement>(null);
  const paperTextureRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);

  const preloadImages = useCallback(() => {
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = getFrameSrc(i);
      images.push(img);
    }
    imagesRef.current = images;
    return images;
  }, []);

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
    if (typeof window === "undefined") return;

    let removeDesktopListeners: (() => void) | undefined;

    const startDesktopScroll = () => {
      removeDesktopListeners?.();
      removeDesktopListeners = undefined;
      if (window.innerWidth < 1024) return;

      const images = preloadImages();
      const first = images[START_VISIBLE_FRAME];
      if (first?.complete) renderFrame(START_VISIBLE_FRAME);
      else if (first) first.onload = () => renderFrame(START_VISIBLE_FRAME);

      function onScroll() {
        rafRef.current = requestAnimationFrame(() => {
        const sectionEl = document.getElementById("hero-sticky-section");
        if (!sectionEl) return;
        const rect = sectionEl.getBoundingClientRect();
        const viewH = window.innerHeight;
        const scrolled = -rect.top;
        const scrollRange = sectionEl.offsetHeight - viewH;
        const progress = Math.min(Math.max(scrolled / scrollRange, 0), 1);

        // Fan starts rotating inside the navy phase from the beginning of scroll.
        const spinStart = 0.02;
        const spinEnd = 0.9;
        const spinProgress = Math.min(Math.max((progress - spinStart) / (spinEnd - spinStart), 0), 1);
        const frameIndex = Math.round(
          START_VISIBLE_FRAME + spinProgress * (TOTAL_FRAMES - 1 - START_VISIBLE_FRAME)
        );
        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          renderFrame(frameIndex);
        }

        // Charcoal "light black" -> warm light (matches sand section below)
        const lightRaw = Math.min(Math.max((progress - 0.2) / 0.7, 0), 1);
        const lightProgress = lightRaw * lightRaw * lightRaw * (lightRaw * (lightRaw * 6 - 15) + 10); // smootherstep
        // Full scroll: warm off-white (~#EDEAE4), paper texture fades in with lightProgress
        const bgR = 42 + lightProgress * 196; // 42 -> 238
        const bgG = 42 + lightProgress * 194; // 42 -> 236
        const bgB = 46 + lightProgress * 182; // 46 -> 228

        if (stickyShellRef.current) {
          stickyShellRef.current.style.backgroundColor = `rgb(${bgR}, ${bgG}, ${bgB})`;
        }
        if (paperTextureRef.current) {
          paperTextureRef.current.style.opacity = String(Math.min(lightProgress * 0.24, 0.26));
        }
        if (canvasRef.current) {
          const brightness = 0.86 + lightProgress * 0.14;
          const saturate = 1 + lightProgress * 0.04;
          canvasRef.current.style.opacity = String(0.88 + lightProgress * 0.12);
          canvasRef.current.style.filter = `brightness(${brightness}) saturate(${saturate}) contrast(1.01)`;
        }
        if (hazeRef.current) {
          // "Dirty air" disperses as fan rotation/scroll increases.
          const disperse = Math.min(Math.max((progress - 0.02) / 0.72, 0), 1);
          const hazeOpacity = 0.2 * (1 - disperse);
          const hazeBlur = 2.4 * (1 - disperse);
          const hazeShift = 10 * disperse;
          hazeRef.current.style.opacity = String(hazeOpacity);
          hazeRef.current.style.filter = `blur(${hazeBlur}px)`;
          hazeRef.current.style.transform = `translateX(${hazeShift}px)`;
        }
        if (airRingOuterRef.current && airRingInnerRef.current && airFlowRef.current) {
          const flowStrength = Math.min(Math.max((progress - 0.04) / 0.7, 0), 1);
          const outerOpacity = 0.08 + flowStrength * 0.14;
          const innerOpacity = 0.07 + flowStrength * 0.12;
          const flowOpacity = 0.05 + flowStrength * 0.1;
          const outerScale = 0.95 + flowStrength * 0.12;
          const innerScale = 0.92 + flowStrength * 0.1;
          const outerRot = spinProgress * 520;
          const innerRot = -spinProgress * 700;

          airRingOuterRef.current.style.opacity = String(outerOpacity);
          airRingInnerRef.current.style.opacity = String(innerOpacity);
          airFlowRef.current.style.opacity = String(flowOpacity);

          airRingOuterRef.current.style.transform = `translate(-50%, -50%) rotate(${outerRot}deg) scale(${outerScale})`;
          airRingInnerRef.current.style.transform = `translate(-50%, -50%) rotate(${innerRot}deg) scale(${innerScale})`;
          airFlowRef.current.style.transform = `translateX(${flowStrength * 28}px)`;
        }

        if (overlayRef.current) {
          const fade = Math.max(1 - progress * 2.2, 0);
          overlayRef.current.style.opacity = String(fade);
          overlayRef.current.style.transform = `translateY(-${progress * 40}px)`;
        }
        if (panelRef.current) {
          // Right text panel slides fully off-screen by progress 0.85
          const slideOut = Math.min(Math.max((progress - 0.55) / 0.3, 0), 1);
          const panelFade = Math.min(Math.max((progress - 0.34) / 0.38, 0), 1);
          panelRef.current.style.transform = `translateX(${slideOut * 105}%)`;
          panelRef.current.style.opacity = String(1 - panelFade * 0.85);
          if (toneBlendRef.current) {
            // Remove the vertical band as soon as text panel starts leaving.
            toneBlendRef.current.style.opacity = String(1 - Math.max(slideOut, panelFade));
          }
        }
        if (statsRef.current) {
          const fade = Math.max(1 - progress * 3.5, 0);
          statsRef.current.style.opacity = String(fade);
        }
        if (scrollHintRef.current) {
          const fade = Math.max(1 - progress * 5, 0);
          scrollHintRef.current.style.opacity = String(fade);
        }
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleY(${progress})`;
          const pulse = 0.25 + Math.sin(progress * Math.PI * 8) * 0.12;
          progressBarRef.current.style.opacity = String(0.74 + pulse);
          progressBarRef.current.style.boxShadow = `0 0 12px rgba(255,107,53,${0.12 + pulse * 0.22})`;
        }
        if (sweepRef.current) {
          const sweep = Math.min(Math.max((progress - 0.08) / 0.78, 0), 1);
          sweepRef.current.style.opacity = String(0.05 + sweep * 0.13);
          sweepRef.current.style.transform = `translateX(${(sweep - 0.2) * 36}%)`;
        }
        if (endCardRef.current) {
          const endFade = Math.max((progress - 0.72) * 4, 0);
          endCardRef.current.style.opacity = String(Math.min(endFade, 1));
          endCardRef.current.style.transform = `translateX(${Math.max(30 - endFade * 30, 0)}px)`;
        }
        if (canvasRef.current) {
          // Fan: keep center-right visible while right panel exits.
          const shift = Math.min(Math.max((progress - 0.55) * 2.2, 0), 1);
          const xPct = 58 + shift * 14; // 58 → 72
          canvasRef.current.style.objectPosition = `${xPct}% center`;
        }
        });
      }

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      onScroll();

      removeDesktopListeners = () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        cancelAnimationFrame(rafRef.current);
      };
    };

    const onViewportChange = () => {
      startDesktopScroll();
    };

    startDesktopScroll();
    window.addEventListener("resize", onViewportChange, { passive: true });

    return () => {
      window.removeEventListener("resize", onViewportChange);
      removeDesktopListeners?.();
    };
  }, [preloadImages, renderFrame]);

  return (
    <>
      <MobileHero dict={dict} locale={locale} />

      {/* Desktop sticky container wraps around the canvas; outer spacer elsewhere governs scroll range */}
      <div id="hero-sticky-section" className="hidden lg:block" style={{ height: "200vh" }}>
        <div ref={stickyShellRef} className="sticky top-0 h-screen w-full overflow-hidden bg-[#2a2a2e] transition-colors duration-500">
          {/* ── TWO-COLUMN GRID: LEFT = CONTENT, RIGHT = FAN ── */}

          {/* Fan canvas — full width; objectPosition animates left→right on scroll */}
          <div ref={canvasWrapRef} className="absolute inset-0 overflow-hidden">
            <canvas
              ref={canvasRef}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: "58% center", opacity: 0.88 }}
            />
            <div
              ref={hazeRef}
              className="pointer-events-none absolute inset-0"
              style={{
                opacity: 0.2,
                background:
                  "radial-gradient(circle at 28% 54%, rgba(18,18,20,0.26) 0%, rgba(18,18,20,0.11) 34%, rgba(18,18,20,0.00) 68%)",
              }}
            />
            {/* Fan air-flow effect — subtle circular turbulence around rotor */}
            <div
              ref={airRingOuterRef}
              className="pointer-events-none absolute rounded-full border border-white/60"
              style={{
                left: "70.5%",
                top: "55.5%",
                width: "clamp(220px, 22vw, 360px)",
                height: "clamp(220px, 22vw, 360px)",
                opacity: 0.1,
                boxShadow: "0 0 42px rgba(200, 200, 205, 0.12)",
                mixBlendMode: "screen",
                transform: "translate(-50%, -50%)",
              }}
            />
            <div
              ref={airRingInnerRef}
              className="pointer-events-none absolute rounded-full border border-white/50"
              style={{
                left: "70.5%",
                top: "55.5%",
                width: "clamp(170px, 17vw, 280px)",
                height: "clamp(170px, 17vw, 280px)",
                opacity: 0.09,
                boxShadow: "inset 0 0 24px rgba(190, 190, 195, 0.10)",
                mixBlendMode: "screen",
                transform: "translate(-50%, -50%)",
              }}
            />
            <div
              ref={airFlowRef}
              className="pointer-events-none absolute"
              style={{
                left: "66%",
                top: "45%",
                width: "32%",
                height: "22%",
                opacity: 0.08,
                background:
                  "linear-gradient(90deg, rgba(210,210,214,0.00) 0%, rgba(210,210,214,0.14) 38%, rgba(210,210,214,0.04) 100%)",
                filter: "blur(5px)",
                mixBlendMode: "screen",
              }}
            />
            <div
              ref={toneBlendRef}
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(270deg,rgba(22,22,26,0.28)_0%,rgba(22,22,26,0.14)_30%,rgba(22,22,26,0.06)_50%,rgba(22,22,26,0.02)_62%,rgba(22,22,26,0)_74%)]"
            />
            <div
              ref={sweepRef}
              className="pointer-events-none absolute inset-y-0 -left-[18%] w-[46%]"
              style={{
                opacity: 0.08,
                background:
                  "linear-gradient(105deg, rgba(215,215,218,0.00) 0%, rgba(215,215,218,0.16) 42%, rgba(215,215,218,0.00) 82%)",
                filter: "blur(8px)",
                mixBlendMode: "screen",
              }}
            />
          </div>

          {/* Warm paper / canvas texture — visible in light scroll phase only */}
          <div ref={paperTextureRef} className="hero-paper-texture" style={{ opacity: 0 }} aria-hidden />

          {/* RIGHT — Solid content panel (fades on scroll) */}
          <div
            ref={panelRef}
            className="absolute inset-y-0 right-0 w-[50%] z-10 will-change-transform transition-colors duration-500"
            style={{
              background:
                "linear-gradient(270deg, rgba(28,28,32,0.52) 0%, rgba(28,28,32,0.42) 54%, rgba(28,28,32,0.14) 72%, rgba(28,28,32,0.0) 100%)",
            }}
          >
            <div className="absolute inset-0 blueprint-grid-light opacity-5 pointer-events-none" />
          </div>

          {/* Hero content — positioned inside RIGHT panel */}
          <div ref={overlayRef} className="absolute top-[130px] bottom-[170px] right-0 w-[46%] z-40 flex items-center">
            <div className="w-full pl-8 pr-10 xl:pl-14 xl:pr-16">
              <div className="rounded-3xl border border-white/18 bg-[#3a3a40]/72 px-8 py-8 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.45)] backdrop-blur-[2px]">
              {/* Eyebrow */}
              <p className="font-mono-eng text-[11px] uppercase tracking-[0.3em] text-primary">
                ● {dict.badge}
              </p>

              {/* Display title */}
              <h1 className="group mt-7">
                <span className="block font-semibold text-white/95 transition-colors duration-300 group-hover:text-primary" style={{ fontSize: "clamp(2rem, 2.9vw, 3rem)", lineHeight: 1.08, letterSpacing: "-0.02em" }}>
                  {dict.titleLine1}
                </span>
                <span
                  className="mt-1 block font-semibold text-white/95 break-words transition-colors duration-300 group-hover:text-primary"
                  style={{
                    fontSize: "clamp(2rem, 2.9vw, 3rem)",
                    lineHeight: 1.08,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {dict.titleLine2}
                </span>
                <span className="mt-1 block font-semibold text-white/95 transition-colors duration-300 group-hover:text-primary" style={{ fontSize: "clamp(2rem, 2.9vw, 3rem)", lineHeight: 1.08, letterSpacing: "-0.02em" }}>
                  {dict.titleLine3}
                </span>
              </h1>

              <p className="mt-7 max-w-[42ch] text-[15px] leading-[1.7] text-white/85">
                {dict.subtitle}
              </p>

              {/* CTAs */}
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <Link
                  href={`/${locale}/iletisim`}
                  className="btn-3d btn-3d-glass group relative z-50 inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-[#1e1e22]/90 px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.24em] text-white transition-all duration-300 hover:-translate-y-[1px] hover:border-primary hover:bg-primary hover:shadow-[0_10px_24px_-10px_rgba(255,107,53,0.55)] pointer-events-auto"
                >
                  <span>{dict.ctaPrimary}</span>
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href={`/${locale}/urunler/hava-hareketi`}
                  className="group relative z-50 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white/85 transition-all duration-300 hover:-translate-y-[1px] hover:text-white pointer-events-auto"
                >
                  <span className="border-b border-white/40 pb-1 transition-colors group-hover:border-white">{dict.ctaSecondary}</span>
                  <svg className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              </div>
            </div>
          </div>

          {/* End-card — one step darker than scroll-end shell (tonal grey on grey) */}
          <div ref={endCardRef} className="pointer-events-none absolute inset-y-0 left-0 z-20 flex items-center" style={{ opacity: 0 }}>
            <div className="pointer-events-auto ml-6 w-[min(38vw,640px)] pr-4 xl:ml-14 xl:pr-8">
              <div className="relative rounded-3xl border border-ink/[0.1] bg-[#e0ddd6] px-8 py-8 shadow-[0_16px_48px_-28px_rgba(45,40,32,0.07)] text-ink xl:px-10 xl:py-8">
                <div className="absolute inset-0 blueprint-grid-light opacity-[0.035] pointer-events-none" />

                <div className="relative">
                  <p className="font-mono-eng text-[10px] uppercase tracking-[0.28em] text-primary">
                    ◆ {dict.endCard.series}
                  </p>
                  <div className="mt-4 h-px w-14 bg-primary/70" />

                  <h2 className="mt-5 font-semibold text-ink" style={{ fontSize: "clamp(2rem, 2.9vw, 3rem)", lineHeight: 1.08, letterSpacing: "-0.02em" }}>
                    {dict.endCard.title}
                  </h2>

                  <p className="mt-5 max-w-[52ch] text-[15px] leading-[1.7] text-ink/72">
                    {dict.endCard.desc}
                  </p>

                  <div className="mt-6 grid grid-cols-1 divide-y divide-ink/[0.08] border-y border-ink/[0.08] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                    {[
                      { v: dict.endCard.spec1Value, l: dict.endCard.spec1Label },
                      { v: dict.endCard.spec2Value, l: dict.endCard.spec2Label },
                      { v: dict.endCard.spec3Value, l: dict.endCard.spec3Label },
                    ].map((s) => (
                      <div key={s.l} className="py-3.5 pl-4 first:pl-0">
                        <p className="font-semibold text-[1.5rem] leading-none text-ink">{s.v}</p>
                        <p className="mt-1.5 font-mono-eng text-[9px] uppercase tracking-[0.22em] text-primary/85">{s.l}</p>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/${locale}/urunler/hava-hareketi`}
                    className="btn-3d btn-3d-dark group mt-6 inline-flex items-center gap-3 rounded-2xl bg-ink px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.24em] text-sand-100 transition-all duration-300 hover:bg-primary"
                  >
                    {dict.endCard.cta}
                    <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right side — vertical progress bar with label */}
          <div ref={scrollHintRef} className="absolute right-5 top-[18%] bottom-[18%] z-15 flex items-center pointer-events-none xl:right-8">
            <span
              className="absolute -left-14 top-1/2 font-mono-eng text-[10px] uppercase tracking-[0.3em] text-white/38"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg) translateX(50%)" }}
            >
              Scroll · Discover
            </span>
            <div className="relative h-full" style={{ width: "1px" }}>
              <div className="h-full w-full bg-white/14" />
              <div ref={progressBarRef} className="absolute inset-0 origin-top bg-primary" style={{ transform: "scaleY(0)" }} />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}