"use client";

type Props = {
  printLabel: string;
  downloadLabel: string;
};

export function LegalCenterPrintActions({ printLabel, downloadLabel }: Props) {
  return (
    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-3">
      <button
        type="button"
        onClick={() => window.print()}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-ink/15 bg-white px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-sand-100 sm:w-auto sm:py-2 print:hidden"
      >
        <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <path d="M6 9V2h12v7M6 18H4v-5h16v5h-2M6 14h12v8H6v-8z" />
        </svg>
        {printLabel}
      </button>
      <button
        type="button"
        onClick={() => window.print()}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#00386B] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#004a8f] sm:w-auto sm:py-2 print:hidden"
      >
        <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <path d="M12 3v12m0 0l4-4m-4 4l-4-4M4 19h16" />
        </svg>
        {downloadLabel}
      </button>
    </div>
  );
}
