import fs from "node:fs";
import path from "node:path";

const flagsDir = path.join(import.meta.dirname, "../public/images/flags");

/** Simplified 20x14 flag SVGs for reference countries */
const FLAGS = {
  ae: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14" width="20" height="14"><rect width="20" height="4.67" fill="#00732F"/><rect y="4.67" width="20" height="4.66" fill="#FFF"/><rect y="9.33" width="20" height="4.67" fill="#000"/><rect width="5" height="14" fill="#FF0000"/></svg>`,
  bg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14" width="20" height="14"><rect width="20" height="4.67" fill="#FFF"/><rect y="4.67" width="20" height="4.66" fill="#00966E"/><rect y="9.33" width="20" height="4.67" fill="#D62612"/></svg>`,
  cg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14" width="20" height="14"><rect width="20" height="14" fill="#009543"/><rect y="7" width="20" height="7" fill="#FBDE4A"/><rect y="10.5" width="20" height="3.5" fill="#DC241F"/></svg>`,
  dz: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14" width="20" height="14"><rect width="10" height="14" fill="#006233"/><rect x="10" width="10" height="14" fill="#FFF"/><circle cx="8.5" cy="7" r="3" fill="#D21034"/><circle cx="9.5" cy="7" r="3" fill="#006233"/></svg>`,
  ge: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14" width="20" height="14"><rect width="20" height="14" fill="#FFF"/><rect x="9" width="2" height="14" fill="#FF0000"/><rect y="6" width="20" height="2" fill="#FF0000"/><rect x="3" y="2" width="1.2" height="3" fill="#FF0000"/><rect x="15.8" y="2" width="1.2" height="3" fill="#FF0000"/><rect x="3" y="9" width="1.2" height="3" fill="#FF0000"/><rect x="15.8" y="9" width="1.2" height="3" fill="#FF0000"/></svg>`,
  gh: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14" width="20" height="14"><rect width="20" height="4.67" fill="#CE1126"/><rect y="4.67" width="20" height="4.66" fill="#FCD116"/><rect y="9.33" width="20" height="4.67" fill="#006B3F"/><polygon points="10,5.5 10.8,7.8 13.2,7.8 11.2,9.2 12,11.5 10,10 8,11.5 8.8,9.2 6.8,7.8 9.2,7.8" fill="#000"/></svg>`,
  gi: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14" width="20" height="14"><rect width="20" height="14" fill="#DA020E"/><rect width="10" height="7" fill="#FFF"/><rect y="7" width="10" height="7" fill="#DA020E"/><rect x="10" y="3.5" width="10" height="7" fill="#DA020E"/></svg>`,
  gm: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14" width="20" height="14"><rect width="20" height="4.67" fill="#CE1126"/><rect y="4.67" width="20" height="4.66" fill="#0C1C8C"/><rect y="9.33" width="20" height="4.67" fill="#3A7728"/></svg>`,
  iq: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14" width="20" height="14"><rect width="20" height="4.67" fill="#CE1126"/><rect y="4.67" width="20" height="4.66" fill="#FFF"/><rect y="9.33" width="20" height="4.67" fill="#000"/></svg>`,
  kw: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14" width="20" height="14"><rect width="20" height="4.67" fill="#007A3D"/><rect y="4.67" width="20" height="4.66" fill="#FFF"/><rect y="9.33" width="20" height="4.67" fill="#CE1126"/><rect width="5" height="14" fill="#000"/></svg>`,
  lv: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14" width="20" height="14"><rect width="20" height="2.8" fill="#9E3039"/><rect y="2.8" width="20" height="8.4" fill="#FFF"/><rect y="11.2" width="20" height="2.8" fill="#9E3039"/></svg>`,
  ly: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14" width="20" height="14"><rect width="20" height="4.67" fill="#E70013"/><rect y="4.67" width="20" height="4.66" fill="#000"/><rect y="9.33" width="20" height="4.67" fill="#239E46"/><circle cx="10" cy="7" r="2.2" fill="#FFF"/></svg>`,
  ma: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14" width="20" height="14"><rect width="20" height="14" fill="#C1272D"/><polygon points="10,3.5 11.2,6.8 14.7,6.8 11.8,8.9 13,12.2 10,10.1 7,12.2 8.2,8.9 5.3,6.8 8.8,6.8" fill="#006233"/></svg>`,
  mt: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14" width="20" height="14"><rect width="10" height="14" fill="#FFF"/><rect x="10" width="10" height="14" fill="#CF142B"/></svg>`,
  ne: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14" width="20" height="14"><rect width="7" height="14" fill="#0DB02B"/><rect x="7" width="6" height="14" fill="#FFF"/><rect x="13" width="7" height="14" fill="#E05206"/><circle cx="7" cy="7" r="2" fill="#E05206"/></svg>`,
  om: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14" width="20" height="14"><rect width="20" height="14" fill="#FFF"/><rect width="20" height="4.67" fill="#DB161B"/><rect y="9.33" width="20" height="4.67" fill="#008000"/><rect width="5" height="14" fill="#DB161B"/></svg>`,
  qa: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14" width="20" height="14"><rect width="20" height="14" fill="#8D1B3D"/><path d="M0 0 L5 0 L4 1.4 L5 2.8 L4 4.2 L5 5.6 L4 7 L5 8.4 L4 9.8 L5 11.2 L4 12.6 L5 14 L0 14 Z" fill="#FFF"/></svg>`,
  se: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14" width="20" height="14"><rect width="20" height="14" fill="#006AA7"/><rect x="5" width="2.5" height="14" fill="#FECC00"/><rect y="5.5" width="20" height="3" fill="#FECC00"/></svg>`,
  td: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14" width="20" height="14"><rect width="20" height="7" fill="#002664"/><rect y="7" width="20" height="7" fill="#FECB00"/><rect width="7" height="14" fill="#C60C30"/></svg>`,
  tm: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14" width="20" height="14"><rect width="20" height="14" fill="#00843D"/><rect y="2" width="20" height="1.2" fill="#E30A17"/><rect y="4.5" width="20" height="1.2" fill="#E30A17"/><rect y="7" width="20" height="1.2" fill="#E30A17"/><rect y="9.5" width="20" height="1.2" fill="#E30A17"/><rect y="12" width="20" height="1.2" fill="#E30A17"/><circle cx="5" cy="7" r="2" fill="#FFF"/><circle cx="5.8" cy="7" r="1.6" fill="#00843D"/></svg>`,
  ua: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14" width="20" height="14"><rect width="20" height="7" fill="#005BBB"/><rect y="7" width="20" height="7" fill="#FFD500"/></svg>`,
  uz: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14" width="20" height="14"><rect width="20" height="4.67" fill="#1EB53A"/><rect y="4.67" width="20" height="4.66" fill="#FFF"/><rect y="9.33" width="20" height="4.67" fill="#0099B5"/><rect width="20" height="1.2" fill="#CE1126"/><rect y="2.4" width="20" height="1.2" fill="#CE1126"/></svg>`,
};

for (const [code, svg] of Object.entries(FLAGS)) {
  fs.writeFileSync(path.join(flagsDir, `${code}.svg`), `${svg}\n`, "utf8");
  console.log("wrote", code);
}

console.log("done");
