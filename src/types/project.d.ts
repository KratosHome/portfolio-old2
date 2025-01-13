interface IWorkPlanItem {
  text: string
  completed: boolean
}

interface ITeamMember {
  userId: string
  role: 'owner' | 'member' | 'mentor' | 'manager' | 'developer'
  rating?: number
  percentageWorkProject?: number
  isDeleted?: boolean
  deletedAt?: Date
  user?: IUser
}

interface IProject {
  _id: string
  name: string
  description: string
  technologies: string[]
  workPlan: IWorkPlanItem[]
  lookingInTeam?: string[]
  isPublic?: boolean
  percentageProjectCompletion: number
  deployLink?: string
  gitHubLink?: string
  designLink?: string
  contactGroupLink?: string
  teams: ITeamMember[]
  status?: 'new' | 'in progress' | 'deploy' | 'completed' | 'archived'
  logo?: string
  newUsers?: string[]
  resetPasswordToken?: string
  createdAt?: Date
  updatedAt?: Date
}
