import Image from "next/image";
import Link from "next/link";

export type SolutionArea = {
  title: string;
  description: string;
  products: { name: string; type: string; image: string }[];
};

export function SolutionPage({
  title,
  subtitle,
  areas,
  locale,
  dict,
}: {
  title: string;
  subtitle?: string;
  areas: SolutionArea[];
  locale: string;
  dict: any;
}) {
  return (
    <main>
      <section className="bg-secondary py-20 text-center">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h1>
          <div className="mx-auto mt-3 h-1 w-16 rounded bg-primary" />
          {subtitle && (
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/70">
              {subtitle}
            </p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {areas.map((area) => (
            <div
              key={area.title}
              className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-dark">{area.title}</h3>
              <p className="mt-1 text-sm text-primary font-medium">
                {area.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {area.products.map((product, i) => (
                  <div
                    key={`${area.title}-${product.name}-${i}`}
                    className="flex items-center gap-3 rounded border border-gray-100 bg-gray-50 px-3 py-2"
                  >
                    <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain"
                        sizes="40px"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-dark">{product.name}</p>
                      <p className="text-[10px] text-secondary/50">{product.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-14 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h3 className="mb-2 text-lg font-bold text-white">{dict.shared.forYourProject}</h3>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={`/${locale}/urunler/hava-hareketi`} className="rounded border border-white/20 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:border-primary hover:text-primary">{dict.shared.allProducts}</Link>
            <Link href={`/${locale}/iletisim`} className="rounded bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e55a28]">{dict.shared.technicalSupportRequest}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
