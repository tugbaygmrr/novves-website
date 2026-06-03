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
  return serviceDetailMetadata(locale, "devreAlma");
}

type ServiceStep =
  | { step: string; phase: string }
  | { title: string; desc: string };

type ListSection = {
  sectionLabel: string;
  title: string;
  items: string[];
};

export default async function DevreyeAlma({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.services.devreAlma as typeof dict.services.devreAlma & {
    hero: { imageSrc?: string };
    systemScope?: ListSection;
    coordination?: { sectionLabel: string; title: string; paragraphs: string[] };
    cta: { ctaButton?: string; contactForm: string; subtitle?: string };
  };

  const ctaLabel = t.cta.ctaButton ?? t.cta.contactForm;

  return (
    <HizmetlerDetailRoot>
      <HizmetlerPageHero
        badge={t.hero.badge}
        titlePart1={t.hero.titlePart1}
        titleHighlight={t.hero.titleHighlight}
        subtitle={t.hero.subtitle}
        imageSrc={t.hero.imageSrc ?? "/images/page-hero/cozumler-main.jpg"}
        stats={t.hero.stats}
      />

      <HizmetlerPageSection>
        <HizmetlerPageCard flat>
          <div className="space-y-4 text-[15px] leading-7 text-hz-on-surface-variant">
            {t.intro.map((p: string) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
          </div>
        </HizmetlerPageCard>
      </HizmetlerPageSection>

      <HizmetlerPageSection label={t.serviceSteps.sectionLabel} title={t.serviceSteps.title} variant="white">
        <HizmetlerSteps
          items={t.serviceSteps.items.map((it: ServiceStep) =>
            "title" in it ? { title: it.title, desc: it.desc } : { title: it.phase, desc: it.step }
          )}
        />
      </HizmetlerPageSection>

      <HizmetlerPageSection label={t.whyImportant.sectionLabel} title={t.whyImportant.title}>
        <HizmetlerFeatureGrid
          items={t.whyImportant.items.map((it: { title: string; text: string }) => ({ title: it.title, desc: it.text }))}
          cols={3}
        />
      </HizmetlerPageSection>

      {t.systemScope ? (
        <HizmetlerPageSection label={t.systemScope.sectionLabel} title={t.systemScope.title} variant="white">
          <HizmetlerPageCard>
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {t.systemScope.items.map((item: string) => (
                <li
                  key={item}
                  className="flex items-center gap-2 rounded-lg border border-sand-300/40 bg-sand-200/50 px-3 py-2.5 text-sm font-medium text-hz-on-surface"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-hz-secondary" />
                  {item}
                </li>
              ))}
            </ul>
          </HizmetlerPageCard>
        </HizmetlerPageSection>
      ) : null}

      {t.coordination ? (
        <HizmetlerPageSection label={t.coordination.sectionLabel} title={t.coordination.title}>
          <HizmetlerPageCard flat className="space-y-4">
            {t.coordination.paragraphs.map((p: string) => (
              <p key={p.slice(0, 48)} className="text-[15px] leading-7 text-hz-on-surface-variant">
                {p}
              </p>
            ))}
          </HizmetlerPageCard>
        </HizmetlerPageSection>
      ) : null}

      <HizmetlerPageCta
        label={t.cta.sectionLabel}
        title={t.cta.title}
        subtitle={t.cta.subtitle}
        phone="+90 216 467 47 52"
        primaryHref={`/${locale}/iletisim`}
        primaryLabel={ctaLabel}
      />
    </HizmetlerDetailRoot>
  );
}
