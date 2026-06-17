/**
 * Seeds contact.json → iletisimHub + sosyalMedyaHub (tr + en source).
 *   node scripts/seed-contact-hub.mjs
 */
import fs from "fs";
import path from "path";

const DICT = path.join(process.cwd(), "src", "app", "[locale]", "dictionaries");

const iletisimHubTr = {
  breadcrumbHome: "Ana Sayfa",
  breadcrumbSection: "İletişim & Destek",
  breadcrumbCurrent: "Bizimle İletişime Geçin",
  sidebarSubtitle: "İletişim Merkezi",
  navContactSupport: "İletişim & Destek",
  navContact: "İletişim",
  navTechnicalSupport: "Teknik Destek Talebi",
  navPartners: "Stratejik Partnerler",
  navGlobalPartners: "Global Partnerlerimiz",
  navPartnership: "Çözüm Ortaklığı",
  workingHours: "Çalışma Saatleri",
  weekdays: "Hafta İçi",
  weekdaysHours: "09:00 - 18:00",
  saturday: "Cumartesi",
  saturdayHours: "09:00 - 14:00",
  sunday: "Pazar",
  sundayClosed: "Kapalı",
  downloadSpecs: "Teknik Dokümanlar",
  heroBadge: "İletişim & Destek",
  heroTitle: "Geleceği Birlikte",
  heroTitleLine2: "İnşa Edelim.",
  heroDesc:
    "NOVVES uzman ekibiyle teknik destek, proje danışmanlığı ve stratejik çözümler için her zaman yanınızdayız.",
  formTitle: "İletişim Formu",
  formDesc: "Projeniz hakkında detaylı bilgi almak için aşağıdaki formu doldurun.",
  successMessage: "Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.",
  labelName: "Ad Soyad",
  labelCompany: "Firma Adı",
  labelEmail: "E-posta",
  labelPhone: "Telefon",
  labelDepartment: "İlgili Birim",
  labelSubject: "Konu",
  labelMessage: "Mesajınız",
  placeholderName: "Adınız ve soyadınız",
  placeholderCompany: "Çalıştığınız kurum",
  placeholderEmail: "kurumsal@email.com",
  placeholderPhone: "+90 (___) ___ __ __",
  placeholderSelect: "Seçiniz",
  placeholderSubject: "Konu başlığı",
  placeholderMessage: "Projeniz veya sorunuz hakkında detaylar...",
  departments: [
    "Teknik Servis",
    "Yerinde Keşif",
    "Ürün Sorgusu ya da Destek",
    "Teknik Danışmanlık",
    "Takip Talebi",
  ],
  kvkkConsent:
    "Formu göndererek, 6698 sayılı KVKK kapsamında kişisel verilerinizin işlenmesine onay vermiş olursunuz.",
  submit: "Formu Gönder",
  locationsTitle: "Lokasyonlarımız",
  locationsDesc: "Türkiye genelindeki operasyon merkezlerimize ulaşabilirsiniz.",
  getDirections: "Yol Tarifi Al",
  locations: [
    {
      id: "hq",
      badge: "Merkez Ofis",
      title: "İstanbul Ofis",
      address: "19 Mayıs Mah. Sümer Sok.\nZitaş Plaza C2 Blok No:7\nKadıköy / İstanbul",
    },
    {
      id: "factory",
      badge: "Fabrika",
      title: "Yalova Üretim Tesisi",
      address: "Taşköprü Merkez Mah. Çaydere Sok.\nBina No:9/1 Fabrika Kapı No:2\nÇiftlikköy / Yalova",
    },
  ],
  fabLabel: "Canlı Destek",
};

