'use client'

import { useEffect, useState } from 'react'
import { getAllPosts } from '@/server/blog/get-all-post-server'
import { publicPost } from '@/server/blog/public-post.server'
import { deletePostServer } from '@/server/blog/delete-post.server'
import { toast } from 'react-toastify'
import { useLocale } from 'use-intl'
import Link from 'next/link'
import Image from 'next/image'
import { Loader } from '@/components/UI/client/loader/loader'

export const ControlPosts = () => {
  const locale = useLocale()
  const [posts, setPosts] = useState<any>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const data = await getAllPosts(locale)
      setPosts(data.posts)
      setLoading(false)
    }

    fetchData()
  }, [locale])

  const togglePublishStatus = async (
    postId: string,
    currentStatus: boolean,
  ) => {
    setLoading(true)
    const rs = await publicPost(postId, !currentStatus)
    if (rs.success) {
      toast.success('Пост успішно видалено')
      setLoading(false)
    }
  }

  const deletePost = async (postId: string) => {
    const rs = await deletePostServer(postId)
    if (rs.success) {
      setLoading(true)
      toast.success('Пост успішно видалено')
      const data = await getAllPosts(locale)
      setPosts(data.posts)
      setLoading(false)
    } else {
      toast.error('Помилка під час видалення поста')
    }
  }


  return (
    <div className="p-4">
      {loading && <Loader />}
      {posts.map((post: any) => (
        <div
          key={post.postId}
          className="mb-6 max-w-max rounded-lg bg-white p-6 text-gray-600 shadow-md"
        >
          <p className="mb-2 text-gray-600">
            <strong>Автор:</strong> {post.authorId}
          </p>
          <p className="mb-2 text-gray-600">
            <strong>URL:</strong> {post.url || 'N/A'}
          </p>
          <h2 className="mb-2 text-2xl font-bold">{post.title}</h2>
          <p className="mb-2">{post.subTitle}</p>
          <Image
            src={post.img}
            width={100}
            height={100}
            alt={post.title}
            className="mb-4 size-12 rounded-full object-cover"
          />
          <Link
            href={`blog/${post.postId}`}
            className="block max-w-max rounded-lg bg-green-400 px-3 py-3 text-center"
          >
            детальніше
          </Link>
          <button
            onClick={() => togglePublishStatus(post.postId, post.isPublished)}
            className={`rounded px-4 py-2 ${
              post.isPublished ? 'bg-green-500' : 'bg-red-500'
            } text-white`}
          >
            {post.isPublished ? 'Опубліковано' : 'Неопубліковано'}
          </button>
          <button
            onClick={() => deletePost(post._id)}
            className={`rounded bg-blue-500 px-4 py-2 text-white`}
          >
            видалити
          </button>
        </div>
      ))}
    </div>
  )
}
