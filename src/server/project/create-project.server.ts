'use server'
import { connectToDb } from '@/server/connectToDb'
import { Project } from '@/server/project/project-scheme.server'

export const createProject = async (id: any, adminId: string, data: any) => {
  try {
    await connectToDb()

    data.teams = {
      userId: id,
      role: 'owner',
    }

    const project = new Project(data)
    await project.save()

    const projectJSON = project.toObject()
    projectJSON._id = projectJSON._id.toString()
    projectJSON.workPlan = projectJSON.workPlan.map((item: any) => ({
      ...item,
      _id: item._id.toString(),
    }))

    return { success: true, project: projectJSON }
  } catch (err) {
    return { success: false, message: "Can't create project" }
  }
}
