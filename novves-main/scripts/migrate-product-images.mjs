// Tek seferlik migrasyon: products dizisi olan kategori bölümlerinde her ürünün
// BOŞ image alanını, sitenin şu an gösterdiği gerçek görsel yoluyla doldurur.
// (resolveCoolingCatalogImage mantığının birebir kopyası.) Builder explicit
// image'ı önceliklendirdiği için site görünümü değişmez; panelde görsel görünür/değişebilir.
import fs from "fs";
import path from "path";

const LOCALES = ["tr", "en", "ru", "ar", "de", "fr", "it", "es", "az", "kk", "tg", "zh", "ur", "lt", "pl"];
const SECTIONS = ["havaHareketi", "sogutmaVeIsitma", "otomasyonMalzemeleri"];
const dictDir = path.join(process.cwd(), "src", "app", "[locale]", "dictionaries");

const CHILLER = "/images/products/chiller.png";
const HEATER = "/images/products/elektrikli-isitici.png";

// CATALOG_FAMILY_META (AIR_MOVEMENT + ekstralar) — name(UPPER) → görsel
const META = {
  // air movement
  DRAGONFLY: "/images/products/dragonfly-c.png", MARLIN: "/images/products/marlin.png",
  BEAR: "/images/products/bear-reb.png", NAUTILUS: "/images/products/nautilus-cif-cidarli.png",
  HUMMINGBIRD: "/images/products/hummingbird-drb-ec.jpg", HERON: "/images/products/heron-rv.png",
  OWL: "/images/products/owl-rer.png", SEAHORSE: "/images/products/banyo-fan-1.png",
  KOI: "/images/products/koi-cb.png", TURTLE: "/images/products/turtle-a.png",
  BUTTERFLY: "/images/products/butterfly-b.jpg", FOX: "/images/products/fox-c.png",
  CHICKEN: "/images/products/chicken.png", ELEPHANT: "/images/products/elephant.png",
  // ekstralar
  TIGER: "/images/products/tiger-pre.png", DOLPHIN: "/images/products/dolphin-pre.png",
  CARACAL: "/images/products/caracal.png", HOUND: "/images/products/hound-al.png",
  ALPACA: "/images/products/alpaca-am.png", SCALLOP: "/images/products/cyclone.png",
  ROO: "/images/products/yayli-titresim-izolatoru.png", REMORA: "/images/products/remora.png",
  "CHILLER (POLAR BEAR)": CHILLER, CHILLER: CHILLER,
  "DIŞ ÜNİTELER": CHILLER, "OUTDOOR UNITS": CHILLER, "JEDNOSTKI ZEWNĘTRZNE": CHILLER,
  "UNIDADES EXTERIORES": CHILLER, "LAUKO ĮRENGINIAI": CHILLER, "СЫРТҚЫ БӨЛІМДЕР": CHILLER,
  "ВОДИҲОИ БЕРУНӢ": CHILLER, "室外机": CHILLER,
  "ELEKTRİKLİ ISITICI": HEATER, "ELEKTRİKLİ ISITICILAR": HEATER, "ELECTRIC HEATERS": HEATER,
  "GRZEJNIKI ELEKTRYCZNE": HEATER, "CALENTADORES ELÉCTRICOS": HEATER,
  "SULU BATARYA": "/images/products/nautilus-lfp.png",
  "SULU ISITICI": HEATER, "WATER COIL": HEATER, "WĘŻOWNICA WODNA": HEATER, "BOBINA DE AGUA": HEATER,
  HAWK: "/images/products/otomasyon-pano.png", PANO: "/images/products/otomasyon-pano.png",
  PANEL: "/images/products/otomasyon-pano.png", PLC: "/images/products/otomasyon-plc.png",
  "SENSÖR": "/images/products/otomasyon-sensor.png", SENSOR: "/images/products/otomasyon-sensor.png",
  "KONTROL KARTLARI - ANAHTARLAR": "/images/products/otomasyon-kontrol-kartlari.png",
  LION: "/images/products/frekans-inventoru.png", "GÜÇ ELEKTRONİĞİ": "/images/products/frekans-inventoru.png",
  "CONTROL BOARDS - SWITCHES": "/images/products/otomasyon-kontrol-kartlari.png",
};

function resolve(name) {
  const key = (name || "").trim().toUpperCase();
  if (META[key]) return META[key];
  if (key.startsWith("CHILLER")) return CHILLER;
  if (key.includes("ELEKTRİKLİ ISITICI") || key.includes("ELECTRIC HEATER") ||
      key.includes("SULU ISITICI") || key.includes("WATER COIL")) return HEATER;
  return "/images/products/marlin.png";
}

let changed = 0;
for (const loc of LOCALES) {
  const file = path.join(dictDir, loc, "products.json");
  if (!fs.existsSync(file)) continue;
  const json = JSON.parse(fs.readFileSync(file, "utf-8"));
  let n = 0;
  for (const sec of SECTIONS) {
    const block = json[sec];
    if (!block || !Array.isArray(block.products)) continue;
    for (const p of block.products) {
      if (p && typeof p === "object" && (!p.image || !String(p.image).trim())) {
        p.image = resolve(p.name);
        n++;
      }
    }
  }
  fs.writeFileSync(file, JSON.stringify(json, null, 2) + "\n", "utf-8");
  changed += n;
  console.log(`${loc}: ${n} ürün görseli dolduruldu`);
}
console.log(`Toplam: ${changed} ürün görseli işlendi.`);
