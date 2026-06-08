import Link from "next/link";

type HeroStat = { value: string; label: string };

type PartnerPageHeroProps = {
  locale: string;
  breadcrumbHome: string;
  breadcrumbContact: string;
  breadcrumbPartners: string;
  badge: string;
  title1: string;
  title2: string;
  desc: string;
  heroLead: string;
  stats: HeroStat[];
};

export function PartnerPageHero({
  locale,
  breadcrumbHome,
  breadcrumbContact,
  breadcrumbPartners,
  badge,
  title1,
  title2,
  desc,
  heroLead,
  stats,
}: PartnerPageHeroProps) {
  return (
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
                  {breadcrumbHome}
                </Link>
              </li>
              <li className="text-white/28">/</li>
              <li>
                <Link href={`/${locale}/iletisim`} className="transition-colors hover:text-white">
                  {breadcrumbContact}
                </Link>
              </li>
              <li className="text-white/28">/</li>
              <li className="font-bold text-primary">{breadcrumbPartners}</li>
            </ol>
          </nav>
        </div>

        <div className="min-w-0 max-w-4xl">
          <div className="mb-4 flex flex-col items-start gap-3 sm:mb-5 sm:gap-4">
            <Link
              href={`/${locale}/iletisim`}
              className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-white/15 bg-sand-100/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition hover:border-primary/55 hover:text-primary sm:text-[11px] sm:tracking-[0.16em]"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              {breadcrumbContact}
            </Link>
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-primary shadow-[0_10px_34px_-24px_rgba(239,95,23,0.75)] backdrop-blur-sm sm:px-3.5 sm:text-[11px] sm:tracking-[0.22em]">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {badge}
            </div>
          </div>
          <h1 className="max-w-4xl whitespace-nowrap font-eurostile text-[clamp(1.45rem,6.8vw,2.25rem)] font-black uppercase leading-[0.92] tracking-[-0.055em] text-white sm:whitespace-normal sm:break-words sm:text-[clamp(3.25rem,10vw,6.35rem)] sm:tracking-[-0.045em] lg:text-[clamp(3.7rem,6vw,6.35rem)]">
            {title1}
            <span className="text-primary">{title2}</span>
          </h1>
          <div className="mt-4 h-1 w-16 rounded-full bg-primary sm:mt-5 sm:w-20" />
          <p className="mt-5 max-w-2xl text-[0.98rem] leading-[1.65] text-white/72 sm:mt-6 sm:text-[1.12rem] sm:leading-[1.75] lg:text-[1.18rem]">
            {desc}
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/55 sm:text-[15px]">{heroLead}</p>

          <div className="mt-6 grid max-w-xl grid-cols-1 gap-2.5 min-[480px]:grid-cols-2 sm:mt-8 sm:grid-cols-3 sm:gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-sand-100/10 p-3.5 shadow-[0_22px_60px_-42px_rgba(0,0,0,0.7)] backdrop-blur-sm sm:p-4"
              >
                <p className="font-eurostile text-xl font-bold leading-none text-white sm:text-2xl">{s.value}</p>
                <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white/45 sm:text-[10px] sm:tracking-[0.18em]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
