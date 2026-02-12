"use client"

import Image from "next/image"
import type { PortfolioMode } from "@/lib/portfolio-mode"

interface PortfolioProject {
  id: string
  title: string
  client: string
  image: string
  tags: string[]
}

const architectureProjects: PortfolioProject[] = [
  {
    id: "arch-praca",
    title: "Praca Professora Hildegard",
    client: "Urbanismo",
    image: "/portfolio/arch-praca.jpg",
    tags: ["Arquitetura", "Paisagismo"],
  },
  {
    id: "arch-jg",
    title: "Gaming Room JG",
    client: "Interior Residencial",
    image: "/portfolio/arch-jg.png",
    tags: ["Interiores", "Iluminacao"],
  },
  {
    id: "arch-racing",
    title: "Quarto Gamer Racing",
    client: "Residencial",
    image: "/portfolio/arch-racing.png",
    tags: ["Arquitetura", "Setup"],
  },
  {
    id: "arch-red",
    title: "Quarto Gamer Red",
    client: "Residencial",
    image: "/portfolio/arch-red.png",
    tags: ["Interiores", "Atmosfera"],
  },
  {
    id: "arch-mesa",
    title: "Mesa Meia-Lua",
    client: "Produto",
    image: "/portfolio/arch-mesa.png",
    tags: ["Mobiliario", "Design"],
  },
  {
    id: "arch-bh-01",
    title: "Estudo Espacial 01",
    client: "Behance",
    image: "/hero-video-src/behance/bh-01.jpg",
    tags: ["Conceito", "Arquitetura"],
  },
  {
    id: "arch-bh-02",
    title: "Estudo Espacial 02",
    client: "Behance",
    image: "/hero-video-src/behance/bh-02.jpg",
    tags: ["Interiores", "Projeto"],
  },
  {
    id: "arch-bh-03",
    title: "Estudo Espacial 03",
    client: "Behance",
    image: "/hero-video-src/behance/bh-03.jpg",
    tags: ["Ambiente", "Curadoria"],
  },
  {
    id: "arch-bh-04",
    title: "Estudo Espacial 04",
    client: "Behance",
    image: "/hero-video-src/behance/bh-04.jpg",
    tags: ["Materialidade", "Projeto"],
  },
]

const designProjects: PortfolioProject[] = [
  {
    id: "lol",
    title: "League of Legends UI",
    client: "Gaming Interface",
    image: "/portfolio/design-lol.webp",
    tags: ["UI/UX", "Gaming"],
  },
  {
    id: "maia",
    title: "Maia Brand Identity",
    client: "Visual Identity",
    image: "/portfolio/design-maia.webp",
    tags: ["Branding", "Design"],
  },
  {
    id: "qix",
    title: "Qix Product Design",
    client: "Product Design",
    image: "/portfolio/design-qix.jpg",
    tags: ["Product", "3D"],
  },
  {
    id: "twitch",
    title: "Twitch Stream Overlay",
    client: "Streaming Graphics",
    image: "/portfolio/design-twitch.webp",
    tags: ["Graphics", "Streaming"],
  },
  {
    id: "bh-01",
    title: "Brand Identity System",
    client: "Corporate Design",
    image: "/hero-video-src/behance/bh-01.jpg",
    tags: ["Branding", "Identity"],
  },
  {
    id: "bh-02",
    title: "Visual Communication",
    client: "Brand Strategy",
    image: "/hero-video-src/behance/bh-02.jpg",
    tags: ["Design", "Strategy"],
  },
  {
    id: "bh-03",
    title: "Creative Direction",
    client: "Visual Design",
    image: "/hero-video-src/behance/bh-03.jpg",
    tags: ["Art Direction", "Design"],
  },
  {
    id: "bh-04",
    title: "Brand Experience",
    client: "User Experience",
    image: "/hero-video-src/behance/bh-04.jpg",
    tags: ["UX", "Branding"],
  },
]

function buildColumns(projects: PortfolioProject[]) {
  const shiftA = Math.max(1, Math.floor(projects.length / 3))
  const shiftB = Math.max(2, Math.floor((projects.length * 2) / 3))

  return {
    column1: [...projects, ...projects],
    column2: [
      ...projects.slice(shiftA),
      ...projects.slice(0, shiftA),
      ...projects.slice(shiftA),
      ...projects.slice(0, shiftA),
    ],
    column3: [
      ...projects.slice(shiftB),
      ...projects.slice(0, shiftB),
      ...projects.slice(shiftB),
      ...projects.slice(0, shiftB),
    ],
  }
}

