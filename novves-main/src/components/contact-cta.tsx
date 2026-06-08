import Image from "next/image";
import Link from "next/link";

type ContactCtaProps = {
  locale: string;
  badge: string;
  title: string;
  description: string;
  formCta: string;
  email?: string;
};

/**
 * Anasayfa dışındaki sayfaların alt CTA bölümü.
 * Footer ile aynı lacivert tema — sayfa altı → footer geçişi pürüzsüz.
 */
export function ContactCta({
  locale,
  badge,
  title,
  description,
  formCta,
  email = "info@novves.com",
}: ContactCtaProps) {
  return (
    <section className="relative overflow-hidden bg-[#0f1d33] py-20 text-white sm:py-24">
      {/* Arka plan görseli — gece dünyası, şehir ışıkları */}
      <Image
        src="/images/contact-cta-bg.jpg"
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 1280px"
        priority={false}
        className="pointer-events-none absolute inset-0 z-0 object-cover object-center"
      />
      {/* Lacivert overlay — text okunabilirliği için */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[#0f1d33]/72" />

      {/* İçerik */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        {/* Badge — primary turuncu, brand uyumlu */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">{badge}</span>
        </div>

        {/* Başlık */}
        <h2 className="font-display text-section font-bold leading-[1.15] tracking-tight text-white">
          {title}
        </h2>

        {/* Açıklama */}
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/60 sm:text-[15px]">
          {description}
        </p>

        {/* Butonlar */}
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={`mailto:${email}`}
            className="group inline-flex w-full items-center justify-center gap-3 rounded-lg border border-white/15 bg-white/[0.04] px-6 py-3.5 text-[13px] font-medium text-white/90 transition-all hover:border-white/30 hover:bg-white/[0.08] hover:text-white sm:w-auto"
          >
            <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            {email}
          </a>
          <Link
            href={`/${locale}/iletisim`}
            className="group inline-flex w-full items-center justify-center gap-3 rounded-lg bg-primary px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_14px_32px_-16px_rgba(239,95,23,0.7)] transition-all hover:bg-primary-deep hover:shadow-[0_18px_40px_-16px_rgba(239,95,23,0.85)] sm:w-auto"
          >
            {formCta}
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
