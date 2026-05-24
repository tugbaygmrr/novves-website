/**
 * Home "Marka Tanıtım Videosu" section i18n.
 *
 * Strings that already live in `home.json -> video` (title, desc, iframeTitle,
 * tag) are still read from dict — this module only carries the NEW labels
 * introduced by the redesign (subtitle, side buttons, feature cards, pillars,
 * CTA copy). Same pattern as footer-i18n.ts: TR is source, EN is fallback.
 */

export type HomeVideoStrings = {
  subtitle: string;
  sideButtons: {
    facilities: { title: string; desc: string };
    references: { title: string; desc: string };
  };
  /** 3 cards under side buttons */
  featureCards: { title: string; desc: string }[];
  /** 5 bottom-strip pillars */
  pillars: { title: string; desc: string }[];
  cta: { title: string; desc: string; button: string };
};

const tr: HomeVideoStrings = {
  subtitle: "NOVVES'in üretim gücünü, mühendislik yaklaşımını ve global vizyonunu yakından tanıyın.",
  sideButtons: {
    facilities: {
      title: "Üretim Tesislerimiz",
      desc: "Yalova OSB'deki modern üretim tesisimizi keşfedin.",
    },
    references: {
      title: "Referanslarımız",
      desc: "30+ ülkede tamamladığımız başarılı projeler.",
    },
  },
  featureCards: [
    {
      title: "CFD Destekli Mühendislik",
      desc: "Proje bazlı CFD analizleri ile en doğru çözümleri üretiyoruz.",
    },
    {
      title: "Yüksek Üretim Gücü",
      desc: "Yalova'daki modern tesisimizde yüksek kalite standartlarında üretim gerçekleştiriyoruz.",
    },
    {
      title: "Global Proje Deneyimi",
      desc: "30+ ülkeye ihracat ve yüzlerce başarılı proje uygulaması.",
    },
  ],
  pillars: [
    { title: "3.000 m² Üretim Alanı", desc: "Modern üretim altyapısı" },
    { title: "30+ Ülkeye İhracat", desc: "Global proje deneyimi" },
    { title: "CFD Destekli Tasarım", desc: "Mühendislik temelli çözümler" },
    { title: "Sertifikalı Ürün Ailesi", desc: "BSI, ATEX ve uluslararası standartlar" },
    { title: "Ar-Ge ve Test Yetkinliği", desc: "Ölçülebilir performans" },
  ],
  cta: {
    title: "Projeniz için doğru hava çözümünü birlikte tasarlayalım.",
    desc: "Fan, duman tahliye, klima santrali ve motor teknolojilerinde uzman ekibimizle projelerinize özel mühendislik desteği sunuyoruz.",
    button: "Projenizi Paylaşın",
  },
};

const en: HomeVideoStrings = {
  subtitle: "Get an up-close look at NOVVES's manufacturing strength, engineering approach and global vision.",
  sideButtons: {
    facilities: {
      title: "Our Facilities",
      desc: "Discover our modern manufacturing plant in Yalova OIZ.",
    },
    references: {
      title: "Our References",
      desc: "Successful projects we delivered across 30+ countries.",
    },
  },
  featureCards: [
    {
      title: "CFD-Driven Engineering",
      desc: "Project-specific CFD analyses deliver the most accurate solutions.",
    },
    {
      title: "High Manufacturing Capacity",
      desc: "Production at the highest quality standards from our modern Yalova facility.",
    },
    {
      title: "Global Project Experience",
      desc: "Exports to 30+ countries and hundreds of successful project deliveries.",
    },
  ],
  pillars: [
    { title: "3,000 m² Production Area", desc: "Modern manufacturing infrastructure" },
    { title: "Exports to 30+ Countries", desc: "Global project experience" },
    { title: "CFD-Powered Design", desc: "Engineering-driven solutions" },
    { title: "Certified Product Family", desc: "BSI, ATEX and international standards" },
    { title: "R&D and Testing Capability", desc: "Measurable performance" },
  ],
  cta: {
    title: "Let's design the right air solution for your project together.",
    desc: "With our expert team in fan, smoke evacuation, AHU and motor technologies, we deliver project-specific engineering support.",
    button: "Share Your Project",
  },
};

