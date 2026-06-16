import { ProductModelCardsGrid } from "@/components/product-model-cards-grid";
import { ProductStandardMedia } from "@/components/product-standard-media";
import { ProductPageJsonLd } from "@/components/seo/product-page-json-ld";
import Link from "next/link";
import { getProductCatalogUi } from "@/lib/product-catalog-ui";
import { productImageShadowClass, resolveDefaultModelImage } from "@/lib/product-model-media";
import type { Locale } from "@/i18n/config";

export type ProductModel = {
  name: string;
  type: string;
  image: string;
  description: string;
};

type ProductDetailDictionary = {
  shared: {
    allProducts: string;
    certified: string;
    detailedView: string;
    home: string;
    inspect: string;
    lookingForProduct: string;
    model: string;
    models: string;
    mostPreferred: string;
    productFamilies: string;
    productFamily: string;
    productRange: string;
    products: string;
    readLess: string;
    teamReady: string;
    technicalSupport: string;
    technicalSupportRequest: string;
  };
};

/** Sayfaya özel chrome/etiket override'ları (boş bırakılanlar ortak dict.shared'tan gelir). */
export type ProductChrome = Partial<ProductDetailDictionary["shared"]> & { allSolutions?: string };

export type ProductDetailPageProps = {
  title: string;
  subtitle: string;
  intro: string;
  models: ProductModel[];
  locale: string;
  dict: ProductDetailDictionary;
  /** Bu ürün sayfasına özel etiket metinleri (panelden düzenlenir). */
  chrome?: ProductChrome;
  /** Varsayılan: hava-hareketi ürün hub */
  productsHubHref?: string;
  solutionsHref?: string;
  /** Varsayılan: `c.allProducts` + hava-hareketi */
  categoryCtaHref?: string;
  categoryCtaLabel?: string;
};

function introParagraphs(intro: string): string[] {
  const parts = intro.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  return parts.length > 0 ? parts : [intro];
}

