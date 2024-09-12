import './privacy-policy.scss'
import { FC } from 'react'

interface PageProps {
  params: {
    locale: string
  }
}

const Page: FC<PageProps> = async ({ params: { locale } }) => {
  // Динамічний імпорт MDX залежно від мови
  let MarkdownToHtml
  try {
    MarkdownToHtml = await import(
      `@/data/privacy-policy/${locale}-privacy-policy.mdx`
    )
  } catch (error) {
    console.error(`Cannot load privacy policy for locale: ${locale}`, error)
    return <div>Error loading privacy policy content.</div>
  }

  return (
    <div className="privacy-policy prose prose-lg mx-auto">
      <article>
        <MarkdownToHtml.default />
      </article>
    </div>
  )
}

export default Page
