/**
 * Footer i18n — single source of truth for all footer copy.
 *
 * Why this file lives outside `dictionaries/*.json`:
 *  - The footer has ~60+ strings (CTA, pillars, 5 column titles, 36 link labels,
 *    certificates, newsletter, language picker, application areas, etc.).
 *  - Keeping 15 dict files in sync for every footer change is high-friction.
 *  - This module centralizes the strings, with EN as a graceful fallback for
 *    any locale that doesn't have a full translation yet.
 *
 * To add/improve a translation: copy the EN block, replace strings, register it
 * in FOOTER_I18N below — or add `data/footer-locales/{locale}.json` and import it.
 */

import kkFooter from "../../data/footer-locales/kk.json";
import tgFooter from "../../data/footer-locales/tg.json";
import zhFooter from "../../data/footer-locales/zh.json";
import urFooter from "../../data/footer-locales/ur.json";
import ltFooter from "../../data/footer-locales/lt.json";
import plFooter from "../../data/footer-locales/pl.json";
import azFooter from "../../data/footer-locales/az.json";

export type FooterStrings = {
  brandSlogan: string;
  contactLabels: { phone: string; email: string };
  videoTitle: string;
  cta: { title: string; desc: string; button: string; note: string };
  /** 4 pillars, each rendered as two short lines (line1 / line2). */
  pillars: { line1: string; line2: string }[];
  brand: { desc: string };
  contact: { headOffice: string; factory: string };
  sections: {
    products: string;
    solutions: string;
    engineering: string;
    resources: string;
    corporate: string;
  };
  links: {
    products: string[];
    solutions: string[];
    engineering: string[];
    resources: string[];
    corporate: string[];
  };
  certificates: {
    title: string;
    /** Description under each cert code (codes EN 12101-3 / ISO 9001 / ISO 27001 / ISO 14001 / ISO 45001 are universal). */
    items: string[];
    downloadCatalog: string;
    downloadCatalogDesc: string;
  };
  newsletter: { title: string; desc: string; placeholder: string; success: string };
  langTitle: string;
  applicationAreas: {
    title: string;
    items: { line1: string; line2?: string }[];
  };
  globalCaption: { line1: string; line2: string };
  bottom: {
    copyright: string;
    legalCenter: string;
    kvkk: string;
    privacyPolicy: string;
    cookieSettings: string;
    applicationForm: string;
    poweredBy: string;
  };
};

/* ── Turkish (source) ────────────────────────────────────────────────── */

