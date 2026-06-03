"use client";

import { useState } from "react";
import {
  HizmetlerDetailRoot,
} from "@/components/hizmetler/hizmetler-detail-root";
import {
  HizmetlerFeatureGrid,
  HizmetlerPageCard,
  HizmetlerPageCta,
  HizmetlerPageHero,
  HizmetlerPageSection,
  HizmetlerSteps,
} from "@/components/hizmetler/hizmetler-page-ui";

type ServiceTypeItem = string | { title: string; desc: string };

type TeknikServisDict = {
  breadcrumb: { home: string; services: string; current: string };
  hero: {
    badge: string;
    titlePart1: string;
    titleHighlight: string;
    subtitle: string;
    imageSrc?: string;
    weekdays: string;
    emailSupport: string;
  };
  intro: string | string[];
  serviceTypes: { sectionLabel: string; title: string; items: ServiceTypeItem[] };
  process?: { sectionLabel: string; title: string; items: { title: string; desc: string }[] };
  whyNovves?: { sectionLabel: string; title: string; items: { title: string; text: string }[] };
  form: {
    sectionLabel: string;
    title: string;
    subtitle?: string;
    description: string;
    helperIntro?: string;
    helperFields?: string[];
    features: { label: string; desc: string }[];
    labels: {
      name: string;
      company: string;
      phone: string;
      email: string;
      projectName?: string;
      productModel?: string;
      serialNumber?: string;
      urgency?: string;
      location?: string;
      subject?: string;
      message: string;
    };
    submit: string;
    successTitle: string;
    successMessage: string;
  };
  cta?: { sectionLabel: string; title: string; subtitle?: string; ctaButton?: string };
};

const inputClass =
  "w-full rounded-lg border border-ink/10 bg-[#fbf9f3] px-4 py-3 text-sm text-secondary placeholder:text-secondary/25 outline-none transition-all duration-200 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10";

function introParagraphs(intro: string | string[]): string[] {
  if (typeof intro === "string") return [intro];
  return intro;
}

