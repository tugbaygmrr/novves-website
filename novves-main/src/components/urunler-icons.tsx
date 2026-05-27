/**
 * Fernus renkli 3D ikon seti — Ürün aileleri (9 ikon)
 * viewBox 64x64, 4 katman: koyu lacivert + mavi + açık mavi + turuncu/krem vurgu
 * Navbar dropdown'da ürün başlıklarının yanında kullanılır.
 */

type IconProps = {
  className?: string;
  size?: number;
};

const wrap = (children: React.ReactNode, { className = "h-8 w-8", size }: IconProps) => (
  <svg
    viewBox="0 0 64 64"
    className={className}
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    {children}
  </svg>
);

/** 1. Hava Hareketi — fan with 3-blade impeller */
export const IconHavaHareketi = (p: IconProps = {}) =>
  wrap(
    <>
      <circle cx="34" cy="34" r="24" fill="#1F4A5C" />
      <circle cx="32" cy="32" r="24" fill="#5DA3BB" />
      <circle cx="32" cy="32" r="19" fill="#1F4A5C" />
      <g transform="translate(32 32)">
        <g transform="rotate(0)">
          <path d="M 0 -3 C -3 -16 -14 -14 -14 -6 C -14 1 -7 4 0 3 Z" fill="#B7DDE8" />
        </g>
        <g transform="rotate(120)">
          <path d="M 0 -3 C -3 -16 -14 -14 -14 -6 C -14 1 -7 4 0 3 Z" fill="#B7DDE8" />
        </g>
        <g transform="rotate(240)">
          <path d="M 0 -3 C -3 -16 -14 -14 -14 -6 C -14 1 -7 4 0 3 Z" fill="#B7DDE8" />
        </g>
      </g>
      <circle cx="32" cy="32" r="3.5" fill="#E68B6A" />
    </>,
    p,
  );

/** 2. İklimlendirme — AHU unit with 3 sections */
export const IconIklimlendirme = (p: IconProps = {}) =>
  wrap(
    <>
      <rect x="12" y="10" width="10" height="10" fill="#1F4A5C" />
      <rect x="10" y="8" width="10" height="10" fill="#5DA3BB" />
      <rect x="44" y="10" width="10" height="10" fill="#1F4A5C" />
      <rect x="42" y="8" width="10" height="10" fill="#E68B6A" />
      <rect x="6" y="20" width="52" height="32" rx="2" fill="#1F4A5C" />
      <rect x="4" y="18" width="52" height="32" rx="2" fill="#5DA3BB" />
      <rect x="8" y="22" width="14" height="22" fill="#B7DDE8" />
      <line x1="11" y1="23" x2="11" y2="43" stroke="#1F4A5C" strokeWidth="1.2" />
      <line x1="14" y1="23" x2="14" y2="43" stroke="#1F4A5C" strokeWidth="1.2" />
      <line x1="17" y1="23" x2="17" y2="43" stroke="#1F4A5C" strokeWidth="1.2" />
      <line x1="20" y1="23" x2="20" y2="43" stroke="#1F4A5C" strokeWidth="1.2" />
      <rect x="24" y="22" width="14" height="22" fill="#B7DDE8" />
      <path d="M26 24 L 30 30 L 26 36 L 30 42" stroke="#1F4A5C" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      <path d="M32 24 L 36 30 L 32 36 L 36 42" stroke="#1F4A5C" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      <rect x="40" y="22" width="14" height="22" fill="#B7DDE8" />
      <circle cx="47" cy="33" r="5" fill="none" stroke="#1F4A5C" strokeWidth="1.5" />
      <line x1="44" y1="30" x2="50" y2="36" stroke="#1F4A5C" strokeWidth="1.5" />
      <line x1="44" y1="36" x2="50" y2="30" stroke="#1F4A5C" strokeWidth="1.5" />
    </>,
    p,
  );

