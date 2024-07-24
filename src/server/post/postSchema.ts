import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
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
    userId: {
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

export const Post = mongoose.models?.Post || mongoose.model('Post', postSchema)
