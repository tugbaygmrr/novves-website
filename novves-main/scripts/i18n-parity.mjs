/**
 * Referans locale (varsayılan: en) ile diğer locale'lerdeki JSON anahtarlarını
 * (dizi indeksleri dahil) karşılaştırır.
 *
 * Kullanım: node scripts/i18n-parity.mjs [--ref en] [--fix]
 * --fix: eksik veya boş ("") yaprak değerleri referansla doldurur — sonra çeviri kontrolü gerekir.
 */
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const DICTS = path.join(ROOT, "src", "app", "[locale]", "dictionaries");

/** Tüm yaprak yolları: a.b[0].c */
function flattenLeaves(obj, prefix = "") {
  const out = {};
  if (obj === null || typeof obj !== "object") {
    if (prefix) out[prefix] = obj;
    return out;
  }
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => {
      const p = `${prefix}[${i}]`;
      Object.assign(out, flattenLeaves(item, p));
    });
    return out;
  }
  for (const k of Object.keys(obj)) {
    const p = prefix ? `${prefix}.${k}` : k;
    Object.assign(out, flattenLeaves(obj[k], p));
  }
  return out;
}

/** locale içeriğini koruyarak referanstan eksik/boş alanları doldur */
function fillFromRef(localeObj, refObj) {
  if (refObj === null || typeof refObj !== "object") {
    if (localeObj === undefined || localeObj === "") return refObj;
    return localeObj;
  }
  if (Array.isArray(refObj)) {
    const locArr = Array.isArray(localeObj) ? localeObj : [];
    return refObj.map((refItem, i) => {
      const locItem = locArr[i];
      if (locItem === undefined || locItem === "") return refItem;
      return fillFromRef(locItem, refItem);
    });
  }
  const base =
    localeObj !== null && typeof localeObj === "object" && !Array.isArray(localeObj)
      ? { ...localeObj }
      : {};
  for (const k of Object.keys(refObj)) {
    const locv = base[k];
    base[k] = fillFromRef(locv, refObj[k]);
  }
  return base;
}

function loadJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function saveJson(p, data) {
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + "\n", "utf8");
}

const args = process.argv.slice(2);
const refIdx = args.indexOf("--ref");
const REF = refIdx >= 0 ? args[refIdx + 1] : "en";
const localeIdx = args.indexOf("--locale");
const LOCALE_FILTER = localeIdx >= 0 ? args[localeIdx + 1] : null;
const FIX = args.includes("--fix");

const locales = fs.readdirSync(DICTS).filter((f) => fs.statSync(path.join(DICTS, f)).isDirectory());

const refFiles = fs
  .readdirSync(path.join(DICTS, REF))
  .filter((f) => f.endsWith(".json"))
  .sort();

let exitCode = 0;
const report = [];

for (const locale of locales.sort()) {
  if (locale === REF) continue;
  if (LOCALE_FILTER && locale !== LOCALE_FILTER) continue;
  for (const file of refFiles) {
    const refPath = path.join(DICTS, REF, file);
    const locPath = path.join(DICTS, locale, file);
    if (!fs.existsSync(locPath)) {
      report.push({ locale, file, issue: "MISSING_FILE" });
      exitCode = 1;
      if (FIX) {
        fs.copyFileSync(refPath, locPath);
      }
      continue;
    }
    const refFlat = flattenLeaves(loadJson(refPath));
    const locFlat = flattenLeaves(loadJson(locPath));
    const refKeys = new Set(Object.keys(refFlat));
    const locKeys = new Set(Object.keys(locFlat));
    const missing = [...refKeys].filter((k) => !locKeys.has(k));
    const extra = [...locKeys].filter((k) => !refKeys.has(k));
    /** Yalnızca referansta metin varken locale boşsa sorun say */
    const emptyInLoc = [...refKeys].filter(
      (k) =>
        locKeys.has(k) &&
        (locFlat[k] === "" || locFlat[k] === null) &&
        refFlat[k] !== "" &&
        refFlat[k] !== null &&
        refFlat[k] !== undefined
    );

    if (missing.length || extra.length || emptyInLoc.length) {
      report.push({
        locale,
        file,
        missingLeafPaths: missing.length ? missing.slice(0, 80) : undefined,
        missingCount: missing.length || undefined,
        extraLeafPaths: extra.length ? extra.slice(0, 40) : undefined,
        extraCount: extra.length || undefined,
        emptyLeafPaths: emptyInLoc.length ? emptyInLoc.slice(0, 40) : undefined,
        emptyCount: emptyInLoc.length || undefined,
      });
      if (missing.length || emptyInLoc.length) exitCode = 1;

      if (FIX && (missing.length || emptyInLoc.length)) {
        const merged = fillFromRef(loadJson(locPath), loadJson(refPath));
        saveJson(locPath, merged);
      }
    }
  }
}

console.log(JSON.stringify(report, null, 2));
console.error(`\nÖzet: ${report.length} uyarı; referans=${REF}. Çıkış kodu: ${exitCode}`);
if (FIX)
  console.error(
    "[--fix] Eksik/boş yapraklar referansla dolduruldu. Yasal ve uzun metinleri mutlaka yerelleştirin."
  );
process.exit(report.length ? exitCode : 0);
