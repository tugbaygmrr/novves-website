#!/usr/bin/env node
/** Add referanslar categoryTree translations to all locale corporate.json files. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const DICT_ROOT = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "src/app/[locale]/dictionaries",
);

/** @type {Record<string, { all: string; tree: object[] }>} */
const LOCALE_CATEGORY_LABELS = {
  de: {
    all: "Alle Projekte",
    tree: [
      {
        id: "infrastructure-transport",
        label: "Infrastruktur & Verkehr",
        subcategories: [
          { id: "passenger-terminals-airport", label: "Passagierterminals \u2014 Flughafen" },
          { id: "parking", label: "Parkh\u00e4user & Vorfeldanlagen" },
          { id: "public-building-market", label: "\u00d6ffentliches Geb\u00e4ude \u2014 Mehrzweckmarkt" },
        ],
      },
      {
        id: "industrial",
        label: "Industrieanlagen & Fabriken",
        subcategories: [
          { id: "manufacturing", label: "Produktionsst\u00e4tten" },
          { id: "logistics-warehouses", label: "Logistik & Lagerfl\u00e4chen" },
          { id: "heavy-industry", label: "Schwerindustrieanlagen" },
        ],
      },
      {
        id: "healthcare",
        label: "Gesundheitseinrichtungen",
        subcategories: [
          { id: "city-hospitals", label: "Stadtkrankenh\u00e4user" },
          { id: "state-private-hospitals", label: "Staatliche & private Krankenh\u00e4user" },
          { id: "healthcare-campuses", label: "Gesundheits-Campus" },
        ],
      },
      {
        id: "tourism-hospitality",
        label: "Tourismus & Gastgewerbe",
        subcategories: [
          { id: "hotels", label: "Hotels" },
          { id: "shopping-malls", label: "Einkaufszentren" },
          { id: "office-buildings", label: "B\u00fcrogeb\u00e4ude" },
        ],
      },
      {
        id: "residential-urban",
        label: "Wohn- & Stadtentwicklungsprojekte",
        subcategories: [
          { id: "mass-housing", label: "Gro\u00dfsiedlungsprojekte" },
          { id: "urban-renewal", label: "St\u00e4dtische Erneuerungsgebiete" },
          { id: "residential-complexes", label: "Wohnanlagen" },
        ],
      },
      {
        id: "public-government",
        label: "\u00d6ffentliche Geb\u00e4ude & Regierungsprojekte",
        subcategories: [{ id: "educational", label: "Bildungseinrichtungen" }],
      },
      {
        id: "energy-infrastructure",
        label: "Energie- & Infrastrukturprojekte",
        subcategories: [
          { id: "power-plants", label: "Kraftwerke" },
          { id: "infrastructure-facilities", label: "Infrastruktureinrichtungen" },
          { id: "utility-service", label: "Technische & Servicegeb\u00e4ude" },
        ],
      },
    ],
  },
  fr: {
    all: "Tous les projets",
    tree: [
      {
        id: "infrastructure-transport",
        label: "Infrastructure & Transport",
        subcategories: [
          { id: "passenger-terminals-airport", label: "Terminaux passagers \u2014 A\u00e9roport" },
          { id: "parking", label: "Parkings & aires de trafic" },
          { id: "public-building-market", label: "B\u00e2timent public \u2014 March\u00e9 polyvalent" },
        ],
      },
      {
        id: "industrial",
        label: "Installations industrielles & usines",
        subcategories: [
          { id: "manufacturing", label: "Sites de production" },
          { id: "logistics-warehouses", label: "Logistique & entrep\u00f4ts" },
          { id: "heavy-industry", label: "Installations de lourde industrie" },
        ],
      },
      {
        id: "healthcare",
        label: "\u00c9tablissements de sant\u00e9",
        subcategories: [
          { id: "city-hospitals", label: "H\u00f4pitaux urbains" },
          { id: "state-private-hospitals", label: "H\u00f4pitaux publics & priv\u00e9s" },
          { id: "healthcare-campuses", label: "Campus de sant\u00e9" },
        ],
      },
      {
        id: "tourism-hospitality",
        label: "Tourisme & h\u00f4tellerie",
        subcategories: [
          { id: "hotels", label: "H\u00f4tels" },
          { id: "shopping-malls", label: "Centres commerciaux" },
          { id: "office-buildings", label: "Immeubles de bureaux" },
        ],
      },
      {
        id: "residential-urban",
        label: "Projets r\u00e9sidentiels & de r\u00e9novation urbaine",
        subcategories: [
          { id: "mass-housing", label: "Projets de logements collectifs" },
          { id: "urban-renewal", label: "Zones de renouvellement urbain" },
          { id: "residential-complexes", label: "R\u00e9sidences" },
        ],
      },
      {
        id: "public-government",
        label: "B\u00e2timents publics & projets officiels",
        subcategories: [{ id: "educational", label: "\u00c9tablissements d\u2019enseignement" }],
      },
      {
        id: "energy-infrastructure",
        label: "Projets \u00e9nergie & infrastructure",
        subcategories: [
          { id: "power-plants", label: "Centrales \u00e9lectriques" },
          { id: "infrastructure-facilities", label: "Installations d\u2019infrastructure" },
          { id: "utility-service", label: "B\u00e2timents techniques & de service" },
        ],
      },
    ],
  },
  ru: {
    all: "\u0412\u0441\u0435 \u043f\u0440\u043e\u0435\u043a\u0442\u044b",
    tree: [
      {
        id: "infrastructure-transport",
        label: "\u0418\u043d\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u0430 \u0438 \u0442\u0440\u0430\u043d\u0441\u043f\u043e\u0440\u0442",
        subcategories: [
          { id: "passenger-terminals-airport", label: "\u041f\u0430\u0441\u0441\u0430\u0436\u0438\u0440\u0441\u043a\u0438\u0435 \u0442\u0435\u0440\u043c\u0438\u043d\u0430\u043b\u044b \u2014 \u0410\u044d\u0440\u043e\u043f\u043e\u0440\u0442" },
          { id: "parking", label: "\u041f\u0430\u0440\u043a\u043e\u0432\u043a\u0438 \u0438 \u043f\u0435\u0440\u0440\u043e\u043d\u043d\u044b\u0435 \u0437\u043e\u043d\u044b" },
          { id: "public-building-market", label: "\u0413\u043e\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0435 \u0437\u0434\u0430\u043d\u0438\u0435 \u2014 \u0420\u044b\u043d\u043e\u043a" },
        ],
      },
      {
        id: "industrial",
        label: "\u041f\u0440\u043e\u043c\u044b\u0448\u043b\u0435\u043d\u043d\u044b\u0435 \u043e\u0431\u044a\u0435\u043a\u0442\u044b \u0438 \u0437\u0430\u0432\u043e\u0434\u044b",
        subcategories: [
          { id: "manufacturing", label: "\u041f\u0440\u043e\u0438\u0437\u0432\u043e\u0434\u0441\u0442\u0432\u0435\u043d\u043d\u044b\u0435 \u043f\u043b\u043e\u0449\u0430\u0434\u043a\u0438" },
          { id: "logistics-warehouses", label: "\u041b\u043e\u0433\u0438\u0441\u0442\u0438\u043a\u0430 \u0438 \u0441\u043a\u043b\u0430\u0434\u044b" },
          { id: "heavy-industry", label: "\u041e\u0431\u044a\u0435\u043a\u0442\u044b \u0442\u044f\u0436\u0451\u043b\u043e\u0439 \u043f\u0440\u043e\u043c\u044b\u0448\u043b\u0435\u043d\u043d\u043e\u0441\u0442\u0438" },
        ],
      },
      {
        id: "healthcare",
        label: "\u041e\u0431\u044a\u0435\u043a\u0442\u044b \u0437\u0434\u0440\u0430\u0432\u043e\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0438\u044f",
        subcategories: [
          { id: "city-hospitals", label: "\u0413\u043e\u0440\u043e\u0434\u0441\u043a\u0438\u0435 \u0431\u043e\u043b\u044c\u043d\u0438\u0446\u044b" },
          { id: "state-private-hospitals", label: "\u0413\u043e\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043d\u043d\u044b\u0435 \u0438 \u0447\u0430\u0441\u0442\u043d\u044b\u0435 \u0431\u043e\u043b\u044c\u043d\u0438\u0446\u044b" },
          { id: "healthcare-campuses", label: "\u041c\u0435\u0434\u0438\u0446\u0438\u043d\u0441\u043a\u0438\u0435 \u043a\u0430\u043c\u043f\u0443\u0441\u044b" },
        ],
      },
      {
        id: "tourism-hospitality",
        label: "\u0422\u0443\u0440\u0438\u0437\u043c \u0438 \u0433\u043e\u0441\u0442\u0438\u043d\u0438\u0447\u043d\u044b\u0439 \u0431\u0438\u0437\u043d\u0435\u0441",
        subcategories: [
          { id: "hotels", label: "\u041e\u0442\u0435\u043b\u0438" },
          { id: "shopping-malls", label: "\u0422\u043e\u0440\u0433\u043e\u0432\u044b\u0435 \u0446\u0435\u043d\u0442\u0440\u044b" },
          { id: "office-buildings", label: "\u041e\u0444\u0438\u0441\u043d\u044b\u0435 \u0437\u0434\u0430\u043d\u0438\u044f" },
        ],
      },
      {
        id: "residential-urban",
        label: "\u0416\u0438\u043b\u044b\u0435 \u0438 \u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0438\u0435 \u043f\u0440\u043e\u0435\u043a\u0442\u044b",
        subcategories: [
          { id: "mass-housing", label: "\u041c\u0430\u0441\u0441\u043e\u0432\u043e\u0435 \u0436\u0438\u043b\u0438\u0449\u043d\u043e\u0435 \u0441\u0442\u0440\u043e\u0438\u0442\u0435\u043b\u044c\u0441\u0442\u0432\u043e" },
          { id: "urban-renewal", label: "\u0417\u043e\u043d\u044b \u0433\u043e\u0440\u043e\u0434\u0441\u043a\u043e\u0439 \u0440\u0435\u043a\u043e\u043d\u0441\u0442\u0440\u0443\u043a\u0446\u0438\u0438" },
          { id: "residential-complexes", label: "\u0416\u0438\u043b\u044b\u0435 \u043a\u043e\u043c\u043f\u043b\u0435\u043a\u0441\u044b" },
        ],
      },
      {
        id: "public-government",
        label: "\u0413\u043e\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043d\u043d\u044b\u0435 \u0437\u0434\u0430\u043d\u0438\u044f \u0438 \u043e\u0444\u0438\u0446\u0438\u0430\u043b\u044c\u043d\u044b\u0435 \u043f\u0440\u043e\u0435\u043a\u0442\u044b",
        subcategories: [{ id: "educational", label: "\u041e\u0431\u0440\u0430\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u043d\u044b\u0435 \u0437\u0434\u0430\u043d\u0438\u044f" }],
      },
      {
        id: "energy-infrastructure",
        label: "\u042d\u043d\u0435\u0440\u0433\u0435\u0442\u0438\u0447\u0435\u0441\u043a\u0438\u0435 \u0438 \u0438\u043d\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u043d\u044b\u0435 \u043f\u0440\u043e\u0435\u043a\u0442\u044b",
        subcategories: [
          { id: "power-plants", label: "\u042d\u043b\u0435\u043a\u0442\u0440\u043e\u0441\u0442\u0430\u043d\u0446\u0438\u0438" },
          { id: "infrastructure-facilities", label: "\u0418\u043d\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u043d\u044b\u0435 \u043e\u0431\u044a\u0435\u043a\u0442\u044b" },
          { id: "utility-service", label: "\u0422\u0435\u0445\u043d\u0438\u0447\u0435\u0441\u043a\u0438\u0435 \u0438 \u0441\u043b\u0443\u0436\u0435\u0431\u043d\u044b\u0435 \u0437\u0434\u0430\u043d\u0438\u044f" },
        ],
      },
    ],
  },
  ar: {
    all: "\u062c\u0645\u064a\u0639 \u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639",
    tree: [
      {
        id: "infrastructure-transport",
        label: "\u0627\u0644\u0628\u0646\u064a\u0629 \u0627\u0644\u062a\u062d\u062a\u064a\u0629 \u0648\u0627\u0644\u0646\u0642\u0644",
        subcategories: [
          { id: "passenger-terminals-airport", label: "\u0645\u0628\u0627\u0626\u064a \u0627\u0644\u0631\u0643\u0627\u0628 \u2014 \u0627\u0644\u0645\u0637\u0627\u0631" },
          { id: "parking", label: "\u0645\u0648\u0627\u0642\u0641 \u0648\u0645\u0631\u0627\u0641\u0642 \u0627\u0644\u0637\u0627\u0626\u0631\u0627\u062a" },
          { id: "public-building-market", label: "\u0645\u0628\u0646\u0649 \u062d\u0643\u0648\u0645\u064a \u2014 \u0633\u0648\u0642 \u0645\u062a\u0639\u062f\u062f \u0627\u0644\u0623\u063a\u0631\u0627\u0636" },
        ],
      },
      {
        id: "industrial",
        label: "\u0627\u0644\u0645\u0635\u0627\u0646\u0639 \u0648\u0627\u0644\u0645\u0631\u0627\u0641\u0642 \u0627\u0644\u0635\u0646\u0627\u0639\u064a\u0629",
        subcategories: [
          { id: "manufacturing", label: "\u0645\u0635\u0627\u0646\u0639 \u0627\u0644\u0625\u0646\u062a\u0627\u062c" },
          { id: "logistics-warehouses", label: "\u0627\u0644\u0644\u0648\u062c\u0633\u062a\u064a\u0627\u062a \u0648\u0627\u0644\u0645\u0633\u062a\u0648\u062f\u0639\u0627\u062a" },
          { id: "heavy-industry", label: "\u0645\u0631\u0627\u0641\u0642 \u0627\u0644\u0635\u0646\u0627\u0639\u0629 \u0627\u0644\u062b\u0642\u064a\u0644\u0629" },
        ],
      },
      {
        id: "healthcare",
        label: "\u0627\u0644\u0645\u0631\u0627\u0641\u0642 \u0627\u0644\u0635\u062d\u064a\u0629",
        subcategories: [
          { id: "city-hospitals", label: "\u0645\u0633\u062a\u0634\u0641\u064a\u0627\u062a \u0627\u0644\u0645\u062f\u064a\u0646\u0629" },
          { id: "state-private-hospitals", label: "\u0645\u0633\u062a\u0634\u0641\u064a\u0627\u062a \u062d\u0643\u0648\u0645\u064a\u0629 \u0648\u062e\u0627\u0635\u0629" },
          { id: "healthcare-campuses", label: "\u0627\u0644\u0645\u062c\u0645\u0639\u0627\u062a \u0627\u0644\u0637\u0628\u064a\u0629" },
        ],
      },
      {
        id: "tourism-hospitality",
        label: "\u0627\u0644\u0633\u064a\u0627\u062d\u0629 \u0648\u0627\u0644\u0636\u064a\u0627\u0641\u0629",
        subcategories: [
          { id: "hotels", label: "\u0627\u0644\u0641\u0646\u0627\u062f\u0642" },
          { id: "shopping-malls", label: "\u0645\u0631\u0627\u0643\u0632 \u0627\u0644\u062a\u0633\u0648\u0642" },
          { id: "office-buildings", label: "\u0645\u0628\u0627\u0646\u064a \u0627\u0644\u0645\u0643\u0627\u062a\u0628" },
        ],
      },
      {
        id: "residential-urban",
        label: "\u0645\u0634\u0627\u0631\u064a\u0639 \u0627\u0644\u0625\u0633\u0643\u0627\u0646 \u0648\u0627\u0644\u062a\u0646\u0645\u064a\u0629 \u0627\u0644\u062d\u0636\u0631\u064a\u0629",
        subcategories: [
          { id: "mass-housing", label: "\u0645\u0634\u0627\u0631\u064a\u0639 \u0627\u0644\u0625\u0633\u0643\u0627\u0646 \u0627\u0644\u062c\u0645\u0627\u0639\u064a" },
          { id: "urban-renewal", label: "\u0645\u0646\u0627\u0637\u0642 \u0627\u0644\u062a\u0646\u0645\u064a\u0629 \u0627\u0644\u062d\u0636\u0631\u064a\u0629" },
          { id: "residential-complexes", label: "\u0645\u062c\u0645\u0639\u0627\u062a \u0633\u0643\u0646\u064a\u0629" },
        ],
      },
      {
        id: "public-government",
        label: "\u0627\u0644\u0645\u0628\u0627\u0646\u064a \u0627\u0644\u062d\u0643\u0648\u0645\u064a\u0629 \u0648\u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639 \u0627\u0644\u0631\u0633\u0645\u064a\u0629",
        subcategories: [{ id: "educational", label: "\u0627\u0644\u0645\u0628\u0627\u0646\u064a \u0627\u0644\u062a\u0639\u0644\u064a\u0645\u064a\u0629" }],
      },
      {
        id: "energy-infrastructure",
        label: "\u0645\u0634\u0627\u0631\u064a\u0639 \u0627\u0644\u0637\u0627\u0642\u0629 \u0648\u0627\u0644\u0628\u0646\u064a\u0629 \u0627\u0644\u062a\u062d\u062a\u064a\u0629",
        subcategories: [
          { id: "power-plants", label: "\u0645\u062d\u0637\u0627\u062a \u0627\u0644\u0637\u0627\u0642\u0629" },
          { id: "infrastructure-facilities", label: "\u0645\u0631\u0627\u0641\u0642 \u0628\u0646\u064a\u0629 \u062a\u062d\u062a\u064a\u0629" },
          { id: "utility-service", label: "\u0645\u0628\u0627\u0646\u064a \u062a\u0642\u0646\u064a\u0629 \u0648\u062e\u062f\u0645\u0629" },
        ],
      },
    ],
  },
  es: {
    all: "Todos los proyectos",
    tree: [
      {
        id: "infrastructure-transport",
        label: "Infraestructura y transporte",
        subcategories: [
          { id: "passenger-terminals-airport", label: "Terminales de pasajeros \u2014 Aeropuerto" },
          { id: "parking", label: "Aparcamientos y plataformas" },
          { id: "public-building-market", label: "Edificio p\u00fablico \u2014 Mercado polivalente" },
        ],
      },
      {
        id: "industrial",
        label: "Instalaciones industriales y f\u00e1bricas",
        subcategories: [
          { id: "manufacturing", label: "Plantas de producci\u00f3n" },
          { id: "logistics-warehouses", label: "Log\u00edstica y almacenes" },
          { id: "heavy-industry", label: "Instalaciones de industria pesada" },
        ],
      },
      {
        id: "healthcare",
        label: "Instalaciones sanitarias",
        subcategories: [
          { id: "city-hospitals", label: "Hospitales urbanos" },
          { id: "state-private-hospitals", label: "Hospitales p\u00fablicos y privados" },
          { id: "healthcare-campuses", label: "Campus sanitarios" },
        ],
      },
      {
        id: "tourism-hospitality",
        label: "Turismo y hosteler\u00eda",
        subcategories: [
          { id: "hotels", label: "Hoteles" },
          { id: "shopping-malls", label: "Centros comerciales" },
          { id: "office-buildings", label: "Edificios de oficinas" },
        ],
      },
      {
        id: "residential-urban",
        label: "Proyectos residenciales y de regeneraci\u00f3n urbana",
        subcategories: [
          { id: "mass-housing", label: "Proyectos de vivienda masiva" },
          { id: "urban-renewal", label: "\u00c1reas de renovaci\u00f3n urbana" },
          { id: "residential-complexes", label: "Complejos residenciales" },
        ],
      },
      {
        id: "public-government",
        label: "Edificios p\u00fablicos y proyectos oficiales",
        subcategories: [{ id: "educational", label: "Edificios educativos" }],
      },
      {
        id: "energy-infrastructure",
        label: "Proyectos de energ\u00eda e infraestructura",
        subcategories: [
          { id: "power-plants", label: "Centrales el\u00e9ctricas" },
          { id: "infrastructure-facilities", label: "Instalaciones de infraestructura" },
          { id: "utility-service", label: "Edificios t\u00e9cnicos y de servicio" },
        ],
      },
    ],
  },
  it: {
    all: "Tutti i progetti",
    tree: [
      {
        id: "infrastructure-transport",
        label: "Infrastrutture e trasporti",
        subcategories: [
          { id: "passenger-terminals-airport", label: "Terminal passeggeri \u2014 Aeroporto" },
          { id: "parking", label: "Parcheggi e piazzali" },
          { id: "public-building-market", label: "Edificio pubblico \u2014 Mercato polifunzionale" },
        ],
      },
      {
        id: "industrial",
        label: "Impianti industriali e fabbriche",
        subcategories: [
          { id: "manufacturing", label: "Stabilimenti produttivi" },
          { id: "logistics-warehouses", label: "Logistica e magazzini" },
          { id: "heavy-industry", label: "Impianti di industria pesante" },
        ],
      },
      {
        id: "healthcare",
        label: "Strutture sanitarie",
        subcategories: [
          { id: "city-hospitals", label: "Ospedali cittadini" },
          { id: "state-private-hospitals", label: "Ospedali pubblici e privati" },
          { id: "healthcare-campuses", label: "Campus sanitari" },
        ],
      },
      {
        id: "tourism-hospitality",
        label: "Turismo e ospitalit\u00e0",
        subcategories: [
          { id: "hotels", label: "Hotel" },
          { id: "shopping-malls", label: "Centri commerciali" },
          { id: "office-buildings", label: "Edifici per uffici" },
        ],
      },
      {
        id: "residential-urban",
        label: "Progetti residenziali e di rigenerazione urbana",
        subcategories: [
          { id: "mass-housing", label: "Progetti di edilizia residenziale pubblica" },
          { id: "urban-renewal", label: "Aree di rigenerazione urbana" },
          { id: "residential-complexes", label: "Complessi residenziali" },
        ],
      },
      {
        id: "public-government",
        label: "Edifici pubblici e progetti istituzionali",
        subcategories: [{ id: "educational", label: "Edifici scolastici" }],
      },
      {
        id: "energy-infrastructure",
        label: "Progetti energetici e infrastrutturali",
        subcategories: [
          { id: "power-plants", label: "Centrali elettriche" },
          { id: "infrastructure-facilities", label: "Impianti infrastrutturali" },
          { id: "utility-service", label: "Edifici tecnici e di servizio" },
        ],
      },
    ],
  },
  pl: {
    all: "Wszystkie projekty",
    tree: [
      {
        id: "infrastructure-transport",
        label: "Infrastruktura i transport",
        subcategories: [
          { id: "passenger-terminals-airport", label: "Terminale pasa\u017cerskie \u2014 Lotnisko" },
          { id: "parking", label: "Parkingi i p\u0142yty postojowe" },
          { id: "public-building-market", label: "Budynek publiczny \u2014 Rynek wielofunkcyjny" },
        ],
      },
      {
        id: "industrial",
        label: "Obiekty przemys\u0142owe i fabryki",
        subcategories: [
          { id: "manufacturing", label: "Zak\u0142ady produkcyjne" },
          { id: "logistics-warehouses", label: "Logistyka i magazyny" },
          { id: "heavy-industry", label: "Obiekty ci\u0119\u017ckiego przemys\u0142u" },
        ],
      },
      {
        id: "healthcare",
        label: "Obiekty opieki zdrowotnej",
        subcategories: [
          { id: "city-hospitals", label: "Szpitale miejskie" },
          { id: "state-private-hospitals", label: "Szpitale publiczne i prywatne" },
          { id: "healthcare-campuses", label: "Kampusy medyczne" },
        ],
      },
      {
        id: "tourism-hospitality",
        label: "Turystyka i hotelarstwo",
        subcategories: [
          { id: "hotels", label: "Hotele" },
          { id: "shopping-malls", label: "Centra handlowe" },
          { id: "office-buildings", label: "Biurowce" },
        ],
      },
      {
        id: "residential-urban",
        label: "Projekty mieszkaniowe i rewitalizacji urbanistycznej",
        subcategories: [
          { id: "mass-housing", label: "Projekty budownictwa masowego" },
          { id: "urban-renewal", label: "Obszary rewitalizacji miejskiej" },
          { id: "residential-complexes", label: "Osiedla mieszkaniowe" },
        ],
      },
      {
        id: "public-government",
        label: "Budynki publiczne i projekty rz\u0105dowe",
        subcategories: [{ id: "educational", label: "Obiekty edukacyjne" }],
      },
      {
        id: "energy-infrastructure",
        label: "Projekty energetyczne i infrastrukturalne",
        subcategories: [
          { id: "power-plants", label: "Elektrownie" },
          { id: "infrastructure-facilities", label: "Obiekty infrastrukturalne" },
          { id: "utility-service", label: "Budynki techniczne i serwisowe" },
        ],
      },
    ],
  },
  ro: {
    all: "Toate proiectele",
    tree: [
      {
        id: "infrastructure-transport",
        label: "Infrastructur\u0103 \u0219i transport",
        subcategories: [
          { id: "passenger-terminals-airport", label: "Terminale pasageri \u2014 Aeroport" },
          { id: "parking", label: "Parc\u0103ri \u0219i platforme" },
          { id: "public-building-market", label: "Cl\u0103dire public\u0103 \u2014 Pia\u021b\u0103 multifunc\u021bional\u0103" },
        ],
      },
      {
        id: "industrial",
        label: "Facilit\u0103\u021bi industriale \u0219i fabrici",
        subcategories: [
          { id: "manufacturing", label: "Unit\u0103\u021bi de produc\u021bie" },
          { id: "logistics-warehouses", label: "Logistic\u0103 \u0219i depozite" },
          { id: "heavy-industry", label: "Facilit\u0103\u021bi de industrie grea" },
        ],
      },
      {
        id: "healthcare",
        label: "Facilit\u0103\u021bi medicale",
        subcategories: [
          { id: "city-hospitals", label: "Spitale municipale" },
          { id: "state-private-hospitals", label: "Spitale de stat \u0219i private" },
          { id: "healthcare-campuses", label: "Campusuri medicale" },
        ],
      },
      {
        id: "tourism-hospitality",
        label: "Turism \u0219i ospitalitate",
        subcategories: [
          { id: "hotels", label: "Hoteluri" },
          { id: "shopping-malls", label: "Centre comerciale" },
          { id: "office-buildings", label: "Cl\u0103diri de birouri" },
        ],
      },
      {
        id: "residential-urban",
        label: "Proiecte reziden\u021biale \u0219i de regenerare urban\u0103",
        subcategories: [
          { id: "mass-housing", label: "Proiecte de locuin\u021be sociale" },
          { id: "urban-renewal", label: "Zone de regenerare urban\u0103" },
          { id: "residential-complexes", label: "Complexuri reziden\u021biale" },
        ],
      },
      {
        id: "public-government",
        label: "Cl\u0103diri publice \u0219i proiecte guvernamentale",
        subcategories: [{ id: "educational", label: "Cl\u0103diri educa\u021bionale" }],
      },
      {
        id: "energy-infrastructure",
        label: "Proiecte energetice \u0219i de infrastructur\u0103",
        subcategories: [
          { id: "power-plants", label: "Centrale electrice" },
          { id: "infrastructure-facilities", label: "Facilit\u0103\u021bi de infrastructur\u0103" },
          { id: "utility-service", label: "Cl\u0103diri tehnice \u0219i de servicii" },
        ],
      },
    ],
  },
  hu: {
    all: "\u00d6sszes projekt",
    tree: [
      {
        id: "infrastructure-transport",
        label: "Infrastrukt\u00fara \u00e9s k\u00f6zleked\u00e9s",
        subcategories: [
          { id: "passenger-terminals-airport", label: "Utastermin\u00e1lok \u2014 Rep\u00fcl\u0151t\u00e9r" },
          { id: "parking", label: "Parkol\u00f3k \u00e9s apron ter\u00fcletek" },
          { id: "public-building-market", label: "K\u00f6z\u00e9p\u00fclet \u2014 T\u00f6bbc\u00e9l\u00fa piac" },
        ],
      },
      {
        id: "industrial",
        label: "Ipari l\u00e9tes\u00edtm\u00e9nyek \u00e9s gy\u00e1rak",
        subcategories: [
          { id: "manufacturing", label: "Gy\u00e1rt\u00f3 \u00fczemek" },
          { id: "logistics-warehouses", label: "Logisztika \u00e9s rakt\u00e1rak" },
          { id: "heavy-industry", label: "Nehezipari l\u00e9tes\u00edtm\u00e9nyek" },
        ],
      },
      {
        id: "healthcare",
        label: "Eg\u00e9szs\u00e9g\u00fcgyi l\u00e9tes\u00edtm\u00e9nyek",
        subcategories: [
          { id: "city-hospitals", label: "V\u00e1rosi k\u00f3rh\u00e1zak" },
          { id: "state-private-hospitals", label: "\u00c1llami \u00e9s mag\u00e1n k\u00f3rh\u00e1zak" },
          { id: "healthcare-campuses", label: "Eg\u00e9szs\u00e9g\u00fcgyi campusok" },
        ],
      },
      {
        id: "tourism-hospitality",
        label: "Turizmus \u00e9s vend\u00e9gl\u00e1t\u00e1s",
        subcategories: [
          { id: "hotels", label: "Sz\u00e1llod\u00e1k" },
          { id: "shopping-malls", label: "Bev\u00e1s\u00e1rl\u00f3k\u00f6zpontok" },
          { id: "office-buildings", label: "Irodah\u00e1zak" },
        ],
      },
      {
        id: "residential-urban",
        label: "Lak\u00f3- \u00e9s v\u00e1rosfejleszt\u00e9si projektek",
        subcategories: [
          { id: "mass-housing", label: "T\u00f6meges lak\u00e1s\u00e9p\u00edt\u00e9si projektek" },
          { id: "urban-renewal", label: "V\u00e1rosi meg\u00fajul\u00e1si ter\u00fcletek" },
          { id: "residential-complexes", label: "Lak\u00f3parkok" },
        ],
      },
      {
        id: "public-government",
        label: "K\u00f6z\u00e9p\u00fcletek \u00e9s hivatalos projektek",
        subcategories: [{ id: "educational", label: "Oktat\u00e1si \u00e9p\u00fcletek" }],
      },
      {
        id: "energy-infrastructure",
        label: "Energia- \u00e9s infrastrukt\u00fara-projektek",
        subcategories: [
          { id: "power-plants", label: "Er\u0151m\u0171vek" },
          { id: "infrastructure-facilities", label: "Infrastruktur\u00e1lis l\u00e9tes\u00edtm\u00e9nyek" },
          { id: "utility-service", label: "M\u0171szaki \u00e9s szolg\u00e1ltat\u00f3 \u00e9p\u00fcletek" },
        ],
      },
    ],
  },
  lt: {
    all: "Visi projektai",
    tree: [
      {
        id: "infrastructure-transport",
        label: "Infrastrukt\u016bra ir transportas",
        subcategories: [
          { id: "passenger-terminals-airport", label: "Keleivi\u0173 terminalai \u2014 Oro uostas" },
          { id: "parking", label: "Automobili\u0173 stov\u0117jimo aik\u0161tel\u0117s ir apronai" },
          { id: "public-building-market", label: "Vie\u0161asis pastatas \u2014 Daugiapaskirt\u0117 rinka" },
        ],
      },
      {
        id: "industrial",
        label: "Pramon\u0117s objektai ir gamyklos",
        subcategories: [
          { id: "manufacturing", label: "Gamyklos" },
          { id: "logistics-warehouses", label: "Logistika ir sand\u0117liai" },
          { id: "heavy-industry", label: "Sunkiosios pramon\u0117s objektai" },
        ],
      },
      {
        id: "healthcare",
        label: "Sveikatos prie\u017ei\u016bros objektai",
        subcategories: [
          { id: "city-hospitals", label: "Miesto ligonin\u0117s" },
          { id: "state-private-hospitals", label: "Valstybin\u0117s ir priva\u010dios ligonin\u0117s" },
          { id: "healthcare-campuses", label: "Sveikatos campusai" },
        ],
      },
      {
        id: "tourism-hospitality",
        label: "Turizmas ir svetingumas",
        subcategories: [
          { id: "hotels", label: "Vie\u0161bu\u010diai" },
          { id: "shopping-malls", label: "Prekybos centrai" },
          { id: "office-buildings", label: "Biur\u0173 pastatai" },
        ],
      },
      {
        id: "residential-urban",
        label: "B\u016bt\u0173 ir urbanistin\u0117s regeneracijos projektai",
        subcategories: [
          { id: "mass-housing", label: "Masinio b\u016bt\u0173 statybos projektai" },
          { id: "urban-renewal", label: "Miesto atnaujinimo zonos" },
          { id: "residential-complexes", label: "Gyvenamieji kompleksai" },
        ],
      },
      {
        id: "public-government",
        label: "Vie\u0161ieji pastatai ir oficial\u016bs projektai",
        subcategories: [{ id: "educational", label: "\u0160vietimo pastatai" }],
      },
      {
        id: "energy-infrastructure",
        label: "Energijos ir infrastrukt\u016bros projektai",
        subcategories: [
          { id: "power-plants", label: "Elektrin\u0117s" },
          { id: "infrastructure-facilities", label: "Infrastrukt\u016bros objektai" },
          { id: "utility-service", label: "Techniniai ir aptarnavimo pastatai" },
        ],
      },
    ],
  },
  az: {
    all: "B\u00fct\u00fcn layih\u0259l\u0259r",
    tree: [
      {
        id: "infrastructure-transport",
        label: "Infrastruktur v\u0259 n\u0259qliyyat",
        subcategories: [
          { id: "passenger-terminals-airport", label: "S\u0259rni\u015fin terminallar\u0131 \u2014 Hava liman\u0131" },
          { id: "parking", label: "Parkinq v\u0259 apron sah\u0259l\u0259ri" },
          { id: "public-building-market", label: "\u0130ctimai bina \u2014 \u00c7oxm\u0259qs\u0259dli bazar" },
        ],
      },
      {
        id: "industrial",
        label: "S\u0259naye obyektl\u0259ri v\u0259 zavodlar",
        subcategories: [
          { id: "manufacturing", label: "\u0130stehsal obyektl\u0259ri" },
          { id: "logistics-warehouses", label: "Logistika v\u0259 anbar sah\u0259l\u0259ri" },
          { id: "heavy-industry", label: "A\u011f\u0131r s\u0259naye obyektl\u0259ri" },
        ],
      },
      {
        id: "healthcare",
        label: "S\u0259hiyy\u0259 obyektl\u0259ri",
        subcategories: [
          { id: "city-hospitals", label: "\u015e\u0259h\u0259r x\u0259st\u0259xanalar\u0131" },
          { id: "state-private-hospitals", label: "D\u00f6vl\u0259t v\u0259 \u015f\u0259xsi x\u0259st\u0259xanalar" },
          { id: "healthcare-campuses", label: "S\u0259hiyy\u0259 kampuslar\u0131" },
        ],
      },
      {
        id: "tourism-hospitality",
        label: "Turizm v\u0259 qonaqxana",
        subcategories: [
          { id: "hotels", label: "Otell\u0259r" },
          { id: "shopping-malls", label: "Ticar\u0259t m\u0259rk\u0259zl\u0259ri" },
          { id: "office-buildings", label: "Ofis binalar\u0131" },
        ],
      },
      {
        id: "residential-urban",
        label: "\u0130\u015f\u0259q v\u0259 \u015f\u0259h\u0259rin yenil\u0259nm\u0259si layih\u0259l\u0259ri",
        subcategories: [
          { id: "mass-housing", label: "K\u00fctl\u0259vi m\u0259skunla\u015fma layih\u0259l\u0259ri" },
          { id: "urban-renewal", label: "\u015e\u0259h\u0259rin yenil\u0259nm\u0259si sah\u0259l\u0259ri" },
          { id: "residential-complexes", label: "\u0130\u015f\u0259q kompleksl\u0259ri" },
        ],
      },
      {
        id: "public-government",
        label: "\u0130ctimai binalar v\u0259 r\u0259smi layih\u0259l\u0259r",
        subcategories: [{ id: "educational", label: "T\u0259hsil binalar\u0131" }],
      },
      {
        id: "energy-infrastructure",
        label: "Enerji v\u0259 infrastruktur layih\u0259l\u0259ri",
        subcategories: [
          { id: "power-plants", label: "Elektrik stansiyalar\u0131" },
          { id: "infrastructure-facilities", label: "Infrastruktur obyektl\u0259ri" },
          { id: "utility-service", label: "Texniki v\u0259 xidm\u0259t binalar\u0131" },
        ],
      },
    ],
  },
  kk: {
    all: "\u0411\u0430\u0440\u043b\u044b\u049b \u0436\u043e\u0431\u0430\u043b\u0430\u0440",
    tree: [
      {
        id: "infrastructure-transport",
        label: "\u0418\u043d\u0444\u0440\u0430\u043a\u0443\u0440\u0430 \u0436\u04e9\u043d\u0435 \u043a\u04e9\u043b\u0456\u043a \u043a\u043e\u043c\u043c\u0443\u043d\u0430\u043b\u0434\u0430\u0440\u044b",
        subcategories: [
          { id: "passenger-terminals-airport", label: "\u0416\u043e\u043b\u0430\u0443\u0448\u044b \u0442\u0435\u0440\u043c\u0438\u043d\u0430\u043b\u0434\u0430\u0440\u044b \u2014 \u0410\u044d\u0440\u043e\u043f\u043e\u0440\u0442" },
          { id: "parking", label: "\u0410\u0432\u0442\u043e\u0442\u04e9\u043a\u0435\u0436\u0430\u0439 \u0436\u04e9\u043d\u0435 apron \u0430\u043b\u0430\u043d\u0434\u0430\u0440\u044b" },
          { id: "public-building-market", label: "\u041c\u0435\u043c\u043b\u0435\u043a\u0435\u0442 \u0433\u0438\u043c\u0430\u0440\u0430\u0442\u044b \u2014 \u041a\u043e\u043f \u043c\u0430\u04a3\u0433\u044b \u043d\u0430\u0440\u044b\u049b" },
        ],
      },
      {
        id: "industrial",
        label: "\u041e\u043d\u0435\u0440\u043a\u0430\u0441\u044b \u043d\u044b\u0441\u0430\u043d\u0434\u0430\u0440 \u0436\u04e9\u043d\u0435 \u0437\u0430\u0443\u044b\u0442\u0442\u0430\u0440",
        subcategories: [
          { id: "manufacturing", label: "\u041e\u043d\u0434\u044b\u0440\u0443 \u043d\u044b\u0441\u0430\u043d\u0434\u0430\u0440\u044b" },
          { id: "logistics-warehouses", label: "\u041b\u043e\u0433\u0438\u0441\u0442\u0438\u043a\u0430 \u0436\u04e9\u043d\u0435 \u049b\u043e\u044f \u0430\u043b\u0430\u043d\u0434\u0430\u0440\u044b" },
          { id: "heavy-industry", label: "\u0410\u0493\u044b\u0440 \u043e\u043d\u0435\u0440\u043a\u0430\u0441\u044b \u043d\u044b\u0441\u0430\u043d\u0434\u0430\u0440" },
        ],
      },
      {
        id: "healthcare",
        label: "\u0414\u0435\u043d\u0441\u0430\u0443\u043b\u044b\u049b \u043d\u044b\u0441\u0430\u043d\u0434\u0430\u0440",
        subcategories: [
          { id: "city-hospitals", label: "\u049a\u0430\u043b\u0430 \u0430\u0443\u0440\u0443\u043b\u0430\u0440\u044b" },
          { id: "state-private-hospitals", label: "\u041c\u0435\u043c\u043b\u0435\u043a\u0435\u0442 \u0436\u04e9\u043d\u0435 \u0436\u0435\u043a\u0435 \u0430\u0443\u0440\u0443\u043b\u0430\u0440\u044b" },
          { id: "healthcare-campuses", label: "\u0414\u0435\u043d\u0441\u0430\u0443 \u043a\u0430\u043c\u043f\u0443\u0441\u0442\u0430\u0440\u044b" },
        ],
      },
      {
        id: "tourism-hospitality",
        label: "\u0422\u0443\u0440\u0438\u0437\u043c \u0436\u04e9\u043d\u0435 \u049b\u043e\u043d\u0430\u049b \u043a\u04b1\u0437\u0435\u0442\u0448\u0456\u043b\u0456\u0433\u0456",
        subcategories: [
          { id: "hotels", label: "\u049a\u043e\u043d\u0430\u049b \u04af\u0439 \u0436\u0435\u0440\u043b\u0435\u0440\u0456" },
          { id: "shopping-malls", label: "\u0421\u0430\u0443\u0434\u0430 \u043e\u0440\u0442\u0430\u043b\u044b\u049b \u043e\u0440\u044b\u043d\u0434\u0430\u0440\u044b" },
          { id: "office-buildings", label: "\u041e\u0444\u0438\u0441 \u0493\u0438\u043c\u0430\u0440\u0430\u0442\u0442\u0430\u0440\u044b" },
        ],
      },
      {
        id: "residential-urban",
        label: "\u0422\u04af\u0440\u0493\u044b \u0436\u04e9\u043d\u0435 \u049b\u0430\u043b\u0430 \u049b\u0430\u0439\u0442\u0430 \u0436\u0430\u04a3\u0430\u0440\u0442\u0443 \u0436\u043e\u0431\u0430\u043b\u0430\u0440\u044b",
        subcategories: [
          { id: "mass-housing", label: "\u041a\u043e\u043f \u0442\u04af\u0440\u0493\u044b \u043d\u0430\u0443\u0430\u043d \u0436\u043e\u0431\u0430\u043b\u0430\u0440\u044b" },
          { id: "urban-renewal", label: "\u049a\u0430\u043b\u0430 \u0436\u0430\u04a3\u0430\u0440\u0442\u0443 \u0430\u0439\u043c\u0430\u049b\u0442\u0430\u0440\u044b" },
          { id: "residential-complexes", label: "\u0422\u04af\u0440\u0493\u044b \u043a\u043e\u043c\u043f\u043b\u0435\u043a\u0441\u0442\u0435\u0440\u0456" },
        ],
      },
      {
        id: "public-government",
        label: "\u041c\u0435\u043c\u043b\u0435\u043a\u0435\u0442 \u0433\u0438\u043c\u0430\u0440\u0430\u0442\u0442\u0430\u0440\u044b \u0436\u04e9\u043d\u0435 \u0440\u0435\u0441\u043c\u0438 \u0436\u043e\u0431\u0430\u043b\u0430\u0440",
        subcategories: [{ id: "educational", label: "\u0411\u0456\u043b\u0456\u043c \u0431\u0435\u0440\u0443 \u0433\u0438\u043c\u0430\u0440\u0430\u0442\u0442\u0430\u0440\u044b" }],
      },
      {
        id: "energy-infrastructure",
        label: "\u042d\u043d\u0435\u0440\u0433\u0435\u0442\u0438\u043a\u0430 \u0436\u04e9\u043d\u0435 \u0438\u043d\u0444\u0440\u0430\u043a\u0443\u0440\u0430 \u0436\u043e\u0431\u0430\u043b\u0430\u0440\u044b",
        subcategories: [
          { id: "power-plants", label: "\u042d\u043b\u0435\u043a\u0442\u0440 \u0441\u0442\u0430\u043d\u0446\u0438\u044f\u043b\u0430\u0440\u044b" },
          { id: "infrastructure-facilities", label: "\u0418\u043d\u0444\u0440\u0430\u043a\u0443\u0440\u0430\u043b\u044b\u049b \u043d\u044b\u0441\u0430\u043d\u0434\u0430\u0440" },
          { id: "utility-service", label: "\u0422\u0435\u0445\u043d\u0438\u043a\u0430\u043b\u044b\u049b \u0436\u04e9\u043d\u0435 \u049b\u044b\u0437\u043c\u0435\u0442 \u043a\u04e9\u0440\u0441\u0435\u0442\u043a\u0456\u043b\u0435\u0440\u0456" },
        ],
      },
    ],
  },
  tg: {
    all: "\u04b2\u0430\u043c\u0430\u0438 \u043b\u043e\u0438\u04b3\u0430\u04b3\u043e",
    tree: [
      {
        id: "infrastructure-transport",
        label: "\u0417\u0435\u0440\u04b3\u0430\u04b3\u0430\u0442\u0438 \u0438\u043d\u0444\u0440\u0430\u0441\u043e\u04b3\u0430 \u0432\u0430 \u043d\u0430\u049b\u043b\u0438\u0435\u0442",
        subcategories: [
          { id: "passenger-terminals-airport", label: "\u0422\u0435\u0440\u043c\u0438\u043d\u0430\u043b\u04b3\u043e\u04b3\u043e\u0438 \u043c\u0443\u0441\u043e\u0444\u0438\u0440 \u2014 \u0424\u0443\u0440\u0443\u0434\u0433\u043e\u04b3\u0438 \u04b3\u0430\u0432\u043e\u04b3\u04e3\u0438" },
          { id: "parking", label: "\u041c\u0430\u0432\u043e\u0437\u0438\u043d\u0433\u04b3\u043e\u04b3\u043e \u0432\u0430 \u043c\u0430\u0439\u0434\u043e\u043d\u04b3\u043e\u04b3\u043e\u0438 apron" },
          { id: "public-building-market", label: "\u0411\u0438\u043d\u043e\u0438 \u0434\u0430\u0432\u043b\u0430\u0442\u04e3 \u2014 \u0411\u043e\u0437\u043e\u0440\u0438 \u0447\u0430\u043d\u0434\u0430\u04b3\u04e3\u0438" },
        ],
      },
      {
        id: "industrial",
        label: "\u0418\u0448\u043e\u043b\u043e\u0445\u04b3\u043e\u04b3\u043e\u0438 \u0441\u043e\u0445\u0442\u0430 \u0432\u0430 \u0437\u0430\u0432\u043e\u0434\u04b3\u043e\u04b3\u043e",
        subcategories: [
          { id: "manufacturing", label: "\u0418\u0448\u043e\u043b\u043e\u0445\u04b3\u043e\u0438 \u043c\u0430\u04b3\u043e\u0438\u043b\u043e\u0442" },
          { id: "logistics-warehouses", label: "\u041b\u043e\u0433\u0438\u0441\u0442\u0438\u043a\u0430 \u0432\u0430 \u0430\u043d\u0431\u043e\u0440\u04b3\u043e\u04b3\u043e" },
          { id: "heavy-industry", label: "\u0421\u043e\u0445\u0442\u0430\u04b3\u043e\u0438 \u0441\u043e\u043d\u0430\u0442\u0438 \u0441\u0435\u043d\u0433\u04e3\u043d\u0430\u0442\u0438" },
        ],
      },
      {
        id: "healthcare",
        label: "\u0418\u043d\u043e\u0438 \u0441\u043e\u0445\u0442\u0430\u04b3\u043e\u04b3\u043e\u0438 \u0441\u0430\u043d\u0430\u0442\u043e\u0440\u04e3\u04e3",
        subcategories: [
          { id: "city-hospitals", label: "\u0411\u0438\u043c\u043e\u0440\u043e\u04b3\u043e\u0438 \u0431\u0435\u043c\u043e\u0440\u0438\u0441\u0442\u043e\u043d\u04b3\u043e" },
          { id: "state-private-hospitals", label: "\u0411\u0435\u043c\u043e\u0440\u0438\u0441\u0442\u043e\u043d\u04b3\u043e\u0438 \u0434\u0430\u0432\u043b\u0430\u0442\u04e3 \u0432\u0430 \u0445\u0443\u0441\u0443\u0441\u04e3" },
          { id: "healthcare-campuses", label: "\u041a\u0430\u043c\u043f\u0443\u0441\u04b3\u043e\u0438 \u0441\u0430\u043d\u0430\u0442\u043e\u0440\u04e3\u04e3" },
        ],
      },
      {
        id: "tourism-hospitality",
        label: "\u0421\u0438\u04b7\u04b3\u04b3\u0430\u0442 \u0432\u0430 \u043c\u0435\u04b7\u043c\u043e\u043d\u04b3\u04e3\u0438\u0438",
        subcategories: [
          { id: "hotels", label: "\u041c\u0435\u04b7\u043c\u043e\u043d\u04b3\u043e\u04b3\u043e" },
          { id: "shopping-malls", label: "\u041c\u0430\u0440\u043a\u0437\u0430\u04b3\u043e\u04b3\u043e\u0438 \u043c\u0430\u0440\u043a\u0430\u0437\u04b3\u043e" },
          { id: "office-buildings", label: "\u0411\u0438\u043d\u043e\u04b3\u043e\u04b3\u043e\u0438 \u0438\u0434\u043e\u0440\u04e3" },
        ],
      },
      {
        id: "residential-urban",
        label: "\u041b\u043e\u0438\u04b3\u0430\u04b3\u043e\u0438 \u043c\u0430\u0441\u043a\u0443\u043d \u0432\u0430 \u0431\u0435\u0441\u04b3\u0430\u0437\u043e\u043a\u0443\u043d\u04e3\u0438\u0438 \u0448\u0430\u04b3\u0430\u0440",
        subcategories: [
          { id: "mass-housing", label: "\u041b\u043e\u0438\u04b3\u0430\u04b3\u043e\u0438 \u043e\u043c\u043c\u0430\u0432\u04e3" },
          { id: "urban-renewal", label: "\u041c\u0430\u043d\u0430\u04b7\u0438 \u0431\u0435\u0441\u04b3\u0430\u0437\u043e\u043a\u0443\u043d\u04e3\u0438\u0438 \u0448\u0430\u04b3\u0430\u0440" },
          { id: "residential-complexes", label: "\u041c\u0430\u0441\u043a\u0443\u043d\u04b3\u043e\u0438 \u043a\u043e\u043c\u043f\u043b\u0435\u043a\u0441\u04b3\u043e" },
        ],
      },
      {
        id: "public-government",
        label: "\u0411\u0438\u043d\u043e\u04b3\u043e\u04b3\u043e\u0438 \u0434\u0430\u0432\u043b\u0430\u0442\u04e3 \u0432\u0430 \u043b\u043e\u0438\u04b3\u0430\u04b3\u043e\u0438 \u0440\u0430\u0441\u043c\u04e3",
        subcategories: [{ id: "educational", label: "\u0411\u0438\u043d\u043e\u04b3\u043e\u04b3\u043e\u0438 \u0442\u0430\u044a\u043b\u0438\u043c\u04e3" }],
      },
      {
        id: "energy-infrastructure",
        label: "\u041b\u043e\u0438\u04b3\u0430\u04b3\u043e\u0438 \u044d\u043d\u0435\u0440\u0433\u0435\u0442\u0438\u043a\u0430 \u0432\u0430 \u0437\u0435\u0440\u04b3\u0430\u04b3\u0430\u0442\u0438 \u0438\u043d\u0444\u0440\u0430\u0441\u043e\u04b3\u0430",
        subcategories: [
          { id: "power-plants", label: "\u041d\u0438\u0433\u043e\u04b3\u043e\u04b3\u043e\u0438 \u044d\u043b\u0435\u043a\u0442\u0440\u043e\u0441\u0442\u0430\u043d\u0441\u0438\u044f\u04b3\u043e" },
          { id: "infrastructure-facilities", label: "\u0418\u043d\u0444\u0440\u0430\u0441\u043e\u0445\u043e\u0438 \u0441\u043e\u0445\u0442\u0430\u04b3\u043e\u04b3\u043e" },
          { id: "utility-service", label: "\u0411\u0438\u043d\u043e\u04b3\u043e\u04b3\u043e\u0438 \u0442\u0435\u0445\u043d\u0438\u043a\u04e3 \u0432\u0430 \u0445\u0438\u0437\u043c\u0430\u0442\u0440\u0430\u0441\u043e\u043d\u04e3" },
        ],
      },
    ],
  },
  ur: {
    all: "\u062a\u0645\u0627\u0645 \u067e\u0631\u0648\u062c\u06cc\u06a9\u0679\u0633",
    tree: [
      {
        id: "infrastructure-transport",
        label: "\u0628\u0646\u06cc\u0627\u062f\u06cc \u0627\u0648\u0631 \u062a\u0631\u0627\u0646\u0633\u067e\u0648\u0631\u0679",
        subcategories: [
          { id: "passenger-terminals-airport", label: "\u0633\u0641\u0631 \u0679\u0631\u0645\u0646\u0644 \u2014 \u0627\u06cc\u0626\u0631\u067e\u0648\u0631\u0679" },
          { id: "parking", label: "\u067e\u0627\u0631\u06a9\u0646\u06af \u0627\u0648\u0631 \u0627\u06cc\u067e\u0631\u0646 \u0633\u06c1\u0648\u0644\u06cc\u0627\u06ba" },
          { id: "public-building-market", label: "\u0639\u0645\u0627\u0631\u062a\u06cc \u0639\u0645\u0627\u0631\u062a \u2014 \u0645\u0648\u0644\u0679\u06cc \u067e\u0631\u067e\u0632 \u0628\u0627\u0632\u0627\u0631" },
        ],
      },
      {
        id: "industrial",
        label: "\u0635\u0646\u0639\u062a\u06cc \u0639\u0645\u0627\u0631\u0627\u062a \u0627\u0648\u0631 \u0641\u06cc\u06a9\u0691\u0631\u06cc\u0627\u06ba",
        subcategories: [
          { id: "manufacturing", label: "\u0645\u06cc\u0646\u0648\u0641\u06cc\u06a9\u062a\u0631\u06cc \u067e\u0644\u0627\u0646\u0679\u0633" },
          { id: "logistics-warehouses", label: "\u0644\u0627\u062c\u0633\u0679\u06a9\u0633 \u0627\u0648\u0631 \u06af\u0648\u062f\u0627\u0645" },
          { id: "heavy-industry", label: "\u0628\u0627\u0631\u06cc \u0635\u0646\u0639\u062a\u06cc \u0639\u0645\u0627\u0631\u0627\u062a" },
        ],
      },
      {
        id: "healthcare",
        label: "\u0635\u062d\u062a \u06a9\u06cc \u0633\u06c1\u0648\u0644\u06cc\u0627\u06ba",
        subcategories: [
          { id: "city-hospitals", label: "\u0634\u06c1\u0631\u06cc \u0627\u0633\u067e\u062a\u0627\u0644" },
          { id: "state-private-hospitals", label: "\u0633\u0631\u06a9\u0627\u0631\u06cc \u0627\u0648\u0631 \u0646\u062c\u06cc \u0627\u0633\u067e\u062a\u0627\u0644" },
          { id: "healthcare-campuses", label: "\u0635\u062d\u062a \u06a9\u06cc \u06a9\u06cc\u0645\u067e\u0633" },
        ],
      },
      {
        id: "tourism-hospitality",
        label: "\u0633\u06cc\u0627\u062d\u062a \u0627\u0648\u0631 \u0645\u06c1\u0645\u0627\u0646 \u0646\u0648\u0627\u0632\u06cc",
        subcategories: [
          { id: "hotels", label: "\u06c1\u0648\u0679\u0644" },
          { id: "shopping-malls", label: "\u0634\u0627\u067e\u0646\u06af \u0645\u0627\u0644\u0632" },
          { id: "office-buildings", label: "\u0622\u0641\u0633 \u0639\u0645\u0627\u0631\u0627\u062a" },
        ],
      },
      {
        id: "residential-urban",
        label: "\u0631\u06c1\u0627\u0626\u0634\u06cc \u0627\u0648\u0631 \u0634\u06c1\u0631\u06cc \u0628\u062d\u0627\u0644\u06cc \u067e\u0631\u0648\u062c\u06cc\u06a9\u0679\u0633",
        subcategories: [
          { id: "mass-housing", label: "\u0627\u062c\u0645\u0627\u0639\u06cc \u0631\u06c1\u0627\u0626\u0634\u06cc \u067e\u0631\u0648\u062c\u06cc\u06a9\u0679\u0633" },
          { id: "urban-renewal", label: "\u0634\u06c1\u0631\u06cc \u0628\u062d\u0627\u0644\u06cc \u0639\u0644\u0627\u0642\u06d2" },
          { id: "residential-complexes", label: "\u0631\u06c1\u0627\u0626\u0634\u06cc \u0645\u062c\u0645\u0639\u06d2" },
        ],
      },
      {
        id: "public-government",
        label: "\u0639\u0645\u0627\u0631\u062a\u06cc \u0639\u0645\u0627\u0631\u0627\u062a \u0627\u0648\u0631 \u062d\u06a9\u0648\u0645\u062a\u06cc \u067e\u0631\u0648\u062c\u06cc\u06a9\u0679\u0633",
        subcategories: [{ id: "educational", label: "\u062a\u0639\u0644\u06cc\u0645\u06cc \u0639\u0645\u0627\u0631\u0627\u062a" }],
      },
      {
        id: "energy-infrastructure",
        label: "\u062a\u0648\u0644\u06cc\u062f \u0628\u0631\u0642 \u0627\u0648\u0631 \u0628\u0646\u06cc\u0627\u062f\u06cc \u067e\u0631\u0648\u062c\u06cc\u06a9\u0679\u0633",
        subcategories: [
          { id: "power-plants", label: "\u067e\u0627\u0648\u0631 \u067e\u0644\u0627\u0646\u0679\u0633" },
          { id: "infrastructure-facilities", label: "\u0628\u0646\u06cc\u0627\u062f\u06cc \u0633\u06c1\u0648\u0644\u06cc\u0627\u06ba" },
          { id: "utility-service", label: "\u0641\u0646\u06cc \u0627\u0648\u0631 \u0633\u0631\u0648\u0633 \u0639\u0645\u0627\u0631\u0627\u062a" },
        ],
      },
    ],
  },
  zh: {
    all: "\u5168\u90e8\u9879\u76ee",
    tree: [
      {
        id: "infrastructure-transport",
        label: "\u57fa\u7840\u8bbe\u65bd\u4e0e\u4ea4\u901a",
        subcategories: [
          { id: "passenger-terminals-airport", label: "\u65c5\u5ba2\u7ad9\u697c \u2014 \u673a\u573a" },
          { id: "parking", label: "\u505c\u8f66\u573a\u4e0e\u673a\u576a\u533a\u57df" },
          { id: "public-building-market", label: "\u516c\u5171\u5efa\u7b51 \u2014 \u591a\u529f\u80fd\u5e02\u573a" },
        ],
      },
      {
        id: "industrial",
        label: "\u5de5\u4e1a\u8bbe\u65bd\u4e0e\u5de5\u5382",
        subcategories: [
          { id: "manufacturing", label: "\u751f\u4ea7\u8bbe\u65bd" },
          { id: "logistics-warehouses", label: "\u7269\u6d41\u4e0e\u4ed3\u5e93" },
          { id: "heavy-industry", label: "\u91cd\u5de5\u4e1a\u8bbe\u65bd" },
        ],
      },
      {
        id: "healthcare",
        label: "\u533b\u7597\u8bbe\u65bd",
        subcategories: [
          { id: "city-hospitals", label: "\u5e02\u7ea7\u533b\u9662" },
          { id: "state-private-hospitals", label: "\u516c\u7acb\u4e0e\u79c1\u7acb\u533b\u9662" },
          { id: "healthcare-campuses", label: "\u533b\u7597\u56ed\u533a" },
        ],
      },
      {
        id: "tourism-hospitality",
        label: "\u65c5\u6e38\u4e0e\u9152\u5e97",
        subcategories: [
          { id: "hotels", label: "\u9152\u5e97" },
          { id: "shopping-malls", label: "\u8d2d\u7269\u4e2d\u5fc3" },
          { id: "office-buildings", label: "\u529e\u516c\u697c" },
        ],
      },
      {
        id: "residential-urban",
        label: "\u4f4f\u5b85\u4e0e\u57ce\u5e02\u66f4\u65b0\u9879\u76ee",
        subcategories: [
          { id: "mass-housing", label: "\u5927\u89c4\u6a21\u4f4f\u5b85\u9879\u76ee" },
          { id: "urban-renewal", label: "\u57ce\u5e02\u66f4\u65b0\u533a\u57df" },
          { id: "residential-complexes", label: "\u4f4f\u5b85\u7efc\u5408\u4f53" },
        ],
      },
      {
        id: "public-government",
        label: "\u516c\u5171\u5efa\u7b51\u4e0e\u653f\u5e9c\u9879\u76ee",
        subcategories: [{ id: "educational", label: "\u6559\u80b2\u5efa\u7b51" }],
      },
      {
        id: "energy-infrastructure",
        label: "\u80fd\u6e90\u4e0e\u57fa\u7840\u8bbe\u65bd\u9879\u76ee",
        subcategories: [
          { id: "power-plants", label: "\u7535\u529b\u5382" },
          { id: "infrastructure-facilities", label: "\u57fa\u7840\u8bbe\u65bd\u9879\u76ee" },
          { id: "utility-service", label: "\u6280\u672f\u4e0e\u670d\u52a1\u5efa\u7b51" },
        ],
      },
    ],
  },
};

function patchLocale(locale) {
  const labels = LOCALE_CATEGORY_LABELS[locale];
  if (!labels) {
    console.warn("skip (no labels):", locale);
    return;
  }

  const file = path.join(DICT_ROOT, locale, "corporate.json");
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!data.referanslar) {
    console.warn("skip (no referanslar):", locale);
    return;
  }

  data.referanslar.all = labels.all;
  data.referanslar.categoryTree = labels.tree;
  delete data.referanslar.categories;

  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  console.log("patched", locale);
}

const locales = fs
  .readdirSync(DICT_ROOT, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

for (const locale of locales) {
  if (locale === "tr" || locale === "en") continue;
  patchLocale(locale);
}

console.log("done");
