"use client";

import { useEffect, useRef, useState } from "react";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

const CAPACITY = 10;
const REFILL_PER_SEC = 2;

export default function RateLimiter() {
  const [tokens, setTokens] = useState(CAPACITY);
  const [log, setLog] = useState<{ id: number; ok: boolean }[]>([]);
  const tokensRef = useRef(CAPACITY);
  const idRef = useRef(0);

  useEffect(() => {
    const t = setInterval(() => {
      tokensRef.current = Math.min(CAPACITY, tokensRef.current + REFILL_PER_SEC / 10);
      setTokens(tokensRef.current);
    }, 100);
    return () => clearInterval(t);
  }, []);

  function hit() {
    const ok = tokensRef.current >= 1;
    if (ok) {
      tokensRef.current -= 1;
      setTokens(tokensRef.current);
    }
    idRef.current += 1;
    const id = idRef.current;
    setLog((l) => [{ id, ok }, ...l].slice(0, 24));
  }

  const pct = (tokens / CAPACITY) * 100;

  return (
    <section id="limiter" className="py-24 md:py-32 px-5 sm:px-8">
      <div className="mx-auto max-w-shell">
        <SectionHead
          kicker="~/token_bucket.py"
          heading="Rate limiter token-bucket — spam tombolnya."
          body={`Kapasitas ${CAPACITY} token, isi ulang ${REFILL_PER_SEC}/detik. Request tanpa token ditolak (429), persis seperti API bot saya.`}
        />
        <Reveal>
          <div className="border border-line rounded-2xl bg-panel p-6 grid md:grid-cols-2 gap-8">
            <div>
              <div className="mono text-[12px] text-mute mb-2">
                bucket: {tokens.toFixed(1)} / {CAPACITY}
              </div>
              <div className="h-3 rounded-full bg-panel2 overflow-hidden mb-6">
                <div
                  className={`h-full transition-[width] duration-100 ${pct < 20 ? "bg-ember" : "bg-signal"}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <button
                onClick={hit}
                className="mono text-[13px] px-5 py-2.5 rounded-lg border border-signal/40 text-signal hover:bg-signal/10 active:scale-95 transition"
              >
                POST /api/chat
              </button>
            </div>
            <div className="mono text-[12px] space-y-1 min-h-[200px]" aria-live="polite">
              {log.length === 0 && <div className="text-mute">{"// belum ada request"}</div>}
              {log.map((l) => (
                <div key={l.id} className={l.ok ? "text-signal" : "text-ember"}>
                  #{l.id} {l.ok ? "200 OK" : "429 Too Many Requests"}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
