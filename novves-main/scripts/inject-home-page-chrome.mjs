/**
 * en/home.json içine ana sayfa sabit metinleri + çözüm carousel anahtarları ekler.
 * Çalıştır: node scripts/inject-home-page-chrome.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const enPath = path.join(root, "src/app/[locale]/dictionaries/en/home.json");

const pageChrome = {
  catalogsVertical: "Catalogs",
  previousSolutions: "Previous solutions",
  nextSolutions: "Next solutions",
  previousProducts: "Previous products",
  nextProducts: "Next products",
  defaultSolutionDesc:
    "Explore the right engineering solution for your project.",
  productFallbackDesc:
    "Discover reliable and efficient solutions tailored to your project.",
  catalogKindLabel: "Catalog",
  catalogCardDesc: "Access PDFs and documents in the technical center.",
  referenceEyebrow: "Reference",
  referenceCardDesc: "Explore highlights from projects we have delivered.",
  certificateEyebrow: "Certificate",
  certificateCardDesc:
    "Review our international quality, safety and compliance certificates.",
  companyEyebrow: "Corporate",
  companyCardDesc:
    "Discover NOVVES' story, leadership and team structure.",
  companyProfileVertical: "Company Profile",
  pillarExpandAria: "Show more",
  pillarCollapseAria: "Collapse",
  pillarCta: "View Details",
  productCardCta: "View Details",
  solutionCardCta: "View Details",
  midCtaBullet1: "48-hour preliminary assessment",
  midCtaBullet2: "Solution-oriented delivery",
  midCtaBullet3: "Site + CFD integration",
  videoStatMeta: "30+ Countries · 500+ Projects",
  scrollVideoSideLabel: "Car park ventilation",
  engineeringAlt1:
    "NOVVES CNC laser cutting precision manufacturing on sheet metal",
  engineeringAlt2: "NOVVES on-site assembly and technical service",
  pillarsFallbackTitle: "Our Engineering Approach",
};

const solutionSlides = [
  {
    href: "/cozumler/duman-isi-tahliye-sistemleri",
    title: "Smoke & Heat Extraction Systems",
    description: "Safe smoke and heat extraction for fire scenarios.",
  },
  {
    href: "/cozumler/konfor-iklimlendirme-sistemleri",
    title: "Comfort HVAC Systems",
    description: "HVAC solutions for comfort and efficiency.",
  },
  {
    href: "/cozumler/hijyenik-filtrasyonlu-havalandirma",
    title: "Hygienic Filtration Ventilation",
    description: "Hygienic filtration for critical spaces.",
  },
  {
    href: "/cozumler/endustriyel-hava-yonetimi",
    title: "Industrial Air Management",
    description: "Robust air management for industrial facilities.",
  },
  {
    href: "/cozumler/atex-patlama-koruma-cozumleri",
    title: "ATEX Explosion Protection",
    description: "ATEX-compliant safe ventilation solutions.",
  },
  {
    href: "/cozumler/hayvancilik-tesisleri-icin-havalandirma-sistemleri",
    title: "Livestock Facility Ventilation",
    description: "Explore the right engineering solution for your project.",
  },
  {
    href: "/cozumler/trafo-enerji-odalari-fanlari",
    title: "Transformer & Energy Room Fans",
    description: "Explore the right engineering solution for your project.",
  },
  {
    href: "/cozumler/sera-tarimsal-havalandirma-sistemleri",
    title: "Greenhouse & Agricultural Ventilation",
    description: "Explore the right engineering solution for your project.",
  },
  {
    href: "/cozumler/akilli-otomasyon-ve-kontrol-sistemleri",
    title: "Smart Automation and Control",
    description: "Explore the right engineering solution for your project.",
  },
  {
    href: "/cozumler/konut-tipi-havalandirma-sistemleri",
    title: "Residential Ventilation",
    description: "Explore the right engineering solution for your project.",
  },
  {
    href: "/cozumler/marin-offshore-havalandirma-sistemleri",
    title: "Marine & Offshore Ventilation",
    description: "Explore the right engineering solution for your project.",
  },
  {
    href: "/cozumler/proje-bazli-ozel-imalatlar",
    title: "Project-Based Custom Manufacturing",
    description: "Explore the right engineering solution for your project.",
  },
  {
    href: "/cozumler/cfd-muhendislik-danismanligi",
    title: "CFD Engineering Consultancy",
    description: "Explore the right engineering solution for your project.",
  },
];

const solutionCarouselByHref = Object.fromEntries(
  solutionSlides.map((s) => [s.href, { title: s.title, description: s.description }]),
);

const productCategoryBlurbs = [
  "Reliable air circulation with dependable fans.",
  "Comfort-focused balanced climate control.",
  "Energy-efficient seasonal heating and cooling.",
  "Managing airflow for higher efficiency.",
  "Even, homogeneous distribution across the space.",
  "Effective filtration for cleaner air.",
  "Supporting accessories that complete the installation.",
  "Smart and practical control solutions.",
  "Quieter operation with vibration and noise isolation.",
];

const catalogPreview = [
  {
    title: "Product Catalog",
    href: "/teknik-merkez/dokuman-kutuphanesi",
    image: "/images/catalogs/katalog-mockup-kapak-website-icin.png",
  },
  {
    title: "Technical Briefs",
    href: "/teknik-merkez/dokuman-kutuphanesi",
    image: "/images/catalogs/dumantahliye-mockup.png",
  },
  {
    title: "Datasheet Archive",
    href: "/teknik-merkez/dokuman-kutuphanesi",
    image: "/images/catalogs/sirketprofili-mockup.png",
  },
];

const referencePreview = [
  {
    title: "2M Lojistik Gebze Depo",
    href: "/kurumsal/referanslar",
    image: "/images/references/2m.jpg",
  },
  {
    title: "3S Kale Topaz Zeytinburnu",
    href: "/kurumsal/referanslar",
    image: "/images/references/3skale.jpg",
  },
  {
    title: "Adana Yüreğir 100 Yataklı Hastane",
    href: "/kurumsal/referanslar",
    image: "/images/references/adana-yuregir.jpg",
  },
];

const certificatePreview = [
  {
    title: "EN Certificates",
    href: "/kurumsal/sertifikalar",
    image: "/images/certificates/kalite-uygunluk-mockup.png",
  },
  {
    title: "ISO Documents",
    href: "/kurumsal/sertifikalar",
    image: "/images/certificates/iso-sertifika-mockup.png",
  },
  {
    title: "Quality & Compliance",
    href: "/kurumsal/sertifikalar",
    image: "/images/certificates/kalite-uygunluk-mockup.png",
  },
];

const companyProfileCards = [
  {
    href: "/kurumsal/biz-kimiz",
    image: "/images/biz-kimiz-sag.png",
    title: "Who We Are",
  },
  {
    href: "/kurumsal/ceo-mesaji",
    image: "/images/page-hero/ceo.jpg",
    title: "CEO Message",
  },
  {
    href: "/kurumsal/ekibimiz",
    image: "/images/page-hero/ekibimiz.jpg",
    title: "Our Team",
  },
];

const home = JSON.parse(fs.readFileSync(enPath, "utf8"));
home.pageChrome = pageChrome;
home.solutionCarouselByHref = solutionCarouselByHref;
home.productCategoryBlurbs = productCategoryBlurbs;
home.catalogPreview = catalogPreview;
home.referencePreview = referencePreview;
home.certificatePreview = certificatePreview;
home.companyProfileCards = companyProfileCards;

fs.writeFileSync(enPath, JSON.stringify(home, null, 2) + "\n");
console.log("Updated", enPath);
