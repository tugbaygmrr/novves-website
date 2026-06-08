import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(
  readFileSync(path.join(root, "scripts/reference-translator-data.json"), "utf8"),
);
const out = path.join(root, "src/lib/references/reference-translator.ts");

/** Emit a JS string literal using \\uXXXX escapes for all non-ASCII. */
function asciiJsString(s) {
  let out = '"';
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    if (c === 0x22) out += '\\"';
    else if (c === 0x5c) out += "\\\\";
    else if (c >= 0x20 && c < 0x7f) out += s[i];
    else out += "\\u" + c.toString(16).padStart(4, "0");
  }
  return out + '"';
}

function fmtRecord(name, obj) {
  const lines = Object.entries(obj).map(([k, v]) => `  ${k}: ${asciiJsString(v)},`);
  return `const ${name}: Record<number, string> = {\n${lines.join("\n")}\n};`;
}

function fmtTerms(name, pairs) {
  const sorted = [...pairs].sort((a, b) => b[0].length - a[0].length);
  const lines = sorted.map(([tr, en]) => `  [${asciiJsString(tr)}, ${JSON.stringify(en)}],`);
  return `const ${name}: Array<[string, string]> = [\n${lines.join("\n")}\n];`;
}

function fmtEnMap(name, obj) {
  const lines = Object.entries(obj).map(
    ([k, v]) => `  ${JSON.stringify(k)}: ${asciiJsString(v)},`,
  );
  return `const ${name}: Record<string, string> = {\n${lines.join("\n")}\n};`;
}

