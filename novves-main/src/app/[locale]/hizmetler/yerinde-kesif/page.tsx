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
  return serviceDetailMetadata(locale, "yerindeKesif");
}

function introParagraphs(intro: string | { paragraphs: string[] }): string[] {
  if (typeof intro === "string") return [intro];
  return intro.paragraphs;
}

type ListSection = { sectionLabel: string; title: string; items: string[] };

export default async function YerindeKesif({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.services.yerindeKesif as typeof dict.services.yerindeKesif & {
    scope?: ListSection;
    projectTypes?: ListSection;
    hero: { imageSrc?: string };
  };

  const paragraphs = introParagraphs(t.intro);

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
        <HizmetlerPageCard flat className="space-y-4">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 48)} className="text-[15px] leading-7 text-hz-on-surface-variant">
              {p}
            </p>
          ))}
        </HizmetlerPageCard>
      </HizmetlerPageSection>

      {t.scope ? (
        <HizmetlerPageSection label={t.scope.sectionLabel} title={t.scope.title} variant="white">
          <HizmetlerPageCard>
            <ul className="grid gap-2 sm:grid-cols-2">
              {t.scope.items.map((item: string) => (
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
          </HizmetlerPageCard>
        </HizmetlerPageSection>
      ) : null}

      <HizmetlerPageSection label={t.steps.sectionLabel} title={t.steps.title}>
        <HizmetlerSteps items={t.steps.items.map((it: { title: string; desc?: string; text?: string }) => ({ title: it.title, desc: it.desc ?? it.text }))} />
      </HizmetlerPageSection>

      <HizmetlerPageSection
        label={t.whyImportant.sectionLabel}
        title={t.whyImportant.title}
        variant="white"
      >
        <HizmetlerFeatureGrid items={t.whyImportant.items.map((it: { title: string; desc?: string; text?: string }) => ({ title: it.title, desc: it.desc ?? it.text }))} cols={3} />
      </HizmetlerPageSection>

      {t.projectTypes ? (
        <HizmetlerPageSection label={t.projectTypes.sectionLabel} title={t.projectTypes.title}>
          <HizmetlerPageCard>
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {t.projectTypes.items.map((item: string) => (
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

      <HizmetlerPageCta
        label={t.cta.sectionLabel}
        title={t.cta.title}
        subtitle={t.cta.subtitle}
        phone="+90 216 467 47 52"
        primaryHref={`/${locale}/iletisim`}
        primaryLabel={t.cta.ctaButton}
      />
    </HizmetlerDetailRoot>
  );
}
