// Tek seferlik migrasyon: entity tipi kategori bölümlerindeki ürünleri
// (iklimlendirme.tiger gibi) products-array öğeleriyle aynı düzene getirir:
// label, desc, image, specFlow (max debi), specPressure (basınç).
// specs (3 satır, 1'i ölü) ve subModels kaldırılır; debi/basınç specs'ten türetilir,
// image meta görselinden seed edilir. Builder bu alanları okur → site değişmez.
import fs from "fs";
import path from "path";

const LOCALES = ["tr", "en", "ru", "ar", "de", "fr", "it", "es", "az", "kk", "tg", "zh", "ur", "lt", "pl"];
const ENTITIES = {
  iklimlendirme: { tiger: "TIGER", dolphin: "DOLPHIN", caracal: "CARACAL" },
  havaYonetimi: { hound: "HOUND" },
  havaDagitimi: { alpaca: "ALPACA" },
  havaFiltrasyonu: { scallop: "SCALLOP" },
  titresimVeSesIzolasyon: { roo: "ROO" },
};
const META_IMAGE = {
  TIGER: "/images/products/tiger-pre.png", DOLPHIN: "/images/products/dolphin-pre.png",
  CARACAL: "/images/products/caracal.png", HOUND: "/images/products/hound-al.png",
  ALPACA: "/images/products/alpaca-am.png", SCALLOP: "/images/products/cyclone.png",
  ROO: "/images/products/yayli-titresim-izolatoru.png",
};

// builder specValue ile birebir
function specValue(specs, matchers) {
  if (!Array.isArray(specs)) return "";
  for (const s of specs) {
    const label = String(s.label || "").toLowerCase();
    if (matchers.some((m) => m.test(label))) return String(s.value || "");
  }
  return "";
}

const dictDir = path.join(process.cwd(), "src", "app", "[locale]", "dictionaries");
let changed = 0;
for (const loc of LOCALES) {
  const file = path.join(dictDir, loc, "products.json");
  if (!fs.existsSync(file)) continue;
  const json = JSON.parse(fs.readFileSync(file, "utf-8"));
  let n = 0;
  for (const [sec, keys] of Object.entries(ENTITIES)) {
    const block = json[sec];
    if (!block || typeof block !== "object") continue;
    for (const [key, brand] of Object.entries(keys)) {
      const e = block[key];
      if (!e || typeof e !== "object") continue;
      const flow = specValue(e.specs, [/deb/i, /kapasite/i, /hava/i, /flow/i]);
      const pressure = specValue(e.specs, [/basın/i, /pressure/i, /pa/i]);
      block[key] = {
        label: e.label ?? "",
        desc: e.desc ?? "",
        image: (typeof e.image === "string" && e.image.trim()) || META_IMAGE[brand] || "/images/products/marlin.png",
        specFlow: (typeof e.specFlow === "string" && e.specFlow.trim()) || flow,
        specPressure: (typeof e.specPressure === "string" && e.specPressure.trim()) || pressure,
      };
      n++;
    }
  }
  fs.writeFileSync(file, JSON.stringify(json, null, 2) + "\n", "utf-8");
  changed += n;
  console.log(`${loc}: ${n} entity güncellendi`);
}
console.log(`Toplam: ${changed} entity işlendi.`);
