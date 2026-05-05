/**
 * Copy English product family codes (name, subModels) into ur/products.json
 * for havaHareketi.products only — keeps Urdu `type` strings.
 */
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const enPath = path.join(ROOT, "src", "app", "[locale]", "dictionaries", "en", "products.json");
const urPath = path.join(ROOT, "src", "app", "[locale]", "dictionaries", "ur", "products.json");

const en = JSON.parse(fs.readFileSync(enPath, "utf8"));
const ur = JSON.parse(fs.readFileSync(urPath, "utf8"));

const enProds = en.havaHareketi?.products;
const urProds = ur.havaHareketi?.products;
if (!Array.isArray(enProds) || !Array.isArray(urProds) || enProds.length !== urProds.length) {
  console.error("havaHareketi.products length mismatch or missing");
  process.exit(1);
}
for (let i = 0; i < enProds.length; i++) {
  urProds[i].name = enProds[i].name;
  if (Array.isArray(enProds[i].subModels)) urProds[i].subModels = [...enProds[i].subModels];
}

fs.writeFileSync(urPath, JSON.stringify(ur, null, 2) + "\n", "utf8");
console.error("Synced", urProds.length, "product rows name/subModels from en → ur.");
