import "server-only";

import type { SosyalMedyaResolvedFeedPost } from "./feed";

type InstagramMediaResponse = {
  data?: InstagramMediaItem[];
};

type InstagramMediaItem = {
  id: string;
  caption?: string;
  media_type?: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  permalink?: string;
  thumbnail_url?: string;
  timestamp?: string;
  username?: string;
};

const DEFAULT_INSTAGRAM_LIMIT = 6;
const HIDDEN_INSTAGRAM_TERMS = [
  "adana",
  "yüreğir",
  "yuregir",
  "3s kale",
  "kale topaz",
  "adıyaman",
  "adiyaman",
  "otopark",
  "2m",
  "lojistik",
  "aselsan",
  "konya",
];

function instagramLimit(): number {
  const value = Number.parseInt(process.env.INSTAGRAM_POST_LIMIT ?? "", 10);
  if (!Number.isFinite(value)) return DEFAULT_INSTAGRAM_LIMIT;
  return Math.min(Math.max(value, 1), 12);
}

function titleFromCaption(caption?: string): string {
  if (!caption) return "NOVVES";
  const firstLine = caption.split(/\r?\n/).find((line) => line.trim().length > 0)?.trim();
  if (!firstLine) return "NOVVES";
  return firstLine.replace(/^#+\s*/, "").slice(0, 70);
}

function shouldHideInstagramPost(caption?: string): boolean {
  const normalized = caption?.toLocaleLowerCase("tr-TR") ?? "";
  return HIDDEN_INSTAGRAM_TERMS.some((term) => normalized.includes(term));
}

export async function getInstagramFeedPosts(): Promise<SosyalMedyaResolvedFeedPost[]> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!accessToken) return [];

  const endpoint = new URL("https://graph.instagram.com/me/media");
  endpoint.searchParams.set("fields", "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username");
  endpoint.searchParams.set("limit", String(instagramLimit()));
  endpoint.searchParams.set("access_token", accessToken);

  try {
    const response = await fetch(endpoint, {
      next: { revalidate: 60 * 15 },
    });
    if (!response.ok) return [];

    const payload = (await response.json()) as InstagramMediaResponse;
    return (payload.data ?? [])
      .filter((item) => !shouldHideInstagramPost(item.caption))
      .map((item, index): SosyalMedyaResolvedFeedPost | null => {
        const image = item.media_type === "VIDEO" ? item.thumbnail_url : item.media_url;
        if (!image) return null;

        return {
          id: `instagram-${item.id}`,
          layout: index === 0 ? "featured" : "square",
          image,
          alt: item.caption ?? "NOVVES Instagram paylaşımı",
          title: titleFromCaption(item.caption),
          description: item.caption,
          badge: index === 0 ? "featured" : undefined,
          permalink: item.permalink,
          platformId: "instagram",
          username: item.username,
          timestamp: item.timestamp,
        };
      })
      .filter((item): item is SosyalMedyaResolvedFeedPost => item !== null);
  } catch {
    return [];
  }
}
