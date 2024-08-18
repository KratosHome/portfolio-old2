'use server'
import { getTranslations } from 'next-intl/server'
import { Pagination } from '@/components/pagination/pagination'
import { getPosts } from '@/server/blog/get-posts.server'
import { PostItem } from '@/components/post-itme/post-itme'
import { ButtonBeck } from '@/components/UI/button-beck/button-beck'

export default async function Page({ params: { locale }, searchParams }: any) {
  const t = await getTranslations('page.blog')
  const page = searchParams['page'] ?? '1'
  const post: any = await getPosts(locale, page, 10)
  const totalPages = post.totalPages

  return (
    <div className="mx-auto max-w-[1442px]">
      <div className="mt-[100px]">
        <ButtonBeck />
      </div>
      <div>
        <h1>{t('title')}</h1>
        <div>
          {post.posts.map((item: any) => (
            <PostItem key={item.title} item={item} />
          ))}
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  )
}
