#!/usr/bin/env node
/** Referanslar hero stats bar values */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const DICT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src/app/[locale]/dictionaries");

for (const locale of fs.readdirSync(DICT, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)) {
  const file = path.join(DICT, locale, "corporate.json");
  if (!fs.existsSync(file)) continue;
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!data.referanslar) continue;
  data.referanslar.statsProjectsValue = "300+";
  data.referanslar.statsCountriesValue = "30";
  data.referanslar.statsPeriodValue = "2019\u20132026";
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  console.log("patched", locale);
}

console.log("done");
