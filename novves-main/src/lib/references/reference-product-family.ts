import type { Reference } from "@/data/references";

/** Canonical product family keys used in reference filters */
export const REFERENCE_PRODUCT_FAMILIES = [
  { id: "dragonfly", label: "Dragonfly" },
  { id: "marlin", label: "Marlin" },
  { id: "koi", label: "Koi" },
  { id: "bear", label: "Bear" },
  { id: "heron", label: "Heron" },
  { id: "fox", label: "Fox" },
  { id: "owl", label: "Owl" },
  { id: "butterfly", label: "Butterfly" },
  { id: "hound", label: "Hound" },
  { id: "caracal", label: "Caracal" },
  { id: "remora", label: "Remora" },
  { id: "turtle", label: "Turtle" },
  { id: "seahorse", label: "Seahorse" },
  { id: "nautilus", label: "Nautilus" },
  { id: "hummingbird", label: "Hummingbird" },
  { id: "hawk", label: "Hawk" },
  { id: "dolphin", label: "Dolphin" },
  { id: "tiger", label: "Tiger" },
  { id: "otomasyon", label: "Otomasyon Pano" },
] as const;

export type ReferenceProductFamilyId = (typeof REFERENCE_PRODUCT_FAMILIES)[number]["id"];

const FAMILY_MATCHERS: { id: ReferenceProductFamilyId; re: RegExp }[] = [
  { id: "dragonfly", re: /dragon\s*fly|dragonfly|jet\s*fan|tfj/i },
  { id: "marlin", re: /marlin|marl[i\u0131]/i },
  { id: "koi", re: /\bkoi\b/i },
  { id: "bear", re: /bear|bea+r/i },
  { id: "heron", re: /heron/i },
  { id: "fox", re: /\bfox\b/i },
  { id: "owl", re: /\bowl\b/i },
  { id: "butterfly", re: /butter\s*fly|butterfly|butterfyl/i },
  { id: "hound", re: /hound/i },
  { id: "caracal", re: /caracal/i },
  { id: "remora", re: /remora/i },
  { id: "turtle", re: /turtle/i },
  { id: "seahorse", re: /seahorse/i },
  { id: "nautilus", re: /nautilus|naut[i\u0131]lus/i },
  { id: "hummingbird", re: /humming\s*bird|hummingbird|humm[i\u0131]ngb/i },
  { id: "hawk", re: /\bhawk\b/i },
  { id: "dolphin", re: /dolphin|dolph[i\u0131]n/i },
  { id: "tiger", re: /\btiger\b/i },
  { id: "otomasyon", re: /otomasyon|otomas/i },
];

const LABEL_BY_ID = Object.fromEntries(
  REFERENCE_PRODUCT_FAMILIES.map((f) => [f.id, f.label]),
) as Record<ReferenceProductFamilyId, string>;

function normalizeProductToken(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u0131\u0130]/g, "i")
    .replace(/\s+/g, " ")
    .trim();
}

/** Map a raw reference product string to a canonical family id. */
export function resolveReferenceProductFamily(productName: string): ReferenceProductFamilyId | null {
  const token = normalizeProductToken(productName);
  if (!token) return null;
  for (const { id, re } of FAMILY_MATCHERS) {
    if (re.test(token)) return id;
  }
  return null;
}

export function referenceHasProductFamily(ref: Reference, familyId: string): boolean {
  if (!familyId) return true;
  return ref.productNames.some((name) => resolveReferenceProductFamily(name) === familyId);
}

export function buildReferenceProductFamilyOptions(
  refs: readonly Reference[],
): { value: string; label: string }[] {
  const counts = new Map<ReferenceProductFamilyId, number>();
  for (const ref of refs) {
    const seen = new Set<ReferenceProductFamilyId>();
    for (const name of ref.productNames) {
      const family = resolveReferenceProductFamily(name);
      if (!family || seen.has(family)) continue;
      seen.add(family);
      counts.set(family, (counts.get(family) ?? 0) + 1);
    }
  }

  return REFERENCE_PRODUCT_FAMILIES.filter((f) => counts.has(f.id))
    .map((f) => ({
      value: f.id,
      label: LABEL_BY_ID[f.id],
      count: counts.get(f.id) ?? 0,
    }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "en"));
}

export function resolveReferenceProductFamilyLabels(ref: Reference): string[] {
  const seen = new Set<ReferenceProductFamilyId>();
  const labels: string[] = [];
  for (const name of ref.productNames) {
    const family = resolveReferenceProductFamily(name);
    if (!family || seen.has(family)) continue;
    seen.add(family);
    labels.push(LABEL_BY_ID[family]);
  }
  return labels;
}
