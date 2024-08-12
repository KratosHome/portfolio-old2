'use client'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import MarkdownToHtml from '@/data/privacy-policy.mdx'
import { MDXRemote } from 'next-mdx-remote'
import { MDXProvider } from '@mdx-js/react'

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
