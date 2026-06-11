"use client"

import { useRef, type ReactNode } from "react"
import { motion, useInView } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  id?: string
}

export default function SectionWrapper({
  children,
  className = "",
  id,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })
  const prefersReduced = useReducedMotion()

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`relative overflow-hidden px-4 sm:px-6 md:px-12 lg:px-24 py-20 md:py-32 ${className}`}
      initial={prefersReduced ? {} : { opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : prefersReduced ? {} : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.section>
  )
}
