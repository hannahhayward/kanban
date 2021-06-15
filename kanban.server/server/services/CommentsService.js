import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CommentsService {
  async getAllByCreatorId(id) {
    const comment = await dbContext.Comment.findById(id)
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
    await comment.populate('creator', 'name picture').execPopulate()
    return comment
  }

  async editComment(id, commentData) {
    const comment = await dbContext.Comment.findByIdAndUpdate(id, commentData, { new: true, runValidators: true })
    if (!comment) {
      throw new BadRequest('Invalid comment Id')
    }
    return comment
  }

  async deleteComment(id) {
    const comment = await dbContext.Comment.findByIdAndDelete(id)
    if (!comment) {
      throw new BadRequest('Invalid comment Id')
    }
    return comment
  }
}
export const commentsService = new CommentsService()
