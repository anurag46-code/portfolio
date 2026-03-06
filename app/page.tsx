import TerminalWindow from "@/app/components/layout/TerminalWindow";
import Scanlines from "@/app/components/effects/Scanlines";
import CursorTrail from "@/app/components/effects/CursorTrail";
import CRTGlow from "@/app/components/effects/CRTGlow";
import ScrollSpy from "@/app/components/layout/ScrollSpy";
import Hero from "@/app/components/sections/Hero";
import CPStats from "@/app/components/sections/CPStats";
import DSA from "@/app/components/sections/DSA";
import Projects from "@/app/components/sections/Projects";
import Experience from "@/app/components/sections/Experience";
import TechStack from "@/app/components/sections/TechStack";
import ContactForm from "@/app/components/sections/ContactForm";
import Footer from "@/app/components/sections/Footer";

export default function Home() {
  return (
    <div className="relative">
      <CRTGlow intensity="low" className="min-h-screen">
        <TerminalWindow>
          <div className="pt-16"> {/* Add padding for fixed nav */}
            <ScrollSpy />
            <Hero />
            <CPStats />
            <DSA />
            <Projects />
            <Experience />
            <TechStack />
            <Footer />
            <ContactForm />
          </div>
        </TerminalWindow>
      </CRTGlow>
      <Scanlines />
      <CursorTrail />
    </div>
  );
}
