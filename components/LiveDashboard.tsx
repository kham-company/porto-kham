"use client";

import { useEffect, useState } from "react";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

const bots = [
  { name: "telegram-agent", port: 8001 },
  { name: "vps-dashboard", port: 8002 },
  { name: "elaina", port: 8003 },
  { name: "agent-termux", port: 8004 },
];

const logPool = [
  "[agent] pesan masuk dari user, routing ke LLM",
  "[groq] respon 412 token dalam 0.8s",
  "[vps] cek CPU & RAM — semua normal",
  "[pm2] restart elaina berhasil (0 error)",
  "[agent] file .pdf berhasil digenerate",
  "[nginx] 200 GET /api/status 12ms",
  "[openrouter] fallback model aktif",
  "[sqlite] backup harian selesai",
];

const rand = (min: number, max: number) => Math.round(min + Math.random() * (max - min));

function Spark({ data, color }: { data: number[]; color: string }) {
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - v}`).join(" ");
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-10">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="3" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export default function LiveDashboard() {
  const [cpu, setCpu] = useState<number[]>(Array(24).fill(30));
  const [ram, setRam] = useState<number[]>(Array(24).fill(45));
  const [logs, setLogs] = useState<string[]>([]);
  const [uptime, setUptime] = useState(0);
  const [latency, setLatency] = useState<number[]>(bots.map(() => 40));

  useEffect(() => {
    const id = setInterval(() => {
      setCpu((p) => [...p.slice(1), rand(15, 70)]);
      setRam((p) => [...p.slice(1), rand(40, 65)]);
      setUptime((u) => u + 1);
      setLatency(bots.map(() => rand(18, 90)));
      setLogs((l) => {
        const t = new Date().toLocaleTimeString("id-ID", { hour12: false });
        const line = `${t} ${logPool[rand(0, logPool.length - 1)]}`;
        return [...l.slice(-6), line];
      });
    }, 1400);
    return () => clearInterval(id);
  }, []);

  const fmt = (s: number) => {
    const base = 14 * 86400 + 7 * 3600 + 22 * 60 + s;
    return `${Math.floor(base / 86400)}d ${Math.floor((base % 86400) / 3600)}h ${Math.floor((base % 3600) / 60)}m ${base % 60}s`;
  };

  return (
    <section id="status" className="px-5 sm:px-8 py-20 md:py-28">
      <div className="mx-auto max-w-shell">
        <SectionHead
          kicker="~/status.live"
          heading="Dashboard monitoring — contoh tampilan bot yang saya jaga."
          body="Data di bawah adalah simulasi real-time untuk demo, bukan metrik server sebenarnya."
        />
        <Reveal>
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-4">
            <div className="bg-panel border border-line rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <span className="mono text-[12px] text-mute">uptime</span>
                <span className="mono text-[13px] text-signal">{fmt(uptime)}</span>
              </div>
              <div className="space-y-3 mb-6">
                {bots.map((b, i) => (
                  <div key={b.name} className="flex items-center justify-between mono text-[12.5px]">
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-signal animate-pulse" />
                      {b.name}
                      <span className="text-mute">:{b.port}</span>
                    </span>
                    <span className="text-mute">{latency[i]}ms</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="mono text-[11px] text-mute mb-1">CPU {cpu[cpu.length - 1]}%</div>
                  <Spark data={cpu} color="#54e0c7" />
                </div>
                <div>
                  <div className="mono text-[11px] text-mute mb-1">RAM {ram[ram.length - 1]}%</div>
                  <Spark data={ram} color="#e8b465" />
                </div>
              </div>
            </div>
            <div className="bg-panel border border-line rounded-2xl p-6 min-h-[260px]">
              <div className="mono text-[12px] text-mute mb-4">tail -f /var/log/bots.log</div>
              <div className="mono text-[12px] space-y-1.5 text-ink/80">
                {logs.map((l, i) => (
                  <div key={l + i} className={i === logs.length - 1 ? "text-signal" : ""}>
                    {l}
                  </div>
                ))}
                <span className="inline-block w-[7px] h-[13px] bg-signal/70 animate-blink" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
