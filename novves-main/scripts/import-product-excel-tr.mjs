import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptsDir, "..");
const exportPath = path.join(scriptsDir, "product-excel-export.json");
const productsPath = path.join(repoRoot, "src/app/[locale]/dictionaries/tr/products.json");

const DIS_UNITELER = "DI\u015e \u00dcN\u0130TELER";
const ELEKTRIKLI_ISITICI = "ELEKTR\u0130KL\u0130 ISITICI";
const ZAMANLAMA_CATALOG_NAME = "ZAMANLAMA ve KONTROL C\u0130HAZLARI";

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
  TIGER: "/images/products/tiger-pre.png",
  DOLPHIN: "/images/products/dolphin-pre.png",
  CARACAL: "/images/products/caracal.png",
  HOUND: "/images/products/hound-al.png",
  ORCA: "/images/products/chiller.png",
  "POLAR BEAR": "/images/products/chiller.png",
  ALPACA: "/images/products/alpaca-am.png",
  SCALLOP: "/images/products/cyclone.png",
  REMORA: "/images/products/remora.png",
  ROO: "/images/products/yayli-titresim-izolatoru.png",
  HAWK: "/images/products/otomasyon-pano.png",
  PLC: "/images/products/otomasyon-plc.png",
  LION: "/images/products/frekans-inventoru.png",
  "ORCA COIL": "/images/products/elektrikli-isitici.png",
  "ORCA HEATER": "/images/products/elektrikli-isitici.png",
  "ORCA HX": "/images/products/caracal.png",
};

const MODEL_FAMILY_TO_LEAF = {
  DRAGONFLY: "dumanIsiTahliyeFanlari",
  MARLIN: "kovanTipiAksiyalFanlar",
  BEAR: "exproofFanlar",
  NAUTILUS: "endustriyelFanlar",
  HUMMINGBIRD: "ecFanlar",
  HERON: "catiFanlari",
  OWL: "duvarTipiFanlar",
  SEAHORSE: "banyoFanlari",
  KOI: "kanalFanlari",
  TURTLE: "hucreliFanlar",
  BUTTERFLY: "mutfakFanlari",
  FOX: "siginakFanlari",
  CHICKEN: "tavukcuFanlari",
  ELEPHANT: "tozToplamaUniteleri",
  TIGER: "klimaSantralleri",
  DOLPHIN: "havuzNemAlmaSantrali",
  CARACAL: "isiGeriKazanimCihazlari",
  HOUND: "damperler",
  ALPACA: "menfezPanjurlar",
  SCALLOP: "filtreler",
  ROO: "titresimIzolatorleri",
  HAWK: "otomasyonPanolari",
  PLC: "plcOtomasyon",
  "KONTROL KARTLARI-PANEL": "kontrolKartlari",
  REMORA: "remoraAksesuarlari",
  "POLAR BEAR": "disUniteler",
  "ORCA HEATER": "elektrikliIsitici",
  "ORCA COIL": "suluIsitici",
  "ORCA HX": "orcaHx",
};

const INTRO_ONLY_LEAVES = new Set(["klimaSantralleri", "havuzNemAlmaSantrali"]);

const EXISTING_MODEL_IMAGES = {
  "dumanIsiTahliyeFanlari|Dragonfly T": "/images/products/dragonfly-t.jpg",
  "dumanIsiTahliyeFanlari|Dragonfly R": "/images/products/dragonfly-r.jpg",
  "dumanIsiTahliyeFanlari|Dragonfly C": "/images/products/dragonfly-c.png?v=3",
  "dumanIsiTahliyeFanlari|Dragonfly JR": "/images/products/dragonfly-jr.jpg",
  "damperler|Hound SD M24": "/images/products/hound-sd-m24.jpg",
  "damperler|Hound AL": "/images/products/hound-al.png",
  "damperler|Hound CRD": "/images/products/hound-crd.jpg",
};

