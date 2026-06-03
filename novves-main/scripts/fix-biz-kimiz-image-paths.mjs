/**
 * activityFields görsellerini doğru webp dosya adlarına bağlar.
 * node scripts/fix-biz-kimiz-image-paths.mjs
 */
import fs from "fs";
import path from "path";

const DICT = path.join(process.cwd(), "src/app/[locale]/dictionaries");
const FILES = [
  "konfor-havalandirma.webp",
  "iklimlendirme-hvac.webp",
  "endustriyel-sogutma.webp",
  "duman-kontrolu.webp",
];

for (const loc of fs.readdirSync(DICT)) {
  const file = path.join(DICT, loc, "corporate.json");
  if (!fs.existsSync(file)) continue;
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  const fields = data.bizKimiz?.activityFields;
  if (!Array.isArray(fields) || fields.length < 4) continue;
  let changed = false;
  for (let i = 0; i < 4; i++) {
    const next = `/images/corporate/biz-kimiz/${FILES[i]}`;
    if (fields[i].image !== next) {
      fields[i].image = next;
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
    console.log("fixed", loc);
  }
}
