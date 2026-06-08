#!/usr/bin/env node
/** Restore scroll-video-section.tsx UTF-8 from git + admin preview attrs only. */
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const REPO = path.join(ROOT, "..");
const REL = "src/components/scroll-video-section.tsx";

function gitShow(rel) {
  return execSync(`git show HEAD:novves-main/${rel}`, { cwd: REPO, encoding: "utf8" });
}

let src = gitShow(REL);

src = src.replace(
  "            poster={mobileVideoReplacementSrc || DEFAULT_HERO_VIDEO_POSTER}",
  "            poster={DEFAULT_HERO_VIDEO_POSTER}"
);

src = src.replace(
  "        ref={stickyShellRef}\n        className=\"sticky top-0 h-screen w-full overflow-hidden [contain:layout]\"",
  "        ref={stickyShellRef}\n        data-admin-preview=\"hero-viewport\"\n        className=\"sticky top-0 h-screen w-full overflow-hidden [contain:layout]\""
);

src = src.replace(
  "              ref={startCardSurfaceRef}\n              className=\"group relative flex h-full w-full items-start overflow-visible pb-8 pt-0 md:items-center lg:items-start lg:pt-[clamp(9.5rem,25vh,15rem)] [transform:translateZ(0)]\"",
  "              ref={startCardSurfaceRef}\n              data-admin-preview=\"hero-start\"\n              className=\"group relative flex h-full w-full items-start overflow-visible pb-8 pt-0 md:items-center lg:items-start lg:pt-[clamp(9.5rem,25vh,15rem)] [transform:translateZ(0)]\""
);

src = src.replace(
  "            ref={endCardRef}\n            className=\"pointer-events-none absolute inset-y-0 right-0 z-20 hidden items-center pt-[130px] lg:flex\"",
  "            ref={endCardRef}\n            data-admin-preview=\"hero-end-wrap\"\n            className=\"pointer-events-none absolute inset-y-0 right-0 z-20 hidden items-center pt-[130px] lg:flex\""
);

src = src.replace(
  "                ref={endCardSurfaceRef}\n                className=\"relative overflow-hidden rounded-[2rem] border border-white/8 bg-[#0f1d33]/95 px-8 py-7 shadow-[0_18px_48px_-28px_rgba(0,0,0,0.55),0_0_96px_-12px_rgba(15,29,51,0.55)] sm:px-9 sm:py-8 [transform:translateZ(0)]\"",
  "                ref={endCardSurfaceRef}\n                data-admin-preview=\"hero-end\"\n                className=\"relative overflow-hidden rounded-[2rem] border border-white/8 bg-[#0f1d33]/95 px-8 py-7 shadow-[0_18px_48px_-28px_rgba(0,0,0,0.55),0_0_96px_-12px_rgba(15,29,51,0.55)] sm:px-9 sm:py-8 [transform:translateZ(0)]\""
);

const file = path.join(ROOT, REL);
fs.writeFileSync(file, src, "utf8");
new TextDecoder("utf-8", { fatal: true }).decode(fs.readFileSync(file));
console.log("OK", REL);