const content = `import type { Locale } from "@/i18n/config";

/** New references (114+) - locale translation applies in this range. */
export const NEW_REFERENCE_ID_MIN = 114;

type PrefixKind = "projenin" | "bu_proje_kapsaminda" | "proje_kapsaminda" | "bu_projede";
type SuffixKind = "designed" | "manufactured";

type ParsedDescription = {
  prefix: PrefixKind;
  suffix: SuffixKind;
  body: string;
};

const SUFFIX_DESIGNED = ${asciiJsString(data.suffixDesigned)};
const SUFFIX_MANUFACTURED = ${asciiJsString(data.suffixManufactured)};

const PREFIXES: ReadonlyArray<{ kind: PrefixKind; text: string }> = [
  { kind: "bu_proje_kapsaminda", text: ${asciiJsString(data.prefixes.bu_proje_kapsaminda)} },
  { kind: "proje_kapsaminda", text: ${asciiJsString(data.prefixes.proje_kapsaminda)} },
  { kind: "bu_projede", text: ${asciiJsString(data.prefixes.bu_projede)} },
  { kind: "projenin", text: ${asciiJsString(data.prefixes.projenin)} },
];

${fmtRecord("EN_TITLE_OVERRIDES", data.titles.en)}
${fmtRecord("DE_TITLE_OVERRIDES", data.titles.de)}
${fmtRecord("FR_TITLE_OVERRIDES", data.titles.fr)}
${fmtRecord("RU_TITLE_OVERRIDES", data.titles.ru)}
${fmtRecord("AR_TITLE_OVERRIDES", data.titles.ar)}
${fmtRecord("ES_TITLE_OVERRIDES", data.titles.es)}
${fmtRecord("IT_TITLE_OVERRIDES", data.titles.it)}
${fmtRecord("PL_TITLE_OVERRIDES", data.titles.pl)}
${fmtRecord("KK_TITLE_OVERRIDES", data.titles.kk)}
${fmtRecord("ZH_TITLE_OVERRIDES", data.titles.zh)}
${fmtRecord("UR_TITLE_OVERRIDES", data.titles.ur)}
${fmtRecord("LT_TITLE_OVERRIDES", data.titles.lt)}
${fmtRecord("TG_TITLE_OVERRIDES", data.titles.tg)}
${fmtRecord("AZ_TITLE_OVERRIDES", data.titles.az)}

${fmtTerms("TR_TO_EN_TERMS", data.trEnTerms)}

${fmtEnMap("EN_TO_DE", data.enDe)}
${fmtEnMap("EN_TO_FR", data.enFr)}
${fmtEnMap("EN_TO_RU", data.enRu)}
${fmtEnMap("EN_TO_AR", data.enAr)}
${fmtEnMap("EN_TO_ES", data.enEs)}
${fmtEnMap("EN_TO_IT", data.enIt)}
${fmtEnMap("EN_TO_PL", data.enPl)}
${fmtEnMap("EN_TO_KK", data.enKk)}
${fmtEnMap("EN_TO_ZH", data.enZh)}
${fmtEnMap("EN_TO_UR", data.enUr)}
${fmtEnMap("EN_TO_LT", data.enLt)}
${fmtEnMap("EN_TO_TG", data.enTg)}
${fmtEnMap("EN_TO_AZ", data.enAz)}

const TITLE_OVERRIDES: Partial<Record<Locale, Record<number, string>>> = {
  en: EN_TITLE_OVERRIDES,
  de: DE_TITLE_OVERRIDES,
  fr: FR_TITLE_OVERRIDES,
  ru: RU_TITLE_OVERRIDES,
  ar: AR_TITLE_OVERRIDES,
  es: ES_TITLE_OVERRIDES,
  it: IT_TITLE_OVERRIDES,
  pl: PL_TITLE_OVERRIDES,
  kk: KK_TITLE_OVERRIDES,
  zh: ZH_TITLE_OVERRIDES,
  ur: UR_TITLE_OVERRIDES,
  lt: LT_TITLE_OVERRIDES,
  tg: TG_TITLE_OVERRIDES,
  az: AZ_TITLE_OVERRIDES,
};

const LOCALE_TERM_MAPS: Partial<Record<Locale, Record<string, string>>> = {
  de: EN_TO_DE,
  fr: EN_TO_FR,
  ru: EN_TO_RU,
  ar: EN_TO_AR,
  es: EN_TO_ES,
  it: EN_TO_IT,
  pl: EN_TO_PL,
  kk: EN_TO_KK,
  zh: EN_TO_ZH,
  ur: EN_TO_UR,
  lt: EN_TO_LT,
  tg: EN_TO_TG,
  az: EN_TO_AZ,
};

const SORTED_TR_TO_EN = [...TR_TO_EN_TERMS].sort((a, b) => b[0].length - a[0].length);

function resolveTranslationLocale(locale: Locale): Locale | null {
  if (locale === "tr") return null;
  return locale;
}

function parseTrDescription(description: string): ParsedDescription | null {
  for (const { kind, text } of PREFIXES) {
    if (!description.startsWith(text)) continue;
    const middle = description.slice(text.length);
    if (middle.endsWith(SUFFIX_DESIGNED)) {
      return {
        prefix: kind,
        suffix: "designed",
        body: middle.slice(0, middle.length - SUFFIX_DESIGNED.length),
      };
    }
    if (middle.endsWith(SUFFIX_MANUFACTURED)) {
      return {
        prefix: kind,
        suffix: "manufactured",
        body: middle.slice(0, middle.length - SUFFIX_MANUFACTURED.length),
      };
    }
  }
  return null;
}

function translateBodyToEnglish(body: string): string {
  let out = body;
  for (const [tr, en] of SORTED_TR_TO_EN) {
    out = out.split(tr).join(en);
  }
  return out;
}

function translateBodyToLocale(bodyEn: string, locale: Locale): string {
  if (locale === "en") return bodyEn;
  const map = LOCALE_TERM_MAPS[locale];
  if (!map) return bodyEn;
  const entries = Object.entries(map).sort((a, b) => b[0].length - a[0].length);
  let out = bodyEn;
  for (const [en, localized] of entries) {
    out = out.split(en).join(localized);
  }
  return out;
}

function wrapDescription(prefix: PrefixKind, suffix: SuffixKind, body: string, locale: Locale): string {
  const bodyLocalized = translateBodyToLocale(translateBodyToEnglish(body), locale);
  switch (locale) {
    case "de":
      return wrapDe(prefix, suffix, bodyLocalized);
    case "fr":
      return wrapFr(prefix, suffix, bodyLocalized);
    case "ru":
      return wrapRu(prefix, suffix, bodyLocalized);
    case "ar":
      return wrapAr(prefix, suffix, bodyLocalized);
    case "es":
      return wrapEs(prefix, suffix, bodyLocalized);
    case "it":
      return wrapIt(prefix, suffix, bodyLocalized);
    case "pl":
      return wrapPl(prefix, suffix, bodyLocalized);
    case "kk":
      return wrapKk(prefix, suffix, bodyLocalized);
    case "zh":
      return wrapZh(prefix, suffix, bodyLocalized);
    case "ur":
      return wrapUr(prefix, suffix, bodyLocalized);
    case "lt":
      return wrapLt(prefix, suffix, bodyLocalized);
    case "tg":
      return wrapTg(prefix, suffix, bodyLocalized);
    case "az":
      return wrapAz(prefix, suffix, bodyLocalized);
    default:
      return wrapEn(prefix, suffix, bodyLocalized);
  }
}

function wrapEn(prefix: PrefixKind, suffix: SuffixKind, b: string): string {
  const m = {
    projenin: {
      designed: \`The project's \${b} were designed and manufactured by NOVVES.\`,
      manufactured: \`The project's \${b} were manufactured by NOVVES.\`,
    },
    bu_proje_kapsaminda: {
      designed: \`Within the scope of this project, \${b} were designed and manufactured by NOVVES.\`,
      manufactured: \`Within the scope of this project, \${b} were manufactured by NOVVES.\`,
    },
    proje_kapsaminda: {
      designed: \`Within the scope of the project, \${b} were designed and manufactured by NOVVES.\`,
      manufactured: \`Within the scope of the project, \${b} were manufactured by NOVVES.\`,
    },
    bu_projede: {
      designed: \`In this project, \${b} were designed and manufactured by NOVVES.\`,
      manufactured: \`In this project, \${b} were manufactured by NOVVES.\`,
    },
  } as const;
  return m[prefix][suffix];
}

function wrapDe(prefix: PrefixKind, suffix: SuffixKind, b: string): string {
  const m = {
    projenin: {
      designed: \`\${b} des Projekts wurden von NOVVES entworfen und hergestellt.\`,
      manufactured: \`\${b} des Projekts wurden von NOVVES hergestellt.\`,
    },
    bu_proje_kapsaminda: {
      designed: \`Im Rahmen dieses Projekts wurden \${b} von NOVVES entworfen und hergestellt.\`,
      manufactured: \`Im Rahmen dieses Projekts wurden \${b} von NOVVES hergestellt.\`,
    },
    proje_kapsaminda: {
      designed: \`Im Projektumfang wurden \${b} von NOVVES entworfen und hergestellt.\`,
      manufactured: \`Im Projektumfang wurden \${b} von NOVVES hergestellt.\`,
    },
    bu_projede: {
      designed: \`In diesem Projekt wurden \${b} von NOVVES entworfen und hergestellt.\`,
      manufactured: \`In diesem Projekt wurden \${b} von NOVVES hergestellt.\`,
    },
  } as const;
  return m[prefix][suffix];
}

function wrapFr(prefix: PrefixKind, suffix: SuffixKind, b: string): string {
  const m = {
    projenin: {
      designed: \`Les \${b} du projet ont \u00e9t\u00e9 con\u00e7us et fabriqu\u00e9s par NOVVES.\`,
      manufactured: \`Les \${b} du projet ont \u00e9t\u00e9 fabriqu\u00e9s par NOVVES.\`,
    },
    bu_proje_kapsaminda: {
      designed: \`Dans le cadre de ce projet, \${b} ont \u00e9t\u00e9 con\u00e7us et fabriqu\u00e9s par NOVVES.\`,
      manufactured: \`Dans le cadre de ce projet, \${b} ont \u00e9t\u00e9 fabriqu\u00e9s par NOVVES.\`,
    },
    proje_kapsaminda: {
      designed: \`Dans le cadre du projet, \${b} ont \u00e9t\u00e9 con\u00e7us et fabriqu\u00e9s par NOVVES.\`,
      manufactured: \`Dans le cadre du projet, \${b} ont \u00e9t\u00e9 fabriqu\u00e9s par NOVVES.\`,
    },
    bu_projede: {
      designed: \`Dans ce projet, \${b} ont \u00e9t\u00e9 con\u00e7us et fabriqu\u00e9s par NOVVES.\`,
      manufactured: \`Dans ce projet, \${b} ont \u00e9t\u00e9 fabriqu\u00e9s par NOVVES.\`,
    },
  } as const;
  return m[prefix][suffix];
}

function wrapRu(prefix: PrefixKind, suffix: SuffixKind, b: string): string {
  const m = {
    projenin: {
      designed: \`\${b} \u043f\u0440\u043e\u0435\u043a\u0442\u0430 \u0431\u044b\u043b\u0438 \u0441\u043f\u0440\u043e\u0435\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u044b \u0438 \u043f\u0440\u043e\u0438\u0437\u0432\u0435\u0434\u0435\u043d\u044b \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u0435\u0439 NOVVES.\`,
      manufactured: \`\${b} \u043f\u0440\u043e\u0435\u043a\u0442\u0430 \u0431\u044b\u043b\u0438 \u043f\u0440\u043e\u0438\u0437\u0432\u0435\u0434\u0435\u043d\u044b \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u0435\u0439 NOVVES.\`,
    },
    bu_proje_kapsaminda: {
      designed: \`\u0412 \u0440\u0430\u043c\u043a\u0430\u0445 \u044d\u0442\u043e\u0433\u043e \u043f\u0440\u043e\u0435\u043a\u0442\u0430 \${b} \u0431\u044b\u043b\u0438 \u0441\u043f\u0440\u043e\u0435\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u044b \u0438 \u043f\u0440\u043e\u0438\u0437\u0432\u0435\u0434\u0435\u043d\u044b \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u0435\u0439 NOVVES.\`,
      manufactured: \`\u0412 \u0440\u0430\u043c\u043a\u0430\u0445 \u044d\u0442\u043e\u0433\u043e \u043f\u0440\u043e\u0435\u043a\u0442\u0430 \${b} \u0431\u044b\u043b\u0438 \u043f\u0440\u043e\u0438\u0437\u0432\u0435\u0434\u0435\u043d\u044b \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u0435\u0439 NOVVES.\`,
    },
    proje_kapsaminda: {
      designed: \`\u0412 \u0440\u0430\u043c\u043a\u0430\u0445 \u043f\u0440\u043e\u0435\u043a\u0442\u0430 \${b} \u0431\u044b\u043b\u0438 \u0441\u043f\u0440\u043e\u0435\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u044b \u0438 \u043f\u0440\u043e\u0438\u0437\u0432\u0435\u0434\u0435\u043d\u044b \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u0435\u0439 NOVVES.\`,
      manufactured: \`\u0412 \u0440\u0430\u043c\u043a\u0430\u0445 \u043f\u0440\u043e\u0435\u043a\u0442\u0430 \${b} \u0431\u044b\u043b\u0438 \u043f\u0440\u043e\u0438\u0437\u0432\u0435\u0434\u0435\u043d\u044b \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u0435\u0439 NOVVES.\`,
    },
    bu_projede: {
      designed: \`\u0412 \u044d\u0442\u043e\u043c \u043f\u0440\u043e\u0435\u043a\u0442\u0435 \${b} \u0431\u044b\u043b\u0438 \u0441\u043f\u0440\u043e\u0435\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u044b \u0438 \u043f\u0440\u043e\u0438\u0437\u0432\u0435\u0434\u0435\u043d\u044b \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u0435\u0439 NOVVES.\`,
      manufactured: \`\u0412 \u044d\u0442\u043e\u043c \u043f\u0440\u043e\u0435\u043a\u0442\u0435 \${b} \u0431\u044b\u043b\u0438 \u043f\u0440\u043e\u0438\u0437\u0432\u0435\u0434\u0435\u043d\u044b \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u0435\u0439 NOVVES.\`,
    },
  } as const;
  return m[prefix][suffix];
}

function wrapAr(prefix: PrefixKind, suffix: SuffixKind, b: string): string {
  const m = {
    projenin: {
      designed: \`\u062a\u0645 \u062a\u0635\u0645\u064a\u0645 \u0648\u062a\u0635\u0646\u064a\u0639 \${b} \u0644\u0644\u0645\u0634\u0631\u0648\u0639 \u0628\u0648\u0627\u0633\u0637\u0629 NOVVES.\`,
      manufactured: \`\u062a\u0645 \u062a\u0635\u0646\u064a\u0639 \${b} \u0644\u0644\u0645\u0634\u0631\u0648\u0639 \u0628\u0648\u0627\u0633\u0637\u0629 NOVVES.\`,
    },
    bu_proje_kapsaminda: {
      designed: \`\u0641\u064a \u0646\u0637\u0627\u0642 \u0647\u0630\u0627 \u0627\u0644\u0645\u0634\u0631\u0648\u0639\u060c \u062a\u0645 \u062a\u0635\u0645\u064a\u0645 \u0648\u062a\u0635\u0646\u064a\u0639 \${b} \u0628\u0648\u0627\u0633\u0637\u0629 NOVVES.\`,
      manufactured: \`\u0641\u064a \u0646\u0637\u0627\u0642 \u0647\u0630\u0627 \u0627\u0644\u0645\u0634\u0631\u0648\u0639\u060c \u062a\u0645 \u062a\u0635\u0646\u064a\u0639 \${b} \u0628\u0648\u0627\u0633\u0637\u0629 NOVVES.\`,
    },
    proje_kapsaminda: {
      designed: \`\u0641\u064a \u0646\u0637\u0627\u0642 \u0627\u0644\u0645\u0634\u0631\u0648\u0639\u060c \u062a\u0645 \u062a\u0635\u0645\u064a\u0645 \u0648\u062a\u0635\u0646\u064a\u0639 \${b} \u0628\u0648\u0627\u0633\u0637\u0629 NOVVES.\`,
      manufactured: \`\u0641\u064a \u0646\u0637\u0627\u0642 \u0627\u0644\u0645\u0634\u0631\u0648\u0639\u060c \u062a\u0645 \u062a\u0635\u0646\u064a\u0639 \${b} \u0628\u0648\u0627\u0633\u0637\u0629 NOVVES.\`,
    },
    bu_projede: {
      designed: \`\u0641\u064a \u0647\u0630\u0627 \u0627\u0644\u0645\u0634\u0631\u0648\u0639\u060c \u062a\u0645 \u062a\u0635\u0645\u064a\u0645 \u0648\u062a\u0635\u0646\u064a\u0639 \${b} \u0628\u0648\u0627\u0633\u0637\u0629 NOVVES.\`,
      manufactured: \`\u0641\u064a \u0647\u0630\u0627 \u0627\u0644\u0645\u0634\u0631\u0648\u0639\u060c \u062a\u0645 \u062a\u0635\u0646\u064a\u0639 \${b} \u0628\u0648\u0627\u0633\u0637\u0629 NOVVES.\`,
    },
  } as const;
  return m[prefix][suffix];
}

function wrapEs(prefix: PrefixKind, suffix: SuffixKind, b: string): string {
  const m = {
    projenin: {
      designed: \`Los \${b} del proyecto fueron dise\u00f1ados y fabricados por NOVVES.\`,
      manufactured: \`Los \${b} del proyecto fueron fabricados por NOVVES.\`,
    },
    bu_proje_kapsaminda: {
      designed: \`En el \u00e1mbito de este proyecto, \${b} fueron dise\u00f1ados y fabricados por NOVVES.\`,
      manufactured: \`En el \u00e1mbito de este proyecto, \${b} fueron fabricados por NOVVES.\`,
    },
    proje_kapsaminda: {
      designed: \`En el \u00e1mbito del proyecto, \${b} fueron dise\u00f1ados y fabricados por NOVVES.\`,
      manufactured: \`En el \u00e1mbito del proyecto, \${b} fueron fabricados por NOVVES.\`,
    },
    bu_projede: {
      designed: \`En este proyecto, \${b} fueron dise\u00f1ados y fabricados por NOVVES.\`,
      manufactured: \`En este proyecto, \${b} fueron fabricados por NOVVES.\`,
    },
  } as const;
  return m[prefix][suffix];
}

function wrapIt(prefix: PrefixKind, suffix: SuffixKind, b: string): string {
  const m = {
    projenin: {
      designed: \`I \${b} del progetto sono stati progettati e prodotti da NOVVES.\`,
      manufactured: \`I \${b} del progetto sono stati prodotti da NOVVES.\`,
    },
    bu_proje_kapsaminda: {
      designed: \`Nell'ambito di questo progetto, \${b} sono stati progettati e prodotti da NOVVES.\`,
      manufactured: \`Nell'ambito di questo progetto, \${b} sono stati prodotti da NOVVES.\`,
    },
    proje_kapsaminda: {
      designed: \`Nell'ambito del progetto, \${b} sono stati progettati e prodotti da NOVVES.\`,
      manufactured: \`Nell'ambito del progetto, \${b} sono stati prodotti da NOVVES.\`,
    },
    bu_projede: {
      designed: \`In questo progetto, \${b} sono stati progettati e prodotti da NOVVES.\`,
      manufactured: \`In questo progetto, \${b} sono stati prodotti da NOVVES.\`,
    },
  } as const;
  return m[prefix][suffix];
}

function wrapPl(prefix: PrefixKind, suffix: SuffixKind, b: string): string {
  const m = {
    projenin: {
      designed: \`\${b} projektu zosta\u0142y zaprojektowane i wyprodukowane przez NOVVES.\`,
      manufactured: \`\${b} projektu zosta\u0142y wyprodukowane przez NOVVES.\`,
    },
    bu_proje_kapsaminda: {
      designed: \`W ramach tego projektu \${b} zosta\u0142y zaprojektowane i wyprodukowane przez NOVVES.\`,
      manufactured: \`W ramach tego projektu \${b} zosta\u0142y wyprodukowane przez NOVVES.\`,
    },
    proje_kapsaminda: {
      designed: \`W ramach projektu \${b} zosta\u0142y zaprojektowane i wyprodukowane przez NOVVES.\`,
      manufactured: \`W ramach projektu \${b} zosta\u0142y wyprodukowane przez NOVVES.\`,
    },
    bu_projede: {
      designed: \`W tym projekcie \${b} zosta\u0142y zaprojektowane i wyprodukowane przez NOVVES.\`,
      manufactured: \`W tym projekcie \${b} zosta\u0142y wyprodukowane przez NOVVES.\`,
    },
  } as const;
  return m[prefix][suffix];
}

function wrapKk(prefix: PrefixKind, suffix: SuffixKind, b: string): string {
  const m = {
    projenin: {
      designed: \`\${b} NOVVES \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u044f\u0441\u044b \u0436\u043e\u043b \u0431\u043e\u0439\u044b\u043d\u0448\u0430 \u0436\u043e\u0431\u0430 \u0434\u04d9\u0439\u0456\u043d \u0436\u0430\u0441\u0430\u043b\u0434\u044b \u0436\u04d9\u043d\u0435 \u043e\u043d\u0434\u0456\u0440\u0456\u043b\u0434\u0456.\`,
      manufactured: \`\${b} NOVVES \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u044f\u0441\u044b \u0436\u043e\u043b \u0431\u043e\u0439\u044b\u043d\u0448\u0430 \u043e\u043d\u0434\u0456\u0440\u0456\u043b\u0434\u0456.\`,
    },
    bu_proje_kapsaminda: {
      designed: \`\u0411\u04b1\u043b \u0436\u043e\u0431\u0430 \u0430\u0443\u043c\u0430\u0493\u044b\u043d\u0434\u0430 \${b} NOVVES \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u044f\u0441\u044b \u0436\u043e\u043b \u0431\u043e\u0439\u044b\u043d\u0448\u0430 \u0436\u0430\u0441\u0430\u043b\u0434\u044b \u0436\u04d9\u043d\u0435 \u043e\u043d\u0434\u0456\u0440\u0456\u043b\u0434\u0456.\`,
      manufactured: \`\u0411\u04b1\u043b \u0436\u043e\u0431\u0430 \u0430\u0443\u043c\u0430\u0493\u044b\u043d\u0434\u0430 \${b} NOVVES \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u044f\u0441\u044b \u0436\u043e\u043b \u0431\u043e\u0439\u044b\u043d\u0448\u0430 \u043e\u043d\u0434\u0456\u0440\u0456\u043b\u0434\u0456.\`,
    },
    proje_kapsaminda: {
      designed: \`\u0416\u043e\u0431\u0430 \u0430\u0443\u043c\u0430\u0493\u044b\u043d\u0434\u0430 \${b} NOVVES \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u044f\u0441\u044b \u0436\u043e\u043b \u0431\u043e\u0439\u044b\u043d\u0448\u0430 \u0436\u0430\u0441\u0430\u043b\u0434\u044b \u0436\u04d9\u043d\u0435 \u043e\u043d\u0434\u0456\u0440\u0456\u043b\u0434\u0456.\`,
      manufactured: \`\u0416\u043e\u0431\u0430 \u0430\u0443\u043c\u0430\u0493\u044b\u043d\u0434\u0430 \${b} NOVVES \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u044f\u0441\u044b \u0436\u043e\u043b \u0431\u043e\u0439\u044b\u043d\u0448\u0430 \u043e\u043d\u0434\u0456\u0440\u0456\u043b\u0434\u0456.\`,
    },
    bu_projede: {
      designed: \`\u0411\u04b1\u043b \u0436\u043e\u0431\u0430\u0434\u0430 \${b} NOVVES \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u044f\u0441\u044b \u0436\u043e\u043b \u0431\u043e\u0439\u044b\u043d\u0448\u0430 \u0436\u0430\u0441\u0430\u043b\u0434\u044b \u0436\u04d9\u043d\u0435 \u043e\u043d\u0434\u0456\u0440\u0456\u043b\u0434\u0456.\`,
      manufactured: \`\u0411\u04b1\u043b \u0436\u043e\u0431\u0430\u0434\u0430 \${b} NOVVES \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u044f\u0441\u044b \u0436\u043e\u043b \u0431\u043e\u0439\u044b\u043d\u0448\u0430 \u043e\u043d\u0434\u0456\u0440\u0456\u043b\u0434\u0456.\`,
    },
  } as const;
  return m[prefix][suffix];
}

function wrapZh(prefix: PrefixKind, suffix: SuffixKind, b: string): string {
  const m = {
    projenin: {
      designed: \`\u9879\u76ee\u7684 \${b} \u7531 NOVVES \u8bbe\u8ba1\u5e76\u751f\u4ea7\u3002\`,
      manufactured: \`\u9879\u76ee\u7684 \${b} \u7531 NOVVES \u751f\u4ea7\u3002\`,
    },
    bu_proje_kapsaminda: {
      designed: \`\u5728\u672c\u9879\u76ee\u8303\u56f4\u5185\uff0c\${b} \u7531 NOVVES \u8bbe\u8ba1\u5e76\u751f\u4ea7\u3002\`,
      manufactured: \`\u5728\u672c\u9879\u76ee\u8303\u56f4\u5185\uff0c\${b} \u7531 NOVVES \u751f\u4ea7\u3002\`,
    },
    proje_kapsaminda: {
      designed: \`\u5728\u9879\u76ee\u8303\u56f4\u5185\uff0c\${b} \u7531 NOVVES \u8bbe\u8ba1\u5e76\u751f\u4ea7\u3002\`,
      manufactured: \`\u5728\u9879\u76ee\u8303\u56f4\u5185\uff0c\${b} \u7531 NOVVES \u751f\u4ea7\u3002\`,
    },
    bu_projede: {
      designed: \`\u5728\u672c\u9879\u76ee\u4e2d\uff0c\${b} \u7531 NOVVES \u8bbe\u8ba1\u5e76\u751f\u4ea7\u3002\`,
      manufactured: \`\u5728\u672c\u9879\u76ee\u4e2d\uff0c\${b} \u7531 NOVVES \u751f\u4ea7\u3002\`,
    },
  } as const;
  return m[prefix][suffix];
}

function wrapUr(prefix: PrefixKind, suffix: SuffixKind, b: string): string {
  const m = {
    projenin: {
      designed: \`\${b} NOVVES \u06a9\u06cc \u0637\u0631\u0641 \u0633\u06d2 \u067e\u0631\u0648\u062c\u06d2 \u06a9\u06d2 \u0644\u06cc\u06d2 \u062a\u0635\u0645\u06cc\u0645 \u0627\u0648\u0631 \u062a\u06cc\u0627\u0631 \u06a9\u06cc\u06d2 \u06af\u0626\u06d2\u06d4\`,
      manufactured: \`\${b} NOVVES \u06a9\u06cc \u0637\u0631\u0641 \u0633\u06d2 \u067e\u0631\u0648\u062c\u06d2 \u06a9\u06d2 \u0644\u06cc\u06d2 \u062a\u06cc\u0627\u0631 \u06a9\u06cc\u06d2 \u06af\u0626\u06d2\u06d4\`,
    },
    bu_proje_kapsaminda: {
      designed: \`\u0627\u0633 \u067e\u0631\u0648\u062c\u06d2 \u06a9\u06d2 \u062f\u0627\u0626\u0631\u06d2 \u0645\u06cc\u06ba \${b} NOVVES \u06a9\u06cc \u0637\u0631\u0641 \u0633\u06d2 \u062a\u0635\u0645\u06cc\u0645 \u0627\u0648\u0631 \u062a\u06cc\u0627\u0631 \u06a9\u06cc\u06d2 \u06af\u0626\u06d2\u06d4\`,
      manufactured: \`\u0627\u0633 \u067e\u0631\u0648\u062c\u06d2 \u06a9\u06d2 \u062f\u0627\u0626\u0631\u06d2 \u0645\u06cc\u06ba \${b} NOVVES \u06a9\u06cc \u0637\u0631\u0641 \u0633\u06d2 \u062a\u06cc\u0627\u0631 \u06a9\u06cc\u06d2 \u06af\u0626\u06d2\u06d4\`,
    },
    proje_kapsaminda: {
      designed: \`\u067e\u0631\u0648\u062c\u06d2 \u06a9\u06d2 \u062f\u0627\u0626\u0631\u06d2 \u0645\u06cc\u06ba \${b} NOVVES \u06a9\u06cc \u0637\u0631\u0641 \u0633\u06d2 \u062a\u0635\u0645\u06cc\u0645 \u0627\u0648\u0631 \u062a\u06cc\u0627\u0631 \u06a9\u06cc\u06d2 \u06af\u0626\u06d2\u06d4\`,
      manufactured: \`\u067e\u0631\u0648\u062c\u06d2 \u06a9\u06d2 \u062f\u0627\u0626\u0631\u06d2 \u0645\u06cc\u06ba \${b} NOVVES \u06a9\u06cc \u0637\u0631\u0641 \u0633\u06d2 \u062a\u06cc\u0627\u0631 \u06a9\u06cc\u06d2 \u06af\u0626\u06d2\u06d4\`,
    },
    bu_projede: {
      designed: \`\u0627\u0633 \u067e\u0631\u0648\u062c\u06d2 \u0645\u06cc\u06ba \${b} NOVVES \u06a9\u06cc \u0637\u0631\u0641 \u0633\u06d2 \u062a\u0635\u0645\u06cc\u0645 \u0627\u0648\u0631 \u062a\u06cc\u0627\u0631 \u06a9\u06cc\u06d2 \u06af\u0626\u06d2\u06d4\`,
      manufactured: \`\u0627\u0633 \u067e\u0631\u0648\u062c\u06d2 \u0645\u06cc\u06ba \${b} NOVVES \u06a9\u06cc \u0637\u0631\u0641 \u0633\u06d2 \u062a\u06cc\u0627\u0631 \u06a9\u06cc\u06d2 \u06af\u0626\u06d2\u06d4\`,
    },
  } as const;
  return m[prefix][suffix];
}

function wrapLt(prefix: PrefixKind, suffix: SuffixKind, b: string): string {
  const m = {
    projenin: {
      designed: \`\${b} projekto buvo suprojektuoti ir pagaminti NOVVES.\`,
      manufactured: \`\${b} projekto buvo pagaminti NOVVES.\`,
    },
    bu_proje_kapsaminda: {
      designed: \`\u0160io projekto apimtyje \${b} buvo suprojektuoti ir pagaminti NOVVES.\`,
      manufactured: \`\u0160io projekto apimtyje \${b} buvo pagaminti NOVVES.\`,
    },
    proje_kapsaminda: {
      designed: \`Projekto apimtyje \${b} buvo suprojektuoti ir pagaminti NOVVES.\`,
      manufactured: \`Projekto apimtyje \${b} buvo pagaminti NOVVES.\`,
    },
    bu_projede: {
      designed: \`\u0160iame projekte \${b} buvo suprojektuoti ir pagaminti NOVVES.\`,
      manufactured: \`\u0160iame projekte \${b} buvo pagaminti NOVVES.\`,
    },
  } as const;
  return m[prefix][suffix];
}

function wrapTg(prefix: PrefixKind, suffix: SuffixKind, b: string): string {
  const m = {
    projenin: {
      designed: \`\${b} \u043b\u043e\u0438\u04b3\u0430 NOVVES \u0442\u0430\u0440\u0444\u0438 \u0442\u0430\u0440\u04b3 \u0433\u04ef\u0440\u0438\u0444\u0442\u0430 \u0448\u0443\u0434\u0430 \u0442\u0430\u04cc\u0439\u043e\u0440 \u0433\u0430\u0440\u0434\u0438\u0434\u0430\u043d \u0448\u0443\u0434.\`,
      manufactured: \`\${b} \u043b\u043e\u0438\u04b3\u0430 NOVVES \u0442\u0430\u0440\u0444\u0438 \u0442\u0430\u0439\u043e\u0440 \u0433\u0430\u0440\u0434\u0438\u0434\u0430\u043d \u0448\u0443\u0434.\`,
    },
    bu_proje_kapsaminda: {
      designed: \`\u0414\u0430 \u04b7\u04b7\u04b7\u0430\u0438 \u043b\u043e\u0438\u04b3\u0430 \${b} NOVVES \u0442\u0430\u0440\u0444\u0438 \u0442\u0430\u0440\u04b7 \u0433\u04ef\u0440\u0438\u0444\u0442\u0430 \u0448\u0443\u0434\u0430 \u0442\u0430\u04cc\u0439\u043e\u0440 \u0433\u0430\u0440\u0434\u0438\u0434\u0430\u043d \u0448\u0443\u0434.\`,
      manufactured: \`\u0414\u0430 \u04b7\u04b7\u04b7\u0430\u0438 \u043b\u043e\u0438\u04b3\u0430 \${b} NOVVES \u0442\u0430\u0440\u0444\u0438 \u0442\u0430\u0439\u043e\u0440 \u0433\u0430\u0440\u0434\u0438\u0434\u0430\u043d \u0448\u0443\u0434.\`,
    },
    proje_kapsaminda: {
      designed: \`\u0414\u0430 \u04b7\u04b7\u04b7\u0430\u0438 \u043b\u043e\u0438\u04b3\u0430 \${b} NOVVES \u0442\u0430\u0440\u0444\u0438 \u0442\u0430\u0440\u04b7 \u0433\u04ef\u0440\u0438\u0444\u0442\u0430 \u0448\u0443\u0434\u0430 \u0442\u0430\u04cc\u0439\u043e\u0440 \u0433\u0430\u0440\u0434\u0438\u0434\u0430\u043d \u0448\u0443\u0434.\`,
      manufactured: \`\u0414\u0430 \u04b7\u04b7\u04b7\u0430\u0438 \u043b\u043e\u0438\u04b3\u0430 \${b} NOVVES \u0442\u0430\u0440\u0444\u0438 \u0442\u0430\u0439\u043e\u0440 \u0433\u0430\u0440\u0434\u0438\u0434\u0430\u043d \u0448\u0443\u0434.\`,
    },
    bu_projede: {
      designed: \`\u0414\u0430\u0440 \u043b\u043e\u0438\u04b3\u0430 \${b} NOVVES \u0442\u0430\u0440\u0444\u0438 \u0442\u0430\u0440\u04b7 \u0433\u04ef\u0440\u0438\u0444\u0442\u0430 \u0448\u0443\u0434\u0430 \u0442\u0430\u04cc\u0439\u043e\u0440 \u0433\u0430\u0440\u0434\u0438\u0434\u0430\u043d \u0448\u0443\u0434.\`,
      manufactured: \`\u0414\u0430\u0440 \u043b\u043e\u0438\u04b3\u0430 \${b} NOVVES \u0442\u0430\u0440\u0444\u0438 \u0442\u0430\u0439\u043e\u0440 \u0433\u0430\u0440\u0434\u0438\u0434\u0430\u043d \u0448\u0443\u0434.\`,
    },
  } as const;
  return m[prefix][suffix];
}

function wrapAz(prefix: PrefixKind, suffix: SuffixKind, b: string): string {
  const m = {
    projenin: {
      designed: \`Layih\u0259nin \${b} NOVVES \u0259r\u0259find\u0259n layih\u0259l\u0259\u015fdirilib v\u0259 istehsal edilib.\`,
      manufactured: \`Layih\u0259nin \${b} NOVVES \u0259r\u0259find\u0259n istehsal edilib.\`,
    },
    bu_proje_kapsaminda: {
      designed: \`Bu layih\u0259 \u00e7\u0259r\u00e7\u0259v\u0259sind\u0259 \${b} NOVVES \u0259r\u0259find\u0259n layih\u0259l\u0259\u015fdirilib v\u0259 istehsal edilib.\`,
      manufactured: \`Bu layih\u0259 \u00e7\u0259r\u00e7\u0259v\u0259sind\u0259 \${b} NOVVES \u0259r\u0259find\u0259n istehsal edilib.\`,
    },
    proje_kapsaminda: {
      designed: \`Layih\u0259 \u00e7\u0259r\u00e7\u0259v\u0259sind\u0259 \${b} NOVVES \u0259r\u0259find\u0259n layih\u0259l\u0259\u015fdirilib v\u0259 istehsal edilib.\`,
      manufactured: \`Layih\u0259 \u00e7\u0259r\u00e7\u0259v\u0259sind\u0259 \${b} NOVVES \u0259r\u0259find\u0259n istehsal edilib.\`,
    },
    bu_projede: {
      designed: \`Bu layih\u0259d\u0259 \${b} NOVVES \u0259r\u0259find\u0259n layih\u0259l\u0259\u015fdirilib v\u0259 istehsal edilib.\`,
      manufactured: \`Bu layih\u0259d\u0259 \${b} NOVVES \u0259r\u0259find\u0259n istehsal edilib.\`,
    },
  } as const;
  return m[prefix][suffix];
}

function translateDescription(trDescription: string, locale: Locale): string {
  const effective = resolveTranslationLocale(locale);
  if (!effective) return trDescription;
  const parsed = parseTrDescription(trDescription);
  if (!parsed) return trDescription;
  return wrapDescription(parsed.prefix, parsed.suffix, parsed.body, effective);
}

function translateTitle(id: number, trTitle: string, locale: Locale): string {
  const effective = resolveTranslationLocale(locale);
  if (!effective) return trTitle;
  return TITLE_OVERRIDES[effective]?.[id] ?? trTitle;
}

export function translateReferenceFields(
  id: number,
  title: string,
  description: string,
  locale: Locale,
): { title: string; description: string } {
  if (id < NEW_REFERENCE_ID_MIN) {
    return { title, description };
  }
  if (locale === "tr") {
    return { title, description };
  }
  return {
    title: translateTitle(id, title, locale),
    description: translateDescription(description, locale),
  };
}
`;

writeFileSync(out, content, "utf8");
console.log("Wrote", out);