export function TeknikServisClient({ dict, locale }: { dict: TeknikServisDict; locale: string }) {
  const t = dict;
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    projectName: "",
    productModel: "",
    serialNumber: "",
    urgency: "",
    location: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const paragraphs = introParagraphs(t.intro);
  const hasExtendedForm = Boolean(t.form.labels.projectName);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  }

  return (
    <HizmetlerDetailRoot>
      <HizmetlerPageHero
        badge={t.hero.badge}
        titlePart1={t.hero.titlePart1}
        titleHighlight={t.hero.titleHighlight}
        subtitle={t.hero.subtitle}
        imageSrc={t.hero.imageSrc ?? "/images/page-hero/cozumler-main.jpg"}
      />

      <HizmetlerPageSection>
        <HizmetlerPageCard flat>
          <div className="flex flex-wrap gap-8 border-b border-sand-300/50 pb-6">
            <a href="tel:+902164674752" className="text-sm text-hz-on-surface-variant hover:text-hz-secondary">
              <span className="block font-bold text-hz-on-surface">+90 216 467 47 52</span>
              <span className="text-xs">{t.hero.weekdays}</span>
            </a>
            <a href="mailto:info@novves.com" className="text-sm text-hz-on-surface-variant hover:text-hz-secondary">
              <span className="block font-bold text-hz-on-surface">info@novves.com</span>
              <span className="text-xs">{t.hero.emailSupport}</span>
            </a>
          </div>
          <div className="mt-6 space-y-4">
            {paragraphs.map((p) => (
              <p key={p.slice(0, 48)} className="text-[15px] leading-7 text-hz-on-surface-variant">
                {p}
              </p>
            ))}
          </div>
        </HizmetlerPageCard>
      </HizmetlerPageSection>

      <HizmetlerPageSection label={t.serviceTypes.sectionLabel} title={t.serviceTypes.title} variant="white">
        <div className="grid gap-4 sm:grid-cols-2">
          {t.serviceTypes.items.map((item, i) =>
            typeof item === "string" ? (
              <HizmetlerPageCard key={i}>
                <p className="flex items-start gap-2.5 font-semibold text-hz-on-surface">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-hz-secondary" aria-hidden />
                  {item}
                </p>
              </HizmetlerPageCard>
            ) : (
              <HizmetlerPageCard key={item.title}>
                <h3 className="flex items-start gap-2.5 font-bold text-hz-on-surface">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-hz-secondary" aria-hidden />
                  {item.title}
                </h3>
                <p className="mt-2 pl-[18px] text-[14px] leading-relaxed text-hz-on-surface-variant">{item.desc}</p>
              </HizmetlerPageCard>
            ),
          )}
        </div>
      </HizmetlerPageSection>

      {t.process ? (
        <HizmetlerPageSection label={t.process.sectionLabel} title={t.process.title}>
          <HizmetlerSteps items={t.process.items.map((it) => ({ title: it.title, desc: it.desc }))} />
        </HizmetlerPageSection>
      ) : null}

      {t.whyNovves ? (
        <HizmetlerPageSection label={t.whyNovves.sectionLabel} title={t.whyNovves.title} variant="white">
          <HizmetlerFeatureGrid items={t.whyNovves.items.map((it) => ({ title: it.title, desc: it.text }))} cols={3} />
        </HizmetlerPageSection>
      ) : null}

      <HizmetlerPageSection label={t.form.sectionLabel} title={t.form.title}>
        <div id="teknik-servis-form" className="mx-auto max-w-full scroll-mt-24">
          <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-5 lg:gap-14">
            <div className="lg:col-span-2">
              {t.form.subtitle ? (
                <p className="text-sm font-semibold text-hz-on-surface">{t.form.subtitle}</p>
              ) : null}
              <p className="mt-4 text-sm leading-relaxed text-hz-on-surface-variant">{t.form.description}</p>

              {t.form.helperFields && t.form.helperFields.length > 0 ? (
                <div className="mt-8">
                  {t.form.helperIntro ? (
                    <p className="mb-3 text-sm font-medium text-hz-on-surface">{t.form.helperIntro}</p>
                  ) : null}
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {t.form.helperFields.map((field) => (
                      <li
                        key={field}
                        className="flex items-center gap-2 text-xs text-hz-on-surface-variant"
                      >
                        <span className="h-1 w-1 shrink-0 rounded-full bg-hz-secondary" />
                        {field}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="mt-10 space-y-5">
                {t.form.features.map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/8">
                      <svg className="h-4.5 w-4.5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm font-bold text-dark">{item.label}</p>
                      <p className="text-xs text-secondary/45">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3">
              <HizmetlerPageCard className="bg-white ring-1 ring-ink/[0.06] shadow-[0_10px_40px_-22px_rgba(15,22,36,0.25)] !p-5 sm:!p-8 lg:!p-10">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
                      <svg className="h-8 w-8 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-dark">{t.form.successTitle}</h3>
                    <p className="mt-2 text-sm text-secondary/50">{t.form.successMessage}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-secondary/60">
                          {t.form.labels.name} <span className="text-primary">*</span>
                        </label>
                        <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className={inputClass} />
                      </div>
                      <div>
                        <label htmlFor="company" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-secondary/60">
                          {t.form.labels.company} <span className="text-primary">*</span>
                        </label>
                        <input id="company" name="company" type="text" required value={formData.company} onChange={handleChange} className={inputClass} />
                      </div>
                      <div>
                        <label htmlFor="phone" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-secondary/60">
                          {t.form.labels.phone} <span className="text-primary">*</span>
                        </label>
                        <input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} className={inputClass} />
                      </div>
                      <div>
                        <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-secondary/60">
                          {t.form.labels.email} <span className="text-primary">*</span>
                        </label>
                        <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className={inputClass} />
                      </div>
                      {hasExtendedForm ? (
                        <>
                          <div>
                            <label htmlFor="projectName" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-secondary/60">
                              {t.form.labels.projectName}
                            </label>
                            <input id="projectName" name="projectName" type="text" value={formData.projectName} onChange={handleChange} className={inputClass} />
                          </div>
                          <div>
                            <label htmlFor="productModel" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-secondary/60">
                              {t.form.labels.productModel}
                            </label>
                            <input id="productModel" name="productModel" type="text" value={formData.productModel} onChange={handleChange} className={inputClass} />
                          </div>
                          <div>
                            <label htmlFor="serialNumber" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-secondary/60">
                              {t.form.labels.serialNumber}
                            </label>
                            <input id="serialNumber" name="serialNumber" type="text" value={formData.serialNumber} onChange={handleChange} className={inputClass} />
                          </div>
                          <div>
                            <label htmlFor="urgency" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-secondary/60">
                              {t.form.labels.urgency}
                            </label>
                            <input id="urgency" name="urgency" type="text" value={formData.urgency} onChange={handleChange} className={inputClass} />
                          </div>
                          <div className="sm:col-span-2">
                            <label htmlFor="location" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-secondary/60">
                              {t.form.labels.location}
                            </label>
                            <input id="location" name="location" type="text" value={formData.location} onChange={handleChange} className={inputClass} />
                          </div>
                        </>
                      ) : null}
                    </div>
                    {t.form.labels.subject ? (
                      <div>
                        <label htmlFor="subject" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-secondary/60">
                          {t.form.labels.subject}
                        </label>
                        <input id="subject" name="subject" type="text" value={formData.subject} onChange={handleChange} className={inputClass} />
                      </div>
                    ) : null}
                    <div>
                      <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-secondary/60">
                        {t.form.labels.message}
                      </label>
                      <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} className={`${inputClass} resize-none`} />
                    </div>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-primary-deep hover:shadow-xl hover:shadow-primary/30"
                    >
                      {t.form.submit}
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                    </button>
                  </form>
                )}
              </HizmetlerPageCard>
            </div>
          </div>
        </div>
      </HizmetlerPageSection>

      {t.cta ? (
        <HizmetlerPageCta
          label={t.cta.sectionLabel}
          title={t.cta.title}
          subtitle={t.cta.subtitle}
          phone="+90 216 467 47 52"
          primaryHref={`/${locale}/iletisim`}
          primaryLabel={t.cta.ctaButton ?? t.form.submit}
        />
      ) : null}
    </HizmetlerDetailRoot>
  );
}
