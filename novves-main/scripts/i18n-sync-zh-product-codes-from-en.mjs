/**
 * Copy English product family codes (name, subModels) into zh/products.json
 * for havaHareketi.products only — keeps Chinese `type` strings.
 */
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const enPath = path.join(ROOT, "src", "app", "[locale]", "dictionaries", "en", "products.json");
const zhPath = path.join(ROOT, "src", "app", "[locale]", "dictionaries", "zh", "products.json");

const en = JSON.parse(fs.readFileSync(enPath, "utf8"));
const zh = JSON.parse(fs.readFileSync(zhPath, "utf8"));

const enProds = en.havaHareketi?.products;
const zhProds = zh.havaHareketi?.products;
if (!Array.isArray(enProds) || !Array.isArray(zhProds) || enProds.length !== zhProds.length) {
  console.error("havaHareketi.products length mismatch or missing");
  process.exit(1);
}
for (let i = 0; i < enProds.length; i++) {
  zhProds[i].name = enProds[i].name;
  if (Array.isArray(enProds[i].subModels)) zhProds[i].subModels = [...enProds[i].subModels];
}

fs.writeFileSync(zhPath, JSON.stringify(zh, null, 2) + "\n", "utf8");
console.error("Synced", zhProds.length, "product rows name/subModels from en → zh.");
