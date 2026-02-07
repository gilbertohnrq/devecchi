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
  // Portfolio projects
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
  // Behance projects
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
  // Instagram projects
  {
    id: "ig-07",
    title: "Gaming Overlay Pack",
    client: "Twitch Assets",
    image: "/hero-video-src/ig-07.jpg",
    tags: ["Overlay", "Gaming"],
  },
  {
    id: "ig-09",
    title: "Channel Graphics",
    client: "YouTube Design",
    image: "/hero-video-src/ig-09.jpg",
    tags: ["YouTube", "Graphics"],
  },
  {
    id: "ig-10",
    title: "Streaming UI",
    client: "Live Graphics",
    image: "/hero-video-src/ig-10.jpg",
    tags: ["Streaming", "UI"],
  },
  {
    id: "ig-11",
    title: "Game Interface",
    client: "In-Game UI",
    image: "/hero-video-src/ig-11.jpg",
    tags: ["Gaming", "Interface"],
  },
  {
    id: "ig-12",
    title: "Digital Branding",
    client: "Online Presence",
    image: "/hero-video-src/ig-12.jpg",
    tags: ["Digital", "Branding"],
  },
  {
    id: "ig-13",
    title: "Creative Assets",
    client: "Content Design",
    image: "/hero-video-src/ig-13.jpg",
    tags: ["Creative", "Assets"],
  },
  {
    id: "ig-14",
    title: "Visual Identity",
    client: "Brand Design",
    image: "/hero-video-src/ig-14.jpg",
    tags: ["Identity", "Visual"],
  },
]

// Duplicate projects for infinite scroll with offset for variety
const column1 = [...designProjects, ...designProjects]
const column2 = [...designProjects.slice(6), ...designProjects.slice(0, 6), ...designProjects.slice(6), ...designProjects.slice(0, 6)]
const column3 = [...designProjects.slice(12), ...designProjects.slice(0, 12), ...designProjects.slice(12), ...designProjects.slice(0, 12)]

function ScrollColumn({ projects, reverse = false }: { projects: DesignProject[]; reverse?: boolean }) {
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

            {/* Overlay on hover with tags and title */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                {/* Tags above title */}
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
                {/* Title below tags */}
                <h3 className="text-sm md:text-base font-medium text-[#e0ddd5] tracking-wide">
                  {project.title}
                </h3>
                <p className="text-xs md:text-sm text-[#b0ada6] mt-1">
                  {project.client}
                </p>
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

      <div className="relative z-10 px-6 mb-24">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#e0ddd5] mb-6">
            Design que comunica
          </h2>
          <p className="text-lg text-[#b0ada6] max-w-2xl mx-auto">
            Identidades visuais, interfaces e gráficos que criam conexões.
          </p>
        </div>
      </div>

      {/* Scrolling columns container - Larger to match Flow */}
      <div className="relative h-[450px] md:h-[700px] lg:h-[850px] xl:h-[950px] overflow-hidden">
        {/* Top gradient fade - stronger */}
        <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/95 via-[#0a0a0a]/70 to-transparent z-20 pointer-events-none" />

        {/* Bottom gradient fade - stronger */}
        <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/95 via-[#0a0a0a]/70 to-transparent z-20 pointer-events-none" />

        {/* Columns - Full width, no max-width constraint */}
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