const ru: HomeVideoStrings = {
  subtitle: "Познакомьтесь поближе с производственной мощью, инженерным подходом и глобальной визией NOVVES.",
  sideButtons: {
    facilities: {
      title: "Наши Производства",
      desc: "Откройте наш современный завод в Ялова.",
    },
    references: {
      title: "Наши Референсы",
      desc: "Успешные проекты в 30+ странах.",
    },
  },
  featureCards: [
    { title: "Инженерия на базе CFD", desc: "CFD-анализ для каждого проекта обеспечивает точные решения." },
    { title: "Высокая производственная мощность", desc: "Производство на современном заводе в Ялове по высшим стандартам качества." },
    { title: "Глобальный опыт проектов", desc: "Экспорт в 30+ стран и сотни успешных проектов." },
  ],
  pillars: [
    { title: "3 000 м² производственная площадь", desc: "Современная производственная инфраструктура" },
    { title: "Экспорт в 30+ стран", desc: "Глобальный проектный опыт" },
    { title: "Проектирование на базе CFD", desc: "Инженерные решения" },
    { title: "Сертифицированный модельный ряд", desc: "BSI, ATEX и международные стандарты" },
    { title: "НИОКР и испытания", desc: "Измеримая производительность" },
  ],
  cta: {
    title: "Давайте вместе спроектируем правильное воздушное решение для вашего проекта.",
    desc: "С нашей экспертной командой в области вентиляторов, дымоудаления, центральных кондиционеров и моторных технологий мы предоставляем инженерную поддержку под ваш проект.",
    button: "Поделиться проектом",
  },
};

const ar: HomeVideoStrings = {
  subtitle: "تعرّف عن قرب على قوة الإنتاج والنهج الهندسي والرؤية العالمية لدى NOVVES.",
  sideButtons: {
    facilities: {
      title: "منشآتنا الإنتاجية",
      desc: "اكتشف منشأتنا الحديثة في يالوفا.",
    },
    references: {
      title: "مراجعنا",
      desc: "مشاريع ناجحة في أكثر من 30 دولة.",
    },
  },
  featureCards: [
    { title: "هندسة بأسلوب CFD", desc: "تحليلات CFD لكل مشروع تقدم الحلول الأدق." },
    { title: "قدرة إنتاجية عالية", desc: "إنتاج بأعلى معايير الجودة في منشأتنا الحديثة بيالوفا." },
    { title: "خبرة مشاريع عالمية", desc: "تصدير لأكثر من 30 دولة ومئات المشاريع الناجحة." },
  ],
  pillars: [
    { title: "3000 م² مساحة إنتاج", desc: "بنية تحتية إنتاجية حديثة" },
    { title: "تصدير لأكثر من 30 دولة", desc: "خبرة مشاريع عالمية" },
    { title: "تصميم مدعوم بـ CFD", desc: "حلول هندسية" },
    { title: "عائلة منتجات معتمدة", desc: "معايير BSI وATEX والمعايير الدولية" },
    { title: "كفاءات البحث والتطوير والاختبار", desc: "أداء قابل للقياس" },
  ],
  cta: {
    title: "لنصمم معًا حل الهواء المناسب لمشروعك.",
    desc: "بفريقنا الخبير في المراوح وإجلاء الدخان ووحدات معالجة الهواء وتقنيات المحركات، نقدم دعمًا هندسيًا مخصصًا لمشاريعك.",
    button: "شارك مشروعك",
  },
};

