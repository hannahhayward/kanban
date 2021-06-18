import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { api } from './AxiosService'

class ListsService {
  async deleteList(id) {
    try {
      await api.delete('api/lists/' + id)
    } catch (error) {
      Notification.toast(error)
    }
  }

  async getListsByBoardId(boardId) {
    const res = await api.get('api/lists/' + boardId)
    AppState.lists = res.data
  }

  async createList(newList) {
    const res = await api.post('api/lists', newList)
    AppState.lists = res.data
    this.getListsByBoardId(newList.boardId)
  }
}
export const listsService = new ListsService()
