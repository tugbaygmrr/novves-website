/**
 * TR products.json'da yeni eklenen alanlari EN'e aktarir (ceviri metinleri asagida).
 * node scripts/sync-products-missing-from-tr.mjs
 */
import fs from "fs";
import path from "path";

const DICT = path.join(process.cwd(), "src/app/[locale]/dictionaries");
const tr = JSON.parse(fs.readFileSync(path.join(DICT, "tr", "products.json"), "utf8"));
const enPath = path.join(DICT, "en", "products.json");
const en = JSON.parse(fs.readFileSync(enPath, "utf8"));

const HAVA_DESC_EN = [
  "The Dragonfly series comprises high-temperature smoke and heat exhaust fans developed to safely evacuate smoke, heat, toxic and asphyxiating gases during a fire. With axial, radial, jet, roof, wall, covered and centrifugal options, it adapts to a wide range of project requirements.",
  "The Marlin family comprises axial fans developed for supply air, exhaust air, duct ventilation and pressurisation applications. With a compact casing, low sound level, high airflow and flexible mounting options, it delivers reliable, economical performance in comfort ventilation, industrial ventilation, shaft systems and building pressurisation.",
  "The Bear family comprises Ex-proof fans developed for safe ventilation, exhaust and process air extraction in industrial areas with explosive atmosphere risk. With Ex-proof motors, spark-risk-reducing construction details, robust casings and axial/radial options, it serves chemical plants, paint shops, treatment plants, solvent processes and industrial exhaust applications.",
  "The Nautilus family comprises industrial centrifugal fans for supply air, exhaust air, process air and general industrial ventilation. With backward-curved impellers, direct-coupled drives, compact scroll geometry and multiple pressure classes, it enables efficient, reliable transfer in low, medium, high-pressure and silent-duty applications.",
  "The Hummingbird family comprises EC-motor fans delivering high energy efficiency, precise speed control and low operating cost. For supply, exhaust, roof, duct, plug, silent centrifugal, heat recovery and shelter applications, it enables smart airflow management with 0–10 V control, speed switches, differential pressure sensors and BMS integration.",
  "The Heron family comprises roof fans developed to improve indoor air quality, exhaust contaminated air and, where required, provide supply air. With radial horizontal/vertical discharge, motors out of the airstream, axial and covered roof models, it serves commercial buildings, industrial facilities, technical rooms, shafts and rooftop installations.",
  "The Owl family comprises wall-mounted axial fans for exhausting contaminated, warm, humid or stale indoor air in large-volume spaces. With square or round frames, compact bodies, low sound and high airflow, it is a practical solution for warehouses, hangars, factories, workshops, technical rooms and large industrial halls.",
  "The Seahorse family comprises plastic exhaust fans for bathrooms, WCs, basements and similar small to medium spaces to remove odour, vapour, humidity and stale air. With axial and radial options, ABS housings, low sound, easy-clean front panels and optional time-delay control, it suits residential, hotel, office and commercial interiors.",
  "The Koi family comprises compact duct fans for low to medium supply, exhaust and duct ventilation needs. With round, rectangular, motors out of the airstream, mixed-flow and axial plastic options, it provides practical, quiet, economical transfer in homes, commercial buildings, technical rooms, basements, workshops and small to medium installations.",
  "The Turtle family comprises double-skinned, insulated plenum fans for supply and exhaust applications. With acoustic casings, access doors, belt-drive or plug motor options and multiple impeller types, it delivers quiet, durable performance in plant rooms, technical spaces, commercial buildings and industrial ventilation.",
  "The Butterfly family comprises kitchen exhaust fans and ecological units for safe, filtered, controlled discharge of hot, greasy, smoky and odorous air in commercial kitchens. With motors out of the airstream, double-skinned insulated casings, grease filters, access doors and VFD-ready design, it serves restaurants, hotels, malls, catering and production kitchens.",
  "The Fox family comprises shelter ventilation fans to deliver filtered outdoor air into shelters and protected spaces. With G4, activated carbon, HEPA/nuclear particulate and bypass damper options, it supports normal ventilation and CBRN threat scenarios with controlled air supply.",
  "The Chicken series comprises high-efficiency poultry fans designed to maintain sensitive air quality in enclosed poultry houses. Like birds sensitive to temperature, humidity and ammonia, these fans keep air fresh, support temperature control and help protect flock health and productivity.",
  "The Elephant series, inspired by the animal's strength and fine perception, collects dust and particulates in high-production areas with high exhaust capacity. With a robust body, stable suction and durable construction, it delivers controlled heavy-duty air management for healthier, more efficient workplaces.",
];

for (let i = 0; i < HAVA_DESC_EN.length; i++) {
  if (!en.havaHareketi.products[i]) {
    console.warn("skip hava index", i);
    continue;
  }
  en.havaHareketi.products[i].description = HAVA_DESC_EN[i];
}

const trHawk = tr.otomasyonMalzemeleri.products[0];
const trLion = tr.otomasyonMalzemeleri.products[4];

en.otomasyonMalzemeleri.products[0] = {
  ...en.otomasyonMalzemeleri.products[0],
  name: "HAWK",
  image: trHawk.image,
  description:
    "HAWK automation panels are designed to manage fan systems, HVAC units and infrastructure elements from a single centre with reliable, stable and intelligent control. Fast response, precise monitoring and advanced control architecture keep the system stable even in complex scenarios. With energy management, safety integration, precision control and remote monitoring, HAWK adds commanding oversight to the project.",
  subModels: trHawk.subModels ?? [],
};

en.otomasyonMalzemeleri.products[4] = {
  name: "LION",
  image: trLion.image,
  description:
    "Inspired by the lion's power, authority and controlled use of force, the Lion series comprises power electronics that regulate, manage and optimise electrical energy. Like a lion that applies strength at the right moment, Lion controls electrical power intelligently—especially in frequency converters and drives. Developed for fans, motors and HVAC systems, it provides precise speed control, soft start, energy efficiency and system protection, extending equipment life with reliable, authoritative performance.",
  subModels: ["Inverter", "BLDC Drive", "MOSFET Modules"],
};

fs.writeFileSync(enPath, JSON.stringify(en, null, 2) + "\n", "utf8");
console.log("Updated en/products.json");
