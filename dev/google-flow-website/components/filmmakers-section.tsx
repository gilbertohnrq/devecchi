"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"

type Project = {
  title: string
  creator: string
  source: string
  year: string
  summary: string
  url: string
  image: string
  imagePosition?: string
}

const architectureProjects: Project[] = [
  {
    title: "Praça Professora Hildegard Schmah",
    creator: "Isabella Devecchi",
    source: "Behance",
    year: "2023",
    summary: "Readequação arquitetônica de praça pública com foco em fluxo, permanência e paisagismo.",
    url: "https://www.behance.net/gallery/186456529/Praca-Professora-Hildegard-Schmah",
    image: "/portfolio/arch-praca.jpg",
    imagePosition: "object-center",
  },
  {
    title: "Gaming Room JG",
    creator: "Arquiteto Gamer",
    source: "Site oficial",
    year: "2024",
    summary: "Projeto gamer com iluminação técnica e ambientação para criação de conteúdo.",
    url: "https://www.arquitetogamer.com.br/portfolio-collections/gaming-rooms/meu-projeto",
    image: "/portfolio/arch-jg.png",
    imagePosition: "object-center",
  },
  {
    title: "Quarto Gamer Racing",
    creator: "Arquiteto Gamer",
    source: "Site oficial",
    year: "2024",
    summary: "Quarto temático com linguagem motorsport e organização espacial para setup completo.",
    url: "https://www.arquitetogamer.com.br/portfolio-collections/quarto-gamer/quarto-gamer-e11100",
    image: "/portfolio/arch-racing.png",
    imagePosition: "object-center",
  },
  {
    title: "Quarto Gamer Red",
    creator: "Arquiteto Gamer",
    source: "Site oficial",
    year: "2024",
    summary: "Proposta de alto contraste com atmosfera imersiva e ergonomia para uso prolongado.",
    url: "https://www.arquitetogamer.com.br/en/portfolio-collections/quarto-gamer/quarto-gamer",
    image: "/portfolio/arch-red.png",
    imagePosition: "object-center",
  },
  {
    title: "Mesa Meia-Lua",
    creator: "Isabella Devecchi",
    source: "Behance",
    year: "2023",
    summary: "Design de mobiliário com pesquisa formal em curva, materialidade e expressão autoral.",
    url: "https://www.behance.net/gallery/185932305/Mesa-Meia-Lua",
    image: "/portfolio/arch-mesa.png",
    imagePosition: "object-center",
  },
]

const designProjects: Project[] = [
  {
    title: "Qix Telecom",
    creator: "Isabella Devecchi",
    source: "Behance",
    year: "2019",
    summary: "Sistema de identidade visual e aplicações institucionais para telecom.",
    url: "https://www.behance.net/gallery/79220545/Qix-Telecom",
    image: "/portfolio/design-qix.jpg",
    imagePosition: "object-center",
  },
  {
    title: "Maia - Pesque e Pague",
    creator: "Isabella Devecchi",
    source: "Behance",
    year: "2020",
    summary: "Branding completo para operação gastronômica, com direção visual e aplicações.",
    url: "https://www.behance.net/gallery/94955863/Maia-Pesque-e-Pague",
    image: "/portfolio/design-maia.webp",
    imagePosition: "object-center",
  },
  {
    title: "Twitch Packs / Overlays / Screens",
    creator: "Isabella Devecchi",
    source: "Behance",
    year: "2020",
    summary: "Pacotes para streaming com overlays, telas de cena e assets para creators.",
    url: "https://www.behance.net/gallery/91911789/Twitch-PacksOverlaysScreensStreampacks",
    image: "/portfolio/design-twitch.webp",
    imagePosition: "object-top",
  },
  {
    title: "Banner - League of Legends",
    creator: "Isabella Devecchi",
    source: "Behance",
    year: "2018",
    summary: "Peças promocionais para universo gamer, com foco em impacto visual e legibilidade.",
    url: "https://www.behance.net/gallery/76280419/Banner-League-of-Legends",
    image: "/portfolio/design-lol.webp",
    imagePosition: "object-center",
  },
]

