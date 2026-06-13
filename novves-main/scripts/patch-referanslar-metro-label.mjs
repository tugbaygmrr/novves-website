import fs from "node:fs";
import path from "node:path";

const root = path.join(import.meta.dirname, "../src/app/[locale]/dictionaries");
const LABELS = {
  tr: "Metro-Rayl\u0131 Sistem",
  en: "Metro-Rail System",
  de: "Metro-Schienensystem",
  fr: "Metro-Systeme ferroviaires",
  ru: "\u041c\u0435\u0442\u0440\u043e-\u0436\u0435\u043b\u0435\u0437\u043d\u043e\u0434\u043e\u0440\u043e\u0436\u043d\u0430\u044f \u0441\u0438\u0441\u0442\u0435\u043c\u0430",
  ar: "\u0646\u0638\u0627\u0645 \u0627\u0644\u0645\u062a\u0631\u0648 \u0627\u0644\u0633\u0643\u0643\u064a",
};

for (const locale of fs.readdirSync(root)) {
  const file = path.join(root, locale, "corporate.json");
  if (!fs.existsSync(file)) continue;
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!data.referanslar?.classLabels) continue;
  data.referanslar.classLabels.metro = LABELS[locale] ?? LABELS.en;
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  console.log("patched", locale);
}

console.log("done");
