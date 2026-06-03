import type { Metadata } from "next";
import Link from "next/link";
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
  return serviceDetailMetadata(locale, "dumanKontrol");
}

type ApproachSection = {
  sectionLabel: string;
  title: string;
  intro: string;
  items: string[];
  closing?: string;
};

type ScopeSection = {
  sectionLabel: string;
  title: string;
  intro?: string;
  items: string[];
};

type DesignFactors = {
  sectionLabel: string;
  title: string;
  intro?: string;
  paragraphs?: string[];
  items?: string[];
};

export default async function DumanKontrol({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.services.dumanKontrol as typeof dict.services.dumanKontrol & {
    hero: { subtitle?: string };
    approach?: ApproachSection;
    serviceScope?: ScopeSection;
    designFactors: DesignFactors;
    cta: {
      sectionLabel: string;
      title: string;
      subtitle?: string;
      paragraph?: string;
      ctaButton?: string;
      cfdLink?: string;
      supportButton?: string;
    };
    advantages: { subtitle?: string };
  };

  const ctaButton = t.cta.ctaButton ?? t.cta.supportButton ?? "İletişim";
  const ctaSubtitle = [t.cta.subtitle, t.cta.paragraph].filter(Boolean).join(" ");

  return (
    <HizmetlerDetailRoot>
      <HizmetlerPageHero
        badge={t.hero.badge}
        titlePart1={t.hero.titlePart1}
        titleHighlight={t.hero.titleHighlight}
        subtitle={t.hero.subtitle}
        imageSrc={t.hero.imageSrc}
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

      {t.approach ? (
        <HizmetlerPageSection label={t.approach.sectionLabel} title={t.approach.title} variant="white">
          <HizmetlerPageCard className="space-y-5">
            <p className="text-[15px] leading-7 text-hz-on-surface-variant">{t.approach.intro}</p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {t.approach.items.map((item: string) => (
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
            {t.approach.closing ? (
              <p className="text-[15px] leading-7 text-hz-on-surface-variant">{t.approach.closing}</p>
            ) : null}
          </HizmetlerPageCard>
        </HizmetlerPageSection>
      ) : null}

      <HizmetlerPageSection label={t.components.sectionLabel} title={t.components.title}>
        <HizmetlerSteps
          items={t.components.items.map((it: { title: string; text: string }) => ({
            title: it.title,
            desc: it.text,
          }))}
        />
      </HizmetlerPageSection>

      <HizmetlerPageSection
        label={t.advantages.sectionLabel}
        title={t.advantages.title}
        variant="white"
      >
        {t.advantages.subtitle ? (
          <p className="mb-6 max-w-3xl text-[15px] text-hz-on-surface-variant">{t.advantages.subtitle}</p>
        ) : null}
        <HizmetlerFeatureGrid
          items={t.advantages.items.map((adv: { title: string; text: string }) => ({
            title: adv.title,
            desc: adv.text,
          }))}
          cols={3}
        />
      </HizmetlerPageSection>

      <HizmetlerPageSection
        label={t.designFactors.sectionLabel}
        title={t.designFactors.title}
        className="!bg-hz-primary-container [&_h2]:!text-hz-on-primary [&_p]:text-white/85"
      >
        <div className="space-y-5">
          {t.designFactors.intro ? (
            <p className="text-[15px] leading-7 text-white/90">{t.designFactors.intro}</p>
          ) : null}
          {t.designFactors.paragraphs
            ? t.designFactors.paragraphs.map((text: string) => (
                <p key={text.slice(0, 48)} className="text-sm leading-7 text-white/80">
                  {text}
                </p>
              ))
            : t.designFactors.items?.map((text: string) => (
                <div key={text.slice(0, 48)} className="flex items-start gap-3 text-sm leading-7 text-white/75">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-hz-secondary-container" />
                  <span>{text}</span>
                </div>
              ))}
        </div>
      </HizmetlerPageSection>

      {t.serviceScope ? (
        <HizmetlerPageSection label={t.serviceScope.sectionLabel} title={t.serviceScope.title}>
          <HizmetlerPageCard>
            {t.serviceScope.intro ? (
              <p className="mb-6 text-[15px] leading-7 text-hz-on-surface-variant">{t.serviceScope.intro}</p>
            ) : null}
            <ul className="grid gap-2 sm:grid-cols-2">
              {t.serviceScope.items.map((item: string) => (
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

      {t.cta.ctaButton ? (
        <HizmetlerPageCta
          label={t.cta.sectionLabel}
          title={t.cta.title}
          subtitle={ctaSubtitle || undefined}
          phone="+90 216 467 47 52"
          primaryHref={`/${locale}/iletisim`}
          primaryLabel={ctaButton}
          secondaryHref={t.cta.cfdLink ? `/${locale}/hizmetler/cfd-analizi` : undefined}
          secondaryLabel={t.cta.cfdLink}
        />
      ) : (
        <HizmetlerPageSection label={t.cta.sectionLabel} title={t.cta.title}>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {t.cta.cfdLink ? (
              <Link
                href={`/${locale}/hizmetler/cfd-analizi`}
                className="inline-flex items-center justify-center rounded-lg border border-sand-300 bg-white px-6 py-3 text-sm font-semibold text-hz-on-surface hover:border-hz-secondary"
              >
                {t.cta.cfdLink}
              </Link>
            ) : null}
            <Link
              href={`/${locale}/iletisim`}
              className="inline-flex items-center justify-center rounded-lg bg-hz-secondary-container px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
            >
              {t.cta.supportButton}
            </Link>
          </div>
        </HizmetlerPageSection>
      )}
    </HizmetlerDetailRoot>
  );
}
