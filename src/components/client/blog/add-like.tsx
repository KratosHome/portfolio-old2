'use client'
import { FC, useEffect, useState } from 'react'
import { addLikeServer } from '@/server/blog/add-like.server'
import { Loader } from '@/components/UI/loader/loader'
import { Modal } from '@/components/UI/modal/modal'
import Link from 'next/link'
import { useStore } from '@/store/user'
import { useTheme } from 'next-themes'
import { addDizLikeServer } from '@/server/blog/add-diz-like.server'

export const AddLike: FC<any> = ({ postContent }) => {
  const { user } = useStore()
  const { theme } = useTheme()

  const [loader, setLoader] = useState(false)
  const [modal, setModal] = useState(false)
  const [isAddLike, setIsAddLike] = useState(false)
  const [isAddDiz, setIsAddDiz] = useState(false)

  useEffect(() => {
    if (user) {
      console.log('user', postContent.likes)
      setIsAddLike(postContent.likes.some((like: any) => like === user._id))

      setIsAddDiz(
        postContent.dizLikes.some((dizLike: any) => dizLike === user._id),
      )
    }
  }, [user, postContent.likes, postContent.dizLikes])

  const addLike = async () => {
    if (user) {
      setLoader(true)
      const result = await addLikeServer(user._id, postContent._id)
      if (result.success) {
        console.log('like added')
      } else {
        console.log('error')
      }
    } else {
      setModal(true)
    }
    setLoader(false)
  }

  const addDiz = async () => {
    if (user) {
      const result = await addDizLikeServer(user._id, postContent._id)
      setLoader(true)
      if (result.success) {
        console.log('like added')
      } else {
        console.log('error')
      }
    } else {
      setModal(true)
    }
    setLoader(false)
  }

  return (
    <>
      {loader && <Loader />}
      <div className="flex gap-[32px]">
        <div className="flex items-center gap-[5px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
              stroke={theme === 'dark' ? 'white' : 'black'}
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2 12C3.60014 7.90264 7.33603 5 12 5C16.664 5 20.3999 7.90264 22 12C20.3999 16.0974 16.664 19 12 19C7.33603 19 3.60014 16.0974 2 12Z"
              stroke={theme === 'dark' ? 'white' : 'black'}
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div>{postContent.read}</div>
        </div>
        <div className="flex items-center gap-[5px]" onClick={addLike}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M17.3604 20H6C4.89543 20 4 19.1046 4 18V10H7.92963C8.59834 10 9.2228 9.6658 9.59373 9.1094L12.1094 5.3359C12.6658 4.5013 13.6025 4 14.6056 4H14.8195C15.4375 4 15.9075 4.55487 15.8059 5.1644L15 10H18.5604C19.8225 10 20.7691 11.1547 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20Z"
              fill={
                isAddLike ? '#0B66F5' : theme === 'dark' ? 'white' : 'black'
              }
            />
          </svg>
          <div>{postContent.likes.length}</div>
        </div>
        <div className="flex items-center gap-[5px]" onClick={addDiz}>
          <div className="mt-1 rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M17.3604 20H6C4.89543 20 4 19.1046 4 18V10H7.92963C8.59834 10 9.2228 9.6658 9.59373 9.1094L12.1094 5.3359C12.6658 4.5013 13.6025 4 14.6056 4H14.8195C15.4375 4 15.9075 4.55487 15.8059 5.1644L15 10H18.5604C19.8225 10 20.7691 11.1547 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20Z"
                fill={isAddDiz ? 'red' : theme === 'dark' ? 'white' : 'black'}
              />
            </svg>
          </div>
          <div>{postContent.dizLikes.length}</div>
        </div>
        <Link
          href={'#coments'}
          className="flex cursor-pointer items-center gap-[5px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.4876 3.36093 14.891 4 16.1272L3 21L7.8728 20C9.10904 20.6391 10.5124 21 12 21Z"
              stroke={theme === 'dark' ? 'white' : 'black'}
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <rect
              x="7.5"
              y="12"
              width="0.01"
              height="0.01"
              stroke={theme === 'dark' ? 'white' : 'black'}
              stroke-width="2.25"
              stroke-linejoin="round"
            />
            <rect
              x="12"
              y="12"
              width="0.01"
              height="0.01"
              stroke={theme === 'dark' ? 'white' : 'black'}
              stroke-width="2.25"
              stroke-linejoin="round"
            />
            <rect
              x="16.5"
              y="12"
              width="0.01"
              height="0.01"
              stroke={theme === 'dark' ? 'white' : 'black'}
              stroke-width="2.25"
              stroke-linejoin="round"
            />
            <circle cx="19" cy="5" r="3" fill="#0B66F5" />
          </svg>
          <div>{postContent.comments.length}</div>
        </Link>
      </div>
      <Modal
        isOpen={modal}
        onClose={() => setModal(false)}
        className="flex flex-col justify-end rounded-lg border-b border-black bg-[127deg] bg-gradient-to-r from-[rgba(11,102,245,0.30)] via-[rgba(78,128,206,0.15)] to-transparent px-3 backdrop-blur-[12.5px] lg:px-8"
      >
        <div className="p-6 text-center">
          <h2 className="text-xl font-semibold">Будь ласка, авторизуйтесь</h2>
          <p className="mt-4">
            Щоб залишити лайк чи дизлайк, вам потрібно увійти в систему.
          </p>
          <Link
            href="/login"
            className="mt-6 block rounded-lg bg-blue-500 px-6 py-2 text-white shadow-md transition-all duration-200 hover:bg-blue-600"
            onClick={() => setModal(false)}
          >
            Увійти
          </Link>
        </div>
      </Modal>
    </>
  )
}
