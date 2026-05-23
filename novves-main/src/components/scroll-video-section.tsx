"use client";

import { useRef, useEffect, useState, useCallback, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type StartCard = {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  titleLine3: string;
  subtitle: string;
  features?: string[];
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

/** Zemin koyu → ana sayfa ana zemin (#EAEADF); vurgu marka turuncusu (#EF5F17) */
const SCROLL_SHELL_DARK: readonly [number, number, number] = [15, 29, 51]; // #0f1d33 — footer ile aynı derin lacivert
const SCROLL_SHELL_LIGHT: readonly [number, number, number] = [234, 234, 223]; // #eaeadf
const SCROLL_PANEL_DARK: readonly [number, number, number] = [17, 32, 58]; // #11203a — footer gradient orta tonu
const SCROLL_PANEL_LIGHT: readonly [number, number, number] = [241, 241, 232]; // soft yüzeye yakın
const SCROLL_INK: readonly [number, number, number] = [58, 60, 61]; // --ink #3a3c3d (hero metin)
const SCROLL_ACCENT_DARK: readonly [number, number, number] = [239, 95, 23]; // #ef5f17
const SCROLL_ACCENT_LIGHT: readonly [number, number, number] = [247, 118, 56]; // açık vurgu
const SCROLL_SUB_DARK: readonly [number, number, number] = [209, 209, 209]; // #d1d1d1
const SCROLL_SUB_LIGHT: readonly [number, number, number] = [111, 115, 117]; // --secondary muted
const SCROLL_DIVIDER_LIGHT = "rgb(216, 216, 205)"; // --sand-300 border

/** Start card alt şeridi — ChatGPT mockup'tan kesilen 7 ayrı logo PNG'si.
 * Her biri ayrı flex item, marquee'de seamless loop için 2x render edilir. */
const START_CARD_CERTS: ReadonlyArray<{ src: string; alt: string }> = [
  { src: "/images/cert-bsi.png", alt: "BSI" },
  { src: "/images/cert-ce.png", alt: "CE" },
  { src: "/images/cert-en.png", alt: "EN" },
  { src: "/images/cert-tse.png", alt: "TSE" },
  { src: "/images/cert-efectis.png", alt: "Efectis" },
  { src: "/images/cert-iso.png", alt: "ISO" },
  { src: "/images/cert-iso14001.png", alt: "ISO 14001" },
];


/** Masaüstü scroll animasyonu — tüm kareleri aynı anda yüklemek zayıf PC’lerde donmaya yol açar */
const FRAME_LOAD_RADIUS = 15;
const FRAME_EVICT_DISTANCE = 42;

/** Masaüstü video + motion DOM — video artık intra-only (her frame keyframe), seek ucuz.
 * Step sayısı 80'e çıkarıldı: smooth scrub + DOM update'ler ayrı (motion daha kaba). */
const DESKTOP_VIDEO_SCRUB_STEPS = 80;
const MOTION_DOM_STEPS = 48;

/** Tema (gradient / shell) — daha az sıklıkta update */
const THEME_OPEN_DOM_STEPS = 20;

/** Sağdaki progress çubuğu */
const PROGRESS_BAR_STEPS = 60;

/** Mobil video seek adımı */
const MOBILE_VIDEO_SCRUB_STEPS = 24;

/** Mobil hero (görsel/video) katman — arka plan + overlay adımı */
const MOBILE_MOTION_DOM_STEPS = 48;

/** `scrollScrub`: fastSeek yok, küçük currentTime adımları — video gibi akış.
 * Threshold 1/90 sn (~11ms) — sub-frame değişiklikler için seek yapmıyoruz, CPU/GPU rahatlar. */
function scrubVideoTo(v: HTMLVideoElement, seconds: number, scrollScrub?: boolean) {
  const d = v.duration;
  if (!Number.isFinite(d) || d <= 0.05) return;
  const t = Math.min(Math.max(seconds, 0), d - 0.001);
  if (scrollScrub) {
    if (Math.abs(t - v.currentTime) < 1 / 90) return;
    v.currentTime = t;
    return;
  }
  if (Math.abs(t - v.currentTime) < 0.04) return;
  const fast = (v as HTMLVideoElement & { fastSeek?: (time: number) => void }).fastSeek;
  if (typeof fast === "function") {
    try {
      fast.call(v, t);
      return;
    } catch {
      /* fall through */
    }
  }
  if (Math.abs(t - v.currentTime) > 0.12) {
    v.currentTime = t;
  }
}

export function ScrollVideoSection({
  framesPath,
  totalFrames,
  videoSrc,
  scrollImageSrc,
  scrollImageAlt = "",
  /** Video poster (masaüstü/mobil); isteğe bağlı */
  mobileVideoReplacementSrc,
  mobileVideoReplacementAlt = "",
  /** `videoSrc` varken mobilde MP4 yerine bu görsel + scroll (masaüstü videoda kalır; iOS seek/dikişinden kaçınır) */
  mobileHeroImageSrc,
  mobileHeroImageAlt = "",
  /** Mobilde img/video yok — sadece zemin + overlay + kartlar (masaüstü etkilenmez) */
  mobilePlainHero = false,
  scrollVh = 260,
  id,
  startCard,
  endCard,
  locale,
  productHref,
  sideLabel,
}: {
  framesPath?: string;
  totalFrames?: number;
  /** MP4 scroll-scrub (kare dizisi yerine) */
  videoSrc?: string;
  /** Tek görsel + scroll — video seek yok, kasma biter (ör. ana sayfa hero) */
  scrollImageSrc?: string;
  /** İsteğe bağlı poster + video `aria-label` (masaüstü/mobil) */
  mobileVideoReplacementSrc?: string;
  mobileVideoReplacementAlt?: string;
  mobileHeroImageSrc?: string;
  mobileHeroImageAlt?: string;
  mobilePlainHero?: boolean;
  scrollImageAlt?: string;
  /** Kaydırma alanı yüksekliği (vh); video süresine göre ayarlanır */
  scrollVh?: number;
  id: string;
  startCard?: StartCard;
  endCard?: EndCard;
  locale?: string;
  productHref?: string;
  sideLabel?: string;
}) {
  const isScrollStill = Boolean(scrollImageSrc);
  const isVideoMode = Boolean(videoSrc) && !isScrollStill;
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyShellRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
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
  const frameCacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /** Dar ekranda gizli masaüstü <video> hero MP4 çekmesin — yalnızca lg+ iken preload + load */
  useEffect(() => {
    if (!mounted || !isVideoMode || !videoSrc) return;
    const el = videoRef.current;
    if (!el) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => {
      if (mq.matches) {
        el.preload = "auto";
        void el.load();
      } else {
        el.preload = "none";
      }
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [mounted, isVideoMode, videoSrc]);

  const renderFrame = useCallback((index: number) => {
    if (isVideoMode || isScrollStill) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = frameCacheRef.current.get(index);
    if (!img || !img.complete) return;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
  }, [isVideoMode, isScrollStill]);

  useEffect(() => {
    if (!mounted) return;
    if (isScrollStill) {
      if (!scrollImageSrc) return;
    } else if (isVideoMode) {
      if (!videoSrc) return;
    } else if (!framesPath || totalFrames == null || totalFrames < 2) {
      console.warn("ScrollVideoSection: kare modu için framesPath ve totalFrames gerekli.");
      return;
    }

    const cache = frameCacheRef.current;
    const maxIdx = !isVideoMode && !isScrollStill && totalFrames != null ? totalFrames - 1 : 0;

    function frameSrc(i: number) {
      const num = String(i + 1).padStart(4, "0");
      return `${framesPath}/frame-${num}.jpg`;
    }

    function syncFrameWindow(centerIndex: number) {
      if (isVideoMode || isScrollStill) return;
      const lo = Math.max(0, centerIndex - FRAME_LOAD_RADIUS);
      const hi = Math.min(maxIdx, centerIndex + FRAME_LOAD_RADIUS);
      for (let i = lo; i <= hi; i++) {
        if (cache.has(i)) continue;
        const img = new window.Image();
        img.decoding = "async";
        img.onload = () => {
          if (currentFrameRef.current === i) renderFrame(i);
        };
        img.src = frameSrc(i);
        cache.set(i, img);
      }
      for (const key of [...cache.keys()]) {
        if (Math.abs(key - centerIndex) > FRAME_EVICT_DISTANCE) {
          cache.delete(key);
        }
      }
    }

    if (!isVideoMode && !isScrollStill) {
      syncFrameWindow(0);
      const first = cache.get(0);
      if (first?.complete) renderFrame(0);
      else if (first)
        first.onload = () => {
          if (currentFrameRef.current === 0) renderFrame(0);
        };
    }

    /** Tema DOM’u — daha kaba adım = daha az gradient/string repaint */
    let lastOpenDomKey = -999;
    /** endCardSpecs satırları — children cache (querySelectorAll her temada yok) */
    let specRowCells: HTMLElement[] | null = null;
    /** Kare / video / statik: metin + fan hareketi quantize */
    let lastMotionDomKey = -999;
    let lastDesktopVideoStep = -1;
    let lastProgressBarKey = -999;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function applyScene(progress: number) {
      /** 0 = grimsi; 1 = açık. Başta daha uzun gri: geç başlar, geç biter. */
      const open = Math.min(Math.max((progress - 0.1) / 0.78, 0), 1);
      const openDomKey = Math.round(open * THEME_OPEN_DOM_STEPS);
      const shellBg = lerpRgb(SCROLL_SHELL_DARK, SCROLL_SHELL_LIGHT, open);
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

      if (openDomKey !== lastOpenDomKey) {
        lastOpenDomKey = openDomKey;
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
          const n = grid.children.length;
          if (!specRowCells || specRowCells.length !== n) {
            specRowCells = Array.from(grid.children) as HTMLElement[];
          }
          grid.style.borderTopColor = d;
          grid.style.borderBottomColor = d;
          specRowCells.forEach((cell, i) => {
            cell.style.borderRight = i < specRowCells!.length - 1 ? `1px solid ${d}` : "none";
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
        if (progressBarRef.current) {
          progressBarRef.current.style.backgroundColor = accentCol;
        }
      }

      if (isVideoMode) {
        const v = videoRef.current;
        if (v && v.readyState >= 1) {
          const d = v.duration;
          if (Number.isFinite(d) && d > 0.05) {
            if (prefersReducedMotion) {
              if (lastDesktopVideoStep !== 0) {
                lastDesktopVideoStep = 0;
                scrubVideoTo(v, 0, true);
              }
            } else {
              const n = DESKTOP_VIDEO_SCRUB_STEPS;
              const step = Math.min(n - 1, Math.max(0, Math.round(progress * (n - 1))));
              if (step !== lastDesktopVideoStep) {
                lastDesktopVideoStep = step;
                const t = (step / (n - 1)) * (d - 0.001);
                scrubVideoTo(v, t, true);
              }
            }
          }
        }
      } else if (totalFrames != null) {
        const frameIndex = Math.round(progress * (totalFrames - 1));
        syncFrameWindow(frameIndex);
        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          renderFrame(frameIndex);
        }
      }

      const mk = Math.round(progress * MOTION_DOM_STEPS);
      if (mk !== lastMotionDomKey) {
        lastMotionDomKey = mk;
        const pq = mk / MOTION_DOM_STEPS;
        // Start card görünmezse (fade=0) DOM yazımı atla — opacity 0'da paint zaten kalkmış
        const startFade = Math.max(1 - pq * 2.4, 0);
        if (startCardRef.current && startFade > 0) {
          startCardRef.current.style.opacity = String(startFade);
          startCardRef.current.style.transform = `translate3d(0,-${pq * 30}px,0)`;
        } else if (startCardRef.current && startFade === 0 && startCardRef.current.style.opacity !== "0") {
          startCardRef.current.style.opacity = "0";
        }
        if (panelRef.current) {
          const slideOut = Math.min(Math.max((pq - 0.55) / 0.3, 0), 1);
          panelRef.current.style.transform = `translate3d(-${slideOut * 105}%,0,0)`;
        }
        const mediaEl = isScrollStill ? heroImageRef.current : isVideoMode ? videoRef.current : canvasRef.current;
        if (mediaEl) {
          const transition = Math.min(Math.max((pq - 0.08) / 0.76, 0), 1);
          const fanX = 18 + transition * 14;
          const fanScale = 1.14 - transition * 0.04;
          mediaEl.style.objectPosition = `${fanX.toFixed(1)}% center`;
          (mediaEl as HTMLElement).style.transform = `translateZ(0) scale(${fanScale.toFixed(3)})`;
        }
        const endFade = Math.max((pq - 0.72) * 4, 0);
        if (endCardRef.current && (endFade > 0 || endCardRef.current.style.opacity !== "0")) {
          const shift = Math.max(40 - endFade * 40, 0);
          endCardRef.current.style.opacity = String(Math.min(endFade, 1));
          endCardRef.current.style.transform = `translate3d(${shift}px,0,0)`;
        }
        if (statsRef.current) {
          const sFade = Math.max(1 - pq * 3.2, 0);
          if (sFade > 0 || statsRef.current.style.opacity !== "0") {
            statsRef.current.style.opacity = String(sFade);
          }
        }
      }

      const pbk = Math.min(
        PROGRESS_BAR_STEPS,
        Math.max(0, Math.round(progress * PROGRESS_BAR_STEPS))
      );
      if (pbk !== lastProgressBarKey && progressBarRef.current) {
        lastProgressBarKey = pbk;
        progressBarRef.current.style.transform = `scaleY(${progress})`;
      }
    }

    const container = containerRef.current;
    if (!container) return;

    /** GSAP ScrollTrigger: `scrub` değeri inertia/lerp ekler — video seek baskısını azaltıp ipeksi his verir.
     *  prefers-reduced-motion: anlık (scrub: true), aksi halde ~0.9 sn yumuşatma (daha az kasma). */
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: prefersReducedMotion ? true : 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => applyScene(self.progress),
        onRefresh: (self) => applyScene(self.progress),
      });
    }, container);

    applyScene(0);

    const v = videoRef.current;
    const onMeta = () => {
      lastMotionDomKey = -999;
      lastDesktopVideoStep = -1;
      lastProgressBarKey = -999;
      ScrollTrigger.refresh();
    };
    if (isVideoMode && v) v.addEventListener("loadedmetadata", onMeta);

    return () => {
      ctx.revert();
      if (isVideoMode && v) v.removeEventListener("loadedmetadata", onMeta);
      cancelAnimationFrame(rafRef.current);
      if (!isVideoMode && !isScrollStill) cache.clear();
      specRowCells = null;
    };
  }, [mounted, isVideoMode, isScrollStill, scrollImageSrc, videoSrc, framesPath, renderFrame, totalFrames]);

  return (
    <>
      {/* ── Mobile version ── */}
      <MobileScrollSection
        framesPath={framesPath}
        totalFrames={totalFrames}
        videoSrc={videoSrc}
        scrollImageSrc={scrollImageSrc}
        scrollImageAlt={scrollImageAlt}
        mobileVideoReplacementSrc={mobileVideoReplacementSrc}
        mobileVideoReplacementAlt={mobileVideoReplacementAlt}
        mobileHeroImageSrc={mobileHeroImageSrc}
        mobileHeroImageAlt={mobileHeroImageAlt}
        mobilePlainHero={mobilePlainHero}
        scrollVh={scrollVh}
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
        style={{ height: `${scrollVh}vh`, backgroundColor: "#4a4a4d" }}
      >
      <div
        ref={stickyShellRef}
        className="sticky top-0 h-screen w-full overflow-hidden [contain:layout]"
        style={{ backgroundColor: "#4a4a4d" }}
      >
        {/* Statik görsel (scrollImageSrc) veya MP4 scrub veya kare canvas */}
        {isScrollStill && scrollImageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element -- scroll ile object-position; decode bir kez
          <img
            ref={heroImageRef}
            src={scrollImageSrc}
            alt={scrollImageAlt}
            decoding="async"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover will-change-[transform,object-position] [transform:translateZ(0)] [backface-visibility:hidden]"
            style={{ objectPosition: "18% center", transform: "translateZ(0) scale(1.14)" }}
          />
        ) : isVideoMode && videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            poster={mobileVideoReplacementSrc || undefined}
            aria-label={mobileVideoReplacementAlt || undefined}
            muted
            playsInline
            preload="none"
            disablePictureInPicture
            disableRemotePlayback
            className="absolute inset-0 h-full w-full object-cover will-change-[transform,object-position] [transform:translateZ(0)] [backface-visibility:hidden] [contain:layout_paint]"
            style={{ objectPosition: "18% center", transform: "translateZ(0) scale(1.14)" }}
          />
        ) : (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "18% center", transform: "translateZ(0) scale(1.14)" }}
          />
        )}
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
          <div className="absolute inset-0 blueprint-grid-light opacity-[0.035]" aria-hidden />
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
                style={{
                  transform: "scaleY(0)",
                  backgroundColor: `rgb(${SCROLL_ACCENT_DARK[0]}, ${SCROLL_ACCENT_DARK[1]}, ${SCROLL_ACCENT_DARK[2]})`,
                }}
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
              className="relative w-full overflow-hidden rounded-[2rem] border border-white/8 bg-[#0f1d33]/95 px-8 py-7 shadow-[0_18px_48px_-28px_rgba(0,0,0,0.55),0_0_96px_-12px_rgba(15,29,51,0.55)] sm:px-9 sm:py-8 [transform:translateZ(0)]"
              style={
                {
                  backgroundColor: "rgb(15, 29, 51)",
                  borderColor: "rgba(255,255,255,0.06)",
                  color: "rgb(230, 230, 230)",
                  ["--c-title" as string]: "rgb(255, 255, 255)",
                  ["--c-sub" as string]: "rgb(209, 209, 209)",
                  ["--c-accent" as string]: `rgb(${SCROLL_ACCENT_DARK[0]}, ${SCROLL_ACCENT_DARK[1]}, ${SCROLL_ACCENT_DARK[2]})`,
                  ["--c-spec-v" as string]: "rgb(255, 255, 255)",
                } as CSSProperties
              }
            >
              {/* Arka plan: global harita görseli — sağa yaslı, metin alanı için sol gradient maske */}
              <div
                className="pointer-events-none absolute inset-0 opacity-65"
                style={{
                  backgroundImage: "url('/images/world-map.png')",
                  backgroundSize: "auto 110%",
                  backgroundPosition: "calc(100% + 180px) calc(50% - 25px)",
                  backgroundRepeat: "no-repeat",
                }}
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0f1d33] via-[#0f1d33]/85 to-[#0f1d33]/10"
                aria-hidden
              />

              <p className="relative font-mono-eng text-[11px] uppercase tracking-[0.3em]" style={{ color: "var(--c-accent)" }}>
                ● {startCard.badge}
              </p>

              <h2 className="relative mt-7 text-balance">
                {startCard.titleLine1 && (
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
                )}
                {startCard.titleLine2 && (
                  <span
                    className="mt-1 block hyphens-none break-words font-semibold"
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
                )}
                {startCard.titleLine3 && (
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
                )}
              </h2>

              <p className="relative mt-7 max-w-[42ch] text-[14.5px] leading-[1.72]" style={{ color: "var(--c-sub)" }}>
                {startCard.subtitle}
              </p>

              {locale && (startCard.ctaPrimary || startCard.ctaSecondary) && (
                <div className="relative mt-8 flex w-full flex-col items-stretch gap-3 min-[520px]:flex-row min-[520px]:flex-wrap min-[520px]:items-center min-[520px]:gap-5">
                  {startCard.ctaPrimary && (
                    <Link
                      href={`/${locale}/iletisim`}
                      className="group inline-flex items-center justify-center gap-2.5 rounded-lg bg-primary px-6 py-3.5 text-[13px] font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-deep hover:shadow-xl hover:shadow-primary/30"
                    >
                      {startCard.ctaPrimary}
                      <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  )}

                  {startCard.ctaSecondary && (
                    <Link
                      href={`/${locale}/urunler`}
                      className="group inline-flex items-center justify-center gap-2.5 rounded-lg bg-primary px-6 py-3.5 text-[13px] font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-deep hover:shadow-xl hover:shadow-primary/30"
                    >
                      {startCard.ctaSecondary}
                      <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  )}
                </div>
              )}

              {/* Sertifika marquee — 7 ayrı logo PNG (ChatGPT mockup'tan kesilmiş), seamless loop için 2x */}
              <div className="relative mt-6 -mx-8 -mb-7 overflow-hidden pb-3 sm:-mx-9 sm:-mb-8 sm:pb-4">
                <div className="card-cert-marquee-track flex w-max items-center">
                  {[...START_CARD_CERTS, ...START_CARD_CERTS].map((cert, i) => (
                    <img
                      key={`${cert.alt}-${i}`}
                      src={cert.src}
                      alt={i < START_CARD_CERTS.length ? cert.alt : ""}
                      aria-hidden={i >= START_CARD_CERTS.length || undefined}
                      className="block h-12 w-auto shrink-0 sm:h-14"
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {startCard?.stats && startCard.stats.length > 0 && (
          <div ref={statsRef} className="absolute bottom-0 left-0 right-0 z-25 border-t border-ink/15 bg-sand-100">
            <div className="grid grid-cols-2 gap-px bg-ink/10 sm:grid-cols-4">
              {startCard.stats.map((s) => (
                <div key={s.label} className="min-w-0 bg-sand-100 px-4 py-4 sm:px-6 sm:py-5 xl:px-10">
                  <p className="font-bold text-[clamp(1.35rem,4vw,2.2rem)] leading-none text-ink">{s.value}</p>
                  <p className="mt-2 font-mono-eng text-[9px] uppercase leading-snug tracking-[0.2em] text-ink/55 sm:text-[9.5px] sm:tracking-[0.22em]">
                    {s.label}
                  </p>
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
            <div className="pointer-events-auto mr-6 w-[min(580px,min(54vw,calc(100vw-2.5rem)))] xl:mr-14">
              <div
                ref={endCardSurfaceRef}
                className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-[#0f1d33]/95 px-8 py-7 shadow-[0_18px_48px_-28px_rgba(0,0,0,0.55),0_0_96px_-12px_rgba(15,29,51,0.55)] sm:px-9 sm:py-8 [transform:translateZ(0)]"
                style={
                  {
                    backgroundColor: "rgb(15, 29, 51)",
                    borderColor: "rgba(255,255,255,0.11)",
                    color: "rgb(230, 230, 230)",
                    ["--c-title" as string]: "rgb(255, 255, 255)",
                    ["--c-sub" as string]: "rgb(209, 209, 209)",
                    ["--c-accent" as string]: `rgb(${SCROLL_ACCENT_DARK[0]}, ${SCROLL_ACCENT_DARK[1]}, ${SCROLL_ACCENT_DARK[2]})`,
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
                      fontSize: "clamp(2.1rem, 2.8vw, 3.1rem)",
                      lineHeight: 0.95,
                      letterSpacing: "-0.02em",
                      color: "var(--c-title)",
                    }}
                  >
                    {endCard.title}
                  </h3>

                  <p
                    className="mt-5 hidden text-[14px] leading-[1.7] xl:block"
                    style={{ color: "var(--c-sub)" }}
                  >
                    {endCard.desc}
                  </p>

                  <div
                    ref={endCardSpecsRef}
                    className="mt-5 grid grid-cols-1 divide-y divide-white/10 border-y border-y-[1px] min-[900px]:grid-cols-3 min-[900px]:divide-x min-[900px]:divide-y-0 xl:mt-7"
                  >
                    {[
                      { v: endCard.spec1Value, l: endCard.spec1Label },
                      { v: endCard.spec2Value, l: endCard.spec2Label },
                      { v: endCard.spec3Value, l: endCard.spec3Label },
                    ].map((s) => (
                      <div key={s.l} className="flex min-w-0 flex-col py-4 pl-0 min-[900px]:pl-4 min-[900px]:first:pl-0">
                        <p className="min-h-[2em] text-[1.55rem] font-bold leading-none" style={{ color: "var(--c-spec-v)" }}>
                          {s.v}
                        </p>
                        <p
                          className="mt-auto pt-1.5 font-mono-eng text-[9px] uppercase tracking-[0.2em]"
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
                      className="group mt-7 inline-flex items-center justify-center gap-2.5 rounded-lg bg-primary px-6 py-3.5 text-[13px] font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-deep hover:shadow-xl hover:shadow-primary/30"
                    >
                      {endCard.cta}
                      <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
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
  videoSrc,
  scrollImageSrc,
  scrollImageAlt = "",
  mobileVideoReplacementSrc,
  mobileVideoReplacementAlt = "",
  mobileHeroImageSrc,
  mobileHeroImageAlt = "",
  mobilePlainHero = false,
  scrollVh = 260,
  startCard,
  endCard,
  locale,
  productHref,
  sideLabel,
}: {
  framesPath?: string;
  totalFrames?: number;
  videoSrc?: string;
  scrollImageSrc?: string;
  scrollImageAlt?: string;
  mobileVideoReplacementSrc?: string;
  mobileVideoReplacementAlt?: string;
  mobileHeroImageSrc?: string;
  mobileHeroImageAlt?: string;
  mobilePlainHero?: boolean;
  scrollVh?: number;
  startCard?: StartCard;
  endCard?: EndCard;
  locale?: string;
  productHref?: string;
  sideLabel?: string;
}) {
  const mobileUsePlain = Boolean(mobilePlainHero);
  const mobileStillSrc = mobileUsePlain ? undefined : (scrollImageSrc ?? mobileHeroImageSrc ?? undefined);
  const mobileStillAlt = scrollImageSrc ? scrollImageAlt : mobileHeroImageSrc ? mobileHeroImageAlt : undefined;
  const isMobileStill = Boolean(mobileStillSrc);
  const isMobileVideo = Boolean(videoSrc) && !isMobileStill && !mobileUsePlain;
  const isMobileMotion = isMobileVideo || isMobileStill || mobileUsePlain;
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null);
  const mobileHeroImgRef = useRef<HTMLImageElement | null>(null);
  const mobileHeroBgRef = useRef<HTMLDivElement | null>(null);
  const mobileOverlayARef = useRef<HTMLDivElement | null>(null);
  const mobileOverlayBRef = useRef<HTMLDivElement | null>(null);
  const mobileStartPanelRef = useRef<HTMLDivElement | null>(null);
  const mobileEndPanelRef = useRef<HTMLDivElement | null>(null);
  const tf = totalFrames ?? 240;
  const [mobileFrame, setMobileFrame] = useState(tf);
  const [mobileProgress, setMobileProgress] = useState(0);
  const lastMobileFrameRef = useRef(tf);
  const lastMobileProgressRef = useRef(0);

  const mobileStageHeightSvh = Math.max(180, Math.round((235 * scrollVh) / 260));

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    if (window.innerWidth >= 1024) return;

    const startFrame = 1;
    const endFrame = tf;
    let rafId = 0;
    let mobileRafPending = false;
    let lastMobileVideoStep = -1;
    let lastMobileMotionKey = -1;

    const updateFrame = () => {
      mobileRafPending = false;
      rafId = 0;
      const stage = stageRef.current;
      if (!stage) return;
      const viewport = window.innerHeight;
      const rect = stage.getBoundingClientRect();
      const stageScroll = viewport * 0.86 - rect.top;
      const travel = Math.max(stage.offsetHeight - viewport * 0.24, 1);
      const rawProgress = stageScroll / travel;
      const progress = Math.min(Math.max(rawProgress, 0), 1);

      if (isMobileMotion) {
        const v = mobileVideoRef.current;
        if (isMobileVideo && v && v.readyState >= 1) {
          const d = v.duration;
          if (Number.isFinite(d) && d > 0.05) {
            const step = Math.min(
              MOBILE_VIDEO_SCRUB_STEPS - 1,
              Math.max(0, Math.round(progress * (MOBILE_VIDEO_SCRUB_STEPS - 1)))
            );
            if (step !== lastMobileVideoStep) {
              lastMobileVideoStep = step;
              const t = (step / (MOBILE_VIDEO_SCRUB_STEPS - 1)) * (d - 0.001);
              scrubVideoTo(v, t, true);
            }
          }
        }

        const mk = Math.min(
          MOBILE_MOTION_DOM_STEPS,
          Math.max(0, Math.round(progress * MOBILE_MOTION_DOM_STEPS))
        );
        if (mk === lastMobileMotionKey) return;
        lastMobileMotionKey = mk;
        const pq = mk / MOBILE_MOTION_DOM_STEPS;

        const transition = Math.min(Math.max((pq - 0.08) / 0.76, 0), 1);
        const fanX = 18 + transition * 14;
        const fanScale = 1.14 - transition * 0.04;
        const overlayOpacity = Math.max(0.64 - transition * 0.64, 0);
        const panelOpacity = Math.max(1 - transition * 1.15, 0);
        const panelLift = transition * 105;
        const finalTextOpacity = Math.min(Math.max((transition - 0.78) / 0.2, 0), 1);
        const finalTextLift = (1 - finalTextOpacity) * 24;
        const bgR = Math.round(15 + transition * 219);
        const bgG = Math.round(29 + transition * 205);
        const bgB = Math.round(51 + transition * 172);
        const root = mobileHeroBgRef.current;
        if (root) root.style.backgroundColor = `rgb(${bgR}, ${bgG}, ${bgB})`;
        const imgEl = mobileHeroImgRef.current;
        if (isMobileStill && imgEl) {
          imgEl.style.objectPosition = `${fanX}% center`;
          imgEl.style.transform = `translateZ(0) scale(${fanScale})`;
        } else if (isMobileVideo && v) {
          v.style.objectPosition = `${fanX}% center`;
          v.style.transform = `translateZ(0) scale(${fanScale})`;
        }
        const oa = mobileOverlayARef.current;
        const ob = mobileOverlayBRef.current;
        if (oa) oa.style.opacity = String(overlayOpacity);
        if (ob) ob.style.opacity = String(overlayOpacity);
        const sp = mobileStartPanelRef.current;
        if (sp) {
          sp.style.opacity = String(panelOpacity);
          sp.style.transform = `translateY(-${panelLift}px)`;
        }
        const ep = mobileEndPanelRef.current;
        if (ep) {
          ep.style.opacity = String(finalTextOpacity);
          ep.style.transform = `translateY(${finalTextLift}px)`;
        }
        return;
      }

      const frame = Math.round(startFrame + progress * (endFrame - startFrame));
      if (frame !== lastMobileFrameRef.current) {
        lastMobileFrameRef.current = frame;
        setMobileFrame(frame);
      }
      if (progress !== lastMobileProgressRef.current) {
        lastMobileProgressRef.current = progress;
        setMobileProgress(progress);
      }
    };

    const onScroll = () => {
      if (mobileRafPending) return;
      mobileRafPending = true;
      rafId = requestAnimationFrame(updateFrame);
    };

    const onResize = () => {
      lastMobileMotionKey = -1;
      onScroll();
    };

    const initialRaf = requestAnimationFrame(updateFrame);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    let mobileVideoForMeta: HTMLVideoElement | null = null;
    const onVideoMeta = () => {
      lastMobileVideoStep = -1;
      lastMobileMotionKey = -1;
      updateFrame();
    };
    if (isMobileVideo) {
      mobileVideoForMeta = mobileVideoRef.current;
      mobileVideoForMeta?.addEventListener("loadedmetadata", onVideoMeta);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      mobileRafPending = false;
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(initialRaf);
      mobileVideoForMeta?.removeEventListener("loadedmetadata", onVideoMeta);
    };
  }, [tf, isMobileVideo, isMobileStill, isMobileMotion]);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth >= 1024) return;
    if (isMobileMotion || !framesPath) return;

    const around = [-2, -1, 1, 2, 3];
    const preloadIndexes = around
      .map((delta) => Math.min(Math.max(mobileFrame + delta, 1), tf))
      .filter((value, index, arr) => arr.indexOf(value) === index);

    preloadIndexes.forEach((idx) => {
      const num = String(idx).padStart(4, "0");
      const img = new window.Image();
      img.decoding = "async";
      img.src = `${framesPath}/frame-${num}.jpg`;
    });
  }, [framesPath, mobileFrame, tf, isMobileVideo, isMobileStill]);

  const finalFrameSrc =
    framesPath && !isMobileMotion ? `${framesPath}/frame-${String(mobileFrame).padStart(4, "0")}.jpg` : "";
  const transition = Math.min(Math.max((mobileProgress - 0.08) / 0.76, 0), 1);
  const fanX = 18 + transition * 14;
  const fanScale = 1.14 - transition * 0.04;
  const overlayOpacity = Math.max(0.64 - transition * 0.64, 0);
  const panelOpacity = Math.max(1 - transition * 1.15, 0);
  const panelLift = transition * 105;
  const finalTextOpacity = Math.min(Math.max((transition - 0.78) / 0.2, 0), 1);
  const finalTextLift = (1 - finalTextOpacity) * 24;
  const bgR = 15;
  const bgG = 29;
  const bgB = 51;

  return (
    <section ref={sectionRef} className="relative bg-sand-200 pt-[80px] lg:hidden">
      <div ref={stageRef} className="relative bg-sand-200" style={{ height: `${mobileStageHeightSvh}svh` }}>
        <section className="sticky top-[92px]">
          <div
            ref={mobileHeroBgRef}
            className="relative min-h-[calc(100svh-92px)] overflow-hidden"
            style={{
              backgroundColor: isMobileMotion ? "rgb(15, 29, 51)" : `rgb(${bgR}, ${bgG}, ${bgB})`,
            }}
          >
            {isMobileStill && mobileStillSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                ref={mobileHeroImgRef}
                src={mobileStillSrc}
                alt={mobileStillAlt}
                decoding="async"
                fetchPriority="high"
                className="absolute inset-0 h-full w-full object-cover will-change-[transform,object-position] [transform:translateZ(0)] [backface-visibility:hidden]"
                style={{
                  objectPosition: "18% center",
                  transform: "translateZ(0) scale(1.14)",
                }}
              />
            ) : isMobileVideo && videoSrc ? (
              <video
                ref={mobileVideoRef}
                src={videoSrc}
                poster={mobileVideoReplacementSrc || undefined}
                aria-label={mobileVideoReplacementAlt || undefined}
                muted
                playsInline
                preload="metadata"
                disablePictureInPicture
                onLoadedData={(e) => {
                  const el = e.currentTarget;
                  if (el.readyState >= 2) scrubVideoTo(el, 0, true);
                }}
                className="absolute inset-0 h-full w-full object-cover will-change-[transform,object-position] [transform:translateZ(0)] [backface-visibility:hidden]"
                style={{
                  objectPosition: "18% center",
                  transform: "translateZ(0) scale(1.14)",
                }}
              />
            ) : mobileUsePlain ? null : (
              <Image
                src={finalFrameSrc}
                alt={endCard?.title ?? "Fan"}
                fill
                sizes="100vw"
                className="object-cover"
                style={{
                  objectPosition: `${fanX}% center`,
                  transform: `scale(${fanScale})`,
                  filter: "contrast(1.08) saturate(1.04) brightness(1.03)",
                }}
              />
            )}
            {/* Arka plan overlay'leri — yumuşak normal gradient (lacivert maskleme yok) */}
            <div
              ref={mobileOverlayARef}
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_46%,rgba(212,218,228,0.16)_0%,rgba(58,63,74,0.22)_40%,rgba(31,35,43,0.5)_100%)]"
              style={{ opacity: isMobileMotion ? 0.5 : overlayOpacity }}
            />
            <div
              ref={mobileOverlayBRef}
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(36,39,46,0.32)_0%,rgba(36,39,46,0.10)_40%,rgba(36,39,46,0.20)_100%)]"
              style={{ opacity: isMobileMotion ? 0.5 : overlayOpacity }}
            />

            {startCard && (
              <div
                ref={mobileStartPanelRef}
                className="absolute inset-x-5 bottom-5 overflow-hidden rounded-[1.5rem] border border-white/8 bg-[#0f1d33]/94 px-5 pb-0 pt-5 shadow-[0_16px_42px_-26px_rgba(0,0,0,0.55),0_0_72px_-10px_rgba(15,29,51,0.55)]"
                style={{
                  opacity: isMobileMotion ? 1 : panelOpacity,
                  transform: isMobileMotion ? "translateY(0px)" : `translateY(-${panelLift}px)`,
                }}
              >
                {/* Arka plan: global harita görseli — metin okunabilirliği için karanlık overlay */}
                <div
                  className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-55"
                  style={{ backgroundImage: "url('/images/world-map.png')" }}
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0f1d33]/92 via-[#0f1d33]/70 to-[#0f1d33]/30"
                  aria-hidden
                />

                <p className="relative font-mono-eng text-[9.5px] uppercase tracking-[0.24em] text-primary/90">● {startCard.badge}</p>
                <h2 className="relative mt-3 text-white">
                  {startCard.titleLine1 && (
                    <span className="block text-[1.85rem] font-semibold leading-[1.04] tracking-[-0.02em]">{startCard.titleLine1}</span>
                  )}
                  {startCard.titleLine2 && (
                    <span className="mt-0.5 block text-[1.85rem] font-semibold leading-[1.04] tracking-[-0.02em] opacity-92">{startCard.titleLine2}</span>
                  )}
                  {startCard.titleLine3 && (
                    <span className="mt-0.5 block text-[1.85rem] font-semibold leading-[1.04] tracking-[-0.02em]">{startCard.titleLine3}</span>
                  )}
                </h2>
                <p className="relative mt-3 text-[13.5px] leading-[1.58] text-white/84">{startCard.subtitle}</p>

                {/* CTAs — desktop ile aynı: primary teklif al + secondary ürünleri keşfet */}
                {locale && (startCard.ctaPrimary || startCard.ctaSecondary) && (
                  <div className="relative mt-5 flex flex-col gap-3.5">
                    {startCard.ctaPrimary && (
                      <Link
                        href={`/${locale}/iletisim`}
                        className="group inline-flex items-center justify-center gap-2.5 rounded-lg bg-primary px-6 py-3.5 text-[13px] font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-deep hover:shadow-xl hover:shadow-primary/30"
                      >
                        {startCard.ctaPrimary}
                        <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </Link>
                    )}
                    {startCard.ctaSecondary && (
                      <Link
                        href={`/${locale}/urunler`}
                        className="group inline-flex items-center justify-center gap-2.5 rounded-lg bg-primary px-6 py-3.5 text-[13px] font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-deep hover:shadow-xl hover:shadow-primary/30"
                      >
                        {startCard.ctaSecondary}
                        <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </Link>
                    )}
                  </div>
                )}

                {/* Sertifika marquee — kart alt edge (desktop ile aynı) */}
                <div className="relative mt-5 -mx-5 overflow-hidden border-t border-white/10">
                  <div className="card-cert-marquee-track flex w-max items-center py-3">
                    {[
                      "/images/cert-bsi.png",
                      "/images/cert-ce.png",
                      "/images/cert-en.png",
                      "/images/cert-tse.png",
                      "/images/cert-efectis.png",
                      "/images/cert-iso.png",
                      "/images/cert-iso14001.png",
                      "/images/cert-bsi.png",
                      "/images/cert-ce.png",
                      "/images/cert-en.png",
                      "/images/cert-tse.png",
                      "/images/cert-efectis.png",
                      "/images/cert-iso.png",
                      "/images/cert-iso14001.png",
                    ].map((src, i) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={`m-cert-${i}`}
                        src={src}
                        alt=""
                        aria-hidden
                        className="block h-9 w-auto shrink-0 px-5"
                        loading="lazy"
                        decoding="async"
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {endCard && (
              <div
                ref={mobileEndPanelRef}
                className="pointer-events-none absolute inset-x-5 bottom-4 z-10"
                style={{
                  opacity: isMobileMotion ? 0 : finalTextOpacity,
                  transform: isMobileMotion ? "translateY(24px)" : `translateY(${finalTextLift}px)`,
                }}
              >
                <div className="rounded-2xl border border-ink/10 bg-white/94 p-4 shadow-[0_18px_42px_-26px_rgba(21,26,33,0.28)]">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 font-mono-eng text-[10px] uppercase tracking-[0.24em] text-ink/62">
                      <span className="h-px w-5 bg-primary" />
                      {endCard.series}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono-eng text-[9px] uppercase tracking-[0.2em] text-ink/58">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {endCard.spec3Value}
                    </span>
                  </div>
                  <h2 className="mt-3 text-ink">
                    <span className="block text-[2.05rem] font-bold leading-[1.02] tracking-[-0.025em]">{endCard.title}</span>
                  </h2>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

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
      <div className="grid grid-cols-1 divide-y divide-ink/10 border-t border-ink/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
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