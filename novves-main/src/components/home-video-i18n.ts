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
  subtitle: "NOVVES'in mühendislik yaklaşımı, üretim gücü ve global vizyonu.",
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
    {
      title: "GÜVENLİK",
      desc: "Duman tahliye ve yangın güvenliği için en güvenilir çözümler.",
    },
    {
      title: "PERFORMANS",
      desc: "Yüksek verimli fan sistemleri ile maksimum performans.",
    },
    {
      title: "MÜHENDİSLİK",
      desc: "İnovatif mühendislik yaklaşımı ile özelleştirilmiş çözümler.",
    },
    {
      title: "KALİTE",
      desc: "Uluslararası standartlara uygun üretim ve kalite kontrol.",
    },
    {
      title: "SÜRDÜRÜLEBİLİRLİK",
      desc: "Enerji verimliliği ve çevre dostu çözümler.",
    },
  ],
  cta: {
    title: "Projeniz için mühendislik desteğine mi ihtiyacınız var?",
    desc: "Uzman ekibimiz, projenizin her aşamasında yanınızda.",
    button: "Projenizi Paylaşın",
  },
};

const en: HomeVideoStrings = {
  subtitle: "The engineering approach, manufacturing power and global vision of NOVVES.",
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
    {
      title: "SAFETY",
      desc: "Trusted solutions for smoke extraction and fire safety.",
    },
    {
      title: "PERFORMANCE",
      desc: "Maximum performance with high-efficiency fan systems.",
    },
    {
      title: "ENGINEERING",
      desc: "Tailored solutions backed by innovative engineering.",
    },
    {
      title: "QUALITY",
      desc: "Manufacturing and quality control to international standards.",
    },
    {
      title: "SUSTAINABILITY",
      desc: "Energy-efficient and environmentally friendly solutions.",
    },
  ],
  cta: {
    title: "Need engineering support for your project?",
    desc: "Our expert team supports you at every stage of your project.",
    button: "Share Your Project",
  },
};

const ru: HomeVideoStrings = {
  subtitle: "Инженерный подход, производственная мощность и глобальное видение NOVVES.",
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
    { title: "БЕЗОПАСНОСТЬ", desc: "Надёжные решения для дымоудаления и пожарной безопасности." },
    { title: "ПРОИЗВОДИТЕЛЬНОСТЬ", desc: "Максимальная эффективность благодаря высокоэффективным вентиляторам." },
    { title: "ИНЖЕНЕРИЯ", desc: "Индивидуальные решения, подкреплённые инновационной инженерией." },
    { title: "КАЧЕСТВО", desc: "Производство и контроль качества по международным стандартам." },
    { title: "УСТОЙЧИВОСТЬ", desc: "Энергоэффективные и экологичные решения." },
  ],
  cta: {
    title: "Нужна инженерная поддержка для вашего проекта?",
    desc: "Наша команда экспертов рядом с вами на каждом этапе.",
    button: "Поделиться проектом",
  },
};

const ar: HomeVideoStrings = {
  subtitle: "النهج الهندسي والقدرة الإنتاجية والرؤية العالمية لـ NOVVES.",
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
    { title: "السلامة", desc: "حلول موثوقة لاستخراج الدخان والسلامة من الحرائق." },
    { title: "الأداء", desc: "أداء أقصى مع مراوح عالية الكفاءة." },
    { title: "الهندسة", desc: "حلول مخصصة مدعومة بهندسة مبتكرة." },
    { title: "الجودة", desc: "تصنيع ومراقبة جودة وفق المعايير الدولية." },
    { title: "الاستدامة", desc: "حلول موفرة للطاقة وصديقة للبيئة." },
  ],
  cta: {
    title: "هل تحتاج إلى دعم هندسي لمشروعك؟",
    desc: "فريق الخبراء لدينا يدعمك في كل مرحلة من مشروعك.",
    button: "شارك مشروعك",
  },
};

