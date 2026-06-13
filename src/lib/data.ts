import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiSupabase,
  SiNodedotjs,
  SiGithub,
} from "react-icons/si"

export const personalInfo = {
  name: "Parth Mane",
  brand: "Parth Sites",
  title: "Full Stack Web Developer",
  tagline: "Websites That Work",
  bio: [
    "I build modern, high-performance websites and full stack web applications using Next.js, TypeScript, React, Tailwind CSS and Supabase. Every project is crafted to help businesses establish a stronger online presence.",
    "From business websites to custom web applications, I focus on creating digital experiences that look premium, load fast, and deliver results. Clean code, thoughtful design, and reliable performance — no shortcuts.",
  ],
  services: [
    "Business Websites",
    "Doctor Websites",
    "Clinic Websites",
    "Gym Websites",
    "Portfolio Websites",
    "Landing Pages",
    "Full Stack Applications",
    "Custom Web Applications",
    "Database Driven Applications",
    "Next.js Development",
    "Website Redesigns",
  ],
  social: {
    instagram: "https://www.instagram.com/parth.web",
    instagramDm: "https://www.instagram.com/direct/t/parth.web",
    github: "https://github.com/parthsites",
    whatsapp: "919421361521",
    email: "parth@parthsites.com",
  },
}

export const skills = [
  {
    icon: SiNextdotjs,
    title: "Next.js",
    description:
      "Building SSR, SSG, and full-stack applications with the App Router, API routes, and server components.",
    gradient: "from-zinc-500/20 to-stone-500/20",
  },
  {
    icon: SiReact,
    title: "React",
    description:
      "Component-driven UIs with hooks, context, and modern React patterns for scalable interfaces.",
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    icon: SiTypescript,
    title: "TypeScript",
    description:
      "Type-safe code with strict mode, generics, and advanced type utilities for maintainable projects.",
    gradient: "from-blue-500/20 to-indigo-500/20",
  },
  {
    icon: SiTailwindcss,
    title: "Tailwind CSS",
    description:
      "Utility-first responsive design with custom design tokens and fluid, mobile-first layouts.",
    gradient: "from-teal-500/20 to-cyan-500/20",
  },
  {
    icon: SiSupabase,
    title: "Supabase",
    description:
      "Database-driven applications with real-time subscriptions, authentication, and row-level security.",
    gradient: "from-emerald-500/20 to-green-500/20",
  },
  {
    icon: SiNodedotjs,
    title: "Node.js",
    description:
      "RESTful APIs, serverless functions, and backend services integrated with modern frontends.",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: SiFramer,
    title: "Framer Motion",
    description:
      "Smooth animations, scroll-triggered reveals, and gesture-driven interactions for engaging UX.",
    gradient: "from-pink-500/20 to-rose-500/20",
  },
  {
    icon: SiGithub,
    title: "Git & Deployment",
    description:
      "Version control, CI/CD with GitHub Actions, and automated deployments to Vercel.",
    gradient: "from-purple-500/20 to-violet-500/20",
  },
]

export type ProjectCategory =
  | "Fitness Website"
  | "Doctor Website"
  | "Skin Clinic Website"
  | "Dental Website"
  | "Automobile Business Website"
  | "Real Estate Website"

export const projects = [
  {
    title: "Real Estate Agency",
    description:
      "A premium real estate agency website featuring property listings, advanced search filters, and a modern brand presence that drives client inquiries.",
    industry: "Real Estate",
    features: ["Property Listings", "Advanced Search", "Inquiry Forms"],
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    category: "Real Estate Website" as ProjectCategory,
    gradient: "from-blue-600 to-emerald-600",
    links: {
      github: "https://github.com/parthsites/realestate-demo",
      live: "https://realestate.parthsites.vercel.app/",
    },
    screenshot: "https://realestate.parthsites.vercel.app/",
  },
  {
    title: "Pune Fitness Hub",
    description:
      "A modern fitness studio website with class scheduling, trainer profiles, and a premium brand presence that drives membership inquiries.",
    industry: "Fitness",
    features: ["Class Scheduling", "Trainer Profiles", "Membership Inquiries"],
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    category: "Fitness Website" as ProjectCategory,
    gradient: "from-blue-600 to-cyan-600",
    links: {
      github: "https://github.com/parthsites/punefitnesshub-demo",
      live: "https://punefitnesshub.parthsites.vercel.app/",
    },
    screenshot: "https://punefitnesshub.parthsites.vercel.app/",
  },
  {
    title: "Dr Sachdeva",
    description:
      "A professional medical practice website with doctor profiles, patient resources, and appointment-focused design for healthcare credibility.",
    industry: "Healthcare",
    features: ["Doctor Profiles", "Patient Resources", "Appointment Booking"],
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    category: "Doctor Website" as ProjectCategory,
    gradient: "from-teal-600 to-blue-600",
    links: {
      github: "https://github.com/parthsites/drsachdeva-demo",
      live: "https://drsachdeva.parthsites.vercel.app/",
    },
    screenshot: "https://drsachdeva.parthsites.vercel.app/",
  },
  {
    title: "Skin Mantra Pune",
    description:
      "A skin clinic website blending medical professionalism with aesthetic elegance, including service catalogs and consultation booking.",
    industry: "Healthcare",
    features: ["Service Catalogs", "Consultation Booking", "Aesthetic Design"],
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    category: "Skin Clinic Website" as ProjectCategory,
    gradient: "from-purple-600 to-pink-600",
    links: {
      github: "https://github.com/parthsites/skinmantrapune-demo",
      live: "https://skinmantrapune.parthsites.vercel.app/",
    },
    screenshot: "https://skinmantrapune.parthsites.vercel.app/",
  },
  {
    title: "Dental Clinic",
    description:
      "A modern dental practice website with service showcases, patient education, and an inviting design that reduces appointment friction.",
    industry: "Healthcare",
    features: ["Service Showcases", "Patient Education", "Appointment Reduction"],
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    category: "Dental Website" as ProjectCategory,
    gradient: "from-blue-600 to-teal-600",
    links: {
      github: "https://github.com/parthsites/dentalclinic-app",
      live: "https://dentalclinic.parthsites.vercel.app/",
    },
    screenshot: "https://dentalclinic.parthsites.vercel.app/",
  },
  {
    title: "Dream Point Car Bazaar",
    description:
      "An automobile marketplace website with vehicle listings, inventory management, and a robust search experience for car buyers.",
    industry: "Automotive",
    features: ["Vehicle Listings", "Inventory Management", "Search Experience"],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    category: "Automobile Business Website" as ProjectCategory,
    gradient: "from-amber-600 to-orange-600",
    links: {
      github: "https://github.com/parthsites/Dream-point-car-bazaar",
      live: "https://www.dreampointcarbazaar.in/",
    },
    screenshot: "https://www.dreampointcarbazaar.in/",
  },
]

export const contactConfig = {
  whatsappNumber: "919421361521",
  email: "parth@parthsites.com",
  instagram: "https://www.instagram.com/parth.web",
  instagramDm: "https://www.instagram.com/direct/t/parth.web",
  github: "https://github.com/parthsites",
}
