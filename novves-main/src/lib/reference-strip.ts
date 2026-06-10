import "server-only";
import fs from "fs";
import path from "path";

export interface ReferenceStripCard {
  href: string;
  theme: string;
  image: string;
  sector: Record<string, string>;
  example: Record<string, string>;
  projectCount: Record<string, string>;
}

export interface ReferenceStrip {
  button: Record<string, string>;
  cards: ReferenceStripCard[];
}

const DATA_PATH = path.join(process.cwd(), "src", "data", "reference-strip.json");

/** Ana sayfa referans sektör kartları — admin yazılabilir JSON'dan. */
export function getReferenceStrip(): ReferenceStrip {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    const parsed = JSON.parse(raw) as Partial<ReferenceStrip>;
    return { button: parsed.button ?? {}, cards: Array.isArray(parsed.cards) ? parsed.cards : [] };
  } catch {
    return { button: {}, cards: [] };
  }
}
