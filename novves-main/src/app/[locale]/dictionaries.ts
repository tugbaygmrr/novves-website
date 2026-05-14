import "server-only";
import fs from "fs";
import path from "path";
import { cache } from "react";
import { hasLocale, type Locale } from "@/i18n/config";

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

/** Her dil yalnızca kendi klasöründeki JSON’dan — İngilizce ile otomatik birleştirme yok */
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

export type { Locale };

export { hasLocale };

/** Aynı istekte layout + generateMetadata çift okumasın diye önbellek */
export const getDictionary = cache(async (locale: Locale) => loadAll(locale));

/** Navbar / atlama menüsü / anasayfa — yalnızca iki JSON; tam `getDictionary` yerine SSR ve TTFB için */
export const getLocaleShellDictionary = cache(async (locale: Locale) => ({
  common: loadJson(locale, "common"),
  home: loadJson(locale, "home"),
}));
