// Tek seferlik migrasyon: library.documents olmayan çözümlere, sitenin şu an
// gösterdiği VARSAYILAN 4 belgeyi (katalog/kılavuz/BIM/sertifika) dile göre
// lokalize ekler (boş href). Böylece site görünümü değişmez ama panelde
// dokümantasyon düzenlenebilir ve belge yüklenebilir olur.
import fs from "fs";
import path from "path";

const LOCALES = ["tr", "en", "ru", "ar", "de", "fr", "it", "es", "az", "kk", "tg", "zh", "ur", "lt", "pl"];
const SOLUTION_KEYS = [
  "dumanIsiTahliye", "konforIklimlendirme", "hijyenikFiltrasyon", "endustriyelHavaYonetimi",
  "hayvancilikTesisleri", "trafoEnerjiOdalari", "seraTarimsal", "atexPatlamaKoruma",
  "akilliOtomasyon", "konutHavalandirma", "marinOffshore", "projeBazliOzelImalat", "cfdDanismanlik",
];

// solutionLibraryUi ile birebir: [docCatalog, docGuidelines, docBim, docCert]
const DOC_LABELS = {
  tr: ["Teknik Katalog 2024", "Tasarım Kılavuzu", "BIM / Revit Ailesi", "Sertifikalar ve Uygunluk"],
  en: ["Technical Catalog 2024", "Design Guidelines", "BIM / Revit Family", "Certificates & Compliance"],
  ru: ["Технический каталог 2024", "Руководство по проектированию", "BIM / Семейство Revit", "Сертификаты и соответствие"],
  ar: ["الكتالوج الفني 2024", "دليل التصميم", "BIM / عائلة Revit", "الشهادات والامتثال"],
  de: ["Technischer Katalog 2024", "Designrichtlinien", "BIM / Revit-Familie", "Zertifikate & Konformität"],
  it: ["Catalogo tecnico 2024", "Linee guida di progettazione", "BIM / Famiglia Revit", "Certificati e conformità"],
  fr: ["Catalogue technique 2024", "Guide de conception", "Famille BIM / Revit", "Certificats et conformité"],
  az: ["Texniki Kataloq 2024", "Dizayn Təlimatı", "BIM / Revit Ailəsi", "Sertifikatlar və Uyğunluq"],
  kk: ["Техникалық каталог 2024", "Жобалау нұсқаулығы", "BIM / Revit отбасы", "Сертификаттар және сәйкестік"],
  tg: ["Каталоги техникии 2024", "Дастури тарроҳӣ", "BIM / Оилаи Revit", "Сертификатҳо ва мутобиқат"],
  es: ["Catálogo técnico 2024", "Guía de diseño", "BIM / Familia Revit", "Certificados y conformidad"],
  zh: ["2024 技术样本", "设计导则", "BIM / Revit 族文件", "证书与合规"],
  ur: ["تکنیکی کیٹلاگ 2024", "ڈیزائن ہدایات", "BIM / Revit فیملی", "سرٹیفکیٹس اور تعمیل"],
  lt: ["Techninis katalogas 2024", "Projektavimo gairės", "BIM / Revit šeima", "Sertifikatai ir atitiktis"],
  pl: ["Katalog techniczny 2024", "Wytyczne projektowe", "BIM / Rodzina Revit", "Certyfikaty i zgodność"],
};

// buildSolutionLibraryPageData ile birebir meta (yalnızca tr virgül kullanır)
function metas(loc) {
  const comma = loc === "tr";
  return comma
    ? ["PDF • 14,2 MB", "PDF • 8,5 MB", "RFA • 22,1 MB", "PDF • 2,1 MB"]
    : ["PDF • 14.2 MB", "PDF • 8.5 MB", "RFA • 22.1 MB", "PDF • 2.1 MB"];
}
const ICONS = ["pdf", "doc", "bim", "cert"];

function defaultDocs(loc) {
  const labels = DOC_LABELS[loc] ?? DOC_LABELS.en;
  const meta = metas(loc);
  return labels.map((title, i) => ({ title, meta: meta[i], href: "", icon: ICONS[i] }));
}

const dictDir = path.join(process.cwd(), "src", "app", "[locale]", "dictionaries");
let changed = 0;
for (const loc of LOCALES) {
  const file = path.join(dictDir, loc, "solutions.json");
  if (!fs.existsSync(file)) continue;
  const json = JSON.parse(fs.readFileSync(file, "utf-8"));
  let n = 0;
  for (const key of SOLUTION_KEYS) {
    const sec = json[key];
    if (!sec || typeof sec !== "object") continue;
    if (!sec.library || typeof sec.library !== "object") continue;
    const docs = sec.library.documents;
    if (Array.isArray(docs) && docs.length > 0) continue; // zaten var (örn. dumanIsiTahliye)
    sec.library.documents = defaultDocs(loc);
    n++;
  }
  fs.writeFileSync(file, JSON.stringify(json, null, 2) + "\n", "utf-8");
  changed += n;
  console.log(`${loc}: ${n} çözüme varsayılan dokümanlar eklendi`);
}
console.log(`Toplam: ${changed} çözüm güncellendi.`);
