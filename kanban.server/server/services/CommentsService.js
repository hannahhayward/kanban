import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CommentsService {
  async getAllByTaskId(id) {
    const comment = await dbContext.Comment.find({ taskId: id }).populate('creator', 'name picture')
    if (!comment) {
      throw new BadRequest('Invalid comment Id')
    }
    return comment
  }

  async getAllComments() {
    const comments = await dbContext.Comment.find().populate('creator', 'name picture')
    return comments
  }

  async createComment(commentData) {
    const comment = await dbContext.Comment.create(commentData)
    return await comment.populate('creator', 'name picture').execPopulate()
  }

  async editComment(userId, commentData) {
    const comment = await dbContext.Comment.findByIdAndUpdate(userId, commentData, { new: true, runValidators: true })
    if (!comment) {
      throw new BadRequest('Invalid comment Id')
    }
    return comment
  }

  async deleteComment(userId) {
    const comment = await dbContext.Comment.findByIdAndDelete(userId)
    if (!comment) {
      throw new BadRequest('Invalid comment Id')
    }
    return comment
  }
}
export const commentsService = new CommentsService()
