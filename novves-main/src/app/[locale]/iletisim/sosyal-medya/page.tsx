import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../../dictionaries";

type PlatformKey =
  | "linkedin"
  | "linkedinGlobal"
  | "youtube"
  | "facebook"
  | "instagramTr"
  | "instagramGlobal";

type LocalizedPageCopy = {
  heroKicker: string;
  heroLead: string;
  stats: Array<{ value: string; label: string }>;
  primaryCta: string;
  secondaryCta: string;
  previewEyebrow: string;
  previewTitle: string;
  previewDesc: string;
  previewCards: Array<{ label: string; title: string; stat: string }>;
  highlightsLabel: string;
  highlightsTitle: string;
  highlightsDesc: string;
  highlights: Array<{ title: string; description: string; stat: string }>;
  sectionLabel: string;
  sectionTitle: string;
  sectionDesc: string;
  externalNote: string;
  footerLabel: string;
  footerTitle: string;
  footerDesc: string;
  footerPrimary: string;
  footerSecondary: string;
  platforms: Record<
    PlatformKey,
    {
      eyebrow: string;
      summary: string;
      tags: string[];
    }
  >;
};

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
  en: {
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
};

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
    <main className="bg-white">
      <section className="relative overflow-hidden bg-[#07111f] text-white">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.65) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.65) 1px, transparent 1px)",
            backgroundSize: "54px 54px",
          }}
        />
        <div
          className="absolute left-[-10%] top-[-15%] h-[26rem] w-[26rem] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(255,107,53,0.28) 0%, rgba(255,107,53,0) 72%)",
          }}
        />
        <div
          className="absolute bottom-[-25%] right-[-10%] h-[28rem] w-[28rem] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(41,121,255,0.18) 0%, rgba(41,121,255,0) 70%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pb-24 lg:pt-36">
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

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_480px] lg:items-end">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/6 px-4 py-2 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_14px_rgba(255,107,53,0.9)]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80">
                  {copy.heroKicker}
                </span>
              </div>

              <h1 className="mt-7 max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
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
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e55a28] hover:shadow-[0_18px_40px_-18px_rgba(255,107,53,0.85)]"
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

            <div className="relative">
              <div className="absolute inset-x-8 top-8 h-48 rounded-full bg-primary/12 blur-3xl" />
              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.06] p-5 shadow-[0_40px_120px_-60px_rgba(0,0,0,0.95)] backdrop-blur-md">
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

      <section className="bg-[#f4f7fb] py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:px-8">
          <div className="rounded-[32px] bg-[#081324] p-8 text-white shadow-[0_35px_100px_-45px_rgba(15,23,42,0.7)] sm:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary/90">
              {copy.highlightsLabel}
            </p>
            <h2 className="mt-4 max-w-lg text-3xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-4xl">
              {copy.highlightsTitle}
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/58">
              {copy.highlightsDesc}
            </p>
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
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_18px_rgba(255,107,53,0.45)]" />
                </div>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-secondary/68">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
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
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e55a28]"
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
