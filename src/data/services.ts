import astro from '@/assets/technologies/astro-dark.svg'
import react from '@/assets/technologies/ReactLogo.svg'
import vue from '@/assets/technologies/vue.svg'
import next from '@/assets/technologies/NextLogo.svg'
import gsap from '@/assets/technologies/gsap-greensock.svg'
import electron from '@/assets/technologies/electron.svg'
import googleSurveys from '@/assets/technologies/google-surveys.svg'
import googleAnalytics from '@/assets/technologies/google-analytics.svg'
import strapi from '@/assets/technologies/StrapiLogo.svg'

const servicesDataUa = [
  {
    id: 1,
    title: 'Веб застосунок',
    description:
      'Створюю сучасні веб-застосунки з React та Vue для ефективних, швидких та великих рішень.',
    icon: [
      {
        id: 1,
        alt: 'React JS',
        icon: react,
      },
      {
        id: 2,
        alt: 'Vue JS',
        icon: vue,
      },
    ],
  },
  {
    id: 2,
    title: 'E-commerce проект',
    description:
      'Розробляю потужні e-commerce проекти з використанням Next, Astro, GSAP та Strapi.',
    icon: [
      {
        id: 1,
        alt: 'Next JS',
        icon: next,
      },
      {
        id: 2,
        alt: 'Astro JS',
        icon: astro,
      },
      {
        id: 3,
        alt: 'GSAP',
        icon: gsap,
      },
      {
        id: 4,
        alt: 'Strapi',
        icon: strapi,
      },
    ],
  },
  {
    id: 3,
    title: 'Застосунок для iOS та Android',
    description:
      'Створюю кроссплатформенні мобільні застосунки з React Native для iOS та Android.',
    icon: [
      {
        id: 1,
        alt: 'React Native',
        icon: react,
      },
    ],
  },
  {
    id: 4,
    title: 'Застосунок для Mac та Windows',
    description:
      'Розробляю потужні десктопні застосунки з React Native та Electron.',
    icon: [
      {
        id: 1,
        alt: 'React Native',
        icon: react,
      },
      {
        id: 2,
        alt: 'Electron',
        icon: electron,
      },
    ],
  },
  {
    id: 5,
    title: 'Оптимізація продуктивності',
    description:
      'Оптимізую продуктивність з використанням Google Analytics та Similar Web.',
    icon: [
      {
        id: 1,
        alt: 'Google Analytics',
        icon: googleAnalytics,
      },
      {
        id: 2,
        alt: 'Similar Web',
        icon: googleSurveys,
      },
    ],
  },
  {
    id: 6,
    title: 'Менторинг',
    description:
      'Надаю професійний менторинг з технологій React, Next, Astro та GSAP.',
    icon: [
      {
        id: 1,
        alt: 'React',
        icon: react,
      },
      {
        id: 2,
        alt: 'Next JS',
        icon: next,
      },
      {
        id: 3,
        alt: 'Astro JS',
        icon: astro,
      },
      {
        id: 4,
        alt: 'GSAP',
        icon: gsap,
      },
    ],
  },
]

export const servicesData = {
  en: servicesDataUa,
  uk: servicesDataUa,
  fr: servicesDataUa,
}