const iletisimHubEn = {
  breadcrumbHome: "Home",
  breadcrumbSection: "Contact & Support",
  breadcrumbCurrent: "Get in Touch",
  sidebarSubtitle: "Contact Hub",
  navContactSupport: "Contact & Support",
  navContact: "Contact",
  navTechnicalSupport: "Technical Support Request",
  navPartners: "Strategic Partners",
  navGlobalPartners: "Our Global Partners",
  navPartnership: "Solution Partnership",
  workingHours: "Working Hours",
  weekdays: "Weekdays",
  weekdaysHours: "09:00 - 18:00",
  saturday: "Saturday",
  saturdayHours: "09:00 - 14:00",
  sunday: "Sunday",
  sundayClosed: "Closed",
  downloadSpecs: "Technical Documents",
  heroBadge: "Contact & Support",
  heroTitle: "Let's Build",
  heroTitleLine2: "the Future Together.",
  heroDesc:
    "Our NOVVES expert team is here for technical support, project consulting, and strategic solutions.",
  formTitle: "Contact Form",
  formDesc: "Fill out the form below for detailed information about your project.",
  successMessage: "Your message has been sent successfully. We will get back to you shortly.",
  labelName: "Full Name",
  labelCompany: "Company Name",
  labelEmail: "Email",
  labelPhone: "Phone",
  labelDepartment: "Department",
  labelSubject: "Subject",
  labelMessage: "Your Message",
  placeholderName: "Your full name",
  placeholderCompany: "Your organization",
  placeholderEmail: "corporate@email.com",
  placeholderPhone: "+1 (___) ___-____",
  placeholderSelect: "Select",
  placeholderSubject: "Subject line",
  placeholderMessage: "Details about your project or question...",
  departments: [
    "Technical Service",
    "On-Site Survey",
    "Product Inquiry or Support",
    "Technical Consulting",
    "Follow-up Request",
  ],
  kvkkConsent:
    "By submitting this form, you consent to the processing of your personal data under applicable data protection law.",
  submit: "Submit Form",
  locationsTitle: "Our Locations",
  locationsDesc: "Reach our operations centers across Turkey.",
  getDirections: "Get Directions",
  locations: [
    {
      id: "hq",
      badge: "Head Office",
      title: "Istanbul Office",
      address: "19 Mayıs Mah. Sümer Sok.\nZitaş Plaza C2 Blok No:7\nKadıköy / Istanbul",
    },
    {
      id: "factory",
      badge: "Factory",
      title: "Yalova Production Plant",
      address: "Taşköprü Merkez Mah. Çaydere Sok.\nBina No:9/1 Fabrika Kapı No:2\nÇiftlikköy / Yalova",
    },
  ],
  fabLabel: "Live Support",
};

const sosyalMedyaHubTr = {
  breadcrumbHome: "Ana Sayfa",
  breadcrumbContact: "İletişim",
  breadcrumbSocialMedia: "Sosyal Medya",
  heroTitle1: "SOSYAL",
  heroTitle2: "MEDYA",
  heroDesc: "Ana frekansınızı seçin. Mühendislik içgörüleri yerel ve global akışlarda.",
  channels: {
    instagram: {
      label: "Instagram",
      titleLine1: "Görsel",
      titleLine2: "Mükemmellik",
      trLink: "TR AKIŞ",
      globalLink: "GLOBAL AKIŞ",
    },
    linkedin: {
      label: "LinkedIn",
      titleLine1: "Kurumsal",
      titleLine2: "İçgörüler",
      trLink: "TR AĞ",
      globalLink: "GLOBAL AĞ",
    },
    whatsapp: {
      label: "WhatsApp",
      titleLine1: "Doğrudan",
      titleLine2: "Kanal",
      trLink: "TR İLETİŞİM",
      globalLink: "GLOBAL İLETİŞİM",
    },
    telegram: {
      label: "Telegram",
      titleLine1: "Yayın",
      titleLine2: "Merkezi",
      trLink: "TR KANAL",
      globalLink: "GLOBAL KANAL",
    },
  },
  momentsTitle1: "İNOVASYON",
  momentsTitle2: "ANLARI",
  momentsDesc: "Mühendislik atılımları ve topluluk öne çıkanlarının seçilmiş canlı arşivi.",
  filterLatest: "Filtre: En Yeni",
  viewArchive: "Arşivi Gör",
  featuredPost: "Öne Çıkan",
  share: "Paylaş",
  caseStudy: "Vaka Çalışması",
  statsValue: "113+",
  statsLabel: "Tamamlanan Proje",
  subscribeTitle1: "GELİŞİME",
  subscribeTitle2: "KATILIN",
  subscribeDesc:
    "Teknik bültenimize abone olun; hava hareketi mühendisliğindeki gelişmeleri kaçırmayın.",
  subscribePlaceholder: "Kurumsal e-posta adresiniz",
  subscribeButton: "Abone Ol",
  subscribeSuccess: "Teşekkürler — listeye eklendiniz.",
  backToContact: "İletişime dön",
  feedPosts: {
    featured: {
      alt: "2M Lojistik Gebze depo — Novves jet fan sistemi",
      title: "2M LOJİSTİK",
      titleLine2: "GEBZE DEPO",
      description: "Jet fan duman kontrolü ve havalandırma çözümleri NOVVES mühendisliği ile sahada.",
      likes: "2,4 B",
      comments: "184",
    },
    "square-1": {
      alt: "ASELSAN Konya endüstriyel tesis havalandırma projesi",
      title: "ASELSAN KONYA",
      likes: "842",
      comments: "32",
    },
    "square-2": {
      alt: "3S Kale Topaz Zeytinburnu konut projesi",
      title: "3S KALE TOPAZ",
      likes: "1,2 B",
      comments: "56",
    },
    tall: {
      alt: "Adana Yüreğir 100 yataklı hastane duman tahliye",
      title: "ADANA YÜREĞİR HASTANE",
      likes: "560",
      comments: "21",
    },
    stats: { alt: "" },
    "square-3": {
      alt: "Adıyaman Belediyesi katlı otopark havalandırma projesi",
      title: "ADIYAMAN OTOPARK",
      likes: "430",
      comments: "18",
    },
  },
};

