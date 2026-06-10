import type { AdminIconSlug } from "@/lib/admin/icon-presets";
import { isAdminIconSlug } from "@/lib/admin/icon-presets";

type Props = {
  name?: string;
  /** Custom PNG/SVG path overrides preset */
  image?: string;
  className?: string;
  strokeWidth?: number;
  stroke?: string;
};

function PresetSvg({
  name,
  className,
  strokeWidth = 1.75,
  stroke = "currentColor",
}: {
  name: AdminIconSlug;
  className?: string;
  strokeWidth?: number;
  stroke?: string;
}) {
  const sw = strokeWidth;
  switch (name) {
    case "document":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 3h7l3 3v15a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" />
          <path strokeLinecap="round" d="M14 3v4h4M9 12h6M9 16h6" />
        </svg>
      );
    case "list":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h10M4 18h14" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 10l2 2-2 2" />
        </svg>
      );
    case "folder":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 4h9l3 3v13a1 1 0 01-1 1H6a1 1 0 01-1-1V5a1 1 0 011-1z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 4v4h4M8 14h8M8 18h6" />
        </svg>
      );
    case "fan":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} aria-hidden>
          <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth={sw} />
          <path
            d="M12 12c0-3 1-6 4-7-1 4-2 6-4 7zM12 12c3 0 6 1 7 4-4-1-6-2-7-4zM12 12c0 3-1 6-4 7 1-4 2-6 4-7zM12 12c-3 0-6-1-7-4 4 1 6 2 7 4z"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="1.4" fill={stroke} />
        </svg>
      );
    case "ahu":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} aria-hidden>
          <rect x="3" y="7" width="13" height="10" rx="1.5" stroke={stroke} strokeWidth={sw} />
          <path d="M6 10c1.5-1 3 0 4.5-1M6 14c1.5 1 3 0 4.5 1" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
          <path d="M18 9.5h3M18 12h3M18 14.5h3" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      );
    case "motor":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} aria-hidden>
          <rect x="4" y="8" width="12" height="8" rx="1" stroke={stroke} strokeWidth={sw} />
          <path d="M6 8V6M9 8V6M12 8V6M14 8V6M6 18v-2M9 18v-2M12 18v-2M14 18v-2" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
          <path d="M16 12h4" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
          <circle cx="21" cy="12" r="1.4" stroke={stroke} strokeWidth={sw} />
        </svg>
      );
    case "monitor":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} aria-hidden>
          <rect x="3" y="4" width="18" height="13" rx="1.5" stroke={stroke} strokeWidth={sw} />
          <path d="M6 14c2-1 3-4 5-4s3 3 5 1 2-4 2-4" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 21h6M12 17v4" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      );
    case "factory":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} aria-hidden>
          <path d="M2 20h20" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
          <path d="M3 20V9l5 3V9l5 3V9l8 4v7" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
          <path d="M8 15v2M13 15v2M18 16v2" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      );
    case "helmet":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} aria-hidden>
          <path d="M3 18h18v-2a3 3 0 00-3-3h-1V9a5 5 0 00-10 0v4H6a3 3 0 00-3 3v2z" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
          <path d="M12 4v2M3 18h21" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      );
    case "chart":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} aria-hidden>
          <path d="M4 20V10M10 20V4M16 20v-8M22 20H2" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      );
    case "flag":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} aria-hidden>
          <path d="M5 21V4M5 4h12l-2 3 2 3H5" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
        </svg>
      );
    case "certificate":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} aria-hidden>
          <circle cx="12" cy="8" r="5" stroke={stroke} strokeWidth={sw} />
          <path d="M8.5 14L7 21l5-2.5L17 21l-1.5-7" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
        </svg>
      );
    case "star":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} aria-hidden>
          <path d="M12 3l2.4 5.8H21l-4.8 3.5 1.8 5.7L12 16.8 6 18l1.8-5.7L3 8.8h6.6L12 3z" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
        </svg>
      );
    case "people":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} aria-hidden>
          <circle cx="9" cy="8" r="3" stroke={stroke} strokeWidth={sw} />
          <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
          <circle cx="17" cy="9" r="2.5" stroke={stroke} strokeWidth={sw} />
          <path d="M15 20c.3-2.2 1.8-4 4-4" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      );
    case "wind":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} aria-hidden>
          <path d="M4 8h11a3 3 0 100-6H13M4 16h13a3 3 0 110 6h-2M6 12h15" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      );
    case "building":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} aria-hidden>
          <rect x="5" y="3" width="14" height="18" rx="1" stroke={stroke} strokeWidth={sw} />
          <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      );
    case "target":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} aria-hidden>
          <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth={sw} />
          <circle cx="12" cy="12" r="4" stroke={stroke} strokeWidth={sw} />
          <path d="M12 3v2M12 19v2M3 12h2M19 12h2" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      );
    case "shield":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} aria-hidden>
          <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
          <path d="M9 12l2 2 4-4" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "team":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="7.2" r="2.5" />
          <path d="M6.8 18v-.7a5.2 5.2 0 0 1 10.4 0v.7" />
          <circle cx="5.2" cy="9.8" r="1.9" />
          <path d="M2.2 17.6v-.5a3.4 3.4 0 0 1 3-3.38" />
          <circle cx="18.8" cy="9.8" r="1.9" />
          <path d="M21.8 17.6v-.5a3.4 3.4 0 0 0-3-3.38" />
        </svg>
      );
    case "globe":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <ellipse cx="12" cy="12" rx="4" ry="9" />
        </svg>
      );
    case "box":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <path d="M3.3 7.2 12 12l8.7-4.8" />
          <path d="M12 22V12" />
        </svg>
      );
    case "industry":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M2 20V8.5a1 1 0 0 1 1.6-.8L9 12V8.5a1 1 0 0 1 1.6-.8L16 12V4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v16" />
          <path d="M2 20h20" />
          <path d="M6 16h1" />
          <path d="M11 16h1" />
          <path d="M17 16h1" />
        </svg>
      );
    case "pinwheel":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z" />
          <circle cx="12" cy="12" r="1.1" />
        </svg>
      );
    case "snowflake":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 2v20" />
          <path d="M3.5 7.5l17 9" />
          <path d="M20.5 7.5l-17 9" />
          <path d="M9 3.5l3 2.5 3-2.5" />
          <path d="M9 20.5l3-2.5 3 2.5" />
          <path d="M3 9.5l2.6 1.5L3 12.5" />
          <path d="M21 9.5l-2.6 1.5L21 12.5" />
        </svg>
      );
    default:
      return null;
  }
}

export function HomeContentIcon({ name, image, className = "h-5 w-5", strokeWidth, stroke }: Props) {
  if (image?.trim().startsWith("/images/")) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={image} alt="" className={className} />;
  }
  const slug = name && isAdminIconSlug(name) ? name : "document";
  return <PresetSvg name={slug} className={className} strokeWidth={strokeWidth} stroke={stroke} />;
}
