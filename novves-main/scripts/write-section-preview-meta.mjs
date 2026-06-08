#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(ROOT, "src/lib/admin/section-preview-meta.ts");

const content = `/** G\u00f6rsel \u00f6nizleme + sade T\u00fcrk\u00e7e a\u00e7\u0131klama (admin b\u00f6l\u00fcm kartlar\u0131). */

export type SectionPreviewMeta = {
  image: string;
  /** Kullan\u0131c\u0131n\u0131n anlayaca\u011f\u0131 k\u0131sa a\u00e7\u0131klama */
  hint: string;
};

const META: Record<string, Record<string, SectionPreviewMeta>> = {
  home: {
    hero: {
      image: "/images/home/novves-product-lineup.png",
      hint: "Sayfan\u0131n en \u00fcst\u00fc \u2014 scroll video ve b\u00fcy\u00fck ba\u015fl\u0131k alan\u0131",
    },
    animation2: {
      image: "/images/hero/endustriyel-mutfaklar.png",
      hint: "Videoyu kayd\u0131r\u0131nca altta beliren \u00fcr\u00fcn tan\u0131t\u0131m kart\u0131",
    },
    solutionCarouselByHref: {
      image: "/images/jump-icons/solutions.png",
      hint: "\u00c7\u00f6z\u00fcmler b\u00f6l\u00fcm\u00fcndeki yatay kayd\u0131r\u0131labilir kart \u015feridi",
    },
    productCategories: {
      image: "/images/jump-icons/products.png",
      hint: "\u00dcr\u00fcnler b\u00f6l\u00fcm\u00fcndeki kategori kartlar\u0131n\u0131n \u00fcst ba\u015fl\u0131\u011f\u0131",
    },
    productCategoryBlurbs: {
      image: "/images/products/categories/hava-hareketi-card-hero.png",
      hint: "Her \u00fcr\u00fcn kart\u0131n\u0131n alt\u0131ndaki k\u0131sa a\u00e7\u0131klama metinleri",
    },
    productCategoryFeatures: {
      image: "/images/products/categories/iklimlendirme-card-hero.png",
      hint: "\u00dcr\u00fcn kartlar\u0131nda listelenen \u00f6zellik maddeleri",
    },
    catalogPreview: {
      image: "/images/jump-icons/catalogs.png",
      hint: "Kataloglar b\u00f6l\u00fcm\u00fcndeki kapak g\u00f6rselli kartlar",
    },
    referencePreview: {
      image: "/images/jump-icons/references.png",
      hint: "Sekt\u00f6rlere g\u00f6re referans proje kartlar\u0131",
    },
    certificatePreview: {
      image: "/images/jump-icons/certificates.png",
      hint: "Sertifikalar b\u00f6l\u00fcm\u00fcndeki belge kartlar\u0131",
    },
    engineeringPillarsSection: {
      image: "/images/pillars/pillar-01-muhendislik-tasarim.png",
      hint: "M\u00fchendislik s\u00fcreci \u015feridinin \u00fcst ba\u015fl\u0131k ve istatistik alan\u0131",
    },
    pillars: {
      image: "/images/pillars/pillar-02-uretim-saha.png",
      hint: "01-02-03 numaral\u0131 m\u00fchendislik ad\u0131m kartlar\u0131",
    },
    engineeringShowcase: {
      image: "/images/corporate/biz-kimiz/duman-kontrolu.webp",
      hint: "CFD b\u00f6l\u00fcm\u00fc \u2014 video yan\u0131ndaki m\u00fchendislik a\u00e7\u0131klama paneli",
    },
    faq: {
      image: "/images/jump-icons/faq.png",
      hint: "S\u0131k sorulan sorular listesi ve sol g\u00f6rsel",
    },
    finalCta: {
      image: "/images/finalcta.png",
      hint: "Sayfan\u0131n alt\u0131ndaki teklif ve ileti\u015fim \u00e7a\u011fr\u0131s\u0131",
    },
    companyProfileSection: {
      image: "/images/jump-icons/company.png",
      hint: "\u015eirket profili \u2014 zaman \u00e7izelgesi, hedefler ve banner",
    },
    pageChrome: {
      image: "/images/jump-icons/home.png",
      hint: "Buton yaz\u0131lar\u0131, \u00f6nceki/sonraki oklar\u0131 ve ortak etiketler",
    },
    midCta: {
      image: "/images/finalcta.png",
      hint: "(Eski \u015fablon) Orta \u00e7a\u011fr\u0131 band\u0131",
    },
    homeBands: {
      image: "/images/jump-icons/solutions.png",
      hint: "(Eski \u015fablon) \u00c7\u00f6z\u00fcm/\u00fcr\u00fcn bant metinleri",
    },
    companyProfileCards: {
      image: "/images/corporate/novves-liderlik.png",
      hint: "(Eski \u015fablon) 3 kurumsal profil kart\u0131",
    },
    video: {
      image: "/images/page-hero/novves-vision.png",
      hint: "(Eski \u015fablon) Kurumsal tan\u0131t\u0131m videosu metinleri",
    },
  },
  common: {
    navbar: {
      image: "/images/novves-logo.svg",
      hint: "\u00dcst men\u00fc linkleri ve butonlar",
    },
    footer: {
      image: "/images/jump-icons/home.png",
      hint: "Sayfa alt\u0131ndaki footer linkleri ve ileti\u015fim",
    },
    shared: {
      image: "/images/jump-icons/home.png",
      hint: "Birden fazla sayfada tekrar eden ortak metinler",
    },
    solutionDetail: {
      image: "/images/solutions/duman-isi-tahliye-01-bg.png",
      hint: "\u00c7\u00f6z\u00fcm detay sayfalar\u0131ndaki ortak metinler",
    },
  },
  corporate: {
    bizKimiz: { image: "/images/biz-kimiz-sag.png", hint: "Biz Kimiz sayfas\u0131" },
    ceoMesaji: { image: "/images/corporate/novves-liderlik.png", hint: "CEO mesaj\u0131 sayfas\u0131" },
    ekibimiz: { image: "/images/corporate/novves-gunumuz.png", hint: "Ekibimiz sayfas\u0131" },
    referanslar: { image: "/images/jump-icons/references.png", hint: "Referanslar listesi" },
    sertifikalar: { image: "/images/jump-icons/certificates.png", hint: "Sertifikalar sayfas\u0131" },
    politikamiz: { image: "/images/page-hero/novves-vision.png", hint: "Politikam\u0131z sayfas\u0131" },
    basinOdasi: { image: "/images/corporate/novves-banner-bg.jpg", hint: "Bas\u0131n odas\u0131" },
    haberler: { image: "/images/corporate/novves-kurulus-bina.png", hint: "Haberler listesi" },
  },
  contact: {
    main: { image: "/images/jump-icons/home.png", hint: "\u0130leti\u015fim formu ve adres" },
    iletisimHub: { image: "/images/jump-icons/home.png", hint: "\u0130leti\u015fim hub kartlar\u0131" },
    partnerlerimiz: { image: "/images/partners/ventdelux.png", hint: "Partnerlerimiz sayfas\u0131" },
    sosyalMedya: { image: "/images/jump-icons/home.png", hint: "Sosyal medya linkleri" },
    sosyalMedyaHub: { image: "/images/jump-icons/home.png", hint: "Sosyal medya hub" },
  },
  technical: {
    blog: { image: "/images/jump-icons/home.png", hint: "Teknik blog" },
    dokumanKutuphanesi: { image: "/images/jump-icons/catalogs.png", hint: "D\u00f6k\u00fcman k\u00fct\u00fcphanesi" },
    fanSecici: { image: "/images/jump-icons/products.png", hint: "Fan se\u00e7ici arac\u0131" },
    patentlerimiz: { image: "/images/jump-icons/certificates.png", hint: "Patentlerimiz" },
  },
  services: {
    genelBakis: { image: "/images/hizmetler/duman-kontrol-tasarimi.png", hint: "Hizmetler ana sayfa" },
    cfdAnalizi: { image: "/images/corporate/biz-kimiz/duman-kontrolu.webp", hint: "CFD analizi hizmeti" },
    devreAlma: { image: "/images/pillars/pillar-03-saha-uygulama.png", hint: "Devreye alma hizmeti" },
    dumanKontrol: { image: "/images/hizmetler/duman-kontrol-tasarimi.png", hint: "Duman kontrol tasar\u0131m\u0131" },
    teknikServis: { image: "/images/pillars/pillar-02-uretim-saha.png", hint: "Teknik servis" },
    yerindeKesif: { image: "/images/corporate/novves-gunumuz.png", hint: "Yerinde ke\u015fif" },
    fanSecimi: { image: "/images/jump-icons/products.png", hint: "Fan se\u00e7imi hizmeti" },
    bakimPerformans: { image: "/images/pillars/pillar-02-uretim-saha.png", hint: "Bak\u0131m ve performans" },
    egitimDanismanlik: { image: "/images/corporate/novves-liderlik.png", hint: "E\u011fitim ve dan\u0131\u015fmanl\u0131k" },
  },
  solutions: {
    dumanIsiTahliye: { image: "/images/solutions/duman-isi-tahliye-01-bg.png", hint: "Duman ve \u0131s\u0131 tahliye \u00e7\u00f6z\u00fcm\u00fc" },
    konforIklimlendirme: { image: "/images/solutions/konut-tipi-havalandirma-card-hero.png", hint: "Konfor iklimlendirme" },
    hijyenikFiltrasyon: { image: "/images/solution-icons/hijyenik-filtrasyonlu-havalandirma.svg", hint: "Hijyenik filtrasyon" },
    endustriyelHavaYonetimi: { image: "/images/products/categories/hava-yonetimi-card-hero.png", hint: "End\u00fcstriyel hava" },
    hayvancilikTesisleri: { image: "/images/solution-icons/hayvancilik-tesisleri-icin-havalandirma-sistemleri.svg", hint: "Hayvanc\u0131l\u0131k tesisleri" },
    trafoEnerjiOdalari: { image: "/images/solutions/akilli-otomasyon-card-hero.png", hint: "Trafo/enerji odalar\u0131" },
    seraTarimsal: { image: "/images/solution-icons/sera-tarimsal-havalandirma-sistemleri.svg", hint: "Sera ve tar\u0131msal" },
    atexPatlamaKoruma: { image: "/images/solutions/duman-isi-tahliye-01-bg.png", hint: "ATEX patlama koruma" },
    akilliOtomasyon: { image: "/images/solutions/akilli-otomasyon-card-hero.png", hint: "Ak\u0131ll\u0131 otomasyon" },
    konutHavalandirma: { image: "/images/solutions/konut-tipi-havalandirma-card-hero.png", hint: "Konut havaland\u0131rma" },
    marinOffshore: { image: "/images/solutions/duman-isi-tahliye-01-bg.png", hint: "Marin ve offshore" },
    projeBazliOzelImalat: { image: "/images/pillars/pillar-01-muhendislik-tasarim.png", hint: "Proje bazl\u0131 imalat" },
    cfdDanismanlik: { image: "/images/corporate/biz-kimiz/duman-kontrolu.webp", hint: "CFD dan\u0131\u015fmanl\u0131k" },
  },
};

const DEFAULT_PREVIEW: SectionPreviewMeta = {
  image: "/images/jump-icons/home.png",
  hint: "Bu b\u00f6l\u00fcm\u00fcn sitedeki g\u00f6r\u00fcn\u00fcm\u00fc",
};

export function getSectionPreview(file: string, sectionKey: string): SectionPreviewMeta {
  return META[file]?.[sectionKey] ?? DEFAULT_PREVIEW;
}

export function hasSectionPreview(file: string, sectionKey: string): boolean {
  return Boolean(META[file]?.[sectionKey]);
}
`;

fs.writeFileSync(out, content, "utf8");
new TextDecoder("utf-8", { fatal: true }).decode(fs.readFileSync(out));
console.log("wrote section-preview-meta.ts");
