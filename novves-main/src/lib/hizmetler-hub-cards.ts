/** Genel bakış — Stitch tarzı hizmet kartları (görsel + özet) */
export type HizmetlerHubCardData = {
  slug: string;
  excerpt: string;
  category: string;
  badge?: string;
  imageSrc?: string;
  /** Görsel yoksa büyük ikon */
  icon?: string;
  iconVariant?: "navy" | "sand";
};

export type HizmetlerHubCardCopy = {
  slug: string;
  excerpt: string;
  category: string;
  badge?: string;
};

/** Görsel URL'leri locale'den bağımsız */
const HIZMETLER_HUB_CARD_ASSETS: Record<
  string,
  Pick<HizmetlerHubCardData, "imageSrc" | "icon" | "iconVariant">
> = {
  "yerinde-kesif": {
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAdk_YtFP-CGxwZSeNW5Go-mEcB-R91NQ62hvYRFn3kP0HC2labPBROzwKKTpxqfYok2fSTESW5msRiaLDm85uq_9NKpSFvbzh5-qjc9Da7_nJ05xg6ayPg0sV19aNvsnoMYDO7xyCp6adNwFupHsnwBuYl9-fPmugA06vH7qzUFtDtD8_IrmD1oHTUJ5a65jDLQluT_CWnJ4eOW2_R90z6g2G9tAUdfzri7ENaEZVk93euYlLmR1EzYACDMikxjduri48APdqtzMI",
  },
  "duman-kontrol-sistemi-tasarimi": {
    imageSrc: "/images/hizmetler/duman-kontrol-tasarimi.png",
  },
  "cfd-analizi": {
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA05xDt1g7vlcltpdowq7kLH1a-8M4I1Do_C7pnKiX9jUpgqhlk66ZbT0wv5Nk4uCgHZR7Pqb8VrF0Q8jwhPvOyDwRNclpKSEa6GKpRJheXpBFuFUV5wsPxZdnlH12W4jq_HzzB7QamSTMWC65NjsWGqHdZziifGlq6JJr9_4YLSg2cKW3hAMKQ3uYxIybPHyiWsPJrg-wF6-ipJVCbwYyVKUtyfl81B8GX8DRz37Mch9WRaomO5W1VCN2HCoM80gVE03903RR2WMw",
  },
  "fan-secimi-ve-teknik-projelendirme": {
    imageSrc: "/images/hizmetler/fan-secimi-teknik-projelendirme.png",
  },
  "devreye-alma": {
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuASo_JruCyxDVBwlCmBSQZOFpltmGjXdUxsE3roKreES2Gu2pq9zLqHMjemLJgfWv0De6KIbjxhT4oIZaLESKuWFQLhGEp8ML5gjmpBBZvYzHre4f_lmmkw90aiDCQdjUugZKThhIwssahTOGswbLWcBSTzTrnmg05kWy8eJf79tYs2afdF8tDdUn7XmqnqV94ZL70snn4wf11cok1MFL7SZiIfqChKtJjFyLjHMiDez3pjiCgq-s0bzPrSm5Vagv2Hho13FekYu9s",
  },
  "teknik-servis": {
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDxMeEHI938GIPBawznnHJ6x-kYcgHaWpo7_y-tA45eMLw1dyeWfXXQBpCwEMANg3xFir1BVv2FvVPmirhn-b4X9ul6YnVOKv9MB3UpQFZ0q2SP9FJy10ZgIbYjHLJaI3_lh28-9sUCR6Hr_mfEskGE8ZYUVySQcLt_x1PQzzeF3GGizQ3xAhnrzwB9H5OHa44K6JxUM4zTsxQmwNZtsJeHi-uacZe64iuYrnFAP9LU3XBpJ4wbk0KXrbGtNtq3-uVCmu_EqwmJnLE",
  },
  "bakim-ve-performans-kontrolu": {
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCJ5JMO3HOjNDZbtPhy07ir84gR5S9heH0Bj7ujN3CsCTFsR1u_bMp4TPJ52F0pYrDEPuqDsLsLK-t5xxRKgaMRbrWEsK62FLYa9zGEiLJFgzkQ-sHQA-fxyhLnNx8FXJgJ8kIsQ5aiAZxhqXIqFbaQCX_MIv6r0FQPI2OgRrP0N_gpWt7FC1CtuDUMoyt_z_fFZkKMPPMPVK0BqSwk3FlDMIUcB_9aQtiKgMOFiRULZonSaNHj_VFoSbZoekVxTn_L416XlRrPIPs",
  },
  "egitim-ve-teknik-danismanlik": {
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC3xcOoqyeafZ20LqVAF2QXkPSw0Xj5WIi6QJ_zDjZ2WgptUvNqbgsiyA_pyORA2OP7SeQ8s1yK61K1gEuWa7CCR9K3i210vBxit-ZTVS7yKGTa4t56Mpo6nGcAzHpnfjuL5fO0VH857GDmDaHtedp7AJh-VVntJoZi8sM0te2FKESj0k2Nf68qAoRmWgz2HwIXSzo5O6Dnp0xbFABrvjWEmAXLxPe6j2V4yyMyxlrq_uzrv2bJsQqYdGrZK9La9FRaZou7ZTbCR40",
  },
};

