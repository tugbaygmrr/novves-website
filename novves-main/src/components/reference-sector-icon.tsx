/** Referans sektör kartı ikonları (tema bazlı) — site + admin ortak. */

export type ReferenceSectorTheme = "orange" | "sky" | "emerald" | "zinc";

export const REFERENCE_SECTOR_THEMES: { value: ReferenceSectorTheme; label: string }[] = [
  { value: "orange", label: "Turuncu — Konfor (kalp)" },
  { value: "sky", label: "Mavi — Kurumsal (bina)" },
  { value: "emerald", label: "Yeşil — Konut (ev)" },
  { value: "zinc", label: "Gri — Endüstri (tesis)" },
];

export function ReferenceSectorIcon({
  theme,
  className = "h-7 w-7 text-white",
}: {
  theme: ReferenceSectorTheme;
  className?: string;
}) {
  const sw = 1.65;
  switch (theme) {
    case "orange":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      );
    case "sky":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 10h16v8H4v-8z" />
          <path strokeLinecap="round" d="M8 10V7a4 4 0 018 0v3M6 18h12" />
        </svg>
      );
    case "emerald":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 21h12M6 21V8l6-4 6 4v13" />
          <path strokeLinecap="round" d="M9 13h2M13 13h2M9 17h6" />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 21h16M4 21V10l4-2 2 2V8l4-2 4 2v13" />
          <path strokeLinecap="round" d="M10 8V5h4v3M14 5v3" />
        </svg>
      );
  }
}
