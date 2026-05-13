import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/config";
import { getDictionary, hasLocale, type Locale } from "../../dictionaries";
import { sosyalMedyaCopyExtras } from "../sosyal-medya-copy-extras";
import type { LocalizedSocialPageCopy, SocialPlatformKey } from "../sosyal-medya-copy.types";

type PlatformKey = SocialPlatformKey;
type LocalizedPageCopy = LocalizedSocialPageCopy;

const sosyalPageExplicitLocales = new Set<Locale>([
  "tr",
  "en",
  "ru",
  "kk",
  "tg",
  "es",
  "zh",
  "ur",
  ...(Object.keys(sosyalMedyaCopyExtras) as Locale[]),
]);

type PlatformDefinition = {
  key: PlatformKey;
  name: string;
  handle: string;
  href: string;
  accentClass: string;
  iconClass: string;
  ringClass: string;
  glow: string;
  icon: React.ReactNode;
};

const sosyalMedyaPageCopyEn: LocalizedPageCopy = {
    heroKicker: "Digital Presence",
    heroLead:
      "We gathered corporate updates, product videos, and field-driven storytelling into one clear social layer. Each channel has a specific job, and this page makes that structure immediately readable.",
    stats: [
      { value: "6", label: "active channels" },
      { value: "TR + Global", label: "market focus" },
      { value: "Corporate + Product", label: "content axis" },
    ],
    primaryCta: "Back to contact page",
    secondaryCta: "View our partners",
    previewEyebrow: "Publishing Architecture",
    previewTitle: "Every channel plays a different role.",
    previewDesc:
      "Turkey and global LinkedIn accounts carry the corporate story at different scales, Facebook supports wider social visibility, YouTube deepens the product and engineering narrative, and Instagram keeps the brand rhythm visible for different audiences.",
    previewCards: [
      {
        label: "Corporate Narrative",
        title: "Team, brand, and reference stories",
        stat: "LinkedIn TR / Global / Facebook",
      },
      {
        label: "Technical Content",
        title: "Video, demos, and product-led explanations",
        stat: "YouTube",
      },
      {
        label: "Live Flow",
        title: "A split social storefront for Turkey and global markets",
        stat: "Instagram",
      },
    ],
    highlightsLabel: "Content Map",
    highlightsTitle: "Understand what each channel is for at a glance.",
    highlightsDesc:
      "This page is designed as a digital brand layer, not a plain link list. The blocks below show what kind of value each social channel delivers.",
    highlights: [
      {
        title: "Corporate trust",
        description:
          "The right place for references, event visibility, company news, and professional network communication.",
        stat: "Corporate focus",
      },
      {
        title: "Engineering storytelling",
        description:
          "A video-first flow for product explainers, technical narratives, and deeper content consumption.",
        stat: "Video focus",
      },
      {
        title: "Market split",
        description:
          "Separate Turkey and global accounts allow each audience to follow the brand at its own pace.",
        stat: "Regional focus",
      },
    ],
    sectionLabel: "Channel Selection",
    sectionTitle: "Enter the right social stream for your need.",
    sectionDesc:
      "These cards do more than show the platform. They also signal tone, content type, and what you should expect after clicking.",
    externalNote: "All links open in a new tab.",
    footerLabel: "Next Step",
    footerTitle: "Move from social visibility to direct project contact.",
    footerDesc:
      "For discovery, technical consultation, or product guidance, connect directly with our team. Social channels build familiarity, but project momentum starts with direct communication.",
    footerPrimary: "Contact Form",
    footerSecondary: "Our Partners",
    platforms: {
      linkedin: {
        eyebrow: "Turkey LinkedIn",
        summary:
          "The main showcase for Turkey-focused brand updates, project news, and professional network communication.",
        tags: ["References", "Company updates"],
      },
      linkedinGlobal: {
        eyebrow: "Global LinkedIn",
        summary:
          "A separate LinkedIn layer for international visibility, global business language, and outward-facing corporate storytelling.",
        tags: ["Global network", "Corporate communication"],
      },
      youtube: {
        eyebrow: "Video Channel",
        summary:
          "Built for people who want to explore product behavior and engineering content in a deeper format.",
        tags: ["Product videos", "Technical explainers"],
      },
      facebook: {
        eyebrow: "Community Feed",
        summary:
          "A supporting channel for wider social visibility, announcements, and ongoing brand updates.",
        tags: ["Announcements", "Community reach"],
      },
      instagramTr: {
        eyebrow: "Turkey Account",
        summary:
          "A warmer, more immediate, and more visual Novves flow for the local market language.",
        tags: ["Local content", "Visual storefront"],
      },
      instagramGlobal: {
        eyebrow: "Global Account",
        summary:
          "A distinct channel for international storytelling, brand visibility, and global audience presence.",
        tags: ["Global storefront", "Brand voice"],
      },
    },
};

