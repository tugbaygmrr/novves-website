import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";

export const metadata: Metadata = {
  title: "Tiger - Klima Santralleri | Novves",
  description: "NOVVES Tiger Serisi klima santralleri — modüler yapıda, verimlilik odaklı, 500 - 125.000 m³/h hava debisi.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.products.klimaSantralleri;
  const s = dict.products.shared;

  return (
    <main>
      <section className="relative overflow-hidden bg-[#4a4f58] py-16 text-center sm:py-[4.5rem]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#71757d]/58 via-[#4a4f58]/80 to-[#2f3440]/94" />
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.08]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_12%,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0)_54%),radial-gradient(ellipse_at_88%_95%,rgba(17,22,33,0.45)_0%,rgba(17,22,33,0)_55%)]" />

        <div className="relative mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_28px_70px_-40px_rgba(10,12,16,0.72)] backdrop-blur-[2px] sm:p-8">
            <h1 className="text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl">
              {t.title}
            </h1>
            <div className="mx-auto mt-4 h-1 w-16 rounded bg-primary" />
            <p className="mx-auto mt-5 text-[18px] leading-[1.58] text-white/72">{t.subtitle}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#ecebe6] py-8 sm:py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-ink/10 bg-white/80 p-6 shadow-[0_14px_38px_-30px_rgba(15,20,30,0.25)] sm:p-7">
            <p className="text-base leading-7 text-secondary/80">{t.intro}</p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#ecebe6] py-10 sm:py-12">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.12]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 grid gap-6 lg:grid-cols-[minmax(300px,420px),1fr] lg:items-center">
            <div className="relative h-72 overflow-hidden rounded-2xl border border-ink/10 bg-[#f3f1ea] shadow-[0_14px_38px_-28px_rgba(15,20,30,0.28)] sm:h-80">
              <Image
                src="/images/products/tiger-main.jpg"
                alt="Tiger Klima Santrali"
                fill
                className="object-contain p-6 mix-blend-multiply"
                priority
                sizes="(max-width: 1024px) 100vw, 420px"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {t.specs.map((spec: { label: string; value: string }) => (
                <div key={spec.label} className="rounded-xl border border-ink/10 bg-white/95 px-4 py-3 shadow-[0_10px_24px_-22px_rgba(15,20,30,0.18)]">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-secondary/35">{spec.label}</p>
                  <p className="mt-0.5 text-sm font-bold text-dark">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {["/images/products/tiger1.jpg", "/images/products/tiger2.jpg", "/images/products/tiger3.jpg"].map((src) => (
              <div
                key={src}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white/95 shadow-[0_14px_38px_-28px_rgba(15,20,30,0.28)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_24px_52px_-28px_rgba(15,20,30,0.35)]"
              >
                <div className="relative h-56 w-full overflow-hidden bg-[#f3f1ea]">
                  <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#1d2f4d]/95 via-primary/85 to-[#90a5bd]/90" />
                  <Image src={src} alt="Tiger" fill className="object-contain p-4 mix-blend-multiply transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-14 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h3 className="mb-2 text-lg font-bold text-white">{s.lookingForProduct}</h3>
          <p className="text-sm text-white/70">{s.teamReady}</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={`/${locale}/urunler/iklimlendirme`} className="rounded border border-white/20 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:border-primary hover:text-primary">{s.allIklimlendirmeProducts}</Link>
            <Link href={`/${locale}/iletisim`} className="rounded bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e55a28]">{s.technicalSupportRequest}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
