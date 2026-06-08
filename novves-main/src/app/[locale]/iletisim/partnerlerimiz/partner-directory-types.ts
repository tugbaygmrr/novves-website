export type PartnerRecord = {
  id: string;
  name: string;
  subtitle: string;
  logoSrc?: string;
  logoInitials: string;
  logoClassName: string;
  country: string;
  countryCode: "tr" | "pk" | "kw" | "kz" | "tm" | "de" | "us" | "global";
  expertise: string[];
  category: string;
  email: string;
  phone: string;
  phone2?: string;
  websiteLabel: string;
  websiteUrl: string;
  description?: string;
};

export type PartnerListCopy = {
  sectionLabel: string;
  heroTitle1: string;
  heroTitle2: string;
  heroDesc: string;
  searchPlaceholder: string;
  allCountries: string;
  allCategories: string;
  filter: string;
  colCompany: string;
  colCountry: string;
  colExpertise: string;
  colContact: string;
  colWebsite: string;
  ctaQuestion: string;
  ctaButton: string;
  valueTrust: string;
  valueQuality: string;
  valueGrowth: string;
  categoryAutomation: string;
  categoryEnergy: string;
  categoryDigital: string;
  categoryConstruction: string;
  noResults: string;
};

export const PARTNER_CATEGORIES: Array<{
  id: string;
  labelKey: keyof Pick<
    PartnerListCopy,
    "categoryAutomation" | "categoryEnergy" | "categoryDigital" | "categoryConstruction"
  >;
}> = [
  { id: "insaat", labelKey: "categoryConstruction" },
  { id: "otomasyon", labelKey: "categoryAutomation" },
  { id: "enerji", labelKey: "categoryEnergy" },
  { id: "dijital", labelKey: "categoryDigital" },
];
