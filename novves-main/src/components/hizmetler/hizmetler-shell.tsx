import { getDictionary, hasLocale } from "@/app/[locale]/dictionaries";
import { buildHizmetlerNavLabels } from "@/lib/hizmetler-nav";
import { HIZMETLER_MOBILE_CONTENT_PADDING_BOTTOM, HIZMETLER_PAGE_PADDING_TOP } from "@/lib/hizmetler/layout";
import { HizmetlerMobileNav } from "./hizmetler-mobile-nav";
import { HizmetlerSearchBar } from "./hizmetler-search-bar";
import { HizmetlerSidebar } from "./hizmetler-sidebar";

const searchUiByLocale: Record<string, { searchPlaceholder: string; noResults: string }> = {
  tr: { searchPlaceholder: "Hizmetlerde ara...", noResults: "Aramanızla eşleşen hizmet bulunamadı." },
  en: { searchPlaceholder: "Search services...", noResults: "No services match your search." },
  de: { searchPlaceholder: "Dienste suchen...", noResults: "Keine passenden Dienste gefunden." },
  fr: { searchPlaceholder: "Rechercher des services...", noResults: "Aucun service ne correspond à votre recherche." },
  es: { searchPlaceholder: "Buscar servicios...", noResults: "No se encontraron servicios para tu búsqueda." },
  it: { searchPlaceholder: "Cerca servizi...", noResults: "Nessun servizio corrisponde alla ricerca." },
  ru: { searchPlaceholder: "Поиск услуг...", noResults: "Услуги по вашему запросу не найдены." },
  ar: { searchPlaceholder: "ابحث في الخدمات...", noResults: "لا توجد خدمات تطابق بحثك." },
  az: { searchPlaceholder: "Xidmətlərdə axtar...", noResults: "Axtarışınıza uyğun xidmət tapılmadı." },
  kk: { searchPlaceholder: "Қызметтерден іздеу...", noResults: "Сұранысыңызға сәйкес қызмет табылмады." },
  tg: { searchPlaceholder: "Ҷустуҷӯ дар хизматҳо...", noResults: "Хизмате мувофиқи ҷустуҷӯи шумо ёфт нашуд." },
  zh: { searchPlaceholder: "搜索服务...", noResults: "未找到与搜索匹配的服务。" },
  ur: { searchPlaceholder: "خدمات میں تلاش کریں...", noResults: "آپ کی تلاش سے ملتی کوئی خدمت نہیں ملی۔" },
  lt: { searchPlaceholder: "Ieškoti paslaugų...", noResults: "Pagal paiešką paslaugų nerasta." },
  pl: { searchPlaceholder: "Szukaj usług...", noResults: "Brak usług pasujących do wyszukiwania." },
};

type Props = {
  locale: string;
  children: React.ReactNode;
};

export async function HizmetlerShell({ locale, children }: Props) {
  const dict = await getDictionary(hasLocale(locale) ? locale : "en");
  const links = dict.common.navbar.links as Record<string, string>;
  const searchUi = searchUiByLocale[locale] ?? searchUiByLocale.en;

  const navLabels = buildHizmetlerNavLabels(locale, links);
  const title = locale === "tr" ? "Hizmetler" : dict.common.navbar.services;
  const downloadSpecLabel = locale === "tr" ? "Şartname İndir" : "Download specification";

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />
      <div className={`overflow-x-clip bg-sand-200 ${HIZMETLER_PAGE_PADDING_TOP}`}>
        <HizmetlerMobileNav locale={locale} title={title} linkLabels={navLabels} downloadSpecLabel={downloadSpecLabel} />
        <div className="mx-auto flex min-h-[calc(100dvh-5rem)] w-full max-w-[1600px] sm:min-h-[calc(100dvh-6rem)] lg:min-h-[calc(100dvh-7rem)]">
          <HizmetlerSidebar locale={locale} title={title} linkLabels={navLabels} downloadSpecLabel={downloadSpecLabel} />
          <div className="flex min-w-0 flex-1 flex-col bg-sand-200">
            <HizmetlerSearchBar placeholder={searchUi.searchPlaceholder} noResults={searchUi.noResults} />
            <div
              id="hizmetler-main-content"
              className={`min-w-0 flex-1 overflow-x-hidden ${HIZMETLER_MOBILE_CONTENT_PADDING_BOTTOM}`}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
