import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dictDir = path.join(repoRoot, "src/app/[locale]/dictionaries");
const trPath = path.join(dictDir, "tr/solutions.json");
const translationsPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "sector-building-types-translations.json",
);

const tr = JSON.parse(fs.readFileSync(trPath, "utf8"));
const translations = JSON.parse(fs.readFileSync(translationsPath, "utf8"));

let updatedLocales = 0;

for (const [locale, localeTranslations] of Object.entries(translations)) {
  const solutionsPath = path.join(dictDir, locale, "solutions.json");
  if (!fs.existsSync(solutionsPath)) {
    console.warn("skip missing locale", locale);
    continue;
  }

  const solutions = JSON.parse(fs.readFileSync(solutionsPath, "utf8"));
  let touched = 0;

  for (const [key, translatedRows] of Object.entries(localeTranslations)) {
    const trRows = tr[key]?.sectorBuildingTypes;
    const target = solutions[key];
    if (!Array.isArray(trRows) || !target) continue;
    if (trRows.length !== translatedRows.length) {
      throw new Error(`${locale}.${key}: expected ${trRows.length} rows, got ${translatedRows.length}`);
    }

    target.sectorBuildingTypes = trRows.map((row, index) => ({
      buildingType: translatedRows[index].buildingType,
      description: translatedRows[index].description,
      products: translatedRows[index].products,
      productFamilies: row.productFamilies,
    }));
    touched += 1;
  }

  if (touched > 0) {
    fs.writeFileSync(solutionsPath, `${JSON.stringify(solutions, null, 2)}\n`, "utf8");
    console.log(locale, touched, "solutions");
    updatedLocales += 1;
  }
}

console.log("done", updatedLocales, "locales");
