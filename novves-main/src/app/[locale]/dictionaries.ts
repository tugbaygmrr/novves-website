import "server-only";
import fs from "fs";
import path from "path";

function loadJson(locale: string, file: string) {
  const filePath = path.join(
    process.cwd(),
    "src",
    "app",
    "[locale]",
    "dictionaries",
    locale,
    `${file}.json`
  );
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function loadAll(locale: string) {
  return {
    common: loadJson(locale, "common"),
    home: loadJson(locale, "home"),
    solutions: loadJson(locale, "solutions"),
    products: loadJson(locale, "products"),
    services: loadJson(locale, "services"),
    technical: loadJson(locale, "technical"),
    corporate: loadJson(locale, "corporate"),
    contact: loadJson(locale, "contact"),
    sustainability: loadJson(locale, "sustainability"),
    kvkk: loadJson(locale, "kvkk"),
  };
}

const validLocales = ["tr", "en", "ru"] as const;
export type Locale = (typeof validLocales)[number];

export const hasLocale = (locale: string): locale is Locale =>
  validLocales.includes(locale as Locale);

export const getDictionary = async (locale: Locale) => loadAll(locale);
