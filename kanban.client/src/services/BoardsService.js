import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import Notification from '../utils/Notification'

class BoardsService {
  async getBoards() {
    const res = await api.get('/api/boards')
    AppState.boards = res.data
  }

  async getBoard(id) {
    const res = await api.get('/api/boards/' + id)
    AppState.board = res.data
  }

  async createBoard(newBoard) {
    logger.log(newBoard)
    try {
      const res = await api.post('/api/boards', newBoard)
      AppState.boards = res.data
      logger.log(res, 'new board res')
    } catch (error) {
      Notification.toast(error, error)
    }
  }
}
export const boardsService = new BoardsService()
