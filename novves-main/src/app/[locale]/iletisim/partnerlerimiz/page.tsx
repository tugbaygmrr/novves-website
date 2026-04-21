import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../../dictionaries";

type PartnerPageCopy = {
  stats: Array<{ value: string; label: string }>;
  highlightsLabel: string;
  highlightsTitle: string;
  highlightsDesc: string;
  highlights: Array<{ title: string; description: string; stat: string }>;
  soonLabel: string;
  soonTitle: string;
  contactTag: string;
  contactTitle: string;
  contactDesc: string;
  contactForm: string;
};

const pageCopy: Record<Locale, PartnerPageCopy> = {
  tr: {
    stats: [
      { value: "3", label: "Ortaklık ekseni" },
      { value: "TR + Global", label: "Ölçek" },
      { value: "NOVVES", label: "Marka" },
    ],
    highlightsLabel: "Ortaklık çerçevesi",
    highlightsTitle: "Projelerde iş birliği katmanları",
    highlightsDesc:
      "Her ortaklık farklı bir rol üstlenir. Logolar ve detaylı vitrin içeriği hazırlandığında bu blokların altında yayınlanacaktır.",
    highlights: [
      {
        stat: "Tedarik",
        title: "Malzeme ve zaman disiplini",
        description:
          "Projelerin takvimine uygun tedarik, kalite onayı ve lojistik netliği; sahadaki aksaklıkları azaltan temel katman.",
      },
      {
        stat: "Uygulama",
        title: "Kurulum ve devreye alma",
        description:
          "Yerinde montaj, test ve devreye alma süreçlerinde deneyimli ekiplerle birlikte hareket eden çözüm ortakları.",
      },
      {
        stat: "Teknoloji",
        title: "Entegrasyon ve destek",
        description:
          "Otomasyon, izleme ve servis katmanlarında ürünlerin birbiriyle konuşmasını sağlayan ekosistem iş birlikleri.",
      },
    ],
    soonLabel: "Yayın takvimi",
    soonTitle: "Partner vitrini çok yakında.",
    contactTag: "İletişim",
    contactTitle: "Partnerlik veya proje için bize yazın.",
    contactDesc:
      "İş birliği teklifleri ve teknik görüşmeler için doğrudan iletişime geçebilirsiniz; ekibimiz en kısa sürede dönüş yapar.",
    contactForm: "İletişim formu",
  },
  en: {
    stats: [
      { value: "3", label: "Partnership axes" },
      { value: "TR + Global", label: "Scale" },
      { value: "NOVVES", label: "Brand" },
    ],
    highlightsLabel: "Partnership frame",
    highlightsTitle: "Collaboration layers in our projects",
    highlightsDesc:
      "Each partnership plays a different role. Logos and detailed showcase content will appear below these blocks once ready.",
    highlights: [
      {
        stat: "Supply",
        title: "Materials and schedule discipline",
        description:
          "Supply aligned to project timelines, quality sign-off, and logistics clarity—the baseline that reduces friction on site.",
      },
      {
        stat: "Field",
        title: "Installation and commissioning",
        description:
          "Solution partners who move in step with on-site assembly, testing, and handover with experienced crews.",
      },
      {
        stat: "Tech",
        title: "Integration and support",
        description:
          "Ecosystem collaborations that keep automation, monitoring, and service layers talking to each other.",
      },
    ],
    soonLabel: "Publishing",
    soonTitle: "Partner showcase coming very soon.",
    contactTag: "Contact",
    contactTitle: "Write to us about partnerships or a project.",
    contactDesc:
      "Reach out for collaboration proposals and technical discussions; our team will respond as soon as possible.",
    contactForm: "Contact form",
  },
  ru: {
    stats: [
      { value: "3", label: "Osi partnerstva" },
      { value: "TR + Global", label: "Masshtab" },
      { value: "NOVVES", label: "Brend" },
    ],
    highlightsLabel: "Ramka partnerstva",
    highlightsTitle: "Sloi sotrudnichestva v proektakh",
    highlightsDesc:
      "Kazhdoye sotrudnichestvo vypolnyayet svoyu rolyu. Logotipy i detalnaya vitrina poyavyatsya pod etimi blokami, kogda kontent budet gotov.",
    highlights: [
      {
        stat: "Snabzheniye",
        title: "Materialy i distsiplina grafika",
        description:
          "Postavki v sootvetstvii s grafikom proyekta, kontrol kachestva i yasnaya logistika — baza dlya spokoynoy raboty na ploshchadke.",
      },
      {
        stat: "Montazh",
        title: "Ustanovka i puskonaladka",
        description:
          "Resheniya s partnerami, kotoryye sinkhronno vedut sborku, testy i peredachu obyekta vmeste s opytnymi brigadami.",
      },
      {
        stat: "Tekh",
        title: "Integratsiya i podderzhka",
        description:
          "Ekosistemnyye svyazi dlya avtomatizatsii, monitoringa i servisnykh sloyev, kotoryye rabotayut kak yedinoe tseloye.",
      },
    ],
    soonLabel: "Publikatsiya",
    soonTitle: "Vitrina partnerov — sovsem skoro.",
    contactTag: "Kontakty",
    contactTitle: "Pishite nam o partnerstve ili proekte.",
    contactDesc:
      "Dlya predlozheniy o sotrudnichestve i tekhnicheskikh konsultatsiy obrashaytes napryamuyu; komanda otvetit v blizhayshiye sroki.",
    contactForm: "Forma kontakta",
  },
};

