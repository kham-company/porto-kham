"use client";

import { motion } from "framer-motion";

// Reveal huruf-per-huruf dengan mask. Kata tetap utuh sehingga wrap teks rapi.
// `highlight` = frasa yang diberi kelas gradient (cocokkan per kata).
export default function SplitText({
  text,
  highlight,
  delay = 0,
  stagger = 0.018,
  inView = false,
}: {
  text: string;
  highlight?: string;
  delay?: number;
  stagger?: number;
  inView?: boolean;
}) {
  const hl = new Set((highlight ?? "").split(" ").filter(Boolean));
  const words = text.split(" ");
  let idx = 0;

  const anim = inView
    ? { whileInView: { y: "0%" }, viewport: { once: true, margin: "-60px" } }
    : { animate: { y: "0%" } };

  return (
    <span aria-label={text}>
      {words.map((w, wi) => (
        <span key={wi} aria-hidden className="inline-block whitespace-nowrap">
          <span className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
            {Array.from(w).map((ch, ci) => {
              const d = delay + idx++ * stagger;
              return (
                <motion.span
                  key={ci}
                  initial={{ y: "110%" }}
                  {...anim}
                  transition={{ duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] }}
                  className={`inline-block ${hl.has(w) ? "text-gradient" : ""}`}
                >
                  {ch}
                </motion.span>
              );
            })}
          </span>
          {wi < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}
