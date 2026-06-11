import type { Locale } from "@/i18n/config";
import type { PartnerPin } from "./partner-world-map";

/**
 * Globe pin'leri için sabit jeografi: id (= site dil kodu), koordinatlar, hub bayrağı.
 * Etiketler (ülke adı + şehir) viewer locale'a göre runtime'da seçilir.
 */
const PIN_GEO: Array<{ id: Locale; lat: number; lon: number; isHub?: boolean }> = [
  { id: "tr", lat: 41.01, lon: 28.98, isHub: true },
  { id: "en", lat: 51.51, lon: -0.13 },
  { id: "ru", lat: 55.75, lon: 37.62 },
  { id: "ar", lat: 24.71, lon: 46.68 },
  { id: "de", lat: 52.52, lon: 13.40 },
  { id: "it", lat: 41.90, lon: 12.50 },
  { id: "fr", lat: 48.85, lon: 2.35 },
  { id: "az", lat: 40.41, lon: 49.87 },
  { id: "kk", lat: 51.16, lon: 71.43 },
  { id: "tg", lat: 38.56, lon: 68.79 },
  { id: "es", lat: 40.42, lon: -3.70 },
  { id: "zh", lat: 39.90, lon: 116.41 },
  { id: "ur", lat: 33.69, lon: 73.05 },
  { id: "lt", lat: 54.69, lon: 25.28 },
  { id: "pl", lat: 52.23, lon: 21.01 },
  { id: "ro", lat: 44.43, lon: 26.10 },
  { id: "hu", lat: 47.50, lon: 19.04 },
];

/** Pin id (= site locale) → ISO 3166-1 alpha-2 ülke kodu (Intl.DisplayNames için) */
const PIN_TO_COUNTRY_CODE: Record<Locale, string> = {
  tr: "TR",
  en: "GB",
  ru: "RU",
  ar: "SA",
  de: "DE",
  it: "IT",
  fr: "FR",
  az: "AZ",
  kk: "KZ",
  tg: "TJ",
  es: "ES",
  zh: "CN",
  ur: "PK",
  lt: "LT",
  pl: "PL",
  ro: "RO",
  hu: "HU",
};

/**
 * Şehir adları her bir viewer locale için ayrı.
 * Eksik bir kombinasyon olursa en fallback olarak kullanılır.
 */
