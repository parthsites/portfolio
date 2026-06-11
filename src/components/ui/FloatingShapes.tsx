"use client"

import { useRef, useEffect, useState } from "react"
import { useMousePosition } from "@/hooks/useMousePosition"
import { useReducedMotion } from "@/hooks/useReducedMotion"

const shapes = [
  { id: 1, size: 60, x: "15%", y: "20%", speed: 1, depth: 0.3, rotate: 45, border: true },
  { id: 2, size: 40, x: "80%", y: "15%", speed: 1.3, depth: 0.5, rotate: 0, border: true, rounded: true },
  { id: 3, size: 80, x: "70%", y: "70%", speed: 0.8, depth: 0.2, rotate: 0, border: false, gradient: true },
  { id: 4, size: 30, x: "25%", y: "75%", speed: 1.5, depth: 0.6, rotate: 30, border: true, rounded: true },
  { id: 5, size: 50, x: "50%", y: "50%", speed: 0.6, depth: 0.15, rotate: 0, border: false, gradient: true, rounded: true },
  { id: 6, size: 20, x: "90%", y: "45%", speed: 1.8, depth: 0.7, rotate: 0, border: true },
]

export default function FloatingShapes() {
  const mouse = useMousePosition()
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const [dimensions, setDimensions] = useState({ width: 1000, height: 1000 })

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight })
    function handleResize() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden">
      {shapes.map((shape) => {
        const cx = prefersReduced ? 0 : mouse.x / dimensions.width - 0.5
        const cy = prefersReduced ? 0 : mouse.y / dimensions.height - 0.5
        const moveX = cx * 2 * shape.depth * 40
        const moveY = cy * 2 * shape.depth * 40

        return (
          <div
            key={shape.id}
            className="absolute"
            style={{
              left: shape.x,
              top: shape.y,
              width: shape.size,
              height: shape.size,
              transform: `translate(${moveX}px, ${moveY}px) rotate(${shape.rotate}deg)`,
              transition: "transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
              animation: prefersReduced ? "none" : `float ${3 / shape.speed}s ease-in-out infinite`,
              animationDelay: prefersReduced ? "0s" : `${shape.id * 0.3}s`,
              borderRadius: shape.rounded ? "50%" : shape.border ? "4px" : "50%",
              border: shape.border ? "1px solid rgba(37, 99, 235, 0.2)" : "none",
              background: shape.gradient
                ? "linear-gradient(135deg, rgba(37, 99, 235, 0.08), rgba(96, 165, 250, 0.08))"
                : "transparent",
              backdropFilter: shape.gradient ? "blur(4px)" : "none",
            }}
          />
        )
      })}
    </div>
  )
}
