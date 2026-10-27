"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Keyboard, X } from "lucide-react";
import { shortcuts } from "@/lib/data";
import { toggleTheme } from "./ThemeToggle";

const isTyping = (t: EventTarget | null) => {
  const el = t as HTMLElement | null;
  return !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
};

export default function ShortcutsModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return setOpen(false);
      if (e.ctrlKey || e.metaKey || e.altKey || isTyping(e.target)) return;
      if (e.key === "?") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "/") {
        e.preventDefault();
        window.dispatchEvent(new Event("open-palette"));
      } else if (e.key.toLowerCase() === "t") {
        toggleTheme();
      } else if (e.key.toLowerCase() === "g") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-shortcuts", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-shortcuts", onOpen);
    };
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center px-4 bg-void/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ y: 12, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 12, scale: 0.98 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Pintasan keyboard"
            className="w-full max-w-sm rounded-2xl border border-line bg-panel shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-line">
              <div className="flex items-center gap-2 display font-semibold">
                <Keyboard size={16} className="text-signal" />
                Pintasan keyboard
              </div>
              <button onClick={() => setOpen(false)} aria-label="Tutup" className="text-mute hover:text-ink transition-colors">
                <X size={16} />
              </button>
            </div>
            <ul className="p-3">
              {shortcuts.map((s) => (
                <li key={s.label + s.keys.join("")} className="flex items-center justify-between gap-4 px-2 py-2.5">
                  <span className="text-sm text-mute">{s.label}</span>
                  <span className="flex gap-1.5">
                    {s.keys.map((k) => (
                      <kbd key={k} className="mono text-[11px] border border-line rounded-md px-2 py-0.5 bg-panel2">
                        {k}
                      </kbd>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
