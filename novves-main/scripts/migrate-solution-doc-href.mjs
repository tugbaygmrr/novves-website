// Tek seferlik migrasyon: solutions.json'da her çözümün library.documents
// öğelerine (yoksa) boş `href` alanı ekler (meta'dan hemen sonra) — böylece
// panelde belge yükleme alanı görünür. Boş href sitede linksiz kalır (mevcut davranış).
import fs from "fs";
import path from "path";

const LOCALES = ["tr", "en", "ru", "ar", "de", "fr", "it", "es", "az", "kk", "tg", "zh", "ur", "lt", "pl"];
const SOLUTION_KEYS = [
  "dumanIsiTahliye", "konforIklimlendirme", "hijyenikFiltrasyon", "endustriyelHavaYonetimi",
  "hayvancilikTesisleri", "trafoEnerjiOdalari", "seraTarimsal", "atexPatlamaKoruma",
  "akilliOtomasyon", "konutHavalandirma", "marinOffshore", "projeBazliOzelImalat", "cfdDanismanlik",
];
const dictDir = path.join(process.cwd(), "src", "app", "[locale]", "dictionaries");

function withHref(doc) {
  if (doc == null || typeof doc !== "object") return doc;
  if ("href" in doc) return doc; // zaten var
  const out = {};
  let inserted = false;
  for (const [k, v] of Object.entries(doc)) {
    out[k] = v;
    if (k === "meta") {
      out.href = "";
      inserted = true;
    }
  }
  if (!inserted) out.href = "";
  return out;
}

let changed = 0;
for (const loc of LOCALES) {
  const file = path.join(dictDir, loc, "solutions.json");
  if (!fs.existsSync(file)) continue;
  const json = JSON.parse(fs.readFileSync(file, "utf-8"));
  let n = 0;
  for (const key of SOLUTION_KEYS) {
    const sec = json[key];
    const docs = sec && sec.library && sec.library.documents;
    if (Array.isArray(docs)) {
      sec.library.documents = docs.map((d) => {
        const before = d && typeof d === "object" && "href" in d;
        const res = withHref(d);
        if (!before) n++;
        return res;
      });
    }
  }
  fs.writeFileSync(file, JSON.stringify(json, null, 2) + "\n", "utf-8");
  changed += n;
  console.log(`${loc}: ${n} belge öğesine href eklendi`);
}
console.log(`Toplam: ${changed} belge öğesi güncellendi.`);
