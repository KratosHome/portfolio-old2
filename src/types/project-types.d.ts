interface ProjectTypes {
  _id: string
  name: string
  description: string
  technologies: string[]
  workPlan: {
    text: string
    completed: boolean
  }[]
  isPublic?: boolean
  lookingInTeam?: string[]
  percentageProjectCompletion: number
  deployLink?: string
  gitHubLink?: string
  contactGroupLink?: string
  team?: string[]
  logo?: string
  newUsers: string[]
  resetPasswordToken?: string
  createdAt?: string
  updatedAt?: string
  status: 'new' | 'in progress' | 'deploy' | 'completed' | 'archived'
}
