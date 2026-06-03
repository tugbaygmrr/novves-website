/**
 * references.ts içindeki `image` alanı → public/images/references dosyası.
 * Hero PNG varsa kart/liste için onu tercih eder.
 */
const REFERENCE_IMAGE_ALIASES: Record<string, string> = {
  "2m.jpg": "lojistik-2m-depo-hero.png",
  "3skale.jpg": "ticari-3s-kale-topaz-hero.png",
  "adana-yuregir.jpg": "saglik-kuruluslari-adana-hero.png",
  "aselsan-konya.jpg": "endustriyel-aselsan-konya-hero.png",
};

export function resolveReferenceImageSrc(imageFileName: string): string {
  const file = REFERENCE_IMAGE_ALIASES[imageFileName] ?? imageFileName;
  return `/images/references/${file}`;
}