const pageCopy: Record<Locale, LocalizedPageCopy> = {
  tr: {
    heroKicker: "Dijital Görünürlük",
    heroLead:
      "Kurumsal duyurular, ürün videoları ve saha odaklı paylaşımları tek bir net akışta topladık. Her kanal farklı bir görev üstleniyor; bu sayfa da o mimariyi okunur hale getiriyor.",
    stats: [
      { value: "6", label: "aktif kanal" },
      { value: "TR + Global", label: "yayın odağı" },
      { value: "Kurumsal + Ürün", label: "içerik ekseni" },
    ],
    primaryCta: "İletişim sayfasına dön",
    secondaryCta: "Partnerlerimizi incele",
    previewEyebrow: "Yayın Mimarisi",
    previewTitle: "Her kanal farklı bir rol oynuyor.",
    previewDesc:
      "LinkedIn'in Türkiye ve global hesapları kurumsal hikayeyi farklı ölçeklerde taşırken, Facebook daha geniş sosyal görünürlüğü destekliyor. YouTube ürün ve mühendislik anlatılarını derinleştiriyor, Instagram hesapları ise markanın günlük ritmini görünür kılıyor.",
    previewCards: [
      {
        label: "Kurumsal Anlatı",
        title: "Takım, marka ve referans hikayeleri",
        stat: "LinkedIn TR / Global / Facebook",
      },
      {
        label: "Teknik İçerik",
        title: "Video, demo ve ürün odaklı anlatımlar",
        stat: "YouTube",
      },
      {
        label: "Canlı Akış",
        title: "Türkiye ve global pazara ayrışan sosyal vitrin",
        stat: "Instagram",
      },
    ],
    highlightsLabel: "İçerik Haritası",
    highlightsTitle: "Hangi kanalda ne bulacağını ilk bakışta anla.",
    highlightsDesc:
      "Bu sayfayı bir link listesi gibi değil, Novves'in dijital vitrin katmanı gibi kurguladık. Aşağıdaki bloklar sana her kanal tipinin nasıl bir içerik sunduğunu hızlıca anlatır.",
    highlights: [
      {
        title: "Kurumsal güven",
        description:
          "Referanslar, fuar görünürlüğü, şirket haberleri ve profesyonel ağ iletişimi için en doğru durak.",
        stat: "Kurumsal odak",
      },
      {
        title: "Mühendislik anlatımı",
        description:
          "Ürün videoları, teknik anlatılar ve daha derin içerik tüketimi için video merkezli akış.",
        stat: "Video odak",
      },
      {
        title: "Pazar ayrımı",
        description:
          "Türkiye ve global hesapların ayrışması sayesinde her hedef kitle kendi ritminde takip edebilir.",
        stat: "Bölgesel odak",
      },
    ],
    sectionLabel: "Kanal Seçimi",
    sectionTitle: "İhtiyacına göre doğru sosyal akışa gir.",
    sectionDesc:
      "Kartlar sadece platformu göstermiyor; tonunu, içerik tipini ve seni neyin beklediğini de hissettiriyor.",
    externalNote: "Tüm bağlantılar yeni sekmede açılır.",
    footerLabel: "Bir Sonraki Adım",
    footerTitle: "Sosyal medyadan sonra doğrudan proje sürecine geçin.",
    footerDesc:
      "Keşif, teknik görüşme ya da doğru ürün seçimi için ekibimizle doğrudan iletişime geçin. Sosyal medya kanallarımız markamızı ve çalışmalarımızı yakından tanımanızı sağlar; proje süreci ise birebir iletişimle netleşir ve hız kazanır.",
    footerPrimary: "İletişim Formu",
    footerSecondary: "Partnerlerimiz",
    platforms: {
      linkedin: {
        eyebrow: "LinkedIn Türkiye",
        summary:
          "Türkiye odaklı kurumsal güncellemeler, proje haberleri ve profesyonel ağ iletişimi için ana vitrin.",
        tags: ["Referanslar", "Şirket haberleri"],
      },
      linkedinGlobal: {
        eyebrow: "Global LinkedIn",
        summary:
          "Uluslararası görünürlük, global iş dili ve yurt dışı odaklı kurumsal anlatı için ayrışan LinkedIn kanalı.",
        tags: ["Global ağ", "Kurumsal iletişim"],
      },
      youtube: {
        eyebrow: "Video Kanal",
        summary:
          "Ürünlerin nasıl çalıştığını ve mühendislik tarafını daha uzun soluklu formatta izlemek isteyenler için.",
        tags: ["Ürün videoları", "Teknik anlatım"],
      },
      facebook: {
        eyebrow: "Topluluk Akışı",
        summary:
          "Daha geniş sosyal görünürlük, duyurular ve güncel marka paylaşımları için destek kanalı.",
        tags: ["Duyurular", "Topluluk erişimi"],
      },
      instagramTr: {
        eyebrow: "Türkiye Hesabı",
        summary:
          "Yerel pazar diliyle daha sıcak, daha anlık ve daha görsel bir Novves akışı.",
        tags: ["Yerel içerik", "Görsel vitrin"],
      },
      instagramGlobal: {
        eyebrow: "Global Hesap",
        summary:
          "Uluslararası anlatım, marka görünürlüğü ve global hedef kitle için ayrışan kanal.",
        tags: ["Global vitrin", "Marka dili"],
      },
    },
  },
  en: sosyalMedyaPageCopyEn,
  es: {
    heroKicker: "Presencia digital",
    heroLead:
      "Hemos reunido noticias corporativas, vídeos de producto y relatos de campo en una capa social clara. Cada canal cumple una función concreta; esta página hace que esa estructura sea fácil de leer.",
    stats: [
      { value: "6", label: "canales activos" },
      { value: "TR + Global", label: "enfoque de mercado" },
      { value: "Corporativo + Producto", label: "eje de contenido" },
    ],
    primaryCta: "Volver a contacto",
    secondaryCta: "Ver nuestros socios",
    previewEyebrow: "Arquitectura de publicación",
    previewTitle: "Cada canal cumple un rol distinto.",
    previewDesc:
      "Las cuentas de LinkedIn en Turquía y a nivel global llevan la historia corporativa a distintas escalas, Facebook apoya una mayor visibilidad social, YouTube profundiza la narrativa de producto e ingeniería, e Instagram muestra el ritmo diario de la marca para distintas audiencias.",
    previewCards: [
      {
        label: "Relato corporativo",
        title: "Historias de equipo, marca y referencias",
        stat: "LinkedIn TR / Global / Facebook",
      },
      {
        label: "Contenido técnico",
        title: "Vídeo, demostraciones y explicaciones centradas en el producto",
        stat: "YouTube",
      },
      {
        label: "Flujo en vivo",
        title: "Escaparate social segmentado para Turquía y mercados globales",
        stat: "Instagram",
      },
    ],
    highlightsLabel: "Mapa de contenido",
    highlightsTitle: "Entienda de un vistazo para qué sirve cada canal.",
    highlightsDesc:
      "Esta página está pensada como capa digital de la marca, no como una simple lista de enlaces. Los bloques siguientes muestran el tipo de valor que aporta cada canal social.",
    highlights: [
      {
        title: "Confianza corporativa",
        description:
          "El lugar adecuado para referencias, visibilidad en eventos, noticias de la empresa y la comunicación en redes profesionales.",
        stat: "Enfoque corporativo",
      },
      {
        title: "Narrativa de ingeniería",
        description:
          "Un flujo orientado a vídeo para explicaciones de producto, relatos técnicos y consumo de contenido más profundo.",
        stat: "Enfoque en vídeo",
      },
      {
        title: "Segmentación por mercado",
        description:
          "Cuentas separadas para Turquía y el ámbito global permiten que cada audiencia siga la marca a su propio ritmo.",
        stat: "Enfoque regional",
      },
    ],
    sectionLabel: "Selección de canal",
    sectionTitle: "Entre en el flujo social adecuado para su necesidad.",
    sectionDesc:
      "Las tarjetas no muestran solo la plataforma; también transmiten el tono, el tipo de contenido y qué puede esperar al hacer clic.",
    externalNote: "Todos los enlaces se abren en una nueva pestaña.",
    footerLabel: "Siguiente paso",
    footerTitle: "Pase de la visibilidad en redes al contacto directo del proyecto.",
    footerDesc:
      "Para exploración, consulta técnica o orientación sobre producto, conecte directamente con nuestro equipo. Las redes generan familiaridad; el impulso del proyecto nace de la comunicación directa.",
    footerPrimary: "Formulario de contacto",
    footerSecondary: "Nuestros socios",
    platforms: {
      linkedin: {
        eyebrow: "LinkedIn Turquía",
        summary:
          "El escaparate principal para actualizaciones corporativas centradas en Turquía, noticias de proyectos y la comunicación en la red profesional.",
        tags: ["Referencias", "Noticias de la empresa"],
      },
      linkedinGlobal: {
        eyebrow: "LinkedIn global",
        summary:
          "Una capa de LinkedIn independiente para visibilidad internacional, lenguaje empresarial global y relato corporativo orientado al exterior.",
        tags: ["Red global", "Comunicación corporativa"],
      },
      youtube: {
        eyebrow: "Canal de vídeo",
        summary:
          "Pensado para quienes desean explorar el comportamiento del producto y el contenido de ingeniería con más profundidad.",
        tags: ["Vídeos de producto", "Explicaciones técnicas"],
      },
      facebook: {
        eyebrow: "Feed comunitario",
        summary:
          "Canal de apoyo para mayor visibilidad social, anuncios y actualizaciones continuas de la marca.",
        tags: ["Anuncios", "Alcance comunitario"],
      },
      instagramTr: {
        eyebrow: "Cuenta Turquía",
        summary:
          "Un flujo de Novves más cercano, ágil y visual con el lenguaje del mercado local.",
        tags: ["Contenido local", "Escaparate visual"],
      },
      instagramGlobal: {
        eyebrow: "Cuenta global",
        summary:
          "Un canal independiente para relato internacional, visibilidad de marca y presencia ante un público global.",
        tags: ["Escaparate global", "Voz de marca"],
      },
    },
  },
  zh: {
    heroKicker: "数字形象",
    heroLead:
      "我们将企业动态、产品视频与现场叙事整合为清晰的一层社交内容。每个渠道承担明确分工；本页让这一结构一目了然。",
    stats: [
      { value: "6", label: "活跃渠道" },
      { value: "TR + Global", label: "市场侧重" },
      { value: "企业 + 产品", label: "内容主轴" },
    ],
    primaryCta: "返回联系页",
    secondaryCta: "查看合作伙伴",
    previewEyebrow: "发布架构",
    previewTitle: "每个渠道扮演不同角色。",
    previewDesc:
      "土耳其与全球 LinkedIn 账号在不同尺度传递企业叙事，Facebook 支撑更广泛的社交曝光，YouTube 深化产品与工程故事，Instagram 账号让品牌节奏对不同受众可见。",
    previewCards: [
      {
        label: "企业叙事",
        title: "团队、品牌与案例故事",
        stat: "LinkedIn TR / Global / Facebook",
      },
      {
        label: "技术内容",
        title: "视频、演示与以产品为中心的讲解",
        stat: "YouTube",
      },
      {
        label: "实时动态",
        title: "面向土耳其与全球市场的分开展示",
        stat: "Instagram",
      },
    ],
    highlightsLabel: "内容地图",
    highlightsTitle: "一眼看懂各渠道的用途。",
    highlightsDesc:
      "本页按数字品牌层级设计，而非简单链接列表。下方版块说明各社交渠道提供的价值类型。",
    highlights: [
      {
        title: "企业信任",
        description:
          "案例、活动露出、公司新闻与专业网络沟通的首选入口。",
        stat: "企业侧重",
      },
      {
        title: "工程叙事",
        description:
          "以视频为主的内容流，适合产品讲解、技术叙事与更深度的阅读。",
        stat: "视频侧重",
      },
      {
        title: "市场划分",
        description:
          "土耳其与全球账号分立，让不同受众按自身节奏关注品牌。",
        stat: "区域侧重",
      },
    ],
    sectionLabel: "渠道选择",
    sectionTitle: "按需求进入合适的社交内容流。",
    sectionDesc:
      "卡片不仅展示平台，也传达语气、内容类型以及点击后的预期体验。",
    externalNote: "所有链接在新标签页打开。",
    footerLabel: "下一步",
    footerTitle: "从社交曝光转向项目直接沟通。",
    footerDesc:
      "如需初步了解、技术咨询或产品选型，请直接联系我们的团队。社交渠道建立熟悉感，而项目推进始于面对面沟通。",
    footerPrimary: "联系表单",
    footerSecondary: "我们的合作伙伴",
    platforms: {
      linkedin: {
        eyebrow: "LinkedIn 土耳其",
        summary:
          "面向土耳其的企业更新、项目新闻与专业人脉沟通的主要展示窗口。",
        tags: ["案例", "公司动态"],
      },
      linkedinGlobal: {
        eyebrow: "全球 LinkedIn",
        summary:
          "独立的 LinkedIn 渠道，用于国际曝光、全球商务语境与外向型企业叙事。",
        tags: ["全球网络", "企业传播"],
      },
      youtube: {
        eyebrow: "视频频道",
        summary:
          "适合希望更深入了解产品表现与工程内容的受众。",
        tags: ["产品视频", "技术讲解"],
      },
      facebook: {
        eyebrow: "社区信息流",
        summary:
          "辅助渠道，用于更广泛的社交可见度、公告与持续的品牌更新。",
        tags: ["公告", "社区触达"],
      },
      instagramTr: {
        eyebrow: "土耳其账号",
        summary:
          "以本地市场语言呈现，更贴近、更即时、更具视觉张力的 Novves 内容流。",
        tags: ["本地内容", "视觉橱窗"],
      },
      instagramGlobal: {
        eyebrow: "全球账号",
        summary:
          "独立渠道，承载国际叙事、品牌曝光与全球受众触达。",
        tags: ["全球橱窗", "品牌声量"],
      },
    },
  },
  ur: {
    heroKicker: "ڈیجیٹل موجودگی",
    heroLead:
      "ہم نے کارپوریٹ اپ ڈیٹس، پروڈکٹ ویڈیوز اور میدانی کہانیوں کو ایک واضح سوشل پرت میں جمع کیا ہے۔ ہر چینل کا ایک مخصوص کردار ہے؛ یہ صفحہ اس ڈھانچے کو فوری طور پر پڑھنے کے قابل بناتا ہے۔",
    stats: [
      { value: "6", label: "فعال چینلز" },
      { value: "TR + Global", label: "بازار کی توجہ" },
      { value: "Corporate + Product", label: "مواد کا محور" },
    ],
    primaryCta: "رابطے کے صفحے پر واپس جائیں",
    secondaryCta: "ہمارے شراکت دار دیکھیں",
    previewEyebrow: "اشاعت کا ڈھانچہ",
    previewTitle: "ہر چینل ایک مختلف کردار ادا کرتا ہے۔",
    previewDesc:
      "ترکی اور عالمی LinkedIn اکاؤنٹس کارپوریٹ کہانی کو مختلف پیمانے پر پیش کرتے ہیں، Facebook وسیع سوشل نظر آنے میں مدد دیتا ہے، YouTube پروڈکٹ اور انجینئرنگ کی کہانی کو گہرا کرتا ہے، اور Instagram اکاؤنٹس مختلف سامعین کے لیے برانڈ کی روزمرہ حرکت ظاہر کرتے ہیں۔",
    previewCards: [
      {
        label: "کارپوریٹ بیانیہ",
        title: "ٹیم، برانڈ اور حوالہ جاتی کہانیاں",
        stat: "LinkedIn TR / Global / Facebook",
      },
      {
        label: "تکنیکی مواد",
        title: "ویڈیو، ڈیمو اور پروڈکٹ مرکوز وضاحتیں",
        stat: "YouTube",
      },
      {
        label: "زندہ بہاؤ",
        title: "ترکی اور عالمی بازاروں کے لیے علیحدہ سوشل ونڈو",
        stat: "Instagram",
      },
    ],
    highlightsLabel: "مواد کا نقشہ",
    highlightsTitle: "ایک نظر میں سمجھیں ہر چینل کس لیے ہے۔",
    highlightsDesc:
      "یہ صفحہ سادہ لنکس کی فہرست نہیں، بلکہ ڈیجیٹل برانڈ کی ایک پرت کے طور پر ڈیزائن کیا گیا ہے۔ ذیل کے بلاکس بتاتے ہیں کہ ہر سوشل چینل کس قسم کی قدر فراہم کرتا ہے۔",
    highlights: [
      {
        title: "کارپوریٹ اعتماد",
        description:
          "حوالہ جات، ایونٹس میں نظر آنا، کمپنی کی خبریں اور پیشہ ورانہ نیٹ ورک مواصلت کے لیے صحیح جگہ۔",
        stat: "کارپوریٹ فوکس",
      },
      {
        title: "انجینئرنگ کی کہانی",
        description:
          "پروڈکٹ وضاحتیں، تکنیکی بیانیے اور گہرے مواد کے لیے ویڈیو پر مبنی بہاؤ۔",
        stat: "ویڈیو فوکس",
      },
      {
        title: "بازار کی تقسیم",
        description:
          "ترکی اور عالمی علیحدہ اکاؤنٹس ہر سامعین کو اپنے رفتار پر برانڈ فالو کرنے دیتے ہیں۔",
        stat: "علاقائی فوکس",
      },
    ],
    sectionLabel: "چینل کا انتخاب",
    sectionTitle: "اپنی ضرورت کے مطابق صحیح سوشل بہاؤ میں داخل ہوں۔",
    sectionDesc:
      "کارڈز نہ صرف پلیٹ فارم دکھاتے ہیں؛ لہجہ، مواد کی قسم اور کلک کے بعد کی توقع بھی بتاتے ہیں۔",
    externalNote: "تمام لنکس نئی ٹیب میں کھلتے ہیں۔",
    footerLabel: "اگلا قدم",
    footerTitle: "سوشل نظر آنے سے براہ راست منصوبے کے رابطے کی طرف جائیں۔",
    footerDesc:
      "دریافت، تکنیکی مشورے یا پروڈکٹ رہنمائی کے لیے ہماری ٹیم سے براہ راست رابطہ کریں۔ سوشل چینلز واقفیت بناتے ہیں؛ منصوبے کی رفتار سیدھی گفتگو سے شروع ہوتی ہے۔",
    footerPrimary: "رابطہ فارم",
    footerSecondary: "ہمارے شراکت دار",
    platforms: {
      linkedin: {
        eyebrow: "LinkedIn ترکی",
        summary:
          "ترکی پر مرکوز کارپوریٹ اپ ڈیٹس، منصوبے کی خبریں اور پیشہ ورانہ نیٹ ورک مواصلت کے لیے مرکزی ونڈو۔",
        tags: ["حوالے", "کمپنی کی خبریں"],
      },
      linkedinGlobal: {
        eyebrow: "عالمی LinkedIn",
        summary:
          "بین الاقوامی نظر آنے، عالمی کاروباری زبان اور بیرونی کارپوریٹ بیانیے کے لیے علیحدہ LinkedIn پرت۔",
        tags: ["عالمی نیٹ ورک", "کارپوریٹ مواصلات"],
      },
      youtube: {
        eyebrow: "ویڈیو چینل",
        summary:
          "ان لوگوں کے لیے جو پروڈکٹ کے رویے اور انجینئرنگ مواد کو لمبے فارمیٹ میں سمجھنا چاہتے ہیں۔",
        tags: ["پروڈکٹ ویڈیوز", "تکنیکی وضاحتیں"],
      },
      facebook: {
        eyebrow: "کمیونٹی فیڈ",
        summary:
          "وسیع سوشل نظر آنے، اعلانات اور جاری برانڈ اپ ڈیٹس کے لیے معاون چینل۔",
        tags: ["اعلانات", "کمیونٹی تک رسائی"],
      },
      instagramTr: {
        eyebrow: "ترکی اکاؤنٹ",
        summary:
          "مقامی بازار کی زبان میں گرم، فوری اور زیادہ بصری Novves بہاؤ۔",
        tags: ["مقامی مواد", "بصری ونڈو"],
      },
      instagramGlobal: {
        eyebrow: "عالمی اکاؤنٹ",
        summary:
          "بین الاقوامی بیانیہ، برانڈ نظر آنے اور عالمی سامعین کے لیے علیحدہ چینل۔",
        tags: ["عالمی ونڈو", "برانڈ آواز"],
      },
    },
  },
  ru: {
    heroKicker: "Tsifrovoye Prisutsviye",
    heroLead:
      "My sobirali korporativnye novosti, video o produktsii i polevye istorii v odin ponyatnyy sotsialnyy sloy. U kazhdogo kanala est svoia rol, a eta stranitsa delaet etu strukturu vizualno yasnoy.",
    stats: [
      { value: "6", label: "aktivnykh kanalov" },
      { value: "TR + Global", label: "rynochnyy fokus" },
      { value: "Corporate + Product", label: "os soderzhaniya" },
    ],
    primaryCta: "Vernutsya na stranicu kontaktov",
    secondaryCta: "Posmotret partnerov",
    previewEyebrow: "Arkhitektura Publikatsii",
    previewTitle: "U kazhdogo kanala svoya rol.",
    previewDesc:
      "Turetskiy i globalnyy akkaunty LinkedIn nesut korporativnyy narativ v raznom masshtabe, Facebook podderzhivaet bolee shirokuyu vidimost, YouTube uglublyaet produktovuyu i inzhenernuyu storonu, a akkaunty Instagram podcherkivayut ritm brenda dlya raznykh auditoriy.",
    previewCards: [
      {
        label: "Korporativnyy Narativ",
        title: "Istorii o komande, brende i proektakh",
        stat: "LinkedIn TR / Global / Facebook",
      },
      {
        label: "Tekhnicheskiy Kontent",
        title: "Video, demo i produktovye obyasneniya",
        stat: "YouTube",
      },
      {
        label: "Zhivoy Potok",
        title: "Razdelennaya vitrína dlya Turetskogo i globalnogo rynka",
        stat: "Instagram",
      },
    ],
    highlightsLabel: "Karta Kontenta",
    highlightsTitle: "Srazu ponimayte, dlya chego nuzhen kazhdyy kanal.",
    highlightsDesc:
      "Eta stranitsa zadumana ne kak prostoy spisok ssylok, a kak tsifrovoy sloy brenda. Bloki nizhe pokazyvayut, kakuyu tsennost daet kazhdyy sotsialnyy kanal.",
    highlights: [
      {
        title: "Korporativnoe doverie",
        description:
          "Luchshee mesto dlya referensov, vidimosti na meropriyatiyakh, novostey kompanii i professionalnoy kommunikatsii.",
        stat: "Korporativnyy fokus",
      },
      {
        title: "Inzhenernyy narativ",
        description:
          "Video-orientirovannyy potok dlya obyasneniya produktov, tekhnicheskikh syuzhetov i bolee glubokogo izucheniya.",
        stat: "Video fokus",
      },
      {
        title: "Razdelenie rynkov",
        description:
          "Otdelnye akkaunty dlya Turtsii i globalnoy auditorii pozvolyayut kazhdoy gruppe sledit za brendom v svoem ritme.",
        stat: "Regionalnyy fokus",
      },
    ],
    sectionLabel: "Vybor Kanala",
    sectionTitle: "Perekhodite v pravilnyy sotsialnyy potok po svoey zadache.",
    sectionDesc:
      "Kartochki pokazyvayut ne tolko platformu, no i ton, tip kontenta i to, chto vas zhdet posle perekhoda.",
    externalNote: "Vse ssylki otkryvayutsya v novoy vkladke.",
    footerLabel: "Sleduyushchiy Shag",
    footerTitle: "Perekhodite ot sotsialnoy vidimosti k pryamomu kontakty po proektu.",
    footerDesc:
      "Dlya obsuzhdeniya proekta, tekhnicheskoy konsultatsii ili podbora produkta svyazhites s nashey komandoy napryamuyu. Sotsialnye kanaly sozdayut interes, a rabota nad proektom uskoryaetsya v pryamom dialoge.",
    footerPrimary: "Forma Kontakta",
    footerSecondary: "Nashi Partnery",
    platforms: {
      linkedin: {
        eyebrow: "LinkedIn Turtsiya",
        summary:
          "Glavnaya vitrina dlya korporativnykh obnovleniy po Turetsii, novostey proektov i professionalnoy kommunikatsii.",
        tags: ["Referensy", "Novosti kompanii"],
      },
      linkedinGlobal: {
        eyebrow: "Globalnyy LinkedIn",
        summary:
          "Otdelnyy kanal LinkedIn dlya mezhdunarodnoy vidimosti, globalnogo delovogo yazyka i vneshney korporativnoy kommunikatsii.",
        tags: ["Globalnaya set", "Korporativnaya kommunikatsiya"],
      },
      youtube: {
        eyebrow: "Video Kanal",
        summary:
          "Dlya tekh, kto khochet glubzhe izuchit rabotu produktov i inzhenernyy kontent v dlinnom formate.",
        tags: ["Video o produktsii", "Tekhnicheskie obyasneniya"],
      },
      facebook: {
        eyebrow: "Obshchestvennyy Potok",
        summary:
          "Podderzhivayushchiy kanal dlya bolee shirokoy vidimosti, obyavleniy i tekushchikh novostey brenda.",
        tags: ["Obyavleniya", "Okhvat auditorii"],
      },
      instagramTr: {
        eyebrow: "Akkount Turtsii",
        summary:
          "Bolee teplyy, operativnyy i vizualnyy potok Novves dlya lokalnogo rynka.",
        tags: ["Lokalnyy kontent", "Vizualnaya vitrina"],
      },
      instagramGlobal: {
        eyebrow: "Globalnyy Akkount",
        summary:
          "Otdelnyy kanal dlya mezhdunarodnogo narativa, vidimosti brenda i globalnoy auditorii.",
        tags: ["Globalnaya vitrina", "Golos brenda"],
      },
    },
  },
  kk: {
    heroKicker: "Цифрлық көрініс",
    heroLead:
      "Корпоративтік хабарламалар, өнім бейндері және алаңға бағытталған бөлісулерді бір түсінікті ағымға жинадық. Әр арна өз міндетін атқарады; бұл бет сол құрылымды оқуға ыңғайлы етеді.",
    stats: [
      { value: "6", label: "белсенді арна" },
      { value: "TR + Global", label: "нарық бағыты" },
      { value: "Корпоративтік + Өнім", label: "мазмұн осі" },
    ],
    primaryCta: "Байланыс бетіне оралу",
    secondaryCta: "Серіктестерімізді қарау",
    previewEyebrow: "Жариялау архитектурасы",
    previewTitle: "Әр арна өз рөлін ойнайды.",
    previewDesc:
      "LinkedIn Түркия және әлемдік аккаунттары корпоративтік әңгімені әртүрлі масштабта жеткізеді, Facebook кең әлеуметтік көріністі қолдайды. YouTube өнім мен инженерлік әңгімені тереңдетеді, Instagram аккаунттары брендтің күнделікті ритмін көрсетеді.",
    previewCards: [
      {
        label: "Корпоративтік әңгіме",
        title: "Команда, бренд және референс әңгімелері",
        stat: "LinkedIn TR / Global / Facebook",
      },
      {
        label: "Техникалық мазмұн",
        title: "Бейне, демо және өнімге бағытталған түсіндірулер",
        stat: "YouTube",
      },
      {
        label: "Тікелей ағым",
        title: "Түркия және әлемдік нарыққа бөлінген әлеуметтік витрина",
        stat: "Instagram",
      },
    ],
    highlightsLabel: "Мазмұн картасы",
    highlightsTitle: "Әр арнаның не үшін екенін бір қарауда түсініңіз.",
    highlightsDesc:
      "Бұл бет қарапайым сілтеме тізімі емес, сандық бренд қабаты ретінде жасалған. Төмендегі блоктар әр әлеуметтік арна қандай құндылық беретінін көрсетеді.",
    highlights: [
      {
        title: "Корпоративтік сенім",
        description:
          "Референстер, іс-шара көрінісі, компания жаңалықтары және кәсіби желідегі байланыс үшін ең дұрыс орын.",
        stat: "Корпоративтік фокус",
      },
      {
        title: "Инженерлік әңгіме",
        description:
          "Өнім түсіндірулері, техникалық әңгімелер және терең мазмұн үшін бейне бағытталған ағым.",
        stat: "Бейне фокус",
      },
      {
        title: "Нарықты бөлу",
        description:
          "Түркия және әлемдік аккаунттардың бөлінуі әр аудиторияға өз ритмінде қадағалауға мүмкіндік береді.",
        stat: "Аймақтық фокус",
      },
    ],
    sectionLabel: "Арна таңдауы",
    sectionTitle: "Қажетіңізге сай дұрыс әлеуметтік ағымға кіріңіз.",
    sectionDesc:
      "Карточкалар тек платформаны көрсетпейді; үн, мазмұн түрі және басқаннан кейін не күтетініңізді де сездіреді.",
    externalNote: "Барлық сілтемелер жаңа қойыншыда ашылады.",
    footerLabel: "Келесі қадам",
    footerTitle: "Әлеуметтік көріністен тікелей жоба байланысына өтіңіз.",
    footerDesc:
      "Зерттеу, техникалық кеңес немесе өнім таңдауы үшін командамызбен тікелей байланысыңыз. Әлеуметтік арналар танымалдылықты арттырады, ал жоба импульсы тікелей диалогта басталады.",
    footerPrimary: "Байланыс формасы",
    footerSecondary: "Серіктестеріміз",
    platforms: {
      linkedin: {
        eyebrow: "LinkedIn Түркия",
        summary:
          "Түркияға бағытталған корпоративтік жаңартулар, жоба жаңалықтары және кәсіби желідегі байланыс үшін негізгі витрина.",
        tags: ["Референстер", "Компания жаңалықтары"],
      },
      linkedinGlobal: {
        eyebrow: "Әлемдік LinkedIn",
        summary:
          "Халықаралық көрініс, әлемдік іс тілі және сыртқы корпоративтік әңгіме үшін бөлек LinkedIn арнасы.",
        tags: ["Әлемдік желі", "Корпоративтік байланыс"],
      },
      youtube: {
        eyebrow: "Бейне арна",
        summary:
          "Өнімдердің қалай жұмыс істейтіні мен инженерлік бөлімін ұзағырақ форматта қарағысы келетіндер үшін.",
        tags: ["Өнім бейнелері", "Техникалық түсіндіру"],
      },
      facebook: {
        eyebrow: "Қауымдастық ағымы",
        summary:
          "Кең әлеуметтік көрініс, хабарландырулар және ағымдағы бренд бөлісулері үшін қолдау арнасы.",
        tags: ["Хабарландырулар", "Қауымдастыққа жету"],
      },
      instagramTr: {
        eyebrow: "Түркия аккаунты",
        summary:
          "Жергілікті нарық тілімен жылырақ, жылдам әрі көрнекі Novves ағымы.",
        tags: ["Жергілікті мазмұн", "Көрнекі витрина"],
      },
      instagramGlobal: {
        eyebrow: "Әлемдік аккаунт",
        summary:
          "Халықаралық әңгіме, бренд көрінісі және әлемдік аудитория үшін бөлек арна.",
        tags: ["Әлемдік витрина", "Бренд дауысы"],
      },
    },
  },
  tg: {
    heroKicker: "Дидбинии рақамӣ",
    heroLead:
      "Мо эълонҳои корпоративӣ, видеоҳои маҳсулот ва нашрҳои саҳроиро дар як қабати социалии равшан ҷамъ кардем. Ҳар канал вазифаи алоҳида дорад; ин саҳифа ин сохторро барои хониш осон мекунад.",
    stats: [
      { value: "6", label: "каналҳои фаъол" },
      { value: "TR + Global", label: "тарҷеҳи бозор" },
      { value: "Корпоративӣ + Маҳсулот", label: "меҳвари мундариҷа" },
    ],
    primaryCta: "Бозгашт ба саҳифаи тамос",
    secondaryCta: "Шарикони моро бинед",
    previewEyebrow: "Меъмории нашр",
    previewTitle: "Ҳар канал нақши гуногун дорад.",
    previewDesc:
      "Ҳисобҳои LinkedIn-и Туркия ва ҷаҳонӣ ҳикояи корпоративиро дар масоҳатҳои гуногун интиқол медиҳанд, Facebook дидабинии васеъи иҷтимоиро дастгирӣ мекунад. YouTube нақшаи маҳсулот ва муҳандисиро амиқтар мекунад, ҳисобҳои Instagram ритми рӯзонаи брендро барои мухлисҳои гуногун намоён мекунанд.",
    previewCards: [
      {
        label: "Ҳикояи корпоративӣ",
        title: "Ҳикояҳои даста, бренд ва мисолҳо",
        stat: "LinkedIn TR / Global / Facebook",
      },
      {
        label: "Мундариҷаи техникӣ",
        title: "Видео, демо ва шарҳҳои маҳсулот-мақсаднок",
        stat: "YouTube",
      },
      {
        label: "Ҷараёни зинда",
        title: "Витринаи иҷтимоии ҷудошуда барои бозорҳои Туркия ва ҷаҳонӣ",
        stat: "Instagram",
      },
    ],
    highlightsLabel: "Харитаи мундариҷа",
    highlightsTitle: "Аз як назар бифаҳмед, ҳар канал барои чӣ аст.",
    highlightsDesc:
      "Ин саҳифа на чунонки рӯйхати пайванд, балки чун қабати рақамии бренд тарроҳӣ шудааст. Блокҳои зер арзиши ҳар канали иҷтимоиро нишон медиҳанд.",
    highlights: [
      {
        title: "Боварии корпоративӣ",
        description:
          "Беҳтарин ҷой барои мисолҳо, намоёндии чорабиниҳо, ахбороти ширкат ва муоширати шабакаи касбӣ.",
        stat: "Фокуси корпоративӣ",
      },
      {
        title: "Ҳикояи муҳандисӣ",
        description:
          "Ҷараёни ба видео такякунанда барои шарҳҳои маҳсулот, нақшаҳои техникӣ ва истеъмоли амиқтари мундариҷа.",
        stat: "Фокуси видео",
      },
      {
        title: "Тақсимоти бозор",
        description:
          "Ҳисобҳои ҷудогонаи Туркия ва ҷаҳонӣ имкон медиҳанд, ки ҳар як мухлис брендро ба ритми худ пайгирӣ кунад.",
        stat: "Фокуси минтақавӣ",
      },
    ],
    sectionLabel: "Интихоби канал",
    sectionTitle: "Ба ҷараёни иҷтимоии дуруст аз рӯи ниёзатон дароед.",
    sectionDesc:
      "Кортҳо на танҳо платформаро нишон медиҳанд; садо, намуди мундариҷа ва интизориҳои пас аз зеркаширо низ ҳис мекунанд.",
    externalNote: "Ҳама пайвандҳо дар варақаи нав кушода мешаванд.",
    footerLabel: "Қадами навбатӣ",
    footerTitle: "Аз дидабинии иҷтимоӣ ба тамоси мустақими лоиҳа гузаред.",
    footerDesc:
      "Барои кашф, машварати техникӣ ё интихоби маҳсулот бо дастаи мо мустақим тамос гиред. Қаналҳои иҷтимоӣ шиносоиро месозанд, аммо ҳаракати лоиҳа аз муоширати мустақим сар мешавад.",
    footerPrimary: "Шакли тамос",
    footerSecondary: "Шарикони мо",
    platforms: {
      linkedin: {
        eyebrow: "LinkedIn-и Туркия",
        summary:
          "Витринаи асосӣ барои навсозиҳои корпоративии ба Туркия тамарказ, ахбороти лоиҳа ва муоширати шабакаи касбӣ.",
        tags: ["Мисолҳо", "Ахбороти ширкат"],
      },
      linkedinGlobal: {
        eyebrow: "LinkedIn-и ҷаҳонӣ",
        summary:
          "Қабати ҷудогонаи LinkedIn барои дидабинии байналмилалӣ, забони тиҷорати ҷаҳонӣ ва ҳикояи корпоративии ба берун.",
        tags: ["Шабакаи ҷаҳонӣ", "Муоширати корпоративӣ"],
      },
      youtube: {
        eyebrow: "Канали видео",
        summary:
          "Барои касоне, ки мехоҳанд рафтори маҳсулот ва мундариҷаи муҳандисиро дар формати дарозтар омӯзанд.",
        tags: ["Видеоҳои маҳсулот", "Шарҳҳои техникӣ"],
      },
      facebook: {
        eyebrow: "Ҷараёни ҷамъиятӣ",
        summary:
          "Қабати дастгирӣкунанда барои дидабинии васеи иҷтимоӣ, эълонҳо ва навсозиҳои ҷории бренд.",
        tags: ["Эълонҳо", "Наздикӣ ба ҷамъият"],
      },
      instagramTr: {
        eyebrow: "Ҳисоби Туркия",
        summary:
          "Ҷараёни гармтар, фаврӣ ва бештар визуалии Novves ба забони бозори маҳаллӣ.",
        tags: ["Мундариҷаи маҳаллӣ", "Витринаи визуалӣ"],
      },
      instagramGlobal: {
        eyebrow: "Ҳисоби ҷаҳонӣ",
        summary:
          "Қабати ҷудо барои ҳикояи байналмилалӣ, дидабинии бренд ва ҳузури мухлиси ҷаҳонӣ.",
        tags: ["Витринаи ҷаҳонӣ", "Овози бренд"],
      },
    },
  },
  ...sosyalMedyaCopyExtras,
  ...Object.fromEntries(
    locales.filter((l) => !sosyalPageExplicitLocales.has(l)).map((l) => [l, sosyalMedyaPageCopyEn]),
  ),
} as Record<Locale, LocalizedPageCopy>;

