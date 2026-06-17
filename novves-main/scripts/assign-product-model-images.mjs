/**
 * Modellere diskteki mevcut g�rselleri e?ler; kalanlar i�in aile g�rselinden
 * model kodlu PNG �retir ve products.json (TR + t�m diller) g�nceller.
 *
 * node scripts/assign-product-model-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dictDir = path.join(repoRoot, "src/app/[locale]/dictionaries");
const productsDir = path.join(repoRoot, "public/images/products");

const LEAF_KEYS = [
  "banyoFanlari",
  "catiFanlari",
  "damperler",
  "dumanIsiTahliyeFanlari",
  "duvarTipiFanlar",
  "ecFanlar",
  "endustriyelFanlar",
  "exproofFanlar",
  "hucreliFanlar",
  "kanalFanlari",
  "kovanTipiAksiyalFanlar",
  "mutfakFanlari",
  "siginakFanlari",
  "tavukcuFanlari",
  "tozToplamaUniteleri",
];

/** Model ad? ? dosya ad? (uzant?s?z) */
const MODEL_FILE_SLUG = {
  "Seahorse AP": "banyo-fan-1",
  "Seahorse APS": "banyo-fan-2",
  "Seahorse APC": "banyo-fan-3",
  "Seahorse RP": "seahorse-rp",
  "Heron RH": "heron-rh",
  "Heron RHS": "heron-rhs",
  "Heron RV": "heron-rv",
  "Heron RVS": "heron-rvs",
  "Heron AH": "heron-ah",
  "Heron AV": "heron-av",
  "Heron H": "heron-h",
  "Dragonfly T": "dragonfly-t",
  "Dragonfly TS": "dragonfly-t",
  "Dragonfly C": "dragonfly-c",
  "Dragonfly R": "dragonfly-r",
  "Dragonfly RV": "",
  "Dragonfly TJF": "dragonfly-tjf",
  "Dragonfly JR": "dragonfly-jr",
  "Dragonfly JA": "dragonfly-ja",
  "Dragonfly W": "dragonfly-w",
  "Dragonfly WH": "",
  "Dragonfly RH": "",
  "Dragonfly LPF": "dragonfly-lpf",
  "Owl RER": "owl-rer",
  "Owl R": "owl-rwa",
  "Owl H": "owl-cer",
  "Hummingbird DRB EC": "hummingbird-drb-ec",
  "Hummingbird RRV EC": "hummingbird-rrv-ec",
  "Hummingbird RRH EC": "hummingbird-rrh-ec",
  "Hummingbird CBP EC": "hummingbird-cbp-ec",
  "Hummingbird NS EC": "hummingbird-ns-ec",
  "Hummingbird CARACAL DS EC": "caracal",
  "Hummingbird FOX D EC": "fox-d",
  "Nautilus LPF": "nautilus-lpf",
  "Nautilus MPF": "",
  "Nautilus HPF": "",
  "Nautilus SILENCE": "nautilus-silence",
  "Bear REB EX": "bear-reb-ex",
  "Bear RVS EX": "bear-rvs-ex",
  "Bear RHS EX": "bear-rhs-ex",
  "Bear T": "bear-t",
  "Bear C": "bear-c",
  "Bear R": "bear-r",
  "Bear W": "bear-w",
  "Bear LPF EX": "bear-lpf-ex",
  "Bear TB": "marlin-b",
  "Bear BPA EX": "bear-bpa-ex",
  "Turtle B": "turtle-b",
  "Turtle BPA": "turtle-bpa",
  "Turtle BP": "turtle-bp",
  "Turtle F": "turtle-f",
  "Turtle FP": "turtle-fp",
  "Turtle A": "turtle-a",
  "Koi CB": "koi-cb",
  "Koi RB": "koi-rb",
  "Koi REB": "koi-reb",
  "Koi X": "koi-x",
  "Koi CP": "koi-cp",
  "Marlin EMPTY": "marlin-empty",
  "Marlin S": "marlin-s",
  "Marlin B": "marlin-b",
  "Marlin 2S": "",
  "Fox D": "fox-d",
  "Fox C": "fox-c",
  "Butterfly B": "butterfly-b",
  "Butterfly ECO": "butterfly-eco",
  "Butterfly ECO HR": "butterfly-eco-hr",
};

function listProductFiles() {
  const names = new Set();
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.(png|jpe?g)$/i.test(entry.name)) names.add(entry.name);
    }
  }
  walk(productsDir);
  return names;
}

function slugFromModel(familyTitle, modelName) {
  if (MODEL_FILE_SLUG[modelName]) return MODEL_FILE_SLUG[modelName];
  const family = familyTitle.toLowerCase();
  const re = new RegExp(`^${familyTitle}\\s+`, "i");
  const code = modelName.replace(re, "").trim().toLowerCase().replace(/\s+/g, "-");
  return `${family}-${code}`;
}

function resolveDiskPath(slug, fileNames) {
  for (const ext of [".png", ".jpg", ".jpeg"]) {
    const name = `${slug}${ext}`;
    if (fileNames.has(name)) return `/images/products/${name}`;
  }
  return null;
}

