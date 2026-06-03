/**
 * tr/solutions.json → library.bannerDescription for all locales.
 *
 * Usage:
 *   node scripts/i18n-banner-descriptions.mjs
 *   node scripts/i18n-banner-descriptions.mjs --locale en,de,fr
 *   node scripts/i18n-banner-descriptions.mjs --dry-run
 */
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const DICT = path.join(ROOT, "src", "app", "[locale]", "dictionaries");
const GTX_DELAY_MS = Number(process.env.I18N_BANNER_GTX_DELAY_MS) || 400;
const GTX_MAX = 1200;
const GTX_RETRIES = 6;

/** Google Translate `tl` codes */
const TARGET_LOCALES = {
  en: "en",
  ru: "ru",
  ar: "ar",
  de: "de",
  it: "it",
  fr: "fr",
  az: "az",
  kk: "kk",
  tg: "tg",
  es: "es",
  zh: "zh-CN",
  ur: "ur",
  lt: "lt",
  pl: "pl",
};

const args = process.argv.slice(2);
const DRY = args.includes("--dry-run");
const locIdx = args.indexOf("--locale");
const ONLY_LOCALES =
  locIdx >= 0
    ? new Set(
        (args[locIdx + 1] ?? "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      )
    : null;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function chunkForGtx(str) {
  if (str.length <= GTX_MAX) return [str];
  const chunks = [];
  let i = 0;
  while (i < str.length) {
    let end = Math.min(i + GTX_MAX, str.length);
    if (end < str.length) {
      const slice = str.slice(i, end);
      let br = slice.lastIndexOf("\n\n");
      if (br < 40) br = slice.lastIndexOf("\n");
      if (br < 40) br = slice.lastIndexOf(". ");
      if (br > 60) end = i + br + (slice[br] === "." ? 2 : 1);
    }
    const piece = str.slice(i, end).trim();
    if (piece) chunks.push(piece);
    i = end;
  }
  return chunks.length ? chunks : [str];
}

async function translateGtxOne(chunk, tl) {
  let lastErr;
  const urlBase = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=tr&tl=${encodeURIComponent(tl)}&dt=t&q=`;
  for (let attempt = 0; attempt < GTX_RETRIES; attempt++) {
    await sleep(attempt === 0 ? GTX_DELAY_MS : Math.min(15_000, 1500 * attempt));
    try {
      const res = await fetch(urlBase + encodeURIComponent(chunk));
      const text = await res.text();
      if (!res.ok) throw new Error(`gtx HTTP ${res.status}`);
      const data = JSON.parse(text);
      if (!Array.isArray(data) || !Array.isArray(data[0]))
        throw new Error("gtx unexpected JSON");
      return data[0]
        .map((seg) => (Array.isArray(seg) ? String(seg[0] ?? "") : ""))
        .join("");
    } catch (e) {
      lastErr = e;
      console.error(`  gtx retry ${attempt + 1}/${GTX_RETRIES}`, String(e?.message ?? e).slice(0, 80));
    }
  }
  throw lastErr ?? new Error("gtx failed");
}

async function translateStr(str, tl, cache) {
  if (cache.has(`${tl}:${str}`)) return cache.get(`${tl}:${str}`);
  const parts = chunkForGtx(str);
  const out = [];
  for (const p of parts) {
    out.push(await translateGtxOne(p, tl));
  }
  const joined = out.join("\n\n");
  cache.set(`${tl}:${str}`, joined);
  return joined;
}

function collectBannerDescriptions(trSolutions) {
  const map = {};
  for (const key of Object.keys(trSolutions)) {
    const desc = trSolutions[key]?.library?.bannerDescription;
    if (typeof desc === "string" && desc.trim()) map[key] = desc;
  }
  return map;
}

function insertBannerDescription(localeJson, key, text) {
  const entry = localeJson[key];
  if (!entry || typeof entry !== "object") return false;
  if (!entry.library || typeof entry.library !== "object") {
    entry.library = { heroBadge: null, sidebar: { components: [], related: [] } };
  }
  entry.library.bannerDescription = text;
  return true;
}

async function main() {
  const trPath = path.join(DICT, "tr", "solutions.json");
  const trSolutions = JSON.parse(fs.readFileSync(trPath, "utf8"));
  const banners = collectBannerDescriptions(trSolutions);
  const keys = Object.keys(banners);
  console.log(`TR banner descriptions: ${keys.length} solutions`);

  const locales = Object.keys(TARGET_LOCALES).filter(
    (loc) => !ONLY_LOCALES || ONLY_LOCALES.has(loc),
  );

  const cache = new Map();

  for (const loc of locales) {
    const tl = TARGET_LOCALES[loc];
    const outPath = path.join(DICT, loc, "solutions.json");
    if (!fs.existsSync(outPath)) {
      console.warn("Skip missing", outPath);
      continue;
    }

    const cpPath = outPath.replace(/\.json$/i, "") + ".banner-desc.checkpoint.json";
    let done = new Set();
    if (fs.existsSync(cpPath)) {
      try {
        done = new Set(JSON.parse(fs.readFileSync(cpPath, "utf8")));
      } catch {
        done = new Set();
      }
    }

    const localeJson = JSON.parse(fs.readFileSync(outPath, "utf8"));
    console.log(`\n[${loc}] → ${tl}`);

    for (const key of keys) {
      if (done.has(key)) {
        console.log(`  skip (checkpoint) ${key}`);
        continue;
      }
      const src = banners[key];
      console.log(`  translate ${key} (${src.length} chars)`);
      let translated = src;
      if (!DRY) {
        translated = await translateStr(src, tl, cache);
      }
      if (!insertBannerDescription(localeJson, key, translated)) {
        console.warn(`  missing entry ${key} in ${loc}/solutions.json`);
        continue;
      }
      done.add(key);
      if (!DRY) {
        fs.writeFileSync(cpPath, JSON.stringify([...done], null, 2));
      }
    }

    if (!DRY) {
      fs.writeFileSync(outPath, JSON.stringify(localeJson, null, 2) + "\n");
      if (fs.existsSync(cpPath)) fs.unlinkSync(cpPath);
      console.log(`  wrote ${outPath}`);
    }
  }

  console.log("\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
