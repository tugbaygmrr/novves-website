import type { Reference } from "@/data/references";
import { references } from "@/data/references";

/** Başlıkta depo / lojistik ipucu — `endustriyel-tesis` içinde referanslar sayfasındaki “Lojistik & depo” örnekleriyle uyum */
const LOGISTICS_IN_TITLE_RE = /DEPO|LOJ[İI]ST|LOJİSTİK|LOJISTIK|WAREHOUSE/i;

/** Konut, AVM, otel vb. — referanslar sayfasındaki yapı sınıfı anahtarlarıyla aynı küme */
const COMMERCIAL_AND_RESIDENTIAL_CLASS_KEYS = new Set([
  "avm",
  "avm-ve-konut",
  "kamu-binasi",
  "konut",
  "otel",
  "otopark",
  "veri-merkezi",
  "villa",
]);

/**
 * Ana sayfadaki `referencePreview` sırası (Sağlık → Lojistik → Ticari/Konut → Endüstriyel+diğer)
 * ile aynı indeks: her referans tam olarak bir gruba düşer.
 */
export function partitionReferenceForHomePreview(ref: Reference): 0 | 1 | 2 | 3 {
  if (ref.classKey === "hastane") return 0;
  if (ref.classKey === "endustriyel-tesis" && LOGISTICS_IN_TITLE_RE.test(ref.title)) return 1;
  if (COMMERCIAL_AND_RESIDENTIAL_CLASS_KEYS.has(ref.classKey)) return 2;
  return 3;
}

export function computeHomeReferencePreviewCounts(refs: readonly Reference[]): number[] {
  const counts = [0, 0, 0, 0] as [number, number, number, number];
  for (const ref of refs) {
    counts[partitionReferenceForHomePreview(ref)] += 1;
  }
  const sum = counts[0] + counts[1] + counts[2] + counts[3];
  if (sum !== refs.length) {
    throw new Error(`home reference preview partition: expected ${refs.length}, got ${sum}`);
  }
  return [...counts];
}

/** `@/data/references` ile anasayfa önizleme kart sayıları — referanslar sayfası veri kaynağıyla aynı */
export function getHomeReferencePreviewCounts(): number[] {
  return computeHomeReferencePreviewCounts(references);
}
