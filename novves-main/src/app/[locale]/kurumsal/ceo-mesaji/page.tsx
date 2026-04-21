import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";

const highlightIcons = [
  <svg key="0" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>,
  <svg key="1" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.179 0-6.14-.964-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>,
  <svg key="2" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
];

export default async function CeoMesaji({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.corporate.ceoMesaji;

  return (
    <main>
      <section className="relative flex min-h-[540px] items-end overflow-hidden">
        <Image src="/images/page-hero/ceo.jpg" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[#4e525c]/28" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#71757d]/60 via-[#4a4f58]/82 to-[#2f3440]/94" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_16%_10%,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0)_52%),radial-gradient(ellipse_at_86%_96%,rgba(17,22,33,0.42)_0%,rgba(17,22,33,0)_55%)]" />
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.08]" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 pt-32 sm:px-6 lg:px-8 lg:pt-36">
          <nav className="mb-8 flex items-center gap-2 text-xs text-white/40">
            <Link href={`/${locale}`} className="transition-colors hover:text-white/70">{t.breadcrumbHome}</Link>
            <span>/</span>
            <Link href={`/${locale}/kurumsal`} className="transition-colors hover:text-white/70">{t.breadcrumbCorporate}</Link>
            <span>/</span>
            <span className="text-white/60">{t.breadcrumbPage}</span>
          </nav>
          <div className="max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_28px_70px_-40px_rgba(10,12,16,0.75)] backdrop-blur-[2px] sm:p-8 lg:p-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/12 px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{t.badge}</span>
            </div>
            <h1 className="text-4xl font-bold leading-[1.04] tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.7rem]">
              {t.heroTitle1} <span className="text-primary">{t.heroTitleHighlight}</span>
            </h1>
            <p className="mt-6 max-w-[54ch] text-[18px] leading-[1.62] text-white/72">{t.heroDesc}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#ecebe6] py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <div className="relative">
                  <div className="absolute -top-2 -left-2 h-full w-full rounded-2xl border border-primary/30" />
                  <div className="relative overflow-hidden rounded-2xl border border-ink/10 bg-[#f8f5ed] shadow-[0_18px_40px_-28px_rgba(15,20,30,0.42)]">
                    <Image src="/images/zeki-kadir-ozunturk.jpg" alt="Zeki Kadir Özüntürk" width={480} height={560} className="w-full object-cover object-top" priority />
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-base font-bold text-white">Zeki Kadir ÖZÜNTÜRK</p>
                      <p className="mt-0.5 text-xs font-medium text-primary">{t.ceoTitle}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 space-y-3">
                  {t.highlights.map((h: { value: string; label: string }, i: number) => (
                    <div key={h.label} className="group relative overflow-hidden rounded-xl border border-ink/10 bg-[#f5f2eb] px-5 py-4 transition-all duration-300 hover:border-primary/25 hover:bg-[#f8f5ed] hover:shadow-[0_16px_28px_-22px_rgba(15,20,30,0.35)]">
                      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#1d2f4d]/90 via-primary/75 to-[#90a5bd]/75 opacity-75 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-ink/10 bg-[#fbf9f3] text-primary">{highlightIcons[i]}</div>
                      <div>
                        <p className="text-xl font-bold text-dark">{h.value}</p>
                        <p className="text-xs font-medium text-secondary/60">{h.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="mb-8 flex items-center gap-4">
                <span className="font-serif text-8xl leading-none text-primary/20 select-none" aria-hidden="true">&ldquo;</span>
                <div className="h-px flex-1 bg-ink/10" />
              </div>
              <div className="rounded-2xl border border-ink/10 bg-[#f8f5ed] p-6 shadow-[0_14px_32px_-26px_rgba(15,20,30,0.32)] sm:p-8">
                <div className="space-y-6 text-base leading-8 text-secondary/75">
                <p className="text-xl font-semibold text-dark">{t.greeting}</p>
                <p>{t.messageP1}</p>
                <p>{t.messageP2}</p>
                <p>{t.messageP3}</p>
                <p>{t.messageP4}</p>

                <blockquote className="my-9 rounded-r-2xl border-l-4 border-primary bg-[#f2efe8] py-6 pl-7 pr-5">
                  <p className="text-xl font-semibold italic leading-8 text-dark">&ldquo;{t.pullQuote}&rdquo;</p>
                  <footer className="mt-4 flex items-center gap-3">
                    <span className="h-px w-6 bg-primary" />
                    <span className="text-sm font-medium text-primary">Zeki Kadir Özüntürk</span>
                  </footer>
                </blockquote>

                <p>{t.messageP5}</p>
                <p>{t.messageP6}</p>

                <div className="mt-9 border-t border-ink/10 pt-7">
                  <p className="text-base font-semibold text-dark">{t.signOff}</p>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="h-12 w-12 overflow-hidden rounded-full ring-2 ring-primary/20">
                      <Image src="/images/zeki-kadir-ozunturk.jpg" alt="Zeki Kadir Özüntürk" width={48} height={48} className="h-full w-full object-cover object-top" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-dark">Zeki Kadir ÖZÜNTÜRK</p>
                      <p className="text-xs text-primary">{t.ceoTitle}</p>
                    </div>
                  </div>
                </div>
              </div>
              </div>

              <div className="mt-9 flex flex-wrap gap-3 border-t border-ink/10 pt-8">
                <Link href={`/${locale}/kurumsal/biz-kimiz`} className="inline-flex items-center gap-2 rounded-xl border border-ink/15 bg-[#f8f5ed] px-5 py-2.5 text-sm font-medium text-secondary transition-all duration-200 hover:border-primary/30 hover:text-primary">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" /></svg>
                  {t.linkWhoWeAre}
                </Link>
                <Link href={`/${locale}/kurumsal/ekibimiz`} className="inline-flex items-center gap-2 rounded-xl border border-ink/15 bg-[#f8f5ed] px-5 py-2.5 text-sm font-medium text-secondary transition-all duration-200 hover:border-primary/30 hover:text-primary">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
                  {t.linkTeam}
                </Link>
                <Link href={`/${locale}/iletisim`} className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-200 hover:bg-[#e55a28] hover:shadow-xl hover:shadow-primary/30">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
                  {t.linkContact}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