export function ProductDetailPage({
  title,
  subtitle,
  intro,
  models,
  locale,
  dict,
  chrome,
  productsHubHref,
  solutionsHref,
  categoryCtaHref,
  categoryCtaLabel,
}: ProductDetailPageProps) {
  // Sayfaya özel etiketler ortak dict.shared'ın üstüne biner.
  const c = { ...dict.shared, ...(chrome ?? {}) };
  const allSolutionsText =
    chrome?.allSolutions?.trim() || getProductCatalogUi(locale as Locale).allSolutions;
  const hubHref = productsHubHref ?? `/${locale}/urunler/hava-hareketi`;
  const solutionsLink = solutionsHref ?? `/${locale}/cozumler/duman-isi-tahliye-sistemleri`;
  const categoryHref = categoryCtaHref ?? `/${locale}/urunler/hava-hareketi`;
  const categoryLabel = categoryCtaLabel ?? c.allProducts;

  const resolveModelImage = (image: string) => resolveDefaultModelImage(image);
  const featuredModel = models[0];
  const modelCount = models.length;
  const modelCountLabel = modelCount === 1 ? c.model : c.models;
  const introParts = introParagraphs(intro);
  const featuredImage = featuredModel ? resolveModelImage(featuredModel.image) : undefined;

  return (
    <>
      <ProductPageJsonLd
        name={title}
        description={intro}
        image={featuredImage}
        models={models}
      />
      <main className="overflow-x-clip bg-sand-200 text-ink">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#111827] pb-9 pt-[5.5rem] text-white sm:pb-14 sm:pt-28 lg:pb-16 lg:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(239,95,23,0.22),transparent_34%),linear-gradient(135deg,#111827_0%,#1e3a5f_48%,#10141f_100%)]" />
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.055]" />
        <div className="pointer-events-none absolute -right-24 top-16 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-28 bottom-0 h-[22rem] w-[22rem] rounded-full bg-white/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 sm:mb-8">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/48 sm:text-[10px] sm:tracking-[0.18em]">
                <li>
                  <Link href={`/${locale}`} className="transition-colors hover:text-white">
                    {c.home}
                  </Link>
                </li>
                <li className="text-white/28">/</li>
                <li>
                  <Link href={hubHref} className="transition-colors hover:text-white">
                    {c.products}
                  </Link>
                </li>
                <li className="text-white/28">/</li>
                <li className="font-bold text-primary">{title}</li>
              </ol>
            </nav>
          </div>

          <div className="grid items-center gap-7 md:gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(24rem,0.78fr)] lg:gap-12">
            <div className="min-w-0">
              <div className="mb-4 flex flex-col items-start gap-3 sm:mb-5 sm:gap-4">
                <Link
                  href={solutionsLink}
                  className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-white/15 bg-sand-100/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition hover:border-primary/55 hover:text-primary sm:text-[11px] sm:tracking-[0.16em]"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                  </svg>
                  {allSolutionsText}
                </Link>
                <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-primary shadow-[0_10px_34px_-24px_rgba(239,95,23,0.75)] backdrop-blur-sm sm:px-3.5 sm:text-[11px] sm:tracking-[0.22em]">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {c.productFamily}
                </div>
              </div>
              <h1 className="max-w-4xl break-words font-eurostile text-[clamp(2.35rem,16vw,4.5rem)] font-black uppercase leading-[0.92] tracking-[-0.045em] text-white sm:text-[clamp(3.25rem,10vw,6.35rem)] lg:text-[clamp(3.7rem,6vw,6.35rem)]">
                {title}
              </h1>
              <div className="mt-4 h-1 w-16 rounded-full bg-primary sm:mt-5 sm:w-20" />
              <p className="mt-5 max-w-2xl text-[0.98rem] leading-[1.65] text-white/72 sm:mt-6 sm:text-[1.12rem] sm:leading-[1.75] lg:text-[1.18rem]">
                {subtitle}
              </p>

              <div className="mt-6 grid max-w-xl grid-cols-1 gap-2.5 min-[480px]:grid-cols-2 sm:mt-8 sm:grid-cols-3 sm:gap-3">
                <div className="rounded-2xl border border-white/10 bg-sand-100/10 p-3.5 shadow-[0_22px_60px_-42px_rgba(0,0,0,0.7)] backdrop-blur-sm sm:p-4">
                  <p className="font-eurostile text-xl font-bold leading-none text-white sm:text-2xl">{modelCount}</p>
                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white/45 sm:text-[10px] sm:tracking-[0.18em]">{modelCountLabel}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-sand-100/10 p-3.5 shadow-[0_22px_60px_-42px_rgba(0,0,0,0.7)] backdrop-blur-sm sm:p-4">
                  <p className="font-eurostile text-xl font-bold leading-none text-white sm:text-2xl">{c.certified}</p>
                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white/45 sm:text-[10px] sm:tracking-[0.18em]">{c.productRange}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-sand-100/10 p-3.5 shadow-[0_22px_60px_-42px_rgba(0,0,0,0.7)] backdrop-blur-sm min-[480px]:col-span-2 sm:col-span-1 sm:p-4">
                  <p className="font-eurostile text-xl font-bold leading-none text-white sm:text-2xl">NOVVES</p>
                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white/45 sm:text-[10px] sm:tracking-[0.18em]">{c.technicalSupport}</p>
                </div>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
                <Link
                  href={`/${locale}/iletisim`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-[0_18px_46px_-20px_rgba(239,95,23,0.8)] transition hover:bg-primary-deep sm:px-6 sm:py-3.5"
                >
                  {c.technicalSupportRequest}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link
                  href={categoryHref}
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-sand-100/10 px-5 py-3 text-sm font-bold text-white shadow-[0_18px_46px_-32px_rgba(0,0,0,0.85)] transition hover:border-primary/55 hover:text-primary sm:px-6 sm:py-3.5"
                >
                  {categoryLabel}
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-5 rounded-[2.25rem] bg-primary/10 blur-2xl" aria-hidden />
              <div className="relative overflow-hidden rounded-[1.5rem] border border-white/12 bg-sand-100/10 p-3 shadow-[0_30px_90px_-44px_rgba(0,0,0,0.9)] backdrop-blur-sm sm:rounded-[2rem] sm:p-4">
                {featuredModel ? (
                  <ProductStandardMedia
                    src={featuredImage ?? ""}
                    alt={featuredModel.name}
                    aspect="4/3"
                    fit="intrinsic"
                    className="rounded-[1.2rem] sm:rounded-[1.45rem]"
                    containerClassName="min-h-[14rem] sm:min-h-[18rem] md:min-h-[22rem]"
                    imageClassName={featuredImage ? productImageShadowClass(featuredImage) : ""}
                    sizes="(max-width: 1024px) 92vw, 38vw"
                  >
                    <span className="absolute left-3 top-3 rounded-full bg-ink px-2.5 py-1 font-eurostile text-[10px] font-bold tabular-nums text-white sm:left-4 sm:top-4 sm:px-3 sm:text-[11px]">
                      01
                    </span>
                    <span className="absolute right-3 top-3 rounded-full bg-[#FFDBD0] px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.14em] text-[#390C00] sm:right-4 sm:top-4 sm:px-3 sm:text-[9px] sm:tracking-[0.16em]">
                      {c.mostPreferred}
                    </span>
                  </ProductStandardMedia>
                ) : null}
                <div className="mt-3 rounded-2xl border border-white/10 bg-sand-100/95 p-3.5 text-ink sm:mt-4 sm:p-4">
                  <p className="font-eurostile text-lg font-bold leading-tight tracking-[-0.02em] sm:text-xl">{featuredModel?.name ?? title}</p>
                  <p className="mt-1 text-sm font-semibold text-primary">{featuredModel?.type ?? c.productFamily}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      {intro && (
        <section className="relative bg-sand-200 py-7 sm:py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-4 md:grid-cols-[0.34fr_1fr] md:gap-8 lg:grid-cols-[0.28fr_1fr] lg:gap-10">
              <div>
                <Link
                  href="#product-models"
                  className="inline-flex text-[10px] font-bold uppercase tracking-[0.18em] text-primary transition-colors hover:text-primary-deep sm:text-[11px] sm:tracking-[0.22em]"
                >
                  {c.detailedView}
                </Link>
                <h2 className="mt-2 font-eurostile text-[1.55rem] font-bold leading-tight tracking-[-0.02em] text-ink sm:text-3xl">
                  {c.productRange}
                </h2>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {introParts.map((paragraph, index) => (
                  <p key={index} className="text-[14.5px] leading-7 text-secondary/78 sm:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Models Grid */}
      <section id="product-models" className="relative scroll-mt-24 overflow-hidden bg-sand-200 py-9 sm:scroll-mt-28 sm:py-12 lg:py-14">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.12]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-3 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary sm:text-[11px] sm:tracking-[0.22em]">{c.productFamilies}</p>
              <h2 className="mt-2 font-eurostile text-[1.8rem] font-bold leading-tight tracking-[-0.03em] text-ink sm:text-4xl">
                {c.productRange}
              </h2>
            </div>
            <div className="hidden h-px flex-1 bg-ink/10 sm:block" />
          </div>
          <ProductModelCardsGrid
            models={models.map((model) => ({
              ...model,
              image: resolveModelImage(model.image),
            }))}
            familyTitle={title}
            locale={locale}
            labels={{
              productFamily: c.productFamily,
              inspect: c.inspect,
              detailedView: c.detailedView,
              readLess: dict.shared.readLess,
              technicalSupportRequest: c.technicalSupportRequest,
            }}
            contactHref={`/${locale}/iletisim`}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-sand-200 pb-12 sm:pb-[4.5rem]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[1.45rem] bg-gradient-to-br from-[#111827] via-[#1e3a5f] to-[#111827] p-5 text-white shadow-[0_26px_80px_-48px_rgba(15,22,36,0.75)] sm:rounded-[1.75rem] sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary sm:text-[11px] sm:tracking-[0.22em]">{c.technicalSupport}</p>
                <h3 className="mt-3 font-eurostile text-[1.85rem] font-bold leading-tight tracking-[-0.03em] text-white sm:text-4xl">
                  {c.lookingForProduct}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/64 sm:text-base">
                  {c.teamReady}
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Link
                  href={`/${locale}/iletisim`}
                  className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-[0_18px_46px_-20px_rgba(239,95,23,0.8)] transition hover:bg-primary-deep sm:px-6 sm:py-3.5"
                >
                  {c.technicalSupportRequest}
                </Link>
                <Link
                  href={categoryHref}
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-sand-100/10 px-5 py-3 text-sm font-bold text-white transition hover:border-primary/55 hover:text-primary sm:px-6 sm:py-3.5"
                >
                  {categoryLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
