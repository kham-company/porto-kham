"use client";

import { useEffect, useRef } from "react";

// Cursor cincin + titik. Membesar di atas elemen interaktif, dan elemen
// ber-atribut data-magnetic (atau .magnetic) akan "tertarik" ke kursor.
export default function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.documentElement.classList.add("has-custom-cursor");
    let rx = -100, ry = -100, tx = -100, ty = -100, raf = 0, scale = 1, target = 1;
    let mag: HTMLElement | null = null;

    const move = (e: MouseEvent) => {
      tx = e.clientX; ty = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${tx}px,${ty}px)`;
      const el = e.target as HTMLElement | null;
      const hot = el?.closest("a,button,[role=button],input,textarea,label");
      target = hot ? 2.2 : 1;
      const m = el?.closest<HTMLElement>("[data-magnetic]");
      if (mag && mag !== m) mag.style.transform = "";
      mag = m ?? null;
      if (mag) {
        const r = mag.getBoundingClientRect();
        const dx = (tx - (r.left + r.width / 2)) * 0.25;
        const dy = (ty - (r.top + r.height / 2)) * 0.25;
        mag.style.transition = "transform 0.15s ease-out";
        mag.style.transform = `translate(${dx}px,${dy}px)`;
      }
    };
    const leave = () => { if (mag) { mag.style.transform = ""; mag = null; } };
    const loop = () => {
      rx += (tx - rx) * 0.2; ry += (ty - ry) * 0.2; scale += (target - scale) * 0.2;
      if (ring.current) ring.current.style.transform = `translate(${rx}px,${ry}px) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <>
      <div ref={ring} aria-hidden className="fixed top-0 left-0 z-[90] pointer-events-none -ml-4 -mt-4 w-8 h-8 rounded-full border border-signal/70 mix-blend-difference" />
      <div ref={dot} aria-hidden className="fixed top-0 left-0 z-[90] pointer-events-none -ml-[3px] -mt-[3px] w-[6px] h-[6px] rounded-full bg-signal" />
    </>
  );
}
