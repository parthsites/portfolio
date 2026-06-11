"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "@/hooks/useReducedMotion"

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) return

    const isTouchDevice = "ontouchstart" in window
    if (isTouchDevice) return

    const cursor = cursorRef.current
    if (!cursor) return

    const el = cursor
    let mouseX = 0
    let mouseY = 0
    let currentX = 0
    let currentY = 0
    let rafId: number

    function handleMouseMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    function handleMouseEnterInteractive() {
      el.style.transform = "scale(1.5)"
      el.style.mixBlendMode = "difference"
    }

    function handleMouseLeaveInteractive() {
      el.style.transform = ""
      el.style.mixBlendMode = ""
    }

    function animate() {
      currentX += (mouseX - currentX) * 0.15
      currentY += (mouseY - currentY) * 0.15

      el.style.left = `${currentX}px`
      el.style.top = `${currentY}px`

      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove)

    const interactiveElements = document.querySelectorAll(
      "a, button, [data-cursor]"
    )
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnterInteractive)
      el.addEventListener("mouseleave", handleMouseLeaveInteractive)
    })

    rafId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("mousemove", handleMouseMove)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnterInteractive)
        el.removeEventListener("mouseleave", handleMouseLeaveInteractive)
      })
    }
  }, [prefersReduced])

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hidden md:block"
      style={{ willChange: "transform" }}
    >
      <div className="w-full h-full rounded-full border-2 border-primary/30 backdrop-blur-sm bg-primary/8 transition-all duration-300" />
    </div>
  )
}
