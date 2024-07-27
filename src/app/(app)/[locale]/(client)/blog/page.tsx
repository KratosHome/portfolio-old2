'use server'
import { getTranslations } from 'next-intl/server'
import { Pagination } from '@/components/pagination/pagination'

export default async function Page({ params: { locale }, searchParams }: any) {
  const t = await getTranslations('page.blog')
  const page = searchParams['page'] ?? '1'
  const posts = await fetch(
    `${process.env.NEXT_URL}/api/post/getPosts?lang=${locale}&page=${page}&limit=${10}`,
    { method: 'GET' },
  )
  const data = await posts.json()
  const totalPages = data.totalPages

  return (
    <>
      <>
        <div>
          <h1>{t('title')}</h1>
          <div>
            {data.data.map((item: any) => (
              <div key={item}>list</div>
            ))}
            <Pagination totalPages={totalPages} />
          </div>
        </div>
      </>
    </>
  )
}
