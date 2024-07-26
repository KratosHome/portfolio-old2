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
    },
  },
  plugins: [
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
        '.bg-group-pattern': {
          'background-image': "url('/assets/background/group.png')",
          'background-repeat': 'no-repeat',
          'background-position': 'center',
          'background-size': 'contain',
        },
      })
    }),
  ],
}

export default config
