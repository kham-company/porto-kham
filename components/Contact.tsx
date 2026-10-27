"use client";

import { useState } from "react";
import { Check, Copy, Mail, Send } from "lucide-react";
import { contact, profile } from "@/lib/data";
import Reveal from "./Reveal";
import LocalClock from "./LocalClock";
import { toast } from "./Toast";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      toast("Email tersalin");
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const href = `mailto:${profile.email}?subject=${encodeURIComponent(
    `Halo Kham${name ? `, saya ${name}` : ""}`
  )}&body=${encodeURIComponent(msg)}`;

  const field =
    "w-full bg-void/60 border border-line rounded-xl px-4 py-3 text-sm outline-none focus:border-signal/60 transition-colors placeholder:text-mute";

  return (
    <section id="contact" className="py-24 md:py-32 px-5 sm:px-8">
      <div className="mx-auto max-w-shell">
        <div className="relative rounded-3xl border border-line bg-panel overflow-hidden px-6 py-14 sm:px-14 sm:py-20">
          <div
            className="absolute inset-0 -z-10 opacity-70"
            style={{ background: "radial-gradient(circle at 50% 0%, rgba(255,93,77,0.12), transparent 55%)" }}
            aria-hidden="true"
          />
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div className="mono text-[12px] text-signal mb-4">{contact.kicker}</div>
              <h2 className="display font-semibold text-[clamp(1.6rem,4vw,2.6rem)] max-w-[18ch] text-balance mb-5">
                {contact.heading}
              </h2>
              <p className="text-mute max-w-[46ch] mb-8">{contact.body}</p>
              <button
                onClick={copy}
                className="inline-flex items-center gap-2 mono text-[13px] px-5 py-3 rounded-full border border-line hover:border-mute transition-colors"
              >
                {copied ? <Check size={14} className="text-signal" /> : <Copy size={14} />}
                {copied ? "tersalin!" : profile.email}
              </button>
              <div className="mt-5">
                <LocalClock />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-3">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama kamu" className={field} />
                <textarea
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="Ceritakan singkat kebutuhan project-mu…"
                  rows={5}
                  className={`${field} resize-none`}
                />
                <a
                  href={href}
                  className="inline-flex items-center justify-center gap-2 w-full mono text-sm font-medium px-7 py-4 rounded-full bg-ink text-void hover:bg-signal transition-colors"
                >
                  <Mail size={16} />
                  Kirim lewat email
                  <Send size={14} />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
