import { getTranslations } from 'next-intl/server'
import { getPosts } from '@/server/blog/get-posts.server'
import { PostItem } from '@/components/client/post-itme/post-itme'
import { ButtonBeck } from '@/components/UI/client/button-beck/button-beck'
import { FilterItems } from '@/components/UI/client/filter-items/filter-items'
import { Pagination } from '@/components/UI/client/pagination/pagination'

type Params = Promise<{ locale: ILocale }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

interface Category {
  id: string
  label: string
}

interface Author {
  id: string
  username: string
}

interface ApiResponse {
  success: boolean
  posts: IPost[]
  categories: Category[]
  currentPage: number
  totalPages: number
  authors: Author[]
}

export default async function Page(props: {
  params: Params
  searchParams: SearchParams
}) {
  const { locale } = await props.params
  const searchParams = await props.searchParams

  const t = await getTranslations('post-client')

  const post: ApiResponse = await getPosts(
    locale,
    +(searchParams.page || 1),
    10,
    true,
    searchParams.filters,
    searchParams.authors,
  )

  return (
    <div className="mx-auto max-w-[1442px] px-[24px]">
      <div className="mt-[100px]">
        <ButtonBeck />
      </div>
      <div>
        <h1 className="text-center text-[64px] font-light uppercase lg:text-[160px]">
          {t('blog')}
        </h1>
        <div className="flex flex-wrap gap-9">
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
            {post.posts.map((item) => (
              <PostItem key={item.title} item={item} />
            ))}
          </div>
          <Pagination totalPages={post.totalPages} />
        </div>
      </div>
    </div>
  )
}
