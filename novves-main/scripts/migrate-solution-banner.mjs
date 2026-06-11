// Tek seferlik migrasyon: solutions.json'da her çözümün
// library.bannerDescription değerini üst seviyeye `bannerDescription` olarak
// (titleHighlight'ın hemen altına) taşır ve library'den kaldırır.
import fs from "fs";
import path from "path";

const LOCALES = ["tr", "en", "ru", "ar", "de", "fr", "it", "es", "az", "kk", "tg", "zh", "ur", "lt", "pl"];
const SOLUTION_KEYS = [
  "dumanIsiTahliye", "konforIklimlendirme", "hijyenikFiltrasyon", "endustriyelHavaYonetimi",
  "hayvancilikTesisleri", "trafoEnerjiOdalari", "seraTarimsal", "atexPatlamaKoruma",
  "akilliOtomasyon", "konutHavalandirma", "marinOffshore", "projeBazliOzelImalat", "cfdDanismanlik",
];
const dictDir = path.join(process.cwd(), "src", "app", "[locale]", "dictionaries");

function migrateSection(section) {
  // Mevcut banner değerini bul (önce üst seviye, sonra library)
  let banner =
    typeof section.bannerDescription === "string"
      ? section.bannerDescription
      : section.library && typeof section.library.bannerDescription === "string"
        ? section.library.bannerDescription
        : "";

  // library'den bannerDescription'ı çıkar
  if (section.library && "bannerDescription" in section.library) {
    const { bannerDescription, ...restLib } = section.library;
    void bannerDescription;
    section.library = restLib;
  }

  // titleHighlight'tan hemen sonra ekleyerek yeniden sırala (varsa eski üst seviye anahtarı atla)
  const out = {};
  let inserted = false;
  for (const [k, v] of Object.entries(section)) {
    if (k === "bannerDescription") continue;
    out[k] = v;
    if (k === "titleHighlight") {
      out.bannerDescription = banner;
      inserted = true;
    }
  }
  if (!inserted) return { bannerDescription: banner, ...out };
  return out;
}

let changed = 0;
for (const loc of LOCALES) {
  const file = path.join(dictDir, loc, "solutions.json");
  if (!fs.existsSync(file)) {
    console.log(`SKIP (yok): ${loc}`);
    continue;
  }
  const json = JSON.parse(fs.readFileSync(file, "utf-8"));
  let localeChanged = 0;
  for (const key of SOLUTION_KEYS) {
    if (json[key] && typeof json[key] === "object") {
      json[key] = migrateSection(json[key]);
      localeChanged++;
    }
  }
  fs.writeFileSync(file, JSON.stringify(json, null, 2) + "\n", "utf-8");
  changed += localeChanged;
  console.log(`${loc}: ${localeChanged} çözüm güncellendi`);
}
console.log(`Toplam: ${changed} çözüm bölümü işlendi.`);
