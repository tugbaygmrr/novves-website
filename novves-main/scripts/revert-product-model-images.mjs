/**
 * G�rsel atama �ncesi duruma d�ner (Excel import sonras? aile varsay?lanlar?).
 * node scripts/revert-product-model-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dictDir = path.join(repoRoot, "src/app/[locale]/dictionaries");
const productsDir = path.join(repoRoot, "public/images/products");

const FAMILY_IMAGES = {
  DRAGONFLY: "/images/products/dragonfly-c.png",
  MARLIN: "/images/products/marlin.png",
  BEAR: "/images/products/bear-reb.png",
  NAUTILUS: "/images/products/nautilus-cif-cidarli.png",
  HUMMINGBIRD: "/images/products/hummingbird-drb-ec.jpg",
  HERON: "/images/products/heron-rv.png",
  OWL: "/images/products/owl-rer.png",
  SEAHORSE: "/images/products/banyo-fan-1.png",
  KOI: "/images/products/koi-cb.png",
  TURTLE: "/images/products/turtle-a.png",
  BUTTERFLY: "/images/products/butterfly-b.jpg",
  FOX: "/images/products/fox-c.png",
  CHICKEN: "/images/products/chicken.png",
  ELEPHANT: "/images/products/elephant.png",
};

const LEAF_TO_FAMILY = {
  dumanIsiTahliyeFanlari: "DRAGONFLY",
  kovanTipiAksiyalFanlar: "MARLIN",
  exproofFanlar: "BEAR",
  endustriyelFanlar: "NAUTILUS",
  ecFanlar: "HUMMINGBIRD",
  catiFanlari: "HERON",
  duvarTipiFanlar: "OWL",
  banyoFanlari: "SEAHORSE",
  kanalFanlari: "KOI",
  hucreliFanlar: "TURTLE",
  mutfakFanlari: "BUTTERFLY",
  siginakFanlari: "FOX",
  tavukcuFanlari: "CHICKEN",
  tozToplamaUniteleri: "ELEPHANT",
};

const MODEL_IMAGE_OVERRIDES = {
  "dumanIsiTahliyeFanlari|Dragonfly T": "/images/products/dragonfly-t.jpg",
  "dumanIsiTahliyeFanlari|Dragonfly TS": "/images/products/dragonfly-t.jpg",
  "dumanIsiTahliyeFanlari|Dragonfly RV": "",
  "dumanIsiTahliyeFanlari|Dragonfly TJF": "/images/products/dragonfly-tjf.png",
  "dumanIsiTahliyeFanlari|Dragonfly JA": "/images/products/dragonfly-ja.png",
  "dumanIsiTahliyeFanlari|Dragonfly W": "/images/products/dragonfly-w.png",
  "dumanIsiTahliyeFanlari|Dragonfly WH": "",
  "dumanIsiTahliyeFanlari|Dragonfly RH": "",
  "dumanIsiTahliyeFanlari|Dragonfly LPF": "/images/products/dragonfly-lpf.png",
  "dumanIsiTahliyeFanlari|Dragonfly R": "/images/products/dragonfly-r.jpg",
  "dumanIsiTahliyeFanlari|Dragonfly C": "/images/products/dragonfly-c.png?v=3",
  "dumanIsiTahliyeFanlari|Dragonfly JR": "/images/products/dragonfly-jr.jpg",
  "damperler|Hound SD M24": "/images/products/hound-sd-m24.jpg",
  "damperler|Hound AL": "/images/products/hound-al.png",
  "damperler|Hound CRD": "/images/products/hound-crd.jpg",
  "damperler|Hound MSD": "/images/products/hound-msd.png",
  "damperler|Hound MSFD-B": "/images/products/hound-msfd-b.png?v=2",
  "damperler|Hound SFD-R": "/images/products/hound-sfd-r.png?v=2",
  "damperler|Hound RSFD-B": "",
  "damperler|Hound RSFD-DraIn-B": "/images/products/hound-rsfd-drain-b.png",
  "damperler|Hound BD": "",
  "damperler|Hound RD": "/images/products/hound-rd.png",
  "damperler|Hound MFD": "/images/products/hound-mfd.png",
  "damperler|Hound FFD": "/images/products/hound-mfd.png",
  "damperler|Hound GS": "/images/products/hound-gs.png?v=4",
  "damperler|Hound NRD-B": "/images/products/hound-nrd-b.png",
  "damperler|Hound NRD-R": "/images/products/hound-nrd-r.png",
  "kovanTipiAksiyalFanlar|Marlin 2S": "",
  "kovanTipiAksiyalFanlar|Marlin B": "/images/products/marlin-b.png",
  "exproofFanlar|Bear REB EX": "/images/products/bear-reb-ex.png",
  "exproofFanlar|Bear RVS EX": "/images/products/bear-rvs-ex.png?v=2",
  "exproofFanlar|Bear RHS EX": "/images/products/bear-rhs-ex.png?v=2",
  "exproofFanlar|Bear T": "/images/products/bear-t.png?v=2",
  "exproofFanlar|Bear C": "/images/products/bear-c.png?v=2",
  "exproofFanlar|Bear R": "/images/products/bear-r.png?v=2",
  "exproofFanlar|Bear W": "/images/products/bear-w.png?v=3",
  "exproofFanlar|Bear LPF EX": "/images/products/bear-lpf-ex.png?v=3",
  "exproofFanlar|Bear TB": "/images/products/marlin-b.png",
  "exproofFanlar|Bear BPA EX": "/images/products/bear-bpa-ex.png?v=2",
  "endustriyelFanlar|Nautilus LPF": "/images/products/nautilus-lpf.png",
  "endustriyelFanlar|Nautilus MPF": "",
  "endustriyelFanlar|Nautilus HPF": "",
  "ecFanlar|Hummingbird RRV EC": "/images/products/hummingbird-rrv-ec.png",
  "ecFanlar|Hummingbird RRH EC": "/images/products/hummingbird-rrh-ec.png",
  "ecFanlar|Hummingbird CBP EC": "/images/products/hummingbird-cbp-ec.png",
  "ecFanlar|Hummingbird NS EC": "/images/products/hummingbird-ns-ec.png",
  "ecFanlar|Hummingbird CARACAL DS EC": "/images/products/caracal.png",
  "ecFanlar|Hummingbird FOX D EC": "/images/products/fox-d.png?v=3",
  "catiFanlari|Heron RH": "/images/products/heron-rh.png",
  "catiFanlari|Heron RHS": "/images/products/heron-rhs.png",
  "catiFanlari|Heron RV": "/images/products/heron-rv.png",
  "catiFanlari|Heron RVS": "/images/products/heron-rvs.png",
  "catiFanlari|Heron AH": "/images/products/heron-ah.png",
  "catiFanlari|Heron AV": "",
  "catiFanlari|Heron H": "",
  "duvarTipiFanlar|Owl H": "",
  "duvarTipiFanlar|Owl R": "/images/products/owl-r.png",
  "banyoFanlari|Seahorse AP": "/images/products/seahorse-ap.png",
  "banyoFanlari|Seahorse APS": "/images/products/seahorse-aps.png",
  "banyoFanlari|Seahorse APC": "/images/products/seahorse-apc.png",
  "banyoFanlari|Seahorse RP": "/images/products/banyo-fan-1.png|/images/products/seahorse-rp-2.png",
  "kanalFanlari|Koi RB": "/images/products/koi-rb.png",
  "kanalFanlari|Koi REB": "/images/products/koi-reb.png",
  "kanalFanlari|Koi X": "/images/products/koi-x.png",
  "kanalFanlari|Koi CP": "/images/products/koi-cp.png",
  "hucreliFanlar|Turtle BPA": "/images/products/turtle-bpa.png",
  "hucreliFanlar|Turtle B": "/images/products/turtle-b.png?v=2",
  "hucreliFanlar|Turtle BP": "/images/products/turtle-bp.png",
  "hucreliFanlar|Turtle F": "/images/products/turtle-f.png",
  "hucreliFanlar|Turtle FP": "",
  "siginakFanlari|Fox C": "/images/products/fox-c.png",
  "siginakFanlari|Fox D": "/images/products/fox-d.png?v=3",
  "elektrikliIsitici|Elektrikli Is?t?c? EH-C": "",
  "suluIsitici|Termal Batarya HW": "",
  "suluIsitici|Termal Batarya CW": "",
  "suluIsitici|Termal Batarya DX D": "",
  "suluIsitici|Termal Batarya ST": "",
  "orcaHx|Is? E?anj�r� R": "",
  "orcaHx|Is? E?anj�r� C": "",
  "orcaHx|Is? E?anj�r� AR-R": "",
  "orcaHx|Is? E?anj�r� AR-H": "",
};

const GENERATED_FILES = [
  "bear-bpa-ex.png",
  "bear-tb.png",
  "butterfly-b.png",
  "butterfly-eco-hr.png",
  "butterfly-eco.png",
  "chicken-w.png",
  "dragonfly-rh.png",
  "dragonfly-rv.png",
  "dragonfly-ts.png",
  "dragonfly-w.png",
  "dragonfly-wh.png",
  "elephant-bf.png",
  "elephant-central.png",
  "elephant-cf.png",
  "elephant-cy.png",
  "elephant-ws.png",
  "heron-ah.png",
  "heron-av.png",
  "heron-h.png",
  "hummingbird-cbp-ec.png",
  "hummingbird-drb-ec.png",
  "hummingbird-ns-ec.png",
  "hummingbird-rrh-ec.png",
  "hummingbird-rrv-ec.png",
  "koi-cp.png",
  "marlin-2s.png",
  "marlin-empty.png",
  "marlin-s.png",
  "nautilus-hpf.png",
  "nautilus-mpf.png",
  "nautilus-silence.png",
  "nautilus.png",
  "seahorse-rp.png",
  "turtle-f.png",
  "turtle-fp.png",
];

function guessImage(leafKey, modelName) {
  const key = `${leafKey}|${modelName}`;
  if (MODEL_IMAGE_OVERRIDES[key]) return MODEL_IMAGE_OVERRIDES[key];
  const family = LEAF_TO_FAMILY[leafKey];
  return FAMILY_IMAGES[family] ?? "/images/products/marlin.png";
}

const products = JSON.parse(fs.readFileSync(path.join(dictDir, "tr/products.json"), "utf8"));
let reverted = 0;

for (const [leafKey, family] of Object.entries(LEAF_TO_FAMILY)) {
  const section = products[leafKey];
  if (!section?.models) continue;
  for (const model of section.models) {
    if (!model.name) continue;
    const next = guessImage(leafKey, model.name);
    if (model.image !== next) {
      model.image = next;
      reverted += 1;
    }
  }
}

if (products.damperler?.models) {
  for (const model of products.damperler.models) {
    if (!model.name) continue;
    const next = guessImage("damperler", model.name);
    if (model.image !== next) {
      model.image = next;
      reverted += 1;
    }
  }
}

fs.writeFileSync(
  path.join(dictDir, "tr/products.json"),
  `${JSON.stringify(products, null, 2)}\n`,
  "utf8",
);

const locales = fs
  .readdirSync(dictDir)
  .filter((d) => d !== "tr" && fs.existsSync(path.join(dictDir, d, "products.json")));

const leafKeys = [...Object.keys(LEAF_TO_FAMILY), "damperler"];
for (const locale of locales) {
  const filePath = path.join(dictDir, locale, "products.json");
  const locProducts = JSON.parse(fs.readFileSync(filePath, "utf8"));
  for (const key of leafKeys) {
    if (products[key]) locProducts[key] = JSON.parse(JSON.stringify(products[key]));
  }
  fs.writeFileSync(filePath, `${JSON.stringify(locProducts, null, 2)}\n`, "utf8");
}

let removed = 0;
for (const name of GENERATED_FILES) {
  const file = path.join(productsDir, name);
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    removed += 1;
  }
}

console.log(`Reverted ${reverted} model image paths. Removed ${removed} generated files.`);