const tr: FooterStrings = {
  brandSlogan: "Born to Flow: Havayı Şekillendiren Mühendislik",
  contactLabels: { phone: "Telefon", email: "E-posta" },
  videoTitle: "Novves tanıtım videosu",
  cta: {
    title: "Projeniz için mühendislik desteğine mi ihtiyacınız var?",
    desc: "Duman tahliye, fan seçimi, CFD analizi ve devreye alma süreçlerinde uzman mühendis ekibimizle yanınızdayız.",
    button: "Projenizi Paylaşın",
    note: "Mühendislerimiz size dönüş yapacaktır.",
  },
  pillars: [
    { line1: "CFD Destekli", line2: "Sistem Tasarımı" },
    { line1: "Doğru Fan Seçimi", line2: "& Danışmanlık" },
    { line1: "Devreye Alma", line2: "& Test" },
    { line1: "Teknik Servis", line2: "& Destek" },
  ],
  brand: {
    desc: "Yangın güvenliği, endüstriyel havalandırma ve hava yönetimi uygulamaları için yüksek performanslı fan sistemleri ve mühendislik çözümleri geliştiriyoruz.",
  },
  contact: { headOffice: "Merkez Ofis", factory: "Üretim Tesisi" },
  sections: {
    products: "ÜRÜNLER",
    solutions: "ÇÖZÜMLER",
    engineering: "MÜHENDİSLİK HİZMETLERİ",
    resources: "KAYNAKLAR",
    corporate: "KURUMSAL",
  },
  links: {
    products: [
      "Duman Tahliye Fanları",
      "Jet Fanlar",
      "Aksiyal Fanlar",
      "Çatı Fanları",
      "Duvar Fanları",
      "ATEX Fanlar",
      "Damper Sistemleri",
      "Otomasyon Panoları",
      "Fan Aksesuarları",
    ],
    solutions: [
      "Kapalı Otopark Havalandırması",
      "Duman ve Isı Tahliye",
      "Tünel ve Metro Havalandırması",
      "Endüstriyel Hava Yönetimi",
      "Konfor Havalandırması",
      "Hijyenik Havalandırma",
      "Patlama Korumalı Sistemler",
    ],
    engineering: [
      "CFD Analizi",
      "Duman Kontrol Tasarımı",
      "Fan Seçimi & Danışmanlık",
      "Proje Danışmanlığı",
      "Devreye Alma",
      "Teknik Servis & Bakım",
      "Test & Raporlama",
    ],
    resources: [
      "Kataloglar",
      "Teknik Dokümanlar",
      "Sertifikalar",
      "Referanslar",
      "Blog",
      "Sıkça Sorulan Sorular",
    ],
    corporate: [
      "NOVVES Hakkında",
      "Üretim Gücümüz",
      "Ekibimiz",
      "Kalite Politikamız",
      "Sürdürülebilirlik",
      "Gizlilik ve Uyum",
      "İletişim",
    ],
  },
  certificates: {
    title: "Sertifikalar & Standartlar",
    items: [
      "Duman ve Isı Kontrol Sistemleri",
      "Kalite Yönetim Sistemi",
      "Bilgi Güvenliği Yönetim Sistemi",
      "Çevre Yönetim Sistemi",
      "İş Sağlığı ve Güvenliği Yönetim Sistemi",
    ],
    downloadCatalog: "SERTİFİKA KATALOĞU İNDİR",
    downloadCatalogDesc: "Sertifika ve standart belgelerimizi indirebilirsiniz.",
  },
  newsletter: {
    title: "Yeniliklerden haberdar olun",
    desc: "Ürünler, projeler ve sektörel gelişmeler hakkında e-bültenimize abone olun.",
    placeholder: "E-posta adresiniz",
    success: "Teşekkürler — kaydedildi.",
  },
  langTitle: "Dil Seçimi",
  applicationAreas: {
    title: "Uygulama Alanları",
    items: [
      { line1: "Kapalı Otoparklar" },
      { line1: "Tüneller" },
      { line1: "Endüstriyel", line2: "Tesisler" },
      { line1: "Hastaneler" },
      { line1: "Oteller" },
      { line1: "Fabrikalar" },
    ],
  },
  globalCaption: { line1: "Global çözümler,", line2: "yerel destek." },
  bottom: {
    copyright: "© 2013 – 2026 NOVVES Elektrik Motor A.Ş.  Tüm Hakları Saklıdır.",
    legalCenter: "Gizlilik ve Uyum",
    kvkk: "KVKK",
    privacyPolicy: "Gizlilik Politikası",
    cookieSettings: "Çerez Politikası",
    applicationForm: "Başvuru Formu",
    poweredBy: "Web Design & Development by",
  },
};

/* ── English (fallback for unspecified locales) ──────────────────────── */

const en: FooterStrings = {
  brandSlogan: "Born to Flow: Engineering That Shapes the Air",
  contactLabels: { phone: "Phone", email: "Email" },
  videoTitle: "Novves company video",
  cta: {
    title: "Need engineering support for your project?",
    desc: "Our expert engineers support you through smoke extraction, fan selection, CFD analysis and commissioning.",
    button: "Share Your Project",
    note: "Our engineers will get back to you.",
  },
  pillars: [
    { line1: "CFD-Driven", line2: "System Design" },
    { line1: "Correct Fan", line2: "Selection & Advisory" },
    { line1: "Commissioning", line2: "& Testing" },
    { line1: "Technical Service", line2: "& Support" },
  ],
  brand: {
    desc: "We develop high-performance fan systems and engineering solutions for fire safety, industrial ventilation and air management.",
  },
  contact: { headOffice: "Head Office", factory: "Manufacturing Plant" },
  sections: {
    products: "PRODUCTS",
    solutions: "SOLUTIONS",
    engineering: "ENGINEERING SERVICES",
    resources: "RESOURCES",
    corporate: "CORPORATE",
  },
  links: {
    products: [
      "Smoke Extraction Fans",
      "Jet Fans",
      "Axial Fans",
      "Roof Fans",
      "Wall Fans",
      "ATEX Fans",
      "Damper Systems",
      "Automation Panels",
      "Fan Accessories",
    ],
    solutions: [
      "Enclosed Car Park Ventilation",
      "Smoke & Heat Extraction",
      "Tunnel & Metro Ventilation",
      "Industrial Air Management",
      "Comfort Ventilation",
      "Hygienic Ventilation",
      "Explosion-Protected Systems",
    ],
    engineering: [
      "CFD Analysis",
      "Smoke Control Design",
      "Fan Selection & Advisory",
      "Project Consulting",
      "Commissioning",
      "Technical Service & Maintenance",
      "Testing & Reporting",
    ],
    resources: [
      "Catalogues",
      "Technical Documents",
      "Certificates",
      "References",
      "Blog",
      "Frequently Asked Questions",
    ],
    corporate: [
      "About NOVVES",
      "Manufacturing Strength",
      "Our Team",
      "Quality Policy",
      "Sustainability",
      "Privacy & Legal Center",
      "Contact",
    ],
  },
  certificates: {
    title: "Certificates & Standards",
    items: [
      "Smoke and Heat Control Systems",
      "Quality Management System",
      "Information Security Management System",
      "Environmental Management System",
      "Occupational Health and Safety Management System",
    ],
    downloadCatalog: "DOWNLOAD CERTIFICATE CATALOGUE",
    downloadCatalogDesc: "Download our certificate and standard documents.",
  },
  newsletter: {
    title: "Stay informed",
    desc: "Subscribe to our newsletter for product, project and industry updates.",
    placeholder: "Your email address",
    success: "Thank you — you're subscribed.",
  },
  langTitle: "Language",
  applicationAreas: {
    title: "Application Areas",
    items: [
      { line1: "Car Parks" },
      { line1: "Tunnels" },
      { line1: "Industrial", line2: "Facilities" },
      { line1: "Hospitals" },
      { line1: "Hotels" },
      { line1: "Factories" },
    ],
  },
  globalCaption: { line1: "Global solutions,", line2: "local support." },
  bottom: {
    copyright: "© 2013 – 2026 NOVVES Electric Motor Inc.  All Rights Reserved.",
    legalCenter: "Privacy & Legal Center",
    kvkk: "KVKK",
    privacyPolicy: "Privacy Policy",
    cookieSettings: "Cookie Policy",
    applicationForm: "Application Form",
    poweredBy: "Web Design & Development by",
  },
};

