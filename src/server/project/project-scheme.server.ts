import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    technologies: {
      type: [String],
      required: true,
    },
    workPlan: {
      type: [
        {
          text: {
            type: String,
            required: true,
          },
          completed: {
            type: Boolean,
            required: true,
          },
        },
      ],
      required: true,
    },
    lookingInTeam: {
      type: [String],
      required: false,
    },
    isPublic: {
      type: Boolean,
      required: false,
      default: false,
    },
    percentageProjectCompletion: {
      type: Number,
      required: true,
    },
    deployLink: {
      type: String,
      required: false,
    },
    gitHubLink: {
      type: String,
      required: false,
    },
    contactGroupLink: {
      type: String,
      required: false,
    },
    team: {
      type: [String],
      required: false,
    },
    status: {
      type: String,
      enum: ['new', 'in progress', 'deploy', 'completed', 'archived'],
    },
    logo: {
      type: String,
    },
    newUsers: {
      type: [String],
      default: [],
    },
    resetPasswordToken: String,
  },
  { timestamps: true },
)

export const Project =
  mongoose.models?.Project || mongoose.model('Project', projectSchema)
