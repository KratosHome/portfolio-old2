import { getTranslations } from 'next-intl/server'
import { getPost } from '@/server/blog/get-post.server'
import { notFound } from 'next/navigation'

export default async function Page({ params: { locale, postId } }: any) {
  const t = await getTranslations('page.blog')

  const post = await getPost(postId, locale)

  console.log('posvsfvfdvsdfvt', post)
  if (!post.success) {
    notFound()
  }

  return <div>vv</div>
}
