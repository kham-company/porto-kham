"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Reaction = "idle" | "wave" | "blink" | "think" | "happy";

const messages: Record<Reaction, string> = {
  idle: "",
  wave: "Halo! 👋",
  blink: "",
  think: "Hmm...",
  happy: "Asik nih!",
};

export default function RobotMascot() {
  const [reaction, setReaction] = useState<Reaction>("idle");
  const [bump, setBump] = useState(0);

  function handleClick() {
    const pool: Reaction[] = ["wave", "blink", "think", "happy"];
    const next = pool[Math.floor(Math.random() * pool.length)];
    setReaction(next);
    setBump((b) => b + 1);
    window.setTimeout(() => setReaction("idle"), 1600);
  }

  const eyeShape =
    reaction === "blink"
      ? { scaleY: 0.1 }
      : reaction === "think"
      ? { scaleY: 0.7, x: 2 }
      : { scaleY: 1, x: 0 };

  const armRotate =
    reaction === "wave" ? [0, -25, 10, -20, 0] : reaction === "happy" ? [0, -12, 0] : 0;

  return (
    <div className="fixed bottom-5 left-5 z-50 select-none">
      <AnimatePresence>
        {messages[reaction] && (
          <motion.div
            key={bump}
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4 }}
            className="mono text-[11px] bg-panel border border-line rounded-full px-3 py-1.5 mb-2 text-ink whitespace-nowrap shadow-lg"
          >
            {messages[reaction]}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleClick}
        aria-label="Robot maskot — klik untuk interaksi"
        whileTap={{ scale: 0.92 }}
        animate={
          reaction === "think"
            ? { y: [0, -3, 0], rotate: [0, -3, 3, 0] }
            : reaction === "happy"
            ? { y: [0, -8, 0] }
            : { y: [0, -4, 0] }
        }
        transition={
          reaction === "idle"
            ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.9, ease: "easeInOut" }
        }
        className="relative w-16 h-16 drop-shadow-[0_0_14px_rgb(var(--c-signal)/0.35)]"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <radialGradient id="bodyGrad" cx="35%" cy="30%" r="80%">
              <stop offset="0%" stopColor="#2a3550" />
              <stop offset="100%" stopColor="#10141f" />
            </radialGradient>
          </defs>

          {/* left arm */}
          <motion.g
            style={{ originX: "78px", originY: "58px" }}
            animate={{ rotate: armRotate }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            <rect x="74" y="50" width="9" height="24" rx="4.5" fill="#1a2033" stroke="#54e0c7" strokeWidth="1.2" />
          </motion.g>
          {/* right arm */}
          <rect x="17" y="50" width="9" height="24" rx="4.5" fill="#1a2033" stroke="#54e0c7" strokeWidth="1.2" />

          {/* body */}
          <rect x="26" y="46" width="48" height="38" rx="16" fill="url(#bodyGrad)" stroke="#54e0c7" strokeWidth="1.4" />
          <circle cx="50" cy="68" r="7" fill="none" stroke="#54e0c7" strokeWidth="1.6" opacity="0.8" />
          <circle cx="50" cy="68" r="2.4" fill="#54e0c7" />

          {/* head */}
          <rect x="20" y="10" width="60" height="42" rx="21" fill="url(#bodyGrad)" stroke="#54e0c7" strokeWidth="1.6" />
          {/* ears */}
          <circle cx="18" cy="31" r="6" fill="#161b29" stroke="#54e0c7" strokeWidth="1.2" />
          <circle cx="82" cy="31" r="6" fill="#161b29" stroke="#54e0c7" strokeWidth="1.2" />

          {/* eyes */}
          <motion.ellipse cx="37" cy="30" rx="5" ry="6" fill="#54e0c7" animate={eyeShape} transition={{ duration: 0.25 }} />
          <motion.ellipse cx="63" cy="30" rx="5" ry="6" fill="#54e0c7" animate={eyeShape} transition={{ duration: 0.25 }} />

          {/* mouth */}
          {reaction === "happy" || reaction === "wave" ? (
            <path d="M38 40 Q50 48 62 40" stroke="#54e0c7" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          ) : (
            <path d="M40 40 Q50 44 60 40" stroke="#54e0c7" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.85" />
          )}
        </svg>
      </motion.button>
    </div>
  );
}
