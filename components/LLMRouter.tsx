"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

type Provider = { id: string; name: string; latency: number; failRate: number };
type Hop = { id: string; ok: boolean; ms: number };

const PROVIDERS: Provider[] = [
  { id: "groq", name: "Groq", latency: 320, failRate: 0.35 },
  { id: "openrouter", name: "OpenRouter", latency: 780, failRate: 0.25 },
  { id: "local", name: "Local fallback", latency: 1400, failRate: 0.02 },
];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function LLMRouter() {
  const [chaos, setChaos] = useState(0.35);
  const [running, setRunning] = useState(false);
  const [hops, setHops] = useState<Hop[]>([]);
  const [stats, setStats] = useState({ total: 0, ok: 0, fallback: 0 });
  const busy = useRef(false);

  async function send() {
    if (busy.current) return;
    busy.current = true;
    setRunning(true);
    setHops([]);
    let success = false;
    let used = 0;
    for (let i = 0; i < PROVIDERS.length; i++) {
      const p = PROVIDERS[i];
      if (!p) continue;
      const fail = Math.random() < Math.min(0.95, p.failRate * (chaos / 0.35)) && i < PROVIDERS.length - 1;
      const ms = Math.round(p.latency * (0.7 + Math.random() * 0.6));
      await sleep(Math.min(ms, 900));
      setHops((h) => [...h, { id: p.id, ok: !fail, ms }]);
      used = i;
      if (!fail) {
        success = true;
        break;
      }
    }
    setStats((s) => ({
      total: s.total + 1,
      ok: s.ok + (success ? 1 : 0),
      fallback: s.fallback + (used > 0 ? 1 : 0),
    }));
    setRunning(false);
    busy.current = false;
  }

  function reset() {
    setHops([]);
    setStats({ total: 0, ok: 0, fallback: 0 });
  }

  return (
    <section id="router" className="py-24 md:py-32 px-5 sm:px-8">
      <div className="mx-auto max-w-shell">
        <SectionHead
          kicker="~/router.sim"
          heading="Simulasi fallback antar provider LLM — coba sendiri."
          body="Ini versi mini dari cara bot saya bertahan waktu satu provider down. Naikkan chaos, kirim request, lihat rutenya."
        />
        <Reveal>
          <div className="grid lg:grid-cols-[1fr_260px] gap-5">
            <div className="border border-line rounded-2xl bg-panel p-6">
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-6">
                <label className="mono text-[12px] text-mute flex items-center gap-3">
                  chaos {Math.round(chaos * 100)}%
                  <input
                    type="range"
                    min={0}
                    max={0.95}
                    step={0.05}
                    value={chaos}
                    onChange={(e) => setChaos(Number(e.target.value))}
                    className="accent-signal"
                    aria-label="Tingkat chaos"
                  />
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={send}
                    disabled={running}
                    className="mono text-[12px] px-4 py-2 rounded-lg border border-signal/40 text-signal hover:bg-signal/10 disabled:opacity-40 flex items-center gap-2"
                  >
                    <Play size={12} /> kirim request
                  </button>
                  <button
                    onClick={reset}
                    aria-label="Reset"
                    className="mono text-[12px] px-3 py-2 rounded-lg border border-line text-mute hover:text-ink"
                  >
                    <RotateCcw size={12} />
                  </button>
                </div>
              </div>

              <ol className="space-y-3">
                {PROVIDERS.map((p) => {
                  const hop = hops.find((h) => h.id === p.id);
                  const tone = !hop ? "border-line text-mute" : hop.ok ? "border-signal/50 text-signal" : "border-ember/50 text-ember";
                  return (
                    <motion.li
                      key={p.id}
                      animate={{ opacity: hop ? 1 : 0.55, x: hop ? 6 : 0 }}
                      className={`flex items-center justify-between border rounded-xl px-4 py-3 mono text-[13px] ${tone}`}
                    >
                      <span>{p.name}</span>
                      <span>{!hop ? "idle" : hop.ok ? `200 OK · ${hop.ms}ms` : `503 · ${hop.ms}ms → retry`}</span>
                    </motion.li>
                  );
                })}
              </ol>
            </div>

            <div className="border border-line rounded-2xl bg-panel p-6 mono text-[12px] space-y-3">
              <div className="text-mute">// session stats</div>
              <div className="flex justify-between"><span className="text-mute">requests</span><span>{stats.total}</span></div>
              <div className="flex justify-between"><span className="text-mute">berhasil</span><span className="text-signal">{stats.ok}</span></div>
              <div className="flex justify-between"><span className="text-mute">lewat fallback</span><span className="text-gold">{stats.fallback}</span></div>
              <div className="flex justify-between">
                <span className="text-mute">success rate</span>
                <span>{stats.total ? Math.round((stats.ok / stats.total) * 100) : 100}%</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
