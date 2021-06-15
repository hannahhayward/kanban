import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BoardsService {
  async getAllByCreatorId(id) {
    const board = await dbContext.Board.findById(id)
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

  async getAllBoards() {
    const boards = await dbContext.Board.find().populate('creator', 'name picture')
    return (boards)
  }

  async editBoard(id, boardData) {
    const board = await dbContext.Board.findByIdAndUpdate(id, boardData, { new: true, runValidators: true })
    if (!board) {
      throw new BadRequest('Invalid Board Id')
    }
    return board
  }

  async deleteBoard(id) {
    const board = await dbContext.Board.findByIdAndDelete(id)
    if (!board) {
      throw new BadRequest('Invalid Board Id')
    }
    return board
  }
}

export const boardsService = new BoardsService()
