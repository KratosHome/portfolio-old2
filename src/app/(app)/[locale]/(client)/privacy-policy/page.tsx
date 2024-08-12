'use client'
import MarkdownToHtml from '@/data/privacy-policy.mdx'

const Page = () => {
  return (
    <div className="prose prose-lg mx-auto">
      <article>
        <MarkdownToHtml />
      </article>
    </div>
  )
}

export default Page
