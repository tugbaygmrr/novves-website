import Image from "next/image";
import Link from "next/link";
import type { HizmetlerHubCardData } from "@/lib/hizmetler-hub-cards";
import type { HizmetlerNavItem } from "@/lib/hizmetler-nav";

type Props = {
  locale: string;
  navItem: HizmetlerNavItem;
  card: HizmetlerHubCardData;
  label: string;
  detailsLabel: string;
};

function splitTitle(label: string): { main: string; accent: string } {
  const words = label.trim().split(/\s+/);
  if (words.length <= 1) return { main: label, accent: "" };
  const accent = words.pop() ?? "";
  return { main: words.join(" "), accent };
}

export function HizmetlerHubServiceCard({ locale, navItem, card, label, detailsLabel }: Props) {
  const { main, accent } = splitTitle(label);
  const href = `/${locale}${navItem.href}`;

  return (
    <article
      data-search-block
      className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-ink/[0.05] shadow-[0_4px_20px_-12px_rgba(15,22,36,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-16px_rgba(15,22,36,0.25)]"
    >
      <div className="relative h-40 shrink-0 overflow-hidden sm:h-48">
        {card.imageSrc ? (
          <Image
            src={card.imageSrc}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div
            className={`flex h-full w-full items-center justify-center ${
              card.iconVariant === "navy" ? "bg-hz-primary-container" : "bg-[#eceef0]"
            }`}
          >
            <span
              className={`material-symbols-outlined text-7xl ${
                card.iconVariant === "navy" ? "text-white/30" : "text-hz-secondary"
              }`}
            >
              {card.icon ?? navItem.icon}
            </span>
          </div>
        )}
        {card.badge ? (
          <span className="absolute right-4 top-4 rounded bg-[#ffdbd0] px-2 py-1 text-[10px] font-bold uppercase text-[#390c00]">
            {card.badge}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <div className="mb-3 flex items-start gap-2.5 sm:mb-4 sm:gap-3">
          <span className="material-symbols-outlined shrink-0 text-2xl text-hz-secondary sm:text-[26px]">{navItem.icon}</span>
          <h3 className="min-w-0 text-lg font-bold leading-snug text-hz-on-surface sm:text-xl">
            {main}
            {accent ? (
              <>
                {" "}
                <span className="text-hz-secondary">{accent}</span>
              </>
            ) : null}
          </h3>
        </div>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-hz-on-surface-variant sm:mb-6">{card.excerpt}</p>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-hz-outline">{card.category}</span>
          <Link
            href={href}
            className="flex items-center gap-1 text-sm font-bold text-hz-secondary transition-transform group-hover:translate-x-1 sm:shrink-0"
          >
            {detailsLabel}
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
