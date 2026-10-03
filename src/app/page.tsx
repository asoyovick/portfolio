import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";
import Hero from "@/components/sections/Hero";
import Currently from "@/components/sections/Currently";
import WhatIBuild from "@/components/sections/WhatIBuild";
import VecaiFeature from "@/components/sections/VecaiFeature";
import ChemichemiFeature from "@/components/sections/ChemichemiFeature";
import SelectedWork from "@/components/sections/SelectedWork";
import About from "@/components/sections/About";
import Gallery from "@/components/sections/Gallery";
import Notes from "@/components/sections/Notes";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Currently />
        <WhatIBuild />
        <VecaiFeature />
        <ChemichemiFeature />
        <SelectedWork />
        <About />
        <Gallery />
        <Notes />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
