/**
 * Görsel atama öncesi duruma döner (Excel import sonras? aile varsay?lanlar?).
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
  "dumanIsiTahliyeFanlari|Dragonfly R": "/images/products/dragonfly-r.jpg",
  "dumanIsiTahliyeFanlari|Dragonfly C": "/images/products/dragonfly-c.png?v=3",
  "dumanIsiTahliyeFanlari|Dragonfly JR": "/images/products/dragonfly-jr.jpg",
  "damperler|Hound SD M24": "/images/products/hound-sd-m24.jpg",
  "damperler|Hound AL": "/images/products/hound-al.png",
  "damperler|Hound CRD": "/images/products/hound-crd.jpg",
};

const GENERATED_FILES = [
  "bear-bpa-ex.png",
  "bear-tb.png",
  "butterfly-b.png",
  "butterfly-eco-hr.png",
  "butterfly-eco.png",
  "chicken-w.png",
  "dragonfly-lpf.png",
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
