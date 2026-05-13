import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/config";
import { getDictionary, hasLocale, type Locale } from "../../dictionaries";
import { PartnerWorldMap, type PartnerPin } from "./partner-world-map";

type PartnerPageCopy = {
  stats: Array<{ value: string; label: string }>;
  highlightsLabel: string;
  highlightsTitle: string;
  highlightsDesc: string;
  highlights: Array<{ title: string; description: string; stat: string }>;
  soonLabel: string;
  soonTitle: string;
  contactTag: string;
  contactTitle: string;
  contactDesc: string;
  contactForm: string;
};

const partnerPageCopyEn: PartnerPageCopy = {
    stats: [
      { value: "3", label: "Partnership axes" },
      { value: "TR + Global", label: "Scale" },
      { value: "NOVVES", label: "Brand" },
    ],
    highlightsLabel: "Partnership frame",
    highlightsTitle: "Collaboration layers in our projects",
    highlightsDesc:
      "Each partnership plays a different role. Logos and detailed showcase content will appear below these blocks once ready.",
    highlights: [
      {
        stat: "Supply",
        title: "Materials and schedule discipline",
        description:
          "Supply aligned to project timelines, quality sign-off, and logistics clarity—the baseline that reduces friction on site.",
      },
      {
        stat: "Field",
        title: "Installation and commissioning",
        description:
          "Solution partners who move in step with on-site assembly, testing, and handover with experienced crews.",
      },
      {
        stat: "Tech",
        title: "Integration and support",
        description:
          "Ecosystem collaborations that keep automation, monitoring, and service layers talking to each other.",
      },
    ],
    soonLabel: "Publishing",
    soonTitle: "Partner showcase coming very soon.",
    contactTag: "Contact",
    contactTitle: "Write to us about partnerships or a project.",
    contactDesc:
      "Reach out for collaboration proposals and technical discussions; our team will respond as soon as possible.",
    contactForm: "Contact form",
};

