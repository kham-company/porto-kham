"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { hero, profile } from "@/lib/data";
import TypedRole from "./TypedRole";
import SplitText from "./SplitText";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative pt-36 pb-20 md:pt-44 md:pb-28 px-5 sm:px-8 overflow-hidden"
    >
      {/* cinematic ambient glow, parallax-ish via fixed gradient */}
      <div className="absolute inset-0 -z-10 bg-noise-radial" aria-hidden="true" />
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full -z-10 opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,93,77,0.14), rgb(var(--c-signal) / 0.08) 45%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-shell">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-[1.15fr_0.85fr] gap-14 items-center"
        >
          <div>
            <motion.div
              variants={item}
              className="flex items-center gap-2 mono text-[12.5px] text-signal mb-7"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-signal" />
              </span>
              {hero.kicker}
              <span className="inline-block w-[7px] h-[14px] bg-signal/70 animate-blink ml-0.5" />
            </motion.div>

            <motion.h1
              variants={item}
              className="display font-semibold text-balance text-[clamp(2rem,5vw,3.4rem)] leading-[1.12] max-w-[16ch] mb-7"
            >
              <SplitText text={hero.headline} highlight="tetap hidup" delay={0.25} />
            </motion.h1>

            <motion.div variants={item} className="mono text-sm mb-5 text-mute">
              {"> "}
              <TypedRole words={hero.roles} />
            </motion.div>

            <motion.p variants={item} className="text-mute text-base sm:text-lg max-w-[54ch] mb-10">
              {hero.sub}
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-3 mb-14">
              <a
                href="#projects"
                data-magnetic
                className="mono text-[13px] font-medium px-6 py-3.5 rounded-full bg-ink text-void hover:bg-signal transition-colors"
              >
                Lihat proyek
              </a>
              <a
                href="#contact"
                data-magnetic
                className="mono text-[13px] px-6 py-3.5 rounded-full border border-line text-ink hover:border-mute transition-colors"
              >
                Hubungi saya
              </a>
            </motion.div>

            <motion.div
              variants={item}
              className="grid grid-cols-3 gap-px bg-line rounded-xl overflow-hidden border border-line max-w-lg"
            >
              {hero.stats.map((s) => (
                <div key={s.label} className="bg-panel p-4">
                  <div className="mono text-[10.5px] text-mute mb-2.5 leading-snug">{s.label}</div>
                  <div className="h-1 rounded-full bg-void overflow-hidden mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.bar}%` }}
                      transition={{ duration: 1.1, delay: 0.6, ease: "easeOut" }}
                      className="h-full bg-signal"
                    />
                  </div>
                  <div className="mono text-[11px]">{s.value}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div variants={item} className="relative">
            <div className="relative aspect-[4/5] rounded-3xl border border-line overflow-hidden bg-panel">
              <img
                src="/images/hero.png"
                alt={profile.name}
                className="absolute inset-0 w-full h-full object-cover object-[center_25%]"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-void/80 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between mono text-[11px] text-mute">
                <span>{profile.role}</span>
                <span className="text-signal">{profile.status}</span>
              </div>
            </div>


            {/* chip melayang */}
            <span className="hidden sm:block absolute -left-6 top-10 mono text-[11px] px-3 py-1.5 rounded-full border border-line bg-panel/90 backdrop-blur animate-float">
              <span className="text-signal">●</span> Python
            </span>
            <span className="hidden sm:block absolute -right-5 top-1/2 mono text-[11px] px-3 py-1.5 rounded-full border border-line bg-panel/90 backdrop-blur animate-float" style={{ animationDelay: "1.4s" }}>
              <span className="text-gold">●</span> Node.js
            </span>
            <span className="hidden sm:block absolute -left-4 bottom-20 mono text-[11px] px-3 py-1.5 rounded-full border border-line bg-panel/90 backdrop-blur animate-float" style={{ animationDelay: "2.6s" }}>
              <span className="text-ember">●</span> AI Agent
            </span>

            {/* corner frame ticks for a cinematic viewfinder feel */}
            {["-top-2 -left-2 border-t border-l", "-top-2 -right-2 border-t border-r", "-bottom-2 -left-2 border-b border-l", "-bottom-2 -right-2 border-b border-r"].map(
              (pos, i) => (
                <span
                  key={i}
                  className={`absolute ${pos} w-5 h-5 border-line/60`}
                  aria-hidden="true"
                />
              )
            )}
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 items-center gap-2 mono text-[11px] text-mute hover:text-ink transition-colors"
      >
        scroll
        <ArrowDown size={13} className="animate-bounce" />
      </motion.a>
    </section>
  );
}
