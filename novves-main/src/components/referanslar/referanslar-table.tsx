"use client";

import Image from "next/image";
import type { Reference } from "@/data/references";
import {
  formatReferenceBuildingTypeLabel,
  resolveReferenceSectorLabel,
  type ReferanslarCategoryLabels,
} from "@/lib/referanslar-categories";
import { getReferenceCountryFlagSrc } from "@/lib/references/reference-country-flag";
import { resolveReferenceImageSrc } from "@/lib/references/resolve-reference-image";
import { resolveReferenceProductFamilyLabels } from "@/lib/references/reference-product-family";

export type ReferanslarTableDict = {
  image: string;
  sector: string;
  buildingType: string;
  projectName: string;
  productsUsed: string;
  productFamilies: string;
  country: string;
};

type Props = {
  references: Reference[];
  categoryLabels: ReferanslarCategoryLabels;
  dict: ReferanslarTableDict;
  onSelect: (ref: Reference) => void;
};

function ReferenceCountryFlag({ country, countryName }: { country: string; countryName: string }) {
  const src = getReferenceCountryFlagSrc(country);
  if (src) {
    return (
      <Image
        src={src}
        alt={countryName}
        title={countryName}
        width={28}
        height={20}
        unoptimized
        className="h-5 w-7 shrink-0 rounded-[3px] border border-black/[0.08] object-cover shadow-sm"
      />
    );
  }
  return (
    <span
      title={countryName}
      className="inline-flex h-5 min-w-[1.75rem] items-center justify-center rounded-[3px] bg-sand-200 px-1 text-[9px] font-bold uppercase text-hz-on-surface-variant"
    >
      {countryName.slice(0, 2)}
    </span>
  );
}

function ReferenceTableRow({
  ref_,
  categoryLabels,
  onSelect,
}: {
  ref_: Reference;
  categoryLabels: ReferanslarCategoryLabels;
  onSelect: (ref: Reference) => void;
}) {
  const sector = resolveReferenceSectorLabel(ref_.classKey, categoryLabels);
  const buildingType = formatReferenceBuildingTypeLabel(ref_.className);
  const families = resolveReferenceProductFamilyLabels(ref_);
  const productsText = ref_.productNames.join(", ");

  return (
    <tr
      onClick={() => onSelect(ref_)}
      className="cursor-pointer transition-colors hover:bg-sand-100/60"
    >
      <td className="whitespace-nowrap px-3 py-3 sm:px-4 sm:py-3.5">
        <div className="relative h-14 w-[4.5rem] overflow-hidden rounded-lg bg-sand-200 ring-1 ring-inset ring-ink/[0.06]">
          <Image
            src={resolveReferenceImageSrc(ref_.image)}
            alt={ref_.title}
            fill
            className="object-cover"
            sizes="72px"
          />
        </div>
      </td>
      <td className="min-w-[7rem] px-3 py-3 text-xs font-semibold leading-snug text-hz-on-surface sm:px-4 sm:py-3.5 sm:text-sm">
        <span className="line-clamp-3">{sector || "\u2014"}</span>
      </td>
      <td className="min-w-[6rem] px-3 py-3 text-xs font-semibold leading-snug text-hz-on-surface sm:px-4 sm:py-3.5 sm:text-sm">
        <span className="line-clamp-2">{buildingType || "\u2014"}</span>
      </td>
      <td className="min-w-[10rem] px-3 py-3 text-sm font-bold leading-snug text-hz-primary-container sm:px-4 sm:py-3.5">
        {ref_.title}
      </td>
      <td className="min-w-[10rem] max-w-[16rem] px-3 py-3 text-xs leading-relaxed text-hz-on-surface-variant sm:px-4 sm:py-3.5 sm:text-sm">
        <span className="line-clamp-3">{productsText || "\u2014"}</span>
      </td>
      <td className="min-w-[7rem] px-3 py-3 text-xs italic leading-relaxed text-hz-on-surface sm:px-4 sm:py-3.5 sm:text-sm">
        {families.length ? families.join(", ") : "\u2014"}
      </td>
      <td className="whitespace-nowrap px-3 py-3 sm:px-4 sm:py-3.5">
        <ReferenceCountryFlag country={ref_.country} countryName={ref_.countryName} />
      </td>
    </tr>
  );
}

