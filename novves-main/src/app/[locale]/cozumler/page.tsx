import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HubTreePanel } from "@/components/hub-tree-panel";
import { buildSolutionHubRows } from "@/lib/hub-tree-rows";
import { navbarHubMetadata } from "@/lib/i18n-metadata";
import { SOLUTION_NAV } from "@/lib/hub-nav-config";
import { getDictionary, hasLocale } from "../dictionaries";
import heroFactoryImage from "../../../../IMG-20240401-WA0008.jpg";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return navbarHubMetadata(locale, "solutions");
}

export default async function CozumlerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const solutions = dict.solutions;
  const nav = dict.common.navbar;

  const getSolutionName = (key: string) => {
    const sol = solutions[key as keyof typeof solutions] as Record<string, unknown>;
    if (!sol) return key;
    if (typeof sol.breadcrumbCurrent === "string") return sol.breadcrumbCurrent;
    return key;
  };

  const solutionNames = Object.fromEntries(
    SOLUTION_NAV.map((item) => [item.key, getSolutionName(item.key)] as const),
  );
  const hubRows = buildSolutionHubRows(
    solutions as unknown as Record<string, unknown>,
    SOLUTION_NAV,
    solutionNames,
  );

  return (
    <main>
      <section className="relative overflow-hidden bg-[#4a4f58] py-16 pt-28 sm:py-24 sm:pt-40">
        <Image
          src={heroFactoryImage}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#71757d]/60 via-[#4a4f58]/82 to-[#2f3440]/94" />
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #ef5f17, transparent 70%)" }}
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
          <nav className="mb-8 flex items-center gap-2 text-xs text-white/40">
            <Link href={`/${locale}`} className="transition-colors hover:text-white/70">
              {dict.products.shared.home}
            </Link>
            <span>/</span>
            <span className="text-white/60">{nav.solutions}</span>
          </nav>
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                {nav.solutions}
              </span>
            </div>
            <h1 className="font-eurostile text-3xl font-bold leading-tight tracking-tight text-white sm:text-page-title">
              {nav.solutions}
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
              {nav.solutionsDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="bg-gray-50 py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:gap-6">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                {nav.solutions}
              </p>
              <h2 className="mt-2 font-eurostile text-xl font-bold tracking-tight text-dark sm:text-section">
                {nav.solutionsDesc}
              </h2>
            </div>
            <div className="hidden h-px flex-1 bg-gray-200 sm:block" />
          </div>

          <HubTreePanel
            locale={locale}
            basePath="cozumler"
            items={hubRows}
            treeTitle={dict.products.shared.explore}
            openLabel={dict.products.shared.detailedView}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-dark py-12 sm:py-20">
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #ef5f17, transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            {dict.products.shared.technicalSupport}
          </p>
          <h3 className="mt-3 font-eurostile text-section font-bold text-white">
            {dict.products.shared.lookingForProduct}
          </h3>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/45">
            {dict.products.shared.teamReady}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={`/${locale}/iletisim`}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-primary-deep hover:shadow-xl hover:shadow-primary/30"
            >
              {dict.products.shared.technicalSupportRequest}
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