/** �retimde kaynak g�rsel (slug yoksa) */
const GENERATION_BASE_SLUG = {
  "seahorse-rp": "banyo-fan-2",
  "heron-h": "heron-rv",
  "heron-av": "heron-ah",
  "dragonfly-ts": "dragonfly-t",
  "dragonfly-rv": "dragonfly-r",
  "dragonfly-rh": "dragonfly-r",
  "dragonfly-w": "dragonfly-c",
  "dragonfly-wh": "dragonfly-c",
  "dragonfly-lpf": "dragonfly-c",
  "hummingbird-rrv-ec": "hummingbird-rh",
  "hummingbird-rrh-ec": "hummingbird-rh",
  "hummingbird-cbp-ec": "hummingbird-drb-ec",
  "hummingbird-ns-ec": "hummingbird-drb-ec",
  "nautilus-mpf": "nautilus-cif-cidarli",
  "nautilus-hpf": "nautilus-cif-cidarli",
  "nautilus-silence": "nautilus-cif-cidarli",
  nautilus: "nautilus-cif-cidarli",
  "bear-tb": "bear-bp",
  "bear-bpa-ex": "bear-bp",
  "turtle-fp": "turtle-f",
  "koi-cp": "koi-cb",
  "marlin-empty": "marlin",
  "marlin-s": "marlin",
  "marlin-2s": "marlin",
  "butterfly-eco": "butterfly-b",
  "butterfly-eco-hr": "butterfly-b",
};

function stripQuery(src) {
  return src.split(/[?#]/)[0];
}

function localPath(publicPath) {
  return path.join(productsDir, path.basename(stripQuery(publicPath)));
}

async function copyAsPng(srcPublic, destSlug) {
  const src = localPath(srcPublic);
  if (!fs.existsSync(src)) return null;
  const dest = path.join(productsDir, `${destSlug}.png`);
  if (fs.existsSync(dest)) return `/images/products/${destSlug}.png`;
  await sharp(src).png({ compressionLevel: 9 }).toFile(dest);
  return `/images/products/${destSlug}.png`;
}

function syncLocales(trProducts) {
  const locales = fs
    .readdirSync(dictDir)
    .filter((d) => d !== "tr" && fs.existsSync(path.join(dictDir, d, "products.json")));

  for (const locale of locales) {
    const filePath = path.join(dictDir, locale, "products.json");
    const products = JSON.parse(fs.readFileSync(filePath, "utf8"));
    for (const key of LEAF_KEYS) {
      if (trProducts[key]) products[key] = JSON.parse(JSON.stringify(trProducts[key]));
    }
    fs.writeFileSync(filePath, `${JSON.stringify(products, null, 2)}\n`, "utf8");
  }
}

const fileNames = listProductFiles();
const products = JSON.parse(fs.readFileSync(path.join(dictDir, "tr/products.json"), "utf8"));

let wired = 0;
let generated = 0;
const usedSlugs = new Set();

for (const leafKey of LEAF_KEYS) {
  const section = products[leafKey];
  if (!section?.models?.length) continue;
  const familyTitle = section.title;

  // Ayn? g�rseli payla?an modelleri tespit et
  const byImage = new Map();
  for (const model of section.models) {
    if (!model.name || !model.image) continue;
    const img = stripQuery(model.image);
    if (!byImage.has(img)) byImage.set(img, []);
    byImage.get(img).push(model);
  }

  for (const model of section.models) {
    if (!model.name || !model.image) continue;

    const slug = slugFromModel(familyTitle, model.name);
    const siblings = byImage.get(stripQuery(model.image)) ?? [];
    const needsOwnFile = siblings.length > 1;

    let resolved = resolveDiskPath(slug, fileNames);
    const targetSlugPath = `/images/products/${slug}.png`;

    if (needsOwnFile || (!resolved && !fileNames.has(`${slug}.png`))) {
      let base = resolved ?? stripQuery(model.image);
      if (!resolved && GENERATION_BASE_SLUG[slug]) {
        const alt = resolveDiskPath(GENERATION_BASE_SLUG[slug], fileNames);
        if (alt) base = alt;
      }
      if (!fileNames.has(`${slug}.png`)) {
        const created = await copyAsPng(base, slug);
        if (created) {
          fileNames.add(`${slug}.png`);
          generated += 1;
          console.log("generated:", model.name, "->", created);
        }
      }
      if (fileNames.has(`${slug}.png`)) resolved = targetSlugPath;
    }

    if (resolved && stripQuery(model.image) !== stripQuery(resolved)) {
      model.image = resolved;
      wired += 1;
      console.log("wired:", model.name, "->", resolved);
    }

    usedSlugs.add(slug);
  }
}

fs.writeFileSync(
  path.join(dictDir, "tr/products.json"),
  `${JSON.stringify(products, null, 2)}\n`,
  "utf8",
);
syncLocales(products);

console.log(`\nDone: ${wired} paths updated, ${generated} images generated.`);
