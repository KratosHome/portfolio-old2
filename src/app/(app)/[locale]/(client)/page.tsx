import React, { FC, Suspense } from 'react'
import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/pagination'
import { Viewport } from 'next'
import { Experience } from '@/components/client/experience/experience'
import { Reviews } from '@/components/client/reviews/reviews'
import { Faq } from '@/components/client/faq/faq'
import { projectsData } from '@/data/projects-data'
import { homeMateData } from '@/data/meta-data/home-meta-data'
import { servicesData } from '@/data/services'
import { dataReviews } from '@/data/reviews'
import { gaqData } from '@/data/faq'
import { experienceData } from '@/data/experience'
import HomeSnippets from '@/components/client/snippets/home-snippets'
import { Projects } from '@/components/client/projects/projects'
import dynamic from 'next/dynamic'
import { Loader } from '@/components/UI/client/loader/loader'

const Hero = dynamic(() => import('@/components/client/hero/hero'), {
  loading: () => <Loader />,
})

const Services = dynamic(
  () => import('@/components/client/services/services'),
  {
    loading: () => <Loader />,
  },
)

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export async function generateMetadata({ params: { locale } }: PageProps) {
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

const Home: FC<PageProps> = async ({ params: { locale } }) => {
  const services = servicesData[locale]
  const projects = projectsData[locale]
  const dataReviewsSend = dataReviews
  const faq = gaqData[locale]
  const experience = experienceData[locale]

  return (
    <>
      <HomeSnippets locale={locale} />
      <Suspense fallback={<Loader />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Services services={services} />
      </Suspense>
      <Projects projects={projects} />
      <Projects projects={projects} />
      <Experience experience={experience} />
      <Reviews data={dataReviewsSend} />
      <Faq data={faq} />
    </>
  )
}

export default Home

/*
      <Services services={services} />
      <Projects projects={projects} />
      <Projects projects={projects} />
      <Experience experience={experience} />
      <Reviews data={dataReviewsSend} />
      <Faq data={faq} />
 */
