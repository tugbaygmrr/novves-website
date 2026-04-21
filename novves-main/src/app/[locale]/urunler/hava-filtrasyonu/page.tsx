import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";

export const metadata: Metadata = {
  title: "Hava Filtrasyonu Ürünleri | Novves",
  description:
    "NOVVES hava filtrasyonu ürünleri — SCALLOP serisi filtreler.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.products.havaFiltrasyonu;
  const s = dict.products.shared;

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-[540px] items-end overflow-hidden">
        <Image src="/images/page-hero/urunler.jpg" alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-[#4e525c]/28" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#71757d]/60 via-[#4a4f58]/80 to-[#2f3440]/94" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_16%_10%,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0)_52%),radial-gradient(ellipse_at_86%_96%,rgba(17,22,33,0.42)_0%,rgba(17,22,33,0)_55%)]" />
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.08]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 pt-32 sm:px-6 lg:px-8 lg:pt-36">
          <nav className="mb-8 flex items-center gap-2 text-xs text-white/40">
            <Link href={`/${locale}`} className="transition-colors hover:text-white/70">{s.home}</Link>
            <span>/</span>
            <Link href={`/${locale}/urunler/hava-hareketi`} className="transition-colors hover:text-white/70">{s.products}</Link>
            <span>/</span>
            <span className="text-white/60">{t.title}</span>
          </nav>

          <div className="max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_28px_70px_-40px_rgba(10,12,16,0.75)] backdrop-blur-[2px] sm:p-8 lg:p-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/12 px-3.5 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{s.productsLabel}</span>
            </div>
            <h1 className="text-4xl font-bold leading-[1.04] tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.7rem]">
              {t.titleFirst} <span className="text-primary">{t.titleHighlight}</span>
            </h1>
            <p className="mt-6 max-w-[52ch] text-[18px] leading-[1.62] text-white/72">
              {t.heroDesc}
            </p>
          </div>
        </div>
      </section>

      {/* ── SCALLOP Showcase ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#ecebe6]">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.12]" />
        <span className="pointer-events-none absolute right-0 top-0 select-none text-[24rem] font-black leading-none text-[#d8d5cc]/45" aria-hidden="true">01</span>

        <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
          <div className="mb-14 flex items-end gap-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">{t.scallop.label}</p>
              <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-dark sm:text-5xl">SCALLOP</h2>
              <p className="mt-4 max-w-lg text-[15px] leading-7 text-secondary/55">
                {t.scallop.subModels.length} {t.scallop.desc}
              </p>
            </div>
            <div className="hidden h-px flex-1 bg-ink/10 sm:block" />
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-3">
            {t.scallop.subModels.map((model: string, i: number) => (
              <div
                key={model}
                className="group relative overflow-hidden rounded-xl border border-ink/10 bg-[#f5f2eb] px-5 py-4 transition-all duration-300 hover:bg-[#f8f5ed] hover:shadow-[0_16px_30px_-22px_rgba(15,20,30,0.3)] hover:border-primary/25"
              >
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#1d2f4d]/90 via-primary/75 to-[#90a5bd]/75 opacity-75 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute left-0 top-0 h-full w-0.5 bg-ink/15 transition-colors duration-300 group-hover:bg-primary" />
                <div className="flex items-center gap-4">
                  <span className="text-xl font-black text-[#c8c7c2]/50">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-sm font-semibold text-secondary/70 transition-colors duration-300 group-hover:text-dark">{model}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/iletisim`}
              className="group inline-flex items-center gap-3 rounded-xl bg-dark px-7 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-primary hover:shadow-xl hover:shadow-primary/25"
            >
              {s.technicalSupportRequest}
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </Link>
            <a
              href="tel:+902164674752"
              className="inline-flex items-center gap-2 rounded-xl border border-ink/12 bg-[#f7f4ed] px-7 py-4 text-sm font-bold text-secondary/82 transition-all duration-300 hover:border-primary/30 hover:text-primary"
            >
              +90 216 467 47 52
            </a>
          </div>
        </div>
      </section>

      {/* ── Other Categories ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#2f3f58] py-20 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#334866] via-[#263a57] to-[#1c2f48]" />
        <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, #FF6B35, transparent 70%)" }} />
        <div className="pointer-events-none absolute -right-32 bottom-[-120px] h-[420px] w-[420px] rounded-full opacity-[0.09]" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.32), transparent 72%)" }} />
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">{s.explore}</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">{s.otherCategories}</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.otherCategories.map((cat: { label: string; slug: string }, i: number) => (
              <Link key={cat.label} href={`/${locale}/urunler/${cat.slug}`} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-[0_18px_42px_-34px_rgba(8,14,24,0.7)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/35 hover:bg-white/[0.12] hover:shadow-[0_24px_50px_-28px_rgba(255,107,53,0.22)]">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-primary/80 via-primary/30 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="mb-4 block text-2xl font-black text-white/[0.12]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-[1.05rem] font-bold leading-[1.3] text-white">{cat.label}</h3>
                <div className="mt-5 flex items-center gap-2">
                  <span className="h-px w-7 bg-primary/45 transition-all duration-300 group-hover:w-11 group-hover:bg-primary" />
                  <svg className="h-3.5 w-3.5 text-primary/65 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
