"use client";

export function SaveBar({
  saving,
  dirty,
  previewUrl,
  onSave,
  onConfirmSave,
}: {
  saving: boolean;
  dirty: boolean;
  previewUrl?: string;
  onSave: () => void;
  onConfirmSave?: boolean;
}) {
  function handleClick() {
    if (onConfirmSave && dirty) {
      if (!window.confirm("Değişiklikleri kaydetmek istediğinize emin misiniz?")) return;
    }
    onSave();
  }

  return (
    <div className="sticky bottom-0 z-10 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 bg-white/95 px-6 py-5 backdrop-blur-md">
      <div className="flex items-center gap-4">
        {previewUrl && (
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-5 py-3 text-[15px] font-semibold text-gray-700 transition-colors hover:border-orange-300 hover:text-orange-600"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            Siteyi Gör
          </a>
        )}
        {dirty && (
          <span className="text-[13px] font-medium text-amber-600">Kaydedilmemiş değişiklikler var</span>
        )}
      </div>
      <button
        type="button"
        onClick={handleClick}
        disabled={saving}
        className="inline-flex min-h-[52px] min-w-[160px] items-center justify-center gap-2 rounded-2xl bg-orange-500 px-8 py-3.5 text-[16px] font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-orange-600 active:scale-[0.98] disabled:opacity-50"
      >
        {saving ? (
          <>
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Kaydediliyor...
          </>
        ) : (
          <>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Kaydet
          </>
        )}
      </button>
    </div>
  );
}
