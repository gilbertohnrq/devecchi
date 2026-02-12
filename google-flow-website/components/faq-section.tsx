"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "Quais tipos de projeto a Isabella desenvolve?",
    answer:
      "Projetos de arquitetura residencial, interiores comerciais e direcao de design para ambientes e apresentacoes de marca.",
  },
  {
    question: "Como funciona o processo de trabalho?",
    answer:
      "O processo comeca com briefing e diagnostico do espaco, passa por conceito e estudo preliminar, e avanca para detalhamento tecnico e orientacao de execucao.",
  },
  {
    question: "Os projetos podem ser feitos para outras cidades?",
    answer:
      "Sim. Parte do fluxo pode ser conduzida de forma remota com alinhamentos online, mantendo entregas claras e acompanhamento estruturado.",
  },
  {
    question: "A entrega inclui detalhamento para obra?",
    answer:
      "Sim, conforme o escopo contratado. Os projetos podem incluir layouts, especificacoes, detalhamento e direcionamento de materiais e marcenaria.",
  },
  {
    question: "Onde posso acompanhar novos trabalhos?",
    answer:
      "No Instagram e no Behance da Isabella Devecchi, onde sao publicados projetos, estudos e atualizacoes de portfolio.",
  },
]

function FAQItem({
  question,
  answer,
  index,
}: {
  question: string
  answer: string
  index: number
}) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border-b border-[#ffffff15]"
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="text-base md:text-lg font-sans font-normal text-[#f2f2f2] pr-8 group-hover:text-[#e0ddd5] transition-colors">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-[#a8a5a0] shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-96 pb-6" : "max-h-0"}`}>
        <p className="text-[#a8a5a0] leading-relaxed max-w-2xl">{answer}</p>
      </div>
    </motion.div>
  )
}

export function FAQSection() {
  return (
    <section id="faq" className="px-6 py-24 md:py-32 bg-[#121212]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-normal text-[#f2f2f2] text-balance">
            Perguntas frequentes
          </h2>
        </motion.div>

        <div>
          {faqs.map((faq, i) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
