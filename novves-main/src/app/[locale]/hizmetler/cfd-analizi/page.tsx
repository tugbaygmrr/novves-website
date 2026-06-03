import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HizmetlerDetailRoot } from "@/components/hizmetler/hizmetler-detail-root";
import {
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
  return serviceDetailMetadata(locale, "cfdAnalizi");
}

const accentMap = [
  { accent: "border-l-[#1d2f4d]", badge: "bg-[#1d2f4d]/12 text-[#1d2f4d]" },
  { accent: "border-l-hz-secondary", badge: "bg-hz-secondary/12 text-hz-secondary" },
  { accent: "border-l-[#2f3f58]", badge: "bg-[#2f3f58]/12 text-[#2f3f58]" },
  { accent: "border-l-[#334866]", badge: "bg-[#334866]/12 text-[#334866]" },
  { accent: "border-l-[#6b7280]", badge: "bg-[#6b7280]/12 text-[#4b5563]" },
  { accent: "border-l-[#1d2f4d]", badge: "bg-[#1d2f4d]/12 text-[#1d2f4d]" },
  { accent: "border-l-hz-secondary", badge: "bg-hz-secondary/12 text-hz-secondary" },
];

type WhyCfdItem = string | { title: string; desc: string };

type ListSection = {
  sectionLabel: string;
  title: string;
  intro?: string;
  items: string[];
};

function introParagraphs(intro: string | string[]): string[] {
  if (typeof intro === "string") return [intro];
  return intro;
}