const CITY_BY_LOCALE: Record<Locale, Record<Locale, string>> = {
  tr: { tr: "İstanbul", en: "Londra", ru: "Moskova", ar: "Riyad", de: "Berlin", it: "Roma", fr: "Paris", az: "Bakü", kk: "Astana", tg: "Duşanbe", es: "Madrid", zh: "Pekin", ur: "İslamabad", lt: "Vilnius", pl: "Varşova", ro: "Bükreş", hu: "Budapeşte" },
  en: { tr: "Istanbul", en: "London", ru: "Moscow", ar: "Riyadh", de: "Berlin", it: "Rome", fr: "Paris", az: "Baku", kk: "Astana", tg: "Dushanbe", es: "Madrid", zh: "Beijing", ur: "Islamabad", lt: "Vilnius", pl: "Warsaw", ro: "Bucharest", hu: "Budapest" },
  ru: { tr: "Стамбул", en: "Лондон", ru: "Москва", ar: "Эр-Рияд", de: "Берлин", it: "Рим", fr: "Париж", az: "Баку", kk: "Астана", tg: "Душанбе", es: "Мадрид", zh: "Пекин", ur: "Исламабад", lt: "Вильнюс", pl: "Варшава", ro: "Бухарест", hu: "Будапешт" },
  ar: { tr: "إسطنبول", en: "لندن", ru: "موسكو", ar: "الرياض", de: "برلين", it: "روما", fr: "باريس", az: "باكو", kk: "أستانا", tg: "دوشنبه", es: "مدريد", zh: "بكين", ur: "إسلام آباد", lt: "فيلنيوس", pl: "وارسو", ro: "بوخارست", hu: "بودابست" },
  de: { tr: "Istanbul", en: "London", ru: "Moskau", ar: "Riad", de: "Berlin", it: "Rom", fr: "Paris", az: "Baku", kk: "Astana", tg: "Duschanbe", es: "Madrid", zh: "Peking", ur: "Islamabad", lt: "Wilna", pl: "Warschau", ro: "Bukarest", hu: "Budapest" },
  it: { tr: "Istanbul", en: "Londra", ru: "Mosca", ar: "Riad", de: "Berlino", it: "Roma", fr: "Parigi", az: "Baku", kk: "Astana", tg: "Dushanbe", es: "Madrid", zh: "Pechino", ur: "Islamabad", lt: "Vilnius", pl: "Varsavia", ro: "Bucarest", hu: "Budapest" },
  fr: { tr: "Istanbul", en: "Londres", ru: "Moscou", ar: "Riyad", de: "Berlin", it: "Rome", fr: "Paris", az: "Bakou", kk: "Astana", tg: "Douchanbé", es: "Madrid", zh: "Pékin", ur: "Islamabad", lt: "Vilnius", pl: "Varsovie", ro: "Bucarest", hu: "Budapest" },
  az: { tr: "İstanbul", en: "London", ru: "Moskva", ar: "Ər-Riyad", de: "Berlin", it: "Roma", fr: "Paris", az: "Bakı", kk: "Astana", tg: "Düşənbə", es: "Madrid", zh: "Pekin", ur: "İslamabad", lt: "Vilnüs", pl: "Varşava", ro: "Buxarest", hu: "Budapeşt" },
  kk: { tr: "Стамбул", en: "Лондон", ru: "Мәскеу", ar: "Эр-Рияд", de: "Берлин", it: "Рим", fr: "Париж", az: "Баку", kk: "Астана", tg: "Душанбе", es: "Мадрид", zh: "Пекин", ur: "Исламабад", lt: "Вильнюс", pl: "Варшава", ro: "Бухарест", hu: "Будапешт" },
  tg: { tr: "Истанбул", en: "Лондон", ru: "Маскав", ar: "Риёз", de: "Берлин", it: "Рим", fr: "Париж", az: "Боку", kk: "Остона", tg: "Душанбе", es: "Мадрид", zh: "Пекин", ur: "Исломобод", lt: "Вилнюс", pl: "Варшава", ro: "Бухарест", hu: "Будапешт" },
  es: { tr: "Estambul", en: "Londres", ru: "Moscú", ar: "Riad", de: "Berlín", it: "Roma", fr: "París", az: "Bakú", kk: "Astaná", tg: "Dusambé", es: "Madrid", zh: "Pekín", ur: "Islamabad", lt: "Vilna", pl: "Varsovia", ro: "Bucarest", hu: "Budapest" },
  zh: { tr: "伊斯坦布尔", en: "伦敦", ru: "莫斯科", ar: "利雅得", de: "柏林", it: "罗马", fr: "巴黎", az: "巴库", kk: "阿斯塔纳", tg: "杜尚别", es: "马德里", zh: "北京", ur: "伊斯兰堡", lt: "维尔纽斯", pl: "华沙", ro: "布加勒斯特", hu: "布达佩斯" },
  ur: { tr: "استنبول", en: "لندن", ru: "ماسکو", ar: "ریاض", de: "برلن", it: "روم", fr: "پیرس", az: "باکو", kk: "آستانہ", tg: "دوشنبے", es: "میڈرڈ", zh: "بیجنگ", ur: "اسلام آباد", lt: "ولنیئس", pl: "وارسا", ro: "بخارسٹ", hu: "بوداپسٹ" },
  lt: { tr: "Stambulas", en: "Londonas", ru: "Maskva", ar: "Rijadas", de: "Berlynas", it: "Roma", fr: "Paryžius", az: "Baku", kk: "Astana", tg: "Dušanbė", es: "Madridas", zh: "Pekinas", ur: "Islamabadas", lt: "Vilnius", pl: "Varšuva", ro: "Bukareštas", hu: "Budapeštas" },
  pl: { tr: "Stambuł", en: "Londyn", ru: "Moskwa", ar: "Rijad", de: "Berlin", it: "Rzym", fr: "Paryż", az: "Baku", kk: "Astana", tg: "Duszanbe", es: "Madryt", zh: "Pekin", ur: "Islamabad", lt: "Wilno", pl: "Warszawa", ro: "Bukareszt", hu: "Budapeszt" },
  ro: { tr: "Stambul", en: "Londra", ru: "Moscova", ar: "Riad", de: "Berlin", it: "Roma", fr: "Paris", az: "Baku", kk: "Astana", tg: "Dușanbe", es: "Madrid", zh: "Beijing", ur: "Islamabad", lt: "Vilnius", pl: "Varșovia", ro: "București", hu: "Budapesta" },
  hu: { tr: "Isztambul", en: "London", ru: "Moszkva", ar: "Rijád", de: "Berlin", it: "Róma", fr: "Párizs", az: "Baku", kk: "Asztana", tg: "Dusanbe", es: "Madrid", zh: "Peking", ur: "Iszlámábád", lt: "Vilnius", pl: "Varsó", ro: "Bukarest", hu: "Budapest" },
};

