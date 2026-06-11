// Tek seferlik migrasyon: ürün KATEGORİ bölümlerine, kategori sayfasının altındaki
// "Teknik Kütüphane" (Kataloglar + Kılavuzlar) içeriğini — şu an koddan üretilen
// varsayılanların birebir aynısını, dile göre, boş href ile — catalogs/guides olarak
// ekler. Builder bunları okur; href boşken teknik-merkez linkine düşer → site değişmez.
import fs from "fs";
import path from "path";

const LOCALES = ["tr", "en", "ru", "ar", "de", "fr", "it", "es", "az", "kk", "tg", "zh", "ur", "lt", "pl"];
const CATEGORY_SECTIONS = [
  "havaHareketi", "iklimlendirme", "sogutmaVeIsitma", "havaYonetimi", "havaDagitimi",
  "havaFiltrasyonu", "aksesuarlar", "otomasyonMalzemeleri", "titresimVeSesIzolasyon",
];

// product-catalog-ui ile birebir [docCatalogTitle, docGeneralCatalog, docInstallManual, docDatasheets]
const L = {
  tr: ["{name} ürün kataloğu", "NOVVES genel ürün kataloğu", "Montaj ve bakım kılavuzu", "Teknik veri föyleri"],
  en: ["{name} product catalog", "NOVVES general product catalog", "Installation & maintenance manual", "Technical datasheets"],
  ru: ["Каталог продукции {name}", "Общий каталог продукции NOVVES", "Руководство по монтажу и обслуживанию", "Технические спецификации"],
  ar: ["كتالوج منتجات {name}", "كتالوج منتجات NOVVES العام", "دليل التركيب والصيانة", "صحائف البيانات الفنية"],
  de: ["{name} Produktkatalog", "NOVVES Gesamtproduktkatalog", "Montage- und Wartungshandbuch", "Technische Datenblätter"],
  it: ["Catalogo prodotti {name}", "Catalogo generale prodotti NOVVES", "Manuale di installazione e manutenzione", "Schede tecniche"],
  fr: ["Catalogue de produits {name}", "Catalogue général des produits NOVVES", "Manuel d'installation et d'entretien", "Fiches techniques"],
  az: ["{name} məhsul kataloqu", "NOVVES ümumi məhsul kataloqu", "Quraşdırma və texniki xidmət təlimatı", "Texniki məlumat vərəqələri"],
  kk: ["{name} өнім каталогы", "NOVVES жалпы өнім каталогы", "Монтаж және техникалық қызмет көрсету нұсқаулығы", "Техникалық деректер парақтары"],
  tg: ["Каталоги маҳсулоти {name}", "Каталоги умумии маҳсулоти NOVVES", "Дастури насб ва нигоҳдорӣ", "Варақаҳои маълумоти техникӣ"],
  es: ["Catálogo de productos {name}", "Catálogo general de productos NOVVES", "Manual de instalación y mantenimiento", "Fichas técnicas"],
  zh: ["{name} 产品目录", "NOVVES 通用产品目录", "安装与维护手册", "技术数据表"],
  ur: ["{name} پروڈکٹ کیٹلاگ", "NOVVES جنرل پروڈکٹ کیٹلاگ", "تنصیب اور دیکھ بھال مینوئل", "تکنیکی ڈیٹا شیٹس"],
  lt: ["{name} produktų katalogas", "NOVVES bendrasis produktų katalogas", "Montavimo ir priežiūros vadovas", "Techniniai duomenų lapai"],
  pl: ["Katalog produktów {name}", "Ogólny katalog produktów NOVVES", "Instrukcja montażu i konserwacji", "Karty katalogowe"],
};

const dictDir = path.join(process.cwd(), "src", "app", "[locale]", "dictionaries");
let changed = 0;
for (const loc of LOCALES) {
  const file = path.join(dictDir, loc, "products.json");
  if (!fs.existsSync(file)) continue;
  const json = JSON.parse(fs.readFileSync(file, "utf-8"));
  const labels = L[loc] ?? L.en;
  const catLabels = (json.shared && json.shared.categories) || {};
  let n = 0;
  for (const sec of CATEGORY_SECTIONS) {
    const block = json[sec];
    if (!block || typeof block !== "object") continue;
    if (Array.isArray(block.catalogs) || Array.isArray(block.guides)) continue; // zaten var
    const name = (typeof block.title === "string" && block.title.trim()) || catLabels[sec] || sec;
    block.catalogs = [
      { title: labels[0].replace("{name}", name), meta: "PDF", href: "" },
      { title: labels[1], meta: "PDF", href: "" },
    ];
    block.guides = [
      { title: labels[2], meta: "Rev. 2024.2", href: "" },
      { title: labels[3], meta: "PDF", href: "" },
    ];
    n++;
  }
  fs.writeFileSync(file, JSON.stringify(json, null, 2) + "\n", "utf-8");
  changed += n;
  console.log(`${loc}: ${n} kategoriye Teknik Kütüphane eklendi`);
}
console.log(`Toplam: ${changed} kategori bölümü güncellendi.`);
