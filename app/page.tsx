"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ArchitectureProjectsSection } from "@/components/architecture-projects-section"
import { DesignAutoScrollSection } from "@/components/design-auto-scroll-section"
import { OverviewSection } from "@/components/overview-section"
import { FilmmakersSection } from "@/components/filmmakers-section"
import { PricingSection } from "@/components/pricing-section"
import { FAQSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import type { PortfolioMode } from "@/lib/portfolio-mode"

export default function Page() {
  const [mode, setMode] = useState<PortfolioMode>("arquitetura")

  return (
    <main className="relative isolate min-h-screen">
      <div
        className={`fixed inset-0 -z-10 pointer-events-none transition-opacity duration-700 ${
          mode === "arquitetura" ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(120% 80% at 50% -12%, rgba(110,137,158,0.22) 0%, rgba(18,28,38,0.88) 46%, #090b0e 100%)",
        }}
      />
      <div
        className={`fixed inset-0 -z-10 pointer-events-none transition-opacity duration-700 ${
          mode === "design" ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(120% 80% at 50% -12%, rgba(183,110,210,0.24) 0%, rgba(58,35,87,0.84) 44%, #0b0811 100%)",
        }}
      />

      <div className="relative z-10">
        <Navbar mode={mode} onModeChange={setMode} />
        <HeroSection mode={mode} />

        <ArchitectureProjectsSection mode={mode} />
        <DesignAutoScrollSection mode={mode} />

        {mode === "arquitetura" && <OverviewSection />}

        <FilmmakersSection mode={mode} />
        <PricingSection mode={mode} />
        <FAQSection />
        <Footer />
      </div>
    </main>
  )
}
