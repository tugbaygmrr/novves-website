/**
 * data/legal-locales/tr.json → data/legal-locales/{locale}.json
 * Tüm site dilleri (tr hariç) için yasal metin + UI çevirisi.
 *
 *   node scripts/i18n-legal-tr-to-locales.mjs
 *   node scripts/i18n-legal-tr-to-locales.mjs --locale en,de,fr
 *   node scripts/i18n-legal-tr-to-locales.mjs --fresh
 *   node scripts/i18n-legal-tr-to-locales.mjs --dry-run
 *
 * Önce: npx tsx scripts/legal-export-json.ts
 */
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const LOCALES_DIR = path.join(ROOT, "data/legal-locales");
const SRC = path.join(LOCALES_DIR, "tr.json");

const GTX_DELAY_MS = Number(process.env.I18N_LEGAL_GTX_DELAY_MS) || 450;
const GTX_MAX = 1200;
const GTX_RETRIES = 8;

/** @see src/i18n/config.ts */
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
const FRESH = args.includes("--fresh");
const FORCE = args.includes("--force");
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
    await sleep(attempt === 0 ? GTX_DELAY_MS : Math.min(18_000, 1600 * attempt));
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
      console.error(
        `  gtx retry ${attempt + 1}/${GTX_RETRIES}`,
        String(e?.message ?? e).slice(0, 80),
      );
    }
  }
  throw lastErr ?? new Error("gtx failed");
}

async function translateStr(str, tl, cache) {
  const key = `${tl}\0${str}`;
  if (cache.has(key)) return cache.get(key);
  const parts = chunkForGtx(str);
  const out = [];
  for (const p of parts) {
    out.push(await translateGtxOne(p, tl));
  }
  const joined = out.join("\n\n");
  cache.set(key, joined);
  return joined;
}

function shouldSkipLegalString(s, keyPath = "") {
  if (typeof s !== "string") return true;
  const t = s.trim();
  if (t.length === 0) return true;

  const leafKey = keyPath.split(".").pop() ?? "";
  if (leafKey === "id" || leafKey === "path" || leafKey === "contactEmail") return true;
  if (
    leafKey === "type" &&
    /^(paragraph|list|ordered|definitions|banner)$/.test(t)
  )
    return true;
  if (leafKey === "storageCode" && /^POL-LEG-/.test(t)) return true;
  if (leafKey === "abbr" && t.length <= 2) return true;

  if (/^[\d\s+.,:/\-–—()%]+$/.test(t) && t.length < 80) return true;
  if (/^\+?\d[\d\s\-()]+$/.test(t)) return true;
  if (t.includes("http://") || t.includes("https://")) return true;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(t)) return true;
  if (/^E-posta:\s*\S+@\S+/i.test(t)) return true;
  if (/^KEP Adresi:\s*\S+@\S+/i.test(t)) return true;
  if (/^POL-LEG-\d{4}-\d{2}$/.test(t)) return true;
  if (/^\d{4}\s\d{3}\s\d{2}\s\d{2}$/.test(t)) return true;
  if (/^6320968919$/.test(t)) return true;
  if (/^0632-0968-9190-0002$/.test(t)) return true;
  if (/^9358$/.test(t)) return true;
  if (/^www\.novves\.com$/i.test(t)) return true;
  if (/^NOVVES ELEKTRİK MOTOR ANONİM ŞİRKETİ$/i.test(t)) return true;
  if (/^info@novves\.com$/i.test(t)) return true;
  if (/^novveselektrik@hs01\.kep\.tr$/i.test(t)) return true;
  if (/^0216\s467\s47\s52$/.test(t)) return true;
  if (/^Telefon:\s*0216\s467\s47\s52$/i.test(t)) return true;
  if (
    /^Taşköprü Merkez Mah\. Çaydere Sok\. No:9\/1 İç Kapı No:2 Çiftlikköy \/ YALOVA$/i.test(
      t,
    )
  )
    return true;
  if (/^(Adres|Posta Adresi|Address):\s*Taşköprü Merkez Mah\./i.test(t)) return true;
  if (/^MERSİS No:\s*0632-0968-9190-0002$/i.test(t)) return true;
  if (/^KEP:\s*novveselektrik@hs01\.kep\.tr$/i.test(t)) return true;

  return false;
}

function collectStringLeaves(obj, prefix = "", out = []) {
  if (typeof obj === "string") {
    if (!shouldSkipLegalString(obj, prefix)) out.push({ path: prefix, value: obj });
    return out;
  }
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => collectStringLeaves(item, `${prefix}[${i}]`, out));
    return out;
  }
  if (obj && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) {
      const p = prefix ? `${prefix}.${k}` : k;
      collectStringLeaves(v, p, out);
    }
  }
  return out;
}

function readJsonFile(filePath) {
  const raw = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  return JSON.parse(raw);
}

