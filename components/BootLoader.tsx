"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LINES = [
  "[ ok ] mounting /dev/portfolio",
  "[ ok ] loading llm providers: groq, openrouter",
  "[ ok ] starting agent runtime (langgraph)",
  "[ ok ] connecting telegram bot webhook",
  "[ ok ] warming up dashboard :8000",
  "[ ok ] all systems nominal",
];

// Intro boot-sequence ala terminal. Hanya sekali per sesi tab, bisa di-skip.
export default function BootLoader() {
  const [show, setShow] = useState(false);
  const [n, setN] = useState(0);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("booted") === "1"; } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) return;
    setShow(true);
    document.body.style.overflow = "hidden";
    const t = setInterval(() => setN((v) => v + 1), 260);
    return () => { clearInterval(t); document.body.style.overflow = ""; };
  }, []);

  const done = n >= LINES.length + 2;
  const close = () => {
    try { sessionStorage.setItem("booted", "1"); } catch {}
    document.body.style.overflow = "";
    setShow(false);
  };

  useEffect(() => {
    if (!show || !done) return;
    const t = setTimeout(close, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, done]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="boot"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          style={{ clipPath: "inset(0 0 0% 0)" }}
          className="fixed inset-0 z-[100] bg-void flex items-center justify-center p-6"
        >
          <div className="w-full max-w-xl mono text-[13px]">
            {LINES.slice(0, n).map((l) => (
              <div key={l} className="text-mute"><span className="text-signal">{l.slice(0, 6)}</span>{l.slice(6)}</div>
            ))}
            <div className="mt-6 h-[2px] bg-line overflow-hidden">
              <div className="h-full bg-signal transition-[width] duration-200" style={{ width: `${Math.min(100, (n / (LINES.length + 1)) * 100)}%` }} />
            </div>
            <button onClick={close} className="mt-4 text-[11px] text-mute hover:text-ink">skip ↵</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
