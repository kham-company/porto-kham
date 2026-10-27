import { now } from "@/lib/data";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

export default function NowSection() {
  return (
    <section id="now" className="py-24 md:py-32 px-5 sm:px-8 bg-panel/40 border-y border-line">
      <div className="mx-auto max-w-shell">
        <SectionHead kicker={now.kicker} heading={now.heading} />

        <div className="grid md:grid-cols-3 gap-5">
          {now.items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-line bg-panel p-6">
                <div className="mono text-[11px] text-signal mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" aria-hidden="true" />
                  {it.label}
                </div>
                <h3 className="display font-semibold text-lg mb-2">{it.title}</h3>
                <p className="text-mute text-sm leading-relaxed">{it.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mono text-[11px] text-mute mt-6">terakhir diperbarui: {now.updated}</p>
      </div>
    </section>
  );
}
