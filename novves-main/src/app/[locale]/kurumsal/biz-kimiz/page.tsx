import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";
import { corporateDetailMetadata } from "@/lib/i18n-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return corporateDetailMetadata(locale, "bizKimiz");
}

type ValueCard = { title: string; icon: string };
type ProcessStep = { title: string; desc: string };
type ServiceCard = { title: string; desc?: string; icon: string };
type ActivityField = {
  title: string;
  desc: string;
  paragraphs?: string[];
  itemsLabel?: string;
  items: string[];
  cta: string;
  href: string;
  image: string;
  reverse?: boolean;
};

/** public/ görseli değişince Next Image önbelleğini kır */
const ACTIVITY_IMAGE_REVISION = "3";

function activityImageSrc(path: string) {
  const base = path.split("?")[0] ?? path;
  return `${base}?v=${ACTIVITY_IMAGE_REVISION}`;
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function IconArrow({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

function ValueIcon({ name, className }: { name: string; className?: string }) {
  const cn = className ?? "h-7 w-7";
  if (name === "speed") {
    return (
      <svg className={cn} fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    );
  }
  if (name === "eco") {
    return (
      <svg className={cn} fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652 1.138l-.679-.339a1.125 1.125 0 00-1.006.352L5.25 16.5l-.298-.596a1.125 1.125 0 00-1.006-.352l-.679.339a.956.956 0 01-1.652-1.138L3.697 12.75l-1.255-.628a.75.75 0 01-.427-1.605l.143-.048a1.107 1.107 0 00.57-1.664L3.3 8.766c.32-.48.226-1.12-.216-1.49l-1.068-.89A1.125 1.125 0 012.25 5.516V4.5c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v3.75M12.75 3.03l3 3M12.75 3.03V4.5" />
      </svg>
    );
  }
  return (
    <svg className={cn} fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const cn = className ?? "h-6 w-6";
  const svgProps = {
    className: cn,
    fill: "none" as const,
    viewBox: "0 0 24 24",
    strokeWidth: 1.75,
    stroke: "currentColor",
    "aria-hidden": true as const,
  };

  switch (name) {
    case "parking":
      return (
        <svg {...svgProps}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5M3.75 9.75V21M9 9.75V21M9 6.75h6v3M9 3.75h6v3" />
        </svg>
      );
    case "jetfan":
      return (
        <svg {...svgProps}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      );
    case "smoke-extract":
      return (
        <svg {...svgProps}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 6.75 6.75 0 009 4.5a.75.75 0 01.75.75c0 1.865.768 3.548 2.013 4.762A6.737 6.737 0 0012 6a.75.75 0 01.723.555 6.725 6.725 0 002.64-1.341z" />
        </svg>
      );
    case "smoke-control":
      return (
        <svg {...svgProps}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      );
    case "turnkey":
      return (
        <svg {...svgProps}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5a1.125 1.125 0 00-1.125-1.125H3.375a1.125 1.125 0 00-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      );
    case "commissioning":
      return (
        <svg {...svgProps}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l7.152-8.684c.833-.686.995-1.874.904-2.95a4.502 4.502 0 016.616-4.868L21.75 6.75z" />
        </svg>
      );
    case "documentation":
      return (
        <svg {...svgProps}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      );
    case "qa-support":
      return (
        <svg {...svgProps}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "cfd":
    default:
      return (
        <svg {...svgProps}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      );
  }
}

export default async function BizKimiz({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.corporate.bizKimiz;

  const valueCards = (t.valueCards ?? []) as ValueCard[];
  const processSteps = (t.processSteps ?? []) as ProcessStep[];
  const services = (t.services ?? []) as ServiceCard[];
  const activityFields = (t.activityFields ?? []) as ActivityField[];
  const identityParagraphs = (t.identityParagraphs ?? []) as string[];
  const approachParagraphs = (t.approachParagraphs ?? []) as string[];
  const activityParagraphs = (t.activityParagraphs ?? []) as string[];

  return (
    <main className="overflow-x-clip bg-sand-200">
      {/* Hero */}
      <section className="relative flex min-h-[min(68vh,560px)] items-center overflow-hidden bg-[#131b2e] sm:min-h-[min(80vh,680px)] lg:min-h-[min(88vh,760px)]">
        <Image
          src="/images/page-hero/novves-vision.png"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-50 mix-blend-overlay sm:opacity-60"
          sizes="(max-width: 768px) 100vw, 1280px"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#131b2e]/95 via-[#131b2e]/80 to-[#131b2e]/70 lg:bg-gradient-to-r lg:from-[#131b2e] lg:via-[#131b2e]/70 lg:to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(239, 95, 23, 0.15) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 pt-[max(5.5rem,calc(4.5rem+env(safe-area-inset-top)))] sm:px-6 sm:pb-16 sm:pt-28 lg:px-8 lg:pb-24 lg:pt-32">
          <nav className="mb-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-white/35 sm:mb-10 sm:text-xs lg:mb-12">
            <Link href={`/${locale}`} className="transition-colors hover:text-white/65">
              {t.breadcrumbHome}
            </Link>
            <span aria-hidden>/</span>
            <Link href={`/${locale}/kurumsal`} className="transition-colors hover:text-white/65">
              {t.breadcrumbCorporate}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-white/50">{t.breadcrumbPage}</span>
          </nav>

          <div className="max-w-4xl">
            <span className="mb-4 inline-block rounded bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white sm:mb-8 sm:px-3 sm:text-xs sm:tracking-widest">
              {t.heroBadge}
            </span>
            <h1 className="font-display text-[clamp(1.65rem,7vw,4.5rem)] font-black uppercase leading-[0.95] tracking-tighter text-white">
              {t.heroTitle1}{" "}
              <span className="text-primary">{t.heroTitleHighlight}</span>
              {t.heroTitle2 ? <> {t.heroTitle2}</> : null}
            </h1>
            <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-white/65 sm:mt-8 sm:text-lg md:text-xl">
              {t.heroDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Identity */}
      <section className="relative py-10 sm:py-20 lg:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(239, 95, 23, 0.08) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-8 sm:items-center sm:gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="min-w-0 space-y-4 sm:space-y-8">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary sm:text-xs sm:tracking-[0.3em]">
                {t.identityTag}
              </h2>
              {t.identitySubtitle ? (
                <p className="font-display text-xl font-black leading-snug tracking-tighter text-[#131b2e] sm:text-2xl md:text-3xl">
                  {t.identitySubtitle}
                </p>
              ) : null}
              <ul className="space-y-4 pl-4 text-sm leading-relaxed text-secondary/75 marker:text-primary sm:space-y-5 sm:pl-5 sm:text-base md:text-lg [&>li]:list-disc [&>li]:pl-1">
                {identityParagraphs.length > 0 ? (
                  identityParagraphs.map((paragraph) => (
                    <li key={paragraph.slice(0, 48)}>{paragraph}</li>
                  ))
                ) : (
                  <>
                    <li>
                      {t.identityP1Lead}{" "}
                      <strong className="font-semibold text-dark">{t.identityFounders}</strong>{" "}
                      {t.identityP1Tail}
                    </li>
                    <li>{t.identityP2}</li>
                  </>
                )}
              </ul>
              <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-3 sm:gap-4 sm:pt-4">
                {valueCards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-xl border-l-4 border-primary bg-white p-4 shadow-sm sm:p-6"
                  >
                    <ValueIcon name={card.icon} className="mb-2 h-6 w-6 text-primary sm:h-8 sm:w-8" />
                    <div className="text-xs font-bold text-dark sm:text-base">{card.title}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="group relative min-w-0">
              <div
                className="absolute -inset-2 rotate-[-2deg] rounded-2xl bg-primary/10 transition-transform duration-500 group-hover:rotate-0 max-sm:hidden sm:-inset-4"
                aria-hidden
              />
              <div className="relative aspect-[5/4] overflow-hidden rounded-xl shadow-2xl sm:rounded-2xl lg:aspect-auto lg:h-[560px]">
                <Image
                  src="/images/biz-kimiz-sag.png"
                  alt={t.facilityAlt}
                  fill
                  className="object-cover object-[center_35%] sm:object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approach / Process */}
      <section className="overflow-hidden bg-[#131b2e] py-10 text-white sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-10 lg:mb-12">
            {t.approachTag ? (
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-primary sm:mb-4 sm:text-xs sm:tracking-[0.3em]">
                {t.approachTag}
              </p>
            ) : null}
            <h2 className="max-w-5xl font-display text-[clamp(1.35rem,4.5vw,3rem)] font-black uppercase leading-tight tracking-tighter">
              {t.approachTitle1}{" "}
              <span className="text-primary">{t.approachTitleHighlight}</span>{" "}
              {t.approachTitle2}
            </h2>
            <div className="mt-3 h-1 w-16 bg-primary sm:mt-6 sm:w-32" />
          </div>

          {approachParagraphs.length > 0 ? (
            <ul className="mb-8 grid list-none gap-4 sm:mb-12 sm:gap-6 lg:mb-16 lg:grid-cols-3 lg:gap-8">
              {approachParagraphs.map((paragraph) => (
                <li key={paragraph.slice(0, 48)} className="flex min-w-0 gap-3 text-sm font-light leading-relaxed text-white/60 sm:text-base lg:text-[0.98rem] lg:leading-7 xl:text-lg">
                  <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                  <span>{paragraph}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="grid grid-cols-1 gap-6 min-[540px]:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-5 xl:gap-6">
            {processSteps.map((step, i) => (
              <div key={step.title} className="group min-w-0">
                <div className="mb-2 text-3xl font-black text-white/10 transition-colors group-hover:text-primary/40 sm:mb-4 sm:text-6xl">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mb-4 h-px bg-white/20 transition-colors group-hover:bg-primary sm:mb-6" />
                <h4 className="mb-1.5 text-sm font-bold uppercase tracking-tight sm:mb-3 sm:text-lg">{step.title}</h4>
                <p className="text-xs font-light leading-relaxed text-white/55 sm:text-base">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Services */}
      <section className="py-10 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center sm:mb-16">
            <h2 className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-primary sm:mb-4 sm:text-xs sm:tracking-[0.3em]">
              {t.servicesTag}
            </h2>
            <h3 className="font-display text-[clamp(1.65rem,4.5vw,3rem)] font-extrabold tracking-tighter text-dark">
              {t.servicesTitle}
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="group min-w-0 cursor-default rounded-xl border border-ink/10 border-l-4 border-l-primary bg-white p-4 shadow-sm transition-all hover:shadow-md sm:p-6"
              >
                <div className="mb-3 text-primary sm:mb-4">
                  <ServiceIcon name={service.icon} />
                </div>
                <h4 className="text-sm font-black uppercase leading-snug tracking-tight text-dark sm:text-base">
                  {service.title}
                </h4>
                {service.desc ? (
                  <p className="mt-2 text-xs font-light leading-relaxed text-secondary/70 sm:mt-3 sm:text-base">{service.desc}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activity Fields */}
      <section className="py-10 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-4xl text-center sm:mb-16 lg:mb-20">
            {t.activityTag ? (
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-primary sm:mb-4 sm:text-xs sm:tracking-[0.3em]">
                {t.activityTag}
              </p>
            ) : null}
            <h2 className="font-display text-[clamp(1.65rem,4.5vw,3rem)] font-extrabold tracking-tighter text-dark">
              {t.activityTitle}
            </h2>
            {t.activityLead ? (
              <p className="mt-4 text-base font-medium leading-relaxed text-dark/80 sm:mt-6 sm:text-lg md:text-xl">
                {t.activityLead}
              </p>
            ) : null}
            {activityParagraphs.length > 0 ? (
              <div className="mt-5 space-y-3 text-left text-sm leading-relaxed text-secondary/75 sm:mt-8 sm:space-y-5 sm:text-base md:text-lg">
                {activityParagraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="space-y-10 sm:space-y-24 lg:space-y-32">
        {activityFields.map((field) => (
          <div
            key={field.title}
            className={`mx-auto flex max-w-7xl flex-col items-stretch gap-5 px-4 sm:gap-10 sm:px-6 lg:gap-12 lg:px-8 ${
              field.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
            }`}
          >
            <div className="relative aspect-[4/5] w-full min-w-0 overflow-hidden rounded-xl shadow-2xl sm:rounded-2xl lg:w-1/2 lg:shrink-0">
              <Image
                key={`${field.title}-${ACTIVITY_IMAGE_REVISION}`}
                src={activityImageSrc(field.image)}
                alt={field.title}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="flex w-full min-w-0 flex-col justify-center space-y-3 sm:space-y-6 lg:w-1/2">
              <h3 className="font-display text-[clamp(1.2rem,5vw,2.25rem)] font-black uppercase leading-[1.1] tracking-tighter text-balance text-dark">
                {field.title}
              </h3>
              <p className="text-sm font-medium leading-relaxed text-dark/85 sm:text-base md:text-lg">{field.desc}</p>
              {field.paragraphs?.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="text-sm leading-relaxed text-secondary/75 sm:text-base md:text-lg">
                  {paragraph}
                </p>
              ))}
              {field.itemsLabel ? (
                <p className="pt-0.5 text-sm font-bold text-dark sm:pt-1 sm:text-base">{field.itemsLabel}</p>
              ) : null}
              <ul className="grid grid-cols-1 gap-2 text-xs text-secondary/75 sm:grid-cols-2 sm:gap-2.5 sm:text-sm md:gap-3 md:text-base">
                {field.items.map((item) => (
                  <li key={item} className="flex min-w-0 items-start gap-2">
                    <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="min-w-0 break-words">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/${locale}${field.href}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-dark px-5 py-3.5 text-[11px] font-bold uppercase leading-snug tracking-tight text-white transition-colors hover:bg-primary min-[420px]:text-sm sm:w-auto sm:justify-start sm:px-8 sm:py-4"
              >
                <span className="text-center sm:text-left">{field.cta}</span>
                <IconArrow className="h-4 w-4 shrink-0" />
              </Link>
            </div>
          </div>
        ))}
        </div>
      </section>

      {/* Turuncu CTA bandı */}
      {t.ctaBannerTitle && t.ctaBannerButton ? (
        <section className="bg-primary py-10 sm:py-14 lg:py-20">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-4 text-center sm:gap-7 sm:px-6 lg:gap-8 lg:px-8">
            <h2 className="max-w-5xl font-display text-[clamp(1.35rem,4.5vw,3.75rem)] font-black leading-[1.08] tracking-tighter text-[#5F1A03]">
              {t.ctaBannerTitle}
            </h2>
            <Link
              href={`/${locale}${t.ctaBannerHref ?? "/cozumler"}`}
              className="inline-flex w-full max-w-md items-center justify-center gap-2 rounded-lg bg-dark px-5 py-3.5 text-xs font-bold uppercase tracking-tight text-white transition-colors hover:bg-[#131b2e] min-[420px]:text-sm sm:w-auto sm:px-8 sm:py-4"
            >
              {t.ctaBannerButton}
              <IconArrow className="h-4 w-4 shrink-0" />
            </Link>
          </div>
        </section>
      ) : null}
    </main>
  );
}
