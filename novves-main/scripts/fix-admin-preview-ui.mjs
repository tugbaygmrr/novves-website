#!/usr/bin/env node
/** Restore page-grid + section-preview-panel with valid UTF-8 (Windows-safe). */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function write(rel, content) {
  const file = path.join(ROOT, rel);
  fs.writeFileSync(file, content, "utf8");
  new TextDecoder("utf-8", { fatal: true }).decode(fs.readFileSync(file));
  console.log("OK", rel);
}

write(
  "src/components/admin/simple/section-preview-panel.tsx",
  `"use client";

import Image from "next/image";
import { getSectionPreview } from "@/lib/admin/section-preview-meta";

export function SectionPreviewPanel({
  file,
  sectionKey,
  title,
  variant = "card",
}: {
  file: string;
  sectionKey: string;
  title: string;
  variant?: "card" | "banner";
}) {
  const preview = getSectionPreview(file, sectionKey);
  const isSvg = preview.image.endsWith(".svg");

  if (variant === "banner") {
    return (
      <div className="mb-6 overflow-hidden rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50/80 to-white">
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-5">
          <div className="relative mx-auto aspect-[16/10] w-full max-w-[220px] shrink-0 overflow-hidden rounded-xl border border-white/80 bg-white shadow-md sm:mx-0">
            {isSvg ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview.image} alt="" className="h-full w-full object-cover object-top" />
            ) : (
              <Image src={preview.image} alt="" fill className="object-cover object-top" sizes="220px" />
            )}
          </div>
          <div className="min-w-0 flex-1 text-center sm:text-left">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-500">
              Sitede bu b\u00f6l\u00fcm
            </p>
            <h3 className="mt-1 text-[17px] font-bold text-gray-900">{title}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-gray-600">{preview.hint}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mb-3 aspect-[16/10] w-full overflow-hidden rounded-xl border border-gray-100 bg-gray-100">
      {isSvg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preview.image} alt="" className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]" />
      ) : (
        <Image
          src={preview.image}
          alt=""
          fill
          className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent px-3 pb-2.5 pt-8">
        <p className="line-clamp-2 text-[11px] font-medium leading-snug text-white/95">{preview.hint}</p>
      </div>
    </div>
  );
}
`,
);

write(
  "src/components/admin/simple/page-grid.tsx",
  `"use client";

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
        {PAGE_GROUP_DESCRIPTIONS[group.file] ?? "D\u00fczenlemek istedi\u011finiz b\u00f6l\u00fcm\u00fc se\u00e7in"}
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
                D\u00fczenle &rarr;
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
`,
);

console.log("admin preview UI UTF-8 restored");
