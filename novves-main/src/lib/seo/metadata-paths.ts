/** i18n metadata anahtari ? URL segmenti (`[locale]/` sonrasi). */
export const SERVICE_PATHS: Record<string, string> = {
  genelBakis: "hizmetler",
  cfdAnalizi: "hizmetler/cfd-analizi",
  devreAlma: "hizmetler/devreye-alma",
  dumanKontrol: "hizmetler/duman-kontrol-sistemi-tasarimi",
  fanSecimi: "hizmetler/fan-secimi-ve-teknik-projelendirme",
  bakimPerformans: "hizmetler/bakim-ve-performans-kontrolu",
  teknikServis: "hizmetler/teknik-servis",
  yerindeKesif: "hizmetler/yerinde-kesif",
  egitimDanismanlik: "hizmetler/egitim-ve-teknik-danismanlik",
};

export const PRODUCT_LEAF_PATHS: Record<string, string> = {
  banyoFanlari: "urunler/banyo-fanlari",
  catiFanlari: "urunler/cati-fanlari",
  damperler: "urunler/damperler",
  dumanIsiTahliyeFanlari: "urunler/duman-isi-tahliye-fanlari",
  duvarTipiFanlar: "urunler/duvar-tipi-fanlar",
  ecFanlar: "urunler/ec-fanlar",
  endustriyelFanlar: "urunler/endustriyel-fanlar",
  exproofFanlar: "urunler/exproof-fanlar",
  havuzNemAlmaSantrali: "urunler/havuz-nem-alma-santrali",
  hucreliFanlar: "urunler/hucreli-fanlar",
  isiGeriKazanimCihazlari: "urunler/isi-geri-kazanim-cihazlari",
  kanalFanlari: "urunler/kanal-fanlari",
  klimaSantralleri: "urunler/klima-santralleri",
  kovanTipiAksiyalFanlar: "urunler/kovan-tipi-aksiyal-fanlar",
  mutfakFanlari: "urunler/mutfak-fanlari",
  siginakFanlari: "urunler/siginak-fanlari",
};

export const CORPORATE_PATHS: Record<string, string> = {
  bizKimiz: "kurumsal/biz-kimiz",
  ceoMesaji: "kurumsal/ceo-mesaji",
  ekibimiz: "kurumsal/ekibimiz",
  referanslar: "kurumsal/referanslar",
  politikamiz: "kurumsal/politikamiz",
  basinOdasi: "kurumsal/basin-odasi",
  haberler: "kurumsal/haberler",
  medyaMerkezi: "kurumsal/medya-merkezi",
  patentlerimiz: "kurumsal/patentlerimiz",
  genelBakis: "kurumsal",
};

export const TECHNICAL_PATHS: Record<string, string> = {
  blog: "teknik-merkez/blog",
  dokumanKutuphanesi: "teknik-merkez/dokuman-kutuphanesi",
  fanSecici: "teknik-merkez/fan-secici",
  patentlerimiz: "teknik-merkez/patentlerimiz",
  genelBakis: "teknik-merkez",
};

export const NAVBAR_HUB_PATHS = {
  products: "urunler",
  services: "hizmetler",
  solutions: "cozumler",
  corporate: "kurumsal",
  technicalCenter: "teknik-merkez",
} as const;

export type NavbarHubKey = keyof typeof NAVBAR_HUB_PATHS;

export const SUSTAINABILITY_PATHS: Record<string, string> = {
  main: "surdurulebilirlik",
  geriDonusum: "surdurulebilirlik/geri-donusum",
  co2: "surdurulebilirlik/co2",
};

export const KVKK_PATHS: Record<string, string> = {
  kisiselVerilerinKorunmasi: "kvkk/kisisel-verilerin-korunmasi",
  guvenlikVeGizlilik: "kvkk/guvenlik-ve-gizlilik-politikasi",
  kvkkVeIslenmesiBeyani: "kvkk/kvkk-ve-islenmesi-beyani",
};
