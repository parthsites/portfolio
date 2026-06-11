"use client"

import { useRef, Suspense, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  Float,
  MeshTransmissionMaterial,
  Environment,
} from "@react-three/drei"
import * as THREE from "three"

function GeometricShape({ isMobile }: { isMobile: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ pointer, clock }) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += 0.004
    meshRef.current.rotation.y += 0.008

    if (groupRef.current) {
      groupRef.current.position.x =
        Math.sin(clock.elapsedTime * 0.25) * 1.8
      groupRef.current.position.y =
        Math.sin(clock.elapsedTime * 0.35) * 0.3
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[isMobile ? 0.55 : 0.75, 0]} />
          <MeshTransmissionMaterial
            color="#60a5fa"
            transmission={0.92}
            thickness={0.2}
            roughness={0.15}
            metalness={0}
            clearcoat={0.05}
            clearcoatRoughness={0.5}
            opacity={isMobile ? 0.25 : 0.35}
          />
        </mesh>
      </Float>
    </group>
  )
}

export default function ThreeScene() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile("ontouchstart" in window || window.innerWidth < 768)
  }, [])

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    >
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <Environment preset="city" />
          <GeometricShape isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  )
}
