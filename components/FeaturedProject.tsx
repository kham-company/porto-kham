import { ArrowUpRight, Github, Terminal } from "lucide-react";
import { featured } from "@/lib/data";
import Reveal from "./Reveal";

export default function FeaturedProject() {
  return (
    <section className="py-24 md:py-32 px-5 sm:px-8 bg-panel/40 border-y border-line">
      <div className="mx-auto max-w-shell">
        <Reveal className="flex items-center gap-2 mono text-[12px] text-signal mb-10">
          <Terminal size={13} />
          featured build
        </Reveal>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center">
          <Reveal>
            <div className="relative rounded-2xl border border-line bg-panel overflow-hidden aspect-[16/11]">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 20% 15%, rgba(255,93,77,0.22), transparent 55%), radial-gradient(circle at 80% 85%, rgb(var(--c-signal) / 0.2), transparent 55%), #0d0f12",
                }}
              />
              <div className="absolute inset-6 rounded-xl border border-line/70 bg-void/60 backdrop-blur-sm flex flex-col">
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-line/70">
                  <span className="w-2 h-2 rounded-full bg-ember/60" />
                  <span className="w-2 h-2 rounded-full bg-gold/60" />
                  <span className="w-2 h-2 rounded-full bg-signal/60" />
                  <span className="mono text-[10.5px] text-mute ml-2">agent.log</span>
                </div>
                <div className="flex-1 p-4 mono text-[11px] text-mute space-y-1.5 overflow-hidden leading-relaxed">
                  <p><span className="text-signal">✓</span> provider: groq — connected</p>
                  <p><span className="text-signal">✓</span> fallback: openrouter — standby</p>
                  <p><span className="text-gold">…</span> generating file: report.pdf</p>
                  <p><span className="text-signal">✓</span> dispatched to telegram chat</p>
                  <p className="text-ink/70">uptime 24d 06h — 0 crash</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mono text-[12px] text-mute mb-3">{featured.tag} · {featured.year}</div>
            <h3 className="display font-semibold text-[clamp(1.5rem,3vw,2.2rem)] mb-5 text-balance">
              {featured.title}
            </h3>
            <p className="text-mute max-w-[56ch] mb-6 leading-relaxed">{featured.description}</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {featured.stack.map((s) => (
                <span
                  key={s}
                  className="mono text-[11px] text-signal border border-signal/30 px-2.5 py-1 rounded"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 mono text-[13px] px-5 py-3 rounded-full bg-ink text-void">
                repo: {featured.repo}
                <Github size={14} />
              </span>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 mono text-[13px] px-5 py-3 rounded-full border border-line hover:border-mute transition-colors"
              >
                Tanya soal proyek ini
                <ArrowUpRight size={14} />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