const de: HomeVideoStrings = {
  subtitle: "Engineering-Ansatz, Produktionskraft und globale Vision von NOVVES.",
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
    { title: "SICHERHEIT", desc: "Verlässliche Lösungen für Entrauchung und Brandschutz." },
    { title: "LEISTUNG", desc: "Maximale Performance durch hocheffiziente Ventilatorsysteme." },
    { title: "ENGINEERING", desc: "Maßgeschneiderte Lösungen durch innovatives Engineering." },
    { title: "QUALITÄT", desc: "Fertigung und Qualitätssicherung nach internationalen Normen." },
    { title: "NACHHALTIGKEIT", desc: "Energieeffiziente und umweltfreundliche Lösungen." },
  ],
  cta: {
    title: "Brauchen Sie technische Unterstützung für Ihr Projekt?",
    desc: "Unser Expertenteam begleitet Sie in jeder Projektphase.",
    button: "Projekt teilen",
  },
};

const fr: HomeVideoStrings = {
  subtitle: "L'approche d'ingénierie, la puissance de production et la vision globale de NOVVES.",
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
    { title: "SÉCURITÉ", desc: "Solutions fiables pour désenfumage et sécurité incendie." },
    { title: "PERFORMANCE", desc: "Performance maximale grâce à des ventilateurs haute efficacité." },
    { title: "INGÉNIERIE", desc: "Solutions sur mesure portées par une ingénierie innovante." },
    { title: "QUALITÉ", desc: "Fabrication et contrôle qualité aux normes internationales." },
    { title: "DURABILITÉ", desc: "Solutions écoénergétiques et respectueuses de l'environnement." },
  ],
  cta: {
    title: "Besoin d'un accompagnement technique pour votre projet ?",
    desc: "Notre équipe d'experts vous accompagne à chaque étape.",
    button: "Partager votre projet",
  },
};

/* ── Italian ─────────────────────────────────────────────────────────── */

const it: HomeVideoStrings = {
  subtitle: "L'approccio ingegneristico, la capacità produttiva e la visione globale di NOVVES.",
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
    { title: "SICUREZZA", desc: "Soluzioni affidabili per evacuazione fumi e sicurezza antincendio." },
    { title: "PRESTAZIONI", desc: "Massima resa con sistemi di ventilazione ad alta efficienza." },
    { title: "INGEGNERIA", desc: "Soluzioni su misura con un approccio ingegneristico innovativo." },
    { title: "QUALITÀ", desc: "Produzione e controllo qualità secondo standard internazionali." },
    { title: "SOSTENIBILITÀ", desc: "Soluzioni efficienti dal punto di vista energetico ed ecocompatibili." },
  ],
  cta: {
    title: "Hai bisogno di supporto ingegneristico per il tuo progetto?",
    desc: "Il nostro team di esperti ti accompagna in ogni fase del progetto.",
    button: "Condividi il tuo progetto",
  },
};

/* ── Spanish ─────────────────────────────────────────────────────────── */

const es: HomeVideoStrings = {
  subtitle: "El enfoque de ingeniería, la capacidad de producción y la visión global de NOVVES.",
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
    { title: "SEGURIDAD", desc: "Soluciones fiables para extracción de humos y seguridad contra incendios." },
    { title: "RENDIMIENTO", desc: "Máximo rendimiento con sistemas de ventilación de alta eficiencia." },
    { title: "INGENIERÍA", desc: "Soluciones a medida respaldadas por una ingeniería innovadora." },
    { title: "CALIDAD", desc: "Fabricación y control de calidad según normas internacionales." },
    { title: "SOSTENIBILIDAD", desc: "Soluciones eficientes energéticamente y respetuosas con el medio ambiente." },
  ],
  cta: {
    title: "¿Necesitas soporte de ingeniería para tu proyecto?",
    desc: "Nuestro equipo de expertos te acompaña en cada etapa.",
    button: "Comparte tu proyecto",
  },
};

/* ── Azerbaijani (close to Turkish) ──────────────────────────────────── */

