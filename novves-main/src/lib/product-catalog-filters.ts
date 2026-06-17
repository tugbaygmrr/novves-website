import type { ProductCatalogItem } from "@/lib/product-catalog";

export const FAMILY_SERIES_KEY_SEP = "\u001e";

export function formatProductFamilySeriesLabel(name: string, type: string): string {
  const family =
    name.length > 0 && name === name.toUpperCase()
      ? name.charAt(0) + name.slice(1).toLowerCase()
      : name;
  const series = type.trim();
  if (!series || series === name) return family;
  return `${family} - ${series}`;
}

export function familySeriesKey(name: string, type: string): string {
  return `${name}${FAMILY_SERIES_KEY_SEP}${type}`;
}

export function parseFamilySeriesKey(key: string): { name: string; type: string } | null {
  const index = key.indexOf(FAMILY_SERIES_KEY_SEP);
  if (index === -1) return null;
  return { name: key.slice(0, index), type: key.slice(index + 1) };
}

export function buildProductFamilySeriesOptions(
  products: readonly ProductCatalogItem[],
): { value: string; label: string }[] {
  const seen = new Set<string>();
  const options: { value: string; label: string }[] = [];

  for (const product of products) {
    const value = familySeriesKey(product.name, product.type);
    if (seen.has(value)) continue;
    seen.add(value);
    options.push({
      value,
      label: formatProductFamilySeriesLabel(product.name, product.type),
    });
  }

  return options.sort((a, b) => a.label.localeCompare(b.label, "tr"));
}
