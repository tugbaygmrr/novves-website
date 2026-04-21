"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type Accessory = {
  name: string;
  image: string;
  description: string;
};

type AksesuarlarClientProps = {
  locale: string;
  accessories: Accessory[];
  otherCategories: { label: string; slug: string }[];
  shared: {
    home: string;
    products: string;
    productsLabel: string;
    explore: string;
    otherCategories: string;
    technicalSupport: string;
    technicalSupportRequest: string;
    searchProducts: string;
    clear: string;
    results: string;
    noResults: string;
    readMore: string;
    readLess: string;
    getQuote: string;
  };
  titleFirst: string;
  titleHighlight: string;
  productCount: string;
  ctaTitle: string;
};

export default function AksesuarlarClient({
  locale,
  accessories,
  otherCategories,
  shared: s,
  titleFirst,
  titleHighlight,
  productCount,
  ctaTitle,
}: AksesuarlarClientProps) {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    if (!search) return accessories;
    const q = search.toLowerCase();
    return accessories.filter(
      (a) => a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)
    );
  }, [search, accessories]);

  const resolveAccessoryImage = (name: string, image: string) => {
    const mappedFallbacks: Record<string, string> = {
      "AE-V Yönlendirici Kanat": "/images/products/ae-pm-tel-kafes.jpg",
      "AE-OC Çıkış Başlığı": "/images/products/ae-ic-giris-konisi.jpg",
      "AE-AF Çatı Adaptör Çerçevesi": "/images/products/ae-frs.jpg",
      "AE-CB Çatı Bağlantı Kutusu": "/images/products/ae-frs.jpg",
    };

    const safeFallback = mappedFallbacks[name] ?? "/images/products/ae-sf-baglanti-ayaklari.jpg";

    if (!image || image.endsWith("/free.jpg") || failedImages[name]) {
      return safeFallback;
    }
    return image;
  };

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
          <nav className="mb-8 flex items-center gap-2 text-xs text-white/45">
            <Link href={`/${locale}`} className="transition-colors hover:text-white/70">{s.home}</Link>
            <span>/</span>
            <Link href={`/${locale}/urunler/hava-hareketi`} className="transition-colors hover:text-white/70">{s.products}</Link>
            <span>/</span>
            <span className="text-white/60">{titleFirst}{titleHighlight}</span>
          </nav>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_28px_70px_-40px_rgba(10,12,16,0.75)] backdrop-blur-[2px] sm:p-8 lg:p-10">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/12 px-3.5 py-1.5 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{s.productsLabel}</span>
              </div>
              <h1 className="text-4xl font-bold leading-[1.04] tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.7rem]">
                {titleFirst}<span className="text-primary">{titleHighlight}</span>
              </h1>
            </div>
            <span className="rounded-full border border-white/15 bg-[#1f2f49]/55 px-4 py-2 text-[13px] font-semibold text-white/72 shadow-[0_10px_22px_-16px_rgba(8,12,18,0.55)] backdrop-blur-sm">
              {accessories.length} {productCount}
            </span>
          </div>
        </div>
      </section>

      {/* ── Search / Filter Bar ──────────────────────────────── */}
      <section className="sticky top-20 z-30 border-b border-ink/10 bg-[#e8e6df]/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 py-4">
            <div className="relative flex-1">
              <svg className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary/20" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={s.searchProducts}
                className="w-full rounded-lg border border-ink/12 bg-[#f4f2ec] py-2.5 pl-10 pr-4 text-sm text-secondary outline-none transition-all duration-200 placeholder:text-secondary/30 focus:border-primary focus:bg-[#fbfaf6] focus:ring-2 focus:ring-primary/10"
              />
            </div>
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="flex items-center gap-1.5 rounded-lg border border-ink/12 bg-[#f4f2ec] px-3.5 py-2.5 text-xs font-medium text-secondary/60 transition-all hover:border-primary/30 hover:text-primary"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                {s.clear}
              </button>
            )}
            <span className="hidden whitespace-nowrap rounded-lg border border-ink/12 bg-[#f4f2ec] px-3 py-1.5 text-xs font-semibold text-secondary/55 sm:inline-block">
              {filtered.length} {s.results}
            </span>
          </div>
        </div>
      </section>

      {/* ── Products ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#ecebe6] py-12">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.12]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f4f1ea]">
                <svg className="h-7 w-7 text-secondary/15" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <p className="mt-4 text-sm font-medium text-secondary/40">{s.noResults}</p>
            </div>
          ) : (
            <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item, i) => {
                const isExpanded = expanded === item.name;
                return (
                  <div
                    key={`${item.name}-${i}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-[#f5f2eb] shadow-[0_14px_34px_-30px_rgba(15,20,30,0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_22px_44px_-28px_rgba(15,20,30,0.33)]"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f1ede4]">
                      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#1d2f4d]/90 via-primary/75 to-[#90a5bd]/75 opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                      <Image
                        src={resolveAccessoryImage(item.name, item.image)}
                        alt={item.name}
                        fill
                        className="object-contain p-6 mix-blend-multiply transition-transform duration-500 group-hover:scale-[1.04]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        onError={() => {
                          setFailedImages((prev) => ({ ...prev, [item.name]: true }));
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col border-t border-ink/10 px-6 py-5">
                      <h3 className="text-[15px] font-bold leading-snug text-dark">
                        {item.name}
                      </h3>

                      <p className={`mt-2.5 text-[13px] leading-relaxed text-secondary/55 ${isExpanded ? "" : "line-clamp-2"}`}>
                        {item.description}
                      </p>

                      {item.description.length > 100 && (
                        <button
                          type="button"
                          onClick={() => setExpanded(isExpanded ? null : item.name)}
                          className="mt-2 self-start text-xs font-semibold text-primary transition-colors hover:text-[#e55a28]"
                        >
                          {isExpanded ? s.readLess : s.readMore}
                        </button>
                      )}

                      <div className="mt-auto pt-5">
                        <Link
                          href={`/${locale}/iletisim`}
                          className="inline-flex items-center gap-1.5 rounded-md border border-ink/10 bg-[#eee9df] px-2.5 py-1.5 text-xs font-semibold text-secondary/55 transition-colors duration-200 hover:border-primary/25 hover:text-primary"
                        >
                          {s.getQuote}
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── Other Categories ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#2f3f58] py-20 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#334866] via-[#263a57] to-[#1c2f48]" />
        <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, #FF6B35, transparent 70%)" }} />
        <div className="pointer-events-none absolute -right-32 bottom-[-120px] h-[420px] w-[420px] rounded-full opacity-[0.09]" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.32), transparent 72%)" }} />
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center sm:mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{s.explore}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">{s.otherCategories}</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-white/58">
              NOVVES urun yelpazesindeki diger kategorileri inceleyin.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {otherCategories.map((cat, i) => (
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

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-dark py-20">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full opacity-[0.07]" style={{ background: "radial-gradient(circle, #FF6B35, transparent 70%)" }} />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">{s.technicalSupport}</p>
          <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">{ctaTitle}</h3>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/45">
            {s.technicalSupportRequest && ""}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="tel:+902164674752" className="group inline-flex items-center gap-3 rounded-lg bg-white/[0.05] px-6 py-3.5 text-sm font-medium text-white ring-1 ring-white/10 transition-all duration-300 hover:bg-primary/20 hover:ring-primary/30">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/[0.06] ring-1 ring-white/[0.1] transition-colors duration-300 group-hover:bg-primary/20 group-hover:ring-primary/30">
                <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </span>
              +90 216 467 47 52
            </a>
            <Link href={`/${locale}/iletisim`} className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-[#e55a28] hover:shadow-xl hover:shadow-primary/30">
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
