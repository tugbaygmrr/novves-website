import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "../../dictionaries";
import { MediaHtmlFrame } from "@/components/media-html-frame";
import { MediaCenterSidebar } from "@/components/media-center-sidebar";
import { mediaCenterHtmlMissingMessage, readMediaCenterHtml } from "@/lib/media-center-html";
import { withPageSeo } from "@/lib/seo/page-metadata";
import patentTrToLocalesAuto from "@/lib/patent-tr-to-locales.auto.json";

export const dynamic = "force-dynamic";

const mediaCenterTitles: Record<string, string> = {
  tr: "Medya Merkezi | Novves",
  en: "Media Center | Novves",
  ru: "Медиа-центр | Novves",
  ar: "مركز الوسائط | Novves",
  de: "Medienzentrum | Novves",
  it: "Centro Media | Novves",
  fr: "Centre Média | Novves",
  az: "Media Mərkəzi | Novves",
  kk: "Медиа орталығы | Novves",
  tg: "Маркази медиа | Novves",
  es: "Centro de Medios | Novves",
  zh: "媒体中心 | Novves",
  ur: "میڈیا سینٹر | Novves",
  lt: "Medijos Centras | Novves",
  pl: "Centrum Mediów | Novves",
};

const mediaCenterDescriptions: Record<string, string> = {
  tr: "NOVVES medya merkezi: logolar, kurumsal varlıklar, teknik kataloglar ve video arşivi.",
  en: "NOVVES media center: logos, corporate assets, technical catalogs, and video archive.",
  ru: "Медиа-центр NOVVES: логотипы, корпоративные материалы, технические каталоги и видеоархив.",
  ar: "مركز وسائط NOVVES: الشعارات والمواد المؤسسية والكتالوجات الفنية وأرشيف الفيديو.",
  de: "NOVVES Medienzentrum: Logos, Corporate-Assets, technische Kataloge und Videoarchiv.",
  it: "Centro Media NOVVES: loghi, risorse corporate, cataloghi tecnici e archivio video.",
  fr: "Centre Média NOVVES : logos, ressources corporate, catalogues techniques et vidéothèque.",
  az: "NOVVES media mərkəzi: loqolar, korporativ materiallar, texniki kataloqlar və video arxivi.",
  kk: "NOVVES медиа орталығы: логотиптер, корпоративтік материалдар, техникалық каталогтар және бейне мұрағат.",
  tg: "Маркази медиаи NOVVES: логоҳо, маводи корпоративӣ, каталогҳои техникӣ ва бойгонии видео.",
  es: "Centro de Medios NOVVES: logotipos, recursos corporativos, catálogos técnicos y archivo de video.",
  zh: "NOVVES 媒体中心：标志、企业素材、技术目录与视频档案。",
  ur: "NOVVES میڈیا سینٹر: لوگوز، کارپوریٹ اثاثے، تکنیکی کیٹلاگ اور ویڈیو آرکائیو۔",
  lt: "NOVVES medijos centras: logotipai, įmonės medžiaga, techniniai katalogai ir vaizdo archyvas.",
  pl: "Centrum Mediów NOVVES: logotypy, materiały firmowe, katalogi techniczne i archiwum wideo.",
};

