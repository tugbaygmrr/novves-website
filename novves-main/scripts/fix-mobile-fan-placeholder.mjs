import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const FILE = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "src/components/scroll-video-section.tsx",
);

let s = fs.readFileSync(FILE, "utf8");

if (!s.includes("ref={mobileHeroFanPlaceholderRef}")) {
  s = s.replace(
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

  s = s.replace(
    `                style={{
                  objectPosition: "92% center",
                  transform: "translateZ(0) scale(1.08)",
                }}
              />
            ) : mobileUsePlain ? null : (
              <Image
                src={finalFrameSrc}`,
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
            ) : mobileUsePlain ? null : (
              <Image
                src={finalFrameSrc}`,
  );
}

fs.writeFileSync(FILE, s, "utf8");
new TextDecoder("utf-8", { fatal: true }).decode(fs.readFileSync(FILE));
console.log("OK fix-mobile-fan-placeholder");
