import { FC } from 'react'
import { Viewport } from 'next'
import { homeMateData } from '@/components/metadata/home-meta-data'
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
  console.log('locale', locale)
  const projects = homeMateData[locale]
  return {
    title: 'locale',
  }
}

const Home: FC<PageProps> = async ({ params: { locale } }) => {
  const services = servicesData[locale]
  const projects = projectsData[locale]
  const experience = experienceData[locale]
  const dataReviewsSend = dataReviews
  const faq = gaqData[locale]

  return (
    <>
      <HomeSnippets locale={locale} />
      <Hero />
    </>
  )
}

export default Home

/*
      <HomeSnippets locale={locale} />
      <Services services={services} />
      <Projects projects={projects} />
      <Experience experience={experience} />
      <Reviews data={dataReviewsSend} />
      <Faq data={faq} />
 */
