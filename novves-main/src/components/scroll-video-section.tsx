"use client";

import { useRef, useEffect, useLayoutEffect, useState, useCallback, type CSSProperties, type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** SSR'da useEffect'e duser (uyari vermez), client'ta paint oncesi calisir. */
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type StartCard = {
  eyebrow?: string;
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
const SCROLL_SHELL_LIGHT: readonly [number, number, number] = [244, 244, 234]; // #f4f4ea — site background
const SCROLL_PANEL_DARK: readonly [number, number, number] = [17, 32, 58]; // #11203a — footer gradient orta tonu
const SCROLL_PANEL_LIGHT: readonly [number, number, number] = [244, 244, 234]; // #f4f4ea — site background
/** Navy → krem geçişinde gri olmasın diye mavi waypoint */
const SCROLL_SHELL_WAYPOINT: readonly [number, number, number] = [60, 110, 180]; // doygun mavi
const SCROLL_PANEL_WAYPOINT: readonly [number, number, number] = [60, 110, 180];
const SCROLL_INK: readonly [number, number, number] = [58, 60, 61]; // --ink #3a3c3d (hero metin)
const SCROLL_ACCENT_DARK: readonly [number, number, number] = [239, 95, 23]; // #ef5f17
const SCROLL_ACCENT_LIGHT: readonly [number, number, number] = [247, 118, 56]; // açık vurgu
const SCROLL_SUB_DARK: readonly [number, number, number] = [209, 209, 209]; // #d1d1d1
const SCROLL_SUB_LIGHT: readonly [number, number, number] = [111, 115, 117]; // --secondary muted
const SCROLL_DIVIDER_LIGHT = "rgb(216, 216, 205)"; // --sand-300 border

/** Start card alt şeridi — 7 ayrı logo PNG, marquee'de seamless loop için 2x render edilir. */
const START_CARD_CERTS: ReadonlyArray<{ src: string; alt: string }> = [
  { src: "/images/cert-bsi.png", alt: "BSI" },
  { src: "/images/cert-ce.png", alt: "CE" },
  { src: "/images/cert-en.png", alt: "EN" },
  { src: "/images/cert-tse.png", alt: "TSE" },
  { src: "/images/cert-efectis.png", alt: "Efectis" },
  { src: "/images/cert-iso.png", alt: "ISO" },
  { src: "/images/cert-iso14001.png", alt: "ISO 14001" },
];

/** Hero sol kenar şeridi — dik sütun, yukarıdan aşağı: CE, ISO14001, Efectis, BSI, TSE, ISO, EN. */
const HERO_CERT_STRIP: ReadonlyArray<{ src: string; alt: string }> = [
  { src: "/images/cert-ce.png", alt: "CE" },
  { src: "/images/cert-iso14001.png", alt: "ISO 14001" },
  { src: "/images/cert-efectis.png", alt: "Efectis" },
  { src: "/images/cert-bsi.png", alt: "BSI" },
  { src: "/images/cert-tse.png", alt: "TSE" },
  { src: "/images/cert-iso.png", alt: "ISO" },
  { src: "/images/cert-en.png", alt: "EN" },
];

/** Start card liste ikonları — titleLine1/2/3: fabrika, fan, klima */
const START_CARD_LIST_ICONS = [
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 20V8.5a1 1 0 0 1 1.6-.8L9 12V8.5a1 1 0 0 1 1.6-.8L16 12V4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v16" />
      <path d="M2 20h20" />
      <path d="M6 16h1" />
      <path d="M11 16h1" />
      <path d="M17 16h1" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z" />
      <circle cx="12" cy="12" r="1.1" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2v20" />
      <path d="M3.5 7.5l17 9" />
      <path d="M20.5 7.5l-17 9" />
      <path d="M9 3.5l3 2.5 3-2.5" />
      <path d="M9 20.5l3-2.5 3 2.5" />
      <path d="M3 9.5l2.6 1.5L3 12.5" />
      <path d="M21 9.5l-2.6 1.5L21 12.5" />
    </svg>
  ),
];

/** Hero istatistik ikonları — 500+ proje (insan grubu), 30+ ülke (globe), 7000+ ürün (kutu) */
const START_CARD_STAT_ICONS = [
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="7.2" r="2.5" />
      <path d="M6.8 18v-.7a5.2 5.2 0 0 1 10.4 0v.7" />
      <circle cx="5.2" cy="9.8" r="1.9" />
      <path d="M2.2 17.6v-.5a3.4 3.4 0 0 1 3-3.38" />
      <circle cx="18.8" cy="9.8" r="1.9" />
      <path d="M21.8 17.6v-.5a3.4 3.4 0 0 0-3-3.38" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <path d="M3.3 7.2 12 12l8.7-4.8" />
      <path d="M12 22V12" />
    </svg>
  ),
];

function heroDisplayStats(stats?: StartCard["stats"]) {
  if (!stats?.length) return [];
  return stats.slice(0, 3);
}


/** Hero MP4 kapak — lazy/preload oncesi bos siyah kutu olmasin */
const DEFAULT_HERO_VIDEO_POSTER = "/images/hero/hero-poster.jpg";

/** LCP sonrasi videoyu tamamen buffer'la — scroll/touch ile erken tetiklenir.
 * `preload="auto"`: scrub'dan once tum video insin ki ilk kaydirma kasmasin
 * (metadata yalnizca sure/boyut verir, scrub byte'lari o an indirip decode eder = jank). */
