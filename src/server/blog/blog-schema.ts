import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
      default: [],
    },
    desc: {
      type: String,
      required: true,
      unique: false,
    },
    url: {
      type: String,
      sparse: true,
      unique: false,
    },
    local: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    authorId: {
      type: String,
      required: true,
    },
    keyWords: {
      type: [String],
      default: [],
    },
    isPublished: {
      type: Boolean,
      required: true,
      default: false,
    },
    read: {
      type: Number,
      required: true,
      default: 0,
    },
    likes: {
      type: Array,
      required: true,
      default: [],
    },
    dizLikes: {
      type: Array,
      required: true,
      default: [],
    },
    comments: {
      type: [
        {
          authorId: {
            type: String,
            required: true,
          },
          userLogo: {
            type: String,
            required: true,
            default: '',
          },
          isPublished: {
            type: Boolean,
            required: true,
            default: false,
          },
          author: {
            type: String,
            required: true,
          },
          text: {
            type: String,
            required: true,
          },
        },
      ],
      required: true,
      default: [],
    },
  },
  { timestamps: true },
)

export const Post = mongoose.models?.Post || mongoose.model('Post', blogSchema)
