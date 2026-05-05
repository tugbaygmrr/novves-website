export type SocialPlatformKey =
  | "linkedin"
  | "linkedinGlobal"
  | "youtube"
  | "facebook"
  | "instagramTr"
  | "instagramGlobal";

export type LocalizedSocialPageCopy = {
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
    SocialPlatformKey,
    {
      eyebrow: string;
      summary: string;
      tags: string[];
    }
  >;
};
