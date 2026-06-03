import type { ReactNode } from "react";
import type { LegalDocId } from "@/lib/legal-center/types";

type IconProps = { className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Kişisel veriler / gizlilik politikası — açık klasör */
function IconPrivacy({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden {...stroke}>
      <path d="M4 9V7.2A1.2 1.2 0 015.2 6h4.3L10.2 8h8.6A1.2 1.2 0 0120 9.2V17a1.2 1.2 0 01-1.2 1.2H5.2A1.2 1.2 0 014 17V9z" />
      <path d="M4 9h16" />
      <path d="M9 6V4.8A1.2 1.2 0 0110.2 3.6h2.6A1.2 1.2 0 0114 4.8V6" />
    </svg>
  );
}

/** Kullanım koşulları — adalet terazisi */
function IconTerms({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden {...stroke}>
      <path d="M12 3v2.5" />
      <path d="M5.5 7h13" />
      <path d="M5.5 7L4 13h3L5.5 7z" />
      <path d="M18.5 7L17 13h3l-1.5-6z" />
      <path d="M12 7.5v13" />
      <path d="M8.5 20.5h7" />
    </svg>
  );
}

/** Ziyaretçi aydınlatma — kalkan + kullanıcı */
function IconVisitor({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden {...stroke}>
      <path d="M12 2.5l7 3.5v5.2c0 4.2-2.8 8.1-7 9.8-4.2-1.7-7-5.6-7-9.8V6l7-3.5z" />
      <circle cx="12" cy="10" r="2" />
      <path d="M8.5 15.5c.9-1.6 2.1-2.5 3.5-2.5s2.6.9 3.5 2.5" />
    </svg>
  );
}

/** Çerez politikası — çerez */
function IconCookies({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden {...stroke}>
      <path d="M12 3a9 9 0 109 9 4.5 4.5 0 01-4.5-4.5c0-2.5 2-4.5 4.5-4.5 0-2.5-2-4.5-4.5-4.5A9 9 0 0112 3z" />
      <circle cx="9" cy="10" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="14" cy="8" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="15" cy="13" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="10" cy="15" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Müşteri aydınlatma — müşteri / iş ortağı */
function IconCustomer({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden {...stroke}>
      <circle cx="8.5" cy="8" r="2.25" />
      <path d="M4 17.5c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5" />
      <circle cx="16.5" cy="9" r="1.75" />
      <path d="M13.5 17.5c0-1.8 1.35-3.25 3-3.25s3 1.45 3 3.25" />
    </svg>
  );
}

/** Ürün güvenliği temas — uyarı kalkanı */
function IconProductSafety({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden {...stroke}>
      <path d="M12 2.5l7 3.5v5.2c0 4.2-2.8 8.1-7 9.8-4.2-1.7-7-5.6-7-9.8V6l7-3.5z" />
      <path d="M12 8v5" />
      <circle cx="12" cy="15.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

const ICONS: Record<LegalDocId, (props: IconProps) => ReactNode> = {
  privacy: IconPrivacy,
  terms: IconTerms,
  visitor: IconVisitor,
  cookies: IconCookies,
  customer: IconCustomer,
  "product-safety": IconProductSafety,
};

export function LegalDocIcon({
  id,
  className = "h-[18px] w-[18px] shrink-0",
}: {
  id: LegalDocId;
  className?: string;
}) {
  const Icon = ICONS[id];
  return <Icon className={className} />;
}