function ScrollColumn({ projects, reverse = false }: { projects: PortfolioProject[]; reverse?: boolean }) {
  return (
    <div className="flex flex-col gap-5 md:gap-6">
      <div
        className={`flex flex-col gap-5 md:gap-6 ${reverse ? "animate-scroll-up" : "animate-scroll-down"}`}
        style={{
          animationDuration: "180s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {projects.map((project, index) => (
          <div
            key={`${project.id}-${index}`}
            className="group relative aspect-video w-full rounded-xl overflow-hidden bg-[#1a1a1a] border border-[#ffffff10] hover:border-[#ffffff25] transition-all duration-300"
          >
            <Image src={project.image} alt={project.title} fill className="object-cover" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium text-[#e0ddd5] bg-[#ffffff15] backdrop-blur-md rounded-full border border-[#ffffff20]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-sm md:text-base font-medium text-[#e0ddd5] tracking-wide">{project.title}</h3>
                <p className="text-xs md:text-sm text-[#b0ada6] mt-1">{project.client}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

type DesignAutoScrollSectionProps = {
  mode: PortfolioMode
}

export function DesignAutoScrollSection({ mode }: DesignAutoScrollSectionProps) {
  const isArchitecture = mode === "arquitetura"
  const activeProjects = isArchitecture ? architectureProjects : designProjects
  const { column1, column2, column3 } = buildColumns(activeProjects)

  return (
    <section
      id={isArchitecture ? "portfolio-arquitetura" : "portfolio-design"}
      className="relative py-24 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background: isArchitecture
            ? "radial-gradient(circle_at_72%_28%,rgba(85,122,143,0.26)_0%,rgba(8,15,20,0.96)_56%)"
            : "radial-gradient(circle_at_28%_26%,rgba(204,120,160,0.24)_0%,rgba(16,8,28,0.96)_58%)",
        }}
      />

      <div className="relative z-10 px-6 mb-24">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#e0ddd5] mb-6">
            {isArchitecture ? "Arquitetura em movimento" : "Design que comunica"}
          </h2>
          <p className="text-lg text-[#b0ada6] max-w-2xl mx-auto">
            {isArchitecture
              ? "Projetos de arquitetura e interiores apresentados em fluxo continuo para leitura espacial." 
              : "Identidades visuais, interfaces e gráficos que criam conexões."}
          </p>
        </div>
      </div>

      <div className="relative h-[450px] md:h-[700px] lg:h-[850px] xl:h-[950px] overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-[40%] z-20 pointer-events-none"
          style={{
            background: isArchitecture
              ? "linear-gradient(to bottom, rgba(7,12,16,1) 0%, rgba(7,12,16,0.95) 28%, rgba(7,12,16,0.7) 60%, rgba(7,12,16,0) 100%)"
              : "linear-gradient(to bottom, rgba(12,7,18,1) 0%, rgba(12,7,18,0.95) 28%, rgba(12,7,18,0.72) 60%, rgba(12,7,18,0) 100%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-[50%] z-20 pointer-events-none"
          style={{
            background: isArchitecture
              ? "linear-gradient(to top, rgba(7,12,16,1) 0%, rgba(7,12,16,0.95) 30%, rgba(7,12,16,0.7) 62%, rgba(7,12,16,0) 100%)"
              : "linear-gradient(to top, rgba(12,7,18,1) 0%, rgba(12,7,18,0.95) 30%, rgba(12,7,18,0.72) 62%, rgba(12,7,18,0) 100%)",
          }}
        />

        <div className="absolute inset-0 flex gap-3 md:gap-4 lg:gap-5 px-4 md:px-8 lg:px-12 xl:px-16">
          <div className="flex-1 min-w-0">
            <ScrollColumn projects={column1} />
          </div>
          <div className="flex-1 min-w-0 hidden md:block">
            <ScrollColumn projects={column2} reverse />
          </div>
          <div className="flex-1 min-w-0 hidden lg:block">
            <ScrollColumn projects={column3} />
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-16 text-center px-6">
        <a
          href="https://www.behance.net/isabelladevecchi?locale=pt_BR"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 text-sm font-medium text-[#f2f2f2] bg-[#ffffff20] backdrop-blur-sm border border-[#ffffff30] rounded-full hover:bg-[#ffffff30] transition-colors"
        >
          Ver portfólio completo
        </a>
      </div>
    </section>
  )
}
