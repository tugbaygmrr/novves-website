import "server-only";
import fs from "fs";
import path from "path";

export interface CertificateStripCard {
  href: string;
  icon: string;
  iconImage: string;
  image: string;
  title: Record<string, string>;
  description: Record<string, string>;
}

const DATA_PATH = path.join(process.cwd(), "src", "data", "certificate-strip.json");

/** Ana sayfa sertifika kartları — admin yazılabilir JSON'dan. */
export function getCertificateStrip(): CertificateStripCard[] {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    const parsed = JSON.parse(raw) as { cards?: CertificateStripCard[] };
    return Array.isArray(parsed.cards) ? parsed.cards : [];
  } catch {
    return [];
  }
}
