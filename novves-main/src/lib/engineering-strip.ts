import "server-only";
import fs from "fs";
import path from "path";

type LMap = Record<string, string>;

export interface EngineeringStripBox {
  href: string;
  icon: string;
  iconImage: string;
  image: string;
  videoSrc: string;
  videoPoster: string;
  title: LMap;
  description: LMap;
}

export interface EngineeringStripHeader {
  eyebrow: LMap;
  title: LMap;
  lead: LMap;
  sidebarCardTitle: LMap;
  sidebarCardDesc: LMap;
  cardCta: LMap;
  mainCta: LMap;
}

export interface EngineeringStrip {
  header: EngineeringStripHeader;
  boxes: EngineeringStripBox[];
}

const DATA_PATH = path.join(process.cwd(), "src", "data", "engineering-strip.json");

const EMPTY_HEADER: EngineeringStripHeader = {
  eyebrow: {},
  title: {},
  lead: {},
  sidebarCardTitle: {},
  sidebarCardDesc: {},
  cardCta: {},
  mainCta: {},
};

/** Ana sayfa "Mühendislikten Sahaya" şeridi — admin yazılabilir JSON'dan. */
export function getEngineeringStrip(): EngineeringStrip {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    const parsed = JSON.parse(raw) as Partial<EngineeringStrip>;
    return {
      header: { ...EMPTY_HEADER, ...(parsed.header ?? {}) },
      boxes: Array.isArray(parsed.boxes) ? parsed.boxes : [],
    };
  } catch {
    return { header: EMPTY_HEADER, boxes: [] };
  }
}
