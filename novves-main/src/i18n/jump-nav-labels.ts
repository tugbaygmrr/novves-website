import type { Locale } from "./config";

/** Sabit köşe / mobil atlama menüsü — metinler çeviri dosyasından + “Ana sayfa” yerel adı */
export type JumpNavLabels = {
  home: string;
  solutions: string;
  products: string;
  catalogs: string;
  references: string;
  certificates: string;
  company: string;
  faq: string;
};

const JUMP_HOME: Record<Locale, string> = {
  tr: "Anasayfa",
  en: "Home",
  ru: "Главная",
  ar: "الرئيسية",
  de: "Startseite",
  it: "Home",
  fr: "Accueil",
  az: "Ana səhifə",
  kk: "Басты бет",
  tg: "Асосӣ",
  es: "Inicio",
  zh: "首页",
  ur: "ہوم",
  lt: "Pradžia",
  pl: "Strona główna",
};

/** Doküman Kütüphanesi yerine kısa "Kataloglar" — barda yerden kazanmak için */
const JUMP_CATALOGS: Record<Locale, string> = {
  tr: "Kataloglar",
  en: "Catalogs",
  ru: "Каталоги",
  ar: "الكتالوجات",
  de: "Kataloge",
  it: "Cataloghi",
  fr: "Catalogues",
  az: "Kataloqlar",
  kk: "Каталогтар",
  tg: "Каталогҳо",
  es: "Catálogos",
  zh: "目录",
  ur: "کیٹلاگز",
  lt: "Katalogai",
  pl: "Katalogi",
};

/** Sıkça Sorulan Sorular yerine kısa "SSS" / FAQ — barda yerden kazanmak için */
const JUMP_FAQ: Record<Locale, string> = {
  tr: "SSS",
  en: "FAQ",
  ru: "FAQ",
  ar: "الأسئلة الشائعة",
  de: "FAQ",
  it: "FAQ",
  fr: "FAQ",
  az: "SSC",
  kk: "ЖҚС",
  tg: "ПСД",
  es: "FAQ",
  zh: "常见问题",
  ur: "عمومی سوالات",
  lt: "DUK",
  pl: "FAQ",
};

export function jumpNavHomeLabel(locale: Locale): string {
  return JUMP_HOME[locale];
}

type JumpNavDictSource = {
  common: {
    navbar: {
      solutions: string;
      products: string;
      links: {
        documentLibrary: string;
        references: string;
        certificates: string;
        whoWeAre: string;
      };
    };
  };
  home: { faq: { tag: string } };
};

export function buildJumpNavLabels(locale: Locale, dict: JumpNavDictSource): JumpNavLabels {
  const nb = dict.common.navbar;
  const lk = nb.links;
  return {
    home: jumpNavHomeLabel(locale),
    solutions: nb.solutions,
    products: nb.products,
    catalogs: JUMP_CATALOGS[locale] ?? lk.documentLibrary,
    references: lk.references,
    certificates: lk.certificates,
    company: lk.whoWeAre,
    faq: JUMP_FAQ[locale] ?? dict.home.faq.tag,
  };
}
