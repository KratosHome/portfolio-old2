import { create } from 'zustand'
import { getUser } from '@/server/users/get-users.server'

interface StoreState {
  user: UserTypes
  fetchUser: (session: any) => Promise<void>
  saveUser: (newUser: Partial<UserTypes>) => void
  updateUser: (newUser: Partial<UserTypes>) => void
  clearUser: () => void
}

export const useStore = create<StoreState>((set) => ({
  user: {
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
    _id: '',
    aboutMe: '',
    gitHubLink: '',
    contactLink: '',
    workExperience: 0,
    portfolioLinks: [],
    technologies: [],
  },
  fetchUser: async (email: string) => {
    const response = await getUser(email)

    if (response.success) {
      const user: UserTypes = {
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
        username: response.user.username,
        _id: response.user._id,
        aboutMe: response.user.aboutMe,
        gitHubLink: response.user.gitHubLink,
        contactLink: response.user.contactLink,
        workExperience: response.user.workExperience,
        portfolioLinks: response.user.portfolioLinks,
        technologies: response.user.technologies,
      }

      set({ user })
    }
  },
  saveUser: (newUser: Partial<UserTypes>) =>
    set((state) => ({ user: { ...state.user, ...newUser } })),
  updateUser: (newUser: Partial<UserTypes>) =>
    set((state) => ({ user: { ...state.user, ...newUser } })),
  clearUser: () =>
    set({
      user: {
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
        _id: '',
        aboutMe: '',
        gitHubLink: '',
        contactLink: '',
        workExperience: 0,
        portfolioLinks: [],
        technologies: [],
      },
    }),
}))
