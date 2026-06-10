/** Ürün kategorisi şeridi ikonları — site + admin ortak. */

export const PRODUCT_CATEGORY_ICONS: { value: string; label: string }[] = [
  { value: "wind", label: "Hava akışı" },
  { value: "snowflake", label: "Kar tanesi" },
  { value: "thermo", label: "Sıcaklık" },
  { value: "waves", label: "Dalgalar" },
  { value: "diffuser", label: "Difüzör" },
  { value: "filter", label: "Filtre" },
  { value: "wrench", label: "Anahtar" },
  { value: "chip", label: "Çip / otomasyon" },
  { value: "equalizer", label: "Ekolayzer" },
];

export function ProductCategoryIcon({ name, className }: { name: string; className?: string }) {
  const common = {
    fill: "none" as const,
    stroke: "currentColor" as const,
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
    className,
  };
  switch (name) {
    case "wind":
      return (
        <svg {...common} aria-hidden>
          <path d="M3 8h11a3 3 0 1 0-3-3" />
          <path d="M3 12h16a3 3 0 1 1-3 3" />
          <path d="M3 16h9" />
        </svg>
      );
    case "snowflake":
      return (
        <svg {...common} aria-hidden>
          <path d="M12 3v18" />
          <path d="M3 12h18" />
          <path d="M5.5 5.5l13 13" />
          <path d="M18.5 5.5l-13 13" />
          <path d="M9 5l3 -2 3 2" />
          <path d="M9 19l3 2 3-2" />
        </svg>
      );
    case "thermo":
      return (
        <svg {...common} aria-hidden>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3" />
          <path d="M12 19v3" />
          <path d="M4.2 4.2l2.1 2.1" />
          <path d="M17.7 17.7l2.1 2.1" />
          <path d="M2 12h3" />
          <path d="M19 12h3" />
          <path d="M4.2 19.8l2.1-2.1" />
          <path d="M17.7 6.3l2.1-2.1" />
        </svg>
      );
    case "waves":
      return (
        <svg {...common} aria-hidden>
          <path d="M3 7c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 2-2" />
          <path d="M3 12c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 2-2" />
          <path d="M3 17c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 2-2" />
        </svg>
      );
    case "diffuser":
      return (
        <svg {...common} fill="currentColor" stroke="none" aria-hidden>
          {[5, 12, 19].flatMap((y) =>
            [5, 12, 19].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.3" />),
          )}
        </svg>
      );
    case "filter":
      return (
        <svg {...common} aria-hidden>
          <path d="M3 5h18l-7 9v6l-4-2v-4z" />
        </svg>
      );
    case "wrench":
      return (
        <svg {...common} aria-hidden>
          <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6 2.6 2.6 6-6a4 4 0 0 0 5.4-5.4l-2.3 2.3-2.6-2.6 2.3-2.3z" />
        </svg>
      );
    case "chip":
      return (
        <svg {...common} aria-hidden>
          <rect x="6" y="6" width="12" height="12" rx="1.5" />
          <rect x="9" y="9" width="6" height="6" rx="0.6" />
          <path d="M9 3v3M12 3v3M15 3v3M9 18v3M12 18v3M15 18v3M3 9h3M3 12h3M3 15h3M18 9h3M18 12h3M18 15h3" />
        </svg>
      );
    case "equalizer":
      return (
        <svg {...common} aria-hidden>
          <path d="M6 20V8" />
          <path d="M12 20V4" />
          <path d="M18 20v-8" />
          <circle cx="6" cy="6" r="1.3" />
          <circle cx="12" cy="2.5" r="1.3" />
          <circle cx="18" cy="10" r="1.3" />
        </svg>
      );
    default:
      return null;
  }
}
