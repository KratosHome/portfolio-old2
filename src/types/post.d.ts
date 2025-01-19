interface ICommentPost {
  authorId: string
  userLogo: string
  isPublished: boolean
  author: string
  text: string
}

interface ILike {
  userId: string
  timestamp: Date | string
}

interface IDizLike {
  userId: string
  timestamp: Date | string
}

interface IPost {
  _id: string
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
  likes: ILike[]
  dizLikes: IDizLike[]
  comments: ICommentPost[]
  createdAt: Date | string
  updatedAt?: Date
  authorUsername: string
}

interface IPostWithUserDetails extends IPost {
  authorId?: string
  authorUsername?: string
  authorUserLogo?: string
}
