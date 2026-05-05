/**
 * Hangi locale dosyalarının referans dil ile bayt olarak aynı olduğunu listeler
 * (çoğunlukla henüz gerçek çeviri yapılmamış kopyalar).
 *
 * Kullanım: node scripts/i18n-equals-ref.mjs [--ref en]
 */
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const DICTS = path.join(ROOT, "src", "app", "[locale]", "dictionaries");

const args = process.argv.slice(2);
const refIdx = args.indexOf("--ref");
const REF = refIdx >= 0 ? args[refIdx + 1] : "en";

const locales = fs.readdirSync(DICTS).filter((f) => fs.statSync(path.join(DICTS, f)).isDirectory());

const refFiles = fs
  .readdirSync(path.join(DICTS, REF))
  .filter((f) => f.endsWith(".json"))
  .sort();

const report = [];

for (const locale of locales.sort()) {
  if (locale === REF) continue;
  for (const file of refFiles) {
    const refPath = path.join(DICTS, REF, file);
    const locPath = path.join(DICTS, locale, file);
    if (!fs.existsSync(locPath)) continue;
    const a = fs.readFileSync(refPath, "utf8");
    const b = fs.readFileSync(locPath, "utf8");
    if (a === b) {
      report.push({ locale, file, note: "IDENTICAL_TO_REF" });
    }
  }
}

console.log(JSON.stringify(report, null, 2));
console.error(`\nToplam ${report.length} dosya referans (${REF}) ile özdeş.`);
