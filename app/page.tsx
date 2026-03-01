import TerminalWindow from "@/app/components/layout/TerminalWindow";
import Scanlines from "@/app/components/effects/Scanlines";
import CursorTrail from "@/app/components/effects/CursorTrail";
import CRTGlow from "@/app/components/effects/CRTGlow";
import Hero from "@/app/components/sections/Hero";
import CPStats from "@/app/components/sections/CPStats";
import DSA from "@/app/components/sections/DSA";
import Experience from "@/app/components/sections/Experience";
import TechStack from "@/app/components/sections/TechStack";
import ContactForm from "@/app/components/sections/ContactForm";

export default function Home() {
  return (
    <div className="relative">
      <CRTGlow intensity="low" className="min-h-screen">
        <TerminalWindow>
          <div className="pt-16"> {/* Add padding for fixed nav */}
            <Hero />
            <CPStats />
            <DSA />
            <Experience />
            <TechStack />
            <ContactForm />
          </div>
        </TerminalWindow>
      </CRTGlow>
      <Scanlines />
      <CursorTrail />
    </div>
  );
}
