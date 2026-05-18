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
 * in FOOTER_I18N below.
 */

export type FooterStrings = {
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
    /** Description under each cert code (codes EN 12101-3 / AMCA 210 / ISO 9001 / ISO 45001 / CE are universal). */
    items: string[];
    downloadCatalog: string;
    downloadCatalogDesc: string;
  };
  newsletter: { title: string; desc: string; placeholder: string };
  langTitle: string;
  applicationAreas: {
    title: string;
    items: { line1: string; line2?: string }[];
  };
  globalCaption: { line1: string; line2: string };
  bottom: {
    copyright: string;
    kvkk: string;
    privacyPolicy: string;
    cookieSettings: string;
    applicationForm: string;
    poweredBy: string;
  };
};

/* ── Turkish (source) ────────────────────────────────────────────────── */

const tr: FooterStrings = {
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
      "KVKK ve Gizlilik",
      "İletişim",
    ],
  },
  certificates: {
    title: "Sertifikalar & Standartlar",
    items: [
      "Duman ve Isı Kontrol Sistemleri",
      "Laboratuvar Testli Performans",
      "Çevre Yönetim Sistemi",
      "İş Sağlığı ve Güvenliği Yönetim Sistemi",
      "Avrupa Birliği Uygunluk",
    ],
    downloadCatalog: "KATALOG İNDİR",
    downloadCatalogDesc: "Tüm ürün kataloglarımızı indirebilirsiniz.",
  },
  newsletter: {
    title: "Yeniliklerden haberdar olun",
    desc: "Ürünler, projeler ve sektörel gelişmeler hakkında e-bültenimize abone olun.",
    placeholder: "E-posta adresiniz",
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
    kvkk: "KVKK",
    privacyPolicy: "Gizlilik Politikası",
    cookieSettings: "Çerez Politikası",
    applicationForm: "Başvuru Formu",
    poweredBy: "Web Design & Development by",
  },
};

/* ── English (fallback for unspecified locales) ──────────────────────── */

const en: FooterStrings = {
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
      "KVKK & Privacy",
      "Contact",
    ],
  },
  certificates: {
    title: "Certificates & Standards",
    items: [
      "Smoke and Heat Control Systems",
      "Laboratory Tested Performance",
      "Environmental Management System",
      "Occupational Health & Safety Management",
      "European Union Conformity",
    ],
    downloadCatalog: "DOWNLOAD CATALOGUE",
    downloadCatalogDesc: "Download all our product catalogues.",
  },
  newsletter: {
    title: "Stay informed",
    desc: "Subscribe to our newsletter for product, project and industry updates.",
    placeholder: "Your email address",
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
    kvkk: "KVKK",
    privacyPolicy: "Privacy Policy",
    cookieSettings: "Cookie Policy",
    applicationForm: "Application Form",
    poweredBy: "Web Design & Development by",
  },
};

/* ── Russian ─────────────────────────────────────────────────────────── */

const ru: FooterStrings = {
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
      "Системы дымо- и теплоудаления",
      "Лабораторно испытанные характеристики",
      "Управление окружающей средой",
      "Охрана труда и безопасность",
      "Соответствие ЕС",
    ],
    downloadCatalog: "СКАЧАТЬ КАТАЛОГ",
    downloadCatalogDesc: "Скачайте все каталоги продукции.",
  },
  newsletter: {
    title: "Будьте в курсе",
    desc: "Подпишитесь на рассылку о продукции и отраслевых новостях.",
    placeholder: "Ваш e-mail",
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
    kvkk: "KVKK",
    privacyPolicy: "Политика конфиденциальности",
    cookieSettings: "Политика cookie",
    applicationForm: "Форма заявки",
    poweredBy: "Веб-разработка от",
  },
};

/* ── Arabic ──────────────────────────────────────────────────────────── */

