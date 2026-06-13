import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const dictDir = path.join(root, "src/app/[locale]/dictionaries");

const TABLE = {
  tr: {
    image: "G\u00f6rsel",
    sector: "Sekt\u00f6r",
    buildingType: "Yap\u0131 T\u00fcr\u00fc",
    projectName: "Proje Ad\u0131",
    productsUsed: "Kullan\u0131lan \u00dcr\u00fcnler",
    productFamilies: "\u00dcr\u00fcn Ailesi Adlar\u0131",
    country: "\u00dclke",
  },
  en: {
    image: "Image",
    sector: "Sector",
    buildingType: "Building Type",
    projectName: "Project Name",
    productsUsed: "Products Used",
    productFamilies: "Product Family Names",
    country: "Country",
  },
  de: {
    image: "Bild",
    sector: "Sektor",
    buildingType: "Gebaudetyp",
    projectName: "Projektname",
    productsUsed: "Verwendete Produkte",
    productFamilies: "Produktfamiliennamen",
    country: "Land",
  },
  fr: {
    image: "Image",
    sector: "Secteur",
    buildingType: "Type de batiment",
    projectName: "Nom du projet",
    productsUsed: "Produits utilises",
    productFamilies: "Noms des familles de produits",
    country: "Pays",
  },
  ru: {
    image: "\u0418\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435",
    sector: "\u0421\u0435\u043a\u0442\u043e\u0440",
    buildingType: "\u0422\u0438\u043f \u0437\u0434\u0430\u043d\u0438\u044f",
    projectName: "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043f\u0440\u043e\u0435\u043a\u0442\u0430",
    productsUsed: "\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u043c\u044b\u0435 \u043f\u0440\u043e\u0434\u0443\u043a\u0442\u044b",
    productFamilies: "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u044f \u043f\u0440\u043e\u0434\u0443\u043a\u0442\u043e\u0432\u044b\u0445 \u0441\u0435\u043c\u0435\u0439\u0441\u0442\u0432",
    country: "\u0421\u0442\u0440\u0430\u043d\u0430",
  },
  ar: {
    image: "\u0627\u0644\u0635\u0648\u0631\u0629",
    sector: "\u0627\u0644\u0642\u0637\u0627\u0639",
    buildingType: "\u0646\u0648\u0639 \u0627\u0644\u0645\u0628\u0646\u0649",
    projectName: "\u0627\u0633\u0645 \u0627\u0644\u0645\u0634\u0631\u0648\u0639",
    productsUsed: "\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645\u0629",
    productFamilies: "\u0623\u0633\u0645\u0627\u0621 \u0639\u0627\u0626\u0644\u0629 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a",
    country: "\u0627\u0644\u0628\u0644\u062f",
  },
};

for (const locale of fs.readdirSync(dictDir)) {
  const file = path.join(dictDir, locale, "corporate.json");
  if (!fs.existsSync(file)) continue;
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!data.referanslar) continue;
  data.referanslar.table = TABLE[locale] ?? TABLE.en;
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  console.log("patched", locale);
}

console.log("done");
