import React from 'react'
import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/pagination'
import { Viewport } from 'next'
import { homeMateData } from '@/data/meta-data/home-meta-data'
import Hero from '@/components/client/hero/hero'
import Services from '@/components/client/services/services'
import { servicesData } from '@/data/services'
import { projectsData } from '@/data/projects-data'
import { experienceData } from '@/data/experience'
import dynamic from 'next/dynamic'
import { Loader } from '@/components/UI/client/loader/loader'

const Projects = dynamic(
  () => import('@/components/client/projects/projects'),
  {
    loading: () => <Loader />,
  },
)

const Experience = dynamic(
  () => import('@/components/client/experience/experience'),
  {
    loading: () => <Loader />,
  },
)

const Reviews = dynamic(() => import('@/components/client/reviews/reviews'), {
  loading: () => <Loader />,
})

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
      <Experience experience={experienceData[locale]} />
      <Reviews />
    </>
  )
}

export default Home
