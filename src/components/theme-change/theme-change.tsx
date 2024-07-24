'use client'
import { useRef, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { gsap } from 'gsap'

const ThemeChange = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const svgRef = useRef(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const changeTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
    gsap.to(svgRef.current, {
      rotate: 360,
      opacity: 1,
      duration: 0.5,
      ease: 'power1.inOut',
    })
    gsap.set(svgRef.current, { clearProps: 'all' })
  }

  const handleMouseEnter = () => {
    gsap.fromTo(
      svgRef.current,
      { scale: 1 },
      {
        scale: 0.6,
        duration: 0.3,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: 1,
      },
    )
  }

  if (!mounted) {
    return null
  }
  return (
    <div onClick={changeTheme} className="max-w-max bg-black">
      <div
        ref={svgRef}
        onMouseEnter={handleMouseEnter}
        className="-mt-1 cursor-pointer fill-orange-800 dark:stroke-orange-800"
      >
        {theme === 'light' ? <div>light</div> : <div>dark</div>}
      </div>
    </div>
  )
}

export default ThemeChange
