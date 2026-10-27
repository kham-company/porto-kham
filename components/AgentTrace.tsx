"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Brain, Wrench, Eye, CheckCircle2 } from "lucide-react";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

type Step = { kind: "thought" | "action" | "observation" | "answer"; text: string };
type Scenario = { id: string; prompt: string; steps: Step[] };

const SCENARIOS: Scenario[] = [
  {
    id: "report",
    prompt: "Buatin laporan penjualan bulan ini dalam bentuk XLSX",
    steps: [
      { kind: "thought", text: "User butuh file XLSX. Saya perlu data dulu, lalu generate file." },
      { kind: "action", text: "query_sales(month=current)" },
      { kind: "observation", text: "142 baris transaksi, total Rp 18.450.000" },
      { kind: "action", text: "generate_xlsx(rows=142, chart=true)" },
      { kind: "observation", text: "laporan_penjualan.xlsx (38 KB) siap" },
      { kind: "answer", text: "Laporan selesai — 142 transaksi, total Rp 18,45 jt. File saya kirim di bawah." },
    ],
  },
  {
    id: "vps",
    prompt: "Kenapa VPS saya lemot?",
    steps: [
      { kind: "thought", text: "Cek resource dulu: CPU, RAM, lalu proses terberat." },
      { kind: "action", text: "ssh_exec('uptime && free -m')" },
      { kind: "observation", text: "load 3.9 · RAM terpakai 94%" },
      { kind: "action", text: "ssh_exec('ps aux --sort=-%mem | head -3')" },
      { kind: "observation", text: "node worker.js memakai 1.4 GB (memory leak?)" },
      { kind: "answer", text: "RAM hampir penuh karena worker.js bocor memori. Saran: restart via pm2 dan pasang max_memory_restart." },
    ],
  },
  {
    id: "docs",
    prompt: "Ringkas PDF ini jadi 5 poin",
    steps: [
      { kind: "thought", text: "Ekstrak teks PDF, ringkas per bagian, gabungkan jadi 5 poin." },
      { kind: "action", text: "read_pdf(pages='all')" },
      { kind: "observation", text: "12 halaman, ±4.800 kata terbaca" },
      { kind: "action", text: "summarize(chunks=4, points=5)" },
      { kind: "observation", text: "5 poin utama tersusun" },
      { kind: "answer", text: "Ini 5 poin utamanya (ringkasan dikirim ke chat)." },
    ],
  },
];

const ICON = { thought: Brain, action: Wrench, observation: Eye, answer: CheckCircle2 };
const COLOR = { thought: "text-mute", action: "text-gold", observation: "text-signal", answer: "text-ember" };

export default function AgentTrace() {
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(0);
  const sc = SCENARIOS[active] ?? SCENARIOS[0]!;

  useEffect(() => {
    setShown(0);
    const t = setInterval(() => {
      setShown((n) => {
        if (n >= sc.steps.length) {
          clearInterval(t);
          return n;
        }
        return n + 1;
      });
    }, 900);
    return () => clearInterval(t);
  }, [active, sc.steps.length]);

  return (
    <section id="trace" className="py-24 md:py-32 px-5 sm:px-8">
      <div className="mx-auto max-w-shell">
        <SectionHead
          kicker="~/agent.trace"
          heading="Lihat cara agent berpikir, langkah demi langkah."
          body="Pola ReAct: pikir → pakai tool → baca hasil → ulangi sampai ada jawaban. Pilih skenario."
        />
        <Reveal>
          <div className="border border-line rounded-2xl bg-panel overflow-hidden">
            <div className="flex flex-wrap gap-2 p-4 border-b border-line">
              {SCENARIOS.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setActive(i)}
                  className={`mono text-[12px] px-3 py-1.5 rounded-lg border transition-colors ${
                    i === active ? "border-signal/50 text-signal bg-signal/10" : "border-line text-mute hover:text-ink"
                  }`}
                >
                  {s.id}
                </button>
              ))}
            </div>
            <div className="p-6 min-h-[340px]">
              <div className="mono text-[13px] mb-5">
                <span className="text-signal">user@telegram:~$</span> {sc.prompt}
              </div>
              <ul className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {sc.steps.slice(0, shown).map((st, i) => {
                    const Icon = ICON[st.kind];
                    return (
                      <motion.li
                        key={`${sc.id}-${i}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3 items-start"
                      >
                        <Icon size={15} className={`mt-1 shrink-0 ${COLOR[st.kind]}`} />
                        <div className="text-sm">
                          <span className={`mono text-[11px] uppercase mr-2 ${COLOR[st.kind]}`}>{st.kind}</span>
                          <span className={st.kind === "action" ? "mono text-[13px]" : ""}>{st.text}</span>
                        </div>
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </ul>
              {shown < sc.steps.length && <div className="mono text-signal mt-4 animate-blink">▍</div>}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
