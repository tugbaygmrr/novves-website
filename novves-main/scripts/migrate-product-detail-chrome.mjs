// Tek seferlik migrasyon: ProductDetailPage kullanan leaf ürün bölümlerine,
// sayfaya özel düzenlenebilir "chrome" (etiket metinleri) ekler. Değerler şu anki
// ortak products.shared + ui.allSolutions'tan kopyalanır → site görünümü değişmez.
import fs from "fs";
import path from "path";

const LOCALES = ["tr", "en", "ru", "ar", "de", "fr", "it", "es", "az", "kk", "tg", "zh", "ur", "lt", "pl"];
const SECTIONS = [
  "banyoFanlari", "catiFanlari", "damperler", "dumanIsiTahliyeFanlari", "duvarTipiFanlar",
  "ecFanlar", "endustriyelFanlar", "exproofFanlar", "hucreliFanlar", "isiGeriKazanimCihazlari",
  "kanalFanlari", "kovanTipiAksiyalFanlar", "mutfakFanlari", "siginakFanlari",
];
// ProductDetailPage'in kullandığı shared etiket anahtarları
const CHROME_KEYS = [
  "home", "products", "productFamily", "certified", "productRange", "technicalSupport",
  "model", "models", "technicalSupportRequest", "allProducts", "mostPreferred",
  "detailedView", "productFamilies", "inspect", "lookingForProduct", "teamReady",
];
const ALL_SOLUTIONS = {
  tr: "Çözümlerin Tümünü Gör", en: "View All Solutions", ru: "Посмотреть все решения",
  ar: "عرض جميع الحلول", de: "Alle Lösungen ansehen", it: "Vedi tutte le soluzioni",
  fr: "Voir toutes les solutions", az: "Bütün həlləri gör", kk: "Барлық шешімдерді көру",
  tg: "Ҳамаи ҳалҳоро дидан", es: "Ver todas las soluciones", zh: "查看所有解决方案",
  ur: "تمام حل دیکھیں", lt: "Žiūrėti visus sprendimus", pl: "Zobacz wszystkie rozwiązania",
};

const dictDir = path.join(process.cwd(), "src", "app", "[locale]", "dictionaries");
let changed = 0;
for (const loc of LOCALES) {
  const file = path.join(dictDir, loc, "products.json");
  if (!fs.existsSync(file)) continue;
  const json = JSON.parse(fs.readFileSync(file, "utf-8"));
  const shared = json.shared || {};
  let n = 0;
  for (const sec of SECTIONS) {
    const block = json[sec];
    if (!block || typeof block !== "object") continue;
    if (block.chrome && typeof block.chrome === "object") continue; // zaten var
    const chrome = {};
    for (const k of CHROME_KEYS) chrome[k] = typeof shared[k] === "string" ? shared[k] : "";
    chrome.allSolutions = ALL_SOLUTIONS[loc] ?? ALL_SOLUTIONS.en;
    block.chrome = chrome;
    n++;
  }
  fs.writeFileSync(file, JSON.stringify(json, null, 2) + "\n", "utf-8");
  changed += n;
  console.log(`${loc}: ${n} sayfaya chrome eklendi`);
}
console.log(`Toplam: ${changed} leaf bölüm güncellendi.`);
