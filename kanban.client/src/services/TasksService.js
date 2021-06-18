import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class TasksService {
  async deleteTask(id) {
    await api.delete('api/tasks/' + id)
    AppState.tasks = AppState.tasks.filter(t => t.id !== id)
  }

  async createTask(newTask) {
    const res = await api.post('/api/tasks', newTask)
    logger.log(res.data)
  }

  async getAllTasksByBoardId(boardId) {
    const res = await api.get('/api/tasks/' + boardId)
    AppState.tasks = res.data
    logger.log(res.data, 'res')
  }
}
export const tasksService = new TasksService()
