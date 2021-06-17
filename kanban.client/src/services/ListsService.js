import { AppState } from '../AppState'
import { api } from './AxiosService'

class ListsService {
  async getListsByBoardId(boardId) {
    const res = await api.get('/api/lists/' + boardId)
    AppState.lists = res.data
  }
}
export const listsService = new ListsService()
