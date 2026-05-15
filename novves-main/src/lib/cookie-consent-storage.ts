/** Tek kaynak: çerez tercihi localStorage anahtarı ve güncelleme event adı */
export const COOKIE_CONSENT_STORAGE_KEY = "NOVVES_cookie_consent_v2";
export const COOKIE_CONSENT_LEGACY_STORAGE_KEY = "NOVVES_cookie_consent_v1";
export const COOKIE_CONSENT_EVENT = "novves:cookie-consent-updated";
/** Çerez diyaloğunu tekrar açmak (tercih sıfırlandıktan sonra) */
export const COOKIE_CONSENT_OPEN_EVENT = "novves:cookie-consent-open";
/** Mobil alt navbar vb. ile çakışmayı önlemek için diyalog görünürlüğü */
export const COOKIE_CONSENT_VISIBILITY_EVENT = "novves:cookie-consent-visibility";
/** globals.css: html[data-cookie-dialog-open] ile mobil atlama çubuğunu gizler */
export const COOKIE_DIALOG_HTML_ATTR = "data-cookie-dialog-open";

/**
 * Tarayıcı çerezi — edge/proxy ile Teknik Merkez URL’lerini engellemek için senkronlanır.
 * localStorage ile aynı “reddedildi” kuralı: analitik ve pazarlama kapalı.
 */
export const CONSENT_RESTRICTED_COOKIE_NAME = "NOVVES_consent_restricted";

export type ParsedConsentFlags = {
  analytics: boolean;
  marketing: boolean;
};

export function parseStoredConsentJson(raw: string | null): ParsedConsentFlags | null {
  const trimmed = raw?.trim();
  if (!trimmed) return null;
  try {
    const parsed = JSON.parse(trimmed) as { analytics?: unknown; marketing?: unknown };
    if (typeof parsed.analytics !== "boolean" || typeof parsed.marketing !== "boolean") return null;
    return { analytics: parsed.analytics, marketing: parsed.marketing };
  } catch {
    return null;
  }
}

/** “Tümünü Reddet” veya yalnızca zorunlu çerezler (analitik+pazarlama kapalı). */
export function isConsentRestrictedMinimal(parsed: ParsedConsentFlags | null): boolean {
  if (!parsed) return false;
  return parsed.analytics === false && parsed.marketing === false;
}

/** localStorage’taki tercihe göre `NOVVES_consent_restricted` çerezini ayarlar veya siler. */
export function syncConsentRestrictedCookieFromStorage(): void {
  if (typeof document === "undefined") return;
  const parsed = parseStoredConsentJson(readCookieConsentRaw());
  const restricted = isConsentRestrictedMinimal(parsed);
  const maxAge = 60 * 60 * 24 * 400;
  if (restricted) {
    document.cookie = `${CONSENT_RESTRICTED_COOKIE_NAME}=1; path=/; max-age=${maxAge}; SameSite=Lax`;
  } else {
    document.cookie = `${CONSENT_RESTRICTED_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
  }
}

/** Kayıtlı tercihi siler, ana sayfa bloklarını beklemeye alır ve çerez penceresini yeniden açar. */
export function resetCookieConsent(): void {
  if (typeof window === "undefined") return;
  try {
    document.cookie = `${CONSENT_RESTRICTED_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
  } catch {
    /* ignore */
  }
  try {
    localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
    localStorage.removeItem(COOKIE_CONSENT_LEGACY_STORAGE_KEY);
  } catch {
    /* ignore */
  }
  /* Önce diyaloğu aç — diğer dinleyiciler (ana sayfa vb.) storage’ı zaten temiz görecek */
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_OPEN_EVENT));
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: null }));
}

export function readCookieConsentRaw(): string | null {
  if (typeof window === "undefined") return null;
  try {
    let raw = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!raw) {
      const legacy = localStorage.getItem(COOKIE_CONSENT_LEGACY_STORAGE_KEY);
      if (legacy) {
        localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, legacy);
        localStorage.removeItem(COOKIE_CONSENT_LEGACY_STORAGE_KEY);
        raw = legacy;
      }
    }
    const trimmed = raw?.trim();
    return trimmed || null;
  } catch {
    return null;
  }
}
