interface ICommentPost {
  authorId: string
  userLogo: string
  isPublished: boolean
  author: string
  text: string
}

interface IPost {
  postId: string
  title: string
  subTitle: string
  categories: string[]
  desc: string
  url: string
  local: string
  img: string
  authorId: string
  keyWords: string[]
  isPublished: boolean
  read: number
  likes: any[]
  dizLikes: any[]
  comments: ICommentPost[]
  createdAt: Date | string
  updatedAt?: Date
  authorUsername: string
}