const REMORA_MODEL_IMAGES = {
  "REMORA SF": "/images/products/remora-sf.png",
  "REMORA VSF": "/images/products/remora-sf.png",
  "REMORA FJ": "/images/products/remora-fj.png",
  "REMORA CF": "/images/products/remora-cf.png",
  "REMORA FJCF": "/images/products/remora-fj.png",
  "REMORA FJ2CF": "/images/products/remora-fj2f.png",
  "REMORA FJCF-F400": "/images/products/remora-fj.png",
  "REMORA FJ2CF-F400": "/images/products/remora-fj2f.png",
  "REMORA R-FJCF": "/images/products/remora-fj.png",
  "REMORA R-FJ2CF": "/images/products/remora-fj2f.png",
  "REMORA PM": "/images/products/remora-pm.png",
  "REMORA IC": "/images/products/remora-ic.png",
  "REMORA IH": "/images/products/remora-ic.png",
  "REMORA S": "/images/products/remora-s.png",
  "REMORA SP": "/images/products/remora-s.png",
  "REMORA RS": "/images/products/remora-rs.png",
  "REMORA RED": "/images/products/remora-red.png",
  "REMORA SS": "/images/products/remora-ss.png",
};

const FANI = "\u0131";

const CATEGORY_ENTITY_UPDATES = {
  iklimlendirme: { tiger: "TIGER", dolphin: "DOLPHIN", caracal: "CARACAL" },
  havaYonetimi: { hound: "HOUND" },
  havaDagitimi: { alpaca: "ALPACA" },
  havaFiltrasyonu: { scallop: "SCALLOP" },
  titresimVeSesIzolasyon: { roo: "ROO" },
};

const COOLING_CATALOG_FAMILIES = [
  "POLAR BEAR",
  "ORCA HEATER",
  "ORCA COIL",
  "ORCA HX",
];

const COOLING_CARD_LEGACY_NAMES = {
  "POLAR BEAR": ["DI\u015e \u00dcN\u0130TELER", DIS_UNITELER, "CHILLER", "ORCA"],
  "ORCA HEATER": [ELEKTRIKLI_ISITICI, "ELEKTR\u0130KL\u0130 ISITICI"],
  "ORCA COIL": ["SULU ISITICI"],
  "ORCA HX": [],
};

const COOLING_LEAF_CARD_NAMES = {
  disUniteler: "POLAR BEAR",
  elektrikliIsitici: "ORCA HEATER",
  suluIsitici: "ORCA COIL",
  orcaHx: "ORCA HX",
};

function findModelFamilyKey(modelsByFamily, predicate) {
  return Object.keys(modelsByFamily).find(predicate);
}

function titleCaseFamily(code) {
  if (!code) return "";
  return code
    .split(/\s+/)
    .map((p) => p.charAt(0) + p.slice(1).toLowerCase())
    .join(" ");
}

function modelDisplayName(familyEn, productCode, subCode, familyCode) {
  const base = titleCaseFamily(familyEn);
  const codeKey = (familyCode || familyEn || "").toUpperCase().replace(/\s+/g, " ");
  if (subCode && codeKey) {
    const subUpper = subCode.toUpperCase().replace(/\s+/g, " ");
    if (subUpper.startsWith(`${codeKey} `)) {
      const suffix = subCode.slice(codeKey.length).trim();
      if (suffix && suffix.toUpperCase() !== "NA") return `${base} ${suffix}`;
    }
  }
  if (productCode && productCode !== "NA") return `${base} ${productCode}`;
  if (subCode) {
    const suffix = subCode
      .replace(new RegExp(`^${base.toUpperCase()}\\s+`, "i"), "")
      .trim();
    if (suffix && suffix.toUpperCase() !== "NA") return `${base} ${suffix}`;
  }
  return base;
}

function buildProductLines(modelFamilyKey, leafKey, familyByCode, modelRows, imageMap) {
  return modelRows.map((row) => {
    const rowFamilyKey = row.familyCode || modelFamilyKey;
    const familyEn = familyEnForModelFamily(rowFamilyKey, familyByCode, [row]);
    const name = modelDisplayName(familyEn, row.productCode, row.subCode, rowFamilyKey);
    return {
      name,
      type: row.nameTr,
      image: guessImage(leafKey, name, rowFamilyKey, imageMap, row.subCode),
      description: row.nameTr,
    };
  });
}

function guessImage(leafKey, modelName, familyCode, imageMap, subCode) {
  const key = `${leafKey}|${modelName}`;
  if (EXISTING_MODEL_IMAGES[key]) return EXISTING_MODEL_IMAGES[key];
  if (leafKey === "remoraAksesuarlari" && subCode && REMORA_MODEL_IMAGES[subCode]) {
    return REMORA_MODEL_IMAGES[subCode];
  }
  return imageMap[familyCode] ?? "/images/products/marlin.png";
}

