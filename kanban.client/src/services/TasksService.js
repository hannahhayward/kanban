import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class TasksService {
  async deleteTask() {
    await api.delete()
  }

  async createTask(newTask) {
    const res = await api.post('/api/tasks', newTask)
    logger.log(res, 'new task')
  }
}
export const tasksService = new TasksService()
