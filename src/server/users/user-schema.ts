import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: false,
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
      redirect: true,
      type: Boolean,
      default: false,
    },
    isEmailVerifiedToken: {
      type: String,
    },
    password: {
      redirect: true,
      type: String,
    },
    userLogo: {
      type: String,
    },
    role: {
      required: true,
      type: String,
      enum: [
        'frontend',
        'backend',
        'mentor',
        'manager',
        'QA',
        'designer',
        'user',
      ],
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
    portfolioImage: {
      type: String,
    },
    portfolioDescription: {
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
