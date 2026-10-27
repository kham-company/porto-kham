"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { projects, skills } from "@/lib/data";
import Reveal from "./Reveal";

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1200, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return <span ref={ref}>{n}</span>;
}

export default function StatsStrip() {
  const tech = new Set([...projects.flatMap((p) => p.stack), ...skills.groups.flatMap((g) => g.items)]).size;
  const items = [
    { label: "proyek dibuat", value: projects.length },
    { label: "sudah live", value: projects.filter((p) => p.status === "live").length },
    { label: "teknologi dipakai", value: tech },
    { label: "tahun ngoding", value: new Date().getFullYear() - 2022 },
  ];

  return (
    <section className="px-5 sm:px-8 -mt-6 mb-6 relative z-10">
      <Reveal className="mx-auto max-w-shell">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line rounded-2xl overflow-hidden border border-line">
          {items.map((s) => (
            <div key={s.label} className="bg-panel p-6 text-center">
              <div className="display font-semibold text-3xl mb-1">
                <Counter to={s.value} />
              </div>
              <div className="mono text-[11px] text-mute">{s.label}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
