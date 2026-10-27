"use client";

import { useRef, useState } from "react";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

const STAGES = ["lint", "test", "build", "deploy", "health-check"];
type S = "idle" | "run" | "ok" | "fail" | "skip" | "rolled";

export default function DeployPipeline() {
  const [st, setSt] = useState<S[]>(STAGES.map(() => "idle"));
  const [failAt, setFailAt] = useState<number>(-1);
  const [log, setLog] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [version, setVersion] = useState("v2.0.0");
  const runRef = useRef(0);

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  const push = (m: string) => setLog((l) => [...l, m].slice(-12));

  async function run() {
    if (busy) return;
    const id = ++runRef.current;
    setBusy(true);
    setLog([]);
    setSt(STAGES.map(() => "idle"));
    const next = `v2.0.${Number(version.split(".")[2]) + 1}`;
    push(`$ git push origin main  # ${next}`);
    for (let i = 0; i < STAGES.length; i++) {
      if (id !== runRef.current) return;
      setSt((s) => s.map((x, j) => (j === i ? "run" : x)));
      push(`▶ ${STAGES[i]}…`);
      await sleep(800);
      if (i === failAt) {
        setSt((s) => s.map((x, j) => (j === i ? "fail" : j > i ? "skip" : x)));
        push(`✖ ${STAGES[i]} gagal`);
        if (i >= 3) {
          await sleep(600);
          setSt((s) => s.map((x, j) => (j === 3 ? "rolled" : x)));
          push(`↺ rollback ke ${version} (pm2 reload)`);
        } else push("pipeline dihentikan, produksi tidak tersentuh");
        setBusy(false);
        return;
      }
      setSt((s) => s.map((x, j) => (j === i ? "ok" : x)));
      push(`✔ ${STAGES[i]}`);
    }
    setVersion(next);
    push(`🚀 ${next} live`);
    setBusy(false);
  }

  const cls: Record<S, string> = {
    idle: "border-line text-mute",
    run: "border-signal text-signal animate-pulse",
    ok: "border-signal/50 text-signal bg-signal/10",
    fail: "border-ember text-ember bg-ember/10",
    skip: "border-line text-mute opacity-40",
    rolled: "border-gold text-gold bg-gold/10",
  };

  return (
    <section id="pipeline" className="py-24 md:py-32 px-5 sm:px-8">
      <div className="mx-auto max-w-shell">
        <SectionHead
          kicker="~/deploy_pipeline.sh"
          heading="Pipeline deploy dengan rollback otomatis."
          body="Pilih tahap yang ingin digagalkan, lalu jalankan. Gagal sebelum deploy menghentikan pipeline; gagal setelahnya memicu rollback ke versi sebelumnya."
        />
        <Reveal>
          <div className="border border-line rounded-2xl bg-panel p-6 space-y-6">
            <div className="flex flex-wrap items-center gap-2 mono text-[12px] text-mute">
              gagalkan di:
              {[-1, ...STAGES.map((_, i) => i)].map((i) => (
                <button key={i} disabled={busy} onClick={() => setFailAt(i)} className={`px-3 py-1 rounded-full border transition ${failAt === i ? "border-ember text-ember bg-ember/10" : "border-line hover:bg-panel2"}`}>
                  {i === -1 ? "tidak ada" : STAGES[i]}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {STAGES.map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`mono text-[12px] px-3 py-2 rounded-lg border transition ${cls[st[i]]}`}>{s}{st[i] === "rolled" ? " ↺" : ""}</div>
                  {i < STAGES.length - 1 && <span className="text-mute">→</span>}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <button onClick={run} disabled={busy} className="mono text-[13px] px-5 py-2.5 rounded-lg border border-signal/40 text-signal hover:bg-signal/10 active:scale-95 disabled:opacity-40 transition">{busy ? "berjalan…" : "git push"}</button>
              <span className="mono text-[12px] text-mute">produksi: <span className="text-ink">{version}</span></span>
            </div>
            <pre className="mono text-[12px] text-mute bg-panel2 rounded-lg p-4 min-h-[120px] overflow-x-auto">{log.length ? log.join("\n") : "# log kosong"}</pre>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
