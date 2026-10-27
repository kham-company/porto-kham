import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/data";
import VideoBackground from "@/components/VideoBackground";
import RobotMascot from "@/components/RobotMascot";
import BackgroundMusic from "@/components/BackgroundMusic";
import AuroraBackdrop from "@/components/AuroraBackdrop";
import AccentPicker from "@/components/AccentPicker";
import MatrixRain from "@/components/MatrixRain";
import MagneticEffect from "@/components/MagneticEffect";
import CursorTrail from "@/components/CursorTrail";
import TiltEffect from "@/components/TiltEffect";
import CursorGlow from "@/components/CursorGlow";
import ScrollUI from "@/components/ScrollUI";
import CommandPalette from "@/components/CommandPalette";
import SectionDots from "@/components/SectionDots";
import ShortcutsModal from "@/components/ShortcutsModal";
import ParticleNetwork from "@/components/ParticleNetwork";
import BootLoader from "@/components/BootLoader";
import CustomCursor from "@/components/CustomCursor";
import Toast from "@/components/Toast";
import Achievements from "@/components/Achievements";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: hero_description(),
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: hero_description(),
    type: "website",
    locale: "id_ID",
  },
};

function hero_description() {
  return "Portfolio backend developer yang fokus membangun bot & AI agent, dari Telegram hingga VPS automation.";
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning className={`${display.variable} ${mono.variable} ${body.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('theme');document.documentElement.dataset.theme=t==='light'?'light':'dark'}catch(e){document.documentElement.dataset.theme='dark'}",
          }}
        />
      </head>
      <body className="text-ink antialiased">
        <VideoBackground />
        <ParticleNetwork />
        <AuroraBackdrop />
        <TiltEffect />
        <div className="grain-overlay" aria-hidden="true" />
        {children}
        <RobotMascot />
        <BackgroundMusic />
        <CursorGlow />
        <ScrollUI />
        <AccentPicker />
        <MatrixRain />
        <MagneticEffect />
        <CursorTrail />
        <CommandPalette />
        <ShortcutsModal />
        <SectionDots />
        <Toast />
        <Achievements />
        <CustomCursor />
        <BootLoader />
      </body>
    </html>
  );
}
