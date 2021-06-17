import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class TasksService {
  async getTasks() {
    const res = await api.get('api/tasks')
    AppState.tasks = res.data
    logger.log('tasks', AppState.tasks)
  }

  async deleteTask(id) {
    await api.delete('api/tasks/' + id)
    AppState.tasks = AppState.tasks.filter(t => t.id !== id)
  }
}
export const tasksService = new TasksService()
