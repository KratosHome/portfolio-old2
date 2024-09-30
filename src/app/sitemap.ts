import { MetadataRoute } from 'next'
import { connectToDb } from '@/server/connectToDb'
import { Post } from '@/server/blog/blog-schema'
import { local } from '@/data/local'
import { Project } from '@/server/project/project-scheme.server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connectToDb()
  const dataPost: IPost[] = await Post.find({ isPublished: true })
  const dataProjects: IProject[] = await Project.find({ isPublic: true })

  const homePage = local.map((lang) => ({
    url: `https://codecraftmaster.com/${lang}`,
    lastModified: new Date('2023-09-01'),
    changeFrequency: 'yearly' as const,
    priority: 0.8,
  }))

  const blog = local.map((lang) => ({
    url: `https://codecraftmaster.com/${lang}/blog`,
    lastModified: new Date('2023-09-01'),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const posts = dataPost.map((item) => {
    const urlParts = item.url.split('-')
    const cleanUrl = urlParts.slice(0, -1).join('-')

    return {
      url: `https://codecraftmaster.com/${item.local}/blog/${cleanUrl}`,
      lastModified: item.createdAt,
      changeFrequency: 'never' as const,
      priority: 0.5,
    }
  })

  const project = local.map((lang) => ({
    url: `https://codecraftmaster.com/${lang}/community/projects`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  const projects = local.flatMap((lang) =>
    dataProjects.map((item) => {
      return {
        url: `https://codecraftmaster.com/${lang}/community/projects/?id=${item._id}`,
        lastModified: item.createdAt,
        changeFrequency: 'never' as const,
        priority: 0.5,
      }
    }),
  )

  const user = local.map((lang) => ({
    url: `https://codecraftmaster.com/${lang}/community/members`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [...homePage, ...blog, ...posts, ...project, ...projects, ...user]
}
