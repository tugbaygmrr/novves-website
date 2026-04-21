import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";

export const metadata: Metadata = {
  title: "Dolphin - Havuz Nem Alma Santrali | Novves",
  description: "NOVVES Dolphin Serisi havuz nem alma santralleri — kapalı havuzlarda nem kontrolü ve enerji verimliliği.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.products.havuzNemAlmaSantrali;
  const s = dict.products.shared;
  const h = t.tableHeaders;

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
                src="/images/products/dolphin-main.jpg"
                alt="Dolphin"
                fill
                className="object-contain p-6 mix-blend-multiply"
                priority
                sizes="(max-width: 1024px) 100vw, 420px"
              />
            </div>
            <div className="rounded-2xl border border-ink/10 bg-white/95 p-4 shadow-[0_14px_38px_-28px_rgba(15,20,30,0.28)]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-ink/10 bg-[#f3f1ea]">
                      <th className="px-4 py-3 font-semibold text-dark">{h.model}</th>
                      <th className="px-4 py-3 font-semibold text-dark">{h.airFlow}</th>
                      <th className="px-4 py-3 font-semibold text-dark">{h.poolArea}</th>
                      <th className="px-4 py-3 font-semibold text-dark">{h.cooling}</th>
                      <th className="px-4 py-3 font-semibold text-dark">{h.condenser}</th>
                      <th className="px-4 py-3 font-semibold text-dark">{h.waterHeater}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.models.map((m: { model: string; airFlow: string; area: string; cooling: string; condenser: string; water: string }) => (
                      <tr key={m.model} className="border-b border-ink/10 transition-colors hover:bg-[#f7f4ed]">
                        <td className="px-4 py-3 font-medium text-primary">{m.model}</td>
                        <td className="px-4 py-3 text-secondary/70">{m.airFlow}</td>
                        <td className="px-4 py-3 text-secondary/70">{m.area}</td>
                        <td className="px-4 py-3 text-secondary/70">{m.cooling}</td>
                        <td className="px-4 py-3 text-secondary/70">{m.condenser}</td>
                        <td className="px-4 py-3 text-secondary/70">{m.water}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
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
