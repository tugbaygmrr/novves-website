#!/usr/bin/env node
/** Poster overlay masks AHU box; linear video scrub keeps scroll smooth. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FILE = path.join(__dirname, "..", "src/components/scroll-video-section.tsx");

let src = fs.readFileSync(FILE, "utf8");

const OVERLAY_CONSTANTS = `/** MP4 ilk ~40% = AHU box; scroll'da poster overlay ile maskelenir (linear scrub korunur). */
const HERO_VIDEO_BOX_SCROLL_END = 0.4;
const HERO_VIDEO_BOX_FADE = 0.03;

function heroPosterOverlayOpacity(progress: number): number {
  const fadeStart = HERO_VIDEO_BOX_SCROLL_END - HERO_VIDEO_BOX_FADE;
  if (progress >= HERO_VIDEO_BOX_SCROLL_END) return 0;
  if (progress <= fadeStart) return 1;
  return 1 - (progress - fadeStart) / HERO_VIDEO_BOX_FADE;
}

`;

if (!src.includes("function heroPosterOverlayOpacity")) {
  if (src.includes("function mapHeroVideoTime")) {
    src = src.replace(
      /\/\*\* MP4 intro[\s\S]*?function mapHeroVideoTime\(progress: number\): number \{\n  return HERO_VIDEO_FAN_START \+ progress \* \(1 - HERO_VIDEO_FAN_START\);\n\}\n\n/,
      OVERLAY_CONSTANTS
    );
  } else {
    src = src.replace(
      `const DEFAULT_HERO_VIDEO_POSTER = "/images/hero/hero-poster.jpg";

