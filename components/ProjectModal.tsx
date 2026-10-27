"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Github, X, CircleDot } from "lucide-react";
import { useEffect } from "react";
import type { Project } from "@/lib/data";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            aria-label="Tutup detail proyek"
            onClick={onClose}
            className="absolute inset-0 bg-void/85 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl rounded-2xl border border-line bg-panel overflow-hidden max-h-[86vh] flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-line shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-ember/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-gold/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-signal/70" />
                <span className="mono text-[11px] text-mute ml-3">
                  {project.slug}.md
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full flex items-center justify-center text-mute hover:text-ink hover:bg-void transition-colors"
                aria-label="Tutup"
              >
                <X size={15} />
              </button>
            </div>

            <div className="overflow-y-auto p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <CircleDot
                  size={13}
                  className={project.status === "live" ? "text-signal" : "text-gold"}
                />
                <span className="mono text-[11.5px] text-mute">
                  {project.status === "live" ? "berjalan di production" : "work in progress"} · {project.year}
                </span>
              </div>

              <h3 className="display font-semibold text-2xl mb-4">{project.title}</h3>
              <p className="text-mute leading-relaxed mb-7">{project.description}</p>

              <div className="mb-7">
                <h4 className="mono text-[11px] text-mute mb-3">tech stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="mono text-[11.5px] px-3 py-1.5 rounded-md border border-line bg-void"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 mono text-[12px] text-mute border-t border-line pt-5">
                <Github size={14} />
                repo: {project.repo}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
