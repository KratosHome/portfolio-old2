import React, { FC } from 'react'
import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/pagination'
import { Viewport } from 'next'
import { homeMateData } from '@/data/meta-data/home-meta-data'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

type LanguagePropsTypes = {
  locale: ILocale
}

export async function generateMetadata({ params }: { params: any }) {
  const { locale } = (await params) as LanguagePropsTypes

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

const Home: FC<any> = async ({ params }: { params: any }) => {
  const { locale } = (await params) as LanguagePropsTypes
  console.log('locffffale', locale)

  return <></>
}

export default Home
