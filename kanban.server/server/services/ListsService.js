import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ListsService {
  async getAllListsByBoardId(Id) {
    const list = await dbContext.List.find({ boardId: Id })
    if (!list) {
      throw new BadRequest('Invalid List Id')
    }
    return list
  }

  async getAllLists(userId) {
    const lists = await dbContext.List.find().populate('creator', 'name picture')
    return lists
  }

  async createList(listData) {
    const list = await dbContext.List.create(listData)
    await list.populate('creator', 'name picture').execPopulate()
    return list
  }

  async editList(userId, listData) {
    const list = await dbContext.List.findByIdAndUpdate(userId, listData, { new: true, runValidators: true })
    if (!list) {
      throw new BadRequest('Invalid List Id')
    }
    return list
  }

  async deleteList(id) {
    const list = await dbContext.List.findByIdAndDelete(id)
    if (!list) {
      throw new BadRequest('Invalid List Id')
    }
    return list
  }
}

export const listsService = new ListsService()
