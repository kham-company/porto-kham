"use client";

import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number; life: number };

// Jejak partikel halus mengikuti kursor, warnanya mengikuti aksen tema.
export default function CursorTrail() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c = ref.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;

    let raf = 0, last = { x: 0, y: 0 };
    const ps: P[] = [];
    let rgb = "84,224,199";
    const readColor = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue("--c-signal").trim();
      if (v) rgb = v.split(/\s+/).join(",");
    };
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize();
    readColor();

    const move = (e: PointerEvent) => {
      const d = Math.hypot(e.clientX - last.x, e.clientY - last.y);
      last = { x: e.clientX, y: e.clientY };
      const n = Math.min(3, Math.ceil(d / 14));
      for (let i = 0; i < n; i++) {
        ps.push({ x: e.clientX, y: e.clientY, vx: (Math.random() - 0.5) * 0.8, vy: (Math.random() - 0.5) * 0.8 + 0.2, life: 1 });
      }
      if (ps.length > 120) ps.splice(0, ps.length - 120);
    };
    const tick = () => {
      raf = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, c.width, c.height);
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];
        p.x += p.vx; p.y += p.vy; p.life -= 0.025;
        if (p.life <= 0) { ps.splice(i, 1); continue; }
        ctx.fillStyle = `rgba(${rgb},${p.life * 0.55})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1 + p.life * 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("resize", resize);
    window.addEventListener("theme-change", readColor);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("resize", resize);
      window.removeEventListener("theme-change", readColor);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="fixed inset-0 z-[70] pointer-events-none" />;
}
