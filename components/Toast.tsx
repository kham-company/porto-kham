"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

// Panggil dari komponen client mana pun: toast("Tersalin!")
export function toast(message: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("toast", { detail: message }));
}

type Item = { id: number; msg: string };

export default function Toast() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    let counter = 0;
    const onToast = (e: Event) => {
      const id = ++counter;
      const msg = String((e as CustomEvent).detail ?? "");
      setItems((v) => [...v.slice(-2), { id, msg }]);
      setTimeout(() => setItems((v) => v.filter((i) => i.id !== id)), 2200);
    };
    window.addEventListener("toast", onToast);
    return () => window.removeEventListener("toast", onToast);
  }, []);

  return (
    <div
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[90] flex flex-col items-center gap-2 pointer-events-none"
      role="status"
      aria-live="polite"
    >
      <AnimatePresence>
        {items.map((i) => (
          <motion.div
            key={i.id}
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 mono text-[12px] px-4 py-2.5 rounded-full border border-line bg-panel/90 backdrop-blur shadow-xl"
          >
            <Check size={13} className="text-signal" />
            {i.msg}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
