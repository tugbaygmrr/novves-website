import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../dictionaries";

export default async function Kvkk({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.kvkk;
  const kvkkHrefs = [
    `/${locale}/kvkk/kisisel-verilerin-korunmasi`,
    "/kvkk/FR-0057-Kisisel-Veri-Sahibi-Basvuru-Formu.pdf",
    `/${locale}/kvkk/guvenlik-ve-gizlilik-politikasi`,
    `/${locale}/kvkk/kvkk-ve-islenmesi-beyani`,
  ];

  const kvkkIcons = [
    <svg key="0" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
    <svg key="1" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
    <svg key="2" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>,
    <svg key="3" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>,
  ];

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
            <Link href={`/${locale}`} className="transition-colors hover:text-white/70">{t.breadcrumbHome}</Link>
            <span>/</span>
            <span className="text-white/60">{t.breadcrumbKvkk}</span>
          </nav>

          <div className="max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_28px_70px_-40px_rgba(10,12,16,0.75)] backdrop-blur-[2px] sm:p-8 lg:p-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/12 px-3.5 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{t.badge}</span>
            </div>
            <h1 className="text-4xl font-bold leading-[1.04] tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.7rem]">
              {t.title} <span className="text-primary">{t.titleHighlight}</span>
            </h1>
            <p className="mt-6 max-w-[54ch] text-[18px] leading-[1.62] text-white/72">{t.desc}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#ecebe6] py-6 sm:py-8">
        <div className="mx-auto max-w-7xl rounded-2xl border border-ink/10 bg-[#f8f5ed] px-4 shadow-[0_12px_26px_-20px_rgba(15,20,30,0.26)] sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 divide-y divide-ink/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              { value: `${t.links.length}`, label: t.sectionLabel },
              { value: "6698", label: "KVKK" },
              { value: "NOVVES", label: t.badge },
            ].map((s, idx) => (
              <div key={`${s.label}-${s.value}-${idx}`} className="py-5 text-center">
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
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{t.sectionLabel}</p>
              <h3 className="mt-1 text-xl font-bold text-dark">{t.sectionTitle}</h3>
            </div>
            <div className="hidden h-px flex-1 bg-ink/10 sm:block" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {t.links.map((item: { title: string; description: string }, i: number) => {
              return (
              <Link
                key={item.title}
                href={kvkkHrefs[i]}
                className="group relative overflow-hidden rounded-xl border border-ink/10 bg-[#f8f5ed] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_16px_30px_-22px_rgba(15,20,30,0.35)]"
              >
                <div className="absolute left-0 top-0 h-full w-1 bg-ink/10 transition-colors duration-300 group-hover:bg-primary" />
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/5 text-secondary/40 transition-colors duration-300 group-hover:bg-primary/10 group-hover:text-primary">
                  {kvkkIcons[i]}
                </div>
                <h4 className="mt-4 text-sm font-bold text-dark">{item.title}</h4>
                <p className="mt-1.5 text-xs leading-relaxed text-secondary/45">{item.description}</p>
                <p className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {t.viewDetails}
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </p>
              </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
