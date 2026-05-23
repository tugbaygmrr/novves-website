// Gerçekçi HVAC damper SVG → bej canvas üzerine PNG export.
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "public", "images", "products", "categories", "hava-yonetimi-card-hero.png");

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 580" width="1600" height="580">
  <defs>
    <!-- Galvanize metal flange gradient'i -->
    <linearGradient id="frameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#e9ecef"/>
      <stop offset="40%" stop-color="#c4cad2"/>
      <stop offset="60%" stop-color="#b6bdc6"/>
      <stop offset="100%" stop-color="#8c939b"/>
    </linearGradient>
    <!-- İç kenar koyu çelik -->
    <linearGradient id="frameInner" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#5a626d"/>
      <stop offset="100%" stop-color="#3a4252"/>
    </linearGradient>
    <!-- Blade üst yüzü (ışık alan taraf) -->
    <linearGradient id="bladeTop" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#dde3eb"/>
      <stop offset="50%" stop-color="#a4adb8"/>
      <stop offset="100%" stop-color="#6c757f"/>
    </linearGradient>
    <!-- Blade alt yüzü (gölge) -->
    <linearGradient id="bladeBottom" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#7a828d"/>
      <stop offset="100%" stop-color="#3e4651"/>
    </linearGradient>
    <!-- Motor housing -->
    <linearGradient id="motorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ef5f17"/>
      <stop offset="100%" stop-color="#b94510"/>
    </linearGradient>
    <linearGradient id="motorTop" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ff8d4a"/>
      <stop offset="100%" stop-color="#ef5f17"/>
    </linearGradient>
    <radialGradient id="screwGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#9ba2ab"/>
      <stop offset="60%" stop-color="#5e6671"/>
      <stop offset="100%" stop-color="#2f343d"/>
    </radialGradient>
    <!-- Drop shadow filter -->
    <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="160%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="6"/>
      <feOffset dx="0" dy="8" result="offsetblur"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.35"/></feComponentTransfer>
      <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- Bej arkaplan -->
  <rect width="1600" height="580" fill="#f8f5ed"/>

  <!-- Hafif zemin gölgesi -->
  <ellipse cx="800" cy="500" rx="280" ry="20" fill="#000" opacity="0.12"/>

  <g transform="translate(800, 290)" filter="url(#dropShadow)">
    <!-- DIŞ ÇERÇEVE FLANGE (galvanize metal) -->
    <rect x="-260" y="-180" width="520" height="360" rx="6" fill="url(#frameGrad)" stroke="#4a5260" stroke-width="2"/>
    <!-- Üst highlight bandı -->
    <rect x="-258" y="-178" width="516" height="4" rx="2" fill="#ffffff" opacity="0.55"/>
    <!-- Alt gölge bandı -->
    <rect x="-258" y="174" width="516" height="4" rx="2" fill="#000" opacity="0.2"/>

    <!-- İç frame opening rim -->
    <rect x="-220" y="-150" width="440" height="300" fill="url(#frameInner)"/>
    <!-- Rim shadow gradient -->
    <rect x="-220" y="-150" width="440" height="6" fill="#000" opacity="0.5"/>
    <rect x="-220" y="-150" width="6" height="300" fill="#000" opacity="0.5"/>

    <!-- 8 köşe/kenar vida (Phillips) -->
    <g>
      <g transform="translate(-230,-152)">
        <circle r="8.5" fill="url(#screwGrad)" stroke="#2a3140" stroke-width="0.8"/>
        <path d="M-4 0 L4 0 M0 -4 L0 4" stroke="#1a1f28" stroke-width="1.2" stroke-linecap="round"/>
      </g>
      <g transform="translate(230,-152)">
        <circle r="8.5" fill="url(#screwGrad)" stroke="#2a3140" stroke-width="0.8"/>
        <path d="M-4 0 L4 0 M0 -4 L0 4" stroke="#1a1f28" stroke-width="1.2" stroke-linecap="round"/>
      </g>
      <g transform="translate(-230,152)">
        <circle r="8.5" fill="url(#screwGrad)" stroke="#2a3140" stroke-width="0.8"/>
        <path d="M-4 0 L4 0 M0 -4 L0 4" stroke="#1a1f28" stroke-width="1.2" stroke-linecap="round"/>
      </g>
      <g transform="translate(230,152)">
        <circle r="8.5" fill="url(#screwGrad)" stroke="#2a3140" stroke-width="0.8"/>
        <path d="M-4 0 L4 0 M0 -4 L0 4" stroke="#1a1f28" stroke-width="1.2" stroke-linecap="round"/>
      </g>
      <!-- Üst ve alt orta -->
      <g transform="translate(0,-152)">
        <circle r="7" fill="url(#screwGrad)" stroke="#2a3140" stroke-width="0.6"/>
        <path d="M-3.5 0 L3.5 0 M0 -3.5 L0 3.5" stroke="#1a1f28" stroke-width="1" stroke-linecap="round"/>
      </g>
      <g transform="translate(0,152)">
        <circle r="7" fill="url(#screwGrad)" stroke="#2a3140" stroke-width="0.6"/>
        <path d="M-3.5 0 L3.5 0 M0 -3.5 L0 3.5" stroke="#1a1f28" stroke-width="1" stroke-linecap="round"/>
      </g>
    </g>

    <!-- 5 BLADE — airfoil profile, hafif açılı (perspektif) -->
    <g>
      <!-- Her bir blade için kalın eğri profile -->
      ${[-110, -55, 0, 55, 110].map((y, i) => {
        const yt = y - 12;
        const yb = y + 12;
        return `
          <g>
            <!-- Üst yüzey (light) -->
            <path d="M -200 ${yt + 2} Q 0 ${yt - 6}, 200 ${yt + 2} Q 0 ${yt + 8}, -200 ${yt + 2} Z"
                  fill="url(#bladeTop)" stroke="#5a626d" stroke-width="0.8"/>
            <!-- Alt yüzey (shadow) -->
            <path d="M -200 ${yb - 2} Q 0 ${yb + 6}, 200 ${yb - 2} Q 0 ${yb - 8}, -200 ${yb - 2} Z"
                  fill="url(#bladeBottom)" stroke="#3a4252" stroke-width="0.8" opacity="0.85"/>
            <!-- İnce kenar çizgisi -->
            <line x1="-200" y1="${y}" x2="200" y2="${y}" stroke="#dde3eb" stroke-width="0.5" opacity="0.7"/>
            <!-- Pivot pini sol/sağ -->
            <circle cx="-200" cy="${y}" r="4" fill="#4a5260" stroke="#1a1f28" stroke-width="0.6"/>
            <circle cx="200" cy="${y}" r="4" fill="#4a5260" stroke="#1a1f28" stroke-width="0.6"/>
          </g>
        `;
      }).join("")}
    </g>

    <!-- Frame iç kenar highlight (üstte) -->
    <rect x="-220" y="-150" width="440" height="3" fill="#fff" opacity="0.2"/>

    <!-- AKTÜATÖR (sağ tarafta turuncu motor) -->
    <g transform="translate(260, 0)">
      <!-- Bağlantı mili -->
      <rect x="-22" y="-7" width="50" height="14" fill="url(#frameInner)" stroke="#1a1f28" stroke-width="0.6"/>
      <!-- Motor gövdesi (kare housing) -->
      <rect x="20" y="-50" width="100" height="100" rx="6" fill="url(#motorGrad)" stroke="#7a2f08" stroke-width="2"/>
      <!-- Motor üst yüz highlight -->
      <rect x="20" y="-50" width="100" height="12" rx="6" fill="url(#motorTop)"/>
      <!-- Motor logo dairesi -->
      <circle cx="70" cy="0" r="22" fill="#fff" opacity="0.85"/>
      <circle cx="70" cy="0" r="22" fill="none" stroke="#7a2f08" stroke-width="1.5"/>
      <text x="70" y="6" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" font-weight="900" fill="#ef5f17">N</text>
      <!-- Soğutma fin'leri -->
      <g stroke="#7a2f08" stroke-width="0.8" opacity="0.6">
        <line x1="32" y1="-40" x2="32" y2="-25"/>
        <line x1="38" y1="-40" x2="38" y2="-25"/>
        <line x1="44" y1="-40" x2="44" y2="-25"/>
        <line x1="98" y1="-40" x2="98" y2="-25"/>
        <line x1="104" y1="-40" x2="104" y2="-25"/>
        <line x1="110" y1="-40" x2="110" y2="-25"/>
        <line x1="32" y1="25" x2="32" y2="40"/>
        <line x1="38" y1="25" x2="38" y2="40"/>
        <line x1="44" y1="25" x2="44" y2="40"/>
        <line x1="98" y1="25" x2="98" y2="40"/>
        <line x1="104" y1="25" x2="104" y2="40"/>
        <line x1="110" y1="25" x2="110" y2="40"/>
      </g>
      <!-- Kablo çıkışı -->
      <rect x="60" y="50" width="20" height="14" fill="#2a3140"/>
      <path d="M 70 64 Q 78 80, 92 86" stroke="#1a1f28" stroke-width="3" fill="none" stroke-linecap="round"/>
    </g>
  </g>

  <!-- Sol üst — küçük ürün etiketi -->
  <g transform="translate(80, 70)">
    <rect x="0" y="0" width="140" height="34" rx="3" fill="#ef5f17"/>
    <text x="70" y="22" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#fff" letter-spacing="2.5">DAMPER</text>
  </g>
</svg>
`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(OUT);
console.log("Yazıldı:", OUT);
