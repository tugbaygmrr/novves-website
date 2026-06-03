import fs from "node:fs/promises";

const sourcePath = new URL("../src/lib/patent-tr-to-en.json", import.meta.url);
const outPath = new URL("../src/lib/patent-tr-to-locales.auto.json", import.meta.url);

const targetLocales = {
  en: "en",
  de: "de",
  fr: "fr",
  es: "es",
  it: "it",
  ru: "ru",
  ar: "ar",
  az: "az",
  kk: "kk",
  tg: "tg",
  zh: "zh-CN",
  ur: "ur",
  lt: "lt",
  pl: "pl",
};

async function translateText(text, target) {
  if (target === "en") return text;
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=tr&tl=${encodeURIComponent(
    target,
  )}&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Translate failed ${res.status} for ${target}`);
  const data = await res.json();
  if (!Array.isArray(data) || !Array.isArray(data[0])) return text;
  return data[0].map((chunk) => chunk?.[0] ?? "").join("");
}

async function main() {
  const trToEn = JSON.parse(await fs.readFile(sourcePath, "utf8"));
  const keys = Object.keys(trToEn);

  const out = {};
  for (const [locale, target] of Object.entries(targetLocales)) {
    out[locale] = {};
    console.log(`Translating locale ${locale}...`);
    for (const key of keys) {
      try {
        const translated = locale === "en" ? trToEn[key] : await translateText(key, target);
        out[locale][key] = translated;
      } catch {
        out[locale][key] = locale === "en" ? trToEn[key] : trToEn[key];
      }
    }
  }

  await fs.writeFile(outPath, JSON.stringify(out, null, 2) + "\n");
  console.log(`Wrote ${outPath.pathname}`);
}

await main();

