"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const STORAGE_KEY = "NOVVES_cookie_consent_v1";

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

export function CookieConsent({ locale = "tr" }: { locale?: string }) {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  const t = copy[locale] ?? copy.tr;

  useEffect(() => {
    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      if (!existing) {
        // Küçük gecikmeyle göster - sayfa yüklendikten sonra
        const timer = setTimeout(() => setVisible(true), 600);
        return () => clearTimeout(timer);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  function save(consent: Omit<Consent, "timestamp">) {
    const payload: Consent = { ...consent, timestamp: new Date().toISOString() };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {}
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

  return (
    <>
      {/* Backdrop when expanded */}
      {expanded && (
        <div
          className="fixed inset-0 z-[90] bg-ink/40 backdrop-blur-sm transition-opacity"
          onClick={() => setExpanded(false)}
        />
      )}

      {/* Banner */}
      <div
        className={`fixed z-[100] transition-all duration-500 ${
          expanded
            ? "inset-x-4 top-1/2 -translate-y-1/2 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:w-[640px]"
            : "inset-x-4 bottom-4 md:inset-x-auto md:right-6 md:bottom-6 md:w-[480px]"
        }`}
        role="dialog"
        aria-modal={expanded ? "true" : undefined}
        aria-labelledby="cookie-title"
      >
        <div className="relative border border-ink/15 bg-sand-100 shadow-[0_40px_120px_-30px_rgba(10,14,20,0.35)]">
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
      </div>
    </>
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

