import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";

const reasonIcons = [
  <svg key="0" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.049.58.025 1.193-.14 1.743" /></svg>,
  <svg key="1" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /></svg>,
  <svg key="2" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>,
  <svg key="3" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21a48.25 48.25 0 01-8.134-.587c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" /></svg>,
  <svg key="4" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>,
];

export default async function BizKimiz({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.corporate.bizKimiz;

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[560px] flex-col justify-between overflow-hidden">
        <Image src="/images/page-hero/ekibimiz.jpg" alt="" fill priority className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/85 via-dark/70 to-dark/80" />
        <div className="pointer-events-none absolute -top-20 right-0 h-80 w-80 rounded-full opacity-15" style={{ background: "radial-gradient(circle, #FF6B35 0%, transparent 70%)" }} />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-white/40">
            <Link href={`/${locale}`} className="transition-colors hover:text-white/70">{t.breadcrumbHome}</Link>
            <span>/</span>
            <Link href={`/${locale}/kurumsal`} className="transition-colors hover:text-white/70">{t.breadcrumbCorporate}</Link>
            <span>/</span>
            <span className="text-white/60">{t.breadcrumbPage}</span>
          </nav>

          <div className="mt-8 max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">{t.badge}</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t.heroTitle1}{" "}<span className="text-primary">{t.heroTitleHighlight}</span>{" "}{t.heroTitle2}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/55">{t.heroDesc}</p>
          </div>
        </div>

        <div className="relative z-10 mt-16 border-t border-white/10 bg-dark/60 backdrop-blur-sm">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 px-4 sm:grid-cols-4 sm:px-6 lg:px-8">
            {t.stats.map((s: { value: string; label: string }) => (
              <div key={s.label} className="py-6 text-center">
                <p className="text-2xl font-bold text-primary sm:text-3xl">{s.value}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-white/50">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Company Intro ────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <div className="mb-4 inline-flex items-center gap-2">
                <span className="h-px w-8 bg-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-primary">{t.introTag}</span>
              </div>
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-dark sm:text-4xl">
                {t.introTitle1}{" "}<span className="text-primary">{t.introTitleHighlight}</span> {t.introTitle2}
              </h2>
              <p className="mt-6 text-base leading-8 text-secondary/75">{t.introP1}</p>
              <p className="mt-4 text-base leading-8 text-secondary/75">{t.introP2}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href={`/${locale}/iletisim`} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#e55a28] hover:shadow-md">
                  {t.contactUs}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </Link>
                <Link href={`/${locale}/kurumsal/sertifikalar`} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-secondary transition-all duration-200 hover:border-primary/30 hover:text-primary">
                  {t.ourCertificates}
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -right-4 h-full w-full rounded-2xl border-2 border-primary/20" />
              <Image src="/images/novves-team.jpg" alt={t.teamAlt} width={640} height={427} className="relative rounded-2xl shadow-xl object-cover" />
              <div className="absolute -bottom-5 -left-5 rounded-2xl bg-dark px-6 py-4 shadow-xl ring-1 ring-white/10">
                <p className="text-2xl font-bold text-primary">{t.foundedYear}</p>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-white/50">{t.foundedLabel}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Solutions ────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -top-4 -left-4 h-full w-full rounded-2xl border-2 border-primary/20" />
              <Image src="/images/novves-factory.jpg" alt={t.factoryAlt} width={640} height={427} className="relative rounded-2xl shadow-xl object-cover" />
            </div>
            <div className="order-1 lg:order-2">
              <div className="mb-4 inline-flex items-center gap-2">
                <span className="h-px w-8 bg-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-primary">{t.approachTag}</span>
              </div>
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-dark sm:text-4xl">
                {t.approachTitle1}{" "}<span className="text-primary">{t.approachTitleHighlight}</span>
              </h2>
              <p className="mt-6 text-base leading-8 text-secondary/75">{t.approachP1}</p>
              <p className="mt-4 text-base leading-8 text-secondary/75">{t.approachP2}</p>
              <ul className="mt-7 space-y-3">
                {t.bulletHighlights.map((item: string) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-secondary/80">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Service Areas ─────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <div className="mb-3 inline-flex items-center gap-2">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs font-bold uppercase tracking-widest text-primary">{t.areasTag}</span>
              <span className="h-px w-8 bg-primary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">{t.areasTitle}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-secondary/65">{t.areasDesc}</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-primary to-[#e55a28]" />
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-white">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>
              </div>
              <h3 className="mb-4 text-xl font-bold text-dark">{t.comfortTitle}</h3>
              <p className="text-sm leading-7 text-secondary/75">{t.comfortDesc}</p>
              <Link href={`/${locale}/urunler`} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-[#e55a28]">
                {t.discoverProducts}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
            </div>
            <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-primary to-[#e55a28]" />
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-white">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 6.75 6.75 0 009 4.5a.75.75 0 01.75.75c0 1.865.768 3.548 2.013 4.762A6.737 6.737 0 0012 6a.75.75 0 01.723.555 6.725 6.725 0 002.64-1.341z" /></svg>
              </div>
              <h3 className="mb-4 text-xl font-bold text-dark">{t.smokeTitle}</h3>
              <p className="text-sm leading-7 text-secondary/75">{t.smokeDesc}</p>
              <Link href={`/${locale}/hizmetler/duman-kontrol-sistemi-tasarimi`} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-[#e55a28]">
                {t.smokeControlServices}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Neden NOVVES ─────────────────────────────────────────── */}
      <section className="bg-dark py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <div className="mb-3 inline-flex items-center gap-2">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs font-bold uppercase tracking-widest text-primary">{t.whyTag}</span>
              <span className="h-px w-8 bg-primary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t.whyTitle} <span className="text-primary">NOVVES</span>?</h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/45">{t.whyDesc}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.reasons.map((reason: { title: string; desc: string }, i: number) => (
              <div key={reason.title} className="group rounded-2xl border border-white/8 bg-white/4 p-7 transition-all duration-200 hover:border-primary/30 hover:bg-white/8">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-white">
                  {reasonIcons[i]}
                </div>
                <h3 className="mb-2 text-sm font-bold text-white">{reason.title}</h3>
                <p className="text-sm leading-6 text-white/45">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────�� */}
      <section className="bg-primary py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">{t.ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/75">{t.ctaDesc}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={`/${locale}/iletisim`} className="rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-primary shadow-sm transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-100">
              {t.ctaContact}
            </Link>
            <Link href={`/${locale}/urunler`} className="rounded-xl border border-white/30 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white/10">
              {t.ctaProducts}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
