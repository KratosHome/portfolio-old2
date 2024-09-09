'use server'
import { unstable_noStore as noStore } from 'next/cache'
import { connectToDb } from '@/server/connectToDb'
import { Project } from '@/server/project/project-scheme.server'
import { User } from '@/server/users/user-schema.server'

export const getProjects = async (isPublic: boolean) => {
  'use server'
  noStore()
  try {
    await connectToDb()

    const projects = await Project.find({ isPublic: isPublic }).lean()

    const updatedProjects = await Promise.all(
      projects.map(async (project: any) => {
        if (!project.teams || !Array.isArray(project.teams)) {
          // Перевірка на існування та тип поля teams
          project.teams = []
        }

        // Перебираємо команди у проекті
        const updatedTeams = await Promise.all(
          project.teams.map(async (team: any) => {
            // Знаходимо користувача за userId
            if (team.userId) {
              const user = await User.findOne({ _id: team.userId }).lean()
              // Додаємо дані користувача до команди
              return { ...team, user }
            }
            return team
          }),
        )

        // Оновлюємо команди у проекті
        project.teams = updatedTeams

        return project
      }),
    )

    return {
      success: true,
      projects: updatedProjects,
    }
  } catch (err) {
    console.log(err)
    return { success: false }
  }
}
