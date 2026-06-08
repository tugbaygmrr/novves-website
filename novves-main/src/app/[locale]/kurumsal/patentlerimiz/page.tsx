import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "../../dictionaries";
import { MediaHtmlFrame } from "@/components/media-html-frame";
import { MediaCenterSidebar } from "@/components/media-center-sidebar";
import {
  mediaCenterHtmlMissingMessage,
  readMediaCenterHtml,
  readPatentsHtml,
} from "@/lib/media-center-html";
import { extractMediaSidebar } from "@/lib/media-center-nav";
import { withPageSeo } from "@/lib/seo/page-metadata";
import patentTrToLocalesAuto from "@/lib/patent-tr-to-locales.auto.json";

export const dynamic = "force-dynamic";

function extractMainInner(source: string): string {
  const open = source.indexOf("<main");
  if (open < 0) return "";
  const openEnd = source.indexOf(">", open);
  if (openEnd < 0) return "";
  const close = source.indexOf("</main>", openEnd);
  if (close < 0) return "";
  return source.slice(openEnd + 1, close);
}

function extractMainHeader(mainInner: string): string {
  const headerStart = mainInner.indexOf("<header");
  if (headerStart < 0) return "";
  const headerEnd = mainInner.indexOf("</header>", headerStart);
  if (headerEnd < 0) return "";
  return mainInner.slice(headerStart, headerEnd + "</header>".length);
}

function replaceMainInner(baseHtml: string, newMainInner: string): string {
  const open = baseHtml.indexOf("<main");
  if (open < 0) return baseHtml;
  const openEnd = baseHtml.indexOf(">", open);
  if (openEnd < 0) return baseHtml;
  const close = baseHtml.indexOf("</main>", openEnd);
  if (close < 0) return baseHtml;
  return `${baseHtml.slice(0, openEnd + 1)}${newMainInner}${baseHtml.slice(close)}`;
}

const patentUiByLocale: Record<string, { searchPlaceholder: string; noResults: string }> = {
  en: { searchPlaceholder: "Search patents...", noResults: "No patents match your search." },
  de: { searchPlaceholder: "In Patenten suchen...", noResults: "Keine passenden Patente gefunden." },
  fr: { searchPlaceholder: "Rechercher dans les brevets...", noResults: "Aucun brevet ne correspond a votre recherche." },
  es: { searchPlaceholder: "Buscar en patentes...", noResults: "No se encontraron patentes para tu busqueda." },
  it: { searchPlaceholder: "Cerca nei brevetti...", noResults: "Nessun brevetto corrisponde alla tua ricerca." },
  ru: { searchPlaceholder: "Поиск по патентам...", noResults: "Патенты по вашему запросу не найдены." },
  ar: { searchPlaceholder: "ابحث في براءات الاختراع...", noResults: "لا توجد براءات تطابق بحثك." },
  az: { searchPlaceholder: "Patentlərdə axtar...", noResults: "Axtarışınıza uyğun patent tapılmadı." },
  kk: { searchPlaceholder: "Патенттерден іздеу...", noResults: "Сұранысыңызға сәйкес патент табылмады." },
  tg: { searchPlaceholder: "Ҷустуҷӯ дар патентҳо...", noResults: "Патенте мувофиқи ҷустуҷӯи шумо ёфт нашуд." },
  zh: { searchPlaceholder: "搜索专利...", noResults: "未找到与搜索匹配的专利。" },
  ur: { searchPlaceholder: "پیٹنٹس میں تلاش کریں...", noResults: "آپ کی تلاش سے ملتا ہوا کوئی پیٹنٹ نہیں ملا۔" },
  lt: { searchPlaceholder: "Ieškoti patentuose...", noResults: "Pagal paiešką patentų nerasta." },
  pl: { searchPlaceholder: "Szukaj w patentach...", noResults: "Brak patentów pasujących do wyszukiwania." },
  tr: { searchPlaceholder: "Patentlerde ara...", noResults: "Aramanızla eşleşen patent bulunamadı." },
};

function applyReplacementMap(input: string, map: Record<string, string>): string {
  const entries = Object.entries(map).sort((a, b) => b[0].length - a[0].length);
  return entries.reduce((acc, [from, to]) => {
    let next = acc.replaceAll(from, to);
    if (from.includes("&")) next = next.replaceAll(from.replaceAll("&", "&amp;"), to);
    if (from.includes("&amp;")) next = next.replaceAll(from.replaceAll("&amp;", "&"), to);
    return next;
  }, input);
}

