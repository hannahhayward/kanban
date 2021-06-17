import { AppState } from '../AppState'
import { api } from './AxiosService'

class ListsService {
  async getListsByBoardId(id) {
    const res = await api.get('/api/lists/' + id)
    AppState.lists = res.data
  }

  async getListsbyBoardId(boardId) {
    logger.log(boardId, 'boardId')
    const res = await api.get('/api/lists/' + boardId)
    logger.log(res.data, 'res in the service')
  }
}
export const listsService = new ListsService()
