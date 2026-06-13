import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dictDir = path.join(repoRoot, "src/app/[locale]/dictionaries");
const trPath = path.join(dictDir, "tr/solutions.json");
const tr = JSON.parse(fs.readFileSync(trPath, "utf8"));

let updated = 0;

for (const locale of fs.readdirSync(dictDir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)) {
  if (locale === "tr") continue;
  const targetPath = path.join(dictDir, locale, "solutions.json");
  if (!fs.existsSync(targetPath)) continue;

  const target = JSON.parse(fs.readFileSync(targetPath, "utf8"));
  let count = 0;

  for (const [key, block] of Object.entries(tr)) {
    if (!block?.sectorBuildingTypes || !target[key]) continue;
    target[key].sectorBuildingTypes = block.sectorBuildingTypes;
    count += 1;
  }

  if (count > 0) {
    fs.writeFileSync(targetPath, `${JSON.stringify(target, null, 2)}\n`, "utf8");
    console.log(locale, count);
    updated += 1;
  }
}

console.log("done", updated, "locales");
