import type { IletisimLocation } from "./copy";

export const ILETISIM_LOCATION_META: Record<
  IletisimLocation["id"],
  Pick<IletisimLocation, "mapsHref" | "icon">
> = {
  hq: {
    mapsHref:
      "https://www.google.com/maps/place/NOVVES+ELEKTR%C4%B0K+MOTOR+ANON%C4%B0M+%C5%9E%C4%B0RKET%C4%B0/@40.98007,29.0903326,17z",
    icon: "map",
  },
  factory: {
    mapsHref:
      "https://www.google.com/maps/search/?api=1&query=Yalova+OSB+2.+Cadde+No+12+NOVVES",
    icon: "factory",
  },
};
