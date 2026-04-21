import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.technical.patentlerimiz;

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
            <Link href={`/${locale}`} className="transition-colors hover:text-white/70">{t.breadcrumb.home}</Link>
            <span>/</span>
            <Link href={`/${locale}/teknik-merkez/patentlerimiz`} className="transition-colors hover:text-white/70">{t.breadcrumb.technicalCenter}</Link>
            <span>/</span>
            <span className="text-white/60">{t.breadcrumb.current}</span>
          </nav>
          <div className="max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_28px_70px_-40px_rgba(10,12,16,0.75)] backdrop-blur-[2px] sm:p-8 lg:p-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/12 px-3.5 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{t.hero.badge}</span>
            </div>
            <h1 className="text-4xl font-bold leading-[1.04] tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.7rem]">{t.hero.titlePart1}<span className="text-primary">{t.hero.titleHighlight}</span></h1>
            <p className="mt-6 max-w-[52ch] text-[18px] leading-[1.62] text-white/72">{t.hero.subtitle}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#ecebe6] py-6 sm:py-8">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-ink/10 bg-[#f8f5ed]">
            <svg className="h-9 w-9 text-secondary/20" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg>
          </div>
          <h2 className="mt-8 text-2xl font-bold text-dark">{t.comingSoon.title}</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-secondary/50">{t.comingSoon.text}</p>
          <div className="mx-auto mt-8 flex items-center justify-center gap-2"><span className="h-px w-8 bg-ink/10" /><span className="h-1.5 w-1.5 rounded-full bg-primary/40" /><span className="h-px w-8 bg-ink/10" /></div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#ecebe6] py-14 sm:py-16">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.12]" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-9 flex items-end gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{t.patentAreas.sectionLabel}</p>
              <h3 className="mt-1 text-xl font-bold text-dark">{t.patentAreas.title}</h3>
            </div>
            <div className="hidden h-px flex-1 bg-ink/10 sm:block" />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {t.patentAreas.items.map((patent: { title: string; description: string }) => (
              <div key={patent.title} className="group relative overflow-hidden rounded-xl border border-ink/10 bg-[#f5f2eb] p-6 transition-all duration-300 hover:border-primary/25 hover:bg-[#f8f5ed] hover:shadow-[0_16px_30px_-22px_rgba(15,20,30,0.3)]">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#1d2f4d]/90 via-primary/75 to-[#90a5bd]/75 opacity-75 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute left-0 top-0 h-full w-1 bg-ink/15 transition-colors duration-300 group-hover:bg-primary" />
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink/10 bg-[#fbf9f3] text-secondary/45 transition-colors duration-300 group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:text-primary">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
                </div>
                <h4 className="mt-4 text-sm font-bold text-dark">{patent.title}</h4>
                <p className="mt-1.5 text-xs leading-relaxed text-secondary/45">{patent.description}</p>
                <p className="mt-4 text-[11px] font-semibold text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">{t.patentAreas.comingSoonLabel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-dark py-18 sm:py-20">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-[0.07]" style={{ background: "radial-gradient(circle, #FF6B35, transparent 70%)" }} />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{t.cta.sectionLabel}</p>
          <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">{t.cta.title}</h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/40">{t.cta.subtitle}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="mailto:info@novves.com" className="group inline-flex items-center gap-2.5 rounded-lg bg-white/5 px-6 py-3 text-sm font-medium text-white ring-1 ring-white/10 transition-all duration-300 hover:bg-primary/20 hover:ring-primary/30">
              <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
              info@novves.com
            </a>
            <Link href={`/${locale}/iletisim`} className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-[#e55a28] hover:shadow-xl hover:shadow-primary/30">
              {t.cta.contactForm}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
