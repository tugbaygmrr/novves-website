/** Preset icon slugs for admin icon fields (homepage cards, milestones, etc.). */

export type AdminIconSlug =
  | "document"
  | "list"
  | "folder"
  | "fan"
  | "ahu"
  | "motor"
  | "monitor"
  | "factory"
  | "helmet"
  | "chart"
  | "flag"
  | "certificate"
  | "star"
  | "people"
  | "wind"
  | "building"
  | "target"
  | "shield";

export const ADMIN_ICON_PRESETS: { value: AdminIconSlug; label: string }[] = [
  { value: "document", label: "Belge" },
  { value: "list", label: "Liste" },
  { value: "folder", label: "Klasör" },
  { value: "fan", label: "Fan" },
  { value: "ahu", label: "Klima santrali" },
  { value: "motor", label: "Motor" },
  { value: "monitor", label: "Ekran / CFD" },
  { value: "factory", label: "Fabrika" },
  { value: "helmet", label: "Baret / saha" },
  { value: "chart", label: "Grafik" },
  { value: "flag", label: "Bayrak" },
  { value: "certificate", label: "Sertifika" },
  { value: "star", label: "Yıldız" },
  { value: "people", label: "Ekip" },
  { value: "wind", label: "Hava akışı" },
  { value: "building", label: "Bina" },
  { value: "target", label: "Hedef" },
  { value: "shield", label: "Kalkan / güvenlik" },
];

export const ADMIN_ICON_SLUGS = ADMIN_ICON_PRESETS.map((p) => p.value);

export function isAdminIconSlug(value: string): value is AdminIconSlug {
  return (ADMIN_ICON_SLUGS as string[]).includes(value);
}

export const CATALOG_ICON_BY_INDEX: AdminIconSlug[] = ["document", "list", "folder"];
export const CERTIFICATE_ICON_BY_INDEX: AdminIconSlug[] = ["certificate", "shield", "star"];
export const PILLAR_JOURNEY_ICON_BY_INDEX: AdminIconSlug[] = ["monitor", "factory", "helmet"];
export const GOAL_PILLAR_ICON_BY_INDEX: AdminIconSlug[] = ["fan", "ahu", "motor", "monitor"];
