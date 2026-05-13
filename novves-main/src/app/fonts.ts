import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";

/** Google CDN yerine self-host; alt küme + swap ile LCP/CLS iyileşir */
export const fontInter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: true,
});

export const fontInstrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-instrument-serif",
  display: "swap",
  adjustFontFallback: true,
});

export const fontJetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  adjustFontFallback: true,
});

export const fontRootClassName = [
  fontInter.variable,
  fontInstrumentSerif.variable,
  fontJetbrainsMono.variable,
].join(" ");
