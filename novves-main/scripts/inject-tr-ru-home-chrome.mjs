/**
 * tr ve ru home.json için pageChrome + carousel verilerini yerelleştirir.
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
  previousSolutions: "Önceki çözümler",
  nextSolutions: "Sonraki çözümler",
  previousProducts: "Önceki ürünler",
  nextProducts: "Sonraki ürünler",
  defaultSolutionDesc: "Projeye özel mühendislik çözümünü keşfedin.",
  productFallbackDesc:
    "Projeye uygun, güvenilir ve verimli ürün çözümlerini keşfedin.",
  catalogKindLabel: "Katalog",
  catalogCardDesc: "Teknik merkezde PDF ve dokümanlara erişin.",
  referenceEyebrow: "Referans",
  referenceCardDesc: "Tamamlanan projelerden öne çıkan örnekleri inceleyin.",
  certificateEyebrow: "Sertifika",
  certificateCardDesc:
    "Uluslararası kalite, güvenlik ve uygunluk belgelerimizi inceleyin.",
  companyEyebrow: "Kurumsal",
  companyCardDesc: "NOVVES’in hikayesi, yönetim ve ekip yapısını keşfedin.",
  companyProfileVertical: "Şirket Profili",
  pillarExpandAria: "Devamını göster",
  pillarCollapseAria: "Metni daralt",
  pillarCta: "Detayları İncele",
  productCardCta: "Detayları İncele",
  solutionCardCta: "Detayları İncele",
  midCtaBullet1: "48 Saatte Ön Değerlendirme",
  midCtaBullet2: "Uygulamaya Dönük Çözüm",
  midCtaBullet3: "Saha + CFD Entegrasyonu",
  videoStatMeta: "30+ Ülke · 500+ Proje",
  scrollVideoSideLabel: "Otopark Havalandırma",
  engineeringAlt1: "NOVVES CNC lazer kesim ile metal sac üzerinde hassas imalat",
  engineeringAlt2: "NOVVES sahada montaj ve teknik müdahale",
  pillarsFallbackTitle: "Mühendislik Anlayışımız",
};

const ruPageChrome = {
  catalogsVertical: "Каталоги",
  previousSolutions: "Предыдущие решения",
  nextSolutions: "Следующие решения",
  previousProducts: "Предыдущие товары",
  nextProducts: "Следующие товары",
  defaultSolutionDesc: "Откройте инженерное решение для вашего проекта.",
  productFallbackDesc:
    "Откройте надежные и эффективные решения, подходящие для вашего проекта.",
  catalogKindLabel: "Каталог",
  catalogCardDesc: "Доступ к PDF и документам в техническом центре.",
  referenceEyebrow: "Референс",
  referenceCardDesc: "Ознакомьтесь с избранными реализованными проектами.",
  certificateEyebrow: "Сертификат",
  certificateCardDesc:
    "Ознакомьтесь с международными сертификатами качества и соответствия.",
  companyEyebrow: "Компания",
  companyCardDesc:
    "История NOVVES, руководство и структура команды.",
  companyProfileVertical: "Профиль компании",
  pillarExpandAria: "Показать полностью",
  pillarCollapseAria: "Свернуть",
  pillarCta: "Подробнее",
  productCardCta: "Подробнее",
  solutionCardCta: "Подробнее",
  midCtaBullet1: "Предварительная оценка за 48 часов",
  midCtaBullet2: "Ориентированное на внедрение решение",
  midCtaBullet3: "Интеграция объекта + CFD",
  videoStatMeta: "30+ стран · 500+ проектов",
  scrollVideoSideLabel: "Вентиляция парковки",
  engineeringAlt1:
    "Точное изготовление NOVVES с ЧПУ-лазерной резкой листового металла",
  engineeringAlt2: "Монтаж на объекте и техническое сопровождение NOVVES",
  pillarsFallbackTitle: "Наш инженерный подход",
};

const trSolutionCarouselByHref = {
  "/cozumler/duman-isi-tahliye-sistemleri": {
    title: "Duman & Isı Tahliye Sistemleri",
    description: "Yangın için güvenli duman ve ısı tahliyesi.",
  },
  "/cozumler/konfor-iklimlendirme-sistemleri": {
    title: "Konfor İklimlendirme Sistemleri",
    description: "Konfor ve verim için iklimlendirme çözümleri.",
  },
  "/cozumler/hijyenik-filtrasyonlu-havalandirma": {
    title: "Hijyenik Filtrasyonlu Havalandırma",
    description: "Kritik alanlar için hijyenik filtrasyon.",
  },
  "/cozumler/endustriyel-hava-yonetimi": {
    title: "Endüstriyel Hava Yönetimi",
    description: "Endüstriyel alanlarda güçlü hava yönetimi.",
  },
  "/cozumler/atex-patlama-koruma-cozumleri": {
    title: "ATEX Patlama Koruma Çözümleri",
    description: "ATEX uyumlu güvenli havalandırma çözümleri.",
  },
  "/cozumler/hayvancilik-tesisleri-icin-havalandirma-sistemleri": {
    title: "Hayvancılık Tesisleri Havalandırma",
    description: "Projeye özel mühendislik çözümünü keşfedin.",
  },
  "/cozumler/trafo-enerji-odalari-fanlari": {
    title: "Trafo & Enerji Odaları Fanları",
    description: "Projeye özel mühendislik çözümünü keşfedin.",
  },
  "/cozumler/sera-tarimsal-havalandirma-sistemleri": {
    title: "Sera & Tarımsal Havalandırma",
    description: "Projeye özel mühendislik çözümünü keşfedin.",
  },
  "/cozumler/akilli-otomasyon-ve-kontrol-sistemleri": {
    title: "Akıllı Otomasyon ve Kontrol",
    description: "Projeye özel mühendislik çözümünü keşfedin.",
  },
  "/cozumler/konut-tipi-havalandirma-sistemleri": {
    title: "Konut Tipi Havalandırma",
    description: "Projeye özel mühendislik çözümünü keşfedin.",
  },
  "/cozumler/marin-offshore-havalandirma-sistemleri": {
    title: "Marin & Offshore Havalandırma",
    description: "Projeye özel mühendislik çözümünü keşfedin.",
  },
  "/cozumler/proje-bazli-ozel-imalatlar": {
    title: "Proje Bazlı Özel İmalatlar",
    description: "Projeye özel mühendislik çözümünü keşfedin.",
  },
  "/cozumler/cfd-muhendislik-danismanligi": {
    title: "CFD Mühendislik Danışmanlığı",
    description: "Projeye özel mühendislik çözümünü keşfedin.",
  },
};

const ruSolutionCarouselByHref = {
  "/cozumler/duman-isi-tahliye-sistemleri": {
    title: "Системы дымоудаления и теплоотвода",
    description: "Безопасное дымо- и теплоудаление при пожаре.",
  },
  "/cozumler/konfor-iklimlendirme-sistemleri": {
    title: "Системы комфортного кондиционирования",
    description: "Климатические решения для комфорта и эффективности.",
  },
  "/cozumler/hijyenik-filtrasyonlu-havalandirma": {
    title: "Гигиеническая фильтрационная вентиляция",
    description: "Гигиеническая фильтрация для критических зон.",
  },
  "/cozumler/endustriyel-hava-yonetimi": {
    title: "Промышленное управление воздухом",
    description: "Надёжное управление воздухом для промышленности.",
  },
  "/cozumler/atex-patlama-koruma-cozumleri": {
    title: "Взрывозащита ATEX",
    description: "Безопасные вентиляционные решения с соответствием ATEX.",
  },
  "/cozumler/hayvancilik-tesisleri-icin-havalandirma-sistemleri": {
    title: "Вентиляция животноводческих объектов",
    description: "Откройте инженерное решение для вашего проекта.",
  },
  "/cozumler/trafo-enerji-odalari-fanlari": {
    title: "Вентиляторы для трансформаторных помещений",
    description: "Откройте инженерное решение для вашего проекта.",
  },
  "/cozumler/sera-tarimsal-havalandirma-sistemleri": {
    title: "Тепличная и сельскохозяйственная вентиляция",
    description: "Откройте инженерное решение для вашего проекта.",
  },
  "/cozumler/akilli-otomasyon-ve-kontrol-sistemleri": {
    title: "Интеллектуальная автоматика и управление",
    description: "Откройте инженерное решение для вашего проекта.",
  },
  "/cozumler/konut-tipi-havalandirma-sistemleri": {
    title: "Вентиляция жилых помещений",
    description: "Откройте инженерное решение для вашего проекта.",
  },
  "/cozumler/marin-offshore-havalandirma-sistemleri": {
    title: "Морская и оффшорная вентиляция",
    description: "Откройте инженерное решение для вашего проекта.",
  },
  "/cozumler/proje-bazli-ozel-imalatlar": {
    title: "Проектное индивидуальное производство",
    description: "Откройте инженерное решение для вашего проекта.",
  },
  "/cozumler/cfd-muhendislik-danismanligi": {
    title: "Инженерный CFD-консалтинг",
    description: "Откройте инженерное решение для вашего проекта.",
  },
};

const trProductBlurbs = [
  "Güvenilir fanlarla etkili hava sirkulasyonu.",
  "Konfor odaklı dengeli iklim kontrolü.",
  "Enerji verimli mevsimsel iklimlendirme.",
  "Debiyi doğru yönetir, verimi artırır.",
  "Alan içinde dengeli ve homojen dağılım.",
  "Daha temiz hava için etkili filtrasyon.",
  "Kurulumu tamamlayan yardımcı ekipmanlar.",
  "Akıllı ve pratik kontrol çözümleri.",
  "Daha sessiz ve stabil çalışma.",
];

const ruProductBlurbs = [
  "Эффективная циркуляция воздуха с надежными вентиляторами.",
  "Сбалансированный климат для комфорта.",
  "Энергоэффективное сезонное кондиционирование.",
  "Правильное управление расходом для эффективности.",
  "Равномерное распределение в помещении.",
  "Эффективная фильтрация для более чистого воздуха.",
  "Дополнительное оборудование для завершения монтажа.",
  "Умные и практичные решения управления.",
  "Более тихая работа с гашением вибрации и шума.",
];

const trCatalogPreview = [
  {
    title: "Ürün Kataloğu",
    href: "/teknik-merkez/dokuman-kutuphanesi",
    image: "/images/catalogs/katalog-mockup-kapak-website-icin.png",
  },
  {
    title: "Teknik Föyler",
    href: "/teknik-merkez/dokuman-kutuphanesi",
    image: "/images/catalogs/dumantahliye-mockup.png",
  },
  {
    title: "Datasheet Arşivi",
    href: "/teknik-merkez/dokuman-kutuphanesi",
    image: "/images/catalogs/sirketprofili-mockup.png",
  },
];

const ruCatalogPreview = [
  {
    title: "Каталог продукции",
    href: "/teknik-merkez/dokuman-kutuphanesi",
    image: "/images/catalogs/katalog-mockup-kapak-website-icin.png",
  },
  {
    title: "Технические брошюры",
    href: "/teknik-merkez/dokuman-kutuphanesi",
    image: "/images/catalogs/dumantahliye-mockup.png",
  },
  {
    title: "Архив datasheet",
    href: "/teknik-merkez/dokuman-kutuphanesi",
    image: "/images/catalogs/sirketprofili-mockup.png",
  },
];

const enCert = enHome.certificatePreview;

const trCertPreview = [
  { ...enCert[0], title: "EN Sertifikaları" },
  { ...enCert[1], title: "ISO Belgeleri" },
  { ...enCert[2], title: "Kalite ve Uygunluk" },
];

const ruCertPreview = [
  { ...enCert[0], title: "Сертификаты EN" },
  { ...enCert[1], title: "Документы ISO" },
  { ...enCert[2], title: "Качество и соответствие" },
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
    title: "CEO Mesajı",
  },
  {
    href: "/kurumsal/ekibimiz",
    image: "/images/page-hero/ekibimiz.jpg",
    title: "Ekibimiz",
  },
];

const ruCompanyCards = [
  {
    href: "/kurumsal/biz-kimiz",
    image: "/images/biz-kimiz-sag.png",
    title: "О компании",
  },
  {
    href: "/kurumsal/ceo-mesaji",
    image: "/images/page-hero/ceo.jpg",
    title: "Послание CEO",
  },
  {
    href: "/kurumsal/ekibimiz",
    image: "/images/page-hero/ekibimiz.jpg",
    title: "Команда",
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