/* ── Russian ─────────────────────────────────────────────────────────── */

const ru: FooterStrings = {
  brandSlogan: "Born to Flow: Инженерия, формирующая воздух",
  contactLabels: { phone: "Телефон", email: "E-mail" },
  videoTitle: "Корпоративное видео Novves",
  cta: {
    title: "Нужна инженерная поддержка для вашего проекта?",
    desc: "Наша команда инженеров поможет в дымоудалении, подборе вентиляторов, CFD-анализе и пусконаладке.",
    button: "Поделиться проектом",
    note: "Наши инженеры свяжутся с вами.",
  },
  pillars: [
    { line1: "CFD-проектирование", line2: "систем" },
    { line1: "Подбор", line2: "вентиляторов" },
    { line1: "Пусконаладка", line2: "и испытания" },
    { line1: "Технический сервис", line2: "и поддержка" },
  ],
  brand: {
    desc: "Мы разрабатываем высокопроизводительные вентиляционные системы и инженерные решения для пожарной безопасности и промышленной вентиляции.",
  },
  contact: { headOffice: "Головной офис", factory: "Производство" },
  sections: {
    products: "ПРОДУКЦИЯ",
    solutions: "РЕШЕНИЯ",
    engineering: "ИНЖЕНЕРНЫЕ УСЛУГИ",
    resources: "РЕСУРСЫ",
    corporate: "О КОМПАНИИ",
  },
  links: {
    products: [
      "Вентиляторы дымоудаления",
      "Струйные вентиляторы",
      "Осевые вентиляторы",
      "Крышные вентиляторы",
      "Стеновые вентиляторы",
      "ATEX-вентиляторы",
      "Системы клапанов",
      "Шкафы автоматизации",
      "Аксессуары",
    ],
    solutions: [
      "Вентиляция автостоянок",
      "Дымоудаление",
      "Тоннели и метро",
      "Промышленная вентиляция",
      "Комфортная вентиляция",
      "Гигиеническая вентиляция",
      "Взрывозащищённые системы",
    ],
    engineering: [
      "CFD-анализ",
      "Проектирование дымоудаления",
      "Подбор и консультации",
      "Консалтинг проектов",
      "Пусконаладка",
      "Сервис и обслуживание",
      "Испытания и отчёты",
    ],
    resources: [
      "Каталоги",
      "Технические документы",
      "Сертификаты",
      "Референции",
      "Блог",
      "Часто задаваемые вопросы",
    ],
    corporate: [
      "О NOVVES",
      "Производственная мощность",
      "Команда",
      "Политика качества",
      "Устойчивое развитие",
      "Конфиденциальность",
      "Контакты",
    ],
  },
  certificates: {
    title: "Сертификаты и стандарты",
    items: [
      "Системы контроля дыма и тепла",
      "Система менеджмента качества",
      "Система менеджмента информационной безопасности",
      "Система экологического менеджмента",
      "Система менеджмента охраны труда",
    ],
    downloadCatalog: "СКАЧАТЬ КАТАЛОГ СЕРТИФИКАТОВ",
    downloadCatalogDesc: "Скачайте наши сертификаты и документы стандартов.",
  },
  newsletter: {
    title: "Будьте в курсе",
    desc: "Подпишитесь на рассылку о продукции и отраслевых новостях.",
    placeholder: "Ваш e-mail",
    success: "Спасибо — вы подписаны.",
  },
  langTitle: "Язык",
  applicationAreas: {
    title: "Области применения",
    items: [
      { line1: "Автостоянки" },
      { line1: "Тоннели" },
      { line1: "Промышленные", line2: "объекты" },
      { line1: "Больницы" },
      { line1: "Отели" },
      { line1: "Заводы" },
    ],
  },
  globalCaption: { line1: "Глобальные решения,", line2: "локальная поддержка." },
  bottom: {
    copyright: "© 2013 – 2026 NOVVES Electric Motor Inc.  Все права защищены.",
    legalCenter: "Legal Center",
    kvkk: "KVKK",
    privacyPolicy: "Политика конфиденциальности",
    cookieSettings: "Политика cookie",
    applicationForm: "Форма заявки",
    poweredBy: "Веб-разработка от",
  },
};

