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
  return serviceDetailMetadata(locale, "bakimPerformans");
}

type ListSection = {
  sectionLabel: string;
  title: string;
  items: string[];
};

function introParagraphs(intro: string | { paragraphs: string[] }): string[] {
  if (typeof intro === "string") return [intro];
  return intro.paragraphs;
}

export default async function BakimPerformansPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.services.bakimPerformans as typeof dict.services.bakimPerformans & {
    intro: string | { paragraphs: string[] };
    serviceScope?: { sectionLabel: string; title: string; items: { title: string; desc: string }[] };
    process?: { sectionLabel: string; title: string; items: { title: string; desc: string }[] };
    whyImportant?: { sectionLabel: string; title: string; items: { title: string; text: string }[] };
    coordination?: { sectionLabel: string; title: string; paragraphs: string[] };
    systemScope?: ListSection;
    cta: { subtitle?: string; paragraph?: string; ctaButton?: string };
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
        <HizmetlerPageCard flat className="space-y-4">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 48)} className="text-[15px] leading-7 text-hz-on-surface-variant">
              {p}
            </p>
          ))}
        </HizmetlerPageCard>
      </HizmetlerPageSection>

      {t.serviceScope ? (
        <HizmetlerPageSection label={t.serviceScope.sectionLabel} title={t.serviceScope.title} variant="white">
          <div className="grid gap-4 sm:grid-cols-2">
            {t.serviceScope.items.map((item: { title: string; desc: string }) => (
              <HizmetlerPageCard key={item.title}>
                <h3 className="flex items-start gap-2.5 font-bold text-hz-on-surface">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-hz-secondary" aria-hidden />
                  {item.title}
                </h3>
                <p className="mt-2 pl-[18px] text-[14px] leading-relaxed text-hz-on-surface-variant">{item.desc}</p>
              </HizmetlerPageCard>
            ))}
          </div>
        </HizmetlerPageSection>
      ) : null}

      {t.process ? (
        <HizmetlerPageSection label={t.process.sectionLabel} title={t.process.title}>
          <HizmetlerSteps items={t.process.items.map((it: { title: string; desc?: string; text?: string }) => ({ title: it.title, desc: it.desc ?? it.text }))} />
        </HizmetlerPageSection>
      ) : t.steps ? (
        <HizmetlerPageSection label={t.steps.sectionLabel} title={t.steps.title}>
          <HizmetlerSteps items={t.steps.items.map((it: { title: string; desc?: string; text?: string }) => ({ title: it.title, desc: it.desc ?? it.text }))} />
        </HizmetlerPageSection>
      ) : null}

      {t.whyImportant ? (
        <HizmetlerPageSection label={t.whyImportant.sectionLabel} title={t.whyImportant.title} variant="white">
          <HizmetlerFeatureGrid items={t.whyImportant.items.map((it: { title: string; desc?: string; text?: string }) => ({ title: it.title, desc: it.desc ?? it.text }))} cols={3} />
        </HizmetlerPageSection>
      ) : t.highlights ? (
        <HizmetlerPageSection label={t.highlights.sectionLabel} title={t.highlights.title} variant="white">
          <HizmetlerFeatureGrid items={t.highlights.items.map((it: { title: string; desc?: string; text?: string }) => ({ title: it.title, desc: it.desc ?? it.text }))} cols={3} />
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
