import { create } from 'zustand'

interface StoreState {
  projects: ProjectTypes[]
  fetchProjects: (id: string) => Promise<void>
}

export const projectStore = create<StoreState>((set) => ({
  projects: [],

  fetchProjects: async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/project?userId=${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      console.log('response', response)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.success) {
        set({ projects: data.projects })
      } else {
        console.error('Error fetching projects: Invalid response format')
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  },
}))
