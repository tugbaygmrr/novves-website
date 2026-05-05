/**
 * en/*.json → lt/*.json (JSON structure preserved, leaf strings → Lithuanian).
 *
 * Usage:
 *   node scripts/i18n-en-to-lt.mjs
 *   node scripts/i18n-en-to-lt.mjs --file solutions --fresh
 *
 * Env:
 *   I18N_EN_TO_LT_ENGINE=gtx|mymemory|google|both   (default: gtx)
 *   I18N_EN_TO_LT_GTX_DELAY_MS, I18N_EN_TO_LT_GTX_MAX (~1200)
 *   I18N_EN_TO_LT_DELAY_MS, I18N_EN_TO_LT_COOLDOWN_MS
 *   I18N_EN_TO_LT_MM_DELAY_MS
 *
 * npm: npm run i18n:en-to-lt
 *
 * If `lt` still shows German: you likely ran `fill-dict-from-donor-when-equals-en` (de) or
 * interrupted a prior run — use `npm run i18n:en-to-lt -- --fresh` to rebuild all sections
 * from English (removes checkpoints).
 */
import fs from "fs";
import path from "path";
import { translate } from "@vitalets/google-translate-api";

const ROOT = process.cwd();
const DICT = path.join(ROOT, "src", "app", "[locale]", "dictionaries");
const ENGINE = (process.env.I18N_EN_TO_LT_ENGINE || "gtx").toLowerCase();
const DELAY_MS = Number(process.env.I18N_EN_TO_LT_DELAY_MS) || 3200;
const COOLDOWN_ON_429_MS = Number(process.env.I18N_EN_TO_LT_COOLDOWN_MS) || 120_000;
const MYMEMORY_DELAY_MS = Number(process.env.I18N_EN_TO_LT_MM_DELAY_MS) || 450;
const MYMEMORY_MAX = 480;
const GTX_DELAY_MS = Number(process.env.I18N_EN_TO_LT_GTX_DELAY_MS) || 320;
const GTX_MAX = Number(process.env.I18N_EN_TO_LT_GTX_MAX) || 1200;
const GTX_RETRIES = 8;
const MYMEMORY_QUOTA_ERR = "MYMEMORY_QUOTA_EXCEEDED";
const RETRIES = 12;

const TL = "lt";

const args = process.argv.slice(2);
const fileIdx = args.indexOf("--file");
const ONE_FILE = fileIdx >= 0 ? args[fileIdx + 1] : null;
const FRESH = args.includes("--fresh");
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