const ar: FooterStrings = {
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
      "أنظمة التحكم بالدخان والحرارة",
      "أداء مختبر تجريبياً",
      "نظام الإدارة البيئية",
      "إدارة الصحة والسلامة المهنية",
      "مطابقة الاتحاد الأوروبي",
    ],
    downloadCatalog: "تنزيل الكتالوج",
    downloadCatalogDesc: "حمّل جميع كتالوجات منتجاتنا.",
  },
  newsletter: {
    title: "ابقَ على اطلاع",
    desc: "اشترك في النشرة لمتابعة المنتجات والمشاريع وأخبار القطاع.",
    placeholder: "بريدك الإلكتروني",
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
    kvkk: "حماية البيانات",
    privacyPolicy: "سياسة الخصوصية",
    cookieSettings: "سياسة الكوكيز",
    applicationForm: "نموذج التقديم",
    poweredBy: "تصميم وتطوير الويب بواسطة",
  },
};

/* ── German ──────────────────────────────────────────────────────────── */

const de: FooterStrings = {
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
      "Rauch- und Wärmesteuerungsanlagen",
      "Laborgeprüfte Leistung",
      "Umweltmanagementsystem",
      "Arbeits- und Gesundheitsschutz",
      "EU-Konformität",
    ],
    downloadCatalog: "KATALOG DOWNLOAD",
    downloadCatalogDesc: "Laden Sie alle Produktkataloge herunter.",
  },
  newsletter: {
    title: "Bleiben Sie informiert",
    desc: "Abonnieren Sie unseren Newsletter zu Produkten und Branchenneuigkeiten.",
    placeholder: "Ihre E-Mail-Adresse",
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
    kvkk: "Datenschutz",
    privacyPolicy: "Datenschutzerklärung",
    cookieSettings: "Cookie-Richtlinie",
    applicationForm: "Antragsformular",
    poweredBy: "Webdesign & Entwicklung von",
  },
};

/* ── French ──────────────────────────────────────────────────────────── */

const fr: FooterStrings = {
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
      "Systèmes de contrôle des fumées",
      "Performance testée en laboratoire",
      "Système de management environnemental",
      "Santé et sécurité au travail",
      "Conformité européenne",
    ],
    downloadCatalog: "TÉLÉCHARGER CATALOGUE",
    downloadCatalogDesc: "Téléchargez tous nos catalogues produits.",
  },
  newsletter: {
    title: "Restez informé",
    desc: "Abonnez-vous à notre newsletter sur les produits et l'actualité du secteur.",
    placeholder: "Votre adresse e-mail",
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
    kvkk: "Données personnelles",
    privacyPolicy: "Politique de confidentialité",
    cookieSettings: "Politique cookies",
    applicationForm: "Formulaire de demande",
    poweredBy: "Conception & développement web par",
  },
};

/* ── Italian ─────────────────────────────────────────────────────────── */

const it: FooterStrings = {
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
      "Sistemi controllo fumi e calore",
      "Prestazioni testate in laboratorio",
      "Sistema di gestione ambientale",
      "Salute e sicurezza sul lavoro",
      "Conformità UE",
    ],
    downloadCatalog: "SCARICA CATALOGO",
    downloadCatalogDesc: "Scarica tutti i nostri cataloghi prodotti.",
  },
  newsletter: {
    title: "Resta aggiornato",
    desc: "Iscriviti alla nostra newsletter su prodotti e novità del settore.",
    placeholder: "Il tuo indirizzo e-mail",
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
    kvkk: "Privacy",
    privacyPolicy: "Privacy Policy",
    cookieSettings: "Politica cookie",
    applicationForm: "Modulo di richiesta",
    poweredBy: "Web design & sviluppo di",
  },
};

/* ── Spanish ─────────────────────────────────────────────────────────── */

