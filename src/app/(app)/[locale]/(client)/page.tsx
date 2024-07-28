import { FC } from 'react'
import { Viewport } from 'next'
import homeMetadata from '@/components/metadata/home-meta-data'
import HomeSnippets from '@/components/snippets/home-snippets'
import Hero from '@/components/hero/hero'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}
export async function generateMetadata({ params }: PageProps) {
  return homeMetadata(params.locale as LanguageProps)
}

const Home: FC<PageProps> = async ({ params: { locale } }) => {
  return (
    <>
      <HomeSnippets locale={locale} />
      <Hero />
    </>
  )
}

export default Home