/** LCP sonrasi`,
      `const DEFAULT_HERO_VIDEO_POSTER = "/images/hero/hero-poster.jpg";

${OVERLAY_CONSTANTS}/** LCP sonrasi`
    );
  }
}

if (!src.includes("heroPosterOverlayRef")) {
  src = src.replace(
    "  const heroImageRef = useRef<HTMLImageElement>(null);",
    "  const heroImageRef = useRef<HTMLImageElement>(null);\n  const heroPosterOverlayRef = useRef<HTMLImageElement>(null);"
  );
}

src = src.replace(
  `  useIsoLayoutEffect(() => {
    const mediaEl = isScrollStill
      ? heroImageRef.current
      : isVideoMode
        ? videoRef.current
        : canvasRef.current;
    if (!mediaEl) return;
    const isDesktop = window.innerWidth >= 1024;
    const fanX = isDesktop ? 18 : 100;
    const fanScale = isDesktop ? 1.14 : 1;
    mediaEl.style.objectPosition = \`\${fanX}% center\`;
    mediaEl.style.transform = \`translateZ(0) scale(\${fanScale})\`;
  }, [isScrollStill, isVideoMode]);`,
  `  useIsoLayoutEffect(() => {
    const isDesktop = window.innerWidth >= 1024;
    const fanX = isDesktop ? 18 : 100;
    const fanScale = isDesktop ? 1.14 : 1;
    const pos = \`\${fanX}% center\`;
    const xform = \`translateZ(0) scale(\${fanScale})\`;
    const mediaEl = isScrollStill
      ? heroImageRef.current
      : isVideoMode
        ? videoRef.current
        : canvasRef.current;
    if (mediaEl) {
      mediaEl.style.objectPosition = pos;
      mediaEl.style.transform = xform;
    }
    if (isVideoMode && heroPosterOverlayRef.current) {
      heroPosterOverlayRef.current.style.objectPosition = pos;
      heroPosterOverlayRef.current.style.transform = xform;
      heroPosterOverlayRef.current.style.opacity = "1";
    }
  }, [isScrollStill, isVideoMode]);`
);

src = src.replace(
  `      if (isVideoMode && progress > 0) {
        const v = videoRef.current;
        if (v && v.readyState >= 1) {
          const d = v.duration;
          if (Number.isFinite(d) && d > 0.05) {
            if (prefersReducedMotion) {
              const t = mapHeroVideoTime(progress) * (d - 0.001);
              const step = Math.round(mapHeroVideoTime(progress) * (DESKTOP_VIDEO_SCRUB_STEPS - 1));
              if (step !== lastDesktopVideoStep) {
                lastDesktopVideoStep = step;
                scrubVideoTo(v, t, true);
              }
            } else {
              const n = DESKTOP_VIDEO_SCRUB_STEPS;
              const scrubP = mapHeroVideoTime(progress);
              const step = Math.min(n - 1, Math.max(0, Math.round(scrubP * (n - 1))));
              if (step !== lastDesktopVideoStep) {
                lastDesktopVideoStep = step;
                const t = (step / (n - 1)) * (d - 0.001);
                scrubVideoTo(v, t, true);
              }
            }
          }
        }
      }`,
  `      if (isVideoMode) {
        const v = videoRef.current;
        if (v && v.readyState >= 1) {
          const d = v.duration;
          if (Number.isFinite(d) && d > 0.05) {
            if (prefersReducedMotion) {
              const t = progress * (d - 0.001);
              const step = Math.round(progress * (DESKTOP_VIDEO_SCRUB_STEPS - 1));
              if (step !== lastDesktopVideoStep) {
                lastDesktopVideoStep = step;
                scrubVideoTo(v, t, true);
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
      }`
);

src = src.replace(
  `        const mediaEl = isScrollStill ? heroImageRef.current : isVideoMode ? videoRef.current : canvasRef.current;
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
          mediaEl.style.objectPosition = \`\${fanX.toFixed(1)}% center\`;
          (mediaEl as HTMLElement).style.transform = \`translateZ(0) scale(\${fanScale.toFixed(3)})\`;
        }`,
  `        const transition = Math.min(Math.max((pq - 0.08) / 0.76, 0), 1);
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
          const fanPos = \`\${fanX.toFixed(1)}% center\`;
          const fanXform = \`translateZ(0) scale(\${fanScale.toFixed(3)})\`;
          const mediaEl = isScrollStill ? heroImageRef.current : isVideoMode ? videoRef.current : canvasRef.current;
          if (mediaEl) {
            mediaEl.style.objectPosition = fanPos;
            (mediaEl as HTMLElement).style.transform = fanXform;
          }
          if (isVideoMode && heroPosterOverlayRef.current) {
            heroPosterOverlayRef.current.style.objectPosition = fanPos;
            heroPosterOverlayRef.current.style.transform = fanXform;
          }`
);

if (!src.includes("heroPosterOverlayOpacity(progress)")) {
  src = src.replace(
    `      }

      const mk = Math.round(progress * MOTION_DOM_STEPS);`,
    `      }

      if (isVideoMode && heroPosterOverlayRef.current) {
        heroPosterOverlayRef.current.style.opacity = String(heroPosterOverlayOpacity(progress));
      }

      const mk = Math.round(progress * MOTION_DOM_STEPS);`
  );
}

src = src.replace(
  `        ) : isVideoMode && videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            poster={DEFAULT_HERO_VIDEO_POSTER}
            aria-label={mobileVideoReplacementAlt || undefined}
            muted
            playsInline
            preload="none"
            disablePictureInPicture
            disableRemotePlayback
            className="absolute inset-0 h-full w-full object-cover will-change-[transform,object-position] [transform:translateZ(0)] [backface-visibility:hidden] [contain:layout_paint]"
            style={{ objectPosition: "100% center", transform: "translateZ(0) scale(1)" }}
          />
        )`,
  `        ) : isVideoMode && videoSrc ? (
          <>
            <video
              ref={videoRef}
              src={videoSrc}
              aria-label={mobileVideoReplacementAlt || undefined}
              muted
              playsInline
              preload="none"
              disablePictureInPicture
              disableRemotePlayback
              className="absolute inset-0 h-full w-full object-cover will-change-[transform,object-position] [transform:translateZ(0)_scale(1.14)] [backface-visibility:hidden] [contain:layout_paint] max-lg:[transform:translateZ(0)_scale(1)]"
              style={{ objectPosition: "18% center" }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element -- box mask; video ile ayni kadraj */}
            <img
              ref={heroPosterOverlayRef}
              src={DEFAULT_HERO_VIDEO_POSTER}
              alt=""
              aria-hidden
              decoding="async"
              fetchPriority="high"
              className="pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover will-change-[transform,object-position,opacity] [transform:translateZ(0)_scale(1.14)] max-lg:[transform:translateZ(0)_scale(1)] [backface-visibility:hidden]"
              style={{ objectPosition: "18% center", opacity: 1 }}
            />
          </>
        )`
);

fs.writeFileSync(FILE, src, "utf8");
new TextDecoder("utf-8", { fatal: true }).decode(fs.readFileSync(FILE));
console.log("OK patch-hero-scroll-overlay");
