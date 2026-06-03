export type SosyalMedyaPlatformId = "instagram" | "linkedin" | "whatsapp" | "telegram";

export type SosyalMedyaFeedPostId =
  | "featured"
  | "square-1"
  | "square-2"
  | "tall"
  | "stats"
  | "square-3";

export type SosyalMedyaFeedPostCopy = {
  alt: string;
  title?: string;
  titleLine2?: string;
  description?: string;
  likes?: string;
  comments?: string;
};

export type SosyalMedyaCopy = {
  breadcrumbHome: string;
  breadcrumbContact: string;
  breadcrumbSocialMedia: string;
  heroTitle1: string;
  heroTitle2: string;
  heroDesc: string;
  channels: Record<
    SosyalMedyaPlatformId,
    {
      label: string;
      titleLine1: string;
      titleLine2: string;
      trLink: string;
      globalLink: string;
    }
  >;
  momentsTitle1: string;
  momentsTitle2: string;
  momentsDesc: string;
  filterLatest: string;
  viewArchive: string;
  featuredPost: string;
  share: string;
  caseStudy: string;
  statsValue: string;
  statsLabel: string;
  subscribeTitle1: string;
  subscribeTitle2: string;
  subscribeDesc: string;
  subscribePlaceholder: string;
  subscribeButton: string;
  subscribeSuccess: string;
  backToContact: string;
};
