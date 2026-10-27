"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, RotateCcw, Send } from "lucide-react";
import { demo } from "@/lib/data";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

type Msg = { id: number; from: "bot" | "me"; text: string };

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function BotDemo() {
  const idRef = useRef(0);
  const mounted = useRef(true);
  const scroller = useRef<HTMLDivElement>(null);
  const [msgs, setMsgs] = useState<Msg[]>([{ id: 0, from: "bot", text: demo.intro }]);
  const [typing, setTyping] = useState(false);
  const [used, setUsed] = useState<string[]>([]);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  // Scroll hanya di dalam kotak chat, bukan seluruh halaman.
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  const push = (from: Msg["from"], text: string) =>
    setMsgs((m) => [...m, { id: ++idRef.current, from, text }]);

  const run = async (c: (typeof demo.commands)[number]) => {
    if (typing) return;
    push("me", c.cmd);
    setUsed((u) => (u.includes(c.cmd) ? u : [...u, c.cmd]));
    setTyping(true);
    for (const line of c.reply) {
      await wait(650);
      if (!mounted.current) return;
      push("bot", line);
    }
    if (mounted.current) setTyping(false);
  };

  const reset = () => {
    if (typing) return;
    idRef.current = 0;
    setMsgs([{ id: 0, from: "bot", text: demo.intro }]);
    setUsed([]);
  };

  return (
    <section id="demo" className="py-24 md:py-32 px-5 sm:px-8">
      <div className="mx-auto max-w-shell">
        <SectionHead kicker={demo.kicker} heading={demo.heading} body={demo.body} />

        <Reveal className="max-w-md">
          <div className="rounded-3xl border border-line bg-panel overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-line bg-panel2/60">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-signal/15 text-signal flex items-center justify-center">
                  <Bot size={17} />
                </span>
                <div>
                  <div className="text-sm font-semibold leading-tight">{demo.botName}</div>
                  <div className="mono text-[10.5px] text-signal">{typing ? "mengetik…" : "online"}</div>
                </div>
              </div>
              <button
                onClick={reset}
                disabled={typing}
                aria-label="Ulangi percakapan"
                className="p-2 rounded-lg text-mute hover:text-ink hover:bg-panel2 transition-colors disabled:opacity-40"
              >
                <RotateCcw size={15} />
              </button>
            </div>

            <div ref={scroller} className="h-72 overflow-y-auto px-4 py-4 space-y-2" aria-live="polite">
              <AnimatePresence initial={false}>
                {msgs.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.22 }}
                    className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] px-3.5 py-2 text-[13.5px] leading-snug rounded-2xl ${
                        m.from === "me"
                          ? "bg-ink text-void rounded-br-md mono"
                          : "bg-panel2 text-ink rounded-bl-md"
                      }`}
                    >
                      {m.text}
                    </div>
                  </motion.div>
                ))}
                {typing && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-panel2 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1" aria-label="Bot sedang mengetik">
                      {[0, 1, 2].map((d) => (
                        <span
                          key={d}
                          className="w-1.5 h-1.5 rounded-full bg-mute animate-pulse"
                          style={{ animationDelay: `${d * 160}ms` }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="border-t border-line p-3 flex flex-wrap gap-2">
              {demo.commands.map((c) => (
                <button
                  key={c.cmd}
                  onClick={() => run(c)}
                  disabled={typing}
                  className={`mono text-[12px] px-3 py-1.5 rounded-full border transition-colors disabled:opacity-40 ${
                    used.includes(c.cmd)
                      ? "border-signal/40 text-signal"
                      : "border-line text-mute hover:text-ink hover:border-mute"
                  }`}
                >
                  <Send size={10} className="inline -mt-0.5 mr-1.5" />
                  {c.cmd}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
