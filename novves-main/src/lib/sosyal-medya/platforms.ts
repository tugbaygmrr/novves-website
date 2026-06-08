import type { SosyalMedyaPlatformId } from "./types";
import { NOVVES_PRIMARY_LINKEDIN } from "@/lib/company/addresses";

export type SosyalMedyaPlatformConfig = {
  id: SosyalMedyaPlatformId;
  iconBgClass: string;
  icon: "instagram" | "linkedin" | "whatsapp" | "telegram";
  trHref: string;
  globalHref: string;
};

export const SOSYAL_MEDYA_PLATFORMS: SosyalMedyaPlatformConfig[] = [
  {
    id: "instagram",
    icon: "instagram",
    iconBgClass: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
    trHref: "https://www.instagram.com/novves.turkiye/",
    globalHref: "https://www.instagram.com/novves.global/",
  },
  {
    id: "linkedin",
    icon: "linkedin",
    iconBgClass: "bg-[#0077b5]",
    trHref: NOVVES_PRIMARY_LINKEDIN,
    globalHref: NOVVES_PRIMARY_LINKEDIN,
  },
  {
    id: "whatsapp",
    icon: "whatsapp",
    iconBgClass: "bg-[#25D366]",
    trHref: "https://wa.me/905444674752",
    globalHref: "https://wa.me/905444674752",
  },
  {
    id: "telegram",
    icon: "telegram",
    iconBgClass: "bg-[#0088cc]",
    trHref: "https://t.me/+905444674752",
    globalHref: "https://t.me/+905444674752",
  },
];
