import { FC, Suspense } from 'react'
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
import { Services } from '@/components/client/services/services'

const Hero = dynamic(() => import('@/components/client/hero/hero'), {
  loading: () => <p>Loading...</p>,
})

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
      <Suspense fallback={<p>Loading Services...</p>}>
        <Services services={services} />
      </Suspense>
      <Suspense fallback={<p>Loading Projects...</p>}>
        <Projects projects={projects} />
      </Suspense>
      <Suspense fallback={<p>Loading Experience...</p>}>
        <Experience experience={experience} />
      </Suspense>
      <Suspense fallback={<p>Loading Reviews...</p>}>
        <Reviews data={dataReviewsSend} />
      </Suspense>
      <Suspense fallback={<p>Loading FAQ...</p>}>
        <Faq data={faq} />
      </Suspense>
    </>
  )
}

export default Home
