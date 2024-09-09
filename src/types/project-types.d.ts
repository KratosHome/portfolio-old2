interface WorkPlanItem {
  text: string
  completed: boolean
}

interface TeamMember {
  userId: string
  role: 'owner' | 'member' | 'mentor' | 'manager' | 'developer'
  rating?: number
  percentageWorkProject?: number
  isDeleted?: boolean
  deletedAt?: Date
}

interface ProjectTypes {
  _id: string
  name: string
  description: string
  technologies: string[]
  workPlan: WorkPlanItem[]
  lookingInTeam?: string[]
  isPublic?: boolean
  percentageProjectCompletion: number
  deployLink?: string
  gitHubLink?: string
  designLink?: string
  contactGroupLink?: string
  teams: TeamMember[]
  status?: 'new' | 'in progress' | 'deploy' | 'completed' | 'archived'
  logo?: string
  newUsers?: string[]
  resetPasswordToken?: string
  createdAt?: Date
  updatedAt?: Date
}
