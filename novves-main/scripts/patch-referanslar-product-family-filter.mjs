#!/usr/bin/env node
/** Replace referanslar.allClasses with allProductFamilies in all locales. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DICT = path.join(ROOT, "src/app/[locale]/dictionaries");

const OVERRIDES = {
  tr: "\u00dcr\u00fcn Ailesine G\u00f6re",
  en: "By Product Family",
};

for (const locale of fs.readdirSync(DICT, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)) {
  const corpPath = path.join(DICT, locale, "corporate.json");
  const prodPath = path.join(DICT, locale, "products.json");
  if (!fs.existsSync(corpPath)) continue;

  const corp = JSON.parse(fs.readFileSync(corpPath, "utf8"));
  if (!corp.referanslar) continue;

  let label = OVERRIDES[locale];
  if (!label && fs.existsSync(prodPath)) {
    const prod = JSON.parse(fs.readFileSync(prodPath, "utf8"));
    label =
      prod.shared?.allProductFamilies ??
      prod.shared?.filterSeries ??
      "By Product Family";
  }
  if (!label) label = "By Product Family";

  corp.referanslar.allProductFamilies = label;
  delete corp.referanslar.allClasses;

  fs.writeFileSync(corpPath, `${JSON.stringify(corp, null, 2)}\n`, "utf8");
  console.log("patched", locale, "->", label);
}

console.log("done");
