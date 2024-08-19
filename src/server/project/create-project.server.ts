'use server'
import { connectToDb } from '@/server/connectToDb'
import { Project } from '@/server/project/project-scheme.server'

export const createProject = async (data: any) => {
  try {
    await connectToDb()

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
    console.log('err createProject', err)
    return { success: false }
  }
}
