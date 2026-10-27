"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "./Toast";

// Easter egg: ketik ↑↑↓↓←→←→ B A untuk mengaktifkan hujan kode. Ulangi untuk mematikan.
const SEQ = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

export default function MatrixRain() {
  const [on, setOn] = useState(false);
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let i = 0;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      i = k === SEQ[i] ? i + 1 : k === SEQ[0] ? 1 : 0;
      if (i === SEQ.length) {
        i = 0;
        setOn((v) => {
          toast(v ? "Matrix mode: off" : "Matrix mode: on");
          return !v;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!on) return;
    const c = ref.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const size = 16;
    let cols = 0, drops: number[] = [], raf = 0, last = 0;
    const resize = () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
      cols = Math.floor(c.width / size);
      drops = Array.from({ length: cols }, () => Math.random() * -50);
    };
    resize();
    window.addEventListener("resize", resize);
    const chars = "01{}[]<>/$#=+アイウエオカキクケコ";
    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (t - last < 50) return;
      last = t;
      const rgb = getComputedStyle(document.documentElement).getPropertyValue("--c-signal").trim().replace(/\s+/g, ",") || "84,224,199";
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.fillStyle = `rgb(${rgb})`;
      ctx.font = `${size}px monospace`;
      for (let x = 0; x < cols; x++) {
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x * size, drops[x] * size);
        if (drops[x] * size > c.height && Math.random() > 0.975) drops[x] = 0;
        drops[x]++;
      }
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [on]);

  if (!on) return null;
  return <canvas ref={ref} aria-hidden="true" className="fixed inset-0 z-[5] pointer-events-none opacity-30 mix-blend-screen" />;
}
