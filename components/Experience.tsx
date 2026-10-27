"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { experience } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="experience" className="py-24 md:py-32 px-5 sm:px-8 bg-panel/40 border-y border-line">
      <div className="mx-auto max-w-shell">
        <SectionHead kicker={experience.kicker} heading={experience.heading} />

        <div ref={ref} className="relative max-w-2xl">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-line" aria-hidden="true" />
          <motion.div
            style={{ scaleY }}
            className="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-signal to-ember"
            aria-hidden="true"
          />
          <div className="space-y-10">
            {experience.items.map((it, i) => (
              <Reveal key={it.title} delay={i * 0.1}>
                <div className="relative pl-9 group">
                  <span className="absolute left-0 top-1.5 flex w-[15px] h-[15px]" aria-hidden="true">
                    <span className="absolute inset-0 rounded-full bg-signal/40 animate-ping" />
                    <span className="relative w-[15px] h-[15px] rounded-full bg-void border-2 border-signal" />
                  </span>
                  <div className="rounded-xl border border-transparent group-hover:border-line group-hover:bg-panel/60 transition-colors -mx-3 px-3 py-2">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1.5">
                      <h3 className="font-semibold text-ink">{it.title}</h3>
                      <span className="mono text-[11.5px] text-mute">{it.period}</span>
                    </div>
                    <p className="mono text-[12.5px] text-signal mb-2">{it.org}</p>
                    <p className="text-mute text-sm leading-relaxed">{it.note}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
