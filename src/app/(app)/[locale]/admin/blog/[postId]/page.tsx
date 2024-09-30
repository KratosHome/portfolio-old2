import { NewPost } from '@/components/admin/new-post/new-post'
import { getPostsById } from '@/server/blog/get-posts-by-id'

const Page = async (props: any) => {
  const data = await getPostsById(props.params.postId)

  console.log('fvsdfvsfdvdsf', data)
  return (
    <div>
      <NewPost data={data} />
    </div>
  )
}

export default Page
