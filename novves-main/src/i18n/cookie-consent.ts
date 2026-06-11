import type { Locale } from "./config";

/** Çerez iletişim kutusu — yalnızca seçilen locale kaydı kullanılır, başka dile düşülmez */
export type CookieConsentStrings = {
  badgePrefix: string;
  badgeWord: string;
  complianceBadges: string;
  title: string;
  desc: string;
  learnMore: string;
  acceptAll: string;
  rejectAll: string;
  customize: string;
  savePrefs: string;
  back: string;
  categories: {
    essential: { title: string; desc: string; tag: string };
    analytics: { title: string; desc: string };
    marketing: { title: string; desc: string };
  };
};

export const cookieConsentByLocale: Record<Locale, CookieConsentStrings> = {
  tr: {
    badgePrefix: "● ",
    badgeWord: "Çerez",
    complianceBadges: "GDPR / KVKK",
    title: "Çerez Tercihlerinizi Yönetin",
    desc: "Deneyiminizi iyileştirmek, site trafiğini analiz etmek ve içerikleri kişiselleştirmek için çerezler kullanıyoruz. 'Tümünü Kabul Et' diyerek tüm çerezlere izin verebilir veya tercihlerinizi özelleştirebilirsiniz.",
    learnMore: "Gizlilik politikası",
    acceptAll: "Tümünü Kabul Et",
    rejectAll: "Tümünü Reddet",
    customize: "Özelleştir",
    savePrefs: "Tercihlerimi Kaydet",
    back: "Geri",
    categories: {
      essential: {
        title: "Zorunlu Çerezler",
        desc: "Sitenin temel işlevleri için gereklidir. Devre dışı bırakılamaz.",
        tag: "Zorunlu",
      },
      analytics: {
        title: "Analitik Çerezler",
        desc: "Ziyaretçi sayısı, trafik kaynağı ve site kullanımı hakkında anonim veri toplar.",
      },
      marketing: {
        title: "Pazarlama Çerezleri",
        desc: "İlgi alanlarınıza göre içerik ve reklam göstermek için kullanılır.",
      },
    },
  },
  en: {
    badgePrefix: "● ",
    badgeWord: "Cookie",
    complianceBadges: "GDPR / KVKK",
    title: "Manage Your Cookie Preferences",
    desc: "We use cookies to improve your experience, analyze site traffic, and personalize content. Click 'Accept All' to allow all cookies or customize your preferences.",
    learnMore: "Privacy policy",
    acceptAll: "Accept All",
    rejectAll: "Reject All",
    customize: "Customize",
    savePrefs: "Save Preferences",
    back: "Back",
    categories: {
      essential: {
        title: "Essential Cookies",
        desc: "Required for the basic functionality of the site. Cannot be disabled.",
        tag: "Required",
      },
      analytics: {
        title: "Analytics Cookies",
        desc: "Collect anonymous data about visitor counts, traffic sources, and site usage.",
      },
      marketing: {
        title: "Marketing Cookies",
        desc: "Used to show content and advertisements based on your interests.",
      },
    },
  },
  ru: {
    badgePrefix: "● ",
    badgeWord: "Cookie",
    complianceBadges: "GDPR / KVKK",
    title: "Управление настройками cookie",
    desc: "Мы используем файлы cookie для улучшения работы сайта, анализа трафика и персонализации контента. Нажмите «Принять все», чтобы разрешить все файлы cookie, или настройте предпочтения вручную.",
    learnMore: "Политика конфиденциальности",
    acceptAll: "Принять все",
    rejectAll: "Отклонить все",
    customize: "Настроить",
    savePrefs: "Сохранить настройки",
    back: "Назад",
    categories: {
      essential: {
        title: "Обязательные cookie",
        desc: "Необходимы для базовой работы сайта. Нельзя отключить.",
        tag: "Обязательно",
      },
      analytics: {
        title: "Аналитические cookie",
        desc: "Собирают анонимные данные о посещаемости, источниках трафика и использовании сайта.",
      },
      marketing: {
        title: "Маркетинговые cookie",
        desc: "Используются для показа контента и рекламы на основе ваших интересов.",
      },
    },
  },
  ar: {
    badgePrefix: "● ",
    badgeWord: "ملفات الارتباط",
    complianceBadges: "GDPR / حماية البيانات",
    title: "إدارة تفضيلات ملفات تعريف الارتباط",
    desc: "نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتحليل حركة المرور وتخصيص المحتوى. اضغط «قبول الكل» للسماح بجميع ملفات تعريف الارتباط أو خصّص تفضيلاتك.",
    learnMore: "سياسة الخصوصية",
    acceptAll: "قبول الكل",
    rejectAll: "رفض الكل",
    customize: "تخصيص",
    savePrefs: "حفظ التفضيلات",
    back: "رجوع",
    categories: {
      essential: {
        title: "ملفات تعريف الارتباط الأساسية",
        desc: "ضرورية لعمل الموقع الأساسي. لا يمكن تعطيلها.",
        tag: "إلزامي",
      },
      analytics: {
        title: "ملفات تعريف الارتباط التحليلية",
        desc: "تجمع بيانات مجهولة عن عدد الزوار ومصادر الزيارات واستخدام الموقع.",
      },
      marketing: {
        title: "ملفات تعريف الارتباط التسويقية",
        desc: "تُستخدم لعرض المحتوى والإعلانات وفق اهتماماتك.",
      },
    },
  },
  de: {
    badgePrefix: "● ",
    badgeWord: "Cookies",
    complianceBadges: "DSGVO / GDPR",
    title: "Cookie-Einstellungen verwalten",
    desc: "Wir verwenden Cookies, um Ihre Erfahrung zu verbessern, den Datenverkehr zu analysieren und Inhalte zu personalisieren. Klicken Sie auf „Alle akzeptieren“, um alle Cookies zuzulassen, oder passen Sie Ihre Auswahl an.",
    learnMore: "Datenschutzerklärung",
    acceptAll: "Alle akzeptieren",
    rejectAll: "Alle ablehnen",
    customize: "Anpassen",
    savePrefs: "Einstellungen speichern",
    back: "Zurück",
    categories: {
      essential: {
        title: "Notwendige Cookies",
        desc: "Erforderlich für die Grundfunktionen der Website. Können nicht deaktiviert werden.",
        tag: "Pflicht",
      },
      analytics: {
        title: "Analyse-Cookies",
        desc: "Erfassen anonyme Daten zu Besucherzahlen, Verkehrsquellen und Nutzung der Website.",
      },
      marketing: {
        title: "Marketing-Cookies",
        desc: "Werden genutzt, um Inhalte und Werbung entsprechend Ihren Interessen anzuzeigen.",
      },
    },
  },
  it: {
    badgePrefix: "● ",
    badgeWord: "Cookie",
    complianceBadges: "GDPR / KVKK",
    title: "Gestisci le preferenze sui cookie",
    desc: "Utilizziamo i cookie per migliorare l'esperienza, analizzare il traffico e personalizzare i contenuti. Fai clic su «Accetta tutti» per consentire tutti i cookie oppure personalizza.",
    learnMore: "Informativa sulla privacy",
    acceptAll: "Accetta tutti",
    rejectAll: "Rifiuta tutti",
    customize: "Personalizza",
    savePrefs: "Salva preferenze",
    back: "Indietro",
    categories: {
      essential: {
        title: "Cookie necessari",
        desc: "Necessari per il funzionamento di base del sito. Non possono essere disattivati.",
        tag: "Obbligatorio",
      },
      analytics: {
        title: "Cookie analitici",
        desc: "Raccolgono dati anonimi su visite, fonti di traffico e utilizzo del sito.",
      },
      marketing: {
        title: "Cookie di marketing",
        desc: "Servono per mostrare contenuti e annunci in base ai tuoi interessi.",
      },
    },
  },
  fr: {
    badgePrefix: "● ",
    badgeWord: "Cookies",
    complianceBadges: "RGPD / GDPR",
    title: "Gérer vos préférences de cookies",
    desc: "Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic et personnaliser le contenu. Cliquez sur « Tout accepter » ou personnalisez vos choix.",
    learnMore: "Politique de confidentialité",
    acceptAll: "Tout accepter",
    rejectAll: "Tout refuser",
    customize: "Personnaliser",
    savePrefs: "Enregistrer les préférences",
    back: "Retour",
    categories: {
      essential: {
        title: "Cookies essentiels",
        desc: "Indispensables au fonctionnement du site. Ne peuvent pas être désactivés.",
        tag: "Obligatoire",
      },
      analytics: {
        title: "Cookies analytiques",
        desc: "Collectent des données anonymes sur les visites, les sources de trafic et l'utilisation du site.",
      },
      marketing: {
        title: "Cookies marketing",
        desc: "Permettent d'afficher des contenus et publicités selon vos centres d'intérêt.",
      },
    },
  },
  az: {
    badgePrefix: "● ",
    badgeWord: "Kuki",
    complianceBadges: "GDPR / KVKK",
    title: "Kuki seçimlərinizi idarə edin",
    desc: "Təcrübənizi təkmilləşdirmək, sayt trafikini təhlil etmək və məzmunu fərdiləşdirmək üçün kukilərdən istifadə edirik. «Hamısını qəbul et» ilə bütün kukilərə icazə verin və ya parametrləri özünüz seçin.",
    learnMore: "Məxfilik siyasəti",
    acceptAll: "Hamısını qəbul et",
    rejectAll: "Hamısını rədd et",
    customize: "Fərdiləşdir",
    savePrefs: "Seçimləri saxla",
    back: "Geri",
    categories: {
      essential: {
        title: "Vacib kukilər",
        desc: "Saytın əsas funksiyaları üçün lazımdır. Söndürülə bilməz.",
        tag: "Vacib",
      },
      analytics: {
        title: "Analitik kukilər",
        desc: "Ziyarətçi sayı, trafik mənbəyi və saytdan istifadə haqqında anonim məlumat toplayır.",
      },
      marketing: {
        title: "Marketinq kukiləri",
        desc: "Maraq dairənizə uyğun məzmun və reklam göstərmək üçün istifadə olunur.",
      },
    },
  },
  kk: {
    badgePrefix: "● ",
    badgeWord: "Cookie",
    complianceBadges: "GDPR / KVKK",
    title: "Cookie параметрлерін басқару",
    desc: "Тәжірибеңізді жақсарту, трафикті талдау және контентті жекелендіру үшін cookie файлдарын қолданамыз. «Барлығын қабылдау» арқылы барлық cookie файлдарына рұқсат беріңіз немесе баптаңыз.",
    learnMore: "Құпиялылық саясаты",
    acceptAll: "Барлығын қабылдау",
    rejectAll: "Барлығын бас тарту",
    customize: "Баптау",
    savePrefs: "Баптауларды сақтау",
    back: "Артқа",
    categories: {
      essential: {
        title: "Міндетті cookie",
        desc: "Сайттың негізгі жұмысы үшін қажет. Өшіру мүмкін емес.",
        tag: "Міндетті",
      },
      analytics: {
        title: "Аналитикалық cookie",
        desc: "Қонақтар саны, трафик көзі және сайтты пайдалану туралы анонимді деректер жинайды.",
      },
      marketing: {
        title: "Маркетингтік cookie",
        desc: "Қызығушылығыңызға сәйкес контент пен жарнаманы көрсету үшін қолданылады.",
      },
    },
  },
  tg: {
    badgePrefix: "● ",
    badgeWord: "Cookie",
    complianceBadges: "GDPR / KVKK",
    title: "Идоракунии интихоботи cookie",
    desc: "Барои беҳтар кардани таҷриба, таҳлили трафик ва шахсӣ кардани мундиҳо аз cookie истифода мебарем. «Ҳамаро қабул кардан» -ро пахш кунед ё танзимоти худро интихоб кунед.",
    learnMore: "Сиёсати махфият",
    acceptAll: "Ҳамаро қабул кардан",
    rejectAll: "Ҳамаро рад кардан",
    customize: "Танзим кардан",
    savePrefs: "Захираи интихобот",
    back: "Бозгашт",
    categories: {
      essential: {
        title: "Cookie-ҳои ҳатмӣ",
        desc: "Барои кори асосии сайт лозим аст. Ғайрифаъол карда намешавад.",
        tag: "Ҳатмӣ",
      },
      analytics: {
        title: "Cookie-ҳои таҳлилӣ",
        desc: "Иттилооти беном дар бораи меҳмонон, сарчашмаҳои трафик ва истифодаи сайт ҷамъ мекунад.",
      },
      marketing: {
        title: "Cookie-ҳои маркетингӣ",
        desc: "Барои намоиши мундиҳо ва таблиғ бо асоси завқҳои шумо истифода мешавад.",
      },
    },
  },
  es: {
    badgePrefix: "● ",
    badgeWord: "Cookies",
    complianceBadges: "RGPD / GDPR",
    title: "Gestiona tus preferencias de cookies",
    desc: "Usamos cookies para mejorar tu experiencia, analizar el tráfico y personalizar el contenido. Pulsa «Aceptar todas» o personaliza tus opciones.",
    learnMore: "Política de privacidad",
    acceptAll: "Aceptar todas",
    rejectAll: "Rechazar todas",
    customize: "Personalizar",
    savePrefs: "Guardar preferencias",
    back: "Volver",
    categories: {
      essential: {
        title: "Cookies necesarias",
        desc: "Imprescindibles para el funcionamiento básico del sitio. No se pueden desactivar.",
        tag: "Obligatorio",
      },
      analytics: {
        title: "Cookies analíticas",
        desc: "Recopilan datos anónimos sobre visitas, fuentes de tráfico y uso del sitio.",
      },
      marketing: {
        title: "Cookies de marketing",
        desc: "Sirven para mostrar contenidos y anuncios según tus intereses.",
      },
    },
  },
  zh: {
    badgePrefix: "● ",
    badgeWord: "Cookie",
    complianceBadges: "GDPR / KVKK",
    title: "管理 Cookie 偏好",
    desc: "我们使用 Cookie 以改善体验、分析流量并个性化内容。点击「全部接受」或自定义选项。",
    learnMore: "隐私政策",
    acceptAll: "全部接受",
    rejectAll: "全部拒绝",
    customize: "自定义",
    savePrefs: "保存偏好",
    back: "返回",
    categories: {
      essential: {
        title: "必要 Cookie",
        desc: "网站基本功能所需，无法关闭。",
        tag: "必需",
      },
      analytics: {
        title: "分析 Cookie",
        desc: "匿名收集访问量、流量来源与使用情况。",
      },
      marketing: {
        title: "营销 Cookie",
        desc: "用于根据兴趣展示内容与广告。",
      },
    },
  },
  ur: {
    badgePrefix: "● ",
    badgeWord: "کوکی",
    complianceBadges: "GDPR / KVKK",
    title: "کوکی ترجیحات منظم کریں",
    desc: "ہم تجربہ بہتر بنانے، ٹریفک کا تجزیہ کرنے اور مواد ذاتی بنانے کے لیے کوکیز استعمال کرتے ہیں۔ «سب قبول کریں» پر کلک کریں یا ترجیحات منتخب کریں۔",
    learnMore: "رازداری کی پالیسی",
    acceptAll: "سب قبول کریں",
    rejectAll: "سب مسترد کریں",
    customize: "حسب ضرورت",
    savePrefs: "ترجیحات محفوظ کریں",
    back: "واپس",
    categories: {
      essential: {
        title: "ضروری کوکیز",
        desc: "سائٹ کی بنیادی کارکردگی کے لیے ضروری۔ غیر فعال نہیں ہو سکتیں۔",
        tag: "لازمی",
      },
      analytics: {
        title: "تجزیاتی کوکیز",
        desc: "ملاحظ کنندگان، ٹریفک کے ذرائع اور استعمال کے بارے میں گمنام ڈیٹا اکٹھا کرتی ہیں۔",
      },
      marketing: {
        title: "مارکیٹنگ کوکیز",
        desc: "آپ کی دلچسپیوں کی بنیاد پر مواد اور اشتہارات دکھانے کے لیے۔",
      },
    },
  },
  lt: {
    badgePrefix: "● ",
    badgeWord: "Slapukai",
    complianceBadges: "BDAR / GDPR",
    title: "Tvarkykite slapukų nuostatas",
    desc: "Naudojame slapukus patirčiai gerinti, srautui analizuoti ir turiniui personalizuoti. Spauskite „Priimti viską“ arba pritaikykite pasirinkimus.",
    learnMore: "Privatumo politika",
    acceptAll: "Priimti viską",
    rejectAll: "Atmesti viską",
    customize: "Tinkinti",
    savePrefs: "Išsaugoti nuostatas",
    back: "Atgal",
    categories: {
      essential: {
        title: "Būtini slapukai",
        desc: "Reikalingi pagrindinėms svetainės funkcijoms. Išjungti negalima.",
        tag: "Privaloma",
      },
      analytics: {
        title: "Analitiniai slapukai",
        desc: "Renka anoniminius duomenis apie lankytojus, srauto šaltinius ir naudojimą.",
      },
      marketing: {
        title: "Rinkodaros slapukai",
        desc: "Naudojami turiniui ir reklamai pagal jūsų interesus rodyti.",
      },
    },
  },
  pl: {
    badgePrefix: "● ",
    badgeWord: "Ciasteczka",
    complianceBadges: "RODO / GDPR",
    title: "Zarządzaj preferencjami plików cookie",
    desc: "Używamy plików cookie, aby ulepszać działanie serwisu, analizować ruch i personalizować treści. Kliknij „Akceptuj wszystkie” lub dostosuj ustawienia.",
    learnMore: "Polityka prywatności",
    acceptAll: "Akceptuj wszystkie",
    rejectAll: "Odrzuć wszystkie",
    customize: "Dostosuj",
    savePrefs: "Zapisz preferencje",
    back: "Wstecz",
    categories: {
      essential: {
        title: "Niezbędne pliki cookie",
        desc: "Wymagane do podstawowego działania strony. Nie można wyłączyć.",
        tag: "Wymagane",
      },
      analytics: {
        title: "Analityczne pliki cookie",
        desc: "Zbierają anonimowe dane o odwiedzinach, źródłach ruchu i korzystaniu ze strony.",
      },
      marketing: {
        title: "Marketingowe pliki cookie",
        desc: "Służą do wyświetlania treści i reklam zgodnie z zainteresowaniami.",
      },
    },
  },
  ro: {
    badgePrefix: "● ",
    badgeWord: "Cookie",
    complianceBadges: "GDPR / KVKK",
    title: "Gestionați preferințele privind modulele cookie",
    desc: "Folosim module cookie pentru a vă îmbunătăți experiența, a analiza traficul și a personaliza conținutul. Apăsați „Acceptați toate” pentru a permite toate modulele cookie sau personalizați-vă preferințele.",
    learnMore: "Politica de confidențialitate",
    acceptAll: "Acceptați toate",
    rejectAll: "Respingeți toate",
    customize: "Personalizați",
    savePrefs: "Salvați preferințele",
    back: "Înapoi",
    categories: {
      essential: {
        title: "Module cookie esențiale",
        desc: "Necesare pentru funcționalitatea de bază a site-ului. Nu pot fi dezactivate.",
        tag: "Obligatoriu",
      },
      analytics: {
        title: "Module cookie de analiză",
        desc: "Colectează date anonime despre numărul de vizitatori, sursele de trafic și utilizarea site-ului.",
      },
      marketing: {
        title: "Module cookie de marketing",
        desc: "Utilizate pentru a afișa conținut și reclame în funcție de interesele dumneavoastră.",
      },
    },
  },
  hu: {
    badgePrefix: "● ",
    badgeWord: "Süti",
    complianceBadges: "GDPR / KVKK",
    title: "Süti-beállítások kezelése",
    desc: "Sütiket használunk az élmény javítása, a forgalom elemzése és a tartalom személyre szabása érdekében. Kattintson az „Összes elfogadása” gombra az összes süti engedélyezéséhez, vagy szabja testre a beállításait.",
    learnMore: "Adatvédelmi szabályzat",
    acceptAll: "Összes elfogadása",
    rejectAll: "Összes elutasítása",
    customize: "Testreszabás",
    savePrefs: "Beállítások mentése",
    back: "Vissza",
    categories: {
      essential: {
        title: "Szükséges sütik",
        desc: "A webhely alapvető működéséhez szükségesek. Nem kapcsolhatók ki.",
        tag: "Kötelező",
      },
      analytics: {
        title: "Analitikai sütik",
        desc: "Névtelen adatokat gyűjtenek a látogatók számáról, a forgalom forrásairól és a webhely használatáról.",
      },
      marketing: {
        title: "Marketing sütik",
        desc: "Az érdeklődési körének megfelelő tartalom és hirdetések megjelenítésére szolgálnak.",
      },
    },
  },
};
