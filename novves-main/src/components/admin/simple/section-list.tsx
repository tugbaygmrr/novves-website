"use client";

import type { AdminPageGroup } from "@/lib/admin/content-sections";

export function SectionList({
  group,
  onSelect,
  onBack,
}: {
  group: AdminPageGroup;
  onSelect: (sectionKey: string) => void;
  onBack: () => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-6 flex min-h-[44px] items-center gap-2 text-[14px] font-semibold text-gray-500 hover:text-orange-600"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Geri
      </button>
      <h2 className="mb-2 text-2xl font-bold text-gray-900">{group.label}</h2>
      <p className="mb-8 text-[15px] text-gray-500">Düzenlemek istediğiniz bölümü seçin</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {group.sections.map((section) => (
          <button
            key={section.key}
            type="button"
            onClick={() => onSelect(section.key)}
            className="flex min-h-[56px] items-center justify-between rounded-2xl border-2 border-gray-100 bg-white px-5 py-4 text-left transition-all hover:border-orange-300 hover:bg-orange-50/30 active:scale-[0.99]"
          >
            <span className="text-[16px] font-semibold text-gray-800">{section.label}</span>
            <svg className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
