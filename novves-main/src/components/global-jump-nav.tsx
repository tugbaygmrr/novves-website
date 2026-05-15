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
        href: `/${locale}/cozumler`,
        matchPath: `/${locale}/cozumler`,
        homeSectionId: "solution-categories",
      },
      {
        id: "product-categories",
        label: labels.products,
        href: `/${locale}/urunler`,
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
    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const id = mostVisible?.target?.id;
        if (!id) return;
        cancelAnimationFrame(sectionRaf);
        sectionRaf = requestAnimationFrame(() => setActiveHomeSection(id));
      },
      { rootMargin: "-32% 0px -42% 0px", threshold: [0.2, 0.45, 0.7] },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      cancelAnimationFrame(sectionRaf);
      observer.disconnect();
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

  const getJumpIcon = (id: JumpItemId) => {
    if (id === "hero-main") {
      return <path strokeLinecap="round" strokeLinejoin="round" d="M3 11.5L12 4l9 7.5M5.25 10v10h13.5V10M9 20v-5.25h6V20" />;
    }
    if (id === "solution-categories") {
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      );
    }
    if (id === "product-categories") {
      return <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 5.25h6.75V12H4.5V5.25zm8.25 0h6.75V12h-6.75V5.25zM4.5 13.5h6.75v5.25H4.5V13.5zm8.25 0h6.75v5.25h-6.75V13.5z" />;
    }
    if (id === "catalogs") {
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
        />
      );
    }
    if (id === "references") {
      return <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 19.5h16.5M6.75 16.5v-6.75m5.25 6.75V7.5m5.25 9V10.5M5.25 8.25l6.75-3 6.75 3" />;
    }
    if (id === "certificates") {
      return <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 4.5h9v6.75a4.5 4.5 0 01-9 0V4.5zm2.25 5.25l1.5 1.5 3-3m-5.25 8.25L12 14.25l3 2.25v3L12 18l-3 1.5v-3z" />;
    }
    if (id === "company-profile") {
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 10-4.682 2.721 12.004 12.004 0 003.741.479m0 0v.031c0 .225-.012.447-.037.666M18 18.72v-4.5m0 0l-3.75-3.75M18 14.22l3.75-3.75"
        />
      );
    }
    return <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 9.75h9M7.5 13.5h6m-8.25 6h13.5A2.25 2.25 0 0021 17.25V6.75A2.25 2.25 0 0018.75 4.5H5.25A2.25 2.25 0 003 6.75v10.5A2.25 2.25 0 005.25 19.5z" />;
  };

  return (
    <>
      <nav className="fixed end-0 top-1/2 z-40 hidden max-h-[min(78vh,720px)] -translate-y-1/2 lg:flex">
        <div className="group flex max-h-[inherit] w-[52px] overflow-hidden rounded-s-xl border border-e-0 border-[#2b4065]/18 bg-[#1a2842]/92 px-2 py-2 shadow-[0_16px_30px_-24px_rgba(8,15,28,0.58)] backdrop-blur-sm transition-[width] duration-300 hover:w-[200px]">
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
                    className={`flex h-9 w-full items-center gap-2.5 rounded-md px-2.5 transition-colors ${
                      active ? "bg-white/[0.1]" : "hover:bg-white/[0.06]"
                    }`}
                  >
                    <svg
                      className={`${active ? "text-primary" : "text-white/72 group-hover:text-white/90"} h-4 w-4 shrink-0 transition-colors`}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.7}
                      stroke="currentColor"
                    >
                      {getJumpIcon(item.id)}
                    </svg>
                    <span
                      className={`${active ? "text-white" : "text-white/78 group-hover:text-white"} font-mono-eng text-[10px] uppercase tracking-[0.18em] whitespace-nowrap transition-all duration-200 opacity-0 ltr:-translate-x-1 rtl:translate-x-1 group-hover:translate-x-0 group-hover:opacity-100`}
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
                      className={`group flex min-h-[52px] min-w-[58px] flex-col items-center justify-center gap-0.5 rounded-lg px-1 py-1 transition-colors md:min-h-14 md:min-w-[60px] md:gap-1 ${
                        active ? "bg-white/[0.10]" : "hover:bg-white/[0.05]"
                      }`}
                    >
                      <svg
                        className={`${active ? "text-primary" : "text-white/70 group-hover:text-white/90"} h-[20px] w-[20px] shrink-0 transition-colors md:h-[22px] md:w-[22px]`}
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.7}
                        stroke="currentColor"
                      >
                        {getJumpIcon(item.id)}
                      </svg>
                      <span
                        className={`${active ? "text-white" : "text-white/76 group-hover:text-white/90"} max-w-[4.75rem] text-center font-mono-eng text-[7px] uppercase leading-tight tracking-[0.1em] transition-colors md:text-[8px]`}
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
