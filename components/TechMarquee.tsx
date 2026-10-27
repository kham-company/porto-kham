import { skills } from "@/lib/data";

export default function TechMarquee() {
  const items = skills.groups.flatMap((g) => g.items);
  const row = [...items, ...items];

  return (
    <div
      className="relative py-6 border-y border-line overflow-hidden"
      style={{
        maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
      }}
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused]">
        {row.map((t, i) => (
          <span key={i} className="mono text-[13px] text-mute whitespace-nowrap flex items-center gap-10">
            {t}
            <span className="text-signal/60">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
