/**
 * Replace locale strings that still equal English while TR differs (parity EN paste).
 * Translates from en leaf via GTX; skips brand codes / URLs / numbers.
 *
 * Usage:
 *   node scripts/i18n-fix-stale-en-leaves.mjs --locale de,fr,ru
 *   node scripts/i18n-fix-stale-en-leaves.mjs --locale de --file products.json
 *   node scripts/i18n-fix-stale-en-leaves.mjs --dry-run
 */
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const DICT = path.join(ROOT, "src", "app", "[locale]", "dictionaries");

const LOCALE_TL = {
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

const GTX_DELAY_MS = Number(process.env.I18N_FIX_STALE_GTX_DELAY_MS) || 280;
const GTX_MAX = 1200;
const GTX_RETRIES = 8;

const args = process.argv.slice(2);
const locIdx = args.indexOf("--locale");
const TARGET_LOCALES = locIdx >= 0
  ? args[locIdx + 1].split(",").map((s) => s.trim()).filter(Boolean)
  : Object.keys(LOCALE_TL);

const fileIdx = args.indexOf("--file");
const ONLY_FILES = fileIdx >= 0
  ? args[fileIdx + 1].split(",").map((s) => (s.endsWith(".json") ? s : `${s}.json`))
  : null;

const DRY = args.includes("--dry-run");
const FRESH = args.includes("--fresh");

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function shouldSkipString(s) {
  if (typeof s !== "string") return true;
  const t = s.trim();
  if (t.length === 0) return true;
  if (/^[\d\s+.,:/\-ùù()%TLù$]+$/.test(t) && t.length < 80) return true;
  if (/^\/[a-z0-9\-\/]*$/i.test(t) && t.length < 160) return true;
  if (/^\+?\d[\d\s\-]+$/.test(t)) return true;
  if (t.includes("http://") || t.includes("https://")) return true;
  if (t.includes("@") && t.includes(".")) return true;
  if (/^E3474F2B/i.test(t)) return true;
  if (/\.(jpg|png|webp|svg|pdf)$/i.test(t)) return true;
  if (/^\/images\//.test(t)) return true;
  if (/^(DRAGONFLY|MARLIN|HOUND|TURTLE|TIGER|KOI|NAUTILUS|HERON|OWL|BEAR|DOLPHIN|HUMMINGBIRD|HAWK|LION|SCALLOP|REMORA)$/i.test(t))
    return true;
  if (/^[A-Z][A-Z0-9\-]{2,24}$/.test(t) && !/[a-z]{4,}/.test(t)) return true;
  return false;
}

function flattenLeaves(obj, prefix = "") {
  const out = new Map();
  if (typeof obj === "string") {
    if (prefix) out.set(prefix, obj);
    return out;
  }
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => {
      for (const [k, v] of flattenLeaves(item, `${prefix}[${i}]`)) out.set(k, v);
    });
    return out;
  }
  if (obj !== null && typeof obj === "object") {
    for (const key of Object.keys(obj)) {
      const p = prefix ? `${prefix}.${key}` : key;
      for (const [k, v] of flattenLeaves(obj[key], p)) out.set(k, v);
    }
  }
  return out;
}

function parsePath(pathStr) {
  const parts = [];
  pathStr.replace(/([^.\[\]]+)|\[(\d+)\]/g, (_, key, index) => {
    parts.push(index !== undefined ? Number(index) : key);
    return "";
  });
  return parts;
}

function setByPath(root, pathStr, value) {
  const parts = parsePath(pathStr);
  let cur = root;
  for (let i = 0; i < parts.length - 1; i++) {
    cur = cur[parts[i]];
  }
  cur[parts[parts.length - 1]] = value;
}

function checkpointPath(locale) {
  return path.join(DICT, locale, ".fix-stale-en-leaves.checkpoint.json");
}

function loadCheckpoint(locale) {
  const cp = checkpointPath(locale);
  if (!fs.existsSync(cp)) return new Set();
  try {
    return new Set(JSON.parse(fs.readFileSync(cp, "utf8")));
  } catch {
    return new Set();
  }
}

