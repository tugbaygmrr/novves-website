import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";

export default async function CO2({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.sustainability.co2;

  return (
    <main>
      <section className="relative flex min-h-[420px] items-end overflow-hidden">
        <Image src="/images/page-hero/cozumler-main.jpg" alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-[#4e525c]/28" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#71757d]/60 via-[#4a4f58]/80 to-[#2f3440]/94" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_16%_10%,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0)_52%),radial-gradient(ellipse_at_86%_96%,rgba(17,22,33,0.42)_0%,rgba(17,22,33,0)_55%)]" />
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.08]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-8 pt-24 sm:px-6 lg:px-8 lg:pt-28">
          <nav className="mb-6 flex items-center gap-2 text-xs text-white/40">
            <Link href={`/${locale}`} className="transition-colors hover:text-white/70">{dict.products.shared.home}</Link>
            <span>/</span>
            <Link href={`/${locale}/surdurulebilirlik`} className="transition-colors hover:text-white/70">{dict.sustainability.main.title}</Link>
            <span>/</span>
            <span className="text-white/60">{t.title}</span>
          </nav>

          <div className="max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_28px_70px_-40px_rgba(10,12,16,0.75)] backdrop-blur-[2px] sm:p-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/12 px-3 py-1 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{t.title}</span>
            </div>
            <h1 className="text-4xl font-bold leading-[1.04] tracking-[-0.02em] text-white sm:text-5xl">{t.title}</h1>
            <p className="mt-4 text-[15px] leading-6 text-white/70">{t.quote}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#ecebe6] py-6 sm:py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-5 rounded-2xl border border-ink/10 bg-white/80 p-4 shadow-[0_14px_38px_-30px_rgba(15,20,30,0.25)] md:grid-cols-[minmax(220px,300px),1fr] sm:p-5">
          <div className="relative overflow-hidden rounded-lg border border-ink/10 bg-transparent">
            <Image src="/images/co2-emisyonu-custom.png" alt={t.sectionTitle} width={600} height={400} className="h-[170px] w-full object-cover sm:h-[190px]" priority />
          </div>
          <div className="flex-1 space-y-5">
            <h2 className="text-xl font-bold text-dark sm:text-2xl">
              {t.sectionTitle} <span className="text-primary">{t.sectionTitleHighlight}</span>
            </h2>
            <p className="text-base font-medium text-secondary/70 italic">&ldquo;{t.quote}&rdquo;</p>
            <p className="text-sm leading-6 text-secondary/80">{t.introP1}</p>
            <p className="text-sm leading-6 text-secondary/80">{t.introP2}</p>
          </div>
        </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#ecebe6] py-14 sm:py-16">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.12]" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {t.highlights.map((item: string) => (
              <div key={item} className="flex items-start gap-3 rounded-lg border border-ink/10 bg-[#f8f5ed] p-5">
                <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-sm leading-6 text-secondary/80">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f2eb] py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-xl font-bold text-dark sm:text-2xl">
          {t.contributionsTitle} <span className="text-primary">{t.contributionsTitleHighlight}</span>
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-ink/10 bg-[#f8f5ed] p-6">
            <p className="text-base leading-7 text-secondary/80">
              {t.contribution1}{" "}<span className="font-bold text-primary">{t.contribution1Highlight}</span>{" "}{t.contribution1End}
            </p>
          </div>
          <div className="rounded-xl border border-ink/10 bg-[#f8f5ed] p-6">
            <p className="text-base leading-7 text-secondary/80">
              {t.contribution2}{" "}<span className="font-bold text-primary">{t.contribution2Highlight}</span>{" "}{t.contribution2End}
            </p>
          </div>
        </div>
        <p className="mt-8 text-base leading-7 text-secondary/80">{t.contributionText}</p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#ecebe6] py-14 sm:py-16">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.12]" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-xl font-bold text-dark sm:text-2xl">
            {t.annualGainsTitle}{" "}<span className="text-primary">{t.annualGainsTitleHighlight}</span>
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.stats.map((stat: { value: string; label: string }) => (
              <div key={stat.label} className="rounded-xl border border-ink/10 bg-[#f8f5ed] p-6 text-center">
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="mt-2 text-sm text-secondary/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f2eb] py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {["/images/co2-1.jpg", "/images/co2-2.jpg", "/images/co2-3.jpg"].map((src) => (
            <div key={src} className="relative h-48 overflow-hidden rounded-xl border border-ink/10 bg-white">
              <Image src={src} alt="" fill className="object-contain p-1" />
            </div>
          ))}
        </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <Image src="/images/co2-graphic.jpg" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-dark/80" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center">
          <h2 className="mb-4 text-2xl font-bold text-white">
            {t.ecoTitle} <span className="text-primary">{t.ecoTitleHighlight}</span>
          </h2>
          <p className="text-lg leading-8 text-white/90">{t.ecoText}</p>
        </div>
      </section>

      <section className="bg-[#ecebe6] py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <blockquote className="text-base leading-8 text-secondary/80 italic">&ldquo;{t.quoteBottom}&rdquo;</blockquote>
        <div className="mx-auto mt-4 h-1 w-12 rounded bg-primary" />
        </div>
      </section>

      <section className="bg-dark py-18 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-12 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div>
            <h3 className="mb-5 text-lg font-bold text-white">
              {t.howTitle} <span className="text-primary">{t.howTitleHighlight}</span>
            </h3>
            <ul className="space-y-3">
              {t.howItems.map((item: string) => (
                <li key={item} className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="text-sm leading-6 text-white/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-5 text-lg font-bold text-white">
              {t.appTitle} <span className="text-primary">{t.appTitleHighlight}</span>
            </h3>
            <ul className="space-y-3">
              {t.appAreas.map((item: string) => (
                <li key={item} className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                  <span className="text-sm leading-6 text-white/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-dark py-14 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={`/${locale}/surdurulebilirlik`} className="rounded border border-white/20 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:border-primary hover:text-primary">{t.ctaSustainability}</Link>
            <Link href={`/${locale}/iletisim`} className="rounded bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e55a28]">{t.ctaContact}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
