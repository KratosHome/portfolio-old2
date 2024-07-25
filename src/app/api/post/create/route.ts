import { NextRequest, NextResponse } from 'next/server'
import { connectToDb } from '@/server/connectToDb'
import { Post } from '@/server/post/postSchema'
import { revalidatePath } from 'next/cache'
import cloudinary from '@/server/cloudinaryConfig'

export async function POST(request: NextRequest) {
  if (request.method !== 'POST')
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
  const formData = await request.formData()
  const userId = formData.get('userId')
  const title = formData.get('title')
  const desc = formData.get('desc')
  const local = formData.get('local')
  const url = formData.get('url')
  const keyWords = formData.get('keyWords')
  const subTitle = formData.get('subTitle')
  const image = formData.get('image') as File

  try {
    await connectToDb()
    const arrBuffer = await image.arrayBuffer()
    const buffer = new Uint8Array(arrBuffer)
    const isPostCreate = await Post.findOne({ url: url, local: local })
    if (isPostCreate)
      return NextResponse.json({ error: `Post is created` }, { status: 404 })

    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            tags: 'blog',
          },
          function (error, result) {
            if (error) {
              reject(error)
              return
            }
            resolve(result)
          },
        )
        .end(buffer)
    })
    const postData: any = {
      title,
      desc,
      userId: userId,
      img: uploadResult.url,
      local: local,
      subTitle: subTitle,
      keyWords: keyWords,
      url: url,
    }

    const newPost = new Post(postData)
    await newPost.save()

    revalidatePath('/blog')
    revalidatePath('/profile')

    return NextResponse.json(
      { success: true, url: newPost.url },
      { status: 201 },
    )
  } catch (err: any) {
    console.error(err)
    const firstErrorKey = Object.keys(err.errors)[0]
    const firstErrorObject = err.errors[firstErrorKey]
    return NextResponse.json(
      {
        error: `Something went wrong! ${firstErrorObject.path} ${firstErrorObject.kind}`,
      },
      { status: 500 },
    )
  }
}