/* ── Arabic ──────────────────────────────────────────────────────────── */

const ar: FooterStrings = {
  brandSlogan: "Born to Flow: هندسة تشكّل الهواء",
  contactLabels: { phone: "الهاتف", email: "البريد الإلكتروني" },
  videoTitle: "فيديو تعريفي بشركة Novves",
  cta: {
    title: "هل تحتاج إلى دعم هندسي لمشروعك؟",
    desc: "فريق المهندسين لدينا يدعمك في استخراج الدخان واختيار المراوح وتحليل CFD والتشغيل.",
    button: "شارك مشروعك",
    note: "سيتواصل معك مهندسونا.",
  },
  pillars: [
    { line1: "تصميم بأنظمة", line2: "CFD" },
    { line1: "اختيار صحيح", line2: "للمراوح" },
    { line1: "التشغيل", line2: "والاختبار" },
    { line1: "خدمة فنية", line2: "ودعم" },
  ],
  brand: {
    desc: "نطوّر أنظمة مراوح عالية الأداء وحلولاً هندسية للسلامة من الحرائق والتهوية الصناعية وإدارة الهواء.",
  },
  contact: { headOffice: "المكتب الرئيسي", factory: "مصنع الإنتاج" },
  sections: {
    products: "المنتجات",
    solutions: "الحلول",
    engineering: "الخدمات الهندسية",
    resources: "الموارد",
    corporate: "الشركة",
  },
  links: {
    products: [
      "مراوح استخراج الدخان",
      "مراوح نفاثة",
      "مراوح محورية",
      "مراوح السطح",
      "مراوح الجدار",
      "مراوح ATEX",
      "أنظمة الدامبر",
      "لوحات الأتمتة",
      "ملحقات المراوح",
    ],
    solutions: [
      "تهوية المرائب المغلقة",
      "استخراج الدخان والحرارة",
      "تهوية الأنفاق والمترو",
      "إدارة الهواء الصناعي",
      "تهوية الراحة",
      "تهوية صحية",
      "أنظمة الحماية من الانفجار",
    ],
    engineering: [
      "تحليل CFD",
      "تصميم التحكم بالدخان",
      "اختيار المراوح والاستشارة",
      "استشارات المشاريع",
      "التشغيل",
      "الخدمة الفنية والصيانة",
      "الاختبار والتقارير",
    ],
    resources: [
      "الكتالوجات",
      "الوثائق الفنية",
      "الشهادات",
      "المراجع",
      "المدونة",
      "الأسئلة الشائعة",
    ],
    corporate: [
      "عن NOVVES",
      "قوة الإنتاج",
      "فريقنا",
      "سياسة الجودة",
      "الاستدامة",
      "حماية البيانات",
      "اتصل بنا",
    ],
  },
  certificates: {
    title: "الشهادات والمعايير",
    items: [
      "أنظمة التحكم في الدخان والحرارة",
      "نظام إدارة الجودة",
      "نظام إدارة أمن المعلومات",
      "نظام الإدارة البيئية",
      "نظام إدارة الصحة والسلامة المهنية",
    ],
    downloadCatalog: "تنزيل كتالوج الشهادات",
    downloadCatalogDesc: "حمّل شهاداتنا ووثائق المعايير.",
  },
  newsletter: {
    title: "ابقَ على اطلاع",
    desc: "اشترك في النشرة لمتابعة المنتجات والمشاريع وأخبار القطاع.",
    placeholder: "بريدك الإلكتروني",
    success: "شكرًا — تم الاشتراك.",
  },
  langTitle: "اللغة",
  applicationAreas: {
    title: "مجالات التطبيق",
    items: [
      { line1: "المرائب" },
      { line1: "الأنفاق" },
      { line1: "المرافق", line2: "الصناعية" },
      { line1: "المستشفيات" },
      { line1: "الفنادق" },
      { line1: "المصانع" },
    ],
  },
  globalCaption: { line1: "حلول عالمية،", line2: "دعم محلي." },
  bottom: {
    copyright: "© 2013 – 2026 NOVVES Electric Motor Inc.  جميع الحقوق محفوظة.",
    legalCenter: "Legal Center",
    kvkk: "حماية البيانات",
    privacyPolicy: "سياسة الخصوصية",
    cookieSettings: "سياسة الكوكيز",
    applicationForm: "نموذج التقديم",
    poweredBy: "تصميم وتطوير الويب بواسطة",
  },
};

