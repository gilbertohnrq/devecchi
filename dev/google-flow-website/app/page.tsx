import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ArchitectureProjectsSection } from "@/components/architecture-projects-section"
import { DesignAutoScrollSection } from "@/components/design-auto-scroll-section"
import { OverviewSection } from "@/components/overview-section"
import { FilmmakersSection } from "@/components/filmmakers-section"
import { PricingSection } from "@/components/pricing-section"
import { FAQSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="relative bg-[#121212]">
      <Navbar />
      <HeroSection />
      <ArchitectureProjectsSection />
      <DesignAutoScrollSection />
      <OverviewSection />
      <FilmmakersSection />
      <PricingSection />
      <FAQSection />
      <Footer />
    </main>
  )
}
