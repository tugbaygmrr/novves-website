"use client";

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
              Sitede bu bölüm
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
