import Image from "next/image";
import Link from "next/link";

export type ReferanslarCatalogCtaDict = {
  title: string;
  description: string;
  button: string;
  pdfFormat: string;
  pdfMeta: string;
  languages: string;
  languagesList: string;
};

type Props = {
  locale: string;
  dict: ReferanslarCatalogCtaDict;
  catalogHref?: string;
  className?: string;
};

export function ReferanslarCatalogCta({
  locale,
  dict,
  catalogHref = `/${locale}/teknik-merkez/dokuman-kutuphanesi`,
  className = "",
}: Props) {
  return (
    <aside className={className}>
      <div className="relative overflow-hidden rounded-3xl bg-hz-primary-container p-8 text-white shadow-[0_32px_48px_-12px_rgba(25,28,30,0.35)] sm:p-10">
        <div className="relative z-10">
          <h3 className="text-2xl font-extrabold leading-tight sm:text-3xl">{dict.title}</h3>
          <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">{dict.description}</p>
          <div className="relative py-8 sm:py-10">
            <Image
              src="/images/catalogs/katalog-mockup-kapak-website-icin.png"
              alt=""
              width={320}
              height={420}
              className="referanslar-float-catalog mx-auto h-auto w-full max-w-[240px] drop-shadow-[0_28px_28px_rgba(0,0,0,0.45)] sm:max-w-[280px]"
            />
          </div>
          <Link
            href={catalogHref}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-hz-secondary-container py-4 text-base font-black text-hz-on-primary transition-opacity hover:opacity-90 sm:py-5 sm:text-lg"
          >
            {dict.button}
            <span className="material-symbols-outlined text-xl">download</span>
          </Link>
          <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-8">
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                <span className="material-symbols-outlined text-hz-secondary-container">description</span>
              </span>
              <div>
                <p className="text-sm font-bold">{dict.pdfFormat}</p>
                <p className="text-xs text-white/60">{dict.pdfMeta}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                <span className="material-symbols-outlined text-hz-secondary-container">language</span>
              </span>
              <div>
                <p className="text-sm font-bold">{dict.languages}</p>
                <p className="text-xs text-white/60">{dict.languagesList}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-hz-secondary/20 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-hz-secondary-container/10 blur-[100px]" />
      </div>
    </aside>
  );
}
