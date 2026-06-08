"use client";

import type { AdminPageGroup } from "@/lib/admin/content-sections";
import { PAGE_GROUP_DESCRIPTIONS } from "@/lib/admin/page-group-meta";
import { SectionPreviewPanel } from "@/components/admin/simple/section-preview-panel";

export function PageGrid({
  group,
  onSelectSection,
}: {
  group: AdminPageGroup;
  onSelectSection: (sectionKey: string) => void;
}) {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-gray-900">{group.label}</h2>
      <p className="mb-8 text-[15px] text-gray-500">
        {PAGE_GROUP_DESCRIPTIONS[group.file] ?? "Düzenlemek istediğiniz bölümü seçin"}
      </p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {group.sections.map((section) => (
          <button
            key={section.key}
            type="button"
            onClick={() => onSelectSection(section.key)}
            className="group flex flex-col overflow-hidden rounded-2xl border-2 border-gray-100 bg-white text-left shadow-sm transition-all hover:border-orange-300 hover:shadow-md active:scale-[0.98]"
          >
            <div className="p-3 pb-0">
              <SectionPreviewPanel file={group.file} sectionKey={section.key} title={section.label} variant="card" />
            </div>
            <div className="flex flex-1 flex-col px-4 pb-4 pt-2">
              <h3 className="text-[16px] font-bold text-gray-900">{section.label}</h3>
              <span className="mt-auto pt-3 text-[12px] font-medium text-orange-500">
                Düzenle &rarr;
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
