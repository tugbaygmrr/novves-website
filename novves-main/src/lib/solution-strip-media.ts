/**
 * Ana sayfa çözüm şeridi — tüm görseller .png (ürün kataloğu PNG’leri).
 * Metinler sözlükten; bu dosya yalnızca medya yollarını tutar.
 */
export type SolutionStripPageMedia = {
  readonly hero: string;
  readonly thumbnails: readonly [string, string, string];
};

export const solutionStripPageProductMedia: Record<string, SolutionStripPageMedia> = {
  "/cozumler/duman-isi-tahliye-sistemleri": {
    hero: "/images/solutions/duman-isi-tahliye-card-hero.png?v=1",
    thumbnails: ["/images/products/dragonfly-c.png", "/images/products/hound-al.png", "/images/products/marlin.png"],
  },
  "/cozumler/hijyenik-filtrasyonlu-havalandirma": {
    hero: "/images/solutions/hijyenik-filtrasyon-card-hero.png?v=1",
    thumbnails: ["/images/products/tiger-pre.png", "/images/products/hound-al.png", "/images/products/marlin.png"],
  },
  "/cozumler/hayvancilik-tesisleri-icin-havalandirma-sistemleri": {
    hero: "/images/solutions/hayvancilik-card-hero.png?v=1",
    thumbnails: ["/images/products/dolphin-pre.png", "/images/products/marlin.png", "/images/products/hound-al.png"],
  },
  "/cozumler/sera-tarimsal-havalandirma-sistemleri": {
    hero: "/images/solutions/sera-tarimsal-card-hero.png?v=1",
    thumbnails: ["/images/products/marlin.png", "/images/products/dragonfly-c.png", "/images/products/tiger-pre.png"],
  },
  "/cozumler/akilli-otomasyon-ve-kontrol-sistemleri": {
    hero: "/images/solutions/akilli-otomasyon-card-hero.png?v=1",
    thumbnails: [
      "/images/products/basinclandirma-kontrol-panosu.png",
      "/images/products/dragonfly-c.png",
      "/images/products/tiger-pre.png",
    ],
  },
  "/cozumler/marin-offshore-havalandirma-sistemleri": {
    hero: "/images/solutions/marin-offshore-card-hero.png?v=1",
    thumbnails: ["/images/products/marlin.png", "/images/products/hound-al.png", "/images/products/dragonfly-c.png"],
  },
  "/cozumler/cfd-muhendislik-danismanligi": {
    hero: "/images/solutions/cfd-muhendislik-card-hero.png?v=1",
    thumbnails: ["/images/products/dragonfly-c.png", "/images/products/hound-al.png", "/images/products/marlin.png"],
  },
  "/cozumler/konfor-iklimlendirme-sistemleri": {
    hero: "/images/solutions/konfor-iklimlendirme-card-hero.png?v=1",
    thumbnails: ["/images/products/tiger-pre.png", "/images/products/dolphin-pre.png", "/images/products/marlin.png"],
  },
  "/cozumler/endustriyel-hava-yonetimi": {
    hero: "/images/solutions/endustriyel-hava-yonetimi-card-hero.png?v=1",
    thumbnails: ["/images/products/hound-al.png", "/images/products/dragonfly-c.png", "/images/products/dolphin-pre.png"],
  },
  "/cozumler/trafo-enerji-odalari-fanlari": {
    hero: "/images/solutions/trafo-enerji-odalari-card-hero.png?v=1",
    thumbnails: ["/images/products/marlin.png", "/images/products/dragonfly-c.png", "/images/products/ae-fjf.png"],
  },
  "/cozumler/atex-patlama-koruma-cozumleri": {
    hero: "/images/solutions/atex-patlama-koruma-card-hero.png?v=1",
    thumbnails: ["/images/products/ae-fjf.png", "/images/products/marlin.png", "/images/products/dragonfly-c.png"],
  },
  "/cozumler/konut-tipi-havalandirma-sistemleri": {
    hero: "/images/solutions/konut-tipi-havalandirma-card-hero.png?v=1",
    thumbnails: ["/images/products/dolphin-pre.png", "/images/products/tiger-pre.png", "/images/products/marlin.png"],
  },
  "/cozumler/proje-bazli-ozel-imalatlar": {
    hero: "/images/solutions/proje-bazli-ozel-imalatlar-card-hero.png?v=1",
    thumbnails: ["/images/products/dragonfly-c.png", "/images/products/marlin.png", "/images/products/ae-fjf.png"],
  },
};
