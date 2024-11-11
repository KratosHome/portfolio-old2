import { create } from 'zustand'
import { getTeamProject } from '@/server/project/get-team-project.server'

interface StoreState {
  team: any[]
  fetchTeam: (id: string) => Promise<void>
  clearTeam: () => void
}

export const teamStore = create<StoreState>((set) => ({
  team: [],

  fetchTeam: async (id: string) => {
    try {
      const response = await getTeamProject(id)

      if (response.success) {
        set({ team: response.team })
      } else {
        console.error('Error fetching projects: Invalid response format')
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  },
  clearTeam: () => set({ team: [] }),
}))
