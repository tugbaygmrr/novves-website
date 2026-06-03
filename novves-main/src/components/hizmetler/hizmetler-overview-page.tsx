import Link from "next/link";
import type { ReactNode } from "react";
import {
  HIZMETLER_HUB_CARDS_FALLBACK,
  buildHizmetlerHubCards,
  type HizmetlerHubCardCopy,
} from "@/lib/hizmetler-hub-cards";
import {
  HIZMETLER_NAV_ITEMS,
  getHizmetlerNavLabel,
  type HizmetlerNavItem,
} from "@/lib/hizmetler-nav";
import { HizmetlerHubServiceCard } from "./hizmetler-hub-service-card";
import {
  HizmetlerPageCard,
  HizmetlerPageHero,
  HizmetlerPageSection,
} from "./hizmetler-page-ui";

export type HizmetlerOverviewContent = {
  hero: {
    badge: string;
    titlePart1: string;
    titleHighlight?: string;
    subtitle?: string;
    imageSrc?: string;
  };
  intro: { paragraphs: string[] };
  engineeringApproach: {
    sectionLabel?: string;
    title: string;
    paragraphs: string[];
  };
  serviceScope: {
    sectionLabel?: string;
    title: string;
    intro: string;
  };
  lifecycle: {
    sectionLabel?: string;
    title: string;
    paragraph: string;
  };
  applicationAreas: {
    sectionLabel?: string;
    title: string;
    intro: string;
    items: string[];
  };
  whyNovves: {
    sectionLabel?: string;
    title: string;
    paragraphs: string[];
  };
  servicesGrid: {
    sectionLabel?: string;
    title: string;
    detailsLabel?: string;
  };
  hubCards?: HizmetlerHubCardCopy[];
  cta: {
    sectionLabel?: string;
    title: string;
    paragraphs: string[];
    ctaButton: string;
  };
};

type Props = {
  locale: string;
  content: HizmetlerOverviewContent;
  navLabels: Record<string, string>;
};

