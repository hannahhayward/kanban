import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { api } from './AxiosService'

class ListsService {
  async deleteList(id) {
    try {
      await api.delete('api/lists/' + id)
      AppState.lists = AppState.lists.filter(l => l.id !== id)
    } catch (error) {
      Notification.toast(error)
    }
  }

  async getListsByBoardId(boardId) {
    const res = await api.get('api/lists/' + boardId)
    AppState.lists = res.data
  }

  async createList(newList) {
    await api.post('api/lists', newList)
    this.getListsByBoardId(newList.boardId)
  }
}
export const listsService = new ListsService()
