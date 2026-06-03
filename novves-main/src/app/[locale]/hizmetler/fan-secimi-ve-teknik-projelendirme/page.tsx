import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HizmetlerDetailRoot } from "@/components/hizmetler/hizmetler-detail-root";
import {
  HizmetlerFeatureGrid,
  HizmetlerPageCard,
  HizmetlerPageCta,
  HizmetlerPageHero,
  HizmetlerPageSection,
  HizmetlerSteps,
} from "@/components/hizmetler/hizmetler-page-ui";
import { getDictionary, hasLocale } from "../../dictionaries";
import { serviceDetailMetadata } from "@/lib/i18n-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return serviceDetailMetadata(locale, "fanSecimi");
}

type TextSection = {
  sectionLabel: string;
  title: string;
  paragraphs: string[];
};

type ListSection = {
  sectionLabel: string;
  title: string;
  intro?: string;
  items: string[];
};

function introParagraphs(intro: string | { paragraphs: string[] }): string[] {
  if (typeof intro === "string") return [intro];
  return intro.paragraphs;
}

function ProseBlock({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-4">
      {paragraphs.map((p) => (
        <p key={p.slice(0, 48)} className="text-[15px] leading-7 text-hz-on-surface-variant">
          {p}
        </p>
      ))}
    </div>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2 rounded-lg border border-sand-300/40 bg-sand-200/40 px-3 py-2.5 text-sm text-hz-on-surface"
        >
          <span className="material-symbols-outlined mt-0.5 shrink-0 text-base text-hz-secondary">
            check_circle
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function DotList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center gap-2 rounded-lg border border-sand-300/40 bg-sand-200/50 px-3 py-2.5 text-sm font-medium text-hz-on-surface"
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-hz-secondary" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function FanSecimiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.services.fanSecimi as typeof dict.services.fanSecimi & {
    intro: string | { paragraphs: string[] };
    technicalOffice?: TextSection;
    perfectusAir?: TextSection;
    selectionCriteria?: ListSection;
    engineeringScope?: ListSection;
    projectTypes?: ListSection;
    benefits?: ListSection;
    cta: {
      sectionLabel: string;
      title: string;
      subtitle?: string;
      paragraph?: string;
      ctaButton?: string;
    };
    steps?: { sectionLabel: string; title: string; items: { title: string; desc: string }[] };
    highlights?: { sectionLabel: string; title: string; items: { title: string; desc: string }[] };
  };

  const paragraphs = introParagraphs(t.intro);
  const ctaSubtitle = [t.cta.subtitle, t.cta.paragraph].filter(Boolean).join(" ");

  return (
    <HizmetlerDetailRoot>
      <HizmetlerPageHero
        badge={t.hero.badge}
        titlePart1={t.hero.titlePart1}
        titleHighlight={t.hero.titleHighlight}
        subtitle={t.hero.subtitle}
        imageSrc={t.hero.imageSrc}
      />

      <HizmetlerPageSection>
        <HizmetlerPageCard flat>
          <ProseBlock paragraphs={paragraphs} />
        </HizmetlerPageCard>
      </HizmetlerPageSection>

      {t.technicalOffice ? (
        <HizmetlerPageSection
          label={t.technicalOffice.sectionLabel}
          title={t.technicalOffice.title}
          variant="white"
        >
          <HizmetlerPageCard flat>
            <ProseBlock paragraphs={t.technicalOffice.paragraphs} />
          </HizmetlerPageCard>
        </HizmetlerPageSection>
      ) : null}

      {t.perfectusAir ? (
        <HizmetlerPageSection label={t.perfectusAir.sectionLabel} title={t.perfectusAir.title}>
          <HizmetlerPageCard className="ring-1 ring-hz-secondary/10">
            <ProseBlock paragraphs={t.perfectusAir.paragraphs} />
          </HizmetlerPageCard>
        </HizmetlerPageSection>
      ) : null}

      {t.selectionCriteria ? (
        <HizmetlerPageSection
          label={t.selectionCriteria.sectionLabel}
          title={t.selectionCriteria.title}
          variant="white"
        >
          <HizmetlerPageCard>
            {t.selectionCriteria.intro ? (
              <p className="mb-4 text-[15px] leading-7 text-hz-on-surface-variant">
                {t.selectionCriteria.intro}
              </p>
            ) : null}
            <CheckList items={t.selectionCriteria.items} />
          </HizmetlerPageCard>
        </HizmetlerPageSection>
      ) : null}

      {t.engineeringScope ? (
        <HizmetlerPageSection label={t.engineeringScope.sectionLabel} title={t.engineeringScope.title}>
          <HizmetlerPageCard>
            {t.engineeringScope.intro ? (
              <p className="mb-4 text-[15px] leading-7 text-hz-on-surface-variant">
                {t.engineeringScope.intro}
              </p>
            ) : null}
            <CheckList items={t.engineeringScope.items} />
          </HizmetlerPageCard>
        </HizmetlerPageSection>
      ) : null}

      {t.projectTypes ? (
        <HizmetlerPageSection
          label={t.projectTypes.sectionLabel}
          title={t.projectTypes.title}
          variant="white"
        >
          <HizmetlerPageCard>
            {t.projectTypes.intro ? (
              <p className="mb-4 text-[15px] leading-7 text-hz-on-surface-variant">{t.projectTypes.intro}</p>
            ) : null}
            <DotList items={t.projectTypes.items} />
          </HizmetlerPageCard>
        </HizmetlerPageSection>
      ) : null}

      {!t.technicalOffice && t.steps ? (
        <HizmetlerPageSection label={t.steps.sectionLabel} title={t.steps.title} variant="white">
          <HizmetlerSteps items={t.steps.items.map((it: { title: string; desc: string }) => ({ title: it.title, desc: it.desc }))} />
        </HizmetlerPageSection>
      ) : null}

      {!t.technicalOffice && t.highlights ? (
        <HizmetlerPageSection label={t.highlights.sectionLabel} title={t.highlights.title}>
          <HizmetlerFeatureGrid items={t.highlights.items.map((it: { title: string; desc: string }) => ({ title: it.title, desc: it.desc }))} cols={3} />
        </HizmetlerPageSection>
      ) : null}

      {t.benefits ? (
        <HizmetlerPageSection
          label={t.benefits.sectionLabel}
          title={t.benefits.title}
          className="!bg-hz-primary-container [&_h2]:!text-hz-on-primary"
        >
          {t.benefits.intro ? (
            <p className="mb-6 max-w-3xl text-[15px] leading-7 text-hz-on-primary-container">
              {t.benefits.intro}
            </p>
          ) : null}
          <div className="grid gap-3 sm:grid-cols-2">
            {t.benefits.items.map((item: string) => (
              <div key={item} className="flex items-start gap-3 text-sm text-white/80">
                <span className="mt-0.5 shrink-0 text-hz-secondary-container">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </HizmetlerPageSection>
      ) : null}

      <HizmetlerPageCta
        label={t.cta.sectionLabel}
        title={t.cta.title}
        subtitle={ctaSubtitle || undefined}
        phone="+90 216 467 47 52"
        primaryHref={`/${locale}/iletisim`}
        primaryLabel={t.cta.ctaButton ?? "İletişim"}
      />
    </HizmetlerDetailRoot>
  );
}
