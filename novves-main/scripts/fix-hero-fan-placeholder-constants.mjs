import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const FILE = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "src/components/scroll-video-section.tsx",
);

let s = fs.readFileSync(FILE, "utf8");

if (!s.includes("const DEFAULT_HERO_VIDEO_POSTER")) {
  s = s.replace(
    "/** Hero MP4 kapak � lazy/preload oncesi bos siyah kutu olmasin */\n\n",
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

if (!s.includes("const phOpacity = heroFanPlaceholderOpacity(progress)")) {
  s = s.replace(
    "      if (isVideoMode) {\n        const v = videoRef.current;",
    `      if (isVideoMode) {
        const phOpacity = heroFanPlaceholderOpacity(progress);
        for (const ph of [heroFanPlaceholderRef.current, mobileHeroFanPlaceholderRef.current]) {
          if (ph) ph.style.opacity = String(phOpacity);
        }
        const v = videoRef.current;`,
  );
}

fs.writeFileSync(FILE, s, "utf8");
new TextDecoder("utf-8", { fatal: true }).decode(fs.readFileSync(FILE));
console.log("OK fix-hero-fan-placeholder-constants");
