"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    const startMusic = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const audio = audioRef.current;
      if (audio) {
        audio.volume = 0.35;
        audio.play().then(() => setPlaying(true)).catch(() => {});
      }
      window.removeEventListener("click", startMusic);
      window.removeEventListener("scroll", startMusic);
      window.removeEventListener("keydown", startMusic);
      window.removeEventListener("touchstart", startMusic);
    };

    window.addEventListener("click", startMusic);
    window.addEventListener("scroll", startMusic, { once: true, passive: true });
    window.addEventListener("keydown", startMusic);
    window.addEventListener("touchstart", startMusic);

    return () => {
      window.removeEventListener("click", startMusic);
      window.removeEventListener("scroll", startMusic);
      window.removeEventListener("keydown", startMusic);
      window.removeEventListener("touchstart", startMusic);
    };
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/audio/theme.mp3" loop preload="auto" />
      <button
        onClick={toggle}
        aria-label={playing ? "Matikan musik" : "Nyalakan musik"}
        className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-11 h-11 rounded-full border border-line bg-panel/80 backdrop-blur text-ink hover:border-mute transition-colors"
      >
        {playing ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </button>
    </>
  );
}