function ReferenceMobileCard({
  ref_,
  categoryLabels,
  dict,
  onSelect,
}: {
  ref_: Reference;
  categoryLabels: ReferanslarCategoryLabels;
  dict: ReferanslarTableDict;
  onSelect: (ref: Reference) => void;
}) {
  const sector = resolveReferenceSectorLabel(ref_.classKey, categoryLabels);
  const buildingType = formatReferenceBuildingTypeLabel(ref_.className);
  const families = resolveReferenceProductFamilyLabels(ref_);
  const productsText = ref_.productNames.join(", ");

  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(ref_)}
        className="flex w-full gap-3 px-3 py-4 text-left transition-colors active:bg-sand-100 sm:gap-4 sm:px-4"
      >
        <div className="relative h-16 w-[4.5rem] shrink-0 overflow-hidden rounded-lg bg-sand-200 ring-1 ring-inset ring-ink/[0.06]">
          <Image
            src={resolveReferenceImageSrc(ref_.image)}
            alt={ref_.title}
            fill
            className="object-cover"
            sizes="72px"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-bold leading-snug text-hz-primary-container">{ref_.title}</p>
            <ReferenceCountryFlag country={ref_.country} countryName={ref_.countryName} />
          </div>
          <p className="mt-1 text-[11px] font-semibold text-hz-on-surface">
            {sector}
            {buildingType ? ` \u00b7 ${buildingType}` : ""}
          </p>
          {productsText ? (
            <p className="mt-2 text-xs text-hz-on-surface-variant">
              <span className="font-semibold text-hz-on-surface">{dict.productsUsed}: </span>
              {productsText}
            </p>
          ) : null}
          {families.length ? (
            <p className="mt-1 text-xs italic text-hz-on-surface">{families.join(", ")}</p>
          ) : null}
        </div>
      </button>
    </li>
  );
}

export function ReferanslarTable({ references, categoryLabels, dict, onSelect }: Props) {
  return (
    <div className="overflow-visible rounded-xl bg-white shadow-[0_8px_32px_-12px_rgba(25,28,30,0.06)] sm:overflow-hidden sm:rounded-2xl">
      <div className="hidden md:block">
        <div className="relative max-h-[min(70vh,40rem)] overflow-auto">
          <table className="w-full min-w-[56rem] border-collapse text-left">
            <thead className="sticky top-0 z-10 bg-sand-100 shadow-[0_1px_0_0_#F2F4F6]">
              <tr>
                <th className="whitespace-nowrap px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-hz-secondary sm:px-4">
                  {dict.image}
                </th>
                <th className="whitespace-nowrap px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-hz-secondary sm:px-4">
                  {dict.sector}
                </th>
                <th className="whitespace-nowrap px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-hz-secondary sm:px-4">
                  {dict.buildingType}
                </th>
                <th className="whitespace-nowrap px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-hz-secondary sm:px-4">
                  {dict.projectName}
                </th>
                <th className="whitespace-nowrap px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-hz-secondary sm:px-4">
                  {dict.productsUsed}
                </th>
                <th className="whitespace-nowrap px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-hz-secondary sm:px-4">
                  {dict.productFamilies}
                </th>
                <th className="whitespace-nowrap px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-hz-secondary sm:px-4">
                  {dict.country}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-200">
              {references.map((ref) => (
                <ReferenceTableRow
                  key={ref.id}
                  ref_={ref}
                  categoryLabels={categoryLabels}
                  onSelect={onSelect}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ul className="divide-y divide-sand-200 md:hidden">
        {references.map((ref) => (
          <ReferenceMobileCard
            key={ref.id}
            ref_={ref}
            categoryLabels={categoryLabels}
            dict={dict}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </div>
  );
}
