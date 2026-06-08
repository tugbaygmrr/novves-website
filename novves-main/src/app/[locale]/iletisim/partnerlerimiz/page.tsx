import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, hasLocale } from "../../dictionaries";
import { withPageSeo } from "@/lib/seo/page-metadata";
import { PartnerDirectory } from "./partner-directory-client";
import type { PartnerListCopy, PartnerRecord } from "./partner-directory-types";
import partnerRecordsData from "./partner-records.json";
import { PartnerPageHero } from "./partner-page-hero";
import { PartnerWorldMap } from "./partner-world-map";
import { getGlobeControlsCopy, getLocalizedPartnerPins } from "./partner-globe-i18n";

const defaultHeroStats = [
  { value: "3", label: "Partnership axes" },
  { value: "TR + Global", label: "Scale" },
  { value: "NOVVES", label: "Brand" },
];

const defaultPartnerListCopy: PartnerListCopy = {
  sectionLabel: "Our Partners",
  heroTitle1: "Stronger with our",
  heroTitle2: "partner network.",
  heroDesc: "Together with trusted partners, we add value to your projects and deliver sustainable solutions.",
  searchPlaceholder: "Search company, service or keyword...",
  allCountries: "All Countries",
  allCategories: "All Categories",
  filter: "Filter",
  colCompany: "Company",
  colCountry: "Country / Region",
  colExpertise: "Areas of Expertise",
  colContact: "Contact Details",
  colWebsite: "Website",
  ctaQuestion: "Would you like to learn about new collaborations and our partner program?",
  ctaButton: "Contact Us",
  valueTrust: "Trusted Partners",
  valueQuality: "Quality Solutions",
  valueGrowth: "Sustainable Growth",
  categoryAutomation: "Automation",
  categoryEnergy: "Energy",
  categoryDigital: "Digitalization",
  categoryConstruction: "Construction & MEP",
  noResults: "No partners match your search.",
};

type PartnerRecordLocale = {
  name?: string;
  subtitle?: string;
  description?: string;
  expertise?: string[];
  country?: string;
};

const PARTNER_COUNTRY_ISO: Partial<Record<PartnerRecord["countryCode"], string>> = {
  pk: "PK",
  kw: "KW",
  kz: "KZ",
  tm: "TM",
};

function localizePartnerCountries(partners: PartnerRecord[], locale: string) {
  let display: Intl.DisplayNames | undefined;
  try {
    display = new Intl.DisplayNames([locale, "en"], { type: "region" });
  } catch {
    return partners;
  }
  return partners.map((partner) => {
    const iso = PARTNER_COUNTRY_ISO[partner.countryCode];
    if (!iso) return partner;
    const localized = display!.of(iso);
    if (!localized || localized === iso) return partner;
    return { ...partner, country: localized };
  });
}

function applyPartnerLocale(partners: PartnerRecord[], localeRecords?: Record<string, PartnerRecordLocale>) {
  if (!localeRecords) return partners;
  return partners.map((partner) => {
    const localized = localeRecords[partner.id];
    if (!localized) return partner;
    return {
      ...partner,
      ...(localized.name ? { name: localized.name } : {}),
      ...(localized.subtitle ? { subtitle: localized.subtitle } : {}),
      ...(localized.description ? { description: localized.description } : {}),
      ...(localized.expertise ? { expertise: localized.expertise } : {}),
      ...(localized.country ? { country: localized.country } : {}),
    };
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale);
  const t = dict.contact.partnerlerimiz;
  const title = `${t.title1}${t.title2}`;
  return withPageSeo({
    locale,
    pathAfterLocale: "iletisim/partnerlerimiz",
    title: `${title} | NOVVES`,
    description: t.heroLead,
  });
}

export default async function Partnerlerimiz({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const t = dict.contact.partnerlerimiz as {
    partnerList?: PartnerListCopy;
    partnerRecords?: Record<string, PartnerRecordLocale>;
    heroStats?: Array<{ value: string; label: string }>;
    breadcrumbHome: string;
    breadcrumbContact: string;
    breadcrumbPartners: string;
    badge: string;
    title1: string;
    title2: string;
    desc: string;
    heroLead: string;
  };
  const copy = t.partnerList ?? defaultPartnerListCopy;
  const stats = t.heroStats ?? defaultHeroStats;
  const partnerPins = getLocalizedPartnerPins(locale);
  const globeLabels = getGlobeControlsCopy(locale);
  const partners = localizePartnerCountries(
    applyPartnerLocale(partnerRecordsData as PartnerRecord[], t.partnerRecords),
    locale,
  );

  return (
    <main className="overflow-x-clip">
      <PartnerPageHero
        locale={locale}
        breadcrumbHome={t.breadcrumbHome}
        breadcrumbContact={t.breadcrumbContact}
        breadcrumbPartners={t.breadcrumbPartners}
        badge={t.badge}
        title1={t.title1}
        title2={t.title2}
        desc={t.desc}
        heroLead={t.heroLead}
        stats={stats}
      />

      <PartnerDirectory locale={locale} copy={copy} partners={partners} />

      <div className="w-full bg-[#f7f4ee]">
        <PartnerWorldMap pins={partnerPins} labels={globeLabels} />
      </div>
    </main>
  );
}
