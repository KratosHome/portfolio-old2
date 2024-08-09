import mongoose from 'mongoose'

const reviewsSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: false,
      min: 3,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      min: 3,
      max: 255,
    },
    company: {
      type: String,
      required: true,
      min: 3,
      max: 255,
    },
    reviews: {
      type: String,
      required: false,
      min: 3,
      max: 955,
    },
    isPublic: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true },
)

export const Reviews =
  mongoose.models.Reviews || mongoose.model('Reviews', reviewsSchema)
