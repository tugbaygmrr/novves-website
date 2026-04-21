import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../dictionaries";

export default async function Kvkk({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.kvkk;

  const kvkkIcons = [
    <svg key="0" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
    <svg key="1" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
    <svg key="2" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>,
    <svg key="3" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>,
  ];

  return (
    <main>
      <section className="relative flex min-h-[420px] items-end overflow-hidden">
        <Image src="/images/page-hero/ekibimiz.jpg" alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-dark/30" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 pt-32 sm:px-6 lg:px-8">
          <nav className="mb-8 flex items-center gap-2 text-xs text-white/40">
            <Link href={`/${locale}`} className="transition-colors hover:text-white/70">{t.breadcrumbHome}</Link>
            <span>/</span>
            <span className="text-white/60">{t.breadcrumbKvkk}</span>
          </nav>

          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">{t.badge}</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              {t.title} <span className="text-primary">{t.titleHighlight}</span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/50">{t.desc}</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{t.sectionLabel}</p>
              <h3 className="mt-1 text-xl font-bold text-dark">{t.sectionTitle}</h3>
            </div>
            <div className="hidden h-px flex-1 bg-gray-200 sm:block" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {t.links.map((item: { title: string; description: string }, i: number) => {
              const kvkkHrefs = [
                `/${locale}/kvkk/kisisel-verilerin-korunmasi`,
                "/kvkk/FR-0057-Kisisel-Veri-Sahibi-Basvuru-Formu.pdf",
                `/${locale}/kvkk/guvenlik-ve-gizlilik-politikasi`,
                `/${locale}/kvkk/kvkk-ve-islenmesi-beyani`,
              ];
              return (
              <Link
                key={item.title}
                href={kvkkHrefs[i]}
                className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:shadow-lg hover:ring-primary/20"
              >
                <div className="absolute left-0 top-0 h-full w-1 bg-gray-100 transition-colors duration-300 group-hover:bg-primary" />
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
