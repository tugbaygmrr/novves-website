/** `/{locale}/cozumler/{slug}` — teknik kütüphane detay sayfası */
export function isSolutionLibraryDetailPath(pathname: string): boolean {
  const segments = pathname.split("/").filter(Boolean);
  const i = segments.indexOf("cozumler");
  if (i === -1) return false;
  return segments.length > i + 1;
}

/** Site navbar (fixed) altında içerik — logo yüksekliğiyle hizalı (pt-28 fazla boşluk bırakıyordu) */
export const SOLUTION_LIBRARY_PAGE_PADDING_TOP =
  "pt-20 sm:pt-24 lg:pt-[6.25rem] xl:pt-[6.75rem] 2xl:pt-[7.75rem]" as const;

/** Masaüstü sol panel: grid stretch yerine self-start + sticky (üstte boş şerit oluşturmaz) */
export const SOLUTION_LIBRARY_DESKTOP_SIDEBAR =
  "lg:sticky lg:top-[6.25rem] lg:z-30 lg:max-h-[calc(100dvh-6.25rem)] lg:overflow-hidden lg:self-start xl:top-[6.75rem] xl:max-h-[calc(100dvh-6.75rem)] 2xl:top-[7.75rem] 2xl:max-h-[calc(100dvh-7.75rem)]" as const;

/** Mobil cekmece konumu — transform dis sarmalayicida, top + bottom */
export const SOLUTION_LIBRARY_MOBILE_DRAWER =
  "top-20 bottom-0 sm:top-24" as const;

export const SOLUTION_LIBRARY_PAGE_X = "px-4 sm:px-6 lg:px-8" as const;
