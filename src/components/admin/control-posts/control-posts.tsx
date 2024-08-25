'use client'

import { useEffect, useState } from 'react'
import { getAllPosts } from '@/server/blog/get-all-post-server'
import { publicPost } from '@/server/blog/public-post.server'
import { deletePostServer } from '@/server/blog/delete-post.server'
import { toast } from 'react-toastify'

export const ControlPosts = () => {
  const [posts, setPosts] = useState<any>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllPosts()
      setPosts(data.posts)
    }

    fetchData()
  }, [])

  const togglePublishStatus = async (
    postId: string,
    currentStatus: boolean,
  ) => {
    await publicPost(postId, !currentStatus)
  }
  const deletePost = async (postId: string) => {
    const rs = await deletePostServer(postId)
    if (rs.success) {
      toast.success('Пост успішно видалено')
      const data = await getAllPosts()
      setPosts(data.posts)
    } else {
      toast.error('Помилка під час видалення поста')
    }
  }

  console.log(posts)

  return (
    <div className="mx-auto p-4">
      {posts.map((post: any) => (
        <div
          key={post.postId}
          className="mb-6 max-w-max rounded-lg bg-white p-6 shadow-md"
        >
          <p className="mb-2 text-gray-600">
            <strong>Локалізація:</strong> {post.local}
          </p>
          <p className="mb-2 text-gray-600">
            <strong>Автор:</strong> {post.authorId}
          </p>
          <p className="mb-2 text-gray-600">
            <strong>URL:</strong> {post.url || 'N/A'}
          </p>
          <p className="mb-2 text-gray-600">
            <strong>Категорії:</strong> {post.category.join(', ')}
          </p>
          <p className="mb-2 text-gray-600">
            <strong>Ключові слова:</strong> {post.keyWords.join(', ')}
          </p>
          <h2 className="mb-2 text-2xl font-bold">{post.title}</h2>
          <p className="mb-2 text-gray-600">{post.subTitle}</p>
          <p className="mb-2 text-gray-800">{post.desc}</p>
          <img
            src={post.img}
            alt={post.title}
            className="mb-4 h-64 w-full rounded-lg object-cover"
          />
          <button
            onClick={() => togglePublishStatus(post._id, post.isPublished)}
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
