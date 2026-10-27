"use client";

import { forwardRef, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, CircleDot, Search, ArrowDownUp } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import SectionHead from "./SectionHead";
import ProjectModal from "./ProjectModal";

const filters = [
  { key: "all", label: "semua" },
  { key: "live", label: "live" },
  { key: "wip", label: "wip" },
] as const;

const sorts = [
  { key: "new", label: "terbaru" },
  { key: "old", label: "terlama" },
  { key: "az", label: "A–Z" },
] as const;

const ProjectCard = forwardRef<HTMLButtonElement, { p: Project; onOpen: () => void }>(function ProjectCard({ p, onOpen }, ref) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 220, damping: 20 });
  const sry = useSpring(ry, { stiffness: 220, damping: 20 });

  return (
    <motion.button
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      onClick={onOpen}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 8);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 8);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      whileHover={{ y: -4 }}
      className="spotlight group w-full text-left rounded-2xl border border-line bg-panel p-6 hover:border-mute/50 transition-colors h-full flex flex-col"
    >
      <div className="flex items-start justify-between mb-6">
        <span className="mono text-[11px] text-mute">{p.tag} · {p.year}</span>
        <span className="flex items-center gap-1.5 mono text-[10.5px] text-mute">
          <CircleDot size={11} className={p.status === "live" ? "text-signal" : "text-gold"} />
          {p.status}
        </span>
      </div>
      <h3 className="display font-semibold text-lg mb-2.5">{p.title}</h3>
      <p className="text-mute text-sm leading-relaxed mb-6 flex-1">{p.summary}</p>
      <div className="flex flex-wrap gap-1.5 mb-6">
        {p.stack.slice(0, 3).map((s) => (
          <span key={s} className="mono text-[10.5px] text-mute border border-line rounded px-2 py-1">
            {s}
          </span>
        ))}
      </div>
      <span className="inline-flex items-center gap-1.5 mono text-[12px] text-ink group-hover:text-signal transition-colors">
        lihat detail
        <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </span>
    </motion.button>
  );
});

export default function Projects() {
  const [sort, setSort] = useState<(typeof sorts)[number]["key"]>("new");
  const [active, setActive] = useState<Project | null>(null);
  const [filter, setFilter] = useState<(typeof filters)[number]["key"]>("all");
  const [q, setQ] = useState("");

  useEffect(() => {
    const onOpen = (e: Event) => {
      const slug = (e as CustomEvent<string>).detail;
      const p = projects.find((x) => x.slug === slug);
      if (p) setActive(p);
    };
    window.addEventListener("open-project", onOpen);
    return () => window.removeEventListener("open-project", onOpen);
  }, []);

  const shown = useMemo(() => {
    const term = q.trim().toLowerCase();
    const base = projects.filter(
      (p) =>
        (filter === "all" || p.status === filter) &&
        (!term || `${p.title} ${p.tag} ${p.summary} ${p.stack.join(" ")}`.toLowerCase().includes(term))
    );
    return [...base].sort((a, b) =>
      sort === "az" ? a.title.localeCompare(b.title) : sort === "old" ? +a.year - +b.year : +b.year - +a.year
    );
  }, [filter, q, sort]);

  return (
    <section id="projects" className="py-24 md:py-32 px-5 sm:px-8">
      <div className="mx-auto max-w-shell">
        <SectionHead
          kicker="~/projects"
          heading="Beberapa bot & sistem yang sudah jalan."
          body="Sebagian besar repo masih private — tapi cerita di baliknya terbuka buat didiskusikan."
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex gap-2" role="tablist" aria-label="Filter proyek">
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
          <div className="flex items-center gap-1.5 text-mute" aria-label="Urutkan">
            <ArrowDownUp size={13} />
            {sorts.map((o) => (
              <button
                key={o.key}
                onClick={() => setSort(o.key)}
                className={`mono text-[11px] px-2.5 py-1 rounded-full transition-colors ${sort === o.key ? "text-signal" : "hover:text-ink"}`}
              >
                {o.label}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 border border-line rounded-full px-4 py-2 bg-panel sm:w-64">
            <Search size={13} className="text-mute" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="cari proyek / stack…"
              className="bg-transparent mono text-[12px] outline-none w-full placeholder:text-mute"
            />
          </label>
        </div>

        <motion.div layout className="grid sm:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {shown.map((p) => (
              <ProjectCard key={p.slug} p={p} onOpen={() => setActive(p)} />
            ))}
          </AnimatePresence>
        </motion.div>

        {shown.length === 0 && (
          <p className="mono text-sm text-mute text-center py-16">$ grep: tidak ada proyek yang cocok</p>
        )}
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
