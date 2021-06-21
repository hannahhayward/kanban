import { AppState } from '../AppState'
import { api } from './AxiosService'

class TasksService {
  async deleteTask(id) {
    await api.delete('api/tasks/' + id)
    AppState.tasks = AppState.tasks.filter(t => t.id !== id)
  }

  async createTask(newTask) {
    const res = await api.post('/api/tasks', newTask)
    this.getAllTasksByBoardId(res.data.boardId)
  }

  async getAllTasksByBoardId(boardId) {
    const res = await api.get('/api/tasks/' + boardId)
    AppState.tasks = res.data
  }

  async moveTask(tId, lId) {
    const i = AppState.tasks.findIndex(t => t.id === tId)
    AppState.tasks[i].listId = lId
    await api.put('api/tasks/' + tId + '/' + lId)
  }
}
export const tasksService = new TasksService()
