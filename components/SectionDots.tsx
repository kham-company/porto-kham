"use client";

import { useEffect, useState } from "react";
import { sectionDots } from "@/lib/data";

export default function SectionDots() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const els = sectionDots.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav
      aria-label="Navigasi section"
      className="hidden xl:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3"
    >
      {sectionDots.map((s) => {
        const on = active === s.id;
        return (
          <a key={s.id} href={`#${s.id}`} aria-label={s.label} aria-current={on ? "true" : undefined} className="group flex items-center gap-3">
            <span className="mono text-[10.5px] text-mute opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
              {s.label}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                on ? "w-2.5 h-2.5 bg-signal" : "w-1.5 h-1.5 bg-mute/50 group-hover:bg-ink"
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
}
