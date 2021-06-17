import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BoardsService {
  async getAllByCreatorId(userId) {
    const board = await dbContext.Board.findById(userId)
    if (!board) {
      throw new BadRequest('Invalid Board Id')
    }
    return board
  }

  async getAllBoards(userId) {
    const boards = await dbContext.Board.find({ }).populate('creator', 'name picture')
    return boards
  }

  async createBoard(boardData) {
    const board = await dbContext.Board.create(boardData)
    await board.populate('creator', 'name picture').execPopulate()
    return board
  }

  async editBoard(Id, boardData) {
    const board = await dbContext.Board.findByIdAndUpdate(Id, boardData, { new: true, runValidators: true })
    if (!board) {
      throw new BadRequest('Invalid Board Id')
    }
    return board
  }

  async deleteBoard(Id) {
    const board = await dbContext.Board.findByIdAndDelete(Id)
    if (!board) {
      throw new BadRequest('Invalid Board Id')
    }
    return board
  }
}

export const boardsService = new BoardsService()
