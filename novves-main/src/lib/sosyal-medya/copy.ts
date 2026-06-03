import type { SosyalMedyaCopy, SosyalMedyaFeedPostCopy, SosyalMedyaFeedPostId } from "./types";

export type SosyalMedyaHubJson = SosyalMedyaCopy & {
  feedPosts?: Partial<Record<SosyalMedyaFeedPostId, SosyalMedyaFeedPostCopy>>;
};

const fallbackEn: SosyalMedyaCopy = {
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
};

const fallbackTr: SosyalMedyaCopy = {
  ...fallbackEn,
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
  statsLabel: "Tamamlanan Proje",
  subscribeTitle1: "GELİŞİME",
  subscribeTitle2: "KATILIN",
  subscribeDesc:
    "Teknik bültenimize abone olun; hava hareketi mühendisliğindeki gelişmeleri kaçırmayın.",
  subscribePlaceholder: "Kurumsal e-posta adresiniz",
  subscribeButton: "Abone Ol",
  subscribeSuccess: "Teşekkürler — listeye eklendiniz.",
  backToContact: "İletişime dön",
};

export function resolveSosyalMedyaCopy(
  hub: SosyalMedyaHubJson | undefined,
  locale: string,
): SosyalMedyaCopy {
  const fallback = locale === "tr" ? fallbackTr : fallbackEn;
  if (!hub) return fallback;
  const { feedPosts: _feedPosts, ...ui } = hub;
  return { ...fallback, ...ui, channels: { ...fallback.channels, ...ui.channels } };
}

export function resolveSosyalMedyaFeedPosts(
  hub: SosyalMedyaHubJson | undefined,
  locale: string,
): Partial<Record<SosyalMedyaFeedPostId, SosyalMedyaFeedPostCopy>> | undefined {
  return hub?.feedPosts ?? undefined;
}

/** @deprecated Prefer resolveSosyalMedyaCopy with dictionary hub */
export function getSosyalMedyaCopy(locale: string): SosyalMedyaCopy {
  return resolveSosyalMedyaCopy(undefined, locale);
}
