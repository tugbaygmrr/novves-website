import { resolveReferenceImageSrc } from "./resolve-reference-image";

/** @deprecated Sosyal akış için `social-feed-picks.ts` + `references.ts` kullanın */
export const VERIFIED_REFERENCE_IMAGES = {
  twoM: {
    hero: "lojistik-2m-depo-hero.png",
    card: "2m.png",
    year: "2023",
  },
  threeSKale: {
    hero: "ticari-3s-kale-topaz-hero.png",
    card: "3skale.png",
    year: "2021",
  },
  adanaYuregir: {
    hero: "saglik-kuruluslari-adana-hero.png",
    card: "adana-yuregir.png",
    year: "2023",
  },
  aselsanKonya: {
    hero: "endustriyel-aselsan-konya-hero.png",
    year: "2023",
  },
} as const;

export function referenceImagePath(file: string): string {
  return resolveReferenceImageSrc(file);
}
