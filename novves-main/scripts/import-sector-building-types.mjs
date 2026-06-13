import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import XLSX from "xlsx";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const workspaceRoot = path.resolve(repoRoot, "..");
const xlsxPath = path.join(
  workspaceRoot,
  "1.4 Sekt\u00f6rel Bazl\u0131 \u00dcr\u00fcn Gruplar\u0131 2026 R0.xlsx",
);
const solutionsPath = path.join(repoRoot, "src/app/[locale]/dictionaries/tr/solutions.json");

const TITLE_TO_KEY = [
  ["Duman & Is\u0131 Tahliye", "dumanIsiTahliye"],
  ["Konfor \u0130klimlendirme", "konforIklimlendirme"],
  ["Hijyenik & Filtrasyonlu", "hijyenikFiltrasyon"],
  ["End\u00fcstriyel Hava Y\u00f6netimi", "endustriyelHavaYonetimi"],
  ["Hayvanc\u0131l\u0131k Tesisleri", "hayvancilikTesisleri"],
  ["Trafo & Enerji", "trafoEnerjiOdalari"],
  ["Sera & Tar\u0131msal", "seraTarimsal"],
  ["ATEX & Patlama", "atexPatlamaKoruma"],
  ["Ak\u0131ll\u0131 Otomasyon", "akilliOtomasyon"],
  ["Konut Tipi Havaland\u0131rma", "konutHavalandirma"],
  ["Marin & Offshore", "marinOffshore"],
  ["Marin ve Offshore", "marinOffshore"],
  ["Proje Bazl\u0131", "projeBazliOzelImalat"],
  ["CFD & M\u00fchendislik", "cfdDanismanlik"],
];

function normalizeTitle(value) {
  return String(value ?? "")
    .replace(/[\u{1F300}-\u{1FAFF}]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function resolveSolutionKey(title) {
  const normalized = normalizeTitle(title);
  for (const [needle, key] of TITLE_TO_KEY) {
    if (normalized.includes(needle)) return key;
  }
  return null;
}

const wb = XLSX.readFile(xlsxPath);
const rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1, defval: "" });

const byKey = {};
let currentKey = null;

for (const row of rows) {
  const col0 = String(row[0] ?? "").trim();
  if (!col0) continue;

  if (col0 === "\u00c7\u00f6z\u00fcm Ba\u015fl\u0131\u011f\u0131") {
    currentKey = null;
    continue;
  }

  if (col0 === "Sekt\u00f6r / Yap\u0131 Tipi") {
    continue;
  }

  const keyFromTitle = resolveSolutionKey(col0);
  const hasProductGroups = String(row[4] ?? "").trim().length > 0;
  const isSolutionTitleRow =
    keyFromTitle &&
    (hasProductGroups ||
      (String(row[1] ?? "").trim().length > 60 && String(row[2] ?? "").trim().length > 0));
  if (isSolutionTitleRow) {
    currentKey = keyFromTitle;
    continue;
  }

  if (!currentKey) continue;

  const buildingType = col0;
  const description = String(row[1] ?? "").trim();
  const products = String(row[2] ?? "").trim();
  const productFamilies = String(row[3] ?? "").trim();
  if (!description && !products) continue;

  if (!byKey[currentKey]) byKey[currentKey] = [];
  byKey[currentKey].push({ buildingType, description, products, productFamilies });
}

const solutions = JSON.parse(fs.readFileSync(solutionsPath, "utf8"));
for (const [key, items] of Object.entries(byKey)) {
  if (!solutions[key]) {
    console.warn("missing solution key", key);
    continue;
  }
  solutions[key].sectorBuildingTypes = items;
  console.log(key, items.length);
}

fs.writeFileSync(solutionsPath, `${JSON.stringify(solutions, null, 2)}\n`, "utf8");
console.log("done", Object.keys(byKey).length);
