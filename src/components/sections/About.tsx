"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { personalInfo } from "@/lib/data"
import Image from "next/image"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import TextReveal from "@/components/ui/TextReveal"
import SectionWrapper from "@/components/ui/SectionWrapper"
import SectionAccent from "@/components/ui/SectionAccent"

gsap.registerPlugin(ScrollTrigger)

const serviceColors = [
  "border-primary/20 bg-primary/5",
  "border-blue-400/20 bg-blue-400/5",
  "border-secondary/20 bg-secondary/5",
  "border-accent/20 bg-accent/5",
  "border-primary/15 bg-primary/5",
  "border-blue-300/20 bg-blue-300/5",
  "border-secondary/15 bg-secondary/5",
  "border-accent/15 bg-accent/5",
  "border-primary/20 bg-primary/5",
  "border-blue-400/15 bg-blue-400/5",
  "border-secondary/20 bg-secondary/5",
]

export default function About() {
  const imageRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) return

    const el = imageRef.current
    if (!el) return

    gsap.fromTo(
      el,
      { opacity: 0, scale: 0.8, rotate: -3 },
      {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
      }
    )
  }, [prefersReduced])

  return (
    <SectionWrapper id="about">
      <SectionAccent position="top-right" color="bg-secondary/8" size="w-96 h-96" />
      <SectionAccent position="bottom-left" color="bg-accent/6" size="w-72 h-72" />
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <TextReveal
            as="h2"
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
          >
            About Me
          </TextReveal>
          <TextReveal
            delay={0.15}
            className="text-base md:text-lg text-muted/80 leading-relaxed mb-12 md:mb-16"
          >
            Full stack developer focused on building premium digital experiences for businesses.
          </TextReveal>
        </div>

        <div className="grid md:grid-cols-5 gap-8 md:gap-10 lg:gap-16 items-start">
          {/* Bio — 3 columns */}
          <div className="md:col-span-3 space-y-6">
            {personalInfo.bio.map((paragraph, i) => (
              <TextReveal
                key={i}
                delay={0.2 + i * 0.15}
                className="text-base md:text-lg text-muted/90 leading-[1.8]"
              >
                {paragraph}
              </TextReveal>
            ))}

            {/* Services grid */}
            <div className="mt-10 p-6 md:p-7 rounded-2xl border border-primary/8 bg-white/60 backdrop-blur-sm shadow-[0_2px_12px_-4px_rgba(37,99,235,0.06)]">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-4 rounded-full bg-primary/40" />
                <h3 className="text-xs font-semibold text-foreground uppercase tracking-[0.15em]">
                  What I Build
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {personalInfo.services.map((service, i) => (
                  <span
                    key={service}
                    className={`px-3 py-1.5 text-sm rounded-full border ${serviceColors[i % serviceColors.length]} text-foreground/80 backdrop-blur-sm`}
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Visual — 2 columns */}
          <div className="md:col-span-2 md:sticky md:top-24 flex items-center justify-center">
            <div
              ref={imageRef}
              className="relative w-full max-w-sm"
            >
              <div className="absolute -inset-6 bg-gradient-to-br from-primary/15 via-accent/10 to-transparent rounded-3xl blur-3xl opacity-50" />
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-primary/10 via-transparent to-primary/5 pointer-events-none" />
              <div className="relative w-full aspect-square rounded-2xl bg-gradient-to-br from-primary/10 via-primary-light/8 to-accent/8 border border-primary/10 backdrop-blur-sm flex items-center justify-center overflow-hidden shadow-lg shadow-primary/5">
                <div className="text-center p-8">
                  <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-primary/15 shadow-lg shadow-primary/15 mb-5 ring-1 ring-primary/10">
                    <Image
                      src="/logo.png"
                      alt="Parth Sites"
                      width={112}
                      height={112}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-foreground/90 text-sm font-semibold tracking-wide">
                    {personalInfo.name}
                  </p>
                  <p className="text-muted/70 text-sm mt-1">
                    {personalInfo.title}
                  </p>
                  <div className="mt-4 pt-4 border-t border-primary/8 text-muted/50 text-xs">
                    Based in India
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
