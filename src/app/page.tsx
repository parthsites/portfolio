import Navbar from "@/components/sections/Navbar"
import Hero from "@/components/sections/Hero"
import About from "@/components/sections/About"
import Skills from "@/components/sections/Skills"
import Projects from "@/components/sections/Projects"
import Contact from "@/components/sections/Contact"
import Logo from "@/components/ui/Logo"
import { personalInfo } from "@/lib/data"
import { contactConfig } from "@/lib/data"
import { SiInstagram } from "react-icons/si"
import { FaWhatsapp } from "react-icons/fa"
import { FiGithub } from "react-icons/fi"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />

      <footer className="border-t border-border/50 py-6 md:py-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo size={32} />
            <p className="text-sm text-muted">
              &copy; {new Date().getFullYear()} {personalInfo.brand}. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <a
              href={contactConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <FiGithub className="w-5 h-5" />
            </a>
            <a
              href={contactConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground transition-colors"
              aria-label="Instagram"
            >
              <SiInstagram className="w-5 h-5" />
            </a>
            <a
              href={`https://wa.me/${contactConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground transition-colors"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
