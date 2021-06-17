import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ListsService {
  async getAllByBoardId(id) {
    const list = await dbContext.List.findById(id)
    if (!list) {
      throw new BadRequest('Invalid List Id')
    }
    return list
  }

  async getAllLists() {
    const lists = await dbContext.List.find().populate('creator', 'name picture')
    return lists
  }

  async createList(listData) {
    const list = await dbContext.List.create(listData)
    await list.populate('creator', 'name picture').execPopulate()
    return list
  }

  async editList(id, listData) {
    const list = await dbContext.List.findByIdAndUpdate(id, listData, { new: true, runValidators: true })
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
