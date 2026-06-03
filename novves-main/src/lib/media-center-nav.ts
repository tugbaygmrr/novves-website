import "server-only";

export type MediaNavItem = { icon: string; label: string };
export type MediaSidebarData = {
  title: string;
  subtitle: string;
  mainItems: MediaNavItem[];
  patentIcon: string;
  patentLabel: string;
  utilItems: MediaNavItem[];
};

function stripTags(s: string): string {
  return s.replace(/<[^>]+>/g, " ");
}
function decode(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}
function clean(s: string): string {
  return decode(stripTags(s)).replace(/\s+/g, " ").trim();
}

/**
 * Gömülü (zaten yerelleştirilmiş) medya merkezi HTML'inin <aside> sidebar'ından
 * native panel için menü verisini çıkarır. Çeviri tekrarı olmaz — HTML'in kendi dilini kullanır.
 */
export function extractMediaSidebar(htmlStr: string): MediaSidebarData | null {
  const m = htmlStr.match(/<aside\b[\s\S]*?<\/aside>/);
  if (!m) return null;
  const aside = m[0];

  // Başlık/alt başlık: <nav> öncesi header bölgesindeki metin düğümleri (marka "NOVVES" atlanır).
  const navIdx = aside.indexOf("<nav");
  const header = navIdx > 0 ? aside.slice(0, navIdx) : aside.slice(0, 600);
  const headerTexts = header
    .split(/<[^>]+>/)
    .map((t) => decode(t).replace(/\s+/g, " ").trim())
    .filter((t) => t.length > 1 && !/^NOVVES$/i.test(t));
  const title = headerTexts[0] ?? "Medya Merkezi";
  const subtitle = headerTexts[1] ?? "";

  // Nav linkleri: ikon (material symbol) + etiket + patent bayrağı.
  const items: { icon: string; label: string; isPatent: boolean }[] = [];
  const aRe = /<a\b([^>]*)>([\s\S]*?)<\/a>/g;
  let a: RegExpExecArray | null;
  while ((a = aRe.exec(aside))) {
    const attrs = a[1];
    const inner = a[2];
    const iconM = inner.match(/material-symbols[^>]*>([^<]+)</);
    const icon = iconM ? iconM[1].trim() : "";
    let label = clean(inner);
    if (icon && label.startsWith(icon)) label = label.slice(icon.length).trim();
    if (!label) continue;
    const isPatent = /PatentLink/.test(attrs) || /patent/i.test(attrs);
    items.push({ icon, label, isPatent });
  }

  const patentIdx = items.findIndex((it) => it.isPatent);
  const patent = patentIdx >= 0 ? items[patentIdx] : null;
  const before = patentIdx >= 0 ? items.slice(0, patentIdx) : items;
  const after = patentIdx >= 0 ? items.slice(patentIdx + 1) : [];

  return {
    title,
    subtitle,
    mainItems: before.map(({ icon, label }) => ({ icon, label })),
    patentIcon: patent?.icon ?? "lightbulb",
    patentLabel: patent?.label ?? "Patentlerimiz",
    utilItems: after.map(({ icon, label }) => ({ icon, label })),
  };
}
