'use client'
import React, { useState, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
// @ts-ignore
import * as random from 'maath/random/dist/maath-random.esm'
import { useTheme } from 'next-themes'

const StarBackground = (props: any) => {
  const { theme } = useTheme()
  const ref: any = useRef()
  const [sphere] = useState(() => {
    const positions = new Float32Array(5000 * 3)
    random.inSphere(positions, { radius: 1.2 })
    return positions
  })

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 100
      ref.current.rotation.y -= delta / 100
    }
  })

  console.log('theme', theme)

  return (
    <group rotation={[0, 0, Math.PI / 5]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color={theme === 'dark' ? '#ffffff' : 'black'}
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

const StarsCanvas = () => (
  <div className="fixed bottom-0 left-0 right-0 top-0 -z-10 h-auto w-full">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <StarBackground />
      </Suspense>
    </Canvas>
  </div>
)

export default StarsCanvas
