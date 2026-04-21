import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { SolutionsCarousel } from "@/components/solutions-carousel";
import { getDictionary, hasLocale } from "../dictionaries";
import heroFactoryImage from "../../../../IMG-20240401-WA0008.jpg";

export const metadata: Metadata = {
  title: "Kurumsal | Novves",
  description:
    "NOVVES kurumsal — hakkımızda, ekibimiz, referanslar, sertifikalar ve daha fazlası.",
};

const corporateItems: { key: string; slug: string }[] = [
  {
    key: "bizKimiz",
    slug: "biz-kimiz",
  },
  {
    key: "ceoMesaji",
    slug: "ceo-mesaji",
  },
  {
    key: "ekibimiz",
    slug: "ekibimiz",
  },
  {
    key: "referanslar",
    slug: "referanslar",
  },
  {
    key: "sertifikalar",
    slug: "sertifikalar",
  },
  {
    key: "politikamiz",
    slug: "politikamiz",
  },
  {
    key: "basinOdasi",
    slug: "basin-odasi",
  },
  {
    key: "haberler",
    slug: "haberler",
  },
];

export default async function KurumsalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const corporate = dict.corporate;
  const nav = dict.common.navbar;
  const s = dict.products.shared;

  const getCorporateName = (key: string) => {
    const page = corporate[key as keyof typeof corporate] as Record<string, unknown>;
    if (!page) return key;
    if (typeof page.breadcrumbPage === "string") return page.breadcrumbPage;
    return key;
  };

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#4a4f58] py-24 pt-40">
        <Image src={heroFactoryImage} alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#71757d]/60 via-[#4a4f58]/82 to-[#2f3440]/94" />
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #FF6B35, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-8 flex items-center gap-2 text-xs text-white/40">
            <Link href={`/${locale}`} className="transition-colors hover:text-white/70">
              {s.home}
            </Link>
            <span>/</span>
            <span className="text-white/60">{nav.corporate}</span>
          </nav>
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                {nav.corporate}
              </span>
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              {nav.corporate}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/55">
              {nav.corporateDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Corporate Grid */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex items-end gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                {nav.corporate}
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-dark sm:text-3xl">
                {nav.corporateDesc}
              </h2>
            </div>
            <div className="hidden h-px flex-1 bg-gray-200 sm:block" />
          </div>

          <SolutionsCarousel
            locale={locale}
            basePath="kurumsal"
            items={corporateItems.map((item) => ({
              key: item.key,
              slug: item.slug,
              name: getCorporateName(item.key),
            }))}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-dark py-20">
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #FF6B35, transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            {s.technicalSupport}
          </p>
          <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
            {s.lookingForProduct}
          </h3>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/45">
            {s.teamReady}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
