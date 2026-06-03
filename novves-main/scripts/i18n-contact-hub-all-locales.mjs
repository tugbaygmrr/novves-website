/**
 * en/contact.json (iletisimHub + sosyalMedyaHub) → all site locales
 *
 *   node scripts/seed-contact-hub.mjs
 *   node scripts/i18n-contact-hub-all-locales.mjs
 *   node scripts/i18n-contact-hub-all-locales.mjs --locale de,fr --fresh
 */
import fs from "fs";
import path from "path";

const DICT = path.join(process.cwd(), "src", "app", "[locale]", "dictionaries");

const TARGET_LOCALES = {
  de: "de",
  fr: "fr",
  es: "es",
  it: "it",
  ru: "ru",
  ar: "ar",
  az: "az",
  kk: "kk",
  tg: "tg",
  zh: "zh-CN",
  ur: "ur",
  lt: "lt",
  pl: "pl",
};

const HUB_KEYS = ["iletisimHub", "sosyalMedyaHub"];
const GTX_DELAY_MS = Number(process.env.I18N_CONTACT_HUB_GTX_DELAY_MS) || 380;
const GTX_MAX = 1200;
const GTX_RETRIES = 8;

const args = process.argv.slice(2);
const locIdx = args.indexOf("--locale");
const ONLY =
  locIdx >= 0
    ? args[locIdx + 1]
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : null;
const FRESH = args.includes("--fresh");

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function shouldSkipString(s) {
  if (typeof s !== "string") return true;
  const t = s.trim();
  if (!t) return true;
  if (/^https?:\/\//i.test(t)) return true;
  if (/^\/[a-z0-9\-\/_.]*$/i.test(t) && t.length < 200) return true;
  if (/^\/images\//.test(t)) return true;
  if (/\.(png|jpg|webp|svg|mp4)$/i.test(t)) return true;
  if (/^\+?\d[\d\s\-()]+$/.test(t)) return true;
  if (t.includes("@") && t.includes(".")) return true;
  if (/^[\d\s+.,:/\-–—()%°kB]+$/i.test(t) && t.length < 40) return true;
  if (/^E3474F2B/i.test(t)) return true;
  if (/^NOVVES$/i.test(t)) return true;
  if (/^(hq|factory|service)$/i.test(t)) return true;
  if (/^(Instagram|LinkedIn|WhatsApp|Telegram)$/i.test(t)) return true;
  if (/^113\+$/.test(t)) return true;
  return false;
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

async function translateGtx(str, sl, tl) {
  const parts = chunkForGtx(str);
  const out = [];
  for (const piece of parts) {
    let lastErr;
    const urlBase = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(sl)}&tl=${encodeURIComponent(tl)}&dt=t&q=`;
    for (let attempt = 0; attempt < GTX_RETRIES; attempt++) {
      await sleep(attempt === 0 ? GTX_DELAY_MS : Math.min(16_000, 1400 * attempt));
      try {
        const res = await fetch(urlBase + encodeURIComponent(piece));
        const text = await res.text();
        if (!res.ok) throw new Error(`gtx HTTP ${res.status}`);
        const data = JSON.parse(text);
        out.push(
          data[0].map((seg) => (Array.isArray(seg) ? String(seg[0] ?? "") : "")).join(""),
        );
        break;
      } catch (e) {
        lastErr = e;
      }
    }
    if (out.length === 0 || out[out.length - 1] === undefined) throw lastErr ?? new Error("gtx failed");
  }
  return out.join("\n\n");
}

async function mapLeaves(obj, sl, tl, cache) {
  if (typeof obj === "string") {
    if (shouldSkipString(obj)) return obj;
    const key = `${sl}|${tl}|${obj}`;
    if (cache.has(key)) return cache.get(key);
    const translated = await translateGtx(obj, sl, tl);
    cache.set(key, translated);
    return translated;
  }
  if (Array.isArray(obj)) {
    const out = [];
    for (const item of obj) out.push(await mapLeaves(item, sl, tl, cache));
    return out;
  }
  if (obj !== null && typeof obj === "object") {
    const out = {};
    for (const k of Object.keys(obj)) {
      out[k] = await mapLeaves(obj[k], sl, tl, cache);
    }
    return out;
  }
  return obj;
}

function preserveHubMeta(target, source) {
  if (!source || !target) return;
  if (Array.isArray(source) && Array.isArray(target)) {
    for (let i = 0; i < source.length; i++) preserveHubMeta(target[i], source[i]);
    return;
  }
  if (typeof source !== "object" || typeof target !== "object") return;
  if (source.id) target.id = source.id;
  for (const k of Object.keys(source)) {
    if (source[k] && typeof source[k] === "object") preserveHubMeta(target[k], source[k]);
  }
}

function checkpointPath(locale) {
  return path.join(DICT, locale, "contact-hub.i18n.checkpoint.json");
}

function loadCheckpoint(locale) {
  const p = checkpointPath(locale);
  if (!fs.existsSync(p)) return new Set();
  try {
    return new Set(JSON.parse(fs.readFileSync(p, "utf8")));
  } catch {
    return new Set();
  }
}

function saveCheckpoint(locale, done) {
  fs.writeFileSync(checkpointPath(locale), JSON.stringify([...done], null, 2) + "\n", "utf8");
}

async function syncContactHub(locale) {
  const tl = TARGET_LOCALES[locale];
  if (!tl) throw new Error(`Unknown locale: ${locale}`);

  const sourcePath = path.join(DICT, "en", "contact.json");
  const targetPath = path.join(DICT, locale, "contact.json");
  const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
  const contact = JSON.parse(fs.readFileSync(targetPath, "utf8"));

  const done = FRESH ? new Set() : loadCheckpoint(locale);
  const cache = new Map();

  for (const hubKey of HUB_KEYS) {
    if (!FRESH && done.has(hubKey)) {
      console.error(`[${locale}] skip checkpoint:`, hubKey);
      continue;
    }
    if (!source[hubKey]) {
      console.error(`[${locale}] missing en.${hubKey}`);
      continue;
    }
    console.error(`[${locale}] translating`, hubKey, `(en→${tl})`);
    const translated = await mapLeaves(
      JSON.parse(JSON.stringify(source[hubKey])),
      "en",
      tl,
      cache,
    );
    preserveHubMeta(translated, source[hubKey]);
    contact[hubKey] = translated;
    fs.writeFileSync(targetPath, JSON.stringify(contact, null, 2) + "\n", "utf8");
    done.add(hubKey);
    saveCheckpoint(locale, done);
    console.error(`[${locale}] wrote`, hubKey, "| cache:", cache.size);
  }
  console.error(`[${locale}] contact hub done`);
}

const locales = ONLY ?? Object.keys(TARGET_LOCALES);
for (const locale of locales) {
  if (FRESH && fs.existsSync(checkpointPath(locale))) fs.unlinkSync(checkpointPath(locale));
  await syncContactHub(locale);
}

console.error("\nContact hub i18n complete.");