const de: HomeVideoStrings = {
  subtitle: "Erleben Sie aus nächster Nähe NOVVES' Produktionskraft, Engineering-Ansatz und globale Vision.",
  sideButtons: {
    facilities: {
      title: "Unsere Anlagen",
      desc: "Entdecken Sie unsere moderne Fertigung in Yalova.",
    },
    references: {
      title: "Unsere Referenzen",
      desc: "Erfolgreiche Projekte in über 30 Ländern.",
    },
  },
  featureCards: [
    { title: "CFD-gestütztes Engineering", desc: "Projektspezifische CFD-Analysen liefern die genauesten Lösungen." },
    { title: "Hohe Produktionskraft", desc: "Fertigung nach höchsten Qualitätsstandards in unserem Werk in Yalova." },
    { title: "Globale Projekterfahrung", desc: "Export in 30+ Länder und hunderte erfolgreiche Projekte." },
  ],
  pillars: [
    { title: "3.000 m² Produktionsfläche", desc: "Moderne Fertigungsinfrastruktur" },
    { title: "Export in 30+ Länder", desc: "Globale Projekterfahrung" },
    { title: "CFD-basiertes Design", desc: "Ingenieurgetriebene Lösungen" },
    { title: "Zertifizierte Produktfamilie", desc: "BSI, ATEX und internationale Normen" },
    { title: "F&E- und Prüfkompetenz", desc: "Messbare Leistung" },
  ],
  cta: {
    title: "Lassen Sie uns gemeinsam die passende Luftlösung für Ihr Projekt entwerfen.",
    desc: "Mit unserem Expertenteam in Ventilatoren, Entrauchung, Klimazentralgeräten und Motortechnologien bieten wir projektspezifische Engineering-Unterstützung.",
    button: "Projekt teilen",
  },
};

const fr: HomeVideoStrings = {
  subtitle: "Découvrez de près la puissance de production, l'approche ingénierie et la vision mondiale de NOVVES.",
  sideButtons: {
    facilities: {
      title: "Nos Installations",
      desc: "Découvrez notre site de production moderne à Yalova.",
    },
    references: {
      title: "Nos Références",
      desc: "Projets réussis dans plus de 30 pays.",
    },
  },
  featureCards: [
    { title: "Ingénierie assistée par CFD", desc: "Des analyses CFD par projet pour les solutions les plus précises." },
    { title: "Forte capacité de production", desc: "Production aux plus hauts standards qualité dans notre site moderne de Yalova." },
    { title: "Expérience projet globale", desc: "Exports vers 30+ pays et des centaines de projets réussis." },
  ],
  pillars: [
    { title: "3 000 m² de production", desc: "Infrastructure de fabrication moderne" },
    { title: "Export vers 30+ pays", desc: "Expérience projet mondiale" },
    { title: "Conception assistée par CFD", desc: "Solutions à base d'ingénierie" },
    { title: "Gamme produit certifiée", desc: "Normes BSI, ATEX et internationales" },
    { title: "R&D et capacités d'essai", desc: "Performances mesurables" },
  ],
  cta: {
    title: "Concevons ensemble la solution aéraulique adaptée à votre projet.",
    desc: "Avec notre équipe d'experts en ventilateurs, désenfumage, centrales de traitement d'air et technologies moteur, nous offrons un accompagnement d'ingénierie sur mesure.",
    button: "Partager votre projet",
  },
};

/* ── Italian ─────────────────────────────────────────────────────────── */

const it: HomeVideoStrings = {
  subtitle: "Scopri da vicino la forza produttiva, l'approccio ingegneristico e la visione globale di NOVVES.",
  sideButtons: {
    facilities: {
      title: "I Nostri Impianti",
      desc: "Scopri il nostro stabilimento moderno a Yalova.",
    },
    references: {
      title: "Le Nostre Referenze",
      desc: "Progetti realizzati in oltre 30 paesi.",
    },
  },
  featureCards: [
    { title: "Ingegneria assistita da CFD", desc: "Analisi CFD per ogni progetto offrono le soluzioni più precise." },
    { title: "Elevata capacità produttiva", desc: "Produzione ai massimi standard qualitativi nel nostro stabilimento di Yalova." },
    { title: "Esperienza progetti globale", desc: "Esportazioni in oltre 30 paesi e centinaia di progetti completati." },
  ],
  pillars: [
    { title: "3.000 m² di produzione", desc: "Infrastruttura produttiva moderna" },
    { title: "Export in 30+ Paesi", desc: "Esperienza di progetto globale" },
    { title: "Progettazione con CFD", desc: "Soluzioni basate sull'ingegneria" },
    { title: "Famiglia prodotti certificata", desc: "Standard BSI, ATEX e internazionali" },
    { title: "Competenze R&S e test", desc: "Prestazioni misurabili" },
  ],
  cta: {
    title: "Progettiamo insieme la giusta soluzione aeraulica per il tuo progetto.",
    desc: "Con il nostro team di esperti in ventilatori, evacuazione fumi, unità di trattamento aria e tecnologie motore, offriamo un supporto ingegneristico su misura.",
    button: "Condividi il tuo progetto",
  },
};