function getByPath(root, pathStr) {
  const parts = pathStr.replace(/\[(\d+)\]/g, ".$1").split(".").filter(Boolean);
  let cur = root;
  for (const p of parts) {
    if (cur == null) return undefined;
    cur = cur[p];
  }
  return cur;
}

function setByPath(root, pathStr, value) {
  const parts = pathStr.replace(/\[(\d+)\]/g, ".$1").split(".").filter(Boolean);
  let cur = root;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    const next = parts[i + 1];
    if (/^\d+$/.test(next) && !Array.isArray(cur[p])) {
      cur[p] = [];
    }
    cur = cur[p];
  }
  cur[parts[parts.length - 1]] = value;
}

/** EN kopyasından klonlanmış yer tutucu (hub İngilizce, gövde henüz hedef dilde değil). */
function isEnglishStubLocale(existing, trBundle, enBundle, loc) {
  if (loc === "en" || !enBundle?.ui?.hubTitle) return false;
  if (existing?.ui?.hubTitle !== enBundle.ui.hubTitle) return false;
  const trIntro = trBundle?.documents?.privacy?.intro?.[0];
  const locIntro = existing?.documents?.privacy?.intro?.[0];
  const enIntro = enBundle?.documents?.privacy?.intro?.[0];
  if (!trIntro || !locIntro) return true;
  if (locIntro === trIntro) return false;
  if (enIntro && locIntro === enIntro) return true;
  return false;
}

const TURKISH_CHAR_RE = /[ğüşöçıİĞÜŞÖÇ]/;
const MOJIBAKE_RE = /Ã.|Ä.|Å.|â€[‹œž™]|â€™/i;

