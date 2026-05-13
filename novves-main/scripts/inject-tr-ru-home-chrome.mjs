/**
 * tr ve ru home.json iÃ§in pageChrome + carousel verilerini yerelleÅŸtirir.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dictRoot = path.join(root, "src/app/[locale]/dictionaries");

const enHome = JSON.parse(
  fs.readFileSync(path.join(dictRoot, "en/home.json"), "utf8"),
);

const KEYS = [
  "pageChrome",
  "solutionCarouselByHref",
  "productCategoryBlurbs",
  "catalogPreview",
  "certificatePreview",
  "companyProfileCards",
  "referencePreview",
];

const trPageChrome = {
  catalogsVertical: "Kataloglar",
  previousSolutions: "Ã–nceki Ã§Ã¶zÃ¼mler",
  nextSolutions: "Sonraki Ã§Ã¶zÃ¼mler",
  previousProducts: "Ã–nceki Ã¼rÃ¼nler",
  nextProducts: "Sonraki Ã¼rÃ¼nler",
  defaultSolutionDesc: "Projeye Ã¶zel mÃ¼hendislik Ã§Ã¶zÃ¼mÃ¼nÃ¼ keÅŸfedin.",
  productFallbackDesc:
    "Projeye uygun, gÃ¼venilir ve verimli Ã¼rÃ¼n Ã§Ã¶zÃ¼mlerini keÅŸfedin.",
  catalogKindLabel: "Katalog",
  catalogCardDesc: "Teknik merkezde PDF ve dokÃ¼manlara eriÅŸin.",
  referenceEyebrow: "Referans",
  referenceCardDesc: "Tamamlanan projelerden Ã¶ne Ã§Ä±kan Ã¶rnekleri inceleyin.",
  referenceBySectorTitle: "SEKTÃ–RLERE GÃ–RE REFERANSLAR",
  referenceProjectWord: "Proje",
  referenceExploreCta: "KeÅŸfet",
  certificateEyebrow: "Sertifika",
  certificateCardDesc:
    "UluslararasÄ± kalite, gÃ¼venlik ve uygunluk belgelerimizi inceleyin.",
  companyEyebrow: "Kurumsal",
  companyCardDesc: "NOVVESâ€™in hikayesi, yÃ¶netim ve ekip yapÄ±sÄ±nÄ± keÅŸfedin.",
  companyProfileVertical: "Åirket Profili",
  pillarExpandAria: "DevamÄ±nÄ± gÃ¶ster",
  pillarCollapseAria: "Metni daralt",
  pillarCta: "DetaylarÄ± Ä°ncele",
  productCardCta: "DetaylarÄ± Ä°ncele",
  solutionCardCta: "DetaylarÄ± Ä°ncele",
  midCtaBullet1: "48 Saatte Ã–n DeÄŸerlendirme",
  midCtaBullet2: "Uygulamaya DÃ¶nÃ¼k Ã‡Ã¶zÃ¼m",
  midCtaBullet3: "Saha + CFD Entegrasyonu",
  videoStatMeta: "30+ Ãœlke Â· 500+ Proje",
  scrollVideoSideLabel: "Otopark HavalandÄ±rma",
  engineeringAlt1: "NOVVES CNC lazer kesim ile metal sac Ã¼zerinde hassas imalat",
  engineeringAlt2: "NOVVES sahada montaj ve teknik mÃ¼dahale",
  pillarsFallbackTitle: "MÃ¼hendislik AnlayÄ±ÅŸÄ±mÄ±z",
};

const ruPageChrome = {
  catalogsVertical: "ĞšĞ°Ñ‚Ğ°Ğ»Ğ¾Ğ³Ğ¸",
  previousSolutions: "ĞŸÑ€ĞµĞ´Ñ‹Ğ´ÑƒÑ‰Ğ¸Ğµ Ñ€ĞµÑˆĞµĞ½Ğ¸Ñ",
  nextSolutions: "Ğ¡Ğ»ĞµĞ´ÑƒÑÑ‰Ğ¸Ğµ Ñ€ĞµÑˆĞµĞ½Ğ¸Ñ",
  previousProducts: "ĞŸÑ€ĞµĞ´Ñ‹Ğ´ÑƒÑ‰Ğ¸Ğµ Ñ‚Ğ¾Ğ²Ğ°Ñ€Ñ‹",
  nextProducts: "Ğ¡Ğ»ĞµĞ´ÑƒÑÑ‰Ğ¸Ğµ Ñ‚Ğ¾Ğ²Ğ°Ñ€Ñ‹",
  defaultSolutionDesc: "ĞÑ‚ĞºÑ€Ğ¾Ğ¹Ñ‚Ğµ Ğ¸Ğ½Ğ¶ĞµĞ½ĞµÑ€Ğ½Ğ¾Ğµ Ñ€ĞµÑˆĞµĞ½Ğ¸Ğµ Ğ´Ğ»Ñ Ğ²Ğ°ÑˆĞµĞ³Ğ¾ Ğ¿Ñ€Ğ¾ĞµĞºÑ‚Ğ°.",
  productFallbackDesc:
    "ĞÑ‚ĞºÑ€Ğ¾Ğ¹Ñ‚Ğµ Ğ½Ğ°Ğ´ĞµĞ¶Ğ½Ñ‹Ğµ Ğ¸ ÑÑ„Ñ„ĞµĞºÑ‚Ğ¸Ğ²Ğ½Ñ‹Ğµ Ñ€ĞµÑˆĞµĞ½Ğ¸Ñ, Ğ¿Ğ¾Ğ´Ñ…Ğ¾Ğ´ÑÑ‰Ğ¸Ğµ Ğ´Ğ»Ñ Ğ²Ğ°ÑˆĞµĞ³Ğ¾ Ğ¿Ñ€Ğ¾ĞµĞºÑ‚Ğ°.",
  catalogKindLabel: "ĞšĞ°Ñ‚Ğ°Ğ»Ğ¾Ğ³",
  catalogCardDesc: "Ğ”Ğ¾ÑÑ‚ÑƒĞ¿ Ğº PDF Ğ¸ Ğ´Ğ¾ĞºÑƒĞ¼ĞµĞ½Ñ‚Ğ°Ğ¼ Ğ² Ñ‚ĞµÑ…Ğ½Ğ¸Ñ‡ĞµÑĞºĞ¾Ğ¼ Ñ†ĞµĞ½Ñ‚Ñ€Ğµ.",
  referenceEyebrow: "Ğ ĞµÑ„ĞµÑ€ĞµĞ½Ñ",
  referenceCardDesc: "ĞĞ·Ğ½Ğ°ĞºĞ¾Ğ¼ÑŒÑ‚ĞµÑÑŒ Ñ Ğ¸Ğ·Ğ±Ñ€Ğ°Ğ½Ğ½Ñ‹Ğ¼Ğ¸ Ñ€ĞµĞ°Ğ»Ğ¸Ğ·Ğ¾Ğ²Ğ°Ğ½Ğ½Ñ‹Ğ¼Ğ¸ Ğ¿Ñ€Ğ¾ĞµĞºÑ‚Ğ°Ğ¼Ğ¸.",
  referenceBySectorTitle: "Ğ Ğ•Ğ¤Ğ•Ğ Ğ•ĞĞ¡Ğ« ĞŸĞ ĞĞ¢Ğ ĞĞ¡Ğ›Ğ¯Ğœ",
  referenceProjectWord: "Ğ¿Ñ€Ğ¾ĞµĞºÑ‚Ğ¾Ğ²",
  referenceExploreCta: "Ğ¡Ğ¼Ğ¾Ñ‚Ñ€ĞµÑ‚ÑŒ",
  certificateEyebrow: "Ğ¡ĞµÑ€Ñ‚Ğ¸Ñ„Ğ¸ĞºĞ°Ñ‚",
  certificateCardDesc:
    "ĞĞ·Ğ½Ğ°ĞºĞ¾Ğ¼ÑŒÑ‚ĞµÑÑŒ Ñ Ğ¼ĞµĞ¶Ğ´ÑƒĞ½Ğ°Ñ€Ğ¾Ğ´Ğ½Ñ‹Ğ¼Ğ¸ ÑĞµÑ€Ñ‚Ğ¸Ñ„Ğ¸ĞºĞ°Ñ‚Ğ°Ğ¼Ğ¸ ĞºĞ°Ñ‡ĞµÑÑ‚Ğ²Ğ° Ğ¸ ÑĞ¾Ğ¾Ñ‚Ğ²ĞµÑ‚ÑÑ‚Ğ²Ğ¸Ñ.",
  companyEyebrow: "ĞšĞ¾Ğ¼Ğ¿Ğ°Ğ½Ğ¸Ñ",
  companyCardDesc:
    "Ğ˜ÑÑ‚Ğ¾Ñ€Ğ¸Ñ NOVVES, Ñ€ÑƒĞºĞ¾Ğ²Ğ¾Ğ´ÑÑ‚Ğ²Ğ¾ Ğ¸ ÑÑ‚Ñ€ÑƒĞºÑ‚ÑƒÑ€Ğ° ĞºĞ¾Ğ¼Ğ°Ğ½Ğ´Ñ‹.",
  companyProfileVertical: "ĞŸÑ€Ğ¾Ñ„Ğ¸Ğ»ÑŒ ĞºĞ¾Ğ¼Ğ¿Ğ°Ğ½Ğ¸Ğ¸",
  pillarExpandAria: "ĞŸĞ¾ĞºĞ°Ğ·Ğ°Ñ‚ÑŒ Ğ¿Ğ¾Ğ»Ğ½Ğ¾ÑÑ‚ÑŒÑ",
  pillarCollapseAria: "Ğ¡Ğ²ĞµÑ€Ğ½ÑƒÑ‚ÑŒ",
  pillarCta: "ĞŸĞ¾Ğ´Ñ€Ğ¾Ğ±Ğ½ĞµĞµ",
  productCardCta: "ĞŸĞ¾Ğ´Ñ€Ğ¾Ğ±Ğ½ĞµĞµ",
  solutionCardCta: "ĞŸĞ¾Ğ´Ñ€Ğ¾Ğ±Ğ½ĞµĞµ",
  midCtaBullet1: "ĞŸÑ€ĞµĞ´Ğ²Ğ°Ñ€Ğ¸Ñ‚ĞµĞ»ÑŒĞ½Ğ°Ñ Ğ¾Ñ†ĞµĞ½ĞºĞ° Ğ·Ğ° 48 Ñ‡Ğ°ÑĞ¾Ğ²",
  midCtaBullet2: "ĞÑ€Ğ¸ĞµĞ½Ñ‚Ğ¸Ñ€Ğ¾Ğ²Ğ°Ğ½Ğ½Ğ¾Ğµ Ğ½Ğ° Ğ²Ğ½ĞµĞ´Ñ€ĞµĞ½Ğ¸Ğµ Ñ€ĞµÑˆĞµĞ½Ğ¸Ğµ",
  midCtaBullet3: "Ğ˜Ğ½Ñ‚ĞµĞ³Ñ€Ğ°Ñ†Ğ¸Ñ Ğ¾Ğ±ÑŠĞµĞºÑ‚Ğ° + CFD",
  videoStatMeta: "30+ ÑÑ‚Ñ€Ğ°Ğ½ Â· 500+ Ğ¿Ñ€Ğ¾ĞµĞºÑ‚Ğ¾Ğ²",
  scrollVideoSideLabel: "Ğ’ĞµĞ½Ñ‚Ğ¸Ğ»ÑÑ†Ğ¸Ñ Ğ¿Ğ°Ñ€ĞºĞ¾Ğ²ĞºĞ¸",
  engineeringAlt1:
    "Ğ¢Ğ¾Ñ‡Ğ½Ğ¾Ğµ Ğ¸Ğ·Ğ³Ğ¾Ñ‚Ğ¾Ğ²Ğ»ĞµĞ½Ğ¸Ğµ NOVVES Ñ Ğ§ĞŸĞ£-Ğ»Ğ°Ğ·ĞµÑ€Ğ½Ğ¾Ğ¹ Ñ€ĞµĞ·ĞºĞ¾Ğ¹ Ğ»Ğ¸ÑÑ‚Ğ¾Ğ²Ğ¾Ğ³Ğ¾ Ğ¼ĞµÑ‚Ğ°Ğ»Ğ»Ğ°",
  engineeringAlt2: "ĞœĞ¾Ğ½Ñ‚Ğ°Ğ¶ Ğ½Ğ° Ğ¾Ğ±ÑŠĞµĞºÑ‚Ğµ Ğ¸ Ñ‚ĞµÑ…Ğ½Ğ¸Ñ‡ĞµÑĞºĞ¾Ğµ ÑĞ¾Ğ¿Ñ€Ğ¾Ğ²Ğ¾Ğ¶Ğ´ĞµĞ½Ğ¸Ğµ NOVVES",
  pillarsFallbackTitle: "ĞĞ°Ñˆ Ğ¸Ğ½Ğ¶ĞµĞ½ĞµÑ€Ğ½Ñ‹Ğ¹ Ğ¿Ğ¾Ğ´Ñ…Ğ¾Ğ´",
};

const trSolutionCarouselByHref = {
  "/cozumler/duman-isi-tahliye-sistemleri": {
    title: "Duman & IsÄ± Tahliye Sistemleri",
    description: "YangÄ±n iÃ§in gÃ¼venli duman ve Ä±sÄ± tahliyesi.",
  },
  "/cozumler/konfor-iklimlendirme-sistemleri": {
    title: "Konfor Ä°klimlendirme Sistemleri",
    description: "Konfor ve verim iÃ§in iklimlendirme Ã§Ã¶zÃ¼mleri.",
  },
  "/cozumler/hijyenik-filtrasyonlu-havalandirma": {
    title: "Hijyenik Filtrasyonlu HavalandÄ±rma",
    description: "Kritik alanlar iÃ§in hijyenik filtrasyon.",
  },
  "/cozumler/endustriyel-hava-yonetimi": {
    title: "EndÃ¼striyel Hava YÃ¶netimi",
    description: "EndÃ¼striyel alanlarda gÃ¼Ã§lÃ¼ hava yÃ¶netimi.",
  },
  "/cozumler/atex-patlama-koruma-cozumleri": {
    title: "ATEX Patlama Koruma Ã‡Ã¶zÃ¼mleri",
    description: "ATEX uyumlu gÃ¼venli havalandÄ±rma Ã§Ã¶zÃ¼mleri.",
  },
  "/cozumler/hayvancilik-tesisleri-icin-havalandirma-sistemleri": {
    title: "HayvancÄ±lÄ±k Tesisleri HavalandÄ±rma",
    description: "Projeye Ã¶zel mÃ¼hendislik Ã§Ã¶zÃ¼mÃ¼nÃ¼ keÅŸfedin.",
  },
  "/cozumler/trafo-enerji-odalari-fanlari": {
    title: "Trafo & Enerji OdalarÄ± FanlarÄ±",
    description: "Projeye Ã¶zel mÃ¼hendislik Ã§Ã¶zÃ¼mÃ¼nÃ¼ keÅŸfedin.",
  },
  "/cozumler/sera-tarimsal-havalandirma-sistemleri": {
    title: "Sera & TarÄ±msal HavalandÄ±rma",
    description: "Projeye Ã¶zel mÃ¼hendislik Ã§Ã¶zÃ¼mÃ¼nÃ¼ keÅŸfedin.",
  },
  "/cozumler/akilli-otomasyon-ve-kontrol-sistemleri": {
    title: "AkÄ±llÄ± Otomasyon ve Kontrol",
    description: "Projeye Ã¶zel mÃ¼hendislik Ã§Ã¶zÃ¼mÃ¼nÃ¼ keÅŸfedin.",
  },
  "/cozumler/konut-tipi-havalandirma-sistemleri": {
    title: "Konut Tipi HavalandÄ±rma",
    description: "Projeye Ã¶zel mÃ¼hendislik Ã§Ã¶zÃ¼mÃ¼nÃ¼ keÅŸfedin.",
  },
  "/cozumler/marin-offshore-havalandirma-sistemleri": {
    title: "Marin & Offshore HavalandÄ±rma",
    description: "Projeye Ã¶zel mÃ¼hendislik Ã§Ã¶zÃ¼mÃ¼nÃ¼ keÅŸfedin.",
  },
  "/cozumler/proje-bazli-ozel-imalatlar": {
    title: "Proje BazlÄ± Ã–zel Ä°malatlar",
    description: "Projeye Ã¶zel mÃ¼hendislik Ã§Ã¶zÃ¼mÃ¼nÃ¼ keÅŸfedin.",
  },
  "/cozumler/cfd-muhendislik-danismanligi": {
    title: "CFD MÃ¼hendislik DanÄ±ÅŸmanlÄ±ÄŸÄ±",
    description: "Projeye Ã¶zel mÃ¼hendislik Ã§Ã¶zÃ¼mÃ¼nÃ¼ keÅŸfedin.",
  },
};

const ruSolutionCarouselByHref = {
  "/cozumler/duman-isi-tahliye-sistemleri": {
    title: "Ğ¡Ğ¸ÑÑ‚ĞµĞ¼Ñ‹ Ğ´Ñ‹Ğ¼Ğ¾ÑƒĞ´Ğ°Ğ»ĞµĞ½Ğ¸Ñ Ğ¸ Ñ‚ĞµĞ¿Ğ»Ğ¾Ğ¾Ñ‚Ğ²Ğ¾Ğ´Ğ°",
    description: "Ğ‘ĞµĞ·Ğ¾Ğ¿Ğ°ÑĞ½Ğ¾Ğµ Ğ´Ñ‹Ğ¼Ğ¾- Ğ¸ Ñ‚ĞµĞ¿Ğ»Ğ¾ÑƒĞ´Ğ°Ğ»ĞµĞ½Ğ¸Ğµ Ğ¿Ñ€Ğ¸ Ğ¿Ğ¾Ğ¶Ğ°Ñ€Ğµ.",
  },
  "/cozumler/konfor-iklimlendirme-sistemleri": {
    title: "Ğ¡Ğ¸ÑÑ‚ĞµĞ¼Ñ‹ ĞºĞ¾Ğ¼Ñ„Ğ¾Ñ€Ñ‚Ğ½Ğ¾Ğ³Ğ¾ ĞºĞ¾Ğ½Ğ´Ğ¸Ñ†Ğ¸Ğ¾Ğ½Ğ¸Ñ€Ğ¾Ğ²Ğ°Ğ½Ğ¸Ñ",
    description: "ĞšĞ»Ğ¸Ğ¼Ğ°Ñ‚Ğ¸Ñ‡ĞµÑĞºĞ¸Ğµ Ñ€ĞµÑˆĞµĞ½Ğ¸Ñ Ğ´Ğ»Ñ ĞºĞ¾Ğ¼Ñ„Ğ¾Ñ€Ñ‚Ğ° Ğ¸ ÑÑ„Ñ„ĞµĞºÑ‚Ğ¸Ğ²Ğ½Ğ¾ÑÑ‚Ğ¸.",
  },
  "/cozumler/hijyenik-filtrasyonlu-havalandirma": {
    title: "Ğ“Ğ¸Ğ³Ğ¸ĞµĞ½Ğ¸Ñ‡ĞµÑĞºĞ°Ñ Ñ„Ğ¸Ğ»ÑŒÑ‚Ñ€Ğ°Ñ†Ğ¸Ğ¾Ğ½Ğ½Ğ°Ñ Ğ²ĞµĞ½Ñ‚Ğ¸Ğ»ÑÑ†Ğ¸Ñ",
    description: "Ğ“Ğ¸Ğ³Ğ¸ĞµĞ½Ğ¸Ñ‡ĞµÑĞºĞ°Ñ Ñ„Ğ¸Ğ»ÑŒÑ‚Ñ€Ğ°Ñ†Ğ¸Ñ Ğ´Ğ»Ñ ĞºÑ€Ğ¸Ñ‚Ğ¸Ñ‡ĞµÑĞºĞ¸Ñ… Ğ·Ğ¾Ğ½.",
  },
  "/cozumler/endustriyel-hava-yonetimi": {
    title: "ĞŸÑ€Ğ¾Ğ¼Ñ‹ÑˆĞ»ĞµĞ½Ğ½Ğ¾Ğµ ÑƒĞ¿Ñ€Ğ°Ğ²Ğ»ĞµĞ½Ğ¸Ğµ Ğ²Ğ¾Ğ·Ğ´ÑƒÑ…Ğ¾Ğ¼",
    description: "ĞĞ°Ğ´Ñ‘Ğ¶Ğ½Ğ¾Ğµ ÑƒĞ¿Ñ€Ğ°Ğ²Ğ»ĞµĞ½Ğ¸Ğµ Ğ²Ğ¾Ğ·Ğ´ÑƒÑ…Ğ¾Ğ¼ Ğ´Ğ»Ñ Ğ¿Ñ€Ğ¾Ğ¼Ñ‹ÑˆĞ»ĞµĞ½Ğ½Ğ¾ÑÑ‚Ğ¸.",
  },
  "/cozumler/atex-patlama-koruma-cozumleri": {
    title: "Ğ’Ğ·Ñ€Ñ‹Ğ²Ğ¾Ğ·Ğ°Ñ‰Ğ¸Ñ‚Ğ° ATEX",
    description: "Ğ‘ĞµĞ·Ğ¾Ğ¿Ğ°ÑĞ½Ñ‹Ğµ Ğ²ĞµĞ½Ñ‚Ğ¸Ğ»ÑÑ†Ğ¸Ğ¾Ğ½Ğ½Ñ‹Ğµ Ñ€ĞµÑˆĞµĞ½Ğ¸Ñ Ñ ÑĞ¾Ğ¾Ñ‚Ğ²ĞµÑ‚ÑÑ‚Ğ²Ğ¸ĞµĞ¼ ATEX.",
  },
  "/cozumler/hayvancilik-tesisleri-icin-havalandirma-sistemleri": {
    title: "Ğ’ĞµĞ½Ñ‚Ğ¸Ğ»ÑÑ†Ğ¸Ñ Ğ¶Ğ¸Ğ²Ğ¾Ñ‚Ğ½Ğ¾Ğ²Ğ¾Ğ´Ñ‡ĞµÑĞºĞ¸Ñ… Ğ¾Ğ±ÑŠĞµĞºÑ‚Ğ¾Ğ²",
    description: "ĞÑ‚ĞºÑ€Ğ¾Ğ¹Ñ‚Ğµ Ğ¸Ğ½Ğ¶ĞµĞ½ĞµÑ€Ğ½Ğ¾Ğµ Ñ€ĞµÑˆĞµĞ½Ğ¸Ğµ Ğ´Ğ»Ñ Ğ²Ğ°ÑˆĞµĞ³Ğ¾ Ğ¿Ñ€Ğ¾ĞµĞºÑ‚Ğ°.",
  },
  "/cozumler/trafo-enerji-odalari-fanlari": {
    title: "Ğ’ĞµĞ½Ñ‚Ğ¸Ğ»ÑÑ‚Ğ¾Ñ€Ñ‹ Ğ´Ğ»Ñ Ñ‚Ñ€Ğ°Ğ½ÑÑ„Ğ¾Ñ€Ğ¼Ğ°Ñ‚Ğ¾Ñ€Ğ½Ñ‹Ñ… Ğ¿Ğ¾Ğ¼ĞµÑ‰ĞµĞ½Ğ¸Ğ¹",
    description: "ĞÑ‚ĞºÑ€Ğ¾Ğ¹Ñ‚Ğµ Ğ¸Ğ½Ğ¶ĞµĞ½ĞµÑ€Ğ½Ğ¾Ğµ Ñ€ĞµÑˆĞµĞ½Ğ¸Ğµ Ğ´Ğ»Ñ Ğ²Ğ°ÑˆĞµĞ³Ğ¾ Ğ¿Ñ€Ğ¾ĞµĞºÑ‚Ğ°.",
  },
  "/cozumler/sera-tarimsal-havalandirma-sistemleri": {
    title: "Ğ¢ĞµĞ¿Ğ»Ğ¸Ñ‡Ğ½Ğ°Ñ Ğ¸ ÑĞµĞ»ÑŒÑĞºĞ¾Ñ…Ğ¾Ğ·ÑĞ¹ÑÑ‚Ğ²ĞµĞ½Ğ½Ğ°Ñ Ğ²ĞµĞ½Ñ‚Ğ¸Ğ»ÑÑ†Ğ¸Ñ",
    description: "ĞÑ‚ĞºÑ€Ğ¾Ğ¹Ñ‚Ğµ Ğ¸Ğ½Ğ¶ĞµĞ½ĞµÑ€Ğ½Ğ¾Ğµ Ñ€ĞµÑˆĞµĞ½Ğ¸Ğµ Ğ´Ğ»Ñ Ğ²Ğ°ÑˆĞµĞ³Ğ¾ Ğ¿Ñ€Ğ¾ĞµĞºÑ‚Ğ°.",
  },
  "/cozumler/akilli-otomasyon-ve-kontrol-sistemleri": {
    title: "Ğ˜Ğ½Ñ‚ĞµĞ»Ğ»ĞµĞºÑ‚ÑƒĞ°Ğ»ÑŒĞ½Ğ°Ñ Ğ°Ğ²Ñ‚Ğ¾Ğ¼Ğ°Ñ‚Ğ¸ĞºĞ° Ğ¸ ÑƒĞ¿Ñ€Ğ°Ğ²Ğ»ĞµĞ½Ğ¸Ğµ",
    description: "ĞÑ‚ĞºÑ€Ğ¾Ğ¹Ñ‚Ğµ Ğ¸Ğ½Ğ¶ĞµĞ½ĞµÑ€Ğ½Ğ¾Ğµ Ñ€ĞµÑˆĞµĞ½Ğ¸Ğµ Ğ´Ğ»Ñ Ğ²Ğ°ÑˆĞµĞ³Ğ¾ Ğ¿Ñ€Ğ¾ĞµĞºÑ‚Ğ°.",
  },
  "/cozumler/konut-tipi-havalandirma-sistemleri": {
    title: "Ğ’ĞµĞ½Ñ‚Ğ¸Ğ»ÑÑ†Ğ¸Ñ Ğ¶Ğ¸Ğ»Ñ‹Ñ… Ğ¿Ğ¾Ğ¼ĞµÑ‰ĞµĞ½Ğ¸Ğ¹",
    description: "ĞÑ‚ĞºÑ€Ğ¾Ğ¹Ñ‚Ğµ Ğ¸Ğ½Ğ¶ĞµĞ½ĞµÑ€Ğ½Ğ¾Ğµ Ñ€ĞµÑˆĞµĞ½Ğ¸Ğµ Ğ´Ğ»Ñ Ğ²Ğ°ÑˆĞµĞ³Ğ¾ Ğ¿Ñ€Ğ¾ĞµĞºÑ‚Ğ°.",
  },
  "/cozumler/marin-offshore-havalandirma-sistemleri": {
    title: "ĞœĞ¾Ñ€ÑĞºĞ°Ñ Ğ¸ Ğ¾Ñ„Ñ„ÑˆĞ¾Ñ€Ğ½Ğ°Ñ Ğ²ĞµĞ½Ñ‚Ğ¸Ğ»ÑÑ†Ğ¸Ñ",
    description: "ĞÑ‚ĞºÑ€Ğ¾Ğ¹Ñ‚Ğµ Ğ¸Ğ½Ğ¶ĞµĞ½ĞµÑ€Ğ½Ğ¾Ğµ Ñ€ĞµÑˆĞµĞ½Ğ¸Ğµ Ğ´Ğ»Ñ Ğ²Ğ°ÑˆĞµĞ³Ğ¾ Ğ¿Ñ€Ğ¾ĞµĞºÑ‚Ğ°.",
  },
  "/cozumler/proje-bazli-ozel-imalatlar": {
    title: "ĞŸÑ€Ğ¾ĞµĞºÑ‚Ğ½Ğ¾Ğµ Ğ¸Ğ½Ğ´Ğ¸Ğ²Ğ¸Ğ´ÑƒĞ°Ğ»ÑŒĞ½Ğ¾Ğµ Ğ¿Ñ€Ğ¾Ğ¸Ğ·Ğ²Ğ¾Ğ´ÑÑ‚Ğ²Ğ¾",
    description: "ĞÑ‚ĞºÑ€Ğ¾Ğ¹Ñ‚Ğµ Ğ¸Ğ½Ğ¶ĞµĞ½ĞµÑ€Ğ½Ğ¾Ğµ Ñ€ĞµÑˆĞµĞ½Ğ¸Ğµ Ğ´Ğ»Ñ Ğ²Ğ°ÑˆĞµĞ³Ğ¾ Ğ¿Ñ€Ğ¾ĞµĞºÑ‚Ğ°.",
  },
  "/cozumler/cfd-muhendislik-danismanligi": {
    title: "Ğ˜Ğ½Ğ¶ĞµĞ½ĞµÑ€Ğ½Ñ‹Ğ¹ CFD-ĞºĞ¾Ğ½ÑĞ°Ğ»Ñ‚Ğ¸Ğ½Ğ³",
    description: "ĞÑ‚ĞºÑ€Ğ¾Ğ¹Ñ‚Ğµ Ğ¸Ğ½Ğ¶ĞµĞ½ĞµÑ€Ğ½Ğ¾Ğµ Ñ€ĞµÑˆĞµĞ½Ğ¸Ğµ Ğ´Ğ»Ñ Ğ²Ğ°ÑˆĞµĞ³Ğ¾ Ğ¿Ñ€Ğ¾ĞµĞºÑ‚Ğ°.",
  },
};

const trProductBlurbs = [
  "GÃ¼venilir fanlarla etkili hava sirkulasyonu.",
  "Konfor odaklÄ± dengeli iklim kontrolÃ¼.",
  "Enerji verimli mevsimsel iklimlendirme.",
  "Debiyi doÄŸru yÃ¶netir, verimi artÄ±rÄ±r.",
  "Alan iÃ§inde dengeli ve homojen daÄŸÄ±lÄ±m.",
  "Daha temiz hava iÃ§in etkili filtrasyon.",
  "Kurulumu tamamlayan yardÄ±mcÄ± ekipmanlar.",
  "AkÄ±llÄ± ve pratik kontrol Ã§Ã¶zÃ¼mleri.",
  "Daha sessiz ve stabil Ã§alÄ±ÅŸma.",
];

const ruProductBlurbs = [
  "Ğ­Ñ„Ñ„ĞµĞºÑ‚Ğ¸Ğ²Ğ½Ğ°Ñ Ñ†Ğ¸Ñ€ĞºÑƒĞ»ÑÑ†Ğ¸Ñ Ğ²Ğ¾Ğ·Ğ´ÑƒÑ…Ğ° Ñ Ğ½Ğ°Ğ´ĞµĞ¶Ğ½Ñ‹Ğ¼Ğ¸ Ğ²ĞµĞ½Ñ‚Ğ¸Ğ»ÑÑ‚Ğ¾Ñ€Ğ°Ğ¼Ğ¸.",
  "Ğ¡Ğ±Ğ°Ğ»Ğ°Ğ½ÑĞ¸Ñ€Ğ¾Ğ²Ğ°Ğ½Ğ½Ñ‹Ğ¹ ĞºĞ»Ğ¸Ğ¼Ğ°Ñ‚ Ğ´Ğ»Ñ ĞºĞ¾Ğ¼Ñ„Ğ¾Ñ€Ñ‚Ğ°.",
  "Ğ­Ğ½ĞµÑ€Ğ³Ğ¾ÑÑ„Ñ„ĞµĞºÑ‚Ğ¸Ğ²Ğ½Ğ¾Ğµ ÑĞµĞ·Ğ¾Ğ½Ğ½Ğ¾Ğµ ĞºĞ¾Ğ½Ğ´Ğ¸Ñ†Ğ¸Ğ¾Ğ½Ğ¸Ñ€Ğ¾Ğ²Ğ°Ğ½Ğ¸Ğµ.",
  "ĞŸÑ€Ğ°Ğ²Ğ¸Ğ»ÑŒĞ½Ğ¾Ğµ ÑƒĞ¿Ñ€Ğ°Ğ²Ğ»ĞµĞ½Ğ¸Ğµ Ñ€Ğ°ÑÑ…Ğ¾Ğ´Ğ¾Ğ¼ Ğ´Ğ»Ñ ÑÑ„Ñ„ĞµĞºÑ‚Ğ¸Ğ²Ğ½Ğ¾ÑÑ‚Ğ¸.",
  "Ğ Ğ°Ğ²Ğ½Ğ¾Ğ¼ĞµÑ€Ğ½Ğ¾Ğµ Ñ€Ğ°ÑĞ¿Ñ€ĞµĞ´ĞµĞ»ĞµĞ½Ğ¸Ğµ Ğ² Ğ¿Ğ¾Ğ¼ĞµÑ‰ĞµĞ½Ğ¸Ğ¸.",
  "Ğ­Ñ„Ñ„ĞµĞºÑ‚Ğ¸Ğ²Ğ½Ğ°Ñ Ñ„Ğ¸Ğ»ÑŒÑ‚Ñ€Ğ°Ñ†Ğ¸Ñ Ğ´Ğ»Ñ Ğ±Ğ¾Ğ»ĞµĞµ Ñ‡Ğ¸ÑÑ‚Ğ¾Ğ³Ğ¾ Ğ²Ğ¾Ğ·Ğ´ÑƒÑ…Ğ°.",
  "Ğ”Ğ¾Ğ¿Ğ¾Ğ»Ğ½Ğ¸Ñ‚ĞµĞ»ÑŒĞ½Ğ¾Ğµ Ğ¾Ğ±Ğ¾Ñ€ÑƒĞ´Ğ¾Ğ²Ğ°Ğ½Ğ¸Ğµ Ğ´Ğ»Ñ Ğ·Ğ°Ğ²ĞµÑ€ÑˆĞµĞ½Ğ¸Ñ Ğ¼Ğ¾Ğ½Ñ‚Ğ°Ğ¶Ğ°.",
  "Ğ£Ğ¼Ğ½Ñ‹Ğµ Ğ¸ Ğ¿Ñ€Ğ°ĞºÑ‚Ğ¸Ñ‡Ğ½Ñ‹Ğµ Ñ€ĞµÑˆĞµĞ½Ğ¸Ñ ÑƒĞ¿Ñ€Ğ°Ğ²Ğ»ĞµĞ½Ğ¸Ñ.",
  "Ğ‘Ğ¾Ğ»ĞµĞµ Ñ‚Ğ¸Ñ…Ğ°Ñ Ñ€Ğ°Ğ±Ğ¾Ñ‚Ğ° Ñ Ğ³Ğ°ÑˆĞµĞ½Ğ¸ĞµĞ¼ Ğ²Ğ¸Ğ±Ñ€Ğ°Ñ†Ğ¸Ğ¸ Ğ¸ ÑˆÑƒĞ¼Ğ°.",
];

const trCatalogPreview = [
  {
    title: "ÃœrÃ¼n KataloÄŸu",
    href: "/teknik-merkez/dokuman-kutuphanesi",
    image: "/images/catalogs/katalog-mockup-kapak-website-icin.png",
  },
  {
    title: "Teknik FÃ¶yler",
    href: "/teknik-merkez/dokuman-kutuphanesi",
    image: "/images/catalogs/dumantahliye-mockup.png",
  },
  {
    title: "Datasheet ArÅŸivi",
    href: "/teknik-merkez/dokuman-kutuphanesi",
    image: "/images/catalogs/sirketprofili-mockup.png",
  },
];

const ruCatalogPreview = [
  {
    title: "ĞšĞ°Ñ‚Ğ°Ğ»Ğ¾Ğ³ Ğ¿Ñ€Ğ¾Ğ´ÑƒĞºÑ†Ğ¸Ğ¸",
    href: "/teknik-merkez/dokuman-kutuphanesi",
    image: "/images/catalogs/katalog-mockup-kapak-website-icin.png",
  },
  {
    title: "Ğ¢ĞµÑ…Ğ½Ğ¸Ñ‡ĞµÑĞºĞ¸Ğµ Ğ±Ñ€Ğ¾ÑˆÑÑ€Ñ‹",
    href: "/teknik-merkez/dokuman-kutuphanesi",
    image: "/images/catalogs/dumantahliye-mockup.png",
  },
  {
    title: "ĞÑ€Ñ…Ğ¸Ğ² datasheet",
    href: "/teknik-merkez/dokuman-kutuphanesi",
    image: "/images/catalogs/sirketprofili-mockup.png",
  },
];

const enCert = enHome.certificatePreview;

const trCertPreview = [
  { ...enCert[0], title: "EN SertifikalarÄ±" },
  { ...enCert[1], title: "ISO Belgeleri" },
  { ...enCert[2], title: "Kalite ve Uygunluk" },
];

const ruCertPreview = [
  { ...enCert[0], title: "Ğ¡ĞµÑ€Ñ‚Ğ¸Ñ„Ğ¸ĞºĞ°Ñ‚Ñ‹ EN" },
  { ...enCert[1], title: "Ğ”Ğ¾ĞºÑƒĞ¼ĞµĞ½Ñ‚Ñ‹ ISO" },
  { ...enCert[2], title: "ĞšĞ°Ñ‡ĞµÑÑ‚Ğ²Ğ¾ Ğ¸ ÑĞ¾Ğ¾Ñ‚Ğ²ĞµÑ‚ÑÑ‚Ğ²Ğ¸Ğµ" },
];

const trCompanyCards = [
  {
    href: "/kurumsal/biz-kimiz",
    image: "/images/biz-kimiz-sag.png",
    title: "Biz Kimiz",
  },
  {
    href: "/kurumsal/ceo-mesaji",
    image: "/images/page-hero/ceo.jpg",
    title: "CEO MesajÄ±",
  },
  {
    href: "/kurumsal/ekibimiz",
    image: "/images/page-hero/ekibimiz-company-profile-card.png",
    title: "Ekibimiz",
  },
];

const ruCompanyCards = [
  {
    href: "/kurumsal/biz-kimiz",
    image: "/images/biz-kimiz-sag.png",
    title: "Ğ ĞºĞ¾Ğ¼Ğ¿Ğ°Ğ½Ğ¸Ğ¸",
  },
  {
    href: "/kurumsal/ceo-mesaji",
    image: "/images/page-hero/ceo.jpg",
    title: "ĞŸĞ¾ÑĞ»Ğ°Ğ½Ğ¸Ğµ CEO",
  },
  {
    href: "/kurumsal/ekibimiz",
    image: "/images/page-hero/ekibimiz-company-profile-card.png",
    title: "ĞšĞ¾Ğ¼Ğ°Ğ½Ğ´Ğ°",
  },
];

function merge(locale, data) {
  const p = path.join(dictRoot, locale, "home.json");
  const h = JSON.parse(fs.readFileSync(p, "utf8"));
  for (const k of KEYS) {
    if (data[k] !== undefined) h[k] = structuredClone(data[k]);
  }
  fs.writeFileSync(p, JSON.stringify(h, null, 2) + "\n");
  console.log("patched", locale);
}

merge("tr", {
  pageChrome: trPageChrome,
  solutionCarouselByHref: trSolutionCarouselByHref,
  productCategoryBlurbs: trProductBlurbs,
  catalogPreview: trCatalogPreview,
  certificatePreview: trCertPreview,
  companyProfileCards: trCompanyCards,
  referencePreview: enHome.referencePreview,
});

merge("ru", {
  pageChrome: ruPageChrome,
  solutionCarouselByHref: ruSolutionCarouselByHref,
  productCategoryBlurbs: ruProductBlurbs,
  catalogPreview: ruCatalogPreview,
  certificatePreview: ruCertPreview,
  companyProfileCards: ruCompanyCards,
  referencePreview: enHome.referencePreview,
});

