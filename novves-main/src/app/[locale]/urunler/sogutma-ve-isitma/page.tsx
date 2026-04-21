import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";

export const metadata: Metadata = {
  title: "Soğutma ve Isıtma Ürünleri | Novves",
  description:
    "NOVVES soğutma ve ısıtma ürünleri — chiller, iç/dış üniteler, elektrikli ısıtıcılar ve sulu batarya.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.products.sogutmaVeIsitma;
  const s = dict.products.shared;

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-[540px] items-end overflow-hidden">
        <Image src="/images/page-hero/urunler.jpg" alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-[#3c4350]/90" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 pt-32 sm:px-6 lg:px-8 lg:pt-36">
          <nav className="mb-8 flex items-center gap-2 text-xs text-white/45">
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

      {/* ── Coming Soon Notice ───────────────────────────────── */}
      <section className="bg-[#ecebe6] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-[#e5e1d8] px-6 py-4 shadow-[0_10px_28px_-22px_rgba(26,40,66,0.18)]">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-ink/12 bg-[#d9d4c8]">
              <svg className="h-5 w-5 text-[#1f314d]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-[#22324b]/78">
              {t.comingSoonNotice}{" "}
              <Link href={`/${locale}/iletisim`} className="font-semibold text-primary hover:underline">{t.comingSoonLink}</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ── Products ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#ecebe6] pb-20">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.14]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-end gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{s.productRange}</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-dark sm:text-3xl">{s.productFamilies}</h2>
            </div>
            <div className="hidden h-px flex-1 bg-ink/10 sm:block" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.products.map((product: { name: string; type: string; subModels: string[] }, i: number) => (
              <div
                key={product.name}
                className="group relative overflow-hidden rounded-2xl border border-ink/10 bg-[#f5f2eb] p-6 shadow-[0_14px_34px_-30px_rgba(15,20,30,0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_22px_44px_-28px_rgba(15,20,30,0.33)]"
              >
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#1d2f4d]/95 via-primary/85 to-[#90a5bd]/90" />

                <span className="mb-4 block text-3xl font-black text-[#c8c7c2]/45">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="text-[1.25rem] font-bold tracking-tight text-dark">{product.name}</h3>
                <p className="mt-1.5 text-sm font-medium text-primary">{product.type}</p>

                {product.subModels.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {product.subModels.map((model: string) => (
                      <span
                        key={model}
                        className="rounded-md border border-ink/10 bg-[#efece4] px-2.5 py-1 text-[11px] font-medium text-secondary/62"
                      >
                        {model}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-5 inline-flex items-center gap-1.5 rounded-md border border-ink/10 bg-white/55 px-3 py-1.5 text-[11px] font-semibold text-secondary/48">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {s.comingSoon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Other Categories ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#2f3f58] py-20 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#334866] via-[#263a57] to-[#1c2f48]" />
        <div
          className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #FF6B35, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute -right-32 bottom-[-120px] h-[420px] w-[420px] rounded-full opacity-[0.09]"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.32), transparent 72%)" }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center sm:mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{s.explore}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">{s.otherCategories}</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-white/58">
              {s.exploreNovves}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.otherCategories.map((cat: { label: string; slug: string }, i: number) => (
              <Link
                key={cat.label}
                href={`/${locale}/urunler/${cat.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-[0_18px_42px_-34px_rgba(8,14,24,0.7)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/35 hover:bg-white/[0.12] hover:shadow-[0_24px_50px_-28px_rgba(255,107,53,0.22)]"
              >
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-primary/80 via-primary/30 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="mb-4 block text-2xl font-black text-white/[0.12]">
                  {String(i + 1).padStart(2, "0")}
                </span>
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

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-dark py-20">
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #FF6B35, transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">{s.technicalSupport}</p>
          <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
            {s.lookingForProduct}
          </h3>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/45">
            {s.teamReady}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="tel:+902164674752"
              className="group inline-flex items-center gap-3 rounded-lg bg-white/[0.05] px-6 py-3.5 text-sm font-medium text-white ring-1 ring-white/10 transition-all duration-300 hover:bg-primary/20 hover:ring-primary/30"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/[0.06] ring-1 ring-white/[0.1] transition-colors duration-300 group-hover:bg-primary/20 group-hover:ring-primary/30">
                <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </span>
              +90 216 467 47 52
            </a>
            <Link
              href={`/${locale}/iletisim`}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-[#e55a28] hover:shadow-xl hover:shadow-primary/30"
            >
              {s.technicalSupportRequest}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
