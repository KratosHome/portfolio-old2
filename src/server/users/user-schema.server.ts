import mongoose from 'mongoose'

const userSchemaServer = new mongoose.Schema(
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
    isPublic: {
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
    projectsId: {
      type: [String],
      default: [],
    },
    newProjectsId: {
      type: [String],
      default: [],
    },
    experienceLevel: {
      type: String,
      enum: [
        'pre junior',
        'junior',
        'strong junior',
        'middle',
        'strong middle',
        'senior',
        'lead',
      ],
      required: false,
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
    linkedinLink: {
      type: String,
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

export const User =
  mongoose.models?.User || mongoose.model('User', userSchemaServer)
