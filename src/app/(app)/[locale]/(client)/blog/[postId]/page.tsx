import { getTranslations } from 'next-intl/server'
import { getPost } from '@/server/blog/get-post.server'

export default async function Page({ params: { locale, postId } }: any) {
  const t = await getTranslations('page.blog')

  const post = await getPost(postId, locale)

  console.log('posvsfvfdvsdfvt', post)

  return <div>vv</div>
}
