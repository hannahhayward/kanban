import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BoardsService {
  async getAllByCreatorId(userId) {
    const board = await dbContext.Board.findById({ creatorId: userId })
    if (!board) {
      throw new BadRequest('Invalid Board Id')
    }
    return board
  }

  async createBoard(boardData) {
    const board = await dbContext.Board.create(boardData)
    await board.populate('creator', 'name picture').execPopulate()
    return board
  }

  async getAllBoards(userId) {
    const boards = await dbContext.Board.find({ creatorId: userId }).populate('creator', 'name picture')
    return (boards)
  }

  async editBoard(userId, boardData) {
    const board = await dbContext.Board.findByIdAndUpdate({ creatorId: userId }, boardData, { new: true, runValidators: true })
    if (!board) {
      throw new BadRequest('Invalid Board Id')
    }
    return board
  }

  async deleteBoard(userId) {
    const board = await dbContext.Board.findByIdAndDelete({ creatorId: userId })
    if (!board) {
      throw new BadRequest('Invalid Board Id')
    }
    return board
  }
}

export const boardsService = new BoardsService()
