import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { portfolioData } from "@/data/portfolioData";
import { resolveEmailAddress } from "@/lib/contact";

export default function Home() {
  const { profile, projects, socialLinks } = portfolioData;
  const emailAddress = resolveEmailAddress(socialLinks);

  return (
    <>
      <main className="flex-1">
        <HeroSection profile={profile} />
        <ProjectsGrid projects={projects} />
        <ContactSection
          socialLinks={socialLinks}
          emailAddress={emailAddress}
        />
      </main>
      <Footer developerName={profile.name} />
    </>
  );
}