/** Globe etkileşim metinleri — her dil için */
const CONTROLS_BY_LOCALE: Record<
  Locale,
  { hint: string; zoomIn: string; zoomOut: string; reset: string }
> = {
  tr: { hint: "sürükle • kaydır ile yakınlaştır", zoomIn: "Yakınlaştır", zoomOut: "Uzaklaştır", reset: "Görünümü sıfırla" },
  en: { hint: "drag • scroll to zoom", zoomIn: "Zoom in", zoomOut: "Zoom out", reset: "Reset view" },
  ru: { hint: "перетащите • прокрутите для масштаба", zoomIn: "Приблизить", zoomOut: "Отдалить", reset: "Сбросить вид" },
  ar: { hint: "اسحب • مرّر للتكبير", zoomIn: "تكبير", zoomOut: "تصغير", reset: "إعادة الضبط" },
  de: { hint: "ziehen • scrollen zum Zoomen", zoomIn: "Vergrößern", zoomOut: "Verkleinern", reset: "Ansicht zurücksetzen" },
  it: { hint: "trascina • scorri per ingrandire", zoomIn: "Ingrandisci", zoomOut: "Rimpicciolisci", reset: "Reimposta vista" },
  fr: { hint: "glisser • molette pour zoomer", zoomIn: "Zoom avant", zoomOut: "Zoom arrière", reset: "Réinitialiser la vue" },
  az: { hint: "sürükləyin • zoom üçün sürüşdürün", zoomIn: "Yaxınlaşdır", zoomOut: "Uzaqlaşdır", reset: "Görünüşü sıfırla" },
  kk: { hint: "сүйреңіз • масштабтау үшін айналдырыңыз", zoomIn: "Жақындату", zoomOut: "Алыстату", reset: "Көріністі қалпына келтіру" },
  tg: { hint: "кашед • барои зум давр занонед", zoomIn: "Наздик кардан", zoomOut: "Дур кардан", reset: "Намоишро аз нав оғоз кардан" },
  es: { hint: "arrastra • desplaza para hacer zoom", zoomIn: "Acercar", zoomOut: "Alejar", reset: "Restablecer vista" },
  zh: { hint: "拖动 • 滚动缩放", zoomIn: "放大", zoomOut: "缩小", reset: "重置视图" },
  ur: { hint: "کھینچیں • زوم کے لیے سکرول کریں", zoomIn: "زوم اِن", zoomOut: "زوم آؤٹ", reset: "منظر دوبارہ ترتیب دیں" },
  lt: { hint: "vilkti • slinkti, kad pritrauktum", zoomIn: "Pritraukti", zoomOut: "Atitolinti", reset: "Atstatyti vaizdą" },
  pl: { hint: "przeciągnij • przewijaj, aby przybliżyć", zoomIn: "Przybliż", zoomOut: "Oddal", reset: "Zresetuj widok" },
  ro: { hint: "trage • derulează pentru a mări", zoomIn: "Mărește", zoomOut: "Micșorează", reset: "Resetează vizualizarea" },
  hu: { hint: "húzd • görgetéssel nagyíts", zoomIn: "Nagyítás", zoomOut: "Kicsinyítés", reset: "Nézet visszaállítása" },
};

function getCountryName(viewerLocale: Locale, code: string): string {
  try {
    const display = new Intl.DisplayNames([viewerLocale, "en"], { type: "region" });
    const result = display.of(code);
    if (result && result !== code) return result;
  } catch {
    /* locale data missing — fall through */
  }
  return code;
}

export function getLocalizedPartnerPins(viewerLocale: Locale): PartnerPin[] {
  const cities = CITY_BY_LOCALE[viewerLocale] ?? CITY_BY_LOCALE.en;
  return PIN_GEO.map((g) => ({
    name: getCountryName(viewerLocale, PIN_TO_COUNTRY_CODE[g.id]),
    location: cities[g.id] ?? CITY_BY_LOCALE.en[g.id],
    lat: g.lat,
    lon: g.lon,
    isHub: g.isHub,
  }));
}

export function getGlobeControlsCopy(viewerLocale: Locale) {
  return CONTROLS_BY_LOCALE[viewerLocale] ?? CONTROLS_BY_LOCALE.en;
}
