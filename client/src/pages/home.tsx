import { Navigation } from "@/components/navigation";
import { EnhancedHero } from "@/components/enhanced-hero";
import { ProjectsSection } from "@/components/projects-section";
import { ServicesSection } from "@/components/services-section";

import { SkillsSection } from "@/components/skills-section";


import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <EnhancedHero />
        <ProjectsSection />
        <ServicesSection />
        <SkillsSection />

        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
