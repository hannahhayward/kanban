import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { listsService } from '../services/ListsService'

export class ListsController extends BaseController {
  constructor() {
    super('api/lists')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id', this.getAllByCreatorId)
      .get('', this.getAllLists)
      .post('', this.createList)
      .put('/:id', this.editList)
      .delete('/:id', this.deleteList)
  }

  async getAllLists(req, res, next) {
    try {
      const lists = await listsService.getAllLists()
      return res.send(lists)
    } catch (error) {
    }
  }

  async getAllByCreatorId(req, res, next) {
    try {
      const list = await listsService.getAllByBoardId(req.params.id)
      return res.send(list)
    } catch (error) {
      next(error)
    }
  }

  async createList(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const list = await listsService.createList(req.body)
      return res.send(list)
    } catch (error) {
      next(error)
    }
  }

  async editList(req, res, next) {
    try {
      const list = await listsService.editList(req.params.id, req.body)
      return res.send(list)
    } catch (error) {
      next(error)
    }
  }

  async deleteList(req, res, next) {
    try {
      const list = await listsService.deleteList(req.params.id)
      return res.send(list)
    } catch (error) {
      next(error)
    }
  }
}
