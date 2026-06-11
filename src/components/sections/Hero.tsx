"use client"

import dynamic from "next/dynamic"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import TextReveal from "@/components/ui/TextReveal"
import MagneticButton from "@/components/ui/MagneticButton"
import FloatingShapes from "@/components/ui/FloatingShapes"
import ParticleField from "@/components/ui/ParticleField"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { personalInfo, contactConfig } from "@/lib/data"
import { SiInstagram } from "react-icons/si"
import { FaWhatsapp } from "react-icons/fa"
import { IoArrowDown } from "react-icons/io5"

const ThreeScene = dynamic(
  () => import("@/components/ui/ThreeScene"),
  { ssr: false }
)

function GradientHeading({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-20%" })
  const prefersReduced = useReducedMotion()
  const words = text.split(" ")
  const gradientClass = "bg-gradient-to-r from-primary via-blue-400 to-accent bg-clip-text text-transparent"

  if (prefersReduced) {
    return (
      <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-[-0.02em] leading-[1.08] mb-4 ${gradientClass}`}>
        {text}
      </h1>
    )
  }

  return (
    <h1
      ref={ref}
      className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-[-0.02em] leading-[1.08] mb-4 ${gradientClass}`}
    >
      <span className="inline">
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.2em]">
            <motion.span
              className="inline-block"
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : { y: "100%" }}
              transition={{
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 1],
                delay: i * 0.08,
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </h1>
  )
}

export default function Hero() {
  const prefersReduced = useReducedMotion()
  const showThree = !prefersReduced

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Blue gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-background to-primary/5" />

      <ParticleField count={80} />

      {showThree && <ThreeScene />}

      {/* Background gradient orbs */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-primary/15 rounded-full blur-[128px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 -left-24 w-80 h-80 bg-secondary/15 rounded-full blur-[128px] animate-pulse-glow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[200px]" />

      <FloatingShapes />

      <div className="relative z-20 flex flex-col items-center text-center px-4 sm:px-8 max-w-4xl mx-auto">
        {/* Small tag */}
        <div className="mb-6 px-4 py-1.5 rounded-full border border-primary/15 bg-white/60 backdrop-blur-sm shadow-sm">
          <span className="text-xs font-medium text-primary tracking-[0.15em] uppercase">
            {personalInfo.title}
          </span>
        </div>

        {/* Headline - gradient text */}
        <GradientHeading text={personalInfo.tagline} />

        {/* Subtitle */}
        <TextReveal
          as="p"
          delay={0.6}
          className="text-base sm:text-lg md:text-xl text-muted/85 max-w-2xl leading-relaxed"
        >
          Premium websites and custom web applications designed to help businesses stand out, build trust, and grow online.
        </TextReveal>

        {/* CTA Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
          <MagneticButton
            onClick={() => {
              document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })
            }}
            variant="primary"
          >
            View Work
            <IoArrowDown className="w-4 h-4" />
          </MagneticButton>

          <MagneticButton
            href={contactConfig.instagramDm}
            variant="secondary"
          >
            <SiInstagram className="w-4 h-4" />
            Instagram DM
          </MagneticButton>

          <MagneticButton
            href={`https://wa.me/${contactConfig.whatsappNumber}`}
            variant="ghost"
          >
            <FaWhatsapp className="w-4 h-4" />
            WhatsApp
          </MagneticButton>
        </div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-8 sm:mt-10 flex items-center justify-center gap-3 text-xs text-muted/50"
        >
          <span>Next.js</span>
          <span className="w-1 h-1 rounded-full bg-muted/30" />
          <span>TypeScript</span>
          <span className="w-1 h-1 rounded-full bg-muted/30" />
          <span>Supabase</span>
          <span className="w-1 h-1 rounded-full bg-muted/30" />
          <span>Tailwind CSS</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <IoArrowDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  )
}