function useDeferredVideoMetadata(
  videoRef: RefObject<HTMLVideoElement | null>,
  enabled: boolean,
) {
  useEffect(() => {
    if (!enabled) return;
    let done = false;
    const prime = () => {
      if (done) return;
      const v = videoRef.current;
      if (!v) return;
      done = true;
      v.preload = "auto";
      void v.load();
    };
    let idleHandle = 0;
    if (typeof window.requestIdleCallback === "function") {
      idleHandle = window.requestIdleCallback(prime, { timeout: 2500 });
    } else {
      idleHandle = window.setTimeout(prime, 1500);
    }
    window.addEventListener("scroll", prime, { once: true, passive: true });
    window.addEventListener("touchstart", prime, { once: true, passive: true });
    window.addEventListener("wheel", prime, { once: true, passive: true });
    return () => {
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleHandle);
      } else {
        window.clearTimeout(idleHandle);
      }
      window.removeEventListener("scroll", prime);
      window.removeEventListener("touchstart", prime);
      window.removeEventListener("wheel", prime);
    };
  }, [enabled, videoRef]);
}

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

/** Mobil video seek adımı — 18 step, fastSeek + dar threshold ile yine smooth + kasmasız */
const MOBILE_VIDEO_SCRUB_STEPS = 18;

/** Mobil hero DOM update adımı — 18 step (fan adımıyla senkron, panel/overlay GPU composite) */
const MOBILE_MOTION_DOM_STEPS = 18;

/** Mobil scroll hız eşiği — sadece çok hızlı scroll'da seek atla (yavaş scroll'da her step görünür) */
const MOBILE_SCROLL_VELOCITY_SKIP = 3.5;

/** Video seek — desktop için precise (1/90s), mobile için fastSeek + dar eşik (smooth) */
function scrubVideoTo(v: HTMLVideoElement, seconds: number, scrollScrub?: boolean) {
  const d = v.duration;
  if (!Number.isFinite(d) || d <= 0.05) return;
  const t = Math.min(Math.max(seconds, 0), d - 0.001);
  const fast = (v as HTMLVideoElement & { fastSeek?: (time: number) => void }).fastSeek;
  if (scrollScrub) {
    /** Scroll-driven: intra-only video için precise currentTime, GSAP scrub akışını bozmaz. */
    if (Math.abs(t - v.currentTime) < 0.06) return;
    v.currentTime = t;
    return;
  }
  if (Math.abs(t - v.currentTime) < 0.04) return;
  if (typeof fast === "function") {
    try { fast.call(v, t); return; } catch { /* fall through */ }
  }
  if (Math.abs(t - v.currentTime) > 0.12) {
    v.currentTime = t;
  }
}

/** iOS Safari: video ilk frame'i göstermek için play→pause cycle gerekli.
 * Aksi halde sadece poster görünür ya da boş kalır (özellikle kovan-tipi cihazlarda). */
function primeIOSVideoFirstFrame(v: HTMLVideoElement) {
  try {
    const playPromise = v.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise
        .then(() => {
          try { v.pause(); } catch { /* noop */ }
          try {
            const fast = (v as HTMLVideoElement & { fastSeek?: (time: number) => void }).fastSeek;
            if (typeof fast === "function") fast.call(v, 0.01);
            else v.currentTime = 0.01;
          } catch { /* noop */ }
        })
        .catch(() => {
          /** Autoplay engellendi — yine de currentTime ile zorla */
          try {
            const fast = (v as HTMLVideoElement & { fastSeek?: (time: number) => void }).fastSeek;
            if (typeof fast === "function") fast.call(v, 0.01);
            else v.currentTime = 0.01;
          } catch { /* noop */ }
        });
    } else {
      try { v.pause(); } catch { /* noop */ }
      v.currentTime = 0.01;
    }
  } catch { /* noop */ }
}