function localizePatentHtml(locale: string, html: string): string {
  if (locale === "tr") return html;
  const all = patentTrToLocalesAuto as Record<string, Record<string, string>>;
  const map = all[locale] ?? all.en ?? {};
  return applyReplacementMap(html, map);
}

const patentPageTitles: Record<string, string> = {
  tr: "Patentlerimiz | Novves",
  en: "Patents & Innovation | Novves",
  de: "Unsere Patente | Novves",
  fr: "Nos brevets | Novves",
  es: "Nuestras patentes | Novves",
  it: "I nostri brevetti | Novves",
  ru: "Наши патенты | Novves",
  ar: "براءات الاختراع لدينا | Novves",
  az: "Patentlərimiz | Novves",
  kk: "Біздің патенттер | Novves",
  tg: "Патентҳои мо | Novves",
  zh: "我们的专利 | Novves",
  ur: "ہمارے پیٹنٹ | Novves",
  lt: "Mūsų patentai | Novves",
  pl: "Nasze patenty | Novves",
};

const patentPageDescriptions: Record<string, string> = {
  tr: "NOVVES patentler ve inovasyon merkezi.",
  en: "NOVVES patents and innovation center.",
  de: "NOVVES Patent- und Innovationszentrum.",
  fr: "Centre brevets et innovation NOVVES.",
  es: "Centro de patentes e innovación de NOVVES.",
  it: "Centro brevetti e innovazione NOVVES.",
  ru: "Центр патентов и инноваций NOVVES.",
  ar: "مركز براءات الاختراع والابتكار في NOVVES.",
  az: "NOVVES patent və innovasiya mərkəzi.",
  kk: "NOVVES патенттер мен инновация орталығы.",
  tg: "Маркази патентҳо ва инноватсияи NOVVES.",
  zh: "NOVVES 专利与创新中心。",
  ur: "NOVVES پیٹنٹ اور اختراعی مرکز۔",
  lt: "NOVVES patentų ir inovacijų centras.",
  pl: "Centrum patentów i innowacji NOVVES.",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return withPageSeo({
    locale,
    pathAfterLocale: "kurumsal/patentlerimiz",
    title: patentPageTitles[locale] ?? patentPageTitles.en,
    description: patentPageDescriptions[locale] ?? patentPageDescriptions.en,
  });
}

