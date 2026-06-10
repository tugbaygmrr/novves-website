import "server-only";
import fs from "fs";
import path from "path";

export interface ProductStripCard {
  slug: string;
  href: string;
  icon: string;
  image: string;
  title: Record<string, string>;
  description: Record<string, string>;
  features: Record<string, string[]>;
}

const DATA_PATH = path.join(process.cwd(), "src", "data", "product-strip.json");

/** Ana sayfa ürün kategorileri şeridi — admin yazılabilir JSON'dan. */
export function getProductStrip(): ProductStripCard[] {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    const parsed = JSON.parse(raw) as { cards?: ProductStripCard[] };
    return Array.isArray(parsed.cards) ? parsed.cards : [];
  } catch {
    return [];
  }
}
