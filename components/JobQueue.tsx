"use client";

import { useEffect, useRef, useState } from "react";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

type Job = { id: number; state: "queued" | "running" | "done" | "retry" | "dead"; tries: number; left: number };

const MAX_TRIES = 3;

export default function JobQueue() {
  const [workers, setWorkers] = useState(3);
  const [failRate, setFailRate] = useState(25);
  const [jobs, setJobs] = useState<Job[]>([]);
  const idRef = useRef(0);
  const cfg = useRef({ workers, failRate });
  cfg.current = { workers, failRate };

  useEffect(() => {
    const t = setInterval(() => {
      setJobs((prev) => {
        const next = prev.map((j) => ({ ...j }));
        let running = next.filter((j) => j.state === "running").length;
        for (const j of next) {
          if (j.state === "running") {
            j.left -= 1;
            if (j.left <= 0) {
              const fail = Math.random() * 100 < cfg.current.failRate;
              if (!fail) j.state = "done";
              else if (j.tries >= MAX_TRIES) j.state = "dead";
              else j.state = "retry";
            }
          } else if (j.state === "retry") j.state = "queued";
        }
        running = next.filter((j) => j.state === "running").length;
        for (const j of next) {
          if (j.state === "queued" && running < cfg.current.workers) {
            j.state = "running";
            j.tries += 1;
            j.left = 2 + Math.floor(Math.random() * 3);
            running++;
          }
        }
        return next.slice(-40);
      });
    }, 600);
    return () => clearInterval(t);
  }, []);

  function enqueue(n: number) {
    setJobs((p) => [
      ...p,
      ...Array.from({ length: n }, () => ({ id: ++idRef.current, state: "queued" as const, tries: 0, left: 0 })),
    ].slice(-40));
  }

  const count = (s: Job["state"]) => jobs.filter((j) => j.state === s).length;
  const color: Record<Job["state"], string> = {
    queued: "bg-panel2 text-mute",
    running: "bg-signal/20 text-signal border-signal/50",
    done: "bg-signal/5 text-mute",
    retry: "bg-gold/20 text-gold",
    dead: "bg-ember/20 text-ember border-ember/50",
  };

  return (
    <section id="queue" className="py-24 md:py-32 px-5 sm:px-8">
      <div className="mx-auto max-w-shell">
        <SectionHead
          kicker="~/worker_pool.py"
          heading="Job queue dengan retry dan dead-letter."
          body="Atur jumlah worker dan tingkat gagal. Job yang gagal diulang sampai 3 kali, lalu masuk dead-letter, pola yang sama dengan antrean tugas bot saya."
        />
        <Reveal>
          <div className="border border-line rounded-2xl bg-panel p-6 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6 mono text-[12px] text-mute">
              <label className="block">
                workers: <span className="text-signal">{workers}</span>
                <input type="range" min={1} max={6} value={workers} onChange={(e) => setWorkers(+e.target.value)} className="w-full accent-[rgb(var(--c-signal))]" />
              </label>
              <label className="block">
                fail rate: <span className="text-ember">{failRate}%</span>
                <input type="range" min={0} max={80} step={5} value={failRate} onChange={(e) => setFailRate(+e.target.value)} className="w-full accent-[rgb(var(--c-ember))]" />
              </label>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => enqueue(1)} className="mono text-[13px] px-4 py-2 rounded-lg border border-signal/40 text-signal hover:bg-signal/10 active:scale-95 transition">+ 1 job</button>
              <button onClick={() => enqueue(10)} className="mono text-[13px] px-4 py-2 rounded-lg border border-line text-ink hover:bg-panel2 active:scale-95 transition">burst 10 job</button>
              <button onClick={() => setJobs([])} className="mono text-[13px] px-4 py-2 rounded-lg border border-line text-mute hover:bg-panel2 transition">reset</button>
            </div>
            <div className="mono text-[12px] text-mute flex flex-wrap gap-x-5 gap-y-1">
              <span>queued {count("queued") + count("retry")}</span>
              <span className="text-signal">running {count("running")}</span>
              <span>done {count("done")}</span>
              <span className="text-ember">dead-letter {count("dead")}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 min-h-[88px]">
              {jobs.length === 0 && <span className="mono text-[12px] text-mute">antrean kosong — tambah job di atas.</span>}
              {jobs.map((j) => (
                <div key={j.id} title={`job #${j.id} · ${j.state} · try ${j.tries}`} className={`mono text-[10px] w-10 h-10 rounded-md border border-line flex flex-col items-center justify-center transition-colors ${color[j.state]}`}>
                  <span>#{j.id}</span>
                  <span className="opacity-70">{j.tries > 0 ? `t${j.tries}` : "·"}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
