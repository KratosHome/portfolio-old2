import { getTranslations } from 'next-intl/server'
import { getPost } from '@/server/blog/get-post.server'
import { notFound } from 'next/navigation'
import { ButtonBeck } from '@/components/UI/button-beck/button-beck'
import { formatDate } from '@/utils/formatDate'
import { AddLike } from '@/components/client/blog/add-like'
import { SocialNetworks } from '@/components/client/blog/social-networks'
import { CommentsItem } from '@/components/client/blog/comments-item'
import { LeaveComment } from '@/components/client/blog/leave-comment'

export default async function Page({ params: { locale, postId } }: any) {
  const t = await getTranslations('post-client')

  const post = await getPost(postId, locale)

  if (!post.success || !post.post) {
    notFound()
  }
  const postContent: any = post.post
  const userContent: any = post.user
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
        <div className="mt-[100px] flex cursor-pointer justify-end gap-[32px] pb-[10px]">
          <AddLike postContent={postContent} />
          <div className="absolute -right-[50px] -z-20 h-[153px] w-[155px] bg-orbit-services-light dark:opacity-[0.7] dark:bg-orbit-services" />
        </div>
        <div className="h-[1px] w-full bg-black dark:bg-white" />
        <div className="mb-[150px] flex justify-between pt-[20px]">
          <div className="text-[#0B66F5]">{post.user.username}</div>
          <div>{formattedDate}</div>
        </div>
        <article
          className="privacy-policy prose-lg mx-auto"
          dangerouslySetInnerHTML={{ __html: postContent.desc }}
        />
        <div className="mt-[146px] h-[1px] w-full bg-black dark:bg-white" />
        <div className="relative">
          <div className="animate-scale-in-out absolute -right-[150px] -top-[150px] -z-10 hidden h-[300px] w-[300px] bg-cover bg-center bg-group-pattern-light dark:bg-group-pattern dark:opacity-[.1] lg:block" />
        </div>
        <SocialNetworks userContent={userContent} />
        <section id="coments">
          <h2 className="mb-[60px] mt-[280px] text-[40px] font-light lg:text-[64px]">
            {t('comments')}
          </h2>
          {post.comments &&
            post.comments.map((comment: any) => (
              <CommentsItem key={comment._id} comment={comment} />
            ))}
          <LeaveComment postId={postContent.postId} />
        </section>
      </div>
    </div>
  )
}
