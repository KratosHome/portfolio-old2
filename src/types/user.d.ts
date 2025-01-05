interface IUser {
  _id: string
  createdAt: string
  email: string
  isAdmin: boolean
  isBlocked: boolean
  isEmailVerified: boolean
  isEmailVerifiedToken: string
  password: string
  rating: number
  role: string
  transactions: ITransaction[]
  updatedAt: string
  username: string
  aboutMe: string
  gitHubLink: string
  contactLink: string
  workExperience: number
  portfolioLinks: string[]
  technologies: string[]
  userLogo?: string | null
  linkedinLink: string
  isPublic: boolean
  resume: string
  experienceLevel: string
}

interface ITransaction {
  id: string
  amount: number
  date: string
  status: 'pending' | 'completed' | 'failed'
  description?: string
}