const pageCopy: Record<Locale, PartnerPageCopy> = {
  tr: {
    stats: [
      { value: "3", label: "Ortaklık ekseni" },
      { value: "TR + Global", label: "Ölçek" },
      { value: "NOVVES", label: "Marka" },
    ],
    highlightsLabel: "Ortaklık çerçevesi",
    highlightsTitle: "Projelerde iş birliği katmanları",
    highlightsDesc:
      "Her ortaklık farklı bir rol üstlenir. Logolar ve detaylı vitrin içeriği hazırlandığında bu blokların altında yayınlanacaktır.",
    highlights: [
      {
        stat: "Tedarik",
        title: "Malzeme ve zaman disiplini",
        description:
          "Projelerin takvimine uygun tedarik, kalite onayı ve lojistik netliği; sahadaki aksaklıkları azaltan temel katman.",
      },
      {
        stat: "Uygulama",
        title: "Kurulum ve devreye alma",
        description:
          "Yerinde montaj, test ve devreye alma süreçlerinde deneyimli ekiplerle birlikte hareket eden çözüm ortakları.",
      },
      {
        stat: "Teknoloji",
        title: "Entegrasyon ve destek",
        description:
          "Otomasyon, izleme ve servis katmanlarında ürünlerin birbiriyle konuşmasını sağlayan ekosistem iş birlikleri.",
      },
    ],
    soonLabel: "Yayın takvimi",
    soonTitle: "Partner vitrini çok yakında.",
    contactTag: "İletişim",
    contactTitle: "Partnerlik veya proje için bize yazın.",
    contactDesc:
      "İş birliği teklifleri ve teknik görüşmeler için doğrudan iletişime geçebilirsiniz; ekibimiz en kısa sürede dönüş yapar.",
    contactForm: "İletişim formu",
  },
  en: partnerPageCopyEn,
  es: {
    stats: [
      { value: "3", label: "Ejes de colaboración" },
      { value: "TR + Global", label: "Alcance" },
      { value: "NOVVES", label: "Marca" },
    ],
    highlightsLabel: "Marco de colaboración",
    highlightsTitle: "Capas de colaboración en nuestros proyectos",
    highlightsDesc:
      "Cada colaboración cumple un rol distinto. Los logotipos y el contenido detallado del escaparate aparecerán bajo estos bloques cuando esté listo.",
    highlights: [
      {
        stat: "Suministro",
        title: "Materiales y disciplina de plazos",
        description:
          "Suministro alineado con los plazos del proyecto, validación de calidad y logística clara: la base para reducir fricciones en obra.",
      },
      {
        stat: "Obra",
        title: "Instalación y puesta en servicio",
        description:
          "Socios de solución que avanzan al unísono con el montaje, las pruebas y la entrega en obra con equipos experimentados.",
      },
      {
        stat: "Tecnología",
        title: "Integración y soporte",
        description:
          "Colaboraciones de ecosistema que mantienen conectadas las capas de automatización, monitorización y servicio.",
      },
    ],
    soonLabel: "Publicación",
    soonTitle: "Vitrina de socios disponible muy pronto.",
    contactTag: "Contacto",
    contactTitle: "Escríbanos sobre colaboraciones o un proyecto.",
    contactDesc:
      "Contacte para propuestas de colaboración y debates técnicos; nuestro equipo responderá lo antes posible.",
    contactForm: "Formulario de contacto",
  },
  zh: {
    stats: [
      { value: "3", label: "合作维度" },
      { value: "TR + Global", label: "覆盖范围" },
      { value: "NOVVES", label: "品牌" },
    ],
    highlightsLabel: "合作框架",
    highlightsTitle: "项目中的协作层次",
    highlightsDesc:
      "每项合作承担不同角色。标识与完整展示内容准备就绪后，将发布在这些版块下方。",
    highlights: [
      {
        stat: "供应",
        title: "物料与进度纪律",
        description:
          "与项目时间表一致的供货、质量签核与清晰的物流——减少现场摩擦的基础。",
      },
      {
        stat: "现场",
        title: "安装与调试",
        description:
          "与经验丰富的团队同步推进装配、测试与移交的解决方案合作伙伴。",
      },
      {
        stat: "技术",
        title: "集成与支持",
        description:
          "使自动化、监控与服务各层协同运作的生态系统合作。",
      },
    ],
    soonLabel: "发布",
    soonTitle: "合作伙伴展示即将上线。",
    contactTag: "联系",
    contactTitle: "欢迎就合作或项目与我们联系。",
    contactDesc: "如需合作方案与技术讨论，请直接联系；我们将尽快回复。",
    contactForm: "联系表单",
  },
  ur: {
    stats: [
      { value: "3", label: "شراکت کے محور" },
      { value: "TR + Global", label: "پیمانہ" },
      { value: "NOVVES", label: "برانڈ" },
    ],
    highlightsLabel: "شراکتی ڈھانچہ",
    highlightsTitle: "منصوبوں میں تعاون کی تہیں",
    highlightsDesc:
      "ہر شراکت ایک مختلف کردار ادا کرتی ہے۔ لوگو اور تفصیلی نمائش کا مواد تیار ہونے پر ان بلاکس کے نیچے شائع کیا جائے گا۔",
    highlights: [
      {
        stat: "فراہمی",
        title: "مواد اور وقت کی نظم و ضبط",
        description:
          "منصوبے کے شیڈول کے مطابق فراہمی، کوالٹی کی منظوری اور واضح لاجسٹکس — میدان میں رکاوٹ کم کرنے کا بنیادی قدم۔",
      },
      {
        stat: "میدان",
        title: "انسٹالیشن اور کمیشننگ",
        description:
          "ایسے حل کے شراکت دار جو ماہر ٹیموں کے ساتھ اسمبلی، ٹیسٹنگ اور حوالگی کے عمل میں ہم آہنگ رہتے ہیں۔",
      },
      {
        stat: "ٹیک",
        title: "انضمام اور معاونت",
        description:
          "خودکار نظام، نگرانی اور سروس کی سطوح کو آپس میں مربوط رکھنے والی ایکو سسٹم شراکت داری۔",
      },
    ],
    soonLabel: "اشاعت",
    soonTitle: "شراکت داروں کی نمائش جلد۔",
    contactTag: "رابطہ",
    contactTitle: "شراکت یا منصوبے کے بارے میں ہمیں لکھیں۔",
    contactDesc:
      "تعاون کی تجاویز اور تکنیکی بات چیت کے لیے رابطہ کریں؛ ہماری ٹیم جلد از جلد جواب دے گی۔",
    contactForm: "رابطہ فارم",
  },
  ru: {
    stats: [
      { value: "3", label: "Osi partnerstva" },
      { value: "TR + Global", label: "Masshtab" },
      { value: "NOVVES", label: "Brend" },
    ],
    highlightsLabel: "Ramka partnerstva",
    highlightsTitle: "Sloi sotrudnichestva v proektakh",
    highlightsDesc:
      "Kazhdoye sotrudnichestvo vypolnyayet svoyu rolyu. Logotipy i detalnaya vitrina poyavyatsya pod etimi blokami, kogda kontent budet gotov.",
    highlights: [
      {
        stat: "Snabzheniye",
        title: "Materialy i distsiplina grafika",
        description:
          "Postavki v sootvetstvii s grafikom proyekta, kontrol kachestva i yasnaya logistika — baza dlya spokoynoy raboty na ploshchadke.",
      },
      {
        stat: "Montazh",
        title: "Ustanovka i puskonaladka",
        description:
          "Resheniya s partnerami, kotoryye sinkhronno vedut sborku, testy i peredachu obyekta vmeste s opytnymi brigadami.",
      },
      {
        stat: "Tekh",
        title: "Integratsiya i podderzhka",
        description:
          "Ekosistemnyye svyazi dlya avtomatizatsii, monitoringa i servisnykh sloyev, kotoryye rabotayut kak yedinoe tseloye.",
      },
    ],
    soonLabel: "Publikatsiya",
    soonTitle: "Vitrina partnerov — sovsem skoro.",
    contactTag: "Kontakty",
    contactTitle: "Pishite nam o partnerstve ili proekte.",
    contactDesc:
      "Dlya predlozheniy o sotrudnichestve i tekhnicheskikh konsultatsiy obrashaytes napryamuyu; komanda otvetit v blizhayshiye sroki.",
    contactForm: "Forma kontakta",
  },
  ar: {
    stats: [
      { value: "3", label: "محور الشراكة" },
      { value: "TR + Global", label: "النطاق" },
      { value: "NOVVES", label: "العلامة" },
    ],
    highlightsLabel: "إطار الشراكة",
    highlightsTitle: "طبقات التعاون في المشاريع",
    highlightsDesc:
      "كل شراكة تؤدي دوراً مختلفاً. ستُعرض الشعارات والمحتوى التفصيلي أسفل هذه الكتل عند جاهزيته.",
    highlights: [
      {
        stat: "التوريد",
        title: "المواعيد وجودة المواد",
        description:
          "توريد متوافق مع جدول المشروع واعتماد الجودة ووضوح اللوجستيك؛ الطبقة الأساسية لتقليل الاضطراب في الموقع.",
      },
      {
        stat: "التنفيذ",
        title: "التركيب والتكليف",
        description:
          "شركاء يعملون جنباً إلى جنب مع فرق ذات خبرة في التجميع والاختبار والتسليم.",
      },
      {
        stat: "التقنية",
        title: "التكامل والدعم",
        description:
          "شراكات منظومة تجعل الأتمتة والمراقبة والخدمة تعمل ككتلة واحدة.",
      },
    ],
    soonLabel: "جدول النشر",
    soonTitle: "عرض الشركاء قريباً.",
    contactTag: "اتصل بنا",
    contactTitle: "راسلنا للشراكة أو المشروع.",
    contactDesc:
      "لاقتراحات التعاون والمناقشات الفنية؛ سيجيب فريقنا في أقرب وقت.",
    contactForm: "نموذج الاتصال",
  },
  de: {
    stats: [
      { value: "3", label: "Partnerschaftsachse" },
      { value: "TR + Global", label: "Reichweite" },
      { value: "NOVVES", label: "Marke" },
    ],
    highlightsLabel: "Rahmen der Partnerschaft",
    highlightsTitle: "Zusammenarbeitsebenen in Projekten",
    highlightsDesc:
      "Jede Partnerschaft hat eine andere Rolle. Logos und ausführliche Inhalte werden unter diesen Blöcken veröffentlicht, sobald sie bereitstehen.",
    highlights: [
      {
        stat: "Beschaffung",
        title: "Material und Termintreue",
        description:
          "Lieferungen im Projektzeitplan, Qualitätsfreigabe und klare Logistik – die Basis für reibungslose Arbeit vor Ort.",
      },
      {
        stat: "Ausführung",
        title: "Montage und Inbetriebnahme",
        description:
          "Partner, die Montage, Tests und Übergabe gemeinsam mit erfahrenen Teams abstimmen.",
      },
      {
        stat: "Technik",
        title: "Integration und Support",
        description:
          "Ökosystem-Partnerschaften für Automatisierung, Monitoring und Service als zusammenhängende Ebene.",
      },
    ],
    soonLabel: "Veröffentlichung",
    soonTitle: "Partner-Vitrine demnächst.",
    contactTag: "Kontakt",
    contactTitle: "Schreiben Sie uns zu Partnerschaft oder Projekt.",
    contactDesc:
      "Für Kooperationsangebote und technische Gespräche erreichen Sie uns direkt; unser Team meldet sich zeitnah.",
    contactForm: "Kontaktformular",
  },
  it: {
    stats: [
      { value: "3", label: "Assi di partnership" },
      { value: "TR + Global", label: "Scala" },
      { value: "NOVVES", label: "Marchio" },
    ],
    highlightsLabel: "Quadro partnership",
    highlightsTitle: "Livelli di collaborazione nei progetti",
    highlightsDesc:
      "Ogni partnership ha un ruolo diverso. Loghi e contenuti dettagliati appariranno sotto questi blocchi quando saranno pronti.",
    highlights: [
      {
        stat: "Fornitura",
        title: "Materiali e rispetto dei tempi",
        description:
          "Fornitura allineata ai cronoprogrammi, approvazione qualità e logistica chiara: la base che riduce gli attriti in cantiere.",
      },
      {
        stat: "Cantiere",
        title: "Installazione e commissioning",
        description:
          "Partner che procedono in sincrono con montaggio, prove e consegna con team esperti.",
      },
      {
        stat: "Tech",
        title: "Integrazione e supporto",
        description:
          "Collaborazioni nell’ecosistema che mantengono automazione, monitoraggio e assistenza collegate.",
      },
    ],
    soonLabel: "Pubblicazione",
    soonTitle: "Vetrina partner in arrivo molto presto.",
    contactTag: "Contatti",
    contactTitle: "Scrivici per partnership o progetti.",
    contactDesc:
      "Contattaci per proposte di collaborazione e confronti tecnici; il team risponderà al più presto.",
    contactForm: "Modulo contatti",
  },
  fr: {
    stats: [
      { value: "3", label: "Axes de partenariat" },
      { value: "TR + Global", label: "Échelle" },
      { value: "NOVVES", label: "Marque" },
    ],
    highlightsLabel: "Cadre du partenariat",
    highlightsTitle: "Niveaux de collaboration dans nos projets",
    highlightsDesc:
      "Chaque partenariat joue un rôle différent. Les logos et le contenu détaillé de la vitrine apparaîtront sous ces blocs une fois prêts.",
    highlights: [
      {
        stat: "Approvisionnement",
        title: "Matériaux et respect du planning",
        description:
          "Approvisionnement aligné sur les échéances du projet, validation qualité et logistique claire — la base qui réduit les frictions sur chantier.",
      },
      {
        stat: "Terrain",
        title: "Installation et mise en service",
        description:
          "Partenaires qui avancent au même rythme que le montage, les essais et la réception avec des équipes expérimentées.",
      },
      {
        stat: "Tech",
        title: "Intégration et support",
        description:
          "Collaborations au sein de l'écosystème pour que automatisation, supervision et maintenance restent interconnectées.",
      },
    ],
    soonLabel: "Publication",
    soonTitle: "Vitrine partenaires très bientôt.",
    contactTag: "Contact",
    contactTitle: "Écrivez-nous pour un partenariat ou un projet.",
    contactDesc:
      "Contactez-nous pour des propositions de collaboration et des échanges techniques ; notre équipe vous répondra dans les meilleurs délais.",
    contactForm: "Formulaire de contact",
  },
  az: {
    stats: [
      { value: "3", label: "Tərəfdaşlıq oxu" },
      { value: "TR + Global", label: "Miqyas" },
      { value: "NOVVES", label: "Brend" },
    ],
    highlightsLabel: "Tərəfdaşlıq çərçivəsi",
    highlightsTitle: "Layihələrdə əməkdaşlıq qatları",
    highlightsDesc:
      "Hər tərəfdaşlıq fərqli rol oynayır. Loqotiplər və ətraflı vitrin məzmunu hazır olanda bu blokların altında dərc ediləcək.",
    highlights: [
      {
        stat: "Təchizat",
        title: "Material və cədvəl intizamı",
        description:
          "Layihə vaxt qrafikinə uyğun təchizat, keyfiyyət təsdiqi və aydın logistika — obyektdə sürtünməni azaldan təməl.",
      },
      {
        stat: "Meydança",
        title: "Quraşdırma və istismara qəbul",
        description:
          "Montaj, sınaq və təhvil prosesində təcrübəli komandalarla eyni addımda irəliləyən həll tərəfdaşları.",
      },
      {
        stat: "Tex",
        title: "İnteqrasiya və dəstək",
        description:
          "Avtomatlaşdırma, monitorinq və xidmət qatlarının bir-biri ilə əlaqədə qalmasını təmin edən ekosistem əməkdaşlıqları.",
      },
    ],
    soonLabel: "Dərc",
    soonTitle: "Tərəfdaş vitrini tezliklə.",
    contactTag: "Əlaqə",
    contactTitle: "Tərəfdaşlıq və ya layihə üçün yazın.",
    contactDesc:
      "Əməkdaşlıq təklifləri və texniki müzakirələr üçün əlaqə saxlayın; komandamız mümkün qədər tez cavab verəcək.",
    contactForm: "Əlaqə formu",
  },
  kk: {
    stats: [
      { value: "3", label: "Серіктестік осі" },
      { value: "TR + Global", label: "Аймақ" },
      { value: "NOVVES", label: "Бренд" },
    ],
    highlightsLabel: "Серіктестік аясы",
    highlightsTitle: "Жобалардағы ынтымақтастық қабаттары",
    highlightsDesc:
      "Әр серіктестік өз рөлін атқарады. Логотиптер мен толық витрина мазмұны дайын болғанда осы блоктардың астында жарияланады.",
    highlights: [
      {
        stat: "Жеткізу",
        title: "Материал және кесте тәртібі",
        description:
          "Жоба кестесіне сәйкес жеткізу, сапаны растау және логистиканың анықтығы — алаңдағы қақтығыстарды азайтатын негіз.",
      },
      {
        stat: "Алаң",
        title: "Орнату және іске қосу",
        description:
          "Монтаж, сынақ және тапсыру процестерінде тәжірибелі топтармен бірге қозғалатын шешім серіктестері.",
      },
      {
        stat: "Техно",
        title: "Интеграция және қолдау",
        description:
          "Автоматтандыру, мониторинг және сервис қабаттарының бір-бірімен байланыста болуын қамтамасыз ететін экожүйелік ынтымақтастықтар.",
      },
    ],
    soonLabel: "Жариялау",
    soonTitle: "Серіктестер витрасасы жақында.",
    contactTag: "Байланыс",
    contactTitle: "Серіктестік немесе жоба туралы жазыңыз.",
    contactDesc:
      "Ынтымақтастық ұсыныстары және техникалық талқылаулар үшін хабарласыңыз; командамыз мүмкіндігінше тез жауап береді.",
    contactForm: "Байланыс формасы",
  },
  tg: {
    stats: [
      { value: "3", label: "Меҳварҳои шарикӣ" },
      { value: "TR + Global", label: "Миқёс" },
      { value: "NOVVES", label: "Бренд" },
    ],
    highlightsLabel: "Чорчубаи шарикӣ",
    highlightsTitle: "Қабатҳои ҳамкорӣ дар лоиҳаҳо",
    highlightsDesc:
      "Ҳар як шарик нақши муайён дорад. Логотипҳо ва мундариҷаи пурраи витрина ҳангоми омодагӣ зери ин блокҳо нашр мешаванд.",
    highlights: [
      {
        stat: "Таҳвил",
        title: "Мавод ва интизоми ҷадвал",
        description:
          "Таҳвил ба ҷадвали лоиҳа, тасдиқи сифат ва логистикаи равшан — асоси кори бемамо дар майдон.",
      },
      {
        stat: "Майдон",
        title: "Насб ва ба кор даровардан",
        description:
          "Шариконе, ки дар раванди насб, санҷиш ва супориди объект бо гурӯҳҳои таҷрибавӣ ҳамоҳанганд.",
      },
      {
        stat: "Техно",
        title: "Интегратсия ва дастгирӣ",
        description:
          "Ҳамкориҳои экосистемӣ, ки қабатҳои автоматкунӣ, мониторинг ва хизматро бо ҳам пайваст мекунанд.",
      },
    ],
    soonLabel: "Нашр",
    soonTitle: "Витринаи шарикон ба зудӣ.",
    contactTag: "Тамос",
    contactTitle: "Дар бораи шарикӣ ё лоиҳа ба мо нависед.",
    contactDesc:
      "Барои пешниҳоди ҳамкорӣ ва муҳокимаҳои техникӣ тамос гиред; дастаи мо ба зудӣ ҷавоб медиҳад.",
    contactForm: "Шакли тамос",
  },
  lt: {
    stats: [
      { value: "3", label: "Partnerystės ašys" },
      { value: "TR + Global", label: "Mastas" },
      { value: "NOVVES", label: "Prekės ženklas" },
    ],
    highlightsLabel: "Partnerystės rėmas",
    highlightsTitle: "Bendradarbiavimo sluoksniai projektuose",
    highlightsDesc:
      "Kiekviena partnerystė atlieka skirtingą vaidmenį. Logotipai ir detali vitrinos turinys bus skelbiami po šiais blokais pasiruošus.",
    highlights: [
      {
        stat: "Tiekimas",
        title: "Medžiagų ir grafiko drausmė",
        description:
          "Tiekimas pagal projekto grafiką, kokybės patvirtinimas ir aiški logistika – pagrindas, mažinantis trikdžius aikštelėje.",
      },
      {
        stat: "Aikštelė",
        title: "Montavimas ir paleidimas",
        description:
          "Sprendimų partneriai, sinchroniškai dirbantys su patyrusiomis brigadomis montuojant, bandant ir perduodant objektą.",
      },
      {
        stat: "Technologijos",
        title: "Integracija ir palaikymas",
        description:
          "Ekosistemų bendradarbiavimas, jungiantis automatizavimo, stebėsenos ir aptarnavimo sluoksnius.",
      },
    ],
    soonLabel: "Publikavimas",
    soonTitle: "Partnerių vitrina netrukus.",
    contactTag: "Kontaktai",
    contactTitle: "Rašykite apie partnerystę ar projektą.",
    contactDesc:
      "Kreipkitės dėl bendradarbiavimo pasiūlymų ir techninių diskusijų; mūsų komanda atsakys kaip įmanoma greičiau.",
    contactForm: "Kontaktų forma",
  },
  pl: {
    stats: [
      { value: "3", label: "Osie partnerstwa" },
      { value: "TR + Global", label: "Zasięg" },
      { value: "NOVVES", label: "Marka" },
    ],
    highlightsLabel: "Rama partnerstwa",
    highlightsTitle: "Warstwy współpracy w projektach",
    highlightsDesc:
      "Każde partnerstwo pełni inną rolę. Logotypy i pełna treść witryny pojawią się pod tymi blokami po przygotowaniu.",
    highlights: [
      {
        stat: "Dostawy",
        title: "Materiały i dyscyplina harmonogramu",
        description:
          "Dostawy zgodne z harmonogramem projektu, akceptacja jakości i przejrzysta logistyka — podstawa mniejszego tarcia na placu budowy.",
      },
      {
        stat: "Plac budowy",
        title: "Montaż i uruchomienie",
        description:
          "Partnerzy rozwiązań, którzy kroczą w parze z doświadczonymi ekipami przy montażu, testach i przekazaniu obiektu.",
      },
      {
        stat: "Technologia",
        title: "Integracja i wsparcie",
        description:
          "Współpraca ekosystemowa łącząca warstwy automatyki, monitoringu i serwisu.",
      },
    ],
    soonLabel: "Publikacja",
    soonTitle: "Witryna partnerów wkrótce.",
    contactTag: "Kontakt",
    contactTitle: "Napisz do nas o partnerstwie lub projekcie.",
    contactDesc:
      "Skontaktuj się w sprawie propozycji współpracy i konsultacji technicznych; nasz zespół odpowie możliwie szybko.",
    contactForm: "Formularz kontaktowy",
  },
  ...Object.fromEntries(
    locales
      .filter(
        (l) =>
          l !== "tr" &&
          l !== "en" &&
          l !== "ru" &&
          l !== "ar" &&
          l !== "de" &&
          l !== "it" &&
          l !== "fr" &&
          l !== "az" &&
          l !== "kk" &&
          l !== "tg" &&
          l !== "es" &&
          l !== "zh" &&
          l !== "ur" &&
          l !== "lt" &&
          l !== "pl",
      )
      .map((l) => [l, partnerPageCopyEn]),
  ),
} as Record<Locale, PartnerPageCopy>;

