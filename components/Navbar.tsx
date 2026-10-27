"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav, profile } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [active, setActive] = useState<string>("#home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = nav
      .map((item) => document.querySelector(item.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <div
          className={`flex items-center justify-between rounded-2xl border border-line px-4 sm:px-5 py-2.5 transition-colors duration-300 ${
            scrolled ? "bg-void/80 backdrop-blur-xl" : "bg-void/40 backdrop-blur-md"
          }`}
        >
          <a href="#home" className="flex items-center gap-2 group">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="w-2 h-2 rounded-full bg-ember" />
              <span className="w-2 h-2 rounded-full bg-gold" />
              <span className="w-2 h-2 rounded-full bg-signal" />
            </span>
            <span className="mono text-sm font-medium tracking-tight">
              {profile.name}
              <span className="text-mute">.dev</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1" aria-label="Navigasi utama">
            {nav.map((item) => {
              const isActive = active === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative px-3.5 py-2 mono text-[12.5px] text-mute hover:text-ink transition-colors"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-ink rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? "text-void" : ""}`}>
                    {item.label}
                  </span>
                </a>
              );
            })}
          </nav>

          <button
            onClick={() => window.dispatchEvent(new Event("open-palette"))}
            className="hidden md:flex items-center gap-2 mono text-[11px] text-mute border border-line rounded-full px-3 py-1.5 hover:text-ink hover:border-mute transition-colors"
            aria-label="Buka command palette"
          >
            <span>cari</span>
            <kbd className="text-[10px]">Ctrl K</kbd>
          </button>

          <ThemeToggle />

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden w-9 h-9 rounded-full border border-line flex items-center justify-center text-ink"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="md:hidden overflow-hidden mt-2 rounded-2xl border border-line bg-void/95 backdrop-blur-xl"
              aria-label="Navigasi mobile"
            >
              <div className="flex flex-col p-2">
                {nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="mono text-sm px-4 py-3 rounded-xl text-mute hover:text-ink hover:bg-panel transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
