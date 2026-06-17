import "server-only";

import path from "node:path";
import { prisma } from "@/lib/prisma";
import { hasDatabaseUrl, isDatabaseUnavailable } from "@/lib/prisma-database";
import { readJsonFile } from "@/lib/read-json-file";

export type InstagramCredentials = {
  accessToken: string;
  userId?: string;
};

const SETTING_KEYS = ["instagram_access_token", "instagram_user_id"] as const;

function settingString(value: unknown): string | undefined {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }
  return undefined;
}

export async function resolveInstagramCredentials(): Promise<InstagramCredentials | null> {
  const envToken = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
  const envUserId = process.env.INSTAGRAM_USER_ID?.trim();
  if (envToken) {
    return { accessToken: envToken, userId: envUserId || undefined };
  }

  if (!hasDatabaseUrl()) return null;

  try {
    const rows = await prisma.siteSetting.findMany({
      where: { key: { in: [...SETTING_KEYS] } },
      select: { key: true, value: true },
    });
    const byKey = new Map(rows.map((row) => [row.key, row.value]));
    const accessToken = settingString(byKey.get("instagram_access_token"));
    if (!accessToken) return null;
    const userId = settingString(byKey.get("instagram_user_id"));
    return { accessToken, userId };
  } catch (error) {
    if (process.env.NODE_ENV === "development" && isDatabaseUnavailable(error)) {
      console.warn("[instagram] Site settings unavailable (DATABASE_URL missing or DB down).");
    }
    return null;
  }
}

export type InstagramFeedCacheFile = {
  syncedAt?: string;
  posts?: InstagramMediaItem[];
};

export type InstagramMediaItem = {
  id: string;
  caption?: string;
  media_type?: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  permalink?: string;
  thumbnail_url?: string;
  timestamp?: string;
  username?: string;
};

export function instagramFeedCachePath(): string {
  return path.join(process.cwd(), "data", "sosyal-medya", "instagram-feed.json");
}

export function loadInstagramFeedCache(): InstagramMediaItem[] {
  try {
    const payload = readJsonFile<InstagramFeedCacheFile>(instagramFeedCachePath());
    return Array.isArray(payload.posts) ? payload.posts : [];
  } catch {
    return [];
  }
}
