import Image from "next/image";
import Link from "next/link";

export type ProductModel = {
  name: string;
  type: string;
  image: string;
  description: string;
};

export type ProductDetailPageProps = {
  title: string;
  subtitle: string;
  intro: string;
  models: ProductModel[];
  locale: string;
  dict: any;
};

export function ProductDetailPage({
  title,
  subtitle,
  intro,
  models,
  locale,
  dict,
}: ProductDetailPageProps) {
  const resolveModelImage = (image: string) => {
    if (!image || image.endsWith("/free.jpg")) {
      return "/images/products/heron-ah.jpg";
    }
    return image;
  };

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#4a4f58] py-16 text-center sm:py-[4.5rem]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#71757d]/58 via-[#4a4f58]/80 to-[#2f3440]/94" />
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.08]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_12%,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0)_54%),radial-gradient(ellipse_at_88%_95%,rgba(17,22,33,0.45)_0%,rgba(17,22,33,0)_55%)]" />

        <div className="relative mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_28px_70px_-40px_rgba(10,12,16,0.72)] backdrop-blur-[2px] sm:p-8">
            <h1 className="text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl">
              {title}
            </h1>
            <div className="mx-auto mt-4 h-1 w-16 rounded bg-primary" />
            <p className="mx-auto mt-5 text-[18px] leading-[1.58] text-white/72">{subtitle}</p>
          </div>
        </div>
      </section>

      {/* Intro */}
      {intro && (
        <section className="bg-[#ecebe6] py-8 sm:py-10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-ink/10 bg-white/80 p-6 shadow-[0_14px_38px_-30px_rgba(15,20,30,0.25)] sm:p-7">
              <p className="text-base leading-7 text-secondary/80">{intro}</p>
            </div>
          </div>
        </section>
      )}

      {/* Models Grid */}
      <section className="relative overflow-hidden bg-[#ecebe6] py-10 sm:py-12">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.12]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {models.map((model) => (
              <div
                key={model.name}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white/95 shadow-[0_14px_38px_-28px_rgba(15,20,30,0.28)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_24px_52px_-28px_rgba(15,20,30,0.35)]"
              >
                <div className="relative h-56 w-full overflow-hidden bg-white">
                  <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#1d2f4d]/95 via-primary/85 to-[#90a5bd]/90" />
                  <Image
                    src={resolveModelImage(model.image)}
                    alt={model.name}
                    fill
                    className="object-contain p-0 transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col border-t border-ink/10 p-5">
                  <h3 className="text-[1.75rem] font-bold leading-[1.05] tracking-[-0.02em] text-dark">{model.name}</h3>
                  <p className="mt-1 text-sm font-medium text-primary">
                    {model.type}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-secondary/62 line-clamp-3">
                    {model.description}
                  </p>
                  <div className="mt-auto pt-5">
                    <div className="flex items-center justify-center border-t border-ink/10 pt-3">
                      <Image
                        src="/images/novves-logo.svg"
                        alt="Novves"
                        width={100}
                        height={28}
                        className="h-6 w-auto opacity-[0.82] transition-opacity duration-300 group-hover:opacity-100"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary py-14 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h3 className="mb-2 text-lg font-bold text-white">
            {dict.shared.lookingForProduct}
          </h3>
          <p className="text-sm text-white/70">
            {dict.shared.teamReady}
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={`/${locale}/urunler/hava-hareketi`}
              className="rounded border border-white/20 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:border-primary hover:text-primary"
            >
              {dict.shared.allProducts}
            </Link>
            <Link
              href={`/${locale}/iletisim`}
              className="rounded bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e55a28]"
            >
              {dict.shared.technicalSupportRequest}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
