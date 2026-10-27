"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Bug, ChevronDown, Gauge, Sparkles } from "lucide-react";
import { changelog, type ChangeType } from "@/lib/data";
import SectionHead from "./SectionHead";

const meta = {
  feat: { label: "feat", Icon: Sparkles, text: "text-signal", dot: "bg-signal" },
  fix: { label: "fix", Icon: Bug, text: "text-ember", dot: "bg-ember" },
  perf: { label: "perf", Icon: Gauge, text: "text-gold", dot: "bg-gold" },
} as const;

const filters: { key: "all" | ChangeType; label: string }[] = [
  { key: "all", label: "semua" },
  { key: "feat", label: "feat" },
  { key: "fix", label: "fix" },
  { key: "perf", label: "perf" },
];

export default function Changelog() {
  const [filter, setFilter] = useState<"all" | ChangeType>("all");
  const [openV, setOpenV] = useState<string | null>(changelog.releases[0]?.version ?? null);
  const trackRef = useRef<HTMLOListElement>(null);

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  const shown = changelog.releases.filter((r) => filter === "all" || r.type === filter);

  return (
    <section id="changelog" className="py-24 md:py-32 px-5 sm:px-8">
      <div className="mx-auto max-w-shell">
        <SectionHead kicker={changelog.kicker} heading={changelog.heading} body={changelog.body} />

        <div className="flex gap-2 mb-10" role="tablist" aria-label="Filter changelog">
          {filters.map((f) => (
            <button
              key={f.key}
              role="tab"
              aria-selected={filter === f.key}
              onClick={() => setFilter(f.key)}
              className={`mono text-[12px] px-4 py-2 rounded-full border transition-colors ${
                filter === f.key
                  ? "bg-ink text-void border-ink"
                  : "border-line text-mute hover:text-ink hover:border-mute"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="relative max-w-3xl">
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-line" aria-hidden="true" />
          <motion.div
            style={{ scaleY: fill }}
            className="absolute left-[11px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-ember via-gold to-signal"
            aria-hidden="true"
          />

          <ol ref={trackRef} className="space-y-6">
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((r) => {
                const m = meta[r.type];
                const isOpen = openV === r.version;
                return (
                  <motion.li
                    layout
                    key={r.version}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="relative pl-10"
                  >
                    <span
                      className={`absolute left-[5px] top-6 w-3.5 h-3.5 rounded-full border-2 border-void ${m.dot}`}
                      aria-hidden="true"
                    />
                    <button
                      onClick={() => setOpenV(isOpen ? null : r.version)}
                      aria-expanded={isOpen}
                      className="w-full text-left rounded-2xl border border-line bg-panel p-5 hover:border-mute/50 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="mono text-[12px] text-ink">v{r.version}</span>
                        <span className={`inline-flex items-center gap-1 mono text-[10.5px] ${m.text}`}>
                          <m.Icon size={11} />
                          {m.label}
                        </span>
                        <span className="mono text-[11px] text-mute ml-auto">{r.date}</span>
                        <ChevronDown
                          size={14}
                          className={`text-mute transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </div>
                      <h3 className="display font-semibold text-base mt-2">{r.title}</h3>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            {r.items.map((it, i) => (
                              <motion.li
                                key={it}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.06 * i + 0.1 }}
                                className="text-mute text-sm leading-relaxed flex gap-2 first:mt-4 mt-2"
                              >
                                <span className="mono text-signal">+</span>
                                {it}
                              </motion.li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </button>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ol>

          {shown.length === 0 && (
            <p className="mono text-sm text-mute py-10 pl-10">$ git log: tidak ada rilis bertipe ini</p>
          )}
        </div>
      </div>
    </section>
  );
}
