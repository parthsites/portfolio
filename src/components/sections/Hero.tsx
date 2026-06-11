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

  if (prefersReduced) {
    return (
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1] mb-6 bg-gradient-to-r from-primary via-blue-500 to-blue-400 bg-clip-text text-transparent">
        {text}
      </h1>
    )
  }

  return (
    <h1
      ref={ref}
      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1] mb-6 bg-gradient-to-r from-primary via-blue-500 to-blue-400 bg-clip-text text-transparent"
    >
      <span className="inline">
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
            <motion.span
              className="inline-block"
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : { y: "100%" }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
                delay: i * 0.05,
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
  const isTouchDevice = typeof window !== "undefined" && "ontouchstart" in window
  const showThree = !prefersReduced && !isTouchDevice

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Blue gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100 via-background to-blue-50/50" />

      <ParticleField count={80} />

      {showThree && <ThreeScene />}

      {/* Background gradient orbs */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-primary/15 rounded-full blur-[128px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 -left-24 w-80 h-80 bg-secondary/15 rounded-full blur-[128px] animate-pulse-glow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[200px]" />

      <FloatingShapes />

      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 max-w-5xl mx-auto backdrop-blur-[2px]">
        {/* Small tag */}
        <div className="mb-8 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm">
          <span className="text-xs font-medium text-primary tracking-widest uppercase">
            {personalInfo.title}
          </span>
        </div>

        {/* Headline - gradient text */}
        <GradientHeading text={personalInfo.tagline} />

        {/* Subtitle */}
        <TextReveal
          as="p"
          delay={0.6}
          className="text-lg md:text-xl text-muted max-w-2xl"
        >
          {`Premium websites and full stack applications built with Next.js, TypeScript, and modern web technology. ${personalInfo.brand} — Websites That Work.`}
        </TextReveal>

        {/* CTA Buttons */}
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
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
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <IoArrowDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  )
}
