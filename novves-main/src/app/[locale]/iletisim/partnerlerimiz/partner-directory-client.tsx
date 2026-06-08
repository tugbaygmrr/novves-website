"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { PARTNER_CATEGORIES } from "./partner-directory-types";
import type { PartnerListCopy, PartnerRecord } from "./partner-directory-types";

const EMPTY = "-";
const PARTNER_LOGO_BOX =
  "relative flex h-11 w-[5.5rem] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-ink/[0.06] p-1.5";

type SortKey = "name" | "country";
type SortDir = "asc" | "desc";

function FlagTr({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 32" aria-hidden>
      <defs>
        <clipPath id="tr-flag-clip">
          <rect width="48" height="32" rx="3" />
        </clipPath>
      </defs>
      <g clipPath="url(#tr-flag-clip)">
        <rect width="48" height="32" fill="#E30A17" />
        <circle cx="19.5" cy="16" r="7.2" fill="#FFFFFF" />
        <circle cx="21.1" cy="16" r="5.75" fill="#E30A17" />
        <polygon
          fill="#FFFFFF"
          points="27.8,16 29.05,18.55 31.95,18.55 29.55,20.35 30.8,22.9 27.8,21.1 24.8,22.9 26.05,20.35 23.65,18.55 26.55,18.55"
        />
      </g>
    </svg>
  );
}

function FlagPk({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 32" aria-hidden>
      <defs>
        <clipPath id="pk-flag-clip">
          <rect width="48" height="32" rx="3" />
        </clipPath>
      </defs>
      <g clipPath="url(#pk-flag-clip)">
        <rect width="12" height="32" fill="#FFFFFF" />
        <rect x="12" width="36" height="32" fill="#01411C" />
        <circle cx="27.2" cy="16" r="7.8" fill="#FFFFFF" />
        <circle cx="29.3" cy="16" r="6.35" fill="#01411C" />
        <polygon
          fill="#FFFFFF"
          points="36.1,12.5 37.15,15.2 40,15.2 37.65,16.95 38.7,19.65 36.1,18 33.5,19.65 34.55,16.95 32.2,15.2 35.05,15.2"
        />
      </g>
    </svg>
  );
}

function FlagKw({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 32" aria-hidden>
      <defs>
        <clipPath id="kw-flag-clip">
          <rect width="48" height="32" rx="3" />
        </clipPath>
      </defs>
      <g clipPath="url(#kw-flag-clip)">
        <rect width="48" height="10.67" fill="#007A3D" />
        <rect y="10.67" width="48" height="10.66" fill="#FFFFFF" />
        <rect y="21.33" width="48" height="10.67" fill="#CE1126" />
        <polygon fill="#000000" points="0,0 14,16 0,32" />
      </g>
    </svg>
  );
}

function FlagKz({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 32" aria-hidden>
      <defs>
        <clipPath id="kz-flag-clip">
          <rect width="48" height="32" rx="3" />
        </clipPath>
      </defs>
      <g clipPath="url(#kz-flag-clip)">
        <rect width="48" height="32" fill="#00AFCA" />
        <circle cx="13.5" cy="13" r="4.2" fill="#FEC50C" />
        <g stroke="#FEC50C" strokeWidth="1.1" strokeLinecap="round">
          <line x1="13.5" y1="6.2" x2="13.5" y2="8.4" />
          <line x1="13.5" y1="17.6" x2="13.5" y2="19.8" />
          <line x1="6.7" y1="13" x2="8.9" y2="13" />
          <line x1="18.1" y1="13" x2="20.3" y2="13" />
          <line x1="8.8" y1="8.3" x2="10.4" y2="9.9" />
          <line x1="16.6" y1="16.1" x2="18.2" y2="17.7" />
          <line x1="18.2" y1="8.3" x2="16.6" y2="9.9" />
          <line x1="10.4" y1="16.1" x2="8.8" y2="17.7" />
        </g>
        <path
          fill="#FEC50C"
          d="M4 24.5c2.2-1.8 5.8-1.8 8.5-0.6 1.4 0.6 2.8 0.6 4.2 0 2.7-1.2 6.3-1.2 8.5 0.6v2.2H4v-2.2z"
        />
      </g>
    </svg>
  );
}

