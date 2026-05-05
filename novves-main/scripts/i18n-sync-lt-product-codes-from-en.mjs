/**
 * Copy English product family codes (name, subModels) into lt/products.json
 * for havaHareketi.products only — keeps Lithuanian `type` strings.
 */
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const enPath = path.join(ROOT, "src", "app", "[locale]", "dictionaries", "en", "products.json");
const ltPath = path.join(ROOT, "src", "app", "[locale]", "dictionaries", "lt", "products.json");

const en = JSON.parse(fs.readFileSync(enPath, "utf8"));
const lt = JSON.parse(fs.readFileSync(ltPath, "utf8"));

const enProds = en.havaHareketi?.products;
const ltProds = lt.havaHareketi?.products;
if (!Array.isArray(enProds) || !Array.isArray(ltProds) || enProds.length !== ltProds.length) {
  console.error("havaHareketi.products length mismatch or missing");
  process.exit(1);
}
for (let i = 0; i < enProds.length; i++) {
  ltProds[i].name = enProds[i].name;
  if (Array.isArray(enProds[i].subModels)) ltProds[i].subModels = [...enProds[i].subModels];
}

fs.writeFileSync(ltPath, JSON.stringify(lt, null, 2) + "\n", "utf8");
console.error("Synced", ltProds.length, "product rows name/subModels from en → lt.");
