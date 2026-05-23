// Her dilin FAQ items'ında aynı q'lu duplicate'i sil. Sonra ihtiyaç halinde tamamla.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DICT_DIR = path.join(__dirname, "..", "src", "app", "[locale]", "dictionaries");

const locales = fs.readdirSync(DICT_DIR).filter(d => fs.statSync(path.join(DICT_DIR, d)).isDirectory());

for (const loc of locales) {
  const file = path.join(DICT_DIR, loc, "home.json");
  if (!fs.existsSync(file)) continue;
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!data.faq?.items) continue;

  const seen = new Set();
  const filtered = [];
  for (const item of data.faq.items) {
    if (seen.has(item.q)) continue; // ilkini koru, duplicate'i atla
    seen.add(item.q);
    filtered.push(item);
  }
  const removed = data.faq.items.length - filtered.length;
  if (removed > 0) {
    data.faq.items = filtered;
    fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n", "utf8");
    console.log(`✓ ${loc}: ${removed} duplicate kaldırıldı → ${filtered.length} item`);
  } else {
    console.log(`- ${loc}: duplicate yok (${data.faq.items.length} item)`);
  }
}
