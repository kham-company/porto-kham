"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, CornerDownLeft } from "lucide-react";
import { nav, navExtra, profile, projects } from "@/lib/data";
import { toggleTheme } from "./ThemeToggle";
import { toast } from "./Toast";

type Cmd = { id: string; label: string; hint: string; run: () => void };

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = () => {
    setOpen(false);
    setQ("");
    setSel(0);
  };

  const cmds: Cmd[] = useMemo(
    () => [
      ...[...nav, ...navExtra].map((n) => ({
        id: n.href,
        label: n.label,
        hint: `cd ${n.cmd}`,
        run: () => (window.location.hash = n.href),
      })),
      ...projects.map((p) => ({
        id: p.slug,
        label: p.title,
        hint: "buka proyek",
        run: () => {
          window.location.hash = "#projects";
          setTimeout(() => window.dispatchEvent(new CustomEvent("open-project", { detail: p.slug })), 350);
        },
      })),
      {
        id: "toggle-theme",
        label: "Ganti tema (gelap / terang)",
        hint: "theme --toggle",
        run: () => toggleTheme(),
      },
      {
        id: "copy-email",
        label: "Salin email",
        hint: profile.email,
        run: () => {
          navigator.clipboard?.writeText(profile.email);
          toast("Email tersalin");
        },
      },
      {
        id: "shortcuts",
        label: "Pintasan keyboard",
        hint: "keys --help",
        run: () => window.dispatchEvent(new Event("open-shortcuts")),
      },
    ],
    []
  );

  const list = cmds.filter((c) => (c.label + c.hint).toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") close();
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const exec = (c?: Cmd) => {
    if (!c) return;
    close();
    c.run();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-start justify-center pt-[18vh] px-4 bg-void/70 backdrop-blur-sm"
          onClick={close}
        >
          <motion.div
            initial={{ y: -12, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -12, scale: 0.98 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl border border-line bg-panel overflow-hidden shadow-2xl"
            role="dialog"
            aria-label="Command palette"
          >
            <div className="flex items-center gap-3 px-4 border-b border-line">
              <Search size={15} className="text-mute" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setSel(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setSel((s) => Math.min(s + 1, list.length - 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setSel((s) => Math.max(s - 1, 0));
                  } else if (e.key === "Enter") exec(list[sel]);
                }}
                placeholder="ketik perintah atau nama proyek…"
                className="flex-1 bg-transparent py-4 mono text-sm outline-none placeholder:text-mute"
              />
              <kbd className="mono text-[10px] text-mute border border-line rounded px-1.5 py-0.5">esc</kbd>
            </div>
            <ul className="max-h-72 overflow-y-auto p-2">
              {list.length === 0 && <li className="mono text-xs text-mute px-3 py-4">tidak ada hasil</li>}
              {list.map((c, i) => (
                <li key={c.id}>
                  <button
                    onMouseEnter={() => setSel(i)}
                    onClick={() => exec(c)}
                    className={`w-full flex items-center justify-between gap-4 px-3 py-2.5 rounded-lg text-left transition-colors ${
                      i === sel ? "bg-panel2" : ""
                    }`}
                  >
                    <span className="text-sm">{c.label}</span>
                    <span className="mono text-[11px] text-mute flex items-center gap-2 truncate">
                      {c.hint}
                      {i === sel && <CornerDownLeft size={11} />}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