/* ── Spanish ─────────────────────────────────────────────────────────── */

const es: HomeVideoStrings = {
  subtitle: "Conozca de cerca la capacidad de producción, el enfoque de ingeniería y la visión global de NOVVES.",
  sideButtons: {
    facilities: {
      title: "Nuestras Instalaciones",
      desc: "Descubre nuestra planta moderna en Yalova.",
    },
    references: {
      title: "Nuestras Referencias",
      desc: "Proyectos exitosos en más de 30 países.",
    },
  },
  featureCards: [
    { title: "Ingeniería basada en CFD", desc: "Análisis CFD por proyecto que aportan las soluciones más precisas." },
    { title: "Alta capacidad de producción", desc: "Fabricación con los más altos estándares de calidad en nuestra planta de Yalova." },
    { title: "Experiencia global en proyectos", desc: "Exportaciones a más de 30 países y cientos de proyectos exitosos." },
  ],
  pillars: [
    { title: "3.000 m² de producción", desc: "Infraestructura de fabricación moderna" },
    { title: "Exportación a más de 30 países", desc: "Experiencia de proyecto global" },
    { title: "Diseño asistido por CFD", desc: "Soluciones basadas en ingeniería" },
    { title: "Familia de productos certificada", desc: "BSI, ATEX y normas internacionales" },
    { title: "Capacidad de I+D y ensayos", desc: "Rendimiento medible" },
  ],
  cta: {
    title: "Diseñemos juntos la solución de aire adecuada para tu proyecto.",
    desc: "Con nuestro equipo experto en ventiladores, evacuación de humos, climatizadores y tecnologías de motor, ofrecemos soporte de ingeniería a medida.",
    button: "Comparte tu proyecto",
  },
};

/* ── Azerbaijani (close to Turkish) ──────────────────────────────────── */

const az: HomeVideoStrings = {
  subtitle: "NOVVES-in istehsal gücünü, mühəndislik yanaşmasını və qlobal vizionunu yaxından tanıyın.",
  sideButtons: {
    facilities: {
      title: "İstehsal Müəssisələrimiz",
      desc: "Yalovadakı müasir istehsal müəssisəmizi kəşf edin.",
    },
    references: {
      title: "Referanslarımız",
      desc: "30+ ölkədə uğurla başa çatdırdığımız layihələr.",
    },
  },
  featureCards: [
    { title: "CFD əsaslı mühəndislik", desc: "Hər layihə üçün CFD analizləri ilə ən dəqiq həlləri təqdim edirik." },
    { title: "Yüksək istehsal gücü", desc: "Yalovadakı müasir müəssisəmizdə yüksək keyfiyyət standartları ilə istehsal." },
    { title: "Qlobal layihə təcrübəsi", desc: "30+ ölkəyə ixracat və yüzlərlə uğurlu layihə tətbiqi." },
  ],
  pillars: [
    { title: "3.000 m² İstehsal Sahəsi", desc: "Müasir istehsal infrastrukturu" },
    { title: "30+ Ölkəyə İxrac", desc: "Qlobal layihə təcrübəsi" },
    { title: "CFD Dəstəkli Dizayn", desc: "Mühəndislik əsaslı həllər" },
    { title: "Sertifikatlı Məhsul Ailəsi", desc: "BSI, ATEX və beynəlxalq standartlar" },
    { title: "Ar-Ge və Test Bacarığı", desc: "Ölçüləbilən performans" },
  ],
  cta: {
    title: "Layihəniz üçün doğru hava həllini birlikdə tasarlayalım.",
    desc: "Fan, tüstü təxliyyəsi, klima qurğusu və mühərrik texnologiyalarındakı mütəxəssis komandamızla layihələrinizə özəl mühəndislik dəstəyi təqdim edirik.",
    button: "Layihənizi paylaşın",
  },
};

