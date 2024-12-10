import { connectToDb } from '@/server/connectToDb'
import { Post } from '@/server/blog/blog-schema'
import { User } from '@/server/users/user-schema.server'

interface QueryType {
  local: string
  isPublished: boolean
  categories?: { $in: string[] }
  authorId?: { $in: string[] }
}

export const getPosts = async (
  local: string,
  page: number = 1,
  limit: number = 10,
  isPublished: boolean = true,
  filters?: string | string[],
  authors?: string | string[],
) => {
  try {
    await connectToDb()
    const skip = (page - 1) * limit

    const uniqueCategories = await Post.distinct('categories', { local: local })
    const formattedFilters = uniqueCategories.map((category: string) => ({
      id: category,
      label: `${category.charAt(0).toUpperCase() + category.slice(1)}`,
    }))

    const uniqueAuthorIds = await Post.distinct('authorId', { local: local })
    const uniqueAuthors = await User.find({
      _id: { $in: uniqueAuthorIds },
    })
      .select('username userLogo')
      .lean()
    const formattedAuthors = uniqueAuthors.map((author) => ({
      id: String(author._id),
      label: author.username,
    }))

    let query: QueryType = { local: local, isPublished }

    if (filters && filters.length > 0) {
      const resultFilters = Array.isArray(filters)
        ? filters
        : filters.split(',')
      query.categories = { $in: resultFilters }
    }

    if (authors && authors.length > 0) {
      const resultAuthors = Array.isArray(authors)
        ? authors
        : authors.split(',')
      query.authorId = { $in: resultAuthors }
    }

    const totalPosts = await Post.countDocuments(query)
    const totalPages = Math.ceil(totalPosts / limit)

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const postsWithUserDetails = await Promise.all(
      posts.map(async (post) => {
        const user = await User.findById(post.authorId).select(
          'username userLogo',
        )
        return {
          ...post.toObject(),
          authorUsername: user?.username,
          authorUserLogo: user?.userLogo,
        }
      }),
    )

    return {
      success: true,
      posts: postsWithUserDetails,
      categories: formattedFilters,
      currentPage: page,
      totalPages,
      authors: formattedAuthors,
    }
  } catch (err) {
    return {
      success: false,
      posts: [],
      categories: [],
      currentPage: 1,
      totalPages: 0,
      authors: [],
      error: 'Error while fetching posts',
    }
  }
}