function FlagTm({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 32" aria-hidden>
      <defs>
        <clipPath id="tm-flag-clip">
          <rect width="48" height="32" rx="3" />
        </clipPath>
      </defs>
      <g clipPath="url(#tm-flag-clip)">
        <rect width="48" height="32" fill="#00843D" />
        <rect width="9" height="32" fill="#C83830" />
        <g fill="#FFFFFF">
          <path d="M14.5 16a4.2 4.2 0 1 1 0-8.4 3.2 3.2 0 1 0 0 8.4Z" />
          <circle cx="17.8" cy="9.2" r="0.85" />
          <circle cx="17.8" cy="11.8" r="0.85" />
          <circle cx="17.8" cy="14.4" r="0.85" />
          <circle cx="17.8" cy="17" r="0.85" />
          <circle cx="17.8" cy="19.6" r="0.85" />
        </g>
        <g fill="#00843D">
          <circle cx="3.2" cy="6.5" r="1.1" />
          <circle cx="3.2" cy="11.5" r="1.1" />
          <circle cx="3.2" cy="16.5" r="1.1" />
          <circle cx="3.2" cy="21.5" r="1.1" />
          <circle cx="3.2" cy="26.5" r="1.1" />
        </g>
      </g>
    </svg>
  );
}

function PartnerFlag({ code }: { code: PartnerRecord["countryCode"] }) {
  const flagClass = "h-3.5 w-[1.3125rem] shrink-0 overflow-hidden rounded-[2px] ring-1 ring-ink/10";
  if (code === "tr") return <FlagTr className={flagClass} />;
  if (code === "pk") return <FlagPk className={flagClass} />;
  if (code === "kw") return <FlagKw className={flagClass} />;
  if (code === "kz") return <FlagKz className={flagClass} />;
  if (code === "tm") return <FlagTm className={flagClass} />;
  return null;
}

