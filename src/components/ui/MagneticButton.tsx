"use client"

import { useRef, useState, type ReactNode, type MouseEvent } from "react"

interface MagneticButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: "primary" | "secondary" | "ghost"
  className?: string
}

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  function handleMouseMove(e: MouseEvent) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPosition({ x: x * 0.3, y: y * 0.3 })
  }

  function handleMouseLeave() {
    setPosition({ x: 0, y: 0 })
  }

  const baseStyles =
    "relative inline-flex items-center gap-2 px-6 py-3 min-h-[44px] rounded-full text-sm font-medium transition-colors duration-300 cursor-pointer"

  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-light shadow-lg shadow-primary/25",
    secondary:
      "border border-primary/50 text-primary hover:bg-primary/10 hover:border-primary",
    ghost:
      "text-muted hover:text-foreground hover:bg-white/5 border border-transparent hover:border-primary/20",
  }

  const style = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    transition: "transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
  }

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        style={style}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={style}
    >
      {children}
    </button>
  )
}
