"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  COOKIE_CONSENT_EVENT,
  COOKIE_CONSENT_LEGACY_STORAGE_KEY,
  COOKIE_CONSENT_OPEN_EVENT,
  COOKIE_CONSENT_STORAGE_KEY,
  COOKIE_CONSENT_VISIBILITY_EVENT,
  COOKIE_DIALOG_HTML_ATTR,
  readCookieConsentRaw,
} from "@/lib/cookie-consent-storage";

type Consent = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
};

type Copy = {
  title: string;
  desc: string;
  learnMore: string;
  acceptAll: string;
  rejectAll: string;
  customize: string;
  savePrefs: string;
  back: string;
  categories: {
    essential: { title: string; desc: string; tag: string };
    analytics: { title: string; desc: string };
    marketing: { title: string; desc: string };
  };
};

const copy: Record<string, Copy> = {
  tr: {
    title: "Çerez Tercihlerinizi Yönetin",
    desc: "Deneyiminizi iyileştirmek, site trafiğini analiz etmek ve içerikleri kişiselleştirmek için çerezler kullanıyoruz. 'Tümünü Kabul Et' diyerek tüm çerezlere izin verebilir veya tercihlerinizi özelleştirebilirsiniz.",
    learnMore: "Gizlilik politikası",
    acceptAll: "Tümünü Kabul Et",
    rejectAll: "Tümünü Reddet",
    customize: "Özelleştir",
    savePrefs: "Tercihlerimi Kaydet",
    back: "Geri",
    categories: {
      essential: {
        title: "Zorunlu Çerezler",
        desc: "Sitenin temel işlevleri için gereklidir. Devre dışı bırakılamaz.",
        tag: "Zorunlu",
      },
      analytics: {
        title: "Analitik Çerezler",
        desc: "Ziyaretçi sayısı, trafik kaynağı ve site kullanımı hakkında anonim veri toplar.",
      },
      marketing: {
        title: "Pazarlama Çerezleri",
        desc: "İlgi alanlarınıza göre içerik ve reklam göstermek için kullanılır.",
      },
    },
  },
  en: {
    title: "Manage Your Cookie Preferences",
    desc: "We use cookies to improve your experience, analyze site traffic, and personalize content. Click 'Accept All' to allow all cookies or customize your preferences.",
    learnMore: "Privacy policy",
    acceptAll: "Accept All",
    rejectAll: "Reject All",
    customize: "Customize",
    savePrefs: "Save Preferences",
    back: "Back",
    categories: {
      essential: {
        title: "Essential Cookies",
        desc: "Required for the basic functionality of the site. Cannot be disabled.",
        tag: "Required",
      },
      analytics: {
        title: "Analytics Cookies",
        desc: "Collect anonymous data about visitor counts, traffic sources, and site usage.",
      },
      marketing: {
        title: "Marketing Cookies",
        desc: "Used to show content and advertisements based on your interests.",
      },
    },
  },
  ru: {
    title: "Управление настройками cookie",
    desc: "Мы используем файлы cookie для улучшения работы сайта, анализа трафика и персонализации контента. Нажмите «Принять все», чтобы разрешить все файлы cookie, или настройте предпочтения вручную.",
    learnMore: "Политика конфиденциальности",
    acceptAll: "Принять все",
    rejectAll: "Отклонить все",
    customize: "Настроить",
    savePrefs: "Сохранить настройки",
    back: "Назад",
    categories: {
      essential: {
        title: "Обязательные cookie",
        desc: "Необходимы для базовой работы сайта. Нельзя отключить.",
        tag: "Обязательно",
      },
      analytics: {
        title: "Аналитические cookie",
        desc: "Собирают анонимные данные о посещаемости, источниках трафика и использовании сайта.",
      },
      marketing: {
        title: "Маркетинговые cookie",
        desc: "Используются для показа контента и рекламы на основе ваших интересов.",
      },
    },
  },
};

function shouldShowBanner(): boolean {
  try {
    return !readCookieConsentRaw();
  } catch {
    return true;
  }
}

