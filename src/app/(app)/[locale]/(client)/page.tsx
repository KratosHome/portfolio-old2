import { FC } from 'react'
import { Viewport } from 'next'
import homeMetadata from '@/components/metadata/home-meta-data'
import HomeSnippets from '@/components/snippets/home-snippets'
import Hero from '@/components/hero/hero'
import { Services } from '@/components/services/services'
import { servicesData } from '@/data/services'
import { Projects } from '@/components/projects/projects'
import { projectsData } from '@/data/projects-data'
import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/pagination'
import { getTranslations } from 'next-intl/server'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}
export async function generateMetadata({ params: { locale } }: PageProps) {
  return homeMetadata(locale)
}

const Home: FC<PageProps> = async ({ params: { locale } }) => {
  const services = servicesData[locale]
  const projects = projectsData[locale]
  return (
    <>
      <HomeSnippets locale={locale} />
      <Hero />
      <Services services={services} />
      <Projects projects={projects} />
    </>
  )
}

export default Home
