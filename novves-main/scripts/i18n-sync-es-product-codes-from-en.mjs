/**
 * Copy English product family codes (name, subModels) into es/products.json
 * for havaHareketi.products only — keeps Spanish `type` strings.
 */
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const enPath = path.join(ROOT, "src", "app", "[locale]", "dictionaries", "en", "products.json");
const esPath = path.join(ROOT, "src", "app", "[locale]", "dictionaries", "es", "products.json");

const en = JSON.parse(fs.readFileSync(enPath, "utf8"));
const es = JSON.parse(fs.readFileSync(esPath, "utf8"));

const enProds = en.havaHareketi?.products;
const esProds = es.havaHareketi?.products;
if (!Array.isArray(enProds) || !Array.isArray(esProds) || enProds.length !== esProds.length) {
  console.error("havaHareketi.products length mismatch or missing");
  process.exit(1);
}
for (let i = 0; i < enProds.length; i++) {
  esProds[i].name = enProds[i].name;
  if (Array.isArray(enProds[i].subModels)) esProds[i].subModels = [...enProds[i].subModels];
}

fs.writeFileSync(esPath, JSON.stringify(es, null, 2) + "\n", "utf8");
console.error("Synced", esProds.length, "product rows name/subModels from en → es.");
