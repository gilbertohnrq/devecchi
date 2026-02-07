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
  {
    id: "mesa",
    title: "Mesa Café",
    category: "comercial",
    image: "/portfolio/arch-mesa.png",
    description: "Café conceito com design minimalista",
  },
  {
    id: "praca",
    title: "Praça Urbana",
    category: "espacos",
    image: "/portfolio/arch-praca.jpg",
    description: "Revitalização de espaço público",
  },
]

const categories = [
  { id: "residencial" as Category, label: "Residencial", title: "Espaços que contam histórias" },
  { id: "comercial" as Category, label: "Comercial", title: "Design que gera experiências" },
  { id: "espacos" as Category, label: "Espaços", title: "Lugares que transformam" },
]

export function ArchitectureProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("residencial")

  const filteredProjects = projects.filter((p) => p.category === activeCategory)
  const activeTitle = categories.find((c) => c.id === activeCategory)?.title

  return (
    <section className="relative py-24 px-6 bg-[#0a0a0a] overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(95,111,116,0.15)_0%,transparent_50%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Animated Title */}
        <AnimatePresence mode="wait">
          <motion.h2
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-[#e0ddd5] mb-4 text-center"
          >
            {activeTitle}
          </motion.h2>
        </AnimatePresence>

        <p className="text-center text-[#b0ada6] mb-12 max-w-2xl mx-auto">
          Projetos que unem funcionalidade, estética e narrativa visual premium.
        </p>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300
                ${
                  activeCategory === category.id
                    ? "bg-[#ffffff25] text-[#e0ddd5]"
                    : "bg-[#ffffff05] text-[#b0ada6] hover:bg-[#ffffff15]"
                }
              `}
            >
              <span className="relative z-10">{category.label}</span>
              {activeCategory === category.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[#ffffff25] rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.35, delay: index * 0.1 }}
                className="group relative aspect-[16/9] rounded-2xl overflow-hidden bg-[#1a1a1a]"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Project info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-xl font-medium text-[#e0ddd5] mb-2">{project.title}</h3>
                  <p className="text-sm text-[#b0ada6]">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <a
            href="#contato"
            className="inline-block px-8 py-3 text-sm font-medium text-[#f2f2f2] bg-[#ffffff20] backdrop-blur-sm border border-[#ffffff30] rounded-full hover:bg-[#ffffff30] transition-colors"
          >
            Ver todos os projetos
          </a>
        </motion.div>
      </div>
    </section>
  )
}
