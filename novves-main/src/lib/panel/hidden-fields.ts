/**
 * Sözlükte duran ama sitede artık render EDİLMEYEN (ölü) section alanları —
 * section editöründe gizlenir. Veri silinmez, yalnızca formda gösterilmez.
 */
export const HIDDEN_SECTION_FIELDS: Record<string, Record<string, string[]>> = {
  home: {
    // Hero scroll video'nun bitiş kartı sitede animation2.endCard'dan çizilir
    // (home-client.tsx: endCard={dict.animation2.endCard}). hero.endCard ölü veri.
    // heroLabel hiçbir bileşende render edilmiyor (sadece tip tanımı) — ölü.
    hero: ["endCard", "heroLabel"],
    // Video bölümünün başlangıç kartı hero'dan çizilir (startCard={dict.hero});
    // animation2.startCard ölü veri. Bu bölüm yalnızca endCard'ı (DRAGONFLY) düzenler.
    animation2: ["startCard"],
    // Şirket profili alt banner'ı sitede yalnızca bannerTitle + bannerLine1 çizer
    // (home-client.tsx). bannerLine2 hiç render edilmiyor — ölü; tek açıklama kalır.
    companyProfileSection: ["bannerLine2"],
  },
};

export function getHiddenFields(file: string, section: string): string[] {
  return HIDDEN_SECTION_FIELDS[file]?.[section] ?? [];
}
