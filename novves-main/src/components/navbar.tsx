"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { LanguageSwitcher } from "./language-switcher";

/* â”€â”€ Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

type MenuLink = { label: string; href: string };

type MegaMenu = {
  label: string;
  href: string;
  desc: string;
  icon: React.ReactNode;
  links: MenuLink[];
  featured?: { title: string; desc: string; href: string; image: string };
};

type NavbarContent = {
  solutions: string;
  solutionsDesc: string;
  products: string;
  productsDesc: string;
  services: string;
  servicesDesc: string;
  technicalCenter: string;
  technicalCenterDesc: string;
  corporate: string;
  corporateDesc: string;
  contact: string;
  contactDesc: string;
  viewAll: string;
  featured: string;
  fanSelector: string;
  openMenu: string;
  links: Record<string, string>;
};

type CommonDict = {
  navbar: NavbarContent;
};

/* â”€â”€ Icons (consistent outline, 1.5 strokeWidth) â”€â”€â”€â”€â”€â”€ */

const icons = {
  cozumler: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  urunler: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  ),
  hizmetler: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.049.58.025 1.193-.14 1.743" />
    </svg>
  ),
  teknik: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  kurumsal: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
    </svg>
  ),
  iletisim: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  ),
};

/* â”€â”€ Build menus from dict â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

function buildMenus(dict: CommonDict): MegaMenu[] {
  const d = dict.navbar;
  const l = d.links;
  return [
    {
      label: d.solutions,
      href: "/cozumler",
      desc: d.solutionsDesc,
      icon: icons.cozumler,
      featured: { title: l.smokeHeatExtraction, desc: l.smokeHeatExtractionDesc, href: "/cozumler/duman-isi-tahliye-sistemleri", image: "/images/products/dragonfly-c.png" },
      links: [
        { label: l.smokeHeatExtraction, href: "/cozumler/duman-isi-tahliye-sistemleri" },
        { label: l.comfortAirConditioning, href: "/cozumler/konfor-iklimlendirme-sistemleri" },
        { label: l.hygienicVentilation, href: "/cozumler/hijyenik-filtrasyonlu-havalandirma" },
        { label: l.industrialAirManagement, href: "/cozumler/endustriyel-hava-yonetimi" },
        { label: l.livestockFacilities, href: "/cozumler/hayvancilik-tesisleri-icin-havalandirma-sistemleri" },
        { label: l.transformerEnergyRooms, href: "/cozumler/trafo-enerji-odalari-fanlari" },
        { label: l.greenhouseAgricultural, href: "/cozumler/sera-tarimsal-havalandirma-sistemleri" },
        { label: l.atexExplosionProtection, href: "/cozumler/atex-patlama-koruma-cozumleri" },
        { label: l.smartAutomation, href: "/cozumler/akilli-otomasyon-ve-kontrol-sistemleri" },
        { label: l.residentialVentilation, href: "/cozumler/konut-tipi-havalandirma-sistemleri" },
        { label: l.marineOffshore, href: "/cozumler/marin-offshore-havalandirma-sistemleri" },
        { label: l.customManufacturing, href: "/cozumler/proje-bazli-ozel-imalatlar" },
        { label: l.cfdConsulting, href: "/cozumler/cfd-muhendislik-danismanligi" },
      ],
    },
    {
      label: d.products,
      href: "/urunler",
      desc: d.productsDesc,
      icon: icons.urunler,
      featured: { title: l.airMovement, desc: l.airMovementDesc, href: "/urunler/hava-hareketi", image: "/images/hero/aksiyal-jet-fan.png" },
      links: [
        { label: l.airMovement, href: "/urunler/hava-hareketi" },
        { label: l.airConditioning, href: "/urunler/iklimlendirme" },
        { label: l.coolingAndHeating, href: "/urunler/sogutma-ve-isitma" },
        { label: l.airManagement, href: "/urunler/hava-yonetimi" },
        { label: l.airDistribution, href: "/urunler/hava-dagitimi" },
        { label: l.airFiltration, href: "/urunler/hava-filtrasyonu" },
        { label: l.accessories, href: "/urunler/aksesuarlar" },
        { label: l.automationMaterials, href: "/urunler/otomasyon-malzemeleri" },
        { label: l.vibrationSoundInsulation, href: "/urunler/titresim-ve-ses-izolasyon" },
      ],
    },
    {
      label: d.services,
      href: "/hizmetler",
      desc: d.servicesDesc,
      icon: icons.hizmetler,
      links: [
        { label: l.onSiteInspection, href: "/hizmetler/yerinde-kesif" },
        { label: l.smokeControlDesign, href: "/hizmetler/duman-kontrol-sistemi-tasarimi" },
        { label: l.commissioning, href: "/hizmetler/devreye-alma" },
        { label: l.technicalService, href: "/hizmetler/teknik-servis" },
        { label: l.cfdAnalysis, href: "/hizmetler/cfd-analizi" },
      ],
    },
    {
      label: d.technicalCenter,
      href: "/teknik-merkez",
      desc: d.technicalCenterDesc,
      icon: icons.teknik,
      links: [
        { label: l.documentLibrary, href: "/teknik-merkez/dokuman-kutuphanesi" },
        { label: l.certificates, href: "/kurumsal/sertifikalar" },
        { label: l.sustainability, href: "/surdurulebilirlik" },
        { label: l.co2, href: "/surdurulebilirlik/co2" },
        { label: l.recycling, href: "/surdurulebilirlik/geri-donusum" },
        { label: l.technicalArticles, href: "/teknik-merkez/blog" },
        { label: l.fanSelectorLink, href: "/teknik-merkez/fan-secici" },
        { label: l.patents, href: "/teknik-merkez/patentlerimiz" },
      ],
    },
    {
      label: d.corporate,
      href: "/kurumsal",
      desc: d.corporateDesc,
      icon: icons.kurumsal,
      links: [
        { label: l.ceoMessage, href: "/kurumsal/ceo-mesaji" },
        { label: l.whoWeAre, href: "/kurumsal/biz-kimiz" },
        { label: l.ourTeam, href: "/kurumsal/ekibimiz" },
        { label: l.references, href: "/kurumsal/referanslar" },
        { label: l.ourPolicy, href: "/kurumsal/politikamiz" },
        { label: l.pressRoom, href: "/kurumsal/basin-odasi" },
        { label: l.news, href: "/kurumsal/haberler" },
        { label: l.kvkk, href: "/kvkk" },
      ],
    },
    {
      label: d.contact,
      href: "/iletisim",
      desc: d.contactDesc,
      icon: icons.iletisim,
      links: [
        { label: l.contactForm, href: "/iletisim" },
        { label: l.socialMedia, href: "/iletisim/sosyal-medya" },
        { label: l.partners, href: "/iletisim/partnerlerimiz" },
      ],
    },
  ];
}

/* â”€â”€ Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export function Navbar({ locale, dict }: { locale: string; dict: CommonDict }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const menus = buildMenus(dict);
  /** Navbar stays white on all routes (no transparent / inverted hero overlay). */
  const inverted = false;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }
    function handleScroll() {
      setScrolled(window.scrollY > 80);
    }
    document.addEventListener("click", handleClick);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleEnter(label: string) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenMenu(label);
  }
  function handleLeave() {
    timeoutRef.current = setTimeout(() => setOpenMenu(null), 200);
  }

  return (
    <header
      className="fixed top-0 z-50 w-full border-b border-ink/12 bg-white/96 pb-3 pt-4 shadow-[0_10px_40px_-28px_rgba(15,23,42,0.25)] backdrop-blur-xl transition-all duration-300"
    >
      <nav ref={navRef} className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-6 sm:px-8 lg:px-10">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex-shrink-0">
          <Image
            src={inverted ? "/images/novves-footer-logo.svg" : "/images/novves-logo.svg"}
            alt="Novves"
            width={120}
            height={32}
            priority
            className="h-7 w-auto"
          />
        </Link>

        {/* Desktop â€” ortada, geniÅŸ aralÄ±klÄ± */}
        <ul className="hidden items-center gap-1 xl:flex">
          {menus.map((menu) => (
            <li
              key={menu.label}
              className="relative"
              onMouseEnter={() => handleEnter(menu.label)}
              onMouseLeave={handleLeave}
            >
              <button
                type="button"
                className={`inline-flex items-center gap-1.5 px-4 py-2 text-[14px] font-semibold tracking-normal transition-colors duration-200 ${
                  openMenu === menu.label
                    ? "text-primary"
                    : inverted
                      ? "text-white/72 hover:text-white"
                      : "text-secondary/70 hover:text-dark"
                }`}
              >
                {menu.label}
                <svg
                  className={`h-2.5 w-2.5 transition-transform duration-200 ${
                    openMenu === menu.label
                      ? "rotate-180 text-primary"
                      : inverted
                        ? "text-white/35"
                        : "text-secondary/25"
                  }`}
                  fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {/* Mega Dropdown */}
              {openMenu === menu.label && (
                <div
                  className="absolute -left-8 top-full pt-4"
                  onMouseEnter={() => handleEnter(menu.label)}
                  onMouseLeave={handleLeave}
                >
                  <div
                    className="flex overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)]"
                    style={{ width: menu.featured ? "720px" : "400px" }}
                  >
                    {/* Left â€” Links */}
                    <div className="flex-1 p-6">
                      {/* Header */}
                      <div className="mb-5 flex items-center gap-3 border-b border-gray-100 pb-4">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/8 text-primary">
                          {menu.icon}
                        </span>
                        <div>
                          <p className="text-sm font-bold text-dark">{menu.label}</p>
                          <p className="text-[11px] text-secondary/45">{menu.desc}</p>
                        </div>
                      </div>

                      {/* Links grid */}
                      <div className={`grid gap-x-3 gap-y-0.5 ${menu.links.length > 6 ? "grid-cols-2" : "grid-cols-1"}`}>
                        {menu.links.map((link) => (
                          <Link
                            key={link.href}
                            href={`/${locale}${link.href}`}
                            onClick={() => setOpenMenu(null)}
                            className="group flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] text-secondary/65 transition-all duration-150 hover:bg-gray-50 hover:text-dark"
                          >
                            <span className="h-1 w-1 rounded-full bg-secondary/15 transition-colors duration-150 group-hover:bg-primary" />
                            {link.label}
                          </Link>
                        ))}
                      </div>

                      {/* View all */}
                      <div className="mt-4 border-t border-gray-100 pt-3">
                        <Link
                          href={`/${locale}${menu.href}`}
                          onClick={() => setOpenMenu(null)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:text-[#e55a28]"
                        >
                          {dict.navbar.viewAll}
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>

                    {/* Right â€” Featured card */}
                    {menu.featured && (
                      <div className="w-56 shrink-0 border-l border-gray-100 bg-gray-50 p-5">
                        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.15em] text-secondary/30">{dict.navbar.featured}</p>
                        <Link
                          href={`/${locale}${menu.featured.href}`}
                          onClick={() => setOpenMenu(null)}
                          className="group block"
                        >
                          <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-xl bg-white ring-1 ring-gray-100">
                            <Image
                              src={menu.featured.image}
                              alt={menu.featured.title}
                              fill
                              className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                              sizes="200px"
                            />
                          </div>
                          <p className="text-sm font-bold text-dark transition-colors group-hover:text-primary">{menu.featured.title}</p>
                          <p className="mt-0.5 text-[11px] leading-relaxed text-secondary/45">{menu.featured.desc}</p>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* CTA buttons */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher locale={locale} inverted={inverted} />
          <a
            href="https://perfectusair.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden items-center gap-1.5 rounded-full border px-5 py-2 text-[10px] font-medium uppercase tracking-[0.12em] transition-all duration-300 xl:inline-flex ${
              inverted
                ? "border-white/10 bg-white/[0.03] text-white/72 hover:border-white/20 hover:text-white"
                : "border-secondary/15 text-secondary/60 hover:border-primary hover:text-primary"
            }`}
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {dict.navbar.fanSelector}
          </a>
          <a
            href="https://wa.me/905444674752"
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden items-center gap-1.5 rounded-full border px-5 py-2 text-[10px] font-medium uppercase tracking-[0.12em] transition-all duration-300 xl:inline-flex ${
              inverted
                ? "border-white/10 bg-white/[0.03] text-white/72 hover:border-white/20 hover:text-white"
                : "border-secondary/15 text-secondary/60 hover:border-primary hover:text-primary"
            }`}
          >
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`inline-flex items-center justify-center rounded p-2 xl:hidden ${
              inverted ? "text-white/72 hover:text-white" : "text-secondary/60 hover:text-primary"
            }`}
            aria-expanded={mobileOpen}
            aria-label={dict.navbar.openMenu}
          >
            {mobileOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* â”€â”€ Mobile Menu â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {mobileOpen && (
        <div className="max-h-[80vh] overflow-y-auto border-t border-gray-100 bg-white xl:hidden">
          <div className="space-y-1 px-4 py-4">
            {menus.map((menu) => (
              <div key={menu.label}>
                <button
                  type="button"
                  onClick={() => setMobileExpanded(mobileExpanded === menu.label ? null : menu.label)}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-gray-50"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
                    {menu.icon}
                  </span>
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-dark">{menu.label}</span>
                    <span className="ml-2 text-[11px] text-secondary/35">{menu.desc}</span>
                  </div>
                  <svg
                    className={`h-4 w-4 shrink-0 text-secondary/25 transition-transform duration-200 ${mobileExpanded === menu.label ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                {mobileExpanded === menu.label && (
                  <div className="ml-11 space-y-0.5 border-l-2 border-primary/10 py-1 pl-4">
                    {menu.links.map((link) => (
                      <Link
                        key={link.href}
                        href={`/${locale}${link.href}`}
                        onClick={() => { setMobileOpen(false); setMobileExpanded(null); }}
                        className="block rounded-md px-3 py-2 text-[13px] text-secondary/55 transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile CTAs */}
            <div className="mt-3 space-y-2 border-t border-gray-100 pt-3">
              <a
                href="https://perfectusair.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-secondary/12 py-3 text-sm font-semibold text-secondary"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {dict.navbar.fanSelector}
              </a>
              <a
                href="https://wa.me/905444674752"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-semibold text-white"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

