"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"

interface DesignProject {
  id: string
  title: string
  client: string
  image: string
  tags: string[]
}

const designProjects: DesignProject[] = [
  {
    id: "lol",
    title: "League of Legends UI",
    client: "Gaming Interface",
    image: "/portfolio/design-lol.webp",
    tags: ["UI/UX", "Gaming"],
  },
  {
    id: "maia",
    title: "Maia Brand",
    client: "Visual Identity",
    image: "/portfolio/design-maia.webp",
    tags: ["Branding", "Design"],
  },
  {
    id: "qix",
    title: "Qix Product",
    client: "Product Design",
    image: "/portfolio/design-qix.jpg",
    tags: ["Product", "3D"],
  },
  {
    id: "twitch",
    title: "Twitch Overlay",
    client: "Streaming Graphics",
    image: "/portfolio/design-twitch.webp",
    tags: ["Graphics", "Streaming"],
  },
]

// Duplicate projects for infinite scroll
const column1 = [...designProjects, ...designProjects]
const column2 = [...designProjects.slice(1), ...designProjects.slice(0, 1), ...designProjects]
const column3 = [...designProjects.slice(2), ...designProjects.slice(0, 2), ...designProjects]

function ScrollColumn({ projects, reverse = false }: { projects: DesignProject[]; reverse?: boolean }) {
  return (
    <div className="flex flex-col gap-4">
      <div
        className={`flex flex-col gap-4 ${reverse ? "animate-scroll-up" : "animate-scroll-down"}`}
        style={{
          animationDuration: "50s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {projects.map((project, index) => (
          <div
            key={`${project.id}-${index}`}
            className="group relative aspect-[16/9] rounded-2xl overflow-hidden bg-[#1a1a1a] border border-[#ffffff15] hover:border-[#ffffff30] transition-all duration-300"
          >
            <Image src={project.image} alt={project.title} fill className="object-cover" />

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium text-[#e0ddd5] bg-[#ffffff20] backdrop-blur-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-medium text-[#e0ddd5] mb-1">{project.title}</h3>
                <p className="text-sm text-[#b0ada6]">{project.client}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function DesignAutoScrollSection() {
  return (
    <section className="relative py-24 bg-[#0a0a0a] overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(95,111,116,0.15)_0%,transparent_50%)]" />

      <div className="relative z-10 px-6 mb-16">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#e0ddd5] mb-4">
            Design que comunica
          </h2>
          <p className="text-[#b0ada6] max-w-2xl mx-auto">
            Identidades visuais, interfaces e gráficos que criam conexões.
          </p>
        </div>
      </div>

      {/* Scrolling columns container */}
      <div className="relative h-[80vh] md:h-[726px] lg:h-[1240px]">
        {/* Top gradient fade */}
        <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-[#0a0a0a] to-transparent z-20 pointer-events-none" />

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-t from-[#0a0a0a] to-transparent z-20 pointer-events-none" />

        {/* Columns */}
        <div className="absolute inset-0 flex gap-4 px-6 max-w-7xl mx-auto">
          <div className="flex-1">
            <ScrollColumn projects={column1} />
          </div>
          <div className="flex-1 hidden md:block">
            <ScrollColumn projects={column2} reverse />
          </div>
          <div className="flex-1 hidden lg:block">
            <ScrollColumn projects={column3} />
          </div>
        </div>
      </div>

      {/* CTA */}
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
