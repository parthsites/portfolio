<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Session Log — Phase 9: Premium Visual Polish (Color System Upgrade)

## Changes Made
- **globals.css**: Set `--color-border: #2563EB` so `border-primary/{opacity}` works via Tailwind
- **SectionAccent**: Larger orbs (`w-96 h-96`), `bg-primary/8` default
- **FloatingShapes**: Updated rgba to `#2563EB` primary, softer opacity borders (0.2)
- **ParticleField**: Particle fill `rgba(37, 99, 235, ${p.opacity})`
- **CustomCursor**: Ring border `border-primary/30`, background `bg-primary/8`
- **Navbar**: Scrolled border `border-primary/10`, shadow `shadow-primary/5`
- **About**: Service tags use palette colors, `backdrop-blur-sm` on tags, card uses `shadow-lg shadow-primary/5`
- **Skills**: Glassmorphism cards — `bg-white/80`, inner shadow icon, gradient overlay, premium border `border-primary/10`
- **Projects**: Premium card depth — `hover:-translate-y-1`, `hover:shadow-2xl hover:shadow-primary/10`, glass reflection overlay, refined typography/link interactions
- **Contact**: Glass form `bg-white/70`, gradient border glow, input subtle bg highlight on focus, button shimmer sweep animation, premium shadow
- **Footer**: Border `border-primary/10`
- **MagneticButton**: Ghost variant border `hover:border-primary/20`
- **Hero**: Gradient background `from-primary/8 via-background to-primary/5`, tag badge `bg-white/50`
- **Skills SectionAccent**: `bg-primary/8` (was `bg-blue-500/8`)
- Removed all `rgba(29,78,216,...)` references, replaced with `rgba(37,99,235,...)`
- Removed all `border-border/*` references, replaced with `border-primary/*`

## Verification
- `npm run build` passes (4.0s compile, 0 TypeScript errors, all pages static)

# Session Log — Phase 10: Premium Design Refinement (Trust, Hierarchy, Conversion)

## Changes Made
### Three.js Polygon Dominance Reduction
- `ThreeScene.tsx`: Icosahedron radius 0.9→0.75 (desktop), 0.7→0.55 (mobile) — ~17% smaller
- Opacity 0.5→0.35 (desktop), 0.35→0.25 (mobile) — ~30% more subtle
- Reduced `transmission` (0.95→0.92), `thickness` (0.3→0.2), `clearcoat` (0.1→0.05)
- `roughness` increased (0.1→0.15) for softer glass look

### Apple-level Hero Headline
- Gradient: `from-primary via-blue-400 to-accent` (softer, more premium transition)
- Typography: `tracking-[-0.03em]` tighter, `leading-[1.05]`, sizes bumped: `text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl`
- Animation: longer word reveal (0.7s), more staggered (0.08 delay per word)
- Content layer: `z-20` (above 3D), `mt-8 md:mt-0` for vertical centering

### Outcome-Focused Hero Description
- Replaced old tech-heavy text with: "Premium websites and custom web applications designed to help businesses stand out, build trust, and grow online."

### Trust Strip Below CTAs
- New `motion.div` with fade-in animation at delay=1
- Tech names: Next.js • TypeScript • Supabase • Tailwind CSS
- Small dots as separators, `text-xs text-muted/60`

### Enhanced Ambient Background
- Added fifth radial gradient layer: `radial-gradient(ellipse 55% 25% at 30% 70%, rgba(37, 99, 235, 0.05) 0%, transparent 50%)`
- Repositioned existing gradients for better depth

### Premium Navbar
- Logo: 42px (was 36px)
- Glass: `bg-white/75 backdrop-blur-2xl` + `bg-white/0` transparent default
- Desktop nav items: `px-4 rounded-lg hover:bg-primary/5` for subtle hover state
- Height: `h-16 md:h-20`
- Border: `border-primary/8`

### Redesigned About Section
- 5-column grid layout (bio 3 cols, card 2 cols)
- Subtitle below heading for better hierarchy
- Bio paragraphs: `leading-[1.75]`, `space-y-5`
- Services wrapped in premium glass container: `p-6 rounded-2xl border border-primary/8 bg-white/50 backdrop-blur-sm`
- Logo card: outer glow via `-inset-4` gradient blur, improved spacing
- Added "Based in India" tagline

### Premium Skills Cards
- Shadows: `shadow-[0_2px_12px_-4px_rgba(37,99,235,0.08)]` → `hover:shadow-[0_12px_40px_-8px_rgba(37,99,235,0.15)]`
- Icon: `ring-1 ring-primary/5` → `group-hover:ring-primary/15`, `group-hover:scale-110`
- Inner glass overlay on hover for depth
- Title: `text-foreground`, description: `text-muted/80`

### Conversion-Optimized Projects Section
- New trust badge: "Real Projects — Live & Deployed" with animated glow dot
- Card shadows: classic → `shadow-[0_2px_12px_-4px_rgba(37,99,235,0.06)]` → `hover:shadow-[0_16px_48px_-12px_rgba(37,99,235,0.18)]`
- Hover lift: `-translate-y-1.5`
- Double glass overlay on hover
- Buttons redesigned: "Live Website" (primary filled, flex-1) + "Code" (ghost, flex-[0.6])
- Live button: `rounded-xl bg-primary text-white shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30`
- Code button: `rounded-xl bg-primary/5 border border-primary/10`

### Stronger Contact Conversion
- Headline: "Let's Build Something Great" (was "Let's Build Something")
- Subheadline: "Need a website or custom web application? Let's discuss your project."
- Form: `p-8 md:p-10`, `bg-white/70 backdrop-blur-2xl`, `shadow-[0_8px_40px_-12px_rgba(37,99,235,0.12)]`
- Border glow on focus: `absolute -inset-[1px] bg-gradient-to-b from-primary/10 via-transparent to-accent/10`
- CTA button: `py-4 font-semibold`, `shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35`
- Shimmer: `via-white/20` (brighter sweep)
- Input borders: `border-primary/8`, labels: `text-muted/70`
- Larger accent orbs: 96, 500px

## Design Tokens (globals.css)
- `--color-background: #F8FBFF`
- `--color-primary: #2563EB`
- `--color-primary-light: #60A5FA`
- `--color-secondary: #3B82F6`
- `--color-accent: #93C5FD`
- `--color-border: #2563EB`
- `--color-surface: #FFFFFF`
- `--color-muted: #475569`
- Border opacity classes: `border-primary/10`, `/20`, `/30`, etc.