/** 3. Soğutma ve Isıtma — split unit with snowflake + sun */
export const IconSogutmaIsitma = (p: IconProps = {}) =>
  wrap(
    <>
      <rect x="10" y="14" width="48" height="40" rx="4" fill="#1F4A5C" />
      <rect x="6" y="10" width="48" height="40" rx="4" fill="#5DA3BB" />
      <path d="M10 10 L 30 10 L 30 50 L 10 50 Q 6 50 6 46 L 6 14 Q 6 10 10 10 Z" fill="#B7DDE8" />
      <line x1="30" y1="10" x2="30" y2="50" stroke="#1F4A5C" strokeWidth="1.2" />
      <g stroke="#1F4A5C" strokeWidth="1.8" strokeLinecap="round" transform="translate(18 30)">
        <line x1="-8" y1="0" x2="8" y2="0" />
        <line x1="0" y1="-8" x2="0" y2="8" />
        <line x1="-5.5" y1="-5.5" x2="5.5" y2="5.5" />
        <line x1="-5.5" y1="5.5" x2="5.5" y2="-5.5" />
        <line x1="-8" y1="0" x2="-10" y2="-2" />
        <line x1="-8" y1="0" x2="-10" y2="2" />
        <line x1="8" y1="0" x2="10" y2="-2" />
        <line x1="8" y1="0" x2="10" y2="2" />
        <line x1="0" y1="-8" x2="-2" y2="-10" />
        <line x1="0" y1="-8" x2="2" y2="-10" />
        <line x1="0" y1="8" x2="-2" y2="10" />
        <line x1="0" y1="8" x2="2" y2="10" />
      </g>
      <circle cx="42" cy="30" r="6" fill="#E68B6A" />
      <g stroke="#E68B6A" strokeWidth="2" strokeLinecap="round">
        <line x1="42" y1="17" x2="42" y2="20" />
        <line x1="42" y1="40" x2="42" y2="43" />
        <line x1="29" y1="30" x2="32" y2="30" />
        <line x1="52" y1="30" x2="55" y2="30" />
        <line x1="33" y1="21" x2="35" y2="23" />
        <line x1="49" y1="37" x2="51" y2="39" />
        <line x1="33" y1="39" x2="35" y2="37" />
        <line x1="49" y1="23" x2="51" y2="21" />
      </g>
    </>,
    p,
  );

/** 4. Hava Yönetimi — duct with louvers + control accent */
export const IconHavaYonetimi = (p: IconProps = {}) =>
  wrap(
    <>
      <rect x="10" y="14" width="48" height="40" rx="2" fill="#1F4A5C" />
      <rect x="6" y="10" width="48" height="40" rx="2" fill="#5DA3BB" />
      <rect x="10" y="14" width="40" height="32" fill="#B7DDE8" />
      <rect x="11" y="17" width="38" height="5" rx="1" fill="#1F4A5C" transform="rotate(-15 30 19.5)" />
      <rect x="11" y="27" width="38" height="5" rx="1" fill="#1F4A5C" transform="rotate(-15 30 29.5)" />
      <rect x="11" y="37" width="38" height="5" rx="1" fill="#1F4A5C" transform="rotate(-15 30 39.5)" />
      <line x1="50" y1="10" x2="56" y2="4" stroke="#E68B6A" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="50" cy="10" r="3" fill="#E68B6A" />
    </>,
    p,
  );

/** 5. Hava Dağıtımı — manifold/duct distribution */
export const IconHavaDagitimi = (p: IconProps = {}) =>
  wrap(
    <>
      <rect x="4" y="28" width="20" height="14" fill="#1F4A5C" />
      <rect x="2" y="26" width="20" height="14" rx="1" fill="#5DA3BB" />
      <rect x="2" y="28" width="3" height="10" fill="#B7DDE8" />
      <rect x="22" y="20" width="16" height="26" rx="1" fill="#1F4A5C" />
      <rect x="20" y="18" width="16" height="26" rx="1" fill="#5DA3BB" />
      <rect x="36" y="14" width="22" height="6" rx="1" fill="#1F4A5C" />
      <rect x="34" y="12" width="22" height="6" rx="1" fill="#5DA3BB" />
      <rect x="52" y="12" width="4" height="6" fill="#B7DDE8" />
      <rect x="36" y="26" width="24" height="6" rx="1" fill="#1F4A5C" />
      <rect x="34" y="24" width="24" height="6" rx="1" fill="#5DA3BB" />
      <rect x="54" y="24" width="4" height="6" fill="#E68B6A" />
      <rect x="36" y="38" width="22" height="6" rx="1" fill="#1F4A5C" />
      <rect x="34" y="36" width="22" height="6" rx="1" fill="#5DA3BB" />
      <rect x="52" y="36" width="4" height="6" fill="#B7DDE8" />
    </>,
    p,
  );

