"use client";

import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { projects } from "@/lib/data";

// Kartu 3D: miring mengikuti kursor + sorotan cahaya yang ikut bergerak.
function TiltCard({ i, p }: { i: number; p: (typeof projects)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const glow = useTransform([mx, my], ([x, y]) =>
    `radial-gradient(380px circle at ${x}% ${y}%, rgb(var(--c-signal) / 0.18), transparent 60%)`
  );

  const move = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 14);
    rx.set((0.5 - py) * 14);
    mx.set(px * 100);
    my.set(py * 100);
  };
  const leave = () => { rx.set(0); ry.set(0); };

  return (
    <div style={{ perspective: 1000 }} className="shrink-0 w-[82vw] sm:w-[460px]">
      <motion.div
        ref={ref}
        onMouseMove={move}
        onMouseLeave={leave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative h-[380px] border border-line rounded-3xl bg-panel overflow-hidden p-7 flex flex-col justify-between"
      >
        <motion.div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: glow }} />
        <div style={{ transform: "translateZ(40px)" }} className="relative">
          <div className="display text-[72px] leading-none font-semibold text-transparent [-webkit-text-stroke:1px_rgb(var(--c-ink)/0.25)]">
            {String(i + 1).padStart(2, "0")}
          </div>
          <div className="mono text-[11px] text-signal mt-4">{p.tag} · {p.year}</div>
          <h3 className="display text-2xl font-semibold mt-1">{p.title}</h3>
          <p className="text-mute text-sm mt-3 max-w-[38ch] line-clamp-3">{p.summary}</p>
        </div>
        <div style={{ transform: "translateZ(24px)" }} className="relative flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span key={s} className="mono text-[11px] px-2.5 py-1 rounded-full border border-line text-mute">{s}</span>
          ))}
          <span className={`mono text-[11px] px-2.5 py-1 rounded-full border ${p.status === "live" ? "border-signal/50 text-signal" : "border-gold/50 text-gold"}`}>
            {p.status}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export default function Showcase() {
  const track = useRef<HTMLDivElement>(null);
  const outer = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  // Panjang geser = lebar kartu * jumlah - viewport (perkiraan, aman di semua layar).
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${Math.max(0, projects.length - 1) * 30}%`]);
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <section id="showcase" ref={outer} style={{ height: `${Math.max(2, projects.length) * 70}vh` }} className="relative hidden md:block">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="mx-auto max-w-shell w-full px-8 mb-8">
          <div className="mono text-[12px] text-signal mb-2">~/showcase</div>
          <h2 className="display font-semibold text-[clamp(1.4rem,2.6vw,2rem)]">Proyek dalam 3D — scroll untuk menggeser.</h2>
        </div>
        <motion.div ref={track} style={{ x }} className="flex gap-6 pl-[max(2rem,calc((100vw-1240px)/2))]">
          {projects.map((p, i) => <TiltCard key={p.slug} i={i} p={p} />)}
        </motion.div>
        <div className="mx-auto max-w-shell w-full px-8 mt-8">
          <div className="h-px bg-line relative">
            <motion.div style={{ scaleX: bar }} className="absolute inset-0 origin-left bg-signal" />
          </div>
        </div>
      </div>
    </section>
  );
}
