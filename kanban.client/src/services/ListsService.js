import { AppState } from '../AppState'
import { api } from './AxiosService'

class ListsService {
  async getListsByBoardId(boardId) {
    const res = await api.get('api/lists/' + boardId)
    AppState.lists = res.data
  }

  async createList(newList) {
    const res = await api.post('api/lists', newList)
    console.log('create list response', res.data)
    AppState.lists = res.data
    console.log(AppState.lists, 'appstate')
    this.getListsByBoardId(newList.boardId)
  }
}
export const listsService = new ListsService()
