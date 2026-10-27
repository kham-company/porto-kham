"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";

export default function LocalClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  if (!now) return <div className="h-[46px]" aria-hidden="true" />;

  const time = new Intl.DateTimeFormat("id-ID", {
    timeZone: profile.timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now);

  const hour = Number(
    new Intl.DateTimeFormat("en-GB", { timeZone: profile.timezone, hour: "2-digit", hour12: false }).format(now)
  );
  const { from, to } = profile.activeHours;
  const active = hour >= from && hour < to;

  return (
    <div className="inline-flex items-center gap-3 mono text-[12px] border border-line rounded-full px-4 py-2.5 bg-void/40">
      <span className="relative flex w-2 h-2" aria-hidden="true">
        {active && <span className="absolute inset-0 rounded-full bg-signal/60 animate-ping" />}
        <span className={`relative w-2 h-2 rounded-full ${active ? "bg-signal" : "bg-mute"}`} />
      </span>
      <span>{time.replace(/\./g, ":")} WIB</span>
      <span className="text-mute">
        {active ? "biasanya aktif sekarang" : `aktif ${String(from).padStart(2, "0")}.00–${String(to % 24).padStart(2, "0")}.00`}
      </span>
    </div>
  );
}
