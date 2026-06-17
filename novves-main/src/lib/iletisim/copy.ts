import { ILETISIM_LOCATION_META } from "./location-meta";
import {
  NOVVES_FACTORY_ADDRESS,
  NOVVES_HEAD_OFFICE_ADDRESS,
} from "@/lib/company/addresses";

export type IletisimLocation = {
  id: "hq" | "factory";
  badge: string;
  title: string;
  address: string;
  mapsHref: string;
  icon: "map" | "factory" | "home_repair_service";
};

export type IletisimPageCopy = {
  breadcrumbHome: string;
  breadcrumbSection: string;
  breadcrumbCurrent: string;
  sidebarSubtitle: string;
  navContactSupport: string;
  navContact: string;
  navTechnicalSupport: string;
  navPartners: string;
  navGlobalPartners: string;
  navPartnership: string;
  workingHours: string;
  weekdays: string;
  weekdaysHours: string;
  saturday: string;
  saturdayHours: string;
  sunday: string;
  sundayClosed: string;
  downloadSpecs: string;
  heroBadge: string;
  heroTitle: string;
  heroTitleLine2: string;
  heroDesc: string;
  formTitle: string;
  formDesc: string;
  successMessage: string;
  labelName: string;
  labelCompany: string;
  labelEmail: string;
  labelPhone: string;
  labelDepartment: string;
  labelSubject: string;
  labelMessage: string;
  placeholderName: string;
  placeholderCompany: string;
  placeholderEmail: string;
  placeholderPhone: string;
  placeholderSelect: string;
  placeholderSubject: string;
  placeholderMessage: string;
  departments: string[];
  kvkkConsent: string;
  submit: string;
  locationsTitle: string;
  locationsDesc: string;
  getDirections: string;
  locations: IletisimLocation[];
  fabLabel: string;
};

export type IletisimHubJson = Omit<IletisimPageCopy, "locations"> & {
  locations: Array<{
    id: IletisimLocation["id"];
    badge: string;
    title: string;
    address: string;
  }>;
};

const defaultLocationsEn: IletisimHubJson["locations"] = [
  {
    id: "hq",
    badge: "Head Office",
    title: "Istanbul Office",
    address: NOVVES_HEAD_OFFICE_ADDRESS.replace(" / Türkiye", ""),
  },
  {
    id: "factory",
    badge: "Factory",
    title: "Yalova Production Plant",
    address: NOVVES_FACTORY_ADDRESS.replace(" / Türkiye", ""),
  },
];

const defaultLocationsTr: IletisimHubJson["locations"] = [
  {
    id: "hq",
    badge: "Merkez Ofis",
    title: "İstanbul Ofis",
    address: NOVVES_HEAD_OFFICE_ADDRESS.replace(" / Türkiye", ""),
  },
  {
    id: "factory",
    badge: "Fabrika",
    title: "Yalova Üretim Tesisi",
    address: NOVVES_FACTORY_ADDRESS.replace(" / Türkiye", ""),
  },
];

const fallbackEn: IletisimPageCopy = {
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
  locations: [],
  fabLabel: "Live Support",
};

const fallbackTr: IletisimPageCopy = {
  ...fallbackEn,
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
  saturday: "Cumartesi",
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
  fabLabel: "Canlı Destek",
};

function applyCanonicalAddresses(locations: IletisimLocation[]): IletisimLocation[] {
  return locations.map((loc) => {
    if (loc.id === "hq") {
      return { ...loc, address: NOVVES_HEAD_OFFICE_ADDRESS.replace(" / Türkiye", "") };
    }
    if (loc.id === "factory") {
      return { ...loc, address: NOVVES_FACTORY_ADDRESS.replace(" / Türkiye", "") };
    }
    return loc;
  });
}

function attachLocationMeta(
  locations: IletisimHubJson["locations"] | undefined,
): IletisimLocation[] {
  if (!locations?.length) return [];
  return locations.map((loc) => {
    const meta = ILETISIM_LOCATION_META[loc.id];
    return {
      ...loc,
      mapsHref: meta?.mapsHref ?? "",
      icon: meta?.icon ?? "map",
    };
  });
}

export function resolveIletisimPageCopy(
  hub: IletisimHubJson | undefined,
  locale: string,
): IletisimPageCopy {
  const fallback = locale === "tr" ? fallbackTr : fallbackEn;
  const defaultLocations = locale === "tr" ? defaultLocationsTr : defaultLocationsEn;
  const locations = applyCanonicalAddresses(
    attachLocationMeta(hub?.locations ?? defaultLocations),
  );

  if (!hub) return { ...fallback, locations };

  return {
    ...fallback,
    ...hub,
    locations,
  };
}

/** @deprecated Prefer resolveIletisimPageCopy with dictionary hub */
export function getIletisimPageCopy(locale: string): IletisimPageCopy {
  return resolveIletisimPageCopy(undefined, locale);
}