// ---------------------------------------------------------------
// PARTNER LİSTESİ — sonra firma adları/şehirleri buradan girilecek
// `top` ve `left` değerleri haritadaki konum (yüzde olarak)
// `defaultSelected: true` koyulan kart, sayfa açılışta turuncu seçili gelir
// (kullanıcı başka bir kart tıklayınca seçim ona geçer)
// ---------------------------------------------------------------
const partnerPins: PartnerPin[] = [
  { name: "Partner Adı", location: "Madrid, İspanya", top: "14%", left: "16%" },
  { name: "Partner Adı", location: "Tianshui, Çin", top: "22%", left: "60%" },
  { name: "Partner Adı", location: "Jeddah, S.Arabistan", top: "44%", left: "42%", defaultSelected: true },
  { name: "Partner Adı", location: "Brasilia, Brezilya", top: "66%", left: "20%" },
  { name: "Partner Adı", location: "Jakarta, Endonezya", top: "58%", left: "70%" },
  { name: "Partner Adı", location: "İstanbul, Türkiye", top: "26%", left: "46%" },
];

const pillarIcons = [
  <svg key="0" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006h-9m9 0a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25m9 0V12.75H9.75v4.406m6-4.406V9.112c0-1.108-.806-2.012-1.846-2.086a48.19 48.19 0 00-3.554-.186c-1.086.09-1.846.993-1.846 2.086v1.637m12-4.406V19.5"
    />
  </svg>,
  <svg key="1" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655-5.653a2.548 2.548 0 010-3.586L9.12 3.54a2.25 2.25 0 013.19 0l.34.409"
    />
  </svg>,
  <svg key="2" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z"
    />
  </svg>,
];

