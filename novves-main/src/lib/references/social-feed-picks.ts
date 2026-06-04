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
  { slot: "stats", referenceId: 0, layout: "stats" },
];
