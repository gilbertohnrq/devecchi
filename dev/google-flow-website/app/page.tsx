import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
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
      <OverviewSection />
      <FilmmakersSection />
      <PricingSection />
      <FAQSection />
      <Footer />
    </main>
  )
}
