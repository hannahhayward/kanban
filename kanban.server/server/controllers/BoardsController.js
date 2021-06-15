import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { boardsService } from '../services/BoardsService'

export class BoardsController extends BaseController {
  constructor() {
    super('api/boards')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id', this.getAllByCreatorId)
      .get('', this.getAllBoards)
      .post('', this.createBoard)
      .put('/:id', this.editBoard)
      .delete('/:id', this.deleteBoard)
  }

  async getAllBoards(req, res, next) {
    try {
      const boards = await boardsService.getAllBoards()
      return res.send(boards)
    } catch (error) {
    }
  }

  async getAllByCreatorId(req, res, next) {
    try {
      const board = await boardsService.getAllByCreatorId(req.params.id)
      return res.send(board)
    } catch (error) {
      next(error)
    }
  }

  async createBoard(req, res, next) {
    try {
      const board = await boardsService.createBoard(req.body)
      return res.send(board)
    } catch (error) {
      next(error)
    }
  }

  async editBoard(req, res, next) {
    try {
      const board = await boardsService.editBoard(req.params.id, req.body)
      return res.send(board)
    } catch (error) {
      next(error)
    }
  }

  async deleteBoard(req, res, next) {
    try {
      const board = await boardsService.deleteBoard(req.params.id)
      return res.send(board)
    } catch (error) {
      next(error)
    }
  }
}
