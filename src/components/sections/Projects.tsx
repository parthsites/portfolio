"use client"

import { useRef, useState, useEffect, type MouseEvent } from "react"
import { motion } from "framer-motion"
import { FiArrowUpRight, FiGithub } from "react-icons/fi"
import { projects } from "@/lib/data"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import SectionWrapper from "@/components/ui/SectionWrapper"
import SectionAccent from "@/components/ui/SectionAccent"
import TextReveal from "@/components/ui/TextReveal"

function useScreenshot(url: string) {
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    const api = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false`
    fetch(api)
      .then((r) => r.json())
      .then((d) => {
        if (d?.data?.screenshot?.url) setSrc(d.data.screenshot.url)
      })
      .catch(() => {})
  }, [url])

  return src
}

function ProjectCard({
  title,
  description,
  industry,
  features,
  tech,
  gradient,
  category,
  links,
  index,
}: {
  title: string
  description: string
  industry: string
  features: string[]
  tech: string[]
  gradient: string
  category: string
  links: { github: string; live: string }
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const screenshot = useScreenshot(links.live)
  const [imgError, setImgError] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  function handleMouseMove(e: MouseEvent) {
    if (prefersReduced) return
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`
  }

  function handleMouseLeave() {
    if (prefersReduced) return
    const card = cardRef.current
    if (!card) return
    card.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)"
  }

  const showScreenshot = screenshot && !imgError

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl overflow-hidden border border-primary/8 bg-white shadow-[0_2px_12px_-4px_rgba(37,99,235,0.06)] hover:shadow-[0_16px_48px_-12px_rgba(37,99,235,0.18)] transition-all duration-500 hover:-translate-y-1.5"
      style={{ transition: "transform 0.1s ease-out, box-shadow 0.4s ease" }}
    >
      {/* Glass reflection overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/50 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
      <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-b from-white/30 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

      {/* Preview area */}
      <a
        href={links.live}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative h-48 md:h-56 overflow-hidden bg-surface"
      >
        {/* Gradient fallback (shown until screenshot loads, or on error) */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} transition-opacity duration-500 ${
            showScreenshot && imgLoaded ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Screenshot */}
        {showScreenshot && (
          <img
            src={screenshot}
            alt={title}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
        )}

        {/* Category badge */}
        <span className="absolute top-3 left-3 z-10 px-2.5 py-1 text-xs font-medium rounded-full bg-white/90 backdrop-blur-sm text-foreground shadow-sm">
          {category}
        </span>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
          <span className="flex items-center gap-2 text-white text-sm font-medium">
            View Project <FiArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </a>

      {/* Info */}
      <div className="p-5 md:p-6">
        <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>

        {/* Industry tag */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-muted/60 uppercase tracking-wider">Industry:</span>
          <span className="text-xs font-medium text-foreground/80">{industry}</span>
        </div>

        <p className="text-sm text-muted/80 leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>

        {/* Features */}
        <div className="mb-4">
          <span className="text-xs text-muted/60 uppercase tracking-wider block mb-2">Features</span>
          <div className="flex flex-wrap gap-1.5">
            {features.map((f) => (
              <span
                key={f}
                className="px-2 py-1 text-xs rounded-md bg-primary/5 text-muted/70 border border-primary/8"
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div className="mb-4 pt-3 border-t border-primary/8">
          <span className="text-xs text-muted/60 uppercase tracking-wider block mb-2">Technologies</span>
          <div className="flex flex-wrap gap-1.5">
            {tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-xs rounded-full bg-primary/5 text-primary border border-primary/10"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-2">
          <a
            href={links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-4 rounded-xl text-sm font-medium text-white bg-primary hover:bg-primary-light transition-all duration-300 flex items-center justify-center gap-2 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 group/link"
          >
            <span>Live Website</span>
            <FiArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </a>
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-[0.6] py-2.5 px-3 rounded-xl text-sm font-medium text-foreground bg-primary/5 hover:bg-primary/10 transition-all duration-300 flex items-center justify-center gap-2 border border-primary/10 group/link"
          >
            <FiGithub className="w-4 h-4" />
            <span>Code</span>
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <SectionWrapper id="work">
      <SectionAccent position="top-left" color="bg-secondary/10" size="w-96 h-96" />
      <SectionAccent position="bottom-right" color="bg-primary/8" size="w-72 h-72" />
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/10 bg-primary/5 text-xs font-medium text-primary tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
          Real Projects — Live &amp; Deployed
        </div>

        <TextReveal
          as="h2"
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
        >
          Recent Projects
        </TextReveal>
        <TextReveal
          delay={0.2}
          className="text-lg text-muted max-w-2xl mb-16"
        >
          Live websites and applications I&apos;ve built for real businesses
        </TextReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} {...project} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
