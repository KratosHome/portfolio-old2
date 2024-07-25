import { NextRequest, NextResponse } from 'next/server'
import { connectToDb } from '@/server/connectToDb'
import { Post } from '@/server/post/postSchema'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  if (request.method !== 'POST')
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
  const formData = await request.formData()
  const id = formData.get('id')

  const local = formData.get('local')
  const title = formData.get('title')
  const subTitle = formData.get('subTitle')
  const desc = formData.get('desc')
  const keyWords = formData.get('keyWords')
  const url = formData.get('url')
  const image = formData.get('image') as File | null

  try {
    await connectToDb()
    const existingPost = await Post.findOne({ url: url, local: local })
    let imgURL

    if (image !== null) {
      imgURL = existingPost.img
    } else {
      imgURL = existingPost.img
    }

    const updatedData: any = {
      title,
      desc,
      img: imgURL,
      postId: url,
      subTitle: subTitle,
      keyWords: keyWords,
    }

    await Post.findByIdAndUpdate(id, updatedData, { new: true })

    revalidatePath('/blog')
    revalidatePath('/profile')

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: 'Something went wrong!' },
      { status: 500 },
    )
  }
}
