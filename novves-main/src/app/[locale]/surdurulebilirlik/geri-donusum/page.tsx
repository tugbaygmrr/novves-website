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
      <section className="bg-secondary py-20 text-center">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t.title}</h1>
          <div className="mx-auto mt-3 h-1 w-16 rounded bg-primary" />
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/70">{t.subtitle}</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-5 text-base leading-7 text-secondary/80">
          <p>{t.introP1}</p>
          <p>{t.introP2}</p>
        </div>
      </section>

      <section className="bg-light py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-xl font-bold text-dark sm:text-2xl">
            {t.recyclingTitle} <span className="text-primary">{t.recyclingTitleHighlight}</span>
          </h2>
          <p className="mb-8 text-lg font-medium text-secondary/70 italic">&ldquo;{t.recyclingQuote}&rdquo;</p>
          <p className="mb-10 text-base leading-7 text-secondary/80">{t.recyclingIntro}</p>

          <div className="flex flex-col items-center gap-12 md:flex-row">
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

            <div className="flex h-48 w-48 flex-shrink-0 items-center justify-center rounded-full border-4 border-primary bg-white shadow-lg">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">{t.recyclablePercent}</p>
                <p className="mt-1 text-xs font-medium text-secondary/60">{t.recyclableLabel}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="mb-10 text-base leading-7 text-secondary/80">{t.fanDetailText}</p>

        <h2 className="mb-8 text-xl font-bold text-dark sm:text-2xl">
          {t.benefitsTitle} <span className="text-primary">{t.benefitsTitleHighlight}</span>
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {t.benefits.map((item: string) => (
            <div key={item} className="flex items-start gap-3">
              <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm leading-6 text-secondary/80">{item}</span>
            </div>
          ))}
        </div>

        <p className="mt-10 text-base leading-7 text-secondary/80">{t.futureText}</p>
      </section>

      <section className="bg-light py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-xl font-bold text-dark sm:text-2xl">
            {t.certTitle} <span className="text-primary">{t.certTitleHighlight}</span>
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-secondary/80">{t.certText}</p>
          <p className="mx-auto mb-8 max-w-2xl text-sm leading-7 text-secondary/70">{t.certSubtext}</p>
          <div className="mx-auto max-w-sm overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
            <Image src="/images/novves-sifir-atik-belgesi.jpg" alt={t.certImageAlt} width={400} height={560} className="w-full object-contain" />
          </div>
          <div className="mt-6 space-y-1 text-sm text-secondary/60">
            <p>{t.certCode}</p>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-14 text-center">
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
