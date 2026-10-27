"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

type SortKey = "newest" | "oldest" | "title";

export default function StackFilter() {
  const [active, setActive] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");
  const [liveOnly, setLiveOnly] = useState(false);
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const allStack = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.stack))).sort(),
    []
  );

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = projects.filter((p) => {
      if (active && !p.stack.includes(active)) return false;
      if (liveOnly && p.status !== "live") return false;
      if (q) {
        const hay = `${p.title} ${p.summary} ${p.tag} ${p.stack.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    return list.sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title);
      const diff = Number(a.year) - Number(b.year);
      return sort === "newest" ? -diff : diff;
    });
  }, [active, query, sort, liveOnly]);

  const chip = (on: boolean) =>
    `mono text-[12px] px-3.5 py-2 rounded-md border transition-colors ${
      on ? "border-signal text-signal bg-panel" : "border-line text-mute hover:text-signal"
    }`;

  return (
    <section id="stack-filter" className="py-24 md:py-32 px-5 sm:px-8">
      <div className="mx-auto max-w-shell">
        <SectionHead
          kicker="~/projects --filter"
          heading="Cari project berdasarkan teknologi."
          body="Filter stack, cari kata kunci, atau urutkan. Klik kartu untuk melihat detail."
        />

        <Reveal>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="cari judul, deskripsi, atau stack..."
              className="mono text-[13px] flex-1 px-4 py-2.5 rounded-md border border-line bg-panel outline-none focus:border-signal"
            />
            <div className="flex gap-2">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="mono text-[12px] px-3 py-2 rounded-md border border-line bg-panel text-mute outline-none"
              >
                <option value="newest">terbaru</option>
                <option value="oldest">terlama</option>
                <option value="title">judul A-Z</option>
              </select>
              <button onClick={() => setLiveOnly((v) => !v)} className={chip(liveOnly)}>
                ● live saja
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 mb-10">
            <button onClick={() => setActive(null)} className={chip(active === null)}>
              semua ({projects.length})
            </button>
            {allStack.map((s) => {
              const count = projects.filter((p) => p.stack.includes(s)).length;
              return (
                <button
                  key={s}
                  onClick={() => setActive(active === s ? null : s)}
                  className={chip(active === s)}
                >
                  {s} <span className="opacity-60">· {count}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mb-8">
          <p className="mono text-[11px] text-mute mb-2">
            menampilkan {shown.length} dari {projects.length} project
          </p>
          <div className="h-[3px] w-full rounded-full bg-line overflow-hidden">
            <motion.div
              className="h-full bg-signal"
              initial={false}
              animate={{ width: `${(shown.length / projects.length) * 100}%` }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {shown.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                onClick={() => setOpenSlug(openSlug === p.slug ? null : p.slug)}
                className={`group relative h-full cursor-pointer overflow-hidden rounded-lg border bg-panel p-6 transition-colors ${
                  openSlug === p.slug ? "border-signal/60" : "border-line hover:border-signal/40"
                }`}
              >
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-signal via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-signal/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <div className="flex items-center justify-between mb-1">
                  <h3 className="display font-semibold">{p.title}</h3>
                  <span className={`mono text-[11px] flex items-center gap-2 ${p.status === "live" ? "text-signal" : "text-mute"}`}>
                    {p.status === "live" && (
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
                      </span>
                    )}
                    {p.status === "live" ? "live" : "wip"}
                  </span>
                </div>
                <div className="mono text-[11px] text-mute mb-3">
                  {p.tag} · {p.year}
                </div>
                <p className="text-mute text-[14px] leading-relaxed mb-4">{p.summary}</p>
                <AnimatePresence initial={false}>
                  {openSlug === p.slug && (
                    <motion.div
                      key="detail"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-[14px] leading-relaxed mb-4 pt-3 border-t border-line">
                        {p.description}
                      </p>
                      <a
                        href={p.repo === "private" ? undefined : p.repo}
                        onClick={(e) => e.stopPropagation()}
                        className="mono text-[12px] text-signal hover:underline inline-block mb-4"
                      >
                        {p.repo === "private" ? "repo: private" : "lihat repo →"}
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className={`mono text-[11px] px-2 py-1 rounded border ${
                        s === active ? "border-signal text-signal" : "border-line text-mute"
                      }`}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {shown.length === 0 && (
          <p className="mono text-[12px] text-mute">Tidak ada project yang cocok dengan filter ini.</p>
        )}
      </div>
    </section>
  );
}
