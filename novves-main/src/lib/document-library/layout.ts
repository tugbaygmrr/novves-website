/** Site navbar (fixed) altında içerik — katalog / çözüm kütüphanesi ile aynı */
export const DOCUMENT_LIBRARY_PAGE_PADDING_TOP = "pt-20 sm:pt-24 lg:pt-28" as const;

/** Mobil / tablet çekmece: navbar altından, güvenli alan dahil */
export const DOCUMENT_LIBRARY_MOBILE_DRAWER =
  "top-20 h-[calc(100dvh-5rem)] max-h-[calc(100dvh-5rem)] sm:top-24 sm:h-[calc(100dvh-6rem)] sm:max-h-[calc(100dvh-6rem)] lg:top-28 lg:h-[calc(100dvh-7rem)] lg:max-h-[calc(100dvh-7rem)] pb-[env(safe-area-inset-bottom)]" as const;

export const DOCUMENT_LIBRARY_PAGE_X = "px-3 sm:px-4 md:px-6" as const;

/** Dokunmatik hedef minimum yükseklik */
export const DOCUMENT_LIBRARY_TOUCH_TARGET = "min-h-[44px] min-w-[44px]" as const;
