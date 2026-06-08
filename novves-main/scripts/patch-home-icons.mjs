import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");

// Fix Turkish labels in icon-presets.ts
const presetsPath = path.join(ROOT, "src/lib/admin/icon-presets.ts");
let presets = fs.readFileSync(presetsPath, "utf8");
presets = presets.replace(
  /export const CATALOG_ICON_BY_INDEX: AdminIconSlug\[\] = \["document", "list", "folder"\];/,
  `export const CATALOG_ICON_BY_INDEX: AdminIconSlug[] = ["document", "list", "folder"];
export const CERTIFICATE_ICON_BY_INDEX: AdminIconSlug[] = ["certificate", "shield", "star"];
export const PILLAR_JOURNEY_ICON_BY_INDEX: AdminIconSlug[] = ["monitor", "factory", "helmet"];
export const GOAL_PILLAR_ICON_BY_INDEX: AdminIconSlug[] = ["fan", "ahu", "motor", "monitor"];`
);
presets = presets
  .replace('label: "Klasor"', 'label: "Klas\u00f6r"')
  .replace('label: "Yildiz"', 'label: "Y\u0131ld\u0131z"')
  .replace('label: "Hava akisi"', 'label: "Hava ak\u0131\u015f\u0131"')
  .replace('label: "Kalkan / guvenlik"', 'label: "Kalkan / g\u00fcvenlik"');
fs.writeFileSync(presetsPath, presets, "utf8");

// Fix Turkish in icon-field.tsx
const iconFieldPath = path.join(ROOT, "src/components/admin/shared/icon-field.tsx");
let iconField = fs.readFileSync(iconFieldPath, "utf8");
iconField = iconField
  .replace("Ikon secin", "\u0130kon se\u00e7in")
  .replace("Ozel ikon gorseli (opsiyonel, /images/...)", "\u00d6zel ikon g\u00f6rseli (opsiyonel, /images/...)");
fs.writeFileSync(iconFieldPath, iconField, "utf8");

// Add default icon values to tr/home.json
const homeJsonPath = path.join(ROOT, "src/app/[locale]/dictionaries/tr/home.json");
const home = JSON.parse(fs.readFileSync(homeJsonPath, "utf8"));

const catalogIcons = ["document", "list", "folder"];
const certIcons = ["certificate", "shield", "star"];
const pillarIcons = ["monitor", "factory", "helmet"];
const goalIcons = ["fan", "ahu", "motor", "monitor"];

if (Array.isArray(home.catalogPreview)) {
  home.catalogPreview.forEach((item, i) => {
    if (!item.icon) item.icon = catalogIcons[i % catalogIcons.length];
  });
}
if (Array.isArray(home.certificatePreview)) {
  home.certificatePreview.forEach((item, i) => {
    if (!item.icon) item.icon = certIcons[i % certIcons.length];
  });
}
if (Array.isArray(home.pillars)) {
  home.pillars.forEach((item, i) => {
    if (!item.icon) item.icon = pillarIcons[i % pillarIcons.length];
  });
}
if (home.companyProfileSection?.goalsPillars) {
  home.companyProfileSection.goalsPillars.forEach((item, i) => {
    if (!item.icon) item.icon = goalIcons[i % goalIcons.length];
  });
}

fs.writeFileSync(homeJsonPath, JSON.stringify(home, null, 2) + "\n", "utf8");
console.log("patched icon presets, icon-field, and tr/home.json defaults");
