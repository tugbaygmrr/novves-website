/**
 * tr/services.json → en; en/services.json → tüm site dilleri
 * common.json navbar + footer hizmet linkleri
 *
 *   node scripts/i18n-services-all-locales.mjs --phase en
 *   node scripts/i18n-services-all-locales.mjs --phase locales
 *   node scripts/i18n-services-all-locales.mjs --phase common
 *   node scripts/i18n-services-all-locales.mjs --locale de,fr --phase locales
 */
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const DICT = path.join(ROOT, "src", "app", "[locale]", "dictionaries");

const TARGET_LOCALES = {
  en: "en",
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

const SERVICE_LINK_KEYS = [
  "overview",
  "onSiteInspection",
  "smokeControlDesign",
  "cfdAnalysis",
  "fanSelectionEngineering",
  "commissioning",
  "technicalService",
  "maintenancePerformance",
  "trainingConsulting",
];

const TR_NAV_LABELS = {
  overview: "Genel Bakış",
  onSiteInspection: "Yerinde Keşif",
  smokeControlDesign: "Duman Kontrol Tasarımı",
  cfdAnalysis: "CFD Analizi",
  fanSelectionEngineering: "Fan Seçimi ve Teknik Projelendirme",
  commissioning: "Devreye Alma",
  technicalService: "Teknik Servis",
  maintenancePerformance: "Bakım ve Performans Kontrolü",
  trainingConsulting: "Eğitim ve Teknik Danışmanlık",
};

const GTX_DELAY_MS = Number(process.env.I18N_SERVICES_GTX_DELAY_MS) || 400;
const GTX_MAX = 1200;
const GTX_RETRIES = 8;

const args = process.argv.slice(2);
const phaseIdx = args.indexOf("--phase");
const PHASE = phaseIdx >= 0 ? args[phaseIdx + 1] : "all";
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
  if (/^[\d\s+.,:/\-–—()%°]+$/.test(t) && t.length < 80) return true;
  if (/^E3474F2B/i.test(t)) return true;
  if (/^EN\s+12101/i.test(t)) return true;
  if (/^CFD$/i.test(t)) return true;
  if (/^3D$/i.test(t)) return true;
  if (/^7\/24$/i.test(t)) return true;
  if (/^PDF$/i.test(t)) return true;
  if (/^360°$/i.test(t)) return true;
  if (/^NOVVES$/i.test(t)) return true;
  if (/PerfectusAir/i.test(t)) return true;
  if (/^info@novves\.com$/i.test(t)) return true;
  if (/^\+90\s/.test(t)) return true;
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

function mergeMeta(target, source) {
  if (!source || !target || typeof source !== "object" || typeof target !== "object") return;
  if (Array.isArray(source) && Array.isArray(target)) {
    for (let i = 0; i < source.length; i++) mergeMeta(target[i], source[i]);
    return;
  }
  if (source.slug) target.slug = source.slug;
  if (source.imageSrc) target.imageSrc = source.imageSrc;
  if (source.icon) target.icon = source.icon;
  if (source.iconVariant) target.iconVariant = source.iconVariant;
  for (const k of Object.keys(source)) {
    if (source[k] && typeof source[k] === "object") mergeMeta(target[k], source[k]);
  }
}

function preserveServicesMeta(translated, source) {
  for (const key of Object.keys(source)) {
    mergeMeta(translated[key], source[key]);
  }
  return translated;
}

function checkpointPath(locale) {
  return path.join(DICT, locale, "services.i18n.checkpoint.json");
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

async function syncServicesFile(targetLocale, sl) {
  const tl = TARGET_LOCALES[targetLocale];
  if (!tl) throw new Error(`Unknown locale: ${targetLocale}`);

  const sourcePath = path.join(DICT, sl, "services.json");
  const targetPath = path.join(DICT, targetLocale, "services.json");
  const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));

  let target = {};
  if (fs.existsSync(targetPath) && !FRESH) {
    try {
      target = JSON.parse(fs.readFileSync(targetPath, "utf8"));
    } catch {
      target = {};
    }
  }

  const done = FRESH ? new Set() : loadCheckpoint(targetLocale);
  const cache = new Map();

  for (const sectionKey of Object.keys(source)) {
    if (!FRESH && done.has(sectionKey)) {
      console.error(`[${targetLocale}] skip checkpoint:`, sectionKey);
      continue;
    }
    console.error(`[${targetLocale}] translating section:`, sectionKey, `(${sl}→${tl})`);
    const translated = await mapLeaves(JSON.parse(JSON.stringify(source[sectionKey])), sl, tl, cache);
    target[sectionKey] = translated;
    preserveServicesMeta({ [sectionKey]: target[sectionKey] }, { [sectionKey]: source[sectionKey] });
    fs.writeFileSync(targetPath, JSON.stringify(target, null, 2) + "\n", "utf8");
    done.add(sectionKey);
    saveCheckpoint(targetLocale, done);
    console.error(`[${targetLocale}] wrote after`, sectionKey, "| cache:", cache.size);
  }
  console.error(`[${targetLocale}] services.json done (${cache.size} strings)`);
}

async function syncCommonNav(locale) {
  if (locale === "tr") return;
  const tl = TARGET_LOCALES[locale];
  if (!tl) return;

  const commonPath = path.join(DICT, locale, "common.json");
  const common = JSON.parse(fs.readFileSync(commonPath, "utf8"));
  const cache = new Map();

  for (const key of SERVICE_LINK_KEYS) {
    const trText = TR_NAV_LABELS[key];
    if (!trText) continue;
    const translated = await mapLeaves(trText, "tr", tl, cache);
    common.navbar.links[key] = translated;
    common.footer.sections.servicesLinks[key] = translated;
  }

  fs.writeFileSync(commonPath, JSON.stringify(common, null, 2) + "\n", "utf8");
  console.error(`[${locale}] common.json nav links updated`);
}

async function runPhaseEn() {
  if (FRESH && fs.existsSync(checkpointPath("en"))) fs.unlinkSync(checkpointPath("en"));
  await syncServicesFile("en", "tr");
}

async function runPhaseLocales() {
  const locales = ONLY ?? Object.keys(TARGET_LOCALES).filter((l) => l !== "en");
  for (const locale of locales) {
    if (locale === "tr" || locale === "en") continue;
    if (FRESH && fs.existsSync(checkpointPath(locale))) fs.unlinkSync(checkpointPath(locale));
    await syncServicesFile(locale, "en");
  }
}

async function runPhaseCommon() {
  const locales = ONLY ?? Object.keys(TARGET_LOCALES).filter((l) => l !== "tr");
  for (const locale of locales) {
    await syncCommonNav(locale);
  }
}

const phases =
  PHASE === "all" ? ["en", "locales", "common"] : PHASE === "en+locales" ? ["en", "locales"] : [PHASE];

for (const p of phases) {
  if (p === "en") await runPhaseEn();
  else if (p === "locales") await runPhaseLocales();
  else if (p === "common") await runPhaseCommon();
  else console.error("Unknown phase:", p);
}

console.error("\nAll requested phases complete.");