/* ── Kazakh ──────────────────────────────────────────────────────────── */

const kk: HomeVideoStrings = {
  subtitle: "NOVVES-тің өндірістік қуатын, инженерлік тәсілін және жаһандық визиясын жақыннан танып біліңіз.",
  sideButtons: {
    facilities: {
      title: "Өндірістік Кешеніміз",
      desc: "Яловадағы заманауи өндіріс кешенімізді көріңіз.",
    },
    references: {
      title: "Референстеріміз",
      desc: "30+ елде сәтті аяқталған жобалар.",
    },
  },
  featureCards: [
    { title: "CFD негізіндегі инженерия", desc: "Әр жоба бойынша CFD талдауы ең дәл шешімдерді ұсынады." },
    { title: "Жоғары өндірістік қуат", desc: "Ялова қаласындағы заманауи зауытта жоғары сапа стандарттарымен өндіріс." },
    { title: "Жаһандық жоба тәжірибесі", desc: "30+ елге экспорт және жүздеген сәтті жоба." },
  ],
  pillars: [
    { title: "3.000 м² Өндірістік Аумақ", desc: "Заманауи өндірістік инфрақұрылым" },
    { title: "30+ Елге Экспорт", desc: "Жаһандық жоба тәжірибесі" },
    { title: "CFD Қолдау Дизайн", desc: "Инженерлік шешімдер" },
    { title: "Сертификатталған Өнім Ассортименті", desc: "BSI, ATEX және халықаралық стандарттар" },
    { title: "Ар-Ге және Сынақ Қабілеті", desc: "Өлшенетін өнімділік" },
  ],
  cta: {
    title: "Жобаңыз үшін дұрыс ауа шешімін бірге жасайық.",
    desc: "Желдеткіш, түтін шығару, кондиционер агрегаты және қозғалтқыш технологияларындағы сарапшы тобымызбен жобаларыңызға арнайы инженерлік қолдау ұсынамыз.",
    button: "Жобаңызды бөлісіңіз",
  },
};

/* ── Tajik ───────────────────────────────────────────────────────────── */

const tg: HomeVideoStrings = {
  subtitle: "Бо иқтидори истеҳсолот, равиши муҳандисӣ ва нигоҳи ҷаҳонии NOVVES аз наздик шинос шавед.",
  sideButtons: {
    facilities: {
      title: "Истеҳсолотҳои Мо",
      desc: "Корхонаи замонавии моро дар Ялова кашф кунед.",
    },
    references: {
      title: "Тавсияҳои Мо",
      desc: "Лоиҳаҳои бомуваффақият дар зиёда аз 30 кишвар.",
    },
  },
  featureCards: [
    { title: "Муҳандисии CFD", desc: "Таҳлили CFD барои ҳар лоиҳа ҳалли дақиқро таъмин мекунад." },
    { title: "Иқтидори баланди истеҳсолӣ", desc: "Истеҳсолот бо стандартҳои олии сифат дар корхонаи муосири мо дар Ялова." },
    { title: "Таҷрибаи глобалии лоиҳаҳо", desc: "Содирот ба зиёда аз 30 кишвар ва садҳо лоиҳаи муваффақ." },
  ],
  pillars: [
    { title: "3.000 м² Майдони истеҳсолот", desc: "Инфрасохтори истеҳсолоти муосир" },
    { title: "Содирот ба 30+ кишвар", desc: "Таҷрибаи лоиҳавии ҷаҳонӣ" },
    { title: "Тарҳрезии бо CFD дастгиришуда", desc: "Ҳалли муҳандисӣ" },
    { title: "Хонадони маҳсулоти сертификатсияшуда", desc: "Стандартҳои BSI, ATEX ва байналмилалӣ" },
    { title: "Қобилияти ТТР ва Санҷиш", desc: "Иҷрои қобили чен" },
  ],
  cta: {
    title: "Барои лоиҳаи шумо ҳалли дурусти ҳаворо якҷоя тарҳрезӣ кунем.",
    desc: "Бо дастаи коршиносонамон дар вентиляторҳо, ихроҷи дуд, агрегатҳои кондитсионерӣ ва технологияҳои муҳаррик дастгирии муҳандисии махсуси лоиҳавиро пешниҳод мекунем.",
    button: "Лоиҳаатонро мубодила кунед",
  },
};

