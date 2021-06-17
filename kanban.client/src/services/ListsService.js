import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ListsService {
  async getAllLists() {
    const res = await api.get('api/lists')
    AppState.lists = res.data
    logger.log(AppState.lists, 'lists')
  }

  async getLists(id) {
    const res = await api.get('/api/lists/' + id)
    AppState.lists = res.data
  }
}
export const listsService = new ListsService()