export function ScrollVideoSection({
  framesPath,
  totalFrames,
  frameExt = "jpg",
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
  frameExt?: "jpg" | "png" | "webp";
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
  const navyHaloRef = useRef<HTMLDivElement>(null);
  const heroGradientRef = useRef<HTMLDivElement>(null);
  const startCardRef = useRef<HTMLDivElement>(null);
  const startCardSurfaceRef = useRef<HTMLDivElement>(null);
  const endCardSurfaceRef = useRef<HTMLDivElement>(null);
  const endCardSpecsRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const sideLabelRef = useRef<HTMLSpanElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const endCardRef = useRef<HTMLDivElement>(null);
  const mobileFinalCardRef = useRef<HTMLDivElement>(null);
  const frameCacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /** Paint oncesi dinlenme durumunu (progress=0) uygula: masaustu rest = 18%/scale 1.14,
   *  mobil/tablet rest = 100%/scale 1. Aksi halde inline scale(1) ile paint olup applyScene
   *  1.14'e atlayinca "kucukten buyume" gorunur (özellikle masaustu). */
  useIsoLayoutEffect(() => {
    const mediaEl = isScrollStill
      ? heroImageRef.current
      : isVideoMode
        ? videoRef.current
        : canvasRef.current;
    if (!mediaEl) return;
    const isDesktop = window.innerWidth >= 1024;
    const fanX = isDesktop ? 18 : 100;
    const fanScale = isDesktop ? 1.14 : 1;
    mediaEl.style.objectPosition = `${fanX}% center`;
    mediaEl.style.transform = `translateZ(0) scale(${fanScale})`;
  }, [isScrollStill, isVideoMode]);

  useDeferredVideoMetadata(videoRef, mounted && isVideoMode && Boolean(videoSrc));

  /** Responsive hero artik tum ekranlarda ayni video/canvas katmanini kullanir. */

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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
      return `${framesPath}/frame-${num}.${frameExt}`;
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
      const shellBg = "#f4f4ea";
      /** Kutu = bölüm zemini (sağdaki ana ton) ile aynı; ayrı koyu blok yok. */
      const boxFill = shellBg;
      const textBlend = Math.min(Math.max((open - 0.32) / 0.64, 0), 1);
      const titleCol = lerpRgb([255, 255, 255], SCROLL_INK, textBlend);
      const subCol = lerpRgb(SCROLL_SUB_DARK, SCROLL_SUB_LIGHT, textBlend);
      const accentCol = lerpRgb(SCROLL_ACCENT_DARK, SCROLL_ACCENT_LIGHT, textBlend);
      const specValCol = lerpRgb([255, 255, 255], SCROLL_INK, textBlend);
      const cornerTint = lerpRgb([230, 230, 230], [90, 88, 82], textBlend);
      const boxEdge = textBlend < 0.38 ? "rgba(255,255,255,0.11)" : SCROLL_DIVIDER_LIGHT;

      const panelFrom = open < 0.5 ? SCROLL_PANEL_DARK : SCROLL_PANEL_WAYPOINT;
      const panelTo = open < 0.5 ? SCROLL_PANEL_WAYPOINT : SCROLL_PANEL_LIGHT;
      const panelT = open < 0.5 ? open * 2 : (open - 0.5) * 2;
      const pr = Math.round(lerp(panelFrom[0], panelTo[0], panelT));
      const pg = Math.round(lerp(panelFrom[1], panelTo[1], panelT));
      const pb = Math.round(lerp(panelFrom[2], panelTo[2], panelT));

      if (openDomKey !== lastOpenDomKey) {
        lastOpenDomKey = openDomKey;
        if (stickyShellRef.current) {
          stickyShellRef.current.style.backgroundColor = shellBg;
        }
        if (navyHaloRef.current) {
          navyHaloRef.current.style.opacity = "0";
        }
        if (canvasWashRef.current) {
          canvasWashRef.current.style.opacity = "0";
        }
        if (panelRef.current) {
          panelRef.current.style.background = "transparent";
        }

        if (containerRef.current) {
          containerRef.current.style.backgroundColor = shellBg;
        }
        if (sideLabelRef.current) {
          sideLabelRef.current.style.color = lerpRgb([210, 208, 200], [118, 114, 108], open);
        }

        for (const el of [endCardSurfaceRef.current]) {
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
        if (heroGradientRef.current) {
          heroGradientRef.current.style.opacity = String(startFade);
        }
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
          const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 1440;
          const isNarrow = viewportWidth < 768;
          const isTablet = viewportWidth >= 768 && viewportWidth < 1024;
          const settle = Math.min(transition / 0.58, 1);
          const cover = Math.min(Math.max((transition - 0.58) / 0.42, 0), 1);
          const fanX = isNarrow
            ? 100 - settle * 58 - cover * 46
            : isTablet
              ? 100 - settle * 58 - cover * 46
            : 18 + transition * 14;
          const fanScale = isNarrow
            ? 1 + cover * 0.72
            : isTablet
              ? 1 + cover * 0.72
            : 1.14 - transition * 0.04;
          mediaEl.style.objectPosition = `${fanX.toFixed(1)}% center`;
          (mediaEl as HTMLElement).style.transform = `translateZ(0) scale(${fanScale.toFixed(3)})`;
        }
        const endFade = Math.max((pq - 0.72) * 4, 0);
        if (endCardRef.current && (endFade > 0 || endCardRef.current.style.opacity !== "0")) {
          const shift = Math.max(40 - endFade * 40, 0);
          endCardRef.current.style.opacity = String(Math.min(endFade, 1));
          endCardRef.current.style.transform = `translate3d(${shift}px,0,0)`;
        }
        if (mobileFinalCardRef.current && (endFade > 0 || mobileFinalCardRef.current.style.opacity !== "0")) {
          const lift = Math.max(24 - endFade * 24, 0);
          mobileFinalCardRef.current.style.opacity = String(Math.min(endFade, 1));
          mobileFinalCardRef.current.style.transform = `translate3d(0,${lift}px,0)`;
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
    let st: ScrollTrigger | undefined;
    const ctx = gsap.context(() => {
      st = ScrollTrigger.create({
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
    /** Video metadata gelince scene'i MEVCUT scroll pozisyonunda anında yeniden uygula.
     *  ScrollTrigger.refresh() kullanmiyoruz: scrub:0.6 ile refresh, sahneyi eased "oturtuyor"
     *  (sayfa basta sabit degil gibi gorunur). Dogrudan applyScene = animasyonsuz, sadece dogru
     *  frame'e seek + DOM'u tazele. */
    const onMeta = () => {
      lastMotionDomKey = -999;
      lastDesktopVideoStep = -1;
      lastProgressBarKey = -999;
      applyScene(st ? st.progress : 0);
    };
    if (isVideoMode && v) v.addEventListener("loadedmetadata", onMeta);

    return () => {
      ctx.revert();
      if (isVideoMode && v) v.removeEventListener("loadedmetadata", onMeta);
      cancelAnimationFrame(rafRef.current);
      if (!isVideoMode && !isScrollStill) cache.clear();
      specRowCells = null;
    };
  }, [mounted, isVideoMode, isScrollStill, scrollImageSrc, videoSrc, framesPath, frameExt, renderFrame, totalFrames]);

  return (
    <>
      {/* ── Responsive sticky hero: desktop ile aynı GSAP / scroll mantığı tüm ekranlarda ── */}
      <div
        ref={containerRef}
        id={id}
        className="relative block"
        style={{ height: `${scrollVh}vh`, backgroundColor: "#f4f4ea" }}
      >
      <div
        ref={stickyShellRef}
        className="sticky top-0 h-screen w-full overflow-hidden [contain:layout]"
        style={{ backgroundColor: "#f4f4ea" }}
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
            poster={mobileVideoReplacementSrc || DEFAULT_HERO_VIDEO_POSTER}
            aria-label={mobileVideoReplacementAlt || undefined}
            muted
            playsInline
            preload="none"
            disablePictureInPicture
            disableRemotePlayback
            className="absolute inset-0 h-full w-full object-cover will-change-[transform,object-position] [transform:translateZ(0)] [backface-visibility:hidden] [contain:layout_paint]"
            style={{ objectPosition: "100% center", transform: "translateZ(0) scale(1)" }}
          />
        ) : (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "100% center", transform: "translateZ(0) scale(1)", backgroundColor: "#f4f4ea", imageRendering: "auto" }}
          />
        )}
        <div
          ref={canvasWashRef}
          className="pointer-events-none absolute inset-0 bg-[#1a1a1e]"
          style={{ opacity: 0 }}
          aria-hidden
        />

        {/* Sol okuma alanı — gri gradient kaldırıldı, sadece pozisyon takipçisi */}
        <div
          ref={panelRef}
          className="pointer-events-none absolute inset-0 z-10 will-change-transform"
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

        {/* Koyu halo kapalı — hero arka planı header ile aynı tek cream renk kalır */}
        <div
          ref={navyHaloRef}
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background: "transparent",
            opacity: 0,
            transition: "opacity 0.15s linear",
          }}
          aria-hidden
        />

        {/* Header renginden videoya soldan sağa yumuşak geçiş */}
        {startCard && (
          <div
            ref={heroGradientRef}
            className="pointer-events-none absolute inset-y-0 left-0 z-[6] w-[70%]"
            style={{
              background:
                "linear-gradient(90deg, #f4f4ea 0%, rgba(244,244,234,0.96) 38%, rgba(244,244,234,0.58) 64%, rgba(244,244,234,0) 100%)",
              opacity: 1,
              transition: "opacity 0.12s linear",
            }}
            aria-hidden
          />
        )}


        {/* START CARD — mockup: sol metin + orta istatistikler + scroll video sağda */}
        {startCard && (
          <div
            ref={startCardRef}
            className="absolute inset-y-0 left-0 z-20 flex w-full max-w-[calc(100vw-1.5rem)] items-start pl-5 pr-4 pt-[5.5rem] sm:max-w-[min(760px,76vw)] sm:pl-10 sm:pt-0 md:max-w-[min(760px,72vw)] md:items-center lg:max-w-[min(980px,min(68vw,calc(100vw-2.5rem)))] lg:pl-14 lg:pr-6 xl:pl-[4.5rem] xl:pr-8"
          >
            <div
              ref={startCardSurfaceRef}
              className="group relative flex h-full w-full items-start overflow-visible pb-8 pt-0 md:items-center lg:items-start lg:pt-[clamp(9.5rem,25vh,15rem)] [transform:translateZ(0)]"
              style={
                {
                  background: "transparent",
                  color: "rgb(58, 60, 61)",
                } as CSSProperties
              }
            >
              {/* İki eş merkezli ince halka — sertifika bölgesine uzanır, certlerin altından görünür */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-[38%] top-[57%] z-0 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="absolute left-1/2 top-1/2 h-[min(56rem,92vh)] w-[min(56rem,92vh)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/25" />
                <div className="absolute left-1/2 top-1/2 h-[min(30rem,54vh)] w-[min(30rem,54vh)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/[0.18]" />
              </div>

              <div className="relative z-20 flex w-full min-w-0 items-start gap-4 sm:items-center sm:gap-6 xl:gap-10">
                <div className="relative min-w-0 flex-1 max-w-[min(560px,92vw)] pl-0 sm:max-w-[min(580px,52vw)] sm:pl-6 md:max-w-[min(660px,64vw)] lg:max-w-[min(580px,52vw)] lg:pl-10 xl:pl-14">
                  <div className="pointer-events-none absolute -left-8 top-8 h-[14rem] w-[min(24rem,92vw)] rounded-full bg-white/75 blur-2xl md:hidden" aria-hidden />
                  <div className="pointer-events-none absolute -left-8 top-8 hidden h-[17rem] w-[min(34rem,72vw)] rounded-full bg-white/58 blur-3xl md:block lg:hidden" aria-hidden />
                  <span className="relative z-10 inline-flex items-center gap-1.5 rounded-md bg-primary/[0.12] px-3 py-1.5 text-[11px] font-semibold tracking-[0.04em] text-primary sm:-mt-3 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-base">
                    <span className="text-base leading-none font-semibold">+</span>
                    {startCard.badge}
                  </span>

                  {startCard.eyebrow && (() => {
                    const lines = startCard.eyebrow.split(/\n/).map((s) => s.trim()).filter(Boolean).slice(0, 2);
                    return (
                      <h1
                        className="relative z-10 mt-5 text-[clamp(2.35rem,8.8vw,3.9rem)] font-semibold leading-[1.02] tracking-[-0.02em] md:text-[clamp(4rem,7vw,4.7rem)] lg:text-[clamp(2.35rem,8.8vw,3.9rem)]"
                        style={{
                          fontFamily: 'var(--font-montserrat), var(--font-inter), "Helvetica Neue", sans-serif',
                          fontWeight: 600,
                        }}
                      >
                        <span className="block whitespace-nowrap text-primary">{lines[0]}</span>
                        {lines[1] ? <span className="block text-ink">{lines[1]}</span> : null}
                      </h1>
                    );
                  })()}

                  <p className="relative z-10 mt-4 max-w-[34ch] text-[13px] font-bold leading-[1.58] text-[#25292c] drop-shadow-[0_1px_0_rgba(255,255,255,0.95)] sm:mt-5 sm:max-w-[58ch] sm:text-[16.5px] sm:font-medium sm:leading-[1.7] sm:text-secondary md:max-w-[54ch] md:text-[18px] lg:max-w-[58ch] lg:text-[16.5px] lg:drop-shadow-none">
                    {startCard.subtitle}
                  </p>

                  {(startCard.titleLine1 || startCard.titleLine2 || startCard.titleLine3) && (
                    <ul className="relative z-10 mt-5 space-y-2.5 sm:mt-6 sm:space-y-3 md:mt-7 md:space-y-4 lg:mt-6 lg:space-y-3">
                      {[startCard.titleLine1, startCard.titleLine2, startCard.titleLine3].map((raw, i) => {
                        if (!raw) return null;
                        const label = raw.replace(/^[•·*—–-]\s*/u, "");
                        return (
                          <li key={i} className="flex items-center gap-3 text-primary">
                            <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-6 lg:w-6" aria-hidden>
                              {START_CARD_LIST_ICONS[i]}
                            </span>
                            <span
                              className="text-[clamp(0.95rem,1.2vw,1.2rem)] font-normal md:text-[clamp(1.2rem,2vw,1.45rem)] lg:text-[clamp(0.95rem,1.2vw,1.2rem)]"
                              style={{
                                fontFamily: 'var(--font-montserrat), var(--font-inter), "Helvetica Neue", sans-serif',
                                fontWeight: 400,
                              }}
                            >
                              {label}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  {locale && (startCard.ctaPrimary || startCard.ctaSecondary) && (
                    <div className="relative z-10 mt-6 flex flex-wrap items-center gap-3 md:mt-8 md:gap-4 lg:mt-6 lg:gap-3">
                      {startCard.ctaPrimary && (
                        <Link
                          href={`/${locale}/iletisim`}
                          className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_28px_-10px_rgba(239,95,23,0.55)] transition-colors duration-300 hover:bg-primary-deep md:px-8 md:py-4 md:text-base lg:px-6 lg:py-3 lg:text-sm"
                          style={{ fontFamily: 'var(--font-montserrat), var(--font-inter), "Helvetica Neue", sans-serif' }}
                        >
                          {startCard.ctaPrimary}
                        </Link>
                      )}
                      {startCard.ctaSecondary && (
                        <Link
                          href={`/${locale}/urunler/hava-hareketi`}
                          className="inline-flex items-center justify-center rounded-full border-2 border-primary bg-white px-6 py-3 text-sm font-semibold text-primary shadow-[0_10px_28px_-12px_rgba(239,95,23,0.5)] transition-colors duration-300 hover:bg-primary/5 hover:shadow-[0_12px_32px_-12px_rgba(239,95,23,0.62)] md:px-8 md:py-4 md:text-base lg:px-6 lg:py-3 lg:text-sm"
                          style={{ fontFamily: 'var(--font-montserrat), var(--font-inter), "Helvetica Neue", sans-serif' }}
                        >
                          {startCard.ctaSecondary}
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* İstatistikler — dış (son) halkanın sağ yayı üzerinde konumlu */}
              {(() => {
                const displayStats = heroDisplayStats(startCard.stats);
                if (!displayStats.length) return null;
                return (
                  <div
                    ref={statsRef}
                    className="absolute top-[57%] z-20 hidden min-w-[180px] flex-col justify-center gap-12 min-[1200px]:flex"
                    style={{ left: "calc(38% + min(28rem, 46vh))", transform: "translate(-1.125rem, -50%)" }}
                  >
                    {displayStats.map((stat, i) => {
                      /** Üst/alt satırlar halka eğrisini takip etsin diye içeri çekilir (orta satır rightmost noktada) */
                      const arcInset = i === 1 ? 0 : 16;
                      return (
                      <div
                        key={stat.label}
                        className="flex items-center gap-5"
                        style={{ transform: `translateX(-${arcInset}px)` }}
                      >
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center text-primary" aria-hidden>
                          {START_CARD_STAT_ICONS[i]}
                        </span>
                        <div>
                          <p
                            className="font-semibold leading-none text-ink"
                            style={{
                              fontFamily: 'var(--font-montserrat), var(--font-inter), "Helvetica Neue", sans-serif',
                              fontWeight: 600,
                              fontSize: "clamp(1.85rem, 2.3vw, 2.5rem)",
                            }}
                          >
                            {stat.value}
                          </p>
                          <p className="mt-1.5 text-[12.5px] font-normal leading-snug text-secondary">{stat.label}</p>
                        </div>
                      </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>

            {/* Sertifikalar — sürekli dikey kayan marquee, yana çevrili logolar + aralarında yatay çizgiler. Beyaz PNG'ler invert ile açık gri. */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-30 hidden w-20 overflow-hidden sm:block"
              style={{
                maskImage: "linear-gradient(to bottom, transparent 0%, #000 10%, #000 90%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 10%, #000 90%, transparent 100%)",
              }}
            >
              <div className="hero-cert-marquee-track flex w-full flex-col items-center">
                {[...HERO_CERT_STRIP, ...HERO_CERT_STRIP].map((cert, i) => (
                  <span key={`hero-cert-${cert.alt}-${i}`} className="contents">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cert.src}
                      alt={i < HERO_CERT_STRIP.length ? cert.alt : ""}
                      aria-hidden={i >= HERO_CERT_STRIP.length || undefined}
                      className="my-7 h-12 w-auto shrink-0 opacity-30 [filter:invert(1)] [transform:rotate(-90deg)]"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="h-px w-8 bg-ink/25" aria-hidden />
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}


        {/* END CARD — right, sand on ink, editorial */}
        {endCard && (
          <div
            ref={endCardRef}
            className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden items-center pt-[130px] lg:flex"
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
                    className="mt-6 font-eurostile font-bold"
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
                    className="mt-5 hidden text-meta leading-[1.7] xl:block"
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

        {endCard && (
          <div
            ref={mobileFinalCardRef}
            className="absolute inset-x-4 bottom-5 z-30 lg:hidden"
            style={{ opacity: 0, transform: "translate3d(0,24px,0)" }}
          >
            <Link
              href={`/${locale ?? "tr"}${productHref ?? "/urunler/hava-hareketi"}`}
              className="block rounded-2xl border border-ink/10 bg-white/95 p-4 shadow-[0_18px_42px_-26px_rgba(21,26,33,0.35)] transition-transform duration-300 active:scale-[0.99]"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 font-mono-eng text-[9px] uppercase tracking-[0.2em] text-ink/58">
                  <span className="h-px w-5 bg-primary" />
                  {endCard.series}
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono-eng text-[8px] uppercase tracking-[0.18em] text-ink/55">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {endCard.spec3Value}
                </span>
              </div>
              <h3 className="mt-2 font-eurostile text-[1.45rem] font-bold leading-[1.04] tracking-[-0.02em] text-ink">
                {endCard.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-[12px] leading-[1.45] text-ink/65">{endCard.desc}</p>
              <div className="mt-3 grid grid-cols-3 divide-x divide-ink/10 border-t border-ink/10 pt-2.5">
                {[
                  { v: endCard.spec1Value, l: endCard.spec1Label },
                  { v: endCard.spec2Value, l: endCard.spec2Label },
                  { v: endCard.spec3Value, l: endCard.spec3Label },
                ].map((s) => (
                  <div key={s.l} className="px-2 text-center first:pl-0 last:pr-0">
                    <p className="text-[0.9rem] font-semibold leading-none text-ink">{s.v}</p>
                    <p className="mt-1 truncate font-mono-eng text-[7px] uppercase tracking-[0.12em] text-ink/50">{s.l}</p>
                  </div>
                ))}
              </div>
            </Link>
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
  frameExt = "jpg",
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
  frameExt?: "jpg" | "png" | "webp";
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

  const mobileStageHeightSvh = Math.max(165, Math.round((210 * scrollVh) / 260));

  useDeferredVideoMetadata(mobileVideoRef, isMobileVideo && Boolean(videoSrc));

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
    /** Sahne ekran içinde mi — IntersectionObserver ile takip. Dışındayken scroll handler hiçbir şey yapmaz. */
    let stageInView = false;
    /** Scroll hız takibi — hızlı kaydırırken video seek atla (decode'a yetişemez) */
    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    let lastScrollTime = typeof performance !== "undefined" ? performance.now() : 0;
    let scrollVelocity = 0;

    const updateFrame = () => {
      mobileRafPending = false;
      rafId = 0;
      if (!stageInView) return;
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
            /** Hızlı scroll → seek atla. Yavaşladığında doğru frame'e atlar. */
            if (step !== lastMobileVideoStep && scrollVelocity < MOBILE_SCROLL_VELOCITY_SKIP) {
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
        const fanX = 92 - transition * 24;
        const fanScale = 1.08 - transition * 0.03;
        const overlayOpacity = Math.max(0.64 - transition * 0.64, 0);
        const panelOpacity = 1;
        const panelLift = 0;
        const finalTextOpacity = Math.min(Math.max((transition - 0.78) / 0.2, 0), 1);
        const finalTextLift = (1 - finalTextOpacity) * 24;
        const root = mobileHeroBgRef.current;
        if (root) root.style.backgroundColor = "#f4f4ea";
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
      /** Scroll velocity hesabı — px/ms cinsinden */
      const now = performance.now();
      const dy = Math.abs(window.scrollY - lastScrollY);
      const dt = Math.max(now - lastScrollTime, 1);
      scrollVelocity = dy / dt;
      lastScrollY = window.scrollY;
      lastScrollTime = now;

      if (!stageInView) return;
      if (mobileRafPending) return;
      mobileRafPending = true;
      rafId = requestAnimationFrame(updateFrame);
    };

    const onResize = () => {
      lastMobileMotionKey = -1;
      if (mobileRafPending) return;
      mobileRafPending = true;
      rafId = requestAnimationFrame(updateFrame);
    };

    /** IntersectionObserver: sahne ekran içinde değilse hiçbir scroll handler iş yapmasın */
    let observer: IntersectionObserver | null = null;
    const stageEl = stageRef.current;
    if (typeof IntersectionObserver !== "undefined" && stageEl) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            stageInView = entry.isIntersecting;
            if (stageInView && !mobileRafPending) {
              mobileRafPending = true;
              rafId = requestAnimationFrame(updateFrame);
            }
          }
        },
        { rootMargin: "100px 0px" }
      );
      observer.observe(stageEl);
    } else {
      stageInView = true;
    }

    const initialRaf = requestAnimationFrame(() => {
      stageInView = true;
      updateFrame();
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    let mobileVideoForMeta: HTMLVideoElement | null = null;
    const onVideoMeta = () => {
      lastMobileVideoStep = -1;
      lastMobileMotionKey = -1;
      if (stageInView && !mobileRafPending) {
        mobileRafPending = true;
        rafId = requestAnimationFrame(updateFrame);
      }
    };
    if (isMobileVideo) {
      mobileVideoForMeta = mobileVideoRef.current;
      mobileVideoForMeta?.addEventListener("loadedmetadata", onVideoMeta);
    }

    return () => {
      observer?.disconnect();
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
      img.src = `${framesPath}/frame-${num}.${frameExt}`;
    });
  }, [framesPath, frameExt, mobileFrame, tf, isMobileVideo, isMobileStill]);

  const finalFrameSrc =
    framesPath && !isMobileMotion ? `${framesPath}/frame-${String(mobileFrame).padStart(4, "0")}.${frameExt}` : "";
  const transition = Math.min(Math.max((mobileProgress - 0.08) / 0.76, 0), 1);
  const fanX = 92 - transition * 24;
  const fanScale = 1.14 - transition * 0.04;
  const overlayOpacity = Math.max(0.64 - transition * 0.64, 0);
  const panelOpacity = Math.max(1 - transition * 1.15, 0);
  const panelLift = transition * 105;
  const finalTextOpacity = Math.min(Math.max((transition - 0.78) / 0.2, 0), 1);
  const finalTextLift = (1 - finalTextOpacity) * 24;
  return (
    <section ref={sectionRef} className="relative bg-sand-200 pt-[80px] lg:hidden">
      <div ref={stageRef} className="relative bg-sand-200" style={{ height: `${mobileStageHeightSvh}svh` }}>
        <section className="sticky top-[92px]">
          <div
            ref={mobileHeroBgRef}
            className="relative min-h-[calc(86svh-92px)] overflow-hidden md:min-h-[calc(86svh-92px)]"
            style={{
              backgroundColor: "#f4f4ea",
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
                  objectPosition: "92% center",
                  transform: "translateZ(0) scale(1.08)",
                }}
              />
            ) : isMobileVideo && videoSrc ? (
              <video
                ref={mobileVideoRef}
                src={videoSrc}
                poster={mobileVideoReplacementSrc || DEFAULT_HERO_VIDEO_POSTER}
                aria-label={mobileVideoReplacementAlt || undefined}
                muted
                playsInline
                preload="none"
                disablePictureInPicture
                disableRemotePlayback
                onLoadedMetadata={(e) => {
                  /** iOS Safari'de ilk frame'i göstermek için play→pause + currentTime trick */
                  primeIOSVideoFirstFrame(e.currentTarget);
                }}
                onLoadedData={(e) => {
                  const el = e.currentTarget;
                  if (el.readyState >= 2) scrubVideoTo(el, 0.01, true);
                }}
                onCanPlay={(e) => {
                  /** Yedek: iOS bazen LoadedMetadata yerine CanPlay'de hazır olur */
                  const el = e.currentTarget;
                  if (el.currentTime < 0.01) {
                    try {
                      const fast = (el as HTMLVideoElement & { fastSeek?: (time: number) => void }).fastSeek;
                      if (typeof fast === "function") fast.call(el, 0.01);
                      else el.currentTime = 0.01;
                    } catch { /* noop */ }
                  }
                }}
                className="absolute inset-0 h-full w-full object-cover will-change-[transform,object-position] [transform:translateZ(0)] [backface-visibility:hidden] [contain:layout_paint_size_style]"
                style={{
                  objectPosition: "92% center",
                  transform: "translateZ(0) scale(1.08)",
                }}
              />
            ) : mobileUsePlain ? null : (
              <Image
                src={finalFrameSrc}
                alt={endCard?.title ?? "Fan"}
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
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
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(244,244,234,0.88)_0%,rgba(244,244,234,0.72)_48%,rgba(244,244,234,0.34)_76%,rgba(244,244,234,0)_100%)]"
              style={{ opacity: isMobileMotion ? 1 : overlayOpacity }}
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(244,244,234,0.72)_0%,rgba(244,244,234,0.38)_58%,rgba(244,244,234,0.08)_100%)]"
              aria-hidden
            />
            <div
              ref={mobileOverlayBRef}
              className="pointer-events-none absolute inset-0"
              style={{ opacity: 0 }}
            />

            {startCard && (
              <div
                ref={mobileStartPanelRef}
                className="absolute inset-x-5 top-6 z-10 max-h-[calc(86svh-250px)] overflow-y-auto rounded-none border-0 px-0 pb-3 pt-0 shadow-none"
                style={{
                  backgroundColor: "transparent",
                  WebkitBackdropFilter: "none",
                  borderColor: "transparent",
                  opacity: isMobileMotion ? 1 : panelOpacity,
                  transform: isMobileMotion ? "translateY(0px)" : `translateY(-${panelLift}px)`,
                }}
              >
                <div className="pointer-events-none absolute -left-5 -top-6 h-[calc(100%+2.5rem)] w-[min(28rem,92vw)] bg-[linear-gradient(90deg,rgba(244,244,234,0.98)_0%,rgba(244,244,234,0.9)_58%,rgba(244,244,234,0)_100%)] blur-[2px]" aria-hidden />
                <span className="relative inline-flex items-center gap-1.5 rounded-md bg-primary/[0.12] px-2.5 py-1.5 text-[10px] font-semibold tracking-[0.035em] text-primary">
                  <span className="text-sm leading-none font-semibold">+</span>
                  {startCard.badge}
                </span>

                {/* Hero H1 — desktop tasarımının mobil uyarlaması */}
                {startCard.eyebrow && (() => {
                  const lines = startCard.eyebrow.split(/\n/).map(s => s.trim()).filter(Boolean).slice(0, 2);
                  const h1Style: CSSProperties = {
                    fontFamily: 'var(--font-montserrat), var(--font-inter), "Helvetica Neue", sans-serif',
                    fontWeight: 600,
                    fontSize: "clamp(1.82rem, 8.8vw, 2.75rem)",
                    lineHeight: 1.02,
                    letterSpacing: "-0.02em",
                  };
                  return (
                    <h1 className="relative mt-3.5 max-w-[11ch] text-balance" style={h1Style}>
                      <span className="block text-primary">{lines[0]}</span>
                      {lines[1] ? <span className="block text-ink">{lines[1]}</span> : null}
                    </h1>
                  );
                })()}

                {/* Liste — yuvarlak çerçeveli ikon + metin (tire yok) */}
                {(startCard.titleLine1 || startCard.titleLine2 || startCard.titleLine3) && (
                  <ul className="relative mt-4 space-y-2">
                    {[startCard.titleLine1, startCard.titleLine2, startCard.titleLine3].map((raw, i) => {
                      if (!raw) return null;
                      const label = raw.replace(/^[—–-]\s*/u, "");
                      return (
                        <li key={i} className="flex items-center gap-3">
                          <span
                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center text-primary"
                            aria-hidden
                          >
                            <span className="h-[18px] w-[18px]">{START_CARD_LIST_ICONS[i]}</span>
                          </span>
                          <span
                            className="text-[0.9rem] font-normal leading-[1.2] text-primary"
                            style={{ fontFamily: 'var(--font-montserrat), var(--font-inter), "Helvetica Neue", sans-serif', fontWeight: 400 }}
                          >
                            {label}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}

                <p
                  className="relative mt-4 max-w-[31ch] rounded-2xl border border-ink/10 bg-[#f4f4ea] px-4 py-3 text-[0.84rem] font-bold leading-[1.58] text-[#2f3336] shadow-[0_18px_42px_-24px_rgba(15,20,30,0.45)]"
                  style={{ fontFamily: 'var(--font-montserrat), var(--font-inter), "Helvetica Neue", sans-serif' }}
                >
                  {startCard.subtitle}
                </p>

                {/* CTAs — desktop tasarımının mobil uyarlaması */}
                {locale && (startCard.ctaPrimary || startCard.ctaSecondary) && (
                  <div className="relative mt-5 hidden flex-col gap-2.5 min-[420px]:flex-row">
                    {startCard.ctaPrimary && (
                      <Link
                        href={`/${locale}/iletisim`}
                        className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_28px_-10px_rgba(239,95,23,0.55)] transition-colors duration-300 hover:bg-primary-deep"
                      >
                        {startCard.ctaPrimary}
                      </Link>
                    )}
                    {startCard.ctaSecondary && (
                      <Link
                        href={`/${locale}/urunler/hava-hareketi`}
                        className="inline-flex items-center justify-center rounded-full border-2 border-primary bg-white px-5 py-3 text-sm font-semibold text-primary shadow-[0_10px_28px_-12px_rgba(239,95,23,0.5)] transition-colors duration-300 hover:bg-primary/5"
                      >
                        {startCard.ctaSecondary}
                      </Link>
                    )}
                  </div>
                )}

                {/* Sertifika marquee — buton altı, kart alt edge */}
                <div className="relative mt-3.5 -mx-4 hidden overflow-hidden">
                  <div className="card-cert-marquee-track flex w-max items-center py-2">
                    {[...START_CARD_CERTS, ...START_CARD_CERTS].map((cert, i) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={`m-cert-${cert.alt}-${i}`}
                        src={cert.src}
                        alt={i < START_CARD_CERTS.length ? cert.alt : ""}
                        aria-hidden={i >= START_CARD_CERTS.length || undefined}
                        className="block h-7 w-auto shrink-0 px-4"
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
                  <h2 className="mt-3 font-eurostile text-ink">
                    <span className="block text-[2.05rem] font-bold leading-[1.02] tracking-[-0.025em]">{endCard.title}</span>
                  </h2>
                </div>
              </div>
            )}

            {startCard && locale && (
              <div className="absolute inset-x-5 bottom-5 z-20">
                {(startCard.ctaPrimary || startCard.ctaSecondary) && (
                  <div className="flex flex-col gap-3 min-[420px]:flex-row">
                    {startCard.ctaPrimary && (
                      <Link
                        href={`/${locale}/iletisim`}
                        className="inline-flex flex-1 items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_28px_-10px_rgba(239,95,23,0.55)]"
                      >
                        {startCard.ctaPrimary}
                      </Link>
                    )}
                    {startCard.ctaSecondary && (
                      <Link
                        href={`/${locale}/urunler/hava-hareketi`}
                        className="inline-flex flex-1 items-center justify-center rounded-full border-2 border-primary bg-white px-5 py-3 text-sm font-semibold text-primary shadow-[0_10px_28px_-12px_rgba(239,95,23,0.5)]"
                      >
                        {startCard.ctaSecondary}
                      </Link>
                    )}
                  </div>
                )}

                <div className="relative mt-4 overflow-hidden border-y border-ink/10 py-2">
                  <div className="card-cert-marquee-track flex w-max items-center">
                    {[...START_CARD_CERTS, ...START_CARD_CERTS].map((cert, i) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={`mobile-bottom-cert-${cert.alt}-${i}`}
                        src={cert.src}
                        alt={i < START_CARD_CERTS.length ? cert.alt : ""}
                        aria-hidden={i >= START_CARD_CERTS.length || undefined}
                        className="block h-7 w-auto shrink-0 px-4 opacity-45 [filter:invert(1)]"
                        loading="lazy"
                        decoding="async"
                      />
                    ))}
                  </div>
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
          sizes="(max-width: 768px) 100vw, 480px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          style={{ objectPosition: "center center", filter: "contrast(1.05) saturate(1.08)" }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white/95 via-white/60 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="font-mono-eng text-[10px] uppercase tracking-[0.22em] text-ink/55">
            Featured Product
          </p>
          <h3 className="mt-1 font-eurostile font-bold text-ink" style={{ fontSize: "1.5rem", lineHeight: 1.1, letterSpacing: "-0.015em" }}>
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
            <p className="mt-1.5 font-mono-eng text-[9px] uppercase tracking-[0.18em] text-ink/55 truncate">{s.l}</p>
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