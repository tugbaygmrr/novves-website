/**
 * tr/products.json -> {locale}/products.json (Turkish source, preserves locale shared block).
 *
 * Usage:
 *   node scripts/i18n-products-tr-to-locale.mjs --locale ar
 *   node scripts/i18n-products-tr-to-locale.mjs --locale ar --keys havaHareketi
 *   node scripts/i18n-products-tr-to-locale.mjs --locale ar --fresh
 */
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const DICT = path.join(ROOT, "src", "app", "[locale]", "dictionaries");

const LOCALE_TL = {
  ar: "ar",
  ur: "ur",
  ru: "ru",
  de: "de",
  fr: "fr",
  it: "it",
  es: "es",
  pl: "pl",
  az: "az",
  kk: "kk",
  tg: "tg",
  zh: "zh-CN",
  lt: "lt",
};

const GTX_DELAY_MS = Number(process.env.I18N_PRODUCTS_GTX_DELAY_MS) || 280;
const GTX_MAX = 1200;
const GTX_RETRIES = 8;

const SKIP_OBJECT_KEYS = new Set([
  "slug",
  "image",
  "href",
  "imageSrc",
  "code",
  "id",
  "theme",
  "icon",
  "iconVariant",
  "variant",
  "value",
]);

const args = process.argv.slice(2);
const locIdx = args.indexOf("--locale");
if (locIdx < 0 || !args[locIdx + 1]) {
  console.error("Usage: node scripts/i18n-products-tr-to-locale.mjs --locale ar[,ur,...] [--keys havaHareketi] [--fresh]");
  process.exit(1);
}
const TARGET_LOCALES = args[locIdx + 1].split(",").map((s) => s.trim()).filter(Boolean);
const keysIdx = args.indexOf("--keys");
const ONLY_KEYS =
  keysIdx >= 0
    ? new Set(
        (args[keysIdx + 1] ?? "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      )
    : null;
const FRESH = args.includes("--fresh");

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function shouldSkipString(s) {
  if (typeof s !== "string") return true;
  const t = s.trim();
  if (t.length === 0) return true;
  if (/^[\d\s+.,:/\-–—()%TL€$]+$/.test(t) && t.length < 80) return true;
  if (/^\/[a-z0-9\-\/]*$/i.test(t) && t.length < 160) return true;
  if (/^\+?\d[\d\s\-]+$/.test(t)) return true;
  if (t.includes("http://") || t.includes("https://")) return true;
  if (t.includes("@") && t.includes(".")) return true;
  if (/\.(jpg|png|webp|svg|pdf|jpeg)$/i.test(t)) return true;
  if (/^\/images\//.test(t)) return true;
  if (/^(DRAGONFLY|MARLIN|HOUND|TURTLE|TIGER|KOI|NAUTILUS|HERON|OWL|BEAR|DOLPHIN|HUMMINGBIRD|HAWK|LION|SCALLOP|REMORA|ROO|SENSE|CHICKEN|ALPACA|CARACAL|BUTTERFLY|FOX|ELEPHANT)$/i.test(t))
    return true;
  if (/^[A-Z][A-Z0-9\-]{2,24}$/.test(t) && !/[a-z?ü??öç]{4,}/i.test(t)) return true;
  if (/^PDF\b/i.test(t) || /^RFA\b/i.test(t)) return true;
  if (/^EN \d|^ISO \d|^F\d{3}/i.test(t)) return true;
  return false;
}

function checkpointPath(targetPath) {
  return targetPath.replace(/\.json$/i, "") + ".tr-to-locale.checkpoint.json";
}

function loadDoneKeys(cpPath) {
  if (!fs.existsSync(cpPath)) return new Set();
  try {
    return new Set(JSON.parse(fs.readFileSync(cpPath, "utf8")));
  } catch {
    return new Set();
  }
}

function saveDoneKeys(cpPath, set) {
  fs.writeFileSync(cpPath, JSON.stringify([...set], null, 2) + "\n", "utf8");
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
      if (!Array.isArray(data) || !Array.isArray(data[0])) throw new Error("gtx unexpected JSON");
      return data[0].map((seg) => (Array.isArray(seg) ? String(seg[0] ?? "") : "")).join("");
    } catch (e) {
      lastErr = e;
      console.error(`  gtx retry ${attempt + 1}/${GTX_RETRIES}`, String(e?.message ?? e).slice(0, 80));
    }
  }
  throw lastErr ?? new Error("gtx failed");
}

async function translateStr(str, tl, cache) {
  const ck = `${tl}:${str}`;
  if (cache.has(ck)) return cache.get(ck);
  const parts = chunkForGtx(str);
  const out = [];
  for (const p of parts) out.push(await translateGtxOne(p, tl));
  const joined = out.join("\n\n");
  cache.set(ck, joined);
  return joined;
}

async function mapLeaves(obj, keyName, translateText, cache) {
  if (typeof obj === "string") {
    if (SKIP_OBJECT_KEYS.has(keyName) || keyName === "name" || shouldSkipString(obj)) return obj;
    return translateText(obj, cache);
  }
  if (Array.isArray(obj)) {
    const out = [];
    for (const item of obj) out.push(await mapLeaves(item, keyName, translateText, cache));
    return out;
  }
  if (obj !== null && typeof obj === "object") {
    const out = {};
    for (const k of Object.keys(obj)) {
      out[k] = await mapLeaves(obj[k], k, translateText, cache);
    }
    return out;
  }
  return obj;
}

async function processLocale(locale) {
  const tl = LOCALE_TL[locale];
  if (!tl) {
    console.error("Unsupported locale:", locale);
    return;
  }

  const trPath = path.join(DICT, "tr", "products.json");
  const targetPath = path.join(DICT, locale, "products.json");
  const cpPath = checkpointPath(targetPath);

  if (!fs.existsSync(trPath)) {
    console.error("Missing", trPath);
    return;
  }

  if (FRESH && !ONLY_KEYS && fs.existsSync(cpPath)) {
    fs.unlinkSync(cpPath);
    console.error("Removed checkpoint", cpPath);
  }

  const trObj = JSON.parse(fs.readFileSync(trPath, "utf8"));
  let targetObj = {};
  if (fs.existsSync(targetPath)) {
    try {
      targetObj = JSON.parse(fs.readFileSync(targetPath, "utf8"));
    } catch {
      targetObj = {};
    }
  }

  if (targetObj.shared && trObj.shared) {
    targetObj.shared = targetObj.shared;
  }

  const cache = new Map();
  const translateText = (str, c) => translateStr(str, tl, c);
  const topKeys = ONLY_KEYS ? [...ONLY_KEYS].filter((k) => k in trObj) : Object.keys(trObj);
  const doneKeys = FRESH && !ONLY_KEYS ? new Set() : loadDoneKeys(cpPath);

  console.error(`[${locale}] tr->${tl} products.json | sections: ${topKeys.length}`);

  for (const key of topKeys) {
    if (key === "shared") {
      if (targetObj.shared) continue;
      targetObj.shared = await mapLeaves(trObj.shared, key, translateText, cache);
      continue;
    }
    if (!ONLY_KEYS && doneKeys.has(key)) {
      console.error("  skip (checkpoint):", key);
      continue;
    }
    if (!(key in trObj)) continue;
    console.error("  translating:", key);
    targetObj[key] = await mapLeaves(trObj[key], key, translateText, cache);
    fs.writeFileSync(targetPath, JSON.stringify(targetObj, null, 2) + "\n", "utf8");
    if (!ONLY_KEYS) {
      doneKeys.add(key);
      saveDoneKeys(cpPath, doneKeys);
    }
    console.error("  wrote after", key, "| cache:", cache.size);
  }

  fs.writeFileSync(targetPath, JSON.stringify(targetObj, null, 2) + "\n", "utf8");
  if (!ONLY_KEYS && fs.existsSync(cpPath)) fs.unlinkSync(cpPath);
  console.error(`[${locale}] done (${cache.size} strings)`);
}

for (const locale of TARGET_LOCALES) {
  await processLocale(locale);
}

console.error("All done.");