const es: FooterStrings = {
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
      "Sistemas de control de humos y calor",
      "Rendimiento probado en laboratorio",
      "Sistema de gestión ambiental",
      "Salud y seguridad laboral",
      "Conformidad europea",
    ],
    downloadCatalog: "DESCARGAR CATÁLOGO",
    downloadCatalogDesc: "Descarga todos nuestros catálogos.",
  },
  newsletter: {
    title: "Mantente informado",
    desc: "Suscríbete a nuestra newsletter para novedades de productos y sector.",
    placeholder: "Tu correo electrónico",
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
    kvkk: "Privacidad",
    privacyPolicy: "Política de privacidad",
    cookieSettings: "Política de cookies",
    applicationForm: "Formulario de solicitud",
    poweredBy: "Diseño y desarrollo web por",
  },
};

/* ── Azerbaijani (close to TR — quick adaptation) ────────────────────── */

const az: FooterStrings = {
  cta: {
    title: "Layihəniz üçün mühəndislik dəstəyinə ehtiyacınız var?",
    desc: "Tüstü tahliyəsi, fan seçimi, CFD analizi və istismara qəbul mərhələlərində mütəxəssis komandamızla yanınızdayıq.",
    button: "Layihənizi paylaşın",
    note: "Mühəndislərimiz sizinlə əlaqə saxlayacaq.",
  },
  pillars: [
    { line1: "CFD əsaslı", line2: "sistem dizaynı" },
    { line1: "Düzgün fan", line2: "seçimi" },
    { line1: "İstismara qəbul", line2: "& test" },
    { line1: "Texniki xidmət", line2: "& dəstək" },
  ],
  brand: {
    desc: "Yanğın təhlükəsizliyi, sənaye ventilyasiyası və hava idarəetməsi üçün yüksək performanslı fan sistemləri hazırlayırıq.",
  },
  contact: { headOffice: "Baş ofis", factory: "İstehsal müəssisəsi" },
  sections: {
    products: "MƏHSULLAR",
    solutions: "HƏLLƏR",
    engineering: "MÜHƏNDİSLİK XİDMƏTLƏRİ",
    resources: "RESURSLAR",
    corporate: "ŞİRKƏT",
  },
  links: en.links, // Use English for less-common locale; refine later
  certificates: {
    ...en.certificates,
    title: "Sertifikatlar və Standartlar",
    downloadCatalog: "KATALOQU YÜKLƏ",
    downloadCatalogDesc: "Bütün məhsul kataloqlarımızı yükləyə bilərsiniz.",
  },
  newsletter: {
    title: "Xəbərdar olun",
    desc: "Məhsul və sənaye yenilikləri üçün bülletenimizə abunə olun.",
    placeholder: "E-poçt ünvanınız",
  },
  langTitle: "Dil",
  applicationAreas: {
    title: "Tətbiq sahələri",
    items: [
      { line1: "Avtomobil" , line2: "dayanacaqları"},
      { line1: "Tunellər" },
      { line1: "Sənaye", line2: "obyektləri" },
      { line1: "Xəstəxanalar" },
      { line1: "Otellər" },
      { line1: "Fabriklər" },
    ],
  },
  globalCaption: { line1: "Qlobal həllər,", line2: "yerli dəstək." },
  bottom: {
    copyright: "© 2013 – 2026 NOVVES Electric Motor Inc.  Bütün hüquqlar qorunur.",
    kvkk: "Məxfilik",
    privacyPolicy: "Məxfilik siyasəti",
    cookieSettings: "Kuki siyasəti",
    applicationForm: "Müraciət forması",
    poweredBy: "Veb dizayn və inkişaf",
  },
};

/* ── Locales without dedicated translation fall back to English ─────── */
/* For: kk, tg, zh, ur, lt, pl — admin can refine later via PRs.       */

const FOOTER_I18N: Record<string, FooterStrings> = {
  tr,
  en,
  ru,
  ar,
  de,
  fr,
  it,
  es,
  az,
  // Fallbacks — point to English until proper translations land
  kk: en,
  tg: en,
  zh: en,
  ur: en,
  lt: en,
  pl: en,
};

export function getFooterStrings(locale: string): FooterStrings {
  return FOOTER_I18N[locale] ?? en;
}
