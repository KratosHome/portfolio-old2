'use client'
import { FC, useState, useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export const CommentsItem: FC<any> = ({ comment }) => {
  const t = useTranslations('post-client')
  const [isExpanded, setIsExpanded] = useState(false)
  const isLongText = comment.text.length > 200
  const commentRef = useRef<HTMLDivElement | null>(null)

  const toggleText = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="comment-item mb-4 mt-[12px] overflow-hidden rounded-lg bg-[linear-gradient(127deg,_rgba(11,_102,_245,_0.30)_49.23%,_rgba(78,_128,_206,_0.15)_83.27%,_rgba(255,_255,_255,_0.00)_102.62%)] p-[12px] backdrop-blur-[12.5px] dark:bg-[linear-gradient(153deg,rgba(255,255,255,0.12)_2.19%,rgba(255,255,255,0)_99.21%)] lg:p-[24px]">
      <div className="flex items-center gap-[13px]">
        <Image
          src={comment.userLogo}
          alt={`user logo ${comment.username}`}
          width={48}
          height={48}
          className="size-12 rounded-full"
        />
        <div className="text-[20px] font-bold text-black dark:text-white">
          {comment.author}
        </div>
      </div>
      <div className="comment-text" ref={commentRef}>
        {comment.text.substring(0, isExpanded ? comment.text.length : 200)}
        {isLongText && (
          <button onClick={toggleText} className="ml-2 text-blue-500">
            {isExpanded ? `${t('Hide')}` : `${t('Read more')}`}
          </button>
        )}
      </div>
    </div>
  )
}
