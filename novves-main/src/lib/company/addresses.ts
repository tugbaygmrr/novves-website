/** Canonical NOVVES locations for marketing/contact NAP site-wide. */

export const NOVVES_HEAD_OFFICE_LINES = [
  "19 Mayis Mah. Sumer Sok.",
  "Zitas Plaza C2 Blok No:7",
  "Kadikoy / Istanbul / Turkiye",
] as const;

export const NOVVES_FACTORY_LINES = [
  "Yalova Organize Sanayi Bolgesi",
  "2. Cadde No:12",
  "Ciftlikkoy / Yalova / Turkiye",
] as const;

export const NOVVES_HEAD_OFFICE_DISPLAY_LINES = [
  "19 May\u0131s Mah. S\u00fcmer Sok.",
  "Zita\u015f Plaza C2 Blok No:7",
  "Kad\u0131k\u00f6y / \u0130stanbul / T\u00fcrkiye",
] as const;

export const NOVVES_FACTORY_DISPLAY_LINES = [
  "Yalova Organize Sanayi B\u00f6lgesi",
  "2. Cadde No:12",
  "\u00c7iftlikk\u00f6y / Yalova / T\u00fcrkiye",
] as const;

export const NOVVES_HEAD_OFFICE_ADDRESS = NOVVES_HEAD_OFFICE_DISPLAY_LINES.join("\n");
export const NOVVES_FACTORY_ADDRESS = NOVVES_FACTORY_DISPLAY_LINES.join("\n");

/** Registered legal entity address for tax and KVKK documents. */
export const NOVVES_LEGAL_REGISTERED_DISPLAY_LINES = [
  "Ta\u015fk\u00f6pr\u00fc Merkez Mah. \u00c7aydere Sok.",
  "No:9/1 \u0130\u00e7 Kap\u0131 No:2",
  "\u00c7iftlikk\u00f6y / YALOVA",
] as const;

export const NOVVES_LEGAL_REGISTERED_ADDRESS =
  NOVVES_LEGAL_REGISTERED_DISPLAY_LINES.join("\n");

export const NOVVES_HEAD_OFFICE_POSTAL = {
  streetAddress: "19 Mayis Mh. Sumer Sk. Zitas Plaza C2 Blok No:7",
  addressLocality: "Kadikoy",
  addressRegion: "Istanbul",
  postalCode: "34736",
  addressCountry: "TR",
} as const;

export const NOVVES_PRIMARY_LINKEDIN = "https://www.linkedin.com/company/novvesturkiye";