/** 6. Hava Filtrasyonu — pleated filter with dust + airflow arrows */
export const IconHavaFiltrasyonu = (p: IconProps = {}) =>
  wrap(
    <>
      <rect x="10" y="14" width="48" height="40" rx="2" fill="#1F4A5C" />
      <rect x="6" y="10" width="48" height="40" rx="2" fill="#5DA3BB" />
      <rect x="10" y="14" width="40" height="32" fill="#B7DDE8" />
      <g stroke="#1F4A5C" strokeWidth="1.5">
        <line x1="13" y1="14" x2="13" y2="46" />
        <line x1="17" y1="14" x2="17" y2="46" />
        <line x1="21" y1="14" x2="21" y2="46" />
        <line x1="25" y1="14" x2="25" y2="46" />
        <line x1="29" y1="14" x2="29" y2="46" />
        <line x1="33" y1="14" x2="33" y2="46" />
        <line x1="37" y1="14" x2="37" y2="46" />
        <line x1="41" y1="14" x2="41" y2="46" />
        <line x1="45" y1="14" x2="45" y2="46" />
      </g>
      <circle cx="2" cy="20" r="2" fill="#E68B6A" />
      <circle cx="0" cy="32" r="1.5" fill="#E68B6A" />
      <circle cx="3" cy="42" r="1.8" fill="#E68B6A" />
      <path d="M52 22 L 58 22 M 56 20 L 58 22 L 56 24" stroke="#1F4A5C" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M52 32 L 58 32 M 56 30 L 58 32 L 56 34" stroke="#1F4A5C" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M52 42 L 58 42 M 56 40 L 58 42 L 56 44" stroke="#1F4A5C" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>,
    p,
  );

/** 7. Aksesuarlar — hex bolt + battery + gauge dial */
export const IconAksesuarlar = (p: IconProps = {}) =>
  wrap(
    <>
      <polygon points="34,10 48,18 48,32 34,40 20,32 20,18" fill="#1F4A5C" />
      <polygon points="32,8 46,16 46,30 32,38 18,30 18,16" fill="#5DA3BB" />
      <circle cx="32" cy="23" r="6" fill="#B7DDE8" />
      <circle cx="32" cy="23" r="2.5" fill="#1F4A5C" />
      <rect x="9" y="44" width="6" height="14" rx="0.5" fill="#1F4A5C" />
      <rect x="7" y="42" width="6" height="14" rx="0.5" fill="#5DA3BB" />
      <polygon points="3,38 17,38 17,46 3,46" fill="#E68B6A" />
      <circle cx="50" cy="50" r="8" fill="#1F4A5C" />
      <circle cx="48" cy="48" r="8" fill="#5DA3BB" />
      <circle cx="48" cy="48" r="3.5" fill="#B7DDE8" />
    </>,
    p,
  );

