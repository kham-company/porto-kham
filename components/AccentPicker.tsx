"use client";

import { useEffect, useState } from "react";
import { Palette } from "lucide-react";
import { toast } from "./Toast";

// [nama, rgb untuk tema gelap, rgb untuk tema terang]
const ACCENTS: [string, string, string][] = [
  ["Tosca", "84 224 199", "10 140 126"],
  ["Biru", "96 165 250", "37 99 235"],
  ["Violet", "167 139 250", "109 40 217"],
  ["Hijau", "134 239 172", "22 128 61"],
  ["Pink", "249 168 212", "190 24 93"],
];
const KEY = "accent-v1";

function apply(i: number) {
  const [, d, l] = ACCENTS[i];
  let el = document.getElementById("accent-style") as HTMLStyleElement | null;
  if (!el) {
    el = document.createElement("style");
    el.id = "accent-style";
    document.head.appendChild(el);
  }
  el.textContent = `:root{--c-signal:${d}}[data-theme="light"]{--c-signal:${l}}`;
  window.dispatchEvent(new Event("theme-change"));
}

export default function AccentPicker() {
  const [open, setOpen] = useState(false);
  const [cur, setCur] = useState(0);

  useEffect(() => {
    try {
      const v = Number(localStorage.getItem(KEY));
      if (Number.isInteger(v) && v > 0 && v < ACCENTS.length) {
        setCur(v);
        apply(v);
      }
    } catch {}
  }, []);

  function pick(i: number) {
    setCur(i);
    apply(i);
    try { localStorage.setItem(KEY, String(i)); } catch {}
    toast(`Aksen: ${ACCENTS[i][0]}`);
  }

  return (
    <div className="fixed bottom-5 left-5 z-50 flex items-center gap-2">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Pilih warna aksen"
        aria-expanded={open}
        className="w-11 h-11 rounded-full border border-line bg-panel/80 backdrop-blur flex items-center justify-center text-signal hover:border-mute transition"
      >
        <Palette size={18} />
      </button>
      <div className={`flex gap-2 px-3 py-2 rounded-full border border-line bg-panel/80 backdrop-blur transition-all duration-300 ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3 pointer-events-none"}`}>
        {ACCENTS.map(([name, d], i) => (
          <button
            key={name}
            onClick={() => pick(i)}
            aria-label={`Aksen ${name}`}
            className={`w-5 h-5 rounded-full transition-transform hover:scale-110 ${cur === i ? "ring-2 ring-offset-2 ring-offset-transparent ring-ink/70" : ""}`}
            style={{ background: `rgb(${d})` }}
          />
        ))}
      </div>
    </div>
  );
}
