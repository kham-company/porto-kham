"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const BLOBS = [
  { c: "rgb(var(--c-signal) / 0.16)", s: 620, x: "8%", y: [0, -260], d: 22 },
  { c: "rgba(255,107,74,0.12)", s: 540, x: "68%", y: [120, -180], d: 28 },
  { c: "rgba(232,190,100,0.10)", s: 480, x: "38%", y: [300, -40], d: 34 },
];

export default function AuroraBackdrop() {
  const { scrollYProgress } = useScroll();
  const y0 = useTransform(scrollYProgress, [0, 1], BLOBS[0].y);
  const y1 = useTransform(scrollYProgress, [0, 1], BLOBS[1].y);
  const y2 = useTransform(scrollYProgress, [0, 1], BLOBS[2].y);
  const ys = [y0, y1, y2];

  return (
    <div aria-hidden="true" className="fixed inset-0 -z-[1] overflow-hidden pointer-events-none">
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          style={{ y: ys[i], left: b.x, width: b.s, height: b.s, background: `radial-gradient(circle, ${b.c}, transparent 65%)` }}
          animate={{ x: [0, 60, -40, 0], scale: [1, 1.15, 0.95, 1] }}
          transition={{ duration: b.d, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 rounded-full blur-3xl"
        />
      ))}
    </div>
  );
}
