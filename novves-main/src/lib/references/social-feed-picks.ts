import type { SosyalMedyaFeedPostId } from "@/lib/sosyal-medya/types";
import type { SosyalMedyaFeedLayout } from "@/lib/sosyal-medya/feed";

/** Sosyal medya ızgarası — referanslar.ts içindeki proje kimlikleri */
export type SocialFeedReferencePick = {
  slot: SosyalMedyaFeedPostId;
  referenceId: number;
  layout: SosyalMedyaFeedLayout;
  badge?: "featured" | "caseStudy";
};

export const SOSYAL_MEDYA_FEED_REFERENCE_PICKS: SocialFeedReferencePick[] = [
  { slot: "featured", referenceId: 1, layout: "featured", badge: "featured" },
  { slot: "square-1", referenceId: 11, layout: "square" },
  { slot: "square-2", referenceId: 2, layout: "square" },
  { slot: "tall", referenceId: 3, layout: "tall", badge: "caseStudy" },
  { slot: "stats", referenceId: 0, layout: "stats" },
  { slot: "square-3", referenceId: 4, layout: "square" },
];