function saveCheckpoint(locale, set) {
  fs.writeFileSync(checkpointPath(locale), JSON.stringify([...set], null, 2) + "\n", "utf8");
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

async function translateGtx(enText, tl) {
  const urlBase = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${encodeURIComponent(tl)}&dt=t&q=`;
  const parts = chunkForGtx(enText);
  const out = [];
  for (const chunk of parts) {
    let lastErr;
    let ok = false;
    for (let attempt = 0; attempt < GTX_RETRIES; attempt++) {
      await sleep(attempt === 0 ? GTX_DELAY_MS : Math.min(20_000, 1500 * attempt));
      try {
        const res = await fetch(urlBase + encodeURIComponent(chunk));
        const text = await res.text();
        if (!res.ok) throw new Error(`gtx HTTP ${res.status}`);
        const data = JSON.parse(text);
        if (!Array.isArray(data) || !Array.isArray(data[0])) throw new Error("gtx bad JSON");
        out.push(data[0].map((seg) => (Array.isArray(seg) ? String(seg[0] ?? "") : "")).join(""));
        ok = true;
        break;
      } catch (e) {
        lastErr = e;
        console.error("gtx retry", attempt + 1, String(e?.message ?? e).slice(0, 80));
      }
    }
    if (!ok) throw lastErr ?? new Error("gtx failed");
  }
  return out.join("\n\n");
}

async function processLocale(locale) {
  const tl = LOCALE_TL[locale];
  if (!tl) {
    console.error("Unknown locale:", locale);
    return;
  }

  const trDir = path.join(DICT, "tr");
  const enDir = path.join(DICT, "en");
  const locDir = path.join(DICT, locale);
  const files = (ONLY_FILES ?? fs.readdirSync(enDir).filter((f) => f.endsWith(".json"))).sort();

  let done = FRESH ? new Set() : loadCheckpoint(locale);
  const cache = new Map();
  let translated = 0;
  let skipped = 0;

  for (const file of files) {
    const enPath = path.join(enDir, file);
    const trPath = path.join(trDir, file);
    const locPath = path.join(locDir, file);
    if (!fs.existsSync(enPath) || !fs.existsSync(trPath) || !fs.existsSync(locPath)) continue;

    const enObj = JSON.parse(fs.readFileSync(enPath, "utf8"));
    const trObj = JSON.parse(fs.readFileSync(trPath, "utf8"));
    const locObj = JSON.parse(fs.readFileSync(locPath, "utf8"));

    const enFlat = flattenLeaves(enObj);
    const trFlat = flattenLeaves(trObj);
    const locFlat = flattenLeaves(locObj);

    const stale = [];
    for (const [p, enVal] of enFlat) {
      if (shouldSkipString(enVal)) continue;
      const trVal = trFlat.get(p);
      const locVal = locFlat.get(p);
      if (trVal === undefined || locVal === undefined) continue;
      if (trVal === enVal) continue;
      if (locVal !== enVal) continue;
      stale.push({ p, enVal });
    }

    if (!stale.length) continue;
    console.error(`${locale}/${file}: ${stale.length} stale EN leaves`);

    for (const { p, enVal } of stale) {
      const cpKey = `${file}|${p}`;
      if (done.has(cpKey)) {
        skipped++;
        continue;
      }
      if (DRY) {
        console.log(`[dry] ${locale} ${cpKey}: ${enVal.slice(0, 70)}ù`);
        continue;
      }
      let out = cache.get(enVal);
      if (!out) {
        out = await translateGtx(enVal, tl);
        cache.set(enVal, out);
      }
      setByPath(locObj, p, out);
      fs.writeFileSync(locPath, JSON.stringify(locObj, null, 2) + "\n", "utf8");
      done.add(cpKey);
      saveCheckpoint(locale, done);
      translated++;
      if (translated % 10 === 0) {
        console.error(`${locale}: ${translated} translated (cache ${cache.size})`);
      }
    }
  }

  console.error(`${locale} done ù translated ${translated}, checkpoint-skipped ${skipped}`);
}

for (const locale of TARGET_LOCALES) {
  await processLocale(locale);
}

console.error("All locales finished.");
