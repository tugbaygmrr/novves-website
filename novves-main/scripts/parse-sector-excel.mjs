import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import XLSX from "xlsx";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const xlsxPath = path.join(
  root,
  "1.4 Sekt\u00f6rel Bazl\u0131 \u00dcr\u00fcn Gruplar\u0131 2026 R0.xlsx",
);
const outPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "sector-excel-parsed.json");

const wb = XLSX.readFile(xlsxPath);
const sheet = wb.Sheets[wb.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });

fs.writeFileSync(outPath, JSON.stringify({ sheetName: wb.SheetNames[0], rows }, null, 2), "utf8");
console.log("rows", rows.length, "->", outPath);