const sosyalMedyaHubEn = {
  breadcrumbHome: "Home",
  breadcrumbContact: "Contact",
  breadcrumbSocialMedia: "Social Media",
  heroTitle1: "SOCIAL",
  heroTitle2: "HUB",
  heroDesc:
    "Select your primary frequency. Engineering insights delivered across global and local streams.",
  channels: {
    instagram: {
      label: "Instagram",
      titleLine1: "Visual",
      titleLine2: "Excellence",
      trLink: "TR FEED",
      globalLink: "GLOBAL FEED",
    },
    linkedin: {
      label: "LinkedIn",
      titleLine1: "Corporate",
      titleLine2: "Insights",
      trLink: "TR NETWORK",
      globalLink: "GLOBAL NETWORK",
    },
    whatsapp: {
      label: "WhatsApp",
      titleLine1: "Direct",
      titleLine2: "Channel",
      trLink: "TR CONTACT",
      globalLink: "GLOBAL CONTACT",
    },
    telegram: {
      label: "Telegram",
      titleLine1: "Broadcast",
      titleLine2: "Hub",
      trLink: "TR CHANNEL",
      globalLink: "GLOBAL CHANNEL",
    },
  },
  momentsTitle1: "MOMENTS OF",
  momentsTitle2: "INNOVATION",
  momentsDesc: "A curated live archive of engineering breakthroughs and community highlights.",
  filterLatest: "Filter: Latest",
  viewArchive: "View Archive",
  featuredPost: "Featured Post",
  share: "Share",
  caseStudy: "Case Study",
  statsValue: "113+",
  statsLabel: "Projects Delivered Worldwide",
  subscribeTitle1: "JOIN THE",
  subscribeTitle2: "EVOLUTION",
  subscribeDesc:
    "Subscribe to our technical briefing and never miss a breakthrough in air movement engineering.",
  subscribePlaceholder: "Enter your business email",
  subscribeButton: "Subscribe",
  subscribeSuccess: "Thank you — you're on the list.",
  backToContact: "Back to contact",
  feedPosts: {
    featured: {
      alt: "2M Logistics Gebze warehouse — Novves jet fan system",
      title: "2M LOGISTICS GEBZE",
      titleLine2: "WAREHOUSE",
      description:
        "Jet fan smoke control and ventilation solutions engineered and supplied by NOVVES.",
      likes: "2.4k",
      comments: "184",
    },
    "square-1": {
      alt: "ASELSAN Konya industrial facility ventilation project",
      title: "ASELSAN KONYA",
      likes: "842",
      comments: "32",
    },
    "square-2": {
      alt: "3S Kale Topaz residential project in Zeytinburnu",
      title: "3S KALE TOPAZ",
      likes: "1.2k",
      comments: "56",
    },
    tall: {
      alt: "Adana Yüreğir 100-bed hospital — smoke and heat exhaust",
      title: "ADANA YÜREĞİR HOSPITAL",
      likes: "560",
      comments: "21",
    },
    stats: { alt: "" },
    "square-3": {
      alt: "Adıyaman Municipality multi-storey car park ventilation",
      title: "ADIYAMAN CAR PARK",
      likes: "430",
      comments: "18",
    },
  },
};

function mergeHub(locale, iletisimHub, sosyalMedyaHub) {
  const filePath = path.join(DICT, locale, "contact.json");
  const contact = JSON.parse(fs.readFileSync(filePath, "utf8"));
  contact.iletisimHub = iletisimHub;
  contact.sosyalMedyaHub = sosyalMedyaHub;
  fs.writeFileSync(filePath, JSON.stringify(contact, null, 2) + "\n", "utf8");
  console.error(`[${locale}] contact.json hub sections seeded`);
}

mergeHub("tr", iletisimHubTr, sosyalMedyaHubTr);
mergeHub("en", iletisimHubEn, sosyalMedyaHubEn);
