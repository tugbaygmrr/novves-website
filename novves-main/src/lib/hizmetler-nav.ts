export type HizmetlerNavItem = {
  id: string;
  href: string;
  icon: string;
  /** common.navbar.links key veya hizmetler menüsüne özel labelKey */
  labelKey: string;
  disabled?: boolean;
};

/** Sol menü sırası — kullanıcı onaylı hizmet ağacı */
export const HIZMETLER_NAV_ITEMS: HizmetlerNavItem[] = [
  { id: "overview", href: "/hizmetler", icon: "dashboard", labelKey: "overview" },
  { id: "yerinde-kesif", href: "/hizmetler/yerinde-kesif", icon: "location_searching", labelKey: "onSiteInspection" },
  {
    id: "duman-kontrol",
    href: "/hizmetler/duman-kontrol-sistemi-tasarimi",
    icon: "air",
    labelKey: "smokeControlDesign",
  },
  { id: "cfd-analizi", href: "/hizmetler/cfd-analizi", icon: "analytics", labelKey: "cfdAnalysis" },
  {
    id: "fan-secimi",
    href: "/hizmetler/fan-secimi-ve-teknik-projelendirme",
    icon: "architecture",
    labelKey: "fanSelectionEngineering",
  },
  { id: "devreye-alma", href: "/hizmetler/devreye-alma", icon: "precision_manufacturing", labelKey: "commissioning" },
  { id: "teknik-servis", href: "/hizmetler/teknik-servis", icon: "rebase_edit", labelKey: "technicalService" },
  {
    id: "bakim-performans",
    href: "/hizmetler/bakim-ve-performans-kontrolu",
    icon: "speed",
    labelKey: "maintenancePerformance",
  },
  {
    id: "egitim-danismanlik",
    href: "/hizmetler/egitim-ve-teknik-danismanlik",
    icon: "school",
    labelKey: "trainingConsulting",
  },
];

/** Genel bakış kart grid sırası (overview hariç) */
export const HIZMETLER_HUB_CARD_SLUGS = HIZMETLER_NAV_ITEMS.filter(
  (item) => item.href && item.href !== "/hizmetler" && !item.disabled,
).map((item) => item.href.replace(/^\/hizmetler\//, ""));

/** Hizmetler sol panel / header — Türkçe menü metinleri */
export const HIZMETLER_LABELS_TR: Record<string, string> = {
  overview: "Genel Bakış",
  onSiteInspection: "Yerinde Keşif",
  smokeControlDesign: "Duman Kontrol Tasarımı",
  cfdAnalysis: "CFD Analizi",
  fanSelectionEngineering: "Fan Seçimi ve Teknik Projelendirme",
  commissioning: "Devreye Alma",
  technicalService: "Teknik Servis",
  maintenancePerformance: "Bakım ve Performans Kontrolü",
  trainingConsulting: "Eğitim ve Teknik Danışmanlık",
};

export function getHizmetlerNavLabel(
  labelKey: string,
  links: Record<string, string>,
): string {
  return links[labelKey] ?? HIZMETLER_LABELS_TR[labelKey] ?? labelKey;
}

/** Sidebar + mobil menü etiketleri — TR sitede tamamen Türkçe */
export function buildHizmetlerNavLabels(
  locale: string,
  links: Record<string, string>,
): Record<string, string> {
  if (locale === "tr") {
    return { ...HIZMETLER_LABELS_TR };
  }
  return { ...links };
}

/** Header / mobil menü — sidebar ile aynı sıra ve etiketler */
export function getHizmetlerNavbarLinks(
  links: Record<string, string>,
  locale?: string,
): { label: string; href: string }[] {
  const merged = buildHizmetlerNavLabels(locale ?? "tr", links);
  return HIZMETLER_NAV_ITEMS.filter((item) => item.href && !item.disabled).map((item) => ({
    label: getHizmetlerNavLabel(item.labelKey, merged),
    href: item.href,
  }));
}

export function resolveActiveHizmetlerNavId(pathname: string, locale: string): string {
  const normalized = pathname.split("?")[0]?.replace(/\/$/, "") ?? "";
  const base = `/${locale}/hizmetler`;
  if (normalized === base) return "overview";

  const suffix = normalized.startsWith(`${base}/`) ? normalized.slice(base.length + 1) : "";
  if (!suffix) return "overview";

  for (const item of HIZMETLER_NAV_ITEMS) {
    if (!item.href || item.disabled) continue;
    const slug = item.href.replace(/^\/hizmetler\//, "");
    if (suffix === slug || suffix.startsWith(`${slug}/`)) return item.id;
  }
  return "overview";
}
