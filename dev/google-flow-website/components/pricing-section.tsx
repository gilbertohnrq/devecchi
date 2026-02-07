"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

type ServicePlan = {
  name: string
  stage: string
  summary: string
  deliverables: string[]
  highlighted?: boolean
}

const services: ServicePlan[] = [
  {
    name: "Projeto Arquitetonico",
    stage: "Residencial e comercial",
    summary:
      "Concepcao espacial completa, estudo de fluxo e desenvolvimento tecnico para obra, reforma ou ampliacao.",
    deliverables: [
      "Briefing e direcao de conceito",
      "Estudo preliminar + layout funcional",
      "Modelagem e apresentacao visual",
      "Detalhamento para execucao",
    ],
  },
  {
    name: "Interiores Premium",
    stage: "Curadoria de ambientes",
    summary:
      "Projeto de interiores com foco em atmosfera, ergonomia e identidade visual consistente com o perfil do cliente.",
    deliverables: [
      "Moodboard e linguagem material",
      "Marcenaria e iluminacao tecnica",
      "Especificacao de acabamentos",
      "Guia de composicao final",
    ],
    highlighted: true,
  },
  {
    name: "Direcao de Design",
    stage: "Marca e experiencia",
    summary:
      "Estrategia visual para espacos e apresentacoes de projeto com narrativa clara, impacto e refinamento estatico.",
    deliverables: [
      "Direcao artistica do projeto",
      "Padronizacao visual de entregaveis",
      "Apoio para apresentacao comercial",
      "Curadoria visual continua",
    ],
  },
]

export function PricingSection() {
  return (
    <section id="servicos" className="px-6 py-24 md:py-32 bg-[#121212]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-normal text-[#f2f2f2] text-balance">
            Servicos e escopo
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-[#a8a5a0] text-base mb-14 max-w-2xl mx-auto"
        >
          Cada projeto e estruturado de forma personalizada, com profundidade tecnica e linguagem visual sob medida.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.article
              key={service.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`rounded-2xl p-8 border ${
                service.highlighted
                  ? "border-[#ffffff36] bg-[linear-gradient(160deg,#1b1b1b_0%,#151515_100%)]"
                  : "border-[#ffffff15] bg-[#151515]"
              }`}
            >
              <p className="text-xs uppercase tracking-[0.14em] text-[#8e8b84] mb-4">{service.stage}</p>
              <h3 className="text-xl font-sans font-medium text-[#f2f2f2] mb-4">{service.name}</h3>
              <p className="text-sm text-[#c9c5be] leading-relaxed mb-7">{service.summary}</p>

              <ul className="flex flex-col gap-3">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#d0cdc6]">
                    <Check className="w-4 h-4 text-[#a8a5a0] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-10"
        >
          <p className="text-sm text-[#a8a5a0]">
            Para propostas e agenda:{" "}
            <a
              href="https://www.instagram.com/belladevecchi/"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 hover:text-[#e0ddd5] transition-colors"
            >
              contato direto no Instagram
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  )
}
