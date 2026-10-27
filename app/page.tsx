import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsStrip from "@/components/StatsStrip";
import TechMarquee from "@/components/TechMarquee";
import About from "@/components/About";
import Skills from "@/components/Skills";
import FeaturedProject from "@/components/FeaturedProject";
import Projects from "@/components/Projects";
import StackFilter from "@/components/StackFilter";
import Experience from "@/components/Experience";
import LiveDashboard from "@/components/LiveDashboard";
import Architecture from "@/components/Architecture";
import TerminalSection from "@/components/TerminalSection";
import Changelog from "@/components/Changelog";
import FAQ from "@/components/FAQ";
import BotDemo from "@/components/BotDemo";
import Services from "@/components/Services";
import Process from "@/components/Process";
import ActivityHeatmap from "@/components/ActivityHeatmap";
import NowSection from "@/components/NowSection";
import LLMRouter from "@/components/LLMRouter";
import AgentTrace from "@/components/AgentTrace";
import RateLimiter from "@/components/RateLimiter";
import JobQueue from "@/components/JobQueue";
import RagPipeline from "@/components/RagPipeline";
import DeployPipeline from "@/components/DeployPipeline";
import Showcase from "@/components/Showcase";
import TextParallax from "@/components/TextParallax";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsStrip />
        <TechMarquee />
        <About />
        <Skills />
        <FeaturedProject />
        <Projects />
        <Showcase />
        <StackFilter />
        <BotDemo />
        <Services />
        <Process />
        <AgentTrace />
        <LLMRouter />
        <RateLimiter />
        <JobQueue />
        <RagPipeline />
        <DeployPipeline />
        <TextParallax />
        <Architecture />
        <LiveDashboard />
        <ActivityHeatmap />
        <Experience />
        <NowSection />
        <TerminalSection />
        <Changelog />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
