import type { Locale } from "@/i18n/config";
import type { PartnerRecord } from "./partner-directory-types";
import type { PartnerPin } from "./partner-world-map";

const HUB = {
  lat: 40.9801,
  lon: 29.0952,
  countryCode: "TR",
};

const HUB_CITY: Record<Locale, string> = {
  tr: "İstanbul",
  en: "Istanbul",
  ru: "Стамбул",
  ar: "إسطنبول",
  de: "Istanbul",
  it: "Istanbul",
  fr: "Istanbul",
  az: "İstanbul",
  kk: "Стамбул",
  tg: "Истанбул",
  es: "Estambul",
  zh: "伊斯坦布尔",
  ur: "استنبول",
  lt: "Stambulas",
  pl: "Stambuł",
  ro: "Stambul",
  hu: "Isztambul",
};

/** Partner id → harita koordinatı ve şehir etiketi */
const PARTNER_GEO: Record<
  string,
  { lat: number; lon: number; cities: Partial<Record<Locale, string>> & { en: string } }
> = {
  mmsc: {
    lat: 33.5651,
    lon: 73.0169,
    cities: { en: "Rawalpindi", tr: "Rawalpindi", ur: "راولپنڈی" },
  },
  kazema: {
    lat: 29.2672,
    lon: 48.0839,
    cities: { en: "Subhan, Kuwait", tr: "Subhan, Kuveyt", ar: "صبحان، الكويت" },
  },
  ventdelux: {
    lat: 51.128,
    lon: 71.43,
    cities: { en: "Astana", tr: "Astana", ru: "Астана", kk: "Астана" },
  },
  sanlygala: {
    lat: 37.9601,
    lon: 58.3261,
    cities: { en: "Ashgabat", tr: "Aşgabat", ru: "Ашхабад" },
  },
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
    /* locale data missing */
  }
  return code;
}

function partnerCity(partnerId: string, viewerLocale: Locale): string | undefined {
  const geo = PARTNER_GEO[partnerId];
  if (!geo) return undefined;
  return geo.cities[viewerLocale] ?? geo.cities.en;
}

/** İstanbul hub + gerçek partner konumları */
export function buildPartnerGlobePins(partners: PartnerRecord[], viewerLocale: Locale): PartnerPin[] {
  const pins: PartnerPin[] = [
    {
      partnerId: "novves-hub",
      name: getCountryName(viewerLocale, HUB.countryCode),
      location: HUB_CITY[viewerLocale] ?? HUB_CITY.en,
      lat: HUB.lat,
      lon: HUB.lon,
      isHub: true,
    },
  ];

  for (const partner of partners) {
    const geo = PARTNER_GEO[partner.id];
    if (!geo) continue;
    pins.push({
      partnerId: partner.id,
      name: partner.name,
      location: partnerCity(partner.id, viewerLocale) ?? partner.country,
      lat: geo.lat,
      lon: geo.lon,
    });
  }

  return pins;
}

export function getGlobeControlsCopy(viewerLocale: Locale) {
  return CONTROLS_BY_LOCALE[viewerLocale] ?? CONTROLS_BY_LOCALE.en;
}