/* ── Chinese (Simplified) ────────────────────────────────────────────── */

const zh: HomeVideoStrings = {
  subtitle: "近距离了解 NOVVES 的制造实力、工程方法与全球愿景。",
  sideButtons: {
    facilities: {
      title: "我们的工厂",
      desc: "探索我们位于亚洛瓦的现代生产基地。",
    },
    references: {
      title: "我们的项目",
      desc: "在30多个国家成功完成的项目。",
    },
  },
  featureCards: [
    { title: "基于 CFD 的工程", desc: "针对每个项目的 CFD 分析,提供最精确的解决方案。" },
    { title: "强大的生产能力", desc: "在亚洛瓦的现代化工厂以最高质量标准生产。" },
    { title: "全球项目经验", desc: "出口至 30 多个国家,完成数百个成功项目。" },
  ],
  pillars: [
    { title: "3,000 平米生产面积", desc: "现代化制造基础设施" },
    { title: "出口至 30+ 国家", desc: "全球项目经验" },
    { title: "CFD 驱动的设计", desc: "工程导向的解决方案" },
    { title: "认证产品家族", desc: "BSI、ATEX 及国际标准" },
    { title: "研发与测试能力", desc: "可量化的性能" },
  ],
  cta: {
    title: "让我们一起为您的项目设计合适的气流解决方案。",
    desc: "凭借在风机、排烟、空调机组和电机技术方面的专家团队,我们为您的项目提供量身定制的工程支持。",
    button: "分享您的项目",
  },
};

/* ── Urdu ────────────────────────────────────────────────────────────── */

const ur: HomeVideoStrings = {
  subtitle: "NOVVES کی پیداواری طاقت، انجینئرنگ اپروچ اور عالمی ویژن کو قریب سے جانیں۔",
  sideButtons: {
    facilities: {
      title: "ہماری سہولیات",
      desc: "یالووا میں ہماری جدید مینوفیکچرنگ پلانٹ دریافت کریں۔",
    },
    references: {
      title: "ہمارے حوالے",
      desc: "30+ ممالک میں کامیاب پروجیکٹس۔",
    },
  },
  featureCards: [
    { title: "CFD پر مبنی انجینئرنگ", desc: "ہر منصوبے کے لیے CFD تجزیے سے درست ترین حل۔" },
    { title: "اعلیٰ پیداواری صلاحیت", desc: "یالووا میں جدید پلانٹ میں اعلیٰ کوالٹی معیار کے ساتھ پیداوار۔" },
    { title: "عالمی منصوبہ تجربہ", desc: "30+ ممالک کو برآمد اور سینکڑوں کامیاب منصوبے۔" },
  ],
  pillars: [
    { title: "3,000 m² پیداواری رقبہ", desc: "جدید مینوفیکچرنگ انفراسٹرکچر" },
    { title: "30+ ممالک کو برآمد", desc: "عالمی پروجیکٹ تجربہ" },
    { title: "CFD سپورٹڈ ڈیزائن", desc: "انجینئرنگ پر مبنی حل" },
    { title: "سرٹیفائیڈ پروڈکٹ فیملی", desc: "BSI، ATEX اور بین الاقوامی معیارات" },
    { title: "تحقیق و ترقی اور ٹیسٹنگ صلاحیت", desc: "قابلِ پیمائش کارکردگی" },
  ],
  cta: {
    title: "آئیے آپ کے منصوبے کے لیے درست ہوا کا حل مل کر ڈیزائن کریں۔",
    desc: "فین، دھواں نکاسی، ایئر ہینڈلنگ یونٹ اور موٹر ٹیکنالوجی میں ہماری ماہر ٹیم کے ساتھ آپ کے منصوبوں کے لیے مخصوص انجینئرنگ سپورٹ فراہم کرتے ہیں۔",
    button: "اپنا منصوبہ شیئر کریں",
  },
};

/* ── Lithuanian ──────────────────────────────────────────────────────── */

