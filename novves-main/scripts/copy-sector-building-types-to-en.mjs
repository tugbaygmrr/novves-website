import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const trPath = path.join(repoRoot, "src/app/[locale]/dictionaries/tr/solutions.json");
const enPath = path.join(repoRoot, "src/app/[locale]/dictionaries/en/solutions.json");

const tr = JSON.parse(fs.readFileSync(trPath, "utf8"));
const en = JSON.parse(fs.readFileSync(enPath, "utf8"));

for (const [key, block] of Object.entries(tr)) {
  if (!block?.sectorBuildingTypes || !en[key]) continue;
  en[key].sectorBuildingTypes = block.sectorBuildingTypes;
}

fs.writeFileSync(enPath, `${JSON.stringify(en, null, 2)}\n`, "utf8");
console.log("copied sectorBuildingTypes to en");