export default async function CfdAnalizi({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.services.cfdAnalizi as typeof dict.services.cfdAnalizi & {
    projectTypes?: ListSection;
    process?: { sectionLabel: string; title: string; items: { title: string; desc: string }[] };
    whyCfd: {
      intro?: string;
      items: WhyCfdItem[];
      resultLabel: string;
      resultText: string;
    };
    benefits: {
      intro?: string;
      items: string[];
      quote?: string;
      ctaPrimary?: string;
      ctaSecondary?: string;
    };
    cta?: {
      sectionLabel: string;
      title: string;
      subtitle?: string;
      paragraph?: string;
      ctaButton?: string;
      secondaryLink?: string;
    };
  };

  const paragraphs = introParagraphs(t.intro);
  const ctaSubtitle = t.cta
    ? [t.cta.subtitle, t.cta.paragraph].filter(Boolean).join(" ")
    : undefined;

  return (
    <HizmetlerDetailRoot>
      <HizmetlerPageHero
        badge={t.hero.badge}
        titlePart1={t.hero.titlePart1}
        titleHighlight={t.hero.titleHighlight}
        subtitle={t.hero.subtitle}
        imageSrc="/images/page-hero/cfd.jpg"
        stats={t.hero.stats}
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

      <HizmetlerPageSection label={t.whyCfd.sectionLabel} title={t.whyCfd.title} variant="white">
        {t.whyCfd.intro ? (
          <p className="mb-6 max-w-3xl text-[15px] leading-7 text-hz-on-surface-variant">{t.whyCfd.intro}</p>
        ) : null}
        <div className="grid items-stretch gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            {t.whyCfd.items.map((item: string | { title: string; desc: string }, i: number) => (
              <HizmetlerPageCard key={typeof item === "string" ? item.slice(0, 48) : item.title} className="!p-5">
                <div className="flex items-start gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-hz-secondary-container/15 text-[11px] font-bold text-hz-secondary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    {typeof item === "string" ? (
                      <p className="text-[14px] leading-relaxed text-hz-on-surface-variant">{item}</p>
                    ) : (
                      <>
                        <h3 className="font-bold text-hz-on-surface">{item.title}</h3>
                        <p className="mt-2 text-[14px] leading-relaxed text-hz-on-surface-variant">{item.desc}</p>
                      </>
                    )}
                  </div>
                </div>
              </HizmetlerPageCard>
            ))}
          </div>
          <HizmetlerPageCard className="relative flex h-full flex-col justify-between gap-8 overflow-hidden !border-hz-primary-container !bg-hz-primary-container !text-white">
            <span
              aria-hidden
              className="material-symbols-outlined pointer-events-none absolute -right-6 -top-4 select-none text-[9rem] leading-none text-white/[0.06]"
            >
              target
            </span>
            <div className="relative">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-hz-secondary-container/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-hz-secondary-container">
                <span className="material-symbols-outlined text-sm">verified</span>
                {t.whyCfd.resultLabel}
              </span>
              <p className="text-2xl font-black leading-snug sm:text-[1.7rem]">{t.whyCfd.resultText}</p>
              {t.whyCfd.intro ? (
                <p className="mt-4 text-sm leading-relaxed text-white/70">{t.whyCfd.intro}</p>
              ) : null}
            </div>

            {t.benefits?.items && t.benefits.items.length > 0 ? (
              <ul className="relative space-y-2.5">
                {t.benefits.items.slice(0, 4).map((b: string) => (
                  <li key={b.slice(0, 40)} className="flex items-start gap-2.5 text-[13px] leading-snug text-white/85">
                    <span className="material-symbols-outlined mt-0.5 shrink-0 text-base text-hz-secondary-container">check_circle</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            {t.hero.stats && t.hero.stats.length > 0 ? (
              <div className="relative grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
                {t.hero.stats.map((s: { value: string; label: string }) => (
                  <div key={s.label}>
                    <p className="text-xl font-black leading-none text-hz-secondary-container sm:text-2xl">{s.value}</p>
                    <p className="mt-1.5 text-[11px] leading-tight text-white/60">{s.label}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </HizmetlerPageCard>
        </div>
      </HizmetlerPageSection>

      <HizmetlerPageSection label={t.analysisTypes.sectionLabel} title={t.analysisTypes.title}>
        <div className="space-y-4">
          {t.analysisTypes.items.map((a: { title: string; subtitle: string; text: string }, i: number) => (
            <HizmetlerPageCard
              key={a.title}
              className={`border-l-4 ${accentMap[i % accentMap.length].accent} !py-5`}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
                <div className="shrink-0 sm:w-56">
                  <span
                    className={`mb-2 inline-block rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${accentMap[i % accentMap.length].badge}`}
                  >
                    {a.subtitle}
                  </span>
                  <h3 className="text-base font-bold text-hz-on-surface">{a.title}</h3>
                </div>
                <p className="flex-1 text-[14px] leading-relaxed text-hz-on-surface-variant">{a.text}</p>
              </div>
            </HizmetlerPageCard>
          ))}
        </div>
      </HizmetlerPageSection>

      <HizmetlerPageSection
        label={t.benefits.sectionLabel}
        title={t.benefits.title}
        className="!bg-hz-primary-container [&_h2]:!text-hz-on-primary"
      >
        {t.benefits.intro ? (
          <p className="mb-6 max-w-3xl text-[15px] leading-7 text-hz-on-primary-container">{t.benefits.intro}</p>
        ) : null}
        <div className="grid gap-3 sm:grid-cols-2">
          {t.benefits.items.map((b: string) => (
            <div key={b.slice(0, 48)} className="flex items-start gap-3 text-sm text-white/80">
              <span className="mt-0.5 shrink-0 text-hz-secondary-container">✓</span>
              <span>{b}</span>
            </div>
          ))}
        </div>
        {t.benefits.quote && !t.cta ? (
          <HizmetlerPageCard className="mt-8 !bg-white/10 !text-white ring-1 ring-white/15">
            <p className="text-base leading-7 text-white/85">{t.benefits.quote}</p>
          </HizmetlerPageCard>
        ) : null}
      </HizmetlerPageSection>

      {t.projectTypes ? (
        <HizmetlerPageSection label={t.projectTypes.sectionLabel} title={t.projectTypes.title} variant="white">
          <HizmetlerPageCard>
            {t.projectTypes.intro ? (
              <p className="mb-4 text-[15px] leading-7 text-hz-on-surface-variant">{t.projectTypes.intro}</p>
            ) : null}
            <ul className="grid gap-2 sm:grid-cols-2">
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

      {t.process ? (
        <HizmetlerPageSection label={t.process.sectionLabel} title={t.process.title}>
          <HizmetlerSteps items={t.process.items.map((it: { title: string; desc: string }) => ({ title: it.title, desc: it.desc }))} />
        </HizmetlerPageSection>
      ) : null}

      {t.cta?.ctaButton ? (
        <HizmetlerPageCta
          label={t.cta.sectionLabel}
          title={t.cta.title}
          subtitle={ctaSubtitle}
          phone="+90 216 467 47 52"
          primaryHref={`/${locale}/iletisim`}
          primaryLabel={t.cta.ctaButton}
          secondaryHref={
            t.cta.secondaryLink ? `/${locale}/hizmetler/duman-kontrol-sistemi-tasarimi` : undefined
          }
          secondaryLabel={t.cta.secondaryLink}
        />
      ) : t.benefits.ctaPrimary ? (
        <HizmetlerPageCta
          label={t.benefits.sectionLabel}
          title={t.benefits.title}
          subtitle={t.benefits.quote}
          phone="+90 216 467 47 52"
          primaryHref={`/${locale}/iletisim`}
          primaryLabel={t.benefits.ctaPrimary}
          secondaryHref={
            t.benefits.ctaSecondary ? `/${locale}/hizmetler/duman-kontrol-sistemi-tasarimi` : undefined
          }
          secondaryLabel={t.benefits.ctaSecondary}
        />
      ) : null}
    </HizmetlerDetailRoot>
  );
}
