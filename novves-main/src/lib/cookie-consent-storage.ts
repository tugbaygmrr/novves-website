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

/** Kayıtlı tercihi siler, ana sayfa bloklarını beklemeye alır ve çerez penceresini yeniden açar. */
export function resetCookieConsent(): void {
  if (typeof window === "undefined") return;
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
    return raw;
  } catch {
    return null;
  }
}