function buildIntro(family) {
  if (!family) return "";
  return [family.inspiration, family.description].filter(Boolean).join("\n\n");
}

function buildSubtitle(groupTr) {
  if (!groupTr) return "";
  if (groupTr.endsWith(`Fan${FANI}`)) return groupTr.replace(new RegExp(`Fan${FANI}$`), "Fanlar\u0131");
  if (groupTr.endsWith("Fan")) return `${groupTr}lar`;
  if (groupTr.endsWith("\u00dcnitesi")) return groupTr.replace(/\u00dcnitesi$/, "\u00dcniteleri");
  if (groupTr.endsWith("Santralleri")) return groupTr;
  if (groupTr.endsWith("Santrali")) return groupTr.replace(/Santrali$/, "Santralleri");
  if (groupTr.endsWith("Panolar\u0131")) return groupTr;
  if (groupTr.endsWith("Panosu")) return groupTr.replace(/Panosu$/, "Panolar\u0131");
  return groupTr;
}

function thematicForModelFamily(modelFamilyKey, familyByCode) {
  if (familyByCode[modelFamilyKey]) return familyByCode[modelFamilyKey];
  if (modelFamilyKey.includes("ELEKTRON")) return familyByCode.LION;
  return null;
}

function familyEnForModelFamily(modelFamilyKey, familyByCode, modelRows = []) {
  const thematic = thematicForModelFamily(modelFamilyKey, familyByCode);
  if (thematic) return thematic.en;
  if (modelFamilyKey.includes("ZAMANLAMA")) return "Timer";
  const desc = modelRows[0]?.familyDesc;
  if (desc && modelFamilyKey !== "KONTROL KARTLARI-PANEL") return desc;
  if (modelFamilyKey === "PLC") return "PLC";
  if (modelFamilyKey.startsWith("SENS")) return "Sensor";
  if (modelFamilyKey === "KONTROL KARTLARI-PANEL") return "NEXUS";
  if (modelFamilyKey.includes("ZAMANLAMA")) return "Timer";
  if (modelFamilyKey.includes("ELEKTRON")) return "Lion";
  return titleCaseFamily(modelFamilyKey);
}

function subtitleForLeaf(modelFamilyKey, familyByCode, modelRows) {
  const thematic = thematicForModelFamily(modelFamilyKey, familyByCode);
  if (thematic?.productGroupTr) return buildSubtitle(thematic.productGroupTr);
  if (modelFamilyKey === "KONTROL KARTLARI-PANEL") {
    const parts = [...new Set(modelRows.map((m) => m.familyDesc).filter(Boolean))];
    return parts[0] ?? "NEXUS";
  }
  return modelRows[0]?.familyDesc ?? modelFamilyKey;
}

function titleForLeaf(modelFamilyKey, familyByCode) {
  const thematic = thematicForModelFamily(modelFamilyKey, familyByCode);
  if (thematic?.code) return thematic.code;
  if (modelFamilyKey === "PLC") return "PLC";
  if (modelFamilyKey.startsWith("SENS")) return "SENS\u00d6R";
  if (modelFamilyKey === "KONTROL KARTLARI-PANEL") return "NEXUS";
  if (modelFamilyKey.includes("ZAMANLAMA")) return ZAMANLAMA_CATALOG_NAME;
  if (modelFamilyKey.includes("ELEKTRON")) return "LION";
  return modelFamilyKey;
}

function introForLeaf(modelFamilyKey, familyByCode, modelRows) {
  const thematic = thematicForModelFamily(modelFamilyKey, familyByCode);
  const intro = buildIntro(thematic);
  if (intro) return intro;
  if (modelRows.length) return modelRows.map((m) => m.nameTr).join("; ");
  return "";
}

function modelRowsForLeaf(modelFamilyKey, leafKey) {
  return data.modelsByFamily[modelFamilyKey] ?? [];
}

function coolingCardType(code, thematic, modelRows) {
  if (thematic?.productGroupTr) return thematic.productGroupTr;
  const descs = [...new Set(modelRows.map((m) => m.familyDesc).filter(Boolean))];
  if (descs.length === 1) return descs[0];
  if (descs.length > 1) return descs.join(" \u2022 ");
  return code;
}

function coolingCardDescription(thematic, modelRows) {
  if (thematic?.description) return thematic.description;
  if (modelRows.length) return modelRows.map((m) => m.nameTr).join("; ");
  return "";
}