/** 8. Otomasyon Malzemeleri — control panel with display + switches */
export const IconOtomasyonMalzemeleri = (p: IconProps = {}) =>
  wrap(
    <>
      <rect x="10" y="12" width="48" height="44" rx="3" fill="#1F4A5C" />
      <rect x="6" y="8" width="48" height="44" rx="3" fill="#5DA3BB" />
      <rect x="6" y="8" width="48" height="6" rx="3" fill="#1F4A5C" />
      <rect x="6" y="11" width="48" height="3" fill="#1F4A5C" />
      <circle cx="10" cy="11" r="1" fill="#5DA3BB" />
      <circle cx="50" cy="11" r="1" fill="#5DA3BB" />
      <rect x="10" y="18" width="40" height="14" rx="1" fill="#B7DDE8" />
      <line x1="13" y1="22" x2="22" y2="22" stroke="#1F4A5C" strokeWidth="1.2" />
      <line x1="13" y1="26" x2="30" y2="26" stroke="#1F4A5C" strokeWidth="1.2" />
      <line x1="13" y1="29" x2="22" y2="29" stroke="#1F4A5C" strokeWidth="1.2" />
      <rect x="36" y="22" width="10" height="8" rx="1" fill="#E68B6A" />
      <circle cx="14" cy="40" r="2" fill="#E68B6A" />
      <circle cx="22" cy="40" r="2" fill="#1F4A5C" />
      <circle cx="30" cy="40" r="2" fill="#1F4A5C" />
      <rect x="38" y="37" width="6" height="6" rx="1" fill="#1F4A5C" />
      <rect x="46" y="37" width="6" height="6" rx="1" fill="#1F4A5C" />
      <rect x="12" y="46" width="3" height="6" fill="#1F4A5C" />
      <rect x="18" y="46" width="3" height="6" fill="#1F4A5C" />
      <rect x="24" y="46" width="3" height="6" fill="#1F4A5C" />
      <rect x="30" y="46" width="3" height="6" fill="#1F4A5C" />
      <rect x="36" y="46" width="3" height="6" fill="#1F4A5C" />
      <rect x="42" y="46" width="3" height="6" fill="#1F4A5C" />
      <rect x="48" y="46" width="3" height="6" fill="#1F4A5C" />
    </>,
    p,
  );

/** 9. Titreşim & Ses İzolasyon — insulation pads with sound waves */
export const IconTitresimSesIzolasyon = (p: IconProps = {}) =>
  wrap(
    <>
      <line x1="18" y1="3" x2="22" y2="7" stroke="#E68B6A" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="30" y1="2" x2="30" y2="6" stroke="#E68B6A" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="42" y1="3" x2="38" y2="7" stroke="#E68B6A" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="12" y="12" width="40" height="6" rx="1" fill="#1F4A5C" />
      <rect x="10" y="10" width="40" height="6" rx="1" fill="#5DA3BB" />
      <g fill="none" stroke="#E68B6A" strokeWidth="2.5" strokeLinecap="round">
        <ellipse cx="30" cy="20" rx="12" ry="2.5" />
        <ellipse cx="30" cy="26" rx="12" ry="2.5" />
        <ellipse cx="30" cy="32" rx="12" ry="2.5" />
        <ellipse cx="30" cy="38" rx="12" ry="2.5" />
        <ellipse cx="30" cy="44" rx="12" ry="2.5" />
      </g>
      <rect x="12" y="52" width="40" height="6" rx="1" fill="#1F4A5C" />
      <rect x="10" y="50" width="40" height="6" rx="1" fill="#5DA3BB" />
      <rect x="10" y="50" width="40" height="1.5" rx="1" fill="#B7DDE8" />
    </>,
    p,
  );

/** Slug → Component mapping (navbar /urunler/<slug> linkleriyle eşleşir) */
export const urunlerIconMap: Record<string, (props?: IconProps) => React.ReactNode> = {
  "hava-hareketi": IconHavaHareketi,
  "iklimlendirme": IconIklimlendirme,
  "sogutma-ve-isitma": IconSogutmaIsitma,
  "hava-yonetimi": IconHavaYonetimi,
  "hava-dagitimi": IconHavaDagitimi,
  "hava-filtrasyonu": IconHavaFiltrasyonu,
  "aksesuarlar": IconAksesuarlar,
  "otomasyon-malzemeleri": IconOtomasyonMalzemeleri,
  "titresim-ve-ses-izolasyon": IconTitresimSesIzolasyon,
};
