"use client";

import type { IletisimLocation } from "@/lib/iletisim/copy";
import { getIletisimLocationData } from "@/lib/iletisim/locations-data";

type Props = {
  location: IletisimLocation;
  getDirections: string;
};

/** Google embed üst şeridini (beyaz kutu) kırpmak için */
const MAP_EMBED_CHROME_OFFSET_PX = 56;

export function LocationCard({ location, getDirections }: Props) {
  const meta = getIletisimLocationData(location.id);
  const embedSrc = meta?.mapsEmbedSrc ?? "";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_8px_32px_-12px_rgba(25,28,30,0.12)] ring-1 ring-hz-outline-variant/15 transition-all hover:ring-hz-secondary/30">
      <div className="relative h-52 overflow-hidden bg-[#e8eaed]">
        {embedSrc ? (
          <iframe
            src={embedSrc}
            title={location.title}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="pointer-events-none absolute left-0 w-full border-0"
            style={{
              top: -MAP_EMBED_CHROME_OFFSET_PX,
              height: `calc(100% + ${MAP_EMBED_CHROME_OFFSET_PX}px)`,
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-hz-surface-variant">
            <span className="material-symbols-outlined text-5xl text-hz-outline opacity-40">
              {location.icon}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-hz-secondary">{location.badge}</p>
        <h3 className="mt-1 text-xl font-black text-hz-primary">{location.title}</h3>
        <p className="mb-6 mt-2 whitespace-pre-line text-sm leading-relaxed text-hz-on-surface-variant">
          {location.address}
        </p>
        <a
          href={location.mapsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-hz-secondary transition-transform group-hover:translate-x-1"
        >
          {getDirections}
          <span className="material-symbols-outlined text-base">open_in_new</span>
        </a>
      </div>
    </article>
  );
}
