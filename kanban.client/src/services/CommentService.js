import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class CommentsService {
  async deleteComment(id) {
    await api.delete('api/comments/' + id)
    AppState.comments = AppState.comments.filter(c => c.id !== id)
  }

  async createComment(newComment) {
    const res = await api.post('/api/comments', newComment)
    logger.log(res.data, 'new Comment in service')
    this.getAllCommentsByTaskId(res.data.taskId)
  }

  async getAllCommentsByTaskId(taskId) {
    const res = await api.get('/api/comments/' + taskId)
    AppState.comments = res.data
  }
}
export const commentsService = new CommentsService()
