import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dictDir = path.join(repoRoot, "src/app/[locale]/dictionaries");

const CTA_BY_LOCALE = {
  tr: "Duman Tahliye Fanlar\u0131",
  en: "Smoke Exhaust Fans",
  de: "Rauchabzugsventilatoren",
  fr: "Ventilateurs de d\u00e9senfumage",
  es: "Ventiladores de extracci\u00f3n de humo",
  it: "Ventilatori per estrazione fumi",
  ru: "\u0414\u044b\u043c\u043e\u0443\u0434\u0430\u043b\u044f\u044e\u0449\u0438\u0435 \u0432\u0435\u043d\u0442\u0438\u043b\u044f\u0442\u043e\u0440\u044b",
  ar: "\u0645\u0631\u0627\u0648\u062d \u0625\u062e\u0644\u0627\u0621 \u0627\u0644\u062f\u062e\u0627\u0646",
  az: "T\u00fcst\u00fc \u00e7\u0131xarma ventilyatorlar\u0131",
  kk: "\u0422\u04af\u0442\u0456\u043d \u0448\u044b\u0493\u0430\u0440\u0443 \u0436\u0435\u043b\u0434\u0435\u0442\u043a\u0456\u0448\u0442\u0435\u0440\u0456",
  tg: "\u0412\u0435\u043d\u0442\u0438\u043b\u044f\u0442\u043e\u0440\u04b3\u043e\u0438 \u0438\u0441\u0442\u0438\u0445\u0440\u043e\u04b7\u0438 \u0434\u0443\u0434",
  zh: "\u6392\u70df\u98ce\u673a",
  ur: "\u062f\u06be\u0648\u0627\u06ba \u0646\u06a9\u0627\u0644\u0646\u06d2 \u0648\u0627\u0644\u06d2 \u067e\u0646\u06a9\u06be\u06d2",
  lt: "D\u016bm\u0173 i\u0161traukimo ventiliatoriai",
  pl: "Wentylatory dymowe",
  ro: "Ventilatoare de evacuare fum",
  hu: "F\u00fcstelsz\u00edv\u00f3 ventil\u00e1torok",
};

const HREF = "/urunler/duman-isi-tahliye-fanlari";

for (const [locale, label] of Object.entries(CTA_BY_LOCALE)) {
  const filePath = path.join(dictDir, locale, "solutions.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  data.dumanIsiTahliye.ctaSecondary = label;
  data.dumanIsiTahliye.ctaSecondaryHref = HREF;
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  console.log(locale, data.dumanIsiTahliye.ctaSecondary);
}
