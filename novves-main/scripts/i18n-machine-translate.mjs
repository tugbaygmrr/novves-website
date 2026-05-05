/**
 * Büyük JSON çeviri dosyalarını harici bir çeviri API’si ile doldurmak için şablon.
 *
 * Ücretsiz genel uçlar çoğunlukla API anahtarı ister (ör. libretranslate.com).
 * Ortam değişkenleri örneği:
 *   LIBRETRANSLATE_URL=https://libretranslate.com
 *   LIBRETRANSLATE_API_KEY=...
 *
 * Kullanım (elle tamamlanmalı):
 *   node scripts/i18n-machine-translate.mjs --locale de --file home.json
 *
 * Üretimde yasal metinler için profesyonel revizyon şarttır.
 */
console.error(
  "Bu betik şablondur: LibreTranslate veya başka bir API ile leaf string çevrisini bağlayın.\n" +
    "Şimdilik `npm run i18n:debt` ile İngilizce kopya dosyaları listeleyin."
);
process.exit(0);
