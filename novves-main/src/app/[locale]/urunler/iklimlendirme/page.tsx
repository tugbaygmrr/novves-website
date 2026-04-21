import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";

export const metadata: Metadata = {
  title: "İklimlendirme Ürünleri | Novves",
  description:
    "NOVVES iklimlendirme ürünleri — klima santralleri, nem alma santralleri ve ısı geri kazanım cihazları.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.products.iklimlendirme;
  const s = dict.products.shared;

  return (
    <main>
      {/* ════════════════════════════════════════════════════════
          HERO
      ════════════���═══════════════════════════════════════════ */}
      <section className="relative flex min-h-[540px] items-end overflow-hidden">
        <Image
          src="/images/page-hero/urunler.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#4e525c]/28" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#71757d]/60 via-[#4a4f58]/80 to-[#2f3440]/94" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_16%_10%,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0)_52%),radial-gradient(ellipse_at_86%_96%,rgba(17,22,33,0.42)_0%,rgba(17,22,33,0)_55%)]" />
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.08]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 pt-32 sm:px-6 lg:px-8 lg:pt-36">
          <nav className="mb-10 flex items-center gap-2 text-xs text-white/40">
            <Link href={`/${locale}`} className="transition-colors hover:text-white/70">
              {s.home}
            </Link>
            <span>/</span>
            <Link
              href={`/${locale}/urunler/hava-hareketi`}
              className="transition-colors hover:text-white/70"
            >
              {s.products}
            </Link>
            <span>/</span>
            <span className="text-white/60">{t.title}</span>
          </nav>

          <div className="max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_28px_70px_-40px_rgba(10,12,16,0.75)] backdrop-blur-[2px] sm:p-8 lg:p-10">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/12 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {s.productCatalog}
            </p>
            <h1 className="text-4xl font-bold leading-[1.04] tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.7rem]">
              {t.titleFirst}<span className="text-primary">{t.titleHighlight}</span>
            </h1>
          </div>

          {/* Floating stat pills */}
          <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 py-6">
            {t.pills.map(
              (pill: string) => (
                <span
                  key={pill}
                  className="rounded-lg border border-white/10 bg-white/[0.06] px-3.5 py-2 text-[11px] font-semibold text-white/70 ring-1 ring-white/[0.08] backdrop-blur-sm"
                >
                  {pill}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════��═══════════════════
          TIGER — Full-width hero product
      ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#ecebe6]">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.12]" />
        <span
          className="pointer-events-none absolute right-0 top-0 select-none text-[24rem] font-black leading-none text-[#d8d5cc]/45"
          aria-hidden="true"
        >
          01
        </span>

        <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Text */}
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
                {t.tiger.label}
              </p>
              <h2 className="text-5xl font-extrabold tracking-tight text-dark sm:text-6xl">
                TIGER
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-7 text-secondary/60">
                {t.tiger.desc}
              </p>

              {/* Spec chips */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {t.tiger.specs.map((spec: { label: string; value: string }) => (
                  <div
                    key={spec.label}
                  className="rounded-xl border border-ink/10 bg-[#f5f2eb] px-4 py-3"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wider text-secondary/35">
                      {spec.label}
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-dark">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href={`/${locale}/urunler/klima-santralleri`}
                className="group mt-10 inline-flex items-center gap-3 rounded-xl bg-dark px-7 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-primary hover:shadow-xl hover:shadow-primary/25"
              >
                {s.viewProduct}
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </Link>
            </div>

            {/* Product image — large & dominant */}
            <div className="relative">
              <div className="relative mx-auto aspect-square w-full max-w-lg">
                <div className="absolute inset-4 rounded-full border border-dashed border-gray-200" />
                <div className="absolute inset-12 rounded-full border border-gray-100" />
                <Image
                  src="/images/products/tiger-pre.png"
                  alt="TIGER Klima Santrali"
                  fill
                  className="object-contain p-10 drop-shadow-2xl"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          DOLPHIN — Full-width showcase (reversed)
      ══════════���═════════════════════════════════════════════ */}
      <section className="relative bg-[#f5f2eb]">
        <span
          className="pointer-events-none absolute left-0 top-0 select-none text-[24rem] font-black leading-none text-[#d8d5cc]/45"
          aria-hidden="true"
        >
          02
        </span>

        <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Image first on desktop (reversed) */}
            <div className="relative order-2 lg:order-1">
              <div className="relative mx-auto aspect-square w-full max-w-lg">
                <div className="absolute inset-4 rounded-full border border-dashed border-gray-200/80" />
                <Image
                  src="/images/products/dolphin-pre.png"
                  alt="DOLPHIN Nem Alma Santrali"
                  fill
                  className="object-contain p-10 drop-shadow-2xl"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Text */}
            <div className="order-1 lg:order-2">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
                {t.dolphin.label}
              </p>
              <h2 className="text-5xl font-extrabold tracking-tight text-dark sm:text-6xl">
                DOLPHIN
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-7 text-secondary/60">
                {t.dolphin.desc}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {t.dolphin.specs.map((spec: { label: string; value: string }) => (
                  <div key={spec.label} className="rounded-xl border border-ink/10 bg-[#fbf9f3] px-4 py-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-secondary/35">{spec.label}</p>
                    <p className="mt-0.5 text-sm font-bold text-dark">{spec.value}</p>
                  </div>
                ))}
              </div>

              <Link
                href={`/${locale}/urunler/havuz-nem-alma-santrali`}
                className="group mt-10 inline-flex items-center gap-3 rounded-xl bg-dark px-7 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-primary hover:shadow-xl hover:shadow-primary/25"
              >
                {s.viewProduct}
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════���═══════════════════════���═══════════════════════════
          CARACAL — Dark showcase
      ═════════════��══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#2f3f58]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#334866] via-[#263a57] to-[#1c2f48]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <span
          className="pointer-events-none absolute right-0 top-0 select-none text-[28rem] font-black leading-none text-white/[0.015]"
          aria-hidden="true"
        >
          03
        </span>

        <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Text */}
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
                {t.caracal.label}
              </p>
              <h2 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
                CARACAL
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-7 text-white/50">
                {t.caracal.desc}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  "CARACAL RD",
                  "CARACAL D",
                  "CARACAL RC",
                  "CARACAL CC",
                  "CARACAL DX D",
                  "CARACAL SX D",
                ].map((m) => (
                  <span
                    key={m}
                    className="rounded-lg bg-white/[0.05] px-3.5 py-2 text-xs font-semibold text-white/55 ring-1 ring-white/[0.08]"
                  >
                    {m}
                  </span>
                ))}
              </div>

              <Link
                href={`/${locale}/urunler/isi-geri-kazanim-cihazlari`}
                className="group mt-10 inline-flex items-center gap-3 rounded-xl bg-primary px-7 py-4 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-[#e55a28] hover:shadow-xl hover:shadow-primary/30"
              >
                {s.viewProduct}
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </Link>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative mx-auto aspect-square w-full max-w-lg">
                <div className="absolute inset-4 rounded-full border border-dashed border-white/[0.06]" />
                <div className="absolute inset-12 rounded-full border border-white/[0.04]" />
                <Image
                  src="/images/products/dragonfly-c.png"
                  alt="CARACAL Isı Geri Kazanım"
                  fill
                  className="object-contain p-10 drop-shadow-2xl"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════��═════════════════════
          OTHER CATEGORIES — Glassmorphism
      ══════════════════════��═══════════════════════════════��═ */}
      <section className="relative overflow-hidden bg-[#2f3f58] py-20 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#334866] via-[#263a57] to-[#1c2f48]" />
        <div
          className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, #FF6B35, transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute -right-32 bottom-[-120px] h-[420px] w-[420px] rounded-full opacity-[0.09]"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.32), transparent 72%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
              {s.explore}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {s.otherCategories}
            </h2>
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
                <h3 className="text-[1.05rem] font-bold leading-[1.3] text-white">
                  {cat.label}
                </h3>
                <div className="mt-5 flex items-center gap-2">
                  <span className="h-px w-7 bg-primary/45 transition-all duration-300 group-hover:w-11 group-hover:bg-primary" />
                  <svg
                    className="h-3.5 w-3.5 text-primary/65 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════��═══════════════════════════════════��═══════════
          CTA
      ═════════��══════════════════════��═══════════════════════ */}
      <section className="relative overflow-hidden bg-dark py-20">
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full opacity-[0.07]"
          style={{
            background: "radial-gradient(circle, #FF6B35, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
            {s.technicalSupport}
          </p>
          <h3 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
            {s.lookingForProduct}
          </h3>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/40">
            {t.ctaDesc}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="tel:+902164674752"
              className="group inline-flex items-center gap-3 rounded-xl bg-white/[0.05] px-6 py-3.5 text-sm font-medium text-white ring-1 ring-white/10 transition-all duration-300 hover:bg-primary/20 hover:ring-primary/30"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] ring-1 ring-white/[0.1] transition-colors duration-300 group-hover:bg-primary/20 group-hover:ring-primary/30">
                <svg
                  className="h-3.5 w-3.5 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
              </span>
              +90 216 467 47 52
            </a>
            <Link
              href={`/${locale}/iletisim`}
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-[#e55a28] hover:shadow-xl hover:shadow-primary/30"
            >
              {s.technicalSupportRequest}
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
