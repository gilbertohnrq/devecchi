"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Instagram } from "lucide-react"
import type { PortfolioMode } from "@/lib/portfolio-mode"

type NavbarProps = {
  mode: PortfolioMode
  onModeChange: (mode: PortfolioMode) => void
}

export function Navbar({ mode, onModeChange }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#121212]/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="grid grid-cols-[1fr_auto_1fr] items-center px-5 py-4 gap-4">
        <a href="#home" className="text-[#f2f2f2] text-lg font-normal tracking-normal whitespace-nowrap">
          Isabella Devecchi
        </a>

        <div className="justify-self-center flex items-center rounded-full border border-[#ffffff24] bg-[#ffffff12] p-1">
          <button
            type="button"
            onClick={() => onModeChange("arquitetura")}
            className={`px-3 py-1.5 text-xs md:text-sm rounded-full transition-colors ${
              mode === "arquitetura" ? "bg-[#ffffff2d] text-[#f2f2f2]" : "text-[#c5c2bc] hover:text-[#f2f2f2]"
            }`}
          >
            Arquitetura
          </button>
          <span className="text-[#8e8b84] text-xs px-1">·</span>
          <button
            type="button"
            onClick={() => onModeChange("design")}
            className={`px-3 py-1.5 text-xs md:text-sm rounded-full transition-colors ${
              mode === "design" ? "bg-[#ffffff2d] text-[#f2f2f2]" : "text-[#c5c2bc] hover:text-[#f2f2f2]"
            }`}
          >
            Design
          </button>
        </div>

        <div className="justify-self-end flex items-center gap-2">
          <a
            href="https://www.instagram.com/belladevecchi/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#ffffff15] transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5 text-[#f2f2f2]" />
          </a>

          <a
            href="https://www.behance.net/isabelladevecchi?locale=pt_BR"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#ffffff15] transition-colors"
            aria-label="Behance"
          >
            <Image src="/behance-icon.svg" alt="" width={18} height={18} />
          </a>
        </div>
      </nav>
    </header>
  )
}
