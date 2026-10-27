import { skills } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import OrbitGalaxy from "./OrbitGalaxy";

const ringColors = ["#ff5d4d", "#e8b465", "#54e0c7", "#8993a4"];

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 px-5 sm:px-8 overflow-hidden">
      <div className="mx-auto max-w-shell">
        <SectionHead kicker={skills.kicker} heading={skills.heading} />

        <Reveal>
          <OrbitGalaxy />
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 -mt-8 mb-16">
            {skills.groups.map((g, i) => (
              <span key={g.title} className="mono text-[11px] text-mute flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: ringColors[i] }} />
                {g.title}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
          {skills.groups.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 0.07}>
              <h3 className="mono text-[12px] text-mute mb-4">{g.title}</h3>
              <div className="flex flex-wrap gap-2.5">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="mono text-[12.5px] px-3.5 py-2 rounded-md border border-line bg-panel hover:border-signal/40 hover:text-signal transition-colors cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
