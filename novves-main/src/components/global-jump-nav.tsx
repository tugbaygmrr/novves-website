"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  COOKIE_CONSENT_EVENT,
  isConsentRestrictedMinimal,
  parseStoredConsentJson,
  readCookieConsentRaw,
} from "@/lib/cookie-consent-storage";
import type { JumpNavLabels } from "@/i18n/jump-nav-labels";

type JumpItemId =
  | "hero-main"
  | "solution-categories"
  | "product-categories"
  | "catalogs"
  | "references"
  | "certificates"
  | "company-profile"
  | "faq";

type JumpItem = {
  id: JumpItemId;
  label: string;
  href: string;
  matchPath: string;
  homeSectionId: string;
  /** When true, only exact pathname match (no prefix). Use for root locale path. */
  matchExact?: boolean;
};

function normalizePath(p: string) {
  return p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
}

export function GlobalJumpNav({
  locale,
  labels,
}: {
  locale: string;
  labels: JumpNavLabels;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeHomeSection, setActiveHomeSection] = useState("hero-main");
  const [consentRestricted, setConsentRestricted] = useState(false);

  const homePath = `/${locale}`;
  const isHome = pathname === homePath || pathname === `${homePath}/`;

  useEffect(() => {
    const apply = () => {
      setConsentRestricted(isConsentRestrictedMinimal(parseStoredConsentJson(readCookieConsentRaw())));
    };
    apply();
    window.addEventListener(COOKIE_CONSENT_EVENT, apply as EventListener);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, apply as EventListener);
  }, []);

  const jumpItems = useMemo<JumpItem[]>(
    () => {
      const all: JumpItem[] = [
      {
        id: "hero-main",
        label: labels.home,
        href: homePath,
        matchPath: homePath,
        homeSectionId: "hero-main",
        matchExact: true,
      },
      {
        id: "solution-categories",
        label: labels.solutions,
        href: `/${locale}/cozumler/duman-isi-tahliye-sistemleri`,
        matchPath: `/${locale}/cozumler`,
        homeSectionId: "solution-categories",
      },
      {
        id: "product-categories",
        label: labels.products,
        href: `/${locale}/urunler/hava-hareketi`,
        matchPath: `/${locale}/urunler`,
        homeSectionId: "product-categories",
      },
      {
        id: "catalogs",
        label: labels.catalogs,
        href: `/${locale}/teknik-merkez/dokuman-kutuphanesi`,
        matchPath: `/${locale}/teknik-merkez`,
        homeSectionId: "catalogs",
      },
      {
        id: "references",
        label: labels.references,
        href: `/${locale}/kurumsal/referanslar`,
        matchPath: `/${locale}/kurumsal/referanslar`,
        homeSectionId: "references",
      },
      {
        id: "certificates",
        label: labels.certificates,
        href: `/${locale}/kurumsal/sertifikalar`,
        matchPath: `/${locale}/kurumsal/sertifikalar`,
        homeSectionId: "certificates",
      },
      {
        id: "company-profile",
        label: labels.company,
        href: `/${locale}/kurumsal/biz-kimiz`,
        matchPath: `/${locale}/kurumsal/biz-kimiz`,
        homeSectionId: "company-profile",
        matchExact: true,
      },
      {
        id: "faq",
        label: labels.faq,
        href: `${homePath}#faq`,
        matchPath: homePath,
        homeSectionId: "faq",
        matchExact: true,
      },
    ];
      return all.filter((item) => !(consentRestricted && item.id === "catalogs"));
    },
    [homePath, locale, labels, consentRestricted],
  );

  /** Scroll to hash after navigating from another page to home. */
  useEffect(() => {
    if (!isHome || typeof window === "undefined") return;
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    const t = window.setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveHomeSection(hash);
      }
    }, 120);
    return () => window.clearTimeout(t);
  }, [isHome, pathname]);

  useEffect(() => {
    if (!isHome) return;

    const sectionIds = jumpItems.map((item) => item.homeSectionId).filter(Boolean);
    let sectionRaf = 0;

    /** Scroll-bazlı detection — IntersectionObserver yerine her section'ın top'u
     * viewport'un üst kısmına en yakın olanı aktif yap. Bu, uzun section'ların
     * "ratio'su yüksek" diye yapışıp kalmasını önler. */
    const computeActive = () => {
      const viewportTop = 120; // navbar offset
      let activeId: string | null = null;
      let bestDist = Number.POSITIVE_INFINITY;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        // Section top viewport'un üst threshold'unun altında olmalı (yani section başlamış)
        // Bottom da hâlâ aşağıda olmalı (yani henüz tamamen geçmemiş)
        if (rect.bottom <= viewportTop) continue; // tamamen üstte kaldı, geç
        const dist = Math.abs(rect.top - viewportTop);
        if (dist < bestDist) {
          bestDist = dist;
          activeId = id;
        }
      }
      if (activeId) setActiveHomeSection(activeId);
    };

    const onScroll = () => {
      cancelAnimationFrame(sectionRaf);
      sectionRaf = requestAnimationFrame(computeActive);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // İlk hesap
    computeActive();

    return () => {
      cancelAnimationFrame(sectionRaf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isHome, jumpItems]);

  const onNavigate = (item: JumpItem) => {
    const sectionId = item.homeSectionId;
    /** Yalnızca anasayfada: ilgili bölüme kaydır. Başka sayfadaysa her zaman `href` (çözümler / ürünler / kurumsal … hedef sayfası). */
    if (isHome && sectionId) {
      const el = document.getElementById(sectionId);
      if (el) {
        setActiveHomeSection(sectionId);
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    router.push(item.href);
  };

  const isActive = (item: JumpItem) => {
    if (isHome) return activeHomeSection === item.homeSectionId;
    const p = normalizePath(pathname);
    const m = normalizePath(item.matchPath);
    if (item.matchExact) return p === m;
    return p === m || p.startsWith(`${m}/`);
  };

  /** Kullanıcı görselinden kırpılmış 7 ikon PNG'si — beyaz silüet, transparent bg.
   * CSS mask-image ile background-color üzerinden boyanır (beyaz/turuncu). */
  const jumpIconFile: Record<JumpItemId, string> = {
    "hero-main": "/images/jump-icons/home.png",
    "solution-categories": "/images/jump-icons/solutions.png",
    "product-categories": "/images/jump-icons/products.png",
    "catalogs": "/images/jump-icons/catalogs.svg",
    "references": "/images/jump-icons/references.png",
    "certificates": "/images/jump-icons/certificates.png",
    "company-profile": "/images/jump-icons/company.png",
    "faq": "/images/jump-icons/faq.png",
  };

  function JumpIcon({ id, active, className }: { id: JumpItemId; active: boolean; className?: string }) {
    const src = jumpIconFile[id];
    const maskStyle: React.CSSProperties = {
      maskImage: `url(${src})`,
      WebkitMaskImage: `url(${src})`,
      maskSize: "contain",
      WebkitMaskSize: "contain",
      maskPosition: "center",
      WebkitMaskPosition: "center",
      maskRepeat: "no-repeat",
      WebkitMaskRepeat: "no-repeat",
    };
    return (
      <span
        aria-hidden
        className={`block shrink-0 transition-colors ${active ? "bg-primary" : "bg-white"} ${className ?? ""}`}
        style={maskStyle}
      />
    );
  }

  return (
    <>
      <nav className="fixed end-0 top-1/2 z-40 hidden max-h-[min(78vh,720px)] -translate-y-1/2 lg:flex">
        <div className="group flex max-h-[inherit] w-[64px] overflow-hidden rounded-s-xl border border-e-0 border-[#2b4065]/18 bg-[#1a2842]/92 px-2 py-2 shadow-[0_16px_30px_-24px_rgba(8,15,28,0.58)] backdrop-blur-sm transition-[width] duration-300 hover:w-[210px]">
          <ul className="max-h-[min(74vh,680px)] space-y-1 overflow-y-auto overflow-x-hidden pe-0.5 [-webkit-overflow-scrolling:touch]">
            {jumpItems.map((item) => {
              const active = isActive(item);
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(item)}
                    title={item.label}
                    aria-label={item.label}
                    className="relative flex h-9 w-full items-center gap-2.5 rounded-md px-2.5 transition-colors hover:bg-white/[0.05]"
                  >
                    {/* Aktif state — sol kenarda turuncu çentik */}
                    {active && (
                      <span
                        className="pointer-events-none absolute start-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-md bg-primary"
                        aria-hidden
                      />
                    )}
                    <JumpIcon id={item.id} active={active} className="h-7 w-8" />
                    <span
                      className={`${active ? "text-white" : "text-white/90 group-hover:text-white"} font-mono-eng text-[10px] uppercase tracking-[0.18em] whitespace-nowrap transition-all duration-200 opacity-0 ltr:-translate-x-1 rtl:translate-x-1 group-hover:translate-x-0 group-hover:opacity-100`}
                    >
                      {item.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <nav
        data-mobile-jump-nav
        className="hidden fixed bottom-4 inset-x-3 z-20 transition-all duration-300 md:inset-x-6 md:bottom-5 lg:hidden"
      >
        <div className="relative mx-auto max-w-xl rounded-3xl border border-[#2b4065]/20 bg-[#1a2842]/92 px-3 py-3 shadow-[0_18px_32px_-24px_rgba(8,15,28,0.62)] backdrop-blur-sm md:px-4 md:py-3.5">
          <div className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#121d31] shadow-[0_10px_22px_-14px_rgba(6,10,20,0.75)]">
              <Image src="/images/novves-icon.svg" alt="Novves" width={22} height={22} className="h-[22px] w-[22px]" />
            </div>
          </div>
          <div className="overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <ul className="flex min-w-min items-end justify-start gap-1.5 px-0.5 pb-0.5 pt-1 md:gap-2">
              {jumpItems.map((item) => {
                const active = isActive(item);
                return (
                  <li key={`m-${item.id}`} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => onNavigate(item)}
                      title={item.label}
                      aria-label={item.label}
                      className="group flex min-h-[52px] min-w-[58px] flex-col items-center justify-center gap-0.5 rounded-lg px-1 py-1 transition-colors hover:bg-white/[0.05] md:min-h-14 md:min-w-[60px] md:gap-1"
                    >
                      <JumpIcon id={item.id} active={active} className="h-8 w-9 md:h-9 md:w-10" />
                      <span
                        className={`${active ? "text-primary" : "text-white"} max-w-[4.75rem] text-center font-mono-eng text-[7px] uppercase leading-tight tracking-[0.1em] transition-colors md:text-[8px]`}
                      >
                        {item.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
