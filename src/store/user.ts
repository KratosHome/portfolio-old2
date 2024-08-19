import { create } from 'zustand'
import { getUser } from '@/server/users/get-users.server'

interface StoreState {
  user: UserTypes
  fetchUser: (session: any) => Promise<void>
  saveUser: (newUser: Partial<UserTypes>) => void
  updateUser: (newUser: Partial<UserTypes>) => void
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
  },
  fetchUser: async (session: any) => {
    const response = await getUser(session?.user.email)

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
      }
      set({ user })
    }
  },
  saveUser: (newUser: Partial<UserTypes>) =>
    set((state) => ({ user: { ...state.user, ...newUser } })),
  updateUser: (newUser: Partial<UserTypes>) =>
    set((state) => ({ user: { ...state.user, ...newUser } })),
}))
