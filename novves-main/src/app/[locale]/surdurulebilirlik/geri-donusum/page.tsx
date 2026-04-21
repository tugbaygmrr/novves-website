import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";

export default async function GeriDonusum({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.sustainability.geriDonusum;

  return (
    <main>
      <section className="relative flex min-h-[540px] items-end overflow-hidden">
        <Image src="/images/page-hero/cozumler-main.jpg" alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-[#4e525c]/28" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#71757d]/60 via-[#4a4f58]/80 to-[#2f3440]/94" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_16%_10%,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0)_52%),radial-gradient(ellipse_at_86%_96%,rgba(17,22,33,0.42)_0%,rgba(17,22,33,0)_55%)]" />
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.08]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 pt-32 sm:px-6 lg:px-8 lg:pt-36">
          <nav className="mb-8 flex items-center gap-2 text-xs text-white/40">
            <Link href={`/${locale}`} className="transition-colors hover:text-white/70">{dict.products.shared.home}</Link>
            <span>/</span>
            <Link href={`/${locale}/surdurulebilirlik`} className="transition-colors hover:text-white/70">{dict.sustainability.main.title}</Link>
            <span>/</span>
            <span className="text-white/60">{t.title}</span>
          </nav>

          <div className="max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_28px_70px_-40px_rgba(10,12,16,0.75)] backdrop-blur-[2px] sm:p-8 lg:p-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/12 px-3.5 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{t.title}</span>
            </div>
            <h1 className="text-4xl font-bold leading-[1.04] tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.7rem]">{t.title}</h1>
            <p className="mt-6 max-w-[52ch] text-[18px] leading-[1.62] text-white/72">{t.subtitle}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#ecebe6] py-6 sm:py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-5 rounded-2xl border border-ink/10 bg-white/80 p-6 text-base leading-7 text-secondary/80 shadow-[0_14px_38px_-30px_rgba(15,20,30,0.25)] sm:p-7">
          <p>{t.introP1}</p>
          <p>{t.introP2}</p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#ecebe6] py-14 sm:py-16">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.12]" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-xl font-bold text-dark sm:text-2xl">
            {t.recyclingTitle} <span className="text-primary">{t.recyclingTitleHighlight}</span>
          </h2>
          <p className="mb-8 text-lg font-medium text-secondary/70 italic">&ldquo;{t.recyclingQuote}&rdquo;</p>
          <p className="mb-10 text-base leading-7 text-secondary/80">{t.recyclingIntro}</p>

          <div className="flex flex-col items-center gap-10 md:flex-row">
            <div className="flex-1">
              <h3 className="mb-4 text-base font-bold text-dark">{t.greenTitle}</h3>
              <ul className="space-y-3">
                {t.greenItems.map((item: string) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="text-sm leading-6 text-secondary/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex h-44 w-44 flex-shrink-0 items-center justify-center rounded-full border-4 border-primary bg-[#f8f5ed] shadow-lg">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">{t.recyclablePercent}</p>
                <p className="mt-1 text-xs font-medium text-secondary/60">{t.recyclableLabel}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f2eb] py-14 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="mb-10 text-base leading-7 text-secondary/80">{t.fanDetailText}</p>

        <h2 className="mb-8 text-xl font-bold text-dark sm:text-2xl">
          {t.benefitsTitle} <span className="text-primary">{t.benefitsTitleHighlight}</span>
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {t.benefits.map((item: string) => (
            <div key={item} className="flex items-start gap-3 rounded-xl border border-ink/10 bg-[#f8f5ed] p-4">
              <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm leading-6 text-secondary/80">{item}</span>
            </div>
          ))}
        </div>

        <p className="mt-8 text-base leading-7 text-secondary/80">{t.futureText}</p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#ecebe6] py-14 sm:py-16">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.12]" />
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-xl font-bold text-dark sm:text-2xl">
            {t.certTitle} <span className="text-primary">{t.certTitleHighlight}</span>
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-secondary/80">{t.certText}</p>
          <p className="mx-auto mb-8 max-w-2xl text-sm leading-7 text-secondary/70">{t.certSubtext}</p>
          <div className="mx-auto max-w-sm overflow-hidden rounded-xl border border-ink/10 bg-[#f8f5ed] shadow-md">
            <Image src="/images/novves-sifir-atik-belgesi.jpg" alt={t.certImageAlt} width={400} height={560} className="w-full object-contain" />
          </div>
          <div className="mt-6 space-y-1 text-sm text-secondary/60">
            <p>{t.certCode}</p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-dark py-18 sm:py-20 text-center">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-[0.07]" style={{ background: "radial-gradient(circle, #FF6B35, transparent 70%)" }} />
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
