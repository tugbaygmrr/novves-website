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
    catalogs: lk.documentLibrary,
    references: lk.references,
    certificates: lk.certificates,
    company: lk.whoWeAre,
    faq: dict.home.faq.tag,
  };
}