/* ── German ──────────────────────────────────────────────────────────── */

const de: FooterStrings = {
  brandSlogan: "Born to Flow: Ingenieurkunst, die Luft formt",
  contactLabels: { phone: "Telefon", email: "E-Mail" },
  videoTitle: "Novves Unternehmensvideo",
  cta: {
    title: "Brauchen Sie technische Unterstützung für Ihr Projekt?",
    desc: "Unser Ingenieurteam unterstützt Sie bei Entrauchung, Ventilatorauswahl, CFD-Analyse und Inbetriebnahme.",
    button: "Projekt teilen",
    note: "Unsere Ingenieure melden sich bei Ihnen.",
  },
  pillars: [
    { line1: "CFD-gestützte", line2: "Systemauslegung" },
    { line1: "Richtige", line2: "Ventilatorauswahl" },
    { line1: "Inbetriebnahme", line2: "& Tests" },
    { line1: "Technischer", line2: "Service & Support" },
  ],
  brand: {
    desc: "Wir entwickeln Hochleistungs-Ventilatorsysteme und Engineering-Lösungen für Brandschutz, Industrielüftung und Luftmanagement.",
  },
  contact: { headOffice: "Hauptsitz", factory: "Produktionsstätte" },
  sections: {
    products: "PRODUKTE",
    solutions: "LÖSUNGEN",
    engineering: "ENGINEERING-LEISTUNGEN",
    resources: "RESSOURCEN",
    corporate: "UNTERNEHMEN",
  },
  links: {
    products: [
      "Entrauchungsventilatoren",
      "Jet-Ventilatoren",
      "Axialventilatoren",
      "Dachventilatoren",
      "Wandventilatoren",
      "ATEX-Ventilatoren",
      "Klappensysteme",
      "Automatisierungsschränke",
      "Ventilatorzubehör",
    ],
    solutions: [
      "Tiefgaragenentrauchung",
      "Rauch- und Wärmeabzug",
      "Tunnel- und Metrolüftung",
      "Industrielle Luftführung",
      "Komfortlüftung",
      "Hygienische Lüftung",
      "Explosionsgeschützte Systeme",
    ],
    engineering: [
      "CFD-Analyse",
      "Entrauchungsplanung",
      "Ventilatorauswahl & Beratung",
      "Projektberatung",
      "Inbetriebnahme",
      "Technischer Service & Wartung",
      "Tests & Berichte",
    ],
    resources: [
      "Kataloge",
      "Technische Unterlagen",
      "Zertifikate",
      "Referenzen",
      "Blog",
      "Häufig gestellte Fragen",
    ],
    corporate: [
      "Über NOVVES",
      "Produktionsstärke",
      "Team",
      "Qualitätsrichtlinie",
      "Nachhaltigkeit",
      "Datenschutz",
      "Kontakt",
    ],
  },
  certificates: {
    title: "Zertifikate & Normen",
    items: [
      "Rauch- und Wärmekontrollsysteme",
      "Qualitätsmanagementsystem",
      "Informationssicherheits-Managementsystem",
      "Umweltmanagementsystem",
      "Arbeitsschutz-Managementsystem",
    ],
    downloadCatalog: "ZERTIFIKAT-KATALOG HERUNTERLADEN",
    downloadCatalogDesc: "Laden Sie unsere Zertifikate und Standarddokumente herunter.",
  },
  newsletter: {
    title: "Bleiben Sie informiert",
    desc: "Abonnieren Sie unseren Newsletter zu Produkten und Branchenneuigkeiten.",
    placeholder: "Ihre E-Mail-Adresse",
    success: "Danke — Sie sind angemeldet.",
  },
  langTitle: "Sprache",
  applicationAreas: {
    title: "Anwendungsbereiche",
    items: [
      { line1: "Tiefgaragen" },
      { line1: "Tunnel" },
      { line1: "Industrie-", line2: "anlagen" },
      { line1: "Krankenhäuser" },
      { line1: "Hotels" },
      { line1: "Fabriken" },
    ],
  },
  globalCaption: { line1: "Globale Lösungen,", line2: "lokale Unterstützung." },
  bottom: {
    copyright: "© 2013 – 2026 NOVVES Electric Motor Inc.  Alle Rechte vorbehalten.",
    legalCenter: "Legal Center",
    kvkk: "Datenschutz",
    privacyPolicy: "Datenschutzerklärung",
    cookieSettings: "Cookie-Richtlinie",
    applicationForm: "Antragsformular",
    poweredBy: "Webdesign & Entwicklung von",
  },
};