const mediaTextByLocale: Record<string, Record<string, string>> = {
  en: {
    "Medya Merkezi": "Media Center",
    "Teknik Arşiv v2.4": "Technical Archive v2.4",
    "Logo &amp; Kimlik": "Logo & Identity",
    "Kurumsal Görseller": "Company Images",
    "Ürün Görselleri": "Product Images",
    "Videolar": "Videos",
    "YouTube İçerikleri": "YouTube Assets",
    "Kurumsal Sesler": "Corporate Sounds",
    "Basın Bültenleri": "Press Releases",
    "Teknik Kataloglar": "Technical Catalogs",
    "Varlık Yükle": "Upload Asset",
    "Ayarlar": "Settings",
    "Destek": "Support",
    "Medya varlıklarında ara...": "Search media assets...",
    "Marka Kitini İndir": "Download Brand Kit",
    "Varlıkları Keşfet": "Explore Assets",
    "Ürün Galerisi": "Product Gallery",
    "Video Arşivi": "Video Archive",
    "Renk Paleti": "Color Palette",
    "Birincil Logo (Koyu)": "Primary Logo (Dark)",
    "Koyu zeminler için beyaz tipografi.": "White typography for dark backgrounds.",
    "Tümünü İndir": "Download All",
    "Kullanım Rehberi": "Usage Guide",
    "Kurumsal Film": "Corporate Film",
    "Ürün Görseli": "Product Visual",
    "Fabrika": "Factory",
    "Ürünler": "Products",
    "Havanın Gücünü Tasarlamak": "Designing the Power of Air",
    "Series-X Jet Fan Detayı": "Series-X Jet Fan Detail",
    "Ar-Ge Merkezi Kontrol Odası": "R&D Center Control Room",
    "Saha Uygulamaları": "Field Applications",
    "Medya İletişimi": "Media Contact",
    "Kurumsal Ses Kimliği": "Corporate Sound Identity",
    "Video &amp; Görsel Kütüphanesi": "Video & Visual Library",
    "Video & Görsel Kütüphanesi": "Video & Visual Library",
    "Logo &amp; Kurumsal <span class=\"text-secondary\">Kimlik</span>":
      "Logo &amp; Corporate <span class=\"text-secondary\">Identity</span>",
    "Logo & Kurumsal Kimlik": "Logo & Corporate Identity",
    "NOVVES işitsel kimliğini keşfedin. Akışın mühendislikteki ses karşılığı.":
      "Discover NOVVES sonic identity. The sound equivalent of flow in engineering.",
    "Logo kullanımı, tipografi hiyerarşisi ve marka tonlaması hakkında detaylı kuralları içeren PDF dökümanı.":
      "PDF document containing detailed rules about logo usage, typography hierarchy, and brand tonality.",
    "Yasal Uyarı": "Legal Notice",
    "Gizlilik Politikası": "Privacy Policy",
    "Kullanım Koşulları": "Terms of Use",
    "Endüstriyel fanlar, jet fanlar ve chiller ünitelerinin yüksek çözünürlüklü teknik fotoğrafları.":
      "High-resolution technical photos of industrial fans, jet fans, and chiller units.",
    "YouTube içerikleri ve kurumsal tanıtım filmleri.":
      "YouTube content and corporate promotional films.",
    'NOVVES "Born to Flow" ses kimliği ve jingle kütüphanesi.':
      'NOVVES "Born to Flow" sonic identity and jingle library.',
    "2024 Güncel ürün spesifikasyonları ve teknik dökümanlar.":
      "Up-to-date 2024 product specifications and technical documents.",
    "Özel röportaj veya yüksek çözünürlüklü basılı materyaller için ekibimizle iletişime geçin.":
      "Contact our team for exclusive interviews or high-resolution print materials.",
    "Logolar, teknik görseller, kurumsal videolar ve ses dosyaları dahil olmak üzere tüm marka materyallerine erişin. Mühendislik otoritesi ve modern medya vizyonumuzun dijital arşivi.":
      "Access all brand materials including logos, technical visuals, corporate videos, and audio assets. A digital archive of engineering authority and modern media vision.",
  },
  de: {
    "Medya Merkezi": "Medienzentrum",
    "Teknik Arşiv v2.4": "Technisches Archiv v2.4",
    "Logo &amp; Kimlik": "Logo & Identität",
    "Kurumsal Görseller": "Unternehmensbilder",
    "Ürün Görselleri": "Produktbilder",
    "Videolar": "Videos",
    "YouTube İçerikleri": "YouTube-Inhalte",
    "Kurumsal Sesler": "Corporate-Sounds",
    "Basın Bültenleri": "Pressemitteilungen",
    "Teknik Kataloglar": "Technische Kataloge",
    "Varlık Yükle": "Datei hochladen",
    "Ayarlar": "Einstellungen",
    "Destek": "Support",
    "Medya varlıklarında ara...": "In Medienressourcen suchen...",
    "Marka Kitini İndir": "Markenpaket herunterladen",
    "Varlıkları Keşfet": "Ressourcen entdecken",
    "Ürün Galerisi": "Produktgalerie",
    "Video Arşivi": "Videoarchiv",
    "Renk Paleti": "Farbpalette",
    "Birincil Logo (Koyu)": "Primärlogo (Dunkel)",
    "Koyu zeminler için beyaz tipografi.": "Weiße Typografie für dunkle Hintergründe.",
    "Tümünü İndir": "Alles herunterladen",
    "Kullanım Rehberi": "Verwendungsleitfaden",
    "Kurumsal Film": "Unternehmensfilm",
    "Ürün Görseli": "Produktbild",
    "Fabrika": "Fabrik",
    "Saha Uygulamaları": "Praxisanwendungen",
    "Medya İletişimi": "Medienkontakt",
    "Yasal Uyarı": "Rechtlicher Hinweis",
    "Gizlilik Politikası": "Datenschutzrichtlinie",
    "Kullanım Koşulları": "Nutzungsbedingungen",
    "Havanın Gücünü Tasarlamak": "Die Kraft der Luft gestalten",
    "Series-X Jet Fan Detayı": "Series-X Jet Fan Detail",
    "Ar-Ge Merkezi Kontrol Odası": "Kontrollraum des F&E-Zentrums",
    "Kurumsal Ses Kimliği": "Corporate Sound Identity",
    "Video & Görsel Kütüphanesi": "Video- & Bildbibliothek",
    "NOVVES işitsel kimliğini keşfedin. Akışın mühendislikteki ses karşılığı.":
      "Entdecken Sie die akustische Identität von NOVVES. Das klangliche Gegenstück des Flusses in der Technik.",
    "Logo kullanımı, tipografi hiyerarşisi ve marka tonlaması hakkında detaylı kuralları içeren PDF dökümanı.":
      "PDF-Dokument mit detaillierten Regeln zur Logo-Nutzung, Typografie-Hierarchie und Markentonality.",
    "Endüstriyel fanlar, jet fanlar ve chiller ünitelerinin yüksek çözünürlüklü teknik fotoğrafları.":
      "Hochauflösende technische Fotos von Industriefans, Jet-Fans und Chiller-Einheiten.",
    "YouTube içerikleri ve kurumsal tanıtım filmleri.":
      "YouTube-Inhalte und Unternehmenspräsentationsfilme.",
    'NOVVES "Born to Flow" ses kimliği ve jingle kütüphanesi.':
      'NOVVES "Born to Flow" Sound-Identität und Jingle-Bibliothek.',
    "2024 Güncel ürün spesifikasyonları ve teknik dökümanlar.":
      "Aktuelle Produktspezifikationen und technische Dokumente 2024.",
    "Özel röportaj veya yüksek çözünürlüklü basılı materyaller için ekibimizle iletişime geçin.":
      "Kontaktieren Sie unser Team für exklusive Interviews oder hochauflösende Druckmaterialien.",
    "Logolar, teknik görseller, kurumsal videolar ve ses dosyaları dahil olmak üzere tüm marka materyallerine erişin. Mühendislik otoritesi ve modern medya vizyonumuzun dijital arşivi.":
      "Greifen Sie auf alle Markenmaterialien zu, einschließlich Logos, technischer Visuals, Unternehmensvideos und Audiodateien. Ein digitales Archiv unserer Engineering-Kompetenz und modernen Medienvision.",
  },
  fr: {
    "Medya Merkezi": "Centre Média",
    "Teknik Arşiv v2.4": "Archive Technique v2.4",
    "Logo &amp; Kimlik": "Logo & Identité",
    "Kurumsal Görseller": "Visuels Corporate",
    "Ürün Görselleri": "Visuels Produits",
    "Videolar": "Vidéos",
    "YouTube İçerikleri": "Contenus YouTube",
    "Kurumsal Sesler": "Sons Corporate",
    "Basın Bültenleri": "Communiqués de presse",
    "Teknik Kataloglar": "Catalogues techniques",
    "Varlık Yükle": "Téléverser une ressource",
    "Ayarlar": "Paramètres",
    "Destek": "Support",
    "Medya varlıklarında ara...": "Rechercher dans les ressources média...",
    "Marka Kitini İndir": "Télécharger le kit de marque",
    "Varlıkları Keşfet": "Explorer les ressources",
    "Ürün Galerisi": "Galerie Produits",
    "Video Arşivi": "Archive Vidéo",
    "Renk Paleti": "Palette de couleurs",
    "Birincil Logo (Koyu)": "Logo principal (sombre)",
    "Koyu zeminler için beyaz tipografi.": "Typographie blanche pour fond sombre.",
    "Tümünü İndir": "Télécharger tout",
    "Kullanım Rehberi": "Guide d'utilisation",
    "Kurumsal Film": "Film institutionnel",
    "Ürün Görseli": "Visuel produit",
    "Fabrika": "Usine",
    "Saha Uygulamaları": "Applications terrain",
    "Medya İletişimi": "Contact média",
    "Yasal Uyarı": "Mentions légales",
    "Gizlilik Politikası": "Politique de confidentialité",
    "Kullanım Koşulları": "Conditions d'utilisation",
    "Havanın Gücünü Tasarlamak": "Concevoir la puissance de l'air",
    "Series-X Jet Fan Detayı": "Détail du jet fan Series-X",
    "Ar-Ge Merkezi Kontrol Odası": "Salle de contrôle du centre R&D",
    "Kurumsal Ses Kimliği": "Identité sonore corporate",
    "Video & Görsel Kütüphanesi": "Bibliothèque vidéo & visuelle",
    "NOVVES işitsel kimliğini keşfedin. Akışın mühendislikteki ses karşılığı.":
      "Découvrez l'identité sonore de NOVVES. L'équivalent sonore du flux en ingénierie.",
    "Logo kullanımı, tipografi hiyerarşisi ve marka tonlaması hakkında detaylı kuralları içeren PDF dökümanı.":
      "Document PDF contenant des règles détaillées sur l'usage du logo, la hiérarchie typographique et la tonalité de marque.",
    "Endüstriyel fanlar, jet fanlar ve chiller ünitelerinin yüksek çözünürlüklü teknik fotoğrafları.":
      "Photos techniques haute résolution de ventilateurs industriels, jet fans et groupes chiller.",
    "YouTube içerikleri ve kurumsal tanıtım filmleri.":
      "Contenus YouTube et films de présentation corporate.",
    'NOVVES "Born to Flow" ses kimliği ve jingle kütüphanesi.':
      'Identité sonore NOVVES "Born to Flow" et bibliothèque de jingles.',
    "2024 Güncel ürün spesifikasyonları ve teknik dökümanlar.":
      "Spécifications produits 2024 et documents techniques à jour.",
    "Özel röportaj veya yüksek çözünürlüklü basılı materyaller için ekibimizle iletişime geçin.":
      "Contactez notre équipe pour des interviews exclusives ou des supports imprimés haute résolution.",
    "Logolar, teknik görseller, kurumsal videolar ve ses dosyaları dahil olmak üzere tüm marka materyallerine erişin. Mühendislik otoritesi ve modern medya vizyonumuzun dijital arşivi.":
      "Accédez à tous les supports de marque, y compris logos, visuels techniques, vidéos corporate et fichiers audio. Une archive numérique de notre autorité d'ingénierie et de notre vision média moderne.",
  },
  es: {
    "Medya Merkezi": "Centro de Medios",
    "Teknik Arşiv v2.4": "Archivo Técnico v2.4",
    "Logo &amp; Kimlik": "Logo e Identidad",
    "Kurumsal Görseller": "Imágenes Corporativas",
    "Ürün Görselleri": "Imágenes de Producto",
    "Videolar": "Videos",
    "YouTube İçerikleri": "Recursos de YouTube",
    "Kurumsal Sesler": "Sonidos Corporativos",
    "Basın Bültenleri": "Notas de Prensa",
    "Teknik Kataloglar": "Catálogos Técnicos",
    "Varlık Yükle": "Subir recurso",
    "Ayarlar": "Ajustes",
    "Destek": "Soporte",
    "Medya varlıklarında ara...": "Buscar en recursos multimedia...",
    "Marka Kitini İndir": "Descargar kit de marca",
    "Varlıkları Keşfet": "Explorar recursos",
    "Ürün Galerisi": "Galería de Productos",
    "Video Arşivi": "Archivo de Video",
    "Renk Paleti": "Paleta de colores",
    "Birincil Logo (Koyu)": "Logo principal (oscuro)",
    "Koyu zeminler için beyaz tipografi.": "Tipografía blanca para fondos oscuros.",
    "Tümünü İndir": "Descargar todo",
    "Kullanım Rehberi": "Guía de uso",
    "Kurumsal Film": "Película corporativa",
    "Ürün Görseli": "Visual de producto",
    "Fabrika": "Fábrica",
    "Saha Uygulamaları": "Aplicaciones de campo",
    "Medya İletişimi": "Contacto de medios",
    "Yasal Uyarı": "Aviso legal",
    "Gizlilik Politikası": "Política de privacidad",
    "Kullanım Koşulları": "Términos de uso",
    "Havanın Gücünü Tasarlamak": "Diseñando el poder del aire",
    "Series-X Jet Fan Detayı": "Detalle del jet fan Series-X",
    "Ar-Ge Merkezi Kontrol Odası": "Sala de control del centro I+D",
    "Kurumsal Ses Kimliği": "Identidad sonora corporativa",
    "Video & Görsel Kütüphanesi": "Biblioteca de video e imágenes",
    "NOVVES işitsel kimliğini keşfedin. Akışın mühendislikteki ses karşılığı.":
      "Descubre la identidad sonora de NOVVES. El equivalente sonoro del flujo en ingeniería.",
    "Logo kullanımı, tipografi hiyerarşisi ve marka tonlaması hakkında detaylı kuralları içeren PDF dökümanı.":
      "Documento PDF con reglas detalladas sobre uso de logotipo, jerarquía tipográfica y tono de marca.",
    "Endüstriyel fanlar, jet fanlar ve chiller ünitelerinin yüksek çözünürlüklü teknik fotoğrafları.":
      "Fotos técnicas en alta resolución de ventiladores industriales, jet fans y unidades chiller.",
    "YouTube içerikleri ve kurumsal tanıtım filmleri.":
      "Contenidos de YouTube y videos de presentación corporativa.",
    'NOVVES "Born to Flow" ses kimliği ve jingle kütüphanesi.':
      'Identidad sonora "Born to Flow" de NOVVES y biblioteca de jingles.',
    "2024 Güncel ürün spesifikasyonları ve teknik dökümanlar.":
      "Especificaciones de producto 2024 y documentos técnicos actualizados.",
    "Özel röportaj veya yüksek çözünürlüklü basılı materyaller için ekibimizle iletişime geçin.":
      "Contacta a nuestro equipo para entrevistas exclusivas o materiales impresos en alta resolución.",
    "Logolar, teknik görseller, kurumsal videolar ve ses dosyaları dahil olmak üzere tüm marka materyallerine erişin. Mühendislik otoritesi ve modern medya vizyonumuzun dijital arşivi.":
      "Accede a todos los materiales de marca, incluidos logotipos, visuales técnicos, videos corporativos y archivos de audio. Un archivo digital de nuestra autoridad en ingeniería y visión moderna de medios.",
  },
  it: {
    "Medya Merkezi": "Centro Media",
    "Teknik Arşiv v2.4": "Archivio Tecnico v2.4",
    "Logo &amp; Kimlik": "Logo e Identità",
    "Kurumsal Görseller": "Immagini Aziendali",
    "Ürün Görselleri": "Immagini Prodotto",
    "Videolar": "Video",
    "YouTube İçerikleri": "Contenuti YouTube",
    "Kurumsal Sesler": "Audio Corporate",
    "Basın Bültenleri": "Comunicati Stampa",
    "Teknik Kataloglar": "Cataloghi Tecnici",
    "Varlık Yükle": "Carica risorsa",
    "Ayarlar": "Impostazioni",
    "Destek": "Supporto",
    "Medya varlıklarında ara...": "Cerca nelle risorse media...",
    "Marka Kitini İndir": "Scarica Brand Kit",
    "Varlıkları Keşfet": "Esplora risorse",
    "Ürün Galerisi": "Galleria Prodotti",
    "Video Arşivi": "Archivio Video",
    "Renk Paleti": "Palette colori",
    "Birincil Logo (Koyu)": "Logo principale (scuro)",
    "Koyu zeminler için beyaz tipografi.": "Tipografia bianca per sfondi scuri.",
    "Tümünü İndir": "Scarica tutto",
    "Kullanım Rehberi": "Guida all'uso",
    "Kurumsal Film": "Film aziendale",
    "Ürün Görseli": "Visual prodotto",
    "Fabrika": "Fabbrica",
    "Saha Uygulamaları": "Applicazioni sul campo",
    "Medya İletişimi": "Contatto media",
    "Yasal Uyarı": "Note legali",
    "Gizlilik Politikası": "Informativa sulla privacy",
    "Kullanım Koşulları": "Termini di utilizzo",
    "Havanın Gücünü Tasarlamak": "Progettare la potenza dell'aria",
    "Series-X Jet Fan Detayı": "Dettaglio Jet Fan Series-X",
    "Ar-Ge Merkezi Kontrol Odası": "Sala di controllo del centro R&S",
    "Kurumsal Ses Kimliği": "Identità sonora corporate",
    "Video & Görsel Kütüphanesi": "Libreria video e visual",
    "NOVVES işitsel kimliğini keşfedin. Akışın mühendislikteki ses karşılığı.":
      "Scopri l'identità sonora di NOVVES. L'equivalente sonoro del flusso nell'ingegneria.",
    "Logo kullanımı, tipografi hiyerarşisi ve marka tonlaması hakkında detaylı kuralları içeren PDF dökümanı.":
      "Documento PDF con regole dettagliate sull'uso del logo, gerarchia tipografica e tonalità del brand.",
    "Endüstriyel fanlar, jet fanlar ve chiller ünitelerinin yüksek çözünürlüklü teknik fotoğrafları.":
      "Foto tecniche ad alta risoluzione di ventilatori industriali, jet fan e unità chiller.",
    "YouTube içerikleri ve kurumsal tanıtım filmleri.":
      "Contenuti YouTube e film promozionali aziendali.",
    'NOVVES "Born to Flow" ses kimliği ve jingle kütüphanesi.':
      'Identità sonora "Born to Flow" di NOVVES e libreria jingle.',
    "2024 Güncel ürün spesifikasyonları ve teknik dökümanlar.":
      "Specifiche prodotto 2024 e documentazione tecnica aggiornata.",
    "Özel röportaj veya yüksek çözünürlüklü basılı materyaller için ekibimizle iletişime geçin.":
      "Contatta il nostro team per interviste esclusive o materiali stampa ad alta risoluzione.",
    "Logolar, teknik görseller, kurumsal videolar ve ses dosyaları dahil olmak üzere tüm marka materyallerine erişin. Mühendislik otoritesi ve modern medya vizyonumuzun dijital arşivi.":
      "Accedi a tutti i materiali del brand, inclusi loghi, visual tecnici, video corporate e file audio. Un archivio digitale della nostra autorità ingegneristica e visione media moderna.",
  },
  ru: {
    "Medya Merkezi": "Медиа-центр",
    "Teknik Arşiv v2.4": "Технический архив v2.4",
    "Logo &amp; Kimlik": "Логотип и фирменный стиль",
    "Kurumsal Görseller": "Корпоративные изображения",
    "Ürün Görselleri": "Изображения продуктов",
    "Videolar": "Видео",
    "YouTube İçerikleri": "Контент YouTube",
    "Kurumsal Sesler": "Корпоративные звуки",
    "Basın Bültenleri": "Пресс-релизы",
    "Teknik Kataloglar": "Технические каталоги",
    "Varlık Yükle": "Загрузить материал",
    "Ayarlar": "Настройки",
    "Destek": "Поддержка",
    "Medya varlıklarında ara...": "Поиск по медиа-материалам...",
    "Marka Kitini İndir": "Скачать бренд-кит",
    "Varlıkları Keşfet": "Открыть материалы",
    "Ürün Galerisi": "Галерея продуктов",
    "Video Arşivi": "Видеоархив",
    "Renk Paleti": "Цветовая палитра",
    "Birincil Logo (Koyu)": "Основной логотип (тёмный)",
    "Koyu zeminler için beyaz tipografi.": "Белая типографика для тёмного фона.",
    "Tümünü İndir": "Скачать всё",
    "Kullanım Rehberi": "Руководство по использованию",
    "Kurumsal Film": "Корпоративный фильм",
    "Ürün Görseli": "Изображение продукта",
    "Fabrika": "Завод",
    "Saha Uygulamaları": "Полевые применения",
    "Medya İletişimi": "Контакты для СМИ",
    "Yasal Uyarı": "Правовая информация",
    "Gizlilik Politikası": "Политика конфиденциальности",
    "Kullanım Koşulları": "Условия использования",
    "Havanın Gücünü Tasarlamak": "Проектируя силу воздуха",
    "Series-X Jet Fan Detayı": "Деталь jet fan Series-X",
    "Ar-Ge Merkezi Kontrol Odası": "Диспетчерская центра R&D",
    "Kurumsal Ses Kimliği": "Корпоративная звуковая идентичность",
    "Video & Görsel Kütüphanesi": "Видеотека и библиотека визуалов",
    "NOVVES işitsel kimliğini keşfedin. Akışın mühendislikteki ses karşılığı.":
      "Откройте звуковую идентичность NOVVES. Звуковой эквивалент потока в инженерии.",
    "Logo kullanımı, tipografi hiyerarşisi ve marka tonlaması hakkında detaylı kuralları içeren PDF dökümanı.":
      "PDF-документ с подробными правилами использования логотипа, типографической иерархии и тональности бренда.",
    "Endüstriyel fanlar, jet fanlar ve chiller ünitelerinin yüksek çözünürlüklü teknik fotoğrafları.":
      "Технические фото высокого разрешения промышленных вентиляторов, jet fan и чиллерных установок.",
    "YouTube içerikleri ve kurumsal tanıtım filmleri.":
      "YouTube-контент и корпоративные презентационные фильмы.",
    'NOVVES "Born to Flow" ses kimliği ve jingle kütüphanesi.':
      'Звуковая идентичность NOVVES "Born to Flow" и библиотека джинглов.',
    "2024 Güncel ürün spesifikasyonları ve teknik dökümanlar.":
      "Актуальные спецификации продукции 2024 и техническая документация.",
    "Özel röportaj veya yüksek çözünürlüklü basılı materyaller için ekibimizle iletişime geçin.":
      "Свяжитесь с нашей командой для эксклюзивных интервью или печатных материалов высокого разрешения.",
    "Logolar, teknik görseller, kurumsal videolar ve ses dosyaları dahil olmak üzere tüm marka materyallerine erişin. Mühendislik otoritesi ve modern medya vizyonumuzun dijital arşivi.":
      "Получите доступ ко всем материалам бренда, включая логотипы, технические визуалы, корпоративные видео и аудиофайлы. Цифровой архив инженерной экспертизы и современной медиа-визии.",
  },
  ar: {
    "Medya Merkezi": "مركز الوسائط",
    "Teknik Arşiv v2.4": "الأرشيف الفني v2.4",
    "Logo &amp; Kimlik": "الشعار والهوية",
    "Kurumsal Görseller": "الصور المؤسسية",
    "Ürün Görselleri": "صور المنتجات",
    "Videolar": "الفيديوهات",
    "YouTube İçerikleri": "محتوى YouTube",
    "Kurumsal Sesler": "الأصوات المؤسسية",
    "Basın Bültenleri": "البيانات الصحفية",
    "Teknik Kataloglar": "الكتالوجات الفنية",
    "Varlık Yükle": "رفع أصل",
    "Ayarlar": "الإعدادات",
    "Destek": "الدعم",
    "Medya varlıklarında ara...": "ابحث في الأصول الإعلامية...",
    "Marka Kitini İndir": "تنزيل حزمة العلامة",
    "Varlıkları Keşfet": "استكشف الأصول",
    "Ürün Galerisi": "معرض المنتجات",
    "Video Arşivi": "أرشيف الفيديو",
    "Renk Paleti": "لوحة الألوان",
    "Birincil Logo (Koyu)": "الشعار الأساسي (داكن)",
    "Koyu zeminler için beyaz tipografi.": "خط أبيض للخلفيات الداكنة.",
    "Tümünü İndir": "تنزيل الكل",
    "Kullanım Rehberi": "دليل الاستخدام",
    "Kurumsal Film": "فيلم مؤسسي",
    "Ürün Görseli": "صورة المنتج",
    "Fabrika": "المصنع",
    "Saha Uygulamaları": "تطبيقات ميدانية",
    "Medya İletişimi": "اتصال الإعلام",
    "Yasal Uyarı": "إشعار قانوني",
    "Gizlilik Politikası": "سياسة الخصوصية",
    "Kullanım Koşulları": "شروط الاستخدام",
    "Havanın Gücünü Tasarlamak": "تصميم قوة الهواء",
    "Series-X Jet Fan Detayı": "تفاصيل مروحة النفث Series-X",
    "Ar-Ge Merkezi Kontrol Odası": "غرفة التحكم بمركز البحث والتطوير",
    "Kurumsal Ses Kimliği": "الهوية الصوتية المؤسسية",
    "Video & Görsel Kütüphanesi": "مكتبة الفيديو والمرئيات",
    "NOVVES işitsel kimliğini keşfedin. Akışın mühendislikteki ses karşılığı.":
      "اكتشف الهوية السمعية لـ NOVVES. المعادل الصوتي للتدفق في الهندسة.",
    "Logo kullanımı, tipografi hiyerarşisi ve marka tonlaması hakkında detaylı kuralları içeren PDF dökümanı.":
      "ملف PDF يتضمن قواعد مفصلة حول استخدام الشعار وتسلسل الطباعة ونبرة العلامة.",
    "Endüstriyel fanlar, jet fanlar ve chiller ünitelerinin yüksek çözünürlüklü teknik fotoğrafları.":
      "صور تقنية عالية الدقة للمراوح الصناعية ومراوح النفث ووحدات التشيلر.",
    "YouTube içerikleri ve kurumsal tanıtım filmleri.":
      "محتوى YouTube وأفلام العرض المؤسسية.",
    'NOVVES "Born to Flow" ses kimliği ve jingle kütüphanesi.':
      'هوية NOVVES الصوتية "Born to Flow" ومكتبة الجينغل.',
    "2024 Güncel ürün spesifikasyonları ve teknik dökümanlar.":
      "مواصفات المنتجات المحدثة لعام 2024 والوثائق الفنية.",
    "Özel röportaj veya yüksek çözünürlüklü basılı materyaller için ekibimizle iletişime geçin.":
      "تواصل مع فريقنا للمقابلات الحصرية أو المواد المطبوعة عالية الدقة.",
    "Logolar, teknik görseller, kurumsal videolar ve ses dosyaları dahil olmak üzere tüm marka materyallerine erişin. Mühendislik otoritesi ve modern medya vizyonumuzun dijital arşivi.":
      "الوصول إلى جميع مواد العلامة التجارية بما في ذلك الشعارات والمرئيات التقنية والفيديوهات المؤسسية والملفات الصوتية. أرشيف رقمي لخبرتنا الهندسية ورؤيتنا الإعلامية الحديثة.",
  },
  zh: {
    "Medya Merkezi": "媒体中心",
    "Teknik Arşiv v2.4": "技术档案 v2.4",
    "Logo &amp; Kimlik": "品牌标识与视觉规范",
    "Kurumsal Görseller": "企业图片",
    "Ürün Görselleri": "产品图片",
    "Videolar": "视频",
    "YouTube İçerikleri": "YouTube 素材",
    "Kurumsal Sesler": "企业声音资产",
    "Basın Bültenleri": "新闻稿",
    "Teknik Kataloglar": "技术目录",
    "Varlık Yükle": "上传素材",
    "Ayarlar": "设置",
    "Destek": "支持",
    "Medya varlıklarında ara...": "搜索媒体素材...",
    "Marka Kitini İndir": "下载品牌资料包",
    "Varlıkları Keşfet": "浏览素材",
    "Ürün Galerisi": "产品图库",
    "Video Arşivi": "视频档案",
    "Renk Paleti": "色彩方案",
    "Birincil Logo (Koyu)": "主标志（深色）",
    "Koyu zeminler için beyaz tipografi.": "深色背景使用白色字体。",
    "Tümünü İndir": "全部下载",
    "Kullanım Rehberi": "使用指南",
    "Kurumsal Film": "企业影片",
    "Ürün Görseli": "产品图",
    "Fabrika": "工厂",
    "Saha Uygulamaları": "现场应用",
    "Medya İletişimi": "媒体联系",
    "Yasal Uyarı": "法律声明",
    "Gizlilik Politikası": "隐私政策",
    "Kullanım Koşulları": "使用条款",
    "Havanın Gücünü Tasarlamak": "设计空气之力",
    "Series-X Jet Fan Detayı": "Series-X 喷射风机细节",
    "Ar-Ge Merkezi Kontrol Odası": "研发中心控制室",
    "Kurumsal Ses Kimliği": "企业声音识别",
    "Video & Görsel Kütüphanesi": "视频与视觉素材库",
    "NOVVES işitsel kimliğini keşfedin. Akışın mühendislikteki ses karşılığı.":
      "探索 NOVVES 的声音识别。这是工程中“流动”的声音表达。",
    "Logo kullanımı, tipografi hiyerarşisi ve marka tonlaması hakkında detaylı kuralları içeren PDF dökümanı.":
      "包含徽标使用、字体层级和品牌语调详细规范的 PDF 文档。",
    "Endüstriyel fanlar, jet fanlar ve chiller ünitelerinin yüksek çözünürlüklü teknik fotoğrafları.":
      "工业风机、喷射风机和冷水机组的高清技术图片。",
    "YouTube içerikleri ve kurumsal tanıtım filmleri.":
      "YouTube 内容与企业宣传影片。",
    'NOVVES "Born to Flow" ses kimliği ve jingle kütüphanesi.':
      'NOVVES “Born to Flow” 声音识别与 jingles 素材库。',
    "2024 Güncel ürün spesifikasyonları ve teknik dökümanlar.":
      "2024 最新产品规格与技术文档。",
    "Özel röportaj veya yüksek çözünürlüklü basılı materyaller için ekibimizle iletişime geçin.":
      "如需独家采访或高分辨率印刷素材，请联系团队。",
    "Logolar, teknik görseller, kurumsal videolar ve ses dosyaları dahil olmak üzere tüm marka materyallerine erişin. Mühendislik otoritesi ve modern medya vizyonumuzun dijital arşivi.":
      "访问全部品牌素材，包括标志、技术视觉、企业视频与音频文件。这是我们工程权威与现代媒体愿景的数字档案。",
  },
  pl: {
    "Medya Merkezi": "Centrum Mediów",
    "Teknik Arşiv v2.4": "Archiwum techniczne v2.4",
    "Logo &amp; Kimlik": "Logo i Identyfikacja",
    "Kurumsal Görseller": "Grafiki firmowe",
    "Ürün Görselleri": "Grafiki produktów",
    "Videolar": "Wideo",
    "YouTube İçerikleri": "Materiały YouTube",
    "Kurumsal Sesler": "Dźwięki firmowe",
    "Basın Bültenleri": "Informacje prasowe",
    "Teknik Kataloglar": "Katalogi techniczne",
    "Varlık Yükle": "Prześlij zasób",
    "Ayarlar": "Ustawienia",
    "Destek": "Wsparcie",
    "Medya varlıklarında ara...": "Szukaj zasobów medialnych...",
    "Marka Kitini İndir": "Pobierz zestaw marki",
    "Varlıkları Keşfet": "Przeglądaj zasoby",
    "Ürün Galerisi": "Galeria produktów",
    "Video Arşivi": "Archiwum wideo",
    "Renk Paleti": "Paleta kolorów",
    "Birincil Logo (Koyu)": "Logo podstawowe (ciemne)",
    "Koyu zeminler için beyaz tipografi.": "Biała typografia na ciemne tło.",
    "Tümünü İndir": "Pobierz wszystko",
    "Kullanım Rehberi": "Przewodnik użycia",
    "Kurumsal Film": "Film korporacyjny",
    "Ürün Görseli": "Grafika produktu",
    "Fabrika": "Fabryka",
    "Saha Uygulamaları": "Zastosowania terenowe",
    "Medya İletişimi": "Kontakt medialny",
    "Yasal Uyarı": "Nota prawna",
    "Gizlilik Politikası": "Polityka prywatności",
    "Kullanım Koşulları": "Warunki użytkowania",
    "Havanın Gücünü Tasarlamak": "Projektowanie mocy powietrza",
    "Series-X Jet Fan Detayı": "Detal wentylatora odrzutowego Series-X",
    "Ar-Ge Merkezi Kontrol Odası": "Sterownia centrum R&D",
    "Kurumsal Ses Kimliği": "Tożsamość dźwiękowa firmy",
    "Video & Görsel Kütüphanesi": "Biblioteka wideo i materiałów wizualnych",
    "NOVVES işitsel kimliğini keşfedin. Akışın mühendislikteki ses karşılığı.":
      "Poznaj tożsamość dźwiękową NOVVES. Dźwiękowy odpowiednik przepływu w inżynierii.",
    "Logo kullanımı, tipografi hiyerarşisi ve marka tonlaması hakkında detaylı kuralları içeren PDF dökümanı.":
      "Dokument PDF zawierający szczegółowe zasady użycia logo, hierarchii typografii i tonu marki.",
    "Endüstriyel fanlar, jet fanlar ve chiller ünitelerinin yüksek çözünürlüklü teknik fotoğrafları.":
      "Wysokiej jakości zdjęcia techniczne wentylatorów przemysłowych, jet fanów i agregatów chiller.",
    "YouTube içerikleri ve kurumsal tanıtım filmleri.":
      "Treści YouTube i firmowe filmy promocyjne.",
    'NOVVES "Born to Flow" ses kimliği ve jingle kütüphanesi.':
      'Tożsamość dźwiękowa NOVVES „Born to Flow” i biblioteka jingli.',
    "2024 Güncel ürün spesifikasyonları ve teknik dökümanlar.":
      "Aktualne specyfikacje produktów 2024 i dokumentacja techniczna.",
    "Özel röportaj veya yüksek çözünürlüklü basılı materyaller için ekibimizle iletişime geçin.":
      "Skontaktuj się z zespołem w sprawie ekskluzywnych wywiadów lub materiałów drukowanych w wysokiej rozdzielczości.",
    "Logolar, teknik görseller, kurumsal videolar ve ses dosyaları dahil olmak üzere tüm marka materyallerine erişin. Mühendislik otoritesi ve modern medya vizyonumuzun dijital arşivi.":
      "Uzyskaj dostęp do wszystkich materiałów marki, w tym logotypów, wizualizacji technicznych, filmów korporacyjnych i plików audio. Cyfrowe archiwum naszej inżynierskiej ekspertyzy i nowoczesnej wizji mediów.",
  },
  lt: {
    "Medya Merkezi": "Medijos Centras",
    "Teknik Arşiv v2.4": "Techninis archyvas v2.4",
    "Logo &amp; Kimlik": "Logotipas ir identitetas",
    "Kurumsal Görseller": "Įmonės vaizdai",
    "Ürün Görselleri": "Produktų vaizdai",
    "Videolar": "Vaizdo įrašai",
    "YouTube İçerikleri": "YouTube turinys",
    "Kurumsal Sesler": "Įmonės garso įrašai",
    "Basın Bültenleri": "Pranešimai spaudai",
    "Teknik Kataloglar": "Techniniai katalogai",
    "Varlık Yükle": "Įkelti failą",
    "Ayarlar": "Nustatymai",
    "Destek": "Pagalba",
    "Medya varlıklarında ara...": "Ieškoti medijos išteklių...",
    "Marka Kitini İndir": "Atsisiųsti prekės ženklo rinkinį",
    "Varlıkları Keşfet": "Peržiūrėti išteklius",
    "Ürün Galerisi": "Produktų galerija",
    "Video Arşivi": "Vaizdo archyvas",
    "Renk Paleti": "Spalvų paletė",
    "Birincil Logo (Koyu)": "Pagrindinis logotipas (tamsus)",
    "Koyu zeminler için beyaz tipografi.": "Balta tipografija tamsiam fonui.",
    "Tümünü İndir": "Atsisiųsti viską",
    "Kullanım Rehberi": "Naudojimo vadovas",
    "Kurumsal Film": "Įmonės filmas",
    "Ürün Görseli": "Produkto vaizdas",
    "Fabrika": "Gamykla",
    "Saha Uygulamaları": "Lauko taikymai",
    "Medya İletişimi": "Žiniasklaidos kontaktai",
    "Yasal Uyarı": "Teisinis pranešimas",
    "Gizlilik Politikası": "Privatumo politika",
    "Kullanım Koşulları": "Naudojimo sąlygos",
    "Havanın Gücünü Tasarlamak": "Kuriame oro galią",
    "Series-X Jet Fan Detayı": "Series-X jet ventiliatoriaus detalė",
    "Ar-Ge Merkezi Kontrol Odası": "R&D centro valdymo kambarys",
    "Kurumsal Ses Kimliği": "Įmonės garso identitetas",
    "Video & Görsel Kütüphanesi": "Vaizdo ir vizualų biblioteka",
    "NOVVES işitsel kimliğini keşfedin. Akışın mühendislikteki ses karşılığı.":
      "Atraskite NOVVES garsinį identitetą. Tai inžinerinio srauto garsinis atitikmuo.",
    "Logo kullanımı, tipografi hiyerarşisi ve marka tonlaması hakkında detaylı kuralları içeren PDF dökümanı.":
      "PDF dokumentas su išsamiomis taisyklėmis apie logotipo naudojimą, tipografijos hierarchiją ir prekės ženklo toną.",
    "Endüstriyel fanlar, jet fanlar ve chiller ünitelerinin yüksek çözünürlüklü teknik fotoğrafları.":
      "Aukštos raiškos techninės pramoninių ventiliatorių, jet ventiliatorių ir chiller įrenginių nuotraukos.",
    "YouTube içerikleri ve kurumsal tanıtım filmleri.":
      "YouTube turinys ir įmonės pristatymo vaizdo įrašai.",
    'NOVVES "Born to Flow" ses kimliği ve jingle kütüphanesi.':
      'NOVVES „Born to Flow“ garsinis identitetas ir džinglų biblioteka.',
    "2024 Güncel ürün spesifikasyonları ve teknik dökümanlar.":
      "Atnaujintos 2024 m. produktų specifikacijos ir techniniai dokumentai.",
    "Özel röportaj veya yüksek çözünürlüklü basılı materyaller için ekibimizle iletişime geçin.":
      "Susisiekite su mūsų komanda dėl išskirtinių interviu ar aukštos raiškos spaudos medžiagos.",
    "Logolar, teknik görseller, kurumsal videolar ve ses dosyaları dahil olmak üzere tüm marka materyallerine erişin. Mühendislik otoritesi ve modern medya vizyonumuzun dijital arşivi.":
      "Pasiekite visą prekės ženklo medžiagą, įskaitant logotipus, techninius vizualus, įmonės vaizdo įrašus ir garso failus. Skaitmeninis mūsų inžinerinio autoriteto ir modernios medijų vizijos archyvas.",
  },
  az: {
    "Medya Merkezi": "Media Mərkəzi",
    "Teknik Arşiv v2.4": "Texniki Arxiv v2.4",
    "Logo &amp; Kimlik": "Loqo və Kimlik",
    "Kurumsal Görseller": "Korporativ Şəkillər",
    "Ürün Görselleri": "Məhsul Şəkilləri",
    "Videolar": "Videolar",
    "YouTube İçerikleri": "YouTube Materialları",
    "Kurumsal Sesler": "Korporativ Səslər",
    "Basın Bültenleri": "Mətbuat Bülletenləri",
    "Teknik Kataloglar": "Texniki Kataloqlar",
    "Varlık Yükle": "Fayl Yüklə",
    "Ayarlar": "Ayarlar",
    "Destek": "Dəstək",
    "Medya varlıklarında ara...": "Media materiallarında axtar...",
    "Marka Kitini İndir": "Brend kitini yüklə",
    "Varlıkları Keşfet": "Materialları kəşf et",
    "Ürün Galerisi": "Məhsul Qalereyası",
    "Video Arşivi": "Video Arxivi",
    "Renk Paleti": "Rəng Palitrası",
    "Birincil Logo (Koyu)": "Əsas Loqo (Tünd)",
    "Koyu zeminler için beyaz tipografi.": "Tünd fonlar üçün ağ tipoqrafiya.",
    "Tümünü İndir": "Hamısını Yüklə",
    "Kullanım Rehberi": "İstifadə Bələdçisi",
    "Kurumsal Film": "Korporativ Film",
    "Ürün Görseli": "Məhsul Vizualı",
    "Fabrika": "Fabrik",
    "Saha Uygulamaları": "Sahə Tətbiqləri",
    "Medya İletişimi": "Media Əlaqə",
    "Yasal Uyarı": "Hüquqi Bildiriş",
    "Gizlilik Politikası": "Məxfilik Siyasəti",
    "Kullanım Koşulları": "İstifadə Şərtləri",
    "Havanın Gücünü Tasarlamak": "Havanın Gücünü Dizayn Etmək",
    "Series-X Jet Fan Detayı": "Series-X Jet Fan Detalı",
    "Ar-Ge Merkezi Kontrol Odası": "Ar-Ge Mərkəzi Nəzarət Otağı",
    "Kurumsal Ses Kimliği": "Korporativ Səs Kimliyi",
    "Video & Görsel Kütüphanesi": "Video və Vizual Kitabxana",
    "NOVVES işitsel kimliğini keşfedin. Akışın mühendislikteki ses karşılığı.":
      "NOVVES-in səs kimliyini kəşf edin. Axının mühəndislikdəki səs qarşılığı.",
    "Logo kullanımı, tipografi hiyerarşisi ve marka tonlaması hakkında detaylı kuralları içeren PDF dökümanı.":
      "Loqo istifadəsi, tipoqrafiya iyerarxiyası və brend tonallığı haqqında ətraflı qaydaları ehtiva edən PDF sənədi.",
    "Endüstriyel fanlar, jet fanlar ve chiller ünitelerinin yüksek çözünürlüklü teknik fotoğrafları.":
      "Sənaye fanları, jet fanlar və çiller qurğularının yüksək keyfiyyətli texniki fotoları.",
    "YouTube içerikleri ve kurumsal tanıtım filmleri.":
      "YouTube məzmunları və korporativ tanıtım filmləri.",
    'NOVVES "Born to Flow" ses kimliği ve jingle kütüphanesi.':
      'NOVVES "Born to Flow" səs kimliyi və cingl kitabxanası.',
    "2024 Güncel ürün spesifikasyonları ve teknik dökümanlar.":
      "2024-cü il üzrə aktual məhsul spesifikasiyaları və texniki sənədlər.",
    "Özel röportaj veya yüksek çözünürlüklü basılı materyaller için ekibimizle iletişime geçin.":
      "Eksklüziv müsahibə və ya yüksək keyfiyyətli çap materialları üçün komandamızla əlaqə saxlayın.",
    "Logolar, teknik görseller, kurumsal videolar ve ses dosyaları dahil olmak üzere tüm marka materyallerine erişin. Mühendislik otoritesi ve modern medya vizyonumuzun dijital arşivi.":
      "Loqolar, texniki vizuallar, korporativ videolar və səs faylları daxil olmaqla bütün brend materiallarına çıxış əldə edin. Mühəndislik nüfuzumuzun və müasir media vizyonumuzun rəqəmsal arxivi.",
  },
  kk: {
    "Medya Merkezi": "Медиа орталығы",
    "Teknik Arşiv v2.4": "Техникалық мұрағат v2.4",
    "Logo &amp; Kimlik": "Логотип және брендтік стиль",
    "Kurumsal Görseller": "Корпоративтік суреттер",
    "Ürün Görselleri": "Өнім суреттері",
    "Videolar": "Бейнелер",
    "YouTube İçerikleri": "YouTube материалдары",
    "Kurumsal Sesler": "Корпоративтік дыбыстар",
    "Basın Bültenleri": "Баспасөз хабарламалары",
    "Teknik Kataloglar": "Техникалық каталогтар",
    "Varlık Yükle": "Материал жүктеу",
    "Ayarlar": "Баптаулар",
    "Destek": "Қолдау",
    "Medya varlıklarında ara...": "Медиа материалдардан іздеу...",
    "Marka Kitini İndir": "Бренд жинағын жүктеу",
    "Varlıkları Keşfet": "Материалдарды қарау",
    "Ürün Galerisi": "Өнім галереясы",
    "Video Arşivi": "Бейне мұрағат",
    "Renk Paleti": "Түс палитрасы",
    "Birincil Logo (Koyu)": "Негізгі логотип (қараңғы)",
    "Koyu zeminler için beyaz tipografi.": "Қара фонға ақ типография.",
    "Tümünü İndir": "Барлығын жүктеу",
    "Kullanım Rehberi": "Пайдалану нұсқаулығы",
    "Kurumsal Film": "Корпоративтік фильм",
    "Ürün Görseli": "Өнім көрінісі",
    "Fabrika": "Зауыт",
    "Saha Uygulamaları": "Дала қолданбалары",
    "Medya İletişimi": "Медиа байланыс",
    "Yasal Uyarı": "Заңды ескерту",
    "Gizlilik Politikası": "Құпиялық саясаты",
    "Kullanım Koşulları": "Қолдану шарттары",
    "Havanın Gücünü Tasarlamak": "Ауаның күшін жобалау",
    "Series-X Jet Fan Detayı": "Series-X Jet Fan бөлшегі",
    "Ar-Ge Merkezi Kontrol Odası": "R&D орталығының басқару бөлмесі",
    "Kurumsal Ses Kimliği": "Корпоративтік дыбыс бірегейлігі",
    "Video & Görsel Kütüphanesi": "Бейне және визуал кітапхана",
    "NOVVES işitsel kimliğini keşfedin. Akışın mühendislikteki ses karşılığı.":
      "NOVVES дыбыстық бірегейлігін ашыңыз. Инженериядағы ағынның дыбыстық баламасы.",
    "Logo kullanımı, tipografi hiyerarşisi ve marka tonlaması hakkında detaylı kuralları içeren PDF dökümanı.":
      "Логотипті пайдалану, типография иерархиясы және бренд үнін қамтитын толық PDF құжат.",
    "Endüstriyel fanlar, jet fanlar ve chiller ünitelerinin yüksek çözünürlüklü teknik fotoğrafları.":
      "Өнеркәсіптік желдеткіштер, jet fan және чиллер қондырғыларының жоғары ажыратымды техникалық фотолары.",
    "YouTube içerikleri ve kurumsal tanıtım filmleri.":
      "YouTube контенті және корпоративтік таныстыру фильмдері.",
    'NOVVES "Born to Flow" ses kimliği ve jingle kütüphanesi.':
      'NOVVES "Born to Flow" дыбыстық бірегейлігі мен джингл кітапханасы.',
    "2024 Güncel ürün spesifikasyonları ve teknik dökümanlar.":
      "2024 жылға арналған өзекті өнім сипаттамалары мен техникалық құжаттар.",
    "Özel röportaj veya yüksek çözünürlüklü basılı materyaller için ekibimizle iletişime geçin.":
      "Эксклюзивті сұхбат немесе жоғары ажыратымды баспа материалдары үшін командамызға хабарласыңыз.",
    "Logolar, teknik görseller, kurumsal videolar ve ses dosyaları dahil olmak üzere tüm marka materyallerine erişin. Mühendislik otoritesi ve modern medya vizyonumuzun dijital arşivi.":
      "Логотиптер, техникалық визуалдар, корпоративтік бейнелер және аудио файлдар қоса алғанда, барлық бренд материалдарына қол жеткізіңіз. Инженерлік беделіміз бен заманауи медиа көзқарасымыздың цифрлық мұрағаты.",
  },
  tg: {
    "Medya Merkezi": "Маркази медиа",
    "Teknik Arşiv v2.4": "Бойгонии техникӣ v2.4",
    "Logo &amp; Kimlik": "Лого ва ҳувият",
    "Kurumsal Görseller": "Тасвирҳои корпоративӣ",
    "Ürün Görselleri": "Тасвирҳои маҳсулот",
    "Videolar": "Видеоҳо",
    "YouTube İçerikleri": "Маводи YouTube",
    "Kurumsal Sesler": "Садоҳои корпоративӣ",
    "Basın Bültenleri": "Пресс-релизҳо",
    "Teknik Kataloglar": "Каталогҳои техникӣ",
    "Varlık Yükle": "Боргузории файл",
    "Ayarlar": "Танзимот",
    "Destek": "Дастгирӣ",
    "Medya varlıklarında ara...": "Ҷустуҷӯ дар захираҳои медиа...",
    "Marka Kitini İndir": "Боргирии маҷмуаи бренд",
    "Varlıkları Keşfet": "Кашфи захираҳо",
    "Ürün Galerisi": "Галереяи маҳсулот",
    "Video Arşivi": "Бойгонии видео",
    "Renk Paleti": "Палитраи ранг",
    "Birincil Logo (Koyu)": "Логотипи асосӣ (торик)",
    "Koyu zeminler için beyaz tipografi.": "Типографияи сафед барои заминаи торик.",
    "Tümünü İndir": "Ҳамаро боргирӣ кунед",
    "Kullanım Rehberi": "Дастури истифода",
    "Kurumsal Film": "Филми корпоративӣ",
    "Ürün Görseli": "Тасвири маҳсулот",
    "Fabrika": "Корхона",
    "Saha Uygulamaları": "Истифодаҳои саҳроӣ",
    "Medya İletişimi": "Алоқаи медиа",
    "Yasal Uyarı": "Огоҳии ҳуқуқӣ",
    "Gizlilik Politikası": "Сиёсати махфият",
    "Kullanım Koşulları": "Шартҳои истифода",
    "Havanın Gücünü Tasarlamak": "Тарҳрезии қудрати ҳаво",
    "Series-X Jet Fan Detayı": "Тафсилоти Series-X Jet Fan",
    "Ar-Ge Merkezi Kontrol Odası": "Ҳуҷраи назорати маркази R&D",
    "Kurumsal Ses Kimliği": "Ҳувияти садоии корпоративӣ",
    "Video & Görsel Kütüphanesi": "Китобхонаи видео ва визуал",
    "NOVVES işitsel kimliğini keşfedin. Akışın mühendislikteki ses karşılığı.":
      "Ҳувияти садоии NOVVES-ро кашф кунед. Муодили садоии ҷараён дар муҳандисӣ.",
    "Logo kullanımı, tipografi hiyerarşisi ve marka tonlaması hakkında detaylı kuralları içeren PDF dökümanı.":
      "Ҳуҷҷати PDF бо қоидаҳои муфассал оид ба истифодаи лого, иерархияи типография ва оҳанги бренд.",
    "Endüstriyel fanlar, jet fanlar ve chiller ünitelerinin yüksek çözünürlüklü teknik fotoğrafları.":
      "Аксҳои техникии баландсифати вентиляторҳои саноатӣ, jet fan ва дастгоҳҳои chiller.",
    "YouTube içerikleri ve kurumsal tanıtım filmleri.":
      "Маводи YouTube ва филмҳои муаррифии корпоративӣ.",
    'NOVVES "Born to Flow" ses kimliği ve jingle kütüphanesi.':
      'Ҳувияти садоии NOVVES "Born to Flow" ва китобхонаи ҷинглҳо.',
    "2024 Güncel ürün spesifikasyonları ve teknik dökümanlar.":
      "Мушаххасоти навшудаи маҳсулот барои соли 2024 ва ҳуҷҷатҳои техникӣ.",
    "Özel röportaj veya yüksek çözünürlüklü basılı materyaller için ekibimizle iletişime geçin.":
      "Барои мусоҳибаҳои махсус ё маводи чопии баландсифат бо дастаи мо дар тамос шавед.",
    "Logolar, teknik görseller, kurumsal videolar ve ses dosyaları dahil olmak üzere tüm marka materyallerine erişin. Mühendislik otoritesi ve modern medya vizyonumuzun dijital arşivi.":
      "Ба ҳамаи маводи бренд, аз ҷумла логоҳо, визуалҳои техникӣ, видеоҳои корпоративӣ ва файлҳои садоӣ дастрасӣ пайдо кунед. Бойгонии рақамии нуфузи муҳандисӣ ва диди муосири медиавии мо.",
  },
  ur: {
    "Medya Merkezi": "میڈیا سینٹر",
    "Teknik Arşiv v2.4": "تکنیکی آرکائیو v2.4",
    "Logo &amp; Kimlik": "لوگو اور شناخت",
    "Kurumsal Görseller": "کارپوریٹ تصاویر",
    "Ürün Görselleri": "پروڈکٹ تصاویر",
    "Videolar": "ویڈیوز",
    "YouTube İçerikleri": "یوٹیوب مواد",
    "Kurumsal Sesler": "کارپوریٹ آڈیو",
    "Basın Bültenleri": "پریس ریلیز",
    "Teknik Kataloglar": "تکنیکی کیٹلاگز",
    "Varlık Yükle": "فائل اپلوڈ کریں",
    "Ayarlar": "ترتیبات",
    "Destek": "سپورٹ",
    "Medya varlıklarında ara...": "میڈیا اثاثوں میں تلاش کریں...",
    "Marka Kitini İndir": "برانڈ کِٹ ڈاؤن لوڈ کریں",
    "Varlıkları Keşfet": "اثاثے دیکھیں",
    "Ürün Galerisi": "پروڈکٹ گیلری",
    "Video Arşivi": "ویڈیو آرکائیو",
    "Renk Paleti": "رنگوں کا پیلیٹ",
    "Birincil Logo (Koyu)": "بنیادی لوگو (گہرا)",
    "Koyu zeminler için beyaz tipografi.": "گہرے بیک گراؤنڈ کے لیے سفید ٹائپوگرافی۔",
    "Tümünü İndir": "سب ڈاؤن لوڈ کریں",
    "Kullanım Rehberi": "استعمال گائیڈ",
    "Kurumsal Film": "کارپوریٹ فلم",
    "Ürün Görseli": "پروڈکٹ ویژول",
    "Fabrika": "فیکٹری",
    "Saha Uygulamaları": "فیلڈ ایپلیکیشنز",
    "Medya İletişimi": "میڈیا رابطہ",
    "Yasal Uyarı": "قانونی نوٹس",
    "Gizlilik Politikası": "پرائیویسی پالیسی",
    "Kullanım Koşulları": "استعمال کی شرائط",
    "Havanın Gücünü Tasarlamak": "ہوا کی طاقت کو ڈیزائن کرنا",
    "Series-X Jet Fan Detayı": "Series-X جیٹ فین کی تفصیل",
    "Ar-Ge Merkezi Kontrol Odası": "آر اینڈ ڈی سینٹر کنٹرول روم",
    "Kurumsal Ses Kimliği": "کارپوریٹ ساؤنڈ آئیڈینٹیٹی",
    "Video & Görsel Kütüphanesi": "ویڈیو اور بصری لائبریری",
    "NOVVES işitsel kimliğini keşfedin. Akışın mühendislikteki ses karşılığı.":
      "NOVVES کی صوتی شناخت دریافت کریں۔ انجینئرنگ میں بہاؤ کا صوتی مترادف۔",
    "Logo kullanımı, tipografi hiyerarşisi ve marka tonlaması hakkında detaylı kuralları içeren PDF dökümanı.":
      "PDF دستاویز جس میں لوگو استعمال، ٹائپوگرافی ہائیرارکی اور برانڈ ٹون کے تفصیلی اصول شامل ہیں۔",
    "Endüstriyel fanlar, jet fanlar ve chiller ünitelerinin yüksek çözünürlüklü teknik fotoğrafları.":
      "صنعتی فینز، جیٹ فینز اور چلر یونٹس کی ہائی ریزولوشن تکنیکی تصاویر۔",
    "YouTube içerikleri ve kurumsal tanıtım filmleri.":
      "YouTube مواد اور کارپوریٹ تعارفی ویڈیوز۔",
    'NOVVES "Born to Flow" ses kimliği ve jingle kütüphanesi.':
      'NOVVES "Born to Flow" صوتی شناخت اور جِنگل لائبریری۔',
    "2024 Güncel ürün spesifikasyonları ve teknik dökümanlar.":
      "2024 کی تازہ ترین پروڈکٹ اسپیسفیکیشنز اور تکنیکی دستاویزات۔",
    "Özel röportaj veya yüksek çözünürlüklü basılı materyaller için ekibimizle iletişime geçin.":
      "خصوصی انٹرویو یا ہائی ریزولوشن پرنٹ میٹیریلز کے لیے ہماری ٹیم سے رابطہ کریں۔",
    "Logolar, teknik görseller, kurumsal videolar ve ses dosyaları dahil olmak üzere tüm marka materyallerine erişin. Mühendislik otoritesi ve modern medya vizyonumuzun dijital arşivi.":
      "تمام برانڈ مواد تک رسائی حاصل کریں، بشمول لوگوز، تکنیکی بصریات، کارپوریٹ ویڈیوز اور آڈیو فائلیں۔ ہماری انجینئرنگ اتھارٹی اور جدید میڈیا وژن کا ڈیجیٹل آرکائیو۔",
  },
};

