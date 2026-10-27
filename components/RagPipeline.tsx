"use client";

import { useState } from "react";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

const DOCS = [
  { id: "d1", title: "Panduan deploy PM2", text: "pm2 start ecosystem.config.js restart otomatis vps nginx", },
  { id: "d2", title: "Catatan webhook Telegram", text: "telegram bot webhook token update handler async", },
  { id: "d3", title: "Fallback provider LLM", text: "llm router fallback provider timeout retry model agent", },
  { id: "d4", title: "Monitoring VPS", text: "vps monitoring alert cpu ram uptime restart server", },
  { id: "d5", title: "Rate limit API", text: "rate limit token bucket api 429 spam bot", },
  { id: "d6", title: "Memori percakapan agent", text: "agent memory konteks percakapan embedding vector", },
];

const STEPS = ["Query", "Tokenize", "Embed (sim.)", "Retrieve top-k", "Generate"];
const tok = (s: string) => s.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 2);

export default function RagPipeline() {
  const [q, setQ] = useState("bot telegram restart vps");
  const [step, setStep] = useState(0);
  const [k, setK] = useState(3);

  const qt = tok(q);
  const scored = DOCS.map((d) => {
    const dt = new Set(tok(d.text));
    const hit = qt.filter((w) => dt.has(w));
    const score = qt.length ? hit.length / Math.sqrt(qt.length * dt.size) : 0;
    return { ...d, hit, score };
  }).sort((a, b) => b.score - a.score);
  const top = scored.slice(0, k).filter((d) => d.score > 0);

  return (
    <section id="rag" className="py-24 md:py-32 px-5 sm:px-8">
      <div className="mx-auto max-w-shell">
        <SectionHead
          kicker="~/rag_pipeline.py"
          heading="Retrieval-augmented generation, langkah demi langkah."
          body="Simulasi ringan di browser: skor kemiripan dihitung dari kata yang cocok (cosine-style), bukan embedding sungguhan. Ubah query lalu lanjutkan tiap tahap."
        />
        <Reveal>
          <div className="border border-line rounded-2xl bg-panel p-6 space-y-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <input value={q} onChange={(e) => { setQ(e.target.value); setStep(0); }} className="flex-1 mono text-[13px] bg-panel2 border border-line rounded-lg px-4 py-2.5 outline-none focus:border-signal/50" placeholder="tanya sesuatu…" />
              <label className="mono text-[12px] text-mute flex items-center gap-2">
                top-k {k}
                <input type="range" min={1} max={5} value={k} onChange={(e) => setK(+e.target.value)} className="accent-[rgb(var(--c-signal))]" />
              </label>
            </div>
            <ol className="flex flex-wrap gap-2">
              {STEPS.map((s, i) => (
                <li key={s}>
                  <button onClick={() => setStep(i)} className={`mono text-[11px] px-3 py-1.5 rounded-full border transition ${i === step ? "border-signal text-signal bg-signal/10" : i < step ? "border-line text-ink" : "border-line text-mute"}`}>
                    {i + 1}. {s}
                  </button>
                </li>
              ))}
            </ol>
            <div className="mono text-[12px] min-h-[160px] space-y-2">
              {step === 0 && <p className="text-mute">Pertanyaan masuk: <span className="text-ink">“{q}”</span></p>}
              {step === 1 && <p className="text-mute">Token: {qt.length ? qt.map((t) => <span key={t} className="inline-block mr-1.5 px-1.5 rounded bg-panel2 text-signal">{t}</span>) : "—"}</p>}
              {step === 2 && (
                <div className="text-mute">
                  Vektor ({qt.length}-dim, sparse):
                  <div className="flex gap-1 mt-2 items-end h-10">
                    {qt.map((t, i) => <div key={i} title={t} className="w-4 bg-signal/60 rounded-sm" style={{ height: `${30 + ((t.length * 17) % 70)}%` }} />)}
                  </div>
                </div>
              )}
              {step >= 3 && (
                <div className="space-y-1.5">
                  {scored.map((d, i) => {
                    const picked = i < k && d.score > 0;
                    return (
                      <div key={d.id} className={`flex items-center gap-3 ${picked ? "text-ink" : "text-mute opacity-60"}`}>
                        <span className="w-44 truncate">{d.title}</span>
                        <div className="flex-1 h-2 rounded-full bg-panel2 overflow-hidden"><div className={picked ? "h-full bg-signal" : "h-full bg-line"} style={{ width: `${Math.min(100, d.score * 220)}%` }} /></div>
                        <span className="w-10 text-right">{d.score.toFixed(2)}</span>
                      </div>
                    );
                  })}
                </div>
              )}
              {step === 4 && (
                <p className="pt-3 border-t border-line text-mute">
                  {top.length
                    ? <>Konteks dari <span className="text-signal">{top.map((d) => d.title).join(", ")}</span> dikirim ke LLM bersama pertanyaan, lalu jawaban disusun berdasarkan dokumen itu.</>
                    : "Tidak ada dokumen relevan — agent menjawab “tidak tahu” alih-alih mengarang."}
                </p>
              )}
            </div>
            <div className="flex gap-3">
              <button disabled={step === 0} onClick={() => setStep((s) => s - 1)} className="mono text-[13px] px-4 py-2 rounded-lg border border-line text-mute disabled:opacity-30 hover:bg-panel2 transition">← mundur</button>
              <button disabled={step === STEPS.length - 1} onClick={() => setStep((s) => s + 1)} className="mono text-[13px] px-4 py-2 rounded-lg border border-signal/40 text-signal disabled:opacity-30 hover:bg-signal/10 transition">lanjut →</button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
