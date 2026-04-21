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
      <section className="bg-secondary py-20 text-center">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t.title}</h1>
          <div className="mx-auto mt-3 h-1 w-16 rounded bg-primary" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 md:flex-row">
          <div className="relative w-full max-w-md flex-shrink-0 overflow-hidden rounded-lg shadow-lg">
            <Image src="/images/co2-1.jpg" alt={t.sectionTitle} width={600} height={400} className="w-full object-cover" priority />
          </div>
          <div className="flex-1 space-y-5">
            <h2 className="text-2xl font-bold text-dark sm:text-3xl">
              {t.sectionTitle} <span className="text-primary">{t.sectionTitleHighlight}</span>
            </h2>
            <p className="text-lg font-medium text-secondary/70 italic">&ldquo;{t.quote}&rdquo;</p>
            <p className="text-base leading-7 text-secondary/80">{t.introP1}</p>
            <p className="text-base leading-7 text-secondary/80">{t.introP2}</p>
          </div>
        </div>
      </section>

      <section className="bg-light py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {t.highlights.map((item: string) => (
              <div key={item} className="flex items-start gap-3 rounded-lg border border-gray-100 bg-white p-5 shadow-sm">
                <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-sm leading-6 text-secondary/80">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-xl font-bold text-dark sm:text-2xl">
          {t.contributionsTitle} <span className="text-primary">{t.contributionsTitleHighlight}</span>
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-gray-100 bg-light p-6">
            <p className="text-base leading-7 text-secondary/80">
              {t.contribution1}{" "}<span className="font-bold text-primary">{t.contribution1Highlight}</span>{" "}{t.contribution1End}
            </p>
          </div>
          <div className="rounded-lg border border-gray-100 bg-light p-6">
            <p className="text-base leading-7 text-secondary/80">
              {t.contribution2}{" "}<span className="font-bold text-primary">{t.contribution2Highlight}</span>{" "}{t.contribution2End}
            </p>
          </div>
        </div>
        <p className="mt-8 text-base leading-7 text-secondary/80">{t.contributionText}</p>
      </section>

      <section className="bg-light py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-xl font-bold text-dark sm:text-2xl">
            {t.annualGainsTitle}{" "}<span className="text-primary">{t.annualGainsTitleHighlight}</span>
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.stats.map((stat: { value: string; label: string }) => (
              <div key={stat.label} className="rounded-lg border border-gray-100 bg-white p-6 text-center shadow-sm">
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="mt-2 text-sm text-secondary/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {["/images/co2-1.jpg", "/images/co2-2.jpg", "/images/co2-3.jpg"].map((src) => (
            <div key={src} className="relative h-48 overflow-hidden rounded-lg">
              <Image src={src} alt="" fill className="object-cover" />
            </div>
          ))}
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

      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <blockquote className="text-base leading-8 text-secondary/80 italic">&ldquo;{t.quoteBottom}&rdquo;</blockquote>
        <div className="mx-auto mt-4 h-1 w-12 rounded bg-primary" />
      </section>

      <section className="bg-secondary py-16">
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
