import { Instrument_Serif } from "next/font/google";

/** Google CDN yerine self-host; alt küme + swap ile LCP/CLS iyileşir */
export const fontInstrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-instrument-serif",
  display: "swap",
  adjustFontFallback: true,
});

export const fontRootClassName = fontInstrumentSerif.variable;
