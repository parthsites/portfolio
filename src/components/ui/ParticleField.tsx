"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "@/hooks/useReducedMotion"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
}

export default function ParticleField({ count = 50 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) return

    const canvasEl = canvasRef.current
    if (!canvasEl) return

    const ctx = canvasEl.getContext("2d")
    if (!ctx) return

    const cvs = canvasEl
    const c = ctx

    let animationId: number
    let particles: Particle[] = []

    const isTouch = "ontouchstart" in window
    const particleCount = isTouch ? Math.min(count, 20) : count

    function resize() {
      cvs.width = window.innerWidth
      cvs.height = window.innerHeight
    }

    function init() {
      resize()
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * cvs.width,
        y: Math.random() * cvs.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -Math.random() * 0.5 - 0.1,
        opacity: Math.random() * 0.5 + 0.1,
      }))
    }

    function draw() {
      c.clearRect(0, 0, cvs.width, cvs.height)

      particles.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY

        if (p.y < -10) p.y = cvs.height + 10
        if (p.x < -10) p.x = cvs.width + 10
        if (p.x > cvs.width + 10) p.x = -10

        c.beginPath()
        c.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        c.fillStyle = `rgba(37, 99, 235, ${p.opacity})`
        c.fill()
      })

      animationId = requestAnimationFrame(draw)
    }

    init()
    draw()

    window.addEventListener("resize", resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [count, prefersReduced])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
