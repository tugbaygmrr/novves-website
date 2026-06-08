import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const target = path.join(__dirname, "../src/components/scroll-video-section.tsx");

let s = fs.readFileSync(target, "utf8");
const before = s;

s = s.replace(
  /\n\s*poster=\{mobileVideoReplacementSrc \|\| DEFAULT_HERO_VIDEO_POSTER\}/g,
  "",
);

s = s.replace(
  /\nconst DEFAULT_HERO_VIDEO_POSTER = "\/images\/hero\/hero-poster\.jpg";\n/,
  "\n",
);

if (s === before) {
  console.error("No changes made");
  process.exit(1);
}

fs.writeFileSync(target, s, "utf8");
console.log("OK: poster removed");
console.log("poster attrs:", (s.match(/poster=/g) || []).length);