const az: HomeVideoStrings = {
  subtitle: "NOVVES-in mühəndislik yanaşması, istehsal gücü və qlobal vizyonu.",
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
    { title: "TƏHLÜKƏSİZLİK", desc: "Tüstü tahliyəsi və yanğın təhlükəsizliyi üçün etibarlı həllər." },
    { title: "PERFORMANS", desc: "Yüksək səmərəli fan sistemləri ilə maksimum performans." },
    { title: "MÜHƏNDİSLİK", desc: "İnnovativ mühəndislik yanaşması ilə fərdiləşdirilmiş həllər." },
    { title: "KEYFİYYƏT", desc: "Beynəlxalq standartlara uyğun istehsal və keyfiyyət nəzarəti." },
    { title: "DAYANIQLILIQ", desc: "Enerji səmərəli və ekoloji həllər." },
  ],
  cta: {
    title: "Layihəniz üçün mühəndislik dəstəyinə ehtiyacınız var?",
    desc: "Mütəxəssis komandamız layihənizin hər mərhələsində yanınızdadır.",
    button: "Layihənizi paylaşın",
  },
};

/* ── Kazakh ──────────────────────────────────────────────────────────── */

const kk: HomeVideoStrings = {
  subtitle: "NOVVES-тің инженерлік тәсілі, өндірістік қуаты және жаһандық көзқарасы.",
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
    { title: "ҚАУІПСІЗДІК", desc: "Түтін шығару және өрт қауіпсіздігі үшін сенімді шешімдер." },
    { title: "ӨНІМДІЛІК", desc: "Жоғары тиімді желдеткіш жүйелерімен ең жоғары өнімділік." },
    { title: "ИНЖЕНЕРИЯ", desc: "Инновациялық инженериямен жасалған бейімделген шешімдер." },
    { title: "САПА", desc: "Халықаралық стандарттарға сай өндіріс және сапа бақылауы." },
    { title: "ТҰРАҚТЫЛЫҚ", desc: "Энергияны үнемдейтін және экологиялық таза шешімдер." },
  ],
  cta: {
    title: "Жобаңыз үшін инженерлік қолдау керек пе?",
    desc: "Біздің сарапшылар тобы жобаңыздың әр кезеңінде сізбен бірге.",
    button: "Жобаңызды бөлісіңіз",
  },
};

/* ── Tajik ───────────────────────────────────────────────────────────── */

const tg: HomeVideoStrings = {
  subtitle: "Равиши муҳандисӣ, иқтидори истеҳсолӣ ва биниши глобалии NOVVES.",
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
    { title: "АМНИЯТ", desc: "Ҳалли боэътимод барои хориҷ кардани дуд ва амнияти оташ." },
    { title: "САМАРАНОКӢ", desc: "Самаранокии баландтарин бо системаҳои самаранокӣ." },
    { title: "МУҲАНДИСӢ", desc: "Ҳалли мутобиқшуда бо равиши инноватсионии муҳандисӣ." },
    { title: "СИФАТ", desc: "Истеҳсолот ва назорати сифат тибқи стандартҳои байналмилалӣ." },
    { title: "УСТУВОРӢ", desc: "Ҳалли самараноки энергетикӣ ва дӯсти муҳити зист." },
  ],
  cta: {
    title: "Барои лоиҳаатон дастгирии муҳандисӣ лозим аст?",
    desc: "Дастаи коршиносони мо дар ҳар марҳилаи лоиҳа дар канори шумо.",
    button: "Лоиҳаатонро мубодила кунед",
  },
};

/* ── Chinese (Simplified) ────────────────────────────────────────────── */

const zh: HomeVideoStrings = {
  subtitle: "NOVVES 的工程理念、生产能力与全球视野。",
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
    { title: "安全", desc: "可靠的排烟与防火安全解决方案。" },
    { title: "性能", desc: "高效风机系统带来卓越性能。" },
    { title: "工程", desc: "通过创新工程提供定制化方案。" },
    { title: "品质", desc: "符合国际标准的生产与质量控制。" },
    { title: "可持续性", desc: "节能且环保的解决方案。" },
  ],
  cta: {
    title: "您的项目需要工程支持吗?",
    desc: "我们的专家团队在项目每个阶段为您提供支持。",
    button: "分享您的项目",
  },
};

