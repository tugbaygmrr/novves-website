/**
 * Ürün ailesi için products.json’dan kısa açıklama (ürün kataloğu kartları vb.).
 * Önce kart görseliyle eşleşen model açıklaması, yoksa aile intro’su, o da yoksa ilk model açıklaması.
 */

const FAMILY_NAME_TO_PRODUCTS_SECTION: Record<string, string> = {
  DRAGONFLY: "dumanIsiTahliyeFanlari",
  HOUND: "damperler",
  MARLIN: "kovanTipiAksiyalFanlar",
  BEAR: "exproofFanlar",
  NAUTILUS: "endustriyelFanlar",
  HUMMINGBIRD: "ecFanlar",
  HERON: "catiFanlari",
  OWL: "duvarTipiFanlar",
  SEAHORSE: "banyoFanlari",
  KOI: "kanalFanlari",
  TURTLE: "hucreliFanlar",
  TIGER: "klimaSantralleri",
  DOLPHIN: "havuzNemAlmaSantrali",
  BUTTERFLY: "mutfakFanlari",
  FOX: "siginakFanlari",
};

type ModelRow = { image?: string; description?: string };

type ProductSection = {
  intro?: string;
  models?: unknown[];
};

function trimStr(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export function getProductFamilyPageBlurb(
  productsDict: Record<string, unknown> | null | undefined,
  productName: string,
  productImage: string
): string | undefined {
  if (!productsDict || typeof productsDict !== "object") return undefined;
  const sectionKey = FAMILY_NAME_TO_PRODUCTS_SECTION[productName.trim().toUpperCase()];
  if (!sectionKey) return undefined;

  const raw = productsDict[sectionKey];
  if (!raw || typeof raw !== "object") return undefined;
  const section = raw as ProductSection;

  const intro = trimStr(section.intro);
  const models = Array.isArray(section.models) ? section.models : [];

  const image = typeof productImage === "string" ? productImage.trim() : "";
  if (image) {
    for (const row of models) {
      if (!row || typeof row !== "object") continue;
      const m = row as ModelRow;
      if (m.image === image) {
        const d = trimStr(m.description);
        if (d) return d;
      }
    }
  }

  if (intro) return intro;

  for (const row of models) {
    if (!row || typeof row !== "object") continue;
    const d = trimStr((row as ModelRow).description);
    if (d) return d;
  }

  return undefined;
}
