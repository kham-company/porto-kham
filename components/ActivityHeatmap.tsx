"use client";

import { useMemo, useState } from "react";
import { activity } from "@/lib/data";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

// PRNG deterministik supaya server & client menghasilkan data yang sama (tanpa hydration mismatch).
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DAYS = ["Sen", "", "Rab", "", "Jum", "", "Min"];
const ALPHA = [0.06, 0.25, 0.45, 0.7, 1];

export default function ActivityHeatmap() {
  const [hover, setHover] = useState<string>("arahkan kursor ke kotak untuk detail");

  const grid = useMemo(() => {
    const rnd = mulberry32(1708);
    return Array.from({ length: activity.weeks }, (_, w) =>
      Array.from({ length: 7 }, (_, d) => {
        const weekend = d >= 5;
        const base = rnd() * (weekend ? 1.15 : 1);
        const burst = rnd() > 0.82 ? 1 : 0; // minggu-minggu "ngebut"
        const v = base + burst * 0.5;
        const level = v < 0.35 ? 0 : v < 0.6 ? 1 : v < 0.85 ? 2 : v < 1.1 ? 3 : 4;
        return { level, count: level === 0 ? 0 : Math.round(level * 2 + rnd() * 3), w, d };
      })
    );
  }, []);

  const total = grid.flat().reduce((a, c) => a + c.count, 0);

  return (
    <section id="activity" className="py-24 md:py-32 px-5 sm:px-8">
      <div className="mx-auto max-w-shell">
        <SectionHead kicker={activity.kicker} heading={activity.heading} body={activity.body} />

        <Reveal>
          <div className="rounded-2xl border border-line bg-panel p-5 sm:p-7 overflow-x-auto">
            <div className="flex gap-3 min-w-max">
              <div className="flex flex-col gap-[3px] mono text-[10px] text-mute pt-0.5" aria-hidden="true">
                {DAYS.map((d, i) => (
                  <span key={i} className="h-3 leading-3">
                    {d}
                  </span>
                ))}
              </div>
              <div className="flex gap-[3px]" role="img" aria-label="Heatmap aktivitas ilustrasi 26 minggu">
                {grid.map((week, w) => (
                  <div key={w} className="flex flex-col gap-[3px]">
                    {week.map((c) => (
                      <span
                        key={c.d}
                        onMouseEnter={() =>
                          setHover(`minggu ${c.w + 1} · ${DAYS[c.d] || ["", "Sel", "", "Kam", "", "Sab", ""][c.d]} — ${c.count} aktivitas`)
                        }
                        className="w-3 h-3 rounded-[3px] border border-line/40 transition-transform hover:scale-125"
                        style={{ backgroundColor: `rgb(var(--c-signal) / ${ALPHA[c.level]})` }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 mt-5 mono text-[11px] text-mute">
              <span>{hover}</span>
              <span className="flex items-center gap-1.5">
                sedikit
                {ALPHA.map((a) => (
                  <span
                    key={a}
                    className="w-3 h-3 rounded-[3px] border border-line/40"
                    style={{ backgroundColor: `rgb(var(--c-signal) / ${a})` }}
                  />
                ))}
                banyak · total {total}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
