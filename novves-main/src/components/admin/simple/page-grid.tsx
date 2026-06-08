"use client";

import type { AdminPageGroup } from "@/lib/admin/content-sections";
import { PAGE_GROUP_DESCRIPTIONS } from "@/lib/admin/page-group-meta";

export function PageGrid({
  groups,
  onSelect,
}: {
  groups: AdminPageGroup[];
  onSelect: (file: string) => void;
}) {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-gray-900">Ne degistirmek istiyorsunuz?</h2>
      <p className="mb-8 text-[15px] text-gray-500">Asagidaki kartlardan birini secin</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <button
            key={group.file}
            type="button"
            onClick={() => onSelect(group.file)}
            className="group flex min-h-[140px] flex-col rounded-2xl border-2 border-gray-100 bg-white p-6 text-left shadow-sm transition-all hover:border-orange-300 hover:shadow-md active:scale-[0.98]"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500 transition-colors group-hover:bg-orange-100">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d={group.icon} />
              </svg>
            </div>
            <h3 className="text-[17px] font-bold text-gray-900">{group.label}</h3>
            <p className="mt-1 flex-1 text-[13px] leading-snug text-gray-500">
              {PAGE_GROUP_DESCRIPTIONS[group.file] ?? "Bu sayfadaki metinleri duzenleyin"}
            </p>
            <span className="mt-3 text-[12px] font-medium text-orange-500">
              {group.sections.length} bolum &rarr;
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
