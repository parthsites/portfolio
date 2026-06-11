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
  "border-blue-500/30 bg-blue-500/5",
  "border-cyan-500/30 bg-cyan-500/5",
  "border-indigo-500/30 bg-indigo-500/5",
  "border-teal-500/30 bg-teal-500/5",
  "border-sky-500/30 bg-sky-500/5",
  "border-primary/30 bg-primary/5",
  "border-violet-500/30 bg-violet-500/5",
  "border-emerald-500/30 bg-emerald-500/5",
  "border-blue-400/30 bg-blue-400/5",
  "border-primary/20 bg-primary/5",
  "border-cyan-400/30 bg-cyan-400/5",
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
      <SectionAccent position="top-right" color="bg-secondary/10" size="w-96 h-96" />
      <SectionAccent position="bottom-left" color="bg-accent/8" size="w-64 h-64" />
      <div className="max-w-7xl mx-auto">
        <TextReveal
          as="h2"
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
        >
          About Me
        </TextReveal>

        <div className="grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-20 mt-8 md:mt-12">
          {/* Bio + Services */}
          <div>
            {personalInfo.bio.map((paragraph, i) => (
              <TextReveal
                key={i}
                delay={0.3 + i * 0.15}
                className="text-base md:text-lg text-muted leading-relaxed mb-6"
              >
                {paragraph}
              </TextReveal>
            ))}

            {/* Services grid */}
            <div className="mt-10">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                What I Build
              </h3>
              <div className="flex flex-wrap gap-2">
                {personalInfo.services.map((service, i) => (
                  <span
                    key={service}
                    className={`px-3 py-1.5 text-sm rounded-full border ${serviceColors[i % serviceColors.length]} text-foreground/80`}
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Visual */}
          <div
            ref={imageRef}
            className="relative flex items-center justify-center"
          >
            <div className="w-full aspect-square max-w-md rounded-2xl bg-gradient-to-br from-primary/15 via-blue-500/10 to-accent/10 border border-primary/20 backdrop-blur-sm flex items-center justify-center overflow-hidden">
              <div className="text-center p-8">
                <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-primary/30 shadow-lg shadow-primary/20 mb-4">
                  <Image
                    src="/logo.png"
                    alt="Parth Sites"
                    width={112}
                    height={112}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-muted text-sm">
                  {personalInfo.title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
