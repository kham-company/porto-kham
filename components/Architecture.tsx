"use client";

import { useState } from "react";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

const nodes = [
  { id: "user", label: "User", sub: "Telegram", desc: "User kirim pesan atau perintah lewat chat Telegram." },
  { id: "bot", label: "Bot Handler", sub: "python-telegram-bot", desc: "Menerima update, validasi, lalu meneruskan ke agent." },
  { id: "agent", label: "AI Agent", sub: "LangGraph", desc: "Memutuskan langkah: jawab langsung, pakai tool, atau generate file." },
  { id: "llm", label: "LLM", sub: "Groq / OpenRouter", desc: "Model bahasa untuk reasoning, dengan fallback antar provider." },
  { id: "vps", label: "VPS", sub: "Nginx + PM2", desc: "Semua service berjalan 24 jam, dijaga PM2 dan di-proxy Nginx." },
];

export default function Architecture() {
  const [active, setActive] = useState("agent");
  const current = nodes.find((n) => n.id === active)!;

  return (
    <section id="architecture" className="px-5 sm:px-8 py-20 md:py-28">
      <div className="mx-auto max-w-shell">
        <SectionHead
          kicker="~/architecture.md"
          heading="Alur kerja sebuah AI agent bot, dari pesan sampai respons."
          body="Klik tiap node untuk lihat perannya."
        />
        <Reveal>
          <div className="bg-panel border border-line rounded-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
              {nodes.map((n, i) => (
                <div key={n.id} className="flex flex-col md:flex-row items-center gap-3 flex-1">
                  <button
                    onClick={() => setActive(n.id)}
                    className={`w-full rounded-xl border p-4 text-left transition ${
                      active === n.id
                        ? "border-signal bg-signal/10"
                        : "border-line bg-panel2 hover:border-signal/40"
                    }`}
                  >
                    <div className="display font-semibold text-[15px]">{n.label}</div>
                    <div className="mono text-[11px] text-mute mt-1">{n.sub}</div>
                  </button>
                  {i < nodes.length - 1 && (
                    <span className="mono text-signal rotate-90 md:rotate-0">→</span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t border-line mono text-[13px] text-mute">
              <span className="text-signal">{current.label}</span> — {current.desc}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
