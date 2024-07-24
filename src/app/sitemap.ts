import { MetadataRoute } from 'next'
import { connectToDb } from '@/server/connectToDb'
import { Post } from '@/server/post/postSchema'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connectToDb()
  const data: any = await Post.find({ isPublished: true })

  const postsUa = data.map((item: any) => ({
    url: `https://codecraftmaster.com/ua/blog/${item.url}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
  }))

  const postsEn = data.map((item: any) => ({
    url: `https://codecraftmaster.com/en/blog/${item.url}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
  }))

  return [
    {
      url: 'https://codecraftmaster.com/ua',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://codecraftmaster.com/en',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://codecraftmaster.com/en/blog',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    },
    {
      url: 'https://codecraftmaster.com/ua/blog',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    },
    ...postsUa,
    ...postsEn,
  ]
}
