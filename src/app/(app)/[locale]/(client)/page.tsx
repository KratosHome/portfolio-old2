import { FC } from 'react'
import { Viewport } from 'next'
import homeMetadata from '@/components/metadata/home-meta-data'
import HomeSnippets from '@/components/snippets/home-snippets'
import { Technologies } from '@/components/technologies/technologies'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}
export async function generateMetadata({ params }: PageProps) {
  return homeMetadata(params.locale as LanguageProps)
}

const Home: FC<PageProps> = ({ params: { locale } }) => {
  return (
    <>
      <div className="bg-hero-pattern bg-cover bg-center">
        <h1 className="text-white">Hello, World!</h1>
      </div>
      <HomeSnippets locale={locale} />
      <Technologies />
    </>
  )
}

export default Home
