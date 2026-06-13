/** Country slug (references.ts) to flag asset under /public */
export const REFERENCE_COUNTRY_FLAGS: Record<string, string> = {
  turkiye: "/images/flags/tr.png",
  azerbaycan: "/images/flags/az.svg",
  almanya: "/images/flags/de.svg",
  rusya: "/images/flags/ru.svg",
  kazakistan: "/images/flags/kz.svg",
  ozbekistan: "/images/flags/uz.svg",
  turkmenistan: "/images/flags/tm.svg",
  pakistan: "/images/flags/pk.svg",
  litvanya: "/images/flags/lt.svg",
  letonya: "/images/flags/lv.svg",
  isvec: "/images/flags/se.svg",
  malta: "/images/flags/mt.svg",
  "suudi-arabistan": "/images/flags/sa.svg",
  "birlesik-arap-emirlikleri": "/images/flags/ae.svg",
  umman: "/images/flags/om.svg",
  kuveyt: "/images/flags/kw.svg",
  katar: "/images/flags/qa.svg",
  gurcistan: "/images/flags/ge.svg",
  ukrayna: "/images/flags/ua.svg",
  bulgaristan: "/images/flags/bg.svg",
  romanya: "/images/flags/ro.svg",
  irak: "/images/flags/iq.svg",
  cezayir: "/images/flags/dz.svg",
  gana: "/images/flags/gh.svg",
  gambia: "/images/flags/gm.svg",
  kongo: "/images/flags/cg.svg",
  niger: "/images/flags/ne.svg",
  libya: "/images/flags/ly.svg",
  cirad: "/images/flags/td.svg",
  cebelitarik: "/images/flags/gi.svg",
  fas: "/images/flags/ma.svg",
};

export function normalizeReferenceCountryKey(country: string): string {
  return country
    .toLocaleLowerCase("tr-TR")
    .replaceAll("\u0131", "i")
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-+|-+$/g, "");
}

export function getReferenceCountryFlagSrc(country: string): string | null {
  return REFERENCE_COUNTRY_FLAGS[normalizeReferenceCountryKey(country)] ?? null;
}
