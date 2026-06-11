import Image from "next/image"

interface LogoProps {
  className?: string
  size?: number
}

export default function Logo({ className, size = 40 }: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="Parth Sites"
      width={size}
      height={size}
      className={`rounded-full object-cover ${className ?? ""}`}
      priority
    />
  )
}
