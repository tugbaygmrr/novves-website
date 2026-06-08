#!/usr/bin/env node
/** Kapak = poster overlay; scroll = fan-frame remap (no 40% static hold). */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const FILE = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src/components/scroll-video-section.tsx");
let src = fs.readFileSync(FILE, "utf8");

const NEW_CONSTANTS = `/** MP4 ilk ~40% = AHU box; kapak poster overlay, scroll fan karesinden remap. */
const HERO_VIDEO_FAN_START = 0.4;
const HERO_POSTER_FADE_END = 0.05;

function mapHeroVideoTime(progress: number): number {
  return HERO_VIDEO_FAN_START + progress * (1 - HERO_VIDEO_FAN_START);
}

function heroPosterOverlayOpacity(progress: number): number {
  if (progress <= 0) return 1;
  if (progress >= HERO_POSTER_FADE_END) return 0;
  return 1 - progress / HERO_POSTER_FADE_END;
}

`;

src = src.replace(
  /\/\*\* MP4[\s\S]*?function heroPosterOverlayOpacity\(progress: number\): number \{[\s\S]*?\}\n\n/,
  NEW_CONSTANTS
);

src = src.replace(
  `      if (isVideoMode) {
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
      }`,
  `      if (isVideoMode && progress > 0) {
        const v = videoRef.current;
        if (v && v.readyState >= 1) {
          const d = v.duration;
          if (Number.isFinite(d) && d > 0.05) {
            if (prefersReducedMotion) {
              const scrubP = mapHeroVideoTime(progress);
              const step = Math.round(scrubP * (DESKTOP_VIDEO_SCRUB_STEPS - 1));
              if (step !== lastDesktopVideoStep) {
                lastDesktopVideoStep = step;
                scrubVideoTo(v, scrubP * (d - 0.001), true);
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
      }`
);

fs.writeFileSync(FILE, src, "utf8");
new TextDecoder("utf-8", { fatal: true }).decode(fs.readFileSync(FILE));
console.log("OK patch-hero-scroll-sync");
