export type HubTreeRow = {
  key: string;
  slug: string;
  name: string;
  description: string;
  stats?: { value: string; label: string }[];
};

function blurbFromProductBlock(block: Record<string, unknown> | undefined, fallbackName: string): {
  description: string;
  stats?: { value: string; label: string }[];
} {
  if (!block) return { description: fallbackName };
  const heroDesc = typeof block.heroDesc === "string" ? block.heroDesc.trim() : "";
  const heroDescSuffix = typeof block.heroDescSuffix === "string" ? block.heroDescSuffix.trim() : "";
  let description = [heroDesc, heroDescSuffix].filter(Boolean).join(" ").trim();
  if (!description && typeof block.title === "string") description = String(block.title).trim();
  if (!description && Array.isArray(block.pills)) {
    description = (block.pills as unknown[])
      .filter((x): x is string => typeof x === "string")
      .slice(0, 5)
      .join(" · ");
  }
  if (!description) description = fallbackName;

  const statsRaw = block.stats;
  let stats: { value: string; label: string }[] | undefined;
  if (Array.isArray(statsRaw)) {
    const parsed = statsRaw
      .map((x) => {
        if (!x || typeof x !== "object") return null;
        const o = x as Record<string, unknown>;
        if (typeof o.value === "string" && typeof o.label === "string") return { value: o.value, label: o.label };
        return null;
      })
      .filter((x): x is { value: string; label: string } => x !== null)
      .slice(0, 4);
    if (parsed.length) stats = parsed;
  }

  return { description, stats };
}

/** Ürünler hub — kategori anahtarları + sözlükten özet / istatistik */
export function buildProductHubRows(
  products: Record<string, unknown>,
  categories: { key: string; slug: string }[],
  categoryLabels: Record<string, string>,
): HubTreeRow[] {
  return categories.map((cat) => {
    const block = products[cat.key] as Record<string, unknown> | undefined;
    const name = categoryLabels[cat.key] ?? cat.key;
    const { description, stats } = blurbFromProductBlock(block, name);
    return { key: cat.key, slug: cat.slug, name, description, stats };
  });
}

/** Çözümler hub — çözüm anahtarları + sözlükten alt başlık */
export function buildSolutionHubRows(
  solutions: Record<string, unknown>,
  items: { key: string; slug: string }[],
  names: Record<string, string>,
): HubTreeRow[] {
  return items.map((item) => {
    const block = solutions[item.key] as Record<string, unknown> | undefined;
    const name = names[item.key] ?? item.key;
    const subtitle =
      block && typeof block.subtitle === "string" ? String(block.subtitle).trim() : "";
    const description = subtitle || name;
    return { key: item.key, slug: item.slug, name, description };
  });
}
