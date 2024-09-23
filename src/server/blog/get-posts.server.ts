import { connectToDb } from '@/server/connectToDb'
import { Post } from '@/server/blog/blog-schema'
import { User } from '@/server/users/user-schema.server'

export const getPosts = async (
  local: string,
  page: number = 1,
  limit: number = 10,
  isPublished: boolean = true,
  filters: string[] = [],
  authors: string[] = [],
) => {
  try {
    await connectToDb()
    const skip = (page - 1) * limit

    // Отримуємо унікальні категорії та авторів для фільтрів
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
      id: author._id,
      label: author.username,
    }))

    console.log('filters', filters)
    console.log('authors', authors)

    let query: any = { local: local, isPublished }

    if (filters.length > 0) {
      query.categories = { $in: filters }
    }

    if (authors.length > 0) {
      query.authorId = { $in: authors }
    }

    const totalPosts = await Post.countDocuments(query)
    const totalPages = Math.ceil(totalPosts / limit)

    const posts = await Post.find(query).skip(skip).limit(limit)

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
    console.log(err)
    return { success: false }
  }
}
