/** Stitch sidebar — proje sınıfı grupları */
export type ReferanslarCategoryId = "all" | "industrial" | "residential" | "special";

const INDUSTRIAL_CLASS_KEYS = new Set([
  "endustriyel-tesis",
  "fabrika",
  "enerji-santrali",
  "tersane",
  "altyapi",
]);

const RESIDENTIAL_CLASS_KEYS = new Set(["konut", "villa", "avm", "otel", "avm-ve-konut"]);

export function referanslarCategoryForClassKey(classKey: string): ReferanslarCategoryId {
  if (INDUSTRIAL_CLASS_KEYS.has(classKey)) return "industrial";
  if (RESIDENTIAL_CLASS_KEYS.has(classKey)) return "residential";
  return "special";
}

export function matchesReferanslarCategory(classKey: string, category: ReferanslarCategoryId): boolean {
  if (category === "all") return true;
  return referanslarCategoryForClassKey(classKey) === category;
}
