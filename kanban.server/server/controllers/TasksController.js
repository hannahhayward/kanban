import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { tasksService } from '../services/TasksService'

export class TasksController extends BaseController {
  constructor() {
    super('api/tasks')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id', this.getAllByCreatorId)
      .get('', this.getAllTasks)
      .post('', this.createTask)
      .put('/:id', this.editTask)
      .delete('/:id', this.deleteTask)
  }

  async getAllTasks(req, res, next) {
    try {
      const tasks = await tasksService.getAllTasks()
      return res.send(tasks)
    } catch (error) {
    }
  }

  async getAllByCreatorId(req, res, next) {
    try {
      const task = await tasksService.getAllByCreatorId(req.params.id)
      return res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async createTask(req, res, next) {
    try {
      const task = await tasksService.createTask(req.body)
      return res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async editTask(req, res, next) {
    try {
      const task = await tasksService.editTask(req.params.id, req.body)
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
