import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";
import Hero from "@/components/sections/Hero";
import WhatIBuild from "@/components/sections/WhatIBuild";
import VecaiFeature from "@/components/sections/VecaiFeature";
import HowIThink from "@/components/sections/HowIThink";
import About from "@/components/sections/About";
import WhatDrivesMe from "@/components/sections/WhatDrivesMe";
import SelectedWork from "@/components/sections/SelectedWork";
import Thinking from "@/components/sections/Thinking";
import Mission from "@/components/sections/Mission";
import Contact from "@/components/sections/Contact";

/**
 * Narrative arc:
 * WHO I AM → WHAT I BUILD → HOW I THINK → WHAT I'VE BUILT →
 * WHAT DRIVES ME → WHAT'S NEXT
 */
export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <WhatIBuild />
        <VecaiFeature />
        <HowIThink />
        <About />
        <WhatDrivesMe />
        <SelectedWork />
        <Thinking />
        <Mission />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
