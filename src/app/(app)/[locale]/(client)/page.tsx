import { FC } from 'react'
import { Viewport } from 'next'
import { homeMateData } from '@/data/OlegTkach/meta/home-meta-data'
import HomeSnippets from '@/components/snippets/home-snippets'
import { servicesData } from '@/data/services'
import { projectsData } from '@/data/projects-data'
import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/pagination'
import { experienceData } from '@/data/experience'
import { Services } from '@/components/client/services/services'
import { Projects } from '@/components/client/projects/projects'
import { Experience } from '@/components/client/experience/experience'
import Hero from '@/components/client/hero/hero'
import { Reviews } from '@/components/client/reviews/reviews'
import { dataReviews } from '@/data/reviews'
import { Faq } from '@/components/client/faq/faq'
import { gaqData } from '@/data/faq'

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
  return (
    <>
      <HomeSnippets locale={locale} />
    </>
  )
}

export default Home

/*
  const services = servicesData[locale]
  const projects = projectsData[locale]
  const experience = experienceData[locale]
  const dataReviewsSend = dataReviews
  const faq = gaqData[locale]


      <Hero />
      <HomeSnippets locale={locale} />
      <Services services={services} />
      <Projects projects={projects} />
      <Experience experience={experience} />
      <Reviews data={dataReviewsSend} />
      <Faq data={faq} />
 */
