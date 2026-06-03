/** `/{locale}/cozumler/{slug}` — teknik kütüphane detay sayfası */
export function isSolutionLibraryDetailPath(pathname: string): boolean {
  const segments = pathname.split("/").filter(Boolean);
  const i = segments.indexOf("cozumler");
  if (i === -1) return false;
  return segments.length > i + 1;
}

/** Site navbar (fixed) altında içerik başlangıcı */
export const SOLUTION_LIBRARY_PAGE_PADDING_TOP = "pt-20 sm:pt-24 lg:pt-28" as const;

/** Mobil çekmece: site navbar altından */
export const SOLUTION_LIBRARY_MOBILE_DRAWER =
  "top-20 h-[calc(100vh-5rem)] sm:top-24 sm:h-[calc(100vh-6rem)] lg:top-28 lg:h-[calc(100vh-7rem)]" as const;

export const SOLUTION_LIBRARY_PAGE_X = "px-4 sm:px-6 lg:px-8" as const;