function normalizeForCompare(s) {
  return String(s)
    .replace(/[\u200b\ufeff\u00ad]/g, "")
    .replace(/â€‹/g, "")
    .replace(/[\u201c\u201d\u201e\u2033\u2036]/g, '"')
    .replace(/â€œ|â€\u009d|â€™/g, '"')
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

/** en.json kopyası (bozuk UTF-8 tırnaklar dahil) — hedef dilde yeniden çevrilmeli. */
function isEnglishCopy(current, enValue, loc) {
  if (loc === "en" || !enValue || typeof current !== "string") return false;
  const a = normalizeForCompare(current);
  const b = normalizeForCompare(enValue);
  if (a === b) return true;
  if (a.length > 80 && b.length > 80 && a.slice(0, 140) === b.slice(0, 140)) return true;
  return false;
}

/** Çevrilmiş sayılması gereken metinde kalan Türkçe (şirket adı / telefon vb. hariç). */
function containsTurkishRemainder(s, keyPath = "") {
  if (typeof s !== "string") return false;
  if (/^KEP adresi\b/i.test(s.trim())) return true;
  if (MOJIBAKE_RE.test(s)) return true;
  if (!TURKISH_CHAR_RE.test(s)) return false;
  // Gövde hedef dilde (Çince/Arap/Kiril vb.) — yalnızca resmi unvan Türkçe harf içerebilir
  if (/[\u4e00-\u9fff\u0600-\u06ff\u0400-\u04ff\u0530-\u058f]/.test(s) && s.length > 80) {
    return false;
  }
  return !shouldSkipLegalString(s, keyPath);
}

function leafAlreadyTranslated(current, trValue, enValue, loc, leafPath = "") {
  if (current === undefined || current === trValue) return false;
  if (loc === "en") return true;
  if (containsTurkishRemainder(current, leafPath)) return false;
  if (isEnglishCopy(current, enValue, loc)) return false;
  if (enValue !== undefined && current === enValue && current !== trValue) return false;
  return true;
}

/** Hâlâ TR kaynak metniyle birebir aynı olan yaprak sayısı. */
function countStillTurkishLeaves(bundle, trBundle, leaves) {
  let n = 0;
  for (const { path: leafPath, value } of leaves) {
    if (getByPath(bundle, leafPath) === value) n++;
  }
  return n;
}

/** Henüz hedef dilde olmayan (TR/EN kopya veya Türkçe kırıntı) yaprak sayısı. */
function countIncompleteLeaves(bundle, trBundle, enBundle, leaves, loc) {
  let n = 0;
  for (const { path: leafPath, value } of leaves) {
    const current = getByPath(bundle, leafPath);
    const enVal = enBundle ? getByPath(enBundle, leafPath) : undefined;
    if (!leafAlreadyTranslated(current, value, enVal, loc, leafPath)) n++;
  }
  return n;
}

function checkpointPath(locale) {
  return path.join(LOCALES_DIR, `${locale}.tr-to-locale.checkpoint.json`);
}

function loadCheckpoint(cpPath) {
  if (!fs.existsSync(cpPath)) return new Set();
  try {
    return new Set(JSON.parse(fs.readFileSync(cpPath, "utf8")));
  } catch {
    return new Set();
  }
}

function safeWrite(filePath, data) {
  try {
    fs.writeFileSync(filePath, data, "utf8");
    return true;
  } catch (err) {
    console.warn(`  warn: could not write ${path.basename(filePath)} (${err?.code ?? err})`);
    return false;
  }
}

function saveCheckpoint(cpPath, set) {
  safeWrite(cpPath, `${JSON.stringify([...set], null, 2)}\n`);
}

async function main() {
  if (!fs.existsSync(SRC)) {
    console.error("Missing tr.json — run: npx tsx scripts/legal-export-json.ts");
    process.exit(1);
  }

  const trBundle = readJsonFile(SRC);
  const leaves = collectStringLeaves(trBundle);
  console.log(`TR translatable strings: ${leaves.length}`);

  const enPath = path.join(LOCALES_DIR, "en.json");
  const enBundle = fs.existsSync(enPath) ? readJsonFile(enPath) : null;

  const locales = Object.keys(TARGET_LOCALES).filter(
    (loc) => !ONLY_LOCALES || ONLY_LOCALES.has(loc),
  );

  const cache = new Map();

  for (const loc of locales) {
    const tl = TARGET_LOCALES[loc];
    const outPath = path.join(LOCALES_DIR, `${loc}.json`);
    const cpPath = checkpointPath(loc);

    if (
      !FORCE &&
      !FRESH &&
      !fs.existsSync(cpPath) &&
      fs.existsSync(outPath)
    ) {
      try {
        const existing = readJsonFile(outPath);
        const stillTr = countStillTurkishLeaves(existing, trBundle, leaves);
        const incomplete = countIncompleteLeaves(
          existing,
          trBundle,
          enBundle,
          leaves,
          loc,
        );
        const enStub = isEnglishStubLocale(existing, trBundle, enBundle, loc);
        if (incomplete === 0) {
          console.log(`\n[${loc}] skip — all strings translated (${outPath})`);
          continue;
        }
        if (enStub) {
          console.log(
            `\n[${loc}] resume — English placeholder (${incomplete}/${leaves.length} strings to translate)`,
          );
        } else if (stillTr > 0) {
          console.log(
            `\n[${loc}] resume — ${stillTr} identical to TR, ${incomplete}/${leaves.length} total remaining`,
          );
        } else {
          console.log(
            `\n[${loc}] resume — ${incomplete}/${leaves.length} strings need translation (mixed EN/TR body)`,
          );
        }
      } catch {
        /* re-translate on read error */
      }
    }

    let done = FRESH ? new Set() : loadCheckpoint(cpPath);
    let target = FRESH
      ? JSON.parse(JSON.stringify(trBundle))
      : fs.existsSync(outPath)
        ? readJsonFile(outPath)
        : JSON.parse(JSON.stringify(trBundle));

    if (!FRESH && done.size === 0) {
      for (const { path: leafPath, value } of leaves) {
        const current = getByPath(target, leafPath);
        const enVal = enBundle ? getByPath(enBundle, leafPath) : undefined;
        if (leafAlreadyTranslated(current, value, enVal, loc, leafPath)) {
          done.add(leafPath);
        }
      }
      if (done.size > 0) {
        console.log(`\n[${loc}] resumed ${done.size}/${leaves.length} from existing file`);
      }
    }

    console.log(`\n[${loc}] → ${tl} (${done.size}/${leaves.length} done)`);

    let n = 0;
    let translatedN = 0;
    for (const { path: leafPath, value } of leaves) {
      if (!FRESH && done.has(leafPath)) continue;

      const current = getByPath(target, leafPath);
      const enVal = enBundle ? getByPath(enBundle, leafPath) : undefined;
      if (
        !FORCE &&
        leafAlreadyTranslated(current, value, enVal, loc, leafPath)
      ) {
        done.add(leafPath);
        continue;
      }

      n++;
      translatedN++;
      const preview = value.length > 60 ? `${value.slice(0, 57)}…` : value;
      console.log(`  [${translatedN}] ${leafPath}: ${preview}`);

      let translated = value;
      if (!DRY) {
        translated = await translateStr(value, tl, cache);
      }
      setByPath(target, leafPath, translated);
      done.add(leafPath);

      if (!DRY && translatedN % 50 === 0) {
        saveCheckpoint(cpPath, done);
        safeWrite(outPath, `${JSON.stringify(target, null, 2)}\n`);
      }
    }

    if (!DRY) {
      safeWrite(outPath, `${JSON.stringify(target, null, 2)}\n`);
      try {
        if (fs.existsSync(cpPath)) fs.unlinkSync(cpPath);
      } catch {
        /* checkpoint cleanup optional */
      }
      console.log(`  wrote ${outPath}`);
    }
  }

  console.log("\nDone. Yasal metinler için profesyonel hukuk revizyonu önerilir.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
