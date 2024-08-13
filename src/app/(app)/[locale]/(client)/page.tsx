import { FC } from 'react'
import { Viewport } from 'next'
import { homeMateData } from '@/components/metadata/home-meta-data'
import HomeSnippets from '@/components/snippets/home-snippets'
import Hero from '@/components/hero/hero'
import { Services } from '@/components/services/services'
import { servicesData } from '@/data/services'
import { Projects } from '@/components/projects/projects'
import { projectsData } from '@/data/projects-data'
import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/pagination'
import { Experience } from '@/components/experience/experience'
import { experienceData } from '@/data/experience'
import { Reviews } from '@/components/reviews/reviews'
import { getReviewAction } from '@/server/reviws/gert-review.server'
import { Faq } from '@/components/faq/faq'
import { Contact } from '@/components/contact/contact'

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
  const responseReviews = await getReviewAction()
  const dataReviews = await responseReviews.json()

  return (
    <>
      <HomeSnippets locale={locale} />
      <Hero />
    </>
  )
}

export default Home

/*
      <Services services={services} />
      <Projects projects={projects} />
      <Experience experience={experience} />
      <Reviews data={dataReviews} />
      <Faq />
      <Contact />
 */