const commonUiByLocale: Record<string, Record<string, string>> = {
  en: {
    "Tümü": "All",
    "Ürünler": "Products",
    "Logo &amp; Kurumsal <span class=\"text-secondary\">Kimlik</span>":
      "Logo &amp; Corporate <span class=\"text-secondary\">Identity</span>",
    "Logo & Kurumsal Kimlik": "Logo & Corporate Identity",
    "Industrial Navy": "Industrial Navy",
    "Safety Orange": "Safety Orange",
    "Steel Gray": "Steel Gray",
  },
  ru: {
    "Tümü": "Все",
    "Ürünler": "Продукты",
    "Logo &amp; Kurumsal <span class=\"text-secondary\">Kimlik</span>":
      "Логотип и <span class=\"text-secondary\">фирменный стиль</span>",
    "Logo & Kurumsal Kimlik": "Логотип и фирменный стиль",
    "Industrial Navy": "Промышленный синий",
    "Safety Orange": "Сигнальный оранжевый",
    "Steel Gray": "Стальной серый",
  },
  ar: {
    "Tümü": "الكل",
    "Ürünler": "المنتجات",
    "Logo &amp; Kurumsal <span class=\"text-secondary\">Kimlik</span>":
      "الشعار و<span class=\"text-secondary\">الهوية المؤسسية</span>",
    "Logo & Kurumsal Kimlik": "الشعار والهوية المؤسسية",
    "Industrial Navy": "كحلي صناعي",
    "Safety Orange": "برتقالي السلامة",
    "Steel Gray": "رمادي فولاذي",
  },
  de: {
    "Tümü": "Alle",
    "Ürünler": "Produkte",
    "Logo &amp; Kurumsal <span class=\"text-secondary\">Kimlik</span>":
      "Logo &amp; Corporate <span class=\"text-secondary\">Identität</span>",
    "Logo & Kurumsal Kimlik": "Logo & Corporate Identität",
    "Industrial Navy": "Industrie-Marineblau",
    "Safety Orange": "Sicherheitsorange",
    "Steel Gray": "Stahlgrau",
  },
  it: {
    "Tümü": "Tutto",
    "Ürünler": "Prodotti",
    "Logo &amp; Kurumsal <span class=\"text-secondary\">Kimlik</span>":
      "Logo &amp; <span class=\"text-secondary\">Identità aziendale</span>",
    "Logo & Kurumsal Kimlik": "Logo e Identità aziendale",
    "Industrial Navy": "Blu industriale",
    "Safety Orange": "Arancione sicurezza",
    "Steel Gray": "Grigio acciaio",
  },
  fr: {
    "Tümü": "Tout",
    "Ürünler": "Produits",
    "Logo &amp; Kurumsal <span class=\"text-secondary\">Kimlik</span>":
      "Logo &amp; <span class=\"text-secondary\">Identité Corporate</span>",
    "Logo & Kurumsal Kimlik": "Logo & Identité Corporate",
    "Industrial Navy": "Bleu industriel",
    "Safety Orange": "Orange sécurité",
    "Steel Gray": "Gris acier",
  },
  az: {
    "Tümü": "Hamısı",
    "Ürünler": "Məhsullar",
    "Logo &amp; Kurumsal <span class=\"text-secondary\">Kimlik</span>":
      "Loqo və Korporativ <span class=\"text-secondary\">Kimlik</span>",
    "Logo & Kurumsal Kimlik": "Loqo və Korporativ Kimlik",
    "Industrial Navy": "Sənaye Göyü",
    "Safety Orange": "Təhlükəsizlik Narıncı",
    "Steel Gray": "Polad Boz",
  },
  kk: {
    "Tümü": "Барлығы",
    "Ürünler": "Өнімдер",
    "Logo &amp; Kurumsal <span class=\"text-secondary\">Kimlik</span>":
      "Логотип және Корпоративтік <span class=\"text-secondary\">Бірегейлік</span>",
    "Logo & Kurumsal Kimlik": "Логотип және Корпоративтік Бірегейлік",
    "Industrial Navy": "Өнеркәсіптік көк",
    "Safety Orange": "Қауіпсіздік қызғылт сары",
    "Steel Gray": "Болат сұр",
  },
  tg: {
    "Tümü": "Ҳама",
    "Ürünler": "Маҳсулот",
    "Logo &amp; Kurumsal <span class=\"text-secondary\">Kimlik</span>":
      "Лого ва Ҳувияти <span class=\"text-secondary\">корпоративӣ</span>",
    "Logo & Kurumsal Kimlik": "Лого ва Ҳувияти корпоративӣ",
    "Industrial Navy": "Кабуди саноатӣ",
    "Safety Orange": "Норанҷии бехатарӣ",
    "Steel Gray": "Хокистарии пӯлод",
  },
  es: {
    "Tümü": "Todo",
    "Ürünler": "Productos",
    "Logo &amp; Kurumsal <span class=\"text-secondary\">Kimlik</span>":
      "Logo e <span class=\"text-secondary\">Identidad Corporativa</span>",
    "Logo & Kurumsal Kimlik": "Logo e Identidad Corporativa",
    "Industrial Navy": "Azul industrial",
    "Safety Orange": "Naranja de seguridad",
    "Steel Gray": "Gris acero",
  },
  zh: {
    "Tümü": "全部",
    "Ürünler": "产品",
    "Logo &amp; Kurumsal <span class=\"text-secondary\">Kimlik</span>":
      "标志与企业<span class=\"text-secondary\">形象</span>",
    "Logo & Kurumsal Kimlik": "标志与企业形象",
    "Industrial Navy": "工业深蓝",
    "Safety Orange": "安全橙",
    "Steel Gray": "钢灰",
  },
  ur: {
    "Tümü": "سب",
    "Ürünler": "مصنوعات",
    "Logo &amp; Kurumsal <span class=\"text-secondary\">Kimlik</span>":
      "لوگو اور کارپوریٹ <span class=\"text-secondary\">شناخت</span>",
    "Logo & Kurumsal Kimlik": "لوگو اور کارپوریٹ شناخت",
    "Industrial Navy": "انڈسٹریل نیوی",
    "Safety Orange": "سیفٹی اورنج",
    "Steel Gray": "اسٹیل گرے",
  },
  lt: {
    "Tümü": "Visi",
    "Ürünler": "Produktai",
    "Logo &amp; Kurumsal <span class=\"text-secondary\">Kimlik</span>":
      "Logotipas ir Įmonės <span class=\"text-secondary\">identitetas</span>",
    "Logo & Kurumsal Kimlik": "Logotipas ir Įmonės identitetas",
    "Industrial Navy": "Pramoninė tamsiai mėlyna",
    "Safety Orange": "Saugos oranžinė",
    "Steel Gray": "Plieno pilka",
  },
  pl: {
    "Tümü": "Wszystko",
    "Ürünler": "Produkty",
    "Logo &amp; Kurumsal <span class=\"text-secondary\">Kimlik</span>":
      "Logo i <span class=\"text-secondary\">tożsamość korporacyjna</span>",
    "Logo & Kurumsal Kimlik": "Logo i tożsamość korporacyjna",
    "Industrial Navy": "Przemysłowy granat",
    "Safety Orange": "Pomarańcz bezpieczeństwa",
    "Steel Gray": "Stalowy szary",
  },
};

