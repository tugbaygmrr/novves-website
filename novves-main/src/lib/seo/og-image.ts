import { getSiteUrl } from "@/lib/seo/metadata";

export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

/** Strip trailing " | Novves" from page titles for OG card text. */
export function ogTitleFromPageTitle(title: string): string {
  const trimmed = title.trim();
  return trimmed.replace(/\s*\|\s*Novves\s*$/i, "").trim() || "NOVVES";
}

/** Dynamic OG PNG at /og?title=... (1200x630). */
export function buildOgImageUrl(title: string): string {
  const siteUrl = getSiteUrl();
  const params = new URLSearchParams({
    title: ogTitleFromPageTitle(title).slice(0, 140),
  });
  return `${siteUrl}/og?${params.toString()}`;
}

export function buildOgImageMetadata(title: string) {
  const alt = ogTitleFromPageTitle(title);
  return {
    url: buildOgImageUrl(title),
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
    alt,
    type: "image/png" as const,
  };
}

export function buildTwitterImageMetadata(title: string) {
  return {
    card: "summary_large_image" as const,
    title: ogTitleFromPageTitle(title),
    images: [buildOgImageUrl(title)],
  };
}
