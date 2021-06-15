import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TasksService {
  async getAllByCreatorId(id) {
    const task = await dbContext.Task.findById(id)
    if (!task) {
      throw new BadRequest('Invalid task Id')
    }
    return task
  }

  async createTask(taskData) {
    const task = await dbContext.Task.create(taskData)
    await task.populate('creator', 'name picture').execPopulate()
    return task
  }

  async editTask(id, taskData) {
    const task = await dbContext.Task.findByIdAndUpdate(id, taskData, { new: true, runValidators: true })
    if (!task) {
      throw new BadRequest('Invalid task Id')
    }
    return task
  }

  async deleteTask(id) {
    const task = await dbContext.Task.findByIdAndDelete(id)
    if (!task) {
      throw new BadRequest('Invalid task Id')
    }
    return task
  }
}
export const tasksService = new TasksService()
