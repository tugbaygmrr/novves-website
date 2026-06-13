import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDir = path.dirname(fileURLToPath(import.meta.url));
const translationsPath = path.join(scriptsDir, "sector-building-types-translations.json");
const translations = JSON.parse(fs.readFileSync(translationsPath, "utf8"));

const azProductFixes = new Map([
  ["Kanal Fan, Jet Fan, Damper", "Kanal ventilyatoru, Jet Fan, Damper"],
  ["Kondisioner, Kanal Fan, Havaland\u0131rma", "Kondisioner, kanal ventilyatoru, ventilyasiya"],
  ["\u0130stiliyin B\u0259rpas\u0131, Kanal Fan, Havaland\u0131rma", "\u0130stilik b\u0259rpas\u0131, kanal ventilyatoru, ventilyasiya"],
  ["Kanal Fan, \u0130stiliyin B\u0259rpas\u0131, EC Fan", "Kanal ventilyatoru, istilik b\u0259rpas\u0131, EC Fan"],
  ["Kondisioner, Havaland\u0131rma, Damper", "Kondisioner, ventilyasiya, Damper"],
  ["Kanal Fan, Divar Fan", "Kanal ventilyatoru, divar ventilyatoru"],
  ["Kanal Tipi Fan, EC Fan", "Kanal tipli ventilyator, EC Fan"],
  ["Ex-proof Kanal Fan, Toz Toplanmas\u0131", "Ex-proof kanal ventilyatoru, toz toplama"],
  ["Kompakt Ex-proof Fan, Damper", "Kompakt Ex-proof ventilyator, Damper"],
  ["Kanal Fan, \u0130stilik B\u0259rpas\u0131, Kompakt AHU", "Kanal ventilyatoru, istilik b\u0259rpas\u0131, kompakt AHU"],
  ["EC Fan, Mobil Fan, Havaland\u0131rma", "EC Fan, mobil ventilyator, ventilyasiya"],
  ["EC Fan, Y\u0131\u011fcam Kanal Fan", "EC Fan, y\u0131\u011fcam kanal ventilyatoru"],
  ["Eksenel Fan, Kanal Fan", "Eksenel ventilyator, kanal ventilyatoru"],
  ["Kanal Fan, EC Fan", "Kanal ventilyatoru, EC Fan"],
]);

const azBuildingTypeFixes = new Map([
  ["Mal-qara v\u0259 T\u00f6vl\u0259 Havaland\u0131rmas\u0131", "Mal-qara v\u0259 t\u00f6vl\u0259 ventilyasiyas\u0131"],
]);

let azPatched = 0;
for (const rows of Object.values(translations.az)) {
  for (const row of rows) {
    if (azProductFixes.has(row.products)) {
      row.products = azProductFixes.get(row.products);
      azPatched += 1;
    }
    if (azBuildingTypeFixes.has(row.buildingType)) {
      row.buildingType = azBuildingTypeFixes.get(row.buildingType);
      azPatched += 1;
    }
  }
}

const frRow = translations.fr.konforIklimlendirme[3];
if (frRow.products === "AHU, EC Fan, Filtre") {
  frRow.products = "AHU, ventilateur EC, filtre";
}

fs.writeFileSync(translationsPath, `${JSON.stringify(translations, null, 2)}\n`, "utf8");
console.log("patched az fields:", azPatched);
