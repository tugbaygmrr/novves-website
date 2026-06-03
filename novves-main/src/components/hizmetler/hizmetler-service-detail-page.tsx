import { HizmetlerDetailRoot } from "@/components/hizmetler/hizmetler-detail-root";
import {
  HizmetlerPageCard,
  HizmetlerPageCta,
  HizmetlerPageHero,
  HizmetlerPageSection,
} from "@/components/hizmetler/hizmetler-page-ui";

type StepItem = { title: string; desc: string };
type CardItem = { title: string; desc: string };

export type HizmetlerServicePageContent = {
  hero: {
    badge: string;
    titlePart1: string;
    titleHighlight?: string;
    subtitle?: string;
    imageSrc?: string;
  };
  intro: string;
  steps?: { sectionLabel: string; title: string; items: StepItem[] };
  highlights?: { sectionLabel: string; title: string; items: CardItem[] };
  cta: {
    sectionLabel: string;
    title: string;
    subtitle?: string;
    ctaButton: string;
  };
};

type Props = {
  locale: string;
  content: HizmetlerServicePageContent;
};

export function HizmetlerServiceDetailPage({ locale, content }: Props) {
  const { hero, intro, steps, highlights, cta } = content;

  return (
    <HizmetlerDetailRoot>
      <HizmetlerPageHero
        badge={hero.badge}
        titlePart1={hero.titlePart1}
        titleHighlight={hero.titleHighlight}
        subtitle={hero.subtitle}
        imageSrc={hero.imageSrc}
      />

      <HizmetlerPageSection>
        <HizmetlerPageCard>
          <p className="text-[15px] leading-7 text-hz-on-surface-variant">{intro}</p>
        </HizmetlerPageCard>
      </HizmetlerPageSection>

      {steps ? (
        <HizmetlerPageSection label={steps.sectionLabel} title={steps.title}>
          <div className="space-y-4">
            {steps.items.map((step, i) => (
              <HizmetlerPageCard key={step.title} className="!p-5">
                <div className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-hz-secondary-container/15 text-xs font-bold text-hz-secondary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-bold text-hz-on-surface">{step.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-hz-on-surface-variant">{step.desc}</p>
                  </div>
                </div>
              </HizmetlerPageCard>
            ))}
          </div>
        </HizmetlerPageSection>
      ) : null}

      {highlights ? (
        <HizmetlerPageSection label={highlights.sectionLabel} title={highlights.title}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.items.map((item) => (
              <HizmetlerPageCard key={item.title}>
                <h3 className="font-bold text-hz-on-surface">{item.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-hz-on-surface-variant">{item.desc}</p>
              </HizmetlerPageCard>
            ))}
          </div>
        </HizmetlerPageSection>
      ) : null}

      <HizmetlerPageCta
        label={cta.sectionLabel}
        title={cta.title}
        subtitle={cta.subtitle}
        phone="+90 216 467 47 52"
        primaryHref={`/${locale}/iletisim`}
        primaryLabel={cta.ctaButton}
      />
    </HizmetlerDetailRoot>
  );
}
