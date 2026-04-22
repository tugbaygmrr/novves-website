import Image from "next/image";
import Link from "next/link";

type FooterSectionsContent = {
  products: string;
  productsLinks: Record<string, string>;
  solutions: string;
  solutionsLinks: Record<string, string>;
  corporate: string;
  corporateLinks: Record<string, string>;
  services: string;
  servicesLinks: Record<string, string>;
};

type FooterContent = {
  ctaTitle: string;
  ctaDesc: string;
  ctaButton: string;
  brandDesc: string;
  copyright: string;
  kvkk: string;
  privacyPolicy: string;
  sections: FooterSectionsContent;
};

type CommonFooterDict = {
  footer: FooterContent;
};

/* â”€â”€ Build footer sections from dict â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

function buildFooterSections(dict: CommonFooterDict) {
  const s = dict.footer.sections;
  return [
    {
      title: s.products,
      links: [
        { label: s.productsLinks.airMovement, href: "/urunler/hava-hareketi" },
        { label: s.productsLinks.airConditioning, href: "/urunler/iklimlendirme" },
        { label: s.productsLinks.coolingAndHeating, href: "/urunler/sogutma-ve-isitma" },
        { label: s.productsLinks.airManagement, href: "/urunler/hava-yonetimi" },
        { label: s.productsLinks.airDistribution, href: "/urunler/hava-dagitimi" },
        { label: s.productsLinks.airFiltration, href: "/urunler/hava-filtrasyonu" },
        { label: s.productsLinks.accessories, href: "/urunler/aksesuarlar" },
      ],
    },
    {
      title: s.solutions,
      links: [
        { label: s.solutionsLinks.smokeHeatExtraction, href: "/cozumler/duman-isi-tahliye-sistemleri" },
        { label: s.solutionsLinks.comfortAirConditioning, href: "/cozumler/konfor-iklimlendirme-sistemleri" },
        { label: s.solutionsLinks.hygienicVentilation, href: "/cozumler/hijyenik-filtrasyonlu-havalandirma" },
        { label: s.solutionsLinks.industrialAirManagement, href: "/cozumler/endustriyel-hava-yonetimi" },
        { label: s.solutionsLinks.atexExplosionProtection, href: "/cozumler/atex-patlama-koruma-cozumleri" },
        { label: s.solutionsLinks.cfdConsulting, href: "/cozumler/cfd-muhendislik-danismanligi" },
      ],
    },
    {
      title: s.corporate,
      links: [
        { label: s.corporateLinks.whoWeAre, href: "/kurumsal/biz-kimiz" },
        { label: s.corporateLinks.ceoMessage, href: "/kurumsal/ceo-mesaji" },
        { label: s.corporateLinks.ourTeam, href: "/kurumsal/ekibimiz" },
        { label: s.corporateLinks.references, href: "/kurumsal/referanslar" },
        { label: s.corporateLinks.certificates, href: "/kurumsal/sertifikalar" },
        { label: s.corporateLinks.ourPolicy, href: "/kurumsal/politikamiz" },
      ],
    },
    {
      title: s.services,
      links: [
        { label: s.servicesLinks.smokeControlDesign, href: "/hizmetler/duman-kontrol-sistemi-tasarimi" },
        { label: s.servicesLinks.cfdAnalysis, href: "/hizmetler/cfd-analizi" },
        { label: s.servicesLinks.commissioning, href: "/hizmetler/devreye-alma" },
        { label: s.servicesLinks.technicalService, href: "/hizmetler/teknik-servis" },
      ],
    },
  ];
}

/* â”€â”€ Static data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://tr.linkedin.com/company/novvesturkiye",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCan0PUXw7Pr0GI0HTegN1yQ",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/novves.turkiye/",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/novves.turkiye/",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

const certificates = [
  { src: "/images/certificates/EN.png", alt: "EN" },
  { src: "/images/certificates/ISO14001.png", alt: "ISO 14001" },
  { src: "/images/certificates/CE.png", alt: "CE" },
  { src: "/images/certificates/ISO9001.png", alt: "ISO 9001" },
  { src: "/images/certificates/Efectis.png", alt: "Efectis" },
  { src: "/images/certificates/bsi.png", alt: "BSI" },
];

/* â”€â”€ Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export function Footer({ locale, dict }: { locale: string; dict: CommonFooterDict }) {
  const footerSections = buildFooterSections(dict);

  return (
    <>
      <section className="border-b border-ink/10 bg-[#e8e7e3] py-12 sm:py-14">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-10 lg:flex-nowrap lg:justify-between">
            {certificates.map((cert) => (
              <a
                key={cert.alt}
                href={`/${locale}/kurumsal/sertifikalar`}
                className="flex min-w-[110px] flex-1 items-center justify-center px-2 lg:min-w-0"
              >
                <Image
                  src={cert.src}
                  alt={cert.alt}
                  width={180}
                  height={72}
                  className="h-10 w-auto max-w-full object-contain grayscale brightness-[0.82] contrast-[1.08] opacity-[0.96] transition-[filter,opacity,transform] duration-300 hover:scale-[1.03] hover:opacity-100 hover:grayscale-0 hover:brightness-100 hover:contrast-100 sm:h-12"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative overflow-hidden">
      {/* â”€â”€ Background layers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="absolute inset-0">
        <Image
          src="/images/footer-bg.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Primary tint - lets the image texture through */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(175deg, rgba(15,23,42,0.75) 0%, rgba(15,23,42,0.65) 40%, rgba(15,23,42,0.80) 100%)",
          }}
        />
        {/* Orange accent glow top-right */}
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #FF6B35, transparent 70%)" }}
        />
        {/* Subtle grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* â”€â”€ CTA Strip â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 border-b border-white/[0.06] py-12 sm:flex-row">
            <div>
              <h3 className="text-lg font-bold text-white">
                {dict.footer.ctaTitle}
              </h3>
              <p className="mt-1 text-sm text-white/40">
                {dict.footer.ctaDesc}
              </p>
            </div>
            <Link
              href={`/${locale}/iletisim`}
              className="group inline-flex shrink-0 items-center gap-2.5 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-[#e55a28] hover:shadow-xl hover:shadow-primary/30"
            >
              {dict.footer.ctaButton}
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* â”€â”€ Main Grid â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-y-12 gap-x-8 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link href={`/${locale}`} className="inline-block">
              <Image
                src="/images/novves-footer-logo.svg"
                alt="Novves"
                width={130}
                height={34}
                className="h-9 w-auto"
              />
            </Link>

            <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-white/55">
              {dict.footer.brandDesc}
            </p>

            {/* Contact pills */}
            <div className="mt-8 space-y-2.5">
              <a
                href="tel:+902164674752"
                className="group flex items-center gap-3 text-[13px] text-white/68 transition-colors duration-300 hover:text-white"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/[0.05] ring-1 ring-white/[0.08] transition-all duration-300 group-hover:bg-primary/20 group-hover:ring-primary/30">
                  <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </span>
                +90 216 467 47 52
              </a>

              <a
                href="mailto:info@novves.com"
                className="group flex items-center gap-3 text-[13px] text-white/68 transition-colors duration-300 hover:text-white"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/[0.05] ring-1 ring-white/[0.08] transition-all duration-300 group-hover:bg-primary/20 group-hover:ring-primary/30">
                  <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </span>
                info@novves.com
              </a>

              <div className="group flex items-start gap-3 text-[13px] leading-relaxed text-white/58">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/[0.05] ring-1 ring-white/[0.08]">
                  <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </span>
                <span className="pt-1.5">
                  19 Mayıs Mh. Sümer Sk.<br />
                  Zitaş Plaza C2 Blok No:7<br />
                  Kadıköy / İstanbul / Türkiye
                </span>
              </div>
            </div>

            {/* Social row */}
            <div className="mt-8 flex items-center gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-md bg-white/[0.05] text-white/30 ring-1 ring-white/[0.08] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-white hover:ring-primary hover:shadow-lg hover:shadow-primary/20"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:col-span-8 lg:grid-cols-4 lg:gap-x-8">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-white/82">
                  <span className="h-px w-3 bg-primary" />
                  {section.title}
                </h4>
                <ul className="mt-5 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={`/${locale}${link.href}`}
                        className="group flex items-center gap-0 text-[13px] text-white/62 transition-all duration-300 hover:text-white/90"
                      >
                        <span className="inline-block w-0 overflow-hidden text-primary transition-all duration-300 group-hover:w-4">
                          &rsaquo;&ensp;
                        </span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* â”€â”€ Bottom bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="relative z-10 border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-[11px] tracking-wide text-white/88">
            {dict.footer.copyright}
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <Link
              href={`/${locale}/kvkk/kisisel-verilerin-korunmasi`}
              className="text-[11px] tracking-wide text-white/88 transition-colors duration-300 hover:text-white"
            >
              {dict.footer.kvkk}
            </Link>
            <a
              href="/kvkk/FR-0057-Kisisel-Veri-Sahibi-Basvuru-Formu.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] tracking-wide text-white/88 transition-colors duration-300 hover:text-white"
            >
              KVKK Başvuru Formu
            </a>
            <Link
              href={`/${locale}/kvkk/guvenlik-ve-gizlilik-politikasi`}
              className="text-[11px] tracking-wide text-white/88 transition-colors duration-300 hover:text-white"
            >
              {dict.footer.privacyPolicy}
            </Link>
            <Link
              href={`/${locale}/kvkk/kvkk-ve-islenmesi-beyani`}
              className="text-[11px] tracking-wide text-white/88 transition-colors duration-300 hover:text-white"
            >
              KVKK ve İşlenmesi Beyanı
            </Link>
          </div>
        </div>
      </div>

      {/* â”€â”€ Tasarloji Credit â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="relative z-10 border-t border-white/[0.03]">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-3 sm:px-6 lg:px-8">
          <span className="text-[10px] text-white/88">Web Development by</span>
          <a
            href="https://tasarloji.com"
            target="_blank"
            className="inline-block opacity-95 transition-opacity duration-300 hover:opacity-100"
          >
            <Image
              src="/images/tasarloji-logo.png"
              alt="Tasarloji"
              width={80}
              height={22}
              className="h-4 w-auto"
            />
          </a>
        </div>
      </div>
      </footer>
    </>
  );
}

