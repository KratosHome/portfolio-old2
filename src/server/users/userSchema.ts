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
      enum: ['user', 'mentor', 'manager', 'admin', 'super-admin'],
      default: 'user',
    },
    resetPasswordToken: String,
  },
  { timestamps: true },
)

export const User = mongoose.models?.User || mongoose.model('User', userSchema)
