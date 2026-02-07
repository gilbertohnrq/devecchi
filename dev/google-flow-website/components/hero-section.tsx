"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { FlowLogoLiquid } from "@/components/flow-logo-liquid"

export function HeroSection() {
  const [backgroundMode, setBackgroundMode] = useState<"video" | "image" | "gradient">("video")

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
              background:
                "radial-gradient(75% 75% at 55% 40%, #5f6f74 0%, #3f545c 34%, #153447 68%, #0a1620 100%)",
            }}
          />
        )}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent_0%,rgba(0,0,0,0.45)_72%)]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="w-full text-center text-[11px] tracking-[0.2em] uppercase text-[#d4d1cb] mb-4"
        >
          Arquitetura · Design
        </motion.p>

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
          className="mt-6 text-lg md:text-xl text-[#e0ddd5] leading-relaxed max-w-2xl text-center text-balance"
        >
          Arquitetura, interiores e direcao de design com projetos reais,
          <br />
          narrativa visual e acabamento premium.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8 flex items-center gap-3"
        >
          <a
            href="#portfolio"
            className="inline-block px-8 py-3 text-sm font-medium text-[#f2f2f2] bg-[#ffffff20] backdrop-blur-sm border border-[#ffffff30] rounded-full hover:bg-[#ffffff30] transition-colors"
          >
            Ver Projetos
          </a>
          <a
            href="#servicos"
            className="inline-block px-8 py-3 text-sm font-medium text-[#f2f2f2] bg-transparent border border-[#ffffff30] rounded-full hover:bg-[#ffffff14] transition-colors"
          >
            Servicos
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-5 text-sm text-[#b0ada6]"
        >
          Acompanhe no{" "}
          <a
            href="https://www.instagram.com/belladevecchi/"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 hover:text-[#e0ddd5] transition-colors"
          >
            Instagram
          </a>{" "}
          e veja estudos completos no{" "}
          <a
            href="https://www.behance.net/isabelladevecchi?locale=pt_BR"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 hover:text-[#e0ddd5] transition-colors"
          >
            Behance
          </a>
          .
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          style={{ opacity: scrollIndicatorOpacity }}
          className="mt-16"
        >
          <a
            href="#overview"
            className="flex flex-col items-center gap-4 text-[#b0ada6] hover:text-[#e0ddd5] transition-colors group"
          >
            <span className="text-sm font-normal tracking-wide">Scroll para explorar</span>
            <div className="relative w-px h-24">
              <div className="absolute inset-0 bg-gradient-to-b from-[#b0ada6] via-[#b0ada6] to-transparent" />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
