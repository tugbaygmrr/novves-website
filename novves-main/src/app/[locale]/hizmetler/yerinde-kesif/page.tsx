import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";

export const metadata: Metadata = {
  title: "Yerinde Keşif | Novves",
  description: "NOVVES yerinde keşif hizmeti - saha inceleme, ölçüm ve analiz ile projenize özel havalandırma çözümü.",
};

const stepIcons = [
  "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5",
  "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z",
  "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z",
  "M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605",
  "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
];

export default async function YerindeKesif({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.services.yerindeKesif;

  return (
    <main>
      {/* Hero */}
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
            <Link href={`/${locale}/hizmetler/yerinde-kesif`} className="transition-colors hover:text-white/70">{t.breadcrumb.services}</Link>
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
        </div>
      </section>

      {/* Intro */}
      <section className="bg-[#ecebe6] py-6 sm:py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-ink/10 bg-white/80 p-6 shadow-[0_14px_38px_-30px_rgba(15,20,30,0.25)] sm:p-7">
            <p className="text-[15px] leading-7 text-secondary/75">{t.intro}</p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="relative overflow-hidden bg-[#ecebe6] py-14 sm:py-16">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.12]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-9 flex items-end gap-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">{t.steps.sectionLabel}</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-dark sm:text-3xl">{t.steps.title}</h2>
            </div>
            <div className="hidden h-px flex-1 bg-ink/10 sm:block" />
          </div>

          <div className="space-y-3">
            {t.steps.items.map((step: { title: string; desc: string }, i: number) => (
              <div key={i} className="group relative overflow-hidden rounded-xl border border-ink/10 bg-[#f5f2eb] p-6 transition-all duration-300 hover:border-primary/25 hover:bg-[#f8f5ed] hover:shadow-[0_16px_30px_-22px_rgba(15,20,30,0.3)] sm:p-8">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#1d2f4d]/90 via-primary/75 to-[#90a5bd]/75 opacity-75 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute left-0 top-0 h-full w-1 bg-ink/15 transition-colors duration-300 group-hover:bg-primary" />
                <div className="flex items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-ink/10 bg-[#fbf9f3] text-secondary/45 transition-colors duration-300 group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:text-primary">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d={stepIcons[i]} />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="text-[15px] font-bold text-dark">{step.title}</h3>
                    </div>
                    <p className="mt-2 text-[13px] leading-relaxed text-secondary/62">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Important */}
      <section className="bg-[#f5f2eb] py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-9 flex items-end gap-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">{t.whyImportant.sectionLabel}</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-dark sm:text-3xl">{t.whyImportant.title}</h2>
            </div>
            <div className="hidden h-px flex-1 bg-ink/10 sm:block" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.whyImportant.items.map((item: { title: string; desc: string }, i: number) => (
              <div key={i} className="group relative overflow-hidden rounded-xl border border-ink/10 bg-[#f8f5ed] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_16px_30px_-22px_rgba(15,20,30,0.3)]">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#1d2f4d]/90 via-primary/75 to-[#90a5bd]/75 opacity-75 transition-opacity duration-300 group-hover:opacity-100" />
                <h3 className="text-[15px] font-bold text-dark">{item.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-secondary/62">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-dark py-18 sm:py-20">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, #FF6B35, transparent 70%)" }} />
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">{t.cta.sectionLabel}</p>
          <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
            {t.cta.title}
          </h3>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/45">
            {t.cta.subtitle}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="tel:+902164674752" className="group inline-flex items-center gap-3 rounded-xl bg-white/[0.05] px-6 py-3.5 text-sm font-medium text-white ring-1 ring-white/10 transition-all duration-300 hover:bg-primary/20 hover:ring-primary/30">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/[0.06] ring-1 ring-white/[0.1] transition-colors duration-300 group-hover:bg-primary/20 group-hover:ring-primary/30">
                <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
              </span>
              +90 216 467 47 52
            </a>
            <Link href={`/${locale}/iletisim`} className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-[#e55a28] hover:shadow-xl hover:shadow-primary/30">
              {t.cta.ctaButton}
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
