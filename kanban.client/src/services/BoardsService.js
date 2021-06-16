import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import Notification from '../utils/Notification'

class BoardsService {
  async createBoard(newBoard) {
    try {
      const res = await api.post('api/boards', newBoard)
      logger.log(res.data)
    } catch (error) {
      Notification.toast(error, error)
    }
  }
}
export const boardsService = new BoardsService()
