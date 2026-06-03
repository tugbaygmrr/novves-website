/**
 * en/tr corporate.json → bizKimiz tüm dillere (yapı + çeviri, icon/image/href korunur).
 * node scripts/i18n-biz-kimiz-all-locales.mjs
 * node scripts/i18n-biz-kimiz-all-locales.mjs --locale de,fr
 */
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const DICT = path.join(ROOT, "src", "app", "[locale]", "dictionaries");

/** en kaynak (çoğu dil); tg/kk için tr kaynak */
const EN_LOCALES = ["ar", "az", "de", "es", "fr", "it", "ru", "pl", "lt", "ur", "zh"];
const TR_LOCALES = ["kk", "tg"];

const TL = {
  ar: "ar",
  az: "az",
  de: "de",
  es: "es",
  fr: "fr",
  it: "it",
  ru: "ru",
  pl: "pl",
  lt: "lt",
  ur: "ur",
  zh: "zh-CN",
  kk: "kk",
  tg: "tg",
};

const GTX_DELAY_MS = 280;
const GTX_MAX = 1200;
const GTX_RETRIES = 6;

const args = process.argv.slice(2);
const locIdx = args.indexOf("--locale");
const ONLY =
  locIdx >= 0
    ? args[locIdx + 1]
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : null;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function shouldSkipString(s) {
  if (typeof s !== "string") return true;
  const t = s.trim();
  if (!t) return true;
  if (/^\/[a-z0-9\-\/]*$/i.test(t)) return true;
  if (/^\/images\//.test(t)) return true;
  if (/\.(webp|png|jpg|svg)$/i.test(t)) return true;
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
      let br = slice.lastIndexOf(". ");
      if (br < 40) br = slice.lastIndexOf("\n");
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
      await sleep(attempt === 0 ? GTX_DELAY_MS : 1500 * attempt);
      try {
        const res = await fetch(urlBase + encodeURIComponent(piece));
        const text = await res.text();
        if (!res.ok) throw new Error(`gtx HTTP ${res.status}`);
        const data = JSON.parse(text);
        out.push(data[0].map((seg) => (Array.isArray(seg) ? String(seg[0] ?? "") : "")).join(""));
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

function preserveMeta(translated, source) {
  if (source.valueCards && translated.valueCards) {
    for (let i = 0; i < source.valueCards.length; i++) {
      if (translated.valueCards[i] && source.valueCards[i]) {
        translated.valueCards[i].icon = source.valueCards[i].icon;
      }
    }
  }
  if (source.services && translated.services) {
    for (let i = 0; i < source.services.length; i++) {
      if (translated.services[i] && source.services[i]) {
        translated.services[i].icon = source.services[i].icon;
      }
    }
  }
  if (source.activityFields && translated.activityFields) {
    for (let i = 0; i < source.activityFields.length; i++) {
      const s = source.activityFields[i];
      const t = translated.activityFields[i];
      if (!s || !t) continue;
      t.image = s.image;
      t.href = s.href;
      t.reverse = s.reverse;
    }
  }
  return translated;
}

async function syncLocale(locale) {
  const tl = TL[locale];
  if (!tl) {
    console.warn("skip unknown locale:", locale);
    return;
  }
  const fromTr = TR_LOCALES.includes(locale);
  const sourcePath = path.join(DICT, fromTr ? "tr" : "en", "corporate.json");
  const targetPath = path.join(DICT, locale, "corporate.json");
  const sl = fromTr ? "tr" : "en";

  const sourceRoot = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
  const source = sourceRoot.bizKimiz;
  if (!source) throw new Error(`Missing bizKimiz in ${sourcePath}`);

  const targetRoot = fs.existsSync(targetPath)
    ? JSON.parse(fs.readFileSync(targetPath, "utf8"))
    : {};

  console.error(`\n[${locale}] translating bizKimiz (${sl} → ${tl}) …`);
  const cache = new Map();
  let translated = await mapLeaves(JSON.parse(JSON.stringify(source)), sl, tl, cache);
  translated = preserveMeta(translated, source);

  targetRoot.bizKimiz = translated;
  fs.writeFileSync(targetPath, JSON.stringify(targetRoot, null, 2) + "\n", "utf8");
  console.error(`[${locale}] ok — ${cache.size} strings`);
}

const locales = ONLY ?? [...EN_LOCALES, ...TR_LOCALES];
for (const locale of locales) {
  await syncLocale(locale);
}
console.error("\nDone — bizKimiz synced for:", locales.join(", "));
