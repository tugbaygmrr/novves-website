import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";
import { corporateDetailMetadata } from "@/lib/i18n-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return corporateDetailMetadata(locale, "ceoMesaji");
}

const featureIcons = [
  <svg key="0" className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.048.58.025 1.193-.14 1.743" />
  </svg>,
  <svg key="1" className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
  </svg>,
  <svg key="2" className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
  </svg>,
];

export default async function CeoMesaji({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.corporate.ceoMesaji;
  const ceoName = t.ceoName ?? "Zeki Kadir ÖZÜNTÜRK";
  const features = (t.features ?? []) as { title: string; desc: string }[];
  const paragraphsBefore = (t.paragraphsBeforeQuote ?? []) as string[];
  const paragraphsAfter = (t.paragraphsAfterQuote ?? []) as string[];
  const legacyParagraphs =
    paragraphsBefore.length === 0 && t.messageP1After
      ? [
          `${t.messageP1Brand ?? "NOVVES"}${t.messageP1After}`,
          `${t.messageP2Before ?? ""}${t.messageP2Highlight ?? ""}${t.messageP2After ?? ""}`,
          t.messageP3,
          t.messageP4,
        ].filter(Boolean)
      : [];
  const beforeQuote = paragraphsBefore.length > 0 ? paragraphsBefore : legacyParagraphs;

  return (
    <main className="overflow-x-clip bg-sand-200">
      {/* Hero — koyu zemin + nokta ızgarası */}
      <section className="relative overflow-hidden bg-[#0a0c10] py-12 sm:py-16 md:py-20">
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,#0a0c10_0%,#121820_55%,#0a0c10_100%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.14) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-[max(5.5rem,calc(4.5rem+env(safe-area-inset-top)))] sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">
          <nav className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-white/35 sm:mb-10 sm:text-xs">
            <Link href={`/${locale}`} className="transition-colors hover:text-white/65">
              {t.breadcrumbHome}
            </Link>
            <span className="text-white/25" aria-hidden>
              /
            </span>
            <Link href={`/${locale}/kurumsal`} className="transition-colors hover:text-white/65">
              {t.breadcrumbCorporate}
            </Link>
            <span className="text-white/25" aria-hidden>
              /
            </span>
            <span className="line-clamp-2 text-white/50 sm:line-clamp-none">{t.breadcrumbPage}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/15 px-3.5 py-1.5 ring-1 ring-primary/20 sm:mb-6 sm:px-4">
              <span className="text-primary" aria-hidden>
                ●
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary sm:text-[11px] sm:tracking-[0.22em]">
                {t.badge}
              </span>
            </div>
            <h1 className="font-display text-[1.65rem] font-extrabold leading-[1.08] tracking-tight text-white min-[400px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              {t.heroTitle1}{" "}
              <span className="text-primary">{t.heroTitleHighlight}</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/55 sm:mt-5 sm:text-lg md:text-xl">
              {t.heroDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Ana içerik — bej zemin */}
      <section className="bg-sand-200 py-10 sm:py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-8 md:gap-10 lg:grid-cols-[minmax(280px,38%)_1fr] lg:gap-12 xl:grid-cols-[minmax(300px,400px)_1fr] xl:gap-14">
            <aside className="flex w-full min-w-0 flex-col gap-4 sm:gap-5 md:gap-6 lg:sticky lg:top-28 lg:gap-6">
              <div className="w-full sm:mx-auto sm:max-w-[20rem] md:max-w-md lg:mx-0 lg:max-w-none">
                <div className="group w-full rounded-2xl border border-ink/10 bg-[#f8f5ed] p-3 shadow-[0_18px_40px_-28px_rgba(15,20,30,0.42)] transition-all duration-500 hover:border-primary/25 hover:shadow-[0_34px_80px_-34px_rgba(239,95,23,0.34)] sm:rounded-[2rem] sm:p-4">
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#eef1f4] sm:rounded-[1.5rem]">
                    <div className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100" aria-hidden>
                      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-white/10" />
                    </div>
                    <Image
                      src="/images/zeki-kadir-ozunturk.jpg"
                      alt={ceoName}
                      fill
                      className="object-cover object-[center_12%] saturate-[1.05] transition-all duration-700 group-hover:brightness-110 group-hover:saturate-[1.2] sm:object-[center_18%]"
                      sizes="(max-width: 1024px) 100vw, 400px"
                      priority
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark/95 via-dark/60 to-transparent px-5 pb-5 pt-24 sm:px-7 sm:pb-7 sm:pt-28">
                      <p className="text-lg font-bold leading-tight text-white sm:text-2xl">{ceoName}</p>
                      <p className="mt-1 text-xs font-semibold leading-snug text-primary sm:mt-1.5 sm:text-sm">
                        {t.ceoTitle}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-1 lg:gap-6">
              <div className="flex items-center gap-4 rounded-xl border border-ink/10 bg-[#f8f5ed] p-5 shadow-[0_12px_26px_-20px_rgba(15,20,30,0.22)] sm:gap-5 sm:p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-ink/10 bg-[#fbf9f3] text-primary sm:h-14 sm:w-14">
                  <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-2xl font-black tracking-tight text-dark sm:text-3xl">
                    {t.statProductsValue ?? "1.200+"}
                  </p>
                  <p className="text-xs font-medium uppercase tracking-wider text-secondary/60 sm:text-sm">
                    {t.statProductsLabel ?? "Ürün Çeşidi"}
                  </p>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl bg-dark p-5 text-white shadow-[0_16px_32px_-24px_rgba(0,56,107,0.45)] sm:p-6 md:p-7">
                <p className="text-xs font-bold uppercase tracking-widest text-primary sm:text-sm">
                  {t.globalReachTag ?? "Global Erişim"}
                </p>
                <p className="mt-2 text-base font-bold leading-snug sm:text-lg md:text-xl">
                  {t.globalReachTitle ?? "50+ Ülkede Aktif Mühendislik Projeleri"}
                </p>
                <svg
                  className="pointer-events-none absolute -bottom-4 -right-4 h-28 w-28 text-white/10 sm:h-36 sm:w-36"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={0.75}
                  stroke="currentColor"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.179 0-6.14-.964-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              </div>
              </div>
            </aside>

            <div className="relative min-w-0 lg:pt-4 xl:pt-8">
              <span
                className="pointer-events-none absolute -left-1 top-0 hidden select-none font-serif text-[5rem] leading-none text-primary/12 sm:block sm:-left-4 sm:text-[7rem] lg:-left-6 lg:text-[10rem] xl:text-[12rem]"
                aria-hidden
              >
                &ldquo;
              </span>
              <div className="relative z-10">
                <h2 className="mb-6 flex flex-col gap-3 text-xl font-bold text-dark sm:mb-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 sm:text-2xl md:mb-10 md:text-3xl">
                  {t.greeting}
                  <span className="hidden h-0.5 w-16 bg-primary sm:block sm:w-24" aria-hidden />
                </h2>

                <div className="rounded-xl border border-ink/10 bg-[#f8f5ed] p-4 shadow-[0_14px_32px_-26px_rgba(15,20,30,0.28)] sm:rounded-2xl sm:p-6 md:p-8">
                  <div className="space-y-5 text-[15px] leading-[1.75] text-secondary/75 sm:space-y-6 sm:text-base md:space-y-7 md:text-lg md:leading-loose">
                    {beforeQuote.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)} className="break-words">
                        {paragraph}
                      </p>
                    ))}

                    {t.pullQuote ? (
                      <blockquote className="my-6 rounded-r-xl border-l-4 border-primary bg-[#f2efe8] py-5 pl-5 pr-4 sm:my-8 sm:rounded-r-2xl sm:py-8 sm:pl-8 sm:pr-6 md:my-10 md:py-10 md:pl-10">
                        <p className="text-base italic leading-relaxed text-dark sm:text-lg md:text-xl">
                          &ldquo;{t.pullQuote}&rdquo;
                        </p>
                      </blockquote>
                    ) : null}

                    {paragraphsAfter.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)} className="break-words">
                        {paragraph}
                      </p>
                    ))}

                    {t.closingThanks ? (
                      <p className="font-medium text-dark break-words">{t.closingThanks}</p>
                    ) : null}
                  </div>

                  <div className="mt-8 space-y-1 border-t border-ink/10 pt-6 sm:mt-10 sm:pt-8 md:mt-12">
                    <p className="font-display text-xl font-black italic tracking-tight text-dark sm:text-2xl">
                      {t.signName ?? ceoName}
                    </p>
                    <p className="text-sm font-semibold text-primary">{t.ceoTitle}</p>
                    {t.signCompany ? (
                      <p className="text-[11px] font-medium uppercase leading-snug tracking-wide text-secondary/55 sm:text-xs">
                        {t.signCompany}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {features.length > 0 ? (
        <section className="border-t border-ink/10 bg-sand-200 py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:py-14 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:gap-8">
              {features.map((f, i) => (
                <div
                  key={f.title}
                  className={`group relative overflow-hidden rounded-xl border border-ink/10 bg-[#f8f5ed] p-6 shadow-[0_12px_26px_-20px_rgba(15,20,30,0.26)] transition-all duration-300 hover:border-primary/25 hover:shadow-[0_16px_28px_-22px_rgba(15,20,30,0.35)] sm:p-7 md:p-8 ${
                    i === features.length - 1 && features.length === 3 ? "sm:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-dark/90 via-primary/75 to-sand-400/75 opacity-75 transition-opacity group-hover:opacity-100" />
                  <div className="mb-3 text-primary sm:mb-4 [&_svg]:h-8 [&_svg]:w-8 sm:[&_svg]:h-10 sm:[&_svg]:w-10">
                    {featureIcons[i] ?? featureIcons[0]}
                  </div>
                  <h3 className="text-lg font-bold text-dark sm:text-xl">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-secondary/70">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
