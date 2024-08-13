import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 120,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 150,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
    },
    userLogo: {
      type: String,
    },
    role: {
      type: String,
      enum: ['frontend', 'backend', 'mentor', 'manager'],
      default: 'user',
    },
    transactions: {
      type: Array,
      default: [],
    },
    telegramLink: {
      type: String,
    },
    gitHubLink: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    resume: {
      type: String,
    },
    portfolio: {
      type: String,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
  },
  { timestamps: true },
)

export const User = mongoose.models?.User || mongoose.model('User', userSchema)