export function CookieConsent({ locale = "tr" }: { locale?: string }) {
  const [visible, setVisible] = useState(shouldShowBanner);
  const [expanded, setExpanded] = useState(shouldShowBanner);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  const t = copy[locale] ?? copy.tr;

  useEffect(() => {
    if (!visible) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  useLayoutEffect(() => {
    if (typeof document === "undefined") return;
    const nav = document.querySelector<HTMLElement>("[data-mobile-jump-nav]");

    if (!visible) {
      document.documentElement.removeAttribute(COOKIE_DIALOG_HTML_ATTR);
      nav?.style.removeProperty("display");
      window.dispatchEvent(
        new CustomEvent(COOKIE_CONSENT_VISIBILITY_EVENT, { detail: { open: false } }),
      );
      return;
    }

    document.documentElement.setAttribute(COOKIE_DIALOG_HTML_ATTR, "");
    nav?.style.setProperty("display", "none", "important");
    window.dispatchEvent(
      new CustomEvent(COOKIE_CONSENT_VISIBILITY_EVENT, { detail: { open: true } }),
    );
  }, [visible]);

  useEffect(() => {
    return () => {
      document.documentElement.removeAttribute(COOKIE_DIALOG_HTML_ATTR);
      document.querySelector<HTMLElement>("[data-mobile-jump-nav]")?.style.removeProperty("display");
    };
  }, []);

  useLayoutEffect(() => {
    const open = () => {
      setVisible(true);
      setExpanded(true);
    };
    window.addEventListener(COOKIE_CONSENT_OPEN_EVENT, open);
    return () => window.removeEventListener(COOKIE_CONSENT_OPEN_EVENT, open);
  }, []);

  function save(consent: Omit<Consent, "timestamp">) {
    const payload: Consent = { ...consent, timestamp: new Date().toISOString() };
    try {
      localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(payload));
      localStorage.removeItem(COOKIE_CONSENT_LEGACY_STORAGE_KEY);
    } catch {}
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: payload }));
    }
    setVisible(false);
  }

  function acceptAll() {
    save({ essential: true, analytics: true, marketing: true });
  }

  function rejectAll() {
    save({ essential: true, analytics: false, marketing: false });
  }

  function savePreferences() {
    save({ essential: true, analytics, marketing });
  }

  if (!visible) return null;

  if (typeof window === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 flex min-h-[100dvh] w-full items-center justify-center overflow-y-auto overflow-x-hidden p-4 sm:p-6"
      style={{ zIndex: 2147483646 }}
    >
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" aria-hidden />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-title"
        className="relative z-10 my-auto flex w-full max-w-[640px] flex-col overflow-y-auto overscroll-contain rounded-2xl border border-ink/15 bg-sand-100 shadow-[0_40px_120px_-30px_rgba(10,14,20,0.35)] max-h-[min(90vh,90dvh)] pb-[env(safe-area-inset-bottom,0px)] pt-[env(safe-area-inset-top,0px)]"
      >
        {/* Corner marks */}
          <div className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-ink/30" />
          <div className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r border-t border-ink/30" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b border-l border-ink/30" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r border-ink/30" />

          {/* Grid bg */}
          <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-50" />

          <div className="relative p-6 md:p-7">
            {/* Header */}
            <div className="flex items-center gap-3">
              <span className="font-mono-eng text-[10px] uppercase tracking-[0.28em] text-primary">
                ● Cookie
              </span>
              <span className="h-px flex-1 bg-ink/10" />
              <span className="font-mono-eng text-[9px] uppercase tracking-[0.22em] text-ink/40">
                GDPR / KVKK
              </span>
            </div>

            <h3
              id="cookie-title"
              className="mt-4 font-bold text-ink"
              style={{ fontSize: "1.5rem", lineHeight: 1.25, letterSpacing: "-0.015em" }}
            >
              {t.title}
            </h3>

            <p className="mt-3 text-[13px] leading-[1.65] text-ink/70">
              {t.desc}{" "}
              <Link
                href={`/${locale}/kvkk/kisisel-verilerin-korunmasi`}
                className="font-medium text-primary underline underline-offset-2 transition-opacity hover:opacity-80"
              >
                {t.learnMore}
              </Link>
              .
            </p>

            {/* Expanded: categories */}
            {expanded && (
              <div className="mt-5 max-h-[40vh] overflow-y-auto border-t border-ink/10 pt-5 space-y-4">
                {/* Essential */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-[13px] font-semibold text-ink">
                        {t.categories.essential.title}
                      </p>
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 font-mono-eng text-[9px] uppercase tracking-wide text-primary">
                        {t.categories.essential.tag}
                      </span>
                    </div>
                    <p className="mt-1 text-[12px] leading-[1.6] text-ink/60">
                      {t.categories.essential.desc}
                    </p>
                  </div>
                  <Toggle checked disabled />
                </div>

                {/* Analytics */}
                <div className="flex items-start justify-between gap-4 border-t border-ink/5 pt-4">
                  <div className="flex-1">
                    <p className="text-[13px] font-semibold text-ink">
                      {t.categories.analytics.title}
                    </p>
                    <p className="mt-1 text-[12px] leading-[1.6] text-ink/60">
                      {t.categories.analytics.desc}
                    </p>
                  </div>
                  <Toggle checked={analytics} onChange={setAnalytics} />
                </div>

                {/* Marketing */}
                <div className="flex items-start justify-between gap-4 border-t border-ink/5 pt-4">
                  <div className="flex-1">
                    <p className="text-[13px] font-semibold text-ink">
                      {t.categories.marketing.title}
                    </p>
                    <p className="mt-1 text-[12px] leading-[1.6] text-ink/60">
                      {t.categories.marketing.desc}
                    </p>
                  </div>
                  <Toggle checked={marketing} onChange={setMarketing} />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-6 flex flex-col gap-2 md:flex-row md:items-center">
              {expanded ? (
                <>
                  <button
                    onClick={() => setExpanded(false)}
                    className="order-last inline-flex items-center justify-center border border-ink/15 px-5 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-ink/70 transition-all hover:border-ink/30 hover:text-ink md:order-first"
                  >
                    {t.back}
                  </button>
                  <span className="hidden md:block md:flex-1" />
                  <button
                    onClick={savePreferences}
                    className="group inline-flex items-center justify-center gap-2 bg-ink px-6 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-sand-100 transition-all hover:bg-primary"
                  >
                    {t.savePrefs}
                    <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setExpanded(true)}
                    className="inline-flex items-center justify-center border border-ink/15 px-5 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-ink/70 transition-all hover:border-ink/30 hover:text-ink"
                  >
                    {t.customize}
                  </button>
                  <button
                    onClick={rejectAll}
                    className="inline-flex items-center justify-center px-5 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-ink/60 transition-all hover:text-ink"
                  >
                    {t.rejectAll}
                  </button>
                  <span className="md:flex-1" />
                  <button
                    onClick={acceptAll}
                    className="group inline-flex items-center justify-center gap-2 bg-ink px-6 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-sand-100 transition-all hover:bg-primary"
                  >
                    {t.acceptAll}
                    <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
      </div>
    </div>,
    document.body,
  );
}

function Toggle({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
        checked ? "bg-primary" : "bg-ink/15"
      } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
      role="switch"
      aria-checked={checked}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

