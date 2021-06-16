import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import Notification from '../utils/Notification'

class BoardsService {
  async getBoards() {
    const res = await api.get('/api/boards')
    AppState.boards = res.data
    logger.log(res)
  }

  async createBoard(newBoard) {
    const account = AppState.account.id
    try {
      const res = await api.post(`/api/boards/${account}`, newBoard)
      AppState.boards = res.data
      logger.log(AppState.boards, 'appstate')
    } catch (error) {
      Notification.toast(error, error)
    }
  }
}
export const boardsService = new BoardsService()
