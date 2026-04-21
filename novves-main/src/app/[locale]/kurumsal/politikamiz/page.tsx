import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";

const sectionIcons = [
  <svg key="0" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 10-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67" /></svg>,
  <svg key="1" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
  <svg key="2" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>,
  <svg key="3" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>,
];

const certLogos = [
  { src: "/images/certificates/ISO9001.png", label: "ISO 9001" },
  { src: "/images/certificates/ISO14001.png", label: "ISO 14001" },
  { src: "/images/certificates/CE.png", label: "CE" },
  { src: "/images/certificates/TSE.png", label: "TSE" },
];

export default async function Politikamiz({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.corporate.politikamiz;

  return (
    <main>
      <section className="relative flex min-h-[420px] items-end overflow-hidden">
        <Image src="/images/page-hero/ekibimiz.jpg" alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-dark/30" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 pt-32 sm:px-6 lg:px-8">
          <nav className="mb-8 flex items-center gap-2 text-xs text-white/40">
            <Link href={`/${locale}`} className="transition-colors hover:text-white/70">{t.breadcrumbHome}</Link>
            <span>/</span>
            <Link href={`/${locale}/kurumsal`} className="transition-colors hover:text-white/70">{t.breadcrumbCorporate}</Link>
            <span>/</span>
            <span className="text-white/60">{t.breadcrumbPage}</span>
          </nav>
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 backdrop-blur-sm"><span className="h-1.5 w-1.5 rounded-full bg-primary" /><span className="text-xs font-semibold uppercase tracking-wider text-primary">{t.badge}</span></div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">{t.heroTitle1} <span className="text-primary">{t.heroTitleHighlight}</span></h1>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{t.introCompany}</p>
              <h2 className="mt-3 text-2xl font-bold text-dark sm:text-3xl">{t.introTitle}</h2>
              <div className="mt-6 space-y-4 text-[15px] leading-7 text-secondary/70">
                <p>{t.introP1}</p>
                <p>{t.introP2Before} <strong className="font-semibold text-dark">{t.introP2Bold}</strong> {t.introP2After}</p>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 gap-4">
                {certLogos.map((c) => (
                  <div key={c.label} className="flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-gray-50 p-6">
                    <Image src={c.src} alt={c.label} width={64} height={64} className="h-14 w-auto object-contain" />
                    <span className="mt-3 text-[11px] font-semibold text-secondary/40">{c.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {t.sections.map((section: { title: string; number: string; items: string[] }, idx: number) => (
              <div key={section.title} className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:shadow-lg hover:ring-primary/15">
                <div className="flex flex-col lg:flex-row">
                  <div className="flex shrink-0 items-center gap-5 border-b border-gray-100 bg-gray-50 px-8 py-6 lg:w-72 lg:flex-col lg:items-start lg:border-b-0 lg:border-r lg:py-8">
                    <span className="text-3xl font-black text-primary/15 lg:text-5xl">{section.number}</span>
                    <div>
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">{sectionIcons[idx]}</div>
                      <h3 className="mt-3 text-base font-bold text-dark lg:text-lg">{section.title}</h3>
                    </div>
                  </div>
                  <div className="flex-1 px-8 py-6 lg:py-8">
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {section.items.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/8">
                            <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                          </span>
                          <span className="text-[13px] leading-relaxed text-secondary/70">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-dark py-24">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-[0.07]" style={{ background: "radial-gradient(circle, #FF6B35, transparent 70%)" }} />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <span className="mb-2 block font-serif text-7xl leading-none text-primary/20 select-none" aria-hidden="true">&ldquo;</span>
          <blockquote className="text-lg leading-8 text-white/85 sm:text-xl">{t.closingQuote}</blockquote>
          <div className="mx-auto mt-6 flex items-center justify-center gap-2"><span className="h-px w-8 bg-primary/40" /><span className="h-1.5 w-1.5 rounded-full bg-primary" /><span className="h-px w-8 bg-primary/40" /></div>
        </div>
      </section>
    </main>
  );
}