/* ── French ──────────────────────────────────────────────────────────── */

const fr: FooterStrings = {
  brandSlogan: "Born to Flow : L'ingénierie qui façonne l'air",
  contactLabels: { phone: "Téléphone", email: "E-mail" },
  videoTitle: "Vidéo de présentation Novves",
  cta: {
    title: "Besoin d'un accompagnement technique pour votre projet ?",
    desc: "Nos ingénieurs vous accompagnent en désenfumage, sélection de ventilateurs, analyse CFD et mise en service.",
    button: "Partager votre projet",
    note: "Nos ingénieurs vous recontacteront.",
  },
  pillars: [
    { line1: "Conception", line2: "assistée par CFD" },
    { line1: "Bon choix", line2: "de ventilateur" },
    { line1: "Mise en service", line2: "& tests" },
    { line1: "Service technique", line2: "& support" },
  ],
  brand: {
    desc: "Nous concevons des systèmes de ventilation haute performance et des solutions d'ingénierie pour la sécurité incendie et la ventilation industrielle.",
  },
  contact: { headOffice: "Siège social", factory: "Site de production" },
  sections: {
    products: "PRODUITS",
    solutions: "SOLUTIONS",
    engineering: "SERVICES D'INGÉNIERIE",
    resources: "RESSOURCES",
    corporate: "ENTREPRISE",
  },
  links: {
    products: [
      "Ventilateurs de désenfumage",
      "Jet fans",
      "Ventilateurs axiaux",
      "Ventilateurs de toiture",
      "Ventilateurs muraux",
      "Ventilateurs ATEX",
      "Systèmes de clapets",
      "Armoires d'automatisation",
      "Accessoires",
    ],
    solutions: [
      "Ventilation des parkings",
      "Désenfumage",
      "Tunnels et métro",
      "Gestion d'air industrielle",
      "Ventilation de confort",
      "Ventilation hygiénique",
      "Systèmes antidéflagrants",
    ],
    engineering: [
      "Analyse CFD",
      "Conception désenfumage",
      "Sélection et conseil",
      "Conseil projet",
      "Mise en service",
      "Service & maintenance",
      "Essais & rapports",
    ],
    resources: [
      "Catalogues",
      "Documents techniques",
      "Certificats",
      "Références",
      "Blog",
      "Questions fréquentes",
    ],
    corporate: [
      "À propos de NOVVES",
      "Capacité de production",
      "Équipe",
      "Politique qualité",
      "Durabilité",
      "Confidentialité",
      "Contact",
    ],
  },
  certificates: {
    title: "Certificats & Normes",
    items: [
      "Systèmes de contrôle de fumée et chaleur",
      "Système de management de la qualité",
      "Système de management de la sécurité de l'information",
      "Système de management environnemental",
      "Système de management de la santé et sécurité au travail",
    ],
    downloadCatalog: "TÉLÉCHARGER CATALOGUE CERTIFICATS",
    downloadCatalogDesc: "Téléchargez nos certificats et documents standards.",
  },
  newsletter: {
    title: "Restez informé",
    desc: "Abonnez-vous à notre newsletter sur les produits et l'actualité du secteur.",
    placeholder: "Votre adresse e-mail",
    success: "Merci — vous êtes inscrit.",
  },
  langTitle: "Langue",
  applicationAreas: {
    title: "Domaines d'application",
    items: [
      { line1: "Parkings" },
      { line1: "Tunnels" },
      { line1: "Installations", line2: "industrielles" },
      { line1: "Hôpitaux" },
      { line1: "Hôtels" },
      { line1: "Usines" },
    ],
  },
  globalCaption: { line1: "Solutions globales,", line2: "support local." },
  bottom: {
    copyright: "© 2013 – 2026 NOVVES Electric Motor Inc.  Tous droits réservés.",
    legalCenter: "Legal Center",
    kvkk: "Données personnelles",
    privacyPolicy: "Politique de confidentialité",
    cookieSettings: "Politique cookies",
    applicationForm: "Formulaire de demande",
    poweredBy: "Conception & développement web par",
  },
};

/* ── Italian ─────────────────────────────────────────────────────────── */

