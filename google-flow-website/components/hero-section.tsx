"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { FlowLogoLiquid } from "@/components/flow-logo-liquid"
import type { PortfolioMode } from "@/lib/portfolio-mode"

type HeroSectionProps = {
  mode: PortfolioMode
}

export function HeroSection({ mode }: HeroSectionProps) {
  const [backgroundMode, setBackgroundMode] = useState<"video" | "image" | "gradient">("video")
  const isArchitecture = mode === "arquitetura"

  // Scroll-based fade out effect
  const { scrollY } = useScroll()
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section id="home" className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        {backgroundMode === "video" && (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/hero-bg.jpg"
            onError={() => setBackgroundMode("image")}
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>
        )}

        {backgroundMode === "image" && (
          <Image
            src="/hero-bg.jpg"
            alt=""
            fill
            className="object-cover"
            priority
            onError={() => setBackgroundMode("gradient")}
          />
        )}

        {backgroundMode === "gradient" && (
          <div
            className="absolute inset-0"
            style={{
              background: isArchitecture
                ? "radial-gradient(75% 75% at 55% 40%, #5f6f74 0%, #3f545c 34%, #153447 68%, #0a1620 100%)"
                : "radial-gradient(75% 75% at 50% 38%, #7a4f9c 0%, #5f3f7a 34%, #2e2348 68%, #120d1f 100%)",
            }}
          />
        )}
        <div className={`absolute inset-0 transition-colors duration-500 ${isArchitecture ? "bg-black/45" : "bg-black/38"}`} />
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: isArchitecture
              ? "radial-gradient(circle_at_50%_30%,transparent_0%,rgba(0,0,0,0.58)_72%)"
              : "radial-gradient(circle_at_50%_28%,rgba(101,61,143,0.12)_0%,rgba(0,0,0,0.52)_74%)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full select-none"
        >
          <h1 className="sr-only">Isabella Devecchi</h1>
          <FlowLogoLiquid />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 md:mt-20 text-lg md:text-xl text-[#e0ddd5] leading-relaxed max-w-2xl text-center text-balance"
        >
          {isArchitecture ? (
            <>
              Arquitetura, interiores e direcao de design com projetos reais,
              <br />
              narrativa visual e acabamento premium.
            </>
          ) : (
            <>
              Design de marca, interfaces e narrativas visuais para projetos reais,
              <br />
              com consistencia estetica e impacto comercial.
            </>
          )}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-14 md:mt-16 flex items-center gap-3"
        >
          <a
            href={isArchitecture ? "#portfolio-arquitetura" : "#portfolio-design"}
            className="inline-block px-8 py-3 text-sm font-medium text-[#f2f2f2] bg-[#ffffff20] backdrop-blur-sm border border-[#ffffff30] rounded-full hover:bg-[#ffffff30] transition-colors"
          >
            Ver Projetos
          </a>
          <a
            href={isArchitecture ? "#servicos" : "#portfolio"}
            className="inline-block px-8 py-3 text-sm font-medium text-[#f2f2f2] bg-transparent border border-[#ffffff30] rounded-full hover:bg-[#ffffff14] transition-colors"
          >
            {isArchitecture ? "Servicos" : "Ver Portfolio"}
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: 1.1 }}
        style={{ opacity: scrollIndicatorOpacity }}
        className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <a
          href={isArchitecture ? "#overview" : "#portfolio-design"}
          className="flex flex-col items-center gap-3 text-[#b0ada6] hover:text-[#e0ddd5] transition-colors group"
        >
          <span className="text-xs md:text-sm font-normal tracking-wide">Scroll para explorar</span>
          <div className="relative w-px h-12 md:h-14">
            <div className="absolute inset-0 bg-gradient-to-b from-[#b0ada6] via-[#b0ada6] to-transparent" />
          </div>
        </a>
      </motion.div>
    </section>
  )
}
