import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BoardsService {
  async getBoards() {
    const res = await api.get('/api/boards')
    AppState.boards = res.data
    logger.log(res)
  }
}
export const boardsService = new BoardsService()