function ProjectTile({
  project,
  index,
  featured = false,
}: {
  project: Project
  index: number
  featured?: boolean
}) {
  const [imageSrc, setImageSrc] = useState(project.image)
  const tileHeight = featured ? "clamp(320px, 46vw, 500px)" : "clamp(260px, 34vw, 360px)"

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.28) }}
      className="group relative block w-full overflow-hidden rounded-2xl border border-[#ffffff1a] bg-[#171717]"
      style={{ height: tileHeight }}
    >
      <Image
        src={imageSrc}
        alt={project.title}
        fill
        sizes={featured ? "(max-width: 1024px) 100vw, 1200px" : "(max-width: 1024px) 100vw, 580px"}
        className={`object-cover ${project.imagePosition ?? "object-center"} transition-transform duration-700 group-hover:scale-[1.03]`}
        onError={() => setImageSrc("/placeholder.svg")}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.2),transparent_35%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="absolute left-0 right-0 bottom-0 p-5 md:p-6">
        <div className="flex items-center justify-between gap-3 mb-3">
          <p className="text-[11px] tracking-[0.12em] uppercase text-[#d9d6ce]">{project.source}</p>
          <p className="text-xs text-[#d0ccc4]">{project.year}</p>
        </div>
        <h3 className={`text-[#f2f2f2] leading-tight mb-2 ${featured ? "text-2xl md:text-3xl" : "text-lg md:text-xl"}`}>
          {project.title}
        </h3>
        <p className="text-sm text-[#ddd9d2] mb-2">{project.creator}</p>
        <p className={`text-[#c9c5be] leading-relaxed ${featured ? "text-sm md:text-base max-w-2xl" : "text-sm"}`}>
          {project.summary}
        </p>
      </div>
    </motion.a>
  )
}

function PortfolioSection({ title, projects }: { title: string; projects: Project[] }) {
  const [featured, ...rest] = projects

  return (
    <div className="mb-16 md:mb-20">
      <div className="flex items-center gap-4 mb-6 md:mb-8">
        <h3 className="text-xl md:text-2xl text-[#f2f2f2]">{title}</h3>
        <div className="h-px flex-1 bg-[#ffffff14]" />
      </div>

      <div className="mb-5 md:mb-6">
        <ProjectTile project={featured} index={0} featured />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {rest.map((project, index) => (
          <ProjectTile key={`${project.title}-${project.creator}`} project={project} index={index + 1} />
        ))}
      </div>
    </div>
  )
}

export function FilmmakersSection() {
  return (
    <section id="portfolio" className="py-24 md:py-32 bg-[#121212]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 md:mb-16"
        >
          <p className="text-xs tracking-[0.16em] uppercase text-[#8e8b84] mb-4">Portfolio Autoral</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-normal text-[#f2f2f2] max-w-4xl mx-auto text-balance">
            Projetos reais de arquitetura e design com curadoria visual e linguagem contemporanea.
          </h2>
          <p className="mt-5 text-sm md:text-base text-[#a8a5a0] max-w-3xl mx-auto leading-relaxed">
            Seleção de trabalhos publicados em canais oficiais, organizados para leitura clara de processo e resultado.
          </p>
        </motion.div>

        <PortfolioSection title="Arquitetura" projects={architectureProjects} />
        <PortfolioSection title="Design" projects={designProjects} />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="rounded-2xl border border-[#ffffff12] bg-[#151515] p-5 md:p-6"
        >
          <p className="text-xs tracking-[0.14em] uppercase text-[#8e8b84] mb-2">Fontes</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <a
              href="https://www.instagram.com/belladevecchi/"
              target="_blank"
              rel="noreferrer"
              className="text-[#d7d4cd] hover:text-white transition-colors"
            >
              Instagram - @belladevecchi
            </a>
            <a
              href="https://www.behance.net/isabelladevecchi?locale=pt_BR"
              target="_blank"
              rel="noreferrer"
              className="text-[#d7d4cd] hover:text-white transition-colors"
            >
              Behance - Isabella Devecchi
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
