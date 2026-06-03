import Image from "next/image";
import Link from "next/link";

export type SolutionLibraryHeroProps = {
  heroImage: string;
  titleLine1: string;
  titleHighlight: string;
  subtitle: string;
  ctaPrimary: string;
  ctaPrimaryHref: string;
  ctaSecondary: string;
  ctaSecondaryHref: string;
};

/** Çözüm kütüphanesi — tüm slug sayfalarında aynı hero panel yapısı */
export function SolutionLibraryHero({
  heroImage,
  titleLine1,
  titleHighlight,
  subtitle,
  ctaPrimary,
  ctaPrimaryHref,
  ctaSecondary,
  ctaSecondaryHref,
}: SolutionLibraryHeroProps) {
  const paragraphs = subtitle ? subtitle.split(/\n\n+/).filter(Boolean) : [];

  return (
    <div className="group relative isolate overflow-hidden rounded-xl bg-gradient-to-br from-[#131B2E] to-[#00386B] shadow-xl sm:rounded-[1.5rem]">
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          className="object-cover opacity-30 mix-blend-overlay transition-transform duration-[20s] group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 70vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#131B2E] via-[#131B2E]/80 to-transparent sm:via-[#131B2E]/65 sm:to-transparent" />
      </div>

      <div className="relative z-10 px-4 py-6 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
        <div
          className="max-w-3xl rounded-2xl border border-white/10 p-4 backdrop-blur-md sm:p-6 lg:p-7"
          style={{ background: "rgba(19, 27, 46, 0.45)" }}
        >
          <h1 className="font-eurostile text-balance font-bold leading-[1.08] tracking-[-0.02em] text-white [font-size:clamp(1.35rem,4.2vw,2.5rem)]">
            <span className="block">{titleLine1}</span>
            {titleHighlight ? <span className="mt-1 block text-primary">{titleHighlight}</span> : null}
          </h1>

          {paragraphs.length > 0 ? (
            <div className="mt-3 space-y-2.5 text-[13px] font-medium leading-[1.65] text-sand-300/95 sm:mt-4 sm:space-y-3 sm:text-sm sm:leading-relaxed">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          ) : null}

          <div className="mt-5 flex w-full shrink-0 flex-col gap-2.5 sm:mt-6 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-3">
            <Link
              href={ctaPrimaryHref}
              className="inline-flex min-h-[2.75rem] w-full items-center justify-center rounded-lg bg-primary px-6 text-sm font-bold text-white shadow-lg shadow-primary/20 transition hover:brightness-110 sm:w-auto"
            >
              {ctaPrimary}
            </Link>
            <Link
              href={ctaSecondaryHref}
              className="inline-flex min-h-[2.75rem] w-full items-center justify-center rounded-lg border border-white/25 bg-[#131B2E]/50 px-6 text-sm font-bold text-white transition hover:border-white/40 hover:bg-[#131B2E]/70 sm:w-auto"
            >
              {ctaSecondary}
            </Link>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute -right-20 top-10 h-[400px] w-[400px] rounded-full bg-primary opacity-[0.04] blur-[100px]"
        aria-hidden
      />
    </div>
  );
}
