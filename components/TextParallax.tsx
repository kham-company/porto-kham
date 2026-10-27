"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function Row({ text, dir, ghost }: { text: string; dir: 1 | -1; ghost?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], dir === 1 ? ["-15%", "5%"] : ["5%", "-15%"]);
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        style={{ x }}
        className={`display font-semibold whitespace-nowrap text-[clamp(3rem,11vw,9rem)] leading-[1.05] ${
          ghost ? "text-transparent [-webkit-text-stroke:1px_rgb(var(--c-ink)/0.3)]" : "text-ink/90"
        }`}
      >
        {text}
      </motion.div>
    </div>
  );
}

export default function TextParallax() {
  return (
    <div aria-hidden className="py-10 md:py-16 select-none">
      <Row text="BOTS · AGENTS · BACKEND · " dir={1} />
      <Row text="SHIP · BREAK · FIX · REPEAT · " dir={-1} ghost />
    </div>
  );
}