function localizeMediaHtml(locale: string, html: string): string {
  if (locale === "tr") return html;

  const applyReplacementMap = (input: string, map: Record<string, string>) =>
    Object.entries(map).reduce((acc, [from, to]) => {
      let next = acc.replaceAll(from, to);
      // Handle HTML entity variations (& vs &amp;) so strings always match.
      if (from.includes("&")) {
        const encoded = from.replaceAll("&", "&amp;");
        next = next.replaceAll(encoded, to);
      }
      if (from.includes("&amp;")) {
        const decoded = from.replaceAll("&amp;", "&");
        next = next.replaceAll(decoded, to);
      }
      return next;
    }, input);

  const replacements = mediaTextByLocale[locale] ?? mediaTextByLocale.en;
  // 1) Primary pass: Turkish source -> target locale
  let out = applyReplacementMap(html, replacements);

  // 2) Secondary pass: convert English leftovers -> target locale
  // This maps EN texts generated from the same Turkish source key.
  if (locale !== "en") {
    const enSourceMap = mediaTextByLocale.en;
    out = Object.entries(enSourceMap).reduce((acc, [trSource, enText]) => {
      const targetText = replacements[trSource];
      if (!targetText || targetText === enText) return acc;
      let next = acc.replaceAll(enText, targetText);
      const enEncoded = enText.replaceAll("&", "&amp;");
      next = next.replaceAll(enEncoded, targetText);
      return next;
    }, out);
  }

  const commonReplacements = commonUiByLocale[locale] ?? commonUiByLocale.en;
  out = applyReplacementMap(out, commonReplacements);

  // Sidebar + shared labels (e.g. Patentlerimiz) from patent locale map
  if (locale !== "tr") {
    const patentAll = patentTrToLocalesAuto as Record<string, Record<string, string>>;
    const patentMap = patentAll[locale] ?? patentAll.en ?? {};
    const patentEntries = Object.entries(patentMap).sort((a, b) => b[0].length - a[0].length);
    out = patentEntries.reduce((acc, [from, to]) => {
      let next = acc.replaceAll(from, to);
      if (from.includes("&")) next = next.replaceAll(from.replaceAll("&", "&amp;"), to);
      if (from.includes("&amp;")) next = next.replaceAll(from.replaceAll("&amp;", "&"), to);
      return next;
    }, out);
  }

  return out;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return withPageSeo({
    locale,
    pathAfterLocale: "kurumsal/medya-merkezi",
    title: mediaCenterTitles[locale] ?? mediaCenterTitles.en,
    description: mediaCenterDescriptions[locale] ?? mediaCenterDescriptions.en,
  });
}

