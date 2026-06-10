import "server-only";
import fs from "fs";
import path from "path";

export interface SolutionStripCard {
  href: string;
  hero: string;
  thumbnails: string[];
}

const DATA_PATH = path.join(process.cwd(), "src", "data", "solution-strip.json");

/** Çözüm şeridi kartları (sıra + görseller) — admin yazılabilir JSON'dan. */
export function getSolutionStrip(): SolutionStripCard[] {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    const parsed = JSON.parse(raw) as { cards?: SolutionStripCard[] };
    return Array.isArray(parsed.cards) ? parsed.cards : [];
  } catch {
    return [];
  }
}
