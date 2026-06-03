"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LocationCard } from "@/components/iletisim/location-card";
import type { IletisimPageCopy } from "@/lib/iletisim/copy";
import {
  HIZMETLER_MOBILE_CONTENT_PADDING_BOTTOM,
  HIZMETLER_MOBILE_DRAWER,
  HIZMETLER_PAGE_PADDING_TOP,
} from "@/lib/hizmetler/layout";

type Props = {
  locale: string;
  copy: IletisimPageCopy;
  socialMediaLabel: string;
};

const fieldClass =
  "w-full rounded-xl border border-hz-outline-variant/40 bg-hz-surface-container-low px-5 py-4 text-sm text-hz-on-surface outline-none transition-all placeholder:text-hz-outline/80 focus:border-transparent focus:ring-2 focus:ring-hz-secondary";

function NavGroup({
  title,
  icon,
  iconFilled,
  open,
  onToggle,
  children,
}: {
  title: string;
  icon: string;
  iconFilled?: boolean;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-2 py-2 text-left text-base font-extrabold text-hz-secondary"
      >
        <span
          className="material-symbols-outlined text-hz-secondary"
          style={iconFilled ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          {icon}
        </span>
        {title}
        <span
          className={`material-symbols-outlined ml-auto text-sm opacity-50 transition-transform ${open ? "rotate-90" : ""}`}
        >
          chevron_right
        </span>
      </button>
      {open ? (
        <div className="relative mt-1 space-y-1 pl-8">
          <div className="absolute bottom-0 left-4 top-0 w-px bg-hz-outline-variant/20" />
          {children}
        </div>
      ) : null}
    </div>
  );
}

const CLOSE_LABEL: Record<string, string> = {
  tr: "Kapat", en: "Close", ru: "Закрыть", ar: "إغلاق", de: "Schließen", it: "Chiudi",
  fr: "Fermer", az: "Bağla", kk: "Жабу", tg: "Пӯшидан", es: "Cerrar", zh: "关闭",
  ur: "بند کریں", lt: "Uždaryti", pl: "Zamknij",
};

export function IletisimPage({ locale, copy, socialMediaLabel }: Props) {
  const base = `/${locale}`;
  const closeLabel = CLOSE_LABEL[locale] ?? CLOSE_LABEL.en;

  const [contactOpen, setContactOpen] = useState(true);
  const [partnersOpen, setPartnersOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  }

  const sidebar = (
    <>
      <div className="px-6 py-8">
        <Link href={base} className="flex items-center gap-2 text-xl font-bold text-hz-on-primary-container">
          <span className="flex h-8 w-8 items-center justify-center rounded bg-hz-primary-container text-white">
            N
          </span>
          NOVVES
        </Link>
        <p className="mt-2 text-xs font-bold uppercase tracking-widest text-hz-on-surface-variant opacity-60">
          {copy.sidebarSubtitle}
        </p>
      </div>

      <nav className="flex-1 space-y-6 px-4">
        <NavGroup
          title={copy.navContactSupport}
          icon="support_agent"
          iconFilled
          open={contactOpen}
          onToggle={() => setContactOpen((v) => !v)}
        >
          <Link
            href={`${base}/iletisim`}
            className="-ml-3 block rounded-r-full bg-hz-secondary/10 py-1.5 pl-3 pr-3 text-sm font-bold text-hz-secondary"
          >
            {copy.navContact}
          </Link>
          <a
            href="#iletisim-formu"
            className="block py-1.5 text-sm font-medium text-hz-on-surface-variant transition-colors hover:text-hz-secondary"
          >
            {copy.navTechnicalSupport}
          </a>
          <Link
            href={`${base}/iletisim/sosyal-medya`}
            className="block py-1.5 text-sm font-medium text-hz-on-surface-variant transition-colors hover:text-hz-secondary"
          >
            {socialMediaLabel}
          </Link>
        </NavGroup>

        <NavGroup
          title={copy.navPartners}
          icon="handshake"
          open={partnersOpen}
          onToggle={() => setPartnersOpen((v) => !v)}
        >
          <Link
            href={`${base}/iletisim/partnerlerimiz`}
            className="block py-1.5 text-sm font-medium text-hz-on-surface-variant transition-colors hover:text-hz-secondary"
          >
            {copy.navGlobalPartners}
          </Link>
        </NavGroup>
      </nav>

      <div className="px-4 pb-4">
        <div className="rounded-2xl bg-hz-primary-container p-5 text-white">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-bold">
            <span className="material-symbols-outlined text-lg text-hz-secondary-container">schedule</span>
            {copy.workingHours}
          </h3>
          <div className="space-y-2 text-[11px] uppercase tracking-wider">
            <div className="flex justify-between border-b border-white/10 pb-1.5">
              <span className="font-medium text-white/70">{copy.weekdays}</span>
              <span className="font-bold">{copy.weekdaysHours}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-1.5">
              <span className="font-medium text-white/70">{copy.saturday}</span>
              <span className="font-bold">{copy.saturdayHours}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-white/70">{copy.sunday}</span>
              <span className="font-bold text-hz-secondary-container">{copy.sundayClosed}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto border-t border-sand-300/60 p-4">
        <Link
          href={`${base}/teknik-merkez/dokuman-kutuphanesi`}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-hz-primary-container py-3 text-sm font-bold text-white shadow-sm transition-transform hover:scale-[0.98]"
        >
          <span className="material-symbols-outlined text-sm">download</span>
          {copy.downloadSpecs}
        </Link>
      </div>
    </>
  );

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <div className={`overflow-x-clip bg-sand-200 text-hz-on-surface ${HIZMETLER_PAGE_PADDING_TOP}`}>
        <div
          className={`flex min-h-[calc(100dvh-5rem)] min-w-0 items-stretch sm:min-h-[calc(100dvh-6rem)] lg:min-h-[calc(100dvh-7rem)] ${HIZMETLER_MOBILE_CONTENT_PADDING_BOTTOM} lg:pb-0`}
        >
          {/* Sol panel — masaüstü (sticky) */}
          <aside className="hidden w-80 shrink-0 self-stretch border-r border-sand-300/60 bg-sand-200 lg:block">
            <div className="sticky top-28 flex h-[calc(100vh-7rem)] flex-col overflow-y-auto custom-scrollbar">
              {sidebar}
            </div>
          </aside>

          {/* Mobil çekmece */}
          <button
            type="button"
            className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-4 z-[70] flex h-12 max-w-[min(calc(100vw-2rem),20rem)] items-center gap-2 rounded-full bg-white px-3.5 text-sm font-semibold text-hz-on-surface shadow-lg ring-1 ring-sand-300 sm:px-4 lg:hidden"
            onClick={() => setMobileNavOpen((v) => !v)}
            aria-expanded={mobileNavOpen}
            aria-controls="iletisim-mobile-drawer"
          >
            <span className="material-symbols-outlined shrink-0 text-xl">
              {mobileNavOpen ? "close" : "menu"}
            </span>
            <span className="truncate">{copy.navContactSupport}</span>
          </button>

          {mobileNavOpen ? (
            <div className="fixed inset-0 z-[65] lg:hidden" role="dialog" aria-modal aria-label={copy.navContactSupport}>
              <button
                type="button"
                className="absolute inset-0 bg-black/40"
                onClick={() => setMobileNavOpen(false)}
                aria-label={closeLabel}
              />
              <aside
                id="iletisim-mobile-drawer"
                className={`absolute bottom-0 left-0 flex w-[min(20rem,calc(100vw-2rem))] min-h-0 flex-col overflow-hidden bg-sand-200 shadow-xl ${HIZMETLER_MOBILE_DRAWER}`}
              >
                <div className="relative flex min-h-0 flex-1 flex-col overflow-y-auto">
                  <button
                    type="button"
                    onClick={() => setMobileNavOpen(false)}
                    className="material-symbols-outlined absolute right-3 top-3 z-10 rounded-lg bg-sand-200/90 p-1 hover:bg-white/80"
                    aria-label={closeLabel}
                  >
                    close
                  </button>
                  {sidebar}
                </div>
              </aside>
            </div>
          ) : null}

          {/* Ana sütun */}
          <div className="flex min-w-0 flex-1 flex-col bg-sand-200">
            <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-sand-300/60 bg-sand-200 px-4 sm:px-8 lg:h-20">
              <nav className="flex min-w-0 flex-wrap items-center gap-1 text-xs font-medium text-hz-on-surface-variant sm:text-sm">
                <Link href={base} className="truncate hover:text-hz-on-surface">
                  {copy.breadcrumbHome}
                </Link>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span className="truncate">{copy.breadcrumbSection}</span>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span className="truncate font-bold text-hz-on-surface">{copy.breadcrumbCurrent}</span>
              </nav>
              <div className="hidden shrink-0 items-center gap-4 sm:flex">
                <a
                  href="tel:+902164674752"
                  className="text-sm font-semibold text-hz-on-surface-variant hover:text-hz-secondary"
                >
                  +90 216 467 47 52
                </a>
                <a
                  href="mailto:info@novves.com"
                  className="text-sm font-semibold text-hz-secondary hover:underline"
                >
                  info@novves.com
                </a>
              </div>
            </header>

          <div className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-12">
            <div className="mx-auto max-w-7xl space-y-8 sm:space-y-12 lg:space-y-16">
              {/* Hero */}
              <section className="relative flex min-h-[260px] items-center overflow-hidden rounded-2xl shadow-[0_32px_48px_-16px_rgba(25,28,30,0.35)] sm:min-h-[380px] sm:rounded-3xl">
                <Image
                  src="/images/contact-cta-bg.jpg"
                  alt=""
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-hz-primary-container via-hz-primary-container/85 to-transparent" />
                <div className="relative z-10 max-w-3xl px-6 py-8 sm:px-12 sm:py-10">
                  <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-hz-secondary-container sm:mb-4 sm:text-sm">
                    {copy.heroBadge}
                  </span>
                  <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl sm:tracking-tighter lg:text-6xl">
                    {copy.heroTitle}
                    <br />
                    {copy.heroTitleLine2}
                  </h1>
                  <p className="mt-4 max-w-lg text-base font-medium text-white/70 sm:mt-6 sm:text-lg">{copy.heroDesc}</p>
                </div>
              </section>

              {/* Form — Stitch layout: 2×2 + mesaj + sağda gönder */}
              <section
                id="iletisim-formu"
                className="scroll-mt-28 rounded-2xl border border-hz-outline-variant/30 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-8 lg:p-12"
              >
                <div className="mb-8 sm:mb-12">
                  <h2 className="mb-2 text-2xl font-black text-hz-on-surface sm:text-3xl">{copy.formTitle}</h2>
                  <p className="text-sm font-medium text-hz-on-surface-variant sm:text-base">{copy.formDesc}</p>
                </div>

                {submitted ? (
                  <div className="mb-8 flex items-start gap-3 rounded-xl bg-green-50 p-4 text-green-800 ring-1 ring-green-100">
                    <span className="material-symbols-outlined shrink-0 text-green-600">check_circle</span>
                    <p className="text-sm font-medium">{copy.successMessage}</p>
                  </div>
                ) : null}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:gap-8 md:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="iletisim-name"
                      className="text-xs font-bold uppercase tracking-wider text-hz-on-surface-variant"
                    >
                      {copy.labelName}
                    </label>
                    <input
                      id="iletisim-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={copy.placeholderName}
                      className={fieldClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="iletisim-company"
                      className="text-xs font-bold uppercase tracking-wider text-hz-on-surface-variant"
                    >
                      {copy.labelCompany}
                    </label>
                    <input
                      id="iletisim-company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={copy.placeholderCompany}
                      className={fieldClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="iletisim-email"
                      className="text-xs font-bold uppercase tracking-wider text-hz-on-surface-variant"
                    >
                      {copy.labelEmail}
                    </label>
                    <input
                      id="iletisim-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={copy.placeholderEmail}
                      className={fieldClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="iletisim-phone"
                      className="text-xs font-bold uppercase tracking-wider text-hz-on-surface-variant"
                    >
                      {copy.labelPhone}
                    </label>
                    <input
                      id="iletisim-phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={copy.placeholderPhone}
                      className={fieldClass}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label
                      htmlFor="iletisim-message"
                      className="text-xs font-bold uppercase tracking-wider text-hz-on-surface-variant"
                    >
                      {copy.labelMessage}
                    </label>
                    <textarea
                      id="iletisim-message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={copy.placeholderMessage}
                      className={`${fieldClass} resize-none`}
                    />
                  </div>
                  <p className="text-xs leading-relaxed text-hz-on-surface-variant md:col-span-2">
                    {copy.kvkkConsent}
                  </p>
                  <div className="md:col-span-2 md:flex md:justify-end">
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-3 rounded-2xl bg-hz-secondary px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-hz-secondary/20 transition-all hover:bg-hz-secondary/90 sm:px-12 sm:py-4 sm:text-lg md:w-auto"
                    >
                      {copy.submit}
                      <span className="material-symbols-outlined">send</span>
                    </button>
                  </div>
                </form>
              </section>

              {/* Locations */}
              <section className="space-y-10 pb-8">
                <div className="text-center">
                  <h2 className="text-3xl font-black sm:text-4xl">{copy.locationsTitle}</h2>
                  <p className="mx-auto mt-3 max-w-2xl text-hz-on-surface-variant">{copy.locationsDesc}</p>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  {copy.locations.map((loc) => (
                    <LocationCard key={loc.id} location={loc} getDirections={copy.getDirections} />
                  ))}
                </div>
              </section>
            </div>
          </div>
          </div>
        </div>
      </div>

      <a
        href="https://wa.me/905444674752"
        target="_blank"
        rel="noopener noreferrer"
        className="group fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-hz-secondary-container text-hz-on-secondary-container shadow-2xl transition-transform hover:scale-110 active:scale-95"
        aria-label={copy.fabLabel}
      >
        <span className="material-symbols-outlined text-3xl">question_answer</span>
        <span className="pointer-events-none absolute right-20 whitespace-nowrap rounded-lg bg-hz-primary-container px-4 py-2 text-xs font-bold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
          {copy.fabLabel}
        </span>
      </a>
    </>
  );
}
