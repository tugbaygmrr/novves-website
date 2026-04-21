import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";

export const metadata: Metadata = {
  title: "Duman Kontrol Sistem Tasarımı | Novves",
  description:
    "Jet fan sistemi tasarımı — kapalı otoparklarda hava akışı, egzoz tahliyesi ve yangın durumunda duman kontrolü.",
};

const componentIcons = [
  <svg key="0" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
  <svg key="1" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  <svg key="2" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>,
  <svg key="3" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>,
  <svg key="4" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" /></svg>,
];

export default async function DumanKontrol({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.services.dumanKontrol;

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
            <Link href={`/${locale}/hizmetler/duman-kontrol-sistemi-tasarimi`} className="transition-colors hover:text-white/70">{t.breadcrumb.services}</Link>
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
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 bg-dark/40 backdrop-blur-sm">
            {t.hero.stats.map((s: { value: string; label: string }) => (
              <div key={s.label} className="py-5 text-center">
                <p className="text-lg font-bold text-primary sm:text-xl">{s.value}</p>
                <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-white/40">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Intro ────────────────────────────────────────────── */}
      <section className="bg-[#ecebe6] py-6 sm:py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-ink/10 bg-white/80 p-6 shadow-[0_14px_38px_-30px_rgba(15,20,30,0.25)] sm:p-7">
            <div className="space-y-5 text-[15px] leading-7 text-secondary/75">
              {t.intro.map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Components ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#ecebe6] py-14 sm:py-16">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.12]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-9 flex items-end gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{t.components.sectionLabel}</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-dark sm:text-3xl">
                {t.components.title}
              </h2>
            </div>
            <div className="hidden h-px flex-1 bg-ink/10 sm:block" />
          </div>

          <div className="space-y-3">
            {t.components.items.map((item: { title: string; text: string }, i: number) => (
              <div
                key={item.title}
                className="group overflow-hidden rounded-xl border border-ink/10 bg-[#f5f2eb] transition-all duration-300 hover:border-primary/25 hover:bg-[#f8f5ed] hover:shadow-[0_16px_30px_-22px_rgba(15,20,30,0.3)]"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="flex shrink-0 items-center gap-4 border-b border-ink/10 bg-[#f8f5ed] px-6 py-5 sm:w-64 sm:flex-col sm:items-start sm:border-b-0 sm:border-r sm:border-ink/10 sm:py-6 md:w-72">
                    <span className="text-2xl font-black text-[#c8c7c2]/55 sm:text-3xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex items-center gap-3 sm:mt-1">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ink/10 bg-[#fbf9f3] text-secondary/45 transition-colors duration-300 group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:text-primary">
                        {componentIcons[i]}
                      </div>
                      <h3 className="text-sm font-bold text-dark sm:text-base">{item.title}</h3>
                    </div>
                  </div>
                  <div className="flex flex-1 items-center px-6 py-5 sm:py-6">
                    <p className="text-[13px] leading-relaxed text-secondary/70">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Advantages ───────────────────────────────────────── */}
      <section className="bg-[#f5f2eb] py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-9 flex items-end gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{t.advantages.sectionLabel}</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-dark sm:text-3xl">
                {t.advantages.title}
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-secondary/50">
                {t.advantages.subtitle}
              </p>
            </div>
            <div className="hidden h-px flex-1 bg-ink/10 sm:block" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.advantages.items.map((adv: { title: string; text: string }, i: number) => (
              <div
                key={adv.title}
                className="group relative overflow-hidden rounded-xl border border-ink/10 bg-[#f8f5ed] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_16px_30px_-22px_rgba(15,20,30,0.3)]"
              >
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#1d2f4d]/90 via-primary/75 to-[#90a5bd]/75 opacity-75 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/8 text-[11px] font-bold text-primary">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-dark">{adv.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-secondary/60">{adv.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Design Factors ───────────────────────────────────── */}
      <section className="relative overflow-hidden bg-dark py-18 sm:py-20">
        <div
          className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #FF6B35, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{t.designFactors.sectionLabel}</p>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              {t.designFactors.title}
            </h2>
          </div>

          <div className="space-y-6">
            {t.designFactors.items.map((text: string, i: number) => (
              <div key={i} className="flex items-start gap-4">
                <span className="mt-1.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                </span>
                <p className="text-sm leading-7 text-white/70">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="bg-[#ecebe6] py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{t.cta.sectionLabel}</p>
          <h3 className="mt-2 text-xl font-bold text-dark sm:text-2xl">
            {t.cta.title}
          </h3>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={`/${locale}/hizmetler/cfd-analizi`}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-6 py-3 text-sm font-semibold text-secondary transition-all duration-300 hover:border-primary/30 hover:text-primary"
            >
              {t.cta.cfdLink}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href={`/${locale}/iletisim`}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-[#e55a28] hover:shadow-xl hover:shadow-primary/30"
            >
              {t.cta.supportButton}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