const heroPreviewImages = [
  "/images/novves-team.jpg",
  "/images/novves-factory.jpg",
  "/images/neden-novves.jpg",
] as const;

const socialPlatforms: PlatformDefinition[] = [
  {
    key: "linkedin",
    name: "LinkedIn",
    handle: "@novvesturkiye",
    href: "https://tr.linkedin.com/company/novvesturkiye",
    accentClass: "text-[#0A66C2]",
    iconClass: "bg-[#0A66C2]",
    ringClass: "ring-[#0A66C2]/15",
    glow: "rgba(10, 102, 194, 0.22)",
    icon: (
      <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    key: "linkedinGlobal",
    name: "LinkedIn Global",
    handle: "@novvesglobal",
    href: "https://tr.linkedin.com/company/novvesglobal",
    accentClass: "text-[#0A66C2]",
    iconClass: "bg-[#0A66C2]",
    ringClass: "ring-[#0A66C2]/15",
    glow: "rgba(10, 102, 194, 0.22)",
    icon: (
      <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    key: "youtube",
    name: "YouTube",
    handle: "@novves",
    href: "https://www.youtube.com/channel/UCan0PUXw7Pr0GI0HTegN1yQ",
    accentClass: "text-[#FF0000]",
    iconClass: "bg-[#FF0000]",
    ringClass: "ring-[#FF0000]/15",
    glow: "rgba(255, 0, 0, 0.2)",
    icon: (
      <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    key: "facebook",
    name: "Facebook",
    handle: "@novves.turkiye",
    href: "https://www.facebook.com/novves.turkiye/",
    accentClass: "text-[#1877F2]",
    iconClass: "bg-[#1877F2]",
    ringClass: "ring-[#1877F2]/15",
    glow: "rgba(24, 119, 242, 0.18)",
    icon: (
      <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    key: "instagramTr",
    name: "Instagram Türkiye",
    handle: "@novves.turkiye",
    href: "https://www.instagram.com/novves.turkiye/",
    accentClass: "text-[#DD2A7B]",
    iconClass: "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
    ringClass: "ring-[#DD2A7B]/15",
    glow: "rgba(221, 42, 123, 0.18)",
    icon: (
      <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    key: "instagramGlobal",
    name: "Instagram Global",
    handle: "@novves.global",
    href: "https://www.instagram.com/novves.global/",
    accentClass: "text-[#9B36B7]",
    iconClass: "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
    ringClass: "ring-[#9B36B7]/15",
    glow: "rgba(155, 54, 183, 0.2)",
    icon: (
      <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

export default async function SosyalMedya({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const t = dict.contact.sosyalMedya;
  const copy = pageCopy[locale];

  return (
    <main className="bg-[#ecebe6]">
      <section className="relative overflow-hidden bg-[#4a4f58] text-white py-26 pt-40">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#71757d]/60 via-[#4a4f58]/82 to-[#2f3440]/94" />
        <div
          className="absolute left-[-10%] top-[-15%] h-[26rem] w-[26rem] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(239, 95, 23,0.28) 0%, rgba(239, 95, 23,0) 72%)",
          }}
        />
        <div
          className="absolute bottom-[-25%] right-[-10%] h-[28rem] w-[28rem] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(41,121,255,0.18) 0%, rgba(41,121,255,0) 70%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-8 flex items-center gap-2 text-xs text-white/45">
            <Link href={`/${locale}`} className="transition-colors hover:text-white/80">
              {t.breadcrumbHome}
            </Link>
            <span>/</span>
            <Link
              href={`/${locale}/iletisim`}
              className="transition-colors hover:text-white/80"
            >
              {t.breadcrumbContact}
            </Link>
            <span>/</span>
            <span className="text-white/70">{t.breadcrumbSocialMedia}</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div className="max-w-none">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/6 px-4 py-2 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_14px_rgba(239, 95, 23,0.9)]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80">
                  {copy.heroKicker}
                </span>
              </div>

              <h1 className="mt-7 max-w-none text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl lg:text-[5.4rem]">
                {t.title1}
                <span className="text-primary"> {t.title2}</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
                {t.desc}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/50 sm:text-[15px]">
                {copy.heroLead}
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/iletisim`}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-deep hover:shadow-[0_18px_40px_-18px_rgba(239, 95, 23,0.85)]"
                >
                  {copy.primaryCta}
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
                <Link
                  href={`/${locale}/iletisim/partnerlerimiz`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-6 py-3 text-sm font-semibold text-white/86 backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/10"
                >
                  {copy.secondaryCta}
                </Link>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {copy.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-5 backdrop-blur-sm"
                  >
                    <div className="text-2xl font-semibold tracking-[-0.04em] text-white">
                      {stat.value}
                    </div>
                    <p className="mt-2 text-xs uppercase tracking-[0.22em] text-white/48">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative lg:self-start">
              <div className="absolute inset-x-8 top-8 h-48 rounded-full bg-primary/12 blur-3xl" />
              <div className="relative h-full overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.06] p-5 shadow-[0_40px_120px_-60px_rgba(0,0,0,0.95)] backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/48">
                      {copy.previewEyebrow}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">
                      {copy.previewTitle}
                    </h2>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/45">
                    01
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-white/55">
                  {copy.previewDesc}
                </p>

                <div className="mt-6 space-y-4">
                  {copy.previewCards.map((card, index) => (
                    <div
                      key={card.title}
                      className="grid grid-cols-[92px_minmax(0,1fr)] gap-4 rounded-[24px] border border-white/10 bg-[#0b1729]/88 p-3"
                    >
                      <div className="relative h-24 overflow-hidden rounded-[18px]">
                        <Image
                          src={heroPreviewImages[index]}
                          alt=""
                          fill
                          sizes="(max-width: 1024px) 92px, 92px"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      </div>
                      <div className="min-w-0 py-1">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary/90">
                          {card.label}
                        </p>
                        <h3 className="mt-2 text-base font-semibold leading-6 text-white">
                          {card.title}
                        </h3>
                        <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/38">
                          {card.stat}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#ecebe6] py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-stretch lg:px-8">
          <div className="flex h-full min-h-0 flex-col rounded-[32px] bg-[#081324] p-8 text-white shadow-[0_35px_100px_-45px_rgba(15,23,42,0.7)] sm:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary/90">
              {copy.highlightsLabel}
            </p>
            <h2 className="mt-4 max-w-lg text-3xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-4xl">
              {copy.highlightsTitle}
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/58">
              {copy.highlightsDesc}
            </p>
            <div className="mt-auto border-t border-white/10 pt-8">
              <Image
                src="/images/novves-footer-logo.svg"
                alt="NOVVES"
                width={180}
                height={48}
                className="h-10 w-auto opacity-90"
              />
            </div>
          </div>

          <div className="grid gap-4">
            {copy.highlights.map((item) => (
              <article
                key={item.title}
                className="rounded-[28px] border border-slate-200/75 bg-white p-6 shadow-[0_30px_70px_-50px_rgba(15,23,42,0.42)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/85">
                      {item.stat}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-dark">
                      {item.title}
                    </h3>
                  </div>
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_18px_rgba(239, 95, 23,0.45)]" />
                </div>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-secondary/68">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 border-b border-slate-200 pb-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary/90">
                {copy.sectionLabel}
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-dark sm:text-4xl">
                {copy.sectionTitle}
              </h2>
              <p className="mt-4 text-sm leading-7 text-secondary/66 sm:text-[15px]">
                {copy.sectionDesc}
              </p>
            </div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-secondary/45">
              {copy.externalNote}
            </p>
          </div>

          <div className="mt-10 grid auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-3">
            {socialPlatforms.map((platform) => {
              const platformCopy = copy.platforms[platform.key];

              return (
                <a
                  key={platform.name}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-full min-h-[22rem] overflow-hidden rounded-[30px] border border-slate-200/80 bg-white p-7 shadow-[0_28px_80px_-52px_rgba(15,23,42,0.46)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_38px_90px_-45px_rgba(15,23,42,0.38)]"
                >
                  <div
                    className="absolute -right-12 -top-12 h-44 w-44 rounded-full blur-3xl transition-transform duration-500 group-hover:scale-110"
                    style={{
                      background: `radial-gradient(circle, ${platform.glow} 0%, transparent 70%)`,
                    }}
                  />
                  <div
                    className={`absolute inset-x-0 top-0 h-1 ${platform.iconClass}`}
                  />

                  <div className="relative flex h-full w-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${platform.accentClass} bg-slate-50 ring-1 ${platform.ringClass}`}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          {platformCopy.eyebrow}
                        </div>
                        <h3 className="mt-5 text-[1.95rem] font-semibold leading-none tracking-[-0.04em] text-dark">
                          {platform.name}
                        </h3>
                      </div>

                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg ${platform.iconClass}`}
                      >
                        {platform.icon}
                      </div>
                    </div>

                    <p className={`mt-4 text-sm font-medium ${platform.accentClass}`}>
                      {platform.handle}
                    </p>
                    <p className="mt-4 max-w-md text-sm leading-7 text-secondary/67">
                      {platformCopy.summary}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {platformCopy.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-secondary/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-8">
                      <div className="inline-flex items-center gap-2 text-sm font-semibold text-dark">
                        {t.visitPage}
                        <svg
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#081324] py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary/90">
              {copy.footerLabel}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">
              {copy.footerTitle}
            </h2>
            <p className="mt-5 text-sm leading-7 text-white/56 sm:text-[15px]">
              {copy.footerDesc}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${locale}/iletisim`}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-deep"
            >
              {copy.footerPrimary}
            </Link>
            <Link
              href={`/${locale}/iletisim/partnerlerimiz`}
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-6 py-3 text-sm font-semibold text-white/86 transition-all duration-300 hover:border-white/24 hover:bg-white/10"
            >
              {copy.footerSecondary}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
