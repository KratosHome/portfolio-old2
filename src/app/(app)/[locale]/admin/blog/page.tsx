'use client'
import { useState } from 'react'
import { Donat } from '@/components/UI/donat/donat'
import { NewPost } from '@/components/admin/new-post/new-post'
import { useStore } from '@/store/user'
import Link from 'next/link'
import { ControlPosts } from '@/components/admin/control-posts/control-posts'

const Page = () => {
  const { user } = useStore()
  const [activeTab, setActiveTab] = useState<any>('newPost')
  const isSuperAdmin = user.isAdmin

  if (!user) {
    return (
      <div className="text-center">
        <h1>Завантаження...</h1>
      </div>
    )
  }

  return (
    <div className="mx-auto h-full w-full p-5">
      {user.isEmailVerified ? (
        <div>
          <div className="mb-4 flex space-x-4">
            <button
              className={`rounded px-4 py-2 ${activeTab === 'newPost' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
              onClick={() => setActiveTab('newPost')}
            >
              Новий пост
            </button>
            <button
              className={`rounded px-4 py-2 ${activeTab === 'myPosts' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
              onClick={() => setActiveTab('myPosts')}
            >
              Мої пости
            </button>
            {isSuperAdmin && (
              <button
                className={`rounded px-4 py-2 ${activeTab === 'admin-posts' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                onClick={() => setActiveTab('admin-posts')}
              >
                admin-posts
              </button>
            )}
          </div>
          {activeTab === 'newPost' && <NewPost />}
          {activeTab === 'myPosts' && (
            <div className="h-full">
              <Donat />
            </div>
          )}
          {isSuperAdmin && (
            <>{activeTab === 'admin-posts' && <ControlPosts />}</>
          )}
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Підтвердіть пошту</h1>
          <p>Для створення постів вам необхідно підтвердити пошту</p>
          <Link href={'/admin/user'} className="text-blue-700">
            перейти до профайлу
          </Link>
        </div>
      )}
    </div>
  )
}

export default Page
