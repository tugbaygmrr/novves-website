"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type JumpItem = {
  id: "hero-main" | "product-categories" | "references" | "certificates" | "faq";
  label: string;
  href: string;
  matchPath: string;
  homeSectionId?: string;
};

export function GlobalJumpNav({ locale }: { locale: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeHomeSection, setActiveHomeSection] = useState("hero-main");

  const homePath = `/${locale}`;
  const isHome = pathname === homePath || pathname === `${homePath}/`;

  const jumpItems = useMemo<JumpItem[]>(
    () => [
      {
        id: "hero-main",
        label: locale === "tr" ? "Anasayfa" : locale === "ru" ? "Главная" : "Home",
        href: homePath,
        matchPath: homePath,
        homeSectionId: "hero-main",
      },
      {
        id: "product-categories",
        label: locale === "tr" ? "Ürünler" : locale === "ru" ? "Продукты" : "Products",
        href: `/${locale}/urunler`,
        matchPath: `/${locale}/urunler`,
        homeSectionId: "product-categories",
      },
      {
        id: "references",
        label: locale === "tr" ? "Referanslar" : locale === "ru" ? "Референсы" : "References",
        href: `/${locale}/kurumsal/referanslar`,
        matchPath: `/${locale}/kurumsal/referanslar`,
        homeSectionId: "references",
      },
      {
        id: "certificates",
        label: locale === "tr" ? "Sertifikalar" : locale === "ru" ? "Сертификаты" : "Certificates",
        href: `/${locale}/kurumsal/sertifikalar`,
        matchPath: `/${locale}/kurumsal/sertifikalar`,
        homeSectionId: "certificates",
      },
      {
        id: "faq",
        label: locale === "tr" ? "SSS" : locale === "ru" ? "FAQ" : "FAQ",
        href: `/${locale}/kurumsal/biz-kimiz`,
        matchPath: `/${locale}/kurumsal/biz-kimiz`,
        homeSectionId: "faq",
      },
    ],
    [homePath, locale],
  );

  useEffect(() => {
    if (!isHome) return;

    const sectionIds = jumpItems.map((item) => item.homeSectionId).filter(Boolean) as string[];
    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (mostVisible?.target?.id) setActiveHomeSection(mostVisible.target.id);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.2, 0.45, 0.7] },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHome, jumpItems]);

  const onNavigate = (item: JumpItem) => {
    if (isHome && item.homeSectionId) {
      const el = document.getElementById(item.homeSectionId);
      if (el) {
        setActiveHomeSection(item.homeSectionId);
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    router.push(item.href);
  };

  const isActive = (item: JumpItem) => {
    if (isHome) return activeHomeSection === item.homeSectionId;
    return pathname === item.matchPath || pathname.startsWith(`${item.matchPath}/`);
  };

  const getJumpIcon = (id: JumpItem["id"]) => {
    if (id === "hero-main") return <path strokeLinecap="round" strokeLinejoin="round" d="M3 11.5L12 4l9 7.5M5.25 10v10h13.5V10M9 20v-5.25h6V20" />;
    if (id === "product-categories") return <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 5.25h6.75V12H4.5V5.25zm8.25 0h6.75V12h-6.75V5.25zM4.5 13.5h6.75v5.25H4.5V13.5zm8.25 0h6.75v5.25h-6.75V13.5z" />;
    if (id === "references") return <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 19.5h16.5M6.75 16.5v-6.75m5.25 6.75V7.5m5.25 9V10.5M5.25 8.25l6.75-3 6.75 3" />;
    if (id === "certificates") return <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 4.5h9v6.75a4.5 4.5 0 01-9 0V4.5zm2.25 5.25l1.5 1.5 3-3m-5.25 8.25L12 14.25l3 2.25v3L12 18l-3 1.5v-3z" />;
    return <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 9.75h9M7.5 13.5h6m-8.25 6h13.5A2.25 2.25 0 0021 17.25V6.75A2.25 2.25 0 0018.75 4.5H5.25A2.25 2.25 0 003 6.75v10.5A2.25 2.25 0 005.25 19.5z" />;
  };

  return (
    <>
      <nav className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 lg:flex">
        <div className="group w-[52px] overflow-hidden rounded-l-xl border border-r-0 border-[#2b4065]/18 bg-[#1a2842]/92 px-2 py-2 shadow-[0_16px_30px_-24px_rgba(8,15,28,0.58)] backdrop-blur-sm transition-[width] duration-300 hover:w-[184px]">
          <ul className="space-y-1.5">
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
                      className={`${active ? "text-white" : "text-white/78 group-hover:text-white"} font-mono-eng text-[10px] uppercase tracking-[0.18em] whitespace-nowrap transition-all duration-200 opacity-0 -translate-x-1 group-hover:translate-x-0 group-hover:opacity-100`}
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

      <nav className="fixed bottom-4 inset-x-3 z-40 transition-all duration-300 lg:hidden">
        <div className="relative rounded-3xl border border-[#2b4065]/20 bg-[#1a2842]/92 px-4 py-3.5 shadow-[0_18px_32px_-24px_rgba(8,15,28,0.62)] backdrop-blur-sm">
          <div className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#121d31] shadow-[0_10px_22px_-14px_rgba(6,10,20,0.75)]">
              <Image src="/images/novves-icon.svg" alt="Novves" width={22} height={22} className="h-[22px] w-[22px]" />
            </div>
          </div>
          <ul className="flex items-end justify-between">
            {jumpItems.map((item) => {
              const active = isActive(item);
              return (
                <li key={`m-${item.id}`}>
                  <button
                    type="button"
                    onClick={() => onNavigate(item)}
                    title={item.label}
                    aria-label={item.label}
                    className={`group flex h-[52px] w-12 flex-col items-center justify-center gap-1 rounded-lg transition-colors ${
                      active ? "bg-white/[0.10]" : "hover:bg-white/[0.05]"
                    }`}
                  >
                    <svg
                      className={`${active ? "text-primary" : "text-white/70 group-hover:text-white/90"} h-[22px] w-[22px] transition-colors`}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.7}
                      stroke="currentColor"
                    >
                      {getJumpIcon(item.id)}
                    </svg>
                    <span className={`${active ? "text-white" : "text-white/76 group-hover:text-white/90"} font-mono-eng text-[8px] uppercase tracking-[0.12em] transition-colors`}>
                      {item.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}
