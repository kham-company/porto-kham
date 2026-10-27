import { workflow } from "@/lib/data";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

export default function Process() {
  return (
    <section id="process" className="py-24 md:py-32 px-5 sm:px-8">
      <div className="mx-auto max-w-shell">
        <SectionHead kicker={workflow.kicker} heading={workflow.heading} />

        <div className="relative grid md:grid-cols-4 gap-8 md:gap-6">
          <div
            className="hidden md:block absolute top-[22px] left-[22px] right-[22px] h-px bg-gradient-to-r from-signal/60 via-gold/40 to-ember/60"
            aria-hidden="true"
          />
          {workflow.steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="relative">
                <div className="relative z-10 w-11 h-11 rounded-full bg-void border border-signal/60 text-signal mono text-sm flex items-center justify-center mb-5">
                  {s.n}
                </div>
                <h3 className="display font-semibold mb-2">{s.title}</h3>
                <p className="text-mute text-sm leading-relaxed mb-3 max-w-[32ch]">{s.desc}</p>
                <span className="mono text-[11px] text-gold">{s.time}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
