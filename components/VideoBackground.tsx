"use client";

export default function VideoBackground() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden bg-void">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/bg.mp4" type="video/mp4" />
      </video>
      {/* overlay gelap supaya teks tetap kebaca di atas video */}
      <div className="absolute inset-0 bg-void/75 theme-overlay" aria-hidden="true" />
      <div className="absolute inset-0 bg-noise-radial" aria-hidden="true" />
    </div>
  );
}