const it: FooterStrings = {
  brandSlogan: "Born to Flow: L'ingegneria che plasma l'aria",
  contactLabels: { phone: "Telefono", email: "E-mail" },
  videoTitle: "Video aziendale Novves",
  cta: {
    title: "Hai bisogno di supporto ingegneristico per il tuo progetto?",
    desc: "I nostri ingegneri ti supportano in evacuazione fumi, scelta dei ventilatori, analisi CFD e messa in servizio.",
    button: "Condividi il tuo progetto",
    note: "I nostri ingegneri ti contatteranno.",
  },
  pillars: [
    { line1: "Progettazione", line2: "assistita da CFD" },
    { line1: "Corretta scelta", line2: "del ventilatore" },
    { line1: "Messa in servizio", line2: "& test" },
    { line1: "Servizio tecnico", line2: "& supporto" },
  ],
  brand: {
    desc: "Sviluppiamo sistemi di ventilazione ad alte prestazioni e soluzioni ingegneristiche per sicurezza antincendio e ventilazione industriale.",
  },
  contact: { headOffice: "Sede centrale", factory: "Stabilimento" },
  sections: {
    products: "PRODOTTI",
    solutions: "SOLUZIONI",
    engineering: "SERVIZI INGEGNERISTICI",
    resources: "RISORSE",
    corporate: "AZIENDA",
  },
  links: {
    products: [
      "Ventilatori evacuazione fumi",
      "Jet fan",
      "Ventilatori assiali",
      "Ventilatori da tetto",
      "Ventilatori a parete",
      "Ventilatori ATEX",
      "Sistemi di serrande",
      "Quadri di automazione",
      "Accessori",
    ],
    solutions: [
      "Ventilazione parcheggi",
      "Evacuazione fumi e calore",
      "Tunnel e metro",
      "Gestione aria industriale",
      "Ventilazione comfort",
      "Ventilazione igienica",
      "Sistemi antideflagranti",
    ],
    engineering: [
      "Analisi CFD",
      "Progettazione controllo fumi",
      "Scelta e consulenza ventilatori",
      "Consulenza progetti",
      "Messa in servizio",
      "Servizio & manutenzione",
      "Test & report",
    ],
    resources: [
      "Cataloghi",
      "Documenti tecnici",
      "Certificati",
      "Referenze",
      "Blog",
      "Domande frequenti",
    ],
    corporate: [
      "Chi siamo",
      "Capacità produttiva",
      "Team",
      "Politica qualità",
      "Sostenibilità",
      "Privacy",
      "Contatti",
    ],
  },
  certificates: {
    title: "Certificati & Standard",
    items: [
      "Sistemi di controllo fumo e calore",
      "Sistema di gestione qualità",
      "Sistema di gestione sicurezza informazioni",
      "Sistema di gestione ambientale",
      "Sistema di gestione salute e sicurezza",
    ],
    downloadCatalog: "SCARICA CATALOGO CERTIFICATI",
    downloadCatalogDesc: "Scarica i nostri certificati e documenti standard.",
  },
  newsletter: {
    title: "Resta aggiornato",
    desc: "Iscriviti alla nostra newsletter su prodotti e novità del settore.",
    placeholder: "Il tuo indirizzo e-mail",
    success: "Grazie — iscrizione completata.",
  },
  langTitle: "Lingua",
  applicationAreas: {
    title: "Aree di applicazione",
    items: [
      { line1: "Parcheggi" },
      { line1: "Tunnel" },
      { line1: "Impianti", line2: "industriali" },
      { line1: "Ospedali" },
      { line1: "Hotel" },
      { line1: "Fabbriche" },
    ],
  },
  globalCaption: { line1: "Soluzioni globali,", line2: "supporto locale." },
  bottom: {
    copyright: "© 2013 – 2026 NOVVES Electric Motor Inc.  Tutti i diritti riservati.",
    legalCenter: "Legal Center",
    kvkk: "Privacy",
    privacyPolicy: "Privacy Policy",
    cookieSettings: "Politica cookie",
    applicationForm: "Modulo di richiesta",
    poweredBy: "Web design & sviluppo di",
  },
};

/* ── Spanish ─────────────────────────────────────────────────────────── */

