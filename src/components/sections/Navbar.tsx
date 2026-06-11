"use client"

import { useState, useEffect } from "react"
import Logo from "@/components/ui/Logo"

const NAV_ITEMS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/70 backdrop-blur-xl border-b border-primary/20 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 h-16 md:h-20">
        <a href="#" className="flex items-center">
          <Logo size={36} />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                const el = document.querySelector(item.href)
                el?.scrollIntoView({ behavior: "smooth" })
              }}
              className="text-sm text-muted hover:text-foreground transition-colors duration-300"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