const pillarIcons = [
  <svg key="0" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006h-9m9 0a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25m9 0V12.75H9.75v4.406m6-4.406V9.112c0-1.108-.806-2.012-1.846-2.086a48.19 48.19 0 00-3.554-.186c-1.086.09-1.846.993-1.846 2.086v1.637m12-4.406V19.5"
    />
  </svg>,
  <svg key="1" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655-5.653a2.548 2.548 0 010-3.586L9.12 3.54a2.25 2.25 0 013.19 0l.34.409"
    />
  </svg>,
  <svg key="2" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z"
    />
  </svg>,
];

export default async function Partnerlerimiz({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.contact.partnerlerimiz;
  const copy = pageCopy[locale];

  return (
    <main>
      <section className="relative flex min-h-[540px] items-end overflow-hidden">
        <Image
          src="/images/page-hero/iletisim.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#4e525c]/28" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#71757d]/60 via-[#4a4f58]/82 to-[#2f3440]/94" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_16%_10%,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0)_52%),radial-gradient(ellipse_at_86%_96%,rgba(17,22,33,0.42)_0%,rgba(17,22,33,0)_55%)]" />
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.08]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 pt-32 sm:px-6 lg:px-8 lg:pt-36">
          <nav className="mb-8 flex items-center gap-2 text-xs text-white/40">
            <Link href={`/${locale}`} className="transition-colors hover:text-white/70">
              {t.breadcrumbHome}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/iletisim`} className="transition-colors hover:text-white/70">
              {t.breadcrumbContact}
            </Link>
            <span>/</span>
            <span className="text-white/60">{t.breadcrumbPartners}</span>
          </nav>

          <div className="max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_28px_70px_-40px_rgba(10,12,16,0.75)] backdrop-blur-[2px] sm:p-8 lg:p-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/12 px-3.5 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{t.badge}</span>
            </div>
            <h1 className="text-4xl font-bold leading-[1.04] tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.7rem]">
              {t.title1}
              <span className="text-primary">{t.title2}</span>
            </h1>
            <p className="mt-6 max-w-[52ch] text-[18px] leading-[1.62] text-white/72">{t.desc}</p>
            <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-white/55 sm:text-[15px]">{t.heroLead}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#ecebe6] py-6 sm:py-8">
        <div className="mx-auto max-w-7xl rounded-2xl border border-ink/10 bg-[#f8f5ed] px-4 shadow-[0_12px_26px_-20px_rgba(15,20,30,0.26)] sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 divide-y divide-ink/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {copy.stats.map((s) => (
              <div key={s.label} className="py-5 text-center">
                <p className="text-xl font-bold text-primary sm:text-2xl">{s.value}</p>
                <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-secondary/50">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#ecebe6] py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{copy.highlightsLabel}</p>
            <h2 className="mt-2 text-2xl font-bold text-dark sm:text-3xl">{copy.highlightsTitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-secondary/55 sm:text-[15px]">{copy.highlightsDesc}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {copy.highlights.map((item, i) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-xl border border-ink/10 bg-[#f8f5ed] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_16px_30px_-22px_rgba(15,20,30,0.35)]"
              >
                <div className="absolute left-0 top-0 h-full w-1 bg-ink/10 transition-colors duration-300 group-hover:bg-primary" />
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/5 text-secondary/40 transition-colors duration-300 group-hover:bg-primary/10 group-hover:text-primary">
                  {pillarIcons[i]}
                </div>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/90">{item.stat}</p>
                <h3 className="mt-2 text-sm font-bold text-dark">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-secondary/45">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-ink/10 bg-[#f8f5ed] p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-ink/10 bg-[#fbf9f3]">
              <svg className="h-8 w-8 text-secondary/20" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" aria-hidden>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
            </div>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-primary">{copy.soonLabel}</p>
            <h2 className="mt-2 text-2xl font-bold text-dark">{copy.soonTitle}</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-secondary/50">{t.comingSoonDesc}</p>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-secondary/40">{t.comingSoon}</p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-dark py-20">
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #FF6B35, transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{copy.contactTag}</p>
          <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">{copy.contactTitle}</h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/40">{copy.contactDesc}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:info@novves.com"
              className="group inline-flex items-center gap-2.5 rounded-lg bg-white/5 px-6 py-3 text-sm font-medium text-white ring-1 ring-white/10 transition-all duration-300 hover:bg-primary/20 hover:ring-primary/30"
            >
              <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              info@novves.com
            </a>
            <Link
              href={`/${locale}/iletisim`}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-[#e55a28] hover:shadow-xl hover:shadow-primary/30"
            >
              {copy.contactForm}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
