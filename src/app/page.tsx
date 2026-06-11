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

      <footer className="border-t border-primary/8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Brand */}
            <div className="flex flex-col items-start gap-3">
              <Logo size={40} />
              <p className="text-sm font-semibold text-foreground">{personalInfo.brand}</p>
              <p className="text-sm text-muted/60 leading-relaxed max-w-xs">
                Premium websites and custom web applications built for businesses that want to stand out online.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-[0.15em] mb-4">Contact</h4>
              <div className="space-y-3">
                <a
                  href={`tel:+${contactConfig.whatsappNumber}`}
                  className="flex items-center gap-2.5 text-sm text-muted/70 hover:text-foreground transition-colors group"
                >
                  <FaWhatsapp className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" />
                  +91 {contactConfig.whatsappNumber}
                </a>
                <a
                  href={contactConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-muted/70 hover:text-foreground transition-colors group"
                >
                  <SiInstagram className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" />
                  @parth.web
                </a>
                <a
                  href={contactConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-muted/70 hover:text-foreground transition-colors group"
                >
                  <FiGithub className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" />
                  github.com/parthsites
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-[0.15em] mb-4">Navigation</h4>
              <div className="space-y-3">
                {["Work", "About", "Skills", "Contact"].map((label) => (
                  <a
                    key={label}
                    href={`#${label.toLowerCase()}`}
                    className="block text-sm text-muted/70 hover:text-primary transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-primary/8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted/50">
              &copy; {new Date().getFullYear()} {personalInfo.brand}. All Rights Reserved.
            </p>
            <p className="text-xs text-muted/40">
              Websites That Work
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
