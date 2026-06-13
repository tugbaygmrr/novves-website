#!/usr/bin/env node
/** Sync referanslar categoryTree in corporate.json (TR + EN). */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const TR_TREE = [
  {
    id: "infrastructure-transport",
    label: "Altyap\u0131 Ula\u015f\u0131m",
    subcategories: [
      { id: "passenger-terminals-airport", label: "Yolcu Terminalleri - Havaliman\u0131" },
      { id: "parking", label: "Otopark" },
      { id: "public-building-market", label: "Kamu binas\u0131 - Pazaryeri" },
    ],
  },
  {
    id: "industrial",
    label: "End\u00fcstriyel Tesisler & Fabrikalar",
    subcategories: [
      { id: "manufacturing", label: "\u00dcretim Tesisleri" },
      { id: "logistics-warehouses", label: "Lojistik & Depolama Alanlar\u0131" },
      { id: "heavy-industry", label: "A\u011f\u0131r Sanayi Tesisleri" },
    ],
  },
  {
    id: "healthcare",
    label: "Sa\u011fl\u0131k Yap\u0131lar\u0131",
    subcategories: [
      { id: "city-hospitals", label: "\u015eehir Hastaneleri" },
      { id: "state-private-hospitals", label: "Devlet & \u00d6zel Hastaneler" },
      { id: "healthcare-campuses", label: "Sa\u011fl\u0131k Kamp\u00fcsleri" },
    ],
  },
  {
    id: "tourism-hospitality",
    label: "Turizm Konaklama",
    subcategories: [
      { id: "hotels", label: "Oteller" },
      { id: "shopping-malls", label: "Al\u0131\u015fveri\u015f Merkezleri" },
      { id: "office-buildings", label: "Ofis Binalar\u0131" },
    ],
  },
  {
    id: "residential-urban",
    label: "Konut & Kentsel D\u00f6n\u00fc\u015f\u00fcm Projeleri",
    subcategories: [
      { id: "mass-housing", label: "Toplu Konut Projeleri" },
      { id: "urban-renewal", label: "Kentsel D\u00f6n\u00fc\u015f\u00fcm Alanlar\u0131" },
      { id: "residential-complexes", label: "Konut Siteleri" },
    ],
  },
  {
    id: "public-government",
    label: "Kamu Binalar\u0131 & Resmi Projeler",
    subcategories: [{ id: "educational", label: "E\u011fitim Yap\u0131lar\u0131" }],
  },
  {
    id: "energy-infrastructure",
    label: "Enerji & Altyap\u0131 Projeleri",
    subcategories: [
      { id: "power-plants", label: "Enerji Santralleri" },
      { id: "infrastructure-facilities", label: "Altyap\u0131 Tesisleri" },
      { id: "utility-service", label: "Teknik & Servis Yap\u0131lar\u0131" },
    ],
  },
];

const EN_TREE = [
  {
    id: "infrastructure-transport",
    label: "Infrastructure and Transportation",
    subcategories: [
      { id: "passenger-terminals-airport", label: "Passenger Terminals \u2014 Airport" },
      { id: "parking", label: "Parking & Apron Facilities" },
      { id: "public-building-market", label: "Public Building \u2014 Multi-Purpose Market" },
    ],
  },
  {
    id: "industrial",
    label: "Industrial Plants & Factories",
    subcategories: [
      { id: "manufacturing", label: "Manufacturing Plants" },
      { id: "logistics-warehouses", label: "Logistics & Warehouses" },
      { id: "heavy-industry", label: "Heavy Industry Facilities" },
    ],
  },
  {
    id: "healthcare",
    label: "Healthcare Facilities",
    subcategories: [
      { id: "city-hospitals", label: "City Hospitals" },
      { id: "state-private-hospitals", label: "State & Private Hospitals" },
      { id: "healthcare-campuses", label: "Healthcare Campuses" },
    ],
  },
  {
    id: "tourism-hospitality",
    label: "Tourism and Hospitality",
    subcategories: [
      { id: "hotels", label: "Hotels" },
      { id: "shopping-malls", label: "Shopping Malls" },
      { id: "office-buildings", label: "Office Buildings" },
    ],
  },
  {
    id: "residential-urban",
    label: "Residential & Urban Regeneration Projects",
    subcategories: [
      { id: "mass-housing", label: "Mass Housing Projects" },
      { id: "urban-renewal", label: "Urban Renewal Areas" },
      { id: "residential-complexes", label: "Residential Complexes" },
    ],
  },
  {
    id: "public-government",
    label: "Public Buildings & Government Projects",
    subcategories: [{ id: "educational", label: "Educational Buildings" }],
  },
  {
    id: "energy-infrastructure",
    label: "Energy & Infrastructure Projects",
    subcategories: [
      { id: "power-plants", label: "Power Plants" },
      { id: "infrastructure-facilities", label: "Infrastructure Facilities" },
      { id: "utility-service", label: "Utility & Service Buildings" },
    ],
  },
];

function patchLocale(locale, tree, allLabel) {
  const file = path.join(ROOT, "src/app/[locale]/dictionaries", locale, "corporate.json");
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  data.referanslar.all = allLabel;
  data.referanslar.categoryTree = tree;
  delete data.referanslar.categories;
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  console.log("patched", locale);
}

patchLocale("tr", TR_TREE, "T\u00fcm Projeler");
patchLocale("en", EN_TREE, "All Projects");
