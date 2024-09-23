'use server'
import { getTranslations } from 'next-intl/server'
import { Pagination } from '@/components/pagination/pagination'
import { getPosts } from '@/server/blog/get-posts.server'
import { ButtonBeck } from '@/components/UI/button-beck/button-beck'
import { PostItem } from '@/components/client/post-itme/post-itme'
import { FilterItems } from '@/components/filter-items/filter-items'

export default async function Page({ params: { locale }, searchParams }: any) {
  const t = await getTranslations('post-client')
  const page = searchParams['page'] ?? '1'
  const filters = searchParams['filters']
  const authors = searchParams['authors']
  const post: any = await getPosts(locale, page, 10, false, filters, authors)
  const totalPages = post.totalPages

  return (
    <div className="mx-auto max-w-[1442px] px-[24px]">
      <div className="mt-[100px]">
        <ButtonBeck />
      </div>
      <div>
        <h1 className="text-center text-[64px] font-light uppercase lg:text-[160px]">
          {t('blog')}
        </h1>
        <div className="flex flex-wrap sm:gap-9">
          <FilterItems
            title={t('All filters')}
            url={'filters'}
            filters={post.categories}
          />
          <FilterItems
            title={t('All authors')}
            url={'authors'}
            filters={post.authors}
          />
        </div>
        <div className="flex min-h-screen flex-col justify-between">
          <div className="flex flex-wrap items-center justify-center gap-10 lg:justify-start">
            {post.posts.map((item: any) => (
              <PostItem key={item.title} item={item} />
            ))}
          </div>
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  )
}