function SortIcon() {
  return (
    <svg className="ml-1 inline h-3 w-3 text-secondary/35" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M3 4.5 6 1.5 9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M3 7.5 6 10.5 9 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function ArrowRightIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
}

type PartnerDirectoryProps = {
  locale: string;
  copy: PartnerListCopy;
  partners: PartnerRecord[];
};

export function PartnerDirectory({ locale, copy, partners }: PartnerDirectoryProps) {
  const [query, setQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [appliedCountry, setAppliedCountry] = useState("all");
  const [appliedCategory, setAppliedCategory] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const countries = useMemo(
    () => Array.from(new Set(partners.map((p) => p.country))).sort(),
    [partners],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let rows = partners.filter((p) => {
      if (appliedCountry !== "all" && p.country !== appliedCountry) return false;
      if (appliedCategory !== "all" && p.category !== appliedCategory) return false;
      if (!q) return true;
      const haystack = [
        p.name,
        p.subtitle,
        p.description ?? "",
        p.country,
        p.email,
        p.phone,
        p.phone2 ?? "",
        p.websiteLabel,
        ...p.expertise,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });

    rows = [...rows].sort((a, b) => {
      const av = sortKey === "name" ? a.name : a.country;
      const bv = sortKey === "name" ? b.name : b.country;
      const cmp = av.localeCompare(bv, locale);
      return sortDir === "asc" ? cmp : -cmp;
    });

    return rows;
  }, [query, appliedCountry, appliedCategory, sortKey, sortDir, locale, partners]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(key);
    setSortDir("asc");
  };

  const applyFilters = () => {
    setAppliedCountry(countryFilter);
    setAppliedCategory(categoryFilter);
  };

  return (
    <section className="bg-[#f7f4ee] pb-12 pt-8 sm:pb-20 sm:pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-36px_rgba(15,20,30,0.28)] ring-1 ring-ink/[0.05] sm:rounded-[1.35rem]">
          <div className="border-b border-ink/[0.06] bg-white p-4 sm:p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <label className="relative min-w-0 flex-1">
                <span className="sr-only">{copy.searchPlaceholder}</span>
                <svg
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary/40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z" />
                </svg>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={copy.searchPlaceholder}
                  className="w-full rounded-xl border border-ink/10 bg-[#faf9f7] py-2.5 pl-10 pr-4 text-sm text-ink outline-none transition placeholder:text-secondary/40 focus:border-primary/35 focus:ring-2 focus:ring-primary/10"
                />
              </label>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:shrink-0">
                <label className="relative min-w-0 flex-1 sm:min-w-[11rem]">
                  <span className="sr-only">{copy.allCountries}</span>
                  <svg
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary/40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
                    <path strokeLinecap="round" d="M3 12h18M12 3c2.8 3.2 2.8 14.8 0 18M12 3c-2.8 3.2-2.8 14.8 0 18" />
                  </svg>
                  <select
                    value={countryFilter}
                    onChange={(e) => setCountryFilter(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-ink/10 bg-[#faf9f7] py-2.5 pl-10 pr-8 text-sm text-ink outline-none focus:border-primary/35 focus:ring-2 focus:ring-primary/10"
                  >
                    <option value="all">{copy.allCountries}</option>
                    {countries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="relative min-w-0 flex-1 sm:min-w-[11rem]">
                  <span className="sr-only">{copy.allCategories}</span>
                  <svg
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary/40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    aria-hidden
                  >
                    <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h10" />
                  </svg>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-ink/10 bg-[#faf9f7] py-2.5 pl-10 pr-8 text-sm text-ink outline-none focus:border-primary/35 focus:ring-2 focus:ring-primary/10"
                  >
                    <option value="all">{copy.allCategories}</option>
                    {PARTNER_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {copy[c.labelKey]}
                      </option>
                    ))}
                  </select>
                </label>

                <button
                  type="button"
                  onClick={applyFilters}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-primary/35 bg-white px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/5 sm:w-auto"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                    <path strokeLinecap="round" d="M4 6h16M7 12h10M10 18h4" />
                  </svg>
                  {copy.filter}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile / tablet cards */}
          <div className="divide-y divide-ink/[0.06] lg:hidden">
            {filtered.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} copy={copy} />
            ))}
            {filtered.length === 0 ? (
              <p className="px-4 py-10 text-center text-sm text-secondary/55 sm:px-6">{copy.noResults}</p>
            ) : null}
          </div>

          {/* Desktop table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="min-w-[980px] w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-ink/[0.06] bg-[#faf9f7]/80">
                  <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.16em] text-secondary/50 sm:px-6">
                    <button type="button" onClick={() => toggleSort("name")} className="inline-flex items-center hover:text-primary">
                      {copy.colCompany}
                      <SortIcon />
                    </button>
                  </th>
                  <th className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-[0.16em] text-secondary/50">
                    <button type="button" onClick={() => toggleSort("country")} className="inline-flex items-center hover:text-primary">
                      {copy.colCountry}
                      <SortIcon />
                    </button>
                  </th>
                  <th className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-[0.16em] text-secondary/50">
                    {copy.colExpertise}
                  </th>
                  <th className="min-w-[12rem] px-4 py-3.5 text-[10px] font-bold uppercase tracking-[0.16em] text-secondary/50 sm:px-5">
                    {copy.colContact}
                  </th>
                  <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.16em] text-secondary/50 sm:px-6">
                    {copy.colWebsite}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((partner) => (
                  <PartnerRow key={partner.id} partner={partner} />
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 ? (
            <p className="hidden px-6 py-10 text-center text-sm text-secondary/55 lg:block">{copy.noResults}</p>
          ) : null}

          <div className="border-t border-ink/[0.06] bg-[#fff7f0] px-4 py-5 sm:px-6 sm:py-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden>
                    <path strokeLinecap="round" d="M16 18v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1" />
                    <circle cx="9" cy="7" r="3" />
                    <path strokeLinecap="round" d="M22 18v-1a3.5 3.5 0 0 0-2.5-3.36M16 3.13a3.5 3.5 0 0 1 0 6.75" />
                  </svg>
                </span>
                <p className="max-w-md text-sm leading-relaxed text-secondary/70 sm:text-[15px]">{copy.ctaQuestion}</p>
              </div>

              <Link
                href={`/${locale}/iletisim`}
                className="inline-flex w-full shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-primary px-6 py-3 text-sm font-bold uppercase tracking-[0.06em] text-white shadow-[0_16px_36px_-18px_rgba(239,95,23,0.85)] transition hover:bg-primary-deep sm:w-auto lg:self-center"
              >
                {copy.ctaButton}
                <ArrowRightIcon />
              </Link>

              <div className="flex flex-col gap-3 text-[11px] font-semibold text-secondary/55 min-[420px]:flex-row min-[420px]:flex-wrap min-[420px]:gap-5 lg:justify-end">
                <span className="inline-flex items-center gap-2">
                  <svg className="h-4 w-4 text-primary/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {copy.valueTrust}
                </span>
                <span className="inline-flex items-center gap-2">
                  <svg className="h-4 w-4 text-primary/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                  {copy.valueQuality}
                </span>
                <span className="inline-flex items-center gap-2">
                  <svg className="h-4 w-4 text-primary/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.307a1.125 1.125 0 0 0 1.578 0L21.75 9M21.75 9h-7.5M21.75 9v7.5" />
                  </svg>
                  {copy.valueGrowth}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EmptyCell() {
  return <span className="text-xs text-secondary/35">{EMPTY}</span>;
}

function PhoneLink({ phone }: { phone: string }) {
  return (
    <a
      href={`tel:${phone.replace(/\s/g, "")}`}
      className="flex items-center gap-2 whitespace-nowrap tabular-nums transition hover:text-primary"
    >
      <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
        <path strokeLinecap="round" d="M6.5 4h3l1.2 3.2a1.5 1.5 0 0 1-.4 1.5l-1.4 1.4a12 12 0 0 0 5.3 5.3l1.4-1.4a1.5 1.5 0 0 1 1.5-.4L18 15.5v3a1.5 1.5 0 0 1-1.5 1.5A13.5 13.5 0 0 1 4.5 6 6 0 0 1 6 4.5Z" />
      </svg>
      <span>{phone}</span>
    </a>
  );
}

function WebsiteLink({ label, url }: { label: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex max-w-full flex-wrap items-center gap-2 break-all transition hover:text-primary sm:break-normal"
    >
      <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" />
      </svg>
      <span>{label}</span>
      <ArrowRightIcon className="h-3.5 w-3.5 shrink-0 text-primary transition group-hover:translate-x-0.5" />
    </a>
  );
}

function PartnerLogo({ partner }: { partner: PartnerRecord }) {
  if (partner.logoSrc) {
    return (
      <span className={`${PARTNER_LOGO_BOX} bg-white`}>
        <Image
          src={partner.logoSrc}
          alt={partner.name}
          width={80}
          height={32}
          className="h-8 w-auto max-h-8 max-w-[4.5rem] object-contain object-center"
        />
      </span>
    );
  }

  return (
    <span className={`${PARTNER_LOGO_BOX} text-sm font-bold ${partner.logoClassName}`}>
      {partner.logoInitials}
    </span>
  );
}

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-secondary/45">{children}</p>
  );
}

function PartnerExpertiseTags({ expertise }: { expertise: string[] }) {
  if (expertise.length === 0) return <EmptyCell />;

  return (
    <div className="flex flex-wrap gap-1.5">
      {expertise.map((tag) => (
        <span
          key={tag}
          className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.04em] text-primary"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function PartnerContactBlock({ partner }: { partner: PartnerRecord }) {
  const hasEmail = partner.email !== EMPTY;
  const phones = [partner.phone, partner.phone2].filter((p): p is string => Boolean(p && p !== EMPTY));
  const hasPhone = phones.length > 0;

  if (!hasEmail && !hasPhone) return <EmptyCell />;

  return (
    <div className="flex flex-col items-start gap-2 text-xs text-secondary/65">
      {hasEmail ? (
        <a href={`mailto:${partner.email}`} className="flex items-start gap-2 break-all transition hover:text-primary sm:items-center">
          <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 sm:mt-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
            <path strokeLinecap="round" d="M4 7h16v10H4V7Z" />
            <path strokeLinecap="round" d="m4 7 8 6 8-6" />
          </svg>
          <span>{partner.email}</span>
        </a>
      ) : null}
      {hasPhone
        ? phones.map((phone) => (
            <PhoneLink key={phone} phone={phone} />
          ))
        : null}
    </div>
  );
}

function PartnerCard({ partner, copy }: { partner: PartnerRecord; copy: PartnerListCopy }) {
  const hasWebsite = partner.websiteUrl !== EMPTY && partner.websiteLabel !== EMPTY;

  return (
    <article className="p-4 transition hover:bg-[#faf9f7]/60 sm:p-5">
      <div className="flex items-start gap-3.5">
        <PartnerLogo partner={partner} />
        <div className="min-w-0 flex-1 pt-0.5">
          <h3 className="font-bold leading-snug text-[#1e293b]">{partner.name}</h3>
          <p className="mt-0.5 text-xs font-medium leading-snug text-primary/80">{partner.subtitle}</p>
        </div>
      </div>

      {partner.description ? (
        <p className="mt-3 text-xs leading-relaxed text-secondary/55">{partner.description}</p>
      ) : null}

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <FieldLabel>{copy.colCountry}</FieldLabel>
          <div className="flex items-center gap-2 text-sm text-secondary/70">
            <PartnerFlag code={partner.countryCode} />
            {partner.country === EMPTY ? <EmptyCell /> : <span>{partner.country}</span>}
          </div>
        </div>

        <div className="sm:col-span-2">
          <FieldLabel>{copy.colExpertise}</FieldLabel>
          <PartnerExpertiseTags expertise={partner.expertise} />
        </div>

        <div>
          <FieldLabel>{copy.colContact}</FieldLabel>
          <PartnerContactBlock partner={partner} />
        </div>

        <div>
          <FieldLabel>{copy.colWebsite}</FieldLabel>
          {hasWebsite ? (
            <WebsiteLink label={partner.websiteLabel} url={partner.websiteUrl} />
          ) : (
            <EmptyCell />
          )}
        </div>
      </div>
    </article>
  );
}

function PartnerRow({ partner }: { partner: PartnerRecord }) {
  const hasWebsite = partner.websiteUrl !== EMPTY && partner.websiteLabel !== EMPTY;

  return (
    <tr className="border-b border-ink/[0.05] transition hover:bg-[#faf9f7]/60">
      <td className="align-top px-5 py-4 sm:px-6">
        <div className="flex items-start gap-3.5">
          <PartnerLogo partner={partner} />
          <div className="min-w-0 flex-1 pt-0.5">
            <p className="font-bold leading-snug text-[#1e293b]">{partner.name}</p>
            <p className="mt-0.5 text-xs font-medium leading-snug text-primary/80">{partner.subtitle}</p>
            {partner.description ? (
              <p className="mt-1.5 text-xs leading-relaxed text-secondary/55">{partner.description}</p>
            ) : null}
          </div>
        </div>
      </td>
      <td className="align-top px-4 py-4">
        <div className="flex items-center gap-2 pt-0.5 text-sm leading-snug text-secondary/70">
          <PartnerFlag code={partner.countryCode} />
          {partner.country === EMPTY ? <EmptyCell /> : <span>{partner.country}</span>}
        </div>
      </td>
      <td className="align-top px-4 py-4">
        <div className="max-w-[15rem] pt-0.5">
          <PartnerExpertiseTags expertise={partner.expertise} />
        </div>
      </td>
      <td className="min-w-[12rem] align-top px-4 py-4 sm:px-5">
        <div className="pt-0.5">
          <PartnerContactBlock partner={partner} />
        </div>
      </td>
      <td className="min-w-[11rem] align-top px-5 py-4 text-xs text-secondary/65 sm:px-6">
        <div className="pt-0.5">
          {hasWebsite ? (
            <WebsiteLink label={partner.websiteLabel} url={partner.websiteUrl} />
          ) : (
            <EmptyCell />
          )}
        </div>
      </td>
    </tr>
  );
}
