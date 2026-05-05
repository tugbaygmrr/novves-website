/**
 * en/home.json içindeki sayfa chrome alanlarını diğer dillere kopyalar (tr/ru hariç — elle çeviri).
 * Çalıştır: node scripts/sync-home-chrome-from-en.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dictRoot = path.join(root, "src/app/[locale]/dictionaries");

const KEYS = [
  "pageChrome",
  "solutionCarouselByHref",
  "productCategoryBlurbs",
  "catalogPreview",
  "referencePreview",
  "certificatePreview",
  "companyProfileCards",
];

const SKIP = new Set(["en", "tr", "ru"]);

const en = JSON.parse(
  fs.readFileSync(path.join(dictRoot, "en/home.json"), "utf8"),
);

for (const locale of fs.readdirSync(dictRoot)) {
  if (!SKIP.has(locale)) {
    const p = path.join(dictRoot, locale, "home.json");
    if (!fs.existsSync(p)) continue;
    const h = JSON.parse(fs.readFileSync(p, "utf8"));
    for (const k of KEYS) {
      if (en[k] !== undefined) h[k] = structuredClone(en[k]);
    }
    fs.writeFileSync(p, JSON.stringify(h, null, 2) + "\n");
    console.log("merged", locale);
  }
}