/* ── Urdu ────────────────────────────────────────────────────────────── */

const ur: HomeVideoStrings = {
  subtitle: "NOVVES کا انجینئرنگ نقطۂ نظر، پیداواری طاقت اور عالمی وژن۔",
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
    { title: "حفاظت", desc: "دھواں نکالنے اور آگ سے تحفظ کے قابل اعتماد حل۔" },
    { title: "کارکردگی", desc: "اعلیٰ کارکردگی والے فین سسٹمز سے زیادہ سے زیادہ پرفارمنس۔" },
    { title: "انجینئرنگ", desc: "اختراعی انجینئرنگ کے ساتھ حسبِ ضرورت حل۔" },
    { title: "کوالٹی", desc: "بین الاقوامی معیارات کے مطابق پیداوار اور کوالٹی کنٹرول۔" },
    { title: "پائیداری", desc: "توانائی کی کفایت اور ماحول دوست حل۔" },
  ],
  cta: {
    title: "آپ کے منصوبے کے لیے انجینئرنگ سپورٹ درکار ہے؟",
    desc: "ہماری ماہرین کی ٹیم منصوبے کے ہر مرحلے پر آپ کے ساتھ ہے۔",
    button: "اپنا منصوبہ شیئر کریں",
  },
};

/* ── Lithuanian ──────────────────────────────────────────────────────── */

const lt: HomeVideoStrings = {
  subtitle: "NOVVES inžinerinis požiūris, gamybos pajėgumas ir globali vizija.",
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
    { title: "SAUGA", desc: "Patikimi dūmų šalinimo ir priešgaisrinės saugos sprendimai." },
    { title: "OPTIMALUMAS", desc: "Maksimalus našumas su didelio efektyvumo ventiliatorių sistemomis." },
    { title: "INŽINERIJA", desc: "Pritaikyti sprendimai, paremti inovatyvia inžinerija." },
    { title: "KOKYBĖ", desc: "Gamyba ir kokybės kontrolė pagal tarptautinius standartus." },
    { title: "TVARUMAS", desc: "Energiją tausojantys ir aplinkai draugiški sprendimai." },
  ],
  cta: {
    title: "Reikia inžinerinės pagalbos jūsų projektui?",
    desc: "Mūsų ekspertų komanda yra šalia kiekvienoje projekto stadijoje.",
    button: "Pasidalinkite projektu",
  },
};

/* ── Polish ──────────────────────────────────────────────────────────── */

const pl: HomeVideoStrings = {
  subtitle: "Podejście inżynieryjne, moce produkcyjne i globalna wizja NOVVES.",
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
    { title: "BEZPIECZEŃSTWO", desc: "Niezawodne rozwiązania oddymiania i ochrony przeciwpożarowej." },
    { title: "WYDAJNOŚĆ", desc: "Maksymalna wydajność dzięki wysokosprawnym wentylatorom." },
    { title: "INŻYNIERIA", desc: "Dopasowane rozwiązania oparte na innowacyjnej inżynierii." },
    { title: "JAKOŚĆ", desc: "Produkcja i kontrola jakości zgodnie z normami międzynarodowymi." },
    { title: "ZRÓWNOWAŻONY ROZWÓJ", desc: "Energooszczędne i przyjazne środowisku rozwiązania." },
  ],
  cta: {
    title: "Potrzebujesz wsparcia inżynieryjnego dla swojego projektu?",
    desc: "Nasz zespół ekspertów wspiera Cię na każdym etapie projektu.",
    button: "Udostępnij swój projekt",
  },
};

const HOME_VIDEO_I18N: Record<string, HomeVideoStrings> = {
  tr, en, ru, ar, de, fr, it, es, az, kk, tg, zh, ur, lt, pl,
};

export function getHomeVideoStrings(locale: string): HomeVideoStrings {
  return HOME_VIDEO_I18N[locale] ?? en;
}
