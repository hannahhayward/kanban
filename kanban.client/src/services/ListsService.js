import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ListsService {
  async getLists() {
    const res = await api.get('/api/lists/')
    AppState.lists = res.data
    logger.log('lists', AppState.lists)
  }

  async getListsbyBoardId(boardId) {
    logger.log(boardId, 'boardId')
    const res = await api.get('/api/lists/' + boardId)
    logger.log(res.data, 'res in the service')
  }
}
export const listsService = new ListsService()
