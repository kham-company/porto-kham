"use client";

import { useEffect } from "react";

// Efek 3D tilt + spotlight global untuk semua elemen ber-class "spotlight".
export default function TiltEffect() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let active: HTMLElement | null = null;

    const move = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.(".spotlight") as HTMLElement | null;
      if (active && active !== el) reset(active);
      active = el;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
      el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 5}deg) rotateY(${(px - 0.5) * 6}deg) translateZ(0)`;
      el.style.transition = "transform 0.12s ease-out";
    };
    const reset = (el: HTMLElement) => {
      el.style.transform = "";
      el.style.transition = "transform 0.5s cubic-bezier(0.22,1,0.36,1)";
    };
    const leave = () => { if (active) reset(active); active = null; };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);
  return null;
}
