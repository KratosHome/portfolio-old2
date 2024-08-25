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
  },
  { timestamps: true },
)

export const Post = mongoose.models?.Post || mongoose.model('Post', blogSchema)
