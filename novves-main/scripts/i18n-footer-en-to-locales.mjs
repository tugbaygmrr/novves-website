/**
 * data/footer-locales/en.json → data/footer-locales/{locale}.json
 *
 *   node scripts/i18n-footer-en-to-locales.mjs
 *   node scripts/i18n-footer-en-to-locales.mjs --locale kk,pl,zh
 *   node scripts/i18n-footer-en-to-locales.mjs --fresh
 */
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "data/footer-locales");
const SRC = path.join(OUT_DIR, "en.json");

const GTX_DELAY_MS = Number(process.env.I18N_FOOTER_GTX_DELAY_MS) || 280;
const GTX_MAX = 1200;
const GTX_RETRIES = 8;

const LOCALE_TL = {
  kk: "kk",
  tg: "tg",
  zh: "zh-CN",
  ur: "ur",
  lt: "lt",
  pl: "pl",
  az: "az",
};

const LEGAL_LABELS = {
  en: "Privacy and Compliance",
  kk: "Құпиялық және сәйкестік",
  tg: "Махфият ва риоя",
  zh: "隐私与合规性",
  ur: "رازداری اور تعمیل",
  lt: "Privatumas ir atitiktis",
  pl: "Prywatność i zgodność",
  az: "Məxfilik və Uyğunluq",
};

const BRAND_SLOGANS = {
  kk: "Born to Flow: Ауаны қалыптастыратын инженерия",
  tg: "Born to Flow: Муҳандисие, ки ҳаворо шакл медиҳад",
  zh: "Born to Flow:塑造空气的工程",
  ur: "Born to Flow: ہوا کو تشکیل دینے والی انجینئرنگ",
  lt: "Born to Flow: Inžinerija, formuojanti orą",
  pl: "Born to Flow: Inżynieria, która kształtuje powietrze",
  az: "Born to Flow: Havanı şəkilləndirən mühəndislik",
};

const args = process.argv.slice(2);
const FRESH = args.includes("--fresh");
const locIdx = args.indexOf("--locale");
const ONLY = locIdx >= 0 ? args[locIdx + 1].split(",").map((s) => s.trim()).filter(Boolean) : Object.keys(LOCALE_TL);

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function shouldSkipString(s) {
  if (typeof s !== "string") return true;
  const t = s.trim();
  if (!t) return true;
  if (/^©/.test(t)) return true;
  if (/^\+?\d[\d\s\-]+$/.test(t)) return true;
  if (t.includes("@") && t.includes(".")) return true;
  if (/^(NOVVES|ISO \d|EN \d|ATEX|CFD|KVKK|CAD \/ BIM|Jet Fans?|WhatsApp)$/i.test(t)) return true;
  if (/^ISO \d/.test(t)) return true;
  if (/^EN \d/.test(t)) return true;
  if (/^Web Design/.test(t)) return true;
  if (t === "Blog") return true;
  if (t === "Novves") return true;
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
      if (br < 40) br = slice.lastIndexOf(". ");
      if (br > 60) end = i + br + 2;
    }
    chunks.push(str.slice(i, end).trim());
    i = end;
  }
  return chunks.filter(Boolean);
}

async function translateGtx(str, tl) {
  const parts = chunkForGtx(str);
  const out = [];
  for (const p of parts) {
    let lastErr;
    const urlBase = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${encodeURIComponent(tl)}&dt=t&q=`;
    for (let attempt = 0; attempt < GTX_RETRIES; attempt++) {
      await sleep(attempt === 0 ? GTX_DELAY_MS : Math.min(15_000, 1500 * attempt));
      try {
        const res = await fetch(urlBase + encodeURIComponent(p));
        const text = await res.text();
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = JSON.parse(text);
        out.push(data[0].map((seg) => (Array.isArray(seg) ? String(seg[0] ?? "") : "")).join(""));
        break;
      } catch (e) {
        lastErr = e;
      }
    }
    if (out.length < parts.indexOf(p) + 1) throw lastErr ?? new Error("gtx failed");
  }
  return out.join("\n\n").replace(/\|\s*novels\b/gi, "| Novves");
}

async function mapLeaves(obj, tl, cache) {
  if (typeof obj === "string") {
    if (shouldSkipString(obj)) return obj;
    if (cache.has(obj)) return cache.get(obj);
    const tr = await translateGtx(obj, tl);
    cache.set(obj, tr);
    return tr;
  }
  if (Array.isArray(obj)) {
    const out = [];
    for (const item of obj) out.push(await mapLeaves(item, tl, cache));
    return out;
  }
  if (obj !== null && typeof obj === "object") {
    const out = {};
    for (const k of Object.keys(obj)) out[k] = await mapLeaves(obj[k], tl, cache);
    return out;
  }
  return obj;
}

function applyLegalLabel(obj, label) {
  const corporate = [...obj.links.corporate];
  if (corporate.length > 5) corporate[5] = label;
  return {
    ...obj,
    links: { ...obj.links, corporate },
    bottom: { ...obj.bottom, legalCenter: label },
  };
}

async function processLocale(locale) {
  const tl = LOCALE_TL[locale];
  if (!tl) {
    console.error("Skip unknown locale:", locale);
    return;
  }
  const outPath = path.join(OUT_DIR, `${locale}.json`);
  if (!FRESH && fs.existsSync(outPath)) {
    console.error("Skip (exists):", locale, "— use --fresh");
    return;
  }

  console.error("Translating footer →", locale);
  const enObj = JSON.parse(fs.readFileSync(SRC, "utf8"));
  const cache = new Map();
  let translated = await mapLeaves(enObj, tl, cache);

  if (BRAND_SLOGANS[locale]) translated.brandSlogan = BRAND_SLOGANS[locale];
  if (LEGAL_LABELS[locale]) translated = applyLegalLabel(translated, LEGAL_LABELS[locale]);

  fs.writeFileSync(outPath, JSON.stringify(translated, null, 2) + "\n", "utf8");
  console.error("Wrote", outPath, "| cache:", cache.size);
}

if (!fs.existsSync(SRC)) {
  console.error("Missing", SRC, "— run export first or commit en.json");
  process.exit(1);
}

for (const locale of ONLY) {
  await processLocale(locale);
}

console.error("Done.");