const DEFAULT_FILES = [
  "common.json",
  "home.json",
  "solutions.json",
  "products.json",
  "services.json",
  "technical.json",
  "corporate.json",
  "contact.json",
  "sustainability.json",
  "kvkk.json",
];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function fixBrand(s) {
  return s;
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
  if (/^E3474F2B/i.test(t)) return true;
  if (/\.(jpg|png|webp|svg|pdf)$/i.test(t)) return true;
  if (/^\/images\//.test(t)) return true;
  if (/^(DRAGONFLY|MARLIN|HOUND|TURTLE|TIGER|KOI|NAUTILUS|HERON|OWL|BEAR|DOLPHIN|HUMMINGBIRD)$/i.test(t)) return true;
  if (/^[A-Z][A-Z0-9\-]{2,20}$/.test(t) && !/[а-яәіңғүұқөһ]/i.test(t) && !/[a-z]{4,}/.test(t)) return true;
  return false;
}

function checkpointPathFor(ltPath) {
  return ltPath.replace(/\.json$/i, "") + ".en-to-lt.checkpoint.json";
}

function loadDoneKeys(cpPath) {
  if (!fs.existsSync(cpPath)) return new Set();
  try {
    const arr = JSON.parse(fs.readFileSync(cpPath, "utf8"));
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

function saveDoneKeys(cpPath, set) {
  fs.writeFileSync(cpPath, JSON.stringify([...set], null, 2) + "\n", "utf8");
}

function chunkForMyMemory(str) {
  if (str.length <= MYMEMORY_MAX) return [str];
  const chunks = [];
  let i = 0;
  while (i < str.length) {
    let end = Math.min(i + MYMEMORY_MAX, str.length);
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

async function translateGtxOne(chunk) {
  let lastErr;
  const urlBase = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${encodeURIComponent(TL)}&dt=t&q=`;
  for (let attempt = 0; attempt < GTX_RETRIES; attempt++) {
    await sleep(attempt === 0 ? GTX_DELAY_MS : Math.min(20_000, 1800 * attempt));
    try {
      const res = await fetch(urlBase + encodeURIComponent(chunk));
      const text = await res.text();
      if (!res.ok) throw new Error(`gtx HTTP ${res.status}`);
      const data = JSON.parse(text);
      if (!Array.isArray(data) || !Array.isArray(data[0])) throw new Error("gtx unexpected JSON");
      const raw = data[0].map((seg) => (Array.isArray(seg) ? String(seg[0] ?? "") : "")).join("");
      return fixBrand(raw);
    } catch (e) {
      lastErr = e;
      console.error(
        "gtx retry",
        attempt + 1,
        "/",
        GTX_RETRIES,
        String(e?.message ?? e).slice(0, 100),
      );
    }
  }
  throw lastErr ?? new Error("gtx failed");
}

async function translateGtxStr(str) {
  const parts = chunkForGtx(str);
  const out = [];
  for (const p of parts) {
    out.push(await translateGtxOne(p));
  }
  return out.join("\n\n");
}

async function translateMyMemoryOne(chunk) {
  await sleep(MYMEMORY_DELAY_MS);
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(chunk)}&langpair=en|lt`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.quotaFinished) throw new Error("MyMemory quota finished");
  if (Number(data.responseStatus) !== 200) {
    const detail = data.responseDetails || "";
    throw new Error(detail || `MyMemory status ${data.responseStatus}`);
  }
  const raw = String(data.responseData?.translatedText ?? "");
  if (/MYMEMORY WARNING|YOU USED ALL AVAILABLE FREE TRANSLATIONS/i.test(raw)) {
    const err = new Error(MYMEMORY_QUOTA_ERR + ": " + raw.slice(0, 200));
    err.fatalQuota = true;
    throw err;
  }
  return fixBrand(raw);
}

async function translateMyMemoryStr(str) {
  const parts = chunkForMyMemory(str);
  const out = [];
  for (const p of parts) {
    out.push(await translateMyMemoryOne(p));
  }
  return out.join("\n\n");
}

async function translateGoogleStr(str, cache) {
  let lastErr;
  for (let attempt = 0; attempt < RETRIES; attempt++) {
    const wait =
      attempt === 0 ? DELAY_MS : Math.min(45_000, 2500 * attempt + Math.floor(Math.random() * 800));
    await sleep(wait);
    try {
      const res = await translate(str, { from: "en", to: "lt" });
      const out = typeof res === "string" ? res : res.text;
      const fixed = fixBrand(out);
      cache.set(str, fixed);
      return fixed;
    } catch (e) {
      lastErr = e;
      const msg = String(e.message ?? e);
      const isRate = msg.includes("Too Many") || msg.includes("429");
      if (!isRate) {
        console.error("Translate fail:", str.slice(0, 60), msg);
        return str;
      }
      console.error("429/cooldown, sleeping", COOLDOWN_ON_429_MS / 1000, "s …");
      await sleep(COOLDOWN_ON_429_MS);
    }
  }
  console.error("Google abandoned:", str.slice(0, 60), lastErr?.message);
  throw lastErr ?? new Error("google translate failed");
}

async function translateText(str, cache) {
  if (shouldSkipString(str)) return str;
  if (cache.has(str)) return cache.get(str);

  try {
    let out;
    if (ENGINE === "gtx") {
      out = await translateGtxStr(str);
    } else if (ENGINE === "google") {
      out = await translateGoogleStr(str, cache);
    } else if (ENGINE === "mymemory") {
      out = await translateMyMemoryStr(str);
    } else if (ENGINE === "both") {
      try {
        out = await translateGtxStr(str);
      } catch {
        try {
          out = await translateGoogleStr(str, cache);
        } catch {
          out = await translateMyMemoryStr(str);
        }
      }
    } else {
      console.error("Unknown I18N_EN_TO_LT_ENGINE:", ENGINE, "— use gtx|mymemory|google|both");
      out = await translateGtxStr(str);
    }
    cache.set(str, out);
    return out;
  } catch (e) {
    const msg = String(e?.message ?? e);
    if (e?.fatalQuota || msg.includes(MYMEMORY_QUOTA_ERR)) {
      console.error("MyMemory quota — stopping.");
      console.error(msg.slice(0, 300));
      process.exit(1);
    }
    console.error("Translate error:", str.slice(0, 50), msg);
    return str;
  }
}

async function mapLeaves(obj, cache) {
  if (typeof obj === "string") return translateText(obj, cache);
  if (Array.isArray(obj)) {
    const out = [];
    for (const item of obj) out.push(await mapLeaves(item, cache));
    return out;
  }
  if (obj !== null && typeof obj === "object") {
    const out = {};
    for (const k of Object.keys(obj)) {
      out[k] = await mapLeaves(obj[k], cache);
    }
    return out;
  }
  return obj;
}

async function processFile(name) {
  const enPath = path.join(DICT, "en", name);
  const ltPath = path.join(DICT, "lt", name);
  const cpPath = checkpointPathFor(ltPath);

  if (!fs.existsSync(enPath)) {
    console.error("Missing", enPath);
    return;
  }

  if (FRESH && !ONLY_KEYS) {
    if (fs.existsSync(cpPath)) fs.unlinkSync(cpPath);
    console.error("Fresh run: removed checkpoint", cpPath);
  }

  console.error(
    "Translating",
    name,
    "engine=",
    ENGINE,
    ONLY_KEYS ? `--keys ${[...ONLY_KEYS].join(",")}` : "",
    "…",
  );
  const enObj = JSON.parse(fs.readFileSync(enPath, "utf8"));
  const cache = new Map();

  let ltObj = {};
  if ((!FRESH || ONLY_KEYS) && fs.existsSync(ltPath)) {
    try {
      ltObj = JSON.parse(fs.readFileSync(ltPath, "utf8"));
    } catch {
      ltObj = {};
    }
  }

  const topKeys = ONLY_KEYS ? [...ONLY_KEYS].filter((k) => k in enObj) : Object.keys(enObj);
  if (ONLY_KEYS) {
    const missing = [...ONLY_KEYS].filter((k) => !(k in enObj));
    if (missing.length) console.error("Unknown --keys (not in en):", missing.join(", "));
  }

  const doneKeys = FRESH && !ONLY_KEYS ? new Set() : loadDoneKeys(cpPath);

  if (!FRESH && !ONLY_KEYS && fs.existsSync(cpPath) && doneKeys.size > 0) {
    console.error("Continuing from checkpoint:", [...doneKeys].join(", "));
  }

  for (const key of topKeys) {
    if (!ONLY_KEYS && doneKeys.has(key)) {
      console.error("Skip (checkpoint):", key);
      continue;
    }
    if (!(key in enObj)) continue;
    console.error("Translating section:", key, "…");
    ltObj[key] = await mapLeaves(enObj[key], cache);
    fs.writeFileSync(ltPath, JSON.stringify(ltObj, null, 2) + "\n", "utf8");
    if (!ONLY_KEYS) {
      doneKeys.add(key);
      saveDoneKeys(cpPath, doneKeys);
    }
    console.error("Wrote", ltPath, "after", key, "| cache size:", cache.size);
  }

  console.error("Finished", name, "unique strings cached:", cache.size);
}

const files = ONE_FILE ? [`${ONE_FILE.replace(/\.json$/, "")}.json`] : DEFAULT_FILES;

for (const f of files) {
  await processFile(f);
}

console.error("Done.");