function Prose({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-[15px] leading-7 text-hz-on-surface-variant ${className}`}>{children}</p>
  );
}

function navItemBySlug(slug: string): HizmetlerNavItem | undefined {
  return HIZMETLER_NAV_ITEMS.find((item) => item.href === `/hizmetler/${slug}`);
}

export function HizmetlerOverviewPage({ locale, content, navLabels }: Props) {
  const t = content;
  const serviceItems = HIZMETLER_NAV_ITEMS.filter((item) => item.id !== "overview" && item.href && !item.disabled);
  const detailsLabel = t.servicesGrid.detailsLabel ?? "Detayları İncele";
  const hubCards = buildHizmetlerHubCards(t.hubCards ?? HIZMETLER_HUB_CARDS_FALLBACK);

  return (
    <div id="hizmetler-hub-root" className="min-w-0 overflow-x-hidden bg-sand-200 text-hz-on-surface">
      <HizmetlerPageHero
        badge={t.hero.badge}
        titlePart1={t.hero.titlePart1}
        titleHighlight={t.hero.titleHighlight}
        subtitle={t.hero.subtitle}
        imageSrc={t.hero.imageSrc}
      />

      {/* Stitch tarzı kart grid — hero hemen altında */}
      <div className="bg-sand-200 px-4 pb-4 pt-6 sm:px-6 sm:pt-8 lg:px-12 lg:pt-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 sm:mb-8">
          <div className="min-w-0">
            <h2 className="text-2xl font-black tracking-tight text-hz-on-surface sm:text-3xl">{t.servicesGrid.title}</h2>
            <div className="mt-2 h-1 w-16 bg-hz-secondary sm:w-20" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
          {hubCards.map((card) => {
            const navItem = navItemBySlug(card.slug);
            if (!navItem) return null;
            return (
              <HizmetlerHubServiceCard
                key={card.slug}
                locale={locale}
                navItem={navItem}
                card={card}
                label={getHizmetlerNavLabel(navItem.labelKey, navLabels)}
                detailsLabel={detailsLabel}
              />
            );
          })}
        </div>
      </div>

      <HizmetlerPageSection>
        <HizmetlerPageCard flat className="space-y-5">
          {t.intro.paragraphs.map((p) => (
            <Prose key={p.slice(0, 48)}>{p}</Prose>
          ))}
        </HizmetlerPageCard>
      </HizmetlerPageSection>

      <HizmetlerPageSection
        label={t.engineeringApproach.sectionLabel}
        title={t.engineeringApproach.title}
        variant="white"
      >
        <HizmetlerPageCard flat className="space-y-4">
          {t.engineeringApproach.paragraphs.map((p) => (
            <Prose key={p.slice(0, 48)}>{p}</Prose>
          ))}
        </HizmetlerPageCard>
      </HizmetlerPageSection>

      <HizmetlerPageSection label={t.serviceScope.sectionLabel} title={t.serviceScope.title}>
        <HizmetlerPageCard flat>
          <Prose className="mb-8">{t.serviceScope.intro}</Prose>
          <ul className="grid gap-x-8 sm:grid-cols-2">
            {serviceItems.map((item, i) => (
              <li key={item.id}>
                <Link
                  href={`/${locale}${item.href}`}
                  className="group flex items-baseline gap-3 border-t border-sand-300/60 py-3 text-hz-on-surface transition-colors hover:text-hz-secondary"
                >
                  <span className="text-sm font-black tabular-nums text-hz-secondary/40 transition-colors group-hover:text-hz-secondary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium">{getHizmetlerNavLabel(item.labelKey, navLabels)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </HizmetlerPageCard>
      </HizmetlerPageSection>

      <HizmetlerPageSection label={t.lifecycle.sectionLabel} title={t.lifecycle.title} variant="white">
        <HizmetlerPageCard flat>
          <Prose>{t.lifecycle.paragraph}</Prose>
        </HizmetlerPageCard>
      </HizmetlerPageSection>

      <HizmetlerPageSection label={t.applicationAreas.sectionLabel} title={t.applicationAreas.title}>
        <HizmetlerPageCard flat>
          <Prose className="mb-8">{t.applicationAreas.intro}</Prose>
          <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.applicationAreas.items.map((area: string, i: number) => (
              <li key={area} className="flex items-baseline gap-3 border-t border-sand-300/60 pt-3">
                <span className="text-sm font-black tabular-nums text-hz-secondary/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-medium text-hz-on-surface">{area}</span>
              </li>
            ))}
          </ul>
        </HizmetlerPageCard>
      </HizmetlerPageSection>

      <HizmetlerPageSection label={t.whyNovves.sectionLabel} title={t.whyNovves.title} variant="white">
        <HizmetlerPageCard flat className="space-y-4">
          {t.whyNovves.paragraphs.map((p) => (
            <Prose key={p.slice(0, 48)}>{p}</Prose>
          ))}
        </HizmetlerPageCard>
      </HizmetlerPageSection>

      {/* Stitch tarzı alt CTA */}
      <section data-search-block className="bg-sand-200 px-4 pb-12 pt-4 sm:px-6 sm:pb-16 lg:px-12">
        <div className="flex flex-col items-stretch gap-6 sm:gap-8 lg:flex-row lg:items-center">
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-extrabold tracking-tight text-hz-on-surface sm:text-2xl lg:text-3xl">{t.cta.title}</h2>
            <div className="mt-3 space-y-3 sm:mt-4">
              {t.cta.paragraphs.map((p) => (
                <Prose key={p.slice(0, 48)}>{p}</Prose>
              ))}
            </div>
            <Link
              href={`/${locale}/iletisim`}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-hz-secondary-container px-6 py-3.5 text-sm font-bold text-hz-on-primary shadow-sm transition-all hover:opacity-90 active:scale-[0.98] sm:mt-8 sm:w-auto sm:px-8 sm:py-4"
            >
              <span className="material-symbols-outlined text-lg">calendar_today</span>
              {t.cta.ctaButton}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
