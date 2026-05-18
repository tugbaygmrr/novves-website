/** Ürünler hub kart verisi — kategori PNG'si, ikon anahtarı, alt ürün ailesi listesi */
export type ProductHubCard = {
  key: string;
  slug: string;
  name: string;
  imageSrc: string;
  iconKey: string;
  families: string[];
  familyOverflow: number;
};

const ICON_BY_KEY: Record<string, string> = {
  havaHareketi: "wind",
  iklimlendirme: "snowflake",
  sogutmaVeIsitma: "thermo",
  havaYonetimi: "waves",
  havaDagitimi: "diffuser",
  havaFiltrasyonu: "filter",
  aksesuarlar: "wrench",
  otomasyonMalzemeleri: "chip",
  titresimVeSesIzolasyon: "equalizer",
};

const MAX_FAMILIES = 10;

function pickFamilies(block: Record<string, unknown> | undefined): string[] {
  if (!block) return [];
  const out: string[] = [];

  // 1) products[] varsa type alanını al (yoksa name); comingSoon olanlar da listelensin (gri değil — ekran tasarımında ayırt yok)
  const products = block.products;
  if (Array.isArray(products)) {
    for (const p of products) {
      if (!p || typeof p !== "object") continue;
      const o = p as Record<string, unknown>;
      const type = typeof o.type === "string" ? o.type.trim() : "";
      const name = typeof o.name === "string" ? o.name.trim() : "";
      const label = type || name;
      if (label) out.push(label.endsWith("Ailesi") ? label : `${label} Ailesi`);
    }
  }

  // 2) accessories[] varsa name alanını al
  const accessories = block.accessories;
  if (Array.isArray(accessories)) {
    for (const a of accessories) {
      if (!a || typeof a !== "object") continue;
      const o = a as Record<string, unknown>;
      const name = typeof o.name === "string" ? o.name.trim() : "";
      if (name) out.push(name);
    }
  }

  // 3) Tek-anahtar (tiger/dolphin/caracal/hound/alpaca/scallop/roo) blokları
  for (const v of Object.values(block)) {
    if (!v || typeof v !== "object" || Array.isArray(v)) continue;
    const o = v as Record<string, unknown>;
    const label = typeof o.label === "string" ? o.label.trim() : "";
    if (label && !out.includes(label)) out.push(label);
  }

  return out;
}

export function buildProductHubCards(
  products: Record<string, unknown>,
  categories: { key: string; slug: string }[],
  categoryLabels: Record<string, string>,
): ProductHubCard[] {
  return categories.map((cat) => {
    const block = products[cat.key] as Record<string, unknown> | undefined;
    const name = categoryLabels[cat.key] ?? cat.key;
    const families = pickFamilies(block);
    const visible = families.slice(0, MAX_FAMILIES);
    const familyOverflow = Math.max(0, families.length - visible.length);
    return {
      key: cat.key,
      slug: cat.slug,
      name,
      imageSrc: `/images/products/categories/${cat.slug}-card-hero.png`,
      iconKey: ICON_BY_KEY[cat.key] ?? "wind",
      families: visible,
      familyOverflow,
    };
  });
}