function findCoolingLegacyCard(existingByName, code) {
  const names = [code, ...(COOLING_CARD_LEGACY_NAMES[code] ?? [])];
  for (const name of names) {
    const card = existingByName[name];
    if (card) return card;
  }
  return null;
}

const data = JSON.parse(fs.readFileSync(exportPath, "utf8"));
const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));
const familyByCode = Object.fromEntries(data.families.map((f) => [f.code, f]));
const chromeFallback = products.siginakFanlari;

const sensorKey = findModelFamilyKey(data.modelsByFamily, (k) => k.startsWith("SENS"));
const gucKey = findModelFamilyKey(data.modelsByFamily, (k) => k.includes("ELEKTRON"));
const zamanlamaKey = findModelFamilyKey(data.modelsByFamily, (k) => k.includes("ZAMANLAMA"));

const imageMap = {
  ...FAMILY_IMAGES,
  "KONTROL KARTLARI-PANEL": "/images/products/otomasyon-kontrol-kartlari.png",
  ...(sensorKey ? { [sensorKey]: "/images/products/otomasyon-sensor.png" } : {}),
  ...(gucKey ? { [gucKey]: "/images/products/frekans-inventoru.png" } : {}),
  ...(zamanlamaKey ? { [zamanlamaKey]: "/images/products/otomasyon-kontrol-kartlari.png" } : {}),
};

const leafMap = { ...MODEL_FAMILY_TO_LEAF };
if (sensorKey) leafMap[sensorKey] = "sensorler";
if (gucKey) leafMap[gucKey] = "gucElektronigi";
if (zamanlamaKey) leafMap[zamanlamaKey] = "zamanlamaKontrol";

const otomasyonCatalogSpecs = [
  { name: "HAWK", modelFamily: "HAWK", thematic: "HAWK" },
  { name: "PLC", modelFamily: "PLC", thematic: null },
  ...(sensorKey ? [{ name: "SENS\u00d6R", modelFamily: sensorKey, thematic: null }] : []),
  { name: "NEXUS", modelFamily: "KONTROL KARTLARI-PANEL", thematic: null },
  ...(zamanlamaKey
    ? [{ name: ZAMANLAMA_CATALOG_NAME, modelFamily: zamanlamaKey, thematic: null }]
    : []),
  ...(gucKey ? [{ name: "LION", modelFamily: gucKey, thematic: "LION" }] : []),
];

const stats = {
  havaHareketiCards: 0,
  leafSections: 0,
  introOnly: 0,
  categoryEntities: 0,
  otomasyonCards: 0,
  coolingCards: 0,
  coolingLeaves: 0,
  remora: 0,
};

for (const card of products.havaHareketi.products) {
  const family = familyByCode[card.name.toUpperCase()];
  if (!family) continue;
  card.type = family.productGroupTr;
  card.description = family.description;
  stats.havaHareketiCards += 1;
}

for (const [modelFamilyKey, leafKey] of Object.entries(leafMap)) {
  const modelRows = modelRowsForLeaf(modelFamilyKey, leafKey);
  if (!modelRows.length) continue;

  const thematic = thematicForModelFamily(modelFamilyKey, familyByCode);
  const existing = products[leafKey];

  if (INTRO_ONLY_LEAVES.has(leafKey)) {
    if (existing) {
      existing.intro = introForLeaf(modelFamilyKey, familyByCode, modelRows) || existing.intro;
      if (thematic) {
        existing.title = thematic.code;
        existing.subtitle = buildSubtitle(thematic.productGroupTr);
      }
      existing.productLines = buildProductLines(
        modelFamilyKey,
        leafKey,
        familyByCode,
        modelRows,
        imageMap,
      );
      if (!existing.chrome) existing.chrome = chromeFallback.chrome;
      stats.introOnly += 1;
    }
    continue;
  }

  products[leafKey] = {
    title: titleForLeaf(modelFamilyKey, familyByCode),
    subtitle: subtitleForLeaf(modelFamilyKey, familyByCode, modelRows),
    intro: introForLeaf(modelFamilyKey, familyByCode, modelRows) || existing?.intro || "",
    models: buildProductLines(modelFamilyKey, leafKey, familyByCode, modelRows, imageMap),
    chrome: existing?.chrome ?? chromeFallback.chrome,
  };
  stats.leafSections += 1;
}

delete products.chillerler;

