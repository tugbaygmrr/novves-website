/** Görsel önizleme + sade Türkçe açıklama (admin bölüm kartları). */

export type SectionPreviewMeta = {
  image: string;
  /** Kullanıcının anlayacağı kısa açıklama */
  hint: string;
};

const META: Record<string, Record<string, SectionPreviewMeta>> = {
  home: {
    hero: {
      image: "/images/admin-previews/home/hero.png",
      hint: "Sayfanın en üstü — scroll video ve büyük başlık alanı",
    },
    animation2: {
      image: "/images/admin-previews/home/animation2.png",
      hint: "Videoyu kaydırınca altta beliren ürün tanıtım kartı",
    },
    solutionCarouselByHref: {
      image: "/images/admin-previews/home/solutionCarouselByHref.png",
      hint: "Çözümler bölümündeki yatay kaydırılabilir kart şeridi",
    },
    productCategories: {
      image: "/images/admin-previews/home/productCategories.png",
      hint: "Ürünler bölümündeki kategori kartlarının üst başlığı",
    },
    productCategoryBlurbs: {
      image: "/images/admin-previews/home/productCategoryBlurbs.png",
      hint: "Her ürün kartının altındaki kısa açıklama metinleri",
    },
    productCategoryFeatures: {
      image: "/images/admin-previews/home/productCategoryFeatures.png",
      hint: "Ürün kartlarında listelenen özellik maddeleri",
    },
    catalogPreview: {
      image: "/images/admin-previews/home/catalogPreview.png",
      hint: "Kataloglar bölümündeki kapak görselli kartlar",
    },
    referencePreview: {
      image: "/images/admin-previews/home/referencePreview.png",
      hint: "Sektörlere göre referans proje kartları",
    },
    certificatePreview: {
      image: "/images/admin-previews/home/certificatePreview.png",
      hint: "Sertifikalar bölümündeki belge kartları",
    },
    engineeringPillarsSection: {
      image: "/images/admin-previews/home/engineeringPillarsSection.png",
      hint: "Mühendislik süreci şeridinin üst başlık ve istatistik alanı",
    },
    pillars: {
      image: "/images/admin-previews/home/pillars.png",
      hint: "01-02-03 numaralı mühendislik adım kartları",
    },
    engineeringShowcase: {
      image: "/images/admin-previews/home/engineeringShowcase.png",
      hint: "CFD bölümü — video yanındaki mühendislik açıklama paneli",
    },
    faq: {
      image: "/images/admin-previews/home/faq.png",
      hint: "Sık sorulan sorular listesi ve sol görsel",
    },
    finalCta: {
      image: "/images/admin-previews/home/finalCta.png",
      hint: "Sayfanın altındaki teklif ve iletişim çağrısı",
    },
    companyProfileSection: {
      image: "/images/admin-previews/home/companyProfileSection.png",
      hint: "Şirket profili — zaman çizelgesi, hedefler ve banner",
    },
    pageChrome: {
      image: "/images/admin-previews/home/pageChrome.png",
      hint: "Buton yazıları, önceki/sonraki okları ve ortak etiketler",
    },
    midCta: {
      image: "/images/finalcta.png",
      hint: "(Eski şablon) Orta çağrı bandı",
    },
    homeBands: {
      image: "/images/jump-icons/solutions.png",
      hint: "(Eski şablon) Çözüm/ürün bant metinleri",
    },
    companyProfileCards: {
      image: "/images/corporate/novves-liderlik.png",
      hint: "(Eski şablon) 3 kurumsal profil kartı",
    },
    video: {
      image: "/images/page-hero/novves-vision.png",
      hint: "(Eski şablon) Kurumsal tanıtım videosu metinleri",
    },
  },
  common: {
    navbar: {
      image: "/images/novves-logo.svg",
      hint: "Üst menü linkleri ve butonlar",
    },
    footer: {
      image: "/images/jump-icons/home.png",
      hint: "Sayfa altındaki footer linkleri ve iletişim",
    },
    shared: {
      image: "/images/jump-icons/home.png",
      hint: "Birden fazla sayfada tekrar eden ortak metinler",
    },
    solutionDetail: {
      image: "/images/solutions/duman-isi-tahliye-01-bg.png",
      hint: "Çözüm detay sayfalarındaki ortak metinler",
    },
  },
  corporate: {
    bizKimiz: { image: "/images/biz-kimiz-sag.png", hint: "Biz Kimiz sayfası" },
    ceoMesaji: { image: "/images/corporate/novves-liderlik.png", hint: "CEO mesajı sayfası" },
    ekibimiz: { image: "/images/corporate/novves-gunumuz.png", hint: "Ekibimiz sayfası" },
    referanslar: { image: "/images/jump-icons/references.png", hint: "Referanslar listesi" },
    sertifikalar: { image: "/images/jump-icons/certificates.png", hint: "Sertifikalar sayfası" },
    politikamiz: { image: "/images/page-hero/novves-vision.png", hint: "Politikamız sayfası" },
    basinOdasi: { image: "/images/corporate/novves-banner-bg.jpg", hint: "Basın odası" },
    haberler: { image: "/images/corporate/novves-kurulus-bina.png", hint: "Haberler listesi" },
  },
  contact: {
    main: { image: "/images/jump-icons/home.png", hint: "İletişim formu ve adres" },
    iletisimHub: { image: "/images/jump-icons/home.png", hint: "İletişim hub kartları" },
    partnerlerimiz: { image: "/images/partners/ventdelux.png", hint: "Partnerlerimiz sayfası" },
    sosyalMedya: { image: "/images/jump-icons/home.png", hint: "Sosyal medya linkleri" },
    sosyalMedyaHub: { image: "/images/jump-icons/home.png", hint: "Sosyal medya hub" },
  },
  technical: {
    blog: { image: "/images/jump-icons/home.png", hint: "Teknik blog" },
    dokumanKutuphanesi: { image: "/images/jump-icons/catalogs.png", hint: "Döküman kütüphanesi" },
    fanSecici: { image: "/images/jump-icons/products.png", hint: "Fan seçici aracı" },
    patentlerimiz: { image: "/images/jump-icons/certificates.png", hint: "Patentlerimiz" },
  },
  services: {
    genelBakis: { image: "/images/hizmetler/duman-kontrol-tasarimi.png", hint: "Hizmetler ana sayfa" },
    cfdAnalizi: { image: "/images/corporate/biz-kimiz/duman-kontrolu.webp", hint: "CFD analizi hizmeti" },
    devreAlma: { image: "/images/pillars/pillar-03-saha-uygulama.png", hint: "Devreye alma hizmeti" },
    dumanKontrol: { image: "/images/hizmetler/duman-kontrol-tasarimi.png", hint: "Duman kontrol tasarımı" },
    teknikServis: { image: "/images/pillars/pillar-02-uretim-saha.png", hint: "Teknik servis" },
    yerindeKesif: { image: "/images/corporate/novves-gunumuz.png", hint: "Yerinde keşif" },
    fanSecimi: { image: "/images/jump-icons/products.png", hint: "Fan seçimi hizmeti" },
    bakimPerformans: { image: "/images/pillars/pillar-02-uretim-saha.png", hint: "Bakım ve performans" },
    egitimDanismanlik: { image: "/images/corporate/novves-liderlik.png", hint: "Eğitim ve danışmanlık" },
  },
  solutions: {
    dumanIsiTahliye: { image: "/images/solutions/duman-isi-tahliye-01-bg.png", hint: "Duman ve ısı tahliye çözümü" },
    konforIklimlendirme: { image: "/images/solutions/konut-tipi-havalandirma-card-hero.png", hint: "Konfor iklimlendirme" },
    hijyenikFiltrasyon: { image: "/images/solution-icons/hijyenik-filtrasyonlu-havalandirma.svg", hint: "Hijyenik filtrasyon" },
    endustriyelHavaYonetimi: { image: "/images/products/categories/hava-yonetimi-card-hero.png", hint: "Endüstriyel hava" },
    hayvancilikTesisleri: { image: "/images/solution-icons/hayvancilik-tesisleri-icin-havalandirma-sistemleri.svg", hint: "Hayvancılık tesisleri" },
    trafoEnerjiOdalari: { image: "/images/solutions/akilli-otomasyon-card-hero.png", hint: "Trafo/enerji odaları" },
    seraTarimsal: { image: "/images/solution-icons/sera-tarimsal-havalandirma-sistemleri.svg", hint: "Sera ve tarımsal" },
    atexPatlamaKoruma: { image: "/images/solutions/duman-isi-tahliye-01-bg.png", hint: "ATEX patlama koruma" },
    akilliOtomasyon: { image: "/images/solutions/akilli-otomasyon-card-hero.png", hint: "Akıllı otomasyon" },
    konutHavalandirma: { image: "/images/solutions/konut-tipi-havalandirma-card-hero.png", hint: "Konut havalandırma" },
    marinOffshore: { image: "/images/solutions/duman-isi-tahliye-01-bg.png", hint: "Marin ve offshore" },
    projeBazliOzelImalat: { image: "/images/pillars/pillar-01-muhendislik-tasarim.png", hint: "Proje bazlı imalat" },
    cfdDanismanlik: { image: "/images/corporate/biz-kimiz/duman-kontrolu.webp", hint: "CFD danışmanlık" },
  },
};

const DEFAULT_PREVIEW: SectionPreviewMeta = {
  image: "/images/jump-icons/home.png",
  hint: "Bu bölümün sitedeki görünümü",
};

export function getSectionPreview(file: string, sectionKey: string): SectionPreviewMeta {
  return META[file]?.[sectionKey] ?? DEFAULT_PREVIEW;
}

export function hasSectionPreview(file: string, sectionKey: string): boolean {
  return Boolean(META[file]?.[sectionKey]);
}
