"use client"

import { useRef, type MouseEvent } from "react"
import { motion } from "framer-motion"
import { skills } from "@/lib/data"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import SectionWrapper from "@/components/ui/SectionWrapper"
import SectionAccent from "@/components/ui/SectionAccent"
import TextReveal from "@/components/ui/TextReveal"
import { IconType } from "react-icons"

function SkillCard({
  icon: Icon,
  title,
  description,
  gradient,
  index,
}: {
  icon: IconType
  title: string
  description: string
  gradient: string
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  function handleMouseMove(e: MouseEvent) {
    if (prefersReduced) return
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`
  }

  function handleMouseLeave() {
    if (prefersReduced) return
    const card = cardRef.current
    if (!card) return
    card.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg)"
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative p-6 rounded-2xl border border-primary/8 bg-white/70 backdrop-blur-md cursor-default shadow-[0_2px_12px_-4px_rgba(37,99,235,0.08)] hover:shadow-[0_16px_48px_-12px_rgba(37,99,235,0.18)] transition-all duration-500 hover:-translate-y-0.5"
      style={{ transition: "transform 0.1s ease-out, box-shadow 0.4s ease" }}
    >
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${gradient}`} />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/80 via-white/40 to-transparent pointer-events-none" />
      <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-b from-white/50 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary-light/15 flex items-center justify-center mb-4 shadow-inner shadow-primary/5 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-500 ring-1 ring-primary/8 group-hover:ring-primary/20 group-hover:scale-110">
          <Icon className="w-6 h-6 text-primary group-hover:text-primary-light transition-colors duration-500" />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
        <p className="text-sm text-muted/80 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <SectionAccent position="bottom-left" color="bg-primary/8" size="w-80 h-80" />
      <SectionAccent position="top-right" color="bg-primary/8" size="w-60 h-60" />
      <div className="max-w-7xl mx-auto">
        <TextReveal
          as="h2"
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center"
        >
          Skills & Expertise
        </TextReveal>
        <TextReveal
          delay={0.2}
          className="text-lg text-muted text-center max-w-2xl mx-auto mb-16"
        >
          Technologies and tools I use to bring ideas to life
        </TextReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {skills.map((skill, i) => (
            <SkillCard key={skill.title} {...skill} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