export default async function Partnerlerimiz({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.contact.partnerlerimiz;
  const copy = pageCopy[locale];

  return (
    <main>
      <section className="relative flex min-h-[540px] items-end overflow-hidden">
        <Image
          src="/images/page-hero/iletisim.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#4e525c]/28" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#71757d]/60 via-[#4a4f58]/82 to-[#2f3440]/94" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_16%_10%,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0)_52%),radial-gradient(ellipse_at_86%_96%,rgba(17,22,33,0.42)_0%,rgba(17,22,33,0)_55%)]" />
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.08]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 pt-32 sm:px-6 lg:px-8 lg:pt-36">
          <nav className="mb-8 flex items-center gap-2 text-xs text-white/40">
            <Link href={`/${locale}`} className="transition-colors hover:text-white/70">
              {t.breadcrumbHome}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/iletisim`} className="transition-colors hover:text-white/70">
              {t.breadcrumbContact}
            </Link>
            <span>/</span>
            <span className="text-white/60">{t.breadcrumbPartners}</span>
          </nav>

          <div className="max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_28px_70px_-40px_rgba(10,12,16,0.75)] backdrop-blur-[2px] sm:p-8 lg:p-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/12 px-3.5 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{t.badge}</span>
            </div>
            <h1 className="text-4xl font-bold leading-[1.04] tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.7rem]">
              {t.title1}
              <span className="text-primary">{t.title2}</span>
            </h1>
            <p className="mt-6 max-w-[52ch] text-[18px] leading-[1.62] text-white/72">{t.desc}</p>
            <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-white/55 sm:text-[15px]">{t.heroLead}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#ecebe6] py-6 sm:py-8">
        <div className="mx-auto max-w-7xl rounded-2xl border border-ink/10 bg-[#f8f5ed] px-4 shadow-[0_12px_26px_-20px_rgba(15,20,30,0.26)] sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 divide-y divide-ink/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {copy.stats.map((s) => (
              <div key={s.label} className="py-5 text-center">
                <p className="text-xl font-bold text-primary sm:text-2xl">{s.value}</p>
                <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-secondary/50">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#ecebe6] py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{copy.highlightsLabel}</p>
            <h2 className="mt-2 text-2xl font-bold text-dark sm:text-3xl">{copy.highlightsTitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-secondary/55 sm:text-[15px]">{copy.highlightsDesc}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {copy.highlights.map((item, i) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-xl border border-ink/10 bg-[#f8f5ed] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_16px_30px_-22px_rgba(15,20,30,0.35)]"
              >
                <div className="absolute left-0 top-0 h-full w-1 bg-ink/10 transition-colors duration-300 group-hover:bg-primary" />
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/5 text-secondary/40 transition-colors duration-300 group-hover:bg-primary/10 group-hover:text-primary">
                  {pillarIcons[i]}
                </div>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/90">{item.stat}</p>
                <h3 className="mt-2 text-sm font-bold text-dark">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-secondary/45">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-6xl">
            <div className="mb-6 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{copy.soonLabel}</p>
              <h2 className="mt-2 text-2xl font-bold text-dark sm:text-3xl">{copy.soonTitle}</h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-secondary/50">{t.comingSoonDesc}</p>
            </div>
            <PartnerWorldMap pins={partnerPins} />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-dark py-20">
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #ef5f17, transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{copy.contactTag}</p>
          <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">{copy.contactTitle}</h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/40">{copy.contactDesc}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:info@novves.com"
              className="group inline-flex items-center gap-2.5 rounded-lg bg-white/5 px-6 py-3 text-sm font-medium text-white ring-1 ring-white/10 transition-all duration-300 hover:bg-primary/20 hover:ring-primary/30"
            >
              <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              info@novves.com
            </a>
            <Link
              href={`/${locale}/iletisim`}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-primary-deep hover:shadow-xl hover:shadow-primary/30"
            >
              {copy.contactForm}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
