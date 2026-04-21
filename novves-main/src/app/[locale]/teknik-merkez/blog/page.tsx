import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";

export const metadata: Metadata = {
  title: "Teknik Yazılar | Novves",
  description: "NOVVES teknik yazılar - mevzuat değişiklikleri, sektörel teknik makaleler.",
};

const topicIcons = [
  <svg key="0" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  <svg key="1" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" /></svg>,
  <svg key="2" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" /></svg>,
];

export default async function Blog({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.technical.blog;

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
            <Link href={`/${locale}/teknik-merkez/blog`} className="transition-colors hover:text-white/70">{t.breadcrumb.technicalCenter}</Link>
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
            <p className="mt-6 max-w-[52ch] text-[18px] leading-[1.62] text-white/72">{t.hero.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="bg-[#ecebe6] py-6 sm:py-8">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-ink/10 bg-[#f8f5ed]">
            <svg className="h-9 w-9 text-secondary/20" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </div>
          <h2 className="mt-8 text-2xl font-bold text-dark">{t.comingSoon.title}</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-secondary/50">{t.comingSoon.text}</p>
          <div className="mx-auto mt-8 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-ink/10" />
            <span className="h-1.5 w-1.5 rounded-full bg-primary/40" />
            <span className="h-px w-8 bg-ink/10" />
          </div>
        </div>
      </section>

      {/* Topic Areas */}
      <section className="relative overflow-hidden bg-[#ecebe6] py-14 sm:py-16">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.12]" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-9 flex items-end gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{t.topicAreas.sectionLabel}</p>
              <h3 className="mt-1 text-xl font-bold text-dark">{t.topicAreas.title}</h3>
            </div>
            <div className="hidden h-px flex-1 bg-ink/10 sm:block" />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {t.topicAreas.items.map((topic: { title: string; description: string }, i: number) => (
              <div key={topic.title} className="group relative overflow-hidden rounded-xl border border-ink/10 bg-[#f5f2eb] p-6 transition-all duration-300 hover:border-primary/25 hover:bg-[#f8f5ed] hover:shadow-[0_16px_30px_-22px_rgba(15,20,30,0.3)]">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#1d2f4d]/90 via-primary/75 to-[#90a5bd]/75 opacity-75 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute left-0 top-0 h-full w-1 bg-ink/15 transition-colors duration-300 group-hover:bg-primary" />
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink/10 bg-[#fbf9f3] text-secondary/45 transition-colors duration-300 group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:text-primary">
                  {topicIcons[i]}
                </div>
                <h4 className="mt-4 text-sm font-bold text-dark">{topic.title}</h4>
                <p className="mt-1.5 text-xs leading-relaxed text-secondary/45">{topic.description}</p>
                <p className="mt-4 text-[11px] font-semibold text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">{t.topicAreas.comingSoonLabel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