export default async function PatentlerimizPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const patentUi = patentUiByLocale[locale] ?? patentUiByLocale.en;

  let mediaHtml = "";
  let patentHtml = "";
  try {
    mediaHtml = await readMediaCenterHtml();
  } catch {
    mediaHtml = mediaCenterHtmlMissingMessage("media");
  }
  try {
    patentHtml = await readPatentsHtml();
  } catch {
    patentHtml = "";
  }

  const mediaMainInner = extractMainInner(mediaHtml);
  const mediaTopHeader = extractMainHeader(mediaMainInner);
  const patentMainInner = extractMainInner(patentHtml);

  let html = mediaHtml;
  if (patentMainInner) {
    const patentMainWithoutOwnHeader = patentMainInner.replace(/<header[\s\S]*?<\/header>/i, "");
    html = replaceMainInner(mediaHtml, `${mediaTopHeader}${patentMainWithoutOwnHeader}`);
  }

  html = localizePatentHtml(locale, html);

  // Prevent duplicate top header with site's own navbar.
  html = html.replace(
    'class="fixed top-0 z-50 h-20 w-full bg-primary-container shadow-md flex justify-between items-center px-8 mx-auto max-w-full"',
    'class="hidden fixed top-0 z-50 h-20 w-full bg-primary-container shadow-md justify-between items-center px-8 mx-auto max-w-full"',
  );
  html = html.replace('class="flex pt-20"', 'class="flex pt-0"');
  html = html.replace('class="h-[calc(100vh-5rem)] w-80', 'class="h-screen w-80');
  html = html.replace('sticky top-20', 'sticky top-0');
  // Hard-fix patent blocks for mobile clipping by adjusting source classes.
  html = html.replace(
    'class="max-w-7xl mx-auto grid grid-cols-12 gap-12 mb-20"',
    'class="max-w-7xl mx-auto grid grid-cols-12 gap-6 lg:gap-12 mb-20"',
  );
  html = html.replace(
    'class="bg-surface-container-lowest rounded-lg p-10 flex flex-col md:flex-row gap-8 items-center relative"',
    'class="bg-surface-container-lowest rounded-lg p-6 sm:p-10 flex flex-col md:flex-row gap-5 sm:gap-8 items-center relative min-w-0"',
  );
  html = html.replace(
    'class="text-3xl font-black text-primary-container leading-tight mb-4"',
    'class="text-2xl sm:text-3xl font-black text-primary-container leading-tight mb-4 break-words"',
  );
  html = html.replace(
    'class="h-full bg-primary-container rounded-xl p-10 flex flex-col justify-between text-on-primary relative overflow-hidden"',
    'class="h-full bg-primary-container rounded-xl p-6 sm:p-10 flex flex-col justify-between text-on-primary relative overflow-hidden min-w-0"',
  );
  html = html.replace(
    'class="text-4xl font-black tracking-tight mb-2 uppercase"',
    'class="text-3xl sm:text-4xl font-black tracking-tight mb-2 uppercase break-words"',
  );
  html = html.replace(
    "</head>",
    `<style>
      /* Sol panel native React tarafına taşındı — iframe'in (masaüstü) sidebar'ını gizle. */
      aside.sticky { display: none !important; }
      #desktopPatentLink,
      #mobilePatentLink {
        background: #ffffff !important;
        color: #b45309 !important;
      }
      a#desktopPatentLink.text-secondary,
      a#mobilePatentLink.text-secondary,
      a#desktopPatentLink.bg-white,
      a#mobilePatentLink.bg-white {
        color: #b45309 !important;
      }
      #desktopPatentLink { transform: translateX(0.25rem); }
      #desktopPatentLink .material-symbols-outlined,
      #mobilePatentLink .material-symbols-outlined { color: #b45309 !important; }
      main > header.sticky {
        height: auto !important;
        min-height: 4.5rem !important;
        padding-top: 0.6rem !important;
        padding-bottom: 0.6rem !important;
        margin-bottom: 0.9rem !important;
      }
      main > section {
        padding-left: clamp(1rem, 2.2vw, 2.25rem) !important;
        padding-right: clamp(1rem, 2.2vw, 2.25rem) !important;
      }
      #mediaSearchInput {
        border-radius: 0.7rem !important;
        border: 1px solid rgba(25, 28, 30, 0.12) !important;
        background: #ffffff !important;
        color: #191c1e !important;
        padding: 0.72rem 0.95rem !important;
        font-size: 0.95rem !important;
        outline: none !important;
      }
      #mediaSearchInput::placeholder {
        color: rgba(25, 28, 30, 0.58) !important;
      }
      #mediaSearchInput:focus {
        border-color: #b45309 !important;
        box-shadow: 0 0 0 3px rgba(180, 83, 9, 0.16) !important;
      }
      #patentSearchEmpty {
        margin: 0.65rem 0 0;
        color: rgba(25, 28, 30, 0.62);
        font-size: 0.85rem;
      }
      main nav { display: none !important; }
      /* Gömülü HTML'in kendi sabit üst navbar'ını gizle — site navbar'ı ile çift görünmesin
         (sınıf string'i değişse bile çalışır). */
      .fixed.top-0.bg-primary-container { display: none !important; }
      .flex.pt-20 { padding-top: 0 !important; }
      @media (max-width: 1024px) {
        aside.sticky {
          display: none !important;
        }
        .flex.pt-0 > main {
          width: 100% !important;
        }
        main {
          padding: 1rem 0.9rem 1.5rem !important;
        }
        main > section {
          padding-left: 0.6rem !important;
          padding-right: 0.6rem !important;
        }
        main section [class*="max-w-7xl"] {
          max-width: 100% !important;
        }
      }
      @media (max-width: 768px) {
        main > header.sticky {
          min-height: 3.7rem !important;
          margin-bottom: 0.6rem !important;
          padding: 0.5rem 0.75rem !important;
        }
        #mediaSearchInput {
          font-size: 0.9rem !important;
          padding: 0.62rem 0.8rem !important;
        }
        main section h1 {
          font-size: clamp(1.9rem, 7.2vw, 2.6rem) !important;
          line-height: 1.1 !important;
        }
        main section [class*="grid-cols-12"] {
          gap: 0.9rem !important;
        }
        main section [class*="col-span-12"],
        main section [class*="lg:col-span-"] {
          min-width: 0 !important;
        }
        main,
        main section,
        main section > div {
          overflow-x: hidden !important;
        }
        /* Featured patent card: stack and reduce spacing on mobile */
        main section .bg-surface-container-low .bg-surface-container-lowest.rounded-lg.p-10 {
          padding: 0.95rem !important;
          gap: 0.9rem !important;
          flex-direction: column !important;
        }
        main section .bg-surface-container-low .bg-surface-container-lowest .w-full.md\\:w-1\\/2 {
          width: 100% !important;
          max-width: 100% !important;
        }
        main section .bg-surface-container-low .bg-surface-container-lowest h3 {
          font-size: clamp(1.35rem, 6vw, 1.85rem) !important;
          line-height: 1.2 !important;
          overflow-wrap: anywhere !important;
        }
        /* Patent journey card: prevent right cut-off text */
        main section .bg-primary-container.rounded-xl.p-10 {
          padding: 1rem !important;
        }
        main section .bg-primary-container.rounded-xl h4.text-4xl {
          font-size: clamp(1.95rem, 10vw, 2.55rem) !important;
          line-height: 1.08 !important;
          overflow-wrap: anywhere !important;
          word-break: break-word !important;
        }
      }
    </style></head>`,
  );
  html = html.replace(
    "</body>",
    `<script>
      window.addEventListener('load', () => {
        const passiveClass = "text-on-surface-variant px-4 py-3 flex items-center gap-3 hover:bg-white hover:text-secondary rounded-lg transition-all duration-150 hover:translate-x-1";
        const activeClass = "bg-white rounded-lg font-bold px-4 py-3 flex items-center gap-3 hover:translate-x-1 transition-transform duration-200";
        const menuLinks = Array.from(document.querySelectorAll('aside nav a, #mobileSidebar nav a'));
        menuLinks.forEach((link) => {
          if (!(link instanceof HTMLElement)) return;
          const isPatent = link.id === 'desktopPatentLink' || link.id === 'mobilePatentLink';
          link.className = isPatent ? activeClass : passiveClass;
          if (isPatent) {
            link.classList.remove("text-secondary");
            link.style.setProperty("color", "#b45309", "important");
            const icon = link.querySelector(".material-symbols-outlined");
            if (icon instanceof HTMLElement) icon.style.setProperty("color", "#b45309", "important");
          } else {
            link.style.removeProperty("color");
            const icon = link.querySelector(".material-symbols-outlined");
            if (icon instanceof HTMLElement) icon.style.removeProperty("color");
          }
        });
        // Patentlerimiz sayfasından Logo & Kimlik'e geçiş: Medya Merkezi route'una dön.
        const desktopLogoLink = menuLinks.find((link) => link instanceof HTMLElement && !!link.closest('aside nav'));
        const mobileLogoLink = menuLinks.find((link) => link instanceof HTMLElement && !!link.closest('#mobileSidebar nav'));
        [desktopLogoLink, mobileLogoLink].forEach((link) => {
          if (!(link instanceof HTMLAnchorElement)) return;
          link.setAttribute('href', '#');
          link.addEventListener('click', (e) => {
            e.preventDefault();
            window.parent?.postMessage({ type: 'navigate-media-center' }, '*');
          });
        });

        const main = document.querySelector('main');
        const topSearch = document.getElementById('mediaSearchInput');
        if (main && topSearch instanceof HTMLInputElement) {
          topSearch.placeholder = ${JSON.stringify(patentUi.searchPlaceholder)};
          const searchableSections = Array.from(main.querySelectorAll(':scope > section'));
          const emptyState = document.createElement('p');
          emptyState.id = 'patentSearchEmpty';
          emptyState.style.display = 'none';
          emptyState.textContent = ${JSON.stringify(patentUi.noResults)};
          const firstSection = searchableSections[0];
          if (firstSection) firstSection.insertAdjacentElement('afterend', emptyState);
          else main.appendChild(emptyState);

          topSearch.addEventListener('input', () => {
            const query = topSearch.value.trim().toLowerCase();
            let visibleCount = 0;
            searchableSections.forEach((section) => {
              if (!(section instanceof HTMLElement)) return;
              const matched = query.length === 0 || section.innerText.toLowerCase().includes(query);
              section.style.display = matched ? '' : 'none';
              if (matched) visibleCount += 1;
            });
            emptyState.style.display = visibleCount === 0 ? '' : 'none';
          });
        }

        const applyMobileFixes = () => {
          if (window.innerWidth > 768) return;

          // 1) "Ultra-Sessiz Vortex ..." featured card
          const vortexTitle = document.querySelector('.bg-surface-container-low .bg-surface-container-lowest h3');
          if (vortexTitle instanceof HTMLElement) {
            vortexTitle.style.setProperty('font-size', 'clamp(1.1rem, 5.8vw, 1.55rem)', 'important');
            vortexTitle.style.setProperty('line-height', '1.18', 'important');
            vortexTitle.style.setProperty('white-space', 'normal', 'important');
            vortexTitle.style.setProperty('overflow-wrap', 'anywhere', 'important');
            vortexTitle.style.setProperty('word-break', 'break-word', 'important');
            const featureCard = vortexTitle.closest('.bg-surface-container-lowest');
            if (featureCard instanceof HTMLElement) {
              featureCard.style.setProperty('padding', '0.9rem', 'important');
              featureCard.style.setProperty('gap', '0.8rem', 'important');
              featureCard.style.setProperty('overflow', 'hidden', 'important');
              featureCard.style.setProperty('max-width', '100%', 'important');
              featureCard.style.setProperty('box-sizing', 'border-box', 'important');
            }
            const halfCols = featureCard?.querySelectorAll('.w-full.md\\:w-1\\/2');
            halfCols?.forEach((el) => {
              if (el instanceof HTMLElement) {
                el.style.setProperty('width', '100%', 'important');
                el.style.setProperty('max-width', '100%', 'important');
                el.style.setProperty('min-width', '0', 'important');
              }
            });
          }

          // 2) "ÇOK YAKINDA" patent journey card
          const comingSoonTitle = document.querySelector('.bg-primary-container h4');
          if (comingSoonTitle instanceof HTMLElement) {
            comingSoonTitle.style.setProperty('font-size', 'clamp(1.35rem, 8.7vw, 2rem)', 'important');
            comingSoonTitle.style.setProperty('line-height', '1.05', 'important');
            comingSoonTitle.style.setProperty('white-space', 'normal', 'important');
            comingSoonTitle.style.setProperty('overflow-wrap', 'anywhere', 'important');
            comingSoonTitle.style.setProperty('word-break', 'break-word', 'important');
            const journeyCard = comingSoonTitle.closest('.bg-primary-container');
            if (journeyCard instanceof HTMLElement) {
              journeyCard.style.setProperty('padding', '0.9rem', 'important');
              journeyCard.style.setProperty('overflow', 'hidden', 'important');
              journeyCard.style.setProperty('max-width', '100%', 'important');
              journeyCard.style.setProperty('box-sizing', 'border-box', 'important');
            }
          }
        };
        applyMobileFixes();
        window.addEventListener('resize', applyMobileFixes, { passive: true });
      });
    </script></body>`,
  );

  const sidebar = extractMediaSidebar(html);

  return (
    <main className="pt-24">
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        rel="stylesheet"
      />
      <div className="flex w-full flex-col lg:grid lg:grid-cols-[18rem_minmax(0,1fr)] lg:items-stretch xl:grid-cols-[20rem_minmax(0,1fr)]">
        {sidebar ? (
          <MediaCenterSidebar
            locale={locale}
            title={sidebar.title}
            subtitle={sidebar.subtitle}
            mainItems={sidebar.mainItems}
            patentIcon={sidebar.patentIcon}
            patentLabel={sidebar.patentLabel}
            utilItems={sidebar.utilItems}
            activeMainIndex={null}
            patentActive
          />
        ) : null}
        <div className="min-w-0 flex-1">
          <MediaHtmlFrame html={html} />
        </div>
      </div>
    </main>
  );
}
