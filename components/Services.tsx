"use client";

import { Bot, Clock, Cpu, Server, Workflow } from "lucide-react";
import type { ComponentType } from "react";
import { services } from "@/lib/data";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

const icons: Record<string, ComponentType<{ size?: number | string; className?: string }>> = {
  bot: Bot,
  cpu: Cpu,
  server: Server,
  workflow: Workflow,
};

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 px-5 sm:px-8 bg-panel/40 border-y border-line">
      <div className="mx-auto max-w-shell">
        <SectionHead kicker={services.kicker} heading={services.heading} body={services.body} />

        <div className="grid sm:grid-cols-2 gap-5">
          {services.items.map((s, i) => {
            const Icon = icons[s.icon] ?? Bot;
            return (
              <Reveal key={s.title} delay={i * 0.07}>
                <article className="spotlight h-full rounded-2xl border border-line bg-panel p-6 sm:p-7 hover:border-mute transition-colors">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <span className="w-11 h-11 rounded-xl bg-signal/10 text-signal flex items-center justify-center">
                      <Icon size={20} />
                    </span>
                    <span className="mono text-[11px] text-mute inline-flex items-center gap-1.5 border border-line rounded-full px-2.5 py-1">
                      <Clock size={11} />
                      {s.eta}
                    </span>
                  </div>
                  <h3 className="display font-semibold text-lg mb-2">{s.title}</h3>
                  <p className="text-mute text-sm leading-relaxed mb-5">{s.desc}</p>
                  <ul className="flex flex-wrap gap-2">
                    {s.points.map((p) => (
                      <li key={p} className="mono text-[11.5px] px-2.5 py-1 rounded-md bg-panel2 text-mute">
                        {p}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
