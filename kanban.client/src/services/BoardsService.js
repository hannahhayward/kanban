import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import Notification from '../utils/Notification'

class BoardsService {
  async deleteBoard(id) {
    await api.delete('/api/boards/' + id)
    AppState.boards = AppState.boards.filter(b => b.id !== id)
  }

  async getBoards() {
    const res = await api.get('/api/boards')
    AppState.boards = res.data
  }

  async getBoard(id) {
    const res = await api.get('/api/boards/' + id)
    AppState.board = res.data
  }

  async createBoard(newBoard) {
    try {
      const res = await api.post('/api/boards', newBoard)
      this.getBoards()
      logger.log(res, 'new board res')
    } catch (error) {
      Notification.toast(error, error)
    }
  }
}
export const boardsService = new BoardsService()