/** TR yedek — sözlükte hubCards yoksa */
export const HIZMETLER_HUB_CARDS_FALLBACK: HizmetlerHubCardCopy[] = [
  {
    slug: "yerinde-kesif",
    excerpt:
      "Uzman mühendislerimiz sahanıza gelerek teknik gereksinimleri analiz eder ve en optimize sistem yerleşimi için veriler toplar.",
    category: "Saha Hizmeti",
  },
  {
    slug: "duman-kontrol-sistemi-tasarimi",
    excerpt:
      "Jet fan ve duman tahliye sistemlerinizi yönetmeliklere uygun, CFD destekli mühendislik yaklaşımıyla projelendiriyoruz.",
    category: "Tasarım",
    badge: "Mühendislik",
  },
  {
    slug: "cfd-analizi",
    excerpt:
      "Sanal ortamda akışkanlar mekaniği simülasyonları ile duman tahliye ve havalandırma sistemlerinizin performansını önceden doğrulayın.",
    category: "Mühendislik",
    badge: "Kritik Süreç",
  },
  {
    slug: "fan-secimi-ve-teknik-projelendirme",
    excerpt:
      "Debi, basınç ve ortam koşullarına göre optimum fan seçimi; kanal, susturucu ve aksesuarlarla bütünleşik teknik projelendirme.",
    category: "Projelendirme",
  },
  {
    slug: "devreye-alma",
    excerpt:
      "Kurulum sonrası sistemlerin standartlara uygunluk testlerini yaparak güvenli ve verimli bir başlangıç sağlıyoruz.",
    category: "Uygulama",
  },
  {
    slug: "teknik-servis",
    excerpt:
      "7/24 kesintisiz teknik destek ve acil müdahale ekiplerimizle havalandırma sistemlerinizin sürekliliğini garanti altına alıyoruz.",
    category: "Operasyon",
  },
  {
    slug: "bakim-ve-performans-kontrolu",
    excerpt:
      "Periyodik bakım planları ile enerji verimliliğini artırın ve sistemlerinizin ömrünü uzatarak operasyonel maliyetleri düşürün.",
    category: "Yaşam Döngüsü",
  },
  {
    slug: "egitim-ve-teknik-danismanlik",
    excerpt:
      "Operasyon ekiplerinize özel teknik eğitimler ve duman kontrol mevzuatları üzerine danışmanlık hizmetleri sunuyoruz.",
    category: "Bilgi Birikimi",
  },
];

export function buildHizmetlerHubCards(copy: HizmetlerHubCardCopy[]): HizmetlerHubCardData[] {
  return copy.map((card) => ({
    ...card,
    ...HIZMETLER_HUB_CARD_ASSETS[card.slug],
  }));
}
