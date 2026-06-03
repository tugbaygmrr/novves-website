/** İletişim lokasyonları — Google Maps embed (yol haritası) */
export type IletisimLocationId = "hq" | "factory" | "service";

export type IletisimLocationData = {
  id: IletisimLocationId;
  googleQuery: string;
  lat: number;
  lng: number;
  mapsEmbedSrc: string;
  imagePath: string;
};

export const ILETISIM_LOCATIONS: IletisimLocationData[] = [
  {
    id: "hq",
    googleQuery: "NOVVES Elektrik Motor Kadıköy İstanbul",
    lat: 40.9800701,
    lng: 29.0952035,
    mapsEmbedSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.5!2d29.0952035!3d40.9800701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac75e28bb963d%3A0x7d993b6e02755dad!2sNOVVES%20Elektrik%20Motor!5e0!3m2!1str!2str",
    imagePath: "/images/iletisim/locations/istanbul-ofis.jpg",
  },
  {
    id: "factory",
    googleQuery: "NOVVES Elektrik Motor Çiftlikköy Yalova",
    lat: 40.6808946,
    lng: 29.4048049,
    mapsEmbedSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3015.2!2d29.4048049!3d40.6808946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cae34dfa345cc7%3A0x688866be4ac613ae!2sNOVVES%20Elektrik%20Motor!5e0!3m2!1str!2str",
    imagePath: "/images/iletisim/locations/yalova-fabrika.jpg",
  },
  {
    id: "service",
    googleQuery: "Dudullu Organize Sanayi Bölgesi Ümraniye İstanbul",
    lat: 41.0034,
    lng: 29.1598,
    mapsEmbedSrc:
      "https://maps.google.com/maps?q=Dudullu+Organize+Sanayi+B%C3%B6lgesi,+Umraniye,+Istanbul&hl=tr&z=14&output=embed",
    imagePath: "/images/iletisim/locations/servis-merkezi.jpg",
  },
];

export function getIletisimLocationData(id: IletisimLocationId): IletisimLocationData | undefined {
  return ILETISIM_LOCATIONS.find((l) => l.id === id);
}
