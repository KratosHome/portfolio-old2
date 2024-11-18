import React from 'react'
import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/pagination'
import { Viewport } from 'next'
import { homeMateData } from '@/data/meta-data/home-meta-data'
import Hero from '@/components/client/hero/hero'
import Services from '@/components/client/services/services'
import { servicesData } from '@/data/services'
import { Projects } from '@/components/client/projects/projects'
import { projectsData } from '@/data/projects-data'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

type Params = Promise<{ locale: ILocale }>

export async function generateMetadata({ params }: { params: Params }) {
  const { locale } = await params

  const projects = homeMateData[locale]

  return {
    title: projects.title,
    description: projects.description,
    keywords: projects.keywords,
    authors: projects.authors,
    openGraph: {
      url: projects.canonicalUrl,
      title: projects.openGraph.title,
      description: projects.openGraph.description,
      locale: projects.openGraph.locale,
      siteName: projects.openGraph.site_name,
      images: projects.openGraph.images,
    },
  }
}

const Home = async ({ params }: { params: Params }) => {
  const { locale } = await params

  return (
    <>
      <Hero />
      <Services services={servicesData[locale]} />
      <Projects projects={projectsData[locale]} />
    </>
  )
}

export default Home
