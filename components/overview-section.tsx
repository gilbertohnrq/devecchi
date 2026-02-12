"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
}

const pillars = [
  {
    label: "Arquitetura Residencial",
    description:
      "Projetos pensados para rotina real, linguagem visual consistente e detalhamento tecnico que valoriza cada ambiente.",
  },
  {
    label: "Interiores Comerciais",
    description:
      "Espacos de marca que equilibram experiencia, desempenho e identidade para atendimento, exposicao e permanencia.",
  },
  {
    label: "Direcao de Design",
    description:
      "Curadoria de materialidade, composicao e narrativa visual para garantir unidade estetica do conceito a entrega.",
  },
]

export function OverviewSection() {
  const [sectionBgFailed, setSectionBgFailed] = useState(false)

  return (
    <section id="overview" className="relative px-6 py-24 md:py-32 bg-[#121212]">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeInUp} transition={{ duration: 0.6 }} className="mb-16 md:mb-20 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-normal text-[#f2f2f2] leading-relaxed max-w-3xl mx-auto text-balance">
            Projetos com identidade, funcao e atmosfera.
          </h2>
          <p className="mt-6 text-base md:text-lg text-[#a8a5a0] max-w-2xl mx-auto leading-relaxed">
            Isabella Devecchi desenvolve arquitetura e design com foco em experiencia espacial, coerencia visual e
            resultado de alto nivel.
          </p>
        </motion.div>

        <motion.div {...fadeInUp} transition={{ duration: 0.6, delay: 0.1 }} className="mb-16">
          <div className="relative w-full aspect-[16/7] rounded-2xl overflow-hidden border border-[#ffffff12]">
            {!sectionBgFailed ? (
              <Image
                src="/portfolio/arch-jg.png"
                alt="Projeto de arquitetura com ambientacao escura e iluminacao cenografica"
                fill
                className="object-cover"
                onError={() => setSectionBgFailed(true)}
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(140deg, #0f172a 0%, #1e293b 32%, #14532d 68%, #0a1620 100%)",
                }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {pillars.map((item, i) => (
            <motion.div key={item.label} {...fadeInUp} transition={{ duration: 0.5, delay: 0.15 * i }}>
              <h3 className="text-lg font-sans font-medium text-[#f2f2f2] mb-3">{item.label}</h3>
              <p className="text-sm text-[#a8a5a0] leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
