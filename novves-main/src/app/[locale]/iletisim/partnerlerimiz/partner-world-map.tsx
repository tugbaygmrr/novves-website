"use client";

import { useState } from "react";

export type PartnerPin = {
  name: string;
  location: string;
  top: string;
  left: string;
  /** Sayfa açıldığında varsayılan olarak seçili gelsin mi */
  defaultSelected?: boolean;
};

function DottedWorldMap() {
  const dots: Array<{ x: number; y: number }> = [];
  const continents = [
    { cx: 195, cy: 160, rx: 95, ry: 70 }, // North America
    { cx: 285, cy: 330, rx: 50, ry: 90 }, // South America
    { cx: 510, cy: 130, rx: 65, ry: 45 }, // Europe
    { cx: 530, cy: 280, rx: 65, ry: 95 }, // Africa
    { cx: 700, cy: 160, rx: 135, ry: 90 }, // Asia
    { cx: 835, cy: 345, rx: 55, ry: 32 }, // Australia
  ];
  const step = 14;
  for (let x = 30; x < 970; x += step) {
    for (let y = 30; y < 470; y += step) {
      for (const c of continents) {
        const dx = (x - c.cx) / c.rx;
        const dy = (y - c.cy) / c.ry;
        const noise = (Math.sin(x * 0.41) + Math.cos(y * 0.37)) * 0.12;
        if (dx * dx + dy * dy < 1 + noise) {
          dots.push({ x, y });
          break;
        }
      }
    }
  }
  return (
    <svg
      viewBox="0 0 1000 500"
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="2.4" fill="#d6cfc1" />
      ))}
    </svg>
  );
}

export function PartnerWorldMap({ pins }: { pins: PartnerPin[] }) {
  const initialIndex = pins.findIndex((p) => p.defaultSelected === true);
  const [selectedIndex, setSelectedIndex] = useState<number>(initialIndex >= 0 ? initialIndex : -1);

  return (
    <div className="relative aspect-[2/1] w-full overflow-hidden rounded-3xl border border-ink/8 bg-gradient-to-br from-[#fdf8ee] via-[#f9f1e1] to-[#fbe8d4] shadow-[0_30px_70px_-40px_rgba(15,20,30,0.35)]">
      <DottedWorldMap />
      {pins.map((pin, i) => {
        const isSelected = selectedIndex === i;
        return (
          <button
            key={i}
            type="button"
            onClick={() => setSelectedIndex(isSelected ? -1 : i)}
            aria-pressed={isSelected}
            className={`absolute flex items-center gap-2.5 rounded-full px-3 py-2 text-left shadow-[0_10px_24px_-14px_rgba(15,20,30,0.35)] backdrop-blur-sm transition-colors duration-300 ease-out hover:brightness-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f26a2e]/60 ${
              isSelected
                ? "border border-[#f26a2e] bg-[#f26a2e] text-white shadow-[0_14px_30px_-12px_rgba(242,106,46,0.55)]"
                : "border border-ink/10 bg-white/95 text-ink"
            }`}
            style={{ top: pin.top, left: pin.left, transform: "translate(-50%, -50%)" }}
          >
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full ${
                isSelected
                  ? "bg-white text-[#f26a2e]"
                  : "bg-[#f26a2e] text-white shadow-[0_4px_10px_-4px_rgba(242,106,46,0.6)]"
              }`}
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
              </svg>
            </span>
            <div className="pr-2 leading-tight">
              <p className="text-[12px] font-bold">{pin.name}</p>
              <p className={`text-[10px] ${isSelected ? "text-white/80" : "text-secondary/60"}`}>{pin.location}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
