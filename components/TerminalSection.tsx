"use client";

import { useEffect, useRef, useState } from "react";
import { about, profile, projects, skills } from "@/lib/data";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

type Line = { kind: "in" | "out"; text: string };

const help = "perintah: help, whoami, skills, projects, contact, neofetch, date, clear";

function run(cmd: string): string[] | "clear" {
  switch (cmd.trim().toLowerCase()) {
    case "":
      return [];
    case "help":
      return [help];
    case "whoami":
      return [`${profile.name} — ${profile.role}`, ...about.fields.map((f) => `${f.k}: ${f.v}`)];
    case "skills":
      return skills.groups.map((g) => `${g.title}: ${g.items.join(", ")}`);
    case "projects":
      return projects.map((p, i) => `${i + 1}. ${p.title} [${p.status}]`);
    case "contact":
      return [`email: ${profile.email}`, `status: ${profile.status}`];
    case "neofetch":
      return [`${profile.handle}`, `os: Linux (VPS)`, `shell: bash`, `stack: Python / Node.js`, `uptime: tidur`];
    case "date":
      return [new Date().toLocaleString("id-ID")];
    case "clear":
      return "clear";
    case "sudo rm -rf /":
      return ["nice try :)"];
    default:
      return [`command not found: ${cmd}. ketik 'help'`];
  }
}

export default function TerminalSection() {
  const [lines, setLines] = useState<Line[]>([{ kind: "out", text: `selamat datang. ${help}` }]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [idx, setIdx] = useState(-1);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight });
  }, [lines]);

  const submit = () => {
    const out = run(value);
    setHistory((h) => (value.trim() ? [value, ...h] : h));
    setIdx(-1);
    if (out === "clear") setLines([]);
    else setLines((l) => [...l, { kind: "in", text: value }, ...out.map((t) => ({ kind: "out" as const, text: t }))]);
    setValue("");
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") submit();
    if (e.key === "ArrowUp" && history.length) {
      const n = Math.min(idx + 1, history.length - 1);
      setIdx(n);
      setValue(history[n]);
    }
    if (e.key === "ArrowDown") {
      const n = idx - 1;
      setIdx(n);
      setValue(n >= 0 ? history[n] : "");
    }
  };

  return (
    <section id="terminal" className="px-5 sm:px-8 py-20 md:py-28">
      <div className="mx-auto max-w-shell">
        <SectionHead
          kicker="~/terminal"
          heading="Coba terminal interaktif — ketik 'help' untuk mulai."
          body={`Kenalan lewat command line. Kontak: ${profile.email}`}
        />
        <Reveal>
          <div className="bg-panel border border-line rounded-2xl overflow-hidden">
            <div className="flex gap-2 px-4 py-3 border-b border-line">
              <span className="h-3 w-3 rounded-full bg-ember/80" />
              <span className="h-3 w-3 rounded-full bg-gold/80" />
              <span className="h-3 w-3 rounded-full bg-signal/80" />
            </div>
            <div
              ref={boxRef}
              onClick={() => document.getElementById("term-input")?.focus()}
              className="mono text-[13px] p-5 h-[320px] overflow-y-auto space-y-1"
            >
              {lines.map((l, i) => (
                <div key={i} className={l.kind === "in" ? "text-signal" : "text-ink/80"}>
                  {l.kind === "in" ? `$ ${l.text}` : l.text}
                </div>
              ))}
              <div className="flex gap-2 text-signal">
                <span>$</span>
                <input
                  id="term-input"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={onKey}
                  autoComplete="off"
                  spellCheck={false}
                  className="flex-1 bg-transparent outline-none text-ink"
                  aria-label="terminal input"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