for (const [categoryKey, entities] of Object.entries(CATEGORY_ENTITY_UPDATES)) {
  const block = products[categoryKey];
  if (!block) continue;
  for (const [entityKey, familyCode] of Object.entries(entities)) {
    const entity = block[entityKey];
    const family = familyByCode[familyCode];
    if (!entity || !family) continue;
    entity.desc = family.description;
    if (family.productGroupTr) entity.label = family.productGroupTr;
    stats.categoryEntities += 1;
  }
}

if (products.sogutmaVeIsitma) {
  const existingByName = Object.fromEntries(
    (products.sogutmaVeIsitma.products ?? []).map((p) => [p.name, p]),
  );
  products.sogutmaVeIsitma.products = COOLING_CATALOG_FAMILIES.map((code) => {
    const thematic = familyByCode[code];
    const modelRows = data.modelsByFamily[code] ?? [];
    const prev = findCoolingLegacyCard(existingByName, code);
    return {
      name: code,
      type: coolingCardType(code, thematic, modelRows),
      image: FAMILY_IMAGES[code] ?? "/images/products/chiller.png",
      specFlow: prev?.specFlow ?? "",
      specPressure: prev?.specPressure ?? "",
      description: coolingCardDescription(thematic, modelRows),
    };
  });
  products.sogutmaVeIsitma.heroDesc =
    "Polar Bear, Orca Coil, Orca Heater ve Orca HX so\u011futma ve \u0131s\u0131tma \u00e7\u00f6z\u00fcmleri.";
  stats.coolingCards = COOLING_CATALOG_FAMILIES.length;
}

if (products.otomasyonMalzemeleri) {
  const legacyByName = Object.fromEntries(
    (products.otomasyonMalzemeleri.products ?? []).map((p) => [p.name, p]),
  );
  const legacyKontrol =
    legacyByName["KONTROL KARTLARI - ANAHTARLAR"] ?? legacyByName.NEXUS;

  products.otomasyonMalzemeleri.products = otomasyonCatalogSpecs.map((spec) => {
    const prev =
      legacyByName[spec.name] ??
      (spec.name === "NEXUS" ? legacyKontrol : undefined) ??
      {};
    const family = spec.thematic ? familyByCode[spec.thematic] : null;
    const modelRows = data.modelsByFamily[spec.modelFamily] ?? [];
    const image = (imageMap[spec.modelFamily] ?? prev.image ?? "/images/products/otomasyon-pano.png")
      .split(/[?#]/)[0];

    return {
      name: spec.name,
      image,
      specFlow: prev.specFlow ?? "",
      specPressure: prev.specPressure ?? "",
      description:
        family?.description ??
        (modelRows.length ? modelRows.map((m) => m.nameTr).join("; ") : prev.description ?? ""),
    };
  });

  products.otomasyonMalzemeleri.heroDesc =
    "HAWK otomasyon panolar\u0131, PLC, SENSE sens\u00f6rler, NEXUS kontrol kartlar\u0131, zamanlama cihazlar\u0131 ve LION g\u00fc\u00e7 elektroni\u011fi.";
  stats.otomasyonCards = otomasyonCatalogSpecs.length;
}

const remoraAccessory = products.aksesuarlar?.accessories?.find((a) => a.name === "REMORA");
if (familyByCode.REMORA && products.aksesuarlar) {
  products.aksesuarlar.accessories = [
    {
      name: "REMORA",
      image: FAMILY_IMAGES.REMORA,
      description: familyByCode.REMORA.description,
      specFlow: remoraAccessory?.specFlow ?? "",
      specPressure: remoraAccessory?.specPressure ?? "",
    },
  ];
  products.aksesuarlar.heroDesc =
    "REMORA fan aksesuar ailesi; montaj, ba\u011flant\u0131, susturucu ve koruma \u00e7\u00f6z\u00fcmleri.";
  stats.remora = 1;
}

for (const [leafKey, cardName] of Object.entries(COOLING_LEAF_CARD_NAMES)) {
  const block = products[leafKey];
  const card = products.sogutmaVeIsitma?.products?.find((p) => p.name === cardName);
  if (block && card?.description && !block.intro?.trim()) {
    block.intro = card.description;
  }
}

fs.writeFileSync(productsPath, `${JSON.stringify(products, null, 2)}\n`, "utf8");
console.log(JSON.stringify(stats, null, 2));
