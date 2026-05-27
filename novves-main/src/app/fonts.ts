import { Instrument_Serif, Inter, Montserrat } from "next/font/google";

/** Google CDN yerine self-host; alt küme + swap ile LCP/CLS iyileşir */
export const fontInstrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-instrument-serif",
  display: "swap",
  adjustFontFallback: true,
});

/** Site geneli gövde fontu — body, nav, footer, tablolar */
export const fontInter = Inter({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: true,
});

/** Hero H1 / Bölüm Başlığı — Bold 700 + ExtraBold 800 */
export const fontMontserrat = Montserrat({
  weight: ["700", "800"],
  style: ["normal"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-montserrat",
  display: "swap",
  adjustFontFallback: true,
});

export const fontRootClassName = `${fontInstrumentSerif.variable} ${fontInter.variable} ${fontMontserrat.variable}`;
