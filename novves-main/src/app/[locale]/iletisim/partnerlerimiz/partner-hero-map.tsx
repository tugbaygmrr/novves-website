type PartnerHeroMapProps = {
  className?: string;
};

export function PartnerHeroMap({ className = "" }: PartnerHeroMapProps) {
  return (
    <svg className={className} viewBox="0 0 520 280" fill="none" aria-hidden>
      <ellipse cx="260" cy="140" rx="230" ry="118" fill="#E8E4DC" fillOpacity="0.55" />
      <path
        d="M72 148c38-42 88-62 148-58 52 3 98 28 132 68 18 21 28 46 32 72-36-8-72-12-108-10-52 3-98 18-136 44-14-38-22-78-68-116Z"
        fill="#D9D4CB"
        fillOpacity="0.45"
      />
      <path
        d="M118 92c28-18 62-24 96-18 34 6 64 24 86 50 12 15 20 32 24 50-28-6-54-8-80-4-32 5-60 16-86 32-8-24-18-48-40-110Z"
        fill="#CFC9BF"
        fillOpacity="0.35"
      />
      <path
        d="M300 78c22-8 48-6 70 6 18 10 32 26 40 44-22-4-42-4-62 2-18 6-34 16-48 28-4-22-8-44-24-80Z"
        fill="#CFC9BF"
        fillOpacity="0.3"
      />

      {[
        [148, 118],
        [198, 102],
        [248, 96],
        [302, 108],
        [352, 132],
        [388, 168],
        [318, 178],
        [228, 168],
        [168, 152],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="4.5" fill="#EF5F17" fillOpacity={0.85} />
      ))}

      {[
        "M148 118 Q220 88 302 108",
        "M198 102 Q260 72 352 132",
        "M248 96 Q300 130 388 168",
        "M168 152 Q250 140 318 178",
      ].map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="#EF5F17"
          strokeOpacity="0.28"
          strokeWidth="1.2"
          strokeDasharray="4 5"
          fill="none"
        />
      ))}
    </svg>
  );
}
