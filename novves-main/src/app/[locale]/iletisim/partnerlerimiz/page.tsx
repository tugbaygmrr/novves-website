import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";

export default async function Partnerlerimiz({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.contact.partnerlerimiz;

  return (
    <main>
      <section className="relative flex min-h-[420px] items-end overflow-hidden">
        <Image src="/images/page-hero/ekibimiz.jpg" alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-dark/30" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 pt-32 sm:px-6 lg:px-8">
          <nav className="mb-8 flex items-center gap-2 text-xs text-white/40">
            <Link href={`/${locale}`} className="transition-colors hover:text-white/70">{t.breadcrumbHome}</Link><span>/</span>
            <Link href={`/${locale}/iletisim`} className="transition-colors hover:text-white/70">{t.breadcrumbContact}</Link><span>/</span>
            <span className="text-white/60">{t.breadcrumbPartners}</span>
          </nav>
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 backdrop-blur-sm"><span className="h-1.5 w-1.5 rounded-full bg-primary" /><span className="text-xs font-semibold uppercase tracking-wider text-primary">{t.badge}</span></div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">{t.title}</h1>
            <p className="mt-4 text-base leading-relaxed text-white/50">{t.desc}</p>
          </div>
        </div>
      </section>
      <section className="bg-white py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-50 ring-1 ring-gray-100"><svg className="h-9 w-9 text-secondary/20" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg></div>
          <h2 className="mt-8 text-2xl font-bold text-dark">{t.comingSoon}</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-secondary/50">{t.comingSoonDesc}</p>
          <div className="mx-auto mt-8 flex items-center justify-center gap-2"><span className="h-px w-8 bg-gray-200" /><span className="h-1.5 w-1.5 rounded-full bg-primary/40" /><span className="h-px w-8 bg-gray-200" /></div>
        </div>
      </section>
    </main>
  );
}
