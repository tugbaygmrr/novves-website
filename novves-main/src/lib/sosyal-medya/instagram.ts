import "server-only";

import type { SosyalMedyaResolvedFeedPost } from "./feed";
import {
  loadInstagramFeedCache,
  resolveInstagramCredentials,
  type InstagramMediaItem,
} from "./instagram-credentials";

const DEFAULT_INSTAGRAM_LIMIT = 6;
const HIDDEN_INSTAGRAM_TERMS = [
  "adana",
  "y\u00FCre\u011Fir",
  "yuregir",
  "3s kale",
  "kale topaz",
  "ad\u0131yaman",
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

function mapInstagramItems(items: InstagramMediaItem[]): SosyalMedyaResolvedFeedPost[] {
  return items
    .filter((item) => !shouldHideInstagramPost(item.caption))
    .map((item, index): SosyalMedyaResolvedFeedPost | null => {
      const image = item.media_type === "VIDEO" ? item.thumbnail_url : item.media_url;
      if (!image) return null;

      return {
        id: `instagram-${item.id}`,
        layout: index === 0 ? "featured" : "square",
        image,
        alt: item.caption ?? "NOVVES Instagram post",
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
}

async function fetchInstagramMedia(
  accessToken: string,
  userId?: string,
): Promise<InstagramMediaItem[]> {
  const fields = "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username";
  const limit = instagramLimit();

  const endpoint = userId
    ? new URL(`https://graph.facebook.com/v21.0/${userId}/media`)
    : new URL("https://graph.instagram.com/me/media");

  endpoint.searchParams.set("fields", fields);
  endpoint.searchParams.set("limit", String(limit));
  endpoint.searchParams.set("access_token", accessToken);

  const response = await fetch(endpoint, {
    next: { revalidate: 60 * 15 },
  });
  if (!response.ok) {
    if (process.env.NODE_ENV === "development") {
      const detail = await response.text().catch(() => "");
      console.warn("[instagram] API request failed:", response.status, detail.slice(0, 200));
    }
    return [];
  }

  const payload = (await response.json()) as { data?: InstagramMediaItem[] };
  return payload.data ?? [];
}

export async function getInstagramFeedPosts(): Promise<SosyalMedyaResolvedFeedPost[]> {
  const credentials = await resolveInstagramCredentials();

  if (credentials) {
    try {
      const items = await fetchInstagramMedia(credentials.accessToken, credentials.userId);
      const posts = mapInstagramItems(items);
      if (posts.length > 0) return posts;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[instagram] Live feed fetch failed:", error);
      }
    }
  } else if (process.env.NODE_ENV === "development") {
    console.warn(
      "[instagram] No INSTAGRAM_ACCESS_TOKEN or admin instagram_access_token — trying cache.",
    );
  }

  return mapInstagramItems(loadInstagramFeedCache());
}