const lt: HomeVideoStrings = {
  subtitle: "Iš arti susipažinkite su NOVVES gamybos galia, inžineriniu požiūriu ir globalia vizija.",
  sideButtons: {
    facilities: {
      title: "Mūsų Gamyklos",
      desc: "Aplankykite mūsų modernią gamyklą Jalovoje.",
    },
    references: {
      title: "Mūsų Referencijos",
      desc: "Sėkmingai įgyvendinti projektai 30+ šalių.",
    },
  },
  featureCards: [
    { title: "CFD pagrįsta inžinerija", desc: "Kiekvieno projekto CFD analizė užtikrina tiksliausius sprendimus." },
    { title: "Aukštas gamybos pajėgumas", desc: "Gamyba aukščiausiais kokybės standartais mūsų modernioje Jalovos gamykloje." },
    { title: "Pasaulinė projektų patirtis", desc: "Eksportas į 30+ šalių ir šimtai sėkmingų projektų." },
  ],
  pillars: [
    { title: "3 000 m² gamybos plotas", desc: "Moderni gamybos infrastruktūra" },
    { title: "Eksportas į 30+ šalių", desc: "Globali projekto patirtis" },
    { title: "CFD pagrindu projektavimas", desc: "Inžinerinės sprendimo bazės" },
    { title: "Sertifikuota produktų šeima", desc: "BSI, ATEX ir tarptautiniai standartai" },
    { title: "MTEP ir bandymų pajėgumai", desc: "Matuojamas našumas" },
  ],
  cta: {
    title: "Sukurkime kartu tinkamą oro sprendimą jūsų projektui.",
    desc: "Su ekspertų komanda ventiliatorių, dūmų šalinimo, oro paruošimo įrenginių ir variklių technologijų srityse teikiame projektui pritaikytą inžinerinę pagalbą.",
    button: "Pasidalinkite projektu",
  },
};

/* ── Polish ──────────────────────────────────────────────────────────── */

const pl: HomeVideoStrings = {
  subtitle: "Poznaj z bliska siłę produkcyjną, podejście inżynieryjne i globalną wizję NOVVES.",
  sideButtons: {
    facilities: {
      title: "Nasze Zakłady",
      desc: "Odkryj nasz nowoczesny zakład w Yalova.",
    },
    references: {
      title: "Nasze Referencje",
      desc: "Pomyślne projekty w ponad 30 krajach.",
    },
  },
  featureCards: [
    { title: "Inżynieria oparta na CFD", desc: "Analizy CFD dla każdego projektu zapewniają najdokładniejsze rozwiązania." },
    { title: "Wysokie moce produkcyjne", desc: "Produkcja na najwyższych standardach jakości w nowoczesnym zakładzie w Yalova." },
    { title: "Globalne doświadczenie projektowe", desc: "Eksport do ponad 30 krajów i setki zrealizowanych projektów." },
  ],
  pillars: [
    { title: "3 000 m² powierzchni produkcyjnej", desc: "Nowoczesna infrastruktura produkcyjna" },
    { title: "Eksport do ponad 30 krajów", desc: "Globalne doświadczenie projektowe" },
    { title: "Projektowanie CFD", desc: "Rozwiązania oparte na inżynierii" },
    { title: "Certyfikowana rodzina produktów", desc: "Normy BSI, ATEX i międzynarodowe" },
    { title: "Kompetencje B+R i testów", desc: "Mierzalna wydajność" },
  ],
  cta: {
    title: "Zaprojektujmy razem właściwe rozwiązanie powietrzne dla Twojego projektu.",
    desc: "Z naszym zespołem ekspertów w wentylatorach, oddymianiu, centralach klimatyzacyjnych i technologiach silnikowych zapewniamy dedykowane wsparcie inżynieryjne.",
    button: "Udostępnij swój projekt",
  },
};

const HOME_VIDEO_I18N: Record<string, HomeVideoStrings> = {
  tr, en, ru, ar, de, fr, it, es, az, kk, tg, zh, ur, lt, pl,
};

export function getHomeVideoStrings(locale: string): HomeVideoStrings {
  return HOME_VIDEO_I18N[locale] ?? en;
}
