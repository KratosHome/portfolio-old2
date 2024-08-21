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
    aboutMe: {
      type: String,
      required: false,
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
    technologies: {
      type: [String],
      required: true,
    },
    projects: {
      type: [
        {
          id: {
            type: String,
            required: true,
          },
          percentageWorkProject: {
            type: Number,
            required: true,
            default: 0,
          },
        },
      ],
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
    projectsId: {
      type: [String],
      default: [],
    },
    newProjectsId: {
      type: [String],
      default: [],
    },
    role: {
      required: true,
      type: String,
      enum: [
        'user',
        'frontend',
        'backend',
        'full stack',
        'tester',
        'designer',
        'devops',
        'data scientist',
        'project manager',
        'product manager',
        'qa engineer',
        'ui/ux designer',
        'mobile developer',
        'system administrator',
        'security analyst',
        'mentor',
      ],
    },
    contactLink: {
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
    portfolioLinks: {
      type: [String],
    },
    workExperience: {
      type: Number,
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
