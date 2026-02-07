"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useState } from "react"

type Category = "residencial" | "comercial" | "espacos"

interface Project {
  id: string
  title: string
  category: Category
  image: string
  description: string
}

const projects: Project[] = [
  // Residencial (3 projetos)
  {
    id: "jg",
    title: "JG Residence",
    category: "residencial",
    image: "/portfolio/arch-jg.png",
    description: "Residência moderna com conceito gamer integrado",
  },
  {
    id: "racing",
    title: "Racing Loft",
    category: "residencial",
    image: "/portfolio/arch-racing.png",
    description: "Loft urbano com temática automotiva",
  },
  {
    id: "red",
    title: "Red House",
    category: "residencial",
    image: "/portfolio/arch-red.png",
    description: "Casa contemporânea com paleta vibrante",
  },
  // Comercial (3 projetos)
  {
    id: "mesa",
    title: "Mesa Café",
    category: "comercial",
    image: "/portfolio/arch-mesa.png",
    description: "Café conceito com design minimalista",
  },
  {
    id: "comercial-2",
    title: "Espaço Corporativo",
    category: "comercial",
    image: "/hero-video-src/isabella-05.jpg",
    description: "Escritório moderno e funcional",
  },
  {
    id: "comercial-3",
    title: "Showroom Premium",
    category: "comercial",
    image: "/hero-video-src/isabella-06.jpg",
    description: "Ambiente comercial de alto padrão",
  },
  // Espaços (3 projetos)
  {
    id: "praca",
    title: "Praça Urbana",
    category: "espacos",
    image: "/portfolio/arch-praca.jpg",
    description: "Revitalização de espaço público",
  },
  {
    id: "espacos-2",
    title: "Área de Lazer",
    category: "espacos",
    image: "/hero-video-src/isabella-07.png",
    description: "Espaço integrado para comunidade",
  },
  {
    id: "espacos-3",
    title: "Parque Urbano",
    category: "espacos",
    image: "/hero-video-src/isabella-08.png",
    description: "Paisagismo e urbanismo sustentável",
  },
]

const categories = [
  {
    id: "residencial" as Category,
    label: "Residencial",
    description: "Espaços projetados para transformar casas em lares, onde cada detalhe conta uma história.",
  },
  {
    id: "comercial" as Category,
    label: "Comercial",
    description: "Ambientes que elevam marcas e criam experiências memoráveis para clientes.",
  },
  {
    id: "espacos" as Category,
    label: "Espaços",
    description: "Projetos urbanos que conectam pessoas e revitalizam comunidades.",
  },
]

export function ArchitectureProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("residencial")

  const getTranslateX = (categoryId: Category) => {
    const categoryIndex = categories.findIndex((c) => c.id === categoryId)
    const activeIndex = categories.findIndex((c) => c.id === activeCategory)
    const offset = (categoryIndex - activeIndex) * 100
    return offset
  }

  return (
    <section className="relative py-16 md:py-24 bg-black overflow-hidden">
      {/* Category titles - Flow style horizontal layout */}
      <div className="relative z-10 px-6 mb-12 md:mb-16">
        <div className="max-w-[1400px] mx-auto">
          {/* Horizontal line separator */}
          <div className="w-full h-px bg-white/10 mb-8 md:mb-12" />

          {/* Titles row */}
          <div className="flex flex-col md:flex-row items-start justify-start md:justify-center gap-8 md:gap-12 lg:gap-16 xl:gap-20 mb-4">
            {categories.map((category) => {
              const isActive = activeCategory === category.id
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className="group text-left flex-1 transition-all duration-500"
                >
                  {/* Category Label with blur effect */}
                  <h2
                    className={`text-3xl md:text-4xl lg:text-5xl font-light transition-all duration-500 ${
                      isActive ? "text-white blur-0" : "text-white/40 blur-sm group-hover:blur-[2px]"
                    }`}
                    style={{
                      filter: isActive ? "blur(0px)" : "blur(4px)",
                    }}
                  >
                    {category.label}
                  </h2>
                </button>
              )
            })}
          </div>

          {/* Descriptions - all in same position, only one visible */}
          <div className="relative h-16 md:h-20">
            <AnimatePresence mode="wait">
              {categories.map((category) => {
                const isActive = activeCategory === category.id
                if (!isActive) return null

                return (
                  <motion.p
                    key={category.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute top-0 left-0 text-sm md:text-base text-[#b0ada6] leading-relaxed max-w-md md:max-w-lg"
                  >
                    {category.description}
                  </motion.p>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Projects Grid - Seamless carousel with all categories pre-rendered */}
      <div className="relative z-10 px-4 md:px-6 lg:px-8">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative overflow-hidden min-h-[400px] md:min-h-[500px]">
            {categories.map((category) => {
              const categoryProjects = projects.filter((p) => p.category === category.id)
              const translateX = getTranslateX(category.id)

              return (
                <motion.div
                  key={category.id}
                  animate={{ x: `${translateX}%` }}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute top-0 left-0 w-full"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
                    {categoryProjects.map((project) => (
                      <div
                        key={project.id}
                        className="group relative aspect-video rounded-xl md:rounded-2xl overflow-hidden bg-[#0a0a0a]"
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Project info */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                          <h3 className="text-lg md:text-xl font-medium text-white mb-1 md:mb-2">
                            {project.title}
                          </h3>
                          <p className="text-xs md:text-sm text-[#b0ada6]">{project.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-12 md:mt-16 text-center px-6"
      >
        <a
          href="#contato"
          className="inline-block px-8 py-3.5 text-sm font-medium text-[#f2f2f2] bg-[#ffffff15] backdrop-blur-sm border border-[#ffffff20] rounded-full hover:bg-[#ffffff25] transition-all duration-300"
        >
          Ver todos os projetos
        </a>
      </motion.div>
    </section>
  )
}
