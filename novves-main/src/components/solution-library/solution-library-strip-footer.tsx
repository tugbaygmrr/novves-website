import Image from "next/image";
import Link from "next/link";
import type { SolutionLibraryUi } from "@/lib/solution-library-ui";

export function SolutionLibraryStripFooter({
  locale,
  ui,
  className = "",
}: {
  locale: string;
  ui: SolutionLibraryUi;
  className?: string;
}) {
  return (
    <footer
      className={`mt-10 w-full border-t border-sand-300/80 bg-gradient-to-br from-[#131B2E] to-[#00386B] lg:mt-auto ${className}`.trim()}
    >
      <div className="flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <Link href={`/${locale}`} className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded bg-white p-1">
            <Image src="/images/novves-icon.svg" alt="" width={20} height={20} className="h-5 w-5" />
          </span>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-white">{ui.footerBrand}</span>
        </Link>
        <nav
          className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-200"
          aria-label={ui.footerBrand}
        >
          <Link
            href={`/${locale}/privacy`}
            className="transition-colors hover:text-primary"
          >
            {ui.footerPrivacy}
          </Link>
          <Link
            href={`/${locale}/kurumsal/sertifikalar`}
            className="transition-colors hover:text-primary"
          >
            {ui.footerStandards}
          </Link>
          <Link href={`/${locale}/iletisim`} className="transition-colors hover:text-primary">
            {ui.footerContact}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
