/**
 * Copy English product family codes (name, subModels) into pl/products.json
 * for havaHareketi.products only — keeps Polish `type` strings.
 */
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const enPath = path.join(ROOT, "src", "app", "[locale]", "dictionaries", "en", "products.json");
const plPath = path.join(ROOT, "src", "app", "[locale]", "dictionaries", "pl", "products.json");

const en = JSON.parse(fs.readFileSync(enPath, "utf8"));
const pl = JSON.parse(fs.readFileSync(plPath, "utf8"));

const enProds = en.havaHareketi?.products;
const plProds = pl.havaHareketi?.products;
if (!Array.isArray(enProds) || !Array.isArray(plProds) || enProds.length !== plProds.length) {
  console.error("havaHareketi.products length mismatch or missing");
  process.exit(1);
}
for (let i = 0; i < enProds.length; i++) {
  plProds[i].name = enProds[i].name;
  if (Array.isArray(enProds[i].subModels)) plProds[i].subModels = [...enProds[i].subModels];
}

fs.writeFileSync(plPath, JSON.stringify(pl, null, 2) + "\n", "utf8");
console.error("Synced", plProds.length, "product rows name/subModels from en → pl.");
