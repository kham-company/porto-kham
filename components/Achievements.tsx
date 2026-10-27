"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Trophy, X } from "lucide-react";
import { toast } from "./Toast";

const LIST = [
  { id: "explorer", name: "Explorer", desc: "Kunjungi 8 section berbeda" },
  { id: "deep", name: "Deep Diver", desc: "Scroll sampai 90% halaman" },
  { id: "palette", name: "Power User", desc: "Buka Command Palette (Ctrl+K)" },
  { id: "theme", name: "Dark/Light", desc: "Ganti tema" },
  { id: "konami", name: "Old School", desc: "↑↑↓↓←→←→BA" },
  { id: "night", name: "Night Owl", desc: "Buka di atas jam 00:00" },
] as const;
type Id = (typeof LIST)[number]["id"];
const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
const KEY = "achievements";

export default function Achievements() {
  const [got, setGot] = useState<Id[]>([]);
  const [open, setOpen] = useState(false);
  const gotRef = useRef<Id[]>([]);
  const seen = useRef(new Set<string>());

  function unlock(id: Id) {
    if (gotRef.current.includes(id)) return;
    gotRef.current = [...gotRef.current, id];
    setGot(gotRef.current);
    try { localStorage.setItem(KEY, JSON.stringify(gotRef.current)); } catch {}
    const a = LIST.find((x) => x.id === id);
    if (a) toast(`🏆 ${a.name} terbuka`);
  }

  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) ?? "[]") as Id[];
      gotRef.current = raw.filter((x) => LIST.some((l) => l.id === x));
      setGot(gotRef.current);
    } catch {}
    if (new Date().getHours() < 5) unlock("night");

    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) {
          seen.current.add(e.target.id);
          if (seen.current.size >= 8) unlock("explorer");
        }
      }),
      { threshold: 0.4 }
    );
    document.querySelectorAll("main section[id]").forEach((s) => io.observe(s));

    let buf: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") unlock("palette");
      if (e.key === "/") unlock("palette");
      buf = [...buf, e.key.length === 1 ? e.key.toLowerCase() : e.key].slice(-KONAMI.length);
      if (buf.join() === KONAMI.join()) unlock("konami");
    };
    const onScroll = () => {
      const d = document.documentElement;
      if ((window.scrollY + window.innerHeight) / d.scrollHeight > 0.9) unlock("deep");
    };
    const onTheme = () => unlock("theme");
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("theme-change", onTheme);
    return () => {
      io.disconnect();
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("theme-change", onTheme);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Buka achievements"
        className="fixed bottom-5 left-5 z-40 mono text-[11px] flex items-center gap-2 px-3 py-2 rounded-full border border-line bg-panel/90 backdrop-blur hover:border-signal/50"
      >
        <Trophy size={13} className="text-gold" /> {got.length}/{LIST.length}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-void/70 backdrop-blur-sm flex items-center justify-center p-5"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 16, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 16, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md border border-line rounded-2xl bg-panel p-6"
              role="dialog" aria-label="Achievements"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="display font-medium">Achievements</div>
                <button onClick={() => setOpen(false)} aria-label="Tutup"><X size={16} /></button>
              </div>
              <ul className="space-y-2">
                {LIST.map((a) => {
                  const ok = got.includes(a.id);
                  return (
                    <li key={a.id} className={`border rounded-xl px-4 py-3 ${ok ? "border-signal/40" : "border-line opacity-60"}`}>
                      <div className="text-sm font-medium">{ok ? "🏆" : "🔒"} {a.name}</div>
                      <div className="mono text-[11px] text-mute">{a.desc}</div>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
