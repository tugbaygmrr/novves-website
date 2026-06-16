import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import XLSX from "xlsx";

const scriptsDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptsDir, "..");
const xlsxPath = path.join(scriptsDir, "1.1 Madde Kodlama Mant\u0131\u011f\u0131 ve A\u00e7\u0131klamalar\u0131 2026 R6.xlsx");

const wb = XLSX.readFile(xlsxPath);

// Tematik — row 1 = header, data from row 2
const tematikRows = XLSX.utils.sheet_to_json(wb.Sheets["Tematik"], { header: 1, defval: "" });
const families = [];
for (const row of tematikRows.slice(2)) {
  const en = String(row[2] ?? "").trim();
  if (!en) continue;
  families.push({
    code: en.toUpperCase(),
    no: String(row[1] ?? "").trim(),
    en,
    trName: String(row[3] ?? "").trim(),
    productGroupTr: String(row[4] ?? "").trim(),
    productGroupEn: String(row[5] ?? "").trim(),
    inspiration: String(row[6] ?? "").trim(),
    description: String(row[7] ?? "").trim(),
  });
}

// \u00dcr\u00fcn Alt Ailesi — level col 0, family col 7, name col 10
const subSheetName = wb.SheetNames.find((n) => n.includes("Alt Ailesi"));
const subRows = XLSX.utils.sheet_to_json(wb.Sheets[subSheetName], { header: 1, defval: "" });
const models = [];
for (const row of subRows) {
  const level = Number(row[0]);
  if (level !== 4 && level !== 5) continue;
  const familyCode = String(row[7] ?? "").trim().toUpperCase();
  const nameTr = String(row[10] ?? "").trim();
  if (!familyCode || familyCode === "NA" || !nameTr || nameTr === "NA") continue;
  models.push({
    level,
    category: String(row[5] ?? "").trim(),
    familyCode,
    familyDesc: String(row[8] ?? "").trim(),
    subCode: String(row[9] ?? "").trim(),
    nameTr,
    productCode: String(row[11] ?? "").trim(),
    shortCode: String(row[12] ?? "").trim(),
    shortCodeTr: String(row[13] ?? "").trim(),
    nameEn: String(row[14] ?? "").trim(),
  });
}

const byFamily = {};
for (const m of models) {
  (byFamily[m.familyCode] ??= []).push(m);
}

const SITE_LEAF = {
  DRAGONFLY: "dumanIsiTahliyeFanlari",
  MARLIN: "kovanTipiAksiyalFanlar",
  BEAR: "exproofFanlar",
  NAUTILUS: "endustriyelFanlar",
  HUMMINGBIRD: "ecFanlar",
  HERON: "catiFanlari",
  OWL: "duvarTipiFanlar",
  SEAHORSE: "banyoFanlari",
  KOI: "kanalFanlari",
  TURTLE: "hucreliFanlar",
  BUTTERFLY: "mutfakFanlari",
  FOX: "siginakFanlari",
  TIGER: "klimaSantralleri",
  DOLPHIN: "havuzNemAlmaSantrali",
  CARACAL: "isiGeriKazanimCihazlari",
  HOUND: "damperler",
};

const productsPath = path.join(repoRoot, "src/app/[locale]/dictionaries/tr/products.json");
const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));
const catalogNames = (products.havaHareketi?.products ?? []).map((p) => p.name.toUpperCase());

const missingLeaf = families
  .filter((f) => catalogNames.includes(f.code) && !SITE_LEAF[f.code])
  .map((f) => ({ code: f.code, group: f.productGroupTr, models: byFamily[f.code]?.length ?? 0 }));

const out = { families, modelsByFamily: byFamily, missingLeaf };
const outPath = path.join(scriptsDir, "product-excel-export.json");
fs.writeFileSync(outPath, `${JSON.stringify(out, null, 2)}\n`, "utf8");

console.log("families", families.length);
console.log("models", models.length);
console.log("missing leaf pages:", missingLeaf.map((m) => `${m.code} (${m.models} model)`).join(", ") || "none");
