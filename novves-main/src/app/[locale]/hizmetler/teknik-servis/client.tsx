"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type TeknikServisDict = {
  breadcrumb: { home: string; services: string; current: string };
  hero: { badge: string; titlePart1: string; titleHighlight: string; subtitle: string; weekdays: string; emailSupport: string };
  intro: string;
  serviceTypes: { sectionLabel: string; title: string; items: string[] };
  form: {
    sectionLabel: string; title: string; description: string;
    features: { label: string; desc: string }[];
    labels: { name: string; company: string; phone: string; email: string; subject: string; message: string };
    submit: string; successTitle: string; successMessage: string;
  };
};

const serviceIcons = [
  "M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.049.58.025 1.193-.14 1.743",
  "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
  "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5",
  "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z",
  "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
];

const inputClass =
  "w-full rounded-lg border border-ink/10 bg-[#fbf9f3] px-4 py-3 text-sm text-secondary placeholder:text-secondary/25 outline-none transition-all duration-200 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10";

export function TeknikServisClient({ dict, locale }: { dict: TeknikServisDict; locale: string }) {
  const t = dict;
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  }

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-[540px] items-end overflow-hidden">
        <Image src="/images/page-hero/cozumler-main.jpg" alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-[#4e525c]/28" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#71757d]/60 via-[#4a4f58]/80 to-[#2f3440]/94" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_16%_10%,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0)_52%),radial-gradient(ellipse_at_86%_96%,rgba(17,22,33,0.42)_0%,rgba(17,22,33,0)_55%)]" />
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.08]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 pt-32 sm:px-6 lg:px-8 lg:pt-36">
          <nav className="mb-8 flex items-center gap-2 text-xs text-white/40">
            <Link href={`/${locale}`} className="transition-colors hover:text-white/70">{t.breadcrumb.home}</Link>
            <span>/</span>
            <Link href={`/${locale}/hizmetler/teknik-servis`} className="transition-colors hover:text-white/70">{t.breadcrumb.services}</Link>
            <span>/</span>
            <span className="text-white/60">{t.breadcrumb.current}</span>
          </nav>

          <div className="max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_28px_70px_-40px_rgba(10,12,16,0.75)] backdrop-blur-[2px] sm:p-8 lg:p-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/12 px-3.5 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{t.hero.badge}</span>
            </div>
            <h1 className="text-4xl font-bold leading-[1.04] tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.7rem]">
              {t.hero.titlePart1} <span className="text-primary">{t.hero.titleHighlight}</span>
            </h1>
            <p className="mt-6 max-w-[52ch] text-[18px] leading-[1.62] text-white/72">
              {t.hero.subtitle}
            </p>
          </div>

          {/* Quick contact strip */}
          <div className="mt-8 flex flex-wrap gap-6 border border-white/10 bg-dark/40 px-6 py-4 backdrop-blur-sm sm:mt-10">
            <a href="tel:+902164674752" className="group flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.05] ring-1 ring-white/[0.1] transition-all duration-300 group-hover:bg-primary/20 group-hover:ring-primary/30">
                <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </span>
              <div>
                <span className="block font-semibold">+90 216 467 47 52</span>
                <span className="text-[11px] text-white/30">{t.hero.weekdays}</span>
              </div>
            </a>
            <a href="mailto:info@novves.com" className="group flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.05] ring-1 ring-white/[0.1] transition-all duration-300 group-hover:bg-primary/20 group-hover:ring-primary/30">
                <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </span>
              <div>
                <span className="block font-semibold">info@novves.com</span>
                <span className="text-[11px] text-white/30">{t.hero.emailSupport}</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── Intro ────────────────────────────────────────────── */}
      <section className="bg-[#ecebe6] py-6 sm:py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-ink/10 bg-white/80 p-6 shadow-[0_14px_38px_-30px_rgba(15,20,30,0.25)] sm:p-7">
            <p className="text-[15px] leading-7 text-secondary/75">{t.intro}</p>
          </div>
        </div>
      </section>

      {/* ── Service Types ────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#ecebe6] py-14 sm:py-16">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.12]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-9 flex items-end gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{t.serviceTypes.sectionLabel}</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-dark sm:text-3xl">
                {t.serviceTypes.title}
              </h2>
            </div>
            <div className="hidden h-px flex-1 bg-ink/10 sm:block" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.serviceTypes.items.map((title: string, i: number) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-xl border border-ink/10 bg-[#f5f2eb] p-6 transition-all duration-300 hover:border-primary/25 hover:bg-[#f8f5ed] hover:shadow-[0_16px_30px_-22px_rgba(15,20,30,0.3)]"
              >
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#1d2f4d]/90 via-primary/75 to-[#90a5bd]/75 opacity-75 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute left-0 top-0 h-full w-1 bg-ink/15 transition-colors duration-300 group-hover:bg-primary" />
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink/10 bg-[#fbf9f3] text-secondary/45 transition-colors duration-300 group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:text-primary">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d={serviceIcons[i] || serviceIcons[0]} />
                  </svg>
                </div>
                <p className="mt-4 text-[13px] font-semibold leading-relaxed text-dark">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form ─────────────────────────────────────────────── */}
      <section className="bg-[#f5f2eb] py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-14 lg:grid-cols-5">
            {/* Left info */}
            <div className="lg:col-span-2">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{t.form.sectionLabel}</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-dark sm:text-3xl">
                {t.form.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-secondary/55">
                {t.form.description}
              </p>

              <div className="mt-10 space-y-5">
                {t.form.features.map((item: { label: string; desc: string }) => (
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

            {/* Right form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-ink/10 bg-[#f8f5ed] p-8 shadow-[0_14px_38px_-28px_rgba(15,20,30,0.28)] sm:p-10">
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
                    </div>
                    <div>
                      <label htmlFor="subject" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-secondary/60">
                        {t.form.labels.subject}
                      </label>
                      <input id="subject" name="subject" type="text" value={formData.subject} onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-secondary/60">
                        {t.form.labels.message}
                      </label>
                      <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} className={`${inputClass} resize-none`} />
                    </div>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-[#e55a28] hover:shadow-xl hover:shadow-primary/30"
                    >
                      {t.form.submit}
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
