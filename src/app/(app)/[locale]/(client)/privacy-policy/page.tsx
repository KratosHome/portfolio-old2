import './privacy-policy.scss'

export default async function Page({ params }: { params: any }) {
  const { locale } = params

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
