import { create } from 'zustand'
import { getProject } from '@/server/project/get-project.server'

interface StoreState {
  projects: IProject[]
  fetchProjects: (id: string) => Promise<void>
  clearProjects: () => void
}

export const projectStore = create<StoreState>((set) => ({
  projects: [],

  fetchProjects: async (id: string) => {
    try {
      const response = await getProject(id)

      if (response.success) {
        set({ projects: response.projects })
      } else {
        console.error('Error fetching projects: Invalid response format')
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  },
  clearProjects: () => set({ projects: [] }),
}))
