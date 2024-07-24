'use client'
import React, { useState, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
// @ts-ignore
import * as random from 'maath/random/dist/maath-random.esm'

const StarBackground = (props: any) => {
  const ref: any = useRef()
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.2 }),
  )

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 20
    ref.current.rotation.y -= delta / 35
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="$fff"
          size={0.002}
          sizeAttenuation={true}
          dethWrite={false}
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
