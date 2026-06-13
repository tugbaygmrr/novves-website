#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const DICT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src/app/[locale]/dictionaries");

const TITLES = {
  tr: "Referanslar\u0131m\u0131z Cebinizde",
  en: "Our References in Your Pocket",
  de: "Unsere Referenzen in Ihrer Tasche",
  fr: "Nos r\u00e9f\u00e9rences dans votre poche",
  ru: "\u041d\u0430\u0448\u0438 \u0440\u0435\u0444\u0435\u0440\u0435\u043d\u0441\u044b \u0432 \u0432\u0430\u0448\u0435\u043c \u043a\u0430\u0440\u043c\u0430\u043d\u0435",
  ar: "\u0645\u0631\u0627\u062c\u0639\u0646\u0627 \u0641\u064a \u062c\u064a\u0628\u0643",
  es: "Nuestras referencias en tu bolsillo",
  it: "I nostri riferimenti in tasca",
  pl: "Nasze referencje w kieszeni",
  ro: "Referin\u021bele noastre \u00een buzunar",
  hu: "Referenci\u00e1ink a zsebedben",
  lt: "M\u016bs\u0173 referencijos ki\u0161en\u0117je",
  az: "Referanslar\u0131m\u0131z cibinizd\u0259",
  kk: "Referans\u043b\u0430\u0440 \u0441\u0435\u0431\u0435\u0431\u0456\u0437\u0434\u0435",
  tg: "\u041c\u0430\u04b7\u043e\u0438 \u043c\u0430 \u0434\u0430\u0440 \u04b7\u0435\u0431\u0438 \u0448\u0443\u043c\u0430",
  ur: "\u062c\u06cc\u0628 \u0645\u06cc\u06ba \u062d\u0645\u0627\u0631\u06d2 \u062d\u0648\u0627\u0644\u06d2",
  zh: "\u968f\u8eab\u53c2\u8003\u9879\u76ee",
};

const DOC_LINK = {
  tr: "Dok\u00fcman k\u00fct\u00fcphanesi",
  en: "Document library",
  de: "Dokumentenbibliothek",
  fr: "Biblioth\u00e8que documentaire",
  ru: "\u0411\u0438\u0431\u043b\u0438\u043e\u0442\u0435\u043a\u0430 \u0434\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u043e\u0432",
  ar: "\u0645\u0643\u062a\u0628\u0629 \u0627\u0644\u0648\u062b\u0627\u0626\u0642",
  es: "Biblioteca de documentos",
  it: "Biblioteca documenti",
  pl: "Biblioteka dokument\u00f3w",
  ro: "Biblioteca de documente",
  hu: "Dokumentumt\u00e1r",
  lt: "Dokument\u0173 biblioteka",
  az: "S\u0259n\u0259dl\u0259r kitabxanas\u0131",
  kk: "\u049a\u04b1\u0436\u0430\u0442\u0442\u0430\u0440 \u043a\u0456\u0442\u0430\u043f\u0445\u0430\u043d\u0430\u0441\u044b",
  tg: "\u041a\u0438\u0442\u043e\u0431\u0445\u043e\u043d\u0430\u0438 \u04b7\u0430\u043c\u043e\u0442",
  ur: "\u062f\u0633\u062a\u0627\u0648\u06cc\u0632 \u0644\u0627\u0626\u0628\u0631\u06cc\u0631\u06cc",
  zh: "\u6587\u6863\u5e93",
};

for (const locale of fs.readdirSync(DICT, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)) {
  const file = path.join(DICT, locale, "corporate.json");
  if (!fs.existsSync(file)) continue;
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!data.referanslar?.catalogCta) continue;
  data.referanslar.catalogCta.title = TITLES[locale] ?? TITLES.en;
  data.referanslar.catalogCta.documentLibraryLink = DOC_LINK[locale] ?? DOC_LINK.en;
  delete data.referanslar.catalogCta.languagesList;
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  console.log("patched", locale);
}

console.log("done");
