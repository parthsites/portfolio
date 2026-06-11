"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Logo from "@/components/ui/Logo"

const NAV_ITEMS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
]

function scrollTo(href: string) {
  const el = document.querySelector(href)
  el?.scrollIntoView({ behavior: "smooth" })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNav = useCallback((href: string) => {
    setOpen(false)
    scrollTo(href)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center pt-3 md:pt-4 ${
        scrolled || open ? "" : ""
      }`}
    >
      <div
        className={`w-full max-w-5xl xl:max-w-6xl mx-auto flex items-center justify-between px-4 md:px-8 h-14 md:h-16 transition-all duration-500 ${
          scrolled || open
            ? "bg-white/75 backdrop-blur-2xl border border-primary/8 shadow-[0_8px_32px_-8px_rgba(37,99,235,0.1)] rounded-2xl mx-3 md:mx-6"
            : "bg-transparent border border-transparent rounded-2xl"
        }`}
      >
        <a href="#" className="flex items-center gap-3 group">
          <Logo size={40} />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.href)}
              className="text-sm text-muted hover:text-foreground transition-all duration-300 min-h-[44px] px-4 rounded-xl hover:bg-primary/5"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2 min-h-[44px] min-w-[44px] items-center justify-center"
          aria-label="Menu"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-5 h-[2px] bg-foreground rounded"
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            className="block w-5 h-[2px] bg-foreground rounded"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-5 h-[2px] bg-foreground rounded"
          />
        </button>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-3 right-3 mt-2 bg-white/90 backdrop-blur-2xl border border-primary/10 shadow-[0_8px_32px_-8px_rgba(37,99,235,0.12)] rounded-2xl overflow-hidden"
          >
            <div className="flex flex-col px-3 py-3 gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNav(item.href)}
                  className="text-left py-3 px-4 text-foreground font-medium rounded-xl hover:bg-primary/5 transition-colors min-h-[44px]"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
