import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";

export const metadata: Metadata = {
  title: "Devreye Alma | Novves",
  description:
    "NOVVES satış sonrası devreye alma hizmeti — montaj kontrolü, performans testleri, optimizasyon ve eğitim.",
};

export default async function DevreyeAlma({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.services.devreAlma;

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
            <Link href={`/${locale}/hizmetler/devreye-alma`} className="transition-colors hover:text-white/70">{t.breadcrumb.services}</Link>
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

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 divide-x divide-y divide-white/10 border border-white/10 bg-dark/40 backdrop-blur-sm sm:mt-10 sm:grid-cols-4 sm:divide-y-0">
            {t.hero.stats.map((s: { value: string; label: string }) => (
              <div key={s.label} className="py-4 text-center sm:py-5">
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
            <div className="space-y-4 text-[15px] leading-7 text-secondary/75">
              {t.intro.map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Service Steps (Timeline) ─────────────────────────── */}
      <section className="relative overflow-hidden bg-[#ecebe6] py-14 sm:py-16">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.12]" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-9 flex items-end gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{t.serviceSteps.sectionLabel}</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-dark sm:text-3xl">
                {t.serviceSteps.title}
              </h2>
            </div>
            <div className="hidden h-px flex-1 bg-ink/10 sm:block" />
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute bottom-2 left-[18px] top-2 hidden w-px bg-ink/15 sm:block" />

            <div className="space-y-2.5">
              {t.serviceSteps.items.map((item: { step: string; phase: string }, i: number) => (
                <div key={i} className="group flex items-start gap-5">
                  {/* Number circle */}
                  <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fbf9f3] text-[12px] font-bold text-secondary/45 ring-2 ring-ink/15 transition-all duration-300 group-hover:ring-primary group-hover:text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 items-center gap-4 rounded-xl border border-ink/10 bg-[#f5f2eb] px-6 py-4 transition-all duration-300 group-hover:border-primary/25 group-hover:bg-[#f8f5ed] group-hover:shadow-[0_16px_30px_-22px_rgba(15,20,30,0.3)]">
                    <span className="hidden shrink-0 rounded-md bg-primary/8 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary sm:inline-block">
                      {item.phase}
                    </span>
                    <p className="text-[13px] leading-relaxed text-secondary/70">{item.step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Important ────────────────────────────────────── */}
      <section className="bg-[#f5f2eb] py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-9 flex items-end gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{t.whyImportant.sectionLabel}</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-dark sm:text-3xl">
                {t.whyImportant.title}
              </h2>
            </div>
            <div className="hidden h-px flex-1 bg-ink/10 sm:block" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.whyImportant.items.map((item: { title: string; text: string }, i: number) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-xl border border-ink/10 bg-[#f8f5ed] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_16px_30px_-22px_rgba(15,20,30,0.3)]"
              >
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#1d2f4d]/90 via-primary/75 to-[#90a5bd]/75 opacity-75 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="mb-3 block text-2xl font-black text-[#c8c7c2]/55">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-sm font-bold text-dark">{item.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-secondary/55">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-dark py-18 sm:py-20">
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-[0.07]"
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

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{t.cta.sectionLabel}</p>
          <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
            {t.cta.title}
          </h3>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="tel:+902164674752"
              className="group inline-flex items-center gap-3 rounded-lg bg-white/[0.05] px-6 py-3 text-sm font-medium text-white ring-1 ring-white/10 transition-all duration-300 hover:bg-primary/20 hover:ring-primary/30"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/[0.06] ring-1 ring-white/[0.1] transition-colors duration-300 group-hover:bg-primary/20 group-hover:ring-primary/30">
                <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </span>
              +90 216 467 47 52
            </a>
            <Link
              href={`/${locale}/iletisim`}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-[#e55a28] hover:shadow-xl hover:shadow-primary/30"
            >
              {t.cta.contactForm}
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
