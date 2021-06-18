import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { tasksService } from '../services/TasksService'

export class TasksController extends BaseController {
  constructor() {
    super('api/tasks')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id', this.getAllTasksByBoardId)
      .get('', this.getAllTasks)
      .post('', this.createTask)
      .put('/:id', this.editTask)
      .put('/:tId/:lId', this.moveTask)
      .delete('/:id', this.deleteTask)
  }

  async moveTask(req, res, next) {
    const task = await tasksService.moveTask(req.params.tId, req.params.lId)
    return res.send(task)
  }

  async getAllTasks(req, res, next) {
    const task = await tasksService.getAllTasks()
    return res.send(task)
  }

  async getAllTasksByBoardId(req, res, next) {
    try {
      const task = await tasksService.getAllTasksByBoardId(req.params.id)
      return res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async createTask(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const task = await tasksService.createTask(req.body)
      return res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async editTask(req, res, next) {
    try {
      const task = await tasksService.editTask(req.userInfo.id, req.body)
      return res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async deleteTask(req, res, next) {
    try {
      const task = await tasksService.deleteTask(req.params.id)
      return res.send(task)
    } catch (error) {
      next(error)
    }
  }
}
