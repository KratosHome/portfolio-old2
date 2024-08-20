'use client'
import { useState } from 'react'
import { Donat } from '@/components/UI/donat/donat'
import { NewPost } from '@/components/admin/new-post/new-post'

const Page = () => {
  const [activeTab, setActiveTab] = useState<'newPost' | 'myPosts'>('newPost')

  return (
    <div className="mx-auto h-full w-full p-5">
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
      </div>
      {activeTab === 'newPost' && <NewPost />}

      {activeTab === 'myPosts' && (
        <div className="h-full">
          <Donat />
        </div>
      )}
    </div>
  )
}

export default Page
