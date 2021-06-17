import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TasksService {
  async getAllByCreatorId(userId) {
    const task = await dbContext.Task.findById(userId)
    if (!task) {
      throw new BadRequest('Invalid task Id')
    }
    return task
  }

  async getAllTasks() {
    const tasks = await dbContext.Task.find().populate('creator', 'name picture')
    return tasks
  }

  async createTask(taskData) {
    const task = await dbContext.Task.create(taskData)
    await task.populate('creator', 'name picture').execPopulate()
    return task
  }

  async editTask(userId, taskData) {
    const task = await dbContext.Task.findByIdAndUpdate(userId, taskData, { new: true, runValidators: true })
    if (!task) {
      throw new BadRequest('Invalid task Id')
    }
    return task
  }

  async deleteTask(userId) {
    const task = await dbContext.Task.findByIdAndDelete(userId)
    if (!task) {
      throw new BadRequest('Invalid task Id')
    }
    return task
  }
}
export const tasksService = new TasksService()
