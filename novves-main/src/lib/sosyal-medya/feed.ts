import { references } from "@/data/references";
import { resolveReferenceImageSrc } from "@/lib/references/resolve-reference-image";
import { SOSYAL_MEDYA_FEED_REFERENCE_PICKS } from "@/lib/references/social-feed-picks";
import { resolveSosyalMedyaFeedPosts } from "./copy";
import type { SosyalMedyaHubJson } from "./copy";
import type { SosyalMedyaFeedPostCopy, SosyalMedyaFeedPostId, SosyalMedyaPlatformId } from "./types";

export type SosyalMedyaFeedLayout = "featured" | "square" | "tall" | "stats";

export type SosyalMedyaFeedItem = {
  id: SosyalMedyaFeedPostId;
  layout: SosyalMedyaFeedLayout;
  image: string;
  year?: string;
  badge?: "featured" | "caseStudy";
  referenceId?: number;
};

export type SosyalMedyaResolvedFeedPost = Omit<SosyalMedyaFeedItem, "id"> &
  SosyalMedyaFeedPostCopy & {
    id: string;
    permalink?: string;
    platformId?: SosyalMedyaPlatformId;
    username?: string;
    timestamp?: string;
  };

const referenceById = new Map(references.map((r) => [r.id, r]));

function buildFeedItems(): SosyalMedyaFeedItem[] {
  return SOSYAL_MEDYA_FEED_REFERENCE_PICKS.map((pick) => {
    if (pick.layout === "stats") {
      return { id: pick.slot, layout: "stats", image: "" };
    }

    const ref = referenceById.get(pick.referenceId);
    if (!ref) {
      return { id: pick.slot, layout: pick.layout, image: "" };
    }

    return {
      id: pick.slot,
      layout: pick.layout,
      image: resolveReferenceImageSrc(ref.image),
      year: ref.year,
      badge: pick.badge,
      referenceId: ref.id,
    };
  });
}

export const SOSYAL_MEDYA_FEED_ITEMS: SosyalMedyaFeedItem[] = buildFeedItems();

const feedPostsEn: Partial<Record<SosyalMedyaFeedPostId, SosyalMedyaFeedPostCopy>> = {
  stats: {
    alt: "",
  },
};

const feedPostsTr: Partial<Record<SosyalMedyaFeedPostId, SosyalMedyaFeedPostCopy>> = {
  stats: {
    alt: "",
  },
};

export function getSosyalMedyaFeedPosts(
  locale: string,
  hub?: SosyalMedyaHubJson,
): SosyalMedyaResolvedFeedPost[] {
  const fromDict = resolveSosyalMedyaFeedPosts(hub, locale);
  const text = fromDict ?? (locale === "tr" ? feedPostsTr : feedPostsEn);

  return SOSYAL_MEDYA_FEED_ITEMS.map((item) => ({
    ...item,
    ...(text[item.id] ?? { alt: "" }),
  }));
}
