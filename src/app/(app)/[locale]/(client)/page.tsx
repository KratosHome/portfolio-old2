import { FC } from 'react'
import { Viewport } from 'next'
import HomeSnippets from '@/components/snippets/home-snippets'
import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/pagination'
import { Services } from '@/components/client/services/services'
import { Projects } from '@/components/client/projects/projects'
import { Experience } from '@/components/client/experience/experience'
import Hero from '@/components/client/hero/hero'
import { Reviews } from '@/components/client/reviews/reviews'
import { Faq } from '@/components/client/faq/faq'
import { servicesData } from '@/data/users/OlegTkach/services'
import { projectsData } from '@/data/users/OlegTkach/projects-data'
import { dataReviews } from '@/data/users/OlegTkach/reviews'
import { gaqData } from '@/data/users/OlegTkach/faq'
import { experienceData } from '@/data/users/OlegTkach/experience'
import { homeMateData } from '@/data/users/OlegTkach/meta/home-meta-data'

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
  const dataReviewsSend = dataReviews as any
  const faq = gaqData[locale]
  const experience = experienceData[locale]

  return (
    <>
      <HomeSnippets locale={locale} />
      <Hero />
      <Services services={services} />
      <Projects projects={projects} />
      <Experience experience={experience} />
      <Reviews data={dataReviewsSend} />
      <Faq data={faq} />
    </>
  )
}

export default Home
