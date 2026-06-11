// Tek seferlik migrasyon: kategori bölümlerindeki (products dizisi olan) ürün
// öğelerinden subModels'i kaldırır; yerine image + specFlow (max debi) +
// specPressure (basınç) alanları ekler (boş). Builder artık specFlow/specPressure'ı
// doğrudan okur; subModels'e bağlı "N+ model" gösterimi kalkar.
import fs from "fs";
import path from "path";

const LOCALES = ["tr", "en", "ru", "ar", "de", "fr", "it", "es", "az", "kk", "tg", "zh", "ur", "lt", "pl"];
// products dizisi (subModels türevli debi) kullanan kategori bölümleri
const SECTIONS = ["havaHareketi", "sogutmaVeIsitma", "otomasyonMalzemeleri"];
const dictDir = path.join(process.cwd(), "src", "app", "[locale]", "dictionaries");

/** Ürün öğesini yeniden kur: name, type, image, specFlow, specPressure, description, (comingSoon). */
function migrateProduct(p) {
  if (p == null || typeof p !== "object") return p;
  const out = {};
  if ("name" in p) out.name = p.name;
  if ("type" in p) out.type = p.type;
  out.image = typeof p.image === "string" ? p.image : "";
  out.specFlow = typeof p.specFlow === "string" ? p.specFlow : "";
  out.specPressure = typeof p.specPressure === "string" ? p.specPressure : "";
  if ("description" in p) out.description = p.description;
  if ("comingSoon" in p) out.comingSoon = p.comingSoon;
  // subModels bilinçli olarak atlanır (kaldırılır); başka anahtar varsa korunur
  for (const [k, v] of Object.entries(p)) {
    if (["name", "type", "image", "specFlow", "specPressure", "description", "comingSoon", "subModels"].includes(k)) continue;
    out[k] = v;
  }
  return out;
}

let changed = 0;
for (const loc of LOCALES) {
  const file = path.join(dictDir, loc, "solutions.json".replace("solutions", "products"));
  if (!fs.existsSync(file)) continue;
  const json = JSON.parse(fs.readFileSync(file, "utf-8"));
  let n = 0;
  for (const sec of SECTIONS) {
    const block = json[sec];
    if (!block || !Array.isArray(block.products)) continue;
    block.products = block.products.map((p) => {
      n++;
      return migrateProduct(p);
    });
  }
  fs.writeFileSync(file, JSON.stringify(json, null, 2) + "\n", "utf-8");
  changed += n;
  console.log(`${loc}: ${n} ürün güncellendi`);
}
console.log(`Toplam: ${changed} ürün öğesi işlendi.`);
