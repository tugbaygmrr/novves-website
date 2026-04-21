import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../dictionaries";

const sdgImages = ["/images/sdg11.jpg", "/images/sdg12.jpg", "/images/sdg13.jpg"];

export default async function Surdurulebilirlik({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.sustainability.main;

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
            <span className="text-white/60">{t.title}</span>
          </nav>

          <div className="max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_28px_70px_-40px_rgba(10,12,16,0.75)] backdrop-blur-[2px] sm:p-8 lg:p-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/12 px-3.5 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{t.title}</span>
            </div>
            <h1 className="text-4xl font-bold leading-[1.04] tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.7rem]">{t.title}</h1>
            <p className="mt-6 max-w-[52ch] text-[18px] leading-[1.62] text-white/72">
              {t.introText}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#ecebe6] py-4 sm:py-5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-4 rounded-xl border border-ink/10 bg-white/80 p-4 shadow-[0_14px_38px_-30px_rgba(15,20,30,0.25)] md:grid-cols-[minmax(220px,300px),1fr] sm:p-4">
            <div className="relative overflow-hidden rounded-lg border border-ink/10 bg-[#f3f1ea]">
              <Image src="/images/surdurulebilirlik-1-novves.jpg" alt={t.title} width={600} height={400} className="h-[170px] w-full object-cover mix-blend-multiply sm:h-[190px]" priority />
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-bold tracking-tight text-dark sm:text-xl">
                {t.tagline} <span className="text-primary">{t.taglineHighlight}</span> {t.taglineEnd}
              </h2>
              <p className="text-[13px] leading-5 text-secondary/72">{t.introText}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#ecebe6] py-14 sm:py-16">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.12]" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-9 flex items-end gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Sürdürülebilirlik</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-dark sm:text-3xl">SDG Hedeflerimiz</h2>
            </div>
            <div className="hidden h-px flex-1 bg-ink/10 sm:block" />
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {t.sdgGoals.map((goal: { title: string; text: string }, i: number) => (
              <div key={goal.title} className="group overflow-hidden rounded-xl border border-ink/10 bg-[#f8f5ed] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_16px_30px_-22px_rgba(15,20,30,0.3)]">
                <div className="relative h-48 w-full">
                  <Image src={sdgImages[i]} alt={goal.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-base font-bold text-dark">{goal.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-secondary/62">{goal.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <Image src="/images/neden-novves.jpg" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-dark/80" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center">
          <p className="text-lg leading-8 text-white/90">
            {t.perfStat}{" "}
            <span className="font-bold text-primary">{t.perfStatHighlight1}</span>{" "}
            {t.perfStatMid}{" "}
            <span className="font-bold text-primary">{t.perfStatHighlight2}</span>{" "}
            {t.perfStatEnd}
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-dark py-18 sm:py-20">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-[0.07]" style={{ background: "radial-gradient(circle, #FF6B35, transparent 70%)" }} />
        <div className="mx-auto max-w-2xl px-4">
          <h3 className="mb-2 text-lg font-bold text-white">{t.ctaTitle}</h3>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={`/${locale}/urunler/hava-hareketi`} className="rounded border border-white/20 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:border-primary hover:text-primary">{t.ctaProducts}</Link>
            <Link href={`/${locale}/iletisim`} className="rounded bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e55a28]">{t.ctaContact}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
