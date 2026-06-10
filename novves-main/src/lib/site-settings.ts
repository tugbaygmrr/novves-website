import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";

/** Site ayarlarını okur (istek içinde memoize; DB erişilemezse boş döner). */
export const getSiteSettings = cache(async (): Promise<Record<string, string>> => {
  try {
    const rows = await prisma.siteSetting.findMany();
    const m: Record<string, string> = {};
    for (const r of rows) if (typeof r.value === "string") m[r.key] = r.value;
    return m;
  } catch {
    return {};
  }
});
