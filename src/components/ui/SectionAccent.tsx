interface SectionAccentProps {
  position: "top-right" | "top-left" | "bottom-right" | "bottom-left"
  color?: string
  size?: string
}

export default function SectionAccent({
  position,
  color = "bg-primary/8",
  size = "w-96 h-96",
}: SectionAccentProps) {
  const positions = {
    "top-right": "top-0 right-0 -translate-y-1/3 translate-x-1/3",
    "top-left": "top-0 left-0 -translate-y-1/3 -translate-x-1/3",
    "bottom-right": "bottom-0 right-0 translate-y-1/3 translate-x-1/3",
    "bottom-left": "bottom-0 left-0 translate-y-1/3 -translate-x-1/3",
  }

  return (
    <div
      className={`absolute ${positions[position]} ${size} ${color} rounded-full blur-[100px] pointer-events-none`}
    />
  )
}
