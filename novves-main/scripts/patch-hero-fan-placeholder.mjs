#!/usr/bin/env node
/** Fan placeholder: instant on paint, masks AHU until scroll starts (linear scrub unchanged). */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const FILE = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "src/components/scroll-video-section.tsx",
);

let src = fs.readFileSync(FILE, "utf8");

if (!src.includes("DEFAULT_HERO_VIDEO_POSTER")) {
  src = src.replace(
    "/** Hero MP4 kapak � lazy/preload oncesi bos siyah kutu olmasin */\n",
    `/** Hero MP4 kapak � lazy/preload oncesi bos siyah kutu olmasin */
const DEFAULT_HERO_VIDEO_POSTER = "/images/hero/hero-poster.jpg";
const HERO_FAN_PLACEHOLDER_FADE = 0.05;

function heroFanPlaceholderOpacity(progress: number): number {
  if (progress <= 0) return 1;
  if (progress >= HERO_FAN_PLACEHOLDER_FADE) return 0;
  return 1 - progress / HERO_FAN_PLACEHOLDER_FADE;
}

`,
  );
}

if (!src.includes("heroFanPlaceholderRef")) {
  src = src.replace(
    "  const heroImageRef = useRef<HTMLImageElement>(null);",
    "  const heroImageRef = useRef<HTMLImageElement>(null);\n  const heroFanPlaceholderRef = useRef<HTMLImageElement>(null);\n  const mobileHeroFanPlaceholderRef = useRef<HTMLImageElement>(null);",
  );
}

const layoutOld = `  useIsoLayoutEffect(() => {
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
  }, [isScrollStill, isVideoMode]);`;

const layoutNew = `  useIsoLayoutEffect(() => {
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
    for (const ph of [heroFanPlaceholderRef.current, mobileHeroFanPlaceholderRef.current]) {
      if (ph) {
        ph.style.objectPosition = pos;
        ph.style.transform = xform;
      }
    }
  }, [isScrollStill, isVideoMode]);`;

if (src.includes(layoutOld)) {
  src = src.replace(layoutOld, layoutNew);
}

if (!src.includes("heroFanPlaceholderRef.current")) {
  src = src.replace(
    `      if (isVideoMode) {
        const v = videoRef.current;`,
    `      if (isVideoMode) {
        const phOpacity = heroFanPlaceholderOpacity(progress);
        for (const ph of [heroFanPlaceholderRef.current, mobileHeroFanPlaceholderRef.current]) {
          if (ph) ph.style.opacity = String(phOpacity);
        }
        const v = videoRef.current;`,
  );
}

const desktopVideoOld = `          <video
            ref={videoRef}
            src={videoSrc}
            aria-label={mobileVideoReplacementAlt || undefined}
            muted
            playsInline
            preload="none"
            disablePictureInPicture
            disableRemotePlayback
            className="absolute inset-0 h-full w-full object-cover will-change-[transform,object-position] [transform:translateZ(0)] [backface-visibility:hidden] [contain:layout_paint]"
            style={{ objectPosition: "100% center", transform: "translateZ(0) scale(1)" }}
          />`;

const desktopVideoNew = `          <>
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
              style={{ objectPosition: "18% center", transform: "translateZ(0) scale(1.14)" }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={heroFanPlaceholderRef}
              src={mobileVideoReplacementSrc || DEFAULT_HERO_VIDEO_POSTER}
              alt=""
              aria-hidden
              decoding="async"
              fetchPriority="high"
              className="pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover will-change-[transform,object-position,opacity] [transform:translateZ(0)] [backface-visibility:hidden]"
              style={{ objectPosition: "18% center", transform: "translateZ(0) scale(1.14)", opacity: 1 }}
            />
          </>`;

if (src.includes(desktopVideoOld)) {
  src = src.replace(desktopVideoOld, desktopVideoNew);
}

if (!src.includes("mobileHeroFanPlaceholderRef")) {
  src = src.replace(
    `            ) : isMobileVideo && videoSrc ? (
              <video
                ref={mobileVideoRef}
                src={videoSrc}
                aria-label={mobileVideoReplacementAlt || undefined}`,
    `            ) : isMobileVideo && videoSrc ? (
              <>
              <video
                ref={mobileVideoRef}
                src={videoSrc}
                poster={mobileVideoReplacementSrc || DEFAULT_HERO_VIDEO_POSTER}
                aria-label={mobileVideoReplacementAlt || undefined}`,
  );

  src = src.replace(
    `                style={{
                  objectPosition: "92% center",
                  transform: "translateZ(0) scale(1.08)",
                }}
              />
            ) : mobileUsePlain ? null : (`,
    `                style={{
                  objectPosition: "92% center",
                  transform: "translateZ(0) scale(1.08)",
                }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={mobileHeroFanPlaceholderRef}
                src={mobileVideoReplacementSrc || DEFAULT_HERO_VIDEO_POSTER}
                alt=""
                aria-hidden
                decoding="async"
                fetchPriority="high"
                className="pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover will-change-[transform,object-position,opacity] [transform:translateZ(0)] [backface-visibility:hidden]"
                style={{ objectPosition: "92% center", transform: "translateZ(0) scale(1.08)", opacity: 1 }}
              />
              </>
            ) : mobileUsePlain ? null : (`,
  );
}

// applyScene(0) on mount should set placeholder opacity
if (!src.includes("heroFanPlaceholderOpacity(0)")) {
  src = src.replace(
    "    applyScene(0);\n",
    `    applyScene(0);
    if (isVideoMode) {
      const phOpacity = heroFanPlaceholderOpacity(0);
      for (const ph of [heroFanPlaceholderRef.current, mobileHeroFanPlaceholderRef.current]) {
        if (ph) ph.style.opacity = String(phOpacity);
      }
    }

`,
  );
}

fs.writeFileSync(FILE, src, "utf8");
new TextDecoder("utf-8", { fatal: true }).decode(fs.readFileSync(FILE));
console.log("OK patch-hero-fan-placeholder");
