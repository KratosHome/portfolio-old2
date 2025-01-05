import { create } from 'zustand'
import { getUser } from '@/server/users/get-user.server'

interface StoreState {
  user: IUser
  fetchUser: (email: string) => Promise<void>
  saveUser: (newUser: Partial<IUser>) => void
  updateUser: (newUser: Partial<IUser>) => void
  clearUser: () => void
}

export const useStore = create<StoreState>((set) => ({
  user: {
    _id: '',
    createdAt: '',
    email: '',
    isAdmin: false,
    isBlocked: false,
    isEmailVerified: false,
    isEmailVerifiedToken: '',
    password: '',
    rating: 0,
    role: '',
    transactions: [],
    updatedAt: '',
    username: '',
    aboutMe: '',
    gitHubLink: '',
    contactLink: '',
    workExperience: 0,
    portfolioLinks: [],
    technologies: [],
    userLogo: null,
    linkedinLink: '',
    isPublic: false,
    resume: '',
    experienceLevel: '',
  },
  fetchUser: async (email: string) => {
    const response = await getUser(email)

    if (response.success) {
      const user: IUser = {
        _id: response.user._id,
        userLogo: response.user.userLogo,
        username: response.user.username,
        createdAt: response.user.createdAt,
        email: response.user.email,
        isAdmin: response.user.isAdmin,
        isBlocked: response.user.isBlocked,
        isEmailVerified: response.user.isEmailVerified,
        isEmailVerifiedToken: response.user.isEmailVerifiedToken,
        password: response.user.password,
        rating: response.user.rating,
        role: response.user.role,
        transactions: response.user.transactions,
        updatedAt: response.user.updatedAt,
        aboutMe: response.user.aboutMe,
        gitHubLink: response.user.gitHubLink,
        contactLink: response.user.contactLink,
        workExperience: response.user.workExperience,
        portfolioLinks: response.user.portfolioLinks,
        technologies: response.user.technologies,
        linkedinLink: response.user.linkedinLink,
        isPublic: response.user.isPublic,
        resume: response.user.resume,
        experienceLevel: response.user.experienceLevel,
      }

      set({ user })
    }
  },
  saveUser: (newUser: Partial<IUser>) =>
    set((state) => ({ user: { ...state.user, ...newUser } })),
  updateUser: (newUser: Partial<IUser>) =>
    set((state) => ({ user: { ...state.user, ...newUser } })),
  clearUser: () =>
    set({
      user: {
        _id: '',
        createdAt: '',
        email: '',
        isAdmin: false,
        isBlocked: false,
        isEmailVerified: false,
        isEmailVerifiedToken: '',
        password: '',
        rating: 0,
        role: '',
        transactions: [],
        updatedAt: '',
        username: '',
        aboutMe: '',
        gitHubLink: '',
        contactLink: '',
        workExperience: 0,
        portfolioLinks: [],
        technologies: [],
        userLogo: null,
        linkedinLink: '',
        isPublic: false,
        resume: '',
        experienceLevel: '',
      },
    }),
}))
