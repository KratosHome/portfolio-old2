import { NextRequest, NextResponse } from 'next/server'
import { connectToDb } from '@/server/connectToDb'
import { Post } from '@/server/blog/blog-schema'

export async function GET(request: NextRequest) {
  if (request.method !== 'GET')
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })

  const url = request.nextUrl
  const lang = url.searchParams.get('lang') || 'default_lang'
  const page = parseInt(url.searchParams.get('page') || '1', 10)
  const limit = parseInt(url.searchParams.get('limit') || '10', 10)

  try {
    await connectToDb()
    const matchQuery = { isPublished: true, local: lang }
    const total = await Post.countDocuments(matchQuery)
    const totalPages = Math.ceil(total / limit)
    const startIndex = (+page - 1) * limit

    const postsQuery: any = [
      { $match: matchQuery },
      { $sort: { createdAt: -1 } },
      { $limit: limit },
      { $skip: startIndex },
      {
        $project: {
          title: 1,
          img: 1,
          userId: 1,
          local: 1,
          subTitle: 1,
          isPublished: 1,
          createdAt: 1,
          postId: 1,
          url: 1,
        },
      },
      { $addFields: { convertedUserId: { $toObjectId: '$userId' } } },
      {
        $lookup: {
          from: 'users',
          localField: 'convertedUserId',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      { $unwind: '$userDetails' },
      {
        $project: {
          title: 1,
          subTitle: 1,
          img: 1,
          userId: 1,
          postId: 1,
          local: 1,
          url: 1,
          isPublished: 1,
          createdAt: 1,
          userDetails: {
            email: '$userDetails.email',
            username: '$userDetails.username',
            img: '$userDetails.img',
          },
        },
      },
    ]

    // f

    const posts = await Post.aggregate(postsQuery)

    return NextResponse.json(
      {
        data: posts,
        total,
        currentPage: page,
        totalPages,
      },
      { status: 201 },
    )
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: 'Something went wrong!' },
      { status: 500 },
    )
  }
}
