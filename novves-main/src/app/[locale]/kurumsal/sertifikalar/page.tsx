import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";

const groupIcons = [
  <svg key="0" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
  <svg key="1" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" /></svg>,
  <svg key="2" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.745 3A23.933 23.933 0 0112 3c2.526 0 4.943.388 7.255 1.106a.75.75 0 01.497.909l-.346 1.388A23.96 23.96 0 0012 5.25a23.96 23.96 0 00-7.406 1.153l-.346-1.388a.75.75 0 01.497-.909z" /></svg>,
  <svg key="3" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" /></svg>,
  <svg key="4" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.412 15.655L9.75 21.75l3.745-4.012M9.257 13.5H3.75l2.659-2.849m2.048-2.194L14.25 2.25 12 10.5h8.25l-4.707 5.043M8.457 8.457L3 3m5.457 5.457l7.086 7.086m0 0L21 21" /></svg>,
  <svg key="5" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
];

const logos = [
  { src: "/images/certificates/TSE.png", alt: "TSE" },
  { src: "/images/certificates/ISO9001.png", alt: "ISO 9001" },
  { src: "/images/certificates/ISO14001.png", alt: "ISO 14001" },
  { src: "/images/certificates/CE.png", alt: "CE" },
  { src: "/images/certificates/EN.png", alt: "EN" },
  { src: "/images/certificates/Efectis.png", alt: "Efectis" },
  { src: "/images/certificates/bsi.png", alt: "BSI" },
];

export default async function Sertifikalar({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.corporate.sertifikalar;

  return (
    <main>
      <section className="relative overflow-hidden">
        <Image src="/images/page-hero/ekibimiz.jpg" alt="" fill priority className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0 bg-[#4e525c]/28" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#71757d]/60 via-[#4a4f58]/80 to-[#2f3440]/94" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_16%_10%,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0)_52%),radial-gradient(ellipse_at_86%_96%,rgba(17,22,33,0.42)_0%,rgba(17,22,33,0)_55%)]" />
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.08]" />
        <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #FF6B35 0%, transparent 70%)" }} />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-6 pt-20 sm:px-6 lg:px-8 lg:pt-24">
          <nav className="flex items-center gap-2 text-xs text-white/40">
            <Link href={`/${locale}`} className="transition-colors hover:text-white/70">{t.breadcrumbHome}</Link>
            <span>/</span>
            <Link href={`/${locale}/kurumsal`} className="transition-colors hover:text-white/70">{t.breadcrumbCorporate}</Link>
            <span>/</span>
            <span className="text-white/60">{t.breadcrumbPage}</span>
          </nav>
          <div className="mt-5 max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_28px_70px_-40px_rgba(10,12,16,0.75)] backdrop-blur-[2px] sm:p-6 lg:p-7">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/12 px-3.5 py-1.5 backdrop-blur-sm"><span className="h-1.5 w-1.5 rounded-full bg-primary" /><span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{t.badge}</span></div>
            <h1 className="text-4xl font-bold leading-[1.04] tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.7rem]">{t.heroTitle1} <span className="text-primary">{t.heroTitleHighlight}</span></h1>
            <p className="mt-6 max-w-[52ch] text-[18px] leading-[1.62] text-white/72">{t.heroDesc}</p>
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-[#ecebe6]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary/40">{t.accreditationLabel}</p>
          <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-14">
            {logos.map((logo) => (<Image key={logo.alt} src={logo.src} alt={logo.alt} width={80} height={80} className="h-14 w-auto object-contain opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-16" />))}
          </div>
        </div>
      </section>

      <section className="bg-[#ecebe6]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-ink/10 border-y border-ink/10 px-4 sm:grid-cols-4 sm:px-6 lg:px-8">
          {t.statsItems.map((stat: { value: string; label: string }) => (
            <div key={stat.label} className="px-4 py-8 text-center sm:py-10">
              <p className="text-2xl font-bold text-primary sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs text-secondary/55">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#ecebe6]">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.12]" />
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="space-y-12">
            {t.groups.map((group: { title: string; items: { name: string; code?: string; description?: string; pdf: string }[] }, groupIdx: number) => (
              <div key={group.title} className="relative">
                {groupIdx > 0 && (<div className="absolute -top-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/10 to-transparent" />)}
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-ink/10 bg-[#f8f5ed] text-secondary">{groupIcons[groupIdx] || groupIcons[0]}</div>
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-dark">{group.title}</h2>
                    <p className="text-xs text-secondary/40">{group.items.length} {t.documentSuffix}</p>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((cert) => (
                    <a key={cert.pdf} href={cert.pdf} target="_blank" rel="noopener noreferrer" className="group relative flex overflow-hidden rounded-lg border border-ink/10 bg-[#f8f5ed] transition-all duration-200 hover:border-primary/30 hover:shadow-[0_16px_30px_-22px_rgba(15,20,30,0.3)]">
                      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#1d2f4d]/90 via-primary/75 to-[#90a5bd]/75 opacity-75 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="w-1 flex-shrink-0 bg-ink/15 transition-colors duration-200 group-hover:bg-primary" />
                      <div className="flex flex-1 items-start gap-4 p-5">
                        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border border-ink/10 bg-[#fbf9f3] transition-colors duration-200 group-hover:border-primary/30 group-hover:bg-primary/10">
                          <svg className="h-5 w-5 text-secondary/50 transition-colors duration-200 group-hover:text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold leading-snug text-dark transition-colors duration-200 group-hover:text-primary">{cert.name}</p>
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            {cert.code && (<span className="inline-flex rounded-md border border-secondary/10 bg-secondary/5 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-secondary/60">{cert.code}</span>)}
                            {cert.description && (<span className="text-[11px] text-secondary/35">{cert.description}</span>)}
                          </div>
                          <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                            {t.downloadPdf}
                          </p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-dark">
        <div className="mx-auto max-w-7xl px-4 py-18 sm:px-6 sm:py-20 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-secondary px-6 py-14 text-center sm:px-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-[0.07]" style={{ background: "radial-gradient(circle, #FF6B35 0%, transparent 70%)" }} />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full opacity-[0.05]" style={{ background: "radial-gradient(circle, #FF6B35 0%, transparent 70%)" }} />
            <div className="relative z-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{t.ctaTag}</p>
              <h2 className="mx-auto mt-4 max-w-xl text-2xl font-bold leading-tight text-white sm:text-3xl">{t.ctaTitle}</h2>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/40">{t.ctaDesc}</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <Link href={`/${locale}/iletisim`} className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25">
                  {t.ctaContact}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </Link>
                <Link href={`/${locale}/kurumsal/biz-kimiz`} className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-7 py-3 text-sm font-medium text-white/60 transition-all duration-200 hover:border-white/20 hover:text-white/80">{t.ctaAbout}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
