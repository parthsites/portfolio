"use client"

import { useState, type FormEvent } from "react"
import { motion } from "framer-motion"
import { FaWhatsapp, FaPhone, FaInstagram, FaGithub } from "react-icons/fa"
import { FiMail, FiSend, FiCheckCircle, FiClock } from "react-icons/fi"
import { personalInfo, contactConfig } from "@/lib/data"
import SectionWrapper from "@/components/ui/SectionWrapper"
import SectionAccent from "@/components/ui/SectionAccent"
import TextReveal from "@/components/ui/TextReveal"
import MagneticButton from "@/components/ui/MagneticButton"
import Logo from "@/components/ui/Logo"

interface FormData {
  name: string
  business: string
  email: string
  requirement: string
}

const initialForm: FormData = {
  name: "",
  business: "",
  email: "",
  requirement: "",
}

export default function Contact() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [showEmailFallback, setShowEmailFallback] = useState(false)

  function updateField(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function buildWhatsAppMessage(data: FormData): string {
    return (
      `Hello Parth,%0A%0A` +
      `My Name: ${data.name}%0A` +
      `Business Name: ${data.business}%0A` +
      `Email: ${data.email}%0A%0A` +
      `Project Requirement:%0A${data.requirement}%0A%0A` +
      `I would like to discuss a website project.`
    )
  }

  function buildMailTo(data: FormData): string {
    const subject = encodeURIComponent("Website Project Inquiry")
    const body = encodeURIComponent(
      `Hello Parth,\n\n` +
        `My Name: ${data.name}\n` +
        `Business Name: ${data.business}\n` +
        `Email: ${data.email}\n\n` +
        `Project Requirement:\n${data.requirement}\n\n` +
        `I would like to discuss a website project.`
    )
    return `mailto:${contactConfig.email}?subject=${subject}&body=${body}`
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const url = `https://wa.me/${contactConfig.whatsappNumber}?text=${buildWhatsAppMessage(form)}`
    setSubmitted(true)

    // Try WhatsApp, show email fallback after timeout
    window.open(url, "_blank")

    setTimeout(() => {
      setShowEmailFallback(true)
    }, 2000)
  }

  function handleEmailRedirect() {
    window.location.href = buildMailTo(form)
  }

  return (
    <SectionWrapper id="contact" className="min-h-screen flex items-center">
      <SectionAccent position="top-right" color="bg-primary/10" size="w-96 h-96" />
      <SectionAccent position="bottom-left" color="bg-accent/8" size="w-[500px] h-[500px]" />
      <div className="max-w-7xl mx-auto w-full">
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <TextReveal
            as="h2"
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
          >
            Let&apos;s Build Something Great
          </TextReveal>
          <TextReveal
            delay={0.2}
            className="text-lg md:text-xl text-muted/85 leading-relaxed"
          >
            Need a website or custom web application? Let&apos;s discuss your project.
          </TextReveal>
        </div>

        <div className="grid md:grid-cols-5 gap-8 md:gap-10 lg:gap-16 items-start">
          {/* Left Column — Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-3"
          >
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="relative p-8 md:p-10 rounded-2xl border border-primary/8 bg-white/70 backdrop-blur-2xl shadow-[0_8px_40px_-12px_rgba(37,99,235,0.12)]"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/5 via-transparent to-accent/5 pointer-events-none" />
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-primary/10 via-transparent to-accent/10 pointer-events-none opacity-0 transition-opacity duration-500 has-[:focus]:opacity-100" />

                <div className="relative z-10">
                  {(
                    [
                      { key: "name", label: "Your Name", type: "text" },
                      { key: "business", label: "Business Name", type: "text" },
                      { key: "email", label: "Email Address", type: "email" },
                    ] as const
                  ).map(({ key, label, type }) => (
                    <div key={key} className="relative mb-6 group">
                      <div className="absolute inset-0 rounded-lg bg-primary/3 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      <input
                        type={type}
                        id={key}
                        required
                        value={form[key]}
                        onChange={(e) => updateField(key, e.target.value)}
                        className="peer w-full px-4 pt-6 pb-2 bg-transparent border-b border-primary/8 focus:border-primary outline-none text-foreground transition-all duration-300"
                        placeholder=" "
                      />
                      <label
                        htmlFor={key}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/70 text-sm transition-all duration-300 peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary"
                      >
                        {label}
                      </label>
                    </div>
                  ))}

                  <div className="relative mb-8 group">
                    <div className="absolute inset-0 rounded-lg bg-primary/3 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <textarea
                      id="requirement"
                      required
                      rows={4}
                      value={form.requirement}
                      onChange={(e) => updateField("requirement", e.target.value)}
                      className="peer w-full px-4 pt-6 pb-2 bg-transparent border-b border-primary/8 focus:border-primary outline-none text-foreground transition-all duration-300 resize-none"
                      placeholder=" "
                    />
                    <label
                      htmlFor="requirement"
                      className="absolute left-4 top-4 text-muted/70 text-sm transition-all duration-300 peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary"
                    >
                      Project Requirement
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="relative w-full py-4 px-6 rounded-full bg-primary text-white font-semibold flex items-center justify-center gap-2 hover:bg-primary-light transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 overflow-hidden group/btn"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                    <span className="relative z-10 flex items-center gap-2">
                      <FiSend className="w-4 h-4" />
                      Send Message
                    </span>
                  </button>

                  <p className="text-xs text-muted/50 text-center mt-4">
                    You&apos;ll be redirected to WhatsApp to complete your inquiry.
                  </p>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 md:p-10 rounded-2xl border border-primary/8 bg-white/70 backdrop-blur-2xl text-center shadow-[0_8px_40px_-12px_rgba(37,99,235,0.12)]"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4 shadow-inner shadow-primary/5">
                  <FaWhatsapp className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Check Your WhatsApp
                </h3>
                <p className="text-muted/70 text-sm mb-6">
                  Your message has been prepared. If WhatsApp didn&apos;t open
                  automatically, use the options below.
                </p>
                {showEmailFallback && (
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={handleEmailRedirect}
                      className="py-3 px-6 rounded-full border border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <FiMail className="w-4 h-4" />
                      Send via Email
                    </button>
                    <MagneticButton
                      href={contactConfig.instagramDm}
                      variant="ghost"
                    >
                      <FaInstagram className="w-4 h-4" />
                      DM on Instagram
                    </MagneticButton>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* Right Column — Business Info Panel */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-2 md:sticky md:top-24 space-y-5"
          >
            {/* Brand card */}
            <div className="p-6 md:p-7 rounded-2xl border border-primary/8 bg-white/70 backdrop-blur-2xl shadow-[0_8px_40px_-12px_rgba(37,99,235,0.12)]">
              <div className="flex items-center gap-4 mb-5">
                <Logo size={48} />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{personalInfo.name}</h3>
                  <p className="text-sm text-muted/70">{personalInfo.title}</p>
                </div>
              </div>

              <p className="text-sm text-muted/70 leading-relaxed mb-5">
                I build modern websites and full stack applications designed to help businesses establish a stronger online presence and improve customer engagement.
              </p>

              {/* Contact cards */}
              <div className="space-y-3">
                <a
                  href={`tel:+${contactConfig.whatsappNumber}`}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-primary/5 hover:bg-primary/10 transition-all duration-300 border border-primary/8 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                    <FaPhone className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted/50">Phone</p>
                    <p className="text-sm font-medium text-foreground/90">+91 {contactConfig.whatsappNumber}</p>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${contactConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-primary/5 hover:bg-primary/10 transition-all duration-300 border border-primary/8 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                    <FaWhatsapp className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted/50">WhatsApp</p>
                    <p className="text-sm font-medium text-foreground/90">+91 {contactConfig.whatsappNumber}</p>
                  </div>
                </a>

                <a
                  href={contactConfig.instagramDm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-primary/5 hover:bg-primary/10 transition-all duration-300 border border-primary/8 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                    <FaInstagram className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted/50">Instagram</p>
                    <p className="text-sm font-medium text-foreground/90">@parth.web</p>
                  </div>
                </a>

                <a
                  href={contactConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-primary/5 hover:bg-primary/10 transition-all duration-300 border border-primary/8 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                    <FaGithub className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted/50">GitHub</p>
                    <p className="text-sm font-medium text-foreground/90">github.com/parthsites</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Services card */}
            <div className="p-6 md:p-7 rounded-2xl border border-primary/8 bg-white/60 backdrop-blur-sm shadow-[0_2px_12px_-4px_rgba(37,99,235,0.06)]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-4 rounded-full bg-primary/40" />
                <h3 className="text-xs font-semibold text-foreground uppercase tracking-[0.15em]">Services</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {personalInfo.services.slice(0, 8).map((service) => (
                  <span
                    key={service}
                    className="px-2.5 py-1 text-xs rounded-full bg-primary/5 text-muted/80 border border-primary/8"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Trust badge */}
            <div className="flex items-center justify-center gap-2 text-xs text-muted/50">
              <FiClock className="w-3.5 h-3.5" />
              <span>Usually replies within 24 hours</span>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
