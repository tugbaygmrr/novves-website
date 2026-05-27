/**
 * Fernus renkli 3D ikon seti — Çözüm kategorileri (13 ikon)
 * viewBox 64x64, 4 katman: koyu lacivert + mavi + açık mavi + turuncu/krem vurgu
 * Navbar dropdown'da çözüm başlıklarının yanında kullanılır.
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

export const IconDumanIsiTahliye = (p: IconProps = {}) =>
  wrap(
    <>
      <rect x="10" y="44" width="48" height="16" rx="2" fill="#1F4A5C" />
      <rect x="6" y="40" width="48" height="16" rx="2" fill="#5DA3BB" />
      <rect x="12" y="45" width="6" height="6" rx="1" fill="#B7DDE8" />
      <rect x="22" y="45" width="6" height="6" rx="1" fill="#B7DDE8" />
      <rect x="28" y="26" width="12" height="18" rx="1" fill="#1F4A5C" />
      <rect x="24" y="22" width="12" height="20" rx="1" fill="#5DA3BB" />
      <rect x="24" y="22" width="12" height="4" rx="1" fill="#1F4A5C" />
      <path d="M30 18 C 25 13, 33 9, 27 3" stroke="#E68B6A" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M40 22 C 47 17, 39 13, 46 8" stroke="#E68B6A" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M48 30 C 54 25, 46 22, 56 17" stroke="#F5E3CB" strokeWidth="3" strokeLinecap="round" fill="none" />
    </>,
    p,
  );

export const IconKonforIklimlendirme = (p: IconProps = {}) =>
  wrap(
    <>
      <rect x="10" y="16" width="48" height="20" rx="3" fill="#1F4A5C" />
      <rect x="6" y="12" width="48" height="20" rx="3" fill="#5DA3BB" />
      <rect x="10" y="22" width="40" height="8" rx="1" fill="#B7DDE8" />
      <line x1="14" y1="26" x2="46" y2="26" stroke="#1F4A5C" strokeWidth="1.5" />
      <circle cx="47" cy="17" r="1.8" fill="#E68B6A" />
      <path d="M14 42 Q 19 38 24 42 T 34 42" stroke="#B7DDE8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M16 50 Q 22 46 28 50 T 40 50 T 48 50" stroke="#E68B6A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M14 58 Q 19 54 24 58 T 34 58 T 44 58" stroke="#B7DDE8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </>,
    p,
  );

export const IconHijyenikHavalandirma = (p: IconProps = {}) =>
  wrap(
    <>
      <path d="M34 8 L 54 16 L 54 32 C 54 44 44 54 34 60 C 24 54 14 44 14 32 L 14 16 Z" fill="#1F4A5C" />
      <path d="M32 6 L 52 14 L 52 30 C 52 42 42 52 32 58 C 22 52 12 42 12 30 L 12 14 Z" fill="#5DA3BB" />
      <path d="M32 14 L 44 19 L 44 30 C 44 38 38 45 32 50 C 26 45 20 38 20 30 L 20 19 Z" fill="#B7DDE8" />
      <path d="M25 32 L 30 37 L 40 25" stroke="#E68B6A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>,
    p,
  );

export const IconEndustriyelHava = (p: IconProps = {}) =>
  wrap(
    <>
      <rect x="44" y="16" width="10" height="40" fill="#1F4A5C" />
      <rect x="40" y="12" width="10" height="44" fill="#5DA3BB" />
      <rect x="40" y="12" width="10" height="4" fill="#1F4A5C" />
      <path d="M12 58 L 12 38 L 24 30 L 24 38 L 38 30 L 38 58 Z" fill="#1F4A5C" />
      <path d="M8 56 L 8 36 L 22 28 L 22 36 L 36 28 L 36 56 Z" fill="#5DA3BB" />
      <rect x="12" y="42" width="6" height="6" rx="1" fill="#B7DDE8" />
      <rect x="22" y="42" width="6" height="6" rx="1" fill="#B7DDE8" />
      <circle cx="45" cy="8" r="3.5" fill="#E68B6A" />
      <circle cx="52" cy="5" r="2.5" fill="#F5E3CB" />
    </>,
    p,
  );

export const IconHayvancilik = (p: IconProps = {}) =>
  wrap(
    <>
      <path d="M12 32 L 36 14 L 60 32 L 60 60 L 12 60 Z" fill="#1F4A5C" />
      <path d="M8 30 L 32 12 L 56 30 L 56 58 L 8 58 Z" fill="#5DA3BB" />
      <path d="M22 58 L 22 44 Q 32 36 42 44 L 42 58 Z" fill="#B7DDE8" />
      <line x1="32" y1="44" x2="32" y2="58" stroke="#1F4A5C" strokeWidth="1.5" />
      <line x1="22" y1="51" x2="42" y2="51" stroke="#1F4A5C" strokeWidth="1.5" />
      <circle cx="32" cy="24" r="5" fill="#E68B6A" />
      <circle cx="32" cy="24" r="1.5" fill="#1F4A5C" />
    </>,
    p,
  );

export const IconTrafoEnerji = (p: IconProps = {}) =>
  wrap(
    <>
      <rect x="16" y="12" width="40" height="48" rx="3" fill="#1F4A5C" />
      <rect x="12" y="8" width="40" height="48" rx="3" fill="#5DA3BB" />
      <rect x="12" y="8" width="40" height="10" rx="3" fill="#1F4A5C" />
      <rect x="18" y="22" width="28" height="14" rx="1" fill="#B7DDE8" />
      <path d="M34 20 L 22 36 L 30 36 L 26 52 L 42 32 L 32 32 Z" fill="#E68B6A" />
      <circle cx="46" cy="13" r="1.5" fill="#E68B6A" />
    </>,
    p,
  );

export const IconSeraTarimsal = (p: IconProps = {}) =>
  wrap(
    <>
      <rect x="10" y="50" width="48" height="10" fill="#1F4A5C" />
      <path d="M8 54 L 8 28 Q 32 8 56 28 L 56 54 Z" fill="#5DA3BB" />
      <path d="M14 50 L 14 30 Q 30 16 50 30 L 50 50 Z" fill="#B7DDE8" opacity="0.7" />
      <line x1="32" y1="54" x2="32" y2="14" stroke="#1F4A5C" strokeWidth="2" />
      <path d="M10 38 Q 32 22 54 38" stroke="#1F4A5C" strokeWidth="1.5" fill="none" />
      <rect x="26" y="48" width="12" height="6" fill="#1F4A5C" />
      <path d="M32 48 Q 22 40 26 28 Q 36 32 38 42 Q 38 47 32 48 Z" fill="#E68B6A" />
    </>,
    p,
  );

export const IconAtexPatlama = (p: IconProps = {}) =>
  wrap(
    <>
      <path d="M34 8 L 54 16 L 54 32 C 54 44 44 54 34 60 C 24 54 14 44 14 32 L 14 16 Z" fill="#1F4A5C" />
      <path d="M32 6 L 52 14 L 52 30 C 52 42 42 52 32 58 C 22 52 12 42 12 30 L 12 14 Z" fill="#5DA3BB" />
      <path d="M32 14 L 46 20 L 46 30 C 46 39 40 47 32 51 C 24 47 18 39 18 30 L 18 20 Z" fill="#1F4A5C" />
      <path d="M32 17 L 35 26 L 44 24 L 38 31 L 44 38 L 35 36 L 32 45 L 29 36 L 20 38 L 26 31 L 20 24 L 29 26 Z" fill="#E68B6A" />
      <circle cx="32" cy="31" r="2.5" fill="#F5E3CB" />
    </>,
    p,
  );

export const IconAkilliOtomasyon = (p: IconProps = {}) =>
  wrap(
    <>
      <rect x="18" y="18" width="34" height="34" rx="3" fill="#1F4A5C" />
      <rect x="14" y="14" width="34" height="34" rx="3" fill="#5DA3BB" />
      <rect x="20" y="20" width="22" height="22" rx="2" fill="#B7DDE8" />
      <circle cx="26" cy="26" r="2" fill="#1F4A5C" />
      <circle cx="36" cy="26" r="2" fill="#1F4A5C" />
      <circle cx="26" cy="36" r="2" fill="#1F4A5C" />
      <circle cx="36" cy="36" r="2" fill="#E68B6A" />
      <rect x="18" y="8" width="3" height="6" fill="#1F4A5C" />
      <rect x="28" y="8" width="3" height="6" fill="#1F4A5C" />
      <rect x="38" y="8" width="3" height="6" fill="#1F4A5C" />
      <rect x="18" y="48" width="3" height="6" fill="#1F4A5C" />
      <rect x="28" y="48" width="3" height="6" fill="#1F4A5C" />
      <rect x="38" y="48" width="3" height="6" fill="#1F4A5C" />
      <rect x="8" y="18" width="6" height="3" fill="#1F4A5C" />
      <rect x="8" y="28" width="6" height="3" fill="#1F4A5C" />
      <rect x="8" y="38" width="6" height="3" fill="#1F4A5C" />
      <rect x="48" y="18" width="6" height="3" fill="#1F4A5C" />
      <rect x="48" y="28" width="6" height="3" fill="#1F4A5C" />
      <rect x="48" y="38" width="6" height="3" fill="#1F4A5C" />
    </>,
    p,
  );

export const IconKonutHavalandirma = (p: IconProps = {}) =>
  wrap(
    <>
      <path d="M12 58 L 12 30 L 34 12 L 56 30 L 56 58 Z" fill="#1F4A5C" />
      <path d="M8 56 L 8 28 L 32 10 L 56 28 L 56 56 Z" fill="#5DA3BB" />
      <path d="M8 28 L 32 10 L 56 28 L 50 28 L 32 16 L 14 28 Z" fill="#B7DDE8" />
      <rect x="26" y="38" width="12" height="18" rx="1" fill="#E68B6A" />
      <circle cx="35" cy="48" r="1" fill="#1F4A5C" />
      <rect x="15" y="34" width="7" height="7" rx="1" fill="#B7DDE8" />
      <rect x="42" y="34" width="7" height="7" rx="1" fill="#B7DDE8" />
      <path d="M2 20 Q 8 17 14 20" stroke="#E68B6A" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M50 20 Q 56 17 62 20" stroke="#E68B6A" strokeWidth="2" strokeLinecap="round" fill="none" />
    </>,
    p,
  );

export const IconMarinOffshore = (p: IconProps = {}) =>
  wrap(
    <>
      <rect x="24" y="24" width="22" height="16" rx="1" fill="#1F4A5C" />
      <rect x="20" y="20" width="22" height="16" rx="1" fill="#5DA3BB" />
      <rect x="23" y="24" width="4" height="4" rx="0.5" fill="#B7DDE8" />
      <rect x="29" y="24" width="4" height="4" rx="0.5" fill="#B7DDE8" />
      <rect x="35" y="24" width="4" height="4" rx="0.5" fill="#B7DDE8" />
      <rect x="32" y="8" width="6" height="14" fill="#E68B6A" />
      <rect x="32" y="8" width="6" height="3" fill="#1F4A5C" />
      <path d="M10 42 L 56 42 L 50 56 L 16 56 Z" fill="#1F4A5C" />
      <path d="M6 38 L 54 38 L 48 52 L 12 52 Z" fill="#5DA3BB" />
      <path d="M6 38 L 54 38 L 53 42 L 7 42 Z" fill="#B7DDE8" />
      <path d="M2 58 Q 10 54 18 58 T 34 58 T 50 58 T 64 58" stroke="#B7DDE8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </>,
    p,
  );

export const IconOzelImalat = (p: IconProps = {}) =>
  wrap(
    <>
      <circle cx="32" cy="32" r="16" fill="#1F4A5C" transform="translate(4 4)" />
      <rect x="30" y="12" width="4" height="6" fill="#1F4A5C" transform="translate(4 4)" />
      <rect x="30" y="46" width="4" height="6" fill="#1F4A5C" transform="translate(4 4)" />
      <rect x="12" y="30" width="6" height="4" fill="#1F4A5C" transform="translate(4 4)" />
      <rect x="46" y="30" width="6" height="4" fill="#1F4A5C" transform="translate(4 4)" />
      <circle cx="32" cy="32" r="16" fill="#5DA3BB" />
      <rect x="30" y="12" width="4" height="6" fill="#5DA3BB" />
      <rect x="30" y="46" width="4" height="6" fill="#5DA3BB" />
      <rect x="12" y="30" width="6" height="4" fill="#5DA3BB" />
      <rect x="46" y="30" width="6" height="4" fill="#5DA3BB" />
      <circle cx="32" cy="32" r="9" fill="#B7DDE8" />
      <circle cx="32" cy="32" r="4" fill="#E68B6A" />
    </>,
    p,
  );

export const IconCfdDanismanlik = (p: IconProps = {}) =>
  wrap(
    <>
      <rect x="10" y="14" width="52" height="36" rx="3" fill="#1F4A5C" />
      <rect x="6" y="10" width="52" height="36" rx="3" fill="#5DA3BB" />
      <rect x="10" y="14" width="44" height="28" rx="1" fill="#B7DDE8" />
      <path d="M12 20 Q 22 16 32 20 T 52 20" stroke="#E68B6A" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M12 26 Q 22 22 32 26 T 52 26" stroke="#E68B6A" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M12 32 Q 22 28 32 32 T 52 32" stroke="#1F4A5C" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M12 38 Q 22 34 32 38 T 52 38" stroke="#1F4A5C" strokeWidth="2" strokeLinecap="round" fill="none" />
      <rect x="28" y="46" width="8" height="6" fill="#1F4A5C" />
      <rect x="22" y="52" width="20" height="4" rx="1" fill="#1F4A5C" />
    </>,
    p,
  );

/** Slug → Component mapping */
export const cozumlerIconMap: Record<string, (props?: IconProps) => React.ReactNode> = {
  "duman-isi-tahliye-sistemleri": IconDumanIsiTahliye,
  "konfor-iklimlendirme-sistemleri": IconKonforIklimlendirme,
  "hijyenik-filtrasyonlu-havalandirma": IconHijyenikHavalandirma,
  "endustriyel-hava-yonetimi": IconEndustriyelHava,
  "hayvancilik-tesisleri-icin-havalandirma-sistemleri": IconHayvancilik,
  "trafo-enerji-odalari-fanlari": IconTrafoEnerji,
  "sera-tarimsal-havalandirma-sistemleri": IconSeraTarimsal,
  "atex-patlama-koruma-cozumleri": IconAtexPatlama,
  "akilli-otomasyon-ve-kontrol-sistemleri": IconAkilliOtomasyon,
  "konut-tipi-havalandirma-sistemleri": IconKonutHavalandirma,
  "marin-offshore-havalandirma-sistemleri": IconMarinOffshore,
  "proje-bazli-ozel-imalatlar": IconOzelImalat,
  "cfd-muhendislik-danismanligi": IconCfdDanismanlik,
};
