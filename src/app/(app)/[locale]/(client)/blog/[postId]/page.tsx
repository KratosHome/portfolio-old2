import { getTranslations } from 'next-intl/server'
import { getPost } from '@/server/blog/get-post.server'
import { notFound } from 'next/navigation'
import { ButtonBeck } from '@/components/UI/button-beck/button-beck'
import { formatDate } from '@/utils/formatDate'

export default async function Page({ params: { locale, postId } }: any) {
  const t = await getTranslations('page.blog')

  const post = await getPost(postId, locale)

  if (!post.success || !post.post) {
    notFound()
  }
  const postContent = post.post
  const formattedDate = formatDate(postContent.createdAt)

  return (
    <div>
      <div className="mx-auto max-w-[1442px] px-[24px]">
        <div className="mt-[100px]">
          <ButtonBeck />
        </div>
        <h1 className="text-center text-[40px] font-light lg:text-[64px]">
          {postContent.title}
        </h1>
        <div className="mt-[100px] flex justify-end gap-[32px] pb-[10px]">
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
                stroke="#FAFAFA"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2 12C3.60014 7.90264 7.33603 5 12 5C16.664 5 20.3999 7.90264 22 12C20.3999 16.0974 16.664 19 12 19C7.33603 19 3.60014 16.0974 2 12Z"
                stroke="#FAFAFA"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div>{postContent.read}</div>
          </div>
          <div className="flex items-center gap-[5px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M17.3604 20H6C4.89543 20 4 19.1046 4 18V10H7.92963C8.59834 10 9.2228 9.6658 9.59373 9.1094L12.1094 5.3359C12.6658 4.5013 13.6025 4 14.6056 4H14.8195C15.4375 4 15.9075 4.55487 15.8059 5.1644L15 10H18.5604C19.8225 10 20.7691 11.1547 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20Z"
                fill="#0B66F5"
              />
            </svg>
            <div>{postContent.likes}</div>
          </div>
          <div className="flex items-center gap-[5px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.4876 3.36093 14.891 4 16.1272L3 21L7.8728 20C9.10904 20.6391 10.5124 21 12 21Z"
                stroke="#FAFAFA"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <rect
                x="7.5"
                y="12"
                width="0.01"
                height="0.01"
                stroke="#FAFAFA"
                stroke-width="2.25"
                stroke-linejoin="round"
              />
              <rect
                x="12"
                y="12"
                width="0.01"
                height="0.01"
                stroke="#FAFAFA"
                stroke-width="2.25"
                stroke-linejoin="round"
              />
              <rect
                x="16.5"
                y="12"
                width="0.01"
                height="0.01"
                stroke="#FAFAFA"
                stroke-width="2.25"
                stroke-linejoin="round"
              />
              <circle cx="19" cy="5" r="3" fill="#0B66F5" />
            </svg>
            <div>33</div>
          </div>
        </div>
        <div className="h-[1px] w-full bg-amber-50" />
        <div className="mb-[150px] flex justify-between pt-[20px]">
          <div className="text-[#0B66F5]">{post.user.username}</div>
          <div>{formattedDate}</div>
        </div>
        <article
          className="privacy-policy prose-lg mx-auto"
          dangerouslySetInnerHTML={{ __html: postContent.desc }}
        />
        <div className="mt-[84px] h-[1px] w-full bg-amber-50" />
        <div>
          <h2 className="mt-[280px] text-[40px] font-light lg:text-[64px]">
            Coments
          </h2>
        </div>
      </div>
    </div>
  )
}
