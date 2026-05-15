import "server-only";
import path from "path";
import { fileURLToPath } from "url";
import { cache } from "react";
import { hasLocale, type Locale } from "@/i18n/config";
import { readJsonFile } from "@/lib/read-json-file";

const dictionariesRoot = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "dictionaries"
);

function loadJson(locale: string, file: string): any {
  const filePath = path.join(dictionariesRoot, locale, `${file}.json`);
  return readJsonFile(filePath);
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
