import { about } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 px-5 sm:px-8 bg-panel/40 border-y border-line">
      <div className="mx-auto max-w-shell">
        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-12 md:gap-16 items-start">
          <div>
            <SectionHead kicker={about.kicker} heading={about.heading} />
            <div className="space-y-4 max-w-[58ch]">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className="text-mute leading-relaxed">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.15}>
            <div className="rounded-2xl border border-line bg-panel overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-line">
                <span className="mono text-[11.5px] text-mute">profil.json</span>
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="w-2 h-2 rounded-full bg-ember/70" />
                  <span className="w-2 h-2 rounded-full bg-gold/70" />
                  <span className="w-2 h-2 rounded-full bg-signal/70" />
                </span>
              </div>
              <dl>
                {about.fields.map((f, i) => (
                  <div
                    key={f.k}
                    className={`flex items-center justify-between gap-6 px-5 py-4 ${
                      i !== about.fields.length - 1 ? "border-b border-line" : ""
                    }`}
                  >
                    <dt className="mono text-[12px] text-mute">{f.k}</dt>
                    <dd className="text-sm text-right">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
