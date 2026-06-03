import Link from "next/link";

type NavItem = { icon: string; label: string };

type Props = {
  locale: string;
  title: string;
  subtitle: string;
  mainItems: NavItem[];
  patentIcon: string;
  patentLabel: string;
  /** Alt yardımcı öğeler (Ayarlar, Destek vb.) */
  utilItems: NavItem[];
  /** Aktif (seçili) ana öğenin index'i; aktif öğe yoksa null. */
  activeMainIndex?: number | null;
  /** Patentlerimiz öğesi aktif/seçili mi (patentlerimiz sayfasında). */
  patentActive?: boolean;
};

/**
 * Medya merkezi sol paneli — iframe'den ayrı, native React.
 * Sayfa scroll'una göre native `position: sticky` (tek scroll + sticky + footer korunur).
 */
export function MediaCenterSidebar({
  locale,
  title,
  subtitle,
  mainItems,
  patentIcon,
  patentLabel,
  utilItems,
  activeMainIndex = 0,
  patentActive = false,
}: Props) {
  const baseItem =
    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150";
  const passive = `${baseItem} text-secondary/75 hover:translate-x-0.5 hover:bg-white hover:text-secondary`;
  const active = `${baseItem} bg-white font-bold text-secondary shadow-sm ring-1 ring-ink/[0.06]`;

  return (
    <aside className="hidden min-h-full shrink-0 border-r border-sand-300/60 bg-sand-100 lg:block">
      <div className="sticky top-24 flex h-[calc(100dvh-6rem)] flex-col">
        <div className="shrink-0 px-5 py-5">
          <h2 className="text-lg font-extrabold uppercase tracking-wide text-dark">{title}</h2>
          <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-widest text-secondary/45">
            {subtitle}
          </p>
        </div>

        <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto px-3 pb-4 custom-scrollbar">
          {mainItems.map((item, i) => {
            const isActive = i === activeMainIndex;
            const cls = isActive ? active : passive;
            const iconEl = (
              <span className={`material-symbols-outlined text-[22px] ${isActive ? "text-primary" : ""}`}>{item.icon}</span>
            );
            // Şimdilik yalnızca ilk öğe (Logo & Kimlik) tıklanabilir → medya merkezi.
            if (i === 0) {
              return (
                <Link
                  key={item.label}
                  href={`/${locale}/kurumsal/medya-merkezi`}
                  className={cls}
                  aria-current={isActive ? "page" : undefined}
                >
                  {iconEl}
                  <span className="min-w-0 truncate">{item.label}</span>
                </Link>
              );
            }
            return (
              <div key={item.label} className={cls} aria-current={isActive ? "page" : undefined}>
                {iconEl}
                <span className="min-w-0 truncate">{item.label}</span>
              </div>
            );
          })}

          <Link
            href={`/${locale}/kurumsal/patentlerimiz`}
            className={`${patentActive ? active : passive} mt-1`}
            aria-current={patentActive ? "page" : undefined}
          >
            <span className={`material-symbols-outlined text-[22px] ${patentActive ? "text-primary" : ""}`}>{patentIcon}</span>
            <span className="min-w-0 truncate">{patentLabel}</span>
          </Link>
        </nav>

        {utilItems.length > 0 ? (
          <div className="shrink-0 space-y-0.5 border-t border-sand-300/60 px-3 py-3">
            {utilItems.map((item) => (
              <div key={item.label} className="flex items-center gap-3 px-3 py-2 text-sm text-secondary/55">
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span className="min-w-0 truncate">{item.label}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </aside>
  );
}