const es: FooterStrings = {
  brandSlogan: "Born to Flow: Ingeniería que da forma al aire",
  contactLabels: { phone: "Teléfono", email: "Correo electrónico" },
  videoTitle: "Vídeo corporativo de Novves",
  cta: {
    title: "¿Necesitas soporte de ingeniería para tu proyecto?",
    desc: "Nuestros ingenieros te apoyan en extracción de humos, selección de ventiladores, análisis CFD y puesta en marcha.",
    button: "Comparte tu proyecto",
    note: "Nuestros ingenieros se pondrán en contacto.",
  },
  pillars: [
    { line1: "Diseño asistido", line2: "por CFD" },
    { line1: "Selección correcta", line2: "de ventilador" },
    { line1: "Puesta en marcha", line2: "& pruebas" },
    { line1: "Servicio técnico", line2: "& soporte" },
  ],
  brand: {
    desc: "Desarrollamos sistemas de ventilación de alto rendimiento y soluciones de ingeniería para seguridad contra incendios y ventilación industrial.",
  },
  contact: { headOffice: "Oficina central", factory: "Planta de producción" },
  sections: {
    products: "PRODUCTOS",
    solutions: "SOLUCIONES",
    engineering: "SERVICIOS DE INGENIERÍA",
    resources: "RECURSOS",
    corporate: "EMPRESA",
  },
  links: {
    products: [
      "Ventiladores de extracción de humo",
      "Jet fans",
      "Ventiladores axiales",
      "Ventiladores de cubierta",
      "Ventiladores de pared",
      "Ventiladores ATEX",
      "Sistemas de compuertas",
      "Cuadros de automatización",
      "Accesorios",
    ],
    solutions: [
      "Ventilación de aparcamientos",
      "Extracción de humo y calor",
      "Túneles y metro",
      "Gestión de aire industrial",
      "Ventilación de confort",
      "Ventilación higiénica",
      "Sistemas antideflagrantes",
    ],
    engineering: [
      "Análisis CFD",
      "Diseño de control de humos",
      "Selección y asesoría",
      "Consultoría de proyectos",
      "Puesta en marcha",
      "Servicio y mantenimiento",
      "Pruebas e informes",
    ],
    resources: [
      "Catálogos",
      "Documentos técnicos",
      "Certificados",
      "Referencias",
      "Blog",
      "Preguntas frecuentes",
    ],
    corporate: [
      "Acerca de NOVVES",
      "Capacidad productiva",
      "Equipo",
      "Política de calidad",
      "Sostenibilidad",
      "Privacidad",
      "Contacto",
    ],
  },
  certificates: {
    title: "Certificados y Normas",
    items: [
      "Sistemas de control de humo y calor",
      "Sistema de gestión de calidad",
      "Sistema de gestión de seguridad de la información",
      "Sistema de gestión ambiental",
      "Sistema de gestión de salud y seguridad",
    ],
    downloadCatalog: "DESCARGAR CATÁLOGO CERTIFICADOS",
    downloadCatalogDesc: "Descarga nuestros certificados y documentos estándar.",
  },
  newsletter: {
    title: "Mantente informado",
    desc: "Suscríbete a nuestra newsletter para novedades de productos y sector.",
    placeholder: "Tu correo electrónico",
    success: "Gracias — ya estás suscrito.",
  },
  langTitle: "Idioma",
  applicationAreas: {
    title: "Áreas de aplicación",
    items: [
      { line1: "Aparcamientos" },
      { line1: "Túneles" },
      { line1: "Instalaciones", line2: "industriales" },
      { line1: "Hospitales" },
      { line1: "Hoteles" },
      { line1: "Fábricas" },
    ],
  },
  globalCaption: { line1: "Soluciones globales,", line2: "soporte local." },
  bottom: {
    copyright: "© 2013 – 2026 NOVVES Electric Motor Inc.  Todos los derechos reservados.",
    legalCenter: "Legal Center",
    kvkk: "Privacidad",
    privacyPolicy: "Política de privacidad",
    cookieSettings: "Política de cookies",
    applicationForm: "Formulario de solicitud",
    poweredBy: "Diseño y desarrollo web por",
  },
};

function withLegalHubLabel(base: FooterStrings, label: string): FooterStrings {
  const corporate = [...base.links.corporate];
  if (corporate.length > 5) corporate[5] = label;
  return {
    ...base,
    links: { ...base.links, corporate },
    bottom: { ...base.bottom, legalCenter: label },
  };
}

const FOOTER_I18N: Record<string, FooterStrings> = {
  tr,
  en: withLegalHubLabel(en, "Privacy and Compliance"),
  ru: withLegalHubLabel(ru, "Конфиденциальность и соответствие требованиям"),
  ar: withLegalHubLabel(ar, "الخصوصية والامتثال"),
  de: withLegalHubLabel(de, "Datenschutz und Compliance"),
  fr: withLegalHubLabel(fr, "Confidentialité et conformité"),
  it: withLegalHubLabel(it, "Privacy e conformità"),
  es: withLegalHubLabel(es, "Privacidad y cumplimiento"),
  az: azFooter as FooterStrings,
  kk: kkFooter as FooterStrings,
  tg: tgFooter as FooterStrings,
  zh: zhFooter as FooterStrings,
  ur: urFooter as FooterStrings,
  lt: ltFooter as FooterStrings,
  pl: plFooter as FooterStrings,
};

export function getFooterStrings(locale: string): FooterStrings {
  return FOOTER_I18N[locale] ?? en;
}
