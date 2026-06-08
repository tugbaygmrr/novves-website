/**
 * Translate partnerlerimiz (heroStats, partnerRecords, partnerList) from EN ? all locales.
 * Keeps existing breadcrumb/title/heroLead per locale.
 *
 *   node scripts/i18n-partnerlerimiz-translate.mjs
 *   node scripts/i18n-partnerlerimiz-translate.mjs --locale de,fr
 */
import fs from "fs";
import path from "path";

const DICT = path.join(process.cwd(), "src", "app", "[locale]", "dictionaries");

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

const GTX_DELAY_MS = Number(process.env.I18N_PARTNER_GTX_DELAY_MS) || 350;
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
    : Object.keys(LOCALE_TL);

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function shouldSkipString(s) {
  if (typeof s !== "string") return true;
  const t = s.trim();
  if (!t) return true;
  if (/^https?:\/\//i.test(t)) return true;
  if (/^\/[a-z0-9\-\/_.]*$/i.test(t) && t.length < 200) return true;
  if (/^NOVVES$/i.test(t)) return true;
  if (/^TR \+ Global$/i.test(t)) return true;
  if (/^[\d\s+.,:/\-��()%]+$/i.test(t) && t.length < 20) return true;
  if (/MMSC|Kazema|VentDelux|Sanly Gala|WLL|LLP|Pvt\. Ltd\./i.test(t) && t.length < 120) return true;
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
      if (br < 40) br = slice.lastIndexOf(", ");
      if (br > 60) end = i + br + 2;
    }
    chunks.push(str.slice(i, end).trim());
    i = end;
  }
  return chunks.length ? chunks : [str];
}

async function translateGtxOne(chunk, tl) {
  let lastErr;
  const urlBase = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${encodeURIComponent(tl)}&dt=t&q=`;
  for (let attempt = 0; attempt < GTX_RETRIES; attempt++) {
    await sleep(attempt === 0 ? GTX_DELAY_MS : Math.min(15_000, 1500 * attempt));
    try {
      const res = await fetch(urlBase + encodeURIComponent(chunk));
      const text = await res.text();
      if (!res.ok) throw new Error(`gtx HTTP ${res.status}`);
      const data = JSON.parse(text);
      return data[0].map((seg) => String(seg[0] ?? "")).join("");
    } catch (e) {
      lastErr = e;
      console.error("  gtx retry", attempt + 1, String(e?.message ?? e).slice(0, 80));
    }
  }
  throw lastErr ?? new Error("gtx failed");
}

async function translateGtxStr(str, tl) {
  const parts = chunkForGtx(str);
  const out = [];
  for (const p of parts) out.push(await translateGtxOne(p, tl));
  return out.join(" ");
}

function makeTranslator(tl) {
  const cache = new Map();
  return async function translateText(str) {
    if (shouldSkipString(str)) return str;
    if (cache.has(str)) return cache.get(str);
    const out = await translateGtxStr(str, tl);
    cache.set(str, out);
    return out;
  };
}

async function mapLeaves(obj, translateText) {
  if (typeof obj === "string") return translateText(obj);
  if (Array.isArray(obj)) {
    const out = [];
    for (const item of obj) out.push(await mapLeaves(item, translateText));
    return out;
  }
  if (obj !== null && typeof obj === "object") {
    const out = {};
    for (const k of Object.keys(obj)) {
      out[k] = await mapLeaves(obj[k], translateText);
    }
    return out;
  }
  return obj;
}

function pickPartnerBlocks(obj) {
  const p = obj.partnerlerimiz ?? {};
  return {
    heroStats: p.heroStats,
    partnerRecords: p.partnerRecords,
    partnerList: p.partnerList,
  };
}

const enContact = JSON.parse(fs.readFileSync(path.join(DICT, "en", "contact.json"), "utf8"));
const trContact = JSON.parse(fs.readFileSync(path.join(DICT, "tr", "contact.json"), "utf8"));
const enBlocks = pickPartnerBlocks(enContact);
const trBlocks = pickPartnerBlocks(trContact);

if (!enBlocks.heroStats || !enBlocks.partnerRecords || !enBlocks.partnerList) {
  console.error("Missing partner blocks in en/contact.json");
  process.exit(1);
}

// Restore TR from source (always correct)
{
  const file = path.join(DICT, "tr", "contact.json");
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  data.partnerlerimiz = { ...data.partnerlerimiz, ...trBlocks };
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log("Updated tr (from tr source)");
}

for (const locale of ONLY) {
  const tl = LOCALE_TL[locale];
  if (!tl) {
    console.error("Skip unknown locale:", locale);
    continue;
  }

  console.log("Translating", locale, "�");
  const translateText = makeTranslator(tl);
  const translated = {
    heroStats: await mapLeaves(enBlocks.heroStats, translateText),
    partnerRecords: await mapLeaves(enBlocks.partnerRecords, translateText),
    partnerList: await mapLeaves(enBlocks.partnerList, translateText),
  };

  const file = path.join(DICT, locale, "contact.json");
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  data.partnerlerimiz = { ...data.partnerlerimiz, ...translated };
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log("Wrote", locale);
}

console.log("Done.");
