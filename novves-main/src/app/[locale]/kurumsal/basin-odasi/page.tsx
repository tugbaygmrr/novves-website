import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";

const mediaIcons = [
  <svg key="0" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" /></svg>,
  <svg key="1" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
  <svg key="2" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" /></svg>,
];

export default async function BasinOdasi({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.corporate.basinOdasi;

  return (
    <main>
      <section className="relative flex min-h-[540px] items-end overflow-hidden">
        <Image src="/images/page-hero/ekibimiz.jpg" alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-[#4e525c]/28" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#71757d]/60 via-[#4a4f58]/82 to-[#2f3440]/94" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_16%_10%,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0)_52%),radial-gradient(ellipse_at_86%_96%,rgba(17,22,33,0.42)_0%,rgba(17,22,33,0)_55%)]" />
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.08]" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 pt-32 sm:px-6 lg:px-8 lg:pt-36">
          <nav className="mb-8 flex items-center gap-2 text-xs text-white/40">
            <Link href={`/${locale}`} className="transition-colors hover:text-white/70">{t.breadcrumbHome}</Link><span>/</span>
            <Link href={`/${locale}/kurumsal`} className="transition-colors hover:text-white/70">{t.breadcrumbCorporate}</Link><span>/</span>
            <span className="text-white/60">{t.breadcrumbPage}</span>
          </nav>
          <div className="max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_28px_70px_-40px_rgba(10,12,16,0.75)] backdrop-blur-[2px] sm:p-8 lg:p-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/12 px-3.5 py-1.5 backdrop-blur-sm"><span className="h-1.5 w-1.5 rounded-full bg-primary" /><span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{t.badge}</span></div>
            <h1 className="text-4xl font-bold leading-[1.04] tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.7rem]">{t.heroTitle1} <span className="text-primary">{t.heroTitleHighlight}</span></h1>
            <p className="mt-6 max-w-[52ch] text-[18px] leading-[1.62] text-white/72">{t.heroDesc}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#ecebe6] py-6 sm:py-8">
        <div className="mx-auto max-w-7xl rounded-2xl border border-ink/10 bg-[#f8f5ed] px-4 shadow-[0_12px_26px_-20px_rgba(15,20,30,0.26)] sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 divide-y divide-ink/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              { value: `${t.mediaAssets.length}`, label: t.mediaTitle },
              { value: "24/7", label: t.contactTag },
              { value: "NOVVES", label: t.badge },
            ].map((s) => (
              <div key={s.label} className="py-5 text-center">
                <p className="text-xl font-bold text-primary sm:text-2xl">{s.value}</p>
                <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-secondary/50">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#ecebe6] py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end gap-4">
            <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{t.mediaTag}</p><h3 className="mt-1 text-xl font-bold text-dark">{t.mediaTitle}</h3></div>
            <div className="hidden h-px flex-1 bg-ink/10 sm:block" />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {t.mediaAssets.map((asset: { title: string; description: string }, i: number) => (
              <div key={asset.title} className="group relative overflow-hidden rounded-xl border border-ink/10 bg-[#f8f5ed] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_16px_30px_-22px_rgba(15,20,30,0.35)]">
                <div className="absolute left-0 top-0 h-full w-1 bg-ink/10 transition-colors duration-300 group-hover:bg-primary" />
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/5 text-secondary/40 transition-colors duration-300 group-hover:bg-primary/10 group-hover:text-primary">{mediaIcons[i]}</div>
                <h4 className="mt-4 text-sm font-bold text-dark">{asset.title}</h4>
                <p className="mt-1.5 text-xs leading-relaxed text-secondary/45">{asset.description}</p>
                <p className="mt-4 text-[11px] font-semibold text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">{t.comingSoonSmall}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-ink/10 bg-[#f8f5ed] p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-ink/10 bg-[#fbf9f3]">
              <svg className="h-8 w-8 text-secondary/20" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" /></svg>
            </div>
            <h2 className="mt-6 text-2xl font-bold text-dark">{t.comingSoon}</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-secondary/50">{t.comingSoonDesc}</p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-dark py-20">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-[0.07]" style={{ background: "radial-gradient(circle, #FF6B35, transparent 70%)" }} />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{t.contactTag}</p>
          <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">{t.contactTitle}</h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/40">{t.contactDesc}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="mailto:info@novves.com" className="group inline-flex items-center gap-2.5 rounded-lg bg-white/5 px-6 py-3 text-sm font-medium text-white ring-1 ring-white/10 transition-all duration-300 hover:bg-primary/20 hover:ring-primary/30">
              <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
              info@novves.com
            </a>
            <Link href={`/${locale}/iletisim`} className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-[#e55a28] hover:shadow-xl hover:shadow-primary/30">
              {t.contactForm}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
