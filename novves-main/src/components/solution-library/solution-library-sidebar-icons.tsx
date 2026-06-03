import Image from "next/image";
import { cozumlerIconMap } from "@/components/cozumler-icons";
import type { SolutionLibrarySidebarIcon } from "@/lib/solution-library";

/** Navbar / çözümler hub ile aynı Fernus 3D ikon seti */
export function SolutionLibraryCozumIcon({
  slug,
  className = "h-[22px] w-[22px] shrink-0",
}: {
  slug: string;
  className?: string;
}) {
  const Icon = cozumlerIconMap[slug];
  if (Icon) {
    return <span className="inline-flex shrink-0">{Icon({ className })}</span>;
  }
  return (
    <Image
      src={`/images/solution-icons/${slug}.svg`}
      alt=""
      width={22}
      height={22}
      className={`${className} object-contain`}
    />
  );
}

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Mockup: kalkan içinde artı — Yangın Algılama */
export function IconSidebarShieldPlus({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden {...strokeProps}>
      <path d="M12 3.25 18.5 6v5.2c0 4.55-2.76 8.8-6.5 10.3-3.74-1.5-6.5-5.75-6.5-10.3V6L12 3.25z" />
      <path d="M12 9.25v5.5M9.25 12h5.5" />
    </svg>
  );
}

/** Mockup: dişli rozet içinde onay — Gaz Algılama */
export function IconSidebarBadgeCheck({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden {...strokeProps}>
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

/** Mockup: saat + geri ok — Arşiv Kayıtları */
export function IconSidebarHistory({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden {...strokeProps}>
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

export function SolutionLibrarySidebarRelatedIcon({
  icon,
  className = "h-5 w-5 shrink-0 text-ink/80",
}: {
  icon: SolutionLibrarySidebarIcon;
  className?: string;
}) {
  if (icon === "fire") return <IconSidebarShieldPlus className={className} />;
  if (icon === "gas") return <IconSidebarBadgeCheck className={className} />;
  return <IconSidebarHistory className={className} />;
}
