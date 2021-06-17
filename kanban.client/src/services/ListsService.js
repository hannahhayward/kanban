import { AppState } from '../AppState'
import { api } from './AxiosService'

class ListsService {
  async getListsByBoardId(id) {
    const res = await api.get('/api/lists/' + id)
    AppState.lists = res.data
  }
}
export const listsService = new ListsService()
