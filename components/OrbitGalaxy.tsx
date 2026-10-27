import { skills } from "@/lib/data";

const RINGS = [
  { size: 32, dur: 26, color: "#ff5d4d" },
  { size: 54, dur: 40, color: "#e8b465" },
  { size: 74, dur: 58, color: "#54e0c7" },
  { size: 94, dur: 80, color: "#8993a4" },
];

const short = (s: string) =>
  s === "python-telegram-bot" ? "py-telegram" : s.split(" / ")[0];

// bintang deterministik (tanpa Math.random agar tidak beda antara server & klien)
const stars = (() => {
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  return Array.from({ length: 46 }, () => ({
    x: +(rnd() * 100).toFixed(2),
    y: +(rnd() * 100).toFixed(2),
    s: +(1 + rnd() * 1.6).toFixed(1),
    d: +(rnd() * 4).toFixed(1),
  }));
})();

export default function OrbitGalaxy() {
  return (
    <div className="group relative mx-auto w-full max-w-[640px] aspect-square mb-16 rounded-full">
      {/* nebula */}
      <div
        className="absolute -inset-[8%] -z-10 rounded-full blur-2xl opacity-70"
        style={{
          background:
            "radial-gradient(circle at 35% 40%, rgba(255,93,77,0.12), transparent 45%), radial-gradient(circle at 70% 65%, rgb(var(--c-signal) / 0.12), transparent 50%)",
        }}
        aria-hidden="true"
      />
      {/* bintang */}
      <div className="absolute -inset-[8%] -z-10 overflow-hidden rounded-full" aria-hidden="true">
        {stars.map((st, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-ink animate-twinkle"
            style={{
              left: `${st.x}%`,
              top: `${st.y}%`,
              width: st.s,
              height: st.s,
              animationDelay: `${st.d}s`,
            }}
          />
        ))}
      </div>

      {/* matahari */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
        <div
          className="w-[17%] min-w-[64px] aspect-square rounded-full flex items-center justify-center animate-pulse"
          style={{
            background: "radial-gradient(circle at 35% 30%, #ffd9a0, #ff5d4d 55%, #7a1d14)",
            boxShadow: "0 0 60px 12px rgba(255,93,77,0.35), 0 0 140px 40px rgba(232,180,101,0.15)",
          }}
        />
        <span className="absolute mono text-[10px] sm:text-xs font-medium text-void tracking-tight">kham</span>
      </div>

      {RINGS.map((ring, ri) => {
        const items = skills.groups[ri]?.items ?? [];
        const reverse = ri % 2 === 1;
        const offset = (ri * 37 * Math.PI) / 180;
        return (
          <div
            key={ri}
            className="absolute rounded-full border border-dashed border-line"
            style={{ inset: `${(100 - ring.size) / 2}%` }}
          >
            <div
              className="absolute inset-0 animate-spin group-hover:[animation-play-state:paused]"
              style={{
                animationDuration: `${ring.dur}s`,
                animationDirection: reverse ? "reverse" : "normal",
              }}
            >
              {items.map((name, i) => {
                const a = offset + (i / items.length) * Math.PI * 2;
                const left = +(50 + 50 * Math.cos(a)).toFixed(2);
                const top = +(50 + 50 * Math.sin(a)).toFixed(2);
                return (
                  <div
                    key={name}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${left}%`, top: `${top}%` }}
                  >
                    <div
                      className="flex flex-col items-center gap-1 animate-spin group-hover:[animation-play-state:paused]"
                      style={{
                        animationDuration: `${ring.dur}s`,
                        animationDirection: reverse ? "normal" : "reverse",
                      }}
                    >
                      <span
                        className="block w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-transform hover:scale-150"
                        style={{
                          background: `radial-gradient(circle at 35% 30%, #fff8, ${ring.color} 55%, #0008)`,
                          boxShadow: `0 0 12px 2px ${ring.color}66`,
                        }}
                      />
                      <span className="mono text-[8.5px] sm:text-[11px] text-ink/90 whitespace-nowrap">
                        {short(name)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
