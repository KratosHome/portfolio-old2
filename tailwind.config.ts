import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sansation: ['Sansation', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('/assets/background/fog.png')",
        'ellipse-pattern': "url('/assets/background/bg-ellipse.png')",
        'group-pattern': "url('/assets/background/group.png')",
      },
      colors: {
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-hamburgers'),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.bg-hero-pattern': {
          'background-image': "url('/assets/background/fog.png')",
          'background-repeat': 'no-repeat',
          'background-position': 'center',
          'background-size': 'contain',
        },
        '.bg-ellipse-pattern': {
          'background-image': "url('/assets/background/bg-ellipse.png')",
          'background-repeat': 'no-repeat',
          'background-position': 'center',
          'background-size': 'contain',
        },
        '.bg-ellipse-light-pattern': {
          'background-image': "url('/assets/background/bg-ellipse-light.png')",
          'background-repeat': 'no-repeat',
          'background-position': 'center',
          'background-size': 'contain',
        },
        '.bg-group-pattern': {
          'background-image': "url('/assets/background/group.png')",
          'background-repeat': 'no-repeat',
          'background-position': 'center',
          'background-size': 'contain',
        },
        '.bg-group-pattern-light': {
          'background-image': "url('/assets/background/group-light.svg')",
          'background-repeat': 'no-repeat',
          'background-position': 'center',
          'background-size': 'contain',
        },
        '.bg-group-torus-9': {
          'background-image': "url('/assets/background/torus-9.svg')",
          'background-repeat': 'no-repeat',
          'background-position': 'center',
          'background-size': 'contain',
        },
        '.bg-planet-first': {
          'background-image': "url('/assets/hero/round.png')",
          'background-repeat': 'no-repeat',
          'background-position': 'center',
          'background-size': 'contain',
        },
        '.bg-orbit': {
          'background-image': "url('/assets/hero/torus.png')",
          'background-repeat': 'no-repeat',
          'background-position': 'center',
          'background-size': 'contain',
        },
        '.bg-orbit-light': {
          'background-image': "url('/assets/hero/torus-light.png')",
          'background-repeat': 'no-repeat',
          'background-position': 'center',
          'background-size': 'contain',
        },
        '.bg-orbit-services': {
          'background-image': "url('/assets/services/torus.png')",
          'background-repeat': 'no-repeat',
          'background-position': 'center',
          'background-size': 'contain',
        },
        '.bg-orbit-services-light': {
          'background-image': "url('/assets/services/torus-light.png')",
          'background-repeat': 'no-repeat',
          'background-position': 'center',
          'background-size': 'contain',
        },
      })
    }),
  ],
}

export default config
