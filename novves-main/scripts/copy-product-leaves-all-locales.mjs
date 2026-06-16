import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dictDir = path.join(repoRoot, "src/app/[locale]/dictionaries");
const tr = JSON.parse(fs.readFileSync(path.join(repoRoot, "src/app/[locale]/dictionaries/tr/products.json"), "utf8"));

const LEAF_KEYS = [
  "dumanIsiTahliyeFanlari",
  "kovanTipiAksiyalFanlar",
  "exproofFanlar",
  "endustriyelFanlar",
  "ecFanlar",
  "catiFanlari",
  "duvarTipiFanlar",
  "banyoFanlari",
  "kanalFanlari",
  "hucreliFanlar",
  "mutfakFanlari",
  "siginakFanlari",
  "tavukcuFanlari",
  "tozToplamaUniteleri",
  "klimaSantralleri",
  "havuzNemAlmaSantrali",
  "isiGeriKazanimCihazlari",
  "damperler",
  "menfezPanjurlar",
  "filtreler",
  "titresimIzolatorleri",
  "otomasyonPanolari",
  "plcOtomasyon",
  "sensorler",
  "kontrolKartlari",
  "zamanlamaKontrol",
  "gucElektronigi",
  "disUniteler",
  "elektrikliIsitici",
  "suluIsitici",
  "orcaHx",
  "remoraAksesuarlari",
];

const CATEGORY_SYNC_KEYS = [
  "havaHareketi",
  "iklimlendirme",
  "sogutmaVeIsitma",
  "havaYonetimi",
  "havaDagitimi",
  "havaFiltrasyonu",
  "aksesuarlar",
  "otomasyonMalzemeleri",
  "titresimVeSesIzolasyon",
];

const locales = fs
  .readdirSync(dictDir)
  .filter((d) => d !== "tr" && fs.existsSync(path.join(dictDir, d, "products.json")));

for (const locale of locales) {
  const filePath = path.join(dictDir, locale, "products.json");
  const products = JSON.parse(fs.readFileSync(filePath, "utf8"));

  for (const key of LEAF_KEYS) {
    if (!tr[key]) continue;
    products[key] = JSON.parse(JSON.stringify(tr[key]));
  }

  for (const key of CATEGORY_SYNC_KEYS) {
    if (!tr[key]) continue;
    products[key] = JSON.parse(JSON.stringify(tr[key]));
  }

  delete products.chillerler;

  fs.writeFileSync(filePath, `${JSON.stringify(products, null, 2)}\n`, "utf8");
  console.log(locale, "updated");
}
