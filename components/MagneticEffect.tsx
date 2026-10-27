"use client";

import { useEffect } from "react";

// Tombol & link bergaya mono di dalam <main> tertarik pelan ke arah kursor.
// Memakai properti CSS `translate` supaya tidak bentrok dengan transform (scale/hover) bawaan.
export default function MagneticEffect() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const SEL = "main button.mono, main a.mono";
    let cur: HTMLElement | null = null;

    const release = (el: HTMLElement) => {
      el.style.translate = "";
      el.style.transition = "translate 0.45s cubic-bezier(0.22,1,0.36,1)";
    };
    const move = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.(SEL) as HTMLElement | null;
      if (cur && cur !== el) release(cur);
      cur = el;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * 0.22;
      const dy = (e.clientY - (r.top + r.height / 2)) * 0.3;
      el.style.transition = "translate 0.1s ease-out";
      el.style.translate = `${dx}px ${dy}px`;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return null;
}
