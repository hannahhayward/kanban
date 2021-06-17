import { api } from './AxiosService'

class TasksService {
  async deleteTask() {
    await api.delete()
  }
}
export const tasksService = new TasksService()