export default async function MedyaMerkeziPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  let html = "";
  try {
    html = await readMediaCenterHtml();
  } catch {
    html = mediaCenterHtmlMissingMessage("media");
  }

  html = localizeMediaHtml(locale, html);
  // Keep global site navbar and hide the embedded HTML navbar to avoid double header.
  html = html.replace(
    'class="fixed top-0 z-50 h-20 w-full bg-primary-container shadow-md flex justify-between items-center px-8 mx-auto max-w-full"',
    'class="hidden fixed top-0 z-50 h-20 w-full bg-primary-container shadow-md justify-between items-center px-8 mx-auto max-w-full"',
  );
  html = html.replace('class="flex pt-20"', 'class="flex pt-0"');
  html = html.replace('class="h-[calc(100vh-5rem)] w-80', 'class="h-screen w-80');
  html = html.replace('sticky top-20', 'sticky top-0');
  // Patent section should be visible only on /kurumsal/patentlerimiz route.
  html = html.replace(
    "</head>",
    `<style>
      /* Sol panel native React tarafına taşındı — iframe'in kendi (masaüstü) sidebar'ını gizle. */
      aside.sticky { display: none !important; }
      #patentlerimiz { display: none !important; }
    </style></head>`,
  );

  const isTr = locale === "tr";
  const L = (key: string, fallbackTr: string) =>
    isTr ? fallbackTr : mediaTextByLocale[locale]?.[key] ?? fallbackTr;

  const patentNavByLocale: Record<string, string> = {
    tr: "Patentlerimiz", en: "Patents", de: "Patente", fr: "Brevets", es: "Patentes",
    it: "Brevetti", ru: "Патенты", ar: "براءات الاختراع", az: "Patentlər", kk: "Патенттер",
    tg: "Патентҳо", zh: "专利", ur: "پیٹنٹس", lt: "Patentai", pl: "Patenty",
  };

  const mainItems = [
    { icon: "branding_watermark", label: L("Logo &amp; Kimlik", "Logo & Kimlik") },
    { icon: "domain", label: L("Kurumsal Görseller", "Kurumsal Görseller") },
    { icon: "conveyor_belt", label: L("Ürün Görselleri", "Ürün Görselleri") },
    { icon: "smart_display", label: L("Videolar", "Videolar") },
    { icon: "video_library", label: L("YouTube İçerikleri", "YouTube İçerikleri") },
    { icon: "volume_up", label: L("Kurumsal Sesler", "Kurumsal Sesler") },
    { icon: "description", label: L("Basın Bültenleri", "Basın Bültenleri") },
    { icon: "menu_book", label: L("Teknik Kataloglar", "Teknik Kataloglar") },
  ];
  const utilItems = [
    { icon: "settings", label: L("Ayarlar", "Ayarlar") },
    { icon: "help", label: L("Destek", "Destek") },
  ];

  return (
    <main className="pt-24">
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        rel="stylesheet"
      />
      <div className="flex w-full flex-col lg:grid lg:grid-cols-[18rem_minmax(0,1fr)] lg:items-stretch xl:grid-cols-[20rem_minmax(0,1fr)]">
        <MediaCenterSidebar
          locale={locale}
          title={L("Medya Merkezi", "Medya Merkezi")}
          subtitle={L("Teknik Arşiv v2.4", "Teknik Arşiv v2.4")}
          mainItems={mainItems}
          patentIcon="lightbulb"
          patentLabel={patentNavByLocale[locale] ?? patentNavByLocale.en}
          utilItems={utilItems}
        />
        <div className="min-w-0 flex-1">
          <MediaHtmlFrame html={html} />
        </div>
      </div>
    </main>
  );
}
