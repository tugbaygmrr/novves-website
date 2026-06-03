import { references } from "@/data/references";
import { resolveReferenceImageSrc } from "@/lib/references/resolve-reference-image";
import { SOSYAL_MEDYA_FEED_REFERENCE_PICKS } from "@/lib/references/social-feed-picks";
import { resolveSosyalMedyaFeedPosts } from "./copy";
import type { SosyalMedyaHubJson } from "./copy";
import type { SosyalMedyaFeedPostCopy, SosyalMedyaFeedPostId } from "./types";

export type SosyalMedyaFeedLayout = "featured" | "square" | "tall" | "stats";

export type SosyalMedyaFeedItem = {
  id: SosyalMedyaFeedPostId;
  layout: SosyalMedyaFeedLayout;
  image: string;
  year?: string;
  badge?: "featured" | "caseStudy";
  referenceId?: number;
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

const feedPostsEn: Record<SosyalMedyaFeedPostId, SosyalMedyaFeedPostCopy> = {
  featured: {
    alt: "2M Logistics Gebze warehouse — Novves jet fan system",
    title: "2M LOGISTICS GEBZE",
    titleLine2: "WAREHOUSE",
    description: "Jet fan smoke control and ventilation solutions engineered and supplied by NOVVES.",
    likes: "2.4k",
    comments: "184",
  },
  "square-1": {
    alt: "ASELSAN Konya industrial facility ventilation project",
    title: "ASELSAN KONYA",
    likes: "842",
    comments: "32",
  },
  "square-2": {
    alt: "3S Kale Topaz residential project in Zeytinburnu",
    title: "3S KALE TOPAZ",
    likes: "1.2k",
    comments: "56",
  },
  tall: {
    alt: "Adana Yüreğir 100-bed hospital — smoke and heat exhaust",
    title: "ADANA YÜREĞİR HOSPITAL",
    likes: "560",
    comments: "21",
  },
  stats: {
    alt: "",
  },
  "square-3": {
    alt: "Adıyaman Municipality multi-storey car park ventilation",
    title: "ADIYAMAN CAR PARK",
    likes: "430",
    comments: "18",
  },
};

const feedPostsTr: Record<SosyalMedyaFeedPostId, SosyalMedyaFeedPostCopy> = {
  featured: {
    alt: "2M Lojistik Gebze depo — Novves jet fan sistemi",
    title: "2M LOJİSTİK",
    titleLine2: "GEBZE DEPO",
    description:
      "Jet fan duman kontrolü ve havalandırma çözümleri NOVVES mühendisliği ile sahada.",
    likes: "2,4 B",
    comments: "184",
  },
  "square-1": {
    alt: "ASELSAN Konya endüstriyel tesis havalandırma projesi",
    title: "ASELSAN KONYA",
    likes: "842",
    comments: "32",
  },
  "square-2": {
    alt: "3S Kale Topaz Zeytinburnu konut projesi",
    title: "3S KALE TOPAZ",
    likes: "1,2 B",
    comments: "56",
  },
  tall: {
    alt: "Adana Yüreğir 100 yataklı hastane duman tahliye",
    title: "ADANA YÜREĞİR HASTANE",
    likes: "560",
    comments: "21",
  },
  stats: {
    alt: "",
  },
  "square-3": {
    alt: "Adıyaman Belediyesi katlı otopark havalandırma projesi",
    title: "ADIYAMAN OTOPARK",
    likes: "430",
    comments: "18",
  },
};

export function getSosyalMedyaFeedPosts(
  locale: string,
  hub?: SosyalMedyaHubJson,
): Array<SosyalMedyaFeedItem & SosyalMedyaFeedPostCopy & { badge?: "featured" | "caseStudy" }> {
  const fromDict = resolveSosyalMedyaFeedPosts(hub, locale);
  const text = fromDict ?? (locale === "tr" ? feedPostsTr : feedPostsEn);

  return SOSYAL_MEDYA_FEED_ITEMS.map((item) => ({
    ...item,
    ...text[item.id],
  }));
}
